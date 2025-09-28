import styleToCss from "style-object-to-css-string";
import { Properties } from "csstype";

export type CssProperties = Properties;
export type Context = Record<string, any>;
export type Node = (context: Context) => string;

export const addStyle = (styles?: CssProperties): string =>
  styles && Object.keys(styles).length > 0
    ? `(% style="${styleToCss(styles).replace(/\n/g, "")}" %)`
    : "";

export const render = (nodes: Array<Node>, context: Context = {}): string =>
  nodes.map((node) => node(context)).join("");

export const cell = (children: Array<Node>, style?: CssProperties): Node => (
  context: Context
) => `|${addStyle(style)}${render(children, context)}`;

export const headerCell = (
  children: Array<Node>,
  style?: CssProperties
): Node => (context: Context) =>
  `|=${addStyle(style)}${render(children, context)}`;

export const row = (children: Array<Node>, style?: CssProperties): Node => (
  context: Context
) => `${addStyle(style)}${render(children, context)}\n`;

export const multiline = (children: Array<Node>): Node => (
  context: Context
) => `(((
${children.map((child) => child(context)).join("\n")}
)))`;

export const html = (children: Array<Node>): Node => (context: Context) =>
  `{{html}}
${render(children, context)}
{{/html}}`;

export const htmlWithWiki = (children: Array<Node>): Node => (
  context: Context
) => `{{html wiki=true}}
${render(children, context)}
{{/html}}`;

export const h1 = (text: string): Node => () => `= ${text} =\n`;
export const h2 = (text: string): Node => () => `== ${text} ==\n`;
export const h3 = (text: string): Node => () => `=== ${text} ===\n`;
export const h4 = (text: string): Node => () => `==== ${text} ====\n`;
export const h5 = (text: string): Node => () => `===== ${text} =====\n`;
export const h6 = (text: string): Node => () => `====== ${text} ======\n`;
export const strong = (text: string): Node => () => `**${text}**`;
export const emphasis = (text: string): Node => () => `//${text}//`;
export const strike = (text: string): Node => () => `--${text}--`;
export const mono = (text: string): Node => () => `##${text}##`;
export const superscript = (text: string): Node => () => `^^${text}^^`;
export const subscript = (text: string): Node => () => `,,${text},,`;
export const underline = (text: string): Node => () => `__${text}__`;
export const hr = (): Node => () => `\n----\n`;
export const link = (text: string, href: string): Node => () =>
  `[[${text}>>${href}]]`;

export const p = (children: Array<Node>): Node => (context: Context) =>
  `${render(children, context)}\n`;

export const text = (content: string): Node => () => content;

export const verbatim = (text: string): Node => () => `{{{${text}}}}`;

export const table = (children: Array<Node>, style?: CssProperties): Node => (
  context: Context
) => `${addStyle(style)}\n${render(children, context)}\n`;

const createBanner = (type: string) => (children: Array<Node>): Node => (
  context: Context
) => `{{${type}}}
${children.map((child) => child(context)).join("\n")}
{{/${type}}}`;

export const infoBanner = createBanner("info");
export const warningBanner = createBanner("warning");
export const successBanner = createBanner("success");
export const errorBanner = createBanner("error");

export const definitionTerm = (text: string): Node => () => `; ${text}`;
export const definitionDescription = (text: string): Node => () => `: ${text}`;
export const definitionList = (children: Array<Node>): Node => (
  context: Context
) => `${render(children, context)}\n`;

export const blockquote = (children: Array<Node>): Node => (context: Context) =>
  children.map((child) => `> ${child(context)}`).join("\n") + "\n";

export const toc = (): Node => () => `{{toc/}}\n`;

export const box = (children: Array<Node>, title?: string): Node => (
  context: Context
) => {
  const titleParam = title ? ` title="${title}"` : "";
  return `{{box${titleParam}}}
${render(children, context)}
{{/box}}`;
};

export const image = (
  src: string,
  alt?: string,
  width?: string,
  height?: string
): Node => () => {
  let params = `src="${src}"`;
  if (alt) params += ` alt="${alt}"`;
  if (width) params += ` width="${width}"`;
  if (height) params += ` height="${height}"`;
  return `{{image ${params}/}}`;
};

export const comment = (text: string): Node => () =>
  `{{comment}}${text}{{/comment}}`;

export const footnote = (text: string): Node => () =>
  `{{footnote}}${text}{{/footnote}}`;

export const putFootnotes = (): Node => () => `{{putFootnotes/}}`;

export const faq = (children: Array<Node>): Node => (context: Context) =>
  `{{faq}}
${render(children, context)}
{{/faq}}`;

export const transclude = (page: string): Node => () =>
  `{{include reference="${page}"/}}`;

export const container = (children: Array<Node>, cssClass?: string): Node => (
  context: Context
) => {
  const classParam = cssClass ? ` class="${cssClass}"` : "";
  return `{{container${classParam}}}
${render(children, context)}
{{/container}}`;
};

export const gallery = (children: Array<Node>): Node => (context: Context) =>
  `{{gallery}}
${render(children, context)}
{{/gallery}}`;

export const showhide = (children: Array<Node>, title?: string): Node => (
  context: Context
) => {
  const titleParam = title ? ` title="${title}"` : "";
  return `{{showhide${titleParam}}}
${render(children, context)}
{{/showhide}}`;
};

export const code = (content: string, language?: string): Node => () => {
  const langParam = language ? ` language="${language}"` : "";
  return `{{code${langParam}}}
${content}
{{/code}}`;
};
