import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const topics = [
  { name: 'Spirituality', count: 45 },
  { name: 'Ethics', count: 38 },
  { name: 'Interfaith', count: 27 },
  { name: 'Family', count: 32 },
  { name: 'Society', count: 41 },
];

const ThemesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);

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
          { x: '-70vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none' },
          0
        )
        .fromTo(
          contentRef.current?.querySelectorAll('.content-item') || [],
          { x: '30vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        )
        .fromTo(
          topicsRef.current?.querySelectorAll('.topic-item') || [],
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          portraitRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          contentRef.current,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          topicsRef.current?.querySelectorAll('.topic-item') || [],
          { y: 0, opacity: 1 },
          { y: -10, opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          lineRef.current,
          { scaleY: 1, opacity: 1 },
          { scaleY: 0.8, opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-emerald-900 z-40"
    >
      {/* Left Portrait */}
      <div
        ref={portraitRef}
        className="absolute left-0 top-0 w-full lg:w-[52vw] h-full"
      >
        <div className="relative w-full h-full">
          <img
            src="/U-Aye-Lwin-copy1.jpg"
            alt="Sir U Aye Lwin"
            className="w-full h-full object-cover"
          />
          {/* Mobile gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/60 to-transparent lg:hidden" />
          {/* Right edge fade */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-emerald-900 to-transparent" />
        </div>
      </div>

      {/* Gold Vertical Line */}
      <div
        ref={lineRef}
        className="hidden lg:block absolute left-[56vw] top-[18vh] bottom-[18vh] w-0.5 bg-gold-500 origin-top"
      />

      {/* Right Content */}
      <div
        ref={contentRef}
        className="absolute bottom-0 lg:bottom-auto lg:left-[58vw] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[36vw] p-6 lg:p-8 z-10"
      >
        <div className="bg-emerald-900/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-2xl lg:rounded-none p-6 lg:p-0 border border-ivory-50/10 lg:border-none">
          <h2 className="content-item font-playfair text-3xl lg:text-[clamp(34px,3vw,48px)] font-semibold text-ivory-50 mb-4">
            Themes & Topics
          </h2>

          <p className="content-item text-base lg:text-lg text-ivory-50/70 mb-8">
            Choose a path that matches your questions—then listen deeply.
          </p>

          {/* Topic List */}
          <div ref={topicsRef} className="space-y-3 lg:space-y-4 mb-8">
            {topics.map((topic, index) => (
              <a
                key={index}
                href="#archive"
                className="topic-item group flex items-center justify-between p-4 bg-emerald-800/40 hover:bg-emerald-800/70 rounded-xl transition-all duration-300"
              >
                <span className="font-playfair text-lg lg:text-xl text-ivory-50 group-hover:text-gold-400 transition-colors">
                  {topic.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-ivory-50/50">
                    {topic.count} talks
                  </span>
                  <ArrowRight className="w-5 h-5 text-ivory-50/50 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
          </div>

          <a
            href="#archive"
            className="content-item btn-primary inline-flex"
          >
            Explore the archive
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
