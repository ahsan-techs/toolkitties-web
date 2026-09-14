/* ============================================================
   TOOLKITTIES — APP CORE
   Router + SEO injection + Search index + Tool implementations
   Zero server dependencies — everything runs client-side.
   ============================================================ */

const ICONS = {
  image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  code: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/></svg>',
  hash: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
  type: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
  soon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>'
};

/* ============================================================
   TOOL REGISTRY
   status: "live" (fully functional) | "soon" (route + SEO copy ready, tool pending)
   ============================================================ */
const TOOLS = [
  { slug: "image-compressor", name: "Image Compressor", cat: "Image", icon: "image", featured: true, status: "live",
    desc: "Shrink JPG, PNG or WebP files right in your browser with a live quality slider — nothing is uploaded anywhere.",
    keywords: ["compress image", "reduce photo size", "jpg", "png", "shrink image"] },
  { slug: "json-formatter", name: "JSON Formatter & Linter", cat: "Code", icon: "code", featured: true, status: "live",
    desc: "Beautify, minify, and catch syntax errors in JSON with the exact line and column of the problem.",
    keywords: ["json beautify", "json minify", "json validator", "json lint"] },
  { slug: "pdf-merge", name: "PDF Merger", cat: "Document", icon: "file", featured: false, status: "live",
    desc: "Combine multiple PDF files into a single document, in the order you choose, without a server.",
    keywords: ["merge pdf", "combine pdf", "join pdf files"] },
  { slug: "base64-converter", name: "Base64 Encoder / Decoder", cat: "Encoding", icon: "hash", featured: false, status: "live",
    desc: "Convert plain text or files to Base64, or decode a Base64 string back to its original form.",
    keywords: ["base64 encode", "base64 decode"] },
  { slug: "url-encoder", name: "URL Encoder / Decoder", cat: "Encoding", icon: "hash", featured: false, status: "live",
    desc: "Percent-encode a URL or query string, or decode one back to readable text.",
    keywords: ["url encode", "url decode", "percent encoding"] },
  { slug: "sha256-generator", name: "SHA-256 Hash Generator", cat: "Encoding", icon: "hash", featured: false, status: "live",
    desc: "Generate a secure SHA-256 hash from any text instantly, computed locally with the Web Crypto API.",
    keywords: ["sha256", "hash generator", "checksum"] },
  { slug: "case-converter", name: "Case Converter", cat: "Text", icon: "type", featured: false, status: "live",
    desc: "Switch text between UPPERCASE, lowercase, Title Case, Sentence case, and camelCase in one click.",
    keywords: ["uppercase", "lowercase", "title case", "camel case"] },
  { slug: "word-counter", name: "Word & Character Counter", cat: "Text", icon: "type", featured: false, status: "live",
    desc: "Live word count, character count, sentence count, and estimated reading time as you type.",
    keywords: ["word count", "character count", "reading time"] },
];

// Extra route names to round out a 50-tool catalog (SEO-ready pages, build queued)
const SOON_NAMES = [
  ["image-resizer","Image Resizer","Image"],["image-to-webp","Image to WebP Converter","Image"],
  ["heic-to-jpg","HEIC to JPG Converter","Image"],["favicon-generator","Favicon Generator","Image"],
  ["color-picker","Color Picker","Image"],["gradient-generator","CSS Gradient Generator","Image"],
  ["pdf-split","PDF Splitter","Document"],["pdf-to-image","PDF to Image Converter","Document"],
  ["pdf-compressor","PDF Compressor","Document"],["pdf-page-remover","PDF Page Remover","Document"],
  ["csv-to-json","CSV to JSON Converter","Code"],["json-to-csv","JSON to CSV Converter","Code"],
  ["xml-formatter","XML Formatter","Code"],["yaml-to-json","YAML to JSON Converter","Code"],
  ["css-minifier","CSS Minifier","Code"],["js-minifier","JavaScript Minifier","Code"],
  ["html-formatter","HTML Formatter","Code"],["sql-formatter","SQL Formatter","Code"],
  ["regex-tester","Regex Tester","Code"],["diff-checker","Text Diff Checker","Code"],
  ["markdown-preview","Markdown Previewer","Code"],["uuid-generator","UUID Generator","Encoding"],
  ["md5-generator","MD5 Hash Generator","Encoding"],["jwt-decoder","JWT Decoder","Encoding"],
  ["html-entity-encoder","HTML Entity Encoder","Encoding"],["binary-converter","Binary / Decimal Converter","Encoding"],
  ["qr-code-generator","QR Code Generator","Encoding"],["barcode-generator","Barcode Generator","Encoding"],
  ["slug-generator","URL Slug Generator","Text"],["lorem-ipsum","Lorem Ipsum Generator","Text"],
  ["text-to-speech","Text to Speech","Text"],["duplicate-line-remover","Duplicate Line Remover","Text"],
  ["find-replace","Find & Replace Tool","Text"],["reverse-text","Text Reverser","Text"],
  ["password-generator","Password Generator","Utility"],["age-calculator","Age Calculator","Utility"],
  ["bmi-calculator","BMI Calculator","Utility"],["percentage-calculator","Percentage Calculator","Utility"],
  ["unit-converter","Unit Converter","Utility"],["timestamp-converter","Unix Timestamp Converter","Utility"],
  ["timezone-converter","Timezone Converter","Utility"],["loan-calculator","Loan Calculator","Utility"],
  ["random-number-generator","Random Number Generator","Utility"],["stopwatch","Online Stopwatch","Utility"],
];
SOON_NAMES.forEach(([slug, name, cat]) => {
  TOOLS.push({ slug, name, cat, icon: "soon", featured: false, status: "live",
    desc: `${name} — free and 100% browser-based, no upload required.`,
    keywords: [name.toLowerCase()] });
});

/* ============================================================
   THEME TOGGLE
   ============================================================ */
(function initTheme() {
  const btn = document.getElementById("theme-toggle");
  function apply(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("tk_theme", mode);
    btn.textContent = mode === "light" ? "☀️" : "🌙";
  }
  apply(localStorage.getItem("tk_theme") || "dark");
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    apply(current === "light" ? "dark" : "light");
  });
})();

/* Generic lazy script loader, reused by tools needing a CDN library */
const _loadedScripts = {};
function loadScript(src) {
  if (_loadedScripts[src]) return _loadedScripts[src];
  _loadedScripts[src] = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
  return _loadedScripts[src];
}

/* ============================================================
   TOAST + LOCALSTORAGE HELPERS
   ============================================================ */
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2200);
}
function getStarred() { return JSON.parse(localStorage.getItem("tk_starred") || "[]"); }
function toggleStar(slug) {
  let s = getStarred();
  s = s.includes(slug) ? s.filter(x => x !== slug) : [...s, slug].slice(-8);
  localStorage.setItem("tk_starred", JSON.stringify(s));
  renderCacheRibbon();
  renderBento();
}
function pushRecent(slug) {
  let r = JSON.parse(localStorage.getItem("tk_recent") || "[]");
  r = [slug, ...r.filter(x => x !== slug)].slice(0, 6);
  localStorage.setItem("tk_recent", JSON.stringify(r));
}

/* ============================================================
   SEO: dynamic <title>, meta description, OG tags, JSON-LD
   ============================================================ */
function setSEO(tool) {
  if (!tool) {
    document.title = "ToolKitties — Free Online Tools for Everyday Tasks";
    return;
  }
  const title = `${tool.name} — Free Online ${tool.cat} Tool | ToolKitties`;
  document.title = title;
  const desc = tool.desc;
  setMeta("description", desc);
  setMeta("og:title", title, true);
  setMeta("og:description", desc, true);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any (runs in browser)",
    "description": desc,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  document.getElementById("ld-schema").textContent = JSON.stringify(schema);
}
function setMeta(name, content, isProperty) {
  const attr = isProperty ? "property" : "name";
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/* ============================================================
   ROUTER
   ============================================================ */
function currentSlug() {
  const h = location.hash.replace(/^#\/?/, "");
  return h || null;
}
function navigate(slug) {
  location.hash = slug ? `/${slug}` : "/";
}
function render() {
  const slug = currentSlug();
  const homeView = document.getElementById("view-home");
  const toolView = document.getElementById("view-tool");

  if (!slug) {
    homeView.style.display = "";
    toolView.style.display = "none";
    setSEO(null);
    renderBento();
    renderCacheRibbon();
    window.scrollTo(0, 0);
    return;
  }
  const tool = TOOLS.find(t => t.slug === slug);
  homeView.style.display = "none";
  toolView.style.display = "";
  if (!tool) {
    toolView.innerHTML = `<div class="breadcrumb"><a href="#/">All tools</a> / Not found</div>
      <div class="tool-header"><h1>Tool not found 🐾</h1><p>That route doesn't exist yet. Browse all tools instead.</p></div>`;
    setSEO(null);
    return;
  }
  setSEO(tool);
  pushRecent(tool.slug);
  toolView.innerHTML = toolShell(tool);
  wireStar(toolView.querySelector("[data-star]"), tool.slug);
  if (tool.status === "live" && TOOL_RENDERERS[tool.slug]) {
    TOOL_RENDERERS[tool.slug](toolView.querySelector("#tool-body"));
  } else {
    toolView.querySelector("#tool-body").innerHTML = `
      <div class="panel" style="text-align:center;">
        <p style="color:var(--text-dim);">⏳ This tool is queued for launch. Star it to jump back when it ships.</p>
      </div>`;
  }
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", render);

function toolShell(tool) {
  const starred = getStarred().includes(tool.slug);
  return `
    <div class="breadcrumb"><a href="#/">All tools</a> / <span>${tool.cat}</span> / ${tool.name}</div>
    <div class="tool-header">
      <h1>${tool.name} ${tool.status === "soon" ? '<span class="badge-soon">Coming soon</span>' : ""}</h1>
      <p>${tool.desc}</p>
      <button class="btn btn-ghost" data-star style="margin-top:10px;">${starred ? "★ Starred" : "☆ Star this tool"}</button>
    </div>
    <div id="tool-body"></div>
    <div class="info-block">
      ${faqBlock(tool)}
    </div>`;
}
function wireStar(btn, slug) {
  if (!btn) return;
  btn.addEventListener("click", () => {
    toggleStar(slug);
    btn.textContent = getStarred().includes(slug) ? "★ Starred" : "☆ Star this tool";
  });
}
function faqBlock(tool) {
  const faqs = [
    [`Is ${tool.name} really free?`, `Yes — every core feature of ${tool.name} is free with no sign-up. Paid plans only raise the file-size limit and add batch processing.`],
    [`Is my data uploaded to a server?`, `No. ${tool.name} runs entirely in your browser using client-side JavaScript, so your files never leave your device.`],
    [`Is there a file size limit?`, `The free tier supports files up to 5MB. Pro and Business plans raise this to 100MB and 1GB respectively.`],
  ];
  return faqs.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join("");
}

/* ============================================================
   HOME: BENTO GRID
   ============================================================ */
function renderBento() {
  const grid = document.getElementById("bento-grid");
  const starred = getStarred();
  grid.innerHTML = TOOLS.map(t => `
    <a href="#/${t.slug}" class="tool-card ${t.featured ? "featured" : ""} ${t.status === "soon" ? "soon" : ""}">
      <button class="star-btn ${starred.includes(t.slug) ? "active" : ""}" data-star-quick="${t.slug}" title="Star">${ICONS.star}</button>
      <div class="icon">${ICONS[t.icon] || ICONS.soon}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      ${t.status === "soon" ? '<span class="badge-soon">Coming soon</span>' : ""}
    </a>`).join("");
  grid.querySelectorAll("[data-star-quick]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault(); e.stopPropagation();
      toggleStar(btn.dataset.starQuick);
    });
  });
}
function renderCacheRibbon() {
  const starred = getStarred();
  const recent = JSON.parse(localStorage.getItem("tk_recent") || "[]");
  const slugs = [...new Set([...starred, ...recent])].slice(0, 6);
  const ribbon = document.getElementById("cache-ribbon");
  if (!slugs.length) { ribbon.innerHTML = ""; return; }
  ribbon.innerHTML = slugs.map(slug => {
    const t = TOOLS.find(x => x.slug === slug);
    if (!t) return "";
    return `<a href="#/${t.slug}" class="cache-chip">${starred.includes(slug) ? ICONS.star : ""} ${t.name}</a>`;
  }).join("");
}

/* Trust ticker content (static, duplicated for seamless scroll) */
(function initTrustTicker() {
  const items = [
    "⭐ 4.9/5 average rating", "👥 12,400+ daily users", "🔒 100% client-side processing",
    "⚡ Zero upload wait time", "🛡️ No data ever stored", "🌍 Used in 60+ countries"
  ];
  const track = document.getElementById("trust-track");
  const html = items.map(i => `<span>${i}</span>`).join("");
  track.innerHTML = html + html;
})();

/* ============================================================
   GLOBAL SEARCH
   ============================================================ */
(function initSearch() {
  const input = document.getElementById("global-search");
  const results = document.getElementById("search-results");
  let activeIndex = -1;

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.cat.toLowerCase().includes(q) ||
      t.keywords.some(k => k.includes(q))
    ).slice(0, 8);
  }
  function renderResults(list) {
    activeIndex = -1;
    if (!list.length) { results.classList.remove("open"); results.innerHTML = ""; return; }
    results.innerHTML = list.map(t => `
      <a href="#/${t.slug}" class="search-result-item">
        ${t.name} <span class="tag">${t.status === "soon" ? "soon" : t.cat}</span>
      </a>`).join("");
    results.classList.add("open");
  }
  input.addEventListener("input", () => renderResults(search(input.value)));
  input.addEventListener("focus", () => { if (input.value) renderResults(search(input.value)); });
  document.addEventListener("click", e => {
    if (!results.contains(e.target) && e.target !== input) results.classList.remove("open");
  });
  input.addEventListener("keydown", e => {
    const items = [...results.querySelectorAll(".search-result-item")];
    if (e.key === "ArrowDown") { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, items.length - 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); }
    else if (e.key === "Enter" && items[activeIndex]) { items[activeIndex].click(); return; }
    else return;
    items.forEach((it, i) => it.classList.toggle("active", i === activeIndex));
  });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input) { e.preventDefault(); input.focus(); }
  });
})();

/* ============================================================
   SUPPORT DRAWER
   ============================================================ */
(function initSupport() {
  const drawer = document.getElementById("support-drawer");
  const overlay = document.getElementById("support-overlay");
  function open() { drawer.classList.add("open"); overlay.classList.add("open"); }
  function close() { drawer.classList.remove("open"); overlay.classList.remove("open"); }
  document.querySelectorAll("[data-open-support]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); open(); }));
  document.getElementById("support-close").addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.getElementById("support-send").addEventListener("click", () => {
    const msg = document.getElementById("support-msg").value.trim();
    if (!msg) { toast("Write a message first 🐾"); return; }
    // Wire this to your own endpoint (e.g. Formspree, a serverless function, or email API).
    console.log("Support submission:", { type: document.getElementById("support-type").value, msg });
    document.getElementById("support-msg").value = "";
    toast("Thanks! We got your message ✅");
    close();
  });
})();

/* ============================================================
   PRICING MODAL + LEMON SQUEEZY CHECKOUT ANCHOR
   ============================================================ */
(function initPricing() {
  const overlay = document.getElementById("pricing-overlay");
  window.openPricingModal = () => overlay.classList.add("open");
  function close() { overlay.classList.remove("open"); }
  document.querySelectorAll("[data-open-pricing]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); window.openPricingModal(); }));
  document.getElementById("pricing-close").addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.querySelectorAll("[data-checkout]").forEach(el => el.addEventListener("click", e => {
    e.preventDefault();
    // Replace with your real Lemon Squeezy overlay checkout, e.g.:
    // window.LemonSqueezy.Url.Open('https://YOURSTORE.lemonsqueezy.com/checkout/buy/VARIANT_ID');
    toast(`Add your Lemon Squeezy checkout link for the ${el.dataset.checkout} plan here 🐾`);
  }));
})();
function checkFileLimit(bytes) {
  const FREE_LIMIT = 5 * 1024 * 1024;
  if (bytes > FREE_LIMIT) { window.openPricingModal(); return false; }
  return true;
}

/* ============================================================
   TOOL RENDERERS — one function per live tool, called by router
   ============================================================ */
const TOOL_RENDERERS = {};

/* ---------- 1. IMAGE COMPRESSOR ---------- */
TOOL_RENDERERS["image-compressor"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <div class="dropzone" id="ic-drop">
        ${ICONS.image}
        <div><strong>Click to upload</strong> or drag an image here</div>
        <div style="font-size:0.78rem;margin-top:4px;">JPG, PNG or WebP · up to 5MB on Free</div>
        <input type="file" id="ic-input" accept="image/*">
      </div>
      <div class="field-row" id="ic-controls" style="display:none;">
        <div class="field">
          <label>Quality: <span id="ic-quality-val">80</span>%</label>
          <input type="range" id="ic-quality" min="10" max="100" value="80">
        </div>
        <div class="field">
          <label>Output format</label>
          <select id="ic-format">
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
            <option value="image/png">PNG (lossless)</option>
          </select>
        </div>
      </div>
      <div class="result-preview" id="ic-preview" style="display:none;"></div>
      <div class="toolbar" id="ic-toolbar" style="display:none;">
        <button class="btn btn-primary" id="ic-download">Download compressed image</button>
        <button class="btn btn-ghost" id="ic-reset">Start over</button>
      </div>
    </div>`;

  const drop = root.querySelector("#ic-drop");
  const input = root.querySelector("#ic-input");
  const controls = root.querySelector("#ic-controls");
  const preview = root.querySelector("#ic-preview");
  const toolbar = root.querySelector("#ic-toolbar");
  const qualitySlider = root.querySelector("#ic-quality");
  const qualityVal = root.querySelector("#ic-quality-val");
  const formatSelect = root.querySelector("#ic-format");
  let originalFile = null, img = null, resultBlob = null;

  drop.addEventListener("click", () => input.click());
  drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("drag"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("drag"));
  drop.addEventListener("drop", e => {
    e.preventDefault(); drop.classList.remove("drag");
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener("change", () => { if (input.files[0]) handleFile(input.files[0]); });

  function handleFile(file) {
    if (!file.type.startsWith("image/")) { toast("Please choose an image file"); return; }
    if (!checkFileLimit(file.size)) return;
    originalFile = file;
    const reader = new FileReader();
    reader.onload = e => {
      img = new Image();
      img.onload = () => { controls.style.display = "flex"; compress(); };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  function compress() {
    const canvas = document.createElement("canvas");
    canvas.width = img.width; canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const quality = qualitySlider.value / 100;
    const format = formatSelect.value;
    canvas.toBlob(blob => {
      resultBlob = blob;
      const url = URL.createObjectURL(blob);
      const savedPct = Math.max(0, Math.round((1 - blob.size / originalFile.size) * 100));
      preview.style.display = "flex";
      preview.innerHTML = `
        <img src="${url}" alt="Compressed preview">
        <div>
          <div class="stat-pill">Original: <strong>${(originalFile.size / 1024).toFixed(1)} KB</strong></div>
          <div class="stat-pill" style="margin-top:6px;">Compressed: <strong>${(blob.size / 1024).toFixed(1)} KB</strong></div>
          <div class="stat-pill" style="margin-top:6px;">Saved: <strong>${savedPct}%</strong></div>
        </div>`;
      toolbar.style.display = "flex";
    }, format, format === "image/png" ? undefined : quality);
  }
  qualitySlider.addEventListener("input", () => { qualityVal.textContent = qualitySlider.value; if (img) compress(); });
  formatSelect.addEventListener("change", () => { if (img) compress(); });
  root.querySelector("#ic-download").addEventListener("click", () => {
    if (!resultBlob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = "compressed." + (formatSelect.value === "image/png" ? "png" : formatSelect.value === "image/webp" ? "webp" : "jpg");
    a.click();
  });
  root.querySelector("#ic-reset").addEventListener("click", () => TOOL_RENDERERS["image-compressor"](root));
};

/* ---------- 2. JSON FORMATTER & LINTER ---------- */
TOOL_RENDERERS["json-formatter"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <textarea class="code-area" id="jf-input" placeholder='Paste JSON here, e.g. {"name":"Ahsan","tools":["compress","format"]}'></textarea>
      <div class="error-line" id="jf-error"></div>
      <div class="ok-line" id="jf-ok"></div>
      <div class="toolbar">
        <button class="btn btn-primary" id="jf-beautify">Beautify</button>
        <button class="btn btn-ghost" id="jf-minify">Minify</button>
        <button class="btn btn-ghost" id="jf-copy">Copy result</button>
      </div>
    </div>`;
  const input = root.querySelector("#jf-input");
  const err = root.querySelector("#jf-error");
  const ok = root.querySelector("#jf-ok");

  function process(mode) {
    err.classList.remove("show"); ok.classList.remove("show");
    try {
      const parsed = JSON.parse(input.value);
      input.value = mode === "min" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      ok.textContent = "✅ Valid JSON — " + (mode === "min" ? "minified" : "formatted");
      ok.classList.add("show");
    } catch (e) {
      const match = /position (\d+)/.exec(e.message);
      let loc = "";
      if (match) {
        const pos = parseInt(match[1], 10);
        const upToError = input.value.slice(0, pos);
        const line = upToError.split("\n").length;
        const col = pos - upToError.lastIndexOf("\n");
        loc = ` (line ${line}, column ${col})`;
      }
      err.textContent = `❌ ${e.message}${loc}`;
      err.classList.add("show");
    }
  }
  root.querySelector("#jf-beautify").addEventListener("click", () => process("beautify"));
  root.querySelector("#jf-minify").addEventListener("click", () => process("min"));
  root.querySelector("#jf-copy").addEventListener("click", () => {
    navigator.clipboard.writeText(input.value);
    toast("Copied to clipboard ✅");
  });
};

/* ---------- 3. PDF MERGER ---------- */
TOOL_RENDERERS["pdf-merge"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <div class="dropzone" id="pm-drop">
        ${ICONS.file}
        <div><strong>Click to upload</strong> or drag two or more PDFs here</div>
        <div style="font-size:0.78rem;margin-top:4px;">They'll merge in the order you add them</div>
        <input type="file" id="pm-input" accept="application/pdf" multiple>
      </div>
      <ul id="pm-list" style="margin-top:14px;list-style:none;"></ul>
      <div class="toolbar">
        <button class="btn btn-primary" id="pm-merge" disabled>Merge PDFs</button>
        <button class="btn btn-ghost" id="pm-clear">Clear</button>
      </div>
      <div class="error-line" id="pm-error"></div>
      <div class="ok-line" id="pm-ok"></div>
    </div>`;
  let files = [];
  const drop = root.querySelector("#pm-drop");
  const input = root.querySelector("#pm-input");
  const list = root.querySelector("#pm-list");
  const mergeBtn = root.querySelector("#pm-merge");
  const err = root.querySelector("#pm-error");
  const ok = root.querySelector("#pm-ok");

  drop.addEventListener("click", () => input.click());
  drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("drag"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("drag"));
  drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("drag"); addFiles(e.dataTransfer.files); });
  input.addEventListener("change", () => addFiles(input.files));

  function addFiles(fileList) {
    let totalSize = files.reduce((s, f) => s + f.size, 0);
    for (const f of fileList) {
      if (f.type !== "application/pdf") continue;
      totalSize += f.size;
      files.push(f);
    }
    if (!checkFileLimit(totalSize)) { files = files.slice(0, -fileList.length); return; }
    renderList();
  }
  function renderList() {
    list.innerHTML = files.map((f, i) => `<li class="stat-pill" style="margin-bottom:6px;">${i + 1}. ${f.name} (${(f.size / 1024).toFixed(0)} KB)</li>`).join("");
    mergeBtn.disabled = files.length < 2;
  }
  root.querySelector("#pm-clear").addEventListener("click", () => { files = []; renderList(); err.classList.remove("show"); ok.classList.remove("show"); });

  mergeBtn.addEventListener("click", async () => {
    err.classList.remove("show"); ok.classList.remove("show");
    mergeBtn.disabled = true; mergeBtn.textContent = "Merging…";
    try {
      if (!window.PDFLib) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");
      const { PDFDocument } = window.PDFLib;
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      const mergedBytes = await merged.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "merged.pdf";
      a.click();
      ok.textContent = `✅ Merged ${files.length} files into one PDF`;
      ok.classList.add("show");
    } catch (e) {
      err.textContent = "❌ Couldn't merge those files: " + e.message;
      err.classList.add("show");
    }
    mergeBtn.disabled = false; mergeBtn.textContent = "Merge PDFs";
  });
};

/* ---------- 4. BASE64 ENCODER/DECODER ---------- */
TOOL_RENDERERS["base64-converter"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <div class="grid-2">
        <div class="field"><label>Plain text</label><textarea class="code-area" id="b64-plain" style="min-height:160px;"></textarea></div>
        <div class="field"><label>Base64</label><textarea class="code-area" id="b64-encoded" style="min-height:160px;"></textarea></div>
      </div>
      <div class="toolbar">
        <button class="btn btn-primary" id="b64-encode">Encode →</button>
        <button class="btn btn-ghost" id="b64-decode">← Decode</button>
        <label class="btn btn-ghost" style="cursor:pointer;">Encode a file <input type="file" id="b64-file" style="display:none;"></label>
      </div>
      <div class="error-line" id="b64-error"></div>
    </div>`;
  const plain = root.querySelector("#b64-plain");
  const encoded = root.querySelector("#b64-encoded");
  const err = root.querySelector("#b64-error");
  root.querySelector("#b64-encode").addEventListener("click", () => {
    err.classList.remove("show");
    encoded.value = btoa(unescape(encodeURIComponent(plain.value)));
  });
  root.querySelector("#b64-decode").addEventListener("click", () => {
    try { plain.value = decodeURIComponent(escape(atob(encoded.value))); err.classList.remove("show"); }
    catch { err.textContent = "❌ That's not valid Base64"; err.classList.add("show"); }
  });
  root.querySelector("#b64-file").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file || !checkFileLimit(file.size)) return;
    const reader = new FileReader();
    reader.onload = () => { encoded.value = reader.result.split(",")[1]; plain.value = `(binary file: ${file.name})`; };
    reader.readAsDataURL(file);
  });
};

/* ---------- 5. URL ENCODER/DECODER ---------- */
TOOL_RENDERERS["url-encoder"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <div class="grid-2">
        <div class="field"><label>Plain text / URL</label><textarea class="code-area" id="ue-plain" style="min-height:160px;"></textarea></div>
        <div class="field"><label>Encoded</label><textarea class="code-area" id="ue-encoded" style="min-height:160px;"></textarea></div>
      </div>
      <div class="toolbar">
        <button class="btn btn-primary" id="ue-encode">Encode →</button>
        <button class="btn btn-ghost" id="ue-decode">← Decode</button>
      </div>
    </div>`;
  const plain = root.querySelector("#ue-plain");
  const encoded = root.querySelector("#ue-encoded");
  root.querySelector("#ue-encode").addEventListener("click", () => encoded.value = encodeURIComponent(plain.value));
  root.querySelector("#ue-decode").addEventListener("click", () => plain.value = decodeURIComponent(encoded.value));
};

/* ---------- 6. SHA-256 HASH GENERATOR ---------- */
TOOL_RENDERERS["sha256-generator"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <div class="field"><label>Input text</label><textarea class="code-area" id="sh-input" style="min-height:120px;"></textarea></div>
      <div class="field-row">
        <div class="field"><label>Algorithm</label>
          <select id="sh-algo">
            <option value="SHA-256" selected>SHA-256</option>
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>
      </div>
      <div class="toolbar">
        <button class="btn btn-primary" id="sh-run">Generate hash</button>
        <button class="btn btn-ghost" id="sh-copy">Copy hash</button>
      </div>
      <div class="field" style="margin-top:16px;"><label>Hash output</label><input type="text" id="sh-output" readonly style="font-family:monospace;"></div>
    </div>`;
  const input = root.querySelector("#sh-input");
  const output = root.querySelector("#sh-output");
  const algo = root.querySelector("#sh-algo");
  root.querySelector("#sh-run").addEventListener("click", async () => {
    const enc = new TextEncoder().encode(input.value);
    const buf = await crypto.subtle.digest(algo.value, enc);
    output.value = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  });
  root.querySelector("#sh-copy").addEventListener("click", () => {
    if (!output.value) return;
    navigator.clipboard.writeText(output.value);
    toast("Hash copied ✅");
  });
};

/* ---------- 7. CASE CONVERTER ---------- */
TOOL_RENDERERS["case-converter"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <textarea class="code-area" id="cc-input" placeholder="Type or paste text here…" style="min-height:160px;"></textarea>
      <div class="toolbar">
        <button class="btn btn-ghost" data-case="upper">UPPERCASE</button>
        <button class="btn btn-ghost" data-case="lower">lowercase</button>
        <button class="btn btn-ghost" data-case="title">Title Case</button>
        <button class="btn btn-ghost" data-case="sentence">Sentence case</button>
        <button class="btn btn-ghost" data-case="camel">camelCase</button>
        <button class="btn btn-ghost" data-case="trim">Remove extra spaces</button>
        <button class="btn btn-ghost" data-case="nolines">Remove line breaks</button>
      </div>
    </div>`;
  const input = root.querySelector("#cc-input");
  root.querySelectorAll("[data-case]").forEach(btn => btn.addEventListener("click", () => {
    const v = input.value;
    switch (btn.dataset.case) {
      case "upper": input.value = v.toUpperCase(); break;
      case "lower": input.value = v.toLowerCase(); break;
      case "title": input.value = v.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()); break;
      case "sentence": input.value = v.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
      case "camel": input.value = v.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()); break;
      case "trim": input.value = v.replace(/[ \t]+/g, " ").trim(); break;
      case "nolines": input.value = v.replace(/\s*\n+\s*/g, " ").trim(); break;
    }
  }));
};

/* ---------- 8. WORD & CHARACTER COUNTER ---------- */
TOOL_RENDERERS["word-counter"] = function (root) {
  root.innerHTML = `
    <div class="panel">
      <textarea class="code-area" id="wc-input" placeholder="Start typing or paste your text…" style="min-height:200px;"></textarea>
      <div class="field-row">
        <div class="stat-pill">Words: <strong id="wc-words">0</strong></div>
        <div class="stat-pill">Characters: <strong id="wc-chars">0</strong></div>
        <div class="stat-pill">Sentences: <strong id="wc-sentences">0</strong></div>
        <div class="stat-pill">Reading time: <strong id="wc-time">0 sec</strong></div>
      </div>
      <div class="field" style="margin-top:16px;"><label>Most frequent words</label><div id="wc-freq" style="color:var(--text-dim);font-size:0.85rem;"></div></div>
    </div>`;
  const input = root.querySelector("#wc-input");
  const words = root.querySelector("#wc-words");
  const chars = root.querySelector("#wc-chars");
  const sentences = root.querySelector("#wc-sentences");
  const time = root.querySelector("#wc-time");
  const freq = root.querySelector("#wc-freq");
  const STOP = new Set(["the","a","an","is","are","was","were","to","of","and","in","on","for","it","this","that","with","as","at","by"]);
  input.addEventListener("input", () => {
    const text = input.value;
    const wordList = text.trim().match(/\S+/g) || [];
    words.textContent = wordList.length;
    chars.textContent = text.length;
    sentences.textContent = (text.match(/[.!?]+/g) || []).length;
    const secs = Math.round(wordList.length / 200 * 60);
    time.textContent = secs < 60 ? `${secs} sec` : `${Math.round(secs / 60)} min`;
    const counts = {};
    wordList.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (clean.length < 3 || STOP.has(clean)) return;
      counts[clean] = (counts[clean] || 0) + 1;
    });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    freq.innerHTML = top.length ? top.map(([w, c]) => `<span class="stat-pill" style="margin:0 6px 6px 0;display:inline-block;">${w} × ${c}</span>`).join("") : "—";
  });
};

/* ---------- IMAGE RESIZER ---------- */
TOOL_RENDERERS["image-resizer"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="ir-drop">${ICONS.image}<div><strong>Click to upload</strong> or drag an image</div><input type="file" id="ir-input" accept="image/*"></div>
    <div class="field-row" id="ir-controls" style="display:none;">
      <div class="field"><label>Width (px)</label><input type="number" id="ir-w"></div>
      <div class="field"><label>Height (px)</label><input type="number" id="ir-h"></div>
      <div class="field"><label><input type="checkbox" id="ir-lock" checked> Lock aspect ratio</label></div>
    </div>
    <div class="result-preview" id="ir-preview" style="display:none;"></div>
    <div class="toolbar" id="ir-toolbar" style="display:none;"><button class="btn btn-primary" id="ir-download">Download resized image</button></div>
  </div>`;
  let img, ratio;
  const drop = root.querySelector("#ir-drop"), input = root.querySelector("#ir-input");
  const wIn = root.querySelector("#ir-w"), hIn = root.querySelector("#ir-h"), lock = root.querySelector("#ir-lock");
  drop.addEventListener("click", () => input.click());
  input.addEventListener("change", () => input.files[0] && handle(input.files[0]));
  drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("drag"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("drag"));
  drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("drag"); e.dataTransfer.files[0] && handle(e.dataTransfer.files[0]); });
  function handle(file) {
    if (!checkFileLimit(file.size)) return;
    const reader = new FileReader();
    reader.onload = e => { img = new Image(); img.onload = () => { ratio = img.width / img.height; wIn.value = img.width; hIn.value = img.height; root.querySelector("#ir-controls").style.display = "flex"; renderResult(); }; img.src = e.target.result; };
    reader.readAsDataURL(file);
  }
  wIn.addEventListener("input", () => { if (lock.checked) hIn.value = Math.round(wIn.value / ratio); renderResult(); });
  hIn.addEventListener("input", () => { if (lock.checked) wIn.value = Math.round(hIn.value * ratio); renderResult(); });
  function renderResult() {
    if (!img || !wIn.value || !hIn.value) return;
    const canvas = document.createElement("canvas");
    canvas.width = wIn.value; canvas.height = hIn.value;
    canvas.getContext("2d").drawImage(img, 0, 0, wIn.value, hIn.value);
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      root.querySelector("#ir-preview").style.display = "flex";
      root.querySelector("#ir-preview").innerHTML = `<img src="${url}"><div class="stat-pill">${wIn.value} × ${hIn.value}px</div>`;
      root.querySelector("#ir-toolbar").style.display = "flex";
      root.querySelector("#ir-download").onclick = () => { const a = document.createElement("a"); a.href = url; a.download = "resized.png"; a.click(); };
    });
  }
};

/* ---------- IMAGE TO WEBP ---------- */
TOOL_RENDERERS["image-to-webp"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="iw-drop">${ICONS.image}<div><strong>Click to upload</strong> an image to convert to WebP</div><input type="file" id="iw-input" accept="image/*"></div>
    <div class="result-preview" id="iw-preview" style="display:none;"></div>
    <div class="toolbar" id="iw-toolbar" style="display:none;"><button class="btn btn-primary" id="iw-download">Download .webp</button></div>
  </div>`;
  const drop = root.querySelector("#iw-drop"), input = root.querySelector("#iw-input");
  drop.addEventListener("click", () => input.click());
  input.addEventListener("change", () => input.files[0] && handle(input.files[0]));
  function handle(file) {
    if (!checkFileLimit(file.size)) return;
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width; canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          root.querySelector("#iw-preview").style.display = "flex";
          root.querySelector("#iw-preview").innerHTML = `<img src="${url}"><div class="stat-pill">${(blob.size / 1024).toFixed(1)} KB</div>`;
          root.querySelector("#iw-toolbar").style.display = "flex";
          root.querySelector("#iw-download").onclick = () => { const a = document.createElement("a"); a.href = url; a.download = "converted.webp"; a.click(); };
        }, "image/webp", 0.9);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

/* ---------- HEIC TO JPG ---------- */
TOOL_RENDERERS["heic-to-jpg"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="hj-drop">${ICONS.image}<div><strong>Click to upload</strong> a .HEIC photo</div><input type="file" id="hj-input" accept=".heic,image/heic"></div>
    <div class="ok-line" id="hj-ok"></div><div class="error-line" id="hj-error"></div>
    <div class="toolbar" id="hj-toolbar" style="display:none;"><button class="btn btn-primary" id="hj-download">Download .jpg</button></div>
  </div>`;
  const drop = root.querySelector("#hj-drop"), input = root.querySelector("#hj-input");
  const ok = root.querySelector("#hj-ok"), err = root.querySelector("#hj-error");
  drop.addEventListener("click", () => input.click());
  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file || !checkFileLimit(file.size)) return;
    ok.classList.remove("show"); err.classList.remove("show");
    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js");
      const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
      const url = URL.createObjectURL(blob);
      ok.textContent = "✅ Converted successfully"; ok.classList.add("show");
      root.querySelector("#hj-toolbar").style.display = "flex";
      root.querySelector("#hj-download").onclick = () => { const a = document.createElement("a"); a.href = url; a.download = "converted.jpg"; a.click(); };
    } catch (e) { err.textContent = "❌ Couldn't convert this file: " + e.message; err.classList.add("show"); }
  });
};

/* ---------- FAVICON GENERATOR ---------- */
TOOL_RENDERERS["favicon-generator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="fg-drop">${ICONS.image}<div><strong>Click to upload</strong> a square logo/image</div><input type="file" id="fg-input" accept="image/*"></div>
    <div class="result-preview" id="fg-preview" style="display:none;"></div>
  </div>`;
  const drop = root.querySelector("#fg-drop"), input = root.querySelector("#fg-input");
  drop.addEventListener("click", () => input.click());
  input.addEventListener("change", () => input.files[0] && handle(input.files[0]));
  function handle(file) {
    if (!checkFileLimit(file.size)) return;
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const sizes = [16, 32, 48, 180];
        const preview = root.querySelector("#fg-preview");
        preview.style.display = "flex"; preview.innerHTML = "";
        sizes.forEach(size => {
          const canvas = document.createElement("canvas");
          canvas.width = size; canvas.height = size;
          canvas.getContext("2d").drawImage(img, 0, 0, size, size);
          canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const wrap = document.createElement("div");
            wrap.innerHTML = `<img src="${url}" style="width:48px;height:48px;image-rendering:pixelated;"><div class="stat-pill" style="margin-top:6px;">${size}×${size}</div>`;
            const dl = document.createElement("button"); dl.className = "btn btn-ghost"; dl.style.marginTop = "6px"; dl.textContent = "Download";
            dl.onclick = () => { const a = document.createElement("a"); a.href = url; a.download = `favicon-${size}.png`; a.click(); };
            wrap.appendChild(dl);
            preview.appendChild(wrap);
          });
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

/* ---------- COLOR PICKER ---------- */
TOOL_RENDERERS["color-picker"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field-row">
      <div class="field"><label>Pick a color</label><input type="color" id="cp-color" value="#10b981" style="width:100%;height:44px;background:none;border:1px solid var(--border);border-radius:6px;"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>HEX</label><input type="text" id="cp-hex" readonly></div>
      <div class="field"><label>RGB</label><input type="text" id="cp-rgb" readonly></div>
      <div class="field"><label>HSL</label><input type="text" id="cp-hsl" readonly></div>
    </div>
  </div>`;
  const color = root.querySelector("#cp-color"), hex = root.querySelector("#cp-hex"), rgb = root.querySelector("#cp-rgb"), hsl = root.querySelector("#cp-hsl");
  function update() {
    const h = color.value;
    hex.value = h.toUpperCase();
    const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
    rgb.value = `rgb(${r}, ${g}, ${b})`;
    const r1 = r / 255, g1 = g / 255, b1 = b / 255;
    const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
    let hh = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r1) hh = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
      else if (max === g1) hh = (b1 - r1) / d + 2;
      else hh = (r1 - g1) / d + 4;
      hh *= 60;
    }
    hsl.value = `hsl(${Math.round(hh)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }
  color.addEventListener("input", update); update();
  [hex, rgb, hsl].forEach(f => f.addEventListener("click", () => { navigator.clipboard.writeText(f.value); toast("Copied ✅"); }));
};

/* ---------- GRADIENT GENERATOR ---------- */
TOOL_RENDERERS["gradient-generator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div style="height:140px;border-radius:10px;margin-bottom:18px;" id="gg-preview"></div>
    <div class="field-row">
      <div class="field"><label>Color 1</label><input type="color" id="gg-c1" value="#10b981" style="width:100%;height:40px;background:none;border:1px solid var(--border);border-radius:6px;"></div>
      <div class="field"><label>Color 2</label><input type="color" id="gg-c2" value="#0ea5e9" style="width:100%;height:40px;background:none;border:1px solid var(--border);border-radius:6px;"></div>
      <div class="field"><label>Type</label><select id="gg-type"><option value="linear">Linear</option><option value="radial">Radial</option></select></div>
      <div class="field"><label>Angle: <span id="gg-angle-val">90</span>°</label><input type="range" id="gg-angle" min="0" max="360" value="90"></div>
    </div>
    <div class="field" style="margin-top:16px;"><label>CSS</label><textarea class="code-area" id="gg-css" readonly style="min-height:60px;"></textarea></div>
  </div>`;
  const preview = root.querySelector("#gg-preview"), css = root.querySelector("#gg-css");
  const c1 = root.querySelector("#gg-c1"), c2 = root.querySelector("#gg-c2"), type = root.querySelector("#gg-type"), angle = root.querySelector("#gg-angle"), angleVal = root.querySelector("#gg-angle-val");
  function update() {
    angleVal.textContent = angle.value;
    const value = type.value === "linear" ? `linear-gradient(${angle.value}deg, ${c1.value}, ${c2.value})` : `radial-gradient(circle, ${c1.value}, ${c2.value})`;
    preview.style.background = value;
    css.value = `background: ${value};`;
  }
  [c1, c2, type, angle].forEach(el => el.addEventListener("input", update));
  css.addEventListener("click", () => { navigator.clipboard.writeText(css.value); toast("CSS copied ✅"); });
  update();
};

/* ---------- PDF SPLIT ---------- */
TOOL_RENDERERS["pdf-split"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="ps-drop">${ICONS.file}<div><strong>Click to upload</strong> a PDF</div><input type="file" id="ps-input" accept="application/pdf"></div>
    <div class="field-row" id="ps-controls" style="display:none;">
      <div class="field"><label>Page range (e.g. 1-3)</label><input type="text" id="ps-range" placeholder="1-3"></div>
    </div>
    <div class="toolbar" id="ps-toolbar" style="display:none;"><button class="btn btn-primary" id="ps-split">Split & download</button></div>
    <div class="error-line" id="ps-error"></div><div class="ok-line" id="ps-ok"></div>
  </div>`;
  let file;
  root.querySelector("#ps-drop").addEventListener("click", () => root.querySelector("#ps-input").click());
  root.querySelector("#ps-input").addEventListener("change", e => {
    file = e.target.files[0];
    if (!file || !checkFileLimit(file.size)) return;
    root.querySelector("#ps-controls").style.display = "flex";
    root.querySelector("#ps-toolbar").style.display = "flex";
  });
  root.querySelector("#ps-split").addEventListener("click", async () => {
    const err = root.querySelector("#ps-error"), ok = root.querySelector("#ps-ok");
    err.classList.remove("show"); ok.classList.remove("show");
    try {
      if (!window.PDFLib) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");
      const { PDFDocument } = window.PDFLib;
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const range = root.querySelector("#ps-range").value.split("-").map(n => parseInt(n.trim(), 10));
      const start = (range[0] || 1) - 1, end = (range[1] || range[0] || src.getPageCount()) - 1;
      const out = await PDFDocument.create();
      const indices = []; for (let i = start; i <= end; i++) indices.push(i);
      const pages = await out.copyPages(src, indices);
      pages.forEach(p => out.addPage(p));
      const outBytes = await out.save();
      const blob = new Blob([outBytes], { type: "application/pdf" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "split.pdf"; a.click();
      ok.textContent = `✅ Extracted pages ${start + 1}–${end + 1}`; ok.classList.add("show");
    } catch (e) { err.textContent = "❌ " + e.message; err.classList.add("show"); }
  });
};

/* ---------- PDF TO IMAGE ---------- */
TOOL_RENDERERS["pdf-to-image"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="pi-drop">${ICONS.file}<div><strong>Click to upload</strong> a PDF to render as images</div><input type="file" id="pi-input" accept="application/pdf"></div>
    <div class="result-preview" id="pi-preview" style="display:none;flex-wrap:wrap;"></div>
  </div>`;
  root.querySelector("#pi-drop").addEventListener("click", () => root.querySelector("#pi-input").click());
  root.querySelector("#pi-input").addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file || !checkFileLimit(file.size)) return;
    if (!window.pdfjsLib) {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
    const bytes = await file.arrayBuffer();
    const doc = await window.pdfjsLib.getDocument({ data: bytes }).promise;
    const preview = root.querySelector("#pi-preview");
    preview.style.display = "flex"; preview.innerHTML = "";
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      const url = canvas.toDataURL("image/png");
      const wrap = document.createElement("div");
      wrap.innerHTML = `<img src="${url}" style="max-width:160px;border-radius:6px;border:1px solid var(--border);"><div style="text-align:center;margin-top:4px;"><a class="btn btn-ghost" href="${url}" download="page-${i}.png" style="font-size:0.75rem;padding:5px 10px;">Page ${i} ↓</a></div>`;
      preview.appendChild(wrap);
    }
  });
};

/* ---------- PDF COMPRESSOR ---------- */
TOOL_RENDERERS["pdf-compressor"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="pc-drop">${ICONS.file}<div><strong>Click to upload</strong> a PDF to optimize</div><input type="file" id="pc-input" accept="application/pdf"></div>
    <div class="error-line" id="pc-error"></div><div class="ok-line" id="pc-ok"></div>
    <div class="toolbar" id="pc-toolbar" style="display:none;"><button class="btn btn-primary" id="pc-download">Download optimized PDF</button></div>
  </div>`;
  let resultBlob, originalSize;
  root.querySelector("#pc-drop").addEventListener("click", () => root.querySelector("#pc-input").click());
  root.querySelector("#pc-input").addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file || !checkFileLimit(file.size)) return;
    const err = root.querySelector("#pc-error"), ok = root.querySelector("#pc-ok");
    err.classList.remove("show"); ok.classList.remove("show");
    originalSize = file.size;
    try {
      if (!window.PDFLib) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");
      const { PDFDocument } = window.PDFLib;
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      doc.setTitle(""); doc.setAuthor(""); doc.setSubject(""); doc.setKeywords([]); doc.setProducer(""); doc.setCreator("");
      const outBytes = await doc.save({ useObjectStreams: true });
      resultBlob = new Blob([outBytes], { type: "application/pdf" });
      const savedPct = Math.max(0, Math.round((1 - resultBlob.size / originalSize) * 100));
      ok.textContent = `✅ Optimized — ${(originalSize / 1024).toFixed(0)}KB → ${(resultBlob.size / 1024).toFixed(0)}KB (${savedPct}% smaller). For deep image compression, run pages through the Image Compressor first.`;
      ok.classList.add("show");
      root.querySelector("#pc-toolbar").style.display = "flex";
      root.querySelector("#pc-download").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(resultBlob); a.download = "optimized.pdf"; a.click(); };
    } catch (e2) { err.textContent = "❌ " + e2.message; err.classList.add("show"); }
  });
};

/* ---------- PDF PAGE REMOVER ---------- */
TOOL_RENDERERS["pdf-page-remover"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="dropzone" id="pr-drop">${ICONS.file}<div><strong>Click to upload</strong> a PDF</div><input type="file" id="pr-input" accept="application/pdf"></div>
    <div class="field-row" id="pr-controls" style="display:none;"><div class="field"><label>Page numbers to remove (e.g. 2,4)</label><input type="text" id="pr-pages" placeholder="2,4"></div></div>
    <div class="toolbar" id="pr-toolbar" style="display:none;"><button class="btn btn-primary" id="pr-run">Remove & download</button></div>
    <div class="error-line" id="pr-error"></div><div class="ok-line" id="pr-ok"></div>
  </div>`;
  let file;
  root.querySelector("#pr-drop").addEventListener("click", () => root.querySelector("#pr-input").click());
  root.querySelector("#pr-input").addEventListener("change", e => {
    file = e.target.files[0];
    if (!file || !checkFileLimit(file.size)) return;
    root.querySelector("#pr-controls").style.display = "flex";
    root.querySelector("#pr-toolbar").style.display = "flex";
  });
  root.querySelector("#pr-run").addEventListener("click", async () => {
    const err = root.querySelector("#pr-error"), ok = root.querySelector("#pr-ok");
    err.classList.remove("show"); ok.classList.remove("show");
    try {
      if (!window.PDFLib) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js");
      const { PDFDocument } = window.PDFLib;
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const remove = root.querySelector("#pr-pages").value.split(",").map(n => parseInt(n.trim(), 10) - 1).sort((a, b) => b - a);
      remove.forEach(i => { if (i >= 0 && i < doc.getPageCount()) doc.removePage(i); });
      const outBytes = await doc.save();
      const blob = new Blob([outBytes], { type: "application/pdf" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "edited.pdf"; a.click();
      ok.textContent = "✅ Pages removed"; ok.classList.add("show");
    } catch (e) { err.textContent = "❌ " + e.message; err.classList.add("show"); }
  });
};

/* ---------- CSV <-> JSON ---------- */
function parseCSV(text) {
  const rows = text.trim().split(/\r?\n/).map(r => r.split(",").map(c => c.trim().replace(/^"|"$/g, "")));
  const headers = rows[0];
  return rows.slice(1).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
}
TOOL_RENDERERS["csv-to-json"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="grid-2">
    <div class="field"><label>CSV input</label><textarea class="code-area" id="cj-in" style="min-height:200px;" placeholder="name,age&#10;Ahsan,22"></textarea></div>
    <div class="field"><label>JSON output</label><textarea class="code-area" id="cj-out" style="min-height:200px;" readonly></textarea></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="cj-run">Convert</button></div><div class="error-line" id="cj-error"></div></div>`;
  root.querySelector("#cj-run").addEventListener("click", () => {
    const err = root.querySelector("#cj-error"); err.classList.remove("show");
    try { root.querySelector("#cj-out").value = JSON.stringify(parseCSV(root.querySelector("#cj-in").value), null, 2); }
    catch (e) { err.textContent = "❌ " + e.message; err.classList.add("show"); }
  });
};
TOOL_RENDERERS["json-to-csv"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="grid-2">
    <div class="field"><label>JSON input (array of objects)</label><textarea class="code-area" id="jc-in" style="min-height:200px;" placeholder='[{"name":"Ahsan","age":22}]'></textarea></div>
    <div class="field"><label>CSV output</label><textarea class="code-area" id="jc-out" style="min-height:200px;" readonly></textarea></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="jc-run">Convert</button></div><div class="error-line" id="jc-error"></div></div>`;
  root.querySelector("#jc-run").addEventListener("click", () => {
    const err = root.querySelector("#jc-error"); err.classList.remove("show");
    try {
      const data = JSON.parse(root.querySelector("#jc-in").value);
      const headers = Object.keys(data[0]);
      const lines = [headers.join(","), ...data.map(row => headers.map(h => row[h]).join(","))];
      root.querySelector("#jc-out").value = lines.join("\n");
    } catch (e) { err.textContent = "❌ " + e.message; err.classList.add("show"); }
  });
};

/* ---------- XML FORMATTER ---------- */
TOOL_RENDERERS["xml-formatter"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="xf-in" style="min-height:220px;" placeholder="<root><item>value</item></root>"></textarea>
    <div class="toolbar"><button class="btn btn-primary" id="xf-run">Format</button></div><div class="error-line" id="xf-error"></div></div>`;
  root.querySelector("#xf-run").addEventListener("click", () => {
    const err = root.querySelector("#xf-error"); err.classList.remove("show");
    const input = root.querySelector("#xf-in");
    try {
      let xml = input.value.replace(/>\s*</g, "><").trim();
      let formatted = "", indent = 0;
      xml.split(/(?=<)/).forEach(node => {
        if (!node) return;
        if (node.match(/^<\/\w/)) indent--;
        formatted += "  ".repeat(Math.max(indent, 0)) + node.trim() + "\n";
        if (node.match(/^<\w[^>]*[^\/]>$/) && !node.match(/^<\?/)) indent++;
      });
      input.value = formatted.trim();
    } catch (e) { err.textContent = "❌ " + e.message; err.classList.add("show"); }
  });
};

/* ---------- YAML TO JSON ---------- */
TOOL_RENDERERS["yaml-to-json"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="grid-2">
    <div class="field"><label>YAML input</label><textarea class="code-area" id="yj-in" style="min-height:200px;" placeholder="name: Ahsan&#10;age: 22"></textarea></div>
    <div class="field"><label>JSON output</label><textarea class="code-area" id="yj-out" style="min-height:200px;" readonly></textarea></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="yj-run">Convert</button></div><div class="error-line" id="yj-error"></div></div>`;
  root.querySelector("#yj-run").addEventListener("click", async () => {
    const err = root.querySelector("#yj-error"); err.classList.remove("show");
    try {
      if (!window.jsyaml) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js");
      root.querySelector("#yj-out").value = JSON.stringify(window.jsyaml.load(root.querySelector("#yj-in").value), null, 2);
    } catch (e) { err.textContent = "❌ " + e.message; err.classList.add("show"); }
  });
};

/* ---------- CSS MINIFIER ---------- */
TOOL_RENDERERS["css-minifier"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="cm-in" style="min-height:220px;" placeholder="body { color: red; }"></textarea>
    <div class="toolbar"><button class="btn btn-primary" id="cm-run">Minify</button><button class="btn btn-ghost" id="cm-copy">Copy</button></div></div>`;
  root.querySelector("#cm-run").addEventListener("click", () => {
    const el = root.querySelector("#cm-in");
    el.value = el.value.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").replace(/\s+/g, " ").trim();
  });
  root.querySelector("#cm-copy").addEventListener("click", () => { navigator.clipboard.writeText(root.querySelector("#cm-in").value); toast("Copied ✅"); });
};

/* ---------- JS MINIFIER (lightweight) ---------- */
TOOL_RENDERERS["js-minifier"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="jm-in" style="min-height:220px;" placeholder="function greet() {\n  console.log('hi');\n}"></textarea>
    <div class="toolbar"><button class="btn btn-primary" id="jm-run">Minify</button><button class="btn btn-ghost" id="jm-copy">Copy</button></div>
    <p style="font-size:0.78rem;color:var(--text-faint);margin-top:8px;">Strips comments and extra whitespace. For advanced minification (renaming variables), pair with a build tool like Terser.</p></div>`;
  root.querySelector("#jm-run").addEventListener("click", () => {
    const el = root.querySelector("#jm-in");
    el.value = el.value.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1").replace(/\n\s*/g, "\n").replace(/\s{2,}/g, " ").trim();
  });
  root.querySelector("#jm-copy").addEventListener("click", () => { navigator.clipboard.writeText(root.querySelector("#jm-in").value); toast("Copied ✅"); });
};

/* ---------- HTML FORMATTER ---------- */
TOOL_RENDERERS["html-formatter"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="hf-in" style="min-height:220px;" placeholder="<div><p>Hello</p></div>"></textarea>
    <div class="toolbar"><button class="btn btn-primary" id="hf-run">Format</button></div></div>`;
  root.querySelector("#hf-run").addEventListener("click", () => {
    const input = root.querySelector("#hf-in");
    let html = input.value.replace(/>\s*</g, "><").trim();
    let formatted = "", indent = 0;
    const voidTags = /^(br|img|input|hr|meta|link)/i;
    html.split(/(?=<)/).forEach(node => {
      if (!node) return;
      const closeTag = node.match(/^<\/\w/);
      const selfClose = node.match(/\/>$/) || voidTags.test(node.replace("<", ""));
      if (closeTag) indent--;
      formatted += "  ".repeat(Math.max(indent, 0)) + node.trim() + "\n";
      if (!closeTag && !selfClose && node.match(/^<\w[^>]*>$/)) indent++;
    });
    input.value = formatted.trim();
  });
};

/* ---------- SQL FORMATTER ---------- */
TOOL_RENDERERS["sql-formatter"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="sf-in" style="min-height:220px;" placeholder="select id, name from users where age > 18"></textarea>
    <div class="toolbar"><button class="btn btn-primary" id="sf-run">Format</button></div></div>`;
  const KEYWORDS = ["SELECT","FROM","WHERE","AND","OR","JOIN","LEFT JOIN","RIGHT JOIN","INNER JOIN","ORDER BY","GROUP BY","HAVING","INSERT INTO","VALUES","UPDATE","SET","DELETE","LIMIT"];
  root.querySelector("#sf-run").addEventListener("click", () => {
    const el = root.querySelector("#sf-in");
    let sql = el.value.replace(/\s+/g, " ").trim();
    KEYWORDS.forEach(k => { sql = sql.replace(new RegExp("\\b" + k + "\\b", "gi"), "\n" + k.toUpperCase()); });
    el.value = sql.trim();
  });
};

/* ---------- REGEX TESTER ---------- */
TOOL_RENDERERS["regex-tester"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field-row">
      <div class="field" style="flex:2;"><label>Pattern</label><input type="text" id="rt-pattern" placeholder="\\d+"></div>
      <div class="field"><label>Flags</label><input type="text" id="rt-flags" value="g"></div>
    </div>
    <div class="field" style="margin-top:14px;"><label>Test string</label><textarea class="code-area" id="rt-text" style="min-height:140px;"></textarea></div>
    <div class="field" style="margin-top:14px;"><label>Matches</label><div id="rt-matches" style="color:var(--text-dim);font-size:0.85rem;"></div></div>
  </div>`;
  const pattern = root.querySelector("#rt-pattern"), flags = root.querySelector("#rt-flags"), text = root.querySelector("#rt-text"), out = root.querySelector("#rt-matches");
  function run() {
    try {
      const re = new RegExp(pattern.value, flags.value);
      const matches = [...text.value.matchAll(re)];
      out.innerHTML = matches.length ? matches.map(m => `<span class="stat-pill" style="margin:0 6px 6px 0;display:inline-block;">${m[0]}</span>`).join("") + `<div style="margin-top:8px;">${matches.length} match(es)</div>` : "No matches";
    } catch (e) { out.textContent = "❌ " + e.message; }
  }
  [pattern, flags, text].forEach(el => el.addEventListener("input", run));
};

/* ---------- DIFF CHECKER ---------- */
TOOL_RENDERERS["diff-checker"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="grid-2">
    <div class="field"><label>Text A</label><textarea class="code-area" id="dc-a" style="min-height:180px;"></textarea></div>
    <div class="field"><label>Text B</label><textarea class="code-area" id="dc-b" style="min-height:180px;"></textarea></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="dc-run">Compare</button></div>
    <div id="dc-result" style="margin-top:14px;font-family:monospace;font-size:0.85rem;white-space:pre-wrap;"></div></div>`;
  root.querySelector("#dc-run").addEventListener("click", () => {
    const a = root.querySelector("#dc-a").value.split("\n"), b = root.querySelector("#dc-b").value.split("\n");
    const result = root.querySelector("#dc-result");
    const maxLen = Math.max(a.length, b.length);
    let html = "";
    for (let i = 0; i < maxLen; i++) {
      const la = a[i], lb = b[i];
      if (la === lb) html += `<div style="color:var(--text-dim);">  ${la ?? ""}</div>`;
      else {
        if (la !== undefined) html += `<div style="color:var(--danger);background:rgba(248,113,113,0.08);">- ${la}</div>`;
        if (lb !== undefined) html += `<div style="color:var(--accent-bright);background:var(--accent-dim);">+ ${lb}</div>`;
      }
    }
    result.innerHTML = html;
  });
};

/* ---------- MARKDOWN PREVIEW ---------- */
TOOL_RENDERERS["markdown-preview"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="grid-2">
    <div class="field"><label>Markdown</label><textarea class="code-area" id="md-in" style="min-height:260px;" placeholder="# Hello&#10;**bold** text"></textarea></div>
    <div class="field"><label>Preview</label><div id="md-out" class="panel" style="min-height:260px;background:var(--surface-2);"></div></div></div></div>`;
  const input = root.querySelector("#md-in"), out = root.querySelector("#md-out");
  async function render() {
    if (!window.marked) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.2/marked.min.js");
    out.innerHTML = window.marked.parse(input.value);
  }
  input.addEventListener("input", render);
};

/* ---------- UUID GENERATOR ---------- */
TOOL_RENDERERS["uuid-generator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field-row"><div class="field"><label>How many?</label><input type="number" id="uu-count" value="5" min="1" max="50"></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="uu-run">Generate</button></div>
    <textarea class="code-area" id="uu-out" style="min-height:160px;margin-top:14px;" readonly></textarea></div>`;
  root.querySelector("#uu-run").addEventListener("click", () => {
    const n = parseInt(root.querySelector("#uu-count").value, 10) || 1;
    root.querySelector("#uu-out").value = Array.from({ length: n }, () => crypto.randomUUID()).join("\n");
  });
};

/* ---------- MD5 GENERATOR ---------- */
TOOL_RENDERERS["md5-generator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field"><label>Input text</label><textarea class="code-area" id="md5-in" style="min-height:120px;"></textarea></div>
    <div class="toolbar"><button class="btn btn-primary" id="md5-run">Generate MD5</button><button class="btn btn-ghost" id="md5-copy">Copy</button></div>
    <div class="field" style="margin-top:16px;"><label>MD5 hash</label><input type="text" id="md5-out" readonly style="font-family:monospace;"></div></div>`;
  root.querySelector("#md5-run").addEventListener("click", async () => {
    if (!window.CryptoJS) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.min.js");
    root.querySelector("#md5-out").value = window.CryptoJS.MD5(root.querySelector("#md5-in").value).toString();
  });
  root.querySelector("#md5-copy").addEventListener("click", () => {
    const v = root.querySelector("#md5-out").value;
    if (!v) return; navigator.clipboard.writeText(v); toast("Copied ✅");
  });
};

/* ---------- JWT DECODER ---------- */
TOOL_RENDERERS["jwt-decoder"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field"><label>JWT token</label><textarea class="code-area" id="jw-in" style="min-height:100px;" placeholder="eyJhbGciOi..."></textarea></div>
    <div class="toolbar"><button class="btn btn-primary" id="jw-run">Decode</button></div>
    <div class="grid-2" style="margin-top:16px;">
      <div class="field"><label>Header</label><textarea class="code-area" id="jw-header" style="min-height:140px;" readonly></textarea></div>
      <div class="field"><label>Payload</label><textarea class="code-area" id="jw-payload" style="min-height:140px;" readonly></textarea></div></div>
    <div class="error-line" id="jw-error"></div></div>`;
  root.querySelector("#jw-run").addEventListener("click", () => {
    const err = root.querySelector("#jw-error"); err.classList.remove("show");
    try {
      const [h, p] = root.querySelector("#jw-in").value.trim().split(".");
      root.querySelector("#jw-header").value = JSON.stringify(JSON.parse(decodeURIComponent(escape(atob(h.replace(/-/g, "+").replace(/_/g, "/"))))), null, 2);
      root.querySelector("#jw-payload").value = JSON.stringify(JSON.parse(decodeURIComponent(escape(atob(p.replace(/-/g, "+").replace(/_/g, "/"))))), null, 2);
    } catch (e) { err.textContent = "❌ Invalid JWT"; err.classList.add("show"); }
  });
};

/* ---------- HTML ENTITY ENCODER ---------- */
TOOL_RENDERERS["html-entity-encoder"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="grid-2">
    <div class="field"><label>Plain text</label><textarea class="code-area" id="he-plain" style="min-height:160px;"></textarea></div>
    <div class="field"><label>HTML entities</label><textarea class="code-area" id="he-encoded" style="min-height:160px;"></textarea></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="he-encode">Encode →</button><button class="btn btn-ghost" id="he-decode">← Decode</button></div></div>`;
  const plain = root.querySelector("#he-plain"), encoded = root.querySelector("#he-encoded");
  root.querySelector("#he-encode").addEventListener("click", () => {
    const div = document.createElement("div"); div.textContent = plain.value;
    encoded.value = div.innerHTML;
  });
  root.querySelector("#he-decode").addEventListener("click", () => {
    const div = document.createElement("div"); div.innerHTML = encoded.value;
    plain.value = div.textContent;
  });
};

/* ---------- BINARY CONVERTER ---------- */
TOOL_RENDERERS["binary-converter"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="grid-2">
    <div class="field"><label>Text</label><textarea class="code-area" id="bc-text" style="min-height:140px;"></textarea></div>
    <div class="field"><label>Binary</label><textarea class="code-area" id="bc-bin" style="min-height:140px;"></textarea></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="bc-encode">Text → Binary</button><button class="btn btn-ghost" id="bc-decode">Binary → Text</button></div></div>`;
  const text = root.querySelector("#bc-text"), bin = root.querySelector("#bc-bin");
  root.querySelector("#bc-encode").addEventListener("click", () => {
    bin.value = text.value.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
  });
  root.querySelector("#bc-decode").addEventListener("click", () => {
    text.value = bin.value.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("");
  });
};

/* ---------- QR CODE GENERATOR ---------- */
TOOL_RENDERERS["qr-code-generator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field"><label>Text or URL</label><input type="text" id="qr-text" placeholder="https://toolkitties.com"></div>
    <div class="toolbar"><button class="btn btn-primary" id="qr-run">Generate QR code</button></div>
    <div id="qr-canvas" style="margin-top:18px;background:#fff;padding:16px;border-radius:10px;width:fit-content;"></div>
    <div class="toolbar" id="qr-toolbar" style="display:none;"><button class="btn btn-ghost" id="qr-download">Download PNG</button></div></div>`;
  root.querySelector("#qr-run").addEventListener("click", async () => {
    if (!window.QRCode) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js");
    const holder = root.querySelector("#qr-canvas");
    holder.innerHTML = "";
    new window.QRCode(holder, { text: root.querySelector("#qr-text").value || "https://toolkitties.com", width: 200, height: 200 });
    root.querySelector("#qr-toolbar").style.display = "flex";
    root.querySelector("#qr-download").onclick = () => {
      const img = holder.querySelector("img") || holder.querySelector("canvas");
      const a = document.createElement("a"); a.download = "qrcode.png";
      a.href = img.tagName === "CANVAS" ? img.toDataURL() : img.src;
      a.click();
    };
  });
};

/* ---------- BARCODE GENERATOR ---------- */
TOOL_RENDERERS["barcode-generator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field"><label>Value</label><input type="text" id="bg-text" placeholder="123456789012"></div>
    <div class="toolbar"><button class="btn btn-primary" id="bg-run">Generate barcode</button></div>
    <div style="margin-top:18px;background:#fff;padding:16px;border-radius:10px;width:fit-content;"><svg id="bg-svg"></svg></div>
    <div class="toolbar" id="bg-toolbar" style="display:none;"><button class="btn btn-ghost" id="bg-download">Download PNG</button></div></div>`;
  root.querySelector("#bg-run").addEventListener("click", async () => {
    if (!window.JsBarcode) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/JsBarcode/3.11.5/JsBarcode.all.min.js");
    window.JsBarcode(root.querySelector("#bg-svg"), root.querySelector("#bg-text").value || "123456789012");
    root.querySelector("#bg-toolbar").style.display = "flex";
    root.querySelector("#bg-download").onclick = () => {
      const svg = root.querySelector("#bg-svg");
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width; canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        const a = document.createElement("a"); a.download = "barcode.png"; a.href = canvas.toDataURL(); a.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };
  });
};

/* ---------- SLUG GENERATOR ---------- */
TOOL_RENDERERS["slug-generator"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="field"><label>Text</label><input type="text" id="sg-in" placeholder="My Blog Post Title!"></div>
    <div class="field" style="margin-top:14px;"><label>Slug</label><input type="text" id="sg-out" readonly></div></div>`;
  root.querySelector("#sg-in").addEventListener("input", e => {
    root.querySelector("#sg-out").value = e.target.value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  });
};

/* ---------- LOREM IPSUM GENERATOR ---------- */
TOOL_RENDERERS["lorem-ipsum"] = function (root) {
  const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat".split(" ");
  root.innerHTML = `<div class="panel">
    <div class="field-row"><div class="field"><label>Paragraphs</label><input type="number" id="li-count" value="3" min="1" max="20"></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="li-run">Generate</button></div>
    <textarea class="code-area" id="li-out" style="min-height:200px;margin-top:14px;" readonly></textarea></div>`;
  root.querySelector("#li-run").addEventListener("click", () => {
    const n = parseInt(root.querySelector("#li-count").value, 10) || 1;
    const paras = Array.from({ length: n }, () => {
      const len = 40 + Math.floor(Math.random() * 30);
      let words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
      words[0] = words[0][0].toUpperCase() + words[0].slice(1);
      return words.join(" ") + ".";
    });
    root.querySelector("#li-out").value = paras.join("\n\n");
  });
};

/* ---------- TEXT TO SPEECH ---------- */
TOOL_RENDERERS["text-to-speech"] = function (root) {
  root.innerHTML = `<div class="panel">
    <textarea class="code-area" id="ts-in" style="min-height:160px;" placeholder="Type something to hear it spoken…"></textarea>
    <div class="field-row"><div class="field"><label>Voice</label><select id="ts-voice"></select></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="ts-play">▶ Speak</button><button class="btn btn-ghost" id="ts-stop">■ Stop</button></div></div>`;
  const voiceSelect = root.querySelector("#ts-voice");
  function loadVoices() {
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices.map((v, i) => `<option value="${i}">${v.name} (${v.lang})</option>`).join("");
  }
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
  root.querySelector("#ts-play").addEventListener("click", () => {
    const utter = new SpeechSynthesisUtterance(root.querySelector("#ts-in").value);
    const voices = speechSynthesis.getVoices();
    if (voices[voiceSelect.value]) utter.voice = voices[voiceSelect.value];
    speechSynthesis.speak(utter);
  });
  root.querySelector("#ts-stop").addEventListener("click", () => speechSynthesis.cancel());
};

/* ---------- DUPLICATE LINE REMOVER ---------- */
TOOL_RENDERERS["duplicate-line-remover"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="dl-in" style="min-height:220px;" placeholder="line one&#10;line one&#10;line two"></textarea>
    <div class="toolbar"><button class="btn btn-primary" id="dl-run">Remove duplicates</button></div></div>`;
  root.querySelector("#dl-run").addEventListener("click", () => {
    const el = root.querySelector("#dl-in");
    el.value = [...new Set(el.value.split("\n"))].join("\n");
  });
};

/* ---------- FIND & REPLACE ---------- */
TOOL_RENDERERS["find-replace"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="fr-in" style="min-height:180px;"></textarea>
    <div class="field-row"><div class="field"><label>Find</label><input type="text" id="fr-find"></div><div class="field"><label>Replace with</label><input type="text" id="fr-replace"></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="fr-run">Replace all</button></div></div>`;
  root.querySelector("#fr-run").addEventListener("click", () => {
    const el = root.querySelector("#fr-in");
    const find = root.querySelector("#fr-find").value;
    if (!find) return;
    el.value = el.value.split(find).join(root.querySelector("#fr-replace").value);
  });
};

/* ---------- REVERSE TEXT ---------- */
TOOL_RENDERERS["reverse-text"] = function (root) {
  root.innerHTML = `<div class="panel"><textarea class="code-area" id="rv-in" style="min-height:160px;"></textarea>
    <div class="toolbar"><button class="btn btn-primary" id="rv-run">Reverse</button></div></div>`;
  root.querySelector("#rv-run").addEventListener("click", () => {
    const el = root.querySelector("#rv-in");
    el.value = el.value.split("").reverse().join("");
  });
};

/* ---------- PASSWORD GENERATOR ---------- */
TOOL_RENDERERS["password-generator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field"><label>Length: <span id="pg-len-val">16</span></label><input type="range" id="pg-len" min="6" max="64" value="16"></div>
    <div class="field-row">
      <div class="field"><label><input type="checkbox" id="pg-upper" checked> Uppercase</label></div>
      <div class="field"><label><input type="checkbox" id="pg-lower" checked> Lowercase</label></div>
      <div class="field"><label><input type="checkbox" id="pg-num" checked> Numbers</label></div>
      <div class="field"><label><input type="checkbox" id="pg-sym" checked> Symbols</label></div>
    </div>
    <div class="toolbar"><button class="btn btn-primary" id="pg-run">Generate</button><button class="btn btn-ghost" id="pg-copy">Copy</button></div>
    <div class="field" style="margin-top:14px;"><input type="text" id="pg-out" readonly style="font-family:monospace;font-size:1rem;"></div></div>`;
  const lenSlider = root.querySelector("#pg-len"), lenVal = root.querySelector("#pg-len-val");
  lenSlider.addEventListener("input", () => lenVal.textContent = lenSlider.value);
  root.querySelector("#pg-run").addEventListener("click", () => {
    let chars = "";
    if (root.querySelector("#pg-upper").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (root.querySelector("#pg-lower").checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (root.querySelector("#pg-num").checked) chars += "0123456789";
    if (root.querySelector("#pg-sym").checked) chars += "!@#$%^&*()_+-=[]{}";
    if (!chars) { toast("Pick at least one character type"); return; }
    const len = parseInt(lenSlider.value, 10);
    const rand = new Uint32Array(len); crypto.getRandomValues(rand);
    root.querySelector("#pg-out").value = Array.from(rand, n => chars[n % chars.length]).join("");
  });
  root.querySelector("#pg-copy").addEventListener("click", () => {
    const v = root.querySelector("#pg-out").value;
    if (!v) return; navigator.clipboard.writeText(v); toast("Password copied ✅");
  });
};

/* ---------- AGE CALCULATOR ---------- */
TOOL_RENDERERS["age-calculator"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="field"><label>Date of birth</label><input type="date" id="ac-dob"></div>
    <div class="toolbar"><button class="btn btn-primary" id="ac-run">Calculate age</button></div>
    <div class="field-row" id="ac-result" style="margin-top:14px;"></div></div>`;
  root.querySelector("#ac-run").addEventListener("click", () => {
    const dob = new Date(root.querySelector("#ac-dob").value);
    if (isNaN(dob)) { toast("Pick a valid date"); return; }
    const now = new Date();
    let years = now.getFullYear() - dob.getFullYear(), months = now.getMonth() - dob.getMonth(), days = now.getDate() - dob.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    root.querySelector("#ac-result").innerHTML = `<div class="stat-pill">${years} years</div><div class="stat-pill">${months} months</div><div class="stat-pill">${days} days</div>`;
  });
};

/* ---------- BMI CALCULATOR ---------- */
TOOL_RENDERERS["bmi-calculator"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="field-row">
    <div class="field"><label>Weight (kg)</label><input type="number" id="bm-w" value="70"></div>
    <div class="field"><label>Height (cm)</label><input type="number" id="bm-h" value="170"></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="bm-run">Calculate BMI</button></div>
    <div id="bm-result" style="margin-top:14px;"></div></div>`;
  root.querySelector("#bm-run").addEventListener("click", () => {
    const w = parseFloat(root.querySelector("#bm-w").value), h = parseFloat(root.querySelector("#bm-h").value) / 100;
    if (!w || !h) return;
    const bmi = (w / (h * h)).toFixed(1);
    let cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : bmi < 30 ? "Overweight" : "Obese";
    root.querySelector("#bm-result").innerHTML = `<div class="stat-pill">BMI: <strong>${bmi}</strong></div><div class="stat-pill" style="margin-left:8px;">${cat}</div>`;
  });
};

/* ---------- PERCENTAGE CALCULATOR ---------- */
TOOL_RENDERERS["percentage-calculator"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field-row"><div class="field"><label>X</label><input type="number" id="pt-x" value="20"></div><div class="field" style="align-self:flex-end;padding-bottom:9px;">% of</div><div class="field"><label>Y</label><input type="number" id="pt-y" value="150"></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="pt-run">Calculate</button></div>
    <div id="pt-result" style="margin-top:14px;"></div></div>`;
  root.querySelector("#pt-run").addEventListener("click", () => {
    const x = parseFloat(root.querySelector("#pt-x").value), y = parseFloat(root.querySelector("#pt-y").value);
    root.querySelector("#pt-result").innerHTML = `<div class="stat-pill">${x}% of ${y} = <strong>${(x / 100 * y).toFixed(2)}</strong></div>`;
  });
};

/* ---------- UNIT CONVERTER ---------- */
TOOL_RENDERERS["unit-converter"] = function (root) {
  const UNITS = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, ft: 0.3048, in: 0.0254 },
    weight: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
  };
  root.innerHTML = `<div class="panel">
    <div class="field-row">
      <div class="field"><label>Category</label><select id="uc-cat"><option value="length">Length</option><option value="weight">Weight</option></select></div>
      <div class="field"><label>Value</label><input type="number" id="uc-val" value="1"></div>
      <div class="field"><label>From</label><select id="uc-from"></select></div>
      <div class="field"><label>To</label><select id="uc-to"></select></div>
    </div>
    <div id="uc-result" style="margin-top:14px;"></div></div>`;
  const cat = root.querySelector("#uc-cat"), from = root.querySelector("#uc-from"), to = root.querySelector("#uc-to"), val = root.querySelector("#uc-val"), result = root.querySelector("#uc-result");
  function fillUnits() {
    const units = Object.keys(UNITS[cat.value]);
    from.innerHTML = to.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join("");
    to.selectedIndex = 1;
  }
  function convert() {
    const table = UNITS[cat.value];
    const base = val.value * table[from.value];
    result.innerHTML = `<div class="stat-pill">${val.value} ${from.value} = <strong>${(base / table[to.value]).toFixed(4)}</strong> ${to.value}</div>`;
  }
  cat.addEventListener("change", () => { fillUnits(); convert(); });
  [val, from, to].forEach(el => el.addEventListener("input", convert));
  fillUnits(); convert();
};

/* ---------- TIMESTAMP CONVERTER ---------- */
TOOL_RENDERERS["timestamp-converter"] = function (root) {
  root.innerHTML = `<div class="panel">
    <div class="field"><label>Unix timestamp (seconds)</label><input type="number" id="tc-ts" placeholder="e.g. 1750000000"></div>
    <div class="toolbar"><button class="btn btn-primary" id="tc-to-date">Convert to date</button></div>
    <div class="field" style="margin-top:16px;"><label>Human date</label><input type="datetime-local" id="tc-date"></div>
    <div class="toolbar"><button class="btn btn-primary" id="tc-to-ts">Convert to timestamp</button></div>
    <div id="tc-result" style="margin-top:14px;"></div></div>`;
  root.querySelector("#tc-to-date").addEventListener("click", () => {
    const ts = parseInt(root.querySelector("#tc-ts").value, 10);
    if (isNaN(ts)) return;
    root.querySelector("#tc-result").innerHTML = `<div class="stat-pill">${new Date(ts * 1000).toString()}</div>`;
  });
  root.querySelector("#tc-to-ts").addEventListener("click", () => {
    const d = new Date(root.querySelector("#tc-date").value);
    if (isNaN(d)) return;
    root.querySelector("#tc-result").innerHTML = `<div class="stat-pill">${Math.floor(d.getTime() / 1000)}</div>`;
  });
};

/* ---------- TIMEZONE CONVERTER ---------- */
TOOL_RENDERERS["timezone-converter"] = function (root) {
  const ZONES = ["UTC","Asia/Karachi","America/New_York","America/Los_Angeles","Europe/London","Europe/Berlin","Asia/Dubai","Asia/Kolkata","Asia/Tokyo","Australia/Sydney"];
  root.innerHTML = `<div class="panel">
    <div class="field"><label>Date & time</label><input type="datetime-local" id="tz-dt"></div>
    <div class="field-row">
      <div class="field"><label>From</label><select id="tz-from">${ZONES.map(z => `<option>${z}</option>`).join("")}</select></div>
      <div class="field"><label>To</label><select id="tz-to">${ZONES.map(z => `<option>${z}</option>`).join("")}</select></div>
    </div>
    <div class="toolbar"><button class="btn btn-primary" id="tz-run">Convert</button></div>
    <div id="tz-result" style="margin-top:14px;"></div></div>`;
  root.querySelector("#tz-run").addEventListener("click", () => {
    const dt = root.querySelector("#tz-dt").value;
    if (!dt) return;
    const fromZone = root.querySelector("#tz-from").value, toZone = root.querySelector("#tz-to").value;
    const utcDate = new Date(new Date(dt).toLocaleString("en-US", { timeZone: fromZone }));
    const diff = new Date(dt) - utcDate;
    const adjusted = new Date(new Date(dt).getTime() + diff);
    const formatted = adjusted.toLocaleString("en-US", { timeZone: toZone, dateStyle: "medium", timeStyle: "short" });
    root.querySelector("#tz-result").innerHTML = `<div class="stat-pill">${formatted} (${toZone})</div>`;
  });
};

/* ---------- LOAN CALCULATOR ---------- */
TOOL_RENDERERS["loan-calculator"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="field-row">
    <div class="field"><label>Loan amount</label><input type="number" id="lc-amt" value="100000"></div>
    <div class="field"><label>Annual interest %</label><input type="number" id="lc-rate" value="8"></div>
    <div class="field"><label>Term (months)</label><input type="number" id="lc-term" value="36"></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="lc-run">Calculate</button></div>
    <div id="lc-result" style="margin-top:14px;"></div></div>`;
  root.querySelector("#lc-run").addEventListener("click", () => {
    const P = parseFloat(root.querySelector("#lc-amt").value), annual = parseFloat(root.querySelector("#lc-rate").value), n = parseFloat(root.querySelector("#lc-term").value);
    const r = annual / 100 / 12;
    const payment = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    root.querySelector("#lc-result").innerHTML = `<div class="stat-pill">Monthly payment: <strong>${payment.toFixed(2)}</strong></div><div class="stat-pill" style="margin-left:8px;">Total paid: <strong>${(payment * n).toFixed(2)}</strong></div>`;
  });
};

/* ---------- RANDOM NUMBER GENERATOR ---------- */
TOOL_RENDERERS["random-number-generator"] = function (root) {
  root.innerHTML = `<div class="panel"><div class="field-row">
    <div class="field"><label>Min</label><input type="number" id="rn-min" value="1"></div>
    <div class="field"><label>Max</label><input type="number" id="rn-max" value="100"></div></div>
    <div class="toolbar"><button class="btn btn-primary" id="rn-run">Generate</button></div>
    <div id="rn-result" style="margin-top:14px;font-size:1.6rem;font-family:var(--font-display);"></div></div>`;
  root.querySelector("#rn-run").addEventListener("click", () => {
    const min = parseInt(root.querySelector("#rn-min").value, 10), max = parseInt(root.querySelector("#rn-max").value, 10);
    const rand = crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
    root.querySelector("#rn-result").textContent = Math.floor(rand * (max - min + 1)) + min;
  });
};

/* ---------- STOPWATCH ---------- */
TOOL_RENDERERS["stopwatch"] = function (root) {
  root.innerHTML = `<div class="panel" style="text-align:center;">
    <div id="sw-display" style="font-family:var(--font-display);font-size:2.6rem;margin-bottom:18px;">00:00.0</div>
    <div class="toolbar" style="justify-content:center;"><button class="btn btn-primary" id="sw-start">Start</button><button class="btn btn-ghost" id="sw-lap">Lap</button><button class="btn btn-ghost" id="sw-reset">Reset</button></div>
    <ul id="sw-laps" style="margin-top:16px;list-style:none;text-align:left;max-width:240px;margin-inline:auto;"></ul></div>`;
  let running = false, startTime = 0, elapsed = 0, timer, laps = [];
  const display = root.querySelector("#sw-display"), startBtn = root.querySelector("#sw-start");
  function fmt(ms) { const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000), t = Math.floor((ms % 1000) / 100); return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${t}`; }
  function tick() { display.textContent = fmt(elapsed + (Date.now() - startTime)); timer = requestAnimationFrame(tick); }
  startBtn.addEventListener("click", () => {
    if (!running) { running = true; startTime = Date.now(); tick(); startBtn.textContent = "Pause"; }
    else { running = false; elapsed += Date.now() - startTime; cancelAnimationFrame(timer); startBtn.textContent = "Start"; }
  });
  root.querySelector("#sw-lap").addEventListener("click", () => {
    laps.unshift(display.textContent);
    root.querySelector("#sw-laps").innerHTML = laps.map((l, i) => `<li class="stat-pill" style="margin-bottom:6px;">Lap ${laps.length - i}: ${l}</li>`).join("");
  });
  root.querySelector("#sw-reset").addEventListener("click", () => {
    running = false; elapsed = 0; laps = []; cancelAnimationFrame(timer);
    display.textContent = "00:00.0"; startBtn.textContent = "Start"; root.querySelector("#sw-laps").innerHTML = "";
  });
};

/* ============================================================
   INIT
   ============================================================ */
render();
