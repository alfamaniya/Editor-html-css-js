import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { search, searchKeymap } from "@codemirror/search";
import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";


const editorTheme = EditorView.theme({
  "&": { color: "#E6F0F0", backgroundColor: "#0B1012" },
  ".cm-content": { caretColor: "#55E5D9" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#55E5D9" },
  "&.cm-focused .cm-selectionBackground, ::selection": { backgroundColor: "#193A3A" },
  ".cm-gutters": { backgroundColor: "#0B1012", color: "#91A5A5", border: "none" },
  ".cm-activeLine": { backgroundColor: "#111719" },
  ".cm-activeLineGutter": { backgroundColor: "#192326" },
  ".cm-tooltip": { backgroundColor: "#111719", border: "1px solid #263438" },
  ".cm-tooltip-autocomplete ul li[aria-selected]": { backgroundColor: "#192326", color: "#55E5D9" }
}, { dark: true });

window.EditorCodeMirror = Object.freeze({
  EditorState,
  EditorView,
  extensions: {
    base: [
      lineNumbers(),
      highlightActiveLine(),
      drawSelection(),
      history(),
      autocompletion(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      editorTheme,
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...completionKeymap,
        ...searchKeymap,
        indentWithTab
      ])
    ],
    html: html(),
    css: css(),
    javascript: javascript(),
    search: search()
  }
});
