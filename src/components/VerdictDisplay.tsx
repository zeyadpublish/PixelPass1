import React from 'react';
import {
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { PriceAnalysisResult, PriceVerdict, Theme } from '../types';
import { formatPrice } from '../utils/currencies';
import { Language, TRANSLATIONS } from '../utils/translations';

interface VerdictDisplayProps {
  result: PriceAnalysisResult;
  language: Language;
  theme?: Theme;
}

export const VerdictDisplay: React.FC<VerdictDisplayProps> = ({ result, language, theme = 'dark' }) => {
  const {
    productName,
    brand,
    modelOrVariant,
    category,
    condition,
    detectedLocalPrice,
    inputCurrency,
    verdict,
    verdictHeadline,
    verdictHeadlineAr,
    verdictScore,
    fairPriceRange,
    fairPriceRangeUSD,
    priceDifferencePercentage,
    confidenceScore,
    summary,
    summaryAr,
  } = result;

  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  const getVerdictStyle = (v: PriceVerdict) => {
    switch (v) {
      case 'GREAT_DEAL':
        return {
          badgeBg: 'bg-emerald-500 text-slate-950',
          cardBorder: isDark ? 'border-emerald-500/40' : 'border-emerald-300',
          accentColor: isDark ? 'text-emerald-400' : 'text-emerald-600',
          icon: Flame,
          label: t.verdictGreatDeal,
        };
      case 'FAIR_PRICE':
        return {
          badgeBg: 'bg-teal-500 text-slate-950',
          cardBorder: isDark ? 'border-teal-500/40' : 'border-teal-300',
          accentColor: isDark ? 'text-teal-400' : 'text-teal-600',
          icon: CheckCircle2,
          label: t.verdictFairPrice,
        };
      case 'SLIGHTLY_HIGH':
        return {
          badgeBg: 'bg-amber-500 text-slate-950',
          cardBorder: isDark ? 'border-amber-500/40' : 'border-amber-300',
          accentColor: isDark ? 'text-amber-400' : 'text-amber-600',
          icon: AlertTriangle,
          label: t.verdictSlightlyHigh,
        };
      case 'OVERPRICED':
        return {
          badgeBg: 'bg-rose-500 text-white',
          cardBorder: isDark ? 'border-rose-500/40' : 'border-rose-300',
          accentColor: isDark ? 'text-rose-400' : 'text-rose-600',
          icon: TrendingUp,
          label: t.verdictOverpriced,
        };
      case 'SUSPICIOUSLY_CHEAP':
        return {
          badgeBg: 'bg-purple-500 text-white',
          cardBorder: isDark ? 'border-purple-500/40' : 'border-purple-300',
          accentColor: isDark ? 'text-purple-400' : 'text-purple-600',
          icon: AlertTriangle,
          label: t.verdictSuspicious,
        };
      default:
        return {
          badgeBg: 'bg-slate-500 text-white',
          cardBorder: isDark ? 'border-slate-700' : 'border-slate-300',
          accentColor: isDark ? 'text-slate-400' : 'text-slate-500',
          icon: Info,
          label: t.detectionResult,
        };
    }
  };

  const style = getVerdictStyle(verdict);
  const VerdictIcon = style.icon;

  const minVal = fairPriceRange.min * 0.7;
  const maxVal = fairPriceRange.max * 1.3;
  const userPriceClamped = Math.max(minVal, Math.min(maxVal, detectedLocalPrice));
  const pointerPercentage = Math.max(5, Math.min(95, ((userPriceClamped - minVal) / (maxVal - minVal)) * 100));
  const fairBandStart = Math.max(5, ((fairPriceRange.min - minVal) / (maxVal - minVal)) * 100);
  const fairBandWidth = Math.max(10, ((fairPriceRange.max - fairPriceRange.min) / (maxVal - minVal)) * 100);

  const displayHeadline = (language === 'ar' && verdictHeadlineAr) ? verdictHeadlineAr : verdictHeadline;
  const displaySummary = (language === 'ar' && summaryAr) ? summaryAr : summary;

  return (
    <div
      id="verdict-display-card"
      className={`rounded-3xl border p-6 sm:p-8 transition-all duration-300 shadow-xl space-y-6 ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Product Header Row */}
      <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 border-b pb-6 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${
              isDark ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}>
              {brand}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}>
              {category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}>
              {condition}
            </span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {productName}
          </h2>

          {modelOrVariant && (
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Model: {modelOrVariant}
            </p>
          )}
        </div>

        {/* Status Badge & Value Score */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-sm ${style.badgeBg}`}>
            <VerdictIcon className="w-4 h-4" />
            <span>{style.label}</span>
          </div>

          <div className={`p-3 rounded-2xl border text-center shadow-sm ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-[10px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Score</div>
            <div className={`text-xl font-black ${style.accentColor}`}>{verdictScore}/100</div>
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="space-y-2">
        <h3 className={`text-lg sm:text-xl font-black leading-snug ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {displayHeadline}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          {displaySummary}
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Metric 1 */}
        <div className={`border rounded-2xl p-5 flex flex-col justify-between shadow-sm ${
          isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <span className={`text-xs font-black uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {t.priceEvaluated}
          </span>
          <div className="mt-2">
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatPrice(detectedLocalPrice, inputCurrency)}
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {language === 'ar' ? 'السعر المفحوص محلياً' : 'Local listing price'}
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className={`border rounded-2xl p-5 flex flex-col justify-between shadow-sm ${
          isDark ? 'bg-slate-950/90 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              {t.worldFairMedian}
            </span>
            <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div className="mt-2">
            <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {formatPrice(fairPriceRange.typical, inputCurrency)}
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ≈ ${fairPriceRangeUSD.typical.toLocaleString()} USD Baseline
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className={`border rounded-2xl p-5 flex flex-col justify-between shadow-sm ${
          isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <span className={`text-xs font-black uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {t.priceDisparity}
          </span>
          <div className="mt-2">
            <div className="flex items-center gap-1.5">
              {priceDifferencePercentage < 0 ? (
                <div className="flex items-center text-2xl sm:text-3xl font-black text-emerald-400">
                  <TrendingDown className="w-6 h-6 mr-1" />
                  {Math.abs(priceDifferencePercentage)}%
                </div>
              ) : priceDifferencePercentage > 0 ? (
                <div className={`flex items-center text-2xl sm:text-3xl font-black ${
                  priceDifferencePercentage > 20
                    ? isDark ? 'text-rose-400' : 'text-rose-600'
                    : isDark ? 'text-amber-400' : 'text-amber-600'
                }`}>
                  <TrendingUp className="w-6 h-6 mr-1" />
                  +{priceDifferencePercentage}%
                </div>
              ) : (
                <div className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                  0%
                </div>
              )}
            </div>
            <div className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {priceDifferencePercentage < 0
                ? t.cheaperThanWorld
                : priceDifferencePercentage > 0
                ? t.higherThanWorld
                : t.exactWorldMedian}
            </div>
          </div>
        </div>
      </div>

      {/* Spectrum Meter */}
      <div className={`border rounded-2xl p-5 space-y-3 ${
        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between text-xs">
          <span className={`font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.fairSpectrum} ({inputCurrency})
          </span>
          <span className={isDark ? 'text-slate-300' : 'text-slate-500'}>
            Fair: <strong className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{formatPrice(fairPriceRange.min, inputCurrency)}</strong> — <strong className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{formatPrice(fairPriceRange.max, inputCurrency)}</strong>
          </span>
        </div>

        <div className="relative pt-6 pb-2">
          <div className={`h-3 w-full rounded-full relative overflow-hidden flex ${
            isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`}>
            <div className="h-full bg-cyan-600/70" style={{ width: `${fairBandStart}%` }} />
            <div className="h-full bg-emerald-500 shadow-inner" style={{ width: `${fairBandWidth}%` }} />
            <div className="h-full bg-rose-600/70 flex-1" />
          </div>

          <div
            className="absolute top-0 flex flex-col items-center -translate-x-1/2 transition-all duration-500"
            style={{ left: `${pointerPercentage}%` }}
          >
            <div className={`px-2.5 py-0.5 rounded font-black text-[10px] shadow border ${
              isDark ? 'bg-white text-slate-950 border-slate-300' : 'bg-slate-950 text-white border-slate-700'
            }`}>
              {formatPrice(detectedLocalPrice, inputCurrency)}
            </div>
            <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] ${
              isDark ? 'border-t-white' : 'border-t-slate-950'
            }`} />
          </div>
        </div>

        <div className={`flex items-center justify-between text-[10px] font-bold ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <span>{t.belowMarket}</span>
          <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{t.fairRangeBand}</span>
          <span>{t.overpricedMarket}</span>
        </div>
      </div>
    </div>
  );
};
