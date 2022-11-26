import { basicSetup, EditorView } from 'codemirror';
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { markdown } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import {
    javascript,
    javascriptLanguage,
    scopeCompletionSource,
} from '@codemirror/lang-javascript';


function main() {
    //common api: editor.setState(newstate)          editor.dispatch({  changes: { from: 0, to: editor.state.doc.length }  })
    let editor = createMDEditor(document.querySelector("#editor"))
    window.editor = editor;

}


function createJSEditor(element) {
    let editor = new EditorView({
        doc: "console.log('hello')\n",
        extensions: [
            basicSetup,
            keymap.of([indentWithTab]),
            javascript(),
            javascriptLanguage.data.of({
                autocomplete: scopeCompletionSource(globalThis),
            }),
        ],
        parent: element,
    });

    return editor;
}

function createMDEditor(element, doc, listenerFunctions) {

    // The Markdown parser will dynamically load parsers
    // for code blocks, using @codemirror/language-data to
    // look up the appropriate dynamic import.
    let editroInitState = {
        doc: doc,
        extensions: [
            basicSetup,
            keymap.of([indentWithTab]),
            EditorView.lineWrapping,
            markdown({ codeLanguages: languages }),
            javascriptLanguage.data.of({
                autocomplete: scopeCompletionSource(globalThis),
            }),
            EditorView.updateListener.of(function (e) {
                if (e.docChanged) {
                    listenerFunctions?.changeListener(e.state.doc.toString());
                }
                listenerFunctions?.cursorListener(e.state.doc.toString());
            }),

        ],
        parent: element
    }
    let editor = new EditorView(
        editroInitState
    )
    return editor;
}


function deleteAllText(editor) {
    editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length }
    })
}


export default {
    main,
    createJSEditor,
    createMDEditor,

}
