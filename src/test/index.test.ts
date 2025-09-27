import {
  addStyle,
  html,
  link,
  strong,
  underline,
  infoBanner,
  cell,
  table,
  row,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  emphasis,
  strike,
  mono,
  superscript,
  subscript,
  hr,
  verbatim,
  multiline,
  htmlWithWiki,
  headerCell,
  warningBanner,
  successBanner,
  errorBanner,
} from "..";

describe("wiki-renderer", () => {
  describe("addStyle()", () => {
    it("should not add empty styling", () => {
      const output = addStyle();
      expect(output).toBe("");
    });
    it("should not add empty styling for empty object", () => {
      const output = addStyle({});
      expect(output).toBe("");
    });
    it("should add styling as expected", () => {
      const output = addStyle({ color: "red" });
      expect(output).toBe('(% style="color: red;" %)');
    });
    it("should work with multiple styles", () => {
      const output = addStyle({
        color: "red",
        fontWeight: "bold",
        paddingLeft: "2em",
      });
      expect(output).toBe(
        '(% style="color: red;font-weight: bold;padding-left: 2em;" %)'
      );
    });
  });
  describe("h1()", () => {
    it("should create header level 1", () => {
      const output = h1("Hello");
      expect(output).toBe("= Hello =\n");
    });
  });
  describe("h2()", () => {
    it("should create header level 2", () => {
      const output = h2("Hello");
      expect(output).toBe("== Hello ==\n");
    });
  });
  describe("h3()", () => {
    it("should create header level 3", () => {
      const output = h3("Hello");
      expect(output).toBe("=== Hello ===\n");
    });
  });
  describe("h4()", () => {
    it("should create header level 4", () => {
      const output = h4("Hello");
      expect(output).toBe("==== Hello ====\n");
    });
  });
  describe("h5()", () => {
    it("should create header level 5", () => {
      const output = h5("Hello");
      expect(output).toBe("===== Hello =====\n");
    });
  });
  describe("h6()", () => {
    it("should create header level 6", () => {
      const output = h6("Hello");
      expect(output).toBe("====== Hello ======\n");
    });
  });
  describe("p()", () => {
    it("should create value paragraph", () => {
      const output = p("Hello");
      expect(output).toBe("Hello\n");
    });
  });
  describe("link()", () => {
    it("should create links", () => {
      const output = link("Hello", "http://foo.com");
      expect(output).toBe("[[Hello>>http://foo.com]]");
    });
  });
  describe("strong()", () => {
    it("should add strong formatting", () => {
      const output = strong("Hello world");
      expect(output).toBe("**Hello world**");
    });
  });
  describe("emphasis()", () => {
    it("should add emphasis formatting", () => {
      const output = emphasis("Hello world");
      expect(output).toBe("//Hello world//");
    });
  });
  describe("strike()", () => {
    it("should add strike formatting", () => {
      const output = strike("Hello world");
      expect(output).toBe("--Hello world--");
    });
  });
  describe("mono()", () => {
    it("should add mono formatting", () => {
      const output = mono("Hello world");
      expect(output).toBe("##Hello world##");
    });
  });
  describe("superscript()", () => {
    it("should add superscript formatting", () => {
      const output = superscript("Hello world");
      expect(output).toBe("^^Hello world^^");
    });
  });
  describe("subscript()", () => {
    it("should add subscript formatting", () => {
      const output = subscript("Hello world");
      expect(output).toBe(",,Hello world,,");
    });
  });
  describe("underline()", () => {
    it("should add underline formatting", () => {
      const output = underline("Hello world");
      expect(output).toBe("__Hello world__");
    });
  });
  describe("hr()", () => {
    it("should create horizontal rule", () => {
      const output = hr();
      expect(output).toBe("\n----\n");
    });
  });
  describe("verbatim()", () => {
    it("should create verbatim text", () => {
      const output = verbatim("Hello world");
      expect(output).toBe("{{{Hello world}}}");
    });
  });
  describe("multiline()", () => {
    it("should create multiline text", () => {
      const output = multiline(["Hello", "World"]);
      expect(output).toBe("(((\nHello\nWorld\n)))");
    });
  });
  describe("htmlWithWiki()", () => {
    it("should add html with wiki formatting", () => {
      const output = htmlWithWiki(["<p>Hello</p>"]);
      expect(output).toBe("{{html wiki=true}}\n<p>Hello</p>\n{{/html}}");
    });
  });
  describe("headerCell()", () => {
    it("should create header cell", () => {
      const output = headerCell(["Hello"]);
      expect(output).toBe("|=Hello");
    });
  });
  describe("html()", () => {
    it("should add html formatting to a single item", () => {
      const output = html(["<p>Hello</p>"]);
      expect(output).toBe("{{html}}\n<p>Hello</p>\n{{/html}}");
    });
    it("should add html formatting to all args", () => {
      const output = html(["<p>Hello</p>", "<em>World</em>"]);
      expect(output).toBe("{{html}}\n<p>Hello</p><em>World</em>\n{{/html}}");
    });
  });
  describe("infoBanner()", () => {
    it("should format as info banner", () => {
      const output = infoBanner(["Hello"]);
      expect(output).toBe("{{info}}\nHello\n{{/info}}");
    });
  });
  describe("warningBanner()", () => {
    it("should format as warning banner", () => {
      const output = warningBanner(["Hello"]);
      expect(output).toBe("{{warning}}\nHello\n{{/warning}}");
    });
  });
  describe("successBanner()", () => {
    it("should format as success banner", () => {
      const output = successBanner(["Hello"]);
      expect(output).toBe("{{success}}\nHello\n{{/success}}");
    });
  });
  describe("errorBanner()", () => {
    it("should format as error banner", () => {
      const output = errorBanner(["Hello"]);
      expect(output).toBe("{{error}}\nHello\n{{/error}}");
    });
  });
  describe("table()", () => {
    it("should have a newline after style", () => {
      const output = table(
        [
          row([cell(["A"]), cell(["B"], { color: "green" })], {
            color: "blue",
          }),
        ],
        { color: "red" }
      );
      expect(output).toBe(
        `(% style="color: red;" %)\n(% style="color: blue;" %)|A|(% style="color: green;" %)B\n\n`
      );
    });
  });
});
