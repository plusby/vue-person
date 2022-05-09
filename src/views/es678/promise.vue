<template>
  <div>
    <h2>Promise学习</h2>
    <pre>
      1. promise是一个有then方法的对象或函数
      2. thenable是一个具有then方法的对象或函数
      3. value是promise成功状态的值，是resolve的参数，其值有undefined、promise等
      4. reason是promise失败状态的值，是reject的参数
      5. exception抛出异常

      规范：
        promise的状态
          1. pending
            1.1 初始状态，可改变
            1.2 在resolve和reject之前都处于这个状态
            1.3 resolve的时候，状态从pending变为fulfilled状态，并且不可改变
            1.4 reject的时候，状态从pending变为rejected状态，并且不可改变

          2. fulfilled
            2.1 成功状态，不可变
            2.2 resolve执行之后会变为这个状态

          3. rejected
            3.1 失败状态，不可变
            3.2 reject执行之后会变为这个状态

          pending - resolve(value) -> fulfilled
          pending - reject(reason) -> rejected
          pending转换为fulfilled或rejected之后就不再改变

        promise.then(onFulfilled,onRejected)方法
          返回promise的最终结果
          具有两个参数onFulfilled和onRejected，都是可选参数

          1. onFulfilled
            1.1 必须是一个函数，如果不是一个函数，则被忽略掉(会默认创建一个函数)
            1.2 当状态变为fulfilled之前，此方法不应该被调用
            1.3 当状态变为fulfilled之时，此方法应该被调用,其参数为value
            1.4 此方法只能被调用一次

          2. onRejected
            2.1 必须是一个函数，如果不是一个函数，则被忽略掉(会默认创建一个函数)
            2.2 当状态变为rejected之前，此方法不应该被调用
            2.3 当状态变为rejected之时，此方法应该被调用，其参数为reason
            2.4 此方法只能被调用一次

          3. onFulfilled和onRejected函数是在微任务中执行
            queueMicrotask(() => {}) 可以执行微任务

          4. then方法可以被同一个promise调用多次
            const p = new Promise()
            p.then(cb1, cb2)
            p.then(cb1, cb2)
            p.then(cb1, cb2)

            4.1 如果状态变为fulfilled,那么onFulfilled会按照then顺序执行
                如果状态变为rejected,那么onRejected会按照then顺序执行
            
          5. then返回值
            返回值应该是一个新的promise（注意是新的promise）
            // const p = new Promise().then(onFulfilled, onRejected)
            // 也可如下写法
            const p1 = new Promise()
            const p2 = p1.then(onFulfilled, onRejected)
            p1 !== p2
            
            5.1 onFulfilled或onRejected执行结果为x, 那么调用resolvePromise()
            5.2 onFulfilled 或 onRejected执行报错了， 那么p2变为reject

          6. resolvePromise
            resolvePromise(p2, x, resolve, reject)

            6.1 p2 === x 抛出异常不能为同一个promise实例
            6.2 如果x是一个promise
              如果x处于pending状态，promise需要保持为pending状态，直到x被fulfilled或rejected
              如果x处于rejected状态, 用相同的reason执行 promise 的onRejected
              如果x处于fulfilled状态, 用相同的value执行 promise 的onFulfilled
              
            6.3 如果x是一个函数或对象
              let then = x.then;
              then是一个函数, then.call(this)
              then是一个对象，直接resolve(then)

            6.4 如果x是其他值直接resolve(x)

            7. catch方法
              catch方法中直接调用了then方法，把回调函数作为onRejeted传递进去
              因此catch方法返回的也是一个新的promise

            注意：
              catch和then方法中的回调函数是在当前promise的resolve或reject执行的
              时候执行并且在catch或then此时返回的新的promise的resolve或reject执
              行之前，因此catch或then返回的promise的状态还是pending


            const p1 = new Promise((res, rej) => {
                res(2)
              })
            const p = new Promise((res, rej) => {
              res(1)
            }).then(res => {
              // return p1
              return function() {
                console.log(this)
              }
            },err => {})
            p.then(res => {
              console.log(res) // 2
            })
            console.log(p1 === p)

            
          

      <codemirror
        ref="mycode"
        value="
          // 声明状态类型
          const 
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
  methods: {
    
  },
}
</script>

<style>

</style>