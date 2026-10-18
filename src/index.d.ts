export type ToolId = "face-shape" | "eye-shape" | "canthal-tilt" | "nose-shape" | "lip-shape" | "facial-thirds" | "fwhr" | "midface-ratio" | "face-symmetry" | "golden-ratio" | "pupillary-distance";
export type WidgetLang = "en" | "de" | "es" | "fr" | "pt-br" | "nl" | "tr" | "it" | "pl" | "ru" | "ja" | "ko" | "hi" | "id";
export type WidgetSize = "compact" | "standard" | "wide";
/** Every tool id this version supports. */
export const TOOLS: ToolId[];
/** Every language code this version supports. */
export const LANGS: WidgetLang[];
export class FaceAnalysisWidget extends HTMLElement {}
declare global {
  interface HTMLElementTagNameMap { "face-analysis-widget": FaceAnalysisWidget }
}
