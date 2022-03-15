/**
 * 把对象转换为字符串
 * @param attr
 * @returns {string}
 */
export function generateCode(attr){
  console.log(attr)
  let code = ''
  for (const codeKey in attr) {
      code += `let ${codeKey} = ${JSON.stringify(attr[codeKey])};`
  }
  return code
}


export  function  isTrue(expression, env){
  let bool = false
  let code = env

  code += `if(${expression}){ bool = true }`
  console.log(code)
  eval(code)
  return bool
}