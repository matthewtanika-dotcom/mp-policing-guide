# MP Policing Guide

Unofficial Service Police pocket reference and training aid: AFA 2006,
civilian offences, Military Police powers, identification/VIPER,
"I'm at a job" checklists, investigation, evidence, arrest & custody,
checklists, safeguarding, and SPCoP/reference material. Not
MOD-approved, not legal advice, not a replacement for current
legislation, JSPs or SPCoP.

This repo is set up so that:
- **GitHub Pages** hosts the web app (installable to a phone home screen, works offline).
- **GitHub Actions** builds the actual Android **.apk** for you automatically, on GitHub's own servers.

Repository: https://github.com/matthewtanika-dotcom/mp-policing-guide

---

## 1. Upload these files to your repository

Everything in this ZIP goes into the root of your existing repo,
keeping the same folder structure:

```
mp-policing-guide/                 <- your repo root
  index.html
  manifest.json
  service-worker.js
  icon-192.png
  icon-512.png
  download.html
  README.md
  .gitignore
  capacitor-project/
    package.json
    capacitor.config.json
    BUILD_APK.txt
  .github/
    workflows/
      build-debug-apk.yml
      release-apk.yml
```

If you're uploading via the GitHub website: use **Add file → Upload
files**, drag in everything except the `.github` folder (GitHub's
upload box can't create folders starting with a dot), then add the two
workflow files separately using **Add file → Create new file** and
typing the full path (e.g. `.github/workflows/build-debug-apk.yml`),
which auto-creates the folders.

## 2. Turn on GitHub Pages (if not already on)

**Settings → Pages** → Source: "Deploy from a branch" → branch `main`
→ folder `/ (root)` → Save.

Live at: `https://matthewtanika-dotcom.github.io/mp-policing-guide/`
Download page: `https://matthewtanika-dotcom.github.io/mp-policing-guide/download.html`

## 3. Get the APK

Every push to `main` triggers **Build debug APK** automatically —
check the **Actions** tab, open the run, download the
`mp-policing-guide-debug-apk` artifact.

For the permanent download link already wired into `download.html`,
create a release: go to **Releases** (right sidebar) → **Create a new
release** → tag `v1.0.0` (or `v2.0.0` for this rebuild) → **Publish
release**. The **Build and release APK** workflow runs automatically
and attaches the APK. A minute or two later, the download link on
`download.html` will work.

## 4. Install it

Open the download link on an Android phone, or transfer the .apk
directly. You'll need to allow "install unknown apps" for whichever
app you use to open it.

## 5. Updating later

Edit `index.html` (the single source of truth), commit and push to
`main`. Pages updates within a minute or two; a fresh debug APK builds
automatically. Push a new version tag when you want the public
download link to point at the new build.

---

## What's in this rebuild

**Removed:** the AI Assistant tab, the statement/template section, all
"by Majestiko" branding, and the old oversized warning box (replaced
with a single small line under the app name).

**Restructured** around a 12-item operational hierarchy, reachable
from the Home tab or the top tab bar: AFA 2006 → Civilian Offences →
Military Police Powers → Identification/VIPER → I'm At A Job →
Investigation → Evidence → Arrest & Custody → Checklists →
Safeguarding → SPCoP/JSP/Reference → Search Everything. Favourites and
Recently Viewed are on the Home tab, populated by the star icon on any
card.

**New icon**: a generic shield/badge design, not a copy of any
official MOD/RMP crest or protected insignia.

## Content accuracy — what still needs your input

I did not invent legislation, powers, thresholds or procedures. Where
verified public source material exists (the Armed Forces Act 2006
itself, common civilian statutes, the general structure of the
Service Police Codes of Practice), it's included as before. Several
things you asked for rely on JSP 830 and other MOD-internal documents
that are not publicly available to me, so I could not verify them —
these are clearly marked **NEEDS VERIFICATION** throughout the app
(mainly in Military Police Powers, and the JSP column generally) and
left as placeholders rather than guessed at. The "Reference" tab has
an add-your-own tool specifically so you can drop in verified extracts
once you have them.

## Disclaimer

Unofficial reference and training aid. Not affiliated with or
endorsed by the MOD, RMP, RNP, RAFP or Defence Serious Crime Command.
Always verify content against current legislation, JSPs, SPCoP and
official guidance before relying on it operationally.
