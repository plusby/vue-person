import {constructProxy} from './proxy.js'
import { mount } from './mount.js'


let uid = 0

export function initMixin(Vue){
  Vue.prototype._init = function (options) {
    const vm = this
    vm.uid = uid++
    vm._isVue = true
    // 初始化data
    // 给data下的数据设置代理
    if (options && options.data) {
      vm._data = constructProxy(vm, options.data, '')
    }
    
    // 初始化created方法
    if (options && options.created) {
      options._created = options.created
    }
    // 初始化methods方法
    if (options && options.methods) {
      vm._methods = options.methods
      for (const vmKey in options.methods) {
        vm[vmKey] = options.methods[vmKey]
      }
    }
    // 初始化computed
    if (options && options.computed) {
      options._computed = options.computed
    }
    // 初始化el并挂载
    if (options && options.el) {
      const dom = document.getElementById(options.el)
      // 根据dom生成虚拟dom树
      mount(vm, dom)
    }
  }
}