const hoverUtils = {

  // Generic description returned when no description for parent block
  // is found or root elements like "title:" are hovered over.
  genericDesc: 'For every API, start by defining which version of RAML you are using, and then document basic characteristics of you API - the title, baseURI, and version.',

  // Pairs of [regex, desc] where:
  //   regex: regular expression to match line content against;
  //   desc: description to display in a tooltip if line content matches regexp.
  descRegexps: [
    [/^annotationTypes:/, 'Annotations let you add vendor specific functionality without compromising your spec.'],
    [/^traits:/, 'Traits let you take advantage of code reuse and design patterns.'],
    [/^resourceTypes:/, 'Resource types let you take advantage of code reuse and design patterns.'],
    // endpoint url
    [/^\/((\w|\d)*[{/}]?)+:/, 'Easily define resources and methods, then add as much detail as you want. Apply traits and other patterns, or add parameters and other details specific to each call.'],
    [/^responses:/, 'Describe expected responses for multiple media types and specify data types or call in pre-defined schemas and examples. Schemas and examples can be defined via a data type, in-line, or externalized with !include.'],
    [/\S+(.raml|.yaml|.json|.xml|.xsd|.txt)$/, function (lineContent) { return this.loadRefContent(lineContent) }],
    [/^uses:/, 'Create and pull in namespaced, reusable libraries containing data types, traits, resource types, schemas, examples and more.'],
    [/^types:/, 'A type declaration references another type, or wraps or extends another type by adding functional facets (e.g. properties) or non-functional facets (e.g. a description), or is a type expression that uses other types.'],
    [/^facets:/, 'Facets express various additional restrictions beyond those which types impose on their instances, such as the optional minimum and maximum facets for numbers, or the enum facet for scalars. In addition to the built-in facets, RAML provides a way to declare user-defined facets for any data type.'],
    [/^example:/, 'The OPTIONAL example facet can be used to attach an example of a type instance to the type declaration. There are two ways to represent the example facet value: as an explicit description of a specific type instance and as a map that contains additional facets.'],
    [/^examples:/, 'The OPTIONAL examples facet can be used to attach multiple examples to a type declaration. Its value is a map of key-value pairs, where each key represents a unique identifier for an example and the value is a single example.'],
    [/^(get|patch|put|post|delete|head|options):/, 'The OPTIONAL properties get, patch, put, post, delete, head, and options of a resource define its methods; these correspond to the HTTP methods defined in the HTTP version 1.1 specification RFC2616 and its extension, RFC5789.'],
    [/^(get|patch|put|post|delete|head|options)\?:/, 'A resource type definition MAY append a question mark (?) suffix to the name of any method to declare the method as optional.'],
    [/^securitySchemes:/, 'An optional securitySchemes node is defined for the RAML document root. The value of securitySchemes is a map having key-value pairs that map security scheme names to security scheme declarations. Each authentication pattern supported by the API must be expressed as a component of the securitySchemes node value.'],
    [/^title:/, 'A short, plain-text label. Its value is a string.'],
    [/^description:/, 'A substantial, human-friendly description. Its value is a string and MAY be formatted using markdown.'],
    [/^version:/, 'The version of the API, for example "v1". Its value is a string.'],
    [/^baseUri:/, 'A URI that serves as the base for URIs of all resources. Often used as the base of the URL of each resource containing the location of the API. Can be a template URI.'],
    [/^baseUriParameters:/, 'Named parameters used in the baseUri (template).'],
    [/^protocols:/, 'The OPTIONAL protocols node specifies the protocols that an API supports.'],
    [/^mediaType:/, 'The media types to use for request and response bodies (payloads), for example "application/json".'],
    [/^documentation:/, 'The OPTIONAL documentation node includes a variety of documents that serve as user guides and reference documentation for the API. Such documents can clarify how the API works or provide technical and business context.'],
    [/^securedBy:/, 'The security schemes to apply.'],
    [/^facets:/, 'A map of additional, user-defined restrictions that will be inherited and applied by any extending nodes.'],
    [/^properties:/, 'The properties that instances of this type can or must have. The properties declaration is a map of keys and values. The keys are valid property names for declaring a type instance. The values are either a name of a type or an inline type declaration.'],
    [/^required:/, 'Specifies that the property is required or not.'],
    [/^items:/, 'Indicates the type all items in the array are inherited from. Can be a reference to an existing type or an inline type declaration.'],
    [/^[A-Z]\w+\s?\|\s?[A-Z]\w+/, 'A union type is used to allow instances of data to be described by any of several types. A union type is declared via a type expression that combines 2 or more types delimited by pipe (|) symbols; these combined types are referred to as the union type`s super types.'],
    [/^\w\[\]$/, 'The array, a unary, postfix operator placed after another type expression, enclosed in parentheses as needed, indicates the resulting type is an array of instances of that type expression.'],
    [/^\[(\w,*\s*)+\]/, 'RAML Types support multiple inheritance. Type using it inherits all restrictions from listed types.'],
    [/^uriParameters:/, 'The OPTIONAL uriParameters node, is used to explicitly specify URI parameters in a Template URI. The value of the uriParameters node is a map, specifically a properties declaration, as is the value of the properties facet of a type declaration. Each property in the declaration object is a URI parameter declaration.'],
    [/^queryParameters:/, 'The queryParameters node specifies the set of query parameters from which the query string is composed. Mutually exclusive with queryString.'],
    [/^headers:/, 'An API`s methods can support or require various HTTP headers. The OPTIONAL headers node is used to explicitly specify those headers.'],
    [/^queryString:/, 'The queryString node is used to specify the query string as a whole, rather than as name-value pairs. The queryString value is either the name of a data type or an inline data type declaration, including a data type expression'],
    [/^body:/, 'The HTTP request/response body for a method is specified using the OPTIONAL body node. For example, to create a resource using a POST or PUT, the body of the request would usually include the details of the resource to be created.'],
    [/^usage:/, 'The OPTIONAL usage node of a resource type or trait provides instructions about how and when the resource type or trait SHOULD be used.'],
    [/^extends:/, 'API definitions might need to be extended in a variety of ways for different needs. Overlays of standard or non-standard metadata on top of an existing API definition can specify implementation details, or provide a translation of human-oriented documentation into different languages, without changing API behavior. Extending an API definition by adding to its behavior, or overriding certain aspects, is another way to satisfy different needs. RAML provides two mechanisms for extending API definitions: overlays and extensions.'],
    [/^is:/, 'A method can specify one or more traits it inherits using the OPTIONAL is node.']
  ],

  /**
   * Loads languages to make syntax highlighting work in tooltips.
   * https://github.com/microsoft/monaco-editor/issues/812#issuecomment-380709445
   *
   * @param {Array<string>} languages - Languages to load.
   */
  loadLanguages: function (...languages) {
    languages.forEach(language => {
      monaco.editor.createModel('', language).dispose()
    })
  },

  /**
   * Hover Provider "provideHover" method for Monaco.
   *
   * @param   {monaco.editor.ITextModel} model - Editor text model.
   * @param   {monaco.Position} model - A position in the editor.
   * @returns {ProviderResult<Hover>} - Range and contents of a tooltip.
   */
  provideHover: function (model, position) {
    let [desc, blockStartLineNum] = this.findBlockDescription(
      model, position.lineNumber)
    if (!desc) { return }
    if (typeof desc === 'function') {
      desc = desc.call(this, model.getLineContent(position.lineNumber))
    } else {
      desc = Promise.resolve(desc)
    }
    return desc.then(descVal => {
      const blockEndLineNum = this.findBlockLastLineNum(
        model, blockStartLineNum, blockStartLineNum + 1)
      const range = new monaco.Range(
        blockStartLineNum, model.getLineMinColumn(blockStartLineNum),
        blockEndLineNum, model.getLineMaxColumn(blockEndLineNum)
      )
      return {
        contents: [
          { value: descVal }
        ],
        range: range
      }
    })
  },

  /**
   * Finds line description by comparing line content and its parent
   * lines content agains regexps from `this.descRegexps`.
   *
   * @param   {monaco.editor.ITextModel} model - Editor text model.
   * @param   {number} blockStartLineNum - Line number which is being hovered over.
   * @returns {Array<string, number>} - [description, block first line number].
   */
  findBlockDescription: function (model, blockStartLineNum) {
    if (blockStartLineNum <= 1) {
      return [this.genericDesc, blockStartLineNum]
    }
    const lineContent = (model.getLineContent(blockStartLineNum) || '').trim()
    for (var [re, desc] of this.descRegexps) {
      if (RegExp(re).test(lineContent)) {
        return [desc, blockStartLineNum]
      }
    }
    const nextLineNum = this.findParentBlockFirstLineNum(
      model, blockStartLineNum, blockStartLineNum - 1)
    return this.findBlockDescription(model, nextLineNum)
  },

  /**
   * Finds particular line's parent block's first line number.
   * Line B is considered to be a parent of line A if line B contains
   * less whitespaces than the line A.
   *
   * @param  {monaco.editor.ITextModel} model - Editor text model.
   * @param  {number} lineNum - Line number to find parent for.
   * @param  {number} lookupLineNum - Line to perform lookup at.
   * @returns {number} - Parent line number.
   */
  findParentBlockFirstLineNum: function (model, lineNum, lookupLineNum) {
    const minLine = 1
    if (lookupLineNum <= minLine || lineNum <= minLine) {
      return minLine
    }
    const lineWsNum = this.getLineWsCount(model, lineNum)
    if (lineWsNum === 0) {
      return minLine
    }

    const lookupLineWsNum = this.getLineWsCount(model, lookupLineNum)

    return lookupLineWsNum < lineWsNum
      ? lookupLineNum
      : this.findParentBlockFirstLineNum(model, lineNum, lookupLineNum - 1)
  },

  /**
   * Finds block's last line number.
   * Lookup is done by fiding a number of next block first line and
   * returning a previous line number.
   * Having block's first line A, line B is considered the next block
   * first if it contains less or equal number of whitespace.
   *
   * @param  {monaco.editor.ITextModel} model - Editor text model.
   * @param  {number} firstLineNum - Block first line number.
   * @param  {number} lookupLineNum - Line to perform lookup at.
   * @returns {number} - Block last line number.
   */
  findBlockLastLineNum: function (model, firstLineNum, lookupLineNum) {
    const minLine = 1
    const maxLine = model.getLineCount()
    if (lookupLineNum >= maxLine ||
        firstLineNum >= maxLine ||
        firstLineNum <= minLine) {
      return maxLine
    }

    const firstLineWsNum = this.getLineWsCount(model, firstLineNum)
    const lookupLineWsNum = this.getLineWsCount(model, lookupLineNum)

    return lookupLineWsNum <= firstLineWsNum
      // Do not include found line because it's a start of the next block
      ? lookupLineNum - 1
      : this.findBlockLastLineNum(model, firstLineNum, lookupLineNum + 1)
  },

  /**
   * Get whitespaces count of the line.
   *
   * @param  {monaco.editor.ITextModel} model - Editor text model.
   * @param  {number} lineNum - Line number.
   * @returns {number} - Number of whitespaces on the line.
   */
  getLineWsCount: function (model, lineNum) {
    const lineCont = model.getLineContent(lineNum)
    return lineCont.length - lineCont.trim().length
  },

  /**
   * Requests url and returns response body text.
   *
   * @param {string} url - Url from which text response should be fetched.
   * @returns {Promise<string>} - Response body text.
   */
  fetchText: function (url) {
    return fetch(url).then(resp => resp.text())
  },

  /**
   * Loads reference content.
   *
   * @param {string} lineContent - Content of a line which contains ref.
   * @param {string} defaultDesc - Default description.
   * @returns {Promise<string>} - Formatted ref content or default description.
   */
  loadRefContent: function (lineContent, defaultDesc) {
    const url = this.parseUrl(lineContent)
    if (url.length < 1) {
      return Promise.resolve(defaultDesc)
    }
    return this.fetchText(url).then(text => {
      let ext = url.split('.').pop()
      if (ext === 'xsd') {
        ext = 'xml'
      }
      return '```' + ext + '\n' + text + '\n```'
    })
  },

  /**
   * Parses absolute url from line content.
   *
   * @param {string} lineContent - Content of a line.
   * @returns {string} - Absolute url.
   */
  parseUrl: function (lineContent) {
    let url = lineContent.trim().split(' ').pop()
    if (!url.startsWith('http')) {
      const urlObj = new URL(window.location.origin)
      urlObj.pathname = url
      return urlObj.href
    }
    return url
  },

  /**
   * Link Provider "provideLinks" method for Monaco.
   *
   * @param   {monaco.editor.ITextModel} model - Editor text model.
   * @returns {ProviderResult<ILinksList>} - Range and contents of a tooltip.
   */
  provideLinks: function (model) {
    const re = /\S+(.raml|.yaml|.json|.xml|.xsd|.txt)$/
    const matches = model.findMatches(re, false, true)
    const links = matches.map(m => {
      let lineCont = model.getLineContent(m.range.startLineNumber)
      return {
        range: m.range,
        url: this.parseUrl(lineCont)
      }
    })
    return {links: links}
  }
}
