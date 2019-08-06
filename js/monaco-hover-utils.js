const hoverUtils = {
  hoverProvider: function (model, position) {
    return {
      contents: [
        { value: '**SOURCE**' },
        { value: position.toString() },
        { value: model.getWordAtPosition(position).word },
        { value: model.getLineContent(position.lineNumber) }
      ]
    }
  }
}
