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
  describe("underline()", () => {
    it("should add underline formatting", () => {
      const output = underline("Hello world");
      expect(output).toBe("__Hello world__");
    });
  });

  describe("html()", () => {
    it("should add html formatting to a single item", () => {
      const output = html("<p>Hello</p>");
      expect(output).toBe("{{html}}\n<p>Hello</p>\n{{/html}}");
    });
    it("should add html formatting to all args", () => {
      const output = html("<p>Hello</p>", "<em>World</em>");
      expect(output).toBe("{{html}}\n<p>Hello</p><em>World</em>\n{{/html}}");
    });
  });
  describe("infoBanner()", () => {
    it("should format as info banner", () => {
      const output = infoBanner("Hello");
      expect(output).toBe("{{info}}\nHello\n{{/info}}");
    });
  });
  describe("table()", () => {
    it("should have a newline after style", () => {
      const output = table(
        { color: "red" },
        row({ color: "blue" }, cell({}, "A"), cell({ color: "green" }, "B"))
      );
      expect(output).toBe(
        `(% style="color: red;" %)\n(% style="color: blue;" %)|A|(% style="color: green;" %)B\n\n`
      );
    });
  });
});
