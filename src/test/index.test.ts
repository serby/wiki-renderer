import { addStyle, html, link, strong, underline, infoBanner } from "@/index";

describe("wiki-renderer", () => {
  describe("addStyle()", () => {
    it("should return nothing by default", () => {
      const output = addStyle();
      expect(output).toBe("");
    });
    it("should work with single style", () => {
      const output = addStyle({ display: "none" });
      expect(output).toBe('(% style="display: none;" %) ');
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
});
