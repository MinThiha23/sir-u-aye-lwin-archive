import { useState, useEffect, useRef } from 'react';
import { Youtube, Facebook, Podcast, Send, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Podcast, label: 'Spotify', href: '#' },
];

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column
      gsap.fromTo(
        leftRef.current?.querySelectorAll('.animate-item') || [],
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Right column (card)
      gsap.fromTo(
        rightRef.current,
        { x: '4vw', opacity: 0, rotate: 0.5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Social icons
      gsap.fromTo(
        socialsRef.current?.querySelectorAll('.social-icon') || [],
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setName('');
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-ivory-50 py-16 lg:py-24 z-50"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column */}
          <div ref={leftRef}>
            <h2 className="animate-item font-playfair text-3xl lg:text-[clamp(34px,3vw,48px)] font-semibold text-gray-900 mb-4">
              Join the Community
            </h2>

            <p className="animate-item text-base lg:text-lg text-gray-700 mb-8">
              Get one reflection a week plus early access to new talks.
            </p>

            {/* Social Links */}
            <div ref={socialsRef}>
              <p className="animate-item text-sm text-gray-500 mb-4 label-mono">
                FOLLOW ON
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center text-ivory-50 hover:bg-gold-500 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Subscription Card */}
          <div
            ref={rightRef}
            className="bg-emerald-900 rounded-2xl p-6 lg:p-8 shadow-card"
          >
            <h3 className="font-playfair text-xl lg:text-2xl text-ivory-50 mb-6">
              Subscribe
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <p className="text-ivory-50 text-lg font-medium">
                  Thank you for subscribing!
                </p>
                <p className="text-ivory-50/60 text-sm mt-2">
                  You&apos;ll receive our next reflection soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-ivory-50/70 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-emerald-800/50 border border-emerald-700 rounded-xl text-ivory-50 placeholder:text-ivory-50/40 focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-ivory-50/70 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-emerald-800/50 border border-emerald-700 rounded-xl text-ivory-50 placeholder:text-ivory-50/40 focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary mt-2"
                >
                  Get updates
                  <Send className="w-4 h-4 ml-2" />
                </button>

                <p className="text-xs text-ivory-50/50 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
