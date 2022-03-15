import {getEnvAttr, getValue} from "../../utils/ObjectUtils.js"
import { generateCode, isTrue } from "../../utils/code.js";


export function checkVBind (vm, vnode) {
  if (vnode.nodeType !== 1) {
    return
  }
  const attrNames = vnode.elm.getAttributeNames()
  for (let i = 0 ; i < attrNames.length; i++) {
    if (attrNames[i].indexOf('v-bind:') === 0 || attrNames[i].indexOf(':') === 0) {
      vbind(vm, vnode, attrNames[i], vnode.elm.getAttribute(attrNames[i]))
    }
  }
}

function vbind (vm, vnode, name, value) {
  const arr = name.split(':')
  // 具有表达式的值 { red: a > 3, blue: b > c}
  if (/^{[\w\W]+}$/g.test(value)) {
    // 去除表达式的花括号和空格
    const str = value.substring(1, value.length - 1).trim()
    // 通过逗号分隔成数组['red: a > 3','blue: b > c}']
    const expressionList = str.split(',')
    const result = analysisExpression(vm, vnode, expressionList)
    console.log('arr[1]', arr[1])
    vnode.elm.setAttribute(arr[1], result)
  } else {
    const result = getValue(vm._data, value)
    vnode.elm.setAttribute(arr[1], result)
  }

}

/*
*  解析表达式
*
*/
function analysisExpression (vm, vnode, expressionList) {
  // 获取到环境变量
  let attr = getEnvAttr(vm, vnode)
  const code = generateCode(attr)
  let result = ''
  for (let i = 0; i< expressionList.length; i++){
    const index = expressionList[i].indexOf(':')
    // 具有属性或计算逻辑
    if (index > -1) {
      // 获取:后面的值进行执行
      const val = isTrue(expressionList[i].substring(index + 1), code)
      if (val) {
        result += expressionList[i].substring(0, index) + ','
      }
    } else { // 不具有属性或计算逻辑  { red }
      result += expressionList[i] + ','
    }
  }
  if (result.length) {
    result = result.substring(0, result.length - 1)
  }
  console.log('result', result)
  return result
}