# Contributing

Thanks for wanting to improve `locallm-chat`!

## Guiding constraint

The project is deliberately **one self-contained `index.html`** — no
build step, no runtime dependencies. A feature that requires a bundler,
a framework, or a second file needs a strong justification.

## Before you submit

- Run `npm ci` and `npm run check` locally. Both must pass:

  - `html-validate` — HTML semantics, accessibility, implicit input and
    button types
  - inline-JS syntax check — the `<script>` block must compile cleanly

- The same checks run in CI, so a green pipeline is the bar.
- Keep the terminal aesthetic and the zero-dependency property intact.
- Preserve the security posture: any new rendering path must HTML-escape
  server/user-provided text (see `esc()` in `index.html`).

## Process

1. Fork the repo and create a branch.
2. Make your change, keeping it small and focused.
3. Run `npm run check`.
4. Open a pull request describing the change and why it fits.

## Reporting bugs

Open an issue with the LM Studio version, browser, and a short
description of the failure. Include the request/response from the LM
Studio logs if you can.
