/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';
import { ParallaxBackground } from './components/ParallaxBackground';

import { TravelingImage } from './components/TravelingImage';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#BFFF0B] selection:text-black font-sans scroll-smooth relative">
      <ParallaxBackground />
      <Navbar />
      <TravelingImage />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Services />
        <Projects />
        <Skills />
        <Testimonials />
        {/* <Pricing /> */}
        <Contact />
        {/* <Blog /> */}
      </main>
      <Footer />
    </div>
  );
}
