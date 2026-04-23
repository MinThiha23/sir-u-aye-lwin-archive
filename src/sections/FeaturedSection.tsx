import { useEffect, useRef } from 'react';
import { Play, FileText } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedSectionProps {
  onWatchClick: () => void;
}

const FeaturedSection = ({ onWatchClick }: FeaturedSectionProps) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          portraitRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          cardRef.current,
          { x: '40vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          headlineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(
          ctaRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(
          badgeRef.current,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        );

      // SETTLE (30% - 70%) - hold positions

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          portraitRef.current,
          { x: 0, opacity: 1 },
          { x: '-22vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cardRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          headlineRef.current,
          { y: 0, opacity: 1 },
          { y: -18, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          ctaRef.current,
          { y: 0, opacity: 1 },
          { y: 12, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          badgeRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative w-full min-h-screen bg-emerald-900 bg-islamic-pattern overflow-hidden z-10"
    >
      {/* Left Portrait */}
      <div
        ref={portraitRef}
        className="absolute left-0 top-0 w-full lg:w-[58vw] h-full"
      >
        <div className="relative w-full h-full">
          <img
            src="/featured_portrait.webp"
            alt="Sir U Aye Lwin"
            className="w-full h-full object-cover"
          />
          {/* Mobile gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/50 to-transparent lg:hidden" />
          {/* Right edge fade */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-emerald-900 to-transparent" />
        </div>
      </div>

      {/* Featured Badge */}
      <div
        ref={badgeRef}
        className="absolute left-6 lg:left-[6vw] top-20 lg:top-[7vh] z-20"
      >
        <span className="inline-block px-3 lg:px-4 py-1.5 bg-gold-500 text-ivory-50 text-xs lg:text-sm font-medium rounded-full label-mono">
          {t('featured.badge')}
        </span>
      </div>

      {/* Right Content Card */}
      <div
        ref={cardRef}
        className="absolute bottom-0 lg:bottom-auto lg:left-[58vw] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[36vw] p-6 lg:p-8 z-10"
      >
        <div className="bg-emerald-900/80 lg:bg-emerald-900/55 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-ivory-50/10">
          <h2
            ref={headlineRef}
            className="font-playfair text-2xl sm:text-3xl lg:text-[clamp(28px,2.5vw,40px)] font-semibold text-ivory-50 leading-tight mb-4"
          >
            Imam Gazali | သိပ္ပံ နှင့် ဒဿနိကဗေဒကို မြှင့်တင်ပေးခဲ့သည့် အီမာမ်ဂဇာလီ သခင်
          </h2>

          <div className="w-3/4 h-1 bg-gold-500 mb-4" />

          <p className="text-sm lg:text-base text-ivory-50/80 leading-relaxed mb-4">
            {t('featured.desc')}
          </p>

          <p className="text-sm text-ivory-50/60 mb-6">
            Spirituality
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onWatchClick}
              className="btn-primary group"
            >
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              {t('featured.watch')}
            </button>
            <button className="btn-outline text-sm">
              <FileText className="w-4 h-4 mr-2" />
              {t('featured.transcript')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
