import { CurrencyInfo, PopularPreset } from '../types';

export const ALL_WORLD_CURRENCIES: CurrencyInfo[] = [
  // A
  { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates Dirham', nameAr: 'درهم إماراتي', flag: '🇦🇪', rateToUSD: 0.272 },
  { code: 'AFN', symbol: '؋', name: 'Afghan Afghani', nameAr: 'أفغاني أفغانستاني', flag: '🇦🇫', rateToUSD: 0.014 },
  { code: 'ALL', symbol: 'L', name: 'Albanian Lek', nameAr: 'ليك ألباني', flag: '🇦🇱', rateToUSD: 0.011 },
  { code: 'AMD', symbol: '֏', name: 'Armenian Dram', nameAr: 'درام أرميني', flag: '🇦🇲', rateToUSD: 0.0026 },
  { code: 'ANG', symbol: 'ƒ', name: 'Netherlands Antillean Guilder', nameAr: 'غيلدر الأنتيل الهولندية', flag: '🇨🇼', rateToUSD: 0.56 },
  { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza', nameAr: 'كوانزا أنغولي', flag: '🇦🇴', rateToUSD: 0.0012 },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', nameAr: 'بيزو أرجنتيني', flag: '🇦🇷', rateToUSD: 0.0011 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', nameAr: 'دولار أسترالي', flag: '🇦🇺', rateToUSD: 0.65 },
  { code: 'AWG', symbol: 'ƒ', name: 'Aruban Florin', nameAr: 'فلورن أروبي', flag: '🇦🇼', rateToUSD: 0.55 },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', nameAr: 'مانات أذربيجاني', flag: '🇦🇿', rateToUSD: 0.59 },

  // B
  { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark', nameAr: 'مارك بوسني', flag: '🇧🇦', rateToUSD: 0.55 },
  { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar', nameAr: 'دولار بربادوسي', flag: '🇧🇧', rateToUSD: 0.50 },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', nameAr: 'تاكا بنغلاديشي', flag: '🇧🇩', rateToUSD: 0.0084 },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', nameAr: 'ليف بلغاري', flag: '🇧🇬', rateToUSD: 0.55 },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', nameAr: 'دينار بحريني', flag: '🇧🇭', rateToUSD: 2.65 },
  { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc', nameAr: 'فرنك بوروندي', flag: '🇧🇮', rateToUSD: 0.00035 },
  { code: 'BMD', symbol: '$', name: 'Bermudan Dollar', nameAr: 'دولار برمودي', flag: '🇧🇲', rateToUSD: 1.0 },
  { code: 'BND', symbol: 'B$', name: 'Brunei Dollar', nameAr: 'دولار بروني', flag: '🇧🇳', rateToUSD: 0.74 },
  { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano', nameAr: 'بوليفيانو بوليفي', flag: '🇧🇴', rateToUSD: 0.14 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', nameAr: 'ريال برازيلي', flag: '🇧🇷', rateToUSD: 0.18 },
  { code: 'BSD', symbol: '$', name: 'Bahamian Dollar', nameAr: 'دولار باهامي', flag: '🇧🇸', rateToUSD: 1.0 },
  { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum', nameAr: 'نغولترم بوتاني', flag: '🇧🇹', rateToUSD: 0.012 },
  { code: 'BWP', symbol: 'P', name: 'Botswanan Pula', nameAr: 'بولا بوتسواني', flag: '🇧🇼', rateToUSD: 0.074 },
  { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble', nameAr: 'روبل بيلاروسي', flag: '🇧🇾', rateToUSD: 0.31 },
  { code: 'BZD', symbol: 'BZ$', name: 'Belize Dollar', nameAr: 'دولار بليزي', flag: '🇧🇿', rateToUSD: 0.50 },

  // C
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', nameAr: 'دولار كندي', flag: '🇨🇦', rateToUSD: 0.73 },
  { code: 'CDF', symbol: 'FC', name: 'Congolese Franc', nameAr: 'فرنك كونغولي', flag: '🇨🇩', rateToUSD: 0.00036 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', nameAr: 'فرنك سويسري', flag: '🇨🇭', rateToUSD: 1.13 },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', nameAr: 'بيزو تشيلي', flag: '🇨🇱', rateToUSD: 0.0011 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', nameAr: 'يوان صيني', flag: '🇨🇳', rateToUSD: 0.138 },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', nameAr: 'بيزو كولومبي', flag: '🇨🇴', rateToUSD: 0.00025 },
  { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón', nameAr: 'كولون كوستاريكي', flag: '🇨🇷', rateToUSD: 0.0019 },
  { code: 'CUP', symbol: '$', name: 'Cuban Peso', nameAr: 'بيزو كوبي', flag: '🇨🇺', rateToUSD: 0.042 },
  { code: 'CVE', symbol: '$', name: 'Cape Verdean Escudo', nameAr: 'إسكودو الرأس الأخضر', flag: '🇨🇻', rateToUSD: 0.0098 },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', nameAr: 'كرونة تشيكية', flag: '🇨🇿', rateToUSD: 0.043 },

  // D
  { code: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc', nameAr: 'فرنك جيبوتي', flag: '🇩🇯', rateToUSD: 0.0056 },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', nameAr: 'كرونة دنماركية', flag: '🇩🇰', rateToUSD: 0.145 },
  { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso', nameAr: 'بيزو دومينيكاني', flag: '🇩🇴', rateToUSD: 0.017 },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', nameAr: 'دينار جزائري', flag: '🇩🇿', rateToUSD: 0.0074 },

  // E
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', nameAr: 'جنيه مصري', flag: '🇪🇬', rateToUSD: 0.021 },
  { code: 'ERN', symbol: 'Nfk', name: 'Eritrean Nakfa', nameAr: 'ناكفا إريتري', flag: '🇪🇷', rateToUSD: 0.067 },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', nameAr: 'بير إثيوبي', flag: '🇪🇹', rateToUSD: 0.0084 },
  { code: 'EUR', symbol: '€', name: 'Euro', nameAr: 'يورو', flag: '🇪🇺', rateToUSD: 1.08 },

  // F
  { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar', nameAr: 'دولار فيجي', flag: '🇫🇯', rateToUSD: 0.44 },
  { code: 'FKP', symbol: '£', name: 'Falkland Islands Pound', nameAr: 'جنيه جزر فوكلاند', flag: '🇫🇰', rateToUSD: 1.28 },

  // G
  { code: 'GBP', symbol: '£', name: 'British Pound', nameAr: 'جنيه إسترليني', flag: '🇬🇧', rateToUSD: 1.28 },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari', nameAr: 'لاري جورجي', flag: '🇬🇪', rateToUSD: 0.37 },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', nameAr: 'سيدي غاني', flag: '🇬🇭', rateToUSD: 0.064 },
  { code: 'GIP', symbol: '£', name: 'Gibraltar Pound', nameAr: 'جنيه جبل طارق', flag: '🇬🇮', rateToUSD: 1.28 },
  { code: 'GMD', symbol: 'D', name: 'Gambian Dalasi', nameAr: 'دالاسي غامبي', flag: '🇬🇲', rateToUSD: 0.015 },
  { code: 'GNF', symbol: 'FG', name: 'Guinean Franc', nameAr: 'فرنك غيني', flag: '🇬🇳', rateToUSD: 0.00012 },
  { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', nameAr: 'كتزال غواتيمالي', flag: '🇬🇹', rateToUSD: 0.13 },
  { code: 'GYD', symbol: 'G$', name: 'Guyanaese Dollar', nameAr: 'دولار غياني', flag: '🇬🇾', rateToUSD: 0.0048 },

  // H
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', nameAr: 'دولار هونغ كونغ', flag: '🇭🇰', rateToUSD: 0.128 },
  { code: 'HNL', symbol: 'L', name: 'Honduran Lempira', nameAr: 'ليمبيرا هندوراسي', flag: '🇭🇳', rateToUSD: 0.040 },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', nameAr: 'كونا كرواتية', flag: '🇭🇷', rateToUSD: 0.143 },
  { code: 'HTG', symbol: 'G', name: 'Haitian Gourde', nameAr: 'جورد هايتي', flag: '🇭🇹', rateToUSD: 0.0076 },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', nameAr: 'فورنت مجري', flag: '🇭🇺', rateToUSD: 0.0027 },

  // I
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', nameAr: 'روبية إندونيسية', flag: '🇮🇩', rateToUSD: 0.000062 },
  { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel', nameAr: 'شيكل', flag: '🇵🇸', rateToUSD: 0.27 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', nameAr: 'روبية هندية', flag: '🇮🇳', rateToUSD: 0.012 },
  { code: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinar', nameAr: 'دينار عراقي', flag: '🇮🇶', rateToUSD: 0.00076 },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial', nameAr: 'ريال إيراني', flag: '🇮🇷', rateToUSD: 0.000024 },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', nameAr: 'كرونة آيسلندية', flag: '🇮🇸', rateToUSD: 0.0073 },

  // J
  { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar', nameAr: 'دولار جامايكي', flag: '🇯🇲', rateToUSD: 0.0064 },
  { code: 'JOD', symbol: 'د.أ', name: 'Jordanian Dinar', nameAr: 'دينار أردني', flag: '🇯🇴', rateToUSD: 1.41 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', nameAr: 'ين ياباني', flag: '🇯🇵', rateToUSD: 0.0066 },

  // K
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', nameAr: 'شلن كيني', flag: '🇰🇪', rateToUSD: 0.0078 },
  { code: 'KGS', symbol: 'с', name: 'Kyrgystani Som', nameAr: 'سوم قيرغيزستاني', flag: '🇰🇬', rateToUSD: 0.011 },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel', nameAr: 'ريال كمبودي', flag: '🇰🇭', rateToUSD: 0.00024 },
  { code: 'KMF', symbol: 'CF', name: 'Comorian Franc', nameAr: 'فرنك قمري', flag: '🇰🇲', rateToUSD: 0.0022 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', nameAr: 'وون كوري جنوبي', flag: '🇰🇷', rateToUSD: 0.00073 },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي', flag: '🇰🇼', rateToUSD: 3.25 },
  { code: 'KYD', symbol: '$', name: 'Cayman Islands Dollar', nameAr: 'دولار جزر كايمان', flag: '🇰🇾', rateToUSD: 1.20 },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', nameAr: 'تينغ كازاخستاني', flag: '🇰🇿', rateToUSD: 0.0021 },

  // L
  { code: 'LAK', symbol: '₭', name: 'Laotian Kip', nameAr: 'كيب لاوسي', flag: '🇱🇦', rateToUSD: 0.000046 },
  { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound', nameAr: 'ليرة لبنانية', flag: '🇱🇧', rateToUSD: 0.000011 },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', nameAr: 'روبية سريلانكية', flag: '🇱🇰', rateToUSD: 0.0033 },
  { code: 'LRD', symbol: '$', name: 'Liberian Dollar', nameAr: 'دولار ليبيري', flag: '🇱🇷', rateToUSD: 0.0051 },
  { code: 'LSL', symbol: 'L', name: 'Lesotho Loti', nameAr: 'لوتي ليسوتو', flag: '🇱🇸', rateToUSD: 0.055 },
  { code: 'LYD', symbol: 'د.ل', name: 'Libyan Dinar', nameAr: 'دينار ليبي', flag: '🇱🇾', rateToUSD: 0.21 },

  // M
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', nameAr: 'درهم مغربي', flag: '🇲🇦', rateToUSD: 0.10 },
  { code: 'MDL', symbol: 'L', name: 'Moldovan Leu', nameAr: 'ليو مولدوفي', flag: '🇲🇩', rateToUSD: 0.056 },
  { code: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary', nameAr: 'أرياري مدغشقري', flag: '🇲🇬', rateToUSD: 0.00022 },
  { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar', nameAr: 'دينار مقدوني', flag: '🇲🇰', rateToUSD: 0.017 },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', nameAr: 'كيات ميانماري', flag: '🇲🇲', rateToUSD: 0.00048 },
  { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik', nameAr: 'توغروغ منغولي', flag: '🇲🇳', rateToUSD: 0.00029 },
  { code: 'MOP', symbol: 'MOP$', name: 'Macanese Pataca', nameAr: 'باتاكا ماكاوية', flag: '🇲🇴', rateToUSD: 0.124 },
  { code: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya', nameAr: 'أوقية موريتانية', flag: '🇲🇷', rateToUSD: 0.025 },
  { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee', nameAr: 'روبية موريشية', flag: '🇲🇺', rateToUSD: 0.021 },
  { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa', nameAr: 'روفيا مالديفية', flag: '🇲🇻', rateToUSD: 0.065 },
  { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha', nameAr: 'كواشا مالاوية', flag: '🇲🇼', rateToUSD: 0.00057 },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', nameAr: 'بيزو مكسيكي', flag: '🇲🇽', rateToUSD: 0.054 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', nameAr: 'رينغيت ماليزي', flag: '🇲🇾', rateToUSD: 0.22 },
  { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical', nameAr: 'متكال موزمبيقي', flag: '🇲🇿', rateToUSD: 0.016 },

  // N
  { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar', nameAr: 'دولار ناميبي', flag: '🇳🇦', rateToUSD: 0.055 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', nameAr: 'نايرا نيجيرية', flag: '🇳🇬', rateToUSD: 0.00062 },
  { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba', nameAr: 'كوردوبا نيكاراغوية', flag: '🇳🇮', rateToUSD: 0.027 },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', nameAr: 'كرونة نرويجية', flag: '🇳🇴', rateToUSD: 0.093 },
  { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee', nameAr: 'روبية نيبالية', flag: '🇳🇵', rateToUSD: 0.0075 },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', nameAr: 'دولار نيوزيلندي', flag: '🇳🇿', rateToUSD: 0.60 },

  // O
  { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial', nameAr: 'ريال عماني', flag: '🇴🇲', rateToUSD: 2.60 },

  // P
  { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa', nameAr: 'بالبوا بنمي', flag: '🇵🇦', rateToUSD: 1.0 },
  { code: 'PEN', symbol: 'S/.', name: 'Peruvian Sol', nameAr: 'سول بيروفي', flag: '🇵🇪', rateToUSD: 0.27 },
  { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina', nameAr: 'كينا بابوا غينيا', flag: '🇵🇬', rateToUSD: 0.25 },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', nameAr: 'بيزو فلبيني', flag: '🇵🇭', rateToUSD: 0.017 },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', nameAr: 'روبية باكستانية', flag: '🇵🇰', rateToUSD: 0.0036 },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty', nameAr: 'زلوتي بولندي', flag: '🇵🇱', rateToUSD: 0.25 },
  { code: 'PYG', symbol: 'Gs', name: 'Paraguayan Guarani', nameAr: 'غواراني باراغواياني', flag: '🇵🇾', rateToUSD: 0.00013 },

  // Q
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', nameAr: 'ريال قطري', flag: '🇶🇦', rateToUSD: 0.274 },

  // R
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', nameAr: 'ليو روماني', flag: '🇷🇴', rateToUSD: 0.22 },
  { code: 'RSD', symbol: 'дин.', name: 'Serbian Dinar', nameAr: 'دينار صربي', flag: '🇷🇸', rateToUSD: 0.0092 },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', nameAr: 'روبل روسي', flag: '🇷🇺', rateToUSD: 0.011 },
  { code: 'RWF', symbol: 'R₣', name: 'Rwandan Franc', nameAr: 'فرنك رواندي', flag: '🇷🇼', rateToUSD: 0.00075 },

  // S
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', nameAr: 'ريال سعودي', flag: '🇸🇦', rateToUSD: 0.266 },
  { code: 'SBD', symbol: 'SI$', name: 'Solomon Islands Dollar', nameAr: 'دولار جزر سليمان', flag: '🇸🇧', rateToUSD: 0.12 },
  { code: 'SCR', symbol: '₨', name: 'Seychellois Rupee', nameAr: 'روبية سيشيلية', flag: '🇸🇨', rateToUSD: 0.072 },
  { code: 'SDG', symbol: 'ج.س.', name: 'Sudanese Pound', nameAr: 'جنيه سوداني', flag: '🇸🇩', rateToUSD: 0.0017 },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', nameAr: 'كرونة سويدية', flag: '🇸🇪', rateToUSD: 0.095 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', nameAr: 'دولار سنغافوري', flag: '🇸🇬', rateToUSD: 0.74 },
  { code: 'SHP', symbol: '£', name: 'Saint Helena Pound', nameAr: 'جنيه سانت هيلانة', flag: '🇸🇭', rateToUSD: 1.28 },
  { code: 'SLL', symbol: 'Le', name: 'Sierra Leonean Leone', nameAr: 'ليون سيراليوني', flag: '🇸🇱', rateToUSD: 0.000044 },
  { code: 'SOS', symbol: 'Sh.So.', name: 'Somali Shilling', nameAr: 'شلن صومالي', flag: '🇸🇴', rateToUSD: 0.0017 },
  { code: 'SRD', symbol: '$', name: 'Surinamese Dollar', nameAr: 'دولار سورينامي', flag: '🇸🇷', rateToUSD: 0.028 },
  { code: 'SSP', symbol: '£', name: 'South Sudanese Pound', nameAr: 'جنيه جنوب السودان', flag: '🇸🇸', rateToUSD: 0.00077 },
  { code: 'STN', symbol: 'Db', name: 'São Tomé & Príncipe Dobra', nameAr: 'دوبرا ساو تومي', flag: '🇸🇹', rateToUSD: 0.044 },
  { code: 'SYP', symbol: 'ل.س', name: 'Syrian Pound', nameAr: 'ليرة سورية', flag: '🇸🇾', rateToUSD: 0.000077 },
  { code: 'SZL', symbol: 'L', name: 'Swazi Lilangeni', nameAr: 'ليلانجيني سوازيلندي', flag: '🇸🇿', rateToUSD: 0.055 },

  // T
  { code: 'THB', symbol: '฿', name: 'Thai Baht', nameAr: 'بات تايلاندي', flag: '🇹🇭', rateToUSD: 0.029 },
  { code: 'TJS', symbol: 'SM', name: 'Tajikistani Somoni', nameAr: 'ساماني طاجيكي', flag: '🇹🇯', rateToUSD: 0.092 },
  { code: 'TMT', symbol: 'T', name: 'Turkmenistani Manat', nameAr: 'مانات تركمانستاني', flag: '🇹🇲', rateToUSD: 0.28 },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', nameAr: 'دينار تونسي', flag: '🇹🇳', rateToUSD: 0.32 },
  { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga', nameAr: 'بانغا تونغي', flag: '🇹🇴', rateToUSD: 0.42 },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', nameAr: 'ليرة تركية', flag: '🇹🇷', rateToUSD: 0.029 },
  { code: 'TTD', symbol: 'TT$', name: 'Trinidad & Tobago Dollar', nameAr: 'دولار ترينيداد وتوباغو', flag: '🇹🇹', rateToUSD: 0.15 },
  { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar', nameAr: 'دولار تايواني جديد', flag: '🇹🇼', rateToUSD: 0.031 },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', nameAr: 'شلن تنزاني', flag: '🇹🇿', rateToUSD: 0.00038 },

  // U
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', nameAr: 'هريفنيا أوكرانية', flag: '🇺🇦', rateToUSD: 0.024 },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', nameAr: 'شلن أوغندي', flag: '🇺🇬', rateToUSD: 0.00027 },
  { code: 'USD', symbol: '$', name: 'US Dollar', nameAr: 'دولار أمريكي', flag: '🇺🇸', rateToUSD: 1.0 },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', nameAr: 'بيزو أوروغواياني', flag: '🇺🇾', rateToUSD: 0.024 },
  { code: 'UZS', symbol: 'so\'m', name: 'Uzbekistani Som', nameAr: 'سوم أوزبكستاني', flag: '🇺🇿', rateToUSD: 0.000078 },

  // V
  { code: 'VES', symbol: 'Bs.S', name: 'Venezuelan Bolívar', nameAr: 'بوليفار فنزويلي', flag: '🇻🇪', rateToUSD: 0.027 },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', nameAr: 'دونغ فيتنامي', flag: '🇻🇳', rateToUSD: 0.000040 },
  { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu', nameAr: 'فاتو فانواتي', flag: '🇻🇺', rateToUSD: 0.0083 },

  // W
  { code: 'WST', symbol: 'WS$', name: 'Samoan Tala', nameAr: 'تالا ساموي', flag: '🇼🇸', rateToUSD: 0.36 },

  // X
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', nameAr: 'فرنك سيفا وسط أفريقيا', flag: '🇨🇲', rateToUSD: 0.0016 },
  { code: 'XCD', symbol: 'EC$', name: 'East Caribbean Dollar', nameAr: 'دولار شرق الكاريبي', flag: '🇦🇬', rateToUSD: 0.37 },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', nameAr: 'فرنك سيفا غرب أفريقيا', flag: '🇸🇳', rateToUSD: 0.0016 },
  { code: 'XPF', symbol: '₣', name: 'CFP Franc', nameAr: 'فرنك بولينيزي', flag: '🇵🇫', rateToUSD: 0.0090 },

  // Y
  { code: 'YER', symbol: '﷼', name: 'Yemeni Rial', nameAr: 'ريال يمني', flag: '🇾🇪', rateToUSD: 0.0040 },

  // Z
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', nameAr: 'راند جنوب أفريقي', flag: '🇿🇦', rateToUSD: 0.055 },
  { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha', nameAr: 'كواشا زامبي', flag: '🇿🇲', rateToUSD: 0.038 },
  { code: 'ZWL', symbol: 'Z$', name: 'Zimbabwean Dollar', nameAr: 'دولار زيمبابوي', flag: '🇿🇼', rateToUSD: 0.0031 },
];

export const CURRENCIES = ALL_WORLD_CURRENCIES;

export const POPULAR_PRESETS: PopularPreset[] = [
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    nameAr: 'سماعات سوني WH-1000XM5 اللاسلكية',
    category: 'Electronics / Audio',
    typicalPriceUSD: 399,
    brand: 'Sony',
    icon: '🎧',
  },
  {
    name: 'Apple iPhone 16 Pro 256GB',
    nameAr: 'آبل آيفون 16 برو 256 جيجابايت',
    category: 'Smartphones',
    typicalPriceUSD: 1099,
    brand: 'Apple',
    icon: '📱',
  },
  {
    name: 'PlayStation 5 Slim Digital Console',
    nameAr: 'بلايستيشن 5 سليم ديجيتال',
    category: 'Gaming',
    typicalPriceUSD: 449,
    brand: 'Sony PlayStation',
    icon: '🎮',
  },
  {
    name: 'Nike Dunk Low Retro Panda',
    nameAr: 'حذاء نايكي دانك لو باندا',
    category: 'Apparel / Footwear',
    typicalPriceUSD: 115,
    brand: 'Nike',
    icon: '👟',
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum',
    nameAr: 'مكنسة دايسون V15 ديتكت اللاسلكية',
    category: 'Home Appliances',
    typicalPriceUSD: 749,
    brand: 'Dyson',
    icon: '🧹',
  },
  {
    name: 'MacBook Air 13-inch M3 16GB',
    nameAr: 'ماك بوك إير 13 إنش M3 رام 16',
    category: 'Computers & Laptops',
    typicalPriceUSD: 1099,
    brand: 'Apple',
    icon: '💻',
  },
  {
    name: 'Samsung Galaxy S24 Ultra 512GB',
    nameAr: 'سامسونج جالكسي S24 ألترا 512 جيجا',
    category: 'Smartphones',
    typicalPriceUSD: 1299,
    brand: 'Samsung',
    icon: '📱',
  },
  {
    name: 'Nintendo Switch OLED Model',
    nameAr: 'نينتندو سويتش شاشة أوليد',
    category: 'Gaming',
    typicalPriceUSD: 349,
    brand: 'Nintendo',
    icon: '🕹️',
  },
];

export function formatPrice(amount: number, currencyCode: string = 'USD'): string {
  const curr = ALL_WORLD_CURRENCIES.find((c) => c.code === currencyCode);
  const symbol = curr ? curr.symbol : currencyCode;
  
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${symbol} 0`;
  }

  const formattedNumber = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);

  return `${symbol} ${formattedNumber}`;
}
