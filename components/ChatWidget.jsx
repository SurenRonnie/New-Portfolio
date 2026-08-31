'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Minus, Maximize2, Send, Sparkles, Briefcase, Code2, RotateCcw } from 'lucide-react';

const BRAND = '#BFFF0B';

const QUICK_ACTIONS = [
  { label: 'His top skills', icon: Code2, prompt: 'What are his strongest technical skills?' },
  { label: 'Hire Surendar', icon: Briefcase, prompt: 'Is he available for freelance or full-time work, and how do I reach him?' },
];

const GREETING = {
  role: 'assistant',
  content:
    "Hi! I'm Surendar's AI assistant. Ask me about his skills, projects, experience or how to work with him.",
};

/* Stable per-browser id so the server can recall the conversation. */
function useSessionId() {
  const [id, setId] = useState('');
  useEffect(() => {
    let s;
    try {
      s = localStorage.getItem('sg_chat_session');
      if (!s) {
        s = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem('sg_chat_session', s);
      }
    } catch {
      s = `s_${Date.now().toString(36)}`; // private mode / storage blocked
    }
    setId(s);
  }, []);
  return id;
}

/* Splits **bold** spans out of a line. The prompt forbids markdown, but LLMs
   emit it anyway, so render it properly instead of showing raw asterisks. */
function renderInline(text, keyBase) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={`${keyBase}-${i}`} className="font-semibold text-white">{part.slice(2, -2)}</strong>
    ) : (
      <span key={`${keyBase}-${i}`}>{part}</span>
    )
  );
}

/* Renders plain text with "-" bullets, preserving line breaks. */
function MessageBody({ text }) {
  const lines = text
    .replace(/^#{1,6}\s+/gm, '')  // strip stray markdown headings
    .split('\n')
    .filter((l) => l.trim() !== '');

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const bullet = /^\s*[-•*]\s+/.test(line);
        const body = bullet ? line.replace(/^\s*[-•*]\s+/, '') : line;
        return (
          <p key={i} className={bullet ? 'flex gap-2' : ''}>
            {bullet && <span style={{ color: BRAND }} className="shrink-0 leading-relaxed">•</span>}
            <span>{renderInline(body, i)}</span>
          </p>
        );
      })}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: BRAND }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [unread, setUnread] = useState(false);

  const sessionId = useSessionId();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const reduce = useReducedMotion();

  const scrollToEnd = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [reduce]);

  useEffect(() => { scrollToEnd(); }, [messages, busy, scrollToEnd]);

  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open, minimized]);

  // Esc closes the panel.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || busy) return;

    setInput('');
    setMessages((m) => [...m, { role: 'user', content: question }, { role: 'assistant', content: '', streaming: true }]);
    setBusy(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, sessionId }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || 'Request failed');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const line = part.replace(/^data:\s?/, '').trim();
          if (!line || line === '[DONE]') continue;
          let evt;
          try { evt = JSON.parse(line); } catch { continue; }

          if (evt.type === 'token') {
            // Rebuild the last message immutably. Mutating it (`last.content +=`)
            // duplicates every token, because React invokes state updaters twice
            // in StrictMode and the shallow copy shares the object reference.
            setMessages((m) => {
              const last = m[m.length - 1];
              if (last?.role !== 'assistant') return m;
              return [...m.slice(0, -1), { ...last, content: last.content + evt.text }];
            });
          } else if (evt.type === 'error') {
            setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content: evt.error }]);
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages((m) => {
          const last = m[m.length - 1];
          if (last?.role !== 'assistant' || last.content) return m;
          return [...m.slice(0, -1), { role: 'assistant', content: err.message || 'Something went wrong. Please try again.' }];
        });
      }
    } finally {
      setMessages((m) => m.map((x) => (x.streaming ? { ...x, streaming: false } : x)));
      setBusy(false);
      if (minimized) setUnread(true);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([GREETING]);
    setBusy(false);
    try {
      const s = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem('sg_chat_session', s);
      window.location.reload();
    } catch {}
  };

  const panelSize = expanded
    ? 'sm:w-[min(46rem,calc(100vw-3rem))] sm:h-[min(80vh,46rem)]'
    : 'sm:w-[26rem] sm:h-[min(70vh,36rem)]';

  return (
    <>
      {/* ── Launcher ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="launcher"
            className="fixed bottom-5 right-4 sm:bottom-8 sm:right-6 z-[60] flex items-end gap-3"
          >
            {/* Chat message bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.4 }}
              className="relative hidden sm:flex flex-col items-start mb-2"
            >
              <div
                className="relative px-4 py-2.5 rounded-2xl rounded-br-sm text-[13px] font-medium text-black shadow-lg"
                style={{ background: BRAND, boxShadow: `0 6px 28px ${BRAND}55` }}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black/70 shrink-0" />
                  Ask me about Surendar
                </span>
                {/* Bubble tail pointing right toward the button */}
                <span
                  className="absolute -right-2 bottom-2 w-0 h-0"
                  style={{
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderLeft: `8px solid ${BRAND}`,
                  }}
                />
              </div>
              {/* Typing dots sub-label */}
              <div className="flex items-center gap-1.5 mt-1.5 ml-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1 h-1 rounded-full bg-white/40"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                  />
                ))}
                <span className="text-[10px] text-white/40 ml-0.5">AI assistant</span>
              </div>
            </motion.div>

            {/* Launcher button */}
            <motion.button
              onClick={() => { setOpen(true); setMinimized(false); setUnread(false); }}
              aria-label="Open AI assistant"
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative shrink-0"
            >
              <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: BRAND }} />
              <span
                className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl"
                style={{ background: BRAND, boxShadow: `0 8px 40px ${BRAND}55` }}
              >
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Panel ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: minimized ? 64 : undefined,
            }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.8 }}
            className={`fixed z-[60] flex flex-col overflow-hidden
                        inset-x-3 bottom-3 h-[80svh]
                        sm:inset-x-auto sm:bottom-8 sm:right-6 ${minimized ? 'sm:h-16' : panelSize}
                        rounded-3xl border border-white/10 bg-[#08090a]/95 backdrop-blur-2xl
                        shadow-[0_24px_80px_rgba(0,0,0,0.7)]`}
            style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px ${BRAND}18` }}
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-4 py-3 border-b border-white/10 shrink-0">
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)` }}
              />
              <motion.div
                animate={reduce ? {} : { scale: [1, 1.12, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                style={{ background: `${BRAND}1a`, border: `1px solid ${BRAND}55` }}
              >
                <Sparkles className="w-4 h-4" style={{ color: BRAND }} />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-white leading-tight">Surendar&apos;s AI Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
                  {busy ? 'Thinking…' : 'Online'}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={reset} aria-label="New conversation"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setExpanded((v) => !v)} aria-label={expanded ? 'Restore size' : 'Maximize'}
                  className="hidden sm:block p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button onClick={() => { setMinimized((v) => !v); setUnread(false); }} aria-label={minimized ? 'Expand' : 'Minimize'}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} aria-label="Close chat"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-red-500/20 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {minimized && unread && (
                <span className="absolute -top-1 right-24 w-2.5 h-2.5 rounded-full" style={{ background: BRAND }} />
              )}
            </div>

            {/* Body */}
            <AnimatePresence initial={false}>
              {!minimized && (
                <motion.div
                  key="body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed rounded-2xl ${
                            m.role === 'user'
                              ? 'text-black font-medium rounded-br-md'
                              : 'bg-white/[0.06] text-white/90 border border-white/10 rounded-bl-md'
                          }`}
                          style={m.role === 'user' ? { background: BRAND } : undefined}
                        >
                          {m.content ? <MessageBody text={m.content} /> : <TypingDots />}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick actions */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                      {QUICK_ACTIONS.map((a, i) => (
                        <motion.button
                          key={a.label}
                          onClick={() => send(a.prompt)}
                          disabled={busy}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.08 }}
                          whileHover={{ scale: 1.04, borderColor: `${BRAND}80` }}
                          whileTap={{ scale: 0.96 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[11px] font-medium text-white/70 hover:text-white transition-colors disabled:opacity-40"
                        >
                          <a.icon className="w-3.5 h-3.5" style={{ color: BRAND }} />
                          {a.label}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Composer */}
                  <form
                    onSubmit={(e) => { e.preventDefault(); send(); }}
                    className="flex items-end gap-2 p-3 border-t border-white/10 shrink-0"
                  >
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
                      }}
                      placeholder="Ask about skills, projects, hiring…"
                      maxLength={1000}
                      className="flex-1 resize-none bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-[#BFFF0B]/50 transition-colors max-h-28"
                    />
                    <motion.button
                      type="submit"
                      disabled={busy || !input.trim()}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Send message"
                      className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                      style={{ background: BRAND }}
                    >
                      <Send className="w-4 h-4 text-black" />
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
