import React, { useState, useEffect } from 'react';
import { X, MapPin, Navigation, Compass, ExternalLink, Copy, Check } from 'lucide-react';

const VENUES = {
  groom: {
    id: 'groom',
    badge: "🤵 Groom Side Venue (वर पक्ष)",
    title: "Vill. Nandha Ki Dhani",
    hindiTitle: "नंधा की ढाणी, बाढड़ा (चरखी दादरी)",
    hosts: "Capt. Satyavir Singh & Luhach Family",
    address: "Village Nandha Ki Dhani, Post & Tehsil Badhra, District Charkhi Dadri, Haryana — 127308",
    googleMapsUrl: "https://maps.app.goo.gl/FjTdPRhqZYVkGC3H7",
    appleMapsUrl: "https://maps.apple.com/place?auid=3148492795012671499&address=Nanda+Ki+Dhani%2C+Badhra%2C+Charkhi+Dadri%2C+127308%2C+Haryana%2C+India&coordinate=28.443545%2C75.929158&name=Nanda+Ki+Dhani&lsp=7618",
    events: "16 Nov: Haldi • 17 Nov: Sangeet • 19 Nov: Bhaat & Lagan • 20 Nov: Ghurchhari & Barat",
    landmark: "Near Badhra (~6 KM) • Satnali (~10 KM)",
  },
  bride: {
    id: 'bride',
    badge: "👰 Bride Side Venue (वधू पक्ष)",
    title: "Aryanagar (आर्यनगर)",
    hindiTitle: "आर्य नगर, तहसील बाढड़ा (चरखी दादरी)",
    hosts: "Shri Jagvir Singh Sheoran & Sheoran Family",
    address: "Arya Nagar, Post & Tehsil Badhra, Distt. Charkhi Dadri (Haryana) — 127306",
    googleMapsUrl: "https://www.google.com/maps?q=28.507679,75.865814",
    appleMapsUrl: "https://maps.apple.com/place?auid=3216818283696923002&address=Arya+Nagar%2C+Badhra%2C+Charkhi+Dadri%2C+127308%2C+Haryana%2C+India&coordinate=28.508183%2C75.864421&name=Arya+Nagar&lsp=6489",
    events: "16 Nov: Ban & Haldi • 18 Nov: Mehndi • 20 Nov: Bhaat, Mandap Pujan & Vivah",
    landmark: "Arya Nagar, Badhra Tehsil Main Area",
  },
};

export default function LocationModal({ isOpen, onClose, initialSide = 'groom', t }) {
  const [activeSide, setActiveSide] = useState(initialSide);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveSide(initialSide || 'groom');
      setCopied(false);
    }
  }, [isOpen, initialSide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentVenue = VENUES[activeSide] || VENUES.groom;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentVenue.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl glass-wedding-card rounded-3xl border-2 border-[var(--border-gold)] shadow-2xl overflow-hidden flex flex-col text-left"
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 py-4 bg-[var(--bg-elevated)] border-b border-[var(--border-gold)] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-gold)] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight">
                {t?.locations?.badge || "Venue Map & Navigation"}
              </h3>
              <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                Choose Google Maps or Apple Maps for exact navigation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent-gold)] text-[var(--text-primary)] hover:text-white transition-all shadow-sm cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side Tabs (Groom Venue vs Bride Venue) */}
        <div className="px-6 pt-4 pb-2 bg-[var(--bg-elevated)]/60 border-b border-[var(--border-gold)]/50 flex space-x-2">
          <button
            type="button"
            onClick={() => setActiveSide('groom')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeSide === 'groom'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-gold)]/60'
            }`}
          >
            <span>🤵 Groom Side (वर)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSide('bride')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeSide === 'bride'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-gold)]/60'
            }`}
          >
            <span>👰 Bride Side (वधू)</span>
          </button>
        </div>

        {/* Modal Body / Venue Details */}
        <div className="p-6 space-y-5">
          {/* Venue Card */}
          <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {currentVenue.badge}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                {currentVenue.landmark}
              </span>
            </div>

            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                {currentVenue.title}
              </h4>
              <p className="font-hindi text-sm text-[var(--accent-primary)] font-semibold mt-0.5">
                {currentVenue.hindiTitle}
              </p>
              <p className="text-xs font-semibold text-[var(--text-secondary)] mt-1 font-sans">
                {currentVenue.hosts}
              </p>
            </div>

            {/* Address */}
            <div className="pt-2 border-t border-[var(--border-gold)]/60 flex items-start space-x-2 text-xs text-[var(--text-primary)] leading-relaxed">
              <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
              <span>{currentVenue.address}</span>
            </div>

            {/* Functions Info */}
            <p className="text-[11px] text-[var(--text-muted)] pt-1">
              🎉 <strong>Programs:</strong> {currentVenue.events}
            </p>
          </div>

          {/* Navigation Option Buttons: Google Maps & Apple Maps */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center">
              Select Navigation App
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Google Maps Option */}
              <a
                href={currentVenue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
              </a>

              {/* Apple Maps Option */}
              <a
                href={currentVenue.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-neutral-900 hover:bg-black text-white border border-neutral-700 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Apple Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
              </a>
            </div>
          </div>

          {/* Copy Address Utility */}
          <div className="pt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-all shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Copy Full Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
