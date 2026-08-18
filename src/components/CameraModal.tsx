import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
  language: Language;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  language,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (!isOpen) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    let isMounted = true;

    async function startCamera() {
      setError(null);
      try {
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (isMounted) {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        }
      } catch (err: any) {
        console.error('Camera access error:', err);
        if (isMounted) {
          setError(
            err.name === 'NotAllowedError'
              ? 'Camera permission was denied. Please allow camera access in browser settings.'
              : 'Could not initialize camera on this device.'
          );
        }
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isOpen, facingMode]);

  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }

    onCapture(dataUrl);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col text-white">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">
              {language === 'ar' ? 'تصوير المنتج أو السعر' : 'Live Product Viewfinder'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder area */}
        <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-rose-400 space-y-2 text-xs">
              <AlertCircle className="w-8 h-8 mx-auto text-rose-500" />
              <p>{error}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Overlay Guide */}
              <div className="absolute inset-8 border-2 border-dashed border-emerald-400/50 rounded-2xl pointer-events-none flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400 absolute -top-1 -left-1" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400 absolute -top-1 -right-1" />
                <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400 absolute -bottom-1 -left-1" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400 absolute -bottom-1 -right-1" />
                <span className="text-[11px] text-white/80 bg-black/60 px-3 py-1 rounded-full font-medium shadow">
                  {language === 'ar' ? 'وجّه الكاميرا نحو المنتج أو علامة السعر' : 'Align product or price tag'}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-5 flex items-center justify-between gap-4 bg-slate-950">
          <button
            type="button"
            onClick={toggleFacingMode}
            className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-bold"
            title="Flip camera"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'ar' ? 'تبديل الكاميرا' : 'Flip'}</span>
          </button>

          <button
            type="button"
            onClick={handleCapture}
            disabled={!!error}
            className="flex-1 py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Camera className="w-5 h-5" />
            <span>{language === 'ar' ? 'التقاط الصورة' : 'Snap & Analyze'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold"
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};
