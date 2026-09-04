/* ============================================================================
   Loaded by every page. Mobile menu, disclosure controls, printing, and the
   copyright year. The opening animation lives in hero.js and runs only on the
   home page.
   ============================================================================ */
(function () {
  var nav = document.getElementById('nav-links');

  /* One delegated listener handles the hamburger and the disclosure controls,
     rather than binding a listener to each. */
  document.addEventListener('click', function (e) {
    var burger = e.target.closest ? e.target.closest('.nav-toggle') : null;
    if (burger) {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }

    /* Expand all / Collapse all, wherever a page declares the buttons. */
    var bulk = e.target.closest ? e.target.closest('[data-details]') : null;
    if (bulk) {
      var scope = document.querySelector(bulk.getAttribute('data-scope'));
      eachDetails(function (d) { d.open = bulk.getAttribute('data-details') === 'open'; }, scope);
      return;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      var b = document.querySelector('.nav-toggle');
      if (b) {
        b.setAttribute('aria-expanded', 'false');
        b.focus();
      }
    }
  });

  /* Printing: open every disclosure so nothing is missing from the page, then
     put them back the way the reader left them. */
  function eachDetails(fn, scope) {
    [].forEach.call((scope || document).querySelectorAll('details'), fn);
  }
  window.addEventListener('beforeprint', function () {
    eachDetails(function (d) {
      if (d.open) d.setAttribute('data-was-open', '');
      d.open = true;
    });
  });
  window.addEventListener('afterprint', function () {
    eachDetails(function (d) {
      d.open = d.hasAttribute('data-was-open');
      d.removeAttribute('data-was-open');
    });
  });

  [].forEach.call(document.querySelectorAll('.year'), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
