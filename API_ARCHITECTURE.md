# InfraVoice API Architecture

**BRICS Citizen Infrastructure Intelligence Platform**
**Groq Integration | Data Models | Server Integration**

---

## 🌐 Architectural Overview

InfraVoice operates in two seamless execution modes:
1. **Full-Stack Mode**: Express.js REST API server with in-memory persistence and live Groq API proxying.
2. **Client-Side Edge Mode**: Standalone browser execution with deterministic NLP fallback and local storage persistence.

```
┌────────────────────────────────────────────────────────┐
│ FRONTEND PLATFORM (Vanilla JS / Leaflet / Chart.js)    │
│ - Multilingual Citizen Audio & Text Intake Studio      │
│ - Geospatial Demand Hotspot Mapping                    │
│ - Dynamic BRICS Country Switcher (BR, RU, IN, CN, ZA)  │
│ - DPI Lifecycle & Impact Monitoring Dashboards         │
└────────────────────┬───────────────────────────────────┘
                     │ HTTPS / REST API
                     ↓
┌────────────────────────────────────────────────────────┐
│ BACKEND SERVICES (Node.js Express / server.js)         │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ REST Endpoints                                     │ │
│ ├────────────────────────────────────────────────────┤ │
│ │ GET    /api/health            Service status       │ │
│ │ POST   /api/requests          Submit voice/text    │ │
│ │ GET    /api/requests          Query citizen feed   │ │
│ │ GET    /api/hotspots          Clustered demand     │ │
│ │ GET    /api/gaps              Infrastructure gaps  │ │
│ │ GET    /api/recommendations   Policy dossiers      │ │
│ │ GET    /api/impact            DPI delta metrics    │ │
│ │ GET    /api/data-sources      Governance registry  │ │
│ │ POST   /api/classify          AI classification    │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Multilingual AI Pipeline                           │ │
│ ├────────────────────────────────────────────────────┤ │
│ │ 1. Voice transcription (Groq Whisper-large-v3)     │ │
│ │ 2. Language & dialect identification               │ │
│ │ 3. Category & severity extraction (Llama-3.3-70b)  │ │
│ │ 4. Geo-coding & municipal cluster alignment        │ │
│ │ 5. Demographic & budget plan cross-referencing    │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────┬───────────────────────────────────┘
                     │
                     ├─→ Groq Cloud API (Optional)
                     ├─→ National Statistical Registries (Planned)
                     └─→ Public Investment Portals (Planned)
```

---

## 📡 REST API Reference

### 1. Health Status
**GET** `/api/health`

**Response:**
```json
{
  "status": "online",
  "platform": "InfraVoice BRICS Digital Public Good",
  "version": "1.0.0",
  "mode": "MVP / Synthetic & Demo Engine Enabled",
  "groqAvailable": false,
  "supportedCountries": ["brazil", "russia", "india", "china", "southafrica"]
}
```

---

### 2. Ingest Citizen Request
**POST** `/api/requests`

**Request Body:**
```json
{
  "country": "india",
  "text": "எங்கள் கிராமத்தில் கடந்த 3 வாரங்களாக குடிநீர் குழாய் பழுதடைந்துள்ளது.",
  "location": "Madurai District, Tamil Nadu",
  "channel": "IVR Voice",
  "language": "ta"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "request_id": "REQ-IN-4921",
  "status": "recorded_and_clustered",
  "request": {
    "id": "REQ-IN-4921",
    "timestamp": "Just now",
    "channel": "IVR Voice",
    "rawText": "எங்கள் கிராமத்தில் கடந்த 3 வாரங்களாக குடிநீர் குழாய் பழுதடைந்துள்ளது.",
    "translatedText": "Our village water pipeline has been broken for 3 weeks.",
    "language": "ta",
    "languageName": "Tamil",
    "location": "Madurai District, Tamil Nadu",
    "category": "water",
    "subcategory": "piped_potable_supply",
    "severity": "critical",
    "urgency": "urgent",
    "affectedPop": 4200,
    "sentiment": "Urgent / High Distress",
    "status": "Clustered into Hotspot #Active Queue"
  },
  "notice": "DEMO / SYNTHETIC ENGINE: Request ingested and stored in memory."
}
```

---

### 3. Get Citizen Requests
**GET** `/api/requests?country=india&category=water&severity=critical&limit=50`

**Query Parameters:**
- `country` (required): `brazil`, `russia`, `india`, `china`, `southafrica`
- `category` (optional): `water`, `transport`, `energy`, `roads`, `health`, `digital`
- `severity` (optional): `critical`, `high`, `medium`, `low`
- `limit` (optional, default 50): integer

---

### 4. Get Demand Hotspots
**GET** `/api/hotspots?country=india`

**Response:**
```json
{
  "country": "india",
  "countryName": "India",
  "mapCenter": [20.5937, 78.9629],
  "mapZoom": 5,
  "totalHotspots": 5,
  "hotspots": [
    {
      "id": "in-hotspot-001",
      "name": "Tamil Nadu Rural Water Deficit Corridor",
      "region": "Tamil Nadu (Madurai - Dindigul - Tirunelveli)",
      "category": "water",
      "severity": "critical",
      "requests": 312,
      "population": 142000,
      "trend": "increasing",
      "lat": 9.9252,
      "lng": 78.1198,
      "radius": 28000,
      "languages": ["ta", "en"],
      "summary": "Chronic groundwater depletion and broken piped networks across 28 village panchayats.",
      "topConcern": "Drinking water contamination and 4-day tanker waiting intervals"
    }
  ],
  "demoBadge": "DEMO / SYNTHETIC DATASET"
}
```

---

### 5. Get Infrastructure Gaps
**GET** `/api/gaps?country=india`

Returns comparison between existing infrastructure assessments, national benchmark targets, and recommended capital interventions.

---

### 6. Get Development Recommendations
**GET** `/api/recommendations?country=india&priority=critical`

Returns evidence-backed proposals featuring:
- Confidence score (0–100%)
- Budget required in domestic currency and USD
- Project timeline
- Explainability trail ("Why Surfaced")

---

### 7. Get DPI Impact Metrics
**GET** `/api/impact?country=india`

Returns active project progress, baseline vs projected outcomes, and telemetry verification methodology.

---

### 8. Classify Request
**POST** `/api/classify`

**Request Body:**
```json
{
  "text": "Frequent 8-hour daily power blackouts during critical irrigation cycles in Beed.",
  "country": "india"
}
```
