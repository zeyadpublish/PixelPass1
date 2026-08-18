import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Info, ExternalLink } from 'lucide-react';
import { Theme } from '../types';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface GoogleAdBannerProps {
  slotId?: string;
  adClient?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'fluid';
  responsive?: boolean;
  theme?: Theme;
  className?: string;
  label?: string;
}

export const GoogleAdBanner: React.FC<GoogleAdBannerProps> = ({
  slotId = '1234567890',
  adClient = 'ca-pub-5639102643971707',
  format = 'auto',
  responsive = true,
  theme = 'dark',
  className = '',
  label = 'Advertisement',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [showConfigHint, setShowConfigHint] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        // Push ad request safely
        window.adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch (e) {
      console.warn('Google AdSense pushed error or adblocker enabled:', e);
    }
  }, []);

  return (
    <div
      className={`relative w-full rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-3 my-4 ${
        isDark
          ? 'bg-slate-900/60 border-slate-800/80'
          : 'bg-slate-50/80 border-slate-200'
      } ${className}`}
    >
      {/* Top Ad Label */}
      <div className="w-full flex items-center justify-between px-2 pb-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{label} • Google Ad</span>
        </div>
        <button
          type="button"
          onClick={() => setShowConfigHint(!showConfigHint)}
          className="text-[10px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          title="Google Ads Setup Guide"
        >
          <Info className="w-3 h-3" />
          <span className="hidden sm:inline">Ad Setup</span>
        </button>
      </div>

      {/* Config Guide Drawer if clicked */}
      {showConfigHint && (
        <div className={`w-full mb-3 p-3 rounded-xl border text-xs text-left animate-in fade-in space-y-1.5 ${
          isDark
            ? 'bg-slate-950 border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="font-bold flex items-center justify-between">
            <span className="text-emerald-500">Google AdSense / Google Ads Slot</span>
            <button
              onClick={() => setShowConfigHint(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            To connect your live Google AdSense account, update <code className="px-1 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">index.html</code> with your <code className="px-1 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">ca-pub-XXXXXXXXXX</code> Publisher ID from your Google AdSense console.
          </p>
        </div>
      )}

      {/* Google AdSense container */}
      <div className="w-full min-h-[90px] flex items-center justify-center overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />

        {/* Fallback Banner Preview (shown in dev / before ads fill) */}
        <div className="py-4 text-center space-y-1 select-none pointer-events-none">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Google Ad Center Banner Placement (728x90 / Responsive)</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Targeted global electronics & retail pricing sponsors
          </p>
        </div>
      </div>
    </div>
  );
};
