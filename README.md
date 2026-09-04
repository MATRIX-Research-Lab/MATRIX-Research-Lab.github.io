# MATRIX Lab website

Static HTML, CSS, and a small amount of JavaScript. No build step and no dependencies.

## Layout

```
docs/                  Site files. GitHub Pages serves this folder.
org-profile-README.md  Text for the organization page at github.com/MATRIX-Research-Lab.
README.md              This file.
```

Inside `docs/`:

```
index.html          Home
research.html       Research threads
grants.html         Funding, current and past
publications.html   Publication list
software.html       ANCOMBC, MetVAE, q2-composition
teaching.html       Courses, talks, open materials
mentoring.html      Mentee projects and committees
people.html         PI, mentees, collaborators
join.html           Graduate admissions pointer
contact.html        Email, phone, office

assets/css/style.css      Styling. Colors are in the :root block at the top.
assets/js/main.js         Mobile menu, disclosure controls, printing, copyright year.
assets/js/hero.js         The hero figure. Home page only.
assets/js/publications.js Publication list. Edit this to add a paper.
assets/js/pubs.js         Rendering code for that list.
assets/img/               Photos.
assets/files/             PDFs.
```

## Local preview

```bash
cd docs && python3 -m http.server 8000
```

Open <http://localhost:8000>, edit a file, save, reload. `docs/start-preview.bat` does the
same on Windows.

## Editing

Text sits between HTML tags. Change the text and leave the tags alone.

- Colors and fonts: `docs/assets/css/style.css`, `:root` block at the top.
- Publications: edit `docs/assets/js/publications.js`, not `publications.html`. Copy a
  `{ ... }` block and fill it in. `featured: true` puts a paper in the default view.
- Grants, courses, mentee projects: copy an `<li> ... </li>` block inside the relevant
  `<ul class="pub-list">`. All three pages use the same format.
- People: copy a `<div class="card member"> ... </div>` block.
- Photos: save into `docs/assets/img/` and point an `<img>` at it. Save as JPEG at about
  600 by 900 pixels; the cards render at roughly 200 by 230, so anything larger is wasted
  bandwidth, and a multi-megabyte file committed to git stays in the history for good.
  Card frames are 3:4 portrait and crop rather than stretch, biased toward the top of the
  frame, so a portrait headshot works without hand-cropping.
- Tags: `tag-on` sage, `tag-off` neutral, `tag-hi` red.
- Navigation and footer are repeated in all ten files. Adding or renaming a page means
  editing every one, and each page marks its own item with `aria-current="page"`, so keep
  the ten copies identical apart from that.
- The icon sprite is the second block repeated in all ten files, for the same reason: there
  is no build step. See "Icons" below.
- Motion: durations and easings are tokens in the `:root` block (`--dur`, `--ease`, and
  the rest). Use them rather than writing a new literal duration.

## Color

Every color is a token in the `:root` block. Two rules keep the page calm, and both are
easy to undo by accident.

**The red is reserved.** `--brand` appears in five places and nowhere else: the brand dot,
the current-page navigation item, the primary button, the tagline rule, and `.tag-hi`. The
focus ring is a sixth, deliberate, because a focus indicator should be the most distinct
thing on the page. Adding a sixth decorative use is what made the old palette loud; if
something needs emphasis, reach for `--accent` (ochre) or `--ink`.

    grep -n 'var(--brand)' docs/assets/css/style.css

should return those six lines and no others.

**Links are ink, not colored.** Body links are `--ink` with an `--accent` underline, and
move to `--accent` on hover. Chrome links (nav, buttons, brand, cards, tags) set
`text-decoration: none` explicitly, so a new link-like component needs that opt-out too.

The surfaces are warm neutrals (`--paper`, `--paper-warm`, `--paper-tint`) and so are the
inks and hairlines. `--fig-warm` and `--fig-cool` are held separately from the UI accent so
the hero artwork can stay vivid while the interface recedes; the 81 matrix cells reference
those two and nothing else.

Contrast was checked against WCAG AA for normal text. The tightest pairs are `--muted` on
`--paper-tint` at 4.9:1 and `--accent` on `--paper-warm` at 5.2:1, so lightening either
token is what would break it first.

## Icons

Fourteen icons live in one hidden `<svg class="icon-defs">` block just after `<body>`,
repeated in all ten files, and are used as:

```html
<svg class="ic" viewBox="0 0 24 24"><use href="#ic-composition"/></svg>
```

An external sprite file would avoid the duplication, but `<use href="file.svg#id">` across
documents is unsupported in Chrome and Safari, and injecting the sprite with JavaScript
would break it with scripting off. Repeating about 2KB per page is the cheaper trade.

Stroke weight, cap and join are set once on `.ic` in the stylesheet rather than on each
`<use>`. Those properties are inherited, so they cross into the shadow content that `<use>`
generates; that is why the symbols carry geometry only. Changing the weight of every icon
on the site is one line.

Icons render at 56px in a `.card .icon` frame, and at 72px and 18% opacity as the
`.page-mark` beside each interior page heading.

## Publishing

```bash
git add -A && git commit -m "Describe the change" && git push
```

The live site at <https://matrix-research-lab.github.io/> updates within a couple of minutes.
Pages settings are under Settings > Pages > Source: deploy from branch `main`, folder `/docs`.

Two constraints come from GitHub rather than from preference:

- The repository name `MATRIX-Research-Lab.github.io` is what puts the site at the bare
  organization address instead of a subpath.
- Branch-based Pages publishes only from the repository root or from a folder named `docs`.

The repository also has to stay public, since Pages on a free organization plan does not
serve private repositories.

For a custom address such as `matrixlab.umd.edu`, ask UMD IT about a CNAME record, then set
it under Settings > Pages > Custom domain.

## Organization page

`github.com/MATRIX-Research-Lab` displays `profile/README.md` from a separate repository
named `.github`. Keep the working copy in `org-profile-README.md` here and paste it across
when it changes.

## Publication list

Google Scholar blocks automated access, so the page cannot pull from it directly.
`docs/assets/js/publications.js` mirrors the publication section of the CV, and the page
renders from that file. Scholar stays linked for the complete record.

## Outstanding

- [ ] Office and phone: the site footers, contact page and `org-profile-README.md` still
      carry 4200 Valley Drive, Suite 2242 and 301-405-2438. Both are pending an update.
- [ ] Syllabus PDF at `docs/assets/files/epib674-syllabus.pdf`, if it becomes public
- [ ] Mentee names and photos in `docs/people.html`
- [ ] Citation counts on `docs/index.html`, once or twice a year
- [ ] Teaching philosophy and mentoring paragraphs, in your own words
- [ ] Terp Young Scholars course number, title, and year in `docs/teaching.html`, once VPAC
      approves the course and Extended Studies accepts it. Working plan in `tys-plan.md`,
      which is gitignored and stays out of the public repository.

## Commented-out sections

Recruiting content is commented out rather than deleted, ready to restore when there are
funded openings:

- `docs/join.html`: audience cards, how to reach out, what we look for
- `docs/index.html`: "Interested in working with us?"
- `docs/mentoring.html`: "Looking for a mentor?"

`docs/teaching.html` carries a whole commented-out "Teaching before college" section for the
Terp Young Scholars course, and `docs/mentoring.html` a commented sentence pointing at it. Both
stay hidden until the course is approved. Uncommenting the teaching section also means putting
`class="soft"` back on the invited talks section and taking it off open materials, so the page
keeps alternating background bands.

`docs/people.html` also carries three commented templates, each with a filled-in example row
to copy: the postdoc card grid, the undergraduate and high school roster, and the alumni
section.

## Navigation

Nine flat items, every page one click from every other page:

```
Research  Grants  Publications  Software  Teaching  Mentoring  People  Join  Contact
```

Home is the brand mark on the left, which carries `aria-current="page"` on the home page;
every other page carries it on its own item.

These were once five items with Grants and Software folded under Research, Join under
People and Mentoring under Teaching. The fold was a mistake: a visitor looking for grant or
software information had no reason to open a chevron, so the two pages that most establish
the lab's record were the two hardest to reach. Nothing is hidden behind a hover or a tap
any more, and the submenu machinery is gone with it: no `.has-sub`, no `.sub`, no
`.sub-toggle`, no `closeSubs`, and no `:focus-within` rules to keep working with scripting
off.

Nine items measure 682px at `.84rem` beside a 202px brand, so the bar holds down to a 940px
viewport and collapses to the drawer below that. That is the same breakpoint at which the
hero figure moves under the copy, so the whole site changes shape at one number. Adding a
tenth page means re-measuring: shave the type again, or accept a higher breakpoint.

## Disclosure cards

The research themes on the home page and the five threads on `research.html` are
`<details class="card">`: the icon, title and a one-line teaser stay visible, and the full
text opens on click. The teaser is not decoration, it is what keeps a closed page readable
and worth indexing. Hover only lifts the card and firms the
chevron; it never opens anything, so a mouse and a finger behave the same way.

Native `<details>` was the point. Keyboard and screen-reader support come free, find-in-page
reaches the collapsed text in current browsers, and `main.js` opens every disclosure before
printing and restores it afterwards. Do not rebuild this as a hover reveal or as
JavaScript-driven show and hide.

The grid holding them needs `grid-disclose` alongside `grid-3`, or an open card stretches
the rest of its row to match. `research.html` uses `.stack` instead, a single column, because
a two-column grid would halve the measure of prose that long.

Expand all and Collapse all are declarative: a button carries `data-details="open"` or
`"close"` and `data-scope="<selector>"`, and `main.js` handles it through the same delegated
listener and the same `eachDetails` traversal the print handlers use. Any page can add the
pair without new script.

Stats, news, and the explore cards are deliberately left expanded. They run to a line or two
each, so collapsing them would hide content without reducing density.

## The hero figure

`docs/assets/js/hero.js` paints the figure on the home page, and keeps painting it. This is
the part of the site most likely to be broken by a well-meant edit, so the reasoning is
worth keeping.

**It is brushwork, permanently.** Once the script runs, the 81 `<rect>` elements are hidden
and every mark on screen is a stroke. There is no finished state. An earlier version handed
off to the flat rects after 900ms, which meant the painting was really a loading animation
for a heatmap; that is why it never read as impressionist. Do not reintroduce a handoff.

The rects keep their real job. They are the specification the matrix layout reads, so
editing the matrix by hand still changes the figure, and they are the entire figure for a
reader with scripting off or reduced motion:

| Condition | What renders |
|---|---|
| Reduced motion, or scripting off | The 81 flat rects, static |
| Otherwise | Brushwork only, moving continuously |

`#matrix-figure.painted > rect { opacity: 0 }` is added only after the strokes exist, so a
failure part-way through leaves the flat matrix rather than an empty box.

**The strokes are conserved.** None is created or destroyed after setup. The same marks are
slowly rearranged between four configurations, which is the argument the figure makes: one
dataset, four analytical lenses, in the order that spells the lab's name.

```
M/A   multi-omic analytics     a sparse abundance matrix
T/R   translational research   two arms separating over time
I     inference                an effect estimate and its uncertainty
X     explainable AI           ranked feature attributions
```

Density carries the data in every one of them: cells are drawn by `fill-opacity`, bars by
length. Warm and cool are not decoration either. Three strokes in ten cross to the
complement in the matrix so the two mix optically; in the posterior, warm takes the mass
right of the null and cool the mass left; in the attributions, warm is a positive
contribution and cool a negative one.

Because the same 300 strokes cover far more area as a pair of curves than as 45 small
cells, each phase sets a `--gain` on the layer that the shimmer keyframes multiply into
every stroke's opacity. Without it the figure visibly dims and brightens as it reorganises.

**Pace.** 7s holding a configuration, 5s morphing to the next, 48s for the full cycle.
During a hold the only motion is each stroke breathing on its own 7 to 15 second cycle with
a negative start delay, so the ensemble never repeats and never resynchronises.

**It stops when nobody is looking.** An `IntersectionObserver` pauses it when the figure
leaves the viewport and `visibilitychange` pauses it when the tab is hidden; both set
`animation-play-state: paused` and clear the phase timer. A perpetual animation that runs
in a background tab is a battery bug.

Other things that are load-bearing:

- The header and every navigation link are painted and clickable from the first frame.
- With scripting off nothing is hidden, because the class that hides the starting state is
  set by a short inline script in `index.html` that only runs when the animation will.
- Lighting the layer is driven from both a double `requestAnimationFrame` and a 400ms
  timeout, and is idempotent. Frames are not guaranteed to arrive; without the timeout the
  figure sits at `opacity: 0` for the life of the page in any tab the browser never paints.
- A tab that is hidden at load defers setup to the first `visibilitychange` rather than
  giving up on the figure permanently.
- Angles are carried forward unwrapped, and each new angle is taken as the representation
  nearest the current one. CSS interpolates the degree value literally, so without this a
  stroke going from 350 to 10 spins the long way round.
- `window.matrixFigure` exposes `step()`, `go(k)`, `phase()` and `count()` so the cycle can
  be driven in testing without waiting out twelve seconds a phase.

## People page structure

The team is grouped by density rather than split across tabs, so nothing is hidden from
search, Cmd+F, or print:

- Faculty: full `.person` blocks with bio and details.
- Graduate students: photo cards in a four-up grid.
- Undergraduate and high school researchers: `<ul class="roster">`, a two-column text list.
- Alumni: the same roster list, commented out until there are alumni.

Photo cards are worth the vertical space for the people visitors most want to see. The
roster list holds about twenty names in the space of two cards, which is what keeps the
page from growing without limit. Revisit this if graduate students pass a dozen or alumni
pass twenty-five; at that point reuse the filter buttons from the publications page rather
than adding a second interaction pattern.

Do not put photographs of high school students on the page without written permission on
file, and prefer first name plus last initial for minors.
