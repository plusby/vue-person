

export default class VNode {
  constructor(
    tag, // 标签类型，DIV,SPAN,#TEXT
    elm, // 对应的真实节点
    children, // 当前节点下的子节点
    text, // 当前节点的文本
    data, // VNodeData 节点身上的指令
    parent, // 父级节点
    nodeType, // 节点类型
  ){
    this.tag = tag
    this.elm = elm
    this.children =children
    this.text = text
    this.data = data
    this.parent = parent
    this.nodeType = nodeType
    this.env = {} // 当前节点的环境变量，用于存放在节点上声明的变量比如v-for中的变量
    this.instructions = null // 存放当前节点上的指令
    this.template = [] // 当前节点涉及到的模板
  }
}