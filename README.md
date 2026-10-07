# Muhammad Saleem — Portfolio

A responsive, single-page portfolio built with React, JavaScript, and Vite.

## Live site

The portfolio is deployed with GitHub Pages at:
https://muhammadsaleem-codes.github.io/mern-stack-portfolio/

Pushes to the `main` branch automatically build and deploy the site with GitHub Actions.

## Get started

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL printed in the terminal.
4. When ready to publish, run `npm run build`. The production site is in `dist/`.

## Profile photo

The app uses `public/profile.png`, with `public/profile.jpg` as a fallback.

## Projects and content

Project card content is in `src/App.jsx`; the six interactive project experiences are in `src/projectApps.jsx`.

## Deployment

GitHub Pages is configured through `.github/workflows/deploy.yml`. The Vite base path is set for this repository name.
