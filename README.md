# Web-Based HTML Chat for Local LLM (LM Studio)

A single-file, cyber-style chat UI inspired by the G0DM0D3 terminal aesthetic, adapted for **local LLM workflows** with **LM Studio**.

## Features

- Pure HTML/CSS/JS (no build tools, no dependencies)
- Streaming responses from LM Studio (`/api/v1/chat`)
- Quick connection check against LM Studio (`/v1/models`)
- Token/stat telemetry display (when provided by the server)
- Markdown-lite rendering for code blocks and inline formatting
- Keyboard shortcuts:
  - `Enter` send
  - `Shift+Enter` newline
  - `Esc` stop generation
  - `Ctrl+L` clear chat
- Saved host/model config via `localStorage`

## Quick start

1. Open LM Studio and start the local server (default: `http://localhost:1234`).
2. Open `index.html` in a browser.
3. Set host/model, click **connect**, then chat.

## Notes

- This UI is intentionally lightweight for local/offline usage.
- If your LM Studio endpoint differs, update host and model in the config row.
- For security, avoid exposing your LM Studio server publicly.
