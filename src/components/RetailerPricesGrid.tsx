import React from 'react';
import {
  ExternalLink,
  Store,
  Sparkles,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { WebRetailerPrice, Theme } from '../types';
import { formatPrice } from '../utils/currencies';
import { Language, TRANSLATIONS } from '../utils/translations';

interface RetailerPricesGridProps {
  retailerPrices: WebRetailerPrice[];
  userPrice: number;
  userCurrency: string;
  productName: string;
  language: Language;
  theme?: Theme;
}

export const RetailerPricesGrid: React.FC<RetailerPricesGridProps> = ({
  retailerPrices,
  userPrice,
  userCurrency,
  productName,
  language,
  theme = 'dark',
}) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  if (!retailerPrices || retailerPrices.length === 0) return null;

  const getStoreBadgeColor = (type: string) => {
    switch (type) {
      case 'amazon':
        return isDark
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
          : 'bg-amber-50 text-amber-800 border-amber-300';
      case 'noon':
        return isDark
          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
          : 'bg-yellow-50 text-yellow-800 border-yellow-300';
      case 'walmart':
        return isDark
          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
          : 'bg-blue-50 text-blue-800 border-blue-300';
      case 'ebay':
        return isDark
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          : 'bg-rose-50 text-rose-800 border-rose-300';
      case 'aliexpress':
        return isDark
          ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
          : 'bg-orange-50 text-orange-800 border-orange-300';
      default:
        return isDark
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          : 'bg-emerald-50 text-emerald-800 border-emerald-300';
    }
  };

  const getFallbackSearchUrl = (storeName: string, query: string) => {
    const encoded = encodeURIComponent(query);
    const lower = storeName.toLowerCase();
    if (lower.includes('noon')) {
      return `https://www.noon.com/search?q=${encoded}`;
    }
    if (lower.includes('amazon')) {
      return `https://www.amazon.com/s?k=${encoded}`;
    }
    if (lower.includes('walmart')) {
      return `https://www.walmart.com/search?q=${encoded}`;
    }
    if (lower.includes('ebay')) {
      return `https://www.ebay.com/sch/i.html?_nkw=${encoded}`;
    }
    if (lower.includes('aliexpress')) {
      return `https://www.aliexpress.com/wholesale?SearchText=${encoded}`;
    }
    return `https://www.google.com/search?q=${encodeURIComponent(storeName + ' ' + query + ' buy price')}`;
  };

  return (
    <div
      id="retailer-prices-section"
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
              isDark ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-700'
            }`}>
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {t.webRetailersTitle}
            </h3>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            {t.webRetailersSubtitle}
          </p>
        </div>

        <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full border ${
          isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-emerald-700 bg-emerald-50 border-emerald-300'
        }`}>
          Live Store Benchmarks
        </span>
      </div>

      {/* Grid of Retailers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {retailerPrices.map((item, idx) => {
          const searchLink = item.searchUrl || getFallbackSearchUrl(item.storeName, productName);
          const priceDiff = userPrice > 0 ? ((item.convertedPriceUserCurrency - userPrice) / userPrice) * 100 : 0;
          const isCheaper = priceDiff < -3;
          const isMoreExpensive = priceDiff > 3;

          return (
            <div
              key={idx}
              className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-sm ${
                isDark
                  ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="space-y-3">
                {/* Store Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${getStoreBadgeColor(item.storeType)}`}>
                    {item.storeName}
                  </span>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    {item.inStock ? (
                      <span className={`flex items-center gap-1 font-bold ${
                        isDark ? 'text-emerald-400' : 'text-emerald-700'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" /> {t.inStock}
                      </span>
                    ) : (
                      <span className={`flex items-center gap-1 font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <AlertCircle className="w-3 h-3" /> {t.outOfStock}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Display */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {formatPrice(item.convertedPriceUserCurrency, userCurrency)}
                    </span>
                    {item.currency !== userCurrency && (
                      <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        ({item.price} {item.currency})
                      </span>
                    )}
                  </div>

                  {/* Compared to user local price */}
                  {userPrice > 0 && (
                    <div className="text-[11px] font-bold mt-1 flex items-center gap-1">
                      {isCheaper ? (
                        <span className={`flex items-center gap-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          <TrendingDown className="w-3.5 h-3.5" />
                          {Math.abs(Math.round(priceDiff))}% {language === 'ar' ? 'أرخص من سعرك' : 'cheaper than your price'}
                        </span>
                      ) : isMoreExpensive ? (
                        <span className={`flex items-center gap-0.5 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                          <TrendingUp className="w-3.5 h-3.5" />
                          +{Math.round(priceDiff)}% {language === 'ar' ? 'أغلى من سعرك' : 'higher than your price'}
                        </span>
                      ) : (
                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                          {language === 'ar' ? 'مطابق لسعرك تقريباً' : 'About the same as your price'}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {item.badge && (
                  <div className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    <Sparkles className="w-3 h-3 mr-1" /> {item.badge}
                  </div>
                )}
              </div>

              {/* Action Button: Direct Link to store */}
              <div className={`pt-4 mt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <a
                  href={searchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                    isDark
                      ? 'bg-slate-900 hover:bg-emerald-500 text-slate-100 hover:text-slate-950 border border-slate-700'
                      : 'bg-white hover:bg-emerald-500 text-slate-800 hover:text-slate-950 border border-slate-300 hover:border-emerald-500'
                  }`}
                >
                  <span>{t.checkStore}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
