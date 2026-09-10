# Pulse Frontend

A web interface to control a MAX7219 LED matrix display over the network. Connect to your device and switch between multiple screens in real time:

- Plain text / custom messages
- Currently playing Spotify song
- Clock
- Timer / stopwatch
- Countdown to the next payday
- GitHub contribution graph
- ...and more screens to come

This repo is the web frontend. The matching firmware and hardware design live in [pulse](https://github.com/hanzeelvilla/pulse).

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (with the React Compiler enabled)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [pnpm](https://pnpm.io/) as package manager

## Requirements

- [Node.js](https://nodejs.org/) 20 or later
- [pnpm](https://pnpm.io/installation) 9 or later

## Setup & installation

1. Clone the repository:

   ```sh
   git clone https://github.com/hanzeelvilla/pulse-frontend.git
   cd pulse-frontend
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Start the development server:

   ```sh
   pnpm dev
   ```

   The app will be available at `http://localhost:5173` by default.

## Available scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Start the Vite dev server with HMR       |
| `pnpm build`        | Type-check and build for production      |
| `pnpm preview`      | Preview the production build locally     |
| `pnpm lint`         | Run ESLint                               |
| `pnpm format`       | Format the codebase with Prettier        |
| `pnpm format:check` | Check formatting without writing changes |
