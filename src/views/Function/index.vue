<template>
  <div>
    <h2>函数式编程</h2>
    <pre>
      惰性函数：
      const a = name => {
        if (a === 1) {
          return a = () => {
            console.log(1)
          }
        } else if (a === 2) {
          return a = () => {
            console.log(2)
          }
        } else if (a === 3) {
          return a = () => {
            console.log(3)
          }
        }
      }
      a(1)
      a() // 1
      纯函数：
        给定的输入，返回相同的输出，不去修改外部属性
      优点：
        结果可推测，可复用，无副作用，可读性，方便测试

      高阶函数：
        输入为函数或输出为函数就是高阶函数

      const once = fn => {
        let done = false
        return () => {
          if (!done) {
            fn()
          }
          done = true
        }
      }
      多个函数组合
      const compose = (...fns) => {
        console.log(fns, typeof fns)
        return function (val) {
          return fns.reduce((total, fn) => {
            return fn(total)
          },val)
        }
      }
      const fn1 = (x) => x + 2
      const fn2 = (x) => x + 1
      const fn = compose(fn1,fn2)
      fn(0) // 3

      // 判断句号数量得到奇数偶数
      let str = '12。12。43。'
      // 一般写法
      function getNum (str) {
        //  获取句号
        const arr = str.match(/\。/g)
        // 统计数量
        const num = arr.length
        // 判断奇数还是偶数
        return num%2 === 0 ? '偶数':'奇数'
      }
      // 抽象成纯函数
      // 获取句号
      const getPeriod = str => str.match(/\。/g)
      // 统计数量
      const num = arr => arr.length
      // 判断奇数还是偶数
      const oddEven = num => num%2 === 0 ? '偶数':'奇数'
      // 组合
      const fns = compose(getPeriod,num,oddEven)
      fns(str) // 奇数

      // 柯里化
      function a(fn) {
        return function b(...args) {
          if (fn.length > args.length) {
            return function (...args2) {
              return b(...args.concat(args2))
            }
          } else {
            return fn(...args)
          }
        }
      }
      const c = (x,y,z) => x+y+z
      const fn = a(c)
      const a = fn(1)(2)(3) // 6
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>