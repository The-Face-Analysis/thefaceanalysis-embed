/**
 * <face-analysis-widget tool="face-shape" size="standard" lang="de"></face-analysis-widget>
 *
 * `lang` is optional (default "en"): en, de, es, fr, pt-br, nl, tr, it, pl, ru, ja, ko, hi, id.
 * Builds an iframe to https://thefaceanalysis.com/embed/<tool> (English) or /embed/<lang>/<tool>, keeps its
 * height equal to its content, and writes the visible credit link into the HOST
 * page (light DOM). The credit link is not decoration: a link inside the iframe
 * belongs to the widget's own document, not to your page, and the terms
 * (https://thefaceanalysis.com/embed) ask for the credit link to stay visible.
 */
const ORIGIN = "https://thefaceanalysis.com";
const SIZES = { compact: [360, 860], standard: [480, 730], wide: [720, 600] };
const CREDIT = {"en":"Face analysis by","de":"Gesichtsanalyse von","es":"Análisis facial de","fr":"Analyse du visage par","pt-br":"Análise facial por","nl":"Gezichtsanalyse door","tr":"Yüz analizi:","it":"Analisi del viso a cura di","pl":"Analiza twarzy:","ru":"Анализ лица от","ja":"顔分析:","ko":"얼굴 분석 제공:","hi":"चेहरे का विश्लेषण:","id":"Analisis wajah oleh"};
const TITLE = {"en":"Face analysis widget by The Face Analysis","de":"Gesichtsanalyse-Widget von The Face Analysis","es":"Widget de análisis facial de The Face Analysis","fr":"Widget d'analyse du visage par The Face Analysis","pt-br":"Widget de análise facial da The Face Analysis","nl":"Gezichtsanalyse-widget van The Face Analysis","tr":"The Face Analysis yüz analizi aracı","it":"Widget di analisi del viso di The Face Analysis","pl":"Widget analizy twarzy The Face Analysis","ru":"Виджет анализа лица The Face Analysis","ja":"The Face Analysis の顔分析ウィジェット","ko":"The Face Analysis 얼굴 분석 위젯","hi":"The Face Analysis का चेहरा विश्लेषण विजेट","id":"Widget analisis wajah dari The Face Analysis"};
const PAGES = { "face-shape": "/face-shape", "eye-shape": "/eye-shape", "canthal-tilt": "/canthal-tilt", "nose-shape": "/nose-shape", "lip-shape": "/lip-shape", "facial-thirds": "/facial-thirds", "fwhr": "/fwhr-calculator", "midface-ratio": "/midface-ratio", "face-symmetry": "/face-symmetry-test", "golden-ratio": "/golden-ratio-face-calculator", "pupillary-distance": "/pupillary-distance" };

/** Language codes this version knows. */
export const LANGS = Object.keys(CREDIT);

/** Tool ids this version knows. The credit link goes to the tool's own page. */
export const TOOLS = Object.keys(PAGES);

export class FaceAnalysisWidget extends HTMLElement {
  connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;
    const tool = this.getAttribute("tool") || "face-shape";
    if (!PAGES[tool]) {
      console.warn(`[tfa-embed] unknown tool "${tool}". Available: ${Object.keys(PAGES).join(", ")}`);
      return;
    }
    let lang = (this.getAttribute("lang") || "en").toLowerCase().replace("_", "-");
    if (!CREDIT[lang]) {
      console.warn(`[tfa-embed] unknown lang "${lang}", using en. Available: ${Object.keys(CREDIT).join(", ")}`);
      lang = "en";
    }
    const [w, h] = SIZES[this.getAttribute("size")] || SIZES.standard;

    const frame = document.createElement("iframe");
    frame.src = `${ORIGIN}/embed/${lang === "en" ? "" : `${lang}/`}${tool}?h=${encodeURIComponent(location.hostname)}`;
    frame.title = TITLE[lang];
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
    a.textContent = "The Face Analysis";
    credit.append(`${CREDIT[lang]} `, a);

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
