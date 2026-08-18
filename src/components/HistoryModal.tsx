import React from 'react';
import { History, X, Trash2, ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import { PriceAnalysisResult, Theme } from '../types';
import { formatPrice } from '../utils/currencies';
import { Language, TRANSLATIONS } from '../utils/translations';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: PriceAnalysisResult[];
  onSelectResult: (result: PriceAnalysisResult) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
  language: Language;
  theme?: Theme;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onClearHistory,
  onDeleteItem,
  language,
  theme = 'dark',
}) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-2xl rounded-3xl border flex flex-col max-h-[85vh] overflow-hidden shadow-2xl transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-700'
            }`}>
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {t.history}
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {history.length} {language === 'ar' ? 'عمليات فحص محفوظة' : 'saved price scans'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className={`p-2 rounded-2xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                  isDark
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                }`}
                title="Clear All History"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t.clearHistory}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className={`p-2 rounded-2xl border transition-colors ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {history.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <History className="w-12 h-12 mx-auto text-slate-600 stroke-1" />
              <p className="text-sm font-semibold">{t.noHistory}</p>
            </div>
          ) : (
            history.map((item) => {
              const headline = (language === 'ar' && item.verdictHeadlineAr) ? item.verdictHeadlineAr : item.verdictHeadline;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div
                    className="space-y-1 cursor-pointer flex-1"
                    onClick={() => {
                      onSelectResult(item);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full border ${
                        isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-200 text-slate-800 border-slate-300'
                      }`}>
                        {item.brand}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className={`text-sm font-black transition-colors ${
                      isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
                    }`}>
                      {item.productName}
                    </h4>

                    <p className={`text-xs line-clamp-1 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                      {headline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="text-right">
                      <div className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {formatPrice(item.detectedLocalPrice, item.inputCurrency)}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-bold">
                        Fair: {formatPrice(item.fairPriceRange.typical, item.inputCurrency)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onSelectResult(item);
                          onClose();
                        }}
                        className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                          isDark
                            ? 'bg-slate-800 text-slate-200 hover:bg-emerald-500 hover:text-slate-950 border-slate-700'
                            : 'bg-white text-slate-800 hover:bg-emerald-500 hover:text-slate-950 border-slate-300'
                        }`}
                        title="View Report"
                      >
                        <ArrowRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
