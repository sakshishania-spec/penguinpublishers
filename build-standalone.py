#!/usr/bin/env python3
"""Bundle index.html + css/ + js/ + assets/ back into one self-contained HTML file.

Usage:  python3 build-standalone.py            -> writes dist/penguin-prototype-standalone.html
"""
import base64, mimetypes, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "dist", "penguin-prototype-standalone.html")


def read(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as f:
        return f.read()


def data_uri(path):
    raw = open(os.path.join(ROOT, path), "rb").read()
    # sniff real type (some .png files are actually JPEGs)
    if raw[:3] == b"\xff\xd8\xff":
        mime = "image/jpeg"
    elif raw[:8] == b"\x89PNG\r\n\x1a\n":
        mime = "image/png"
    else:
        mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
    return f"data:{mime};base64," + base64.b64encode(raw).decode()


html = read("index.html")
html = re.sub(r'<link rel="stylesheet" href="([^"]+)" />',
              lambda m: "<style>\n" + re.sub(r"url\('\.\./(assets/[^']+)'\)", lambda u: "url('" + data_uri(u.group(1)) + "')", read(m.group(1))) + "</style>", html)
html = re.sub(r'<script src="(js/[^"]+)"></script>',
              lambda m: "<script>\n" + read(m.group(1)) + "</script>", html)

# Embed every file under assets/ and swap "assets/..." paths at runtime
# (covers paths written in HTML and ones created dynamically from JS).
assets = {}
for d, _, files in os.walk(os.path.join(ROOT, "assets")):
    for fn in sorted(files):
        rel = os.path.relpath(os.path.join(d, fn), ROOT).replace(os.sep, "/")
        assets[rel] = data_uri(rel)

import json
swap = ('<script>/* standalone build: every image is embedded; this swaps "assets/…" paths for the embedded copies */\n'
        '(function(){var A=' + json.dumps(assets) + ';function fix(el){var v=el.getAttribute&&el.getAttribute("src");'
        'if(v&&A[v])el.setAttribute("src",A[v]);var h=el.getAttribute&&el.getAttribute("href");'
        'if(h&&A[h]&&el.tagName==="LINK")el.setAttribute("href",A[h]);}\n'
        'new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==="attributes")fix(m.target);'
        'else m.addedNodes.forEach(function(n){if(n.nodeType!==1)return;fix(n);'
        'n.querySelectorAll&&n.querySelectorAll("[src^=\\"assets/\\"]").forEach(fix);});});})'
        '.observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:["src"]});\n'
        'document.querySelectorAll("link[href^=\\"assets/\\"]").forEach(fix);})();</script>\n')
html = html.replace("<link rel=\"icon\"", swap + "<link rel=\"icon\"", 1)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)
print(f"wrote {os.path.relpath(OUT, ROOT)} ({len(html)/1e6:.1f} MB, {len(assets)} assets)")
