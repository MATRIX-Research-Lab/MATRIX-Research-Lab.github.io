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
assets/js/main.js         Mobile menu and copyright year.
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
- Photos: save into `docs/assets/img/` and point an `<img>` at it. Resize large files first;
  the cards render at roughly 200 by 230 pixels.
- Tags: `tag-on` green, `tag-off` grey, `tag-hi` red.
- Navigation and footer are repeated in all ten files. Adding or renaming a page means
  editing every one.

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
