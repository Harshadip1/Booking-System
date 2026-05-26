const ThemeManager = (() => {
  const KEY = 'schedulehub-theme';

  function get() {
    return localStorage.getItem(KEY) || 'dark';
  }

  function set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  function toggle() {
    set(get() === 'dark' ? 'light' : 'dark');
  }

  function init() {
    set(get());
    document.getElementById('theme-toggle')?.addEventListener('click', toggle);
    const lang = localStorage.getItem('schedulehub-lang');
    if (lang) document.getElementById('lang-select')?.setAttribute('value', lang);
    document.getElementById('lang-select')?.addEventListener('change', (e) => {
      localStorage.setItem('schedulehub-lang', e.target.value);
      App.toast('Language preference saved', 'success');
    });
  }

  return { get, set, toggle, init };
})();

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
