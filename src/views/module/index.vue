<template>
  <div>
    <h3>模块化</h3>
    作用：
      防止全局变量污染；防止依赖混乱；编写大型应用必须使用模块化，模块化可以对应用进行拆分，拆分成一个个小的模块，便于维护
    <pre>
      初期的模块化：
        防止全局变量污染
        1. 利用函数块级作用域(IIFE-立即执行函数) - 隔离区
          (() => {
            let count = 0
            ...
          })()

        2. 独立模块本身的额外依赖，如何优化
          优化1：
            依赖的模块通过传参的形式传入
            ((dep1, dep2) => {
              let count = 0
              ...
            })(dep1, dep2)
        3. 了解jquery或vue或react其他开源框架的模块加载方案吗？
          jquery通过参数接收依赖，并且向外部暴露出给外部使用的对象
          ((dep1, dep2, window) => {
            let count = 0
            ...
            window.$ = {
              count
            }
          })(dep1, dep2, window)

          vue和react通过实例化实现模块化，每个实例有自己的作用域

          为什么有些开源框架需要传入全局对象，框架本身的引用传递进去
          ((dep1, dep2, window, $, undefined) => {
            let count = 0
            ...
            window.$ = {
              count
            }
          })(dep1, dep2, window, Jquery)

          1. 传入全局对象window：是因为这样访问这个对象的时候就可以在局部作用域中获取不用再去全局作用域中获取，提高了执行效率
          2. 传递框架本身的引用：防止全局串扰(便于精确的获取，防止取错)
          3. 设置undefined参数：防止外部修改框架，undefined根本就需要传递这个参数

        4. 揭示模式 revealing
            上层无需了解底层的实现，仅仅关注抽象使用

      成熟期的模块化：
        CJS - Common.js 
          应用在node中
          使用：
            module + exports 对外暴露接口
            require 引入外部脚本
          
            eg:
              const dep = require(./dep)
              const a = 1
              const b = () => {}

              // 单独导出
              exports.a = a
              exports.b = b
              // 整体导出
              module.exports = {
                a,
                b
              }
          优点：
            从框架从解决了依赖和全局变量污染的问题,
            
          缺点：
            无法处理异步依赖，只能引入同步依赖
          
          特点：
            commonJS是同步加载的
            依赖延迟加载，哪里使用就在哪里引入，可以提高效率

            eg:
              const a = require('./a.js')
              if (a) { // 通过判断来决定是否导入，从而提高效率
                const b = require('./a.js')
                a === b // true
              }
          
          注意：
            node.js默认开启了模块缓存，如果加载的模块已经被加载过，则会使用缓存中的模块
          
            eg:
              const a = require('./a.js')
              const b = require('./a.js')
              a === b // true
          原理：
            1. 通过模块路径找到本机文件，并且读取内容
            2. 将文件中的代码放入到函数环境中进行执行，并将执行的结果module.exports的值作为require函数的返回结果

            const require = function(module){
              module.exports = {}
              const exports = module.exports

              return module.exports
            }

          面试题：
            导出a.js
            exports.a = 'a'
            module.exports = { b: 2 } 

            导入：
            const u = require('./a.js')
            console.log(u.a) // ?  // undefined 因为module.exports = {}进行了重新赋值
        
        AMD - 异步模块加载
          原理: 异步加载 + 传递回调函数
          经典的案例：require.js

          使用：
            定义模块
              引入异步
              define(模块名, [异步依赖], 回调函数)
              引入同步
              define((require, exports, module) => {
                // 引入同步
                require('...')
                // 返回导出的内容
                return ...
              })
            引入模块
            require([模块名], 回函函数)
          eg:
            定义模块
            define('a', ['dep1','dep2'], (dep1, dep2) => {
              ... 业务逻辑
              const add = () => {}
              return {
                add
              }
            })
            引入
            require(['a'], a => {
              a.add()
            })
          优点：
            适合在浏览器中加载异步模块
          缺点：
            引入成本，无法按需加载
          
          注意：同一个文件多个模块引入，只会被引入一次
          面试题：
            1. 如果在amd模块中想兼容已有代码，怎么处理？
                直接同步引入
                define('a', [], require => {
                  const b = require('./b.js')
                })

        CMD 按需就近加载
          应用： sea.js 
          使用：
            define('a', (require, exports, module) => {
              // 导入同步模块
              let $ = require('jquery.js')
              ... jqeury的使用逻辑
              // 导入异步模块
              let dep1 = require.async('dep1')
              ... dep1的使用的逻辑
            })
          优点：
            按需加载，依赖就近
          缺点：
            依赖打包，加载逻辑存在每个模块中
        面试题：
            1. 手写兼容CJS和AMD
              (function (root, factory) {
                // commonJS
                if (typeof module === 'object' 且 typeof module.exports === 'object') {
                  // 引入同步
                  const a = require('./a.js')
                  module.exports = factory(a)
                } else if (typeof define === 'function' 且 define.amd) { // AMD
                  define('c', ['a'], a => {
                    factory(a)
                  })
                } else if (typeof define === 'function' 且 define.CMD) { // CMD
                  define('c', (require, exports, module) => {
                    const a = require('./a.js')
                    module.exports = factory(a)
                  })
                } else {
                  root.umdModule = factory(root.a)
                }
              })(root, (dep) => {

              })
            
        es6模块化
          使用：
            引入： import + {}或对象或路径
              必须放在模块中的所有代码的前面
              可以使用as关键字对导入的符合进行重命名
              使用*导入所有的基本导出，形成一个对象
              可以直接根路径表示直接导入执行这个模块


            导出： export + 声明语句或{}或default
              基本导出声明语句或{}
              默认导出export default 数据,一个模块只能有一个默认导出，默认导出和基本导出可以同时存在

            eg：
              // 导入默认
              import a from './a.js'
              // 便于优化层的抖动
              import { a, b as bb } from 'c.js'
              // 全部导入
              import * as obj from 'd.js'
              // 导入默认和基本
              import data, { a } from './a.js'
              // 直接导入执行
              import './a.js'
              
              // 导出
              export const b = 5

              export default { c: 2}

              const c = 6
              export c // 报错，因为不是声明语句

              export { c }

            动态模块：
              import('a.js').then(a => {})
            
          优点：
            统一了浏览器和服务端的写法
            更加稳定，因为是在编译阶段就进行了检查依赖的模块是否存在，而其他是在运行阶段才能知道依赖是否存在
          
          特点：
            依赖预声明(在顶部引入依赖)
              优点：便于阅读维护，明确依赖关系
              缺点：某些时候效率比较低，因为不管使不使用都会被引入(目前通过webpack打包工具可以抖动掉引入未使用的对象)
            有缓存
            

      上面的都有局限性：本质上就是运行时进行依赖分析
        
      说说前端模块化
        起初是通过IIFE立即执行函数的块级作用域进行控制，依赖的模块通过传参进行解决，通过揭示模式，使用者仅仅关注使用无需关注内部实现逻辑；
        后面又出现了commonJS用在node中，AMD,CMD,ESM(es6模块化)，commonJS只能加载同步依赖，而浏览器端具有异步的加载，因此为了解决这个问题
        就出现了AMD，AMD既可以同步加载也可以异步加载，因为它有回调函数，但是AMD没有更好的处理按需加载，因为又出现了CMD,CMD可以按需加载依赖就近，
        ESM统一了各端的写法

      解决运行时的依赖，现在出现了webpack等打包功能，在编译时进行
      
      不知道的js中描述模块模式必须有两个条件：
        1. 必须有外部封闭函数，并且该函数必须被最少调用一次
        2. 封闭函数必须返回至少一个内部函数

      封装一个定义模块的方法：
        const Module = (function Manger(){
          const modules = {}
          function define(name, deps, fn){
            // 还原依赖的模块
            for(let i = 0; i < deps.length; i++){
              deps[i] = modules[deps[i]]
            }
            modules[name] = fn.apply(fn, deps)
          }

          function get(name){
            return modules[name]
          }

          return {
            define,
            get
          }
        }())
        // 定义一个a模块
        Module.define('a', [], () => {
          function getA(){
            return 'a'
          }
          return {
            getA
          }
        })
        // 定义一个b模块并且依赖a
        Module.define('b', ['a'], (a) => {
          function getB(){
            return a.getA()
          }
          return {
            getB
          }
        })
        Module.get('b').getB()
        console.log(Module.get('b').getB())

            




        
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>