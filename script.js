document.addEventListener('DOMContentLoaded', function () {
  var TOGGLE_BTN_ID = 'theme-toggle-btn';
  var DARK_CLASS = 'dark-theme';
  var STORAGE_KEY = 'theme';

  var toggleBtn = document.getElementById(TOGGLE_BTN_ID);
  if (!toggleBtn) return; // button missing: do nothing instead of throwing an error

  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function writeSaved(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    document.body.classList.toggle(DARK_CLASS, isDark);
    toggleBtn.textContent = isDark ? '🌙' : '☀️';
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  // 1. Saved choice wins; otherwise follow the device's light/dark setting
  var saved = readSaved();
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // 2. Toggle on click and remember the choice
  toggleBtn.addEventListener('click', function () {
    var next = document.body.classList.contains(DARK_CLASS) ? 'light' : 'dark';
    applyTheme(next);
    writeSaved(next);
  });
});