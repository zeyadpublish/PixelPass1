export interface CountryData {
  code: string;
  name: string;
  nameAr: string;
  flag: string;
  currency: string;
  region: 'Middle East & North Africa' | 'Europe' | 'North America' | 'Asia' | 'Africa' | 'South America' | 'Oceania';
}

export const ALL_COUNTRIES: CountryData[] = [
  // A
  { code: 'AF', name: 'Afghanistan', nameAr: 'أفغانستان', flag: '🇦🇫', currency: 'USD', region: 'Asia' },
  { code: 'AL', name: 'Albania', nameAr: 'ألبانيا', flag: '🇦🇱', currency: 'EUR', region: 'Europe' },
  { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر', flag: '🇩🇿', currency: 'USD', region: 'Middle East & North Africa' },
  { code: 'AD', name: 'Andorra', nameAr: 'أندورا', flag: '🇦🇩', currency: 'EUR', region: 'Europe' },
  { code: 'AO', name: 'Angola', nameAr: 'أنغولا', flag: '🇦🇴', currency: 'USD', region: 'Africa' },
  { code: 'AR', name: 'Argentina', nameAr: 'الأرجنتين', flag: '🇦🇷', currency: 'USD', region: 'South America' },
  { code: 'AM', name: 'Armenia', nameAr: 'أرمينيا', flag: '🇦🇲', currency: 'USD', region: 'Asia' },
  { code: 'AU', name: 'Australia', nameAr: 'أستراليا', flag: '🇦🇺', currency: 'AUD', region: 'Oceania' },
  { code: 'AT', name: 'Austria', nameAr: 'النمسا', flag: '🇦🇹', currency: 'EUR', region: 'Europe' },
  { code: 'AZ', name: 'Azerbaijan', nameAr: 'أذربيجان', flag: '🇦🇿', currency: 'USD', region: 'Asia' },

  // B
  { code: 'BH', name: 'Bahrain', nameAr: 'البحرين', flag: '🇧🇭', currency: 'SAR', region: 'Middle East & North Africa' },
  { code: 'BD', name: 'Bangladesh', nameAr: 'بنغلاديش', flag: '🇧🇩', currency: 'USD', region: 'Asia' },
  { code: 'BE', name: 'Belgium', nameAr: 'بلجيكا', flag: '🇧🇪', currency: 'EUR', region: 'Europe' },
  { code: 'BO', name: 'Bolivia', nameAr: 'بوليفيا', flag: '🇧🇴', currency: 'USD', region: 'South America' },
  { code: 'BA', name: 'Bosnia and Herzegovina', nameAr: 'البوسنة والهرسك', flag: '🇧🇦', currency: 'EUR', region: 'Europe' },
  { code: 'BR', name: 'Brazil', nameAr: 'البرازيل', flag: '🇧🇷', currency: 'BRL', region: 'South America' },
  { code: 'BG', name: 'Bulgaria', nameAr: 'بلغاريا', flag: '🇧🇬', currency: 'EUR', region: 'Europe' },

  // C
  { code: 'CA', name: 'Canada', nameAr: 'كندا', flag: '🇨🇦', currency: 'CAD', region: 'North America' },
  { code: 'CL', name: 'Chile', nameAr: 'تشيلي', flag: '🇨🇱', currency: 'USD', region: 'South America' },
  { code: 'CN', name: 'China', nameAr: 'الصين', flag: '🇨🇳', currency: 'CNY', region: 'Asia' },
  { code: 'CO', name: 'Colombia', nameAr: 'كولومبيا', flag: '🇨🇴', currency: 'USD', region: 'South America' },
  { code: 'HR', name: 'Croatia', nameAr: 'كرواتيا', flag: '🇭🇷', currency: 'EUR', region: 'Europe' },
  { code: 'CY', name: 'Cyprus', nameAr: 'قبرص', flag: '🇨🇾', currency: 'EUR', region: 'Europe' },
  { code: 'CZ', name: 'Czech Republic', nameAr: 'التشيك', flag: '🇨🇿', currency: 'EUR', region: 'Europe' },

  // D
  { code: 'DK', name: 'Denmark', nameAr: 'الدنمارك', flag: '🇩🇰', currency: 'EUR', region: 'Europe' },
  { code: 'DJ', name: 'Djibouti', nameAr: 'جيبوتي', flag: '🇩🇯', currency: 'USD', region: 'Middle East & North Africa' },
  { code: 'DO', name: 'Dominican Republic', nameAr: 'جمهورية الدومينيكان', flag: '🇩🇴', currency: 'USD', region: 'North America' },

  // E
  { code: 'EC', name: 'Ecuador', nameAr: 'الإكوادور', flag: '🇪🇨', currency: 'USD', region: 'South America' },
  { code: 'EG', name: 'Egypt', nameAr: 'مصر', flag: '🇪🇬', currency: 'EGP', region: 'Middle East & North Africa' },
  { code: 'EE', name: 'Estonia', nameAr: 'إستونيا', flag: '🇪🇪', currency: 'EUR', region: 'Europe' },
  { code: 'ET', name: 'Ethiopia', nameAr: 'إثيوبيا', flag: '🇪🇹', currency: 'USD', region: 'Africa' },

  // F
  { code: 'FI', name: 'Finland', nameAr: 'فنلندا', flag: '🇫🇮', currency: 'EUR', region: 'Europe' },
  { code: 'FR', name: 'France', nameAr: 'فرنسا', flag: '🇫🇷', currency: 'EUR', region: 'Europe' },

  // G
  { code: 'GE', name: 'Georgia', nameAr: 'جورجيا', flag: '🇬🇪', currency: 'USD', region: 'Asia' },
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا', flag: '🇩🇪', currency: 'EUR', region: 'Europe' },
  { code: 'GH', name: 'Ghana', nameAr: 'غانا', flag: '🇬🇭', currency: 'USD', region: 'Africa' },
  { code: 'GR', name: 'Greece', nameAr: 'اليونان', flag: '🇬🇷', currency: 'EUR', region: 'Europe' },

  // H
  { code: 'HK', name: 'Hong Kong', nameAr: 'هونغ كونغ', flag: '🇭🇰', currency: 'USD', region: 'Asia' },
  { code: 'HU', name: 'Hungary', nameAr: 'المجر', flag: '🇭🇺', currency: 'EUR', region: 'Europe' },

  // I
  { code: 'IS', name: 'Iceland', nameAr: 'آيسلندا', flag: '🇮🇸', currency: 'EUR', region: 'Europe' },
  { code: 'IN', name: 'India', nameAr: 'الهند', flag: '🇮🇳', currency: 'INR', region: 'Asia' },
  { code: 'ID', name: 'Indonesia', nameAr: 'إندونيسيا', flag: '🇮🇩', currency: 'USD', region: 'Asia' },
  { code: 'IQ', name: 'Iraq', nameAr: 'العراق', flag: '🇮🇶', currency: 'USD', region: 'Middle East & North Africa' },
  { code: 'IE', name: 'Ireland', nameAr: 'أيرلندا', flag: '🇮🇪', currency: 'EUR', region: 'Europe' },
  { code: 'IT', name: 'Italy', nameAr: 'إيطاليا', flag: '🇮🇹', currency: 'EUR', region: 'Europe' },

  // J
  { code: 'JP', name: 'Japan', nameAr: 'اليابان', flag: '🇯🇵', currency: 'JPY', region: 'Asia' },
  { code: 'JO', name: 'Jordan', nameAr: 'الأردن', flag: '🇯🇴', currency: 'USD', region: 'Middle East & North Africa' },

  // K
  { code: 'KZ', name: 'Kazakhstan', nameAr: 'كازاخستان', flag: '🇰🇿', currency: 'USD', region: 'Asia' },
  { code: 'KE', name: 'Kenya', nameAr: 'كينيا', flag: '🇰🇪', currency: 'USD', region: 'Africa' },
  { code: 'KW', name: 'Kuwait', nameAr: 'الكويت', flag: '🇰🇼', currency: 'KWD', region: 'Middle East & North Africa' },

  // L
  { code: 'LB', name: 'Lebanon', nameAr: 'لبنان', flag: '🇱🇧', currency: 'USD', region: 'Middle East & North Africa' },
  { code: 'LY', name: 'Libya', nameAr: 'ليبيا', flag: '🇱🇾', currency: 'USD', region: 'Middle East & North Africa' },
  { code: 'LT', name: 'Lithuania', nameAr: 'ليتوانيا', flag: '🇱🇹', currency: 'EUR', region: 'Europe' },
  { code: 'LU', name: 'Luxembourg', nameAr: 'لوكسمبورغ', flag: '🇱🇺', currency: 'EUR', region: 'Europe' },

  // M
  { code: 'MY', name: 'Malaysia', nameAr: 'ماليزيا', flag: '🇲🇾', currency: 'USD', region: 'Asia' },
  { code: 'MV', name: 'Maldives', nameAr: 'المالديف', flag: '🇲🇻', currency: 'USD', region: 'Asia' },
  { code: 'MX', name: 'Mexico', nameAr: 'المكسيك', flag: '🇲🇽', currency: 'MXN', region: 'North America' },
  { code: 'MA', name: 'Morocco', nameAr: 'المغرب', flag: '🇲🇦', currency: 'EUR', region: 'Middle East & North Africa' },

  // N
  { code: 'NL', name: 'Netherlands', nameAr: 'هولندا', flag: '🇳🇱', currency: 'EUR', region: 'Europe' },
  { code: 'NZ', name: 'New Zealand', nameAr: 'نيوزيلندا', flag: '🇳🇿', currency: 'AUD', region: 'Oceania' },
  { code: 'NG', name: 'Nigeria', nameAr: 'نيجيريا', flag: '🇳🇬', currency: 'USD', region: 'Africa' },
  { code: 'NO', name: 'Norway', nameAr: 'النرويج', flag: '🇳🇴', currency: 'EUR', region: 'Europe' },

  // O
  { code: 'OM', name: 'Oman', nameAr: 'سلطنة عمان', flag: '🇴🇲', currency: 'SAR', region: 'Middle East & North Africa' },

  // P
  { code: 'PK', name: 'Pakistan', nameAr: 'باكستان', flag: '🇵🇰', currency: 'USD', region: 'Asia' },
  { code: 'PS', name: 'Palestine', nameAr: 'فلسطين', flag: '🇵🇸', currency: 'USD', region: 'Middle East & North Africa' },
  { code: 'PA', name: 'Panama', nameAr: 'بنما', flag: '🇵🇦', currency: 'USD', region: 'North America' },
  { code: 'PE', name: 'Peru', nameAr: 'بيرو', flag: '🇵🇪', currency: 'USD', region: 'South America' },
  { code: 'PH', name: 'Philippines', nameAr: 'الفلبين', flag: '🇵🇭', currency: 'USD', region: 'Asia' },
  { code: 'PL', name: 'Poland', nameAr: 'بولندا', flag: '🇵🇱', currency: 'EUR', region: 'Europe' },
  { code: 'PT', name: 'Portugal', nameAr: 'البرتغال', flag: '🇵🇹', currency: 'EUR', region: 'Europe' },

  // Q
  { code: 'QA', name: 'Qatar', nameAr: 'قطر', flag: '🇶🇦', currency: 'QAR', region: 'Middle East & North Africa' },

  // R
  { code: 'RO', name: 'Romania', nameAr: 'رومانيا', flag: '🇷🇴', currency: 'EUR', region: 'Europe' },
  { code: 'RU', name: 'Russia', nameAr: 'روسيا', flag: '🇷🇺', currency: 'USD', region: 'Europe' },

  // S
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', flag: '🇸🇦', currency: 'SAR', region: 'Middle East & North Africa' },
  { code: 'RS', name: 'Serbia', nameAr: 'صربيا', flag: '🇷🇸', currency: 'EUR', region: 'Europe' },
  { code: 'SG', name: 'Singapore', nameAr: 'سنغافورة', flag: '🇸🇬', currency: 'SGD', region: 'Asia' },
  { code: 'ZA', name: 'South Africa', nameAr: 'جنوب أفريقيا', flag: '🇿🇦', currency: 'USD', region: 'Africa' },
  { code: 'KR', name: 'South Korea', nameAr: 'كوريا الجنوبية', flag: '🇰🇷', currency: 'KRW', region: 'Asia' },
  { code: 'ES', name: 'Spain', nameAr: 'إسبانيا', flag: '🇪🇸', currency: 'EUR', region: 'Europe' },
  { code: 'SE', name: 'Sweden', nameAr: 'السويد', flag: '🇸🇪', currency: 'EUR', region: 'Europe' },
  { code: 'CH', name: 'Switzerland', nameAr: 'سويسرا', flag: '🇨🇭', currency: 'CHF', region: 'Europe' },
  { code: 'SY', name: 'Syria', nameAr: 'سوريا', flag: '🇸🇾', currency: 'USD', region: 'Middle East & North Africa' },

  // T
  { code: 'TW', name: 'Taiwan', nameAr: 'تايوان', flag: '🇹🇼', currency: 'USD', region: 'Asia' },
  { code: 'TH', name: 'Thailand', nameAr: 'تايلاند', flag: '🇹🇭', currency: 'USD', region: 'Asia' },
  { code: 'TN', name: 'Tunisia', nameAr: 'تونس', flag: '🇹🇳', currency: 'USD', region: 'Middle East & North Africa' },
  { code: 'TR', name: 'Turkey', nameAr: 'تركيا', flag: '🇹🇷', currency: 'TRY', region: 'Middle East & North Africa' },

  // U
  { code: 'AE', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة', flag: '🇦🇪', currency: 'AED', region: 'Middle East & North Africa' },
  { code: 'GB', name: 'United Kingdom', nameAr: 'المملكة المتحدة', flag: '🇬🇧', currency: 'GBP', region: 'Europe' },
  { code: 'US', name: 'United States', nameAr: 'الولايات المتحدة', flag: '🇺🇸', currency: 'USD', region: 'North America' },
  { code: 'UY', name: 'Uruguay', nameAr: 'أوروغواي', flag: '🇺🇾', currency: 'USD', region: 'South America' },

  // V
  { code: 'VE', name: 'Venezuela', nameAr: 'فنزويلا', flag: '🇻🇪', currency: 'USD', region: 'South America' },
  { code: 'VN', name: 'Vietnam', nameAr: 'فيتنام', flag: '🇻🇳', currency: 'USD', region: 'Asia' },

  // Y
  { code: 'YE', name: 'Yemen', nameAr: 'اليمن', flag: '🇾🇪', currency: 'SAR', region: 'Middle East & North Africa' },
];

export const ALPHABET_INDEX = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'
];
