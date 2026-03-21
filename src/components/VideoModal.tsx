import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

const VideoModal = ({ isOpen, onClose, videoId, title }: VideoModalProps) => {
  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-5xl bg-emerald-900 rounded-2xl overflow-hidden shadow-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-emerald-800">
          <h3 className="font-playfair text-base lg:text-lg text-ivory-50 truncate pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-ivory-50/60 hover:text-ivory-50 hover:bg-emerald-800 rounded-full transition-all flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        <div className="px-4 lg:px-6 py-3 bg-emerald-900">
          <p className="text-sm text-ivory-50/60">
            Press <kbd className="px-2 py-0.5 bg-emerald-800 rounded text-xs">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
