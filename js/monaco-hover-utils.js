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
    [/^description:/, 'Write human-readable, markdown-formatted descriptions throughout your RAML spec, or include entire markdown documentation sections at the root.'],
    [/!include\s/, function (lineContent) { return this.loadRefContent(lineContent, '!include') }],
    [/^uses:/, function (lineContent) { return this.loadRefContent(lineContent, ':', 'Create and pull in namespaced, reusable libraries containing data types, traits, resource types, schemas, examples and more.') }],
    [/^extends:/, function (lineContent) { return this.loadRefContent(lineContent, ':') }]
  ],

  // Monaco editor decorations
  decorations: [],

  /**
   * Hover Provider for Monaco which calls other functions.
   *
   * @param   {monaco.editor.ITextModel} model - Editor text model.
   * @param   {monaco.Position} model - A position in the editor.
   * @param   {monaco.editor.IStandaloneCodeEditor} editor - Monaco editor instance.
   * @returns {ProviderResult<Hover>} - Range and contents of a tooltip.
   */
  hoverProvider: function (model, position, editor) {
    let [desc, blockStartLineNum] = this.findBlockDescription(
      model, position.lineNumber)
    if (!desc) { return }
    if (typeof desc === 'function') {
      desc = desc.call(this, model.getLineContent(position.lineNumber))
    } else {
      desc = Promise.resolve(desc)
    }
    return desc.then(descVal => {
      const range = new monaco.Range(
        blockStartLineNum, model.getLineMinColumn(blockStartLineNum),
        position.lineNumber, model.getLineMaxColumn(position.lineNumber)
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
        range: range,
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
   * @returns {Array<string, number>} - [description, block start line number].
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
    const nextLineNum = this.findParentBlockStartLineNum(
      model, blockStartLineNum, blockStartLineNum - 1)
    return this.findBlockDescription(model, nextLineNum)
  },

  /**
   * Finds parent block start line number for a particular line.
   * Line B is considered to be a parent of line A if line B contains
   * less whitespaces than the line A.
   *
   * @param  {monaco.editor.ITextModel} model - Editor text model.
   * @param  {number} lineNum - Line number to find parent for.
   * @param  {number} lookupLineNum - Line to start parent lookup at.
   * @returns {number} - Parent line number.
   */
  findParentBlockStartLineNum: function (model, lineNum, lookupLineNum) {
    if (lineNum <= 1) {
      return lineNum
    }
    const currLine = model.getLineContent(lineNum)
    const currWsNum = currLine.length - currLine.trim().length
    // Return first line number if document root reached
    if (currWsNum === 0) {
      return 1
    }

    const prevLine = model.getLineContent(lookupLineNum)
    const prevWsNum = prevLine.length - prevLine.trim().length

    return prevWsNum < currWsNum
      ? lookupLineNum
      : this.findParentBlockStartLineNum(model, lineNum, lookupLineNum - 1)
  },

  /**
   * Requests url and returns response body text.
   *
   * @param {string} url - Url from which text response should be fetched.
   * @returns {Promise<string>} - Response body text.
   */
  fetchText: function (url) {
    return fetch(url)
      .then(resp => {
        return resp.body.getReader().read()
      })
      .then(cont => {
        return new TextDecoder('utf-8').decode(cont.value)
      })
  },

  /**
   * Loads reference content.
   *
   * @param {string} lineContent - Content of a line which contains ref.
   * @param {string} sep - Separator to split line by.
   * @param {string} defaultDesc - Default description.
   * @returns {Promise<string>} - Formatted ref content or default description.
   */
  loadRefContent: function (lineContent, sep, defaultDesc) {
    const url = lineContent.split(sep).slice(1).join(sep).trim()
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
  }
}
