import { HeroContent } from './HeroContent';
import { HeroCharacterVideo } from './HeroCharacterVideo';
import { heroRoles } from './heroConfig';
import { useHeroAnimation } from './useHeroAnimation';

export function HeroSection() {
  const { activeRole, isReducedMotion } = useHeroAnimation(heroRoles);

  return (
    <section
      aria-labelledby="ps-project-hero-title"
      className="relative isolate overflow-hidden bg-canvas pt-[104px] pb-12 md:pt-[116px] md:pb-16 lg:min-h-[calc(100svh-72px)] lg:pt-[118px]"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#FBFDFB_0%,#F2F8F4_48%,#EAF7F5_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_46%,rgba(32,178,170,0.18)_0%,rgba(224,242,229,0.26)_30%,rgba(255,255,255,0)_58%),linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.68)_50%,rgba(255,255,255,0.18)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-white/78" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-primary-200/70 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-10 xl:gap-16">
        <HeroContent
          roles={heroRoles}
          activeRole={activeRole}
          isReducedMotion={isReducedMotion}
        />

        <HeroCharacterVideo isReducedMotion={isReducedMotion} />
      </div>
    </section>
  );
}
