# Penguin prototype — editable source

Unpacked from `penguin-prototype-standalone.html`. The markup, styles and scripts are unchanged; they are only split into separate files.

```
index.html          page markup
css/styles.css      all styles (theme tokens at the top in :root)
js/app.js           all behaviour
assets/             images & icons (the files that were base64-embedded)
build-standalone.py bundles everything back into one shareable HTML file
```

Preview: serve the folder (`python3 -m http.server` from this directory) and open http://localhost:8000.

Share as a single file: `python3 build-standalone.py`, which writes `dist/penguin-prototype-standalone.html`.
