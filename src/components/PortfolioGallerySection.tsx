import { ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { RadialScrollGallery } from './ui/portfolio-and-image-gallery';


const projects = [
  { id:1,
    title: 'GDC — Global Digital City',
    cat: 'Next.js, Unity WebGL, SEO',
    img: 'https://picsum.photos/seed/gdc/800/600'
  },
  { id:2,
    title: 'Parifi — Crypto Trading Platform',
    cat: 'React.js, Real-Time Data',
    img: 'https://picsum.photos/seed/parifi/800/600'
  },
  {id:3,
    title: 'Afrigomall — E-commerce Platform',
    cat: 'React.js, Crypto Wallet',
    img: 'https://picsum.photos/seed/afrigo/800/600'
  },
  {id:4,
    title: 'AI Model Integration',
    cat: 'Next.js, Ollama AI',
    img: 'https://picsum.photos/seed/aimodel/800/600'
  },
    {id:5,
    title: 'Osiz — AI-Powered Platform',
    cat: 'Next.js, nodejs, seo',
    img: 'https://picsum.photos/seed/aimodel/800/600'
  },
];
export function PortfolioGallerySection() {
  return (
    <section id="portfolio" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full">
        <div className="mb-8 flex flex-col gap-3 text-center sm:text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            Latest work
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Explore My Popular Projects
          </h2>
     
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-transparent">
      

          <RadialScrollGallery
            className="!min-h-[750px] sm:!min-h-[850px] lg:!min-h-[900px]"
            baseRadius={650}
            mobileRadius={380}
            visiblePercentage={50}
            scrollDuration={2200}
          >
            {(hoveredIndex) =>
              projects.map((project, index) => {
                const isActive = hoveredIndex === index;
                return (
                  <div
                    key={project.id}
                    className="group relative h-[380px] w-[280px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-zinc-900 shadow-2xl sm:h-[480px] sm:w-[360px] md:h-[520px] md:w-[400px] lg:h-[580px] lg:w-[450px]"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                          isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="bg-black/70 px-2 py-0 text-[10px] backdrop-blur">
                          {project.cat}
                        </Badge>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground transition-all duration-500 ${
                            isActive ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
                          }`}
                        >
                          <ArrowUpRight size={12} />
                        </div>
                      </div>

                      <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                        <h4 className="text-xl font-semibold leading-tight text-white">{project.title}</h4>
                        <div
                          className={`mt-2 h-0.5 bg-primary transition-all duration-500 ${
                            isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </RadialScrollGallery>

        
        </div>
      </div>
    </section>
  );
}
