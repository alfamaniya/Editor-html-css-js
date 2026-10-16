    (function() {
        'use strict';

        // ==========================================
        //  ثابت‌ها
        // ==========================================
        const DEFAULT_HTML = `<main class="demo-shell">
    <header class="hero" id="top">
        <p class="eyebrow">HTML · CSS · JAVASCRIPT</p>
        <h1>Build a Better Web Page</h1>
        <p class="hero-copy">A hands-on starter project that demonstrates common elements, attributes, layout patterns, and interactions.</p>
        <nav class="hero-nav" aria-label="Page sections">
            <a href="#examples">Elements</a>
            <a href="#form-demo">Form</a>
            <a href="#data-demo">Data</a>
        </nav>
    </header>

    <section class="intro-panel" aria-labelledby="intro-title">
        <div>
            <p class="eyebrow">SEMANTIC HTML</p>
            <h2 id="intro-title">Start with structure</h2>
            <p>Use meaningful elements such as <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code> and <code>&lt;footer&gt;</code> before styling them with CSS.</p>
        </div>
        <figure class="artwork" aria-label="Decorative illustration made with HTML and CSS">
            <div class="artwork-orbit"></div>
            <div class="artwork-core">&lt;/&gt;</div>
            <figcaption>Simple CSS illustration</figcaption>
        </figure>
    </section>

    <section id="examples" class="section-block">
        <div class="section-heading">
            <div><p class="eyebrow">ELEMENT EXAMPLES</p><h2>Content and components</h2></div>
            <span class="pill">HTML 5</span>
        </div>
        <div class="card-grid">
            <article class="demo-card interactive-card">
                <span class="icon-tile" aria-hidden="true">01</span>
                <h3>Text and links</h3>
                <p>Mix <strong>strong text</strong>, <em>emphasis</em>, <mark>highlighted text</mark>, <del>removed text</del> and <ins>inserted text</ins>.</p>
                <p>Use <abbr title="HyperText Markup Language">HTML</abbr>, inline <code>code</code>, H<sub>2</sub>O and x<sup>2</sup>.</p>
                <blockquote>“Good structure makes good interfaces easier to build.”</blockquote>
                <p class="muted">Updated <time datetime="2026-10-17">October 17, 2026</time>.</p>
                <button type="button" class="button button-primary" id="counterButton">Clicked <span id="counterValue">0</span> times</button>
            </article>

            <article class="demo-card">
                <span class="icon-tile" aria-hidden="true">02</span>
                <h3>Disclosure and status</h3>
                <details open>
                    <summary>What does this demonstrate?</summary>
                    <p>The <code>details</code> and <code>summary</code> elements create a native disclosure widget without JavaScript.</p>
                </details>
                <label class="meter-label" for="courseProgress">Learning progress</label>
                <progress id="courseProgress" max="100" value="68">68%</progress>
                <label class="meter-label" for="skillLevel">Practice level</label>
                <meter id="skillLevel" min="0" max="10" low="3" high="8" optimum="9" value="7">7 out of 10</meter>
                <p class="muted">Try opening and closing the disclosure, then change its CSS.</p>
            </article>

            <article class="demo-card">
                <span class="icon-tile" aria-hidden="true">03</span>
                <h3>Lists and code</h3>
                <ol class="feature-list">
                    <li>Write semantic markup.</li>
                    <li>Style with reusable rules.</li>
                    <li>Add accessible interactions.</li>
                </ol>
                <pre><code>const greeting = "Hello!";
console.log(greeting);</code></pre>
                <p>Keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>Enter</kbd></p>
                <p class="muted">Output example: <samp>Hello!</samp></p>
            </article>
        </div>
    </section>

    <section id="advanced-demo" class="section-block">
        <div class="section-heading">
            <div><p class="eyebrow">GRAPHICS AND BROWSER FEATURES</p><h2>More HTML capabilities</h2></div>
            <span class="pill">SVG · Canvas · Dialog</span>
        </div>
        <div class="card-grid">
            <article class="demo-card">
                <h3>Images and inline SVG</h3>
                <picture>
                    <img class="sample-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 120'%3E%3Crect width='320' height='120' rx='16' fill='%23e0e7ff'/%3E%3Ccircle cx='60' cy='60' r='32' fill='%234f46e5'/%3Ctext x='110' y='68' font-size='24' fill='%233730a3'%3ESVG art%3C/text%3E%3C/svg%3E" alt="An inline SVG illustration with a purple circle and the words SVG art">
                </picture>
                <svg class="inline-icon" viewBox="0 0 100 60" role="img" aria-label="Blue geometric SVG illustration">
                    <rect x="3" y="3" width="94" height="54" rx="12" fill="#dbeafe"/>
                    <circle cx="32" cy="30" r="15" fill="#4f46e5"/>
                    <path d="M52 42 L68 14 L87 42 Z" fill="#0f9f91"/>
                </svg>
                <p class="muted">The image is a data URL, so it works without an external image service.</p>
            </article>
            <article class="demo-card">
                <h3>Canvas and embedded content</h3>
                <canvas id="drawingCanvas" width="640" height="180">Your browser does not support canvas.</canvas>
                <iframe class="embed-demo" title="Example embedded document" loading="lazy" srcdoc="&lt;main style='font:16px system-ui;padding:12px;color:%231e293b'&gt;&lt;strong&gt;An iframe&lt;/strong&gt;&lt;p&gt;This content is embedded using srcdoc.&lt;/p&gt;&lt;/main&gt;"></iframe>
                <p class="muted">Canvas graphics are drawn in JavaScript; an iframe embeds another document.</p>
            </article>
            <article class="demo-card">
                <h3>Dialog and template</h3>
                <p>Use a native dialog for focused tasks and a template as reusable markup.</p>
                <button class="button button-primary" type="button" id="openDemoDialog">Open dialog</button>
                <dialog id="demoDialog" class="demo-dialog">
                    <form method="dialog">
                        <p class="eyebrow">NATIVE HTML DIALOG</p>
                        <h3>Nice work!</h3>
                        <p>This dialog can be opened and closed with built-in browser behavior.</p>
                        <button class="button button-primary" type="submit">Close dialog</button>
                    </form>
                </dialog>
                <p class="muted">A task template is also used below to create new list items.</p>
            </article>
        </div>
    </section>

    <section id="form-demo" class="section-block form-section">
        <div class="section-heading">
            <div><p class="eyebrow">FORM CONTROLS</p><h2>Try the inputs</h2></div>
            <span class="pill">Accessible labels</span>
        </div>
        <form id="profileForm" class="demo-form">
            <div class="form-grid">
                <div class="field">
                    <label for="fullName">Name</label>
                    <input id="fullName" name="fullName" type="text" placeholder="Ada Lovelace" autocomplete="name" list="suggestedNames" required minlength="2">
                    <datalist id="suggestedNames"><option value="Ada Lovelace"><option value="Grace Hopper"><option value="Alan Turing"></datalist>
                </div>
                <div class="field">
                    <label for="emailAddress">Email</label>
                    <input id="emailAddress" name="email" type="email" placeholder="ada@example.com" autocomplete="email" required>
                </div>
                <div class="field">
                    <label for="topic">Choose a topic</label>
                    <select id="topic" name="topic">
                        <option value="html">HTML structure</option>
                        <option value="css">CSS design</option>
                        <option value="js">JavaScript behavior</option>
                    </select>
                </div>
                <div class="field">
                    <label for="confidence">Confidence: <output id="confidenceValue" for="confidence">6</output>/10</label>
                    <input id="confidence" name="confidence" type="range" min="1" max="10" value="6">
                </div>
                <fieldset class="field choice-field">
                    <legend>Preferred practice</legend>
                    <label><input type="radio" name="practice" value="reading" checked> Reading</label>
                    <label><input type="radio" name="practice" value="building"> Building</label>
                    <label><input type="checkbox" id="newsletter" name="newsletter"> Send me learning tips</label>
                </fieldset>
            </div>
            <div class="field">
                <label for="notes">Notes</label>
                <textarea id="notes" name="notes" rows="3" maxlength="240" placeholder="What would you like to build?"></textarea>
            </div>
            <div class="form-actions">
                <button class="button button-primary" type="submit">Check form</button>
                <button class="button button-secondary" type="reset">Reset fields</button>
                <p id="formMessage" class="form-message" role="status" aria-live="polite">Your form feedback appears here.</p>
            </div>
        </form>
    </section>

    <section id="data-demo" class="section-block">
        <div class="section-heading">
            <div><p class="eyebrow">TABLE AND DOM</p><h2>Example data</h2></div>
            <span class="pill">Semantic table</span>
        </div>
        <div class="table-wrap">
            <table>
                <caption>Learning modules and their status</caption>
                <thead><tr><th scope="col">Module</th><th scope="col">Focus</th><th scope="col">Status</th></tr></thead>
                <tbody>
                    <tr><th scope="row">HTML</th><td>Structure and forms</td><td><span class="status status-done">Ready</span></td></tr>
                    <tr><th scope="row">CSS</th><td>Grid, flexbox, responsive UI</td><td><span class="status status-progress">Practice</span></td></tr>
                    <tr><th scope="row">JavaScript</th><td>Events and DOM updates</td><td><span class="status status-next">Next</span></td></tr>
                </tbody>
                <tfoot><tr><td colspan="3">Three small examples in one starter project.</td></tr></tfoot>
            </table>
        </div>
        <div class="task-panel">
            <div><h3>Mini task list</h3><p class="muted">Add an item to practise DOM creation and event handling.</p></div>
            <form id="taskForm" class="task-form">
                <label class="visually-hidden" for="taskInput">New task</label>
                <input id="taskInput" name="task" type="text" placeholder="Add a small task…" maxlength="80" required>
                <button class="button button-primary" type="submit">Add</button>
            </form>
            <ul id="taskList" class="task-list">
                <li><span>Explore the CSS variables</span><button type="button" data-remove-task aria-label="Remove task">×</button></li>
                <li><span>Change a button style</span><button type="button" data-remove-task aria-label="Remove task">×</button></li>
            </ul>
            <template id="taskTemplate">
                <li><span></span><button type="button" data-remove-task aria-label="Remove task">×</button></li>
            </template>
        </div>
    </section>

    <footer class="page-footer">
        <p><strong>Keep experimenting.</strong> Inspect each element, change a property, and watch the preview update.</p>
        <a href="#top">Back to top ↑</a>
        <small>Demo uses <var>HTML</var> + <var>CSS</var> + <var>JavaScript</var>.</small>
    </footer>
</main>`;

        const DEFAULT_CSS = `:root {
    --color-ink: #16233a;
    --color-muted: #62718a;
    --color-primary: #4f46e5;
    --color-primary-dark: #3730a3;
    --color-accent: #0f9f91;
    --color-surface: #ffffff;
    --color-canvas: #f3f6fc;
    --color-border: #dbe3f0;
    --radius-small: 0.6rem;
    --radius-card: 1.2rem;
    --shadow-card: 0 16px 45px rgb(22 35 58 / 8%);
    color-scheme: light;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 1rem;
}

body {
    margin: 0;
    padding: clamp(12px, 3vw, 36px);
    min-height: 100vh;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.65;
    color: var(--color-ink);
    background:
        radial-gradient(circle at 10% 0%, rgb(79 70 229 / 10%), transparent 32rem),
        var(--color-canvas);
}

.demo-shell {
    width: min(100%, 1120px);
    margin-inline: auto;
}

.hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: clamp(24px, 5vw, 56px);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 1.6rem;
    color: #fff;
    background: linear-gradient(125deg, #24205f, #4f46e5 58%, #0f9f91);
    box-shadow: 0 22px 55px rgb(55 48 163 / 22%);
}

.hero::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 18rem;
    aspect-ratio: 1;
    inset: auto -5rem -10rem auto;
    border: 1px solid rgb(255 255 255 / 22%);
    border-radius: 50%;
    box-shadow: 0 0 0 2.5rem rgb(255 255 255 / 5%), 0 0 0 5rem rgb(255 255 255 / 4%);
}

.eyebrow {
    margin: 0 0 0.4rem;
    color: var(--color-accent);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
}

.hero .eyebrow { color: #a7f3e9; }
.hero h1 {
    max-width: 760px;
    margin: 0;
    font-size: clamp(2rem, 5.5vw, 4rem);
    line-height: 1.06;
    letter-spacing: -0.045em;
    text-wrap: balance;
}

.hero-copy {
    max-width: 660px;
    color: #e5e7ff;
    font-size: clamp(1rem, 2vw, 1.16rem);
    margin: 1.1rem 0 1.4rem;
}

.hero-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
}

.hero-nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.55rem 0.9rem;
    border: 1px solid rgb(255 255 255 / 30%);
    border-radius: 999px;
    color: #fff;
    text-decoration: none;
    background: rgb(255 255 255 / 10%);
    transition: background 180ms ease, transform 180ms ease;
}

.hero-nav a:hover {
    background: rgb(255 255 255 / 20%);
    transform: translateY(-2px);
}

.intro-panel {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(180px, 0.7fr);
    align-items: center;
    gap: clamp(16px, 4vw, 34px);
    margin-block: 18px;
    padding: clamp(20px, 4vw, 38px);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
}

h2, h3, p { overflow-wrap: anywhere; }
h2 { margin: 0; font-size: clamp(1.4rem, 3vw, 2rem); line-height: 1.2; }
h3 { margin: 0.8rem 0 0.55rem; font-size: 1.15rem; }
p { margin-block: 0.7rem; }
a { color: var(--color-primary); }
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
    outline: 3px solid #f59e0b;
    outline-offset: 3px;
}
::selection { color: #fff; background: var(--color-primary); }

.artwork {
    position: relative;
    display: grid;
    min-height: 180px;
    margin: 0;
    place-items: center;
    overflow: hidden;
    border-radius: 1rem;
    background: linear-gradient(135deg, #e0e7ff, #ccfbf1);
}
.artwork-orbit {
    position: absolute;
    width: 130px;
    aspect-ratio: 1;
    border: 2px dashed #818cf8;
    border-radius: 50%;
    animation: orbit 18s linear infinite;
}
.artwork-core {
    display: grid;
    width: 96px;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 28px;
    color: #fff;
    background: linear-gradient(145deg, var(--color-primary), var(--color-accent));
    box-shadow: 0 14px 24px rgb(55 48 163 / 22%);
    font: 800 1.6rem ui-monospace, monospace;
    transform: rotate(-6deg);
}
.artwork figcaption { position: absolute; inset: auto 0 8px; text-align: center; color: #3730a3; font-size: 0.75rem; }

.section-block { margin-block: 28px; }
.section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 13px;
}
.pill {
    flex: 0 0 auto;
    padding: 0.32rem 0.7rem;
    border-radius: 999px;
    color: #3730a3;
    background: #e0e7ff;
    font-size: 0.75rem;
    font-weight: 800;
}
.card-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; align-items: stretch; }
.demo-card {
    min-width: 0;
    padding: clamp(17px, 2.5vw, 26px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
    box-shadow: var(--shadow-card);
    transition: border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}
.demo-card:hover { border-color: #a5b4fc; transform: translateY(-3px); box-shadow: 0 20px 48px rgb(22 35 58 / 12%); }
.icon-tile {
    display: inline-grid;
    width: 42px;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 13px;
    color: var(--color-primary-dark);
    background: #e0e7ff;
    font-weight: 900;
    font-size: 0.85rem;
}
.muted { color: var(--color-muted); font-size: 0.9rem; }
code, pre, kbd, samp {
    font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
}
:not(pre) > code { padding: 0.12rem 0.35rem; border-radius: 0.35rem; color: #3730a3; background: #eef2ff; }
blockquote {
    margin: 1rem 0;
    padding: 0.8rem 1rem;
    border-left: 3px solid var(--color-accent);
    border-radius: 0 var(--radius-small) var(--radius-small) 0;
    background: #f0fdfa;
    color: #285b5a;
}
pre {
    overflow: auto;
    padding: 0.9rem;
    border: 1px solid #293853;
    border-radius: var(--radius-small);
    background: #111827;
    color: #dbeafe;
    font-size: 0.82rem;
}
kbd {
    display: inline-block;
    padding: 0.1rem 0.38rem;
    border: 1px solid #cad5e5;
    border-bottom-width: 3px;
    border-radius: 0.35rem;
    background: #f8fafc;
    color: #334155;
    font-size: 0.78rem;
}

details {
    margin-block: 0.75rem;
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-small);
    background: #f8faff;
}
summary { color: var(--color-primary-dark); font-weight: 750; cursor: pointer; }
.meter-label { display: block; margin-top: 0.7rem; color: var(--color-muted); font-size: 0.83rem; }
progress, meter { width: 100%; height: 0.8rem; accent-color: var(--color-accent); }

.demo-form {
    padding: clamp(18px, 3vw, 30px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
    box-shadow: var(--shadow-card);
}
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.field { display: flex; flex-direction: column; gap: 0.45rem; min-width: 0; margin: 0 0 15px; }
.field > label, legend { color: var(--color-ink); font-weight: 750; font-size: 0.9rem; }
.field input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), .field select, .field textarea,
.task-form input {
    width: 100%;
    min-width: 0;
    padding: 0.72rem 0.82rem;
    border: 1px solid #cbd5e1;
    border-radius: var(--radius-small);
    background: #fbfdff;
    color: var(--color-ink);
    font: inherit;
    transition: border-color 160ms ease, box-shadow 160ms ease;
}
.field input:focus, .field select:focus, .field textarea:focus, .task-form input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgb(79 70 229 / 12%);
    outline: none;
}
.field input[type="range"] { width: 100%; accent-color: var(--color-primary); }
.field textarea { resize: vertical; }
.choice-field {
    padding: 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-small);
}
.choice-field legend { padding-inline: 5px; }
.choice-field label { display: flex; align-items: center; gap: 0.5rem; margin-top: 5px; font-weight: 500; }
.choice-field input { accent-color: var(--color-primary); }
.form-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 42px;
    padding: 0.65rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.75rem;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
    transition: background 150ms ease, transform 150ms ease, box-shadow 150ms ease;
}
.button:active { transform: translateY(1px) scale(0.99); }
.button-primary { color: #fff; background: var(--color-primary); box-shadow: 0 6px 14px rgb(79 70 229 / 18%); }
.button-primary:hover { background: var(--color-primary-dark); }
.button-secondary { color: var(--color-ink); background: #fff; border-color: var(--color-border); }
.button-secondary:hover { background: #f1f5f9; }
.form-message { flex: 1 1 100%; min-height: 1.5em; color: var(--color-muted); margin: 0; }

.table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-card); background: #fff; box-shadow: var(--shadow-card); }
table { width: 100%; border-collapse: collapse; text-align: left; }
caption { padding: 14px; color: var(--color-muted); text-align: left; font-weight: 700; }
th, td { padding: 12px 15px; border-top: 1px solid #e6ebf3; vertical-align: top; }
thead { color: #fff; background: #26365a; }
tbody tr:nth-child(even) { background: #f7f9fd; }
tbody tr:hover { background: #eef2ff; }
tfoot { color: var(--color-muted); font-size: 0.86rem; background: #f8fafc; }
.status { display: inline-flex; padding: 0.2rem 0.55rem; border-radius: 999px; font-size: 0.78rem; font-weight: 800; }
.status-done { color: #166534; background: #dcfce7; }
.status-progress { color: #92400e; background: #fef3c7; }
.status-next { color: #3730a3; background: #e0e7ff; }

.task-panel { display: grid; grid-template-columns: minmax(180px, 0.8fr) minmax(0, 1.2fr); gap: 18px; align-items: start; margin-top: 16px; padding: 22px; border: 1px solid var(--color-border); border-radius: var(--radius-card); background: #fff; box-shadow: var(--shadow-card); }
.task-panel h3 { margin-top: 0; }
.task-form { display: flex; gap: 8px; min-width: 0; }
.task-list { grid-column: 2; display: grid; gap: 7px; margin: 0; padding: 0; list-style: none; }
.task-list li { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-small); background: #f8faff; }
.task-list li span { overflow-wrap: anywhere; }
.task-list li button { flex: 0 0 30px; width: 30px; height: 30px; border: 0; border-radius: 9px; color: #991b1b; background: #fee2e2; font-size: 1.1rem; cursor: pointer; }
.task-list li button:hover { background: #fecaca; }

.page-footer { display: grid; grid-template-columns: 1fr auto; gap: 8px 20px; align-items: center; margin-top: 34px; padding: 22px; border-top: 1px solid var(--color-border); color: var(--color-muted); }
.page-footer p { margin: 0; }
.page-footer small { grid-column: 1 / -1; }
.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

.alternate-theme {
    --color-primary: #0f766e;
    --color-primary-dark: #115e59;
    --color-accent: #c026d3;
}
.form-message.is-success { color: #047857; font-weight: 800; }
.sample-image { display: block; width: 100%; border-radius: 0.8rem; margin-block: 0.7rem; }
.inline-icon { display: block; width: 100%; max-height: 70px; margin-block: 0.6rem; }
#drawingCanvas { display: block; width: 100%; height: auto; border: 1px solid var(--color-border); border-radius: 0.8rem; background: #f8fafc; }
.embed-demo { width: 100%; min-height: 100px; margin-top: 10px; border: 1px solid var(--color-border); border-radius: 0.8rem; background: #fff; }
.demo-dialog { width: min(420px, calc(100% - 28px)); padding: 24px; border: 1px solid var(--color-border); border-radius: 1.2rem; color: var(--color-ink); box-shadow: 0 25px 80px rgb(15 23 42 / 25%); }
.demo-dialog::backdrop { background: rgb(15 23 42 / 55%); backdrop-filter: blur(3px); }
.demo-dialog form { display: grid; gap: 12px; }
@keyframes orbit { to { transform: rotate(360deg); } }
@media (max-width: 780px) {
    .intro-panel { grid-template-columns: 1fr; }
    .artwork { min-height: 145px; }
    .card-grid { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; gap: 6px; }
    .task-panel { grid-template-columns: 1fr; }
    .task-list { grid-column: 1; }
    .task-form .button { flex-shrink: 0; }
}
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
    }
}`;

        const DEFAULT_JS = `// DOM selection, state, validation, and event handling examples.
const counterButton = document.querySelector("#counterButton");
const counterValue = document.querySelector("#counterValue");
let clickCount = 0;

counterButton.addEventListener("click", () => {
    clickCount += 1;
    counterValue.textContent = String(clickCount);
    counterButton.setAttribute("aria-label", "Clicked " + clickCount + " times");
});

const confidence = document.querySelector("#confidence");
const confidenceValue = document.querySelector("#confidenceValue");
confidence.addEventListener("input", (event) => {
    confidenceValue.value = event.currentTarget.value;
});

const profileForm = document.querySelector("#profileForm");
const formMessage = document.querySelector("#formMessage");
profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!profileForm.checkValidity()) {
        profileForm.reportValidity();
        return;
    }

    const formData = new FormData(profileForm);
    const profile = Object.fromEntries(formData.entries());
    formMessage.textContent = "Thanks, " + profile.fullName + "! Topic: " + profile.topic + ".";
    formMessage.classList.add("is-success");
});
profileForm.addEventListener("reset", () => {
    formMessage.textContent = "Your form feedback appears here.";
    formMessage.classList.remove("is-success");
    setTimeout(() => { confidenceValue.value = confidence.value; }, 0);
});

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    const taskTemplate = document.querySelector("#taskTemplate");
    const item = taskTemplate.content.firstElementChild.cloneNode(true);
    const label = item.querySelector("span");
    const removeButton = item.querySelector("[data-remove-task]");
    label.textContent = title; // textContent avoids treating user input as HTML.
    removeButton.setAttribute("aria-label", "Remove " + title);
    taskList.append(item);
    taskInput.value = "";
    taskInput.focus();
});

taskList.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-task]");
    if (!removeButton) return;
    removeButton.closest("li").remove();
});

document.querySelectorAll("[data-remove-task]").forEach((button) => {
    button.title = "Remove this task";
});

const themeToggle = document.createElement("button");
themeToggle.type = "button";
themeToggle.className = "button button-secondary theme-toggle";
themeToggle.textContent = "Toggle accent";
themeToggle.setAttribute("aria-pressed", "false");
document.querySelector(".section-heading").append(themeToggle);
themeToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("alternate-theme");
    themeToggle.setAttribute("aria-pressed", String(enabled));
});

const drawingCanvas = document.querySelector("#drawingCanvas");
const drawingContext = drawingCanvas.getContext("2d");
const bars = [0.42, 0.75, 0.58, 0.92, 0.66];
const barColors = ["#4f46e5", "#6366f1", "#0f9f91", "#818cf8", "#14b8a6"];
bars.forEach((value, index) => {
    const barHeight = value * 125;
    drawingContext.fillStyle = barColors[index];
    drawingContext.beginPath();
    drawingContext.roundRect(36 + index * 118, 145 - barHeight, 62, barHeight, 8);
    drawingContext.fill();
});
drawingContext.fillStyle = "#475569";
drawingContext.font = "18px system-ui";
drawingContext.fillText("Canvas chart", 36, 25);

const demoDialog = document.querySelector("#demoDialog");
document.querySelector("#openDemoDialog").addEventListener("click", () => {
    if (typeof demoDialog.showModal === "function") demoDialog.showModal();
    else demoDialog.setAttribute("open", "");
});

console.info("Starter project ready", {
    modules: ["HTML", "CSS", "JavaScript"],
    formValid: profileForm.checkValidity()
});`;

        // ==========================================
        //  کتابخانه‌های آماده (Presets)
        //  ۸۵ کتابخانه: ۳۰ اصلی + ۳۰ جدید (آفیس، محاسبات، کاربردی) + ۲۵ کتابخانه تکمیلی
        // ==========================================
        const PRESETS = [
            // ---------- ۳۰ کتابخانه اصلی ----------
            { name: 'Bootstrap 5 CSS', type: 'css', desc: 'Popular CSS framework', cdn: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
            { name: 'Animate.css', type: 'css', desc: 'Ready-made animations', cdn: 'https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css' },
            { name: 'Tailwind CSS', type: 'js', desc: 'Utility-first (Play CDN script)', cdn: 'https://cdn.tailwindcss.com/3.4.16' },
            { name: 'Font Awesome 6', type: 'css', desc: 'Vector icons', cdn: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css' },
            { name: 'Normalize.css', type: 'css', desc: 'CSS reset', cdn: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css' },
            { name: 'jQuery 3.7', type: 'js', desc: 'DOM library', cdn: 'https://code.jquery.com/jquery-3.7.1.min.js' },
            { name: 'Bootstrap 5 JS', type: 'js', desc: 'Interactive components', cdn: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' },
            { name: 'Lodash', type: 'js', desc: 'Utility functions', cdn: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js' },
            { name: 'Axios', type: 'js', desc: 'HTTP requests', cdn: 'https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js' },
            { name: 'React 18', type: 'js', desc: 'UI library', cdn: 'https://unpkg.com/react@18/umd/react.production.min.js' },
            { name: 'Vue 3', type: 'js', desc: 'UI framework', cdn: 'https://cdn.jsdelivr.net/npm/vue@3.4.38/dist/vue.global.prod.js' },
            { name: 'Chart.js', type: 'js', desc: 'Charts', cdn: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js' },
            { name: 'D3.js', type: 'js', desc: 'Visualization', cdn: 'https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js' },
            { name: 'Bulma', type: 'css', desc: 'Modern and lightweight', cdn: 'https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css' },
            { name: 'UIkit', type: 'css', desc: 'Lightweight and modular', cdn: 'https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/css/uikit.min.css' },
            { name: 'Foundation', type: 'css', desc: 'Professional', cdn: 'https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css' },
            { name: 'Materialize CSS', type: 'css', desc: 'Material Design', cdn: 'https://cdn.jsdelivr.net/npm/materialize-css@1.0.0/dist/css/materialize.min.css' },
            { name: 'Pure CSS', type: 'css', desc: 'Minimal', cdn: 'https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css' },
            { name: 'Alpine.js', type: 'js', desc: 'Lightweight and simple', cdn: 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js' },
            { name: 'SweetAlert2', type: 'js', desc: 'Beautiful alerts', cdn: 'https://cdn.jsdelivr.net/npm/sweetalert2@11.12.0/dist/sweetalert2.all.min.js' },
            { name: 'Swiper', type: 'js', desc: 'Touch slider', cdn: 'https://cdn.jsdelivr.net/npm/swiper@11.1.4/swiper-bundle.min.js' },
            { name: 'GSAP', type: 'js', desc: 'Professional animations', cdn: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js' },
            { name: 'AOS', type: 'js', desc: 'Scroll animations', cdn: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js' },
            { name: 'Toastify JS', type: 'js', desc: 'Simple notifications', cdn: 'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js' },
            { name: 'Day.js', type: 'js', desc: 'Lightweight date handling', cdn: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js' },
            { name: 'Moment.js', type: 'js', desc: 'Date and time', cdn: 'https://cdn.jsdelivr.net/npm/moment@2.30.1/min/moment.min.js' },
            { name: 'Clipboard.js', type: 'js', desc: 'Clipboard copying', cdn: 'https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js' },
            { name: 'CountUp.js', type: 'js', desc: 'Animated counters', cdn: 'https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.min.js' },
            { name: 'Typed.js', type: 'js', desc: 'Typing effects', cdn: 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js' },
            { name: 'Lottie', type: 'js', desc: 'JSON animations', cdn: 'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js' },
            // ---------- ۳۰ کتابخانه جدید (آفیس، محاسبات، کاربردی) ----------
            // --- آفیس و اسناد (۱۰) ---
            { name: 'SheetJS (xlsx)', type: 'js', desc: 'Read/write Excel and CSV', cdn: 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js' },
            { name: 'ExcelJS', type: 'js', desc: 'Excel file handling', cdn: 'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js' },
            { name: 'PDF.js', type: 'js', desc: 'PDF viewer', cdn: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.min.js' },
            { name: 'jsPDF', type: 'js', desc: 'Create PDFs in the browser', cdn: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js' },
            { name: 'pdfmake', type: 'js', desc: 'Create PDFs from JSON', cdn: 'https://cdn.jsdelivr.net/npm/pdfmake@0.2.10/build/pdfmake.min.js' },
            { name: 'docx', type: 'js', desc: 'Create Word documents', cdn: 'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js' },
            { name: 'docx-preview', type: 'js', desc: 'Preview Word documents in the browser', cdn: 'https://cdn.jsdelivr.net/npm/docx-preview@0.3.3/dist/docx-preview.min.js' },
            { name: 'mammoth', type: 'js', desc: 'Convert Word to HTML', cdn: 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js' },
            { name: 'PDF-LIB', type: 'js', desc: 'Create and edit PDFs', cdn: 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js' },
            { name: 'docxtemplater', type: 'js', desc: 'Fill Word templates', cdn: 'https://cdn.jsdelivr.net/npm/docxtemplater@3.61.2/build/docxtemplater.js' },
            // --- محاسبات (۱۰) ---
            { name: 'math.js', type: 'js', desc: 'Advanced math calculations', cdn: 'https://cdn.jsdelivr.net/npm/mathjs@13.2.0/lib/browser/math.js' },
            { name: 'decimal.js', type: 'js', desc: 'Precise decimal calculations', cdn: 'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/decimal.min.js' },
            { name: 'expr-eval', type: 'js', desc: 'Evaluate mathematical expressions', cdn: 'https://cdn.jsdelivr.net/npm/expr-eval@2.0.2/dist/bundle.min.js' },
            { name: 'currency.js', type: 'js', desc: 'Precise currency calculations', cdn: 'https://cdn.jsdelivr.net/npm/currency.js@2.0.3/dist/currency.min.js' },
            { name: 'numeral.js', type: 'js', desc: 'Format numbers and currencies', cdn: 'https://cdn.jsdelivr.net/npm/numeral@2.0.6/numeral.min.js' },
            { name: 'convert', type: 'js', desc: 'Convert measurement units', cdn: 'https://cdn.jsdelivr.net/npm/convert@5.9.0/dist/index.js' },
            { name: 'date-fns', type: 'js', desc: 'Useful date functions', cdn: 'https://cdn.jsdelivr.net/npm/date-fns@4.1.0/cdn.min.js' },
            { name: 'Luxon', type: 'js', desc: 'Dates with time zones', cdn: 'https://cdn.jsdelivr.net/npm/luxon@3.5.0/build/global/luxon.min.js' },
            { name: 'big.js', type: 'js', desc: 'Big-number arithmetic', cdn: 'https://cdn.jsdelivr.net/npm/big.js@6.2.2/big.min.js' },
            { name: 'Fraction.js', type: 'js', desc: 'Fraction calculations', cdn: 'https://cdn.jsdelivr.net/npm/fraction.js@4.3.7/fraction.min.js' },
            // --- کاربردی (۱۰) ---
            { name: 'PapaParse', type: 'js', desc: 'Fast CSV parsing', cdn: 'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js' },
            { name: 'JSZip', type: 'js', desc: 'Create and read ZIP files', cdn: 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js' },
            { name: 'SortableJS', type: 'js', desc: 'Drag and drop lists', cdn: 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js' },
            { name: 'Tabulator', type: 'js', desc: 'Advanced data tables', cdn: 'https://cdn.jsdelivr.net/npm/tabulator-tables@6.3.1/dist/js/tabulator.min.js' },
            { name: 'QRCode.js', type: 'js', desc: 'Generate QR codes', cdn: 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js' },
            { name: 'JsBarcode', type: 'js', desc: 'Generate barcodes', cdn: 'https://cdn.jsdelivr.net/npm/jsbarcode@3.12.1/dist/JsBarcode.all.min.js' },
            { name: 'CryptoJS', type: 'js', desc: 'Encryption and hashing', cdn: 'https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.min.js' },
            { name: 'DOMPurify', type: 'js', desc: 'Sanitize HTML against XSS', cdn: 'https://cdn.jsdelivr.net/npm/dompurify@3.1.7/dist/purify.min.js' },
            { name: 'Tesseract.js', type: 'js', desc: 'Extract text from images (OCR)', cdn: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js' },
            { name: 'Marked', type: 'js', desc: 'Convert Markdown to HTML', cdn: 'https://cdn.jsdelivr.net/npm/marked@15.0.0/marked.min.js' },
            // ---------- Additional visual, UI, data and utility libraries ----------
            { name: 'Prism.js', type: 'js', desc: 'Syntax highlighting core', cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js' },
            { name: 'Prism.css', type: 'css', desc: 'Syntax highlighting theme', cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css' },
            { name: 'Highlight.js', type: 'js', desc: 'Code syntax highlighting', cdn: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/highlight.min.js' },
            { name: 'Highlight.js CSS', type: 'css', desc: 'Code highlight theme', cdn: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/styles/github-dark.min.css' },
            { name: 'Bootstrap Icons', type: 'css', desc: 'Bootstrap icon font', cdn: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' },
            { name: 'Remix Icon', type: 'css', desc: 'Large icon collection', cdn: 'https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css' },
            { name: 'ECharts', type: 'js', desc: 'Interactive data charts', cdn: 'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js' },
            { name: 'ApexCharts', type: 'js', desc: 'Interactive charts', cdn: 'https://cdn.jsdelivr.net/npm/apexcharts@3.54.1/dist/apexcharts.min.js' },
            { name: 'Leaflet CSS', type: 'css', desc: 'Interactive map styles', cdn: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css' },
            { name: 'Leaflet JS', type: 'js', desc: 'Interactive maps', cdn: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js' },
            { name: 'Flatpickr CSS', type: 'css', desc: 'Date picker styles', cdn: 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css' },
            { name: 'Flatpickr JS', type: 'js', desc: 'Date and time picker', cdn: 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js' },
            { name: 'Choices.js CSS', type: 'css', desc: 'Enhanced select styles', cdn: 'https://cdn.jsdelivr.net/npm/choices.js@11.0.2/public/assets/styles/choices.min.css' },
            { name: 'Choices.js', type: 'js', desc: 'Enhanced select controls', cdn: 'https://cdn.jsdelivr.net/npm/choices.js@11.0.2/public/assets/scripts/choices.min.js' },
            { name: 'Fuse.js', type: 'js', desc: 'Fuzzy search for lists', cdn: 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js' },
            { name: 'FileSaver.js', type: 'js', desc: 'Save files from browser', cdn: 'https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js' },
            { name: 'html2canvas', type: 'js', desc: 'Capture DOM as image', cdn: 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js' },
            { name: 'Cropper.js CSS', type: 'css', desc: 'Image cropper styles', cdn: 'https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.css' },
            { name: 'Cropper.js', type: 'js', desc: 'Crop images in browser', cdn: 'https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.js' },
            { name: 'p5.js', type: 'js', desc: 'Creative coding and canvas', cdn: 'https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js' },
            { name: 'Anime.js', type: 'js', desc: 'JavaScript animations', cdn: 'https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js' },
            { name: 'FullCalendar', type: 'js', desc: 'Calendar and scheduling UI', cdn: 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js' },
            { name: 'Three.js', type: 'js', desc: '3D graphics with WebGL', cdn: 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js' },
            { name: 'Pikaday CSS', type: 'css', desc: 'Lightweight date picker theme', cdn: 'https://cdn.jsdelivr.net/npm/pikaday@1.8.2/css/pikaday.css' },
            { name: 'Pikaday JS', type: 'js', desc: 'Lightweight date picker', cdn: 'https://cdn.jsdelivr.net/npm/pikaday@1.8.2/pikaday.js' }
        ];

        const LANGS = ['html', 'css', 'js'];

        const outputFrame = document.getElementById('output');
        const editorsBox  = document.getElementById('editors');
        const toast       = document.getElementById('toast');
        const tabButtons  = [];
        const dirtyBadge  = document.getElementById('dirtyBadge');
        const libsPanel   = document.getElementById('libsPanel');
        const editors     = {};

        const STORAGE_KEY = 'html-editor-code-v2';
        const PROJECT_KEY = 'html-editor-project-v3';
        const PROJECT_RECOVERY_KEY = 'html-editor-project-v3-recovery';
        const FONT_KEY    = 'html-editor-font';
        const TAB_KEY     = 'html-editor-tab';
        const LIBS_KEY    = 'html-editor-libs-v1';
        const SPLIT_KEY   = 'html-editor-split-pos';

        let previewTimer = null;
        let autoSaveTimer = null;
        let dirtyResetTimer = null;
        let project = null;
        let projectLoadWarning = '';
        let projectRecoveryAvailable = false;
        let libraries = [];
        let libraryDownloadController = null;
        let libraryDownloadRequest = 0;
        let activeTab = 'html';
        let dirty = false;

        function setDirty(value) {
            const next = !!value;
            const changed = next !== dirty;
            dirty = next;
            dirtyBadge.hidden = !dirty;
            // Re-render the file list only when the state changes, not on every keystroke.
            if (changed && project) renderFileExplorer();
        }
        window.addEventListener('beforeunload', function (e) {
            if (dirty) { e.preventDefault(); e.returnValue = ''; }
        });

        function storageGet(key) {
            try { return localStorage.getItem(key); } catch (e) { return null; }
        }
        function storageSet(key, value) {
            try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
        }

        function escHtml(s) {
            return String(s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }
        function makeId() {
            return 'f_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
        }

        // ==========================================
        //  Project
        // ==========================================
        const LEGACY_STARTER_DEFAULTS = {
            html: [
                '<h1>Hello, World!</h1>',
                '<div class="card">',
                '    <p>This is a sample card.</p>',
                '    <button id="btn">Click Me</button>',
                '</div>'
            ].join('\n'),
            css: [
                'body {',
                '    font-family: Tahoma, sans-serif;',
                '    padding: 30px;',
                '    background-color: #f4f4f4;',
                '}',
                '',
                'h1 {',
                '    color: #2c3e50;',
                '    text-align: center;',
                '}',
                '',
                '.card {',
                '    background: white;',
                '    padding: 20px;',
                '    border-radius: 10px;',
                '    box-shadow: 0 4px 10px rgba(0,0,0,0.1);',
                '    max-width: 400px;',
                '    margin: 20px auto;',
                '}',
                '',
                'button {',
                '    background: #3498db;',
                '    color: white;',
                '    border: none;',
                '    padding: 10px 20px;',
                '    border-radius: 5px;',
                '    cursor: pointer;',
                '}',
                '',
                'button:hover {',
                '    background: #2980b9;',
                '}'
            ].join('\n'),
            js: [
                "document.getElementById('btn').addEventListener('click', function () {",
                "    alert('It works!');",
                '});'
            ].join('\n')
        };

        function isUntouchedLegacyStarter(files) {
            const names = { html: 'index.html', css: 'style.css', js: 'script.js' };
            return ['html', 'css', 'js'].every(function(lang) {
                const file = files.find(function(item) { return item.type === lang; });
                return !!file && file.name === names[lang] &&
                    file.content === LEGACY_STARTER_DEFAULTS[lang];
            });
        }

        function createDefaultProject() {
            const ids = { html: makeId(), css: makeId(), js: makeId() };
            return {
                files: [
                    { id: ids.html, name: 'index.html', type: 'html', content: DEFAULT_HTML },
                    { id: ids.css,  name: 'style.css',  type: 'css',  content: DEFAULT_CSS },
                    { id: ids.js,   name: 'script.js',  type: 'js',   content: DEFAULT_JS }
                ],
                activeFileId: ids.html,
                lastActiveByLang: { html: ids.html, css: ids.css, js: ids.js },
                documentTitle: 'My Page',
                headExtras: ''
            };
        }

        function loadProject() {
            const rawProject = storageGet(PROJECT_KEY);
            try {
                if (rawProject) {
                    const p = JSON.parse(rawProject);
                    if (p && Array.isArray(p.files)) {
                        const seenIds = new Set();
                        const validFiles = p.files
                            .filter(function(file) {
                                return file && typeof file === 'object' &&
                                    LANGS.includes(file.type) && typeof file.content === 'string';
                            })
                            .map(function(file) {
                                let id = (typeof file.id === 'string' && file.id) ? file.id : makeId();
                                if (seenIds.has(id)) id = makeId();
                                seenIds.add(id);
                                const name = (typeof file.name === 'string' && file.name.trim())
                                    ? file.name.trim().slice(0, 40)
                                    : 'untitled.' + file.type;
                                return { id: id, name: name, type: file.type, content: file.content };
                            });

                        if (validFiles.length) {
                            if (isUntouchedLegacyStarter(validFiles)) {
                                // Keep a recoverable copy, then upgrade only the pristine old starter.
                                storageSet(PROJECT_RECOVERY_KEY, rawProject);
                                const upgraded = createDefaultProject();
                                storageSet(PROJECT_KEY, JSON.stringify(upgraded));
                                return upgraded;
                            }
                            const requestedLast = p.lastActiveByLang && typeof p.lastActiveByLang === 'object'
                                ? p.lastActiveByLang : {};
                            const lastActiveByLang = {};
                            LANGS.forEach(function(lang) {
                                const candidate = validFiles.find(function(file) {
                                    return file.id === requestedLast[lang] && file.type === lang;
                                }) || validFiles.find(function(file) { return file.type === lang; });
                                lastActiveByLang[lang] = candidate ? candidate.id : null;
                            });
                            const active = validFiles.find(function(file) { return file.id === p.activeFileId; });
                            return {
                                files: validFiles,
                                activeFileId: active ? active.id : validFiles[0].id,
                                lastActiveByLang: lastActiveByLang,
                                documentTitle: typeof p.documentTitle === 'string' ? p.documentTitle.slice(0, 200) : 'My Page',
                                headExtras: typeof p.headExtras === 'string' ? p.headExtras : ''
                            };
                        }
                    }
                }
            } catch (e) {}

            // Preserve unreadable or structurally invalid project data before a later
            // autosave can replace it with the fallback starter project.
            if (rawProject) {
                projectRecoveryAvailable = storageSet(PROJECT_RECOVERY_KEY, rawProject);
                projectLoadWarning = projectRecoveryAvailable
                    ? 'Saved project data could not be loaded. Download the recovery copy before editing.'
                    : 'Saved project data could not be loaded, and the browser could not preserve a recovery copy.';
            }

            try {
                const old = storageGet(STORAGE_KEY);
                if (old) {
                    const parsed = JSON.parse(old);
                    if (parsed && (parsed.html || parsed.css || parsed.js)) {
                        const ids = { html: makeId(), css: makeId(), js: makeId() };
                        const migrated = {
                            files: [
                                { id: ids.html, name: 'index.html', type: 'html', content: typeof parsed.html === 'string' ? parsed.html : DEFAULT_HTML },
                                { id: ids.css,  name: 'style.css',  type: 'css',  content: typeof parsed.css === 'string' ? parsed.css : DEFAULT_CSS },
                                { id: ids.js,   name: 'script.js',  type: 'js',   content: typeof parsed.js === 'string' ? parsed.js : DEFAULT_JS }
                            ],
                            activeFileId: ids.html,
                            lastActiveByLang: { html: ids.html, css: ids.css, js: ids.js }
                        };
                        if (isUntouchedLegacyStarter(migrated.files)) {
                            storageSet(PROJECT_KEY, JSON.stringify(createDefaultProject()));
                            return createDefaultProject();
                        }
                        return migrated;
                    }
                }
            } catch (e) {}

            return createDefaultProject();
        }

        function saveProject() {
            let saved = false;
            try {
                saved = storageSet(PROJECT_KEY, JSON.stringify(project));
            } catch (e) {
                saved = false;
            }
            if (!saved) {
                setDirty(true);
                showToast('❌ ذخیره انجام نشد؛ فضای ذخیره‌سازی مرورگر را بررسی کنید.', 'error');
            }
            return saved;
        }

        function scheduleSaveProject() {
            setDirty(true);
            clearTimeout(autoSaveTimer);
            clearTimeout(dirtyResetTimer);
            autoSaveTimer = setTimeout(function() {
                if (saveProject()) {
                    dirtyResetTimer = setTimeout(function() { setDirty(false); }, 700);
                } else {
                    setDirty(true);
                }
            }, 120);
        }

        function getFile(id) {
            return project.files.find(function(f) { return f.id === id; }) || null;
        }
        function getFileForLang(lang) {
            const id = project.lastActiveByLang[lang];
            let f = id ? getFile(id) : null;
            if (f && f.type === lang) return f;
            f = project.files.find(function(x) { return x.type === lang; });
            if (f) project.lastActiveByLang[lang] = f.id;
            return f || null;
        }

        // ==========================================
        //  File Explorer
        // ==========================================
        const feList      = document.getElementById('feList');
        const feAddBtn    = document.getElementById('feAddBtn');
        const fileExplorer = document.getElementById('fileExplorer');
        const feToggleBtn = document.getElementById('feToggleBtn');
        const FILE_EXPLORER_KEY = 'html-editor-file-explorer-collapsed';
        const feSearch = document.getElementById('feSearch');
        const feTypeFilter = document.getElementById('feTypeFilter');
        const feGroupMode = document.getElementById('feGroupMode');

        function setFileExplorerCollapsed(collapsed, persist) {
            fileExplorer.classList.toggle('is-collapsed', collapsed);
            feToggleBtn.setAttribute('aria-expanded', String(!collapsed));
            feToggleBtn.setAttribute('aria-label', collapsed ? 'Open file manager' : 'Collapse file manager');
            feToggleBtn.title = collapsed ? 'Open file manager' : 'Collapse file manager';
            if (persist !== false) storageSet(FILE_EXPLORER_KEY, collapsed ? '1' : '0');
        }

        const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
        // Always start from the requested responsive default: open on desktop, collapsed on mobile.
        setFileExplorerCollapsed(isMobileViewport, false);
        feToggleBtn.addEventListener('click', function() {
            setFileExplorerCollapsed(!fileExplorer.classList.contains('is-collapsed'));
        });
        const feNewForm   = document.getElementById('feNewForm');
        const feNewName   = document.getElementById('feNewName');
        const feLibraryBtn = document.getElementById('feLibraryBtn');
        const feNewCreate = document.getElementById('feNewCreate');
        const feNewCancel = document.getElementById('feNewCancel');

        function renderFileExplorer() {
            if (!project) return;
            const query = feSearch ? feSearch.value.trim().toLowerCase() : '';
            const typeFilter = feTypeFilter ? feTypeFilter.value : 'all';
            const groupMode = feGroupMode ? feGroupMode.value : 'manual';
            let files = project.files.filter(function(f) {
                return (typeFilter === 'all' || f.type === typeFilter) && (!query || f.name.toLowerCase().includes(query));
            });
            if (groupMode === 'type') {
                const order = { html: 0, css: 1, js: 2 };
                files.sort(function(a, b) { return order[a.type] - order[b.type] || a.name.localeCompare(b.name); });
            } else if (groupMode === 'name') {
                files.sort(function(a, b) { return a.name.localeCompare(b.name); });
            }
            const html = files.map(function(f) {
                const isActive = f.id === project.activeFileId;
                const icon = f.type === 'html' ? '📄' : (f.type === 'css' ? '🎨' : '⚡');
                const isDirty = dirty && isActive && activeTab === f.type;
                return '<div class="fe-item' + (isActive ? ' active' : '') + '" data-id="' + escHtml(f.id) + '" title="' + escHtml(f.name) + '">' +
                    '<button type="button" class="fe-open" data-role="name" aria-label="Open file ' + escHtml(f.name) + (isActive ? ', active file' : '') + '">' +
                    '<span class="fe-icon" aria-hidden="true">' + icon + '</span>' +
                    '<span class="fe-name">' + escHtml(f.name) + '</span></button>' +
                    (isDirty ? '<span class="fe-dirty-dot" title="Unsaved changes" aria-label="Unsaved changes">●</span>' : '') +
                    '<button type="button" class="fe-rename" data-action="rename" title="Rename ' + escHtml(f.name) + '" aria-label="Rename ' + escHtml(f.name) + '">✏️</button>' +
                    '<button type="button" class="fe-del" data-action="delete" title="Delete ' + escHtml(f.name) + '" aria-label="Delete ' + escHtml(f.name) + '">🗑</button>' +
                '</div>';
            }).join('');
            feList.innerHTML = html || '<div class="fe-empty" role="status">' + (query || typeFilter !== 'all' ? 'No matching files' : 'No files yet') + '</div>';
        }
        [feSearch, feTypeFilter, feGroupMode].forEach(function(control) {
            if (!control) return;
            control.addEventListener(control === feSearch ? 'input' : 'change', renderFileExplorer);
        });

        feLibraryBtn.addEventListener('click', function() {
            activateTab('libs');
            if (window.matchMedia('(max-width: 768px)').matches) setFileExplorerCollapsed(true);
        });
        document.getElementById('btnHelp').addEventListener('click', function() {
            activateTab('help');
        });

        feAddBtn.addEventListener('click', function() {
            if (fileExplorer.classList.contains('is-collapsed')) {
                setFileExplorerCollapsed(false);
            }
            feNewForm.hidden = !feNewForm.hidden;
            if (!feNewForm.hidden) {
                feNewName.value = '';
                setTimeout(function() { feNewName.focus(); }, 30);
            }
        });

        feNewCancel.addEventListener('click', function() { feNewForm.hidden = true; });

        function fileNameError(name, type, excludeId) {
            if (!name) return 'Enter a file name.';
            if (name.length > 120) return 'File names must be 120 characters or fewer.';
            if (project.files.some(function(f) { return f.id !== excludeId && f.name.toLowerCase() === name.toLowerCase(); })) return 'A file with that name already exists.';
            return '';
        }
        function fileNameWarning(name, type) {
            const match = name.match(/\.([^.]+)$/);
            const extType = match ? ({ html: 'html', htm: 'html', css: 'css', js: 'js', mjs: 'js' })[match[1].toLowerCase()] : null;
            return extType && extType !== type ? 'The file extension does not match the selected ' + type.toUpperCase() + ' type. The name was kept unchanged.' : '';
        }
        feNewCreate.addEventListener('click', function() {
            let name = feNewName.value.trim();
            if (!name) { showToast('❌ Enter a file name with an extension, e.g. style.css', 'error'); feNewName.focus(); return; }
            if (!/\.[^.]+$/.test(name)) {
                const fallbackType = LANGS.includes(activeTab) ? activeTab : 'html';
                name += '.' + fallbackType;
            }
            const extension = (name.match(/\.([^.]+)$/) || [,''])[1].toLowerCase();
            const typeByExtension = { html: 'html', htm: 'html', css: 'css', js: 'js', mjs: 'js' };
            const type = typeByExtension[extension];
            if (!type) { showToast('❌ Supported extensions: .html, .htm, .css, .js, .mjs', 'error'); feNewName.focus(); return; }
            const error = fileNameError(name, type, null);
            if (error) { showToast('❌ ' + error, 'error'); feNewName.focus(); return; }
            const file = { id: makeId(), name: name, type: type, content: '' };
            project.files.push(file);
            renderFileExplorer();
            feNewForm.hidden = true;
            const saved = openFile(file.id);
            if (window.matchMedia('(max-width: 768px)').matches) setFileExplorerCollapsed(true);
            showToast(
                saved ? '✅ File “' + name + '” created' : '⚠ File created in this session, but could not be saved.',
                saved ? 'success' : 'error'
            );
        });

        feNewName.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); feNewCreate.click(); }
            else if (e.key === 'Escape') { e.preventDefault(); feNewForm.hidden = true; }
        });

        feList.addEventListener('click', function(e) {
            const renameBtn = e.target.closest('[data-action="rename"]');
            if (renameBtn) {
                const item = renameBtn.closest('.fe-item');
                if (item) startRename(item, item.dataset.id);
                return;
            }
            const delBtn = e.target.closest('[data-action="delete"]');
            if (delBtn) {
                const item = delBtn.closest('.fe-item');
                if (item) deleteFile(item.dataset.id);
                return;
            }
            if (e.target.matches('input.fe-rename-input')) return;
            const item = e.target.closest('.fe-item');
            if (item) {
                openFile(item.dataset.id);
                if (window.matchMedia('(max-width: 768px)').matches) setFileExplorerCollapsed(true);
            }
        });
        feList.addEventListener('keydown', function(e) {
            const item = e.target.closest('.fe-item');
            if (!item || e.target.matches('input.fe-rename-input')) return;
            if (e.key === 'F2' && !e.target.closest('[data-action="delete"], [data-action="rename"]')) {
                e.preventDefault();
                startRename(item, item.dataset.id);
            }
            // Open/rename/delete controls retain their native keyboard activation.
        });

        feList.addEventListener('dblclick', function(e) {
            const nameEl = e.target.closest('[data-role="name"]');
            if (!nameEl) return;
            const item = nameEl.closest('.fe-item');
            if (!item) return;
            startRename(item, item.dataset.id);
        });

        function startRename(itemEl, fileId) {
            const file = getFile(fileId);
            if (!file) return;
            const nameEl = itemEl.querySelector('[data-role="name"]');
            if (!nameEl) return;

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'fe-rename-input';
            input.value = file.name;
            input.maxLength = 120;
            input.spellcheck = false;
            nameEl.replaceWith(input);
            input.focus();
            input.select();

            let committed = false;
            function commit() {
                if (committed) return;
                committed = true;
                const newName = input.value.trim();
                if (!newName) { showToast('❌ File name cannot be empty.', 'error'); renderFileExplorer(); return; }
                const error = fileNameError(newName, file.type, file.id);
                if (error) { showToast('❌ ' + error, 'error'); renderFileExplorer(); return; }
                file.name = newName;
                const saved = saveProject();
                if (saved) setDirty(false);
                renderFileExplorer();
                const warning = fileNameWarning(newName, file.type);
                if (!saved) {
                    showToast('⚠ Rename is only in this session; browser storage could not save it.', 'error');
                } else {
                    showToast(warning ? '⚠ ' + warning : '✅ File renamed to “' + newName + '”', warning ? 'info' : 'success');
                }
            }
            function cancel() {
                if (committed) return;
                committed = true;
                renderFileExplorer();
            }
            input.addEventListener('blur', commit);
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
                else if (e.key === 'Escape') {
                    e.preventDefault();
                    input.removeEventListener('blur', commit);
                    cancel();
                }
            });
        }

        function deleteFile(fileId) {
            const idx = project.files.findIndex(function(f) { return f.id === fileId; });
            if (idx === -1) return;
            const file = project.files[idx];
            const wasActive = project.activeFileId === fileId;
            const warning = (wasActive ? ' This is the active file.' : '') + (dirty ? ' There are unsaved editor changes.' : '');
            if (!window.confirm('Delete “' + file.name + '”?' + warning + '\n\nYou can undo this deletion from the notification.')) return;

            // Keep only what Undo needs: the deleted file, its position, its prior
            // "last active" pointer, and the blank placeholder created in its place (if any).
            const undoInfo = {
                file: file,
                index: idx,
                wasActive: wasActive,
                prevLastActive: project.lastActiveByLang[file.type],
                blankId: null
            };

            project.files.splice(idx, 1);

            LANGS.forEach(function(lang) {
                if (project.lastActiveByLang[lang] === fileId) project.lastActiveByLang[lang] = null;
            });

            if (!project.files.some(function(f) { return f.type === file.type; })) {
                const blank = { id: makeId(), name: 'untitled.' + file.type, type: file.type, content: '' };
                project.files.push(blank);
                project.lastActiveByLang[file.type] = blank.id;
                undoInfo.blankId = blank.id;
            }

            if (wasActive) {
                const currentLang = LANGS.includes(activeTab) ? activeTab : file.type;
                const next = getFileForLang(currentLang) || project.files[0];
                if (next) {
                    project.activeFileId = next.id;
                    const ed = editors[next.type];
                    if (ed) {
                        ed.ta.value = next.content;
                        ed.refresh();
                    }
                }
            }

            const saved = saveProject();
            if (saved) setDirty(false);
            renderFileExplorer();
            updatePreviewNow();
            showToast(
                saved ? '🗑 “' + file.name + '” deleted' : '⚠ File deleted in this session, but could not be saved.',
                saved ? 'info' : 'error',
                'Undo',
                function() { restoreDeletedFile(undoInfo); }
            );
        }

        function restoreDeletedFile(info) {
            const file = info.file;
            // Do not duplicate a file if the same id is somehow present already.
            if (getFile(file.id)) return;

            // Remove the placeholder that was created when the file was deleted, but only if it is still empty.
            if (info.blankId) {
                const blankIdx = project.files.findIndex(function(f) { return f.id === info.blankId && f.content === ''; });
                if (blankIdx !== -1) project.files.splice(blankIdx, 1);
            }

            // Re-insert the file where it was, keeping every edit made to other files since deletion.
            project.files.splice(Math.min(info.index, project.files.length), 0, file);

            if (!project.lastActiveByLang[file.type] || !getFile(project.lastActiveByLang[file.type])) {
                project.lastActiveByLang[file.type] = file.id;
            }

            if (info.wasActive) {
                project.activeFileId = file.id;
                const ed = editors[file.type];
                if (ed) { ed.ta.value = file.content; ed.refresh(); }
                activateTab(file.type);
            }

            const saved = saveProject();
            if (saved) setDirty(false);
            renderFileExplorer();
            updatePreviewNow();
            showToast(saved ? '↩ File restored' : '⚠ File restored in this session, but could not be saved.', saved ? 'success' : 'error');
        }

        // ==========================================
        //  Open file
        // ==========================================
        function openFile(fileId) {
            const file = getFile(fileId);
            if (!file) return;

            project.activeFileId = fileId;
            project.lastActiveByLang[file.type] = fileId;

            const ed = editors[file.type];
            if (ed) {
                ed.ta.value = file.content;
                ed.refresh();
            }

            activateTab(file.type);
            const saved = saveProject();
            if (saved) setDirty(false);
            updatePreviewNow();
            return saved;
        }

        function activateTab(lang) {
            if (lang !== 'libs' && lang !== 'help' && !editors[lang]) lang = 'html';
            picker.close();
            IntelliSense.hide();
            activeTab = lang;
            renderSymbolToolbar(lang);

            LANGS.forEach(function(l) { editors[l].wrap.hidden = true; });
            libsPanel.hidden = true;
            document.getElementById('helpPanel').hidden = true;
            if (lang === 'libs') libsPanel.hidden = false;
            else if (lang === 'help') document.getElementById('helpPanel').hidden = false;
            else editors[lang].wrap.hidden = false;

            tabButtons.forEach(function(b) {
                const on = b.dataset.tab === lang;
                b.classList.toggle('active', on);
                b.setAttribute('aria-selected', on ? 'true' : 'false');
            });

            if (lang !== 'libs' && lang !== 'help') {
                editors[lang].syncScroll();
                const f = getFileForLang(lang);
                if (f) project.activeFileId = f.id;
                renderFileExplorer();
                // Matches are offsets into one editor; recompute them for the newly shown editor.
                if (searchInput.value) scheduleSearch();
            } else {
                searchMatches = []; searchIndex = -1;
                renderSearchResults();
            }

            storageSet(TAB_KEY, lang);
        }

        function switchTab(lang) {
            if (lang === 'libs' || lang === 'help') { activateTab(lang); return; }
            const file = getFileForLang(lang);
            if (file) openFile(file.id);
            else activateTab(lang);
        }

        tabButtons.forEach(function(b) {
            b.addEventListener('click', function() { switchTab(b.dataset.tab); });
        });

        // ==========================================
        //  Libraries
        // ==========================================
        function loadLibraries() {
            try {
                const raw = storageGet(LIBS_KEY);
                if (!raw) return [];
                const arr = JSON.parse(raw);
                if (!Array.isArray(arr)) return [];

                const seenIds = new Set();
                return arr.filter(function(lib) {
                    return lib && typeof lib === 'object' &&
                        typeof lib.name === 'string' &&
                        typeof lib.code === 'string' &&
                        (lib.type === 'css' || lib.type === 'js');
                }).map(function(lib) {
                    let id = typeof lib.id === 'string' && lib.id.trim()
                        ? lib.id.trim().slice(0, 100) : makeLibId();
                    if (seenIds.has(id)) id = makeLibId();
                    seenIds.add(id);
                    return {
                        id: id,
                        name: lib.name.trim().slice(0, 100) || 'Unnamed library',
                        type: lib.type,
                        code: lib.code,
                        enabled: lib.enabled === true
                    };
                });
            } catch (e) { return []; }
        }
        function saveLibraries() {
            try {
                return storageSet(LIBS_KEY, JSON.stringify(libraries));
            } catch (e) {
                return false;
            }
        }
        function makeLibId() { return 'lib_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8); }

        function renderLibraries() {
            const list = document.getElementById('libList');
            const badge = document.getElementById('libCountBadge');
            if (!libraries.length) {
                list.innerHTML = '<div class="lib-empty">No libraries have been added yet.<br><small>Choose one from the preset list above or paste the code manually.</small></div>';
                badge.textContent = '';
                return;
            }
            const enabled = libraries.filter(function(l) { return l.enabled; }).length;
            badge.textContent = '(' + enabled + ' enabled of ' + libraries.length + ')';
            list.innerHTML = libraries.map(function(lib) {
                return '<div class="lib-item' + (lib.enabled ? '' : ' disabled') + '" data-id="' + escHtml(lib.id) + '">' +
                    '<input type="checkbox" ' + (lib.enabled ? 'checked' : '') + ' data-action="toggle">' +
                    '<span class="lib-item-name">' + escHtml(lib.name) + '</span>' +
                    '<span class="lib-item-type ' + escHtml(lib.type) + '">' + (lib.type === 'css' ? 'CSS' : 'JS') + '</span>' +
                    '<button type="button" class="lib-item-del" data-action="delete" title="Delete">🗑</button>' +
                '</div>';
            }).join('');
        }

        function renderPresets() {
            const grid = document.getElementById('libPresetsGrid');
            const search = (document.getElementById('libPresetSearch').value || '').trim().toLowerCase();
            const type = document.getElementById('libPresetTypeFilter').value;
            const filtered = PRESETS.map(function(p, i) { return { preset: p, index: i }; }).filter(function(item) {
                const p = item.preset;
                const matchesText = !search || (p.name + ' ' + p.desc).toLowerCase().includes(search);
                return matchesText && (type === 'all' || p.type === type);
            });
            document.getElementById('libPresetCount').textContent = filtered.length + ' of ' + PRESETS.length + ' libraries';
            if (!filtered.length) {
                grid.innerHTML = '<div class="lib-empty">No libraries match this search. Try another word or choose “All libraries”.</div>';
                return;
            }
            grid.innerHTML = filtered.map(function(item) {
                const p = item.preset;
                return '<button type="button" class="lib-preset" data-preset-idx="' + item.index + '" data-tooltip="' + escHtml(p.desc) + '">' +
                    '<span class="lib-preset-name">' + escHtml(p.name) + '</span>' +
                    '<span class="lib-preset-desc">' + escHtml(p.desc) + '</span>' +
                    '<span class="lib-preset-type ' + p.type + '">' + p.type.toUpperCase() + '</span>' +
                '</button>';
            }).join('');
        }

        document.getElementById('libPresetSearch').addEventListener('input', renderPresets);
        document.getElementById('libPresetTypeFilter').addEventListener('change', renderPresets);

        document.getElementById('helpPanel').addEventListener('click', function(e) {
            const button = e.target.closest('[data-help-tab]');
            if (button) activateTab(button.dataset.helpTab);
        });

        document.getElementById('helpPanel').addEventListener('click', function(e) {
            const button = e.target.closest('[data-help-language]');
            if (!button) return;
            const language = button.dataset.helpLanguage;
            const englishGuide = document.getElementById('helpEnglish');
            const persianGuide = document.getElementById('helpPersian');
            const isPersian = language === 'fa';
            englishGuide.hidden = isPersian;
            persianGuide.hidden = !isPersian;
            document.querySelectorAll('[data-help-language]').forEach(function(toggle) {
                const selected = toggle.dataset.helpLanguage === language;
                toggle.classList.toggle('active', selected);
                toggle.setAttribute('aria-pressed', String(selected));
            });
        });

        document.getElementById('libPresetsGrid').addEventListener('click', async function(e) {
            const btn = e.target.closest('.lib-preset');
            if (!btn) return;
            const preset = PRESETS[+btn.dataset.presetIdx];
            if (!preset) return;

            const nameIn = document.getElementById('libName');
            const typeIn = document.getElementById('libType');
            const codeIn = document.getElementById('libCode');

            // A newer choice cancels the previous request so its response cannot
            // overwrite the library currently selected by the user.
            if (libraryDownloadController) libraryDownloadController.abort();
            const requestId = ++libraryDownloadRequest;
            const ctrl = new AbortController();
            libraryDownloadController = ctrl;

            nameIn.value = preset.name;
            typeIn.value = preset.type;
            codeIn.value = '';
            codeIn.placeholder = 'Downloading from CDN...';
            showToast('⏳ Attempting to download ' + preset.name + ' from CDN...', 'info');

            const timeoutId = setTimeout(function() { ctrl.abort(); }, 8000);
            try {
                const res = await fetch(preset.cdn, { signal: ctrl.signal });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const code = await res.text();
                if (requestId !== libraryDownloadRequest) return;
                if (code && code.length > 10) {
                    codeIn.value = code;
                    codeIn.placeholder = '';
                    showToast('✅ Code downloaded (' + Math.round(code.length / 1024) + ' KB)', 'success');
                } else {
                    throw new Error('Empty response');
                }
            } catch (err) {
                if (requestId !== libraryDownloadRequest) return;
                codeIn.placeholder = '⚠ Automatic download failed. Paste the code manually.';
                showToast('⚠ Offline or CDN unavailable', 'error');
            } finally {
                clearTimeout(timeoutId);
                if (libraryDownloadController === ctrl) libraryDownloadController = null;
            }
            if (requestId === libraryDownloadRequest) codeIn.focus();
        });

        function addLibrary() {
            const nameIn = document.getElementById('libName');
            const typeIn = document.getElementById('libType');
            const codeIn = document.getElementById('libCode');
            const name = nameIn.value.trim();
            const type = typeIn.value;
            const code = codeIn.value;

            if (!name) { showToast('❌ Enter a library name', 'error'); nameIn.focus(); return; }
            if (!code.trim()) { showToast('❌ Enter library code', 'error'); codeIn.focus(); return; }

            libraries.unshift({ id: makeLibId(), name: name, type: type, code: code, enabled: true });
            if (!saveLibraries()) {
                libraries.pop();
                showToast('❌ ذخیره کتابخانه انجام نشد؛ فضای ذخیره‌سازی مرورگر را بررسی کنید.', 'error');
                return;
            }
            renderLibraries();
            nameIn.value = '';
            codeIn.value = '';
            codeIn.placeholder = 'Paste library code here...';
            nameIn.focus();
            updatePreviewNow();
            showToast('✅ Library “' + name + '” added', 'info');
        }

        function toggleLibrary(id, enabled) {
            const lib = libraries.find(function(l) { return l.id === id; });
            if (!lib) return;
            const previousEnabled = lib.enabled;
            lib.enabled = !!enabled;
            if (!saveLibraries()) {
                lib.enabled = previousEnabled;
                renderLibraries();
                showToast('❌ تغییر کتابخانه ذخیره نشد؛ فضای ذخیره‌سازی مرورگر را بررسی کنید.', 'error');
                return;
            }
            renderLibraries();
            updatePreviewNow();
        }
        function deleteLibrary(id) {
            const idx = libraries.findIndex(function(l) { return l.id === id; });
            if (idx === -1) return;
            const removed = libraries[idx];
            const name = removed.name;
            libraries.splice(idx, 1);
            if (!saveLibraries()) {
                libraries.splice(idx, 0, removed);
                renderLibraries();
                showToast('❌ حذف کتابخانه ذخیره نشد؛ فضای ذخیره‌سازی مرورگر را بررسی کنید.', 'error');
                return;
            }
            renderLibraries();
            updatePreviewNow();
            showToast('🗑 “' + name + '” deleted', 'info');
        }

        document.getElementById('libList').addEventListener('click', function(e) {
            const item = e.target.closest('.lib-item');
            if (!item) return;
            if (e.target.matches('[data-action="delete"]')) deleteLibrary(item.dataset.id);
        });
        document.getElementById('libList').addEventListener('change', function(e) {
            const item = e.target.closest('.lib-item');
            if (!item) return;
            if (e.target.matches('[data-action="toggle"]')) toggleLibrary(item.dataset.id, e.target.checked);
        });
        document.getElementById('libAddBtn').addEventListener('click', addLibrary);
        document.getElementById('libName').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); document.getElementById('libCode').focus(); }
        });

        // ==========================================
        //  Highlight
        // ==========================================
        function esc(text) {
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        function span(cls, text) { return '<span class="' + cls + '">' + esc(text) + '</span>'; }
        function tokenize(raw, re, classify) {
            let out = '', last = 0, m;
            re.lastIndex = 0;
            while ((m = re.exec(raw)) !== null) {
                if (m[0] === '') { re.lastIndex++; continue; }
                out += esc(raw.slice(last, m.index));
                const cls = classify(m);
                out += cls ? span(cls, m[0]) : esc(m[0]);
                last = re.lastIndex;
            }
            return out + esc(raw.slice(last));
        }
        function highlightAttrs(text) {
            return tokenize(text, /("[^"]*"?|'[^']*'?)|([^\s"'=\/>]+)(?=\s*=)/g,
                m => m[1] ? 'hl-string' : 'hl-attr');
        }
        function highlightHTML(raw) {
            const re = /(\x3C!--[\s\S]*?(?:-->|$))|(<!DOCTYPE[^>]*>?)|(<\/?[a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>])*)(>|$)/gi;
            let out = '', last = 0, m;
            while ((m = re.exec(raw)) !== null) {
                if (m[0] === '') { re.lastIndex++; continue; }
                out += esc(raw.slice(last, m.index));
                if (m[1]) out += span('hl-comment', m[1]);
                else if (m[2]) out += span('hl-doctype', m[2]);
                else {
                    out += span('hl-tag', m[3]);
                    out += highlightAttrs(m[4]);
                    if (m[5]) out += span('hl-tag', m[5]);
                }
                last = re.lastIndex;
            }
            return out + esc(raw.slice(last));
        }
        function highlightCSS(raw) {
            const re = new RegExp(
                '(\\/\\*[\\s\\S]*?(?:\\*\\/|$))' +
                '|("(?:\\\\.|[^"\\\\\\n])*"?|\'(?:\\\\.|[^\'\\\\\\n])*\'?)' +
                '|(@[\\w-]+)' +
                '|(#[0-9a-fA-F]{3,8}\\b)' +
                '|((?<![\\w-])-?\\d*\\.?\\d+(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?)' +
                '|([\\w-]+)(?=\\s*:\\s*[^;{}]*[;}])',
                'g'
            );
            return tokenize(raw, re, m => {
                if (m[1]) return 'hl-comment';
                if (m[2]) return 'hl-string';
                if (m[3]) return 'hl-tag';
                if (m[4] || m[5]) return 'hl-num';
                if (m[6]) return 'hl-attr';
                return '';
            });
        }
        const JS_KEYWORDS = 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|try|catch|finally|throw|async|await|typeof|instanceof|in|of|delete|this|super|yield';
        function highlightJS(raw) {
            const re = new RegExp(
                '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?(?:\\*\\/|$))' +
                '|("(?:\\\\.|[^"\\\\\\n])*"?|\'(?:\\\\.|[^\'\\\\\\n])*\'?|`(?:\\\\[\\s\\S]|[^`\\\\])*`?)' +
                '|\\b(' + JS_KEYWORDS + ')\\b' +
                '|\\b(true|false|null|undefined|NaN|Infinity)\\b' +
                '|((?<![\\w$.])\\d+\\.?\\d*\\b)' +
                '|\\b(document|window|console|alert|setTimeout|setInterval|Math|JSON|Array|Object|String|Number|Promise|fetch)\\b',
                'g'
            );
            return tokenize(raw, re, m => {
                if (m[1]) return 'hl-comment';
                if (m[2]) return 'hl-string';
                if (m[3]) return 'hl-tag';
                if (m[4] || m[5]) return 'hl-num';
                if (m[6]) return 'hl-doctype';
                return '';
            });
        }
        const HIGHLIGHTERS = { html: highlightHTML, css: highlightCSS, js: highlightJS };

        // Remove local asset references when the same files are embedded below.
        // Keep remote URLs and local files that are not part of this project bundle.
        function stripBundledAssetReferences(markup, cssFiles, jsFiles) {
            const cssNames = new Set(cssFiles.map(function(file) { return String(file.name || '').toLowerCase(); }));
            const jsNames = new Set(jsFiles.map(function(file) { return String(file.name || '').toLowerCase(); }));
            const template = document.createElement('template');
            template.innerHTML = String(markup || '');

            function getLocalFilename(url) {
                const value = String(url || '').trim();
                if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) return null;
                const path = value.split(/[?#]/, 1)[0].replace(/\\/g, '/');
                const filename = path.slice(path.lastIndexOf('/') + 1);
                if (!filename) return null;
                try { return decodeURIComponent(filename).toLowerCase(); }
                catch (error) { return filename.toLowerCase(); }
            }

            template.content.querySelectorAll('script[src], link[rel~="stylesheet"][href]').forEach(function(node) {
                const isScript = node.tagName.toLowerCase() === 'script';
                const filename = getLocalFilename(node.getAttribute(isScript ? 'src' : 'href'));
                const bundledNames = isScript ? jsNames : cssNames;
                if (filename && bundledNames.has(filename)) node.remove();
            });
            return template.innerHTML;
        }

        // Keep user-controlled file and library names inside generated comments.
        function safeCommentLabel(value) {
            return String(value == null ? '' : value)
                .replace(/\*\//g, '* /')
                .replace(/[\r\n\u2028\u2029]+/g, ' ')
                .trim();
        }

        // ==========================================
        //  Build document
        // ==========================================
        function buildDocument(forExport, externalAssetBaseName) {
            const htmlFiles = project.files.filter(function(f) { return f.type === 'html'; });
            const cssFiles  = project.files.filter(function(f) { return f.type === 'css'; });
            const jsFiles   = project.files.filter(function(f) { return f.type === 'js'; });

            const html = stripBundledAssetReferences(htmlFiles.map(function(f) { return f.content; }).join('\n'), cssFiles, jsFiles);
            const css  = cssFiles.map(function(f) { return '/* === ' + safeCommentLabel(f.name) + ' === */\n' + f.content; })
                                 .join('\n\n')
                                 .replace(/<\/style/gi, '<\\/style');
            const js   = jsFiles.map(function(f) { return '/* === ' + safeCommentLabel(f.name) + ' === */\n' + f.content; })
                                .join('\n\n')
                                .replace(/<\/script/gi, '<\\/script');

            const enabledLibs = libraries.filter(function(l) { return l.enabled; });
            const libCss = enabledLibs
                .filter(function(l) { return l.type === 'css'; })
                .map(function(l) { return '/* === ' + safeCommentLabel(l.name) + ' === */\n' + l.code.replace(/<\/style/gi, '<\\/style'); })
                .join('\n\n');
            const libJs = enabledLibs
                .filter(function(l) { return l.type === 'js'; })
                .map(function(l) { return '/* === ' + safeCommentLabel(l.name) + ' === */\n' + l.code.replace(/<\/script/gi, '<\\/script'); })
                .join('\n\n');

            const errorHook = forExport ? '' : [
                '<script>',
                'window.addEventListener("error",function(e){ parent.postMessage({editorError:true,message:String(e.message)},"*"); });',
                'window.addEventListener("unhandledrejection",function(e){ var r=e.reason; parent.postMessage({editorError:true,message:"Promise: "+String(r&&r.message?r.message:r)},"*"); });',
                'window.addEventListener("keydown",function(e){ if((e.ctrlKey||e.metaKey)&&String(e.key).toLowerCase()==="s"){ e.preventDefault(); parent.postMessage({editorSave:true},"*"); } });',
                '<\/script>'
            ].join('\n');

            const safeTitle = String(project.documentTitle || 'My Page')
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return '<!DOCTYPE html>\n<html lang="en" dir="ltr">\n<head>\n' +
                '<meta charset="UTF-8">\n' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
                '<title>' + safeTitle + '</title>\n' +
                stripBundledAssetReferences(project.headExtras || '', cssFiles, jsFiles) + '\n' +
                errorHook + '\n' +
                (externalAssetBaseName
                    ? '<link rel="stylesheet" href="' + escHtml(externalAssetBaseName) + '.css">\n'
                    : '<style>\n' + (libCss ? libCss + '\n\n' : '') + css + '\n</style>\n') +
                '</head>\n<body>\n' + html + '\n' +
                (externalAssetBaseName
                    ? '<script src="' + escHtml(externalAssetBaseName) + '.js"><\/script>\n'
                    : (libJs ? '<script>\n' + libJs + '\n<\/script>\n' : '') +
                      '<script>\n' + js + '\n<\/script>\n') +
                '</body>\n</html>';
        }

        function updatePreviewNow() {
            clearTimeout(previewTimer);
            outputFrame.srcdoc = buildDocument(false);
        }
        function schedulePreview() {
            clearTimeout(previewTimer);
            previewTimer = setTimeout(updatePreviewNow, 300);
        }

        window.addEventListener('message', function (e) {
            if (e.source !== outputFrame.contentWindow || !e.data) return;
            if (e.data.editorError) showToast('JS error: ' + e.data.message, 'error');
            if (e.data.editorSave) saveCode();
        });

        // ==========================================
        //  Insert / Undo / Redo
        // ==========================================
        function insertText(ta, text) {
            ta.focus();
            let ok = false;
            try { ok = document.execCommand('insertText', false, text); } catch (e) { ok = false; }
            if (!ok) {
                ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, 'end');
                ta.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }

        // Quick symbol toolbar: remember the active editor selection even when a toolbar
        // button temporarily takes focus (especially on touch/mobile browsers).
        const symbolToolbar = document.getElementById('symbolToolbar');
        function renderSymbolToolbar(language) {
            if (!symbolToolbar) return;
            const header = symbolToolbar.closest('.page-symbol-header');
            const supportedLanguage = LANGS.includes(language);
            if (header) header.hidden = !supportedLanguage;
            if (!supportedLanguage) return;

            const data = window.EDITOR_INTELLISENSE_DATA || {};
            const items = data.symbols && data.symbols[language];
            if (!Array.isArray(items)) {
                symbolToolbar.replaceChildren();
                return;
            }
            symbolToolbar.dataset.language = language;
            symbolToolbar.innerHTML = items.map(function(item) {
                return '<button type="button" data-prefix="' + escHtml(item.prefix || '') +
                    '" data-suffix="' + escHtml(item.suffix || '') +
                    '" title="' + escHtml(item.description || item.label || 'Insert symbol') +
                    '" aria-label="' + escHtml(item.description || item.label || 'Insert symbol') +
                    '">' + escHtml(item.label || 'Symbol') + '</button>';
            }).join('');
        }

        const symbolSelections = Object.create(null);
        LANGS.forEach(function(lang) {
            const editor = editors[lang];
            if (!editor || !editor.ta) return;
            const ta = editor.ta;
            const rememberSelection = function() {
                symbolSelections[lang] = {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                };
            };
            ['select', 'keyup', 'click', 'input', 'pointerup'].forEach(function(eventName) {
                ta.addEventListener(eventName, rememberSelection);
            });
            rememberSelection();
        });

        if (symbolToolbar) {
            // Prevent mouse focus transfer where supported, but also retain a saved range
            // for browsers that still move focus when tapping a toolbar button.
            symbolToolbar.addEventListener('mousedown', function(e) {
                if (e.target.closest('button')) e.preventDefault();
            });
            symbolToolbar.addEventListener('click', function(e) {
                const button = e.target.closest('button[data-prefix]');
                if (!button || !LANGS.includes(activeTab) || !editors[activeTab]) return;

                const ta = editors[activeTab].ta;
                // Prefer the live caret/selection whenever the editor still owns focus.
                // The remembered range is only a fallback for browsers that move focus
                // to the toolbar before dispatching its click event.
                const liveSelection = document.activeElement === ta;
                const saved = liveSelection ? {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                } : (symbolSelections[activeTab] || {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                });
                const start = Math.max(0, Math.min(saved.start, ta.value.length));
                const end = Math.max(start, Math.min(saved.end, ta.value.length));
                const prefix = button.dataset.prefix || '';
                const suffix = button.dataset.suffix || '';
                const selected = ta.value.slice(start, end);
                const replacement = prefix + selected + suffix;

                ta.focus({ preventScroll: true });
                ta.setRangeText(replacement, start, end, 'select');
                const selectionStart = start + prefix.length;
                const selectionEnd = selectionStart + selected.length;
                if (selected) {
                    ta.setSelectionRange(selectionStart, selectionEnd, 'forward');
                } else {
                    // Place the caret inside paired symbols; line-comment has no suffix.
                    ta.setSelectionRange(selectionStart, selectionStart);
                }
                symbolSelections[activeTab] = {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                };
                ta.dispatchEvent(new Event('input', { bubbles: true }));
                if (editors[activeTab].refresh) editors[activeTab].refresh();
                ta.focus({ preventScroll: true });
            });
        }

        renderSymbolToolbar(activeTab);

        function doUndo() {
            const ed = editors[activeTab];
            if (!ed) return;
            ed.ta.focus();
            try { document.execCommand('undo'); } catch (e) {}
            setTimeout(function() {
                ed.refresh();
                setDirty(true);
                schedulePreview();
            }, 0);
        }
        function doRedo() {
            const ed = editors[activeTab];
            if (!ed) return;
            ed.ta.focus();
            try { document.execCommand('redo'); } catch (e) {}
            setTimeout(function() {
                ed.refresh();
                setDirty(true);
                schedulePreview();
            }, 0);
        }

        // ==========================================
        //  Indent
        // ==========================================
        function lineStartAt(val, pos) { return pos > 0 ? val.lastIndexOf('\n', pos - 1) + 1 : 0; }
        function currentIndent(val, pos) {
            const ls = lineStartAt(val, pos);
            return val.substring(ls, pos).match(/^[ \t]*/)[0];
        }
        function indentSelection(ta, outdent) {
            const val   = ta.value;
            const start = ta.selectionStart;
            const end   = ta.selectionEnd;
            if (start === end && !outdent) { insertText(ta, '    '); return; }
            const effEnd     = (end > start && val.charAt(end - 1) === '\n') ? end - 1 : end;
            const blockStart = lineStartAt(val, start);
            let blockEnd = val.indexOf('\n', effEnd);
            if (blockEnd === -1) blockEnd = val.length;
            const block = val.slice(blockStart, blockEnd);
            const newBlock = block.split('\n').map(function(line) {
                if (!outdent) return '    ' + line;
                return line.replace(/^(?: {1,4}|\t)/, '');
            }).join('\n');
            if (newBlock === block) return;
            ta.setSelectionRange(blockStart, blockEnd);
            insertText(ta, newBlock);
            if (start === end) {
                const caret = Math.max(blockStart, start + (newBlock.length - block.length));
                ta.setSelectionRange(caret, caret);
            } else {
                ta.setSelectionRange(blockStart, blockStart + newBlock.length);
            }
        }
        function handleEnter(e, ta, lang) {
            const pos       = ta.selectionStart;
            const collapsed = ta.selectionStart === ta.selectionEnd;
            const val       = ta.value;
            const indent    = currentIndent(val, pos);
            const prev      = val.charAt(pos - 1);
            const next      = val.charAt(pos);
            const between = collapsed && (
                (lang !== 'html' && prev === '{' && next === '}') ||
                (lang === 'html' && prev === '>' && next === '<' && val.charAt(pos + 1) === '/')
            );
            if (between) {
                e.preventDefault();
                insertText(ta, '\n' + indent + '    \n' + indent);
                const caret = pos + 1 + indent.length + 4;
                ta.setSelectionRange(caret, caret);
            } else if (collapsed && lang !== 'html' && prev === '{') {
                e.preventDefault();
                insertText(ta, '\n' + indent + '    ');
            } else if (indent) {
                e.preventDefault();
                insertText(ta, '\n' + indent);
            }
        }

        // ==========================================
        //  IntelliSense
        // ==========================================
        const IntelliSense = (function() {
            const HTML_TAGS = [
                'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo',
                'blockquote','body','br','button','canvas','caption','cite','code','col','data',
                'datalist','dd','del','details','dfn','dialog','div','dl','dt','em','embed',
                'fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6',
                'head','header','hgroup','hr','html','i','iframe','img','input','ins','kbd',
                'label','legend','li','link','main','map','mark','menu','meta','meter','nav',
                'noscript','object','ol','optgroup','option','output','p','param','picture','pre',
                'progress','q','rp','rt','ruby','s','samp','script','section','select','slot',
                'small','source','span','strong','style','sub','summary','sup','table','tbody',
                'td','template','textarea','tfoot','th','thead','time','title','tr','track','u',
                'ul','var','video','wbr'
            ];
            const CSS_PROPS = [
                'align-content','align-items','align-self','animation','animation-delay',
                'animation-direction','animation-duration','animation-fill-mode',
                'animation-iteration-count','animation-name','animation-play-state',
                'animation-timing-function','aspect-ratio','backdrop-filter','backface-visibility',
                'background','background-attachment','background-blend-mode','background-clip',
                'background-color','background-image','background-origin','background-position',
                'background-repeat','background-size','border','border-bottom','border-bottom-color',
                'border-bottom-left-radius','border-bottom-right-radius','border-bottom-style',
                'border-bottom-width','border-collapse','border-color','border-image','border-left',
                'border-left-color','border-left-style','border-left-width','border-radius',
                'border-right','border-right-color','border-right-style','border-right-width',
                'border-spacing','border-style','border-top','border-top-color','border-top-left-radius',
                'border-top-right-radius','border-top-style','border-top-width','border-width',
                'bottom','box-shadow','box-sizing','caret-color','clear','clip','clip-path','color',
                'column-count','column-gap','column-rule','column-width','columns','content','cursor',
                'direction','display','filter','flex','flex-basis','flex-direction','flex-flow',
                'flex-grow','flex-shrink','flex-wrap','float','font','font-family',
                'font-feature-settings','font-size','font-stretch','font-style','font-variant',
                'font-weight','gap','grid','grid-area','grid-auto-columns','grid-auto-flow',
                'grid-auto-rows','grid-column','grid-column-end','grid-column-gap','grid-column-start',
                'grid-gap','grid-row','grid-row-end','grid-row-gap','grid-row-start','grid-template',
                'grid-template-areas','grid-template-columns','grid-template-rows','height','inset',
                'justify-content','justify-items','justify-self','left','letter-spacing','line-height',
                'list-style','list-style-image','list-style-position','list-style-type','margin',
                'margin-bottom','margin-left','margin-right','margin-top','max-height','max-width',
                'min-height','min-width','object-fit','object-position','opacity','order','outline',
                'outline-color','outline-offset','outline-style','outline-width','overflow','overflow-x',
                'overflow-y','padding','padding-bottom','padding-left','padding-right','padding-top',
                'perspective','pointer-events','position','resize','right','row-gap','scroll-behavior',
                'src','table-layout','text-align','text-decoration','text-decoration-color',
                'text-decoration-line','text-decoration-style','text-indent','text-overflow',
                'text-shadow','text-transform','top','transform','transform-origin','transition',
                'transition-delay','transition-duration','transition-property',
                'transition-timing-function','user-select','vertical-align','visibility','white-space',
                'width','will-change','word-break','word-spacing','word-wrap','writing-mode','z-index'
            ];
            const JS_WORDS = [
                'async','await','break','case','catch','class','const','continue','debugger','default',
                'delete','do','else','export','extends','finally','for','function','if','import','in',
                'instanceof','let','new','of','return','static','super','switch','this','throw','try',
                'typeof','var','void','while','with','yield',
                'true','false','null','undefined','NaN','Infinity',
                'console','window','document','navigator','location','history','localStorage',
                'sessionStorage','fetch','setTimeout','setInterval','clearTimeout','clearInterval',
                'requestAnimationFrame','alert','confirm','prompt','JSON','Math','Object','Array',
                'String','Number','Boolean','Date','RegExp','Error','Promise','Map','Set','WeakMap',
                'WeakSet','Symbol','Proxy','Reflect','Intl','URL','Blob','File','FileReader','FormData',
                'getElementById','getElementsByClassName','getElementsByTagName','querySelector',
                'querySelectorAll','createElement','createTextNode','appendChild','removeChild',
                'insertBefore','replaceChild','cloneNode','addEventListener','removeEventListener',
                'dispatchEvent','setAttribute','getAttribute','removeAttribute','hasAttribute',
                'classList','style','innerHTML','textContent','innerText','value','checked','dataset',
                'parentNode','parentElement','children','childNodes','firstChild','lastChild',
                'nextSibling','previousSibling','innerWidth','innerHeight','offsetWidth','offsetHeight',
                'forEach','map','filter','reduce','reduceRight','find','findIndex','some','every',
                'includes','indexOf','lastIndexOf','push','pop','shift','unshift','slice','splice',
                'concat','join','split','replace','replaceAll','match','matchAll','search','trim',
                'trimStart','trimEnd','padStart','padEnd','toUpperCase','toLowerCase','charAt',
                'charCodeAt','codePointAt','repeat','startsWith','endsWith','substring','substr',
                'sort','reverse','fill','flat','flatMap','from','isArray','keys','values','entries',
                'assign','freeze','create','defineProperty','getOwnPropertyNames','hasOwnProperty',
                'parseInt','parseFloat','isNaN','isFinite','random','floor','ceil','round','abs',
                'pow','sqrt','max','min','now'
            ];

            const el = document.createElement('div');
            el.className = 'intellisense';
            el.hidden = true;
            document.body.appendChild(el);

            let currentItems = [];
            let currentIndex = 0;
            let currentTa = null;
            let currentFrom = 0;
            let currentTo = 0;
            let justAccepted = false;

            const measureCtx = document.createElement('canvas').getContext('2d');

            // Read completion data when suggestions are requested, not during initialization.
            // This also supports bundled projects where the data script appears later.
            function getIntelliSenseData() {
                return window.EDITOR_INTELLISENSE_DATA || {};
            }

            // Preserve source offsets while masking CSS comments.
            function maskCssComments(text) {
                return text.replace(/\/\*[\s\S]*?(?:\*\/|$)/g, function(comment) {
                    return comment.replace(/[^\n]/g, ' ');
                });
            }

            // Do not offer CSS value completions while the caret is inside a quoted string.
            function isInsideCssString(text) {
                let quote = null;
                let escaped = false;
                for (let i = 0; i < text.length; i++) {
                    const ch = text.charAt(i);
                    if (escaped) { escaped = false; continue; }
                    if (quote && ch === '\\') { escaped = true; continue; }
                    if (quote) {
                        if (ch === quote) quote = null;
                    } else if (ch === "'" || ch === '"') {
                        quote = ch;
                    }
                }
                return !!quote;
            }

            // Avoid suggestions inside JavaScript strings and comments.
            function isInsideJsStringOrComment(text) {
                let quote = null;
                let escaped = false;
                let lineComment = false;
                let blockComment = false;
                for (let i = 0; i < text.length; i++) {
                    const ch = text.charAt(i);
                    const next = text.charAt(i + 1);
                    if (lineComment) {
                        if (ch === '\n' || ch === '\r') lineComment = false;
                        continue;
                    }
                    if (blockComment) {
                        if (ch === '*' && next === '/') { blockComment = false; i++; }
                        continue;
                    }
                    if (quote) {
                        if (escaped) { escaped = false; continue; }
                        if (ch === '\\') { escaped = true; continue; }
                        if (ch === quote) quote = null;
                        continue;
                    }
                    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
                    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
                    if (ch === "'" || ch === '"' || ch === '`') quote = ch;
                }
                return !!quote || lineComment || blockComment;
            }

            // Find an unfinished HTML tag without treating > inside quoted attributes as tag end.
            function findOpenHtmlTagStart(text) {
                let tagStart = -1;
                let quote = null;
                let inComment = false;
                for (let i = 0; i < text.length; i++) {
                    if (inComment) {
                        if (text.slice(i, i + 3) === '-->') {
                            inComment = false;
                            i += 2;
                        }
                        continue;
                    }
                    if (!quote && text.slice(i, i + 4) === '<!--') {
                        inComment = true;
                        tagStart = -1;
                        i += 3;
                        continue;
                    }
                    const ch = text.charAt(i);
                    if (quote) {
                        if (ch === quote) quote = null;
                        continue;
                    }
                    if (tagStart >= 0 && (ch === '"' || ch === "'")) {
                        quote = ch;
                        continue;
                    }
                    if (ch === '<') tagStart = i;
                    else if (ch === '>') tagStart = -1;
                }
                return tagStart;
            }

            function getWordAndContext(ta, lang) {
                const val = ta.value;
                const pos = ta.selectionStart;
                const before = val.substring(0, pos);

                if (lang === 'html') {
                    const tagLt = findOpenHtmlTagStart(before);

                    // CSS completion inside an unfinished inline style attribute.
                    if (tagLt >= 0 && before.slice(tagLt, tagLt + 4) !== '<!--') {
                        const tagFragment = before.slice(tagLt);
                        const styleMatch = tagFragment.match(/\bstyle\s*=\s*(["'])((?:(?!\1)[\s\S])*)$/i);
                        if (styleMatch) {
                            const cssBefore = styleMatch[2];
                            const declaration = cssBefore.match(/(?:^|;)\s*([a-zA-Z-][\w-]*)\s*:\s*([^;]*)$/);
                            if (declaration) {
                                const valueText = declaration[2];
                                if (isInsideCssString(valueText)) return null;
                                const valueMatch = valueText.match(/([a-zA-Z0-9_#.%+-]+)$/);
                                const word = valueMatch ? valueMatch[1] : '';
                                return { word: word, from: pos - word.length, to: pos, kind: 'cssValue', property: declaration[1].toLowerCase(), inlineStyle: true };
                            }
                            const propertyMatch = cssBefore.match(/(?:^|;)\s*([a-zA-Z-][\w-]*)?$/);
                            if (propertyMatch) {
                                const word = propertyMatch[1] || '';
                                return { word: word, from: pos - word.length, to: pos, kind: 'cssProperty', inlineStyle: true };
                            }
                        }
                    }

                    if (tagLt < 0) return null;
                    const fragment = before.slice(tagLt);
                    const tagMatch = fragment.match(/^<\/?([a-zA-Z][\w:-]*)/);
                    if (!tagMatch) return null;
                    const tag = tagMatch[1].toLowerCase();
                    if (fragment.charAt(1) === '/') {
                        const m = fragment.match(/^<\/([a-zA-Z][\w:-]*)$/);
                        return m ? { word: m[1], from: pos - m[1].length, to: pos, kind: 'htmlTag' } : null;
                    }
                    const afterName = fragment.slice(tagMatch[0].length);
                    if (!afterName.length && !/\s/.test(fragment.slice(-1))) {
                        return { word: tagMatch[1], from: pos - tagMatch[1].length, to: pos, kind: 'htmlTag' };
                    }
                    if (/^\s/.test(afterName)) {
                        if (/=\s*$/.test(afterName) || /=\s*["'][^"']*$/.test(afterName)) return null;
                        const attrMatch = afterName.match(/([^\s"'<>/=]*)$/);
                        if (!attrMatch) return null;
                        return { word: attrMatch[1], from: pos - attrMatch[1].length, to: pos, kind: 'htmlAttr', tag: tag };
                    }
                    return { word: tagMatch[1], from: pos - tagMatch[1].length, to: pos, kind: 'htmlTag' };
                }
                if (lang === 'css') {
                    const clean = maskCssComments(before);
                    const depth = (clean.match(/\{/g) || []).length - (clean.match(/\}/g) || []).length;

                    // At-rules can occur both at the top level and inside supported grouping rules.
                    const atRuleLineStart = Math.max(clean.lastIndexOf('\n'), clean.lastIndexOf('{'), clean.lastIndexOf('}'), clean.lastIndexOf(';')) + 1;
                    const atRuleLine = clean.slice(atRuleLineStart);
                    const atRule = atRuleLine.match(/^\s*(@[\w-]*)$/);
                    if (atRule) {
                        return { word: atRule[1], from: pos - atRule[1].length, to: pos, kind: 'cssAtRule' };
                    }

                    if (depth <= 0) {
                        const selectorLineStart = Math.max(clean.lastIndexOf('\n'), clean.lastIndexOf('{'), clean.lastIndexOf('}')) + 1;
                        const selectorLine = clean.slice(selectorLineStart);

                        const pseudoElement = selectorLine.match(/::([\w-]*)$/);
                        if (pseudoElement) {
                            return { word: pseudoElement[1], from: pos - pseudoElement[1].length, to: pos, kind: 'cssPseudoElement' };
                        }

                        const pseudoClass = selectorLine.match(/:([\w-]*)$/);
                        if (pseudoClass && selectorLine.charAt(pseudoClass.index - 1) !== ':') {
                            return { word: pseudoClass[1], from: pos - pseudoClass[1].length, to: pos, kind: 'cssPseudoClass' };
                        }
                        return null;
                    }
                    const lineStart = Math.max(clean.lastIndexOf('{'), clean.lastIndexOf(';'), clean.lastIndexOf('}')) + 1;
                    const line = clean.slice(lineStart);
                    const declaration = line.match(/^\s*([a-zA-Z-][\w-]*)\s*:\s*([^;]*)$/);
                    if (declaration) {
                        const valueText = declaration[2];
                        if (isInsideCssString(valueText)) return null;
                        const m = valueText.match(/([a-zA-Z0-9_#.%+-]+)$/);
                        return { word: m ? m[1] : '', from: m ? pos - m[1].length : pos, to: pos, kind: 'cssValue', property: declaration[1].toLowerCase() };
                    }
                    const m = line.match(/^\s*([a-zA-Z-][\w-]*)?$/);
                    if (!m) return null;
                    const word = m[1] || '';
                    return { word: word, from: pos - word.length, to: pos, kind: 'cssProperty' };
                }
                if (lang === 'js') {
                    if (isInsideJsStringOrComment(before)) return null;
                    const member = before.match(/([a-zA-Z_$][\w$]*)\.([a-zA-Z_$][\w$]*)?$/);
                    if (member) {
                        const word = member[2] || '';
                        return { word: word, from: pos - word.length, to: pos, kind: 'jsMember', root: member[1] };
                    }
                    const m = before.match(/([a-zA-Z_$][\w$]*)$/);
                    if (!m) return null;
                    return { word: m[1], from: pos - m[1].length, to: pos, kind: 'jsWord' };
                }
                return null;
            }

            // Resolve a contextual continuation at the caret. Rules are curated in
            // next-word-suggestions.js and only run outside strings and comments.
            function getNextWordContext(ta, lang) {
                if (!ta || ta.selectionStart !== ta.selectionEnd) return null;
                const pos = ta.selectionStart;
                let before = ta.value.slice(0, pos);

                if (lang === 'js' && isInsideJsStringOrComment(before)) return null;
                if (lang === 'css') {
                    before = maskCssComments(before);
                    if (isInsideCssString(before)) return null;
                }
                if (lang === 'html' && findOpenHtmlTagStart(before) < 0) return null;

                const data = getIntelliSenseData();
                const rules = data.nextWordRules && data.nextWordRules[lang];
                if (!Array.isArray(rules)) return null;

                for (let i = 0; i < rules.length; i++) {
                    const rule = rules[i];
                    const match = rule.pattern && rule.pattern.exec(before);
                    if (!match) continue;
                    const items = Array.isArray(rule.items)
                        ? rule.items
                        : (typeof rule.create === 'function' ? rule.create(match, before) : []);
                    if (!Array.isArray(items) || !items.length) continue;
                    return { kind: 'nextWord', word: '', from: pos, to: pos, lang: lang, items: items };
                }
                return null;
            }

            function asItem(item) {
                return typeof item === 'string' ? { label: item, insert: item, description: '' } : item;
            }
            function filterList(list, word) {
                const w = (word || '').toLowerCase();
                const out = [];
                const seenLabels = new Set();
                const items = (list || []).map(asItem);
                for (let i = 0; i < items.length; i++) {
                    const label = String(items[i].label || items[i].insert || '');
                    if (!label || seenLabels.has(label.toLowerCase())) continue;
                    seenLabels.add(label.toLowerCase());
                    if (!w || label.toLowerCase().startsWith(w)) {
                        out.push(items[i]);
                        if (out.length >= 24) break;
                    }
                }
                return out;
            }

            function completionList(ctx) {
                const data = getIntelliSenseData();
                if (ctx.kind === 'nextWord') return filterList(ctx.items || [], '');
                if (ctx.kind === 'cssAtRule') return filterList(data.cssAtRules || [], ctx.word);
                if (ctx.kind === 'cssPseudoClass') return filterList(data.cssPseudoClasses || [], ctx.word);
                if (ctx.kind === 'cssPseudoElement') return filterList(data.cssPseudoElements || [], ctx.word);
                if (ctx.kind === 'htmlTag') {
                    return filterList(data.htmlTags || HTML_TAGS, ctx.word);
                }
                if (ctx.kind === 'htmlAttr') {
                    const attrs = (data.htmlAttributes || []).concat((data.htmlAttrsByTag || {})[ctx.tag] || []);
                    return filterList(Array.from(new Set(attrs)).map(function (name) {
                        const hasValue = /^(class|id|style|title|alt|src|href|placeholder|name|value|type|role|lang|dir|for|target|rel|method|action|width|height|colspan|rowspan|scope|accept|autocomplete|pattern|inputmode|on[a-z][a-z0-9-]*|aria-[\w-]+|data-[\w-]+)$/.test(name);
                        return { label: name, insert: hasValue ? name + '=""' : name,
                            caret: hasValue ? name.length + 2 : null };
                    }), ctx.word);
                }
                if (ctx.kind === 'cssProperty') {
                    const snippets = (data.snippets && data.snippets.css) || [];
                    return filterList(snippets.concat(data.cssProperties || CSS_PROPS), ctx.word);
                }
                if (ctx.kind === 'cssValue') {
                    const values = (data.cssValues || {})[ctx.property] || [];
                    const common = ['inherit', 'initial', 'unset', 'revert', 'auto', 'none', 'normal', 'transparent', 'currentColor'];
                    const functions = data.cssFunctions || [];
                    return filterList(values.concat(common, functions), ctx.word);
                }
                if (ctx.kind === 'jsMember') {
                    const members = (data.jsMembers || {})[ctx.root] || [];
                    return filterList(members, ctx.word);
                }
                if (ctx.kind === 'jsWord') {
                    const snippets = (data.snippets && data.snippets.js) || [];
                    return filterList(snippets.concat(data.jsWords || JS_WORDS), ctx.word);
                }
                return [];
            }

            function caretRect(ta, pos) {
                const cs = getComputedStyle(ta);
                measureCtx.font = cs.fontSize + ' ' + cs.fontFamily;
                const charW = measureCtx.measureText('M').width;
                const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
                const lines = ta.value.substring(0, pos).split('\n');
                const row = lines.length - 1;
                const col = lines[row].length;
                const r = ta.getBoundingClientRect();
                return {
                    x: r.left + parseFloat(cs.paddingLeft) + col * charW - ta.scrollLeft,
                    bottom: r.top + parseFloat(cs.paddingTop) + (row + 1) * lh - ta.scrollTop,
                    lh: lh
                };
            }

            function show(items, ta, from, to) {
                currentItems = items;
                currentIndex = 0;
                currentTa = ta;
                currentFrom = from;
                currentTo = to;
                el.innerHTML = items.map(function(raw, i) {
                    const item = asItem(raw);
                    return '<div class="intellisense-item' + (i === 0 ? ' selected' : '') + '" data-idx="' + i + '">' +
                        '<span class="intellisense-label">' + escHtml(item.label || item.insert) + '</span>' +
                        '</div>';
                }).join('');
                el.hidden = false;
                positionDropdown(ta, to);
            }
            function positionDropdown(ta, pos) {
                const c = caretRect(ta, pos);
                const w = el.offsetWidth || 180;
                const h = el.offsetHeight || 180;
                let left = c.x;
                let top  = c.bottom + 4;
                if (left + w > window.innerWidth - 8) left = Math.max(8, window.innerWidth - w - 8);
                if (top + h > window.innerHeight - 8) top = Math.max(8, c.bottom - c.lh - h - 4);
                el.style.left = Math.max(8, left) + 'px';
                el.style.top  = top + 'px';
            }
            function updateSelection() {
                const nodes = el.querySelectorAll('.intellisense-item');
                for (let i = 0; i < nodes.length; i++) nodes[i].classList.toggle('selected', i === currentIndex);
                const sel = el.querySelector('.intellisense-item.selected');
                if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest' });
            }
            function hide() {
                el.hidden = true;
                currentItems = [];
                currentIndex = 0;
                currentTa = null;
            }
            function accept() {
                if (!currentItems.length || !currentTa) return;
                const item = asItem(currentItems[currentIndex]);
                const ta = currentTa;
                const from = currentFrom;
                const to = currentTo;
                hide();
                ta.focus();
                ta.setSelectionRange(from, to);
                justAccepted = true;
                insertText(ta, item.insert || item.label);
                if (Number.isInteger(item.caret) && item.caret > 0) {
                    const caret = from + item.caret;
                    ta.setSelectionRange(caret, caret);
                }
                const acceptedLang = LANGS.find(function(lang) {
                    return editors[lang] && editors[lang].ta === ta;
                });
                if (acceptedLang) {
                    setTimeout(function() {
                        if (document.activeElement !== ta) return;
                        const nextCtx = getNextWordContext(ta, acceptedLang);
                        if (!nextCtx) return;
                        const nextItems = completionList(nextCtx);
                        if (nextItems.length) show(nextItems, ta, nextCtx.from, nextCtx.to);
                    }, 0);
                }
                setTimeout(function() { justAccepted = false; }, 80);
            }
            function onInput(ta, lang, e) {
                if (justAccepted) { justAccepted = false; return; }
                // Re-evaluate after typing, deletion, paste, and other edits; mobile
                // keyboards do not always report inputType as "insertText".
                if (!e || e.isComposing) { hide(); return; }
                const ctx = getWordAndContext(ta, lang) || getNextWordContext(ta, lang);
                if (!ctx || (ctx.kind !== 'nextWord' && ctx.word.length < 1 && !['htmlAttr', 'cssValue', 'cssProperty', 'jsMember', 'cssPseudoClass', 'cssPseudoElement'].includes(ctx.kind))) { hide(); return; }

                const items = completionList(ctx);
                if (!items.length) { hide(); return; }
                if (items.length === 1 && String(asItem(items[0]).label || asItem(items[0]).insert).toLowerCase() === ctx.word.toLowerCase()) { hide(); return; }
                show(items, ta, ctx.from, ctx.to);
            }
            function onKeyDown(e) {
                if (el.hidden) return false;
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        currentIndex = (currentIndex + 1) % currentItems.length;
                        updateSelection();
                        return true;
                    case 'ArrowUp':
                        e.preventDefault();
                        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
                        updateSelection();
                        return true;
                    case 'Enter':
                    case 'Tab':
                        e.preventDefault();
                        accept();
                        return true;
                    case 'Escape':
                        e.preventDefault();
                        hide();
                        return true;
                    case 'ArrowLeft':
                    case 'ArrowRight':
                    case 'Home':
                    case 'End':
                        hide();
                        return false;
                }
                return false;
            }
            el.addEventListener('mousedown', function(e) {
                const item = e.target.closest('.intellisense-item');
                if (!item) return;
                e.preventDefault();
                currentIndex = +item.dataset.idx;
                accept();
            });
            el.addEventListener('mouseover', function(e) {
                const item = e.target.closest('.intellisense-item');
                if (!item) return;
                const idx = +item.dataset.idx;
                if (idx === currentIndex) return;
                currentIndex = idx;
                updateSelection();
            });
            document.addEventListener('pointerdown', function(e) {
                if (!el.hidden && !el.contains(e.target)) hide();
            }, true);
            window.addEventListener('resize', hide);

            return { onInput, onKeyDown, hide, isOpen: function() { return !el.hidden; } };
        })();

        // ==========================================
        //  Color Picker
        // ==========================================
        const picker = (function() {
            const SV_SIZE = 108, RING_R = 90, CENTER = 100;
            const el = document.createElement('div');
            el.className = 'cp';
            el.hidden = true;
            el.innerHTML =
                '<div class="cp-wheel"><div class="cp-ring"></div><div class="cp-inner"></div>' +
                '<div class="cp-sv"><div class="cp-sv-handle"></div></div><div class="cp-ring-handle"></div></div>' +
                '<div class="cp-row"><div class="cp-swatch"><span class="cp-old"></span><span class="cp-new"></span></div>' +
                '<input class="cp-text" type="text" spellcheck="false" autocomplete="off">' +
                '<select class="cp-fmt"><option value="hex">HEX</option><option value="rgb">RGB</option><option value="hsl">HSL</option></select></div>' +
                '<div class="cp-actions"><button type="button" class="cp-ok">✔ Apply Color</button>' +
                '<button type="button" class="cp-cancel">Cancel</button></div>';
            document.body.appendChild(el);

            const wheel = el.querySelector('.cp-wheel');
            const ring = el.querySelector('.cp-ring');
            const ringHandle = el.querySelector('.cp-ring-handle');
            const sv = el.querySelector('.cp-sv');
            const svHandle = el.querySelector('.cp-sv-handle');
            const oldSw = el.querySelector('.cp-old');
            const newSw = el.querySelector('.cp-new');
            const textIn = el.querySelector('.cp-text');
            const fmtSel = el.querySelector('.cp-fmt');

            let h = 204, s = 0.7626, v = 0.8588;
            let ctx = null;
            let timer = null;

            function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
            function hsvToRgb(hh, ss, vv) {
                const c = vv * ss;
                const x = c * (1 - Math.abs((hh / 60) % 2 - 1));
                const m = vv - c;
                let r, g, b;
                if (hh < 60)       { r = c; g = x; b = 0; }
                else if (hh < 120) { r = x; g = c; b = 0; }
                else if (hh < 180) { r = 0; g = c; b = x; }
                else if (hh < 240) { r = 0; g = x; b = c; }
                else if (hh < 300) { r = x; g = 0; b = c; }
                else               { r = c; g = 0; b = x; }
                return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
            }
            function rgbToHsv(r, g, b) {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
                let hh = 0;
                if (d !== 0) {
                    if (max === r)      hh = 60 * (((g - b) / d) % 6);
                    else if (max === g) hh = 60 * ((b - r) / d + 2);
                    else                hh = 60 * ((r - g) / d + 4);
                    if (hh < 0) hh += 360;
                }
                return { h: hh, s: max === 0 ? 0 : d / max, v: max };
            }
            function rgbToHsl(r, g, b) {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
                const l = (max + min) / 2;
                let hh = 0, ss = 0;
                if (d !== 0) {
                    ss = d / (1 - Math.abs(2 * l - 1));
                    if (max === r)      hh = 60 * (((g - b) / d) % 6);
                    else if (max === g) hh = 60 * ((b - r) / d + 2);
                    else                hh = 60 * ((r - g) / d + 4);
                    if (hh < 0) hh += 360;
                }
                return [Math.round(hh), Math.round(ss * 100), Math.round(l * 100)];
            }
            function toHex(rgb) {
                return '#' + rgb.map(function(n) {
                    return clamp(n, 0, 255).toString(16).padStart(2, '0');
                }).join('');
            }
            function formatColor(rgb) {
                const f = fmtSel.value;
                if (f === 'rgb') return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
                if (f === 'hsl') {
                    const c = rgbToHsl(rgb[0], rgb[1], rgb[2]);
                    return 'hsl(' + c[0] + ', ' + c[1] + '%, ' + c[2] + '%)';
                }
                return toHex(rgb);
            }
            function parseColor(str) {
                str = (str || '').trim();
                let m = str.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
                if (m) {
                    let x = m[1];
                    if (x.length === 3) x = x.charAt(0) + x.charAt(0) + x.charAt(1) + x.charAt(1) + x.charAt(2) + x.charAt(2);
                    return rgbToHsv(parseInt(x.substr(0, 2), 16), parseInt(x.substr(2, 2), 16), parseInt(x.substr(4, 2), 16));
                }
                m = str.match(/^rgba?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})/i);
                if (m) return rgbToHsv(clamp(+m[1], 0, 255), clamp(+m[2], 0, 255), clamp(+m[3], 0, 255));
                m = str.match(/^hsla?\(\s*(\d{1,3}(?:\.\d+)?)\s*[, ]\s*(\d{1,3}(?:\.\d+)?)%\s*[, ]\s*(\d{1,3}(?:\.\d+)?)%/i);
                if (m) {
                    const hh = (+m[1]) % 360, ss = clamp(+m[2], 0, 100) / 100, ll = clamp(+m[3], 0, 100) / 100;
                    const vv = ll + ss * Math.min(ll, 1 - ll);
                    return { h: hh, s: vv === 0 ? 0 : 2 * (1 - ll / vv), v: vv };
                }
                return null;
            }
            function render(skipText) {
                const rgb = hsvToRgb(h, s, v);
                sv.style.backgroundColor = 'hsl(' + h + ',100%,50%)';
                svHandle.style.left = (s * SV_SIZE) + 'px';
                svHandle.style.top = ((1 - v) * SV_SIZE) + 'px';
                const rad = h * Math.PI / 180;
                ringHandle.style.left = (CENTER + RING_R * Math.sin(rad)) + 'px';
                ringHandle.style.top = (CENTER - RING_R * Math.cos(rad)) + 'px';
                newSw.style.background = toHex(rgb);
                if (!skipText) textIn.value = formatColor(rgb);
            }
            function setHsv(c, keepHueWhenGray) {
                if (keepHueWhenGray && (c.s === 0 || c.v === 0)) c.h = h;
                h = c.h; s = c.s; v = c.v;
            }
            function bindDrag(target, handler) {
                target.addEventListener('pointerdown', function(e) {
                    e.preventDefault();
                    target.setPointerCapture(e.pointerId);
                    handler(e);
                    function move(ev) { handler(ev); }
                    function up() {
                        target.removeEventListener('pointermove', move);
                        target.removeEventListener('pointerup', up);
                        target.removeEventListener('pointercancel', up);
                    }
                    target.addEventListener('pointermove', move);
                    target.addEventListener('pointerup', up);
                    target.addEventListener('pointercancel', up);
                });
            }
            bindDrag(ring, function(e) {
                const r = wheel.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                let ang = Math.atan2(dx, -dy) * 180 / Math.PI;
                if (ang < 0) ang += 360;
                h = ang % 360;
                render(false);
            });
            bindDrag(sv, function(e) {
                const r = sv.getBoundingClientRect();
                s = clamp((e.clientX - r.left) / r.width, 0, 1);
                v = 1 - clamp((e.clientY - r.top) / r.height, 0, 1);
                render(false);
            });
            textIn.addEventListener('input', function() {
                const c = parseColor(textIn.value);
                if (c) { setHsv(c, true); render(true); }
            });
            textIn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); apply(); }
            });
            fmtSel.addEventListener('change', function() { render(false); });
            el.addEventListener('mousedown', function(e) {
                if (!e.target.closest('input,select')) e.preventDefault();
            });
            function apply() {
                if (!ctx) return;
                const c = ctx;
                const text = ': ' + formatColor(hsvToRgb(h, s, v)) + ';';
                close();
                c.ta.focus();
                c.ta.setSelectionRange(c.pos, c.pos + c.replaceLen);
                insertText(c.ta, text);
            }
            function close() { clearTimeout(timer); el.hidden = true; ctx = null; }
            el.querySelector('.cp-ok').addEventListener('click', apply);
            el.querySelector('.cp-cancel').addEventListener('click', function() {
                const ta = ctx && ctx.ta; close(); if (ta) ta.focus();
            });
            document.addEventListener('pointerdown', function(e) {
                if (!el.hidden && !el.contains(e.target)) close();
            }, true);
            document.addEventListener('keydown', function(e) {
                if (!el.hidden && e.key === 'Escape') {
                    e.preventDefault();
                    const ta = ctx && ctx.ta; close(); if (ta) ta.focus();
                }
            }, true);
            window.addEventListener('resize', closeIfOpen);

            function isColorContext(val, pos, lang) {
                const before = val.substring(0, pos);
                let token = null;
                if (lang === 'css') {
                    const clean = before.replace(/\/\*[\s\S]*?(?:\*\/|$)/g, '');
                    const depth = (clean.match(/\{/g) || []).length - (clean.match(/\}/g) || []).length;
                    if (depth <= 0) return false;
                    const line = clean.substring(clean.lastIndexOf('\n') + 1);
                    const m = line.match(/(?:^|[{;])\s*([\w-]*)$/);
                    token = m && m[1];
                } else if (lang === 'html') {
                    const tag = before.substring(before.lastIndexOf('<'));
                    if (!/\sstyle\s*=\s*(["'])(?:(?!\1)[^<])*$/i.test(tag)) return false;
                    const m = before.match(/[\s"';]([\w-]*)$/);
                    token = m && m[1];
                } else { return false; }
                return !!token && (token.toLowerCase() === 'color' || /-color$/i.test(token));
            }
            const measureCtx2 = document.createElement('canvas').getContext('2d');
            function caretRect2(ta, pos) {
                const cs = getComputedStyle(ta);
                measureCtx2.font = cs.fontSize + ' ' + cs.fontFamily;
                const charW = measureCtx2.measureText('M').width;
                const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
                const lines = ta.value.substring(0, pos).split('\n');
                const row = lines.length - 1;
                const col = lines[row].length;
                const r = ta.getBoundingClientRect();
                return {
                    x: r.left + parseFloat(cs.paddingLeft) + col * charW - ta.scrollLeft,
                    bottom: r.top + parseFloat(cs.paddingTop) + (row + 1) * lh - ta.scrollTop,
                    lh: lh
                };
            }
            function openAt(ta, pos, lang) {
                const rest = ta.value.substring(pos);
                const rm = rest.match(/^[ \t]*:[ \t]*([^;\n}"']*);?/);
                const initial = rm ? parseColor(rm[1]) : null;
                ctx = { ta: ta, pos: pos, replaceLen: rm ? rm[0].length : 0 };
                if (initial) setHsv(initial, true);
                else { h = 204; s = 0.7626; v = 0.8588; }
                oldSw.style.background = toHex(hsvToRgb(h, s, v));
                render(false);
                el.hidden = false;
                const c = caretRect2(ta, pos);
                const w = el.offsetWidth, hgt = el.offsetHeight;
                let left = clamp(c.x, 8, Math.max(8, window.innerWidth - w - 8));
                let top = c.bottom + 6;
                if (top + hgt > window.innerHeight - 8) top = c.bottom - c.lh - hgt - 6;
                top = clamp(top, 8, Math.max(8, window.innerHeight - hgt - 8));
                el.style.left = left + 'px';
                el.style.top = top + 'px';
            }
            function onInput(ta, lang, e) {
                clearTimeout(timer); close();
                if (lang === 'js') return;
                if (!e || e.inputType !== 'insertText' || !e.data || e.data.toLowerCase() !== 'r') return;
                const pos = ta.selectionStart;
                if (!isColorContext(ta.value, pos, lang)) return;
                timer = setTimeout(function() {
                    if (document.activeElement === ta && ta.selectionStart === pos &&
                        isColorContext(ta.value, pos, lang)) {
                        openAt(ta, pos, lang);
                    }
                }, 300);
            }
            function closeIfOpen() { if (!el.hidden) close(); }
            return { onInput, close, closeIfOpen };
        })();

        // ==========================================
        //  Search
        // ==========================================
        const searchInput    = document.getElementById('searchInput');
        const searchCount    = document.getElementById('searchCount');
        const searchResults  = document.getElementById('searchResults');
        const searchPrevBtn  = document.getElementById('searchPrev');
        const searchNextBtn  = document.getElementById('searchNext');
        const searchClearBtn = document.getElementById('searchClear');

        let searchMatches = [];
        let searchIndex = -1;
        let searchTimer = null;

        function performSearch(query) {
            searchMatches = [];
            searchIndex = -1;
            const ed = (activeTab !== 'libs') ? editors[activeTab] : null;
            if (!ed || !query) { renderSearchResults(); return; }

            const text  = ed.ta.value;
            const lower = text.toLowerCase();
            const q     = query.toLowerCase();
            const qLen  = query.length;
            const lineStarts = [0];
            for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) lineStarts.push(i + 1);
            let pos = 0;
            while (true) {
                const idx = lower.indexOf(q, pos);
                if (idx === -1) break;
                let lo = 0, hi = lineStarts.length - 1;
                while (lo < hi) {
                    const mid = (lo + hi + 1) >> 1;
                    if (lineStarts[mid] <= idx) lo = mid; else hi = mid - 1;
                }
                searchMatches.push({ start: idx, end: idx + qLen, line: lo + 1 });
                pos = idx + Math.max(1, qLen);
            }
            renderSearchResults();
        }
        function scheduleSearch() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function() {
                performSearch(searchInput.value);
                // Re-render the syntax layer so every match is highlighted as the query changes.
                if (editors[activeTab]) editors[activeTab].refresh();
            }, 120);
        }
        function renderSearchResults() {
            const n = searchMatches.length;
            searchCount.textContent = n;
            searchCount.classList.toggle('zero', n === 0);
            if (!searchInput.value || n === 0) {
                searchResults.hidden = true;
                searchResults.innerHTML = '';
                return;
            }
            const lineMap = new Map();
            searchMatches.forEach(function(m, i) { if (!lineMap.has(m.line)) lineMap.set(m.line, i); });
            const parts = [];
            let first = true;
            lineMap.forEach(function(idx, line) {
                if (!first) parts.push('<span class="search-sep">-</span>');
                first = false;
                parts.push('<button type="button" class="search-line" data-idx="' + idx + '">' + line + '</button>');
            });
            searchResults.innerHTML = parts.join('');
            searchResults.hidden = false;
        }
        function jumpToMatch(idx) {
            const m = searchMatches[idx];
            if (!m) return;
            const ed = editors[activeTab];
            if (!ed) return;
            const ta = ed.ta;
            ta.focus();
            ta.setSelectionRange(m.start, m.end);
            const cs = getComputedStyle(ta);
            const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
            ta.scrollTop = Math.max(0, (m.line - 4) * lh);
            ed.syncScroll();
            searchIndex = idx;
            searchResults.querySelectorAll('.search-line').forEach(function(b) {
                b.classList.toggle('active', +b.dataset.idx === idx);
            });
            const activeBtn = searchResults.querySelector('.search-line.active');
            if (activeBtn && activeBtn.scrollIntoView) activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
        function nextMatch() { if (!searchMatches.length) return; jumpToMatch(searchIndex < 0 ? 0 : (searchIndex + 1) % searchMatches.length); }
        function prevMatch() { if (!searchMatches.length) return; jumpToMatch(searchIndex < 0 ? searchMatches.length - 1 : (searchIndex - 1 + searchMatches.length) % searchMatches.length); }
        function clearSearch() {
            searchInput.value = '';
            searchMatches = []; searchIndex = -1;
            renderSearchResults();
            if (editors[activeTab]) editors[activeTab].ta.focus();
        }
        searchInput.addEventListener('input', scheduleSearch);
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); if (e.shiftKey) prevMatch(); else nextMatch(); }
            else if (e.key === 'Escape') { e.preventDefault(); clearSearch(); }
        });
        searchPrevBtn.addEventListener('click', prevMatch);
        searchNextBtn.addEventListener('click', nextMatch);
        searchClearBtn.addEventListener('click', clearSearch);
        searchResults.addEventListener('click', function(e) {
            const btn = e.target.closest('.search-line');
            if (!btn) return;
            jumpToMatch(+btn.dataset.idx);
        });

        // ==========================================
        //  Create editor
        // ==========================================
        const VOID_TAGS = ['area','base','br','col','embed','hr','img','input',
                           'link','meta','param','source','track','wbr'];

        function applySearchHighlights(code, query) {
            const term = String(query || '');
            if (term.length < 2) return;
            const lowerTerm = term.toLocaleLowerCase();
            const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(function(node) {
                const value = node.nodeValue || '';
                const lowerValue = value.toLocaleLowerCase();
                let from = 0;
                let index = lowerValue.indexOf(lowerTerm, from);
                if (index < 0) return;
                const fragment = document.createDocumentFragment();
                while (index >= 0) {
                    if (index > from) fragment.appendChild(document.createTextNode(value.slice(from, index)));
                    const mark = document.createElement('mark');
                    mark.className = 'search-match-highlight';
                    mark.textContent = value.slice(index, index + term.length);
                    fragment.appendChild(mark);
                    from = index + term.length;
                    index = lowerValue.indexOf(lowerTerm, from);
                }
                if (from < value.length) fragment.appendChild(document.createTextNode(value.slice(from)));
                node.parentNode.replaceChild(fragment, node);
            });
        }

        function createEditor(lang) {
            const wrap = document.createElement('div');
            wrap.className = 'editor-wrap';
            wrap.id = 'panel-' + lang;
            wrap.setAttribute('role', 'tabpanel');
            wrap.setAttribute('aria-labelledby', 'tab-' + lang);
            wrap.hidden = true;
            wrap.innerHTML =
                '<div class="line-numbers">1</div>' +
                '<div class="code-wrap">' +
                    '<pre class="highlight" aria-hidden="true"><code></code></pre>' +
                    '<textarea class="input" wrap="off" spellcheck="false" autocomplete="off" ' +
                    'autocorrect="off" autocapitalize="off" aria-label="Editor ' + lang + '"></textarea>' +
                '</div>';
            editorsBox.appendChild(wrap);

            const lineNumbers = wrap.querySelector('.line-numbers');
            const pre         = wrap.querySelector('.highlight');
            const code        = pre.querySelector('code');
            const ta          = wrap.querySelector('textarea');
            const highlight   = HIGHLIGHTERS[lang];

            function syncScroll() {
                pre.scrollTop  = ta.scrollTop;
                pre.scrollLeft = ta.scrollLeft;
                lineNumbers.scrollTop = ta.scrollTop;
            }
            function refresh() {
                code.innerHTML = highlight(ta.value) + '\n';
                applySearchHighlights(code, searchInput.value);
                const count = ta.value.split('\n').length;
                const parts = new Array(count);
                for (let i = 0; i < count; i++) parts[i] = i + 1;
                lineNumbers.textContent = parts.join('\n');
                syncScroll();
            }

            ta.addEventListener('paste', function(e) {
                if (lang !== 'html' || !e.clipboardData) return;
                // Prefer plain text so code copied from GitHub is not mistaken for clipboard formatting markup.
                const pasted = e.clipboardData.getData('text/plain') || e.clipboardData.getData('text/html');
                if (!pasted || !(/<!doctype\s+html\b|<html\b|<head\b|<body\b/i).test(pasted)) return;

                let parsed;
                try {
                    parsed = new DOMParser().parseFromString(pasted, 'text/html');
                    if (!parsed || !parsed.documentElement || !parsed.body) return;
                } catch (error) {
                    showToast('⚠️ HTML document could not be parsed; pasted text was left unchanged.', 'warning');
                    return;
                }

                e.preventDefault();
                const title = parsed.querySelector('head > title');
                project.documentTitle = title ? title.textContent.trim().slice(0, 200) || 'My Page' : 'My Page';
                const headNodes = Array.from(parsed.head ? parsed.head.children : []);
                const extras = [];
                const styles = [];
                headNodes.forEach(function(node) {
                    const tag = node.tagName.toLowerCase();
                    if (tag === 'title' || tag === 'style') {
                        if (tag === 'style' && node.textContent.trim()) styles.push(node.textContent.trim());
                        return;
                    }
                    if (tag === 'meta' && (node.hasAttribute('charset') ||
                        (node.getAttribute('name') || '').toLowerCase() === 'viewport')) return;
                    extras.push(node.outerHTML);
                });
                project.headExtras = extras.join('\n');

                const cssEditor = editors.css && editors.css.ta;
                if (styles.length && cssEditor) {
                    cssEditor.value = [cssEditor.value.trim(), styles.join('\n\n')].filter(Boolean).join('\n\n');
                    cssEditor.dispatchEvent(new Event('input', { bubbles: true }));
                }
                ta.value = parsed.body.innerHTML;
                ta.dispatchEvent(new Event('input', { bubbles: true }));
                showToast('✅ Full HTML document normalized. Body, title, styles, and supported head elements were retained.', 'success');
            });

            ta.addEventListener('input', function(e) {
                const activeId = project.lastActiveByLang[lang];
                const file = activeId ? getFile(activeId) : null;
                if (file && file.type === lang) {
                    file.content = ta.value;
                } else {
                    const f = project.files.find(function(x) { return x.type === lang; });
                    if (f) { f.content = ta.value; project.lastActiveByLang[lang] = f.id; }
                }

                refresh();
                setDirty(true);
                scheduleSaveProject();
                schedulePreview();
                IntelliSense.onInput(ta, lang, e);
                picker.onInput(ta, lang, e);
            });

            ta.addEventListener('scroll', function() {
                syncScroll();
                picker.closeIfOpen();
                IntelliSense.hide();
            });

            ta.addEventListener('keydown', function(e) {
                if (e.isComposing) return;

                if (IntelliSense.onKeyDown(e)) return;
                picker.close();

                if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    indentSelection(ta, e.shiftKey);
                    return;
                }
                if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
                    handleEnter(e, ta, lang);
                    return;
                }
                if (lang === 'html' && e.key === '>' && !e.ctrlKey && !e.metaKey && !e.altKey &&
                    ta.selectionStart === ta.selectionEnd) {
                    const start  = ta.selectionStart;
                    const before = ta.value.substring(0, start);
                    const match  = before.match(/<([a-zA-Z][\w:-]*)(?:\s[^<>]*)?$/);
                    if (match && !before.endsWith('/')) {
                        const tagName = match[1].toLowerCase();
                        if (!VOID_TAGS.includes(tagName)) {
                            e.preventDefault();
                            insertText(ta, '></' + match[1] + '>');
                            ta.setSelectionRange(start + 1, start + 1);
                        }
                    }
                }
            });

            return { lang, wrap, ta, refresh, syncScroll };
        }

        // ==========================================
        //  Save / Download
        // ==========================================
        function saveCode() {
            if (!saveProject()) {
                setDirty(true);
                return;
            }
            setDirty(false);
            showToast('✅ ذخیره با موفقیت انجام شد.', 'success');
        }

        function downloadFile(content, filename, mime) {
            const blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function() { URL.revokeObjectURL(url); }, 1500);
        }
        function sanitizeFilename(name) {
            let s = String(name || 'my-project').trim();
            s = s.replace(/[\\/:*?"<>|]+/g, '-');
            s = s.replace(/\s+/g, '-');
            s = s.replace(/-+/g, '-');
            s = s.replace(/^-|-$/g, '');
            if (!s) s = 'my-project';
            return s.substring(0, 50);
        }
        function buildLibsTextFile() {
            const enabledLibs = libraries.filter(function(l) { return l.enabled; });
            if (!enabledLibs.length) return '/* هیچ کتابخانه فعالی وجود ندارد */\n';
            const lines = [];
            lines.push('/* ====================================================');
            lines.push('   Active project libraries');
            lines.push('   Date: ' + new Date().toLocaleString('en-US'));
            lines.push('   Count: ' + enabledLibs.length);
            lines.push('   ==================================================== */');
            lines.push('');
            enabledLibs.forEach(function(lib, i) {
                lines.push('/* ====================================================');
                lines.push('   [' + (i + 1) + '] ' + safeCommentLabel(lib.name) + '  (' + lib.type.toUpperCase() + ')');
                lines.push('   ==================================================== */');
                lines.push(lib.code);
                lines.push('');
            });
            return lines.join('\n');
        }
        function buildAllCssCombined() {
            const parts = [];
            libraries.filter(function(l) { return l.enabled && l.type === 'css'; })
                .forEach(function(l) { parts.push('/* === ' + safeCommentLabel(l.name) + ' (lib) === */\n' + l.code); });
            project.files.filter(function(f) { return f.type === 'css'; })
                .forEach(function(f) { parts.push('/* === ' + safeCommentLabel(f.name) + ' === */\n' + f.content); });
            return parts.join('\n\n');
        }
        function buildAllJsCombined() {
            const parts = [];
            libraries.filter(function(l) { return l.enabled && l.type === 'js'; })
                .forEach(function(l) { parts.push('/* === ' + safeCommentLabel(l.name) + ' (lib) === */\n' + l.code); });
            project.files.filter(function(f) { return f.type === 'js'; })
                .forEach(function(f) { parts.push('/* === ' + safeCommentLabel(f.name) + ' === */\n' + f.content); });
            return parts.join('\n\n');
        }
        function downloadSingle(name) {
            const safe = sanitizeFilename(name);
            downloadFile(buildDocument(true), safe + '.html', 'text/html;charset=utf-8');
            showToast('⬇ File ' + safe + '.html downloaded', 'info');
        }
        function downloadBundle(name) {
            const safe = sanitizeFilename(name);
            const files = [
                { content: buildDocument(true, safe), filename: safe + '.html',     mime: 'text/html;charset=utf-8' },
                { content: buildAllCssCombined(), filename: safe + '.css',      mime: 'text/css;charset=utf-8' },
                { content: buildAllJsCombined(),  filename: safe + '.js',       mime: 'text/javascript;charset=utf-8' },
                { content: buildLibsTextFile(),   filename: safe + '.libs.txt', mime: 'text/plain;charset=utf-8' }
            ];
            files.forEach(function(f, i) {
                setTimeout(function() { downloadFile(f.content, f.filename, f.mime); }, i * 250);
            });
            showToast('⬇ 4 files named “' + safe + '” will be downloaded', 'success');
        }

        const nameModal = document.getElementById('nameModal');
        function getDownloadBaseName() {
            const activeFile = project.files.find(function(file) { return file.id === project.activeFileId; });
            if (!activeFile || !activeFile.name) return 'my-project';
            // Use the name saved in File Explorer, removing only a matching file extension.
            const extension = /\.(html?|css|mjs|js)$/i;
            return sanitizeFilename(activeFile.name.replace(extension, '')) || 'my-project';
        }
        function openNameModal() {
            nameModal.hidden = false;
        }
        function closeNameModal() { nameModal.hidden = true; }
        document.getElementById('modalCancel').addEventListener('click', closeNameModal);
        document.getElementById('modalDownloadSingle').addEventListener('click', function() {
            const name = getDownloadBaseName();
            closeNameModal();
            downloadSingle(name);
        });
        document.getElementById('modalDownloadBundle').addEventListener('click', function() {
            const name = getDownloadBaseName();
            closeNameModal();
            downloadBundle(name);
        });
        nameModal.addEventListener('click', function(e) { if (e.target === nameModal) closeNameModal(); });

        // ==========================================
        //  Toast / Font
        // ==========================================
        let toastTimer;
        function showToast(msg, type, actionLabel, onAction) {
            toast.replaceChildren();
            const message = document.createElement('span');
            message.textContent = msg;
            toast.appendChild(message);
            if (actionLabel && typeof onAction === 'function') {
                const action = document.createElement('button');
                action.type = 'button';
                action.className = 'toast-action';
                action.textContent = actionLabel;
                action.addEventListener('click', function() {
                    clearTimeout(toastTimer);
                    toast.className = 'toast';
                    onAction();
                }, { once: true });
                toast.appendChild(action);
            }
            toast.className = 'toast show ' + (type || '');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function() { toast.className = 'toast ' + (type || ''); }, actionLabel ? 6000 : 2500);
        }
        let fontSize = parseInt(storageGet(FONT_KEY), 10) || 15;
        function applyFontSize() {
            fontSize = Math.max(10, Math.min(30, fontSize));
            document.documentElement.style.setProperty('--editor-font', fontSize + 'px');
            storageSet(FONT_KEY, fontSize);
            if (editors[activeTab]) editors[activeTab].syncScroll();
        }

        // ==========================================
        //  Divider (تغییر اندازه پنل‌ها)
        // ==========================================
        const divider     = document.getElementById('divider');
        const editorPane  = document.querySelector('.editor-pane');
        const containerEl = document.querySelector('.container');

        (function initDivider() {
            const saved = parseFloat(storageGet(SPLIT_KEY));
            if (!isNaN(saved) && saved >= 15 && saved <= 85) {
                editorPane.style.width = saved + '%';
            }

            let dragging = false;

            divider.addEventListener('pointerdown', function(e) {
                e.preventDefault();
                dragging = true;
                divider.classList.add('dragging');
                document.body.style.userSelect = 'none';
                document.body.style.cursor = 'col-resize';
                try { divider.setPointerCapture(e.pointerId); } catch (err) {}
            });

            divider.addEventListener('pointermove', function(e) {
                if (!dragging) return;
                const rect = containerEl.getBoundingClientRect();
                if (rect.width <= 0) return;
                let pct = ((e.clientX - rect.left) / rect.width) * 100;
                pct = Math.max(15, Math.min(85, pct));
                editorPane.style.width = pct + '%';
            });

            function endDrag(e) {
                if (!dragging) return;
                dragging = false;
                divider.classList.remove('dragging');
                document.body.style.userSelect = '';
                document.body.style.cursor = '';
                try { divider.releasePointerCapture(e.pointerId); } catch (err) {}
                const pct = parseFloat(editorPane.style.width);
                if (!isNaN(pct)) storageSet(SPLIT_KEY, pct);
            }
            divider.addEventListener('pointerup', endDrag);
            divider.addEventListener('pointercancel', endDrag);
        })();

        // ==========================================
        //  Buttons
        // ==========================================
        document.getElementById('btnDownload').addEventListener('click', openNameModal);
        document.getElementById('btnUndo').addEventListener('click', doUndo);
        document.getElementById('btnRedo').addEventListener('click', doRedo);

        document.getElementById('btnReset').addEventListener('click', function() {
            if (confirm('All files will be restored to their defaults. Are you sure?')) {
                clearTimeout(autoSaveTimer);
                clearTimeout(dirtyResetTimer);
                project = createDefaultProject();
                const resetSaved = saveProject();
                LANGS.forEach(function(lang) {
                    const f = getFileForLang(lang);
                    if (f) {
                        editors[lang].ta.value = f.content;
                        editors[lang].refresh();
                    }
                });
                renderFileExplorer();
                if (activeTab !== 'libs') {
                    const f = getFileForLang(activeTab);
                    if (f) project.activeFileId = f.id;
                }
                updatePreviewNow();
                setDirty(!resetSaved);
                showToast(resetSaved ? '🔁 Reset complete' : '⚠ Reset is active only in this session; download a backup.', resetSaved ? 'info' : 'error');
            }
        });

        document.getElementById('btnClear').addEventListener('click', function() {
            if (activeTab === 'libs') {
                document.getElementById('libName').value = '';
                document.getElementById('libCode').value = '';
                showToast('🗑 Editor cleared', 'info');
                return;
            }
            const ed = editors[activeTab];
            if (!ed) { showToast('Open an HTML, CSS or JS tab to clear a file', 'info'); return; }
            const f = getFileForLang(activeTab);
            ed.ta.value = '';
            if (f) f.content = '';
            ed.refresh();
            setDirty(true);
            scheduleSaveProject();
            updatePreviewNow();
            showToast('🗑 File cleared', 'info');
        });

        document.getElementById('btnClearAll').addEventListener('click', function() {
            project.files.forEach(function(f) { f.content = ''; });
            LANGS.forEach(function(lang) {
                editors[lang].ta.value = '';
                editors[lang].refresh();
            });
            const saved = saveProject();
            if (saved) setDirty(false);
            updatePreviewNow();
            showToast(saved ? '🧹 All files cleared' : '⚠ Files cleared in this session, but could not be saved.', saved ? 'info' : 'error');
        });

        document.getElementById('btnFontInc').addEventListener('click', function() {
            fontSize++; applyFontSize();
            showToast('Font size: ' + fontSize + 'px', 'info');
        });
        document.getElementById('btnFontDec').addEventListener('click', function() {
            fontSize--; applyFontSize();
            showToast('Font size: ' + fontSize + 'px', 'info');
        });

        // ==========================================
        //  Shortcuts
        // ==========================================
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !nameModal.hidden) { e.preventDefault(); closeNameModal(); return; }
            if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
            const k = String(e.key).toLowerCase();
            if (k === 's' && e.shiftKey) { e.preventDefault(); openNameModal(); return; }
            if (k === 's') { e.preventDefault(); if (project) { clearTimeout(autoSaveTimer); if (saveProject()) { setDirty(false); showToast('✅ Auto-saved', 'success'); } } return; }
            if (k === 'f') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
                return;
            }
            const tag = (e.target && e.target.tagName || '').toUpperCase();
            if (tag === 'TEXTAREA' || tag === 'INPUT') return;
            if (activeTab === 'libs') return;
            if (k === 'z' && !e.shiftKey) { e.preventDefault(); doUndo(); }
            else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); doRedo(); }
        }, true);

        // ==========================================
        //  Init
        // ==========================================
        LANGS.forEach(function(l) { editors[l] = createEditor(l); });

        LANGS.forEach(function(l) {
            editors[l].ta.addEventListener('input', function() {
                if (searchInput.value) scheduleSearch();
            });
        });

        project = loadProject();

        LANGS.forEach(function(lang) {
            if (!project.files.some(function(f) { return f.type === lang; })) {
                const blank = { id: makeId(), name: 'untitled.' + lang, type: lang, content: '' };
                project.files.push(blank);
                project.lastActiveByLang[lang] = blank.id;
            } else if (!project.lastActiveByLang[lang]) {
                const f = project.files.find(function(x) { return x.type === lang; });
                if (f) project.lastActiveByLang[lang] = f.id;
            }
        });
        if (!project.activeFileId || !getFile(project.activeFileId)) {
            project.activeFileId = project.files[0].id;
        }

        LANGS.forEach(function(lang) {
            const f = getFileForLang(lang);
            if (f) {
                editors[lang].ta.value = f.content;
                editors[lang].refresh();
            }
        });

        libraries = loadLibraries();
        renderLibraries();
        renderPresets();
        renderFileExplorer();

        applyFontSize();
        activateTab(storageGet(TAB_KEY) || 'html');

        setDirty(false);
        updatePreviewNow();
        if (projectLoadWarning) {
            if (projectRecoveryAvailable) {
                showToast(projectLoadWarning, 'error', 'Download recovery', function() {
                    const recovery = storageGet(PROJECT_RECOVERY_KEY);
                    if (recovery) downloadFile(recovery, 'project-recovery.json', 'application/json;charset=utf-8');
                });
            } else {
                showToast(projectLoadWarning, 'error');
            }
        }

    })();
    
