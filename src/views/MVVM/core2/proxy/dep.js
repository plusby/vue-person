
let uid = 0
export default class Dep {
  constructor(){

    this.id = uid++
    this.subs = []
  }
  // 
  addSub (val) {
    this.subs.push(val)
  }
  // 添加依赖
  depend () {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 执行
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, len = subs.length; i < len; i++) {
      subs[i].update()
    }
  }
}