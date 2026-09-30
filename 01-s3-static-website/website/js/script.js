const THEME_KEY = "theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (e) {
    // Storage can be unavailable (private mode, blocked cookies).
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      // Ignore: the theme still switches for this page view.
    }
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function initRequestInfo() {
  setText("host", window.location.hostname || "local file");
  setText("protocol", window.location.protocol.replace(":", "").toUpperCase());
  setText("requested-path", window.location.pathname);

  const tick = () => setText("clock", new Date().toLocaleTimeString());
  tick();
  setInterval(tick, 1000);
}

initTheme();
initRequestInfo();
