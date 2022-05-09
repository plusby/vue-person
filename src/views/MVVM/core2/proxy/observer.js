import defineReactive from "./defineReactive.js"
import { def } from './utils.js'
import { arrayMthods } from './array.js'
import Dep from "./dep.js"
/**
 * 
 */
export default class Observer {
  constructor(val){
    this.dep = new Dep()
    // 给实例添加__ob__属性
    def(val, '__ob__', this, false)
    if (Array.isArray(val)) {
      Object.setPrototypeOf(val, arrayMthods)
      this.array(val)
    } else {
      this.walk(val)
    }
  }
  walk(data){
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        defineReactive(data, key)
      }
    }
  }
  array(data){
    console.log(data)
    data.forEach((element, index) => {
      defineReactive(data, index)
    });
  }
}