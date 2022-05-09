<template>
  <pre>
    const text = '𠮷'
    console.log(text.length) // 2
    console.log(/^.$/.test(text)) // false
    
    早期，Unicode存储文字是以16位2进制进行存储，我们把一个16位的二进制编码叫做一个码元，能够存储的文字数量为2的16次方等于65536个文字；
    中国汉字的数量远远比这个数量大，后来Unicode对文字编码进行了扩展，将某些文字扩展到了32位，一个文字占两个码元(code unit)，文字对应
    的二进制数字叫码点(code point)，数量为2的32次方等于4294967296个文字

    js中是以一个码元为一个文字，所以𠮷的长度占据两个码元就是2，/^.$/匹配不到是因为js认为这是两个文字;

    es5中获取码元：
      text.charCodeAt(0)
      eg:
        const text = '额' // 常用文字是以16为二进制编码的，因此占据一个码元
        text.charCodeAt(0) // 39069
        text.charCodeAt(1) // NaN

        const text2 = '𠮷' // 生僻字是以32位二进制编码，因此占据两个码元
        text2.charCodeAt(0) // 55362
        text2.charCodeAt(1) // 57271

    es6中获取码点：
      text.codePointAt(0)

      eg:
        const text = '额' // 常用文字是以16为二进制编码的，因此占据一个码元
        text.codePointAt(0) // 39069
        text.codePointAt(1) // undefined

        const text2 = '𠮷' // 生僻字是以32位二进制编码，因此占据两个码元
        text2.codePointAt(0) // 134071
        text2.codePointAt(1) // 57271

        '𠮷'的Unicode编码为
        text2.charCodeAt(0).toString(16) 和 text2.charCodeAt(1).toString(16)
        也就是 /d842 /dfb7
        当使用codePointAt(0)或codePointAt()获取其码点的时候，js默认会把这个文字对应的所有码元(/d842 和/dfb7)的码点一起返回，因此得到134071
        当使用codePointAt(1)进行获取码点的时候就是获取/dfb7的码点因此得到的就是57271;
        
    // 判断一个文字是否是32位
    function is32Bit(text){
      // 通过码点的二进制数字的长度是否超过了16位最大二进制来判断
      // return text.codePointAt(0) > 0xffff
      // 或查看码点的第二位是否有值来判断
      return !!text.codePointAt(1)
    }
    console.log(is32Bit('𠮷')) // true
    console.log(is32Bit('额')) // false

    es6为正则添加了u表示匹配码点
    /^.$/u.test(text) // true

    总结：
      一个文字可能占据一个码元或两个码元，而一个文字对应一个码点，因为码点计算了一个文字中所有码元的二进制数字

    模板字符串中的换行符不进行转义
      通过String.raw``
      const str = String.raw`123\n456`
      console.log(str) // '123\n456'

      ``放在函数名后面相当于直接运行这个函数，并且把内容作为参数传递进去,第一个参数是以${}分割的字符串数组，后面的参数就是${}的值
      eg:
        function a(ar1,ar2) {
          console.log(ar1,ar2) // ['哈哈是', ',', raw: Array(2)] '小明'
        }
        const name = '小明'
        a`哈哈是${name},`

    函数中的参数设置默认值，那么arguments在函数内部就失效了

    function a(b=2){
      console.log(Array.prototype.slice.call(arguments, 0)) // []
    }
    a()

    new.target 
    在函数内部使用，表示这个函数没有被new来调用，那么它的值就是undefined,否则就是函数本身
    通常使用这个来判断构造函数是否被滥用

    箭头函数：
      箭头函数中没有this,arguments,new.target,如果在内部使用这几个对象，那么就会从箭头函数所在的环境中取

      箭头函数没有原型

      因为箭头函数没有原型，因此它不能作为构造函数(不能被new)

      function a() {
        return () => {
          console.log(this, arguments, new.target) // obj [666]
        }
      }
      const obj = { a: a }

      obj.a(666)()

    Object的新增的API

      Object.is 判断两个数据是否相等，包括NaN，基本上和===一致，
        注意： Object.is(NaN,NaN)为true, Object.is(-0,+0)为false

      Object.assign(obj1,obj2...) 把obj2以及后面的参数合并到obj1,obj1会被改动，返回合并之后的新对象

      Object.getOwnPropertyNames方法
       es6规定该方法返回的数组的排序方式：
        先排数字，并且按照升序排序
        在排其他，按照书写顺序排序

      Object.setPrototypeOf(obj1,obj2)
        把obj1的原型设置为obj2

    面向对象
      根据业务逻辑先划分对象，然后把各个功能在各个对象身上实现

      对比面向过程：
        面向过程：切入点是功能的步骤，适合具体的小功能
        面向对象：切入点是对象的划分，适合大型系统
      
      Eg：
        问题：大象放入冰箱

        面向对象：
          先划分对象，然后把各个功能在各个对象身上实现
          对象有大象，冰箱
          冰箱具有的方法有开门，关门，放入

          // 第一步打开冰箱
          const frige = new Frige()
          const elephant = new Elephant()
          frige.open()
          // 第二部大象进入
          frige.in(elephant)
          // 第三步关闭冰箱
          frige.close()

          
        面向过程：
          直接实现每个功能
          第一步打开冰箱
          function openFrige(){}
          openFrige()

          第二步大象进入
          function elephantIn(){}
          elephantIn()

          第三步关上冰箱门
          function closeFrige(){}
          closeFrige()

      类：
        class 类名 {
          // 已知值的属性， 被放在实例对象上
          属性名 = 值
          constructor (属性值) {
            // 被放在实例对象上
            this.属性名= 属性值
          }

          // 这里的方法是放在构造器的原型上的，属于实例成员
          方法(){

          }
          // 可计算的成员名
          [变量名](){

          }
          // getter获取属性 被放在实例对象上
          get 属性名(){
            return this.属性名
          }
          // setter设置属性 被放在实例对象上
          set 属性名(val){
            this.属性名 = val
          }

          // 静态属性 被定义在构造函数上
          static 属性名 = ''
          // 静态方法 被定义在构造函数上
          static 方法名 () {}
        }

        eg:
          const name = 'age'
          class Animate {
            constructor () {

            }
            // 可计算的成员名
            [name](){
              return 123
            }
          }

          const ani = new Animate()
          ani[name]()

        

        特点：
          类声明不会被提升，声明之后才能使用，提前使用就是暂时性死区
          类中的所有代码都是在严格模式下执行
          类中的所有方法都是不可枚举的(for in)
          类的所有方法都无法被当作构造函数使用
          构造函数必须使用new来掉用

        注意：
          使用static的字段的属性或方法，是被添加在构造函数上
          没有使用static的方法，是被添加在原型上的
          没有使用static的属性，是被添加在实例对象上的
          如果方法使用了箭头函数，那么方法会被放在实例对象上

        类表达式：
          const 名称 = class { // 匿名类
            constructor(){}
          }
          const a = new 名称()

        装饰器:
          es7支持，目前浏览器还未支持

          class Animate{
            @strings
            name () {

            }
          }
          function strings(target, methodName, desc){
            const oldFn = desc.value
            desc.value = function (...args) {
              if (typeof args[0] !== 'string') {
                console.warn('参数必须是一个字符串')
              }
              oldFn.apply(this, args)
            }
          }

        继承:
          extends
          super() 继承父类的属性，必须写在构造器的第一行

          函数式继承
          function Animate(name,age){
            this.name = name 
            this.age = age
          }
          Animate.prototype.getName = () => {}

          function Dog(name, age){
            // 继承属性
            Animate.call(this, name, age)
          }
          // 继承方法
          Object.setPrototypeOf(Dog.prototype, Animate.prototype)

          类继承：
          class Dog extends Animate {
            // 如果子类不写构造器那么默认会进行写成下面的样子
            constructor (name,age) {
              super(name,age)
            }
            getName(){
              // 调用父类的方法
              super.getName()
              // 添加额外的逻辑
            }
          }

          父类不应该被实例化，因为它是统称，在父类的构造器中通过new.target来限制
          constructor (name,age) {
            if (new.target === 父类名) {
              throw new Error('不能被new')
            }
          }
        
      Symbol 符号
        符号属于es6新增的一个数据类型，属于基本类型

        特点：
            没有字面量
            类型为symbol
            符号可以作为对象的属性，称之为符号属性，之前对象的属性都会被转成字符串，现在有多了一种symbol符号
            符号属性是不可枚举的，因为在for in中无法读取符号属性，Object.keys也无法读取
            Object.getOwnPropertyNames尽管可以获取所有无法枚举的属性，但是也无法获取符号属性
            只有通过ES6新增的Object.getOwnPropertySymbols方法获取到
            符号无法进行隐私转换，因此不能被用于运算，字符串的拼接等其他隐私转换，但是可以显示的转换为字符串

        私有符号
          创建：
            Symbol(符号描述)

          设计的初衷：
            为了给对象设置私有属性(只能在对象内部使用，外部无法使用)

          特点：
            每次调用symbol得到的符号永远都不相等，和对象一样
          
          eg:
            const key = Symbol()
            const obj = {
              [key]: 1
              [key]: 2 
            }
            console.log(obj) // {Symbol():2}

            for(let key in obj){ 
              console.log(key) // undefined
            }

          const arr = Object.getOwnPropertySymbols(obj)
          obj[arr[0]] // 2

          // 显示的转换
          const keyStr = String(key)
          console.log(keyStr) // Symbol
        
        共享符号：
          创建：
            Symbol.for(符号名称)
          特点:
            相同符号名称或没有传递符号名称的符号是同一个符号

          const a = Symbol.for('1')
          const b = Sumbol.for('1')
          a === b // true

          实现：
            const Symbolfor = (() => {
              const global = {}
              return function (name) {
                if (!global[name]) {
                  global[name] = Symbol(name)
                }
                return global[name]
              }
            }())

        知名(公共，具名)符号：
          知名符号是一些具有特殊含义的共享符号，通过Symbol静态属性得到

          暴露某些方法的内部实现

          Symbol.hasInstance
            该符号用于定义构造函数的静态成员，它将影响instanceof 的判断
            obj instanceof A
            等于
            obj[Symbol.hasInstance](A)

            修改instanceof

            function A(){}
            Object.defineProperty(A,Symbol.hasInstance, {
              value: function () {
                return false
              }
            })
            const a = new A()
            a instanceof A // false

          Symbol.isConcatSpreadable
            设置数组的concat方法在链接数组的时候，是否把要链接的数组进行分割，默认是分割，传递false表示不分割

            const arr = [1,2,3]
            const arr2 = [4,5,6]
            arr.concat(arr2) // [1,2,3,4,5,6]
            arr2[Symbol.isConcatSpreadable] = false // arr2不分割
            arr.concat(arr2) // [1,2,3,[4,5,6]]
          
          Symbol.toPrimitive
            影响类型转换

            const obj = {
              a:1,
              b: 2,
            }
            console.log(obj + 123) // [object Object]123 
            obj[Symbol.toPrimitive] = function () {
              return 3
            }
            console.log(obj + 123) // 126
            console.log(obj + '') // '3'

            const b =Number(3)
            b[Symbol.toPrimitive] = function () {
              return 3
            }
            b + '21' // '321'
          
          Symbol.toStringTag 
            影响toString方法

            class A {}
            const a = new A()

            Object.protoytpe.toString.call(a) // [object Object]

            A.prototype[Symbol.toStringTag] = 'Person'
            Object.protoytpe.toString.call(a) // [object Person]

      async 
        是一个语法糖,解决回调
        加async的函数返回一个promise对象

        eg: 
          async function a() {}
          a() // promise

        实现：
          function async (fn) {
            try {
              const result = fn()
              if (result instanceof Promise) {
                return result
              }
              return Promise.resolve(result)
            } catch (err) {
              return Promise.reject(err)
            }
          }

        await 
          等待某个Promise执行完成，必须放在一个函数中，并且和async配个使用

          await 1 相当于 await Promise.resolve(1)

          async function a(){
            const err = await b.a
            console.log(err) // Promise 状态为rejected
          }

          await后面返回的结果不是Promise，会被包装成Promise

          await 后面返回一个错误需要捕获错误返回或try catch，否则就直接抛出错误了，
          function err (){
            return Promise.reject('出错')
          }
          async function a(){
           // const e = await err() // 抛出错误不再继续执行
           // console.log(e)
            const e = await err().catch(e => e)
            console.log(e) // 出错
          }

          迭代器(iterator)：
            一个具有next方法的对象，next方法返回一个对象并且能够指示是否完成迭代

            const iterator = {
              next: function () {
                return {
                  value: xxx,
                  done: false/true,
                }
              }
            }

          迭代器创建函数(iterator creator)：
            一个返回迭代器的函数

            function createIterator(arr){
              let i = 0
              return {
                next: function () {
                  return {
                    value: arr[i],
                    done: i > arr.length,
                  }
                }
              }
            }

            面试题：
              创建一个无限的锲波拉奇数列
                // 1 1 2 3 5 8 13 21 ...

              function createFeiboIterator () {
                let value = ''
                let pre1 = 0
                let pre2 = 1
                return {
                  next: function () {
                    const value = pre1 + pre2
                    const result =  {
                      value,
                      done: true,
                    }
                    pre1 = pre2
                    pre2 = value
                    return result
                  }
                }
              }

              const a = createFeiboIterator()
              a.next()

          可迭代协议：
            es6规定，如果一个对象具有知名符号属性Symbol.iterator,并且属性值是一个迭代器创建函数，则该对象是
            可迭代的

            可迭代对象： 数组，dom伪数组

            可迭代对象可以通过扩展运算符转换为数组


            面试题：
              怎么知道一个对象是否是可迭代对象？
                具备两个条件：1. 这个对象上具有知名符号Symbol.iterator属性 2. 这个属性值是一个迭代器创建函数
              
              怎么遍历一个可迭代对象(实现一个for of循环)？
                fucntion ergodic(obj) {
                  const iterator = obj[Symbol.iterator]()
                  let result = iterator.next()
                  while(!result.done){
                    console.log(result.value)
                    result = result.next()
                  }
                }
              
                for of循环就是遍历可迭代对象，是ergodic的语法糖

              怎么把对象通过展开运算符放入数组中?
                <!-- 给定一个对象
                const obj = {
                  a: 1,
                  b: 2,
                }
                // 展开到数组中
                const arr = [...obj] -->

                const obj = {
                  a: 1,
                  b: 2,
                }

                obj[Symbol.iterator] = function () {
                  const keys = Object.keys(obj)
                  let index = 0
                  return {
                    next: function () {
                      return {
                        value: obj[keys[index++]],
                        done: index > keys.length,
                      }
                    }
                  }
                }
                const arr = [...obj] // [1,2]

          生成器(generator)

            什么是生成器？
              生成器是通过一个构造函数Generator创建的对象，生成器既是一个迭代器也是一个迭代对象

            如何得到一个生成器？
              通过生成器函数得到一个生成器，生成器函数就是function和函数名之间有一个*符号
              // 生成器函数
              function *a(){}
              // 生成器
              const generator = a()

            生成器函数如何运行？
              生成器函数内部是为了给生成器的每次迭代提供数据
              每次调用生成器的next方法，将导致生成器函数运行到下一个yield关键字的位置,next方法返回一个迭代值

              // 生成器函数
              function *a(){
                console.log(1)
              }
              // 生成器
              const generator = a() // 生成器函数内部是不会执行的
              // 通过next来执行
              generator.next() // { value:undefined, done: true}

            yield
              yield是一个关键字，指定每次生成器执行的截止位置， yield 后面的值作为迭代器的value返回

              / 生成器函数
              function *a(){
                console.log('第一次执行')
                yield 1
                console.log('第二次执行')
                yield 2
                console.log('第三次执行')
              }
              // 生成器
              const generator = a() // 生成器函数内部是不会执行的
              // 通过next来执行
              generator.next() // { value: 1, done: false}
              generator.next() // { value: 2, done: false}
              generator.next() // { value: undefined, done: true}

            细节：
              生成器函数可以有返回值，返回值作为第一个done为true的value的值

              function *a(){
                yield 2
                return 8
              }
              const generator = a()
              generator.next() // { value: 2, done: false }
              generator.next() // { value: 8, done: true }

              next方法可以传递参数，作为yield执行之后返回的值，第一次调用next传递参数是没有意义的，
              因为第一次执行next是从函数内部起始位置执行到yield之后的代码，还未执行yield

              function *a(){
                let val = yield 1
                console.log(val) // 2222
                val = yield 2
                console.log(val) // undefined
              }
              const generator = a()
              generator.next(111) // { value: 1, done: false } 第一次传递参数没有意义
              generator.next(2222) // { value: 2, done: false }
              generator.next() // { value: undefined, done: true }

              return方法
                调用该方法可以提前结束生成器函数,可以传递一个参数作为迭代值的value的值，
                调用该方法之后，再次调用next方法得到的都是done为true,表示没有值了

                function *a(){
                  yield 1
                  yield 2
                  yield 3
                }
                const generator = a()
                generator.next() // { value: 1, done: false }
                generator.return(2) // { value: 2, done: true }
                generator.next() // { value: undefined, done: true }

              throw方法
                调用该方法可以在生成器中产生一个错误,再次调用next方法得到的都是done为true,表示没有值了
                function *a(){
                  yield 1
                  yield 2
                  yield 3
                }
                const generator = a()
                generator.next() // { value: 1, done: false }
                generator.throw(2) // 报错 Uncaught 2
                generator.next() // { value: undefined, done: true }

              生成器函数内部还可以调用其他生成器，必须在其他生成器前面加*
                function *a(){
                  yield 1
                  yield 2
                }
                function *b(){
                  // yield a() // 这样写得到的是一个生成器
                  yield* a() // 必须使用*
                  yield 3
                  yield 4
                }
                const generator = a()
                generator.next() // { value: 1, done: false } 执行了a中的yield
                generator.next() // { value: 2, done: false }
                generator.next() // { value: 3, done: false }
                generator.next() // { value: 4, done: false }


            生成器的目的？
              解决迭代器繁琐的写法，方便使用

              通过生成器遍历数组,相比迭代器的实现简单了很多
              function *createIterator (arr) {
                for(let i of arr){
                  yield i
                }
              }
              const generator = createIterator([1,2,3])
              generator.next() // { value: 1, done: false}

              // 通过生成器创建斐波拉契数列
              function *createFeiboIterator(){
                let pre1 = 0
                let pre2 = 1
                while(true){
                  const value = pre1 + pre2 
                  yield value 
                  pre1 = pre2
                  pre2 = value
                }
              }
              const generator = createFeiboIterator()
              generator.next() // { value: 1, done: false}
              generator.next() // { value: 1, done: false}
              generator.next() // { value: 2, done: false}

            

          


          es5
          阻止给一个对象添加新属性
            Object.preventExtensions(object)
          创建一个密封对象，不能够添加，删除和配置这个对象的属性，只能修改
            Object.seal(..)
            内部通过Object.preventExtensions(object)和把所有现有属性标记为 configurable:false
          创建一个冻结对象，不能新增，删除和修改
          Object.freeze(..)
            内部通过 Object.seal(..)和把所有“数据访问”属性标记为 writable:false实现
            这个对象引用的其他对象是不受影响的

          in 检查某个属性是否在这个对象以及它的原型链上
            let obj = { b: 1}
            "a" in obj // false

          hasOwnProperty
            检查某个对象上是否有这个属性，不会检查它的原型

          for..in 
            遍历对象或数组上可枚举的属性包括它的原型链，
            在数组上应用 for..in 循环有时会产生出人意料的结果，因为这种枚举不 仅会包含所有数值索引，
            还会包含所有可枚举属性。最好只在对象上应用 for..in 循环，如果要遍历数组就使用传统的 for 循环来遍历数值索引
          
          Object.keys( myObject )
            获取的是可枚举的属性
          
          Object.getOwnPropertyNames()
            获取的所有的属性，不管是否可枚举

          for of 
            遍历具有迭代属性的对象，数组就使用这个遍历可以直接获取值而不是下标
            工作原理：
              首先会去获取对象身上的迭代对象，通过迭代对象的next获取值
            var myArray = [ 1, 2, 3 ]; 
            var it = myArray[Symbol.iterator](); 
            it.next(); // { value:1, done:false }  
            it.next(); // { value:2, done:false }  
            it.next(); // { value:3, done:false }  
            it.next(); // { done:true }

          目前对象是没有迭代器的，因此可以手动给对象设置迭代器

            const obj = { a: 1, b: 2} 
            Object.defineProperty(obj, Symbol.iterator, () => {
              value: fucntion(){
                const o = this 
                let index = 0
                const keys = Object.keys(o)
                return {
                  next: function () {
                    return {
                      value: o[keys[index++]],
                      done: index > keys.length
                    }
                  }
                }
              }
            })
            var it = myObject[Symbol.iterator]();  
            it.next(); // { value:1, done:false }  
            it.next(); // { value:2, done:false }  
            it.next(); // { value:undefined, done:true }

            1. 如果在原型上的属性是被设置为不可写的，那么在子对象身上是无法通过=创建这个属性的，严格模式会报错,
            2. 如果在原型上的属性是被设置了set描述，那么在子对象上是无法通过=创建这个属性的，如果在子对象上添加了这个属性，那么就会修改
            原型上的这个属性的值；

            可以通过Object.defineProperty来解决以上两个问题，如果是问题1，那么会在对象上创建这个属性，并且不影响原型的这个属性
            如果是问题2，那么会在对象上创建这个属性，并且会改变原型上的这个属性的值

            const a = {}
            Object.defineProperty(a, 'b',{
              writable: false,
            })
            const c = Object.create(a)
            c.b = 44
            c.d = 55
            c // { d:55} 原型上的b是undefined

            Object.defineProperty(c, 'b',{
              value: 88
            })
            c // { b: 88 } 原型上的b还是undefined

            let value= ''
            Object.defineProperty(a, 'z',{
              set(val){
                value = val
              },
              get(){
                return value
              }
            })
            const g = Object.create(a)
            g.z = 44
            g // {} 
            Object.getPrototypeOf(g) // { z: 44 }

            // Object.defineProperty重新赋值
            Object.defineProperty(g, 'z',{
              value: 666
            })
            g // { z:666}

            修改原型上的属性，最好不要通过子对象进行修改，因为可能会给子对象创建这个属性，而没有修改到原型上的属性
            const a = {
              b: 1
            }
            const aa = Object.create(a)
            aa.b  // 1
            a.b // 1
            // 想要原型的b加1，通过子类修改
            aa.b++ // 相当于aa.b = aa.b + 1，进行赋值了
            aa // { b:2 } 
            a // { b:1 } 
            // 最好直接修改原型
            a.b++



 







        




        


      



    
  </pre>
</template>

<script>
export default {

}
</script>

<style>

</style>