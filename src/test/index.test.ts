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
  text,
  render,
  definitionTerm,
  definitionDescription,
  definitionList,
  blockquote,
  toc,
  box,
  image,
  comment,
  footnote,
  putFootnotes,
  faq,
  transclude,
  container,
  gallery,
  showhide,
  code,
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
      const output = h1("Hello")({});
      expect(output).toBe("= Hello =\n");
    });
  });
  describe("h2()", () => {
    it("should create header level 2", () => {
      const output = h2("Hello")({});
      expect(output).toBe("== Hello ==\n");
    });
  });
  describe("h3()", () => {
    it("should create header level 3", () => {
      const output = h3("Hello")({});
      expect(output).toBe("=== Hello ===\n");
    });
  });
  describe("h4()", () => {
    it("should create header level 4", () => {
      const output = h4("Hello")({});
      expect(output).toBe("==== Hello ====\n");
    });
  });
  describe("h5()", () => {
    it("should create header level 5", () => {
      const output = h5("Hello")({});
      expect(output).toBe("===== Hello =====\n");
    });
  });
  describe("h6()", () => {
    it("should create header level 6", () => {
      const output = h6("Hello")({});
      expect(output).toBe("====== Hello ======\n");
    });
  });
  describe("p()", () => {
    it("should create value paragraph", () => {
      const output = p([text("Hello")])({});
      expect(output).toBe("Hello\n");
    });
  });
  describe("link()", () => {
    it("should create links", () => {
      const output = link("Hello", "http://foo.com")({});
      expect(output).toBe("[[Hello>>http://foo.com]]");
    });
  });
  describe("strong()", () => {
    it("should add strong formatting", () => {
      const output = strong("Hello world")({});
      expect(output).toBe("**Hello world**");
    });
  });
  describe("emphasis()", () => {
    it("should add emphasis formatting", () => {
      const output = emphasis("Hello world")({});
      expect(output).toBe("//Hello world//");
    });
  });
  describe("strike()", () => {
    it("should add strike formatting", () => {
      const output = strike("Hello world")({});
      expect(output).toBe("--Hello world--");
    });
  });
  describe("mono()", () => {
    it("should add mono formatting", () => {
      const output = mono("Hello world")({});
      expect(output).toBe("##Hello world##");
    });
  });
  describe("superscript()", () => {
    it("should add superscript formatting", () => {
      const output = superscript("Hello world")({});
      expect(output).toBe("^^Hello world^^");
    });
  });
  describe("subscript()", () => {
    it("should add subscript formatting", () => {
      const output = subscript("Hello world")({});
      expect(output).toBe(",,Hello world,,");
    });
  });
  describe("underline()", () => {
    it("should add underline formatting", () => {
      const output = underline("Hello world")({});
      expect(output).toBe("__Hello world__");
    });
  });
  describe("hr()", () => {
    it("should create horizontal rule", () => {
      const output = hr()({});
      expect(output).toBe("\n----\n");
    });
  });
  describe("verbatim()", () => {
    it("should create verbatim text", () => {
      const output = verbatim("Hello world")({});
      expect(output).toBe("{{{Hello world}}}");
    });
  });
  describe("multiline()", () => {
    it("should create multiline text", () => {
      const output = multiline([text("Hello"), text("World")])({});
      expect(output).toBe("(((\nHello\nWorld\n)))");
    });
  });
  describe("htmlWithWiki()", () => {
    it("should add html with wiki formatting", () => {
      const output = htmlWithWiki([text("<p>Hello</p>")])({});
      expect(output).toBe("{{html wiki=true}}\n<p>Hello</p>\n{{/html}}");
    });
  });
  describe("headerCell()", () => {
    it("should create header cell", () => {
      const output = headerCell([text("Hello")])({});
      expect(output).toBe("|=Hello");
    });
  });
  describe("html()", () => {
    it("should add html formatting to a single item", () => {
      const output = html([text("<p>Hello</p>")])({});
      expect(output).toBe("{{html}}\n<p>Hello</p>\n{{/html}}");
    });
    it("should add html formatting to all args", () => {
      const output = html([text("<p>Hello</p>"), text("<em>World</em>")])({});
      expect(output).toBe("{{html}}\n<p>Hello</p><em>World</em>\n{{/html}}");
    });
  });
  describe("infoBanner()", () => {
    it("should format as info banner", () => {
      const output = infoBanner([text("Hello")])({});
      expect(output).toBe("{{info}}\nHello\n{{/info}}");
    });
  });
  describe("warningBanner()", () => {
    it("should format as warning banner", () => {
      const output = warningBanner([text("Hello")])({});
      expect(output).toBe("{{warning}}\nHello\n{{/warning}}");
    });
  });
  describe("successBanner()", () => {
    it("should format as success banner", () => {
      const output = successBanner([text("Hello")])({});
      expect(output).toBe("{{success}}\nHello\n{{/success}}");
    });
  });
  describe("errorBanner()", () => {
    it("should format as error banner", () => {
      const output = errorBanner([text("Hello")])({});
      expect(output).toBe("{{error}}\nHello\n{{/error}}");
    });
  });
  describe("table()", () => {
    it("should have a newline after style", () => {
      const output = table(
        [
          row([cell([text("A")]), cell([text("B")], { color: "green" })], {
            color: "blue",
          }),
        ],
        { color: "red" }
      )({});
      expect(output).toBe(
        `(% style="color: red;" %)\n(% style="color: blue;" %)|A|(% style="color: green;" %)B\n\n`
      );
    });
  });

  // Tests for new macro functions
  describe("definitionTerm()", () => {
    it("should create definition term", () => {
      const output = definitionTerm("Term")({});
      expect(output).toBe("; Term");
    });
  });
  describe("definitionDescription()", () => {
    it("should create definition description", () => {
      const output = definitionDescription("Description")({});
      expect(output).toBe(": Description");
    });
  });
  describe("definitionList()", () => {
    it("should create definition list", () => {
      const output = definitionList([
        definitionTerm("Term"),
        definitionDescription("Description"),
      ])({});
      expect(output).toBe("; Term: Description\n");
    });
  });
  describe("blockquote()", () => {
    it("should create blockquote", () => {
      const output = blockquote([text("Quote")])({});
      expect(output).toBe("> Quote\n");
    });
  });
  describe("toc()", () => {
    it("should create table of contents", () => {
      const output = toc()({});
      expect(output).toBe("{{toc/}}\n");
    });
  });
  describe("box()", () => {
    it("should create box without title", () => {
      const output = box([text("Content")])({});
      expect(output).toBe("{{box}}\nContent\n{{/box}}");
    });
    it("should create box with title", () => {
      const output = box([text("Content")], "Title")({});
      expect(output).toBe('{{box title="Title"}}\nContent\n{{/box}}');
    });
  });
  describe("image()", () => {
    it("should create image with src only", () => {
      const output = image("test.jpg")({});
      expect(output).toBe('{{image src="test.jpg"/}}');
    });
    it("should create image with all attributes", () => {
      const output = image("test.jpg", "Alt text", "100", "200")({});
      expect(output).toBe(
        '{{image src="test.jpg" alt="Alt text" width="100" height="200"/}}'
      );
    });
  });
  describe("comment()", () => {
    it("should create comment", () => {
      const output = comment("Hidden text")({});
      expect(output).toBe("{{comment}}Hidden text{{/comment}}");
    });
  });
  describe("footnote()", () => {
    it("should create footnote", () => {
      const output = footnote("Note text")({});
      expect(output).toBe("{{footnote}}Note text{{/footnote}}");
    });
  });
  describe("putFootnotes()", () => {
    it("should create put footnotes", () => {
      const output = putFootnotes()({});
      expect(output).toBe("{{putFootnotes/}}");
    });
  });
  describe("faq()", () => {
    it("should create FAQ", () => {
      const output = faq([text("Q&A content")])({});
      expect(output).toBe("{{faq}}\nQ&A content\n{{/faq}}");
    });
  });
  describe("transclude()", () => {
    it("should create transclude", () => {
      const output = transclude("OtherPage")({});
      expect(output).toBe('{{include reference="OtherPage"/}}');
    });
  });
  describe("container()", () => {
    it("should create container without class", () => {
      const output = container([text("Content")])({});
      expect(output).toBe("{{container}}\nContent\n{{/container}}");
    });
    it("should create container with class", () => {
      const output = container([text("Content")], "my-class")({});
      expect(output).toBe(
        '{{container class="my-class"}}\nContent\n{{/container}}'
      );
    });
  });
  describe("gallery()", () => {
    it("should create gallery", () => {
      const output = gallery([text("Images")])({});
      expect(output).toBe("{{gallery}}\nImages\n{{/gallery}}");
    });
  });
  describe("showhide()", () => {
    it("should create show/hide without title", () => {
      const output = showhide([text("Hidden content")])({});
      expect(output).toBe("{{showhide}}\nHidden content\n{{/showhide}}");
    });
    it("should create show/hide with title", () => {
      const output = showhide([text("Hidden content")], "Click to show")({});
      expect(output).toBe(
        '{{showhide title="Click to show"}}\nHidden content\n{{/showhide}}'
      );
    });
  });
  describe("code()", () => {
    it("should create code block without language", () => {
      const output = code("console.log('hello');")({});
      expect(output).toBe("{{code}}\nconsole.log('hello');\n{{/code}}");
    });
    it("should create code block with language", () => {
      const output = code("console.log('hello');", "javascript")({});
      expect(output).toBe(
        "{{code language=\"javascript\"}}\nconsole.log('hello');\n{{/code}}"
      );
    });
  });
  describe("text()", () => {
    it("should create text node", () => {
      const output = text("Hello world")({});
      expect(output).toBe("Hello world");
    });
  });
  describe("render()", () => {
    it("should render array of nodes", () => {
      const output = render([text("Hello "), strong("world")]);
      expect(output).toBe("Hello **world**");
    });
    it("should render with context", () => {
      const contextNode = (context: any) => `Hello ${context.name}`;
      const output = render([contextNode], { name: "World" });
      expect(output).toBe("Hello World");
    });
  });
});
