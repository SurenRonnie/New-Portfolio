/**
 * Single source of truth about Surendar for the AI assistant.
 * Compiled from public/resume.pdf and the live portfolio sections.
 * Update this file when the resume changes — the assistant reads nothing else.
 */

export const PROFILE = {
  identity: {
    name: 'Surendar G',
    title: 'Senior Frontend Developer',
    company: 'Osiz Technologies',
    location: 'Madurai, Tamil Nadu, India',
    email: 'gsurendar23@gmail.com',
    phone: '+91 9003633972',
    linkedin: 'https://www.linkedin.com/in/surendar-g-a97741276',
    portfolio: 'https://new-portfolio-sigma-vert.vercel.app/',
    experienceYears: '4+',
  },

  summary: `Senior Frontend Developer with 4+ years of experience building scalable,
responsive, SEO-friendly and high-performance web applications using React.js and Next.js.
Skilled in SSR, API integration, state management, reusable component architecture and
performance optimization. Beyond frontend, actively works with Node.js and backend APIs
through self-driven learning. Experienced in integrating AI-powered features and working
with AI models via Hugging Face and Ollama. Passionate about clean, maintainable,
pixel-perfect interfaces and modern, user-focused digital experiences.`,

  skills: {
    Frontend: ['React.js', 'Next.js', 'Astro.js', 'Vite.js', 'Redux', 'SSR and CSR'],
    Backend: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    Styling: ['Tailwind CSS', 'Responsive UI', 'AOS Animation'],
    Languages: ['HTML5', 'CSS3', 'JavaScript', 'SCSS'],
    'SEO & Performance': ['Technical SEO', 'On-Page SEO', 'Site Audit', 'Page Speed'],
    Blockchain: ['DeFi', 'NFT Platforms', 'Crypto Exchange'],
    'AI / Tools': ['Ollama AI', 'Hugging Face', 'AI Integration', 'Git', 'VS Code'],
  },

  experience: [
    {
      role: 'Senior Programmer (Frontend Developer)',
      company: 'Osiz Technologies',
      location: 'Madurai, Tamil Nadu',
      period: 'Sep 2021 – Aug 2026',
      about: `Osiz Technologies is a leading software development company specializing in
blockchain solutions, cryptocurrency platforms, and enterprise-grade web/mobile applications.`,
      highlights: [
        'Developed and maintained scalable web apps using React.js, Next.js, Astro and Vite.js, improving performance and UX',
        'Built responsive UI components with HTML, CSS, SCSS and Tailwind CSS ensuring cross-browser compatibility',
        'Contributed to backend development using Node.js, Express.js and MongoDB for seamless API integration',
        'Worked on DeFi and centralized platforms — NFT marketplaces, crypto exchanges, trading systems and prediction apps',
        'Implemented reusable components and optimized frontend architecture for faster load times and scalability',
        'Integrated RESTful APIs and managed complex state for data-driven applications',
        'Performed technical SEO optimization improving rankings, page speed and crawlability',
        'Conducted complete site audits and implemented SEO best practices across multiple projects',
        'Collaborated with designers, backend developers and stakeholders to deliver end-to-end solutions',
        'Mentored junior developers and supported team knowledge sharing and code reviews',
        'Integrated AI-powered features and AI models using Hugging Face, Ollama and other AI APIs',
        'Developed AI-driven tools for content generation, SEO insights, chatbot functionality, AI visibility analysis, website visitor intelligence and social media automation',
      ],
    },
  ],

  projects: [
    {
      name: 'GDC — Global Digital City',
      stack: 'Next.js, Unity WebGL, SEO',
      desc: 'A metaverse web platform with Unity integration similar to Decentraland, enabling browser-based 3D exploration. Built responsive UI, integrated Unity WebGL, and optimized performance and SEO.',
    },
    {
      name: 'Parifi — Crypto Trading Platform',
      stack: 'React.js, Real-Time Data',
      desc: 'A crypto trading platform with real-time data integration, responsive UI and optimized performance for a seamless trading experience.',
    },
    {
      name: 'Afrigomall — E-commerce Platform',
      stack: 'React.js, Crypto Wallet Integration',
      desc: 'An e-commerce platform with crypto wallet integration, enabling users to purchase products using cryptocurrency with a responsive, optimized UI.',
    },
    {
      name: 'Osiz Technologies & Bitdeal Websites',
      stack: 'Next.js, SSR, Technical SEO',
      desc: 'Corporate websites using Next.js with SSR architecture. Implemented server-side rendering, optimized metadata and schema, improving search rankings and page performance.',
    },
    {
      name: 'BlockchainAppsDeveloper & Osiz Labs',
      stack: 'Next.js, SEO, Performance',
      desc: 'Service and product websites built from the ground up with complete technical SEO — structured data, meta tags, Lighthouse score optimization and reusable component architecture.',
    },
    {
      name: 'AI Model Integration',
      stack: 'Next.js, React.js, Ollama AI',
      desc: 'AI-powered features including blog/FAQ generation, AI-driven SEO insights and a real-time AI chatbot. Inspired by platforms like Buffer and SEMrush, focused on scalable frontend architecture.',
    },
    {
      name: 'AI Visibility Tool',
      stack: 'Next.js, AI Integration, SEO',
      desc: 'An AI-powered visibility and analysis platform helping businesses understand and improve their presence across AI-driven search and discovery platforms. Integrated AI models and built scalable dashboards.',
    },
    {
      name: 'Website Visitor Intelligence Tool',
      stack: 'React.js, Next.js, API Integration',
      desc: 'A visitor intelligence platform helping businesses identify, track and analyze website visitor activity. Built responsive dashboards, integrated APIs and created data-driven interfaces.',
    },
    {
      name: 'Social Media Automation Platform',
      stack: 'React.js, Next.js, AI Integration',
      desc: 'A social media automation tool for streamlining content workflows, post management and automation. Built scalable UI components, integrated APIs and explored AI-powered content generation.',
    },
  ],

  services: [
    'Frontend Development — React.js, Next.js and Astro.js for high-performance apps',
    'Blockchain Solutions — NFT marketplaces, crypto exchanges and DeFi platforms',
    'AI Integration — Ollama AI and Hugging Face models, chatbots, automated insights',
    'SEO Optimization — technical SEO, site audits and page speed optimization',
    'Backend Development — scalable REST APIs with Node.js, Express and MongoDB',
    'Responsive UI Design — cross-browser compatibility and seamless UX on all devices',
  ],

  education: [
    { qualification: 'B.E. Civil Engineering', institution: 'Vickram College of Engineering, Sivagangai', period: '2014 – 2018', score: 'GPA 6.5 / 10' },
    { qualification: '12th Grade — Computer Science', institution: 'Dolphin Matriculation HSS, Madurai', period: '2013 – 2014', score: 'GPA 7.0 / 10' },
    { qualification: '10th Grade', institution: 'Dolphin Matriculation HSS, Madurai', period: '2011 – 2012', score: 'GPA 8.0 / 10' },
  ],

  faq: [
    { q: 'Is he available for hire / freelance?', a: 'Yes — open to frontend, full-stack and AI-integration opportunities. Best route is the contact form on this site, or email gsurendar23@gmail.com.' },
    { q: 'What is his strongest skill?', a: 'React.js and Next.js — building scalable, SEO-friendly, high-performance interfaces, with particular depth in blockchain and AI-integrated products.' },
    { q: 'Does he do backend?', a: 'Yes. Node.js, Express.js and MongoDB, with REST API design — largely self-taught and applied on production work at Osiz.' },
    { q: 'Why Civil Engineering to development?', a: 'He holds a B.E. in Civil Engineering but moved into web development through self-driven learning, and has been a professional developer since 2021.' },
    { q: 'How to contact him?', a: 'Email gsurendar23@gmail.com, phone +91 9003633972, or the contact form on this site. He is based in Madurai, Tamil Nadu.' },
  ],
};

/** Compact, token-efficient context block injected into the system prompt. */
export function buildKnowledgeContext() {
  const p = PROFILE;
  const skills = Object.entries(p.skills).map(([k, v]) => `${k}: ${v.join(', ')}`).join('\n');
  const exp = p.experience
    .map((e) => `${e.role} @ ${e.company} (${e.period}, ${e.location})\n${e.about}\nKey work:\n- ${e.highlights.join('\n- ')}`)
    .join('\n\n');
  const projects = p.projects.map((x) => `• ${x.name} [${x.stack}] — ${x.desc}`).join('\n');
  const edu = p.education.map((e) => `• ${e.qualification}, ${e.institution} (${e.period}, ${e.score})`).join('\n');
  const faq = p.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n');

  return `# IDENTITY
Name: ${p.identity.name}
Title: ${p.identity.title} at ${p.identity.company}
Location: ${p.identity.location}
Experience: ${p.identity.experienceYears} years
Email: ${p.identity.email} | Phone: ${p.identity.phone}
LinkedIn: ${p.identity.linkedin}

# SUMMARY
${p.summary}

# SKILLS
${skills}

# EXPERIENCE
${exp}

# PROJECTS
${projects}

# SERVICES
${p.services.map((s) => `• ${s}`).join('\n')}

# EDUCATION
${edu}

# FAQ
${faq}`;
}
