/* Borg Docs — vanilla router + markdown loader */
(function () {
  "use strict";

  var BASE = computeBase();
  var treeEl = document.getElementById("tree");
  var docEl = document.getElementById("doc");
  var crumbsEl = document.getElementById("breadcrumbs");
  var rawLinkEl = document.getElementById("raw-link");

  // BASE is "" for root deployments and "/docs" for project-page deployments
  // (auto-detected from <script src>, so the same build works for both).
  function computeBase() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      var m = src.match(/^(.*)\/assets\/app\.js(?:\?.*)?$/);
      if (m) return m[1];
    }
    return "";
  }

  function currentPath() {
    var p = location.pathname;
    if (BASE && p.indexOf(BASE) === 0) p = p.slice(BASE.length);
    if (p.charAt(0) === "/") p = p.slice(1);
    return p;
  }

  function resolveMdUrl(path) {
    if (!path || path === "/") return BASE + "/content/index.md";
    if (path.slice(-1) === "/") return BASE + "/content/" + path + "index.md";
    if (/\.md$/.test(path)) return BASE + "/content/" + path;
    return BASE + "/content/" + path + ".md";
  }

  function renderBreadcrumbs(path) {
    crumbsEl.innerHTML = "";
    var home = document.createElement("a");
    home.href = BASE + "/";
    home.textContent = "~";
    crumbsEl.appendChild(home);
    if (!path) return;
    var parts = path.replace(/\/$/, "").split("/").filter(Boolean);
    var acc = "";
    for (var i = 0; i < parts.length; i++) {
      var sep = document.createElement("span");
      sep.className = "sep"; sep.textContent = "/";
      crumbsEl.appendChild(sep);
      acc += "/" + parts[i];
      var a = document.createElement("a");
      a.href = BASE + acc + (i < parts.length - 1 ? "/" : "");
      a.textContent = parts[i];
      crumbsEl.appendChild(a);
    }
  }

  function loadPath(path, push) {
    var mdUrl = resolveMdUrl(path);
    rawLinkEl.href = mdUrl;
    renderBreadcrumbs(path);
    fetch(mdUrl, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) {
          // Try <path>/index.md as fallback
          if (!/\/index\.md$/.test(mdUrl)) {
            var alt = mdUrl.replace(/\.md$/, "/index.md");
            return fetch(alt).then(function (r2) {
              if (r2.ok) { rawLinkEl.href = alt; return r2.text(); }
              throw new Error("not found: " + path);
            });
          }
          throw new Error("not found: " + path);
        }
        return r.text();
      })
      .then(function (md) {
        var html = window.marked.parse(md);
        docEl.innerHTML = html;
        rewriteLinks();
        highlightCurrent(path);
        var h1 = docEl.querySelector("h1");
        document.title = (h1 ? h1.textContent : "Borg Docs") + " — Borg Documentation";
        window.scrollTo(0, 0);
      })
      .catch(function (err) {
        docEl.innerHTML =
          "<h1>404 — file not found</h1>" +
          "<p>No such page: <code>" + escapeHtml(path) + "</code></p>" +
          '<p>Return to the <a href="' + BASE + '/">index</a>.</p>';
      });
    if (push) history.pushState({}, "", BASE + "/" + path);
  }

  function rewriteLinks() {
    var as = docEl.getElementsByTagName("a");
    for (var i = 0; i < as.length; i++) {
      var a = as[i];
      var href = a.getAttribute("href") || "";
      if (!href || /^(https?:|mailto:|#)/.test(href)) continue;
      // Strip .md, normalize leading ./ and ../
      var clean = href.replace(/\.md(#|$)/, "$1");
      a.setAttribute("href", clean);
    }
  }

  function highlightCurrent(path) {
    var cur = treeEl.querySelectorAll("a.current");
    for (var i = 0; i < cur.length; i++) cur[i].classList.remove("current");
    var target = treeEl.querySelector('a[data-path="' + path + '"]');
    if (target) {
      target.classList.add("current");
      var p = target.parentElement;
      while (p && p !== treeEl) {
        if (p.classList && p.classList.contains("dir")) p.classList.add("open");
        p = p.parentElement;
      }
    }
  }

  function renderTree(nodes, parent) {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var li = document.createElement("li");
      if (n.children && n.children.length) {
        li.className = "dir";
        var label = document.createElement("span");
        label.className = "label";
        // Directory label is a link to its index page (n.path is the dir path).
        var labelA = document.createElement("a");
        labelA.href = BASE + "/" + n.path + "/";
        labelA.textContent = n.title || n.path.split("/").pop();
        labelA.setAttribute("data-path", n.path + "/");
        label.appendChild(labelA);
        li.appendChild(label);
        var ul = document.createElement("ul");
        renderTree(n.children, ul);
        li.appendChild(ul);
      } else {
        li.className = "file";
        var a = document.createElement("a");
        a.href = BASE + "/" + n.path;
        a.textContent = n.title || n.path.split("/").pop();
        a.setAttribute("data-path", n.path);
        li.appendChild(a);
      }
      parent.appendChild(li);
    }
  }

  function interceptClicks() {
    document.addEventListener("click", function (e) {
      var a = e.target;
      while (a && a.tagName !== "A") a = a.parentElement;
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href) return;
      if (a.target === "_blank") return;
      if (/^(https?:|mailto:|#)/.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Toggle directory open/close if clicking the label chevron area of a dir,
      // but still navigate to that dir's index.
      e.preventDefault();
      var path = href;
      if (BASE && path.indexOf(BASE) === 0) path = path.slice(BASE.length);
      if (path.charAt(0) === "/") path = path.slice(1);
      loadPath(path, true);
    });
  }

  function onPopState() { loadPath(currentPath(), false); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Boot
  fetch(BASE + "/assets/manifest.json", { cache: "no-cache" })
    .then(function (r) { return r.json(); })
    .then(function (manifest) {
      renderTree(manifest, treeEl);
      interceptClicks();
      window.addEventListener("popstate", onPopState);
      loadPath(currentPath(), false);
    })
    .catch(function (err) {
      treeEl.innerHTML = "<li><em>manifest missing — run build-manifest.mjs</em></li>";
      loadPath(currentPath(), false);
    });
})();
