# Japan Travel Guide

Live weather and travel highlights for Tokyo, Osaka, and Kyoto. Built with React + Vite, multilingual i18n, and switchable weather providers.

## Overview

- Multilingual UI: English, 日本語, 中文
- City cards with descriptions and real-time weather
- Weather provider switch: `openweather` or `openmeteo`
- Safe environment setup: `.env` is ignored by Git

## Getting Started

1. Install dependencies:
   
   ```sh
   npm install
   ```

2. Create `.env` in project root:

   ```env
   # Optional: set your OpenWeather key when available
   VITE_OPENWEATHER_API_KEY=YOUR_KEY

   # Default provider (use openmeteo to avoid exposing any key)
   VITE_WEATHER_PROVIDER=openmeteo
   ```

3. Run dev server:

   ```sh
   npm run dev
   ```

## Weather Providers

- `openmeteo`: No API key required. We normalize WMO `weathercode` to text and an approximate icon.
- `openweather`: Requires an API key and uses `/data/2.5/weather`.

Switch by editing `.env` and restarting dev server:

```env
VITE_WEATHER_PROVIDER=openweather
```

## Deployment

- Ensure `.env` is NOT committed (`.gitignore` excludes it).
- If deploying (e.g. Vercel), set environment variables in the platform:
  - `VITE_OPENWEATHER_API_KEY`
  - `VITE_WEATHER_PROVIDER`

## Notes

- If OpenWeather returns `401 Invalid API key`, the app falls back to Open‑Meteo automatically so the UI stays functional.
- City descriptions and copy live in `src/i18n/index.jsx`.