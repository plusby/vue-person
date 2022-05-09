
import { def } from "./utils.js"

const arrayPrototype = Array.prototype

export const arrayMthods = Object.create(arrayPrototype)

// 重写数组下的这七个方法
const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methods.forEach(key => {
  // 获取原始的方法
  const originMethod = arrayPrototype[key]
  def(arrayPrototype, key, function () {
    const argus = [...arguments]
    // 指向原始的方法
    const result = originMethod.apply(this, argus)
    let newVal = ''
    // 对象有新数据添加的方法需要给新的数据进行设置响应
    switch (key) {
      case 'push':
      case 'unshift':
        newVal = argus
        break;
      case 'splice':
        newVal = argus.slice(2) // 添加的数据是第二个参数，截取第二个以后的参数
        break;
      default:
        break;
    }
    // console.log('newVal', newVal, arguments, this, key)
    if (newVal.length && this.__ob__) {
      // 新数据添加响应
      this.__ob__.array(newVal)
    }
    this.__ob__ && this.__ob__.dep.notify()
    // console.log('数组更新')
    return result
  }, false)
})