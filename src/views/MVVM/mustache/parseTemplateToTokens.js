import { Scanner } from './scanner.js'
import nestTokens from './nestTokens.js'

export default  function (templateStr) {
  const scan = new Scanner(templateStr)
  let str = ''
  let tokens = []
  while (!scan.soe()) {
    str = scan.scanUtil('{{')
    if (str) {
      tokens.push(['text', str.replace(/\s/g, '')])
    }
    scan.scan('{{')
    str = scan.scanUtil("}}")
    if (str.indexOf('#') === 0) {
      tokens.push(['#', str.substring(1)])
    } else if (str.indexOf('/') === 0) {
      tokens.push(['/', str.substring(1)])
    } else if (str){
      tokens.push(['name', str])
    }
    scan.scan("}}")
  }
  const result  = nestTokens(tokens)
  return result
}