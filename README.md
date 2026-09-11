# 🇮🇳 GovAccess - Government Services Portal

A responsive and accessibility-focused Government Services Portal developed as a Production Capstone Project.

## 🚀 Live Demo

Live deployment: Coming soon

## 📂 GitHub Repository

https://github.com/rohithasrimarlabeedu/india-gov-accessibility-audit

## 🎯 Project Overview

GovAccess is a modern web application that provides an accessible interface for discovering and managing government services.

The project combines responsive design, JavaScript DOM manipulation, REST API integration, simulated authentication, CRUD operations, and persistent browser storage.

## ✨ Features

### Authentication
- Simulated user login
- Name and email validation
- Persistent login state
- Logout functionality
- Protected dashboard

### Service Catalog
- Government service cards
- Search services in real time
- Category filtering
- Alphabetical sorting
- Responsive service grid

### CRUD Operations
- Add new government services
- Edit existing services
- Delete services
- Dynamic DOM updates

### Persistent State
- Uses browser localStorage
- Saves logged-in user
- Saves service changes
- Data remains available after page refresh

### Accessibility
- Semantic HTML5
- Proper form labels
- Keyboard-friendly controls
- Accessible navigation
- ARIA support where required
- Live content updates
- Responsive layout

### Responsive Design
- Mobile-first approach
- 320px mobile support
- Tablet layout
- Desktop layout
- Large-screen layout
- CSS Grid and Flexbox
- CSS custom properties/design tokens

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript ES6+
- REST API
- Fetch API
- Async/Await
- DOM Manipulation
- LocalStorage
- Responsive Web Design
- Git
- GitHub
- Vercel

## 🏗️ Project Architecture

```mermaid
flowchart TD
    A[User Browser] --> B[Login Page]
    B --> C[Simulated Authentication]
    C --> D[Dashboard]
    D --> E[Service Catalog]
    D --> F[Search Filter Sort]
    D --> G[CRUD Operations]
    G --> H[LocalStorage]
    E --> H
    D --> I[Capstone JavaScript]
    I --> J[Service Data]
    I --> K[REST API Client]
    D --> L[Responsive CSS]