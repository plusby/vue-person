import {initMixin} from './init.js'
import { renderMixin} from './render.js'

function Vue (options) {
  this._init(options)
  // created生命周期执行
  if (this._created) {
    this._created()
  }
  renderMixin(Vue)
  this._render()
}

initMixin(Vue)

export default Vue