// Light/dark theme. Loaded in <head> so the saved theme applies before first paint.
(function () {
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  function current() { return root.dataset.theme || (media.matches ? 'dark' : 'light'); }
  function syncMeta() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = current() === 'dark' ? '#171513' : '#f7f3ec';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'theme-toggle';
    b.innerHTML =
      '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>';
    function label() { b.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); }
    b.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      label(); syncMeta();
    });
    label(); syncMeta();
    var bar = document.querySelector('.topbar .end-group');
    if (bar) { b.classList.add('in-bar'); bar.appendChild(b); }
    else document.body.appendChild(b);
  });
  if (media.addEventListener) media.addEventListener('change', syncMeta);
})();
