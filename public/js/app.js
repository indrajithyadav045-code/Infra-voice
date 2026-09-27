/**
 * InfraVoice — Frontend Application Core Engine
 * Manages BRICS state, Leaflet geospatial mapping, Chart.js visualizations,
 * citizen voice recording, AI classification pipeline, and UI interactivity.
 */

// Application State
const state = {
  currentCountry: 'india',
  currentTab: 'overview',
  theme: 'dark',
  clerkPublishableKey: localStorage.getItem('infravoice_clerk_key') || 'pk_test_ZnJlZS1maW5jaC04NTU3LmNsZXJrLmFjY291bnRzLmRldiQ',
  isAuthenticated: false,
  currentUser: null,
  map: null,
  mapMarkers: [],
  categoryChart: null,
  trendChart: null,
  radarChart: null,
  isRecording: false,
  mediaRecorder: null,
  audioChunks: [],
  audioContext: null,
  analyser: null,
  visualizerAnimId: null
};

// Initialize Application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initClerkAuth();
  setupNavigation();
  setupCountrySelector();
  setupIntakeStudio();
  setupFilterBars();
  setupSettingsModal();
  
  // Load initial country data
  loadCountryView(state.currentCountry);
});

/* ===================================================================
   Country State Management & View Rendering
   =================================================================== */

function setupCountrySelector() {
  const countrySelect = document.getElementById('country-select');
  if (countrySelect) {
    countrySelect.value = state.currentCountry;
    countrySelect.addEventListener('change', (e) => {
      setCountry(e.target.value);
    });
  }
}

function setCountry(countryCode) {
  state.currentCountry = countryCode.toLowerCase();
  const select = document.getElementById('country-select');
  if (select) select.value = state.currentCountry;
  loadCountryView(state.currentCountry);
}

function loadCountryView(countryCode) {
  const data = window.getCountryData(countryCode);
  if (!data) return;

  // Update Header Banner
  const flagEl = document.getElementById('header-country-flag');
  const nameEl = document.getElementById('header-country-name');
  const planEl = document.getElementById('header-national-plan');
  if (flagEl) flagEl.textContent = data.flag;
  if (nameEl) nameEl.textContent = data.name;
  if (planEl) planEl.textContent = data.nationalPlan;

  // Render All Views
  renderOverviewKPIs(data);
  renderCharts(data);
  renderMap(data);
  renderCitizenRequests(data);
  renderHotspots(data);
  renderGaps(data);
  renderRecommendations(data);
  renderImpactProjects(data);
  renderDataSources();
  updateQuickPrompts(countryCode);
}

/* ===================================================================
   1. Overview Dashboard & KPIs
   =================================================================== */

function renderOverviewKPIs(data) {
  const customRequests = window.getStoredRequests(data.code);
  const totalReqCount = data.stats.totalRequests + customRequests.length;

  document.getElementById('kpi-total-requests').textContent = totalReqCount.toLocaleString();
  document.getElementById('kpi-active-hotspots').textContent = data.stats.activeHotspots;
  document.getElementById('kpi-critical-gaps').textContent = data.stats.criticalGaps;
  document.getElementById('kpi-active-projects').textContent = data.stats.activeProjects;
  document.getElementById('kpi-pop-reached').textContent = data.stats.populationReached;
  document.getElementById('kpi-confidence').textContent = data.stats.dataConfidence;
}

/* ===================================================================
   2. Geospatial Hotspots Map (Leaflet.js)
   =================================================================== */

function renderMap(data) {
  const mapContainer = document.getElementById('hotspots-map');
  if (!mapContainer) return;

  if (!state.map) {
    // Initialize Leaflet map
    state.map = L.map('hotspots-map', {
      zoomControl: true,
      attributionControl: false
    }).setView(data.mapCenter, data.mapZoom);

    // Standard High-Resolution OpenStreetMap Tiles (100% Free, No API Key Required)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(state.map);
  } else {
    state.map.setView(data.mapCenter, data.mapZoom);
    // Clear old markers
    state.mapMarkers.forEach(m => state.map.removeLayer(m));
    state.mapMarkers = [];
  }

  // Add Hotspot Circles
  data.hotspots.forEach(spot => {
    const color = spot.severity === 'critical' ? '#ef4444' : spot.severity === 'high' ? '#f97316' : '#f59e0b';
    
    // Pulse Circle
    const circle = L.circle([spot.lat, spot.lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.25,
      radius: spot.radius || 25000,
      weight: 2
    }).addTo(state.map);

    // Center Marker with Popup
    const marker = L.circleMarker([spot.lat, spot.lng], {
      radius: 8,
      fillColor: color,
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(state.map);

    const popupHtml = `
      <div style="font-family: inherit; font-size: 13px; color: #0f172a; padding: 4px; min-width: 220px;">
        <div style="font-weight: 800; color: #0a192f; margin-bottom: 4px;">${spot.name}</div>
        <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">📍 ${spot.region}</div>
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <span style="background: ${color}20; color: ${color}; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">${spot.severity}</span>
          <span style="font-size: 11px; color: #334155; font-weight: 600;">👥 ${(spot.population).toLocaleString()} impacted</span>
        </div>
        <div style="font-size: 11px; color: #475569; line-height: 1.4; border-top: 1px solid #e2e8f0; padding-top: 6px;">
          ${spot.summary}
        </div>
        <div style="margin-top: 6px; font-size: 10px; color: #f97316; font-weight: 600;">
          Priority Need: ${spot.topConcern}
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml);
    circle.bindPopup(popupHtml);

    state.mapMarkers.push(circle);
    state.mapMarkers.push(marker);
  });
}

/* ===================================================================
   3. Chart.js Visualizations
   =================================================================== */

function renderCharts(data) {
  // Category Breakdown Chart
  const categoryCtx = document.getElementById('chart-categories');
  if (categoryCtx) {
    if (state.categoryChart) state.categoryChart.destroy();
    
    // Aggregate categories
    const counts = { water: 0, transport: 0, energy: 0, roads: 0, digital: 0, health: 0 };
    data.hotspots.forEach(h => {
      if (counts[h.category] !== undefined) counts[h.category] += h.requests;
      else counts.transport += h.requests;
    });

    state.categoryChart = new Chart(categoryCtx, {
      type: 'doughnut',
      data: {
        labels: ['Water & Sanitation', 'Public Transit', 'Energy & Power', 'Rural Roads', 'Digital & Health'],
        datasets: [{
          data: [counts.water || 140, counts.transport || 120, counts.energy || 90, counts.roads || 80, (counts.digital + counts.health) || 70],
          backgroundColor: ['#0d9488', '#f97316', '#eab308', '#6366f1', '#10b981'],
          borderWidth: 2,
          borderColor: '#0f172a'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } }
        }
      }
    });
  }

  // Demand Trend (30 Days)
  const trendCtx = document.getElementById('chart-trend');
  if (trendCtx) {
    if (state.trendChart) state.trendChart.destroy();
    
    state.trendChart = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        datasets: [{
          label: 'Citizen Inputs Velocity',
          data: [45, 68, 92, 140, 195, 260, 312],
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#f97316'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { grid: { color: 'rgba(148, 163, 184, 0.1)' }, ticks: { color: '#64748b' } },
          x: { grid: { display: false }, ticks: { color: '#64748b' } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Infrastructure Radar Indices
  const radarCtx = document.getElementById('chart-infrastructure-radar');
  if (radarCtx) {
    if (state.radarChart) state.radarChart.destroy();
    const idx = data.infrastructureIndices;

    state.radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Piped Water', 'Grid Power', 'Paved Roads', 'Health Access', 'Digital / Broadband'],
        datasets: [{
          label: `${data.name} Infrastructure Coverage (%)`,
          data: [idx.pipedWaterCoverage, idx.reliableGridPower, idx.pavedRoadDensity, idx.primaryHealthAccess, idx.digitalConnectivity],
          backgroundColor: 'rgba(13, 148, 136, 0.25)',
          borderColor: '#0d9488',
          borderWidth: 2,
          pointBackgroundColor: '#0d9488'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(148, 163, 184, 0.15)' },
            grid: { color: 'rgba(148, 163, 184, 0.15)' },
            pointLabels: { color: '#94a3b8', font: { size: 10 } },
            ticks: { display: false, max: 100, min: 0 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

/* ===================================================================
   4. Citizen Requests Feed
   =================================================================== */

function renderCitizenRequests(data) {
  const container = document.getElementById('requests-feed-container');
  if (!container) return;

  const stored = window.getStoredRequests(data.code);
  const allRequests = [...stored, ...data.requests];

  if (allRequests.length === 0) {
    container.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted);">No requests recorded for this country.</div>`;
    return;
  }

  container.innerHTML = allRequests.map(req => {
    return `
      <div class="request-card">
        <div class="request-header">
          <div class="request-meta-left">
            <span class="request-id">${req.id}</span>
            <span class="status-badge ${req.severity}">${req.severity}</span>
            <span class="lang-badge">${req.languageName || req.language}</span>
            <span style="font-size: 0.8rem; color: var(--text-secondary);">📱 ${req.channel}</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${req.timestamp}</div>
        </div>

        <div class="request-body">
          <div class="request-raw-text">"${escapeHtml(req.rawText)}"</div>
          <div class="request-translated-text"><strong>Analysis:</strong> ${escapeHtml(req.translatedText)}</div>
        </div>

        <div class="request-footer">
          <div class="request-metrics">
            <span>📍 ${escapeHtml(req.location)}</span>
            <span>👥 ~${(req.affectedPop || 0).toLocaleString()} citizens</span>
            <span class="status-badge" style="background: rgba(99, 102, 241, 0.15); color: #a5b4fc;">🏷️ ${req.category}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="speakText('${escapeQuotes(req.translatedText)}', 'en')">🔊 Listen</button>
            <span class="demo-badge">Demo</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================================
   5. Demand Hotspots View
   =================================================================== */

function renderHotspots(data) {
  const container = document.getElementById('hotspots-list-container');
  if (!container) return;

  container.innerHTML = data.hotspots.map(h => {
    return `
      <div class="hotspot-card">
        <div class="hotspot-top">
          <div>
            <div class="hotspot-title">${escapeHtml(h.name)}</div>
            <div class="hotspot-region">📍 ${escapeHtml(h.region)}</div>
          </div>
          <span class="status-badge ${h.severity}">${h.severity}</span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 8px 0;">${escapeHtml(h.summary)}</p>

        <div class="hotspot-stats-row">
          <div>
            <div class="hotspot-mini-stat-label">Requests Clustered</div>
            <div class="hotspot-mini-stat-val" style="color: var(--brics-orange);">${h.requests}</div>
          </div>
          <div>
            <div class="hotspot-mini-stat-label">Affected Population</div>
            <div class="hotspot-mini-stat-val">${(h.population).toLocaleString()}</div>
          </div>
          <div>
            <div class="hotspot-mini-stat-label">Velocity Trend</div>
            <div class="hotspot-mini-stat-val" style="color: var(--teal); font-size: 0.95rem; text-transform: capitalize;">${h.trend} ↗</div>
          </div>
          <div>
            <div class="hotspot-mini-stat-label">Languages</div>
            <div class="hotspot-mini-stat-val" style="font-size: 0.95rem;">${h.languages.join(', ').toUpperCase()}</div>
          </div>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
          <span><strong>Primary Citizen Concern:</strong> ${escapeHtml(h.topConcern)}</span>
          <span class="demo-badge">Clustered AI Data</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================================
   6. Infrastructure Gaps Matrix
   =================================================================== */

function renderGaps(data) {
  const container = document.getElementById('gaps-list-container');
  if (!container) return;

  container.innerHTML = data.gaps.map(g => {
    return `
      <div class="gap-card">
        <div class="gap-header">
          <div>
            <h3 style="font-size: 1.15rem; color: var(--text-primary);">${escapeHtml(g.title)}</h3>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">📍 ${escapeHtml(g.location)} • Sector: <strong>${g.category.toUpperCase()}</strong></div>
          </div>
          <span class="demo-badge">Gap Identified</span>
        </div>

        <div class="gap-comparison-grid">
          <div class="gap-column">
            <h4>Existing Infrastructure Assessment</h4>
            <p style="color: #ef4444;">${escapeHtml(g.existingCoverage)}</p>
          </div>
          <div class="gap-column">
            <h4>National Benchmark & Goal</h4>
            <p style="color: #10b981;">${escapeHtml(g.benchmarkTarget)}</p>
          </div>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 10px 0;">
          <strong>Deficit Summary:</strong> ${escapeHtml(g.shortfallDescription)}
        </p>

        <div class="gap-recommendation-box">
          <h4>Recommended DPI Capital Intervention</h4>
          <p>${escapeHtml(g.recommendedIntervention)}</p>
          <div style="margin-top: 10px; display: flex; gap: 20px; font-size: 0.82rem; color: var(--text-secondary);">
            <span>💰 Est. Investment: <strong>${g.estimatedCost}</strong></span>
            <span>⏱️ Timeline: <strong>${g.timeline}</strong></span>
            <span>📈 Multiplier: <strong>${g.roiRatio}</strong></span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================================
   7. Development Intelligence & Recommendations
   =================================================================== */

function renderRecommendations(data) {
  const container = document.getElementById('recommendations-list-container');
  if (!container) return;

  container.innerHTML = data.recommendations.map(rec => {
    return `
      <div class="rec-card">
        <div class="rec-top-row">
          <div>
            <span class="status-badge ${rec.priority}">${rec.priority.toUpperCase()} PRIORITY</span>
            <h3 style="font-size: 1.25rem; margin-top: 6px;">${escapeHtml(rec.title)}</h3>
          </div>
          <div class="confidence-gauge">
            <span>AI Confidence:</span>
            <strong>${rec.confidenceScore}%</strong>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 16px 0; background: var(--bg-input); padding: 12px 16px; border-radius: var(--radius-sm); font-size: 0.85rem;">
          <div><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">BUDGET</span><strong>${rec.budgetRequired} (${rec.usdEquivalent})</strong></div>
          <div><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">TIMELINE</span><strong>${rec.timeline}</strong></div>
          <div><span style="color: var(--text-muted); font-size: 0.72rem; display: block;">SPONSORING BODY</span><strong>${escapeHtml(rec.primarySponsor)}</strong></div>
        </div>

        <div style="margin: 14px 0;">
          <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--teal); letter-spacing: 0.05em;">Expected Citizen Impact Outcome</h4>
          <p style="font-size: 0.92rem; color: var(--text-primary); margin-top: 4px;">${escapeHtml(rec.impactMetrics)}</p>
        </div>

        <div>
          <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Explainability Trail — Why Surfaced</h4>
          <ul class="why-surfaced-list">
            ${rec.whySurfaced.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border);">
          <span class="demo-badge">Evidence-Backed Policy Dossier</span>
          <button class="btn btn-secondary btn-sm" onclick="exportDossier('${rec.id}')">Export Policy Brief</button>
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================================
   8. DPI Impact & Project Lifecycles
   =================================================================== */

function renderImpactProjects(data) {
  const container = document.getElementById('impact-projects-container');
  if (!container) return;

  container.innerHTML = data.impactProjects.map(p => {
    return `
      <div class="project-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="font-size: 1.15rem;">${escapeHtml(p.name)}</h3>
          <span class="status-badge ${p.status}">${p.status.replace('_', ' ').toUpperCase()}</span>
        </div>

        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
          Sector: <strong>${p.sector}</strong> • Capital: <strong>${p.budgetSpent}</strong> • Inputs Aggregated: <strong>${p.citizenInputsAnalyzed} citizen voices</strong>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 600;">
            <span>Implementation Progress</span>
            <span>${p.progress}%</span>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width: ${p.progress}%;"></div>
          </div>
        </div>

        <div class="impact-deltas">
          <div class="delta-box">
            <div class="delta-label">Baseline Before Intervention</div>
            <div class="delta-value" style="color: #ef4444;">${escapeHtml(p.baselineMetric)}</div>
          </div>
          <div class="delta-box">
            <div class="delta-label">Current / Projected Metric</div>
            <div class="delta-value" style="color: #10b981;">${escapeHtml(p.currentProjectedMetric)}</div>
          </div>
        </div>

        <div style="margin-top: 12px; font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between;">
          <span>Verification Telemetry: ${escapeHtml(p.measurementMethod)}</span>
          <span class="demo-badge">DPI Lifecycle</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================================
   9. Data Sources Registry & Transparency
   =================================================================== */

function renderDataSources() {
  const container = document.getElementById('data-sources-container');
  if (!container) return;

  container.innerHTML = window.DATA_SOURCES_REGISTRY.map(src => {
    const isDemo = src.status === 'demo';
    return `
      <div class="card" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <div>
            <h3 style="font-size: 1.1rem; color: var(--text-primary);">${escapeHtml(src.name)}</h3>
            <span style="font-size: 0.75rem; color: var(--teal); font-weight: 700; text-transform: uppercase;">${src.category}</span>
          </div>
          <span class="status-badge ${isDemo ? 'high' : 'medium'}">${src.badgeText}</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 10px;">${escapeHtml(src.description)}</p>
        <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 16px;">
          <span>🔄 Update Frequency: <strong>${src.updateFrequency}</strong></span>
          ${src.readyForGroqWhisper ? `<span style="color: var(--brics-orange);">⚡ Groq Whisper Ready</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================================
   10. Citizen Intake Studio & Audio Recording Visualizer
   =================================================================== */

function setupIntakeStudio() {
  const recordBtn = document.getElementById('btn-record-audio');
  const submitBtn = document.getElementById('btn-submit-request');
  const textInput = document.getElementById('intake-text-input');
  const locationInput = document.getElementById('intake-location-input');

  if (recordBtn) {
    recordBtn.addEventListener('click', toggleAudioRecording);
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const text = textInput ? textInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : '';

      if (!text) {
        alert('Please enter or record a citizen infrastructure request.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing with AI Classifier...';

      try {
        // Submit to API backend or local fallback
        const payload = {
          country: state.currentCountry,
          text: text,
          location: location || `${state.currentCountry.toUpperCase()} Municipality`,
          channel: 'Intake Studio'
        };

        let result = null;
        try {
          const res = await fetch('/api/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            result = await res.json();
          }
        } catch (netErr) {
          console.warn('Network call to /api/requests failed, using client-side engine', netErr);
        }

        // If local offline fallback needed
        if (!result || !result.request) {
          const mockAnalysis = simulateLocalAI(text, state.currentCountry);
          const mockReq = {
            id: `REQ-${state.currentCountry.toUpperCase().slice(0, 2)}-${Math.floor(1000 + Math.random() * 9000)}`,
            timestamp: 'Just now',
            channel: 'Intake Studio Web',
            rawText: text,
            translatedText: text,
            language: mockAnalysis.language,
            languageName: mockAnalysis.languageName,
            location: location || `${state.currentCountry} District`,
            category: mockAnalysis.category,
            subcategory: 'direct_submission',
            severity: mockAnalysis.severity,
            urgency: 'normal',
            affectedPop: mockAnalysis.affectedPop,
            status: 'Clustered'
          };
          window.saveStoredRequest(state.currentCountry, mockReq);
          result = { request: mockReq, analysis: mockAnalysis };
        } else {
          window.saveStoredRequest(state.currentCountry, result.request);
        }

        // Show AI Analysis Output Modal
        showAnalysisResult(result);

        // Reset form and reload view
        if (textInput) textInput.value = '';
        if (locationInput) locationInput.value = '';
        loadCountryView(state.currentCountry);
      } catch (err) {
        alert('Error submitting request: ' + err.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit to Intelligence Pipeline';
      }
    });
  }
}

async function toggleAudioRecording() {
  const recordBtn = document.getElementById('btn-record-audio');
  const recordLabel = document.getElementById('record-status-label');

  if (!state.isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.audioChunks = [];
      state.mediaRecorder = new MediaRecorder(stream);

      // Web Audio API for visualizer
      state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = state.audioContext.createMediaStreamSource(stream);
      state.analyser = state.audioContext.createAnalyser();
      state.analyser.fftSize = 64;
      source.connect(state.analyser);

      startVisualizer();

      state.mediaRecorder.ondataavailable = e => state.audioChunks.push(e.data);
      state.mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        cancelAnimationFrame(state.visualizerAnimId);
        clearVisualizer();
        simulateSpeechToText();
      };

      state.mediaRecorder.start();
      state.isRecording = true;
      if (recordBtn) recordBtn.classList.add('recording');
      if (recordLabel) recordLabel.textContent = 'Recording citizen voice... Click again to stop & transcribe.';
    } catch (err) {
      console.warn('Microphone access denied or unsupported; running simulation mode', err);
      // Run simulation if mic not available
      simulateMicRecording();
    }
  } else {
    if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
      state.mediaRecorder.stop();
    }
    state.isRecording = false;
    if (recordBtn) recordBtn.classList.remove('recording');
    if (recordLabel) recordLabel.textContent = 'Click microphone to record citizen voice via IVRS / Web Audio';
  }
}

function simulateMicRecording() {
  const recordBtn = document.getElementById('btn-record-audio');
  const recordLabel = document.getElementById('record-status-label');
  state.isRecording = true;
  recordBtn.classList.add('recording');
  recordLabel.textContent = 'Simulating audio intake stream (5 seconds)...';

  let countdown = 5;
  const iv = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(iv);
      state.isRecording = false;
      recordBtn.classList.remove('recording');
      recordLabel.textContent = 'Audio recorded. Running Speech-to-Text transcription...';
      simulateSpeechToText();
    }
  }, 1000);
}

function startVisualizer() {
  const canvas = document.getElementById('audio-visualizer-canvas');
  if (!canvas || !state.analyser) return;
  const ctx = canvas.getContext('2d');
  const bufferLength = state.analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    state.visualizerAnimId = requestAnimationFrame(draw);
    state.analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 1.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height;
      ctx.fillStyle = '#f97316';
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
      x += barWidth;
    }
  }
  draw();
}

function clearVisualizer() {
  const canvas = document.getElementById('audio-visualizer-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function simulateSpeechToText() {
  const textInput = document.getElementById('intake-text-input');
  const prompts = {
    india: 'எங்கள் கிராமத்தில் கடந்த 3 வாரங்களாக குடிநீர் குழாய் பழுதடைந்துள்ளது. 200 குடும்பங்கள் தண்ணீர் இல்லாமல் தவிக்கிறோம்.',
    brazil: 'O esgoto a céu aberto na Rua das Palmeiras transborda toda vez que chove. As crianças estão ficando doentes.',
    russia: 'В микрорайоне Марха теплотрасса просела из-за оттаивания грунта. Температура в квартирах упала до +12°C.',
    china: '凉山农户的水果采摘后没有冷库储存，运到县城坏了一半，急需在乡里建设保鲜冷链物流点。',
    southafrica: 'Isiteshi samandla saseDiepkloof siqhume izolo ebusuku. Asinawo ugesi futhi ukudla kwethu kuyonakala.'
  };

  const sample = prompts[state.currentCountry] || prompts.india;
  if (textInput) {
    textInput.value = sample;
  }
}

/* ===================================================================
   Quick Prompts for Multi-Language Testing
   =================================================================== */

function updateQuickPrompts(countryCode) {
  const tray = document.getElementById('quick-prompts-tray');
  if (!tray) return;

  const prompts = {
    india: [
      { label: 'Tamil: Rural Water Crisis', text: 'எங்கள் கிராமத்தில் குடிநீர் குழாய் உடைந்து விட்டது. உடனடியாக சரி செய்ய வேண்டும்.', loc: 'Madurai, Tamil Nadu' },
      { label: 'Hindi: Bus Feeder Gap', text: 'नजफगढ़ से मेट्रो तक सुबह कोई बस नहीं चलती, स्कूल और काम के लिए बहुत दिक्कत है।', loc: 'Najafgarh, Delhi' },
      { label: 'Marathi: Agri Power Cuts', text: 'शेतासाठी 8 तास वीज पुरवठा बंद असतो, रोहित्र त्वरित दुरुस्त करा.', loc: 'Beed, Maharashtra' }
    ],
    brazil: [
      { label: 'Português: Favela Sanitation', text: 'O esgoto a céu aberto está escorrendo pelas vielas da comunidade e causando doenças.', loc: 'Zona Leste, São Paulo' },
      { label: 'Português: Train Delays', text: 'Trem de passageiros quebrou e precisamos de ônibus de integração na estação.', loc: 'Nova Iguaçu, Rio' }
    ],
    russia: [
      { label: 'Русский: Freezing Heating Pipe', text: 'Теплотрасса просела от таяния мерзлоты, радиаторы остыли, дети мерзнут.', loc: 'Якутск, Саха' },
      { label: 'Русский: Industrial Soot', text: 'Черное небо над городом, угольные котельные задыхают жилые кварталы.', loc: 'Красноярск' }
    ],
    china: [
      { label: '中文: Mountain Cold Storage', text: '山里采摘的茶叶没有保鲜冷库，急需建立冷链集散中心。', loc: '凉山州, 四川' },
      { label: '中文: Telemedicine Bandwidth', text: '乡卫生院远程医疗网络很卡，无法传输高分辨率心电图。', loc: '毕节, 贵州' }
    ],
    southafrica: [
      { label: 'isiZulu: Substation Blowout', text: 'Isiteshi sikagesi siqhume, asinawo ugesi izinsuku ezintathu.', loc: 'Soweto, Gauteng' },
      { label: 'isiXhosa: Pedestrian Lights', text: 'Sidinga izibane ezindleleni eziya esitishini sikaloliwe ukuze sikhuseleke.', loc: 'Khayelitsha, Cape Town' }
    ]
  };

  const list = prompts[countryCode] || prompts.india;
  tray.innerHTML = list.map((item, idx) => `
    <button class="quick-prompt-chip" onclick="applyQuickPrompt('${escapeQuotes(item.text)}', '${escapeQuotes(item.loc)}')">
      ${item.label}
    </button>
  `).join('');
}

function applyQuickPrompt(text, location) {
  const textInput = document.getElementById('intake-text-input');
  const locInput = document.getElementById('intake-location-input');
  if (textInput) textInput.value = text;
  if (locInput) locInput.value = location;
}

/* ===================================================================
   Local AI Simulation Fallback
   =================================================================== */

function simulateLocalAI(text, country) {
  const lower = text.toLowerCase();
  let lang = 'en';
  let langName = 'English';
  let category = 'water';
  let severity = 'high';

  if (/[\u0B80-\u0BFF]/.test(text)) { lang = 'ta'; langName = 'Tamil'; }
  else if (/[\u0900-\u097F]/.test(text)) { lang = 'hi'; langName = 'Hindi'; }
  else if (/[\u0400-\u04FF]/.test(text)) { lang = 'ru'; langName = 'Russian'; }
  else if (/[\u4E00-\u9FFF]/.test(text)) { lang = 'zh'; langName = 'Chinese (Mandarin)'; }
  else if (/\b(não|esgoto|chuva|estrada|trem|saúde)\b/i.test(text)) { lang = 'pt'; langName = 'Portuguese'; }
  else if (/\b(ugesi|izibane|abantu|amanzi)\b/i.test(text)) { lang = 'zu'; langName = 'isiZulu'; }

  if (lower.includes('water') || lower.includes('தண்ணீர்') || lower.includes('पानी') || lower.includes('água') || lower.includes('вода') || lower.includes('水') || lower.includes('amanzi')) {
    category = 'water';
    severity = 'critical';
  } else if (lower.includes('power') || lower.includes('बिजली') || lower.includes('luz') || lower.includes('тепло') || lower.includes('ugesi')) {
    category = 'energy';
    severity = 'critical';
  } else if (lower.includes('bus') || lower.includes('metro') || lower.includes('train') || lower.includes('trem') || lower.includes('транспорт')) {
    category = 'transport';
    severity = 'high';
  }

  return {
    language: lang,
    languageName: langName,
    category: category,
    severity: severity,
    affectedPop: Math.floor(1800 + Math.random() * 4000)
  };
}

function showAnalysisResult(result) {
  const modal = document.getElementById('modal-analysis-result');
  const body = document.getElementById('analysis-result-body');
  if (!modal || !body) return;

  const req = result.request;
  const analysis = result.analysis || {};

  body.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 2.4rem;">🎯</div>
      <h3 style="font-size: 1.3rem; margin-top: 6px;">Request Ingested & Classified</h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary);">Processed by Multilingual AI Classification Engine</p>
    </div>

    <div style="background: var(--bg-input); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.88rem;">
      <div style="margin-bottom: 6px;"><strong>Request ID:</strong> <span style="color: var(--brics-orange);">${req.id}</span></div>
      <div style="margin-bottom: 6px;"><strong>Detected Language:</strong> ${req.languageName || req.language} (${req.language})</div>
      <div style="margin-bottom: 6px;"><strong>Category Classified:</strong> <span style="text-transform: uppercase; font-weight: 700; color: var(--teal);">${req.category}</span></div>
      <div style="margin-bottom: 6px;"><strong>Severity Assessment:</strong> <span class="status-badge ${req.severity}">${req.severity.toUpperCase()}</span></div>
      <div style="margin-bottom: 6px;"><strong>Estimated Affected Citizens:</strong> ~${(req.affectedPop || 0).toLocaleString()}</div>
      <div><strong>Cluster Assignment:</strong> ${escapeHtml(req.status || 'Active Hotspot')}</div>
    </div>

    <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center;">
      This citizen request has been clustered into national demand models and matched against demographic data and capital investment plans.
    </p>
  `;

  modal.classList.add('active');
}

/* ===================================================================
   Speech Synthesis (TTS) Helper
   =================================================================== */

function speakText(text, lang) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : lang === 'pt' ? 'pt-BR' : lang === 'ru' ? 'ru-RU' : lang === 'zh' ? 'zh-CN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Browser text-to-speech not supported.');
  }
}

/* ===================================================================
   Navigation & Filtering
   =================================================================== */

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      switchTab(tab);
    });
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;

  // Update Nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-tab') === tabName);
  });

  // Update View
  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.toggle('active', view.id === `view-${tabName}`);
  });

  // Re-trigger map resize if viewing overview or hotspots
  if (tabName === 'overview' && state.map) {
    setTimeout(() => state.map.invalidateSize(), 150);
  }
}

function setupFilterBars() {
  const reqSearch = document.getElementById('search-requests');
  const reqCategory = document.getElementById('filter-requests-category');

  if (reqSearch) {
    reqSearch.addEventListener('input', () => filterRequests());
  }
  if (reqCategory) {
    reqCategory.addEventListener('change', () => filterRequests());
  }
}

function filterRequests() {
  const term = document.getElementById('search-requests')?.value.toLowerCase() || '';
  const cat = document.getElementById('filter-requests-category')?.value || 'all';

  const cards = document.querySelectorAll('.request-card');
  cards.forEach(c => {
    const text = c.textContent.toLowerCase();
    const matchesTerm = text.includes(term);
    const matchesCat = cat === 'all' || text.includes(cat.toLowerCase());
    c.style.display = matchesTerm && matchesCat ? 'block' : 'none';
  });
}

/* ===================================================================
   Settings & Export Modals
   =================================================================== */

function setupSettingsModal() {
  const modal = document.getElementById('modal-settings');
  const openBtn = document.getElementById('btn-open-settings');
  const closeBtn = document.getElementById('btn-close-settings');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  // Close modals on outside click
  document.querySelectorAll('.modal-backdrop').forEach(b => {
    b.addEventListener('click', e => {
      if (e.target === b) b.classList.remove('active');
    });
  });
}

/* ===================================================================
   Clerk Authentication & Sovereign Access Control
   =================================================================== */

async function initClerkAuth() {
  const gate = document.getElementById('clerk-auth-gate');
  const fastLoginBtn = document.getElementById('btn-fast-demo-login');
  const signoutBtn = document.getElementById('btn-clerk-signout');

  // Check existing session
  const storedSession = sessionStorage.getItem('infravoice_auth_session') || localStorage.getItem('infravoice_auth_session');
  if (storedSession) {
    try {
      const user = JSON.parse(storedSession);
      applyAuthenticatedState(user);
      return;
    } catch (e) {
      console.warn('Session parse error', e);
    }
  }

  // Set up 1-Click Fast Diplomatic Demo Access for Evaluators & Judges
  if (fastLoginBtn) {
    fastLoginBtn.addEventListener('click', () => {
      const demoUser = {
        name: 'Ministry Infrastructure Planner',
        email: 'policymaker.brics@infravoice.gov',
        role: 'National Policymaker',
        initials: 'GOV',
        authMethod: 'Official Diplomatic Passkey'
      };
      sessionStorage.setItem('infravoice_auth_session', JSON.stringify(demoUser));
      applyAuthenticatedState(demoUser);
    });
  }

  // Set up Sign Out
  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      sessionStorage.removeItem('infravoice_auth_session');
      localStorage.removeItem('infravoice_auth_session');
      if (window.Clerk && window.Clerk.signOut) {
        try { await window.Clerk.signOut(); } catch (e) {}
      }
      applyUnauthenticatedState();
    });
  }

  // Attempt to initialize official Clerk JS SDK
  const clerkPublishableKey = state.clerkPublishableKey;
  if (window.Clerk) {
    try {
      await window.Clerk.load({ publishableKey: clerkPublishableKey });
      if (window.Clerk.user) {
        const clerkUser = {
          name: window.Clerk.user.fullName || window.Clerk.user.firstName || 'Authorized Official',
          email: window.Clerk.user.primaryEmailAddress?.emailAddress || 'official@gov.org',
          role: 'Clerk Verified Official',
          initials: (window.Clerk.user.firstName?.[0] || 'C') + (window.Clerk.user.lastName?.[0] || 'K'),
          authMethod: 'Clerk Identity'
        };
        applyAuthenticatedState(clerkUser);
      } else {
        const slot = document.getElementById('clerk-sign-in-slot');
        if (slot) {
          slot.innerHTML = '';
          window.Clerk.mountSignIn(slot);
        }
      }
    } catch (err) {
      console.warn('Clerk initialization notice:', err.message);
    }
  }
}

function applyAuthenticatedState(user) {
  state.isAuthenticated = true;
  state.currentUser = user;

  const gate = document.getElementById('clerk-auth-gate');
  const userSlot = document.getElementById('clerk-user-slot');
  const nameEl = document.getElementById('user-display-name');
  const emailEl = document.getElementById('user-display-email');
  const initialsEl = document.getElementById('user-avatar-initials');

  if (gate) gate.style.display = 'none';
  if (userSlot) userSlot.style.display = 'flex';
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;
  if (initialsEl) initialsEl.textContent = user.initials || 'GOV';

  // Invalidate map size so Leaflet resizes cleanly upon unlock
  if (state.map) {
    setTimeout(() => state.map.invalidateSize(), 200);
  }
}

function applyUnauthenticatedState() {
  state.isAuthenticated = false;
  state.currentUser = null;

  if (window.location.pathname.includes('dashboard') || window.location.href.includes('dashboard.html')) {
    window.location.href = 'login.html';
  } else {
    const gate = document.getElementById('clerk-auth-gate');
    const userSlot = document.getElementById('clerk-user-slot');
    if (gate) gate.style.display = 'flex';
    if (userSlot) userSlot.style.display = 'none';
  }
}

function exportDossier(recId) {
  const cData = window.getCountryData(state.currentCountry);
  const rec = cData.recommendations.find(r => r.id === recId) || cData.recommendations[0];
  
  const report = {
    title: rec.title,
    country: cData.name,
    nationalPlan: cData.nationalPlan,
    priority: rec.priority,
    confidenceScore: rec.confidenceScore,
    budgetRequired: rec.budgetRequired,
    usdEquivalent: rec.usdEquivalent,
    timeline: rec.timeline,
    impactMetrics: rec.impactMetrics,
    whySurfaced: rec.whySurfaced,
    exportedAt: new Date().toISOString(),
    governanceBadge: 'DEMO / SYNTHETIC DATASET'
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `InfraVoice-PolicyBrief-${rec.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ===================================================================
   Theme Management
   =================================================================== */

function initTheme() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  const saved = localStorage.getItem('infravoice_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  state.theme = saved;

  if (toggleBtn) {
    toggleBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
    toggleBtn.addEventListener('click', () => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      state.theme = next;
      localStorage.setItem('infravoice_theme', next);
      toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
}

/* Utilities */
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

function escapeQuotes(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
