import styleToCss from "style-object-to-css-string";
import { Properties } from "csstype";

export type CssProperties = Properties;

export const addStyle = (styles?: CssProperties): string =>
  styles && Object.keys(styles).length > 0
    ? `(% style="${styleToCss(styles)}" %) `
    : "";

export const cell = (
  style: CssProperties,
  ...children: Array<string>
): string => `|${addStyle(style)}${children.join("")}`;

export const headerCell = (
  style: CssProperties,
  ...children: Array<string>
): string => `|=${addStyle(style)}${children.join("")}`;

export const row = (style: CssProperties, ...children: Array<string>): string =>
  `${addStyle(style)}${children.join("")}\n`;

export const multiline = (...children: Array<string>): string => `(((
${children.join("\n")}
)))`;

export const html = (...children: Array<string>): string => `{{html}}
${children.join("")}
{{/html}}`;

export const htmlWithWiki = (
  ...children: Array<string>
): string => `{{html wiki=true}}
${children.join("")}
{{/html}}`;

export const h1 = (text: string): string => `=${text}=\n`;
export const h2 = (text: string): string => `==${text}==\n`;
export const h3 = (text: string): string => `===${text}===\n`;
export const h4 = (text: string): string => `====${text}====\n`;
export const h5 = (text: string): string => `=====${text}=====\n`;
export const h6 = (text: string): string => `======${text}======\n`;
export const strong = (text: string): string => `**${text}**`;
export const emphasis = (text: string): string => `//${text}//`;
export const strike = (text: string): string => `--${text}--`;
export const mono = (text: string): string => `##${text}##`;
export const superscript = (text: string): string => `^^${text}^^`;
export const subscript = (text: string): string => `,,${text},,`;
export const underline = (text: string): string => `__${text}__`;
export const hr = (): string => `----\n`;
export const link = (text: string, href: string): string =>
  `[[${text}>>${href}]]`;

export const p = (text: string) => `${text}\n`;

export const verbatim = (text: string) => `{{{${text}}}}`;

export const table = row;

const createBanner = (type: string) => (
  ...children: Array<string>
): string => `{{${type}}}
${children.join("\n")}
{{/${type}}}`;

export const infoBanner = createBanner("info");
export const warningBanner = createBanner("warning");
export const successBanner = createBanner("success");
export const errorBanner = createBanner("error");
