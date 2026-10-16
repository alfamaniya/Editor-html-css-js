# HTML / CSS / JavaScript Editor

A browser-based editor for writing, organizing, previewing, and exporting HTML, CSS, and JavaScript projects.

## Features

- Separate HTML, CSS, and JavaScript editors.
- Live preview in a sandboxed iframe.
- Code suggestions for HTML tags and attributes, CSS properties and values, and JavaScript keywords and members.
- Project file explorer for creating and managing files.
- Undo/redo, editor font-size controls, and keyboard shortcuts.
- Browser-local project saving.
- Optional CDN library catalog and custom library entries.
- Download a single HTML file or a project bundle.

## Run locally

1. Download or clone this repository.
2. Keep the project files together.
3. Open `index.html` in a modern browser.

No build step or package installation is required for the core editor. Internet access is needed for libraries loaded from external CDNs.

## Main files

| File | Purpose |
|---|---|
| `index.html` | Editor interface and script/style references |
| `style.css` | Layout, editor, panels, and responsive styling |
| `script.js` | Editor behavior, project files, preview, storage, and export |
| `intellisense-data.js` | Separate, organized data bank for code suggestions |
| `README.md` | Project overview and usage notes |

## Suggestions data

The completion bank is maintained separately in `intellisense-data.js`. It contains the vocabularies and completion data used by the editor. To add or adjust suggestions, edit that file rather than mixing the data into the editor logic. The editor uses the available entries for HTML, CSS, and JavaScript suggestions.

## Saving and privacy

Project code and editor preferences are stored in the browser's local storage. They are not automatically uploaded to a server by this application. If external CDN libraries are enabled, the browser requests those resources from their respective providers.

## Notes

- This is a lightweight editor, not a full IDE or a complete language server.
- Suggestions are based on the local completion bank and do not cover every framework or language feature.
- Preview code is executed in an iframe. Treat code from untrusted sources with care.
- No license is specified in this repository; check with the repository owner before redistributing it.
