import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Search,
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Coins,
  Globe2,
  Tag,
} from 'lucide-react';
import { ALL_WORLD_CURRENCIES, POPULAR_PRESETS } from '../utils/currencies';
import { PopularPreset, Theme } from '../types';
import { CountryData } from '../utils/countries';
import { Language, TRANSLATIONS } from '../utils/translations';

interface DetectorFormProps {
  onAnalyze: (payload: {
    query: string;
    image: string;
    localPrice?: number;
    currency: string;
    country: string;
    condition: 'new' | 'refurbished' | 'used';
    language: Language;
  }) => void;
  isLoading: boolean;
  onOpenLiveCamera: () => void;
  capturedImage: string | null;
  onClearImage: () => void;
  selectedCurrency: string;
  onOpenCurrencyModal: () => void;
  selectedCountry: CountryData;
  onOpenCountryModal: () => void;
  language: Language;
  theme: Theme;
}

export const DetectorForm: React.FC<DetectorFormProps> = ({
  onAnalyze,
  isLoading,
  onOpenLiveCamera,
  capturedImage,
  onClearImage,
  selectedCurrency,
  onOpenCurrencyModal,
  selectedCountry,
  onOpenCountryModal,
  language,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<'name' | 'photo'>('name');
  const [productQuery, setProductQuery] = useState('');
  const [localPrice, setLocalPrice] = useState<string>('');
  const [condition, setCondition] = useState<'new' | 'refurbished' | 'used'>('new');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';
  const currInfo = ALL_WORLD_CURRENCIES.find((c) => c.code === selectedCurrency) || ALL_WORLD_CURRENCIES[0];

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onAnalyze({
          query: productQuery,
          image: e.target.result as string,
          localPrice: localPrice ? parseFloat(localPrice) : undefined,
          currency: selectedCurrency,
          country: selectedCountry.name,
          condition,
          language,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productQuery && !capturedImage) return;

    onAnalyze({
      query: productQuery,
      image: capturedImage || '',
      localPrice: localPrice ? parseFloat(localPrice) : undefined,
      currency: selectedCurrency,
      country: selectedCountry.name,
      condition,
      language,
    });
  };

  const handlePresetSelect = (preset: PopularPreset) => {
    setProductQuery(language === 'ar' ? preset.nameAr : preset.name);
    const curr = ALL_WORLD_CURRENCIES.find((c) => c.code === selectedCurrency);
    const multiplier = curr ? 1 / curr.rateToUSD : 1;
    setLocalPrice(Math.round(preset.typicalPriceUSD * multiplier).toString());
    setActiveTab('name');
  };

  return (
    <div className="w-full space-y-4">
      {/* Central Search Card */}
      <div
        id="detector-search-console"
        className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xl ${
          isDark
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}
      >
        {/* Top Mode Segmented Bar */}
        <div
          className={`flex items-center justify-between p-3 border-b ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className={`flex items-center gap-1.5 p-1 rounded-2xl border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/70 border-slate-300/60'
          }`}>
            <button
              type="button"
              id="tab-name-mode"
              onClick={() => setActiveTab('name')}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                activeTab === 'name'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t.tabName}</span>
            </button>

            <button
              type="button"
              id="tab-photo-mode"
              onClick={() => setActiveTab('photo')}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                activeTab === 'photo'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.tabPhoto}</span>
              {capturedImage && (
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
              )}
            </button>
          </div>

          <div className={`hidden sm:flex items-center gap-2 text-xs font-semibold ${
            isDark ? 'text-slate-300' : 'text-slate-500'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'ar' ? 'بحث ذكي وفحص فوري' : 'Real-time multi-store indexing'}</span>
          </div>
        </div>

        {/* Input Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Mode 1: Product Name Query */}
          {activeTab === 'name' && (
            <div className="space-y-2">
              <label
                className={`block text-xs font-extrabold uppercase tracking-wider ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                {t.productNameLabel} <span className="text-emerald-500">*</span>
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-emerald-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  id="manual-product-query"
                  required
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  placeholder={t.productNamePlaceholder}
                  className={`w-full rounded-2xl pl-12 pr-4 py-4 text-base font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                    isDark
                      ? 'bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500'
                      : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Mode 2: Photo Dropzone / Viewfinder */}
          {activeTab === 'photo' && (
            <div className="space-y-4">
              {capturedImage ? (
                <div
                  className={`relative rounded-2xl border p-4 flex flex-col sm:flex-row items-center gap-4 ${
                    isDark
                      ? 'border-emerald-500/40 bg-slate-950'
                      : 'border-emerald-300 bg-emerald-50/40'
                  }`}
                >
                  <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0">
                    <img
                      src={capturedImage}
                      alt="Captured product"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={onClearImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/90 text-rose-400 hover:text-rose-300 transition-colors shadow"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-black text-emerald-400 mb-1">
                      <CheckCircle2 className="w-4 h-4" /> {t.photoReady}
                    </div>
                    <p className={`text-xs mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t.photoSubtitle}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        onClick={onOpenLiveCamera}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
                          isDark
                            ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5 text-emerald-400" /> {t.retakePhoto}
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
                          isDark
                            ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5 text-teal-400" /> {t.chooseDifferent}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id="photo-dropzone"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                    dragOver
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : isDark
                      ? 'border-slate-700 hover:border-slate-600 bg-slate-950/60'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50/70'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    className="hidden"
                    id="file-upload-input"
                  />

                  <div className="max-w-sm mx-auto flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 shadow-sm">
                      <Camera className="w-7 h-7" />
                    </div>

                    <h3
                      className={`text-base font-black mb-1 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {t.dropzoneTitle}
                    </h3>
                    <p className={`text-xs mb-4 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                      {t.dropzoneSubtitle}
                    </p>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        id="start-camera-btn"
                        onClick={onOpenLiveCamera}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                      >
                        <Camera className="w-4 h-4" />
                        <span>{t.useCamera}</span>
                      </button>

                      <button
                        type="button"
                        id="choose-file-btn"
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold border shadow-sm ${
                          isDark
                            ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <Upload className="w-4 h-4 text-teal-400" />
                        <span>{t.selectFile}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <input
                  type="text"
                  id="photo-product-query"
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'اسم المنتج أو تفاصيل إضافية (اختياري)...' : 'Optional product details or brand name...'}
                  className={`w-full rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 border ${
                    isDark
                      ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-400'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Unified Parameters Row (Price, Currency, Country, Condition) */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            {/* Price You Saw */}
            <div className="space-y-1">
              <label
                className={`block text-[11px] font-extrabold uppercase tracking-wider ${
                  isDark ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {t.localPriceLabel}
              </label>
              <div
                className={`relative flex items-center rounded-2xl border overflow-hidden transition-all focus-within:ring-2 focus-within:ring-emerald-500/50 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 focus-within:border-emerald-500'
                    : 'bg-slate-50 border-slate-300 focus-within:border-emerald-600 focus-within:bg-white'
                }`}
              >
                <span
                  className={`px-3 py-3 text-xs font-black text-emerald-400 border-r ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-200/70 border-slate-300 text-emerald-700'
                  }`}
                >
                  {currInfo.symbol}
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  id="input-local-price"
                  value={localPrice}
                  onChange={(e) => setLocalPrice(e.target.value)}
                  placeholder={t.localPricePlaceholder}
                  className={`w-full bg-transparent px-3 py-3 text-sm font-bold focus:outline-none ${
                    isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Currency Pill */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  className={`block text-[11px] font-extrabold uppercase tracking-wider ${
                    isDark ? 'text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {t.currency}
                </label>
                <button
                  type="button"
                  onClick={onOpenCurrencyModal}
                  className="text-[10px] text-emerald-400 font-bold hover:underline"
                >
                  A-Z All
                </button>
              </div>
              <button
                type="button"
                id="form-currency-modal-trigger"
                onClick={onOpenCurrencyModal}
                className={`w-full rounded-2xl px-3.5 py-2.5 text-xs flex items-center justify-between font-bold border transition-all active:scale-98 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 hover:border-slate-600 text-white'
                    : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-xl leading-none">{currInfo.flag}</span>
                  <div className="text-left truncate">
                    <span className="font-mono font-black text-white dark:text-white">{currInfo.code}</span>
                    <span className={`text-[10px] block truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {currInfo.name}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </button>
            </div>

            {/* Country Pill */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  className={`block text-[11px] font-extrabold uppercase tracking-wider ${
                    isDark ? 'text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {t.storeCountryLabel}
                </label>
                <button
                  type="button"
                  onClick={onOpenCountryModal}
                  className="text-[10px] text-emerald-400 font-bold hover:underline"
                >
                  A-Z All
                </button>
              </div>
              <button
                type="button"
                id="form-country-modal-trigger"
                onClick={onOpenCountryModal}
                className={`w-full rounded-2xl px-3.5 py-2.5 text-xs flex items-center justify-between font-bold border transition-all active:scale-98 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 hover:border-slate-600 text-white'
                    : 'bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-xl leading-none">{selectedCountry.flag}</span>
                  <div className="text-left truncate">
                    <span className="font-bold truncate block text-white dark:text-white">
                      {language === 'ar' ? selectedCountry.nameAr : selectedCountry.name}
                    </span>
                    <span className={`text-[10px] block truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {selectedCountry.region}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </button>
            </div>

            {/* Condition Pill */}
            <div className="space-y-1">
              <label
                className={`block text-[11px] font-extrabold uppercase tracking-wider ${
                  isDark ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {t.conditionLabel}
              </label>
              <div
                className={`flex p-1 rounded-2xl border ${
                  isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setCondition('new')}
                  className={`flex-1 py-2 rounded-xl text-[11px] font-black transition-all ${
                    condition === 'new'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {language === 'ar' ? 'جديد' : 'New'}
                </button>
                <button
                  type="button"
                  onClick={() => setCondition('refurbished')}
                  className={`flex-1 py-2 rounded-xl text-[11px] font-black transition-all ${
                    condition === 'refurbished'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {language === 'ar' ? 'مجدد' : 'Refurb'}
                </button>
                <button
                  type="button"
                  onClick={() => setCondition('used')}
                  className={`flex-1 py-2 rounded-xl text-[11px] font-black transition-all ${
                    condition === 'used'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {language === 'ar' ? 'مستعمل' : 'Used'}
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-xs order-2 sm:order-1 text-center sm:text-left ${
              isDark ? 'text-slate-300 font-medium' : 'text-slate-500'
            }`}>
              {language === 'ar' ? 'يفحص فورياً أمازون ونون والأسواق العالمية' : 'Searches Amazon, Noon, Walmart, eBay & regional MSRPs'}
            </p>

            <button
              type="submit"
              id="analyze-price-submit-btn"
              disabled={isLoading || (!productQuery && !capturedImage)}
              className="w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{t.searchingState}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.checkButton}</span>
                  <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Clean Quick Preset Suggestions */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <span className={`text-xs font-bold uppercase tracking-wider mr-1 ${
          isDark ? 'text-slate-300' : 'text-slate-500'
        }`}>
          {language === 'ar' ? 'أمثلة سريعة:' : 'Quick tests:'}
        </span>
        {POPULAR_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handlePresetSelect(preset)}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white hover:text-emerald-400'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:text-emerald-700'
            }`}
          >
            <span>{preset.icon}</span>
            <span>{preset.brand} {preset.name.split(' ')[1]}</span>
            <span className={`text-[10px] font-mono font-black ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              ${preset.typicalPriceUSD}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
