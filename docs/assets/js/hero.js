/* ============================================================================
   The hero figure on the home page.

   The figure is a painting, not a chart that a painting loads into. Once this
   script runs, the 81 <rect> elements in index.html are hidden and every mark
   on screen is a brushstroke. There is no finished state to arrive at.

   Those 81 rects keep their real job. They are the specification the matrix
   layout reads, and they are what a reader sees when this script does not run:
   with scripting off, or with reduced motion, the flat matrix renders exactly
   as it always did and nothing here ever touches it.

   The strokes are conserved. None is created or destroyed after setup; the
   same marks are slowly rearranged between four configurations, which is the
   argument the figure makes. One dataset, four analytical lenses, in the order
   that spells the lab's name:

     M/A   multi-omic analytics      a sparse abundance matrix
     T/R   translational research    two arms separating over time
     I     inference                 an effect estimate and its uncertainty
     X     explainable AI            ranked feature attributions

   Between configurations the strokes migrate. Within one, the only motion is
   each stroke breathing on its own randomised cycle, which is the optical
   shimmer of a broken-color surface and nothing that pulls the eye.
   ============================================================================ */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('hero-anim')) return;

  var copy = document.querySelector('.hero-copy');
  var svg = document.getElementById('matrix-figure');
  var note = document.querySelector('.figure-note');

  function reveal() { root.classList.remove('hero-anim'); }

  /* The hero must never depend on an animation having run. Drop the entrance
     classes once the sequence has had its time, so every element falls back to
     its own resting style rather than sitting on the opening frame of a
     fill-mode animation. */
  function settleDown() {
    reveal();
    [].forEach.call(document.querySelectorAll('.hero-copy > .rise'), function (el) {
      el.classList.remove('rise');
      el.style.animationDelay = '';
    });
  }

  if (!copy) { reveal(); return; }

  /* A hidden tab gets no animation frames. Rather than giving up on the figure
     for the life of the page, wait for the reader to actually arrive. */
  if (document.hidden) {
    reveal();
    document.addEventListener('visibilitychange', function once() {
      if (document.hidden) return;
      document.removeEventListener('visibilitychange', once);
      begin();
    });
    return;
  }

  begin();

  function begin() {
    var SVGNS = 'http://www.w3.org/2000/svg';
    var VIEW = 274;         /* the figure's viewBox, in user units */
    var CELL = 26;
    var MID = 137;          /* centre line: the null, and the bars' origin */
    var SCATTER = 0.08;     /* share of strokes that resolve into nothing */
    var HOLD = 7000;        /* ms a configuration is held */
    var MORPH = 5000;       /* ms to reorganise into the next one */

    function rnd(lo, hi) { return lo + Math.random() * (hi - lo); }
    function pick(a) { return a[(Math.random() * a.length) | 0]; }
    /* Three samples averaged: a rough bell, so marks cluster on a centre
       instead of spreading evenly. Spans roughly -spread to +spread. */
    function jitter(spread) {
      return ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2 * spread;
    }

    /* ---- The hero copy rises in sequence, on every visit. ---- */
    [].forEach.call(copy.children, function (el, i) {
      el.style.animationDelay = (60 + i * 55) + 'ms';
      el.classList.add('rise');
    });
    setTimeout(settleDown, 1400);

    if (!svg) { reveal(); return; }

    /* ---- Read the matrix. It is the specification, never duplicated here. ---- */
    var warmCells = [], coolCells = [];
    [].forEach.call(svg.children, function (r) {
      if (r.tagName !== 'rect') return;
      var fill = r.getAttribute('fill');
      if (!fill || fill === 'none') return;          /* hollow structural zero */
      var w = parseFloat(r.getAttribute('fill-opacity')) || 0;
      if (w <= 0) return;
      var cell = {
        cx: parseFloat(r.getAttribute('x')) + CELL / 2,
        cy: parseFloat(r.getAttribute('y')) + CELL / 2,
        w: w
      };
      (fill.indexOf('fig-warm') > -1 ? warmCells : coolCells).push(cell);
    });
    if (!warmCells.length || !coolCells.length) { reveal(); return; }

    /* Cumulative weights, so a cell is drawn with probability proportional to
       its value and density carries the data. */
    function cumulate(cells) {
      var total = 0;
      cells.forEach(function (c) { total += c.w; c.cum = total; });
      cells.total = total;
    }
    cumulate(warmCells);
    cumulate(coolCells);

    function drawCell(cells) {
      var t = Math.random() * cells.total;
      for (var i = 0; i < cells.length; i++) if (cells[i].cum >= t) return cells[i];
      return cells[cells.length - 1];
    }

    /* ---- Build the strokes, once. ---- */
    var narrow = !window.matchMedia('(min-width: 941px)').matches;
    var N = narrow ? 150 : 300;
    var WARM_SHARE = 0.62;   /* matches the 28 warm to 17 cool cells */

    var layer = document.createElementNS(SVGNS, 'g');
    layer.setAttribute('class', 'touch-layer');
    layer.setAttribute('aria-hidden', 'true');

    var strokes = [];
    for (var i = 0; i < N; i++) {
      var warm = i < N * WARM_SHARE;
      var scatter = (i % Math.round(1 / SCATTER)) === 0;
      var len = rnd(9, 24), wid = rnd(3.5, 6);
      var base = rnd(0.07, 0.26) * (scatter ? 0.55 : 1);

      var el = document.createElementNS(SVGNS, 'rect');
      /* Centred on the origin, so the transform alone carries every placement.
         That is what lets one element serve four different layouts. */
      el.setAttribute('x', (-len / 2).toFixed(1));
      el.setAttribute('y', (-wid / 2).toFixed(1));
      el.setAttribute('width', len.toFixed(1));
      el.setAttribute('height', wid.toFixed(1));
      el.setAttribute('rx', (wid / 2).toFixed(1));   /* a capsule: one loaded touch */
      el.setAttribute('fill', warm ? 'var(--fig-warm)' : 'var(--fig-cool)');
      el.style.setProperty('--o', base.toFixed(3));
      el.style.opacity = base.toFixed(3);

      /* Every stroke breathes, and no two on the same clock: a negative delay
         starts each one mid-cycle, so the ensemble never repeats and never
         resynchronises. Running opacity through the keyframes for all of them
         also means one --gain on the layer can lift a whole configuration. */
      el.style.animationName = 'shimmer';
      el.style.animationDuration = rnd(7, 15).toFixed(1) + 's';
      el.style.animationDelay = '-' + rnd(0, 15).toFixed(1) + 's';

      strokes.push({
        el: el, warm: warm, scatter: scatter, angle: 0,
        delay: Math.round(rnd(0, 800))
      });
    }

    /* Shuffle so paint order interleaves warm and cool, rather than laying
       every cool stroke over every warm one. */
    for (var j = strokes.length - 1; j > 0; j--) {
      var k = (Math.random() * (j + 1)) | 0;
      var tmp = strokes[j]; strokes[j] = strokes[k]; strokes[k] = tmp;
    }
    strokes.forEach(function (s) { layer.appendChild(s.el); });
    svg.appendChild(layer);
    svg.classList.add('painted');    /* only now: the rects become the fallback */

    /* ---- The four configurations. Each returns a target for one stroke. ---- */

    /* M/A. Cells are drawn by weight, and three strokes in ten cross to the
       other palette, so each cell carries a minority of its complement and the
       two mix optically rather than sitting as flat fills. */
    function matrix(s) {
      var cross = Math.random() < 0.3;
      var cells = (s.warm !== cross) ? warmCells : coolCells;
      var c = drawCell(cells);
      return {
        x: c.cx + jitter(11),
        y: c.cy + jitter(11),
        /* mostly along the sample axis, some across it: a weave, not a scatter */
        a: (Math.random() < 0.3 ? 90 : 0) + jitter(28)
      };
    }

    /* T/R. Two arms separating over time. The warm arm declines slowly, the
       cool one steeply, and each stroke lies along its curve's tangent. */
    function arms(s) {
      var tau = s.warm ? 320 : 85;
      var x = rnd(14, 262);
      var y = 25 + 200 * (1 - Math.exp(-x / tau));
      var slope = (200 / tau) * Math.exp(-x / tau);
      return { x: x, y: y + jitter(5), a: Math.atan(slope) * 180 / Math.PI + jitter(7) };
    }

    /* I. A posterior and its interval. The mode sits right of the null, so the
       estimate has a direction; warm strokes take the mass right of it and cool
       the mass left, which puts the sign of the effect in the palette. One
       stroke in ten stands in the three vertical rules: the null and the two
       interval bounds. */
    var MU = 160, SIGMA = 44, FLOOR = 246;
    var BOUNDS = [MID, MU - 1.96 * SIGMA, MU + 1.96 * SIGMA];
    function posterior(s) {
      /* The rules stop short of the top so they read as marks under the
         density rather than as bars competing with it. */
      if (Math.random() < 0.12) {
        return { x: pick(BOUNDS) + jitter(1.2), y: rnd(104, FLOOR), a: 90 + jitter(3) };
      }
      /* Rejection against the stroke's own side. The split at the null is 38%
         left, which is the cool share, so this settles in a try or two. */
      var x = 0;
      for (var t = 0; t < 24; t++) {
        x = MU + jitter(1) * SIGMA * 2;
        if (s.warm === (x >= MID)) break;
      }
      x = Math.max(16, Math.min(VIEW - 16, x));
      var h = 144 * Math.exp(-0.5 * Math.pow((x - MU) / SIGMA, 2));
      return { x: x, y: FLOOR - Math.random() * h, a: jitter(12) };
    }

    /* X. Ranked attributions. Warm strokes build the positive bars, cool the
       negative ones, and strokes per bar are proportional to bar length so the
       ranking is carried by density as well as by extent. */
    /* Ranked by magnitude with the signs alternating, which is what an
       attribution plot actually looks like: the ordering is by how much a
       feature moved the prediction, not by which direction it moved it. */
    var BARS = [
      { row: 0, len: 110, warm: true },
      { row: 1, len: 88,  warm: false },
      { row: 2, len: 66,  warm: true },
      { row: 3, len: 52,  warm: false },
      { row: 4, len: 38,  warm: true },
      { row: 5, len: 26,  warm: false }
    ];
    var warmBars = [], coolBars = [];
    BARS.forEach(function (b) { (b.warm ? warmBars : coolBars).push(b); });

    function drawBar(bars) {
      var total = 0, i;
      for (i = 0; i < bars.length; i++) total += bars[i].len;
      var t = Math.random() * total, run = 0;
      for (i = 0; i < bars.length; i++) { run += bars[i].len; if (run >= t) return bars[i]; }
      return bars[bars.length - 1];
    }
    function attribution(s) {
      var b = drawBar(s.warm ? warmBars : coolBars);
      var x = s.warm ? MID + rnd(2, b.len) : MID - rnd(2, b.len);
      return { x: x, y: 46 + b.row * 34 + jitter(9), a: jitter(8) };
    }

    /* The noise the estimate discards. Present in every configuration, part of
       none of them, and re-placed each time so it never looks frozen. */
    function stray() {
      return { x: rnd(-24, VIEW + 24), y: rnd(-24, VIEW + 24), a: rnd(-90, 90) };
    }

    /* gain compensates for how widely a configuration spreads the same strokes.
       The matrix packs all of them into 45 small cells; a pair of curves draws
       the same number across the full width, so without this the figure would
       visibly dim and brighten as it reorganised. */
    var PHASES = [
      { layout: matrix,      gain: 1,    caption: 'Multi-omic analytics: a sparse abundance matrix' },
      { layout: arms,        gain: 1.55, caption: 'Translational research: two arms separating over time' },
      { layout: posterior,   gain: 1.25, caption: 'Inference: an effect estimate and its uncertainty' },
      { layout: attribution, gain: 1.45, caption: 'Explainable AI: ranked feature attributions' }
    ];

    /* CSS interpolates the degree value literally, so 350 to 10 spins the long
       way round. Carry the angle forward unwrapped and pick the representation
       nearest the one the stroke is already holding. */
    function nearest(current, target) {
      var a = target;
      while (a - current > 180) a -= 360;
      while (a - current < -180) a += 360;
      return a;
    }

    function place(s, layout) {
      var t = s.scatter ? stray() : layout(s);
      s.angle = nearest(s.angle, t.a);
      s.el.style.transform =
        'translate(' + t.x.toFixed(1) + 'px,' + t.y.toFixed(1) + 'px) ' +
        'rotate(' + s.angle.toFixed(1) + 'deg)';
    }

    function setCaption(text) {
      if (!note) return;
      note.classList.add('fading');
      setTimeout(function () {
        note.textContent = text;
        note.classList.remove('fading');
      }, 300);
    }

    var phase = 0;

    function applyPhase(k) {
      phase = k;
      layer.style.setProperty('--gain', PHASES[k].gain);
      var layout = PHASES[k].layout;
      strokes.forEach(function (s) {
        s.el.style.transitionDelay = s.delay + 'ms';
        place(s, layout);
      });
      setCaption(PHASES[k].caption);
    }

    /* ---- Arrival ------------------------------------------------------------
       The scatter-and-converge entrance runs once per session. Returning to the
       home page from Publications should not replay it, but the figure is alive
       either way: the gate decides how the strokes arrive, not whether they
       move afterwards. */
    var seen = false;
    try {
      seen = sessionStorage.getItem('matrix-opened') === '1';
      sessionStorage.setItem('matrix-opened', '1');
    } catch (e) { /* private mode: treat as a first visit */ }

    /* Lighting the layer is idempotent and is driven from two places: a double
       frame, which is what makes the entrance animate, and a timeout, because
       frames are not guaranteed to arrive at all. Without the second the figure
       would sit at opacity 0 for the life of the page in any tab the browser
       never paints. */
    var started = false;
    function launch() {
      if (started) return;
      started = true;
      layer.classList.remove('instant');
      layer.classList.add('lit');
      if (!seen) applyPhase(0);
      setTimeout(function () { layer.classList.remove('arriving'); }, 2000);
    }

    if (seen) {
      layer.classList.add('instant');
      layer.style.setProperty('--gain', PHASES[0].gain);
      strokes.forEach(function (s) { s.el.style.transitionDelay = '0ms'; place(s, matrix); });
      if (note) note.textContent = PHASES[0].caption;
    } else {
      strokes.forEach(function (s) { s.angle = rnd(-90, 90); place(s, stray); });
      layer.classList.add('arriving');
    }
    requestAnimationFrame(function () { requestAnimationFrame(launch); });
    setTimeout(launch, 400);

    /* ---- The cycle, and the two reasons to stop it ---------------------------
       A perpetual animation has to be honest about battery. It runs only while
       the figure is on screen and the tab is being looked at. */
    var timer = null, running = true;
    var onScreen = true, visible = !document.hidden;

    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(function () {
        applyPhase((phase + 1) % PHASES.length);
        schedule();
      }, HOLD + MORPH);
    }

    function sync() {
      var go = onScreen && visible;
      if (go === running) return;
      running = go;
      layer.classList.toggle('paused', !go);
      if (go) schedule(); else clearTimeout(timer);
    }

    schedule();

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        sync();
      }, { threshold: 0 }).observe(svg);
    }
    document.addEventListener('visibilitychange', function () {
      visible = !document.hidden;
      sync();
    });

    /* A small hook so the cycle can be stepped in testing without waiting out
       twelve seconds a phase. */
    window.matrixFigure = {
      step: function () { applyPhase((phase + 1) % PHASES.length); schedule(); },
      go: function (k) { applyPhase(k); schedule(); },
      phase: function () { return phase; },
      count: function () { return strokes.length; }
    };
  }
})();
