export type PriceVerdict = 
  | 'GREAT_DEAL'
  | 'FAIR_PRICE'
  | 'SLIGHTLY_HIGH'
  | 'OVERPRICED'
  | 'SUSPICIOUSLY_CHEAP';

export type Theme = 'dark' | 'light';

export interface WebRetailerPrice {
  storeName: string; // e.g. "Amazon (US)", "Amazon (UAE / Saudi / Egypt)", "Noon (KSA / UAE / EG)", "Walmart", "eBay", "AliExpress"
  storeType: 'amazon' | 'noon' | 'walmart' | 'ebay' | 'aliexpress' | 'official' | 'other';
  price: number;
  currency: string;
  convertedPriceUserCurrency: number;
  priceUSD: number;
  inStock: boolean;
  shippingNote?: string;
  badge?: string; // e.g. "Lowest Web Price", "Official Retailer", "Fast Delivery"
  searchUrl?: string;
}

export interface RegionalPrice {
  region: string;
  regionAr?: string;
  countryCode?: string;
  flag: string;
  priceLocal: number;
  localCurrency: string;
  priceInUserCurrency: number;
  priceUSD: number;
  notes?: string;
  notesAr?: string;
}

export interface PriceAnalysisResult {
  id: string;
  timestamp: number;
  productName: string;
  brand: string;
  modelOrVariant: string;
  category: string;
  condition: 'new' | 'refurbished' | 'used' | 'unknown';
  detectedLocalPrice: number;
  inputCurrency: string;
  inputCountryOrMarket?: string;
  
  verdict: PriceVerdict;
  verdictHeadline: string;
  verdictHeadlineAr?: string;
  verdictScore: number; // 0 to 100 score
  
  fairPriceRange: {
    min: number;
    max: number;
    typical: number;
  };
  fairPriceRangeUSD: {
    min: number;
    max: number;
    typical: number;
  };
  
  priceDifferencePercentage: number;
  confidenceScore: number;
  summary: string;
  summaryAr?: string;
  
  retailerPrices: WebRetailerPrice[]; // Deep search results from Amazon, Noon, Walmart, etc.
  regionalPrices: RegionalPrice[];
  keyFactors: string[];
  keyFactorsAr?: string[];
  recommendations: string[];
  recommendationsAr?: string[];
  specifications?: string[];
  alternativeSuggestions?: string[];
  alternativeSuggestionsAr?: string[];
  
  identifiedFromImage?: boolean;
  imageUrl?: string;
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  nameAr: string;
  flag: string;
  rateToUSD: number;
}

export interface PopularPreset {
  name: string;
  nameAr: string;
  category: string;
  typicalPriceUSD: number;
  brand: string;
  icon: string;
}
