import observe from "../proxy/observe.js"
import { Compile } from "./compile.js"
import Watcher from '../proxy/watcher.js'

export default class Vue {
  constructor(options) {
    this.$options = options || {}
    this._data = options.data || undefined
    // 数据变为响应式
    observe(this._data)
    // 给实例上添加属性
    this.initData(this._data)
    // 初始化watch
    this.initWatch()
    // 编译模板
    new Compile(options.el, this)
    options.beforeCreated && options.beforeCreated()
  }
  initData (data) {
    const self = this
    Object.keys(data).forEach(key => {
      Object.defineProperty(self, key, {
        set(value) {
          data[key] = value
        }, get () {
          return data[key]
        }
      })
    })
  }
  initWatch () {
    const self = this
    const watch = this.$options.watch
    watch && Object.keys(watch).forEach(key => {
      new Watcher(self, key, watch[key])
    })
  }
}