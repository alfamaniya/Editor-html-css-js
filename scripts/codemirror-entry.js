import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { search, searchKeymap } from "@codemirror/search";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";


const darkHighlightStyle = HighlightStyle.define([
  { tag: tags.meta, color: "#9DA5B4" },
  { tag: tags.link, color: "#4FC1FF", textDecoration: "underline" },
  { tag: tags.heading, color: "#569CD6", fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.keyword, color: "#C586C0" },
  { tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName], color: "#569CD6" },
  { tag: [tags.literal, tags.inserted], color: "#B5CEA8" },
  { tag: [tags.string, tags.deleted], color: "#CE9178" },
  { tag: [tags.regexp, tags.escape, tags.special(tags.string)], color: "#D16969" },
  { tag: tags.definition(tags.variableName), color: "#9CDCFE" },
  { tag: tags.local(tags.variableName), color: "#D4D4D4" },
  { tag: [tags.typeName, tags.namespace, tags.className], color: "#4EC9B0" },
  { tag: [tags.special(tags.variableName), tags.macroName], color: "#DCDCAA" },
  { tag: tags.function(tags.variableName), color: "#DCDCAA" },
  { tag: tags.definition(tags.propertyName), color: "#9CDCFE" },
  { tag: [tags.tagName, tags.angleBracket], color: "#569CD6" },
  { tag: tags.attributeName, color: "#9CDCFE" },
  { tag: tags.attributeValue, color: "#CE9178" },
  { tag: tags.comment, color: "#6A9955" },
  { tag: tags.invalid, color: "#F44747" }
]);

const editorTheme = EditorView.theme({
  "&": { color: "#D4D4D4", backgroundColor: "#1E1E1E" },
  ".cm-content": { caretColor: "#AEAFAD" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#AEAFAD" },
  "&.cm-focused .cm-selectionBackground, ::selection": { backgroundColor: "#264F78" },
  ".cm-gutters": { backgroundColor: "#1E1E1E", color: "#858585", border: "none" },
  ".cm-activeLine": { backgroundColor: "#282828" },
  ".cm-activeLineGutter": { backgroundColor: "#2A2D2E" },
  ".cm-tooltip": { backgroundColor: "#252526", border: "1px solid #3C3C3C" },
  ".cm-tooltip-autocomplete ul li[aria-selected]": { backgroundColor: "#094771", color: "#FFFFFF" }
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
      syntaxHighlighting(darkHighlightStyle),
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
