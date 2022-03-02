<template>
  <pre>
    <h2>观察者(发布订阅)模式</h2>
    定义对象间一对多的依赖关系，当一个对象的状态发生变化的时候，所有依赖它的对象都将得到通知
    组成：
      发布
      订阅者集合
      增加订阅者方法
      移除订阅者方法

    优点： 
      解耦对象之前的联系

    缺点：
      订阅者需要被存储起来，所以比较消耗内存，并且因为解耦对象之间的联系，因此程序难以追踪和维护

    <codemirror
      ref="mycode"
      value="
       const event = {
         // 订阅者集合 { key: []}
         list: {},
         // 发布
         trigger: function () {
           // 获取到key
          const key = Array.prototype.shift.call(arguments)
          // 获取到要通知的数组
          const arr = this.list[key]
          // 如果没有要通知的内容直接返回
          if (!arr || !arr.length) {
            return false
          }
          // 执行通知
          arr.forEach(item => {
            item.apply(this, arguments)
          })
         },
         // 增加订阅者
         addList: function (key, fn) {
          if (!this.list[key]) {
            this.list[key] = []
          }
          this.list[key].push(fn)
          return true
         },
         // 移除订阅者
         removeList: function (key, fn) {
           // 没有移除具体一条就是这个key全部移除
           if (!fn || !this.list[key]) {
             this.list[key] = []
             return true
           }
           this.list[key] = this.list[key].filter(item => {
             return item !== fn
           })
         },
         // 订阅一次
         once: function (key, fn) {
           const that = this
           function on () {
             that.removeList(key)
             fn.apply(that, arguments)
           }
           this.addList(key, on)
         }
       }
       event.addList('xiaoli', function () { alert('吃饭')})
       event.addList('xiaoli', function () { alert('喝茶')})
       event.trigger('xiaoli')
      "
    :options="cmOptions"
    class="code"/>
  </pre>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/ambiance.css'
require('codemirror/mode/javascript/javascript') // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
require('codemirror/mode/python/python.js')
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')
export default {
  data(){
      return {
        cmOptions: {
          value: '',
          // mode: 'text/javascript',
          theme: 'idea',
          readOnly: true,
          lineNumbers: false, // 是否显示行数
          showCursorWhenSelecting: true,
        },
      }
   },
  components: {
    codemirror,
  },
}
</script>

<style>

</style>