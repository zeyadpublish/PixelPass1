import React from 'react';
import {
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PriceAnalysisResult, Theme } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface PricingIntelligenceProps {
  result: PriceAnalysisResult;
  language: Language;
  theme?: Theme;
}

export const PricingIntelligence: React.FC<PricingIntelligenceProps> = ({
  result,
  language,
  theme = 'dark',
}) => {
  const { keyFactors, keyFactorsAr, recommendations, recommendationsAr, typicalDepreciation } = result;
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  const factorsList = (language === 'ar' && keyFactorsAr && keyFactorsAr.length > 0) ? keyFactorsAr : keyFactors;
  const recommendationsList = (language === 'ar' && recommendationsAr && recommendationsAr.length > 0) ? recommendationsAr : recommendations;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Key Factors Influencing Fair Price */}
      <div
        className={`rounded-3xl border p-6 sm:p-7 shadow-xl space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${
            isDark ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'bg-cyan-100 border-cyan-300 text-cyan-700'
          }`}>
            <HelpCircle className="w-4 h-4" />
          </div>
          <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
            {t.keyFactorsTitle}
          </h4>
        </div>

        <ul className="space-y-3 text-xs leading-relaxed">
          {factorsList.map((factor, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
              <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{factor}</span>
            </li>
          ))}
        </ul>

        {typicalDepreciation && (
          <div className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>{t.depreciationTrend}:</strong> {typicalDepreciation}
            </div>
          </div>
        )}
      </div>

      {/* Buyer Guidance & Recommendations */}
      <div
        className={`rounded-3xl border p-6 sm:p-7 shadow-xl space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${
            isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-700'
          }`}>
            <Lightbulb className="w-4 h-4" />
          </div>
          <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
            {t.recommendationsTitle}
          </h4>
        </div>

        <ul className="space-y-3 text-xs leading-relaxed">
          {recommendationsList.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
