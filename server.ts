import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Helper for calling Gemini with multi-model fallback and retry
async function generatePriceAnalysisWithFallback(ai: GoogleGenAI, contents: any, schema: any) {
  // Model priority list: try 2.5 flash first (high availability and reliability), then 3.7 flash, then 2.5 pro
  const candidateModels = ['gemini-2.5-flash', 'gemini-3.7-flash', 'gemini-2.5-pro'];
  let lastError: any = null;

  for (const model of candidateModels) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        console.log(`Attempting price detection with model: ${model} (attempt ${attempt + 1})`);
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: `You are the World Price Detector AI. You perform comprehensive price analysis across major retailers (Amazon, Noon, Walmart, eBay, AliExpress, etc.) and global markets. Output strictly structured JSON conforming to the requested schema. Provide rich, accurate bilingual content in English and Arabic.`,
            responseMimeType: 'application/json',
            responseSchema: schema,
          },
        });

        const text = response.text;
        if (text) {
          return text;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isTransient = errMsg.includes('503') || errMsg.includes('UNAVAILABLE') || errMsg.includes('429') || errMsg.includes('high demand');
        
        console.warn(`Model ${model} attempt ${attempt + 1} failed: ${errMsg}`);
        if (isTransient && attempt === 0) {
          // Wait 800ms before retrying once on transient spike
          await new Promise((r) => setTimeout(r, 800));
          continue;
        }
        // If not transient or second attempt failed, break to next model
        break;
      }
    }
  }

  throw lastError || new Error('All model attempts failed to generate price analysis.');
}

app.post('/api/detect-price', async (req, res) => {
  try {
    const {
      query = '',
      image = '',
      localPrice,
      currency = 'USD',
      country = 'United States',
      condition = 'new',
      language = 'en',
    } = req.body;

    if (!query && !image) {
      return res.status(400).json({ error: 'Please provide either a product photo or product name.' });
    }

    const ai = getGenAI();
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    if (image) {
      let mimeType = 'image/jpeg';
      let base64Data = image;

      if (image.startsWith('data:')) {
        const match = image.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          mimeType = match[1];
          base64Data = match[2];
        }
      }

      parts.push({
        inlineData: {
          mimeType,
          data: base64Data,
        },
      });
    }

    const promptText = `
You are the World Price Detector & Global E-Commerce Market Intelligence Engine.
Conduct a DEEP SEARCH and valuation of this product across major online retailers and global markets.

INPUT DETAILS:
- Product Search Query: "${query || '(Identify strictly from the attached photo)'}"
- User's Local Price: ${localPrice !== undefined && localPrice !== null && localPrice !== '' ? `${localPrice} ${currency}` : '(Not provided, detect from price tag if visible, or determine benchmark)'}
- User's Country / Market: "${country || 'Global / Not specified'}"
- Product Condition: "${condition || 'new'}"
- Response Language Target: Both English and Arabic translations required.

MANDATORY TASKS:
1. IDENTIFY: Identify the exact product name, manufacturer brand, model/variant, storage/specs, and category.
2. DEEP WEB RETAILER SEARCH:
   Search and provide realistic pricing for this exact product across major world & regional web stores:
   - Amazon (US / Global, or Amazon UAE / SA / EG if user is in Middle East)
   - Noon (KSA / UAE / Egypt)
   - Walmart / Target / Best Buy
   - eBay (Average buy-it-now / refurbished rate)
   - AliExpress / Official Brand Store
   For each retailer, provide:
   * Store Name (e.g. "Amazon US", "Amazon UAE / KSA", "Noon", "Walmart", "AliExpress", "Official Store")
   * Store Type ('amazon', 'noon', 'walmart', 'ebay', 'aliexpress', 'official', 'other')
   * Price in store currency & converted to user currency (${currency})
   * In stock status (true/false)
   * Helpful badge (e.g. "Lowest Web Price", "Official Retailer", "Prime / Fast Shipping", "Import Direct")
   * Direct search query URL
3. VERDICT & FAIRNESS EVALUATION:
   Evaluate the user's price against global MSRP and international averages:
   - GREAT_DEAL (>15% below international fair rate)
   - FAIR_PRICE (Within standard international MSRP + taxes range)
   - SLIGHTLY_HIGH (10% to 25% higher, often due to local reseller markup or high tariffs)
   - OVERPRICED (>25% overpriced, bad deal)
   - SUSPICIOUSLY_CHEAP (>50% below baseline, high risk of fake/clone/scam)
4. REGIONAL BENCHMARKS:
   Calculate regional prices for:
   - United States (USD)
   - European Union (EUR)
   - United Kingdom (GBP)
   - Japan / East Asia (JPY)
   - Middle East / Gulf / Local Market
5. ECONOMIC INSIGHTS & BUYER TIPS:
   - 3 to 5 key pricing factors (VAT, customs, component costs, sales cycles) in BOTH English and Arabic.
   - 3 to 4 actionable recommendations for the buyer in BOTH English and Arabic.
`;

    parts.push({ text: promptText });

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        productName: { type: Type.STRING },
        brand: { type: Type.STRING },
        modelOrVariant: { type: Type.STRING },
        category: { type: Type.STRING },
        condition: { type: Type.STRING },
        detectedLocalPrice: { type: Type.NUMBER },
        verdict: { type: Type.STRING },
        verdictHeadline: { type: Type.STRING },
        verdictHeadlineAr: { type: Type.STRING },
        verdictScore: { type: Type.INTEGER },
        priceDifferencePercentage: { type: Type.NUMBER },
        confidenceScore: { type: Type.INTEGER },
        fairPriceRange: {
          type: Type.OBJECT,
          properties: {
            min: { type: Type.NUMBER },
            max: { type: Type.NUMBER },
            typical: { type: Type.NUMBER },
          },
          required: ['min', 'max', 'typical'],
        },
        fairPriceRangeUSD: {
          type: Type.OBJECT,
          properties: {
            min: { type: Type.NUMBER },
            max: { type: Type.NUMBER },
            typical: { type: Type.NUMBER },
          },
          required: ['min', 'max', 'typical'],
        },
        summary: { type: Type.STRING },
        summaryAr: { type: Type.STRING },
        retailerPrices: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              storeName: { type: Type.STRING },
              storeType: { type: Type.STRING },
              price: { type: Type.NUMBER },
              currency: { type: Type.STRING },
              convertedPriceUserCurrency: { type: Type.NUMBER },
              priceUSD: { type: Type.NUMBER },
              inStock: { type: Type.BOOLEAN },
              shippingNote: { type: Type.STRING },
              badge: { type: Type.STRING },
              searchUrl: { type: Type.STRING },
            },
            required: ['storeName', 'storeType', 'price', 'currency', 'convertedPriceUserCurrency', 'priceUSD', 'inStock'],
          },
        },
        regionalPrices: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              region: { type: Type.STRING },
              regionAr: { type: Type.STRING },
              flag: { type: Type.STRING },
              priceLocal: { type: Type.NUMBER },
              localCurrency: { type: Type.STRING },
              priceInUserCurrency: { type: Type.NUMBER },
              priceUSD: { type: Type.NUMBER },
              notes: { type: Type.STRING },
              notesAr: { type: Type.STRING },
            },
            required: ['region', 'flag', 'priceLocal', 'localCurrency', 'priceInUserCurrency', 'priceUSD'],
          },
        },
        keyFactors: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        keyFactorsAr: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        recommendations: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        recommendationsAr: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        specifications: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        alternativeSuggestions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        alternativeSuggestionsAr: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: [
        'productName',
        'brand',
        'modelOrVariant',
        'category',
        'verdict',
        'verdictHeadline',
        'verdictScore',
        'fairPriceRange',
        'fairPriceRangeUSD',
        'priceDifferencePercentage',
        'confidenceScore',
        'summary',
        'retailerPrices',
        'regionalPrices',
        'keyFactors',
        'recommendations',
      ],
    };

    const text = await generatePriceAnalysisWithFallback(ai, { parts }, responseSchema);
    
    // Clean up potential markdown json fences
    let cleanJson = text.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanJson);

    const result = {
      id: 'eval_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
      inputCurrency: currency,
      inputCountryOrMarket: country,
      condition: condition || parsed.condition || 'new',
      detectedLocalPrice: parsed.detectedLocalPrice || Number(localPrice) || parsed.fairPriceRange?.typical || 0,
      identifiedFromImage: !!image,
      ...parsed,
    };

    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error in deep price detection:', error);
    res.status(500).json({
      error: error?.message || 'Failed to analyze prices across web stores. Please retry.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`World Price Detector running on http://localhost:${PORT}`);
  });
}

startServer();
