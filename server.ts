import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Lazy-loaded Gemini AI helper
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    console.warn('GEMINI_API_KEY is not configured or uses the placeholder. Chatbot will run in premium heuristic fallback mode.');
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const app = express();
app.use(express.json());

const PORT = 3000;

// Detailed summary of our product catalog for Gemini grounding/prompt
const PRODUCT_CATALOG_SUMMARY = `
We are "Rudrakash", an ultra-premium, luxury Indian shopping platform owned by Shivansh Gupta (Email: shivanshgupta202007@gmail.com). Here are the available products in our catalog:
1. Bespoke Engraved Wooden Photo Frame (ID: rud-001) - ₹1299 (Original: ₹1999). Personalized Gifts category. Made from solid teak wood, customized laser etching.
2. Royal Blue Handwoven Banarasi Silk Saree (ID: rud-002) - ₹8999 (Original: ₹14999). Clothing category. Mulberry silk with pure gold zari.
3. Pure Hammered Copper Water Carafe Set (ID: rud-003) - ₹1899 (Original: ₹2999). Kitchen Items category. Hammered copper bottle + 2 tumblers. Health benefits.
4. Pure Kumkumadi Saffron Miracle Elixir (ID: rud-004) - ₹1499 (Original: ₹2499). Beauty Products category. Kashmiri saffron & 26 herbs for skincare.
5. Signature Brass Diya Puja Thali Set (ID: rud-005) - ₹2499 (Original: ₹3999). Festival Products category. Heavy-gauge brass thali & complete prayer kit.
6. Smart Active Fit Fitness Tracker Watch (ID: rud-006) - ₹3499 (Original: ₹5999). Electronics category. AMOLED touchscreen, heart rate, sleep & SpO2 tracking.
7. Gilded Golden Premium Gift Hamper (ID: rud-007) - ₹2999 (Original: ₹4500). Gifts category. Dry fruits, dark truffles, scented soy candles in a velvet-lined chest.
8. Organic Scented Soy Candles (Set of 3) (ID: rud-008) - ₹899 (Original: ₹1499). Home Essentials category. Lavender, sandalwood, jasmine scent glass jars.
9. Handcrafted Genuine Leather Journal (ID: rud-010) - ₹1199 (Original: ₹1999). Stationery category. Buffalo hide and ink-bleed proof handmade paper.
10. Handmade Wooden Balancing Block Castle (ID: rud-011) - ₹1249 (Original: ₹1899). Toys category. 40 pinewood blocks colored in non-toxic organic dye.
11. Premium Cork Anti-Slip Yoga Mat (ID: rud-012) - ₹2199 (Original: ₹3499). Sports category. High-density Portuguese cork upper and tree rubber base.
12. Vintage Full-Grain Leather Phone Back Cover (ID: rud-013) - ₹1599 (Original: ₹2499). Mobile Accessories category. Italian leather with MagSafe support.
`;

// Helper for offline/fallback chatbot mode
function getHeuristicResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('saree') || msg.includes('sari') || msg.includes('cloth') || msg.includes('wear') || msg.includes('silk')) {
    return `We recommend our majestic "Royal Blue Handwoven Banarasi Silk Saree" (ID: rud-002) priced at ₹8,999 (40% discount). It is hand-spun from premium mulberry silk and adorned with pure gold zari brocade work. Would you like me to take you to the Product Listing page?`;
  }
  if (msg.includes('gift') || msg.includes('present') || msg.includes('personalized') || msg.includes('custom') || msg.includes('frame')) {
    return `For a remarkable gift, we suggest the:
- "Bespoke Engraved Wooden Photo Frame" (ID: rud-001 - ₹1299) - Laser etched solid teak wood frame.
- "Gilded Golden Premium Gift Hamper" (ID: rud-007 - ₹2999) - Velvet-lined luxury gold chest with dry fruits and handmade dark truffles.
You can view these directly in our "Personalized Gifts" or "Gifts" category!`;
  }
  if (msg.includes('delivery') || msg.includes('pincode') || msg.includes('shipping') || msg.includes('charge')) {
    return `We offer FREE shipping across India on all order values above ₹1,500. For orders under ₹1,500, a standard shipping fee of ₹99 is applied. You can test your specific delivery pin-code on any product detail page for live delivery schedules!`;
  }
  if (msg.includes('copper') || msg.includes('bottle') || msg.includes('carafe') || msg.includes('kitchen') || msg.includes('cookware')) {
    return `Our "Pure Hammered Copper Water Carafe Set" (ID: rud-003) is an exceptional kitchen essential. It comes with a 1000ml hammered copper bottle and two tumblers, crafted beautifully with scientific health benefits. It is on sale today at ₹1,899!`;
  }
  if (msg.includes('beauty') || msg.includes('saffron') || msg.includes('oil') || msg.includes('skin')) {
    return `You will love our "Pure Kumkumadi Saffron Miracle Elixir" (ID: rud-004) priced at ₹1,499. Infused with pure Kashmiri saffron and 26 precious Ayurvedic herbs, it works wonders to reduce pigmentation and give your skin a beautiful, natural radiance.`;
  }
  if (msg.includes('diya') || msg.includes('puja') || msg.includes('thali') || msg.includes('festival') || msg.includes('brass')) {
    return `Our "Signature Brass Diya Puja Thali Set" (ID: rud-005) is our best-selling festival piece. Cast in heavy gauge engraved brass, it includes a thali, diya, bell, camphor burner, and incense stand for ₹2,499.`;
  }
  if (msg.includes('watch') || msg.includes('smartwatch') || msg.includes('electronic') || msg.includes('fitness')) {
    return `Check out our "Smart Active Fit Fitness Tracker Watch" (ID: rud-006) for ₹3,499 (41% off). It features a full-touch AMOLED display, swim-proof design, SpO2/heart rate sensors, and a 7-day battery life.`;
  }
  if (msg.includes('owner') || msg.includes('contact') || msg.includes('shivansh') || msg.includes('gupta') || msg.includes('email')) {
    return `Rudrakash is proudly founded and owned by Shivansh Gupta. You can directly get in touch with Shivansh at shivanshgupta202007@gmail.com for bulk orders, business queries, or direct feedback.`;
  }
  
  return `Thank you for shopping at Rudrakash! I can help you find products, check delivery charges, or give recommendations. For example, try asking "Show me gift hampers" or "Suggest a designer outfit". Let me know how I can assist!`;
}

// Helper to generate content with a fallback model if the primary model is busy or experiences high demand (e.g. 503 UNAVAILABLE)
async function generateContentWithFallback(ai: any, params: {
  model?: string;
  contents: any;
  config?: any;
}) {
  const primaryModel = params.model || 'gemini-3.5-flash';
  const backupModel = 'gemini-3.1-flash-lite';
  
  try {
    return await ai.models.generateContent({
      ...params,
      model: primaryModel,
    });
  } catch (err: any) {
    console.warn(`Primary model "${primaryModel}" is busy or unavailable. Retrying with backup "${backupModel}". Error:`, err.message || err);
    try {
      return await ai.models.generateContent({
        ...params,
        model: backupModel,
      });
    } catch (backupErr: any) {
      console.error(`Backup model "${backupModel}" also failed. Error:`, backupErr.message || backupErr);
      throw backupErr;
    }
  }
}

// 1. API: Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message query is required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Graceful fallback if no API key is specified
    const reply = getHeuristicResponse(message);
    return res.json({ reply, method: 'heuristic' });
  }

  try {
    const systemPrompt = `
You are the official premium AI shopping assistant for "Rudrakash", India's most luxurious e-commerce platform.
Owner of Rudrakash: Shivansh Gupta
Contact Email: shivanshgupta202007@gmail.com
Your job is to assist clients elegantly with product recommendations, shop policies, and general shopping help.
Speak politely, with warmth and premium sophistication, using "Namaste!" occasionally, and recommend real items from our catalog using their exact titles and prices.

Here is our live catalog of available products:
${PRODUCT_CATALOG_SUMMARY}

Rules:
- Recommend real products from the list above whenever relevant. Match user's intent.
- Do not make up any other items unless mentioning you can source items on custom request.
- Keep your answers beautifully structured, readable, and under 150 words.
- Always be helpful, respectful, and mention owner "Shivansh Gupta" or email "shivanshgupta202007@gmail.com" if they ask about bulk custom corporate gifts, feedback, or complaints.
`;

    // Package chat history for the prompt to keep it conversational
    const formattedHistory = Array.isArray(history) 
      ? history.slice(-5).map((h: any) => `${h.sender === 'user' ? 'Customer' : 'Assistant'}: ${h.text}`).join('\n')
      : '';

    const finalPrompt = `${formattedHistory}\nCustomer: ${message}\nAssistant:`;

    const response = await generateContentWithFallback(ai, {
      model: 'gemini-3.5-flash',
      contents: finalPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Thank you for contacting Rudrakash. How can I help you?';
    return res.json({ reply, method: 'gemini' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    const reply = getHeuristicResponse(message);
    return res.json({ reply, method: 'fallback_heuristic', error: error.message });
  }
});

// 2. API: Pincode Check
app.post('/api/pincode', (req, res) => {
  const { pincode } = req.body;
  
  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ valid: false, message: 'Please enter a valid 6-digit Indian Pin-code.' });
  }
  
  const digit = pincode.charAt(0);
  
  // Custom Indian delivery zone logic
  let zone = 'Standard Delivery Zone';
  let days = 4;
  let expressAvailable = true;
  let codAvailable = true;
  
  if (['1', '2'].includes(digit)) {
    zone = 'North Zone (NCR, Punjab, UP)';
    days = 2; // North India quick delivery
  } else if (['3', '4'].includes(digit)) {
    zone = 'West Zone (Maharashtra, Gujarat)';
    days = 3;
  } else if (['5', '6'].includes(digit)) {
    zone = 'South Zone (Karnataka, Tamil Nadu, AP)';
    days = 3;
  } else if (['7', '8'].includes(digit)) {
    zone = 'East & Central Zone (Bengal, Bihar, MP)';
    days = 4;
  } else if (digit === '9') {
    zone = 'Far North/East Hills';
    days = 6;
    expressAvailable = false;
  }

  // Custom quick check for Varanasi and Delhi/Noida
  if (pincode === '221005' || pincode === '201301' || pincode === '110001') {
    zone = 'Express Hub (Varanasi / NCR)';
    days = 1; // 24 Hours delivery!
  }

  return res.json({
    valid: true,
    pincode,
    zone,
    estimatedDays: days,
    deliveryCharge: days === 1 ? 'FREE (Express Hub)' : (days <= 3 ? '₹49 (Standard)' : '₹99'),
    expressAvailable,
    codAvailable
  });
});

// 3. API: Dynamic AI-Powered Product Recommendations Engine
app.post('/api/recommend', async (req, res) => {
  const { cart, wishlist, recentlyViewed, orders } = req.body;
  
  // Format inputs to provide context to Gemini
  const cartTitles = Array.isArray(cart) ? cart.map((c: any) => c.product?.name || c.name).filter(Boolean) : [];
  const wishlistTitles = Array.isArray(wishlist) ? wishlist.map((w: any) => w.name || w.id).filter(Boolean) : [];
  const viewedTitles = Array.isArray(recentlyViewed) ? recentlyViewed.map((r: any) => r.name || r.id).filter(Boolean) : [];
  const orderTitles = Array.isArray(orders) ? orders.flatMap((o: any) => (o.items || []).map((i: any) => i.name)).filter(Boolean) : [];

  const ai = getGeminiClient();
  
  // If Gemini client is configured, we run the AI recommendation engine
  if (ai) {
    try {
      const systemInstruction = `
You are the elite AI Product Recommendation Engine for "Rudrakash", India's most luxurious e-commerce platform.
Your job is to analyze a client's e-commerce behavior and return a JSON object with 3 personalized product recommendations.

Here is our live catalog of available products:
${PRODUCT_CATALOG_SUMMARY}

Analyze the user's:
1. Active Cart Items
2. Wishlist Items
3. Recently Viewed Items
4. Previous Order History

Recommend exactly 3 products from our catalog that the user does NOT currently have in their cart.
For each recommended product, write a highly elegant, personalized, and premium justification (max 18 words) explaining why this matches their luxurious taste based on their specific behavior.
Use premium, sophisticated English vocabulary. Refer to the items with their exact product IDs.
`;

      const userPrompt = `
User Context:
- Current Cart: ${cartTitles.length > 0 ? cartTitles.join(', ') : 'Empty'}
- Wishlist: ${wishlistTitles.length > 0 ? wishlistTitles.join(', ') : 'Empty'}
- Recently Viewed: ${viewedTitles.length > 0 ? viewedTitles.join(', ') : 'Empty'}
- Previous Orders: ${orderTitles.length > 0 ? orderTitles.join(', ') : 'None'}

Generate exactly 3 recommendations from our catalog matching this user's profile.
`;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.6,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productId: { 
                      type: Type.STRING,
                      description: "The exact catalog ID of the recommended product (e.g. rud-001)"
                    },
                    reason: { 
                      type: Type.STRING, 
                      description: "Personalized premium reason matching user preferences (max 18 words)"
                    }
                  },
                  required: ["productId", "reason"]
                }
              }
            },
            required: ["recommendations"]
          }
        }
      });

      if (response.text) {
        const result = JSON.parse(response.text.trim());
        return res.json({ 
          recommendations: result.recommendations, 
          engine: 'Gemini 3.5 AI Core' 
        });
      }
    } catch (error: any) {
      console.error('Gemini Recommendation Engine Error, falling back:', error);
    }
  }

  // Smart Heuristic Fallback Engine
  const recommendations = [];
  
  // Heuristic rule 1: Saree viewed or in cart -> recommend Saffron Miracle Elixir (rud-004)
  const hasSaree = cartTitles.some(t => t.includes('Saree')) || 
                    viewedTitles.some(t => t.includes('Saree')) || 
                    wishlistTitles.some(t => t.includes('Saree'));
  
  if (hasSaree) {
    recommendations.push({
      productId: 'rud-004',
      reason: 'Perfect your royal look. Pair your Banarasi Silk with our saffron miracle elixir for a matching radiant glow.'
    });
  }

  // Heuristic rule 2: Fitness Watch -> recommend Cork Yoga Mat (rud-012)
  const hasFitness = cartTitles.some(t => t.includes('Tracker') || t.includes('Watch')) || 
                      viewedTitles.some(t => t.includes('Tracker') || t.includes('Watch'));
  if (hasFitness) {
    recommendations.push({
      productId: 'rud-012',
      reason: 'Track and flow. Complement your smart fitness tracking routine with our organic slip-resistant cork yoga mat.'
    });
  }

  // Heuristic rule 3: Copper Carafe -> recommend Scented Candles (rud-008)
  const hasCopper = cartTitles.some(t => t.includes('Copper')) || viewedTitles.some(t => t.includes('Copper'));
  if (hasCopper) {
    recommendations.push({
      productId: 'rud-008',
      reason: 'Enhance your dining sanctuary. Pair pure copper water wellness with our organic sandalwood scented soy candles.'
    });
  }

  // Fill in default premium recommendations if we don't have 3 yet
  const defaults = [
    { productId: 'rud-007', reason: 'An exceptional treasure. Indulge in our gilded golden premium gift hamper to celebrate sweet milestones.' },
    { productId: 'rud-001', reason: 'Exquisite personalized artistry. Cherish timeless memories in our bespoke engraved solid teak wood frame.' },
    { productId: 'rud-005', reason: 'Enrich your spiritual wellness with our heavyweight masterfully engraved signature brass puja thali set.' }
  ];

  for (const item of defaults) {
    if (recommendations.length >= 3) break;
    if (!recommendations.some(r => r.productId === item.productId)) {
      recommendations.push(item);
    }
  }

  return res.json({ 
    recommendations: recommendations.slice(0, 3), 
    engine: 'Rudrakash Intelligent Heuristics' 
  });
});

// 4. Vite and production asset handling
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
    console.log(`Server is booting! Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
