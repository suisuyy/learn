```javascript

let mdURL = new URL(location.href).searchParams.get("md")
const params = Object.fromEntries(new URLSearchParams(location.search));


document.body.contentEditable='true'

```

```
extensions: [
  EditorView.lineWrapping
]
        