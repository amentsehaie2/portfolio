import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../animations/FadeIn';
import performanceImg from '../../assets/images/portait.jpg';

export const GetToKnowMeBetter = () => {
  return (
    <section className="relative z-10 border-y border-white/5 bg-dark/90 px-4 py-20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn direction="right">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,153,255,0.1)]">
            <img
              src={performanceImg}
              alt="Amen Tsehaie playing guitar during a live performance"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.15}>
          <div className="max-w-xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">Beyond the portfolio</p>
            <h2 className="mb-5 text-3xl font-light md:text-5xl">
              Get to know me <span className="font-semibold text-primary">better</span>
            </h2>
            <p className="text-lg leading-relaxed text-white/65">
              Discover the lessons, ideas, and experiences behind my development, home recording, guitar, and audio work.
            </p>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-secondary hover:shadow-[0_0_15px_rgba(0,153,255,0.5)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
            >
              Read my blog
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
