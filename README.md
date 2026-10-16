# thefaceanalysis-embed

A free face shape finder for your own site. The visitor picks a photo, the measurement runs in their
browser (no sign-up), and the widget shows their face shape, fWHR and symmetry.

```html
<script type="module">import "thefaceanalysis-embed";</script>
<face-analysis-widget tool="face-shape" size="standard"></face-analysis-widget>
```

```jsx
import { FaceAnalysisWidget } from "thefaceanalysis-embed/react";
<FaceAnalysisWidget size="wide" />
```

No bundler? Use the script tag instead: https://thefaceanalysis.com/embed

Sizes: `compact` 360 px · `standard` 480 px · `wide` 720 px. Height follows the content.

**Terms.** Free to use, including commercially. Keep the credit link under the widget visible (the
component writes it into your page). Do not present the reading as a medical or cosmetic diagnosis: it
measures proportions in one photo and borderline readings can change with angle, smile and light.
Full terms: https://thefaceanalysis.com/embed

Code MIT.
