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

const { BRICS_DATA, DATA_SOURCES_REGISTRY, getCountryData } = require('./public/js/data');

const app = express();
const { clerkMiddleware } = require("@clerk/express");
app.use(clerkMiddleware());
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
 * Simulates Groq LLM (e.g. mixtral-8x7b-32768 / llama-3.3-70b)
 * Can connect to real Groq API if GROQ_API_KEY environment variable is set
 */
async function classifyWithAI(text, country = 'india', languageHint = null) {
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
              content: 'You are an AI infrastructure analyst for BRICS nations. Analyze citizen development requests and output ONLY valid JSON.'
            },
            {
              role: 'user',
              content: `Analyze this request from ${country}:\n"${text}"\nOutput JSON with fields: language, languageName, category (water|transport|energy|health|roads|digital|education), subcategory, severity (critical|high|medium|low), urgency (urgent|normal|low), affectedPop (integer estimate), englishSummary.`
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
          console.log(`[Groq AI] Successfully classified request via ${data.model}`);
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Groq API call failed or timed out, falling back to built-in rule intelligence engine:', err.message);
    }
  }

  // Built-in High-Fidelity NLP Intelligence Engine
  const lower = text.toLowerCase();
  let category = 'infrastructure';
  let subcategory = 'general_development';
  let severity = 'medium';
  let urgency = 'normal';
  let affectedPop = 2500;
  let detectedLang = languageHint || 'en';
  let languageName = 'English';

  // Language Detection Heuristics for BRICS
  if (/[\u0B80-\u0BFF]/.test(text)) {
    detectedLang = 'ta';
    languageName = 'Tamil';
  } else if (/[\u0900-\u097F]/.test(text)) {
    detectedLang = 'hi';
    languageName = 'Hindi';
  } else if (/[\u0400-\u04FF]/.test(text)) {
    detectedLang = 'ru';
    languageName = 'Russian';
  } else if (/[\u4E00-\u9FFF]/.test(text)) {
    detectedLang = 'zh';
    languageName = 'Chinese (Mandarin)';
  } else if (/\b(não|esgoto|chuva|estrada|rua|saúde|posto|ônibus|água|crianças|cidade)\b/i.test(text)) {
    detectedLang = 'pt';
    languageName = 'Portuguese';
  } else if (/\b(ugesi|izibane|abantu|amanzi|isiteshi|isikolo|indlela|kufuneka)\b/i.test(text)) {
    detectedLang = 'zu';
    languageName = 'isiZulu';
  }

  // Category & Urgency heuristics
  if (lower.includes('water') || lower.includes('குடிநீர்') || lower.includes('पानी') || lower.includes('água') || lower.includes('esgoto') || lower.includes('вода') || lower.includes('水') || lower.includes('amanzi')) {
    category = 'water';
    subcategory = lower.includes('sewer') || lower.includes('esgoto') || lower.includes('drain') ? 'sanitation_drainage' : 'piped_potable_supply';
    severity = 'critical';
    urgency = 'urgent';
    affectedPop = 4200;
  } else if (lower.includes('bus') || lower.includes('metro') || lower.includes('train') || lower.includes('बस') || lower.includes('trem') || lower.includes('транспорт') || lower.includes('交通') || lower.includes('transit') || lower.includes('izibane')) {
    category = 'transport';
    subcategory = 'feeder_transit_access';
    severity = 'high';
    affectedPop = 8500;
  } else if (lower.includes('power') || lower.includes('electric') || lower.includes('grid') || lower.includes('solar') || lower.includes('बिजली') || lower.includes('luz') || lower.includes('energia') || lower.includes('тепло') || lower.includes('ugesi') || lower.includes('电') || lower.includes('energy')) {
    category = 'energy';
    subcategory = 'grid_stability_solar';
    severity = 'critical';
    urgency = 'urgent';
    affectedPop = 6400;
  } else if (lower.includes('road') || lower.includes('bridge') || lower.includes('सड़क') || lower.includes('pothole') || lower.includes('estrada') || lower.includes('дорог') || lower.includes('路')) {
    category = 'roads';
    subcategory = 'pavement_bridge_link';
    severity = 'high';
    affectedPop = 5100;
  } else if (lower.includes('clinic') || lower.includes('hospital') || lower.includes('health') || lower.includes('doctor') || lower.includes('दवा') || lower.includes('saúde') || lower.includes('больниц') || lower.includes('医') || lower.includes('telemedicine')) {
    category = 'health';
    subcategory = 'telemedicine_and_clinics';
    severity = 'critical';
    urgency = 'urgent';
    affectedPop = 3800;
  } else if (lower.includes('broadband') || lower.includes('internet') || lower.includes('digital') || lower.includes('cold') || lower.includes('5g') || lower.includes('物流') || lower.includes('network')) {
    category = 'digital';
    subcategory = 'rural_digital_infrastructure';
    severity = 'medium';
    affectedPop = 4600;
  }

  return {
    language: detectedLang,
    languageName,
    category,
    subcategory,
    severity,
    urgency,
    affectedPop,
    englishSummary: text.length > 120 ? text.substring(0, 117) + '...' : text
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
    const { country = 'india', text, rawText, content, location, channel = 'Web Portal', language } = req.body;
    const requestText = text || rawText || content;

    if (!requestText || requestText.trim().length === 0) {
      return res.status(400).json({
        error: 'validation_error',
        message: 'Request text or voice transcript content is required'
      });
    }

    const cCode = country.toLowerCase();
    const cData = getCountryData(cCode);
    const analysis = await classifyWithAI(requestText, cCode, language);

    const newId = `REQ-${cCode.toUpperCase().slice(0, 2)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      id: newId,
      timestamp: 'Just now',
      channel,
      rawText: requestText,
      translatedText: analysis.englishSummary || requestText,
      language: analysis.language,
      languageName: analysis.languageName,
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
 * GET /api/requests?country=india&category=water&severity=critical
 */
app.get('/api/requests', (req, res) => {
  const country = (req.query.country || 'india').toLowerCase();
  const category = req.query.category;
  const severity = req.query.severity;
  const limit = parseInt(req.query.limit) || 50;

  const countryRequests = inMemoryRequests[country] || BRICS_DATA[country]?.requests || [];
  let filtered = [...countryRequests];

  if (category && category !== 'all') {
    filtered = filtered.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }
  if (severity && severity !== 'all') {
    filtered = filtered.filter(r => r.severity.toLowerCase() === severity.toLowerCase());
  }

  res.json({
    country,
    total: filtered.length,
    requests: filtered.slice(0, limit),
    demoBadge: 'DEMO / SYNTHETIC DATASET'
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

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`InfraVoice — BRICS Citizen Intelligence Platform`);
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Active BRICS Nations: Brazil, Russia, India, China, South Africa`);
  console.log(`Landing Page: http://localhost:${PORT}/index.html`);
  console.log(`Policy Dashboard: http://localhost:${PORT}/dashboard.html`);
  console.log(`API Explorer: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

module.exports = app;
