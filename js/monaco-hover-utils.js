const hoverUtils = {
  genericDesc: 'For every API, start by defining which version of RAML you are using, and then document basic characteristics of you API - the title, baseURI, and version.',
  descRegexps: [
    ['^responses:', 'The OPTIONAL responses node of a method on a resource describes the possible responses to invoking that method on that resource. The value of responses is a map where each key name represents that a possible HTTP status codes for that method on that resource. The values describe the corresponding responses. Each value is a response declaration.'],
    ['^title:', 'A short, plain-text label for the API. Its value is a string.'],
    ['^body:', 'The body of the response.']
  ],
  hoverProvider: function (model, position) {
    const [desc, descLineNum] = this.findLineDescription(
      model, position.lineNumber)
    if (!desc) { return }
    return {
      range: new monaco.Range(
        descLineNum, model.getLineMinColumn(descLineNum),
        position.lineNumber, position.column
      ),
      contents: [
        { value: desc }
      ]
    }
  },
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
    return this.findLineDescription(model, this.findParentLineNum(lineNumber))
  },
  findParentLineNum: function (lineNumber) {
    // TODO
    return lineNumber - 1
  }
}
