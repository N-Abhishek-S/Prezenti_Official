import { HeroContent } from './HeroContent';
import { HeroMedia } from './HeroMedia';
import { heroRoles } from './heroConfig';

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="ps-project-hero-title"
      className="relative isolate overflow-hidden bg-canvas pb-12 pt-[96px] sm:pt-[104px] md:pb-16 md:pt-[116px] lg:min-h-[calc(100svh-72px)] lg:pt-[118px]"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#FBFDFB_0%,#F2F8F4_48%,#EAF7F5_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_38%,rgba(32,178,170,0.2)_0%,rgba(224,242,229,0.24)_31%,rgba(255,255,255,0)_60%),linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.76)_48%,rgba(255,255,255,0.16)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-white/78" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-primary-200/70 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 xl:gap-16">
        <HeroContent roles={heroRoles} />
        <HeroMedia />
      </div>
    </section>
  );
}
