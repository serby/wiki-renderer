import {
  addStyle,
  inline,
  inlineStringOrNode,
  block,
  standalone,
  render,
  Node,
  CssProperties,
} from "../util";

describe("util", () => {
  describe("addStyle()", () => {
    it("should return empty string for undefined styles", () => {
      expect(addStyle()).toBe("");
    });

    it("should return empty string for empty styles object", () => {
      expect(addStyle({})).toBe("");
    });

    it("should return formatted style string for single property", () => {
      const styles: CssProperties = { color: "red" };
      expect(addStyle(styles)).toBe('(% style="color: red;" %)');
    });

    it("should return formatted style string for multiple properties", () => {
      const styles: CssProperties = {
        color: "red",
        backgroundColor: "blue",
        fontSize: "16px",
      };
      const result = addStyle(styles);
      expect(result).toContain('(% style="');
      expect(result).toContain("color: red;");
      expect(result).toContain("background-color: blue;");
      expect(result).toContain("font-size: 16px;");
      expect(result).toContain('" %)');
    });

    it("should handle complex CSS properties", () => {
      const styles: CssProperties = {
        border: "1px solid #ccc",
        padding: "10px 15px",
        margin: "0 auto",
      };
      const result = addStyle(styles);
      expect(result).toContain("border: 1px solid #ccc;");
      expect(result).toContain("padding: 10px 15px;");
      expect(result).toContain("margin: 0 auto;");
    });

    it("should remove newlines from CSS string", () => {
      // This tests the .replace(/\n/g, "") functionality
      const styles: CssProperties = {
        color: "red",
        backgroundColor: "blue",
      };
      const result = addStyle(styles);
      expect(result).not.toContain("\n");
    });
  });

  describe("inline()", () => {
    it("should create inline node with correct properties", () => {
      const content = "test content";
      const node = inline(content);

      expect(node.render({})).toBe(content);
      expect(node.newlineBefore).toBe(false);
      expect(node.newlineAfter).toBe(false);
    });

    it("should handle empty content", () => {
      const node = inline("");
      expect(node.render({})).toBe("");
    });

    it("should handle special characters", () => {
      const content = 'test & <content> with "quotes"';
      const node = inline(content);
      expect(node.render({})).toBe(content);
    });

    it("should ignore context parameter", () => {
      const content = "test content";
      const node = inline(content);
      const context = { someKey: "someValue" };
      expect(node.render(context)).toBe(content);
    });
  });

  describe("inlineStringOrNode()", () => {
    const wrapper = (content: string) => `**${content}**`;
    const createWrappedNode = inlineStringOrNode(wrapper);

    it("should wrap string content", () => {
      const node = createWrappedNode("test");
      expect(node.render({})).toBe("**test**");
      expect(node.newlineBefore).toBe(false);
      expect(node.newlineAfter).toBe(false);
    });

    it("should wrap node content", () => {
      const innerNode = inline("inner content");
      const node = createWrappedNode(innerNode);
      expect(node.render({})).toBe("**inner content**");
    });

    it("should pass context to inner node", () => {
      const contextNode: Node = {
        render: (context) => `Hello ${context.name}`,
        newlineBefore: false,
        newlineAfter: false,
      };
      const node = createWrappedNode(contextNode);
      const context = { name: "World" };
      expect(node.render(context)).toBe("**Hello World**");
    });

    it("should handle empty string", () => {
      const node = createWrappedNode("");
      expect(node.render({})).toBe("****");
    });

    it("should handle complex wrapper functions", () => {
      const complexWrapper = (content: string) =>
        `<span class="highlight">${content}</span>`;
      const createComplexNode = inlineStringOrNode(complexWrapper);
      const node = createComplexNode("highlighted text");
      expect(node.render({})).toBe(
        '<span class="highlight">highlighted text</span>'
      );
    });

    it("should work with nested nodes", () => {
      const innerWrapper = (content: string) => `*${content}*`;
      const outerWrapper = (content: string) => `**${content}**`;

      const createInnerNode = inlineStringOrNode(innerWrapper);
      const createOuterNode = inlineStringOrNode(outerWrapper);

      const innerNode = createInnerNode("text");
      const outerNode = createOuterNode(innerNode);

      expect(outerNode.render({})).toBe("***text***");
    });
  });

  describe("block()", () => {
    it("should create block node with correct properties", () => {
      const content = "block content";
      const node = block(content);

      expect(node.render({})).toBe(content);
      expect(node.newlineBefore).toBe(false);
      expect(node.newlineAfter).toBe(true);
    });

    it("should handle empty content", () => {
      const node = block("");
      expect(node.render({})).toBe("");
      expect(node.newlineAfter).toBe(true);
    });

    it("should handle multiline content", () => {
      const content = "line 1\nline 2\nline 3";
      const node = block(content);
      expect(node.render({})).toBe(content);
    });

    it("should ignore context parameter", () => {
      const content = "block content";
      const node = block(content);
      const context = { someKey: "someValue" };
      expect(node.render(context)).toBe(content);
    });
  });

  describe("standalone()", () => {
    it("should create standalone node with correct properties", () => {
      const content = "standalone content";
      const node = standalone(content);

      expect(node.render({})).toBe(content);
      expect(node.newlineBefore).toBe(true);
      expect(node.newlineAfter).toBe(true);
    });

    it("should handle empty content", () => {
      const node = standalone("");
      expect(node.render({})).toBe("");
      expect(node.newlineBefore).toBe(true);
      expect(node.newlineAfter).toBe(true);
    });

    it("should handle complex content", () => {
      const content = "= Header =\nWith content below";
      const node = standalone(content);
      expect(node.render({})).toBe(content);
    });

    it("should ignore context parameter", () => {
      const content = "standalone content";
      const node = standalone(content);
      const context = { someKey: "someValue" };
      expect(node.render(context)).toBe(content);
    });
  });

  describe("render()", () => {
    it("should render empty array", () => {
      expect(render([])).toBe("");
    });

    it("should render single node", () => {
      const node = inline("single node");
      expect(render([node])).toBe("single node");
    });

    it("should render multiple inline nodes", () => {
      const nodes = [inline("first"), inline("second"), inline("third")];
      expect(render(nodes)).toBe("firstsecondthird");
    });

    it("should render multiple block nodes with newlines", () => {
      const nodes = [block("first block"), block("second block")];
      expect(render(nodes)).toBe("first block\nsecond block");
    });

    it("should render multiple standalone nodes with proper spacing", () => {
      const nodes = [
        standalone("first standalone"),
        standalone("second standalone"),
      ];
      expect(render(nodes)).toBe("first standalone\n\nsecond standalone");
    });

    it("should handle mixed node types", () => {
      const nodes = [
        inline("inline"),
        block("block"),
        standalone("standalone"),
      ];
      expect(render(nodes)).toBe("inlineblock\n\nstandalone");
    });

    it("should handle newlineBefore and newlineAfter correctly", () => {
      const nodes = [inline("start"), standalone("middle"), inline("end")];
      expect(render(nodes)).toBe("start\n\nmiddle\nend");
    });

    it("should pass context to all nodes", () => {
      const contextNode: Node = {
        render: (context) => `Hello ${context.name}`,
        newlineBefore: false,
        newlineAfter: false,
      };
      const nodes = [contextNode];
      const context = { name: "World" };
      expect(render(nodes, context)).toBe("Hello World");
    });

    it("should handle context with multiple nodes", () => {
      const node1: Node = {
        render: (context) => `${context.greeting}`,
        newlineBefore: false,
        newlineAfter: false,
      };
      const node2: Node = {
        render: (context) => `${context.name}`,
        newlineBefore: false,
        newlineAfter: false,
      };
      const nodes = [node1, inline(" "), node2];
      const context = { greeting: "Hello", name: "World" };
      expect(render(nodes, context)).toBe("Hello World");
    });

    it("should handle empty context", () => {
      const contextNode: Node = {
        render: (context) => `Keys: ${Object.keys(context).length}`,
        newlineBefore: false,
        newlineAfter: false,
      };
      expect(render([contextNode], {})).toBe("Keys: 0");
    });

    it("should handle complex newline scenarios", () => {
      const nodes = [
        standalone("header"),
        block("paragraph 1"),
        block("paragraph 2"),
        standalone("footer"),
      ];
      expect(render(nodes)).toBe("header\nparagraph 1\nparagraph 2\n\nfooter");
    });

    it("should handle single standalone node", () => {
      const node = standalone("single");
      expect(render([node])).toBe("single");
    });

    it("should handle trailing newlineAfter correctly", () => {
      const nodes = [inline("content"), block("block content")];
      expect(render(nodes)).toBe("contentblock content");
    });

    it("should handle leading newlineBefore correctly", () => {
      const nodes = [standalone("first"), inline("second")];
      expect(render(nodes)).toBe("first\nsecond");
    });

    it("should handle adjacent standalone nodes", () => {
      const nodes = [
        standalone("first"),
        standalone("second"),
        standalone("third"),
      ];
      expect(render(nodes)).toBe("first\n\nsecond\n\nthird");
    });

    it("should handle block followed by standalone", () => {
      const nodes = [block("block"), standalone("standalone")];
      expect(render(nodes)).toBe("block\n\nstandalone");
    });

    it("should handle standalone followed by block", () => {
      const nodes = [standalone("standalone"), block("block")];
      expect(render(nodes)).toBe("standalone\nblock");
    });
  });
});
