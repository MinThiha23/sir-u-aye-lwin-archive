import { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Clock, Calendar, Tag } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Video, Theme } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ArchiveSectionProps {
  onVideoSelect: (video: Video) => void;
  searchQuery?: string;
}

import { supabase } from '@/lib/supabase';

const themes: Theme[] = [
  'All',
  'Latest Talks',
  'Most Popular',
  'Spirituality',
  'Ethics',
  'Interfaith',
  'Family',
  'Society',
];

const ArchiveSection = ({ onVideoSelect, searchQuery }: ArchiveSectionProps) => {
  const [videosData, setVideosData] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState<Theme>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter videos based on theme and search query
  const filteredVideos = useMemo(() => {
    let filtered = videosData;

    // Filter by theme
    if (activeTheme === 'Latest Talks') {
      filtered = filtered.slice(0, 4);
    } else if (activeTheme === 'Most Popular') {
      filtered = [...filtered].sort(() => Math.random() - 0.5).slice(0, 4);
    } else if (activeTheme !== 'All') {
      filtered = filtered.filter((v) => v.theme === activeTheme);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.theme.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTheme, searchQuery, videosData]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching videos:', error);
          return;
        }

        if (data) {
          // Map database structure to our Video type if necessary,
          // assuming exact match for now based on the instructed schema.
          // Note: using explicit type casting for mapped elements to ensure Video[]
          const mappedVideos: Video[] = data.map((item: any) => ({
            id: String(item.id),
            title: item.title,
            date: item.date,
            theme: item.theme as Theme,
            duration: item.duration,
            youtubeId: item.youtubeId || item.youtubeID // Handle potential casing typos in Supabase
          }));
          setVideosData(mappedVideos);
        }
      } catch (err) {
        console.error('Failed to fetch from Supabase', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Pills animation
      gsap.fromTo(
        pillsRef.current?.querySelectorAll('.theme-pill') || [],
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Grid cards animation
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.video-card') || [],
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll('.video-card'),
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        }
      );
    }
  }, [filteredVideos]);

  return (
    <section
      ref={sectionRef}
      id="archive"
      className="relative w-full min-h-screen bg-emerald-900 bg-islamic-pattern py-16 lg:py-24 z-30"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <h2 className="font-playfair text-3xl lg:text-[clamp(34px,3vw,48px)] font-semibold text-ivory-50 mb-4">
            Knowledge Archive
          </h2>
          <p className="text-base lg:text-lg text-ivory-50/70">
            Browse talks by theme, length, and topic.
          </p>
        </div>

        {/* Topic Bar */}
        <div
          ref={pillsRef}
          className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-10 lg:mb-14"
        >
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`theme-pill px-4 lg:px-5 py-2 text-sm font-medium rounded-pill transition-all duration-300 ${activeTheme === theme
                ? 'bg-gold-500 text-white'
                : 'bg-emerald-800/60 text-ivory-50/80 hover:bg-emerald-800 hover:text-ivory-50'
                }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {isLoading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-20 flex justify-center">
              <div className="w-10 h-10 border-4 border-emerald-800 border-t-gold-500 rounded-full animate-spin" />
            </div>
          ) : (
            filteredVideos.map((video) => (
              <div
                key={video.id}
                className="video-card group cursor-pointer"
                onClick={() => onVideoSelect(video)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-emerald-800 mb-4">
                  {/* YouTube Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to high quality if maxres isn't available
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gold-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-6 h-6 lg:w-7 lg:h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded text-xs text-ivory-50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>

                  {/* Theme badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-emerald-900/80 rounded text-xs text-ivory-50/90">
                    {video.theme}
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-2">
                  <h3 className="font-playfair text-lg lg:text-xl font-semibold text-ivory-50 group-hover:text-gold-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-ivory-50/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {video.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {video.theme}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty state */}
        {filteredVideos.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <p className="text-ivory-50/60 text-lg">
              No talks found matching your criteria.
            </p>
            <button
              onClick={() => setActiveTheme('All')}
              className="mt-4 text-gold-500 hover:text-gold-400 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Load More */}
        {!isLoading && filteredVideos.length > 0 && filteredVideos.length < videosData.length && activeTheme === 'All' && (
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load more talks
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArchiveSection;
