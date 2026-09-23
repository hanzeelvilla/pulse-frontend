# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pulse Frontend is a web interface for controlling a MAX7219 LED matrix display over the network: connecting to the device and switching between screens (plain text, Spotify now-playing, clock, timer/stopwatch, payday countdown, GitHub contributions, etc.). The matching firmware/hardware lives in a separate repo: https://github.com/hanzeelvilla/pulse.

The overall project is split into 3 projects: frontend (this repo), backend, and hardware. Work follows a shared roadmap located at `D:\Hanzeel\arduinoProjects\pulse\ROADMAP.md` — consult it to know what to build and in what order.

Current state (Roadmap Phase 5): a single-page vertical slice in `src/App.tsx` — a free-text form (react-hook-form + zod) that emits `set-free-text` to the backend and mirrors the last `display-text` event. Screen switching and the other screens are not yet implemented.

Backend contract: Socket.IO namespace `/frontend` (`socket.io-client`). Client → server `set-free-text` (plain string); server → client `display-text` (plain string), sent on connect and broadcast to every frontend on each change. The backend has no CORS config, so `vite.config.ts` proxies `/socket.io` to `http://localhost:3000` in dev and the client connects same-origin.

## Language

Always write code and comments in English, even if the prompt is in another language.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`; don't use npm/yarn).

- `pnpm install` — install dependencies
- `pnpm dev` — start Vite dev server with HMR
- `pnpm build` — type-check (`tsc -b`) then production build
- `pnpm preview` — preview the production build
- `pnpm lint` — run ESLint
- `pnpm format` — format with Prettier (writes)
- `pnpm format:check` — check formatting without writing

There is no test setup in this repo yet.

A `PostToolUse` hook (`.claude/settings.json`) runs `pnpm run lint` and `pnpm run format` automatically after every Write/Edit, so files may be reformatted by Prettier immediately after you edit them — re-read a file if your next edit targets a region you just changed.

## Stack & config notes

- **React 19 + TypeScript**, built with **Vite**, bundled via **rolldown-vite**/Oxc (`vite: ^8.x`).
- **React Compiler** is enabled through `@rolldown/plugin-babel` + `reactCompilerPreset()` in `vite.config.ts` — no manual memoization should be needed.
- **Tailwind CSS v4** is wired in via `@tailwindcss/vite` (no `tailwind.config.js`); the only stylesheet is `src/index.css` (`@import "tailwindcss";`).
- **TypeScript** uses project references (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`), target `es2023`, bundler module resolution, `verbatimModuleSyntax: true`, and strict unused-locals/params checks — imports and exports must use explicit `type` syntax where required, and unused vars will fail the build.
- **ESLint** uses the flat config format (`eslint.config.js`) with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` (vite preset). Type-aware lint rules are not enabled by default.
- **Prettier** config (`.prettierrc.json`): `semi: true`, `singleQuote: false`.
