# MP Policing Guide — by Majestiko

Service Police reference app: AFA 2006 offences, civilian offences,
statement templates, SPCoP codes, safeguarding and MP Assistant
search. Unofficial reference and training aid.

This repo is set up so that:
- **GitHub Pages** hosts the web app (installable to a phone home
  screen, works offline).
- **GitHub Actions** builds the actual Android **.apk** for you
  automatically, on GitHub's own servers — no Android Studio needed
  on your end unless you want to build locally too.

Everything below is copy-paste. Replace `YOUR-USERNAME` and
`YOUR-REPO` with your actual GitHub username and the repo name you
choose.

---

## 1. Create the repository

On github.com, click **New repository**. Name it something like
`mp-policing-guide`. Public or private both work (private repos can
still use Pages and Actions on GitHub's free tier, though a private
Pages site needs GitHub Pro/Enterprise — public is simplest if
there's nothing sensitive in the app content).

## 2. Push this project

From inside this folder, in a terminal:

```
git init
git add .
git commit -m "Initial commit: MP Policing Guide"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## 3. Turn on GitHub Pages (hosts the web app)

In your repo on GitHub: **Settings → Pages**.
Under "Build and deployment", set **Source** to "Deploy from a
branch", branch **main**, folder **/ (root)**. Save.

After a minute or two your app is live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

and the download page at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO/download.html
```

That download.html link is what you'd share on WhatsApp — it has
Open Graph tags so it shows a proper preview card instead of a bare
URL.

## 4. Fix the two placeholder URLs in download.html

Open `download.html` and replace `YOUR-USERNAME` and `YOUR-REPO` in:
- the two `og:image` / `twitter:image` meta tags
- the "Download for Android" button link

Commit and push the change:

```
git add download.html
git commit -m "Set live URLs in download page"
git push
```

## 5. Get the actual APK

Every push to `main` triggers **Build debug APK**
(`.github/workflows/build-debug-apk.yml`) automatically. Watch it run
under the **Actions** tab of your repo. When it finishes, open the
run and download the `mp-policing-guide-debug-apk` artifact — that's
a working APK, right now, built by GitHub's servers.

For a **stable download link** (the one `download.html` uses), push a
version tag instead — this triggers **Build and release APK**
(`.github/workflows/release-apk.yml`), which builds the APK and
attaches it to a proper GitHub Release:

```
git tag v1.0.0
git push origin v1.0.0
```

Once that workflow finishes (Actions tab again), your APK is
permanently available at:

```
https://github.com/YOUR-USERNAME/YOUR-REPO/releases/latest/download/mp-policing-guide.apk
```

which is exactly the link already wired into `download.html`.

## 6. Install it

On an Android phone, open the download link above (or transfer the
.apk file directly) and open it. You'll need to allow "install
unknown apps" for whichever app you use to open it — that's normal
for any APK not from the Play Store.

## 7. Updating the app later

1. Edit `index.html` (or the other root files) as needed.
2. Commit and push to `main` — GitHub Pages updates within a minute
   or two, and a fresh debug APK builds automatically as a workflow
   artifact.
3. When you're happy with a version and want the public download link
   to point at it, push a new tag:
   ```
   git tag v1.1.0
   git push origin v1.1.0
   ```
   The Release workflow rebuilds the APK and updates the
   `releases/latest` link automatically — `download.html` doesn't
   need to change.

---

## What each workflow actually does

Both workflows run on GitHub's own Ubuntu servers, which have real
internet access and the Android SDK — this is what lets them build a
genuine APK, which isn't possible in a sandboxed environment without
network access.

- **build-debug-apk.yml** — runs on every push to `main`. Good for
  quickly checking a build works. The APK is attached as a workflow
  artifact (visible under Actions → the run → Artifacts), which
  requires being logged into GitHub to download and expires after 90
  days.
- **release-apk.yml** — runs when you push a tag like `v1.0.0`.
  Produces the same APK but attaches it to a proper GitHub Release,
  giving it a permanent, public, direct-download URL that doesn't
  expire and doesn't require a GitHub login.

Both produce a **debug-signed** APK — installable by anyone via
sideloading, but not eligible for Play Store submission (that needs a
proper release signing key; see `capacitor-project/BUILD_APK.txt` for
that process if you want to go further later).

## Project structure

```
index.html            <- the app itself (single source of truth)
manifest.json
service-worker.js
icon-192.png / icon-512.png
download.html          <- WhatsApp-shareable landing page
capacitor-project/     <- Android app shell (Capacitor)
  package.json
  capacitor.config.json
  BUILD_APK.txt         <- instructions for building locally instead
.github/workflows/      <- the two automated build pipelines above
```

`capacitor-project/www/` and `capacitor-project/android/` are not
committed (see `.gitignore`) — both workflows, and the local build
script (`npm run copy-web`), regenerate them from the root files each
time, so the root files are always the one true source of truth.

## Disclaimer

Unofficial reference and training aid. Not affiliated with or
endorsed by the MOD, RMP, RNP, RAFP or Defence Serious Crime Command.
Always verify content against current official guidance before
relying on it operationally.
