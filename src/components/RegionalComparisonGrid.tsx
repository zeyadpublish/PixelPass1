import React from 'react';
import { Globe, TrendingDown, TrendingUp } from 'lucide-react';
import { RegionalPrice, Theme } from '../types';
import { formatPrice } from '../utils/currencies';
import { Language, TRANSLATIONS } from '../utils/translations';

interface RegionalComparisonGridProps {
  regionalPrices: RegionalPrice[];
  userPrice: number;
  userCurrency: string;
  language: Language;
  theme?: Theme;
}

export const RegionalComparisonGrid: React.FC<RegionalComparisonGridProps> = ({
  regionalPrices,
  userPrice,
  userCurrency,
  language,
  theme = 'dark',
}) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  if (!regionalPrices || regionalPrices.length === 0) return null;

  return (
    <div
      id="regional-prices-section"
      className={`rounded-3xl border p-6 sm:p-8 transition-all duration-300 shadow-xl space-y-6 ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-700'
            }`}>
              <Globe className="w-4 h-4" />
            </div>
            <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {t.regionalTitle}
            </h3>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            {t.regionalSubtitle}
          </p>
        </div>

        <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full border ${
          isDark ? 'text-teal-400 bg-teal-500/10 border-teal-500/30' : 'text-teal-700 bg-teal-50 border-teal-300'
        }`}>
          World MSRP Indices
        </span>
      </div>

      {/* Grid of Regions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regionalPrices.map((item, idx) => {
          const regionName = (language === 'ar' && item.regionAr) ? item.regionAr : item.region;
          const notesText = (language === 'ar' && item.notesAr) ? item.notesAr : item.notes;
          const diffPct = userPrice > 0 ? ((item.priceInUserCurrency - userPrice) / userPrice) * 100 : 0;
          const isCheaper = diffPct < -3;
          const isMoreExpensive = diffPct > 3;

          return (
            <div
              key={idx}
              className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-sm ${
                isDark
                  ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="space-y-2.5">
                {/* Region Flag & Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{item.flag}</span>
                    <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {regionName}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                    isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}>
                    {item.localCurrency}
                  </span>
                </div>

                {/* Local Price */}
                <div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {formatPrice(item.priceLocal, item.localCurrency)} local
                  </div>
                  <div className={`text-2xl font-black mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {formatPrice(item.priceInUserCurrency, userCurrency)}
                  </div>
                </div>

                {/* Diff compared to user local price */}
                {userPrice > 0 && (
                  <div className="text-[11px] font-bold flex items-center gap-1 pt-1">
                    {isCheaper ? (
                      <span className={`flex items-center gap-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        <TrendingDown className="w-3 h-3" />
                        {Math.abs(Math.round(diffPct))}% {language === 'ar' ? 'أرخص من سعرك' : 'cheaper'}
                      </span>
                    ) : isMoreExpensive ? (
                      <span className={`flex items-center gap-0.5 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                        <TrendingUp className="w-3 h-3" />
                        +{Math.round(diffPct)}% {language === 'ar' ? 'أغلى من سعرك' : 'higher'}
                      </span>
                    ) : (
                      <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                        {language === 'ar' ? 'مطابق لسعرك' : 'Equivalent'}
                      </span>
                    )}
                  </div>
                )}

                {notesText && (
                  <p className={`text-[11px] border-t pt-2 leading-relaxed ${
                    isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-500'
                  }`}>
                    {notesText}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
