import {
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
  br,
  verbatim,
  multiline,
  htmlWithWiki,
  headerCell,
  warningBanner,
  successBanner,
  errorBanner,
  text,
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
  enableSortableTables,
  sortableTable,
  sortableRow,
  formula,
  documentTree,
  subPages,
} from "..";
import { addStyle, render } from "../util";

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
      const output = h1("Hello").render({});
      expect(output).toBe("= Hello =");
    });
  });
  describe("h2()", () => {
    it("should create header level 2", () => {
      const output = h2("Hello").render({});
      expect(output).toBe("== Hello ==");
    });
  });
  describe("h3()", () => {
    it("should create header level 3", () => {
      const output = h3("Hello").render({});
      expect(output).toBe("=== Hello ===");
    });
  });
  describe("h4()", () => {
    it("should create header level 4", () => {
      const output = h4("Hello").render({});
      expect(output).toBe("==== Hello ====");
    });
  });
  describe("h5()", () => {
    it("should create header level 5", () => {
      const output = h5("Hello").render({});
      expect(output).toBe("===== Hello =====");
    });
  });
  describe("h6()", () => {
    it("should create header level 6", () => {
      const output = h6("Hello").render({});
      expect(output).toBe("====== Hello ======");
    });
  });
  describe("p()", () => {
    it("should create valid paragraph with single child", () => {
      const output = p([text("Hello")]).render({});
      expect(output).toBe("Hello");
    });
    it("should create valid paragraph with multiple", () => {
      const output = p([text("Hello "), strong("world")]).render({});
      expect(output).toBe("Hello **world**");
    });
    it("should create empty paragraph with zero children", () => {
      const output = p([]).render({});
      expect(output).toBe("");
    });
    it("should create valid paragraph string", () => {
      const output = p("Hello world").render({});
      expect(output).toBe("Hello world");
    });
  });
  describe("link()", () => {
    it("should create links", () => {
      const output = link("Hello", "http://foo.com").render({});
      expect(output).toBe("[[Hello>>http://foo.com]]");
    });
  });
  describe("strong()", () => {
    it("should add strong formatting", () => {
      const output = strong("Hello world").render({});
      expect(output).toBe("**Hello world**");
    });
    it("should compound with other formatting", () => {
      const output = strong(emphasis("Bold and Italic")).render({});
      expect(output).toBe("**//Bold and Italic//**");
    });
  });
  describe("emphasis()", () => {
    it("should add emphasis formatting", () => {
      const output = emphasis("Hello world").render({});
      expect(output).toBe("//Hello world//");
    });
  });
  describe("strike()", () => {
    it("should add strike formatting", () => {
      const output = strike("Hello world").render({});
      expect(output).toBe("--Hello world--");
    });
  });
  describe("mono()", () => {
    it("should add mono formatting", () => {
      const output = mono("Hello world").render({});
      expect(output).toBe("##Hello world##");
    });
  });
  describe("superscript()", () => {
    it("should add superscript formatting", () => {
      const output = superscript("Hello world").render({});
      expect(output).toBe("^^Hello world^^");
    });
  });
  describe("subscript()", () => {
    it("should add subscript formatting", () => {
      const output = subscript("Hello world").render({});
      expect(output).toBe(",,Hello world,,");
    });
  });
  describe("underline()", () => {
    it("should add underline formatting", () => {
      const output = underline("Hello world").render({});
      expect(output).toBe("__Hello world__");
    });
  });
  describe("hr()", () => {
    it("should create horizontal rule", () => {
      const output = hr().render({});
      expect(output).toBe("----");
    });
  });
  describe("br()", () => {
    it("should create line break", () => {
      const output = br().render({});
      expect(output).toBe("");
    });
  });
  describe("verbatim()", () => {
    it("should create verbatim text", () => {
      const output = verbatim("Hello world").render({});
      expect(output).toBe("{{{Hello world}}}");
    });
  });
  describe("multiline()", () => {
    it("should create multiline text", () => {
      const output = multiline([text("Hello"), text("World")]).render({});
      expect(output).toBe("(((\nHelloWorld\n)))");
    });
  });
  describe("htmlWithWiki()", () => {
    it("should add html with wiki formatting", () => {
      const output = htmlWithWiki([text("<p>Hello</p>")]).render({});
      expect(output).toBe("{{html wiki=true}}\n<p>Hello</p>\n{{/html}}");
    });
  });
  describe("headerCell()", () => {
    it("should create header cell", () => {
      const output = headerCell([text("Hello")]).render({});
      expect(output).toBe("|=Hello");
    });
  });
  describe("html()", () => {
    it("should add html formatting to a single item", () => {
      const output = html([text("<p>Hello</p>")]).render({});
      expect(output).toBe("{{html}}\n<p>Hello</p>\n{{/html}}");
    });
    it("should add html formatting to all args", () => {
      const output = html([
        text("<p>Hello</p>"),
        text("<em>World</em>"),
      ]).render({});
      expect(output).toBe("{{html}}\n<p>Hello</p><em>World</em>\n{{/html}}");
    });
    it("should add blank line before html when rendered with other elements", () => {
      const output = render([
        p([text("Some text")]),
        html([text("<p>HTML content</p>")]),
      ]);
      expect(output).toBe(
        "Some text\n\n{{html}}\n<p>HTML content</p>\n{{/html}}"
      );
    });
  });
  describe("infoBanner()", () => {
    it("should format as info banner", () => {
      const output = infoBanner([text("Hello")]).render({});
      expect(output).toBe("{{info}}\nHello\n{{/info}}");
    });
  });
  describe("warningBanner()", () => {
    it("should format as warning banner", () => {
      const output = warningBanner([text("Hello")]).render({});
      expect(output).toBe("{{warning}}\nHello\n{{/warning}}");
    });
  });
  describe("successBanner()", () => {
    it("should format as success banner", () => {
      const output = successBanner([text("Hello")]).render({});
      expect(output).toBe("{{success}}\nHello\n{{/success}}");
    });
  });
  describe("errorBanner()", () => {
    it("should format as error banner", () => {
      const output = errorBanner([text("Hello")]).render({});
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
      ).render({});
      expect(output).toBe(
        `(% style="color: red;" %)\n(% style="color: blue;" %)|A|(% style="color: green;" %)B`
      );
    });
  });
  describe("definition", () => {
    describe("definitionTerm()", () => {
      it("should create definition term", () => {
        const output = definitionTerm("Term").render({});
        expect(output).toBe("; Term");
      });
    });
    describe("definitionDescription()", () => {
      it("should create definition description", () => {
        const output = definitionDescription("Description").render({});
        expect(output).toBe(": Description");
      });
    });
    it("should create definition ", () => {
      const output = [
        definitionTerm("Term"),
        definitionDescription("Description"),
      ];
      expect(render(output)).toBe("; Term\n: Description");
    });
  });

  describe("definitionList()", () => {
    it("should create definition list", () => {
      const output = definitionList([
        definitionTerm("Term"),
        definitionDescription("Description"),
      ]).render({});
      expect(output).toBe("; Term\n: Description");
    });
  });
  describe("blockquote()", () => {
    it("should create blockquote", () => {
      const output = blockquote([text("Quote")]).render({});
      expect(output).toBe("> Quote");
    });
  });
  describe("toc()", () => {
    it("should create table of contents", () => {
      const output = toc().render({});
      expect(output).toBe("{{toc/}}");
    });
  });
  describe("box()", () => {
    it("should create box without title", () => {
      const output = box([text("Content")]).render({});
      expect(output).toBe("{{box}}\nContent\n{{/box}}");
    });
    it("should create box with title", () => {
      const output = box([text("Content")], "Title").render({});
      expect(output).toBe('{{box title="Title"}}\nContent\n{{/box}}');
    });
  });
  describe("image()", () => {
    it("should create image with src only", () => {
      const output = image("icon:star").render({});
      expect(output).toBe("[[image:icon:star]]");
    });
    it("should create image with all attributes", () => {
      const output = image(
        "amazon-logo.png",
        "Logo",
        "100",
        "200",
        "width:100px; height:100px;"
      ).render({});
      expect(output).toBe(
        '[[image:amazon-logo.png||alt="Logo" width="100" height="200" style="width:100px; height:100px;"]]'
      );
    });
    it("should create image with style only", () => {
      const output = image(
        "amazon-logo.png",
        undefined,
        undefined,
        undefined,
        "width:100px; height:100px;"
      ).render({});
      expect(output).toBe(
        '[[image:amazon-logo.png||style="width:100px; height:100px;"]]'
      );
    });
    it("should create image with width only", () => {
      const output = image("amazon-logo.png", undefined, "100").render({});
      expect(output).toBe('[[image:amazon-logo.png||width="100"]]');
    });
  });
  describe("comment()", () => {
    it("should create comment", () => {
      const output = comment("Hidden text").render({});
      expect(output).toBe("{{comment}}Hidden text{{/comment}}");
    });
  });
  describe("footnote()", () => {
    it("should create footnote", () => {
      const output = footnote("Note text").render({});
      expect(output).toBe("{{footnote}}Note text{{/footnote}}");
    });
  });
  describe("putFootnotes()", () => {
    it("should create put footnotes", () => {
      const output = putFootnotes().render({});
      expect(output).toBe("{{putFootnotes/}}");
    });
  });
  describe("faq()", () => {
    it("should create FAQ with question and answer", () => {
      const output = faq("Question?", "Answer!").render({});
      expect(output).toBe('{{FAQ question="Question?" answer="Answer!"/}}');
    });
  });
  describe("formula()", () => {
    it("should create inline formula", () => {
      const output = formula("E = mc^2").render({});
      expect(output).toBe("{{formula}}E = mc^2{{/formula}}");
    });
  });
  describe("documentTree()", () => {
    it("should create document tree without parameters", () => {
      const output = documentTree().render({});
      expect(output).toBe("{{documentTree/}}");
    });
    it("should create document tree with parameters", () => {
      const output = documentTree(
        "document:xwiki:Test.WebHome",
        true,
        10,
        false
      ).render({});
      expect(output).toBe(
        '{{documentTree root="document:xwiki:Test.WebHome" showRoot="true" limit="10" showAttachments="false"/}}'
      );
    });
  });
  describe("subPages()", () => {
    it("should create subPages without parameters", () => {
      const output = subPages().render({});
      expect(output).toBe("{{subPages/}}");
    });
    it("should create subPages with parameters", () => {
      const output = subPages("path.prefix", true).render({});
      expect(output).toBe('{{subPages prefix="path.prefix" useTitle="true"/}}');
    });
  });
  describe("transclude()", () => {
    it("should create transclude", () => {
      const output = transclude("OtherPage").render({});
      expect(output).toBe('{{include reference="OtherPage"/}}');
    });
  });
  describe("container()", () => {
    it("should create container without layoutStyle", () => {
      const output = container([text("Content")]).render({});
      expect(output).toBe("{{container}}\nContent\n{{/container}}\n");
    });
    it("should create container with layoutStyle", () => {
      const output = container([text("Content")], "columns").render({});
      expect(output).toBe(
        '{{container layoutStyle="columns"}}\nContent\n{{/container}}\n'
      );
    });
    it("should add blank line before container when rendered with other elements", () => {
      const output = render([
        p([text("Some text")]),
        container([text("Container content")]),
      ]);
      expect(output).toBe(
        "Some text\n\n{{container}}\nContainer content\n{{/container}}\n"
      );
    });
  });
  describe("gallery()", () => {
    it("should create gallery", () => {
      const output = gallery([text("Images")]).render({});
      expect(output).toBe("{{gallery}}\nImages\n{{/gallery}}");
    });
    it("should add blank line before gallery when rendered with other elements", () => {
      const output = render([
        p([text("Some text")]),
        gallery([text("Images")]),
      ]);
      expect(output).toBe("Some text\n\n{{gallery}}\nImages\n{{/gallery}}");
    });
  });
  describe("showhide()", () => {
    it("should create show/hide without title", () => {
      const output = showhide([text("Hidden content")]).render({});
      expect(output).toBe("{{showhide}}\nHidden content\n{{/showhide}}");
    });
    it("should create show/hide with title", () => {
      const output = showhide([text("Hidden content")], "Click to show").render(
        {}
      );
      expect(output).toBe(
        '{{showhide title="Click to show"}}\nHidden content\n{{/showhide}}'
      );
    });
    it("should add blank line before showhide when rendered with other elements", () => {
      const output = render([
        p([text("Some text")]),
        showhide([text("Hidden content")]),
      ]);
      expect(output).toBe(
        "Some text\n\n{{showhide}}\nHidden content\n{{/showhide}}"
      );
    });
  });
  describe("code()", () => {
    it("should create inline code for single line", () => {
      const output = code("console.log('hello');").render({});
      expect(output).toBe("{{code}}console.log('hello');{{/code}}");
    });
    it("should create inline code with language for single line", () => {
      const output = code("console.log('hello');", "javascript").render({});
      expect(output).toBe(
        "{{code language=\"javascript\"}}console.log('hello');{{/code}}"
      );
    });
    it("should create block code for multi-line", () => {
      const output = code("function test() {\n  return 1;\n}").render({});
      expect(output).toBe(
        "{{code}}\nfunction test() {\n  return 1;\n}\n{{/code}}"
      );
    });
    it("should add blank line before multi-line code when rendered with other elements", () => {
      const output = render([
        p([text("Some text")]),
        code("function test() {\n  return 1;\n}"),
      ]);
      expect(output).toBe(
        "Some text\n\n{{code}}\nfunction test() {\n  return 1;\n}\n{{/code}}"
      );
    });
    it("should not add blank line for inline code when rendered with other elements", () => {
      const output = render([
        p([text("Some text with "), code("inline code"), text(" here")]),
      ]);
      expect(output).toBe("Some text with {{code}}inline code{{/code}} here");
    });
  });
  describe("text()", () => {
    it("should create text node", () => {
      const output = text("Hello world").render({});
      expect(output).toBe("Hello world");
    });
  });
  describe("render()", () => {
    it("should render array of nodes", () => {
      const output = render([text("Hello "), strong("world")]);
      expect(output).toBe("Hello **world**");
    });
    it("should add newlines between block elements", () => {
      const output = render([h1("Title"), p([text("Content")])]);
      expect(output).toBe("= Title =\nContent");
    });
    it("should add blank lines after elements that need them", () => {
      const output = render([
        toc(),
        infoBanner([text("Info")]),
        box([text("Box content")]),
        h1("Header"),
        p([text("Content")]),
      ]);
      expect(output).toBe(
        "{{toc/}}\n\n{{info}}\nInfo\n{{/info}}\n\n{{box}}\nBox content\n{{/box}}\n\n= Header =\nContent"
      );
    });
    it("should add blank lines before headings", () => {
      const output = render([
        p([text("Content")]),
        h2("Header"),
        p([text("More")]),
      ]);
      expect(output).toBe("Content\n\n== Header ==\nMore");
    });
    it("should create inline code without newlines", () => {
      const output = code("x = 1").render({});
      expect(output).toBe("{{code}}x = 1{{/code}}");
    });
    it("should create block code with newlines", () => {
      const output = code("function test() {\n  return 1;\n}").render({});
      expect(output).toBe(
        "{{code}}\nfunction test() {\n  return 1;\n}\n{{/code}}"
      );
    });
    it("should not add newlines between inline elements", () => {
      const output = render([strong("Bold"), emphasis("Italic")]);
      expect(output).toBe("**Bold**//Italic//");
    });
    it("should render with context", () => {
      const contextNode = {
        render: (context: any) => `Hello ${context.name}`,
        newlineBefore: false,
        newlineAfter: false,
      };
      const output = render([contextNode], { name: "World" });
      expect(output).toBe("Hello World");
    });
  });
  describe("enableSortableTables()", () => {
    it("should create enable sortable tables macro", () => {
      const output = enableSortableTables().render({});
      expect(output).toBe("{{enableSortableTables/}}");
    });
  });
  describe("sortableTable()", () => {
    it("should create sortable table with id and classes", () => {
      const output = sortableTable([text("content")], "myTable").render({});
      expect(output).toBe(
        '(% class="grid sortable filterable doOddEven" id="myTable" %)\ncontent'
      );
    });
  });
  describe("sortableRow()", () => {
    it("should create regular row", () => {
      const output = sortableRow([text("content")]).render({});
      expect(output).toBe("content");
    });
    it("should create header row with sortHeader class", () => {
      const output = sortableRow([text("content")], true).render({});
      expect(output).toBe('(% class="sortHeader" %)content');
    });
  });
});
