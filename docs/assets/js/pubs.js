/* ============================================================================
   Renders window.PUBLICATIONS (from publications.js) into #pub-output.
   You should not need to edit this file — add papers in publications.js.
   ============================================================================ */
(function () {
  var mount = document.getElementById('pub-output');
  if (!mount || !window.PUBLICATIONS) return;

  var pubs = window.PUBLICATIONS.slice().sort(function (a, b) { return b.year - a.year; });

  var GROUPS = {
    methods:       'First & corresponding author',
    collaborative: 'Collaborative',
    chapter:       'Book chapters'
  };

  var VIEWS = [
    { id: 'featured',      label: 'Selected',       test: function (p) { return p.featured; } },
    { id: 'methods',       label: 'First author',   test: function (p) { return p.group === 'methods'; } },
    { id: 'collaborative', label: 'Collaborative',  test: function (p) { return p.group === 'collaborative'; } },
    { id: 'all',           label: 'All',            test: function () { return true; } }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Bold the PI's name wherever it appears, keeping any *, † or ‡ marker. */
  function markMe(authors) {
    return esc(authors).replace(/Lin H([*†‡]*)/g, '<span class="me">Lin H$1</span>');
  }

  function renderItem(p) {
    var h = '<li>';
    h += '<span class="pub-title">' + esc(p.title) + '</span>';
    h += '<p class="pub-authors">' + markMe(p.authors) + '.</p>';
    h += '<p class="pub-venue">' + p.venue + ', ' + p.year + '.'
       + (p.status ? ' <em style="color:var(--muted)">' + esc(p.status) + '.</em>' : '')
       + '</p>';

    var links = [];
    if (p.doi) {
      links.push('<a class="tag tag-hi" href="https://doi.org/' + esc(p.doi) + '">DOI</a>');
    }
    if (p.software) {
      links.push('<a class="tag" href="software.html">Software: ' + esc(p.software) + '</a>');
    }
    (p.tags || []).forEach(function (t) {
      links.push('<span class="tag">' + esc(t) + '</span>');
    });
    if (links.length) h += '<p class="pub-links">' + links.join('') + '</p>';

    return h + '</li>';
  }

  function render(viewId) {
    var view = VIEWS.filter(function (v) { return v.id === viewId; })[0] || VIEWS[0];
    var shown = pubs.filter(view.test);
    var html = '';

    if (viewId === 'all') {
      /* Grouped by kind, so the full list stays readable. */
      Object.keys(GROUPS).forEach(function (g) {
        var inGroup = shown.filter(function (p) { return p.group === g; });
        if (!inGroup.length) return;
        html += '<h2 style="margin-top:2.6rem">' + GROUPS[g] + '</h2>';
        html += '<ul class="pub-list">' + inGroup.map(renderItem).join('') + '</ul>';
      });
    } else {
      html += '<ul class="pub-list">' + shown.map(renderItem).join('') + '</ul>';
    }

    mount.innerHTML = html;

    var count = document.getElementById('pub-count');
    if (count) {
      count.textContent = shown.length + ' of ' + pubs.length + ' publications';
    }

    [].forEach.call(document.querySelectorAll('[data-view]'), function (b) {
      var on = b.getAttribute('data-view') === viewId;
      b.classList.toggle('btn-primary', on);
      b.classList.toggle('btn-outline', !on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* Build the filter bar. */
  var bar = document.getElementById('pub-filters');
  if (bar) {
    bar.innerHTML = VIEWS.map(function (v) {
      return '<button type="button" class="btn btn-outline" data-view="' + v.id + '">'
           + v.label + '</button>';
    }).join('');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]');
      if (b) render(b.getAttribute('data-view'));
    });
  }

  render('featured');
})();
