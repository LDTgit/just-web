# Just Law Website

A modern React landing page for a legal services brand, built to present a law firm’s expertise, professional team, legal services, and contact information in a clean and conversion-focused format.
Published at https://just-web-two.vercel.app/ 

## Project Overview

This project is a single-page website for a law firm and legal consultancy business. It includes:

- a hero section with strong brand positioning
- a services overview with multiple legal practice areas
- a team section highlighting the legal professionals
- a contact and map section with consent-based interactive map loading
- privacy and cookie policy pages
- a cookie banner and consent handling flow

The app is built with React and uses a component-based structure for reuse and maintainability.

## Tech Stack

- React 18
- Create React App
- Chakra UI
- React Router DOM
- React Router Hash Link
- Font Awesome
- CSS custom styling
- Cookie consent utilities implemented in JavaScript

## Features

- Responsive navigation with mobile menu
- Smooth scrolling between sections using hash links
- Sticky header and branded layout
- Legal service cards with icons and descriptions
- Team highlight cards
- Contact information and WhatsApp / email / map links
- Privacy policy and cookie policy pages
- Cookie consent banner and conditional map rendering

## Project Structure

```text
just-web/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── ...
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   ├── sections/
│   │   │   ├── HeroSection.js
│   │   │   ├── Services.js
│   │   │   ├── TeamSection.js
│   │   │   ├── MapSection.js
│   │   │   ├── CookieBanner.js
│   │   │   ├── PrivacyPolicy.js
│   │   │   ├── CookiePolicy.js
│   │   │   └── ...
│   │   └── utils/
│   │       ├── cookieUtils.js
│   │       └── ScrollToTop.js
│   └── setupTests.js
├── package.json
├── README.md
├── optimize.js
├── vercel.json
└── build/
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+ recommended
- npm

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd just-web
```

2. Install dependencies:

```bash
npm install
```

## Available Scripts

### `npm start`

Runs the app in development mode.

Open http://localhost:3000 in your browser.

### `npm run build`

Creates a production build in the `build` directory.

## Local Development

To launch the app:

```bash
npm start
```

The app will hot-reload during development and reflect changes automatically.

## Deployment

This project is intended for static deployment and is suitable for GitHub Pages hosting.

Typical production flow:

```bash
npm run build
```

Then publish the generated `build` folder to your hosting provider or deploy it through the GitHub Pages workflow.

> Note: the repository currently includes the `gh-pages` package, but deployment automation should be configured in `package.json` if you want a one-click publish workflow.

## Brand and Content Notes

The website includes placeholder content for some legal and contact information, including:

- phone number
- email address
- WhatsApp link
- social media links
- map address


## Accessibility and UX

The frontend includes a mobile-friendly design, cookie consent flow, and accessible navigation patterns to improve usability across devices.
