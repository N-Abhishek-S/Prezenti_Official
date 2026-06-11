import { HeroContent } from './HeroContent';
import { HeroMedia } from './HeroMedia';

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="ps-project-hero-title"
      className="relative isolate overflow-hidden bg-canvas pb-12 pt-24 sm:pt-26 md:pb-16 md:pt-29 lg:min-h-[calc(100svh-72px)] lg:pt-29.5"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#FBFDFB_0%,#F2F8F4_48%,#EAF7F5_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_38%,rgba(32,178,170,0.2)_0%,rgba(224,242,229,0.24)_31%,rgba(255,255,255,0)_60%),linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.76)_48%,rgba(255,255,255,0.16)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-white/78" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-primary-200/70 to-transparent" />

      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8 xl:gap-12 desktop-container">
        <div className="min-w-0 w-full">
          <HeroContent />
        </div>
        <div className="min-w-0 w-full">
          <HeroMedia />
        </div>
      </div>
    </section>
  );
}
