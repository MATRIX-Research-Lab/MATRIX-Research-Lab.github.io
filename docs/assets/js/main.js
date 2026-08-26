// MATRIX Lab - small helpers. No frameworks, no build step.

// 1. Mobile navigation toggle
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.nav-toggle');
  if (!btn) return;
  var links = document.getElementById('nav-links');
  var open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// 2. Keep the footer copyright year current automatically
document.querySelectorAll('.year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
