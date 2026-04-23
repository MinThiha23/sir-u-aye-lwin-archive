import { useEffect, useRef } from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        columnsRef.current?.querySelectorAll('.footer-column') || [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: t('nav.archive'), href: '#archive' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.themes'), href: '#archive' },
    { label: t('nav.newsletter'), href: '#contact' },
    { label: t('nav.privacy'), href: '#' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-emerald-900 bg-islamic-pattern border-t border-emerald-800 z-[70]"
    >
      <div ref={columnsRef} className="w-full px-6 lg:px-[7vw] py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Logo & Tagline */}
          <div className="footer-column">
            <a href="#home" className="inline-block mb-4">
              <span className="font-playfair text-xl lg:text-2xl font-semibold text-ivory-50">
                {t('header.title')}
              </span>
            </a>
            <p className="text-ivory-50/70 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="text-ivory-50/50 text-xs mt-4">
              {t('footer.desc')}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-column">
            <h4 className="label-mono text-ivory-50/50 mb-4">{t('footer.nav')}</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-ivory-50/70 hover:text-ivory-50 transition-colors text-sm inline-flex items-center group"
                >
                  {link.label}
                  {link.href === '#' && (
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="label-mono text-ivory-50/50 mb-4">{t('footer.contact')}</h4>
            <a
              href="mailto:talks@siruayelwin.org"
              className="text-ivory-50/70 hover:text-ivory-50 transition-colors text-sm inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              talks@siruayelwin.org
            </a>
            <p className="text-ivory-50/50 text-xs mt-4">
              {t('footer.inquiries')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory-50/50 text-xs">
            &copy; {new Date().getFullYear()} {t('header.title')}. {t('footer.rights')}
          </p>
          <a
            href="#"
            className="text-ivory-50/40 hover:text-ivory-50/60 transition-colors text-xs"
          >
            {t('footer.credits')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
