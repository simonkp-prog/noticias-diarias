// Noticias Diarias — lógica del front-end
(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  // ---------- Tema (claro / oscuro) ----------
  const themeToggle = $("#theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("nd-theme") || (prefersDark ? "dark" : "light");
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("nd-theme", next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  // ---------- Carga del boletín ----------
  // Cache-busting por fecha para que GitHub Pages no sirva una versión vieja.
  const url = `data/noticias.json?v=${new Date().toISOString().slice(0, 13)}`;

  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(render)
    .catch(mostrarError);

  function render(data) {
    document.title = `Noticias Diarias · ${data.fechaLegible || ""}`.trim();
    $("#fecha").textContent = data.fechaLegible || data.fecha || "";

    const nav = $("#nav-chips");
    const main = $("#contenido");
    nav.innerHTML = "";
    main.innerHTML = "";

    const categorias = (data.categorias || []).filter((c) => (c.noticias || []).length);

    if (!categorias.length) {
      main.innerHTML = `<div class="error-box"><p>No hay noticias para hoy todavía. Vuelve más tarde.</p></div>`;
      return;
    }

    categorias.forEach((cat, i) => {
      // Chip de navegación
      const chip = document.createElement("a");
      chip.className = "chip";
      chip.href = `#${cat.id}`;
      chip.textContent = `${cat.emoji || ""} ${cat.nombre}`.trim();
      nav.appendChild(chip);

      // Sección
      const sec = document.createElement("section");
      sec.className = "categoria";
      sec.id = cat.id;
      sec.style.animationDelay = `${i * 0.05}s`;

      const header = document.createElement("div");
      header.className = "cat-header";
      header.innerHTML = `
        <span class="cat-emoji">${cat.emoji || "•"}</span>
        <span class="cat-nombre">${escapeHtml(cat.nombre)}</span>
        <span class="cat-count">${cat.noticias.length}</span>`;
      sec.appendChild(header);

      cat.noticias.forEach((n) => sec.appendChild(tarjeta(n)));
      main.appendChild(sec);
    });

    // Pie
    if (data.actualizado) {
      const fecha = new Date(data.actualizado);
      const hora = fecha.toLocaleString("es-CL", {
        day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit",
      });
      $("#actualizado").textContent = `Actualizado el ${hora}`;
    }
  }

  function tarjeta(n) {
    const a = document.createElement("a");
    a.className = "noticia";
    a.href = n.url || "#";
    if (n.url) { a.target = "_blank"; a.rel = "noopener noreferrer"; }

    a.innerHTML = `
      <div class="noticia-titular">${escapeHtml(n.titular || "")}</div>
      <div class="noticia-resumen">${escapeHtml(n.resumen || "")}</div>
      <div class="noticia-meta">
        <span>${escapeHtml(n.fuente || "Fuente")}</span>
        <span class="arrow">→</span>
      </div>`;
    return a;
  }

  function mostrarError(err) {
    $("#contenido").innerHTML = `
      <div class="error-box">
        <p style="font-size:32px;margin-bottom:10px">📭</p>
        <p style="font-weight:700;margin-bottom:6px">No se pudo cargar el boletín</p>
        <p style="color:var(--text-soft);font-size:14px">Revisa tu conexión y recarga la página.</p>
        <p style="color:var(--text-faint);font-size:12px;margin-top:10px">${escapeHtml(String(err.message || err))}</p>
      </div>`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- PWA: service worker ----------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
