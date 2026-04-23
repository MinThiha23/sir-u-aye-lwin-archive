import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onWatchClick: () => void;
}

const HeroSection = ({ onWatchClick }: HeroSectionProps) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        quoteRef.current,
        { opacity: 0, x: -26 },
        { opacity: 1, x: 0, duration: 1.1 }
      )
        .fromTo(
          portraitRef.current,
          { opacity: 0, x: '18vw', scale: 1.04 },
          { opacity: 1, x: 0, scale: 1, duration: 1.1 },
          '-=0.9'
        )
        .fromTo(
          [badgeRef.current, metaRef.current],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          '-=0.6'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([quoteRef.current, portraitRef.current, metaRef.current, badgeRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(
          quoteRef.current,
          { x: 0, opacity: 1 },
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          portraitRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          metaRef.current,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          badgeRef.current,
          { y: 0, opacity: 1 },
          { y: '-5vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-emerald-900 bg-islamic-pattern"
    >
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(6,78,59,0.5)_100%)]" />

      {/* Right Portrait */}
      <div
        ref={portraitRef}
        className="absolute right-0 top-0 w-full lg:w-[56vw] h-full"
      >
        <div className="relative w-full h-full">
          <img
            src={`/hero_portrait.jpg?v=${Date.now()}`}
            alt="Sir U Aye Lwin"
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient overlay for text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-900/70 to-transparent lg:from-emerald-900/80 lg:via-transparent lg:to-transparent" />
          {/* Soft diagonal fade on left edge */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-emerald-900 to-transparent" />
        </div>
      </div>

      {/* Left Quote Block */}
      <div
        ref={quoteRef}
        className="absolute left-[7vw] top-[15vh] lg:top-[18vh] w-[86vw] lg:w-[42vw] z-10"
      >
        <blockquote className="font-playfair text-2xl sm:text-3xl lg:text-[clamp(32px,3.5vw,52px)] font-semibold text-ivory-50 leading-[1.15] lg:leading-[1.05]">
          {t('hero.quote')}
        </blockquote>
        <div className="mt-4 lg:mt-6 flex flex-col items-start lg:items-end">
          <div className="w-16 lg:w-24 h-0.5 bg-gold-500 mb-3" />
          <cite className="font-playfair text-base lg:text-lg text-ivory-50/80 not-italic">
            {t('hero.citation')}
          </cite>
        </div>
      </div>

      {/* Latest Talk Badge */}
      <div
        ref={badgeRef}
        className="absolute right-6 lg:right-[6vw] top-20 lg:top-[7vh] z-20"
      >
        <span className="inline-block px-3 lg:px-4 py-1.5 bg-gold-500 text-ivory-50 text-xs lg:text-sm font-medium rounded-full label-mono">
          {t('hero.latest_talk')}
        </span>
      </div>

      {/* Bottom Metadata */}
      <div
        ref={metaRef}
        className="absolute left-[7vw] bottom-[8vh] lg:bottom-[10vh] w-[86vw] lg:w-[46vw] z-10"
      >
        <h2 className="font-playfair text-xl sm:text-2xl lg:text-3xl font-semibold text-ivory-50 mb-2">
          Imam Gazali | သိပ္ပံ နှင့် ဒဿနိကဗေဒကို မြှင့်တင်ပေးခဲ့သည့် အီမာမ်ဂဇာလီ သခင်
        </h2>
        <p className="text-sm lg:text-base text-ivory-50/70 mb-4 lg:mb-6">
          Spirituality
        </p>
        <button
          onClick={onWatchClick}
          className="btn-outline group"
        >
          <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          {t('hero.watch_now')}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
