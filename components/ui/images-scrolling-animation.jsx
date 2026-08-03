"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import ReactLenis from "lenis/react"
import { useRef } from "react"

const StickyCard = ({ i, title, src, progress, range, targetScale }) => {
  const container = useRef(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 15 + 200}px)`,
        }}
        className="relative -top-1/4 flex origin-top flex-col overflow-hidden rounded-2xl sm:rounded-3xl
                   h-[200px] w-[280px]
                   sm:h-[240px] sm:w-[360px]
                   md:h-[280px] md:w-[420px]
                   lg:h-[300px] lg:w-[500px]"
      >
        <img
          src={src || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
        />
        {/* Caption overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-white font-semibold text-base sm:text-lg leading-snug">{title}</p>
        </div>
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = ({ projects }) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center
                   pb-[50vh] pt-[5vh]
                   sm:pb-[60vh] sm:pt-[8vh]
                   lg:pb-[70vh] lg:pt-[10vh]"
      >
        {projects.map((project, i) => {
          const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.08)
          return (
            <StickyCard
              key={`p_${i}`}
              i={i}
              title={project.title}
              src={project.img}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
            />
          )
        })}
      </main>
    </ReactLenis>
  )
}

export { ImagesScrollingAnimation, StickyCard }
