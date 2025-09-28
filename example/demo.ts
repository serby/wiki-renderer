import {
  // Core functions
  text,
  // Headers
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,

  // Text formatting
  strong,
  emphasis,
  underline,
  strike,
  mono,
  superscript,
  subscript,

  // Paragraphs and content
  p,
  verbatim,
  link,
  hr,

  // Lists and definitions
  definitionTerm,
  definitionDescription,
  definitionList,
  blockquote,

  // Tables
  table,
  row,
  cell,
  headerCell,
  sortableTable,
  sortableRow,
  enableSortableTables,

  // Containers and layout
  box,
  container,
  gallery,
  showhide,
  multiline,

  // Banners and notifications
  infoBanner,
  warningBanner,
  successBanner,
  errorBanner,

  // Media and special content
  image,
  formula,
  code,
  html,
  htmlWithWiki,

  // Navigation and references
  toc,
  documentTree,
  subPages,
  transclude,

  // Interactive elements
  faq,
  comment,
  footnote,
  putFootnotes,
} from "../src/index";
import { Node, render } from "../src/util";

// Create comprehensive demo content
const demoContent: Node[] = [
  // Main title
  h1("Wiki Renderer Library - Complete Element Showcase"),

  p([
    text("This comprehensive demonstration showcases "),
    strong("every single element"),
    text(
      " available in the wiki renderer library. Each section demonstrates the element's usage with "
    ),
    emphasis("detailed explanations"),
    text(", "),
    mono("code examples"),
    text(", and educational content about cats."),
  ]),

  toc(),

  // === BASIC TEXT ELEMENTS ===
  h2("Basic Text Elements"),

  h3("Headers - All Six Levels"),
  p(
    "Headers provide hierarchical document structure. The library supports all six HTML header levels:"
  ),

  code(
    `// All header levels - from largest to smallest
h1("Main Title")           // = Main Title =
h2("Section Title")        // == Section Title ==
h3("Subsection")          // === Subsection ===
h4("Sub-subsection")      // ==== Sub-subsection ====
h5("Minor Heading")       // ===== Minor Heading =====
h6("Smallest Heading")    // ====== Smallest Heading ======`,
    "typescript"
  ),

  h4("Example Headers in Action"),
  p("Here are examples of the smaller header levels:"),
  h5("This is a Level 5 Header - Cat Behavior"),
  h6("This is a Level 6 Header - Purring Mechanics"),

  h3("Text Formatting Elements"),
  p([
    text("Text can be formatted in multiple ways: "),
    strong("strong/bold text"),
    text(", "),
    emphasis("emphasized/italic text"),
    text(", "),
    underline("underlined text"),
    text(", "),
    strike("strikethrough text"),
    text(", "),
    mono("monospace/code text"),
    text(", text with "),
    superscript("superscript"),
    text(" and "),
    subscript("subscript"),
    text("."),
  ]),

  code(
    `// Text formatting examples - all inline elements
strong("Bold text")           // **Bold text**
emphasis("Italic text")       // //Italic text//
underline("Underlined")       // __Underlined__
strike("Crossed out")         // --Crossed out--
mono("Code text")             // ##Code text##
superscript("E=mc²")          // E=mc^^²^^
subscript("H₂O")              // H,,₂,,O`,
    "typescript"
  ),

  h3("Paragraphs and Text Nodes"),
  p("Simple paragraph with string content - cats are fascinating creatures."),

  p([
    text("Complex paragraph with "),
    strong("mixed"),
    text(" "),
    emphasis("formatting"),
    text(" and "),
    link("internal links", "CatBreeds"),
    text(". Cats have been companions to humans for over 9,000 years."),
  ]),

  p([
    text("Verbatim text preserves exact formatting: "),
    verbatim("  <cat>  exact  spacing  </cat>  "),
    text(" - useful for code snippets or ASCII art."),
  ]),

  code(
    `// Paragraph and text examples
p("Simple string paragraph")
p([text("Complex "), strong("formatted"), text(" paragraph")])
text("Plain text node")
verbatim("Exact formatting preserved")
link("Link Text", "TargetPage")  // [[Link Text>>TargetPage]]`,
    "typescript"
  ),

  hr(),

  // === LISTS AND DEFINITIONS ===
  h2("Lists and Definitions"),

  h3("Definition Lists"),
  p(
    "Definition lists pair terms with their descriptions, perfect for glossaries and explanations:"
  ),

  definitionList([
    definitionTerm("Felis catus"),
    definitionDescription(
      "The scientific name for domestic cats, meaning 'cat' in Latin"
    ),
    definitionTerm("Purring"),
    definitionDescription(
      "A continuous, soft vibrating sound cats make when content, stressed, or healing"
    ),
    definitionTerm("Whiskers (Vibrissae)"),
    definitionDescription(
      "Specialized sensory hairs that help cats navigate and sense their environment"
    ),
    definitionTerm("Kneading"),
    definitionDescription(
      "The rhythmic pushing motion cats make with their paws, often called 'making biscuits'"
    ),
  ]),

  code(
    `// Definition list example
definitionList([
  definitionTerm("Term 1"),
  definitionDescription("Description of term 1"),
  definitionTerm("Term 2"), 
  definitionDescription("Description of term 2")
])
// Output:
// ; Term 1
// : Description of term 1
// ; Term 2
// : Description of term 2`,
    "typescript"
  ),

  h3("Blockquotes"),
  p(
    "Blockquotes highlight important information, citations, or notable facts:"
  ),

  blockquote([
    text(
      "Cats have been associated with humans for at least 9,000 years, and are currently the most popular pet in the world, with over 600 million cats living in homes worldwide."
    ),
  ]),

  blockquote([
    text(
      "A cat has absolute emotional honesty: human beings, for one reason or another, may hide their feelings, but a cat does not."
    ),
    text(" — Ernest Hemingway"),
  ]),

  blockquote([
    text(
      "The ancient Egyptians were the first to domesticate cats around 4,000 BCE. They considered cats sacred and even "
    ),
    emphasis("mummified"),
    text(" them alongside pharaohs."),
  ]),

  code(
    `// Blockquote examples
blockquote([text("Single line quote")])
blockquote([
  text("Multi-line quote with "),
  emphasis("formatting"),
  text(" and multiple elements")
])
// Output: > prefixed lines`,
    "typescript"
  ),

  hr(),

  // === TABLES ===
  h2("Tables and Data Display"),

  h3("Basic Tables"),
  p(
    "Tables organize data in rows and columns. Here's a basic table without styling:"
  ),

  table([
    row([
      headerCell([text("Breed")]),
      headerCell([text("Origin")]),
      headerCell([text("Coat Length")]),
    ]),
    row([cell([text("Persian")]), cell([text("Iran")]), cell([text("Long")])]),
    row([
      cell([text("Siamese")]),
      cell([text("Thailand")]),
      cell([text("Short")]),
    ]),
    row([
      cell([text("Maine Coon")]),
      cell([text("United States")]),
      cell([text("Long")]),
    ]),
  ]),

  h3("Styled Tables"),
  p("Tables support CSS styling for enhanced presentation:"),

  table(
    [
      row([
        headerCell([text("Cat Feature")], {
          backgroundColor: "#f0f0f0",
          fontWeight: "bold",
          padding: "8px",
        }),
        headerCell([text("Description")], {
          backgroundColor: "#f0f0f0",
          fontWeight: "bold",
          padding: "8px",
        }),
      ]),
      row([
        cell([text("Night Vision")], { color: "#333", padding: "8px" }),
        cell(
          [text("Cats can see in light levels six times lower than humans")],
          { padding: "8px" }
        ),
      ]),
      row([
        cell([text("Hearing Range")], { color: "#333", padding: "8px" }),
        cell(
          [text("Can hear frequencies up to 64,000 Hz (humans: 20,000 Hz)")],
          { padding: "8px" }
        ),
      ]),
      row([
        cell([text("Flexibility")], { color: "#333", padding: "8px" }),
        cell(
          [
            text(
              "Can rotate their ears 180 degrees and have 32 muscles controlling each ear"
            ),
          ],
          { padding: "8px" }
        ),
      ]),
    ],
    { border: "1px solid #ccc", borderCollapse: "collapse", width: "100%" }
  ),

  code(
    `// Table examples
// Basic table
table([
  row([headerCell([text("Header 1")]), headerCell([text("Header 2")])]),
  row([cell([text("Data 1")]), cell([text("Data 2")])])
])

// Styled table
table([...rows], { border: "1px solid #ccc", borderCollapse: "collapse" })
row([...cells], { backgroundColor: "#f5f5f5" })
cell([text("Content")], { padding: "8px", color: "#333" })
headerCell([text("Header")], { fontWeight: "bold", backgroundColor: "#e0e0e0" })`,
    "typescript"
  ),

  h3("Sortable Tables"),
  p(
    "Advanced tables with sorting capabilities. This requires enableSortableTables() and uses sortableTable/sortableRow:"
  ),

  enableSortableTables(),

  sortableTable(
    [
      sortableRow(
        [
          cell([text("Cat Breed")]),
          cell([text("Weight (lbs)")]),
          cell([text("Lifespan (years)")]),
          cell([text("Energy Level")]),
          cell([text("Grooming Needs")]),
          cell([text("Good with Kids")]),
          cell([text("Shedding Level")]),
          cell([text("Origin Country")]),
          cell([text("Intelligence")]),
        ],
        true
      ), // isHeader = true
      sortableRow([
        cell([text("Maine Coon")]),
        cell([text("13-18")]),
        cell([text("12-15")]),
        cell([text("Medium")]),
        cell([text("High")]),
        cell([text("Excellent")]),
        cell([text("High")]),
        cell([text("United States")]),
        cell([text("High")]),
      ]),
      sortableRow([
        cell([text("Persian")]),
        cell([text("7-12")]),
        cell([text("10-17")]),
        cell([text("Low")]),
        cell([text("Very High")]),
        cell([text("Good")]),
        cell([text("High")]),
        cell([text("Iran")]),
        cell([text("Medium")]),
      ]),
      sortableRow([
        cell([text("Siamese")]),
        cell([text("6-14")]),
        cell([text("11-15")]),
        cell([text("Very High")]),
        cell([text("Low")]),
        cell([text("Excellent")]),
        cell([text("Low")]),
        cell([text("Thailand")]),
        cell([text("Very High")]),
      ]),
      sortableRow([
        cell([text("British Shorthair")]),
        cell([text("9-17")]),
        cell([text("12-20")]),
        cell([text("Low")]),
        cell([text("Medium")]),
        cell([text("Excellent")]),
        cell([text("Medium")]),
        cell([text("United Kingdom")]),
        cell([text("Medium")]),
      ]),
      sortableRow([
        cell([text("Ragdoll")]),
        cell([text("10-20")]),
        cell([text("12-17")]),
        cell([text("Low")]),
        cell([text("Medium")]),
        cell([text("Excellent")]),
        cell([text("Medium")]),
        cell([text("United States")]),
        cell([text("Medium")]),
      ]),
      sortableRow([
        cell([text("Bengal")]),
        cell([text("8-15")]),
        cell([text("12-16")]),
        cell([text("Very High")]),
        cell([text("Low")]),
        cell([text("Good")]),
        cell([text("Low")]),
        cell([text("United States")]),
        cell([text("Very High")]),
      ]),
      sortableRow([
        cell([text("Russian Blue")]),
        cell([text("7-12")]),
        cell([text("15-20")]),
        cell([text("Medium")]),
        cell([text("Low")]),
        cell([text("Good")]),
        cell([text("Medium")]),
        cell([text("Russia")]),
        cell([text("High")]),
      ]),
      sortableRow([
        cell([text("Abyssinian")]),
        cell([text("6-10")]),
        cell([text("9-15")]),
        cell([text("High")]),
        cell([text("Low")]),
        cell([text("Good")]),
        cell([text("Low")]),
        cell([text("Ethiopia")]),
        cell([text("High")]),
      ]),
      sortableRow([
        cell([text("Scottish Fold")]),
        cell([text("6-13")]),
        cell([text("11-14")]),
        cell([text("Medium")]),
        cell([text("Medium")]),
        cell([text("Excellent")]),
        cell([text("Medium")]),
        cell([text("Scotland")]),
        cell([text("Medium")]),
      ]),
    ],
    "catBreedsTable"
  ),

  code(
    `// Sortable table example
enableSortableTables()  // Required for sortable functionality

sortableTable([
  sortableRow([...headerCells], true),  // isHeader = true
  sortableRow([...dataCells]),          // Regular data rows
  sortableRow([...dataCells])
], "uniqueTableId")  // Must have unique ID`,
    "typescript"
  ),

  hr(),

  // === MEDIA AND IMAGES ===
  h2("Media and Visual Elements"),

  h3("Images - All Parameter Variations"),
  p(
    "Images support various formats and styling options using the [[image:...]] syntax:"
  ),

  p([
    text("Simple icons: "),
    image("icon:star"),
    text(" "),
    image("icon:exclamation"),
    text(" "),
    image("icon:accept"),
    text(" "),
    image("icon:arrow_right"),
  ]),

  p([
    text("Image with style attribute: "),
    image(
      "amazon-logo.png",
      undefined,
      undefined,
      undefined,
      "width:100px; height:100px;"
    ),
  ]),

  p([
    text("Image with width only: "),
    image("amazon-logo.png", undefined, "100"),
  ]),

  p([
    text("Image with all parameters: "),
    image(
      "cat-photo.jpg",
      "A beautiful cat",
      "150",
      "100",
      "border: 2px solid #ccc; border-radius: 8px;"
    ),
  ]),

  code(
    `// Image examples - all parameter variations
image("icon:star")                    // [[image:icon:star]]
image("logo.png", "Alt text")         // [[image:logo.png||alt="Alt text"]]
image("logo.png", undefined, "100")   // [[image:logo.png||width="100"]]
image("logo.png", undefined, undefined, undefined, "width:100px; height:100px;")
// [[image:logo.png||style="width:100px; height:100px;"]]
image("photo.jpg", "Alt", "150", "100", "border: 1px solid #ccc")
// [[image:photo.jpg||alt="Alt" width="150" height="100" style="border: 1px solid #ccc"]]`,
    "typescript"
  ),

  h3("Mathematical Formulas"),
  p([
    text("Inline formulas can be embedded: "),
    formula("E = mc^2"),
    text(", "),
    formula("a^2 + b^2 = c^2"),
    text(", and "),
    formula("\\sum_{i=1}^{n} x_i"),
    text(". Cats' jumping ability follows physics: "),
    formula("h = \\frac{v^2}{2g}"),
    text(" where h is height, v is initial velocity, and g is gravity."),
  ]),

  code(
    `// Formula examples
formula("E = mc^2")        // {{formula}}E = mc^2{{/formula}}
formula("∑(x_i)")          // {{formula}}∑(x_i){{/formula}}
formula("\\\\frac{a}{b}")   // {{formula}}\\frac{a}{b}{{/formula}}`,
    "typescript"
  ),

  hr(),

  // === CODE AND TECHNICAL CONTENT ===
  h2("Code and Technical Content"),

  h3("Code Blocks - Inline and Block"),
  p([
    text("Inline code like "),
    code("const cat = new Cat()"),
    text(" can be mixed with regular text. The "),
    mono("code()"),
    text(" function automatically detects single-line vs multi-line content."),
  ]),

  p("Multi-line code blocks with syntax highlighting:"),

  code(
    `// TypeScript - Cat class implementation
interface Cat {
  name: string;
  breed: string;
  age: number;
  weight: number;
  purr(): void;
  meow(): string;
}

class DomesticCat implements Cat {
  constructor(
    public name: string,
    public breed: string,
    public age: number,
    public weight: number
  ) {}
  
  purr(): void {
    console.log("*purr purr*");
  }
  
  meow(): string {
    return \`\${this.name} says meow!\`;
  }
  
  calculateFoodPortion(): number {
    // Adult cats need ~20 calories per pound
    return this.weight * 20;
  }
}

// Usage example
const myCat = new DomesticCat("Whiskers", "Maine Coon", 3, 15);
console.log(myCat.meow()); // "Whiskers says meow!"
myCat.purr(); // *purr purr*`,
    "typescript"
  ),

  code(
    `// Swift/SwiftUI - Cat management app
import SwiftUI

struct Cat: Identifiable {
    let id = UUID()
    let name: String
    let breed: String
    let age: Int
    let weight: Double
    
    func purr() {
        print("*purr purr*")
    }
    
    var dailyCalories: Double {
        return weight * 20 // 20 calories per pound
    }
}

struct CatView: View {
    let cat: Cat
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(cat.name)
                .font(.title)
                .fontWeight(.bold)
            
            HStack {
                Text("Breed:")
                    .fontWeight(.medium)
                Text(cat.breed)
            }
            
            HStack {
                Text("Age:")
                    .fontWeight(.medium)
                Text("\\(cat.age) years")
            }
            
            HStack {
                Text("Daily calories:")
                    .fontWeight(.medium)
                Text("\\(Int(cat.dailyCalories))")
            }
            
            Button("Make Purr") {
                cat.purr()
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(8)
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
    }
}`,
    "swift"
  ),

  code(
    `// Kotlin - Cat data management
data class Cat(
    val name: String,
    val breed: String,
    val age: Int,
    val weight: Double
) {
    fun purr() {
        println("*purr purr*")
    }
    
    fun meow(): String = "$name says meow!"
    
    val dailyCalories: Double
        get() = weight * 20 // 20 calories per pound
    
    val isKitten: Boolean
        get() = age < 1
    
    val isSenior: Boolean
        get() = age >= 7
}

class CatShelter {
    private val cats = mutableListOf<Cat>()
    
    fun addCat(cat: Cat) {
        cats.add(cat)
        println("Added \${cat.name} to the shelter")
    }
    
    fun feedAllCats() {
        cats.forEach { cat ->
            println("Feeding \${cat.name} - \${cat.dailyCalories.toInt()} calories")
            cat.purr()
        }
    }
    
    fun getCatsByBreed(breed: String): List<Cat> {
        return cats.filter { it.breed.equals(breed, ignoreCase = true) }
    }
    
    fun getKittens(): List<Cat> = cats.filter { it.isKitten }
    
    fun getSeniorCats(): List<Cat> = cats.filter { it.isSenior }
}

// Usage
val shelter = CatShelter()
shelter.addCat(Cat("Mittens", "Persian", 2, 8.5))
shelter.addCat(Cat("Shadow", "Maine Coon", 5, 15.2))
shelter.feedAllCats()`,
    "kotlin"
  ),

  code(
    `// Code function examples
code("inline code")                    // {{code}}inline code{{/code}}
code("multi\\nline\\ncode")            // {{code}}\\nmulti\\nline\\ncode\\n{{/code}}
code("const x = 1", "typescript")      // {{code language="typescript"}}const x = 1{{/code}}

// Automatic detection:
code("single line") // Renders as inline
code("line 1\\nline 2") // Renders as block`,
    "typescript"
  ),

  h3("HTML Content"),
  p("Raw HTML can be embedded with or without wiki processing:"),

  html([
    text(
      "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 8px; margin: 10px 0;'>"
    ),
    text("<h4 style='margin: 0 0 10px 0;'>🐱 Cat Facts HTML Block</h4>"),
    text(
      "<p style='margin: 0;'>This is <strong>raw HTML</strong> content. Cats spend 70% of their lives sleeping - that's 13-16 hours a day!</p>"
    ),
    text("</div>"),
  ]),

  htmlWithWiki([
    text(
      "<div class='wiki-enhanced' style='border: 2px dashed #ff6b6b; padding: 10px; background: #ffe0e0;'>"
    ),
    text("This HTML block "),
    strong("processes wiki markup"),
    text(" within the HTML. Cats have "),
    emphasis("32 muscles"),
    text(" controlling each ear!"),
    text("</div>"),
  ]),

  code(
    `// HTML examples
html([text("<div>Raw HTML content - no wiki processing</div>")])
htmlWithWiki([
  text("<div>"), 
  strong("Wiki markup"), 
  text(" processed in HTML</div>")
])`,
    "typescript"
  ),

  hr(),

  // === CONTAINERS AND LAYOUT ===
  h2("Containers and Layout Elements"),

  h3("Information Banners - All Types"),
  p("Banners highlight different types of information with semantic meaning:"),

  infoBanner([
    text("📘 "),
    strong("Information Banner"),
    text(
      " - Cats have a third eyelid called a nictitating membrane that helps protect their eyes."
    ),
  ]),

  warningBanner([
    text("⚠️ "),
    strong("Warning Banner"),
    text(" - Chocolate, onions, garlic, and grapes are "),
    emphasis("toxic to cats"),
    text(" and should never be given to them!"),
  ]),

  successBanner([
    text("✅ "),
    strong("Success Banner"),
    text(
      " - Your cat has been successfully registered for vaccination! Regular vet checkups keep cats healthy."
    ),
  ]),

  errorBanner([
    text("❌ "),
    strong("Error Banner"),
    text(
      " - Failed to connect to the veterinary database. Please check your internet connection."
    ),
  ]),

  code(
    `// Banner examples - all four types
infoBanner([text("Information message with "), strong("formatting")])
warningBanner([text("Warning about "), emphasis("important"), text(" safety")])
successBanner([text("Success confirmation message")])
errorBanner([text("Error description and guidance")])`,
    "typescript"
  ),

  h3("Content Boxes"),
  p("Boxes group related content with optional titles:"),

  box([
    text(
      "This is a basic box without a title. Cats are crepuscular, meaning they're most active during dawn and dusk hours."
    ),
    p([
      text("Boxes can contain "),
      emphasis("any type"),
      text(" of content including paragraphs, lists, and other elements."),
    ]),
  ]),

  box(
    [
      h5("🐾 Essential Cat Care Items"),
      definitionList([
        definitionTerm("Litter Box"),
        definitionDescription(
          "Clean daily, scoop waste immediately. One box per cat plus one extra."
        ),
        definitionTerm("Food and Water Bowls"),
        definitionDescription(
          "Stainless steel or ceramic preferred. Avoid plastic which can harbor bacteria."
        ),
        definitionTerm("Scratching Post"),
        definitionDescription(
          "Tall enough for full stretch, stable base. Cats need to scratch to maintain claw health."
        ),
        definitionTerm("Cat Carrier"),
        definitionDescription(
          "Hard-sided carrier for vet visits. Leave it out so cats become comfortable with it."
        ),
      ]),
    ],
    "Cat Care Essentials"
  ),

  code(
    `// Box examples
box([text("Content without title")])
box([
  h4("Title"),
  text("Content with title")
], "Box Title")`,
    "typescript"
  ),

  h3("Containers and Galleries"),
  p("Containers provide flexible layout options, galleries organize media:"),

  container([
    p(
      "This content is inside a basic container. Cats have excellent balance due to their flexible spine and inner ear structure."
    ),
    p("Containers help organize and structure content logically."),
  ]),

  container(
    [
      multiline([
        h3("Column 1"),
        p("This container uses column layout for better organization."),
        p(
          "Content flows in columns when space allows, perfect for side-by-side information."
        ),
      ]),
      multiline([
        h3("Column 2"),
        p(
          "Cats can rotate their ears 180 degrees independently to pinpoint sounds."
        ),
      ]),
      multiline([
        h3("Column 3"),
        p(
          "Cats can rotate their ears 180 degrees independently to pinpoint sounds."
        ),
      ]),
    ],
    "columns"
  ),

  gallery([
    image("icon:star"),
    image("icon:accept"),
    image("icon:exclamation"),
    image("icon:arrow_right"),
  ]),

  code(
    `// Container and gallery examples
container([...content])                    // Basic container
container([...content], "columns")        // Column layout
gallery([
  image("cat1.jpg"), 
  image("cat2.jpg"), 
  image("cat3.jpg")
])`,
    "typescript"
  ),

  h3("Show/Hide Collapsible Sections"),
  p("Collapsible sections help organize large amounts of content:"),

  showhide([
    h5("Cat Breeds by Size Categories"),
    definitionList([
      definitionTerm("Small Cats (5-10 lbs)"),
      definitionDescription(
        "Singapura, Cornish Rex, Devon Rex, Japanese Bobtail, Munchkin"
      ),
      definitionTerm("Medium Cats (8-12 lbs)"),
      definitionDescription(
        "Siamese, Russian Blue, Abyssinian, British Shorthair, Scottish Fold"
      ),
      definitionTerm("Large Cats (11-25 lbs)"),
      definitionDescription(
        "Maine Coon, Ragdoll, Norwegian Forest Cat, Siberian, Savannah"
      ),
    ]),
  ]),

  showhide(
    [
      h5("Detailed Cat Nutrition Information"),
      p(
        "Cats are obligate carnivores, meaning they require nutrients found only in animal tissue."
      ),
      definitionList([
        definitionTerm("Taurine"),
        definitionDescription(
          "Essential amino acid found only in animal tissue. Deficiency causes heart problems and blindness."
        ),
        definitionTerm("Arachidonic Acid"),
        definitionDescription(
          "Essential fatty acid cats cannot synthesize. Found in animal fats."
        ),
        definitionTerm("Vitamin A"),
        definitionDescription(
          "Cats cannot convert beta-carotene to vitamin A like other animals. Must get it from animal liver."
        ),
        definitionTerm("Niacin (Vitamin B3)"),
        definitionDescription(
          "Cats cannot synthesize enough niacin from tryptophan and need dietary sources."
        ),
      ]),
    ],
    "Advanced Feline Nutrition"
  ),

  code(
    `// Show/hide examples
showhide([...content])                     // Default title
showhide([...content], "Custom Title")    // Custom title
// Creates collapsible sections with {{showhide}} macro`,
    "typescript"
  ),

  h3("Multiline Content"),
  p("Multiline blocks preserve exact formatting and line breaks:"),

  multiline([
    p("🐱 Cat ASCII Art:"),
    p("   /\\_/\\  "),
    p("  ( o.o ) "),
    p("   > ^ <  "),
    p(""),
    p("Fun Cat Facts:"),
    p("• Cats have 32 muscles in each ear"),
    p("• A group of cats is called a 'clowder'"),
    p("• Cats can't taste sweetness"),
    p("• The oldest known pet cat was found in a 9,000-year-old grave"),
  ]),

  code(
    `// Multiline example
multiline([
  p("Line 1: Preserves exact formatting"),
  p("Line 2: Each text() becomes a separate line"),
  p("Line 3: Perfect for ASCII art or structured data")
])
// Output wrapped in ((( ))) with line breaks preserved`,
    "typescript"
  ),

  hr(),

  // === NAVIGATION AND REFERENCES ===
  h2("Navigation and Reference Elements"),

  h3("Table of Contents"),
  p(
    "The table of contents (shown at the top) automatically generates navigation from headers."
  ),

  code(
    `// Table of contents
toc()  // {{toc/}} - Automatically generates from h1-h6 elements`,
    "typescript"
  ),

  h3("Document Tree and Sub-pages"),
  p(
    "Document trees show hierarchical page structures, sub-pages list related content:"
  ),

  documentTree(),

  documentTree("CatBreeds.WebHome", true, 5, false),

  subPages(),

  subPages("Cat", true),

  code(
    `// Document tree examples
documentTree()                                    // Basic tree from current location
documentTree("Root.Page", true, 10, false)      // Custom root, show root, depth 10, no files
subPages()                                       // Basic sub-pages listing
subPages("Prefix", true)                         // With prefix filter and titles`,
    "typescript"
  ),

  h3("Transclusion and Links"),
  p([
    text("Content can be transcluded from other pages, and "),
    link("internal links", "CatBreeds"),
    text(" connect related content. Links use the "),
    mono("[[text>>target]]"),
    text(" syntax."),
  ]),

  transclude("CatCareBasics"),

  code(
    `// Links and transclusion
link("Link Text", "TargetPage")              // [[Link Text>>TargetPage]]
transclude("PageName")                       // {{include reference="PageName"/}}`,
    "typescript"
  ),

  hr(),

  // === INTERACTIVE AND SPECIAL ELEMENTS ===
  h2("Interactive and Special Elements"),

  h3("FAQ Elements"),
  p("FAQ elements provide structured question-and-answer content:"),

  faq(
    "How often should I feed my cat?",
    "Adult cats should be fed 2-3 times per day with measured portions based on their weight and activity level. Kittens need more frequent feeding - 3-4 times daily."
  ),

  faq(
    "Why do cats purr?",
    "Cats purr for various reasons: contentment, self-soothing when stressed or injured, healing (vibrations may promote bone healing at 25-50 Hz), and communication with humans and other cats."
  ),

  faq(
    "How long do cats typically live?",
    "Indoor cats typically live 12-18 years, while outdoor cats have shorter lifespans of 2-5 years due to traffic, predators, disease, and other risks. Proper veterinary care extends lifespan significantly."
  ),

  faq(
    "Do cats really have nine lives?",
    "No, this is a myth. Cats are excellent at surviving falls and escaping danger due to their flexible spine, righting reflex, and keen senses, but they have only one life like all animals."
  ),

  code(
    `// FAQ examples
faq("Question text", "Detailed answer text")
// Creates: {{FAQ question="Question text" answer="Detailed answer text"/}}`,
    "typescript"
  ),

  h3("Comments and Footnotes"),
  p([
    text("Comments are hidden from normal view"),
    comment(
      "This is a hidden comment about cat behavior research from Cornell University"
    ),
    text(", while footnotes"),
    footnote(
      "Cats have been domesticated for approximately 9,000 years, with evidence from Cyprus"
    ),
    text(" provide additional information"),
    footnote(
      "The ancient Egyptians were among the first to domesticate cats around 4,000 BCE for pest control"
    ),
    text(" that appears at the bottom of the page"),
    footnote(
      "Modern house cats descended from African wildcats (Felis lybica)"
    ),
    text("."),
  ]),

  putFootnotes(),

  code(
    `// Comments and footnotes
comment("Hidden comment")                    // {{comment}}Hidden comment{{/comment}}
footnote("Footnote text")                   // {{footnote}}Footnote text{{/footnote}}
putFootnotes()                              // {{putFootnotes/}} - Renders all footnotes`,
    "typescript"
  ),

  hr(),

  // === FINAL SUMMARY ===
  h2("Complete Element Summary"),

  p([
    text("This comprehensive demonstration has showcased "),
    strong("every single element"),
    text(" available in the wiki renderer library:"),
  ]),

  definitionList([
    definitionTerm("Text Elements (13)"),
    definitionDescription(
      "h1-h6, p, text, strong, emphasis, underline, strike, mono, superscript, subscript, verbatim, link, hr"
    ),
    definitionTerm("Structure Elements (8)"),
    definitionDescription(
      "definitionTerm, definitionDescription, definitionList, blockquote, table, row, cell, headerCell"
    ),
    definitionTerm("Layout Elements (9)"),
    definitionDescription(
      "box, container, gallery, showhide, multiline, infoBanner, warningBanner, successBanner, errorBanner"
    ),
    definitionTerm("Media Elements (3)"),
    definitionDescription(
      "image (with all parameters), formula, code (inline/block with language)"
    ),
    definitionTerm("Advanced Elements (8)"),
    definitionDescription(
      "html, htmlWithWiki, sortableTable, sortableRow, enableSortableTables, toc, documentTree, subPages"
    ),
    definitionTerm("Interactive Elements (5)"),
    definitionDescription("faq, comment, footnote, putFootnotes, transclude"),
  ]),

  successBanner([
    text("🎉 "),
    strong("Demo Complete!"),
    text(" All "),
    mono("46 unique elements"),
    text(" demonstrated with "),
    emphasis("comprehensive examples"),
    text(", "),
    strong("code snippets"),
    text(
      ", and educational cat content. The library supports everything from simple text to complex interactive components!"
    ),
  ]),
];

// Export the rendered demo
console.log(render(demoContent));
