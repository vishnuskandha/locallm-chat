# locallm-chat — HTML chat UI for LM Studio

[![CI](https://github.com/vishnuskandha/locallm-chat/actions/workflows/ci.yml/badge.svg)](https://github.com/vishnuskandha/locallm-chat/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Runtime deps: zero](https://img.shields.io/badge/runtime%20deps-zero-brightgreen.svg)](index.html)

A single-file, cyber-style chat UI inspired by the G0DM0D3 terminal
aesthetic, built for **local LLM inference** with **LM Studio**.

One `index.html`, no build tools, no runtime dependencies. Open it in a
browser, point it at your LM Studio server, and chat.

## Features

- Pure HTML/CSS/JS — zero build step, zero dependencies, works offline
- Streaming responses from LM Studio (`POST /api/v1/chat`)
- One-click connection check (`GET /v1/models`)
- Token/stat telemetry (tok/s, input/output tokens, TTFT) when the server
  provides it
- Markdown-lite rendering: fenced code blocks, inline code, bold, italic
- Keyboard shortcuts:

  | Key            | Action            |
  | -------------- | ----------------- |
  | `Enter`        | Send              |
  | `Shift+Enter`  | Newline           |
  | `Esc`          | Stop generation   |
  | `Ctrl+L`       | Clear chat        |

- Host/model config persisted in `localStorage`

## Quick start

1. Open LM Studio and start the local server (default
   `http://localhost:1234`). Keep it bound to `127.0.0.1`.
2. Open `index.html` in a browser.
3. Set host/model, click **connect**, then chat.

The `Esc` key (or clicking send while streaming) aborts the current
generation.

## API contract

The client talks directly to the LM Studio native API. No proxy, no
intermediary.

### Connection check

```
GET {base}/v1/models
```

### Chat

```
POST {base}/api/v1/chat
Content-Type: application/json
```

```json
{
  "model": "local-model",
  "input": "user message",
  "system_prompt": "You are a helpful AI assistant. Be concise and clear.",
  "max_output_tokens": 2048,
  "stream": true,
  "store": false
}
```

- Conversation history is folded into `system_prompt` as plain text
  (`Conversation so far: ...`), matching the LM Studio native request
  shape rather than the OpenAI `messages[]` array.
- The response is an SSE stream: lines of `data: {json}` followed by a
  terminating `data: [DONE]`.
- Each event is parsed for a content delta via `choices[0].delta.content`
  (OpenAI-compat, most common) or the LM Studio native `output[]` array.
- An optional `stats` field in any event populates the telemetry bar.

## Development

Validation is self-contained via npm — dev tooling only, the shipped app
still has zero runtime dependencies.

```sh
npm ci
npm run check   # html-validate + inline-JS syntax check
```

- `npm run validate` — `html-validate` on `index.html` (a11y, semantics,
  implicit types)
- `npm run check:js` — compiles the inline `<script>` block with Node's
  `vm` module to catch parse errors

Both run in CI on every push/PR to `main`.

## Security

- **Never expose the LM Studio server publicly.** Bind it to `127.0.0.1`
  only. Anyone who can reach the port can run inference on your machine
  and read the served model.
- No data leaves your machine — this UI is fully local.
- All server-provided text (including errors and stats) is HTML-escaped
  before rendering; user and model output cannot inject markup.

See [SECURITY.md](SECURITY.md) for details.

## License

MIT — see [LICENSE](LICENSE).
