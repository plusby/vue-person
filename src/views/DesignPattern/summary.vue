<template>
  <div class="wrap">
    <pre>
      1. 什么是设计模式？
          总结出来的一套规则套路

      2. 设计模式的目的
          为了代码的可复用性、让代码更容易被理解便于维护

      3. 创建型-研究高效的创建对象
          单例模式
          抽象工厂模式
          创造者模式
          工厂模式
          原型模式

      4. 结构型模式-设计对象的结构和关系
          适配器模式
          桥接模式
          装饰模式
          组合模式
          外观模式
          亨元模式
          代理模式

      5. 行为型模式-设计对象的行为
          模板方法模式
          命令模式
          迭代器模式
          观察者模式
          中介者模式
          备忘录模式
          解释器模式
          状态模式
          策略模式
          职责链模式
          访问者模式

      6. 设计模式的六大原则
          名词解释：
            耦合：
              指两个事物之间存在一种相互作用，相互影响的关系，这种关系就是耦合关系
            耦合度：
              低耦合便于维护，复用性和扩展性强
            复杂度：
              复杂度高的代码质量不高，可维护性差，复用性差，不易扩展

            优先降低复杂度，尽量降低耦合度

          单一职责原则：
            一个方法只做一件事

          开闭原则：
            面向扩展开放(继承扩展)，面向修改关闭(外部不能修改)，增加需求时，扩展新代码，而非修改已有代码

          里氏代换原则
            子类可以扩展父类的功能，但是不可以修改父类原有的功能

          接口分离原则
            增删改查不能全部放在一个接口中

          迪米特法则(最小知道原则)
            一个方法或接口传入的参数最少
          
          依赖倒置原则
            依赖接口，不依赖方法；前端没有接口概念，对象之间不直接相互依赖，通过状态进行间接的依赖，代表vuex

          利用单一职责原则，开闭原则，里氏代换原则降低复杂度；迪米特法则减少耦合度；
          依赖倒置原则消除可以没有的耦合

          先原则，再模式

          代码一团乱码，先靠单一、开闭、里氏代换原则分成很多块，迪米特法则让他们之间的关闭变弱，最后依赖倒置
          把没有必要耦合的给他消除








      <codemirror
        ref="mycode"
        value="
          // 实现一个请求数据并且显示在页面中
          function getData (url, data, dom) {
            if (localStore.getItem('list')) { // 有缓存就取缓存
              var arr = localStore.getItem('list')
              var htmlStr = ''
              arr.forEach((el) => {
                htmlStr += `<li>${el.name}</li>`
              })
              dom.innerHtml = htmlStr
              return
            }
            $.ajax({
              url,
              data,
              success: (json) => {
                var arr = JSON.parse(json)
                localStore.setItem('list', json)
                var htmlStr = ''
                arr.forEach((el) => {
                  htmlStr += `<li>${el.name}</li>`
                })
                dom.innerHtml = htmlStr
              }
            })
          }

          // 单一原则抽离
          // 渲染数据到页面
          function Render (dom) {
            this.do = (data) => {
              var htmlStr = ''
              data.forEach((el) => {
                htmlStr += `<li>${el.name}</li>`
              })
              dom.innerHtml = htmlStr
            }
          }
          // 请求接口获取数据
          function GetData (callBackArr) {
            this.getData = (url, data) => {
              $.ajax({
                url,
                data,
                success: (json) => {
                  callBackArr.forEach(item => {
                    item.do(json)
                  })
                }
              })
            }
          }
          // 存取缓存
          function Cache () {
            this.do = (json) => {
              localStore.setItem('list', json)
            }
            this.getCache = () => {
              return localStore.getItem('list')
            }
          }
          var oR = new Render(ul)
          var oC = new Cache()
          var oG = new GetData([oR,oC])

          if (oC.getCache()) {
            oR.do(oC.getCache())
          } else {
            oG.getData('www.baidu.com','name=1')
          }
        "
        :options="cmOptions"
        class="code"
      />
    </pre>
  </div>
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