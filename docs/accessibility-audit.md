# Accessibility Baseline Audit Report

## 1. Audit Overview

### Audited Website

India.gov.in

### Audit Type

* Automated accessibility audit using Google Lighthouse
* Manual keyboard-only navigation testing

### Lighthouse Accessibility Score

**89/100**

### Audit Environment

* Lighthouse version: 13.4.1
* Browser: Chromium 152
* Desktop audit
* Single-page initial load

## 2. Keyboard-Only Testing

A manual keyboard-only navigation check was performed on the website.

The `Tab` key was used to move through interactive and focusable elements.

The test confirmed that keyboard focus could move through the page.

The following areas were considered during the manual review:

* Keyboard focusability
* Interactive control purpose and state
* Logical tab order
* Visual and DOM order
* Focus traps
* Focus movement to new content
* HTML5 landmarks
* Offscreen content
* Custom control labels
* Custom control ARIA roles

## 3. Accessibility Issues

Five issues were selected for documentation and remediation planning.

---

## Issue 1: ARIA Roles Are Not Contained by Their Required Parent Element

### Priority

**High**

### Evidence

Lighthouse identified elements using ARIA roles that were not contained by their required parent element.

This can make the semantic relationship between related controls unclear to assistive technologies.

### Impact

Screen-reader users may not receive the expected structure or relationship between related elements.

### Recommended Remediation

Review the affected elements and ensure that ARIA roles are placed within the required parent roles.

Where possible, use native semantic HTML elements instead of unnecessary ARIA roles.

### Remediation Priority

**High**

This should be addressed early because incorrect ARIA relationships can affect how assistive technologies interpret the interface.

---

## Issue 2: Insufficient Color Contrast

### Priority

**High**

### Evidence

Lighthouse reported:

`Background and foreground colors do not have a sufficient contrast ratio.`

The audit identified text or interface elements where the foreground and background colors did not provide sufficient contrast.

### Impact

Users with low vision or color-vision difficulties may have difficulty reading or identifying content.

### Recommended Remediation

Review the affected foreground and background color combinations.

Increase contrast while maintaining the intended visual design.

Contrast should be checked again after the color changes are implemented.

### Remediation Priority

**High**

Color contrast is important because it directly affects readability and the ability to distinguish interface content.

---

## Issue 3: List Items Are Not Contained Within a Required List Parent

### Priority

**High**

### Evidence

Lighthouse reported:

`List items (<li>) are not contained within <ul>, <ol> or <menu> parent elements.`

### Impact

Improper list structure can make content harder for assistive technologies to interpret.

Users of screen readers may not receive the expected list structure.

### Recommended Remediation

Ensure that every `<li>` element is placed inside an appropriate:

* `<ul>`
* `<ol>`
* `<menu>`

Where the content is not actually a list, replace the `<li>` element with an appropriate semantic HTML element.

### Remediation Priority

**High**

The HTML structure should be corrected so that list semantics are properly represented.

---

## Issue 4: Redundant Alternative Text in Images

### Priority

**Medium**

### Evidence

Lighthouse identified image elements where the alternative text was considered redundant with visible text.

### Impact

Screen-reader users may hear information more than once, creating unnecessary repetition.

### Recommended Remediation

Review the affected images and their surrounding text.

For decorative images, use an empty alternative text value where appropriate.

For informative images, provide concise alternative text that adds useful information rather than repeating nearby text.

### Remediation Priority

**Medium**

Image alternative text should be reviewed as part of the accessible content structure.

---

## Issue 5: Image Display Dimensions Do Not Match Natural Aspect Ratio

### Priority

**Medium**

### Evidence

The Lighthouse report identified images whose displayed dimensions did not match their natural aspect ratio.

For example, some images were displayed at approximately `202 × 144` while their natural dimensions were approximately `547 × 358`.

### Impact

Images may appear stretched or distorted, which can reduce visual quality and make content harder to understand.

### Recommended Remediation

Maintain the correct image aspect ratio when setting width and height.

Use responsive CSS such as:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Where explicit dimensions are required, ensure the width and height preserve the original aspect ratio.

### Remediation Priority

**Medium**

This should be addressed after higher-priority accessibility issues.

---

# 4. Remediation Priority Summary

| Issue                               | Priority | Recommended Action                            |
| ----------------------------------- | -------- | --------------------------------------------- |
| Incorrect ARIA parent relationships | High     | Correct ARIA structure or use semantic HTML   |
| Insufficient color contrast         | High     | Improve foreground/background contrast        |
| Incorrect `<li>` structure          | High     | Place list items inside valid list containers |
| Redundant image alternative text    | Medium   | Review and improve image text alternatives    |
| Incorrect image aspect ratio        | Medium   | Preserve natural image proportions            |

# 5. Recommended Remediation Order

The recommended order is:

1. Fix incorrect ARIA relationships.
2. Fix insufficient color contrast.
3. Fix incorrect list structure.
4. Review redundant image alternative text.
5. Correct image aspect-ratio issues.
6. Repeat Lighthouse accessibility testing.
7. Repeat keyboard-only testing.
8. Document the final results.

# 6. Evidence

The Lighthouse report was used as the primary evidence for the automated accessibility findings.

Screenshots can be stored in:

`docs/screenshots/`

Suggested screenshot files:

```text
docs/screenshots/
├── lighthouse-accessibility-score.png
├── aria-role-issue.png
├── color-contrast-issue.png
├── list-structure-issue.png
├── image-alt-issue.png
├── image-aspect-ratio-issue.png
└── keyboard-navigation.png
```

# 7. Conclusion

The audited website achieved an accessibility score of **89/100** in the Lighthouse accessibility audit.

The audit identified several areas that can be improved, particularly ARIA structure, color contrast, and semantic list structure.

The repository architecture provides separate boundaries for the client, server, documentation, and testing areas.

The next step is to remediate the high-priority accessibility issues and repeat the accessibility and keyboard-only tests to verify the improvements.
