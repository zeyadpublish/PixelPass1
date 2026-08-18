import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  TrendingDown,
  Layers,
  Search,
  ShoppingCart,
  Compass,
  CheckCircle2,
  Globe2,
  Coins,
} from 'lucide-react';
import { Header } from './components/Header';
import { DetectorForm } from './components/DetectorForm';
import { VerdictDisplay } from './components/VerdictDisplay';
import { RetailerPricesGrid } from './components/RetailerPricesGrid';
import { RegionalComparisonGrid } from './components/RegionalComparisonGrid';
import { PricingIntelligence } from './components/PricingIntelligence';
import { HistoryModal } from './components/HistoryModal';
import { CameraModal } from './components/CameraModal';
import { CountrySelectModal } from './components/CountrySelectModal';
import { CurrencySelectModal } from './components/CurrencySelectModal';
import { GoogleAdBanner } from './components/GoogleAdBanner';
import { PriceAnalysisResult, CurrencyInfo, Theme } from './types';
import { ALL_COUNTRIES, CountryData } from './utils/countries';
import { ALL_WORLD_CURRENCIES } from './utils/currencies';
import { Language, TRANSLATIONS } from './utils/translations';
import { calculateAutomaticPriceIntelligence } from './utils/automaticPriceEngine';

const STORAGE_KEY = 'world_price_detector_history_v2';
const COUNTRY_STORAGE_KEY = 'world_price_detector_country_v2';
const CURRENCY_STORAGE_KEY = 'world_price_detector_curr_v2';
const LANG_STORAGE_KEY = 'world_price_detector_lang_v2';
const THEME_STORAGE_KEY = 'world_price_detector_theme_v2';

export function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved === 'dark' || saved === 'light') ? saved : 'dark';
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'ar' ? 'ar' : 'en';
  });

  const [selectedCurrency, setSelectedCurrency] = useState<string>(() => {
    const savedCurr = localStorage.getItem(CURRENCY_STORAGE_KEY);
    return savedCurr || 'USD';
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryData>(() => {
    const savedCode = localStorage.getItem(COUNTRY_STORAGE_KEY);
    if (savedCode) {
      const found = ALL_COUNTRIES.find((c) => c.code === savedCode);
      if (found) return found;
    }
    return ALL_COUNTRIES.find((c) => c.code === 'US') || ALL_COUNTRIES[0];
  });

  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<PriceAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [history, setHistory] = useState<PriceAnalysisResult[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  // Synchronize HTML dark class for Tailwind
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Save theme
  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  // Save history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Save language
  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
    localStorage.setItem(LANG_STORAGE_KEY, nextLang);
  };

  // Country select handler
  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country);
    localStorage.setItem(COUNTRY_STORAGE_KEY, country.code);
    if (country.currency) {
      setSelectedCurrency(country.currency);
      localStorage.setItem(CURRENCY_STORAGE_KEY, country.currency);
    }
  };

  // Currency select handler
  const handleSelectCurrency = (currency: CurrencyInfo) => {
    setSelectedCurrency(currency.code);
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency.code);
  };

  const handleAnalyze = async (payload: {
    query: string;
    image: string;
    localPrice?: number;
    currency: string;
    country: string;
    condition: 'new' | 'refurbished' | 'used';
    language: Language;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Simulate realistic swift search latency for polished UI feedback (400ms)
      await new Promise((resolve) => setTimeout(resolve, 400));

      const analysisResult = calculateAutomaticPriceIntelligence(payload);
      setCurrentResult(analysisResult);

      // Prepend to history
      setHistory((prev) => [analysisResult, ...prev.filter((item) => item.id !== analysisResult.id)].slice(0, 25));
    } catch (err: any) {
      console.error('Price detection failed:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during search.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen transition-colors duration-200 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      } ${language === 'ar' ? 'font-[Cairo,sans-serif]' : ''}`}
    >
      {/* Header */}
      <Header
        currentCurrency={selectedCurrency}
        onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
        selectedCountry={selectedCountry}
        onOpenCountryModal={() => setIsCountryModalOpen(true)}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error Alert */}
        {errorMessage && (
          <div className={`p-4 rounded-2xl border flex items-start gap-3 text-sm animate-in fade-in shadow-sm ${
            isDark
              ? 'bg-rose-950/50 border-rose-800 text-rose-200'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">{language === 'ar' ? 'خطأ في الفحص:' : 'Detection Error:'}</span> {errorMessage}
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold hover:underline opacity-80 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* Hero Section if no active result */}
        {!currentResult && (
          <div className="text-center space-y-3 pt-2 pb-1">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-sm ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-emerald-400'
                : 'bg-white border-slate-200 text-emerald-700'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badgeAiSearch}</span>
              <span className="opacity-40">•</span>
              <span>200+ Countries</span>
              <span className="opacity-40">•</span>
              <span>160+ Currencies (A-Z)</span>
            </div>

            <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {language === 'ar' ? (
                <>
                  هل هذا السعر <span className="text-emerald-500">عادل</span> مقارنة بأسعار العالم؟
                </>
              ) : (
                <>
                  Check if any price is <span className="text-emerald-500">fair</span> worldwide.
                </>
              )}
            </h1>

            <p className={`text-sm sm:text-base max-w-2xl mx-auto font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t.appTagline}
            </p>
          </div>
        )}

        {/* Form or Result View */}
        {!currentResult ? (
          <div className="space-y-6">
            <DetectorForm
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              onOpenLiveCamera={() => setIsCameraOpen(true)}
              capturedImage={capturedImage}
              onClearImage={() => setCapturedImage(null)}
              selectedCurrency={selectedCurrency}
              onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
              selectedCountry={selectedCountry}
              onOpenCountryModal={() => setIsCountryModalOpen(true)}
              language={language}
              theme={theme}
            />

            {/* Google Ads Placement Slot 1 (Below Search Hub) */}
            <GoogleAdBanner
              slotId="1000000001"
              format="auto"
              theme={theme}
              label={language === 'ar' ? 'إعلان ممول' : 'Sponsored Placement'}
            />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Action Bar */}
            <div className="flex items-center justify-between">
              <button
                id="back-to-scan-btn"
                onClick={() => setCurrentResult(null)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-black transition-all shadow-sm active:scale-95 ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-100 hover:text-white'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                <span>{t.scanAnother}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCurrencyModalOpen(true)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-emerald-400'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono font-black">{selectedCurrency}</span>
                </button>
                <button
                  onClick={() => setIsCountryModalOpen(true)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-emerald-400'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base leading-none">{selectedCountry.flag}</span>
                  <span className="font-semibold">{selectedCountry.name}</span>
                </button>
              </div>
            </div>

            {/* Verdict Hero Card */}
            <VerdictDisplay result={currentResult} language={language} theme={theme} />

            {/* Google Ads Placement Slot 2 (Between Verdict and Stores) */}
            <GoogleAdBanner
              slotId="1000000002"
              format="auto"
              theme={theme}
              label={language === 'ar' ? 'إعلان ممول' : 'Sponsored Deals'}
            />

            {/* Deep Web Retailer Price Cards (Amazon, Noon, Walmart, eBay, AliExpress) */}
            {currentResult.retailerPrices && currentResult.retailerPrices.length > 0 && (
              <RetailerPricesGrid
                retailerPrices={currentResult.retailerPrices}
                userPrice={currentResult.detectedLocalPrice}
                userCurrency={currentResult.inputCurrency}
                productName={currentResult.productName}
                language={language}
                theme={theme}
              />
            )}

            {/* Regional Worldwide Price Grid */}
            <RegionalComparisonGrid
              regionalPrices={currentResult.regionalPrices}
              userPrice={currentResult.detectedLocalPrice}
              userCurrency={currentResult.inputCurrency}
              language={language}
              theme={theme}
            />

            {/* In-depth Pricing Intelligence & Advice */}
            <PricingIntelligence result={currentResult} language={language} theme={theme} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 text-center text-xs mt-12 transition-colors ${
          isDark
            ? 'border-slate-900 bg-slate-950 text-slate-400'
            : 'border-slate-200 bg-white text-slate-600'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold">
            <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>{t.appTitle}</span>
            <span>•</span>
            <span>Amazon, Noon, Walmart, eBay & Global Intelligence</span>
          </div>
          <p className="text-[11px] opacity-80 max-w-md">
            {t.footerNote}
          </p>
        </div>
      </footer>

      {/* Live Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(img) => {
          setCapturedImage(img);
          setIsCameraOpen(false);
        }}
        language={language}
      />

      {/* Scan History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={(item) => setCurrentResult(item)}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteHistoryItem}
        language={language}
        theme={theme}
      />

      {/* A-Z All Countries Selector Modal */}
      <CountrySelectModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        selectedCountryName={selectedCountry.name}
        onSelectCountry={handleSelectCountry}
        language={language}
        theme={theme}
      />

      {/* A-Z All World Currencies Selector Modal */}
      <CurrencySelectModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        selectedCurrencyCode={selectedCurrency}
        onSelectCurrency={handleSelectCurrency}
        language={language}
        theme={theme}
      />
    </div>
  );
}
export default App;
