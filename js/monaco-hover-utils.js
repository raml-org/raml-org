const hoverUtils = {
  genericDesc: 'For every API, start by defining which version of RAML you are using, and then document basic characteristics of you API - the title, baseURI, and version.',
  descRegexps: [
    ['^responses:', 'The OPTIONAL responses node of a method on a resource describes the possible responses to invoking that method on that resource. The value of responses is a map where each key name represents that a possible HTTP status codes for that method on that resource. The values describe the corresponding responses. Each value is a response declaration.'],
    ['^title:', 'A short, plain-text label for the API. Its value is a string.'],
    ['^body:', 'The body of the response.']
  ],
  /**
   * Hover Provider for Monaco which calls other functions.
   *
   * @param   {monaco.editor.ITextModel} model - Editor text model.
   * @param   {monaco.Position} model - A position in the editor.
   * @returns {ProviderResult<Hover>} - Range and contents of a tooltip.
   */
  hoverProvider: function (model, position) {
    const [desc, descLineNum] = this.findLineDescription(
      model, position.lineNumber)
    if (!desc) { return }
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
   * @param   {number} lineNumber - Line number to find description for.
   * @returns {Array<string, number>} - [description, line number].
   */
  findLineDescription: function (model, lineNumber) {
    if (lineNumber <= 1) {
      return [this.genericDesc, lineNumber]
    }
    const lineContent = (model.getLineContent(lineNumber) || '').trim()
    for (var [re, desc] of this.descRegexps) {
      if (RegExp(re).test(lineContent)) {
        return [desc, lineNumber]
      }
    }
    return this.findLineDescription(
      model, this.findParentLineNum(model, lineNumber))
  },
  /**
   * Finds parent line number for a particular line.
   * Line B is considered to be a parent of line A if line B contains
   * less whitespaces than the line A.
   *
   * @param  {monaco.editor.ITextModel} model - Editor text model.
   * @param  {number} lineNumber - Line number to find parent for.
   * @returns {number} - Parent line number.
   */
  findParentLineNum: function (model, lineNumber) {
    if (lineNumber <= 1) {
      return lineNumber
    }
    const currLine = model.getLineContent(lineNumber)
    const currWsNum = currLine.length - currLine.trim().length

    const prevLineNumber = lineNumber - 1
    const prevLine = model.getLineContent(prevLineNumber)
    const prevWsNum = prevLine.length - prevLine.trim().length

    return prevWsNum < currWsNum
      ? prevLineNumber
      : this.findParentLineNum(model, prevLineNumber)
  }
}
