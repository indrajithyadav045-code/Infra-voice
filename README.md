# InfraVoice — AI-Powered Citizen Infrastructure Intelligence

**BRICS Innovation Challenge | Digital Public Good (DPG)**

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![BRICS: 5 Member Economies](https://img.shields.io/badge/BRICS-Brazil_•_Russia_•_India_•_China_•_South_Africa-orange.svg)](#brics-nations-scope)
[![Status: MVP Prototype](https://img.shields.io/badge/Status-Working_MVP_Prototype-teal.svg)](#architecture)

---

## 🌟 Executive Summary

Governments frequently struggle to consolidate decentralized citizen feedback and align it with strategic national infrastructure spending. Critical development requests live fragmented across municipal call centers, WhatsApp chains, SMS databases, and town-hall paper files. This disconnect results in misallocated public capital, unaddressed infrastructure bottlenecks, and an inability to track the tangible socio-economic return of large-scale Digital Public Infrastructure (DPI) initiatives.

**InfraVoice** solves this challenge by providing an open-source, scalable, multilingual AI platform designed as a **Digital Public Good**. It:
1. **Aggregates citizen requests** across voice (IVRS), text, and messaging apps across diverse linguistic regions (Hindi, Tamil, Marathi, Portuguese, Russian, Mandarin, isiZulu, isiXhosa, English).
2. **Processes large datasets** combining citizen feedback with national demographic data, infrastructure indices, and public investment plans.
3. **Surfaces demand hotspots** using interactive geospatial clustering.
4. **Recommends high-priority development projects** with verifiable explainability trails to national policymakers across all 5 BRICS nations.
5. **Monitors DPI outcomes** by benchmarking socio-economic indicators before and after capital project delivery.

---

## 🗺️ BRICS Nations Scope

InfraVoice is pre-configured and dynamically customizable for the **5 core BRICS nations**:

| Nation | National Infrastructure Anchor Plan | Focus Sector & Strategic Priorities |
| :--- | :--- | :--- |
| 🇧🇷 **Brazil** | Novo PAC (Programa de Aceleração do Crescimento) | Favela micro-sanitation & wastewater in São Paulo; Amazon riverine clinic solar telecommunication |
| 🇷🇺 **Russia** | Comprehensive Plan for Modernization of Trunk Infrastructure | Permafrost-resilient district heating in Yakutsk; Siberian industrial clean-air gasification |
| 🇮🇳 **India** | PM GatiShakti & Jal Jeevan Mission | Rural piped potable water networks in Tamil Nadu; Marathwada agri-solar feeders; Delhi transit links |
| 🇨🇳 **China** | 14th Five-Year Plan & Digital Village Initiative | Mountain agricultural cold-chain logistics in Sichuan; 5G rural telemedicine in Guizhou |
| 🇿🇦 **South Africa** | National Development Plan 2030 (NDP) & Infrastructure SA | Township electrical substation load stabilization in Soweto; Safe illuminated pedestrian transit in Cape Flats |

---

## 🏗️ Architecture & Tech Stack

InfraVoice is built on a clean, dependency-light, sovereign foundation:

- **Frontend Platform**:
  - Semantic HTML5, CSS3 Custom Properties (Modern Dark/Light Executive System)
  - Vanilla JavaScript ES6+ (Modular architecture, local state management)
  - **Leaflet.js**: Geospatial demand clustering & CartoDB Dark Matter tiles
  - **Chart.js**: Category distribution, 30-day velocity trends, and infrastructure radar indices
  - **Web Audio API**: Real-time microphone audio intake and dynamic waveform canvas visualizer
  - **Web Speech API**: Multilingual speech synthesis for audio accessibility
- **Backend & REST API Engine**:
  - Node.js & Express (`server.js`)
  - Full REST API implementing `POST /api/requests`, `GET /api/requests`, `GET /api/hotspots`, `GET /api/gaps`, `GET /api/recommendations`, `GET /api/impact`, `GET /api/data-sources`, `POST /api/classify`
  - Integrated Groq API connector (Whisper speech-to-text & Llama-3.3-70b / Mixtral LLM) with graceful offline deterministic NLP intelligence fallback
- **Data Governance & Integrity**:
  - Explicit **DEMO / SYNTHETIC DATASET** labeling across all metrics, charts, and maps
  - Complete separation between Active Synthetic Engines and Planned Real Government Connectors (National Census, Transport GIS, Ministry of Finance)

---

## 🚀 Quick Start & Installation

### Option 1: Run with Node.js Dev Server (Recommended)

1. Open a terminal in the project directory:
   ```bash
   cd C:\Users\indra\.gemini\antigravity-ide\scratch\infravoice
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Access the platform in any web browser:
   - **Public Landing Page**: [http://localhost:3000/index.html](http://localhost:3000/index.html)
   - **Executive Policy Platform**: [http://localhost:3000/dashboard.html](http://localhost:3000/dashboard.html)
   - **REST API Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Option 2: Standalone Static Browser Execution

Both `public/index.html` and `public/dashboard.html` are completely self-contained with zero required build steps. You can double-click either file to open directly in Google Chrome, Microsoft Edge, Firefox, or Safari with offline client-side intelligence fallback enabled.

---

## ⚡ Groq AI Integration (Optional)

InfraVoice includes a built-in rule-based NLP intelligence engine. To connect live Groq Cloud APIs for Whisper speech-to-text and Llama-3.3-70b inference:

1. **In the Web Dashboard**:
   - Click the **⚙️ Groq Settings** button in the top navigation bar.
   - Enter your `GROQ_API_KEY` (e.g., `gsk_...`).
   - Click **Save Key**. The key is stored locally in your browser.
2. **On the Server**:
   - Set the environment variable:
     ```bash
     export GROQ_API_KEY="your_groq_api_key"
     npm start
     ```

---

## 📊 Modules & Core Features

1. **National Overview Dashboard**:
   - Live KPI cards: Total requests, active hotspots, critical gaps, active projects, population reach, and confidence score.
   - Interactive Leaflet geospatial map displaying pulsing hotspot clusters with population radiuses.
   - 30-day citizen request ingestion velocity and infrastructure benchmark radar.
2. **Citizen Requests Feed**:
   - Ingests multilingual inputs (Tamil, Hindi, Marathi, Portuguese, Russian, Chinese, isiZulu, English).
   - Audio playback button using Web Speech API synthesis.
   - Instant search and sector filtering.
3. **Geographic Demand Hotspots**:
   - Clustered concentrations with geographic bounds, velocity trends, and primary citizen complaints.
4. **Infrastructure Gap Matrix**:
   - Triangulates citizen demand against existing coverage and national benchmarks to calculate deficit narratives and capital solutions.
5. **Development Policy Dossier**:
   - Surfaced recommendations with confidence scores (88%–96%), estimated budgets, and **Explainability Trails** ("Why Surfaced").
   - One-click export of policy briefs to JSON or PDF format.
6. **DPI Impact & Project Lifecycle Tracker**:
   - Tracks projects across Planning → Approved → Under Construction → Completed with before/after delta metrics.
7. **Data Governance & Registry**:
   - Complete architectural transparency separating Active Demo Engines from planned real government API connectors.
8. **Citizen Intake Studio**:
   - Live audio recording with Web Audio API mic input and waveform visualizer.
   - One-click quick test chips in native BRICS languages.
   - Real-time AI classification report popup.

---

## 📜 License & Governance

- **License**: Creative Commons Attribution 4.0 International (CC-BY-4.0)
- **Designation**: Built in alignment with the Digital Public Goods Alliance (DPGA) standard.
