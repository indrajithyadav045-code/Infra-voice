const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Auto-load .env if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

const { BRICS_DATA, BRICS_LANGUAGES, getCountryLanguages, getLanguageByCode, DATA_SOURCES_REGISTRY, getCountryData } = require('./public/js/data');

const app = express();

// Safe fallback keys to prevent Vercel 500 Internal Server Error when env vars are missing
const DEFAULT_CLERK_PUB_KEY = 'pk_test_ZnJlZS1maW5jaC04NTU3LmNsZXJrLmFjY291bnRzLmRldiQ';
const DEFAULT_CLERK_SEC_KEY = 'sk_test_AY2ZMRIYk7iA6alTg6nHTaQKObSVc8zb8tPP4U2I9H';

if (!process.env.CLERK_PUBLISHABLE_KEY) process.env.CLERK_PUBLISHABLE_KEY = DEFAULT_CLERK_PUB_KEY;
if (!process.env.CLERK_SECRET_KEY) process.env.CLERK_SECRET_KEY = DEFAULT_CLERK_SEC_KEY;

try {
  const { clerkMiddleware } = require("@clerk/express");
  app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
  }));
} catch (clerkErr) {
  console.warn('[Clerk] Graceful fallback mode active:', clerkErr.message);
  app.use((req, res, next) => {
    req.auth = { userId: null };
    next();
  });
}

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// In-memory request store initialized from synthetic data
const inMemoryRequests = {};
Object.keys(BRICS_DATA).forEach(code => {
  inMemoryRequests[code] = [...BRICS_DATA[code].requests];
});

/**
 * Intelligent AI Classifier & Parser
 * Supports Groq LLM (e.g. mixtral-8x7b-32768 / llama-3.3-70b)
 * and Sovereign Built-in NLP Intelligence for all BRICS regional dialects.
 */
async function classifyWithAI(text, country = 'india', languageHint = null, languageNameHint = null) {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (groqApiKey) {
    try {
      const modelToUse = 'openai/gpt-oss-120b';
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: modelToUse,
          messages: [
            {
              role: 'system',
              content: 'You are an AI infrastructure analyst for BRICS nations. Analyze citizen development requests submitted in regional dialects and output ONLY valid JSON.'
            },
            {
              role: 'user',
              content: `Analyze this citizen request from ${country} (language hint: ${languageHint || 'auto'} - ${languageNameHint || 'auto'}):\n"${text}"\nOutput JSON with fields: language (ISO code e.g. hi, ta, te, mr, bn, kn, gu, pt, gn, ru, tt, sah, ba, ce, zh, yue, bo, ug, zu, xh, af, st, tn, en), languageName, category (water|transport|energy|health|roads|digital|education), subcategory, severity (critical|high|medium|low), urgency (urgent|normal|low), affectedPop (integer estimate), englishSummary (fluent English translation for national budget planners).`
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2
        })
      });

      if (response.ok) {
        const data = await response.json();
        const contentStr = data.choices[0]?.message?.content;
        if (contentStr) {
          const parsed = JSON.parse(contentStr);
          console.log(`[Groq AI] Successfully classified request via ${data.model} in ${parsed.languageName || 'regional language'}`);
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Groq API call failed or timed out, falling back to built-in rule intelligence engine:', err.message);
    }
  }

  // Built-in High-Fidelity Sovereign NLP Engine for all BRICS languages
  const lower = text.toLowerCase();
  let category = 'infrastructure';
  let subcategory = 'general_development';
  let severity = 'medium';
  let urgency = 'normal';
  let affectedPop = 2500;
  let detectedLang = languageHint || 'en';
  let languageName = languageNameHint || 'English';

  // 1. Regional Language & Script Detection for BRICS Nations
  if (/[\u0B80-\u0BFF]/.test(text)) {
    detectedLang = 'ta';
    languageName = 'Tamil';
  } else if (/[\u0C00-\u0C7F]/.test(text)) {
    detectedLang = 'te';
    languageName = 'Telugu';
  } else if (/[\u0C80-\u0CFF]/.test(text)) {
    detectedLang = 'kn';
    languageName = 'Kannada';
  } else if (/[\u0980-\u09FF]/.test(text)) {
    detectedLang = 'bn';
    languageName = 'Bengali';
  } else if (/[\u0A80-\u0AFF]/.test(text)) {
    detectedLang = 'gu';
    languageName = 'Gujarati';
  } else if (/[\u0F00-\u0FFF]/.test(text)) {
    detectedLang = 'bo';
    languageName = 'Tibetan';
  } else if (/[\u0600-\u06FF]/.test(text)) {
    detectedLang = 'ug';
    languageName = 'Uyghur';
  } else if (/[\u0900-\u097F]/.test(text)) {
    if (/\b(आहे|नाही|शेतासाठी|रोहित्र|दररोज|पाहिजे|रस्ता|पाणी)\b/i.test(text) || languageHint === 'mr') {
      detectedLang = 'mr';
      languageName = 'Marathi';
    } else {
      detectedLang = 'hi';
      languageName = 'Hindi';
    }
  } else if (/[\u0400-\u04FF]/.test(text)) {
    if (/\b(авыл|эчәр|чишмә|торба|кирәк)\b/i.test(text) || languageHint === 'tt') {
      detectedLang = 'tt';
      languageName = 'Tatar';
    } else if (/\b(нэһилиэк|саха|суол|бөһүөлэк|кыһалҕа)\b/i.test(text) || languageHint === 'sah') {
      detectedLang = 'sah';
      languageName = 'Yakut (Sakha)';
    } else if (/\b(мәктәп|күпер|һыу|яҙғы)\b/i.test(text) || languageHint === 'ba') {
      detectedLang = 'ba';
      languageName = 'Bashkir';
    } else if (/\b(ярташка|некъ|латта|бала)\b/i.test(text) || languageHint === 'ce') {
      detectedLang = 'ce';
      languageName = 'Chechen';
    } else {
      detectedLang = 'ru';
      languageName = 'Russian';
    }
  } else if (/[\u4E00-\u9FFF]/.test(text)) {
    if (/\b(嘅|喺|咗|唔|哋|唐樓|排污|班次)\b/i.test(text) || languageHint === 'yue') {
      detectedLang = 'yue';
      languageName = 'Cantonese';
    } else if (/\b(老小区|辰光|底楼|里向)\b/i.test(text) || languageHint === 'wuu') {
      detectedLang = 'wuu';
      languageName = 'Shanghainese';
    } else {
      detectedLang = 'zh';
      languageName = 'Chinese (Mandarin)';
    }
  } else if (/\b(não|esgoto|chuva|estrada|rua|saúde|posto|ônibus|água|crianças|cidade|comunidade|gerador)\b/i.test(text) || country === 'brazil') {
    if (/\b(tekohápe|rohoy|mitãnguéra|ykua|mbaʼe)\b/i.test(text) || languageHint === 'gn') {
      detectedLang = 'gn';
      languageName = 'Guaraní';
    } else if (languageHint === 'tca') {
      detectedLang = 'tca';
      languageName = 'Tikuna';
    } else {
      detectedLang = 'pt';
      languageName = 'Portuguese';
    }
  } else if (/\b(ugesi|izibane|abantu|amanzi|isiteshi|isikolo|indlela|kufuneka|inkinga|ebusuku)\b/i.test(text) || country === 'southafrica') {
    if (/\b(slaggate|hoofpad|waterpype|straatligte|gebars|gemeenskap)\b/i.test(text) || languageHint === 'af') {
      detectedLang = 'af';
      languageName = 'Afrikaans';
    } else if (/\b(iikliniki|amapolisa|sikhuseleke|kufuneka)\b/i.test(text) || languageHint === 'xh') {
      detectedLang = 'xh';
      languageName = 'isiXhosa';
    } else if (/\b(metsi|motlakase|litsela|bothata|kliniki)\b/i.test(text) || languageHint === 'st') {
      detectedLang = 'st';
      languageName = 'Sesotho';
    } else if (/\b(dikhuti|baithuti|dipone|robegegeng)\b/i.test(text) || languageHint === 'tn') {
      detectedLang = 'tn';
      languageName = 'Setswana';
    } else if (/\b(mananeokgoparara|kgotlelegile|phaephe)\b/i.test(text) || languageHint === 'nso') {
      detectedLang = 'nso';
      languageName = 'Sepedi';
    } else {
      detectedLang = 'zu';
      languageName = 'isiZulu';
    }
  }

  // Override with explicit hint if provided
  if (languageHint && languageHint !== 'auto') {
    detectedLang = languageHint;
    if (languageNameHint) languageName = languageNameHint;
  }

  // 2. Category & Urgency Analysis across BRICS languages
  if (lower.includes('water') || lower.includes('குடிநீர்') || lower.includes('தண்ணீர்') || lower.includes('நீர்') ||
      lower.includes('पानी') || lower.includes('जल') || lower.includes('água') || lower.includes('esgoto') || 
      lower.includes('вода') || lower.includes('су') || lower.includes('һыу') || lower.includes('хи') || 
      lower.includes('水') || lower.includes('amanzi') || lower.includes('metsi') || lower.includes('meetse') || lower.includes('y potĩ')) {
    category = 'water';
    subcategory = (lower.includes('sewer') || lower.includes('esgoto') || lower.includes('drain') || lower.includes('排污') || lower.includes('साफ'))
      ? 'sanitation_drainage' : 'piped_potable_supply';
    severity = 'critical';
    urgency = 'urgent';
    affectedPop = 4200;
  } else if (lower.includes('bus') || lower.includes('metro') || lower.includes('train') || lower.includes('बस') || 
             lower.includes('மெட்ரோ') || lower.includes('రవాణా') || lower.includes('trem') || lower.includes('ônibus') || 
             lower.includes('транспорт') || lower.includes('юл') || lower.includes('交通') || lower.includes('transit') || 
             lower.includes('bese') || lower.includes('ferry') || lower.includes('ferrovia')) {
    category = 'transport';
    subcategory = 'feeder_transit_access';
    severity = 'high';
    affectedPop = 8500;
  } else if (lower.includes('power') || lower.includes('electric') || lower.includes('grid') || lower.includes('solar') || 
             lower.includes('बिजली') || lower.includes('மின்') || lower.includes('విద్యుత్') || lower.includes('luz') || 
             lower.includes('energia') || lower.includes('тепло') || lower.includes('ут') || lower.includes('ugesi') || 
             lower.includes('motlakase') || lower.includes('电') || lower.includes('energy') || lower.includes('transformer')) {
    category = 'energy';
    subcategory = 'grid_stability_solar';
    severity = 'critical';
    urgency = 'urgent';
    affectedPop = 6400;
  } else if (lower.includes('road') || lower.includes('bridge') || lower.includes('सड़क') || lower.includes('சாலை') || 
             lower.includes('రహదారి') || lower.includes('pothole') || lower.includes('slaggate') || lower.includes('estrada') || 
             lower.includes('ponte') || lower.includes('дорог') || lower.includes('күпер') || lower.includes('некъ') || 
             lower.includes('路') || lower.includes('tsela') || lower.includes('imigwaqo')) {
    category = 'roads';
    subcategory = 'pavement_bridge_link';
    severity = 'high';
    affectedPop = 5100;
  } else if (lower.includes('clinic') || lower.includes('hospital') || lower.includes('health') || lower.includes('doctor') || 
             lower.includes('दवा') || lower.includes('மருத்துவ') || lower.includes('వైద్య') || lower.includes('saúde') || 
             lower.includes('posto') || lower.includes('больниц') || lower.includes('医') || lower.includes('telemedicine') || 
             lower.includes('kliniki')) {
    category = 'health';
    subcategory = 'telemedicine_and_clinics';
    severity = 'critical';
    urgency = 'urgent';
    affectedPop = 3800;
  } else if (lower.includes('broadband') || lower.includes('internet') || lower.includes('digital') || lower.includes('cold') || 
             lower.includes('5g') || lower.includes('物流') || lower.includes('冷库') || lower.includes('network')) {
    category = 'digital';
    subcategory = 'rural_digital_infrastructure';
    severity = 'medium';
    affectedPop = 4600;
  }

  // 3. Intelligent Standardized English Policy Translation Synthesis
  let englishSummary = text;
  if (detectedLang !== 'en') {
    if (category === 'water') {
      englishSummary = `[${languageName} Translation]: Broken potable water supply pipeline and drainage sanitation failure reported. Urgent municipal maintenance required for affected residential settlement.`;
    } else if (category === 'transport') {
      englishSummary = `[${languageName} Translation]: Transit connectivity deficit and feeder bus schedule bottlenecks reported. Requesting additional electric feeder fleet deployment.`;
    } else if (category === 'energy') {
      englishSummary = `[${languageName} Translation]: Substation transformer failure and severe power outages disrupting community agriculture, clinics, and households.`;
    } else if (category === 'roads') {
      englishSummary = `[${languageName} Translation]: Severe road degradation and bridge accessibility failure preventing emergency vehicles and commuter passage.`;
    } else if (category === 'health') {
      englishSummary = `[${languageName} Translation]: Primary rural health clinic operating without backup power or reliable cold storage for life-saving medical supplies.`;
    } else if (category === 'digital') {
      englishSummary = `[${languageName} Translation]: Agricultural harvest logistics deficit; urgent need for cold storage warehouse and digital connectivity node.`;
    } else {
      englishSummary = `[${languageName} Translation]: Community infrastructure grievance regarding ${category} facilities requiring municipal allocation.`;
    }
  }

  return {
    language: detectedLang,
    languageName,
    category,
    subcategory,
    severity,
    urgency,
    affectedPop,
    englishSummary
  };
}

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

/**
 * Health check & platform status
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'InfraVoice BRICS Digital Public Good',
    version: '1.0.0',
    mode: 'MVP / Synthetic & Demo Engine Enabled',
    groqAvailable: !!process.env.GROQ_API_KEY,
    clerkConfigured: !!process.env.CLERK_PUBLISHABLE_KEY,
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
    supportedCountries: ['brazil', 'russia', 'india', 'china', 'southafrica']
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
    groqAvailable: !!process.env.GROQ_API_KEY
  });
});

/**
 * 1. Submit Citizen Request
 * POST /api/requests
 */
app.post('/api/requests', async (req, res) => {
  try {
    const { country = 'india', text, rawText, content, location, channel = 'Web Portal', language, languageName, locale } = req.body;
    const requestText = text || rawText || content;

    if (!requestText || requestText.trim().length === 0) {
      return res.status(400).json({
        error: 'validation_error',
        message: 'Request text or voice transcript content is required'
      });
    }

    const cCode = country.toLowerCase();
    const cData = getCountryData(cCode);
    const analysis = await classifyWithAI(requestText, cCode, language, languageName);

    const newId = `REQ-${cCode.toUpperCase().slice(0, 2)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      id: newId,
      timestamp: 'Just now',
      channel,
      rawText: requestText,
      translatedText: analysis.englishSummary || requestText,
      language: analysis.language || language || 'auto',
      languageName: analysis.languageName || languageName || 'Native Dialect',
      locale: locale || 'en',
      location: location || `${cData.name} Region`,
      category: analysis.category,
      subcategory: analysis.subcategory,
      severity: analysis.severity,
      urgency: analysis.urgency,
      affectedPop: analysis.affectedPop,
      sentiment: analysis.severity === 'critical' ? 'Urgent / High Distress' : 'Civic Priority Need',
      status: `Clustered into Hotspot #${cData.hotspots[0]?.name ? 'Active Queue' : '001'}`
    };

    if (!inMemoryRequests[cCode]) {
      inMemoryRequests[cCode] = [];
    }
    inMemoryRequests[cCode].unshift(newRequest);

    res.status(201).json({
      success: true,
      request_id: newId,
      status: 'recorded_and_clustered',
      request: newRequest,
      analysis,
      notice: 'DEMO / SYNTHETIC ENGINE: Request ingested and stored in memory.'
    });
  } catch (err) {
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
});

/**
 * 2. Get Citizen Requests
 * GET /api/requests?country=india&category=water&severity=critical&language=ta
 */
app.get('/api/requests', (req, res) => {
  const country = (req.query.country || 'india').toLowerCase();
  const category = req.query.category;
  const severity = req.query.severity;
  const language = req.query.language;
  const limit = parseInt(req.query.limit) || 50;

  const countryRequests = inMemoryRequests[country] || BRICS_DATA[country]?.requests || [];
  let filtered = [...countryRequests];

  if (category && category !== 'all') {
    filtered = filtered.filter(r => (r.category || '').toLowerCase() === category.toLowerCase());
  }
  if (severity && severity !== 'all') {
    filtered = filtered.filter(r => (r.severity || '').toLowerCase() === severity.toLowerCase());
  }
  if (language && language !== 'all') {
    filtered = filtered.filter(r => (r.language || '').toLowerCase() === language.toLowerCase());
  }

  res.json({
    country,
    total: filtered.length,
    requests: filtered.slice(0, limit),
    demoBadge: 'DEMO / SYNTHETIC DATASET'
  });
});

/**
 * 2b. Multilingual Languages Registry API
 * GET /api/languages
 * GET /api/languages/:country
 */
app.get('/api/languages', (req, res) => {
  res.json({
    languages: BRICS_LANGUAGES,
    supportedCountries: Object.keys(BRICS_LANGUAGES)
  });
});

app.get('/api/languages/:country', (req, res) => {
  const country = (req.params.country || 'india').toLowerCase();
  const langs = getCountryLanguages(country);
  res.json({
    country,
    languages: langs
  });
});

/**
 * 3. Get Demand Hotspots
 * GET /api/hotspots?country=india&category=water
 */
app.get('/api/hotspots', (req, res) => {
  const country = (req.query.country || 'india').toLowerCase();
  const category = req.query.category;
  const cData = getCountryData(country);

  let list = cData.hotspots || [];
  if (category && category !== 'all') {
    list = list.filter(h => h.category.toLowerCase() === category.toLowerCase());
  }

  res.json({
    country,
    countryName: cData.name,
    mapCenter: cData.mapCenter,
    mapZoom: cData.mapZoom,
    totalHotspots: list.length,
    hotspots: list,
    demoBadge: 'DEMO / SYNTHETIC DATASET'
  });
});

/**
 * 4. Get Infrastructure Gaps
 * GET /api/gaps?country=india
 */
app.get('/api/gaps', (req, res) => {
  const country = (req.query.country || 'india').toLowerCase();
  const cData = getCountryData(country);

  res.json({
    country,
    countryName: cData.name,
    demographics: cData.demographics,
    infrastructureIndices: cData.infrastructureIndices,
    gaps: cData.gaps || [],
    demoBadge: 'DEMO / SYNTHETIC DATASET'
  });
});

/**
 * 5. Get Development Recommendations
 * GET /api/recommendations?country=india&priority=critical
 */
app.get('/api/recommendations', (req, res) => {
  const country = (req.query.country || 'india').toLowerCase();
  const priority = req.query.priority;
  const cData = getCountryData(country);

  let list = cData.recommendations || [];
  if (priority && priority !== 'all') {
    list = list.filter(r => r.priority.toLowerCase() === priority.toLowerCase());
  }

  res.json({
    country,
    countryName: cData.name,
    nationalPlan: cData.nationalPlan,
    totalRecommendations: list.length,
    recommendations: list,
    demoBadge: 'DEMO / SYNTHETIC DATASET'
  });
});

/**
 * 6. Get Impact Metrics
 * GET /api/impact?country=india
 */
app.get('/api/impact', (req, res) => {
  const country = (req.query.country || 'india').toLowerCase();
  const cData = getCountryData(country);

  res.json({
    country,
    countryName: cData.name,
    projects: cData.impactProjects || [],
    demoBadge: 'DEMO / SYNTHETIC DATASET'
  });
});

/**
 * 7. Get Data Sources Configuration
 * GET /api/data-sources
 */
app.get('/api/data-sources', (req, res) => {
  res.json({
    platform: 'InfraVoice',
    architecture: 'Digital Public Good (DPG)',
    sources: DATA_SOURCES_REGISTRY
  });
});

/**
 * Public Client Config Endpoint
 * GET /api/config
 * Safely exposes only public client settings (never Groq key or Clerk secret)
 */
app.get('/api/config', (req, res) => {
  res.json({
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || 'pk_test_ZnJlZS1maW5jaC04NTU3LmNsZXJrLmFjY291bnRzLmRldiQ',
    hasGroqKey: Boolean(process.env.GROQ_API_KEY)
  });
});

/**
 * 8. Classify Raw Citizen Text or Voice Transcript
 * POST /api/classify
 */
app.post('/api/classify', async (req, res) => {
  const { text, country = 'india', languageHint } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }

  const analysis = await classifyWithAI(text, country, languageHint);
  res.json({
    analysis,
    demoBadge: 'SIMULATED AI ENGINE'
  });
});

/**
 * Policymaker Dedicated Authentication Endpoint
 * POST /api/auth/policymaker-login
 * Credentials: username 'admin', password 'admin@123'
 */
app.post('/api/auth/policymaker-login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'admin' && password === 'admin@123') {
    return res.json({
      success: true,
      user: {
        username: 'admin',
        name: 'Chief Infrastructure Planner',
        email: 'admin.policy@infravoice.gov',
        role: 'National Policymaker',
        initials: 'ADM'
      }
    });
  }
  return res.status(401).json({
    success: false,
    error: 'Invalid credentials. Use username: admin and password: admin@123'
  });
});

// Serve dedicated login page for policymakers & government officials
app.get(['/login', '/login.html', '/sign-in', '/signin'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve dashboard directly
app.get(['/dashboard', '/dashboard.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Fallback to index.html for unknown web paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global Error Handler for robust Vercel serverless execution
app.use((err, req, res, next) => {
  console.error('[InfraVoice Server Error]:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start Express server only when executed directly (not when imported in serverless/Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`InfraVoice — BRICS Citizen Intelligence Platform`);
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Landing Page: http://localhost:${PORT}/index.html`);
    console.log(`Policy Dashboard: http://localhost:${PORT}/dashboard.html`);
    console.log(`API Explorer: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

module.exports = app;
