import React, { useState, useMemo } from 'react';
import { Search, X, Check, Globe } from 'lucide-react';
import { ALL_COUNTRIES, CountryData } from '../utils/countries';
import { Language, TRANSLATIONS } from '../utils/translations';
import { Theme } from '../types';

interface CountrySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountryName: string;
  onSelectCountry: (country: CountryData) => void;
  language: Language;
  theme?: Theme;
}

export const CountrySelectModal: React.FC<CountrySelectModalProps> = ({
  isOpen,
  onClose,
  selectedCountryName,
  onSelectCountry,
  language,
  theme = 'dark',
}) => {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeLetter, setActiveLetter] = useState<string>('All');

  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  const regions = useMemo(() => {
    const list = Array.from(new Set(ALL_COUNTRIES.map((c) => c.region)));
    return ['All', ...list.sort()];
  }, []);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredCountries = useMemo(() => {
    return ALL_COUNTRIES.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.nameAr.includes(search) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.currency.toLowerCase().includes(search.toLowerCase());

      const matchRegion = selectedRegion === 'All' || c.region === selectedRegion;
      const matchLetter = activeLetter === 'All' || c.name.toUpperCase().startsWith(activeLetter);

      return matchSearch && matchRegion && matchLetter;
    });
  }, [search, selectedRegion, activeLetter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-3xl rounded-3xl border flex flex-col max-h-[85vh] overflow-hidden shadow-2xl transition-colors ${
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
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {t.chooseCountryTitle}
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {t.allCountriesCount}
              </p>
            </div>
          </div>

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

        {/* Search & Filters */}
        <div className={`p-4 space-y-3 border-b ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchCountryPlaceholder}
              className={`w-full rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* A-Z Jumper Row */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveLetter('All')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all flex-shrink-0 ${
                activeLetter === 'All'
                  ? 'bg-emerald-500 text-slate-950'
                  : isDark
                  ? 'bg-slate-800 text-slate-200 hover:text-white'
                  : 'bg-slate-200 text-slate-700 hover:text-slate-900'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'ALL'}
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`w-6 h-6 rounded-lg text-[10px] font-black transition-all flex items-center justify-center flex-shrink-0 ${
                  activeLetter === letter
                    ? 'bg-emerald-500 text-slate-950 scale-110 shadow'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300 hover:text-slate-900'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${
                  selectedRegion === reg
                    ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm'
                    : isDark
                    ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                {reg === 'All' ? (language === 'ar' ? 'جميع المناطق' : 'All Regions') : reg}
              </button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {filteredCountries.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs">
              {language === 'ar' ? 'لم يتم العثور على بلد مطابق' : 'No countries found matching your search.'}
            </div>
          ) : (
            filteredCountries.map((country) => {
              const isSelected = country.name === selectedCountryName;
              return (
                <button
                  key={country.code}
                  onClick={() => {
                    onSelectCountry(country);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl text-left border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                      : isDark
                      ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 text-white'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-2xl leading-none flex-shrink-0">{country.flag}</span>
                    <div className="truncate">
                      <div className={`text-xs font-black truncate ${isSelected ? 'text-emerald-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
                        {language === 'ar' ? country.nameAr : country.name}
                      </div>
                      <div className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {country.currency} • {country.region}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
