import Watcher from "../proxy/watcher.js"

export class Compile {
  constructor(el, vm) {
    this.$vue = vm
    this.$el = document.getElementById(el)
    if (this.$el) {
      const fragment = this.node2Fragment(this.$el)
      this.compile(fragment)
      this.$el.appendChild(fragment)
    }
  }
  node2Fragment(el){
    const fragment = document.createDocumentFragment()
    let child;
    while(child = el.firstChild){
      fragment.appendChild(child)
    }
    return fragment
  }
  compile(fragment){
    const childs = fragment.childNodes
    const self = this
    const regText = /\{\{(.*)\}\}/
    childs.forEach(item => {
      if (item.nodeType === 1) { // 元素节点
        self.compileNode(item)
      } else if (item.nodeType === 3 && regText.test(item.textContent)){ // 文本节点
        const keyStr =  item.textContent.match(regText)[1]
        self.compileText(item, keyStr)
      }
    })
  }
  compileNode(node){
    const attrs = node.attributes
    Array.prototype.slice.call(attrs).forEach(item => {
      const name = item.name
      const value = item.value
      if (name.indexOf('v-') === 0) {
        if (name === 'v-model') {
          new Watcher(this.$vue, value, val => {
            node.value = val
          })
          let val = this.getValue(this.$vue, value)
          node.value = val
          node.addEventListener('input', e => {
            const newVal = e.target.value
            console.log('newVal', newVal, value)
            this.setValue(this.$vue, value, newVal)
            val = newVal
          })
        } else if (name === 'v-for') {

        }
      }
    })
  }
  compileText(node, name){
    node.textContent = this.getValue(this.$vue, name)
    new Watcher(this.$vue, name, (val) => {
      node.textContent = val
    })
  }
  getValue (obj, name) {
    let val = obj
    const arr = name.split('.')
    arr.forEach(key => {
      val = val[key]
    })
    return val
  }
  setValue (obj, name, value) {
    let val = obj
    const arr = name.split('.')
    arr.forEach((key, index) => {
      console.log(val)
      debugger
      if (arr.length - 1 > index) {
        val = val[key]
      } else {
        val[key] = value
      }
    })
  }
}