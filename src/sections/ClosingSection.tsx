import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  onWatchClick: () => void;
}

const ClosingSection = ({ onWatchClick }: ClosingSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          portraitRef.current,
          { y: '40vh', opacity: 0, scale: 1.06 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(
          messageRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          portraitRef.current,
          { y: 0, opacity: 1 },
          { y: '-12vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          messageRef.current,
          { y: 0, opacity: 1 },
          { y: -10, opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-emerald-900 bg-islamic-pattern z-[60]"
    >
      {/* Circular Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,78,59,0.6)_100%)]" />

      {/* Center Portrait */}
      <div
        ref={portraitRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-[70vh] lg:h-[78vh] aspect-[3/4]"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <img
            src="/closing_portrait.jpg"
            alt="Sir U Aye Lwin"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 via-transparent to-emerald-900/20" />
        </div>
      </div>

      {/* Closing Message */}
      <div
        ref={messageRef}
        className="absolute left-1/2 bottom-[12vh] lg:bottom-[15vh] -translate-x-1/2 w-[90vw] lg:w-[70vw] text-center z-10"
      >
        <h2 className="font-playfair text-2xl sm:text-3xl lg:text-[clamp(28px,2.5vw,42px)] font-semibold text-ivory-50 mb-6">
          Thank you for listening with an open heart.
        </h2>
        <button
          onClick={onWatchClick}
          className="btn-primary"
        >
          <Play className="w-4 h-4 mr-2" />
          Start with the latest talk
        </button>
      </div>
    </section>
  );
};

export default ClosingSection;
