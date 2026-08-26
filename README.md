# MATRIX Lab website

A plain static website — HTML + CSS + a few lines of JavaScript. No build step, no
frameworks, no dependencies to update. You edit a file, save, refresh the browser.

## Files

```
index.html          Home: hero, research themes, impact stats, news, section links
research.html       The five research threads
grants.html         Active and completed funding          [placeholders]
publications.html   Selected publications, with DOIs
software.html       ANCOMBC and future packages
teaching.html       Courses, workshops, open materials    [placeholders]
mentoring.html      Mentee projects, theses, alumni       [placeholders]
people.html         PI bio, lab members, collaborators    [placeholders]
join.html           Recruiting / how to apply
contact.html        Address, email, office

assets/css/style.css      All styling. Colors live at the very top in :root.
assets/js/main.js         Mobile menu + auto-updating copyright year.
assets/js/publications.js YOUR PUBLICATION LIST — the only file to edit for papers.
assets/js/pubs.js         Renders that list. You should not need to touch this.
assets/img/            Photos: headshots, lab photos.
assets/files/          PDFs: CV, syllabi, posters, preprints.
```

## Preview it locally

Open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Edit any file, save, refresh. Or double-click
`start-preview.bat`, which does both steps for you.

## Finding what to fill in

Anything still needing your input is either a `[bracketed placeholder]` or a dashed
**PLACEHOLDER** box on the page. To list every one from the terminal:

```bash
grep -n "PLACEHOLDER\|EDIT:\|\[.*\]" *.html
```

## Editing tips

- **Text**: everything between HTML tags is plain text. Change it and save.
- **Colors**: `assets/css/style.css`, the `:root` block at the top. Every page updates at once.
- **Adding a publication**: do NOT edit `publications.html`. Open
  `assets/js/publications.js`, copy one `{ ... }` block, and fill it in. Set
  `featured: true` to make it appear in the default "Selected" view. The page rebuilds
  itself from that file.
- **Adding a grant, course, or mentee project**: copy an entire `<li> ... </li>` block
  inside the relevant `<ul class="pub-list">` and edit the text. These three share one format.
- **Status pills**: `tag-on` is green (active/current), `tag-off` is grey (completed),
  `tag-hi` is red (emphasis, e.g. a DOI link).
- **Adding a person**: copy one `<div class="card member"> ... </div>` block.
- **Photos**: save into `assets/img/`, then replace the grey placeholder
  `<div class="avatar">...</div>` with `<img src="assets/img/name.jpg" alt="Name">`.
- **Navigation and footer** are duplicated across all ten pages. If you add or rename a
  page, update the `<ul class="nav-links">` block in every file.

## Publishing

The site lives in the lab organization and is served by GitHub Pages at
<https://matrix-research-lab.github.io/>.

This folder is already a git repository with `origin` pointing at
`https://github.com/MATRIX-Research-Lab/MATRIX-Research-Lab.github.io`. To publish a change:

```bash
git add -A && git commit -m "Describe the change" && git push
```

The live site updates within a minute or two. Repository settings for Pages live at
**Settings -> Pages -> Source: deploy from branch `main`, folder `/ (root)`**.

The repository name must stay `MATRIX-Research-Lab.github.io` -- that exact name is what
makes GitHub serve it at the bare organization address rather than a `/subpath/`.

Later, ask UMD IT whether a custom address (e.g. `matrixlab.umd.edu`) can point at it via a
CNAME record; if so, set it under Settings -> Pages -> Custom domain.

## Keeping publications in sync

Google Scholar has no public API and blocks automated access, so a static page cannot pull
from it directly. Instead, `assets/js/publications.js` is the single source of truth: it
mirrors the publication section of your CV, and the page renders itself from it. When your
CV changes, update that one file. The "Selected" view is controlled by the `featured` flag,
so curation stays in your hands, and Google Scholar stays linked from the page for the
exhaustive list.

## Still to fill in

- [ ] Headshot at `assets/img/huang-lin.jpg`
- [ ] Real lab members as they join (`people.html`)
- [ ] Confirm the collaborator list on `people.html` is who you want named, and that
      each affiliation is current
- [ ] Refresh the citation numbers on `index.html` once or twice a year
- [ ] Decide whether to keep dollar amounts on `grants.html` (some labs list them, some don't)
- [ ] Rewrite the teaching-philosophy and mentoring paragraphs in your own words
