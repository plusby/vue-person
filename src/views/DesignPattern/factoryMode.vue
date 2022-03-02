<template>
  <pre>
    <h2>工厂模式</h2>

    作用:
      用来创建对象的一种模式

    工厂模式根据抽象程度的不同可以分为：
      简单工厂(静态工厂)模式
      工厂方法模式
      抽象工厂模式

      抽象：抽离出公共的属性


    <codemirror
      ref="mycode"
      value="
        // 1. 简单工厂
        // 简单工厂模式也叫静态工厂模式，用一个工厂对象创建同一类对象类的实例
        // 假设我们要开发一个公司岗位及其工作内容的录入信息，不同岗位的工作内容不一致
        function User (post, work) {
          this.post = post
          this.work = work
        }
        // 通过工厂统一创建管理对象
        function Factory (post) {
          switch (post) {
            case 'coder':
              // 返回对象这个实例
              return new User(post, '敲代码')
            case 'hr':
              return new User(post, '招人')
            case 'boss':
              return new User(post, '审批文件')
          }
        }
        let coder = new Factory('coder')
        console.log(coder.work) // 敲代码 

        // Factory就是一个简单工厂，当我们调用这个工厂函数并传递对应的岗位就能得到一个相应的实例对象
        // 简单工厂的优点就是我们只要传递正确的参数，就能获得所需的对象，而不需要关心其创建的具体细节
        // 简单工厂模式只能作用于创建的对象比较少，对象的创建逻辑不复杂时使用
        // 不符合开闭原则，如果需要添加一个对象就需要修改factory中的判断
        // 符合单一职责原则，降低了代码的复杂度，但是增加了耦合度

      "
      :options="cmOptions"
      class="code"/>

    <codemirror
      ref="mycode"
      value="
        // 2. 工厂方法模式
        // 把具体的对象函数放在子类中完成，父类工厂只创建并返回具体的实例
        // 把简单工厂改造成工厂方法模式
        function Factory (post) {
          if (this instanceof Factory) {
            return new this[post]()
          } else {
            new throw('Object must be new')
          }
        }
        // 具体的对象逻辑放在子类
        Factory.prototype = {
          'coder': function () {
            this.post = 'coder'
            this.work = '敲代码'
          },
          'hr': function () {
            this.post = 'hr'
            this.work = '招人'
          },
          'boss': function () {
            this.post = 'boss'
            this.work = '审批文件'
          }
        }


        let coder = new Factory('coder')
        console.log(coder.work) // 敲代码 

        // 使用工厂方法改造之后，如果我们需要添加新的岗位信息，只要在Factory.prototype中添加。


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