/**
 * MP Policing Guide v2.1.0 — Enhancements Module
 * Visual polish, UX improvements, keyboard shortcuts
 */

// APP VERSION & BUILD INFO
const APP_VERSION = '2.1.0';
const BUILD_DATE = new Date().toISOString().split('T')[0];
const BUILD_TIME = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

// ===== VISUAL ENHANCEMENTS =====

// Enhanced card hover effects with elevation
function enhanceCardHovers() {
  const style = document.createElement('style');
  style.textContent = `
    .card, .card-secondary, .home-tile, .recent-item, .fav-item {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card:hover, .card-secondary:hover, .home-tile:hover, .recent-item:hover, .fav-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
      border-color: var(--red-l) !important;
    }
    
    /* Better verification badge visibility */
    .verify-badge {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border: 1px solid rgba(216, 161, 58, 0.4);
      box-shadow: 0 0 8px rgba(216, 161, 58, 0.2);
    }
    
    .verify-badge::before {
      content: '⚠';
      font-size: 0.65rem;
      font-weight: bold;
    }
    
    /* Custom offence badge distinction */
    .custom-badge {
      background: linear-gradient(135deg, var(--red), var(--red-dark));
      box-shadow: 0 2px 8px rgba(var(--red-rgb), 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Improved transitions */
    .tab, .chip, .sq-btn, .add-btn, .settings-btn {
      transition: all 0.15s ease-out;
    }
    
    .tab:hover, .chip:hover, .sq-btn:hover, .add-btn:hover, .settings-btn:hover {
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);
}

// ===== VERSION INFO IN SETTINGS =====

function addVersionInfo() {
  const aboutBlock = document.querySelector('[data-setting="about"]');
  if (!aboutBlock) {
    const settingsView = document.getElementById('view-settings');
    const aboutSection = settingsView.querySelector('.setting-block:last-child');
    if (aboutSection) {
      const versionHtml = `
        <div class="setting-block" data-setting="version">
          <div class="setting-label">Version & Build</div>
          <div class="note">
            <strong>MP Policing Guide v${APP_VERSION}</strong><br>
            Built: ${BUILD_DATE} at ${BUILD_TIME} UTC<br>
            Last updated: September 1, 2026
          </div>
        </div>
      `;
      aboutSection.insertAdjacentHTML('beforebegin', versionHtml);
    }
  }
}

// ===== KEYBOARD SHORTCUTS =====

function initKeyboardShortcuts() {
  const shortcuts = {
    '?': () => showShortcutsHelp(),
    'Shift+k': () => focusSearch(),
    'Shift+f': () => goToFavorites(),
    'Shift+a': () => goToHome(),
    'Escape': () => closeModals()
  };

  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing in textarea/input
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    const key = e.key;
    const shiftKey = e.shiftKey;
    const combo = shiftKey ? `Shift+${key}` : key;

    if (shortcuts[combo]) {
      e.preventDefault();
      shortcuts[combo]();
    }
  });
}

function showShortcutsHelp() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-head">
        <div class="modal-title">Keyboard Shortcuts</div>
        <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
      </div>
      <div style="font-size: 0.8rem; line-height: 1.8;">
        <div style="margin-bottom: 10px;">
          <strong>?</strong> — Show this help<br>
          <strong>Shift + K</strong> — Focus search<br>
          <strong>Shift + F</strong> — Go to Favourites<br>
          <strong>Shift + A</strong> — Go to Home<br>
          <strong>Esc</strong> — Close modals
        </div>
        <div class="note">Shortcuts work when not typing in a field.</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function focusSearch() {
  const searchInput = document.getElementById('homeSearchInput') || document.getElementById('globalSearchInput');
  if (searchInput) searchInput.focus();
}

function goToFavorites() {
  const homeTab = document.querySelector('.tab[data-tab="home"]');
  if (homeTab) homeTab.click();
  setTimeout(() => {
    const favSection = document.querySelector('.home-sub');
    if (favSection) favSection.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function goToHome() {
  const homeTab = document.querySelector('.tab[data-tab="home"]');
  if (homeTab) homeTab.click();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeModals() {
  document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
}

// ===== CONTENT ENHANCEMENTS =====

// Add sentencing info to offences
function addSentencingInfo() {
  const sentencingMap = {
    'Common assault': 'Summary: Fine/6 months',
    'Assault occasioning actual bodily harm (ABH)': 'Summary: 6 months | Indictable: 5 years',
    'Wounding or grievous bodily harm (GBH)': 'Summary: 6 months | Indictable: 5 years',
    'Wounding or GBH with intent': 'Indictable only: 15 years',
    'Rape': 'Indictable only: Life',
    'Theft': 'Summary: 6 months/£5,000 | Indictable: 7 years',
    'Robbery': 'Indictable only: Life',
    'Burglary': 'Summary: 6 months | Indictable: 14 years',
    'Fraud by false representation': 'Summary: 12 months/£5,000 | Indictable: 10 years',
    'Criminal damage': 'Summary: 3 months/£1,000 | Indictable: 10 years',
    'Possession of a controlled drug': 'Summary: 6 months/£1,000+ | Indictable: 7 years',
    'Dangerous driving': 'Summary: 6 months/£1,000 | Indictable: 2 years',
    'Murder': 'Mandatory life',
    'Manslaughter': 'Indictable only: Life'
  };

  document.querySelectorAll('.card-title').forEach(title => {
    const offenceName = title.textContent.trim();
    if (sentencingMap[offenceName]) {
      const sentenceDiv = document.createElement('div');
      sentenceDiv.className = 'field-row';
      sentenceDiv.innerHTML = `
        <div class="field-label">Sentencing (CPS/CJA Guidelines)</div>
        <div class="field-val" style="color: var(--amber);">${sentencingMap[offenceName]}</div>
      `;
      const cardBody = title.closest('.card').querySelector('.card-body');
      if (cardBody && !cardBody.querySelector('.field-val[style*="amber"]')) {
        cardBody.insertBefore(sentenceDiv, cardBody.firstChild);
      }
    }
  });
}

// Add common defences
function addCommonDefences() {
  const defenceMap = {
    'Common assault': ['Consent (limited)', 'Self-defence', 'No unlawful force'],
    'Theft': ['Honest belief in right', 'Mistake as to ownership', 'Abandoned property'],
    'Burglary': ['No trespass', 'No intent at time of entry'],
    'Criminal damage': ['Lawful excuse', 'Consent of owner', 'Protecting property'],
    'Assault occasioning actual bodily harm (ABH)': ['Consent (limited)', 'Self-defence', 'Accident']
  };

  document.querySelectorAll('.card-body').forEach(body => {
    const title = body.parentElement.querySelector('.card-title').textContent.trim();
    if (defenceMap[title] && !body.querySelector('.defence-section')) {
      const defenceDiv = document.createElement('div');
      defenceDiv.className = 'field-row defence-section';
      defenceDiv.innerHTML = `
        <div class="field-label">Common Defences</div>
        <ul class="points" style="margin: 0; padding: 0;">
          ${defenceMap[title].map(d => `<li>${d}</li>`).join('')}
        </ul>
      `;
      body.appendChild(defenceDiv);
    }
  });
}

// ===== INIT ALL ENHANCEMENTS =====

function initEnhancements() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runEnhancements);
  } else {
    runEnhancements();
  }
}

function runEnhancements() {
  enhanceCardHovers();
  addVersionInfo();
  initKeyboardShortcuts();
  addSentencingInfo();
  addCommonDefences();
  
  console.log(`✓ MP Policing Guide v${APP_VERSION} enhancements loaded`);
}

// Start on page load
initEnhancements();
