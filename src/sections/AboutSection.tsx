import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TimelineItem, Credential } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const timelineData: TimelineItem[] = [
    {
      year: '1992',
      title: t('timeline.1.title'),
      description: t('timeline.1.desc'),
    },
    {
      year: '2005',
      title: t('timeline.2.title'),
      description: t('timeline.2.desc'),
    },
    {
      year: '2015',
      title: t('timeline.3.title'),
      description: t('timeline.3.desc'),
    },
    {
      year: '2022',
      title: t('timeline.4.title'),
      description: t('timeline.4.desc'),
    },
  ];

  const credentialsData: Credential[] = [
    { value: '30+', label: t('cred.1') },
    { value: '200+', label: t('cred.2') },
    { value: '12', label: t('cred.3') },
    { value: '3', label: t('cred.4') },
  ];
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait animation
      gsap.fromTo(
        portraitRef.current,
        { x: '-6vw', opacity: 0, scale: 1.03 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline items
      gsap.fromTo(
        timelineRef.current?.querySelectorAll('.timeline-item') || [],
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Credentials
      gsap.fromTo(
        credentialsRef.current?.querySelectorAll('.credential-card') || [],
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: credentialsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-ivory-50 py-16 lg:py-24 z-20"
    >
      {/* Decorative top band */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-900 via-gold-500 to-emerald-900" />

      <div className="w-full px-6 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Portrait */}
          <div ref={portraitRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
              <img
                src={`/about_portrait.jpg?v=${Date.now()}`}
                alt="Sir U Aye Lwin"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote overlay */}
            <div className="mt-6 lg:mt-8 p-6 bg-emerald-900/5 rounded-xl border-l-4 border-gold-500">
              <p className="font-playfair text-lg lg:text-xl text-gray-800 italic">
                {t('about.quote')}
              </p>
              <p className="mt-3 text-sm text-gray-600">— Sir U Aye Lwin</p>
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef}>
            <h2 className="animate-item font-playfair text-3xl lg:text-[clamp(34px,3vw,48px)] font-semibold text-gray-900 mb-6">
              {t('about.title')}
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="animate-item">
                {t('about.p1')}
              </p>
              <p className="animate-item">
                {t('about.p2')}
              </p>
              <p className="animate-item">
                {t('about.p3')}
              </p>
            </div>

            {/* Timeline */}
            <div ref={timelineRef} className="mt-10 lg:mt-12">
              <h3 className="animate-item font-playfair text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                {t('about.journey')}
              </h3>

              <div className="relative pl-6 lg:pl-8">
                {/* Timeline line */}
                <div
                  ref={lineRef}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-500 origin-top"
                />

                {/* Timeline items */}
                <div className="space-y-6 lg:space-y-8">
                  {timelineData.map((item, index) => (
                    <div key={index} className="timeline-item relative">
                      {/* Dot */}
                      <div className="absolute -left-6 lg:-left-8 top-1 w-3 h-3 bg-gold-500 rounded-full border-2 border-ivory-50 -translate-x-px" />

                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <span className="font-mono text-sm text-gold-600 font-medium">
                          {item.year}
                        </span>
                        <h4 className="font-playfair text-lg font-semibold text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div ref={credentialsRef} className="mt-16 lg:mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {credentialsData.map((cred, index) => (
              <div
                key={index}
                className="credential-card bg-emerald-900 rounded-xl p-6 lg:p-8 text-center"
              >
                <div className="font-playfair text-3xl lg:text-4xl font-bold text-gold-500 mb-2">
                  {cred.value}
                </div>
                <div className="text-sm text-ivory-50/80 label-mono">
                  {cred.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
