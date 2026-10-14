document.addEventListener('DOMContentLoaded', function () {
  var TOGGLE_BTN_ID = 'theme-toggle-btn'; // <-- change if your button's ID is different
  var DARK_CLASS = 'dark-theme';          // <-- change if your dark-mode class is different
  var STORAGE_KEY = 'theme';

  var toggleBtn = document.getElementById(TOGGLE_BTN_ID);

  function applyTheme(theme) {
    document.body.classList.toggle(DARK_CLASS, theme === 'dark');
  }

  // 1. Check localStorage first
  var saved = localStorage.getItem(STORAGE_KEY);

  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else {
    // 2. No saved preference yet — fall back to the OS/browser setting
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // 3. Toggle on click, and remember the choice
  toggleBtn.addEventListener('click', function () {
    var isDark = document.body.classList.toggle(DARK_CLASS);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  });
});