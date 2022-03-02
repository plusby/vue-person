<template>
  <div class="singleCase-wrap">
    <h2>单例模式</h2>
    <pre>
      什么是单例模式？
        一个类只能实例化一次

      作用：
        管理命名空间，防止冲突
        某个模块无论创建多少次，只要在窗口中只能存在一个的这样的模块，都能用单例模式来封装，比如dialog模态框、prompt信息提示框等等
      
      <codemirror
        ref="mycode"
        value="
          // 创建构造函数
          function Test (name) {
            if (typeof Test.instance === 'object') {
              return Test.instance
            }
            this.name = name
            Test.instance = this
          }
          var t1 = new Test('小鸟')
          var t2 = new Test('飞机')
          t1 === t2 // true

          // 通过上面的方法实现的单例模式不符合开闭原则，因为外部可以直接修改内部的东西Test.instance

          // 通过闭包实现单例模式
          function Test2 (name) {
            var instance = this
            this.name = name
            Test2 =  function (name) {
              return instance
            }
          }

          var t1 = new Test2('小鸟')
          var t2 = new Test2('飞机')
          t1 === t2 // true

          // 通过闭包实现的单例模式，缺点原型上的方法和属性不能继承，因为第一个Test2和后面的Test2不是一个构造函数
          Test2.prototype.age = 1

          t1.age // undefined

          // 通过圣杯
          var Test = (() => {
            var instance = null
            return function (name) {
              if (instance) {
                return instance
              }
              this.name = name
              instance = this
            }
          })()
          var t1 = new Test('小鸟')
          var t2 = new Test('小鬼')
          t1 === t2 // true
          Test.prototype.age = 1
          t1.age // 1

          
        "
        :options="cmOptions"
        class="code"
      />

      eg:
        我们来实现一个prompt提示框，设想一个场景，用户点击登录，如果成功就提示登录成功，如果失败就提示登录失败
      <codemirror
        ref="mycode"
        value="
          // 创建dom
          var createPrompt = function (style, message) {
            var div = document.createElement('div');
            var strHtml = '<p>'+ message +'</p><span class='prompt-close'>×</span>'
            div.className = 'prompt ' + style;
            div.innerHTML = strHtml;
            div.style.display = 'none';
            div.addEventListener('click', function () {
              div.style.display = 'none';
            }, false)
            document.body.appendChild(div);
            return div;
          }
        "
        :options="cmOptions"
        class="code"
      />
      html：
      <codemirror
        ref="mycode"
        value="
          .prompt {
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;     
            color: #ffffff;
            background-color: #df8263;
            border-radius: 3px;
            padding: 10px 30px;
            min-width: 100px;
          }
          .prompt p {
            padding: 0;
            margin: 0;
          }
          .prompt.default {
            background-color: #df8263;
          }
          .prompt.warning {
            background-color: #d9b131;
          }
          .prompt.success {
            background-color: #31d952;
          }
          .prompt.fail {
            background-color: #cab9b9;
          }
          /*关闭icon*/
          .prompt-close {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          // html
          <button id='login'>登录</button>

          // script
          document.getElementById('login').addEventListener('click', function () {
            var dom = createPrompt('success', '测试一下')
            dom.style.display = 'block'
          }, false)
        "
        :options="cmOptions"
        class="code"
      />
      现在我们多点几下“登录”就会发现这个弹框会被多次创建，很明显不满足只创建一次的效果，如何实现呢？

      可以在创建函数里面定义一个变量去判断dom是否创建过，如果没有就创建，如果已经创建过，则直接返回这个dom：
      <codemirror
        ref="mycode"
        value="
          // 创建dom
          var createPrompt = function (style, message) {
            var div = ''
            return function () {
              if (div) {
                return div
              }
              div = document.createElement('div');
              var strHtml = '<p>'+ message +'</p><span class='prompt-close'>×</span>'
              div.className = 'prompt ' + style;
              div.innerHTML = strHtml;
              div.style.display = 'none';
              div.addEventListener('click', function () {
                div.style.display = 'none';
              }, false)
              document.body.appendChild(div);
              return div;
            }
          }
        "
        :options="cmOptions"
        class="code"
      />
      无论点击多少次，仅有一个提示框被创建，现在已经成功实现单例模式。

      现在问题又来了，我不可能只封装这一个提示框，未来可能还有模态框、抽屉等等，难道每次都要在对应组件创建dom的函数里定义一个变量去判断是否已经创建了？
      显然目前的代码仅仅实现了单例，但是依然不成熟。

      现在我们就需要采用一个中介函数来代理这个判断，在这个函数内部，依然定义一个变量，来判断该变量是否存在值，如果存在，就代表实例已被创建，直接返回即可，
      如果不存在，就立即执行创建dom，并把dom赋给这个变量之后返回

      <codemirror
        ref="mycode"
        value="
          // 创建一个创建单例模式的函数
          var createSingle = function (fn) {
            var obj = null
            return function () {
              if (!obj) {
                obj = fn.apply(this, arguments)
              }
              return obj
            }
          }

          var createPrompt = function (style, message) {
            var div = document.createElement('div');
            var strHtml = '<p>'+ message +'</p><span class='prompt-close'>×</span>'
            div.className = 'prompt ' + style;
            div.innerHTML = strHtml;
            div.style.display = 'none';
            div.addEventListener('click', function () {
              div.style.display = 'none';
            }, false)
            document.body.appendChild(div);
            return div;
          }

          var alert = createSingle(createPrompt)
          var dom = alert('success', '测试一下')
          dom.style.display = 'block'
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