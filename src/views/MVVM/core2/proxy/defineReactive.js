import Dep from "./dep.js"
import observe from "./observe.js"


/**
 * 给对象添加属性
 * @param {*} data 
 * @param {*} key 
 * @param {*} value 
 */
export default function (data, key, value) {
  const dep = new Dep()
  if (arguments.length === 2) {
    value = data[key]
  }
  let child = observe(value)
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    set(newValue){
      console.log('设置了值')
      if (newValue === value) {
        return
      }
      value = newValue
      child = observe(newValue)
      console.log('child', child)
      // 通知dep
      dep.notify()
    },
    get(){
      console.log('获取了值', Dep.target,child)
      if (Dep.target) {
        dep.depend()
        if (child) {
          child.dep.depend()
        }
      }
      return value
    }
  })
}