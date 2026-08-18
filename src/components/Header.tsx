import React from 'react';
import {
  Globe,
  History,
  Languages,
  ChevronDown,
  Coins,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { ALL_WORLD_CURRENCIES } from '../utils/currencies';
import { CountryData } from '../utils/countries';
import { Language, TRANSLATIONS } from '../utils/translations';
import { Theme } from '../types';

interface HeaderProps {
  currentCurrency: string;
  onOpenCurrencyModal: () => void;
  selectedCountry: CountryData;
  onOpenCountryModal: () => void;
  historyCount: number;
  onOpenHistory: () => void;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onOpenCurrencyModal,
  selectedCountry,
  onOpenCountryModal,
  historyCount,
  onOpenHistory,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
}) => {
  const t = TRANSLATIONS[language];
  const currInfo = ALL_WORLD_CURRENCIES.find((c) => c.code === currentCurrency) || ALL_WORLD_CURRENCIES[0];
  const isDark = theme === 'dark';

  return (
    <header
      id="app-header"
      className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-xl ${
        isDark
          ? 'bg-slate-950/85 border-slate-800/80 text-white'
          : 'bg-white/85 border-slate-200/80 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/20 font-black flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight">
                {t.appTitle}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Global Price Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Currency Trigger */}
          <button
            id="header-currency-btn"
            onClick={onOpenCurrencyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-emerald-400'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
            title="Choose Currency (A-Z World List)"
          >
            <span className="text-base leading-none">{currInfo.flag}</span>
            <span className="font-mono font-black">{currInfo.code}</span>
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
              ({currInfo.symbol})
            </span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Country Trigger */}
          <button
            id="header-country-btn"
            onClick={onOpenCountryModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 max-w-[130px] sm:max-w-none truncate ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-emerald-400'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
            title="Choose Country (A-Z World List)"
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="truncate hidden sm:inline">
              {language === 'ar' ? selectedCountry.nameAr : selectedCountry.name}
            </span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Language Switch */}
          <button
            id="header-lang-btn"
            onClick={onToggleLanguage}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all active:scale-95 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            id="header-theme-btn"
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* History Drawer */}
          <button
            id="header-history-btn"
            onClick={onOpenHistory}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all relative active:scale-95 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
            title="Scan History"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{t.history}</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
