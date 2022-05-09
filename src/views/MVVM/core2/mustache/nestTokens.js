export  default  function (tokens) {
  // 存放合并之后的数组
  const newArr = []
  // 存放子数组
  let childArr = newArr
  // 栈 用于判断是开始#还是结束/
  const arr = []
  debugger
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    switch (token[0]) {
      case '#': // 如果是起始循环 把当前项推入栈底
        arr.push(token)
        // 把当前项放入并之后的数组
        childArr.push(token)
        // 初始子数组
        childArr = token[2] = []
        break
      case '/': // 遇到结尾符号
        // 提出栈顶
        const pop = arr.pop()
        // 如果栈中还有数据表示深层循环
        if (arr.length) {
          childArr = arr[arr.length-1][2]
        } else {
          childArr = newArr
        }
        break
      default:
        childArr.push(token)
    }
  }
  return newArr
}