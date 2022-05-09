import parseTemplateToTokens from "./parseTemplateToTokens.js";
import renderTemplate from "./renderTemplate.js";

export default function () {
  const templateObj = {
    render: function (templateStr,data) {
      const tokens = parseTemplateToTokens(templateStr)
      console.log(tokens)
      const str = renderTemplate(tokens, data)
      console.log(str)
      return str
    }
  }
  window.templateObj = templateObj
}