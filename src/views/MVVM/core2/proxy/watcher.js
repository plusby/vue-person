import Dep from "./dep.js"

let uid = 0

export default class Watcher {
  constructor (target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }

  update () {
    this.run()
  }

  get () {
    Dep.target = this
    const obj = this.target
    let value = ''
    try{
      value = this.getter(obj)
    }finally{
      Dep.target = null
    }
    console.log('value', value)
    return value
  }

  run () {
    
    const value = this.get()
    debugger
    if (value !== this.value || typeof value == 'object') {
      const oldValue = this.value
      console.log('oldValue', oldValue, value)
      this.value = value
      this.callback.call(this.target, value, oldValue)
    }
  }

}

/**
 * 通过字符串路径获取对应的值
 * a.b.c
 * @param {*} expression 
 */
function parsePath (expression) {
  const list = expression.split('.')
  return function (obj) {
    for(let i = 0;i < list.length; i++){
      if (!obj) {
        return
      }
      obj = obj[list[i]]
    }
    
    return obj
  }
}