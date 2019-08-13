const hoverUtils = {
  genericDesc: 'For every API, start by defining which version of RAML you are using, and then document basic characteristics of you API - the title, baseURI, and version.',
  descRegexps: [
    [/^uses:/, 'Create and pull in namespaced, reusable libraries containing data types, traits, resource types, schemas, examples and more.'],
    [/^annotationTypes:/, 'Annotations let you add vendor specific functionality without compromising your spec.'],
    [/^traits:/, 'Traits let you take advantage of code reuse and design patterns.'],
    [/^resourceTypes:/, 'Resource types let you take advantage of code reuse and design patterns.'],
    // endpoint url
    [/^\/((\w|\d)*[{/}]?)+:/, 'Easily define resources and methods, then add as much detail as you want. Apply traits and other patterns, or add parameters and other details specific to each call.'],
    [/^responses:/, 'Describe expected responses for multiple media types and specify data types or call in pre-defined schemas and examples. Schemas and examples can be defined via a data type, in-line, or externalized with !include.'],
    [/^description:/, 'Write human-readable, markdown-formatted descriptions throughout your RAML spec, or include entire markdown documentation sections at the root.'],
    [/!include\s/, function (lineContent) {
      const pieces = lineContent.split('!include')
      return pieces[pieces.length - 1].trim()
    }]
  ],
  /**
   * Hover Provider for Monaco which calls other functions.
   *
   * @param   {monaco.editor.ITextModel} model - Editor text model.
   * @param   {monaco.Position} model - A position in the editor.
   * @returns {ProviderResult<Hover>} - Range and contents of a tooltip.
   */
  hoverProvider: function (model, position) {
    let [desc, descLineNum] = this.findLineDescription(
      model, position.lineNumber)
    if (!desc) { return }
    if (typeof desc === 'function') {
      desc = desc(model.getLineContent(position.lineNumber))
    }
    return {
      range: new monaco.Range(
        descLineNum, model.getLineMinColumn(descLineNum),
        position.lineNumber, model.getLineMaxColumn(position.lineNumber)
      ),
      contents: [
        { value: desc }
      ]
    }
  },
  /**
   * Finds line description by comparing line content and its parent
   * lines content agains regexps from `this.descRegexps`.
   *
   * @param   {monaco.editor.ITextModel} model - Editor text model.
   * @param   {number} lineNum - Line number to find description for.
   * @returns {Array<string, number>} - [description, line number].
   */
  findLineDescription: function (model, lineNum) {
    if (lineNum <= 1) {
      return [this.genericDesc, lineNum]
    }
    const lineContent = (model.getLineContent(lineNum) || '').trim()
    for (var [re, desc] of this.descRegexps) {
      if (RegExp(re).test(lineContent)) {
        return [desc, lineNum]
      }
    }
    return this.findLineDescription(
      model, this.findParentLineNum(model, lineNum, lineNum - 1))
  },
  /**
   * Finds parent line number for a particular line.
   * Line B is considered to be a parent of line A if line B contains
   * less whitespaces than the line A.
   *
   * @param  {monaco.editor.ITextModel} model - Editor text model.
   * @param  {number} lineNum - Line number to find parent for.
   * @returns {number} - Parent line number.
   */
  findParentLineNum: function (model, lineNum, prevLineNum) {
    if (lineNum <= 1) {
      return lineNum
    }
    const currLine = model.getLineContent(lineNum)
    const currWsNum = currLine.length - currLine.trim().length
    // Return first line number if document root reached
    if (currWsNum == 0) {
      return 1
    }

    const prevLine = model.getLineContent(prevLineNum)
    const prevWsNum = prevLine.length - prevLine.trim().length
    console.log(currWsNum, prevWsNum)

    return prevWsNum < currWsNum
      ? prevLineNum
      : this.findParentLineNum(model, lineNum, prevLineNum - 1)
  }
}
