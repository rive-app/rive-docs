/* Cookie consent. One place for every tracker on rive.app.
   EU/EEA/UK/CH visitors (by time zone): nothing loads until they accept.
   Everyone else: trackers load as before; "Your Privacy Choices" (any link to #cookie-settings) lets them opt out
   (California CCPA alternative opt-out link; the official CA opt-out icon is added to that link below).
   Global Privacy Control always keeps Marketing off.
   GA4 comes from Framer's Google Analytics setting and follows Consent Mode set here.
   The same file runs on the docs (rive-docs/rive-consent.js). There Mintlify loads its own Amplitude, gated by
   docs.json integrations.cookies on localStorage rive_analytics = "granted", so this file loads no trackers on /docs.
   Keep both copies identical. */
(function () {
  var KEY = "rive_consent", FLAG = "rive_analytics", VERSION = 1, DAYS = 365, now = Date.now();
  var w = window, d = document;
  var DOCS = /^\/docs(\/|$)/.test(location.pathname) || /\.mintlify\.(app|dev|site)$/.test(location.hostname);

  function optInRegion() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (!tz) return true;
      return /^Europe\//.test(tz) || /^(Atlantic\/(Canary|Madeira|Azores|Faroe|Reykjavik)|Arctic\/Longyearbyen|Asia\/(Nicosia|Famagusta))$/.test(tz);
    } catch (e) { return true; }
  }
  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || "null");
      return c && c.v === VERSION && now - c.t < DAYS * 864e5 ? c : null;
    } catch (e) { return null; }
  }

  var gpc = !!navigator.globalPrivacyControl;
  var mustAsk = optInRegion();
  var saved = read();
  var state = saved || { analytics: !mustAsk, marketing: !mustAsk };
  if (gpc) state.marketing = false;
  function flag() { try { localStorage.setItem(FLAG, state.analytics ? "granted" : "denied"); } catch (e) {} }
  flag();

  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
  function gmode(s) {
    return {
      analytics_storage: s.analytics ? "granted" : "denied",
      ad_storage: s.marketing ? "granted" : "denied",
      ad_user_data: s.marketing ? "granted" : "denied",
      ad_personalization: s.marketing ? "granted" : "denied"
    };
  }
  var def = gmode(state); def.wait_for_update = 500;
  w.gtag("consent", "default", def);

  function script(src, attrs) {
    if (d.querySelector('script[src="' + src + '"]')) return;
    var s = d.createElement("script"); s.async = true; s.src = src;
    for (var k in attrs || {}) s.setAttribute(k, attrs[k]);
    (d.head || d.documentElement).appendChild(s);
  }

  var loaded = {};
  function loadAnalytics() {
    if (loaded.analytics) return; loaded.analytics = true;
    /* Amplitude 7 */
    (function (e, t) { var n = e.amplitude || { _q: [], _iq: {} }; var r = t.createElement("script"); r.type = "text/javascript"; r.integrity = "sha384-+EOJUyXoWkQo2G0XTc+u2DOlZkrMUcc5yOqCuE2XHRnytSyqpFQSbgFZAlGmjpLI"; r.crossOrigin = "anonymous"; r.async = true; r.src = "https://cdn.amplitude.com/libs/amplitude-7.1.1-min.gz.js"; r.onload = function () { if (!e.amplitude.runQueuedFunctions) { console.log("[Amplitude] Error: could not load SDK"); } }; (t.head || t.documentElement).appendChild(r); function s(e, t) { e.prototype[t] = function () { this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); return this; }; } var o = function () { this._q = []; return this; }; var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"]; for (var c = 0; c < a.length; c++) { s(o, a[c]); } n.Identify = o; var u = function () { this._q = []; return this; }; var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"]; for (var p = 0; p < l.length; p++) { s(u, l[p]); } n.Revenue = u; var dd = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "enableTracking", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"]; function v(e) { function t(t) { e[t] = function () { e._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); }; } for (var n = 0; n < dd.length; n++) { t(dd[n]); } } v(n); n.getInstance = function (e) { e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase(); if (!n._iq.hasOwnProperty(e)) { n._iq[e] = { _q: [] }; v(n._iq[e]); } return n._iq[e]; }; e.amplitude = n; })(w, d);
    var pageViewEvent = (location.host.indexOf("uat") === 0 ? "uat" : "prod") + ".rive_web.page_view";
    var amp = w.amplitude.getInstance();
    amp.init("d0ecd959bdcd519674b376ab28af3f96", null, { includeReferrer: true, includeUtm: true });
    var lastHref = location.href;
    amp.logEvent(pageViewEvent, { url: lastHref, site_version: "framer_v1" });
    function watch() {
      new MutationObserver(function () {
        if (location.href !== lastHref) { lastHref = location.href; amp.logEvent(pageViewEvent, { url: lastHref, site_version: "framer_v1" }); }
      }).observe(d.body, { childList: true, subtree: true });
    }
    if (d.body) watch(); else d.addEventListener("DOMContentLoaded", watch);
  }

  function loadMarketing() {
    if (loaded.marketing) return; loaded.marketing = true;
    /* Ad attribution: keep ad click ids and UTM tags from the landing page (window.__riveAdParams). */
    try {
      var KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "rdt_cid", "twclid"];
      var here = new URL(location.href), got = {}, n = 0;
      KEYS.forEach(function (k) { var v = here.searchParams.get(k); if (v) { got[k] = v; n++; } });
      if (got.gclid && !got.utm_source) { got.utm_source = "google"; got.utm_medium = "cpc"; }
      if (n) localStorage.setItem("rive_ad_params", JSON.stringify({ p: got, t: now }));
    } catch (e) {}
    /* X pixel */
    if (!w.twq) { var q = w.twq = function () { q.exe ? q.exe.apply(q, arguments) : q.queue.push(arguments); }; q.version = "1.1"; q.queue = []; }
    script("https://static.ads-twitter.com/uwt.js");
    w.twq("config", "obu8l");
    /* LinkedIn Insight: ads accounts 7817236 (old) and 557468067 (partner 10211332) share one loader. */
    w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || [];
    ["7817236", "10211332"].forEach(function (id) { if (w._linkedin_data_partner_ids.indexOf(id) < 0) w._linkedin_data_partner_ids.push(id); });
    if (!w.lintrk) { w.lintrk = function (a, b) { w.lintrk.q.push([a, b]); }; w.lintrk.q = []; }
    script("https://snap.licdn.com/li.lms-analytics/insight.min.js");
    /* Leadfeeder */
    w.ldfdr = w.ldfdr || function () { (w.ldfdr._q = w.ldfdr._q || []).push([].slice.call(arguments)); };
    script("https://sc.lfeeder.com/lftracker_v1_bElvO73NLBG8ZMqj.js");
  }

  w.__riveAdParams = function () {
    if (!state.marketing) return null;
    try {
      var x = JSON.parse(localStorage.getItem("rive_ad_params") || "null");
      return x && Date.now() - x.t < 30 * 864e5 ? x.p : null;
    } catch (e) { return null; }
  };

  function apply() {
    if (DOCS) return;
    if (state.analytics) loadAnalytics();
    if (state.marketing) loadMarketing();
  }
  function save(s) {
    var revoked = (state.analytics && !s.analytics) || (state.marketing && !s.marketing);
    var newlyAnalytics = !state.analytics && !!s.analytics;
    state = { analytics: !!s.analytics, marketing: !!s.marketing && !gpc };
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, t: Date.now(), analytics: state.analytics, marketing: state.marketing })); } catch (e) {}
    flag();
    w.gtag("consent", "update", gmode(state));
    if (!state.marketing) try { localStorage.removeItem("rive_ad_params"); } catch (e) {}
    if (revoked && (loaded.analytics || loaded.marketing || DOCS)) { location.reload(); return; }
    if (DOCS && newlyAnalytics) { location.reload(); return; }
    apply();
  }
  apply();

  /* Banner */
  var CSS = ""
    + ".rc{position:fixed;right:20px;bottom:20px;z-index:2147483000;width:360px;max-width:calc(100vw - 24px);box-sizing:border-box;padding:20px;background:#0e0e0e;border:1px solid rgba(255,255,255,.12);color:#fff;font:14px/1.45em Inter,\"Inter Placeholder\",sans-serif;-webkit-font-smoothing:antialiased;opacity:0;transform:translateY(8px);transition:opacity .3s ease,transform .3s ease}"
    + ".rc.on{opacity:1;transform:none}"
    + ".rc *{box-sizing:border-box}"
    + ".rc-eye{margin:0 0 10px;font-weight:500;font-size:12px;line-height:1.2em;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.8)}"
    + ".rc-p{margin:0;color:rgba(255,255,255,.72);text-wrap:pretty}"
    + ".rc-p a{color:rgba(255,255,255,.85);text-decoration:underline;text-decoration-color:rgba(255,255,255,.35);text-underline-offset:3px;text-decoration-thickness:1px}"
    + ".rc-p a:hover{color:#fff}"
    + ".rc-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}"
    + ".rc-b{appearance:none;border:0;margin:0;cursor:pointer;padding:5px 9px 6px;border-radius:4px;font:12px/16px \"PragmataPro VF Variable Regular\",ui-monospace,Menlo,monospace;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1);transition:box-shadow .15s,background .15s}"
    + ".rc-b:hover{box-shadow:inset 0 0 0 1px rgba(255,255,255,.4)}"
    + ".rc-b.txt{background:none;box-shadow:none;color:rgba(255,255,255,.72);padding-left:4px;padding-right:4px;margin-left:auto}"
    + ".rc-b.txt:hover{color:#fff}"
    + ".rc-b:focus-visible,.rc-t:focus-visible{outline:1px solid #fff;outline-offset:2px}"
    + ".rc-cats{margin:14px 0 0;padding:0;list-style:none}"
    + ".rc-cat{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;padding:12px 0;border-top:1px solid rgba(255,255,255,.12)}"
    + ".rc-cat h3{margin:0 0 2px;font:500 14px/1.45em Inter,sans-serif;color:#fff}"
    + ".rc-cat p{margin:0;font-size:13px;line-height:1.45em;color:rgba(255,255,255,.6)}"
    + ".rc-on{flex:none;margin-top:1px;font-weight:500;font-size:12px;line-height:16px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.5)}"
    + ".rc-t{flex:none;position:relative;width:32px;height:18px;margin-top:1px;padding:0;border:1px solid rgba(255,255,255,.45);border-radius:9px;background:none;cursor:pointer;transition:background .15s,border-color .15s}"
    + ".rc-t::before{content:\"\";position:absolute;inset:-13px -8px}"
    + ".rc-t::after{content:\"\";position:absolute;top:3px;left:3px;width:10px;height:10px;border-radius:5px;background:rgba(255,255,255,.7);transition:transform .15s,background .15s}"
    + ".rc-t[aria-checked=true]{background:#fff;border-color:#fff}"
    + ".rc-t[aria-checked=true]::after{transform:translateX(14px);background:#000}"
    + ".rc-t:hover{border-color:#fff}"
    + ".rc-t[aria-disabled=true]{opacity:.4;cursor:default}"
    + ".rc-t[aria-disabled=true]:hover{border-color:rgba(255,255,255,.45)}"
    + "@media (max-width:640px){.rc{left:12px;right:12px;bottom:12px;width:auto;max-width:none}}"
    + "@media (prefers-reduced-motion:reduce){.rc,.rc-t,.rc-t::after{transition:none}}";

  var box = null, choice = null;
  function el(tag, cls, text) { var e = d.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  function btn(label, cls, fn) { var b = el("button", "rc-b" + (cls ? " " + cls : ""), label); b.type = "button"; b.addEventListener("click", fn); return b; }
  function close() { if (!box) return; var b = box; box = null; b.classList.remove("on"); setTimeout(function () { b.remove(); }, 300); }
  function done(s) { save(s); close(); }

  function render(detail) {
    box.innerHTML = "";
    var eye = el("p", "rc-eye", detail ? "Your privacy choices" : "Cookies"); eye.id = "rc-title"; box.appendChild(eye);
    var p = el("p", "rc-p");
    p.appendChild(d.createTextNode(detail
      ? "Choose which cookies we can use. You can change this any time from Your Privacy Choices in the footer. "
      : "We use cookies to measure site traffic and our ads. You choose which ones we can use. "));
    var a = el("a", "", "Privacy\u00a0Policy"); a.href = "https://rive.app/docs/legal/privacy-policy"; p.appendChild(a);
    box.appendChild(p);
    if (detail) {
      var ul = el("ul", "rc-cats");
      [["Necessary", "Keep the site working and remember this\u00a0choice.", null],
       ["Analytics", "Amplitude and Google Analytics show us which pages people\u00a0visit.", "analytics"],
       ["Marketing", "X, LinkedIn, and Leadfeeder measure our ads and which companies\u00a0visit.", "marketing"]].forEach(function (c) {
        var locked = c[2] === "marketing" && gpc;
        var li = el("li", "rc-cat"), txt = el("div"), h = el("h3", "", c[0]), dsc = el("p", "", locked ? "Off because your browser sends a Global Privacy Control\u00a0signal." : c[1]);
        txt.appendChild(h); txt.appendChild(dsc); li.appendChild(txt);
        if (!c[2]) li.appendChild(el("span", "rc-on", "Always on"));
        else {
          var t = el("button", "rc-t"); t.type = "button"; t.setAttribute("role", "switch");
          t.setAttribute("aria-label", c[0]); t.setAttribute("aria-checked", String(choice[c[2]]));
          if (locked) t.setAttribute("aria-disabled", "true");
          t.addEventListener("click", function () { if (locked) return; choice[c[2]] = !choice[c[2]]; t.setAttribute("aria-checked", String(choice[c[2]])); });
          li.appendChild(t);
        }
        ul.appendChild(li);
      });
      box.appendChild(ul);
      var r2 = el("div", "rc-row");
      r2.appendChild(btn("Save choices", "", function () { done(choice); }));
      r2.appendChild(btn("Accept all", "", function () { done({ analytics: true, marketing: true }); }));
      box.appendChild(r2);
    } else {
      var r = el("div", "rc-row");
      r.appendChild(btn("Accept all", "", function () { done({ analytics: true, marketing: true }); }));
      r.appendChild(btn("Reject all", "", function () { done({ analytics: false, marketing: false }); }));
      r.appendChild(btn("Settings", "txt", function () { render(true); var f = box.querySelector(".rc-t"); if (f) f.focus(); }));
      box.appendChild(r);
    }
  }

  function open(detail, focus) {
    if (!d.getElementById("rc-css")) { var st = el("style"); st.id = "rc-css"; st.textContent = CSS; d.head.appendChild(st); }
    choice = { analytics: state.analytics, marketing: state.marketing };
    if (!box) {
      box = el("div", "rc"); box.setAttribute("role", "dialog"); box.setAttribute("aria-labelledby", "rc-title");
      d.body.appendChild(box);
      render(detail);
      requestAnimationFrame(function () { requestAnimationFrame(function () { if (box) box.classList.add("on"); }); });
    } else render(detail);
    if (focus) { var f = box.querySelector(detail ? ".rc-t" : ".rc-b"); if (f) f.focus(); }
  }

  w.riveConsent = { get: function () { return { analytics: state.analytics, marketing: state.marketing }; }, open: function () { open(true, true); }, set: function (s) { done(s); } };

  d.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href$="#cookie-settings"]');
    if (!a) return;
    e.preventDefault(); e.stopPropagation(); open(true, true);
  }, true);

  var LINK_CSS = "a[href$=\"#cookie-settings\"],a[href$=\"#cookie-settings\"]:hover,a[href$=\"#cookie-settings\"]:active,a[href$=\"#cookie-settings\"]:focus{padding:0 36px 0 0!important;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 14'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' fill='%23FFFFFF' d='M7.4,12.8h6.8l3.1-11.6H7.4C4.2,1.2,1.6,3.8,1.6,7S4.2,12.8,7.4,12.8z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' fill='%230066FF' d='M22.6,0H7.4c-3.9,0-7,3.1-7,7s3.1,7,7,7h15.2c3.9,0,7-3.1,7-7S26.4,0,22.6,0z M1.6,7c0-3.2,2.6-5.8,5.8-5.8 h9.9l-3.1,11.6H7.4C4.2,12.8,1.6,10.2,1.6,7z'/%3E%3Cpath fill='%23FFFFFF' d='M24.6,4c0.2,0.2,0.2,0.6,0,0.8l0,0L22.5,7l2.2,2.2c0.2,0.2,0.2,0.6,0,0.8c-0.2,0.2-0.6,0.2-0.8,0 l0,0l-2.2-2.2L19.5,10c-0.2,0.2-0.6,0.2-0.8,0c-0.2-0.2-0.2-0.6,0-0.8l0,0L20.8,7l-2.2-2.2c-0.2-0.2-0.2-0.6,0-0.8 c0.2-0.2,0.6-0.2,0.8,0l0,0l2.2,2.2L23.8,4C24,3.8,24.4,3.8,24.6,4z'/%3E%3Cpath fill='%230066FF' d='M12.7,4.1c0.2,0.2,0.3,0.6,0.1,0.8l0,0L8.6,9.8C8.5,9.9,8.4,10,8.3,10c-0.2,0.1-0.5,0.1-0.7-0.1l0,0 L5.4,7.7c-0.2-0.2-0.2-0.6,0-0.8c0.2-0.2,0.6-0.2,0.8,0l0,0L8,8.6l3.8-4.5C12,3.9,12.4,3.9,12.7,4.1z'/%3E%3C/svg%3E\") no-repeat right center/30px 14px!important}";
  function boot() {
    var ls = el("style"); ls.id = "rc-link-css"; ls.textContent = LINK_CSS; d.head.appendChild(ls);
    if (location.hash === "#cookie-settings") open(true, true);
    else if (mustAsk && !saved) setTimeout(function () { open(false, false); }, 800);
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", boot); else boot();
})();
