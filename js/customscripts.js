/**
 * Site-wide behaviors (Bootstrap 5 native APIs + vanilla DOM).
 * jQuery is still loaded in head.html for toc.js and Algolia instantsearch only.
 */

// DOMContentLoaded: replaces $(document).ready() for sidebar, tooltips, anchors, collapse
document.addEventListener('DOMContentLoaded', function () {
  // Viewport height > 700px → sticky doc sidebar (#mysidebar)
  if (window.innerHeight > 700) {
    var sidebar = document.getElementById('mysidebar');
    if (sidebar) {
      sidebar.classList.add('sticky-top');
      sidebar.style.top = '20px';
    }
  }

  // bootstrap.Tooltip replaces $.fn.tooltip()
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
    bootstrap.Tooltip.getOrCreateInstance(el, { placement: 'top' });
  });

  if (typeof anchors !== 'undefined') {
    anchors.add('main h2:not(.no-anchor),main h3:not(.no-anchor),main h4:not(.no-anchor),main h5:not(.no-anchor)');
  }

  // Leaf nav clicks: bootstrap.Collapse.hide() replaces $('.collapse.show').collapse('hide')
  document.querySelectorAll('.sidebar-nav a.nav-link:not([data-bs-toggle="collapse"])').forEach(function (link) {
    link.addEventListener('click', function () {
      var parentUl = link.closest('ul');
      if (!parentUl) return;
      parentUl.querySelectorAll('.collapse.show').forEach(function (collapseEl) {
        var instance = bootstrap.Collapse.getInstance(collapseEl);
        if (instance) {
          instance.hide();
        } else {
          bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false }).hide();
        }
      });
    });
  });

});

// Click delegation: logo wall filter (replaces $(document).on('click', '.logowall-filter .filter-btn', ...))
document.addEventListener('click', function (event) {
  var button = event.target.closest('.logowall-filter .filter-btn');
  if (!button) return;

  var filter = String(button.dataset.filter || '').toLowerCase();
  var filterBar = button.closest('.logowall-filter');
  var targetSel = filterBar && filterBar.getAttribute('data-logowall-target');
  var grid = targetSel ? document.querySelector(targetSel) : null;
  if (!grid) return;

  var items = grid.querySelectorAll('.logo-item');
  if (!items.length) return;

  event.preventDefault();

  filterBar.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.classList.remove('active', 'btn-primary');
    btn.classList.add('btn-secondary');
    btn.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('active', 'btn-primary');
  button.classList.remove('btn-secondary');
  button.setAttribute('aria-pressed', 'true');

  items.forEach(function (item) {
    var category = String(item.dataset.category || '').toLowerCase();
    var matches = filter === 'all' || category === filter;
    item.classList.toggle('d-none', !matches);
  });
});
