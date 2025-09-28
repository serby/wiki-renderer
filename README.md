# Wiki Renderer

A TypeScript library for generating XWiki syntax using a functional, composable API with context support.

## Installation

```bash
npm install @serby/wiki-renderer
```

## Quick Start

```typescript
import { render, h1, p, text, strong } from '@serby/wiki-renderer';

const nodes = [
  h1("Welcome to Wiki Renderer"),
  p([text("This is "), strong("bold"), text(" text in a paragraph.")])
];

const output = render(nodes);
console.log(output);
// = Welcome to Wiki Renderer =
// This is **bold** text in a paragraph.
```

## Core Concepts

### Nodes and Context

Every element returns a `Node` - a function that takes a `Context` and returns a string:

```typescript
type Context = Record<string, any>;
type Node = (context: Context) => string;
```

### The Render Function

Use `render()` to convert an array of nodes to wiki syntax:

```typescript
const output = render(nodes, context);
```

## API Reference

### Core Functions
- `render(nodes: Array<Node>, context?: Context): string` - Render nodes to wiki syntax
- `text(content: string): Node` - Create a text node

### Headers
- `h1(text: string): Node` through `h6(text: string): Node` - Headers

### Structure
- `p(children: Array<Node>): Node` - Paragraphs
- `hr(): Node` - Horizontal rule
- `multiline(children: Array<Node>): Node` - Grouped content

### Text Formatting
- `strong(text: string): Node` - Bold text (**text**)
- `emphasis(text: string): Node` - Italic text (//text//)
- `underline(text: string): Node` - Underlined text (__text__)
- `strike(text: string): Node` - Strikethrough text (--text--)
- `mono(text: string): Node` - Monospace text (##text##)
- `superscript(text: string): Node` - Superscript (^^text^^)
- `subscript(text: string): Node` - Subscript (,,text,,)

### Links and Media
- `link(text: string, href: string): Node` - Hyperlink
- `image(src: string, alt?: string, width?: string, height?: string): Node` - Image

### Tables
- `table(children: Array<Node>, style?: CssProperties): Node` - Table container
- `row(children: Array<Node>, style?: CssProperties): Node` - Table row
- `cell(children: Array<Node>, style?: CssProperties): Node` - Table cell
- `headerCell(children: Array<Node>, style?: CssProperties): Node` - Header cell

### Lists
- `definitionList(children: Array<Node>): Node` - Definition list
- `definitionTerm(text: string): Node` - Definition term (;term)
- `definitionDescription(text: string): Node` - Definition description (:description)

### Containers and Layout
- `blockquote(children: Array<Node>): Node` - Quoted content (> text)
- `box(children: Array<Node>, title?: string): Node` - Content box
- `container(children: Array<Node>, cssClass?: string): Node` - Layout container

### Banners
- `infoBanner(children: Array<Node>): Node` - Information banner
- `warningBanner(children: Array<Node>): Node` - Warning banner
- `successBanner(children: Array<Node>): Node` - Success banner
- `errorBanner(children: Array<Node>): Node` - Error banner

### Macros
- `toc(): Node` - Table of contents
- `code(content: string, language?: string): Node` - Code block
- `verbatim(text: string): Node` - Verbatim text ({{{text}}})
- `showhide(children: Array<Node>, title?: string): Node` - Collapsible content
- `gallery(children: Array<Node>): Node` - Image gallery
- `faq(children: Array<Node>): Node` - FAQ container
- `footnote(text: string): Node` - Footnote
- `putFootnotes(): Node` - Display footnotes
- `transclude(page: string): Node` - Include content
- `comment(text: string): Node` - Hidden comment

### HTML
- `html(children: Array<Node>): Node` - HTML content
- `htmlWithWiki(children: Array<Node>): Node` - HTML with wiki parsing

### Styling
- `addStyle(styles?: CssProperties): string` - Convert CSS properties to XWiki style syntax

## Examples

See the `example/` folder for a complete demonstration including:
- `demo.ts` - Interactive demo script
- `cats-vs-dogs-story.wiki` - Generated XWiki output

## License

MIT
