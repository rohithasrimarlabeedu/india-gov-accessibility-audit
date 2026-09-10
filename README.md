# India.gov.in Accessibility Baseline & Repository Architecture Audit

## Project Overview

This project is an accessibility baseline and repository architecture audit of the public-facing website India.gov.in.

The purpose of this project is to identify important accessibility issues, document evidence from Lighthouse and keyboard-only testing, and establish a clean monorepo-style structure for future full-stack development.

## Audited Website

Website: India.gov.in

Audit Type:

* Automated accessibility audit using Lighthouse
* Manual keyboard-only navigation review

Accessibility Score: 89/100

## Repository Structure

```text
india-gov-accessibility-audit/
│
├── client/
│   └── README.md
│
├── server/
│   └── README.md
│
├── docs/
│   ├── accessibility-audit.md
│   └── screenshots/
│
├── tests/
│   └── README.md
│
└── README.md
```

## Architecture Boundaries

### Client

The `client` directory will contain the frontend application.

Responsibilities:

* User interface
* HTML structure
* CSS and responsive design
* Accessible components
* Client-side interactions
* Frontend validation

### Server

The `server` directory will contain backend application code.

Responsibilities:

* API endpoints
* Server-side business logic
* Data processing
* Authentication and authorization when required
* Communication with databases or external services

### Docs

The `docs` directory contains project documentation.

Responsibilities:

* Accessibility audit report
* Evidence and screenshots
* Technical documentation
* Architecture documentation

### Tests

The `tests` directory contains testing-related documentation and future automated/manual tests.

Responsibilities:

* Accessibility tests
* Frontend tests
* Backend tests
* Integration tests

## Local Setup

### Prerequisites

Install the following before starting development:

* Git
* Visual Studio Code
* Node.js and npm

### Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

### Open the Project

```bash
cd india-gov-accessibility-audit
```

### Client Setup

```bash
cd client
```

The client directory is currently a skeleton for the frontend application.

### Server Setup

```bash
cd ../server
```

The server directory is currently a skeleton for the backend application.

## First Vertical Feature Slice

The first feature slice will be an accessible public information page.

The feature will include:

1. A semantic HTML page structure.
2. A visible navigation area.
3. A main content section.
4. Proper heading hierarchy.
5. Accessible links and buttons.
6. Images with meaningful alternative text where required.
7. Sufficient color contrast.
8. Keyboard-only navigation.
9. Visible keyboard focus indicators.
10. Basic accessibility testing.

The feature will be developed across the client, server, documentation, and test boundaries where applicable.

## Accessibility Audit

The detailed accessibility audit is available in:

`docs/accessibility-audit.md`

The audit contains five selected issues identified from the Lighthouse report and manual review.

## Goals

* Improve accessibility awareness.
* Establish a clean full-stack repository structure.
* Document accessibility findings.
* Prioritize remediation work.
* Prepare the project for future development and testing.
