# India.gov.in Accessibility Baseline & Repository Architecture Audit

## Project Overview

This project reverse-engineers a real public-facing service website and converts the findings into an accessible, maintainable full-stack project foundation.

The audit focuses on:

* Accessibility baseline testing
* Lighthouse evaluation
* Keyboard-only navigation
* Accessibility issue documentation
* Evidence-based remediation priorities
* Maintainable repository architecture
* Setup-ready client and server boundaries

## Audit Target

**Website:** India.gov.in

The website was evaluated from an accessibility and architecture perspective using:

1. Google Lighthouse
2. Keyboard-only navigation
3. Manual accessibility inspection
4. Repository and application architecture review

## Accessibility Baseline

The Lighthouse accessibility audit recorded an **89/100 Accessibility score** during the audit.

The audit evidence and detailed findings are available in:

* [`docs/ACCESSIBILITY_AUDIT.md`](docs/ACCESSIBILITY_AUDIT.md)
* [`docs/LIGHTHOUSE_REPORT.md`](docs/LIGHTHOUSE_REPORT.md)
* [`docs/accessibility-audit.md`](docs/accessibility-audit.md)

## Accessibility & Architecture Findings

Five representative issues were documented with evidence, severity, priority, and remediation guidance.

### 1. Image Alternative Text

Some images require meaningful alternative text so that their purpose can be communicated to users of assistive technologies.

**Priority:** High

**Evidence:**
`docs/screenshots/image-alt-issue.png`

### 2. Color Contrast

Some interface elements require improved color contrast to make content easier to read for users with visual impairments.

**Priority:** High

**Evidence:**
`docs/screenshots/color-contrast-issue.png`

### 3. ARIA / Semantic Roles

Interactive or structural elements should use appropriate semantic HTML and ARIA roles where necessary.

**Priority:** High

**Evidence:**
`docs/screenshots/aria-role-issue.png`

### 4. Keyboard Navigation

The interface was reviewed using keyboard-only navigation to identify focus and navigation concerns.

**Priority:** High

**Evidence:**
`docs/screenshots/keyboard-navigation.png`

### 5. List / Content Structure

Content structures should use appropriate semantic elements so that page relationships are understandable to assistive technologies.

**Priority:** Medium

**Evidence:**
`docs/screenshots/list-structure-issue.png`

## Lighthouse Evidence

The Lighthouse accessibility result is documented with supporting evidence.

**Screenshot:**

`docs/screenshots/lighthouse-accessibility-score.png`

The project also retains the Lighthouse test documentation in:

* [`tests/lighthouse-test.md`](tests/lighthouse-test.md)
* [`docs/LIGHTHOUSE_REPORT.md`](docs/LIGHTHOUSE_REPORT.md)

## Keyboard-Only Navigation

A keyboard-only navigation pass was performed using standard keyboard controls such as:

* `Tab`
* `Shift + Tab`
* `Enter`
* `Space`
* Arrow keys where applicable

The navigation review focused on whether interactive elements could be reached and operated without relying on a mouse.

Detailed notes are available in:

[`tests/keyboard-test.md`](tests/keyboard-test.md)

## Repository Architecture

The repository uses a monorepo-style structure separating the client, server, documentation, and testing concerns.

```text
india-gov-accessibility-audit/
│
├── client/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── README.md
│
├── server/
│   └── README.md
│
├── docs/
│   ├── ACCESSIBILITY_AUDIT.md
│   ├── LIGHTHOUSE_REPORT.md
│   ├── accessibility-audit.md
│   └── screenshots/
│       ├── aria-role-issue.png
│       ├── color-contrast-issue.png
│       ├── image-alt-issue.png
│       ├── keyboard-navigation.png
│       ├── lighthouse-accessibility-score.png
│       ├── lighthouse-accessibility-score.png.bmp
│       └── list-structure-issue.png
│
├── tests/
│   ├── README.md
│   ├── TEST_SUMMARY.md
│   ├── keyboard-test.md
│   └── lighthouse-test.md
│
└── README.md
```

## Architecture Boundaries

### Client

The `client/` directory contains the browser-facing application.

Responsibilities:

* User interface
* HTML structure
* Styling
* Client-side interaction
* Accessibility-focused UI implementation

### Server

The `server/` directory represents the backend boundary.

Responsibilities:

* Server-side application logic
* Future API endpoints
* Business logic
* Data access integration

### Documentation

The `docs/` directory contains:

* Accessibility audit findings
* Lighthouse documentation
* Evidence screenshots
* Remediation information

### Tests

The `tests/` directory contains:

* Lighthouse test documentation
* Keyboard navigation test documentation
* Test summary
* Supporting test notes

## Local Setup

### Prerequisites

Install:

* Git
* A modern web browser
* Python 3 or another local static server

### Run the Client

Open Command Prompt in the project directory and run:

```cmd
cd client
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Run Accessibility Testing

Open the application in Chrome.

Use:

**F12 → Lighthouse**

Select:

* Accessibility
* Desktop or the required testing environment

Then run the audit.

For keyboard testing, use:

* `Tab`
* `Shift + Tab`
* `Enter`
* `Space`

without using the mouse.

## First Vertical Feature Slice

The first feature slice is an accessibility-focused public-service interface foundation.

The intended flow is:

```text
User
  ↓
Client UI
  ↓
Accessible interaction
  ↓
Server/API boundary
  ↓
Future service/data integration
```

This structure allows future features to be added without mixing presentation, backend, documentation, and testing responsibilities.

## Expected Deliverables

The repository provides:

* Public GitHub repository
* Accessibility audit report
* Lighthouse evidence
* Keyboard navigation evidence
* Five documented issues
* Remediation priorities
* Architecture tree
* Client skeleton
* Server skeleton
* Documentation directory
* Test documentation
* Local setup instructions

## Submission Repository

**GitHub:**
https://github.com/rohithasrimarlabeedu/india-gov-accessibility-audit

## Conclusion

This project establishes an accessibility-first and maintainable foundation for a full-stack public-service application.

The audit findings provide a baseline for future remediation, while the repository architecture separates client, server, documentation, and testing responsibilities for easier maintenance and future development.
