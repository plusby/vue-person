import {initMixin} from './init.js'
import { renderMixin} from './render.js'

function Vue (options) {
  this._init(options)
  renderMixin(Vue)
  this._render()
}

initMixin(Vue)

export default Vue