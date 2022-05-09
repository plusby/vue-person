
/*
  扫描字符串
 */
export class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    // 指针
    this.pos = 0
    // 截取剩余字符串
    this.tail = ''
  }

  // 跳过 指定的字符 {{ 或 }}
  scan (tag) {
    if (this.tail.indexOf(tag) === 0) {
      this.pos += tag.length
      this.tail = this.templateStr.substring(this.pos)
    }
  }
  // 从头开始截取到指定字符位置的子字符串
  scanUtil (stopTag) {
    const lastPos = this.pos
    while (!this.soe() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++
      this.tail = this.templateStr.substring(this.pos)
    }
    return this.templateStr.substring(lastPos, this.pos)
  }

  // 返回是否到了字符串的结尾
  soe () {
    return this.pos >= this.templateStr.length
  }
}