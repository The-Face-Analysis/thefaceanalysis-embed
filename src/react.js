import { createElement, useEffect } from "react";

/** React wrapper: <FaceAnalysisWidget tool="face-shape" size="standard" />. Client-side only. */
export function FaceAnalysisWidget({ tool = "face-shape", size = "standard" }) {
  useEffect(() => { import("./index.js"); }, []);
  return createElement("face-analysis-widget", { tool, size });
}
