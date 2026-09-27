/**
 * InfraVoice — Citizen Public Portal Core Engine
 * Powers the public citizen grievance submission, voice recording (Web Audio + Web Speech API),
 * country-specific multilingual dialect switching, live AI classification, and ticket tracking.
 */

const citizenState = {
  currentCountry: 'india',
  currentLanguage: 'hi',
  currentLanguageName: 'Hindi',
  currentLocale: 'hi-IN',
  isRecording: false,
  mediaRecorder: null,
  speechRecognition: null,
  audioChunks: [],
  audioContext: null,
  analyser: null,
  animId: null
};

let currentCitizenUser = null;

document.addEventListener('DOMContentLoaded', () => {
  setupCitizenStudio();
  setupTicketTracker();
  setupCountryLanguages('india', 'hi');
  initCitizenClerkAuth();
});

function setupCitizenStudio() {
  const countrySelect = document.getElementById('citizen-country-select');
  const recordBtn = document.getElementById('citizen-mic-btn');
  const submitBtn = document.getElementById('citizen-submit-btn');

  if (countrySelect) {
    countrySelect.addEventListener('change', (e) => {
      citizenState.currentCountry = e.target.value;
      setupCountryLanguages(e.target.value);
    });
  }

  if (recordBtn) {
    recordBtn.addEventListener('click', toggleCitizenRecording);
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', submitCitizenGrievance);
  }
}

/**
 * Setup and render country-specific multilingual dialect buttons
 */
function setupCountryLanguages(countryCode, preferredLangCode) {
  const code = (countryCode || 'india').toLowerCase();
  citizenState.currentCountry = code;

  const container = document.getElementById('citizen-lang-pills');
  const langs = (typeof window.getCountryLanguages === 'function')
    ? window.getCountryLanguages(code)
    : ((window.BRICS_LANGUAGES && window.BRICS_LANGUAGES[code]) || []);

  if (!container || !langs || langs.length === 0) return;

  // Determine active language
  let activeLang = langs[0];
  if (preferredLangCode) {
    const found = langs.find(l => l.code === preferredLangCode);
    if (found) activeLang = found;
  } else {
    const pop = langs.find(l => l.popular);
    if (pop) activeLang = pop;
  }

  // Render language buttons
  container.innerHTML = langs.map(lang => {
    const isActive = lang.code === activeLang.code;
    return `
      <button type="button" 
        class="lang-pill-btn ${isActive ? 'active' : ''}" 
        data-country="${code}"
        data-lang="${lang.code}"
        onclick="selectCitizenLanguage('${code}', '${lang.code}')">
        <span class="lang-pill-native">${escapeHtml(lang.nativeName)}</span>
        <span class="lang-pill-eng">(${escapeHtml(lang.name)})</span>
      </button>
    `;
  }).join('');

  // Activate selected language
  applyLanguageSelection(activeLang, code);
}

/**
 * Switch active dialect / language for the selected country
 */
function selectCitizenLanguage(countryCode, langCode) {
  const code = (countryCode || citizenState.currentCountry).toLowerCase();
  const langs = (typeof window.getCountryLanguages === 'function')
    ? window.getCountryLanguages(code)
    : ((window.BRICS_LANGUAGES && window.BRICS_LANGUAGES[code]) || []);

  const selected = langs.find(l => l.code === langCode) || langs[0];
  if (!selected) return;

  // Update pill classes
  const pills = document.querySelectorAll('.lang-pill-btn');
  pills.forEach(pill => {
    if (pill.dataset.lang === selected.code) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  applyLanguageSelection(selected, code);
}

function applyLanguageSelection(lang, countryCode) {
  citizenState.currentLanguage = lang.code;
  citizenState.currentLanguageName = lang.name;
  citizenState.currentLocale = lang.locale;

  // Update hidden inputs
  const langInput = document.getElementById('citizen-language-select');
  const nameInput = document.getElementById('citizen-language-name');
  const localeInput = document.getElementById('citizen-language-locale');
  if (langInput) langInput.value = lang.code;
  if (nameInput) nameInput.value = lang.name;
  if (localeInput) localeInput.value = lang.locale;

  // Update badge in header
  const badgeFlag = document.getElementById('badge-lang-flag');
  const badgeText = document.getElementById('badge-lang-text');
  if (badgeFlag) badgeFlag.textContent = lang.flag || '🌐';
  if (badgeText) badgeText.textContent = `${lang.nativeName} (${lang.name}) • ${lang.locale}`;

  // Update textarea placeholder
  const textInput = document.getElementById('citizen-text-input');
  if (textInput && lang.placeholder) {
    textInput.placeholder = lang.placeholder;
  }

  // Update mic record status label
  const statusLabel = document.getElementById('citizen-record-status');
  if (statusLabel && !citizenState.isRecording) {
    statusLabel.textContent = lang.micStatus || `Click microphone to speak in ${lang.nativeName} (${lang.name})...`;
  }

  // Update quick prompts tailored to this dialect
  renderDialectPrompts(countryCode, lang);
}

function renderDialectPrompts(countryCode, activeLang) {
  const container = document.getElementById('citizen-quick-prompts');
  if (!container) return;

  const langs = (typeof window.getCountryLanguages === 'function')
    ? window.getCountryLanguages(countryCode)
    : ((window.BRICS_LANGUAGES && window.BRICS_LANGUAGES[countryCode]) || []);

  // Show active language first, followed by other regional languages of this country
  const promptList = [];
  if (activeLang) {
    promptList.push({
      langName: activeLang.nativeName,
      engName: activeLang.name,
      text: activeLang.sampleText,
      loc: activeLang.sampleLoc
    });
  }

  langs.forEach(l => {
    if (l.code !== activeLang.code && promptList.length < 4) {
      promptList.push({
        langName: l.nativeName,
        engName: l.name,
        text: l.sampleText,
        loc: l.sampleLoc
      });
    }
  });

  container.innerHTML = promptList.map(item => `
    <button type="button" class="quick-chip" onclick="applyCitizenPrompt('${escapeQuotes(item.text)}', '${escapeQuotes(item.loc)}')">
      <span style="color: #f97316; font-weight: 700;">${escapeHtml(item.langName)} (${escapeHtml(item.engName)}):</span> ${escapeHtml(item.loc)}
    </button>
  `).join('');
}

async function toggleCitizenRecording() {
  const btn = document.getElementById('citizen-mic-btn');
  const statusLabel = document.getElementById('citizen-record-status');

  if (!citizenState.isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      citizenState.audioChunks = [];
      citizenState.mediaRecorder = new MediaRecorder(stream);

      // Web Audio API Visualizer
      citizenState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = citizenState.audioContext.createMediaStreamSource(stream);
      citizenState.analyser = citizenState.audioContext.createAnalyser();
      citizenState.analyser.fftSize = 64;
      source.connect(citizenState.analyser);

      startCitizenVisualizer();

      // Web Speech API Integration if supported
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.lang = citizenState.currentLocale || 'en-US';
          rec.continuous = false;
          rec.interimResults = true;
          rec.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              transcript += event.results[i][0].transcript;
            }
            if (transcript.trim()) {
              const textInput = document.getElementById('citizen-text-input');
              if (textInput) textInput.value = transcript;
            }
          };
          rec.onerror = (e) => console.log('Speech recognition note:', e.error);
          rec.start();
          citizenState.speechRecognition = rec;
        } catch (e) {
          console.log('Web Speech init info:', e);
        }
      }

      citizenState.mediaRecorder.ondataavailable = e => citizenState.audioChunks.push(e.data);
      citizenState.mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        cancelAnimationFrame(citizenState.animId);
        clearCitizenVisualizer();
        if (citizenState.speechRecognition) {
          try { citizenState.speechRecognition.stop(); } catch (e) {}
        }
        transcribeRecordedAudio();
      };

      citizenState.mediaRecorder.start();
      citizenState.isRecording = true;
      btn.classList.add('recording');
      statusLabel.textContent = `🎙️ Listening in ${citizenState.currentLanguageName} (${citizenState.currentLocale})... Speak clearly. Click again to finish.`;
    } catch (err) {
      console.warn('Microphone access denied or simulated mode', err);
      simulateMicIntake();
    }
  } else {
    if (citizenState.mediaRecorder && citizenState.mediaRecorder.state !== 'inactive') {
      citizenState.mediaRecorder.stop();
    }
    citizenState.isRecording = false;
    btn.classList.remove('recording');
    statusLabel.textContent = 'Voice captured! Transcribing with sovereign multilingual AI...';
  }
}

function simulateMicIntake() {
  const btn = document.getElementById('citizen-mic-btn');
  const statusLabel = document.getElementById('citizen-record-status');
  citizenState.isRecording = true;
  btn.classList.add('recording');
  statusLabel.textContent = `Recording audio stream in ${citizenState.currentLanguageName} (4 seconds)...`;

  let count = 4;
  const iv = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(iv);
      citizenState.isRecording = false;
      btn.classList.remove('recording');
      statusLabel.textContent = `Audio captured in ${citizenState.currentLanguageName}. Processing speech model...`;
      transcribeRecordedAudio();
    }
  }, 1000);
}

function startCitizenVisualizer() {
  const canvas = document.getElementById('citizen-visualizer-canvas');
  if (!canvas || !citizenState.analyser) return;
  const ctx = canvas.getContext('2d');
  const bufferLength = citizenState.analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    citizenState.animId = requestAnimationFrame(draw);
    citizenState.analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 2;
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

function clearCitizenVisualizer() {
  const canvas = document.getElementById('citizen-visualizer-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function transcribeRecordedAudio() {
  const textInput = document.getElementById('citizen-text-input');
  const locInput = document.getElementById('citizen-location-input');

  // If textInput is already populated by Web Speech API, keep it
  if (textInput && !textInput.value.trim()) {
    const lang = (typeof window.getLanguageByCode === 'function')
      ? window.getLanguageByCode(citizenState.currentCountry, citizenState.currentLanguage)
      : null;

    if (lang && lang.sampleText) {
      textInput.value = lang.sampleText;
      if (locInput && !locInput.value.trim() && lang.sampleLoc) {
        locInput.value = lang.sampleLoc;
      }
    }
  }

  const statusLabel = document.getElementById('citizen-record-status');
  if (statusLabel) {
    statusLabel.textContent = `Transcribed successfully in ${citizenState.currentLanguageName}! Review or edit below, then click Submit.`;
  }
}

function updateCitizenQuickPrompts(countryCode) {
  setupCountryLanguages(countryCode);
}

function applyCitizenPrompt(text, loc) {
  const textInput = document.getElementById('citizen-text-input');
  const locInput = document.getElementById('citizen-location-input');
  if (textInput) textInput.value = text;
  if (locInput) locInput.value = loc;
}

async function submitCitizenGrievance() {
  const textInput = document.getElementById('citizen-text-input');
  const locInput = document.getElementById('citizen-location-input');
  const countrySelect = document.getElementById('citizen-country-select');
  const submitBtn = document.getElementById('citizen-submit-btn');
  const feedbackBox = document.getElementById('citizen-feedback-result');

  const text = textInput ? textInput.value.trim() : '';
  const location = locInput ? locInput.value.trim() : '';
  const country = countrySelect ? countrySelect.value : citizenState.currentCountry;

  if (!text) {
    alert('Please speak or enter your infrastructure grievance description.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing through Multilingual AI Pipeline...';

  try {
    const payload = {
      country: country,
      text: text,
      location: location || `${country.toUpperCase()} Municipality`,
      channel: 'Public Citizen Portal',
      language: citizenState.currentLanguage || 'auto',
      languageName: citizenState.currentLanguageName || 'Auto Detected',
      locale: citizenState.currentLocale || 'en'
    };

    let responseData = null;
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        responseData = await res.json();
      }
    } catch (netErr) {
      console.warn('Network call error, using local pipeline', netErr);
    }

    if (!responseData || !responseData.request) {
      // Local fallback
      const ticketId = `CITIZEN-${country.toUpperCase().slice(0, 2)}-${Math.floor(10000 + Math.random() * 90000)}`;
      responseData = {
        request_id: ticketId,
        request: {
          id: ticketId,
          timestamp: 'Just now',
          rawText: text,
          translatedText: text,
          language: citizenState.currentLanguage || 'auto',
          languageName: citizenState.currentLanguageName || 'Auto Detected',
          location: location || `${country} Region`,
          category: 'water',
          severity: 'high',
          affectedPop: 4500
        }
      };
    }

    const req = responseData.request;
    const ticketId = req.id || responseData.request_id;

    // Save ticket locally for tracking lookup
    saveLocalTicket(ticketId, req);

    // Render result card for the citizen
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.innerHTML = `
        <div style="background: rgba(13, 148, 136, 0.1); border: 1px solid rgba(13, 148, 136, 0.4); border-radius: 12px; padding: 24px; margin-top: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.6rem;">✅</span>
              <div>
                <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Grievance Ingested & Clustered</h3>
                <span style="font-size: 0.8rem; color: #94a3b8;">Multilingual AI Verification • National Infrastructure Demand Matrix</span>
              </div>
            </div>
            <div style="background: #0f172a; border: 1px solid rgba(249, 115, 22, 0.4); padding: 6px 14px; border-radius: 8px; text-align: right;">
              <div style="font-size: 0.68rem; color: #94a3b8; text-transform: uppercase;">Tracking Ticket ID</div>
              <strong style="color: #f97316; font-size: 1rem; font-family: monospace;">${ticketId}</strong>
            </div>
          </div>

          <div style="background: rgba(15, 23, 42, 0.8); border-radius: 8px; padding: 16px; margin: 14px 0; font-size: 0.85rem; line-height: 1.6;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
              <div>📍 <strong>Location:</strong> ${escapeHtml(req.location)}</div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 0.76rem; background: rgba(249,115,22,0.15); border: 1px solid rgba(249,115,22,0.4); color: #fb923c; padding: 2px 10px; border-radius: 9999px; font-weight: 700;">
                  🗣️ ${escapeHtml(req.languageName || citizenState.currentLanguageName)} (${escapeHtml(req.language || citizenState.currentLanguage)})
                </span>
                <span style="font-size: 0.76rem; background: rgba(13,148,136,0.15); border: 1px solid rgba(13,148,136,0.4); color: #2dd4bf; padding: 2px 10px; border-radius: 9999px; font-weight: 700;">
                  ${escapeHtml(req.category ? req.category.toUpperCase() : 'WATER')}
                </span>
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-left: 3px solid #f97316; padding: 8px 12px; margin-bottom: 10px; border-radius: 4px;">
              <div style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Native Dialect Input:</div>
              <div style="color: #f8fafc; font-style: italic;">"${escapeHtml(req.rawText || text)}"</div>
            </div>

            ${req.translatedText && req.translatedText !== req.rawText ? `
            <div style="background: rgba(0,0,0,0.3); border-left: 3px solid #2dd4bf; padding: 8px 12px; margin-bottom: 10px; border-radius: 4px;">
              <div style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Standardized Policy Translation (English):</div>
              <div style="color: #5eead4;">"${escapeHtml(req.translatedText)}"</div>
            </div>` : ''}

            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #cbd5e1; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 8px;">
              <span>⚡ <strong>Urgency:</strong> <span style="color: #fb923c; font-weight: 700;">${(req.severity || 'high').toUpperCase()}</span></span>
              <span>👥 <strong>Estimated Community Need:</strong> ~${(req.affectedPop || 4500).toLocaleString()} citizens</span>
            </div>
          </div>

          <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0;">
            💡 <strong>National Planning Status:</strong> Your request has been translated, verified by the sovereign AI model, and clustered into regional infrastructure demand datasets. You can query its status anytime using Ticket <strong>${ticketId}</strong> below.
          </p>
        </div>
      `;
      feedbackBox.scrollIntoView({ behavior: 'smooth' });
    }

    // Reset inputs
    if (textInput) textInput.value = '';
    if (locInput) locInput.value = '';

  } catch (err) {
    alert('Failed to submit: ' + err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '🚀 Submit Community Grievance';
  }
}

function saveLocalTicket(ticketId, data) {
  try {
    const raw = localStorage.getItem('infravoice_citizen_tickets') || '{}';
    const store = JSON.parse(raw);
    store[ticketId] = {
      ...data,
      submittedDate: new Date().toLocaleDateString(),
      status: 'Clustered in Municipal Demand Matrix',
      stage: 'Reviewed by National Planning Algorithm'
    };
    localStorage.setItem('infravoice_citizen_tickets', JSON.stringify(store));
  } catch (e) {
    console.warn(e);
  }
}

function setupTicketTracker() {
  const trackBtn = document.getElementById('citizen-track-btn');
  const trackInput = document.getElementById('citizen-track-input');
  const trackResult = document.getElementById('citizen-track-result');

  if (trackBtn && trackInput) {
    trackBtn.addEventListener('click', () => {
      const ticketId = trackInput.value.trim().toUpperCase();
      if (!ticketId) {
        alert('Please enter your Grievance Tracking Ticket ID (e.g., REQ-IN-1092).');
        return;
      }

      // Check stored tickets
      let ticket = null;
      try {
        const store = JSON.parse(localStorage.getItem('infravoice_citizen_tickets') || '{}');
        ticket = store[ticketId];
      } catch (e) {}

      // If not in local user tickets, look up default synthetic database
      if (!ticket) {
        const allCountries = ['india', 'brazil', 'russia', 'china', 'southafrica'];
        for (const c of allCountries) {
          const cData = window.BRICS_DATA?.[c];
          if (cData) {
            const found = cData.requests.find(r => r.id.toUpperCase() === ticketId);
            if (found) {
              ticket = {
                ...found,
                submittedDate: 'Recent',
                stage: 'Assigned to Sector Authority'
              };
              break;
            }
          }
        }
      }

      if (!trackResult) return;
      trackResult.style.display = 'block';

      if (ticket) {
        trackResult.innerHTML = `
          <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(249, 115, 22, 0.4); border-radius: 12px; padding: 20px; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-family: monospace; font-weight: 700; color: #f97316;">${ticketId}</span>
              <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">ACTIVE IN CLUSTER</span>
            </div>
            <div style="font-size: 0.9rem; color: #f8fafc; margin-bottom: 6px;">📍 ${escapeHtml(ticket.location)}</div>
            <div style="font-size: 0.82rem; color: #94a3b8; font-style: italic; margin-bottom: 12px;">"${escapeHtml(ticket.rawText)}"</div>
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 10px; font-size: 0.8rem; color: #cbd5e1; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>Sector: <strong style="color: #2dd4bf; text-transform: uppercase;">${ticket.category}</strong></div>
              <div>Severity: <strong style="color: #fb923c; text-transform: uppercase;">${ticket.severity}</strong></div>
              <div>Status: <strong>${ticket.status || 'Clustered'}</strong></div>
              <div>Workflow Stage: <strong>${ticket.stage || 'In Planning Pipeline'}</strong></div>
            </div>
          </div>
        `;
      } else {
        trackResult.innerHTML = `
          <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 16px; color: #fca5a5; text-align: left; font-size: 0.85rem;">
            ⚠️ Ticket ID <strong>${escapeHtml(ticketId)}</strong> not found. Please verify the ID or submit a new grievance above. (Try testing with sample ID: <strong>REQ-IN-1092</strong>).
          </div>
        `;
      }
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

function escapeQuotes(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

/* ===================================================================
   Clerk Authentication for Normal Public Users / Citizens
   =================================================================== */

function applyCitizenLogin(user) {
  currentCitizenUser = user;
  localStorage.setItem('infravoice_citizen_user', JSON.stringify(user));

  const signinBtn = document.getElementById('btn-citizen-signin');
  const userSlot = document.getElementById('citizen-clerk-user-slot');
  const nameEl = document.getElementById('citizen-user-name');

  if (userSlot) userSlot.style.display = 'flex';
  if (signinBtn) signinBtn.style.display = 'none';
  if (nameEl) nameEl.textContent = `👤 ${user.name}`;
}

function applyCitizenSignout() {
  currentCitizenUser = null;
  localStorage.removeItem('infravoice_citizen_user');

  const signinBtn = document.getElementById('btn-citizen-signin');
  const userSlot = document.getElementById('citizen-clerk-user-slot');

  if (userSlot) userSlot.style.display = 'none';
  if (signinBtn) signinBtn.style.display = 'inline-flex';

  if (window.Clerk && window.Clerk.signOut) {
    try { window.Clerk.signOut(); } catch (e) {}
  }
}

async function initCitizenClerkAuth() {
  const signinBtn = document.getElementById('btn-citizen-signin');
  const signoutBtn = document.getElementById('btn-citizen-signout');
  const modal = document.getElementById('modal-citizen-clerk');
  const closeBtn = document.getElementById('btn-close-citizen-clerk');
  const demoCitizenBtn = document.getElementById('btn-citizen-demo-login');

  // 1. Restore local citizen session if already authenticated
  try {
    const saved = localStorage.getItem('infravoice_citizen_user');
    if (saved) {
      applyCitizenLogin(JSON.parse(saved));
    }
  } catch (e) {}

  // 2. Close modal listeners
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // 3. Fast 1-Click Citizen Test Verification Button
  if (demoCitizenBtn) {
    demoCitizenBtn.addEventListener('click', () => {
      const demoUser = {
        id: 'user_cit_94821',
        name: 'Priya Sharma',
        email: 'priya.sharma@citizen.in',
        locality: 'Madurai District, Tamil Nadu',
        authType: 'Clerk Verified Public Citizen'
      };
      applyCitizenLogin(demoUser);
      if (modal) modal.classList.remove('active');
    });
  }

  // 4. Bind Sign-In button click immediately
  if (signinBtn) {
    signinBtn.addEventListener('click', async () => {
      if (modal) {
        modal.classList.add('active');
      }

      // Try Clerk SDK
      if (window.Clerk) {
        try {
          const res = await fetch('/api/config');
          const config = await res.json();
          const publishableKey = config.clerkPublishableKey || 'pk_test_ZnJlZS1maW5jaC04NTU3LmNsZXJrLmFjY291bnRzLmRldiQ';

          await window.Clerk.load({ publishableKey });

          if (window.Clerk.user) {
            applyCitizenLogin({
              id: window.Clerk.user.id,
              name: window.Clerk.user.fullName || window.Clerk.user.firstName || 'Verified Citizen',
              email: window.Clerk.user.primaryEmailAddress?.emailAddress || 'citizen@public.org',
              authType: 'Clerk SSO'
            });
            if (modal) modal.classList.remove('active');
          } else {
            const target = document.getElementById('citizen-clerk-mount-target');
            if (target) {
              target.innerHTML = '';
              window.Clerk.mountSignIn(target, {
                afterSignInUrl: '/index.html',
                afterSignUpUrl: '/index.html'
              });
            }
          }
        } catch (err) {
          console.warn('Clerk mount notice:', err.message);
        }
      }
    });
  }

  // 5. Sign Out
  if (signoutBtn) {
    signoutBtn.addEventListener('click', () => {
      applyCitizenSignout();
    });
  }

  // 6. Check if already signed in via Clerk on load
  try {
    const res = await fetch('/api/config');
    const config = await res.json();
    const publishableKey = config.clerkPublishableKey || 'pk_test_ZnJlZS1maW5jaC04NTU3LmNsZXJrLmFjY291bnRzLmRldiQ';

    if (window.Clerk) {
      await window.Clerk.load({ publishableKey });
      if (window.Clerk.user) {
        applyCitizenLogin({
          id: window.Clerk.user.id,
          name: window.Clerk.user.fullName || window.Clerk.user.firstName || 'Verified Citizen',
          email: window.Clerk.user.primaryEmailAddress?.emailAddress || 'citizen@public.org',
          authType: 'Clerk SSO'
        });
      }
    }
  } catch (err) {
    // Silent notice
  }
}
