/**
 * preCICE Dark Mode
 * - Persists preference in localStorage
 * - Applies theme before DOM paint to avoid flash
 * - Animates stat counters on the landing page
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'precice-theme';

  /* ── Apply saved theme immediately (before DOMContentLoaded) ── */
  var savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  /* ── Helpers ── */
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  }

  function updateButton(theme) {
    var btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = '&#9728;&#xFE0F; Light';
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.setAttribute('title', 'Switch to light mode');
    } else {
      btn.innerHTML = '&#127769; Dark';
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.setAttribute('title', 'Switch to dark mode');
    }
  }

  function toggleTheme() {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  /* ── Stat counter animation ── */
  function animateCounters() {
    var els = document.querySelectorAll('.stat-number[data-target]');
    els.forEach(function (el) {
      var target  = parseInt(el.getAttribute('data-target'), 10);
      var suffix  = el.getAttribute('data-suffix') || '';
      var current = 0;
      var step    = Math.max(1, Math.ceil(target / 50));
      var timer   = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + suffix;
      }, 25);
    });
  }

  /* ── Wire everything up after DOM is ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('dark-mode-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
      updateButton(currentTheme());
    }

    /* Run counter animation only on landing page */
    if (document.querySelector('.stats-banner')) {
      animateCounters();
    }
  });
})();
