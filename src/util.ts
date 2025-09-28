import styleToCss from "style-object-to-css-string";
import { Properties } from "csstype";

export type CssProperties = Properties;
export type Context = Record<string, any>;
export type Node = {
  render: (context: Context) => string;
  newlineBefore: boolean;
  newlineAfter: boolean;
};

export const addStyle = (styles?: CssProperties): string =>
  styles && Object.keys(styles).length > 0
    ? `(% style="${styleToCss(styles).replace(/\n/g, "")}" %)`
    : "";

export const inline = (content: string): Node => ({
  render: () => content,
  newlineBefore: false,
  newlineAfter: false,
});

export const inlineStringOrNode = (wrapper: (content: string) => string) => (
  content: string | Node
): Node => ({
  render: (context) =>
    wrapper(
      `${typeof content === "string" ? content : content.render(context)}`
    ),
  newlineBefore: false,
  newlineAfter: false,
});

export const block = (content: string): Node => ({
  render: () => content,
  newlineBefore: false,
  newlineAfter: true,
});

export const standalone = (content: string): Node => ({
  render: () => content,
  newlineBefore: true,
  newlineAfter: true,
});

export const render = (nodes: Array<Node>, context: Context = {}): string =>
  nodes
    .map((node, i) => {
      const content = node.render(context);
      const isFirst = i === 0;
      const isLast = i === nodes.length - 1;
      const prevNode = i > 0 ? nodes[i - 1] : null;
      let prefix = "";
      if (!isFirst) {
        if (node.newlineBefore) {
          if (prevNode && prevNode.newlineAfter) {
            prefix = "\n";
          } else {
            prefix = "\n\n";
          }
        }
      }

      let suffix = "";
      if (!isLast && node.newlineAfter) {
        suffix = "\n";
      }
      return prefix + content + suffix;
    })
    .join("");
