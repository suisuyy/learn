---
layout: default
---

This cheat sheet provides a quick overview of all the Markdown syntax elements.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{: toc }

## What is Markdown?

Markdown is a lightweight and easy-to-use markup language for web writers. Markdown allows you to add formatting elements to plaintext documents and then convert them to structurally valid HTML.

Markdown syntax can be divided into two broad categories. These categories are (1) basic syntax outlined in the original design document and (2) extension of basic syntax for added capability and features.

Refer to [Markdown cheat sheet](https://www.markdownguide.org/cheat-sheet/) for more examples.

## Basic syntax

These elements are defined in the original Markdown design document and can be used in all Markdown applications.

Detailed information and examples can be fount at [basic syntax guide](https://www.markdownguide.org/basic-syntax/).

### Headings
{: .no_toc }

<div class="code-example" markdown="1">
# H1
{: .no_toc }
## H2
{: .no_toc }
### H3
{: .no_toc }
#### H4
{: .no_toc }
##### H5
{: .no_toc }
###### H6
{: .no_toc }
</div>

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Paragraph
{: .no_toc }

<div class="code-example" markdown="1">
Here's a paragraph.
</div>

```markdown
Here's a paragraph.
```

### Line break
{: .no_toc }

<div class="code-example" markdown="1">
Here's another one  
with a line break.
</div>

```markdown
Here's another one  
with a line break.
```

### Bold
{: .no_toc }

<div class="code-example" markdown="1">
**bold text**  
__bold also__
</div>

```markdown
**bold text**  
__bold also__
```

### Italic
{: .no_toc }

<div class="code-example" markdown="1">
*italic text*  
_italic also_
</div>

```markdown
*italic text*  
_italic also_
```

### Blockquote
{: .no_toc }

<div class="code-example" markdown="1">
> blockquote text
</div>

```markdown
> blockquote text
```

### Ordered list
{: .no_toc }

<div class="code-example" markdown="1">
1. Item 1
1. Item 2
    1. Item 2a
    1. Item 2b
1. Item 3
</div>

```markdown
1. Item 1
1. Item 2
    1. Item 2a
    1. Item 2b
1. Item 3
```

### Unordered list
{: .no_toc }

<div class="code-example" markdown="1">
- Item
- Item
    - Indented item
    - Indented item
- Item
</div>

```markdown
- Item
- Item
    - Indented item
    - Indented item
- Item
```

### Inline code
{: .no_toc }

<div class="code-example" markdown="1">
This is an inline `code`.
</div>

```markdown
This is an inline `code`.
```

### Horizontal rule
{: .no_toc }

<div class="code-example" markdown="1">
Here's some text.

---

Here's more text.
</div>

```markdown
Here's some text.

---

Here's more text.
```

### Link
{: .no_toc }

<div class="code-example" markdown="1">
[title](https://www.example.com)
</div>

```markdown
[title](https://www.example.com)
```

### Image
{: .no_toc }

<div class="code-example" markdown="1">
![Git Branching](https://guides.github.com/activities/hello-world/branching.png)
</div>

```markdown
![alt text](image.jpg)
```

## Extended syntax

These elements provide additional features by extending the basic syntax. Not all Markdown applications support these elements and each `Markdown Flavor` differs slightly.

Note that GitHub.com uses its own version of the Markdown syntax called [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) and some features are only available in the issues and pull requests.

Refer to [Jekyll Markdown coverage](https://www.markdownguide.org/tools/jekyll/) for a list of supported elements.

Detailed information and examples can be fount at [extended syntax guide](https://www.markdownguide.org/extended-syntax/).

### Table
{: .no_toc }

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

```markdown
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

### Fenced code block
{: .no_toc }

```
{
    "firstName": "John",
    "lastName": "Doe",
    "age": 25
}
```

    ```
    {
        "firstName": "John",
        "lastName": "Doe",
        "age": 25
    }
    ```

### Syntax highlighting
{: .no_toc }

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "age": 25
}
```

    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "age": 25
    }
    ```

### Footnote
{: .no_toc }

<div class="code-example" markdown="1">
Here's a sentence with a footnote reference. [^1]

[^1]: This is the footnote.
</div>

```
Here's a sentence with a footnote reference. [^1]

[^1]: This is the footnote.
```

### Abbreviation
{: .no_toc }

<div class="code-example" markdown="1">
*[SMTP]: Simple Mail Transfer Protocol
The SMTP is a communication protocol for email transmission.
</div>

```markdown
*[SMTP]: Simple Mail Transfer Protocol
The SMTP is a communication protocol for email transmission.
```

### Heading ID
{: .no_toc }

<div class="code-example" markdown="1">
### Awesome Heading {#custom-id}
{: .no_toc }
</div>

```markdown
### Awesome Heading {#custom-id}
```

### Definition list
{: .no_toc }

**Caution**
{: .label .label-yellow .text-red}

<div class="code-example" markdown="1">
Not supported by Jekyll.
{: .text-red-200 }
</div>

```markdown
term
: definition
```

### Strikethrough
{: .no_toc }

<div class="code-example" markdown="1">
~~~text~~~
</div>

```markdown
~~~text~~~
```

### Task list
{: .no_toc }

<div class="code-example" markdown="1">
- [x] Read the Markdown guide
- [ ] Review the style guide
- [ ] Stay awesome!
</div>

```markdown
- [x] Read the Markdown guide
- [ ] Review the style guide
- [ ] Stay awesome!
```

### Emoji characters
{: .no_toc }

<div class="code-example" markdown="1">
👍🤓
</div>

```markdown
👍🤓
```

### Emoji shortcodes
{: .no_toc }

**Caution**
{: .label .label-yellow .text-red}

<div class="code-example" markdown="1">
Not supported by Jekyll.
{: .text-red-200 }
</div>

```markdown
:rocket:
```

### Automatic URL linking
{: .no_toc }

**Caution**
{: .label .label-yellow .text-red}

<div class="code-example" markdown="1">
Not supported by Jekyll.
{: .text-red-200 }
</div>

```markdown
https://www.example.com
```

### Disabling automatic URL linking
{: .no_toc }

**Caution**
{: .label .label-yellow .text-red}

<div class="code-example" markdown="1">
Not supported by Jekyll.
{: .text-red-200 }
</div>

```markdown
`https://www.example.com`
```

### HTML
{: .no_toc }

<div class="code-example">
    <div>
        <p>HTML test paragraph.</p>
    </div>
</div>

```html
<div>
    <p>HTML test paragraph.</p>
</div>
```

## Further reading

[The Markdown Guide](https://www.markdownguide.org/getting-started/) provides a detailed overview of Markdown, how it works, and what can be done with it.

Hands on Markdown experience can be achieved by completing [The Markdown Tutorial](https://www.markdowntutorial.com) or simply experimenting with online editors such as [StackEdit](https://stackedit.io).

A collection of awesome markdown goodies (libraries, services, editors, tools, cheatsheets, etc.) can be found at [Awesome Markdown Repo](https://github.com/mundimark/awesome-markdown) on GitHub.
