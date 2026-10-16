/**
 * <face-analysis-widget tool="face-shape" size="standard"></face-analysis-widget>
 *
 * Builds an iframe to https://thefaceanalysis.com/embed/<tool>, keeps its
 * height equal to its content, and writes the visible credit link into the HOST
 * page (light DOM). The credit link is not decoration: a link inside the iframe
 * belongs to the widget's own document, not to your page, and the terms
 * (https://thefaceanalysis.com/embed) ask for the credit link to stay visible.
 */
const ORIGIN = "https://thefaceanalysis.com";
const SIZES = { compact: [360, 560], standard: [480, 600], wide: [720, 520] };
const PAGES = { "face-shape": "/face-shape" };

export class FaceAnalysisWidget extends HTMLElement {
  connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;
    const tool = this.getAttribute("tool") || "face-shape";
    if (!/^[a-z0-9-]+$/.test(tool)) return;
    const [w, h] = SIZES[this.getAttribute("size")] || SIZES.standard;

    const frame = document.createElement("iframe");
    frame.src = `${ORIGIN}/embed/${tool}?h=${encodeURIComponent(location.hostname)}`;
    frame.title = "Face analysis widget by The Face Analysis";
    frame.loading = "lazy";
    frame.width = String(w);
    frame.height = String(h);
    frame.style.cssText = `border:0;width:100%;max-width:${w}px;height:${h}px;display:block;margin:0 auto`;
    this._frame = frame;

    const credit = document.createElement("p");
    credit.style.cssText = "text-align:center;font:12px/1.4 system-ui,sans-serif;margin:6px 0 0";
    const a = document.createElement("a");
    a.href = ORIGIN + (PAGES[tool] || "/");
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "The Face Analysis";
    credit.append("Face analysis by ", a);

    this.append(frame, credit);
    this._onMessage = (e) => {
      if (e.origin !== ORIGIN || e.source !== frame.contentWindow) return;
      const m = e.data;
      if (!m || m.source !== "tfa-embed" || m.type !== "resize") return;
      const height = Number(m.height);
      if (Number.isFinite(height) && height >= 120 && height <= 2000) frame.style.height = `${Math.ceil(height)}px`;
    };
    window.addEventListener("message", this._onMessage);
  }
  disconnectedCallback() {
    window.removeEventListener("message", this._onMessage);
    this._mounted = false;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("face-analysis-widget")) {
  customElements.define("face-analysis-widget", FaceAnalysisWidget);
}
