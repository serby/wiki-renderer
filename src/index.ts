import {
  addStyle,
  block,
  CssProperties,
  inline,
  inlineStringOrNode,
  Node,
  render,
  standalone,
} from "./util";

export const cell = (children: Array<Node>, style?: CssProperties): Node => ({
  render: (context) => `|${addStyle(style)}${render(children, context)}`,
  newlineBefore: false,
  newlineAfter: false,
});

export const headerCell = (
  children: Array<Node>,
  style?: CssProperties
): Node => ({
  render: (context) => `|=${addStyle(style)}${render(children, context)}`,
  newlineBefore: false,
  newlineAfter: false,
});

export const row = (children: Array<Node>, style?: CssProperties): Node => ({
  render: (context) => `${addStyle(style)}${render(children, context)}`,
  newlineBefore: false,
  newlineAfter: true,
});

export const multiline = (children: Array<Node>): Node => ({
  render: (context) =>
    `(((\n${children.map((child) => child.render(context)).join("")}\n)))`,
  newlineBefore: true,
  newlineAfter: false,
});

export const html = (children: Array<Node>): Node => ({
  render: (context) => `{{html}}\n${render(children, context)}\n{{/html}}`,
  newlineBefore: true,
  newlineAfter: true,
});

export const htmlWithWiki = (children: Array<Node>): Node => ({
  render: (context) =>
    `{{html wiki=true}}\n${render(children, context)}\n{{/html}}`,
  newlineBefore: true,
  newlineAfter: true,
});

export const h1 = (text: string): Node => standalone(`= ${text} =`);
export const h2 = (text: string): Node => standalone(`== ${text} ==`);
export const h3 = (text: string): Node => standalone(`=== ${text} ===`);
export const h4 = (text: string): Node => standalone(`==== ${text} ====`);
export const h5 = (text: string): Node => standalone(`===== ${text} =====`);
export const h6 = (text: string): Node => standalone(`====== ${text} ======`);
export const strong = inlineStringOrNode((content) => `**${content}**`);
export const emphasis = inlineStringOrNode((content) => `//${content}//`);
export const strike = inlineStringOrNode((content) => `--${content}--`);
export const mono = inlineStringOrNode((content) => `##${content}##`);
export const superscript = inlineStringOrNode((content) => `^^${content}^^`);
export const subscript = inlineStringOrNode((content) => `,,${content},,`);
export const underline = inlineStringOrNode((content) => `__${content}__`);
export const hr = (): Node => standalone(`----`);
export const br = (): Node => block(``);
export const link = (text: string, href: string): Node =>
  inline(`[[${text}>>${href}]]`);

export const p = (content: string | Array<Node>): Node => ({
  render: (context) =>
    typeof content === "string" ? content : render(content, context),
  newlineBefore: false,
  newlineAfter: true,
});

export const text = (content: string): Node => inline(content);

export const verbatim = (text: string): Node => inline(`{{{${text}}}}`);

export const table = (children: Array<Node>, style?: CssProperties): Node => ({
  render: (context) => `${addStyle(style)}\n${render(children, context)}`,
  newlineBefore: false,
  newlineAfter: true,
});

const createBanner = (type: string) => (children: Array<Node>): Node => ({
  render: (context) =>
    `{{${type}}}\n${children
      .map((child) => child.render(context))
      .join("")}\n{{/${type}}}`,
  newlineBefore: true,
  newlineAfter: true,
});

export const infoBanner = createBanner("info");
export const warningBanner = createBanner("warning");
export const successBanner = createBanner("success");
export const errorBanner = createBanner("error");

export const definitionTerm = (text: string): Node => block(`; ${text}`);
export const definitionDescription = (text: string): Node => block(`: ${text}`);
export const definitionList = (children: Array<Node>): Node => ({
  render: (context) => render(children, context),
  newlineBefore: true,
  newlineAfter: false,
});

export const blockquote = (children: Array<Node>): Node => ({
  render: (context) =>
    children.map((child) => `> ${child.render(context)}`).join(""),
  newlineBefore: true,
  newlineAfter: false,
});

export const toc = (): Node => standalone(`{{toc/}}`);

export const box = (children: Array<Node>, title?: string): Node => {
  const titleParam = title ? ` title="${title}"` : "";
  return {
    render: (context) =>
      `{{box${titleParam}}}\n${render(children, context)}\n{{/box}}`,
    newlineBefore: true,
    newlineAfter: true,
  };
};

export const image = (
  src: string,
  alt?: string,
  width?: string,
  height?: string,
  style?: string
): Node => {
  let params = "";
  if (alt) params += `alt="${alt}"`;
  if (width) params += (params ? " " : "") + `width="${width}"`;
  if (height) params += (params ? " " : "") + `height="${height}"`;
  if (style) params += (params ? " " : "") + `style="${style}"`;

  const paramStr = params ? `||${params}` : "";
  return inline(`[[image:${src}${paramStr}]]`);
};

export const comment = (text: string): Node =>
  block(`{{comment}}${text}{{/comment}}`);

export const footnote = (text: string): Node =>
  inline(`{{footnote}}${text}{{/footnote}}`);

export const putFootnotes = (): Node => standalone(`{{putFootnotes/}}`);

export const formula = (content: string): Node =>
  inline(`{{formula}}${content}{{/formula}}`);

export const faq = (question: string, answer: string): Node =>
  block(`{{FAQ question="${question}" answer="${answer}"/}}`);

export const documentTree = (
  root?: string,
  showRoot?: boolean,
  limit?: number,
  showAttachments?: boolean
): Node => {
  let params = "";
  if (root) params += ` root="${root}"`;
  if (showRoot !== undefined) params += ` showRoot="${showRoot}"`;
  if (limit !== undefined) params += ` limit="${limit}"`;
  if (showAttachments !== undefined)
    params += ` showAttachments="${showAttachments}"`;
  return standalone(`{{documentTree${params}/}}`);
};

export const subPages = (prefix?: string, useTitle?: boolean): Node => {
  let params = "";
  if (prefix) params += ` prefix="${prefix}"`;
  if (useTitle !== undefined) params += ` useTitle="${useTitle}"`;
  return standalone(`{{subPages${params}/}}`);
};

export const transclude = (page: string): Node =>
  block(`{{include reference="${page}"/}}`);

export const container = (
  children: Array<Node>,
  layoutStyle?: string
): Node => {
  const styleParam = layoutStyle ? ` layoutStyle="${layoutStyle}"` : "";
  return {
    render: (context) =>
      `{{container${styleParam}}}\n${render(
        children,
        context
      )}\n{{/container}}\n`,
    newlineBefore: true,
    newlineAfter: true,
  };
};

export const gallery = (children: Array<Node>): Node => ({
  render: (context) =>
    `{{gallery}}\n${render(children, context)}\n{{/gallery}}`,
  newlineBefore: true,
  newlineAfter: true,
});

export const showhide = (children: Array<Node>, title?: string): Node => {
  const titleParam = title ? ` title="${title}"` : "";
  return {
    render: (context) =>
      `{{showhide${titleParam}}}\n${render(children, context)}\n{{/showhide}}`,
    newlineBefore: true,
    newlineAfter: true,
  };
};

export const code = (content: string, language?: string): Node => {
  const langParam = language ? ` language="${language}"` : "";
  const hasNewlines = content.includes("\n");

  if (hasNewlines) {
    // Multi-line code block - standalone with newlines and blank line after
    const codeContent = `{{code${langParam}}}\n${content}\n{{/code}}`;
    return standalone(codeContent);
  } else {
    // Single-line code - inline without extra newlines
    const codeContent = `{{code${langParam}}}${content}{{/code}}`;
    return inline(codeContent);
  }
};

export const enableSortableTables = (): Node =>
  standalone(`{{enableSortableTables/}}`);

export const sortableTable = (
  children: Array<Node>,
  id: string,
  style?: CssProperties
): Node => {
  const styleStr = addStyle(style);
  const classAttr = `class="grid sortable filterable doOddEven" id="${id}"`;
  return {
    render: (context) =>
      `(% ${classAttr} %)${styleStr ? `\n${styleStr}` : ""}\n${render(
        children,
        context
      )}`,
    newlineBefore: true,
    newlineAfter: false,
  };
};

export const sortableRow = (
  children: Array<Node>,
  isHeader: boolean = false,
  style?: CssProperties
): Node => {
  const classAttr = isHeader ? `class="sortHeader"` : "";
  const styleStr = addStyle(style);
  const prefix = classAttr || styleStr ? `(% ${classAttr} %)${styleStr}` : "";
  return {
    render: (context) => `${prefix}${render(children, context)}`,
    newlineBefore: false,
    newlineAfter: true,
  };
};
