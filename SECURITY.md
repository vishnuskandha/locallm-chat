# Security Policy

## Scope

`locallm-chat` is a fully local, single-file web UI for LM Studio. It
contains no server-side code and sends requests only to the LM Studio
endpoint you configure (default `http://localhost:1234`).

## Threat model

- **Local only.** The UI never phones home. The only network traffic is
  between your browser and the LM Studio server.
- **Output safety.** All server-provided text — responses, error bodies,
  telemetry values — is HTML-escaped before it touches the DOM, so a
  misbehaving or malicious server cannot inject markup or script into
  the page.
- **Config.** Host and model are stored in `localStorage` only. Nothing
  is transmitted to third parties.

## Reporting

This project has no private reporting channel. Open a GitHub issue with
a clear description and, if possible, a minimal reproduction.

## Operational guidance

- Bind LM Studio to `127.0.0.1` (the default). If the port is reachable
  from other hosts, anyone on your network can run inference on your
  hardware and access served models.
- Serve `index.html` from a location you trust (it runs with the
  privileges of whatever origin hosts it).
- The built-in API key field is not used by this client; if your LM
  Studio instance enforces an API key, set it on the server side and
  keep it out of version control.
