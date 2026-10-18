import { createElement, useEffect } from "react";

/** React wrapper: <FaceAnalysisWidget tool="eye-shape" size="standard" lang="de" />. Client-side only (it renders a custom element). */
export function FaceAnalysisWidget({ tool = "face-shape", size = "standard", lang = "en" }) {
  useEffect(() => { import("./index.js"); }, []);
  return createElement("face-analysis-widget", { tool, size, lang });
}
