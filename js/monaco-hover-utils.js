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
    [/!include\s/, function (lineContent) { return this.loadRefContent(lineContent) }],
    [/^uses:/, function (lineContent) { return this.loadRefContent(lineContent,'Create and pull in namespaced, reusable libraries containing data types, traits, resource types, schemas, examples and more.') }],
    [/^extends:/, function (lineContent) { return this.loadRefContent(lineContent) }],
    [/^types:/, 'A type declaration references another type, or wraps or extends another type by adding functional facets (e.g. properties) or non-functional facets (e.g. a description), or is a type expression that uses other types.'],
    [/^facets:/, 'Facets express various additional restrictions beyond those which types impose on their instances, such as the optional minimum and maximum facets for numbers, or the enum facet for scalars. In addition to the built-in facets, RAML provides a way to declare user-defined facets for any data type.'],
    [/^example:/, 'The OPTIONAL example facet can be used to attach an example of a type instance to the type declaration. There are two ways to represent the example facet value: as an explicit description of a specific type instance and as a map that contains additional facets.'],
    [/^examples:/, 'The OPTIONAL examples facet can be used to attach multiple examples to a type declaration. Its value is a map of key-value pairs, where each key represents a unique identifier for an example and the value is a single example.'],
    [/^(get:|patch:|put:|post:|delete:|head:|options:)/, 'The OPTIONAL properties get, patch, put, post, delete, head, and options of a resource define its methods; these correspond to the HTTP methods defined in the HTTP version 1.1 specification RFC2616 and its extension, RFC5789.'],
    [/^securitySchemes:/, 'An optional securitySchemes node is defined for the RAML document root. The value of securitySchemes is a map having key-value pairs that map security scheme names to security scheme declarations. Each authentication pattern supported by the API must be expressed as a component of the securitySchemes node value.']
  ],

  // Monaco editor decorations
  decorations: [],

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
   * @param   {monaco.editor.IStandaloneCodeEditor} editor - Monaco editor instance.
   * @returns {ProviderResult<Hover>} - Range and contents of a tooltip.
   */
  provideHover: function (model, position, editor) {
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
      this.decorations = editor.deltaDecorations(this.decorations, [
        {
          range: range,
          options: {
            linesDecorationsClassName: 'selected-line-editor-decoration',
            isWholeLine: true
          }
        }
      ])
      return {
        contents: [
          { value: descVal }
        ]
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
