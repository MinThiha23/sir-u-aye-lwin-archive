import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '@/components/Header';
import VideoModal from '@/components/VideoModal';
import IslamicDecorOverlay from '@/components/IslamicDecorOverlay';

import HeroSection from '@/sections/HeroSection';
import FeaturedSection from '@/sections/FeaturedSection';
import AboutSection from '@/sections/AboutSection';
import ArchiveSection from '@/sections/ArchiveSection';
import ThemesSection from '@/sections/ThemesSection';
import NewsletterSection from '@/sections/NewsletterSection';
import ClosingSection from '@/sections/ClosingSection';
import Footer from '@/sections/Footer';

import type { Video } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle video selection
  const handleVideoSelect = useCallback((video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  }, []);

  // Handle watch click from hero/featured
  const handleWatchClick = useCallback(() => {
    const defaultVideo: Video = {
      id: 'featured',
      title: 'Al Haj Khalifah U Aye Lwin - Response of Myanmar Religious Communities',
      date: 'Jul 1, 2021',
      theme: 'Spirituality',
      duration: '21:21',
      youtubeId: '0NYwQAtssQU',
    };
    setSelectedVideo(defaultVideo);
    setIsModalOpen(true);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Scroll to archive section
    const archiveSection = document.getElementById('archive');
    if (archiveSection) {
      archiveSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  }, []);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-emerald-900">
      {/* Decorative Islamic Overlays */}
      <IslamicDecorOverlay />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Header */}
      <Header onSearch={handleSearch} />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - z-0 */}
        <HeroSection onWatchClick={handleWatchClick} />

        {/* Section 2: Featured - z-10 */}
        <FeaturedSection onWatchClick={handleWatchClick} />

        {/* Section 3: About - z-20 */}
        <AboutSection />

        {/* Section 4: Archive - z-30 */}
        <ArchiveSection
          onVideoSelect={handleVideoSelect}
          searchQuery={searchQuery}
        />

        {/* Section 5: Themes - z-40 */}
        <ThemesSection />

        {/* Section 6: Newsletter - z-50 */}
        <NewsletterSection />

        {/* Section 7: Closing - z-60 */}
        <ClosingSection onWatchClick={handleWatchClick} />

        {/* Section 8: Footer - z-70 */}
        <Footer />
      </main>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoId={selectedVideo?.youtubeId || ''}
        title={selectedVideo?.title || ''}
      />
    </div>
  );
}

export default App;
