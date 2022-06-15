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

            应用：
              实现一个执行生成器的函数
              // 生成器函数
              function *task(){
                // 参数
                const a = yield { id: 11 } 
                // 请求接口
                const res = yield getList('https://XXX', a)
                // 处理结果
                const result = yield dealRes(res)
                // 返回结果
                return result
              }
              run(task)

              // 执行函数
              function run(generatorFunc){
                const generator = generatorFunc()
                let result = generator.next() // 开始执行
                handle()
                function handle(){
                  // 如果没有了就返回
                  if (result.done) {
                    return
                  }
                  // 如果值的then是一个函数，表示是一个promise
                  if (typeof result.value.then === 'function') {
                    // 执行then
                    result.value.then(res => {
                      // 把结果传递进入
                      result = generator.next(res)
                      // 递归执行
                      handle()
                    },err => {
                      // 抛出错误
                      result = generator.throw(err)
                      // 递归执行
                      handle()
                    })
                  } else { // 不是promise就继续执行
                    result = generator.next(result.value)
                    // 递归执行
                    handle()
                  }
                }
              }

          set 集合
            存储不重复的数据，Set是可迭代对象，因此具有迭代对象的特性

            如何创建set集合
            // 创建一个空的set集合
            const s1 = new Set()

            // 创建一个带有初始值的集合, 参数必须是一个可迭代的对象
            const s2 = new Set([1,2,3,4]) // {1,2,3,4}
            const s3 = new Set('123321') // {1,2,3}

            Set方法：
              add(str) 
                给set添加数据, 参数只有一个，如果添加已有的数据，不进行任何操作
                add内部使用的Object.is方法来判断数据是否一样，但是对于+0和-0,add做了单独处理，add认为+0,-0不一样
                认为它们是相同的

              has(str)
                判断集合中是否有这个数据
              
              delete(str)
                删除指定的数据，返回是否删除成功
              
              clear()
                清空set集合

              forEach(callBack)
                遍历Set集合

            属性
              size
                只读，获取Set长度
              
            遍历集合
              for of遍历，因为它是迭代对象

              forEach遍历，因为Set没有下标，因此forEach中第一个和第二个参数是一样都表示值
            
            注意：
              set集合中不存在下标

            和数组进行相互转换
              // 数组转成Set
              const s = new Set(arr)
              // Set转成数组，Set是迭代对象，因此可以通过扩展运算符
              const arr = [...s]

            应用:
              数组和字符串的去重
              // 数组去重
              const arr1 = [...new Set(arr)]
              // 字符串去重
              const arr2 = [...new Set(str)]
              const str2 = arr2.join('')

              获取两个数组的并集
              const arr1 = [1,2,3,4]
              const arr2 = [1,4,5,6]
              const arr = [...new Set([...arr1,...arr2])] // [1, 2, 3, 4, 5, 6]

              获取两个数组的交集
              const arr1 = [1,2,3,4,1,2]
              const arr2 = [1,4,5,6]
              const s2 = new Set(arr2)
              const result = [...new Set(arr1)].filter(item => {
                return s2.has(item) // arr2.indexOf(item)
              })
              result // [1, 4]

              获取两个数组之间的差集
              const result = [...new Set(arr1),...new Set(arr2)].filter(item => {
                // arr1有的arr2没有，或arr1没有的arr2有
                return (arr1.indexOf(item) === -1 && arr2.indexOf(item) !== -1) || (arr1.indexOf(item) !== -1 && arr2.indexOf(item) === -1)
              })
              result // [2, 3, 5, 6]

            实现一个Set

              class MySet{
                constructor(iterator = []){
                  // 判断是否是可迭代对象
                  if (typeof iterator[Symbol.iterator] !== 'function') {
                    throw new TypeError('参数不是一个可迭代对象')
                  }
                  this._data = []
                  for (const item of iterator) {
                    this.add(item)
                  }
                }

                add (item) {
                  if (!this.has(item)) {
                    this._data.push(item)
                  }
                  return this._data
                }

                has (item) {
                  for (const data of this._data) {
                    if (this.isEqual(data, item)) {
                      return true
                    }
                  }
                  return false
                }

                delete (item) {
                  let flag = false
                  this._data = this._data.filter(val => {
                    const result = this.isEqual(val, item)
                    if (result) {
                      flag = true
                    }
                    return !result
                  })
                  <!-- for (let i = 0; i < this._data.length; i ++) {
                    if (this.isEqual(this._data[i], item)) {
                      this._data.splice(i,1)
                      return true
                    }
                  } -->
                  return flag
                }

                clear () {
                  this._data = []
                }
                // 通过生成器实现迭代器
                *[Symbol.iterator]() {
                  for (const item of this._data) {
                    yield item
                  }
                }

                forEach (callBack) {
                  for (const item of this._data) {
                    callBack(item, item, this._data)
                  }
                }

                get size(){
                  return this._data.length
                }

                isEqual(item,item2){
                  // 单独处理0,-0和+0是不相等
                  if (item === 0 && item2 === 0) {
                    return true
                  }
                  return Object.is(item,item2)
                }
              }

              const ss = new MySet([1,2,3])
              ss.size // 3

          map集合 
            用来存储键值对数据,键是唯一的，并且可以是任意类型

            解决了对象存储键值对的问题：
              1. 键名只能是字符串或Symbol符号
              2. 获取数据的长度不方便

            创建map
              通过Map构造函数创建map对象，并且map对象是可迭代的
              // 创建一个空的map对象
              new Map()  
              // 创建一个具有初始值的map对象，传递一个可迭代对象，并且这个迭代对象中的每一项
              // 都是一个长度为2的数组，第一项为键，第二项为值
              new Map([{a:1}, ['b', 2]]) // {undefined => undefined, 'b' => 2}

              // 创建一个对象，并且转换为可迭代的对象
              const obj = {
                a: 1,
                [Symbol.iterator]: function *() {
                  for(const key in this){
                    yield this[key]
                  }
                }
              }
              for (const key of obj) {
                console.log(key) // 1
              }
              // 迭代对象的每一项必须是数组如果是一个对象并且是可迭代的也是不可以
              new Map([obj, ['b', 2]]) // {undefined => undefined, 'b' => 2}

            Map的属性
              size: 
                只读，获取集合的长度

            map的方法：
              set(键,值):
                设置一个键值对，键和值可以是任何类型
                如果键不存在就添加，如果键已经存在，就修改
              
                const m1 = new Map([[{},1],['a', 2]])
                m1.set({},3)
                console.log(m1) // {{…} => 1, 'a' => 2, {…} => 3}
              
              get(键)
                获取一个指定键的值，不存在的键就是undefined

              delete(键)
                删除一个键 
              
              has(键)
                查看指定的键是否存在
              
              clear()
                清空 
              
            和数组之间的转换 
              map转数组 
                const m1 = new Map([['a', 1], ['b', 2], ['b', 3]])
                const arr = [...m1] // [['a', 1], ['b', 3]]

              数组转map
                const arr = [['a', 1], ['b', 2], ['b', 3]]
                const m1 = new Map(arr) // {'a' => 1, 'b' => 3}
              
            遍历map
              for-of: 
                每次迭代得到都是一个长度为2的数组
              forEach: 
                参数1：每项的值 
                参数2：每项的键 
                参数3：map自身 
              
          手撕map
            class MyMap{
              constructor(iterator){
                if (typeof iterator[Symbol.iterator] !== 'function') {
                  throw new TypeError('参数必须是一个可迭代对象')
                }
                this._datas = []
                // 遍历这个iterator
                for (const item of iterator) {
                  if (typeof item[Symbol.iterator] !== 'function') {
                    throw new TypeError( item + '必须是一个可迭代对象')
                  }
                  const obj = item[Symbol.iterator]()
                  const key = obj.next().value 
                  const value = obj.next().value 
                  this.set(key, value)
                }
              }

              set(key, value){
                const result = this.getItem(key)
                if (result !== false) {
                  this._datas[result].value = value
                  return this._datas
                }
                this._datas.push({
                  key,
                  value
                })
                return this._datas
              }

              getItem (key) {
                for (let i = 0; i < this._datas.length; i++) {
                  if (key === this._datas[i].key) {
                    return i
                  }
                }
                return false
              }

              has(key){
                return this.getItem(key) === false ? false : true
              }

              get(key){
                const result = this.getItem(key)
                if (result !== false) {
                  return this._datas[result].value
                }
                return undefined
              }

              delete(key){
                const result = this.getItem(key)
                if (result !== false) {
                  this._datas.splice(result,1)
                  return true
                }
                return false
              }

              clear(){
                this._datas.length = 0
              }
              get size(){
                return this._datas.length
              }

              forEach(callBack){
                for (let i = 0; i < this._datas.length; i++) {
                  const item = this._datas[i]
                  callBack(item.value, item.key, this._datas)
                }
              }

              *[Symbol.iterator](){
                for(const val of this._datas){
                  yield val
                }
              }
            }
            const m = new MyMap([[1,1],['a',2]])
            m.set(1,5) // [{1:5}, {'a':2}]
            m.has(1) // true
            m.delete(2) // true
            m.size // 1
            m.get(1) // 5
            m.forEach((a,b,c) => {
                console.log(a,b,c) // 5 1 [{1:5}]
            })

          WeakSet
            和Set一样的功能，weakSet的成员值是唯一的，并且 WeakSet 的成员只能是对象

            WeakSet集合中对象的引用为弱引用。 如果没有其他的对 WeakSet中对象的引用，那么这些对象会被当成垃圾回收掉

            WeakSet不是可迭代对象，因此不能遍历，没有size，forEach

            let obj = { a: 1}
            const s = new Set()
            s.add(obj)
            obj = null // 清空指向
            s.has(obj) // false

            let obj2 = { a: 2} 
            const ws = new WeakSet()
            ws.add(obj2)
            obj2 = null 
            ws.has(obj2) //false 

            应用： 可以调试一个对象是否被完全释放

          WeakMap
            和map一样的功能， WeakMap中的键是唯一的并且只能是对象

            WeakMap集合中的键是弱引用，如有没有其他变量对这个键有引用，那么就会被垃圾回收掉

            WeakMap是不可迭代的对象，不可遍历，没有size和forEach方法

          Reflect反射
            Reflect是一个内置的js对象，它提供了一系列的方法，通过调用这些方法可以访问js底层的功能

            es6贯穿的理念是暴露些底层的实现方法，因此需要把它们提取出来形成 
            一个正常的API，并且聚合到Reflect对象上

            常用API: 
              Reflect.set(obj, 属性key, 值)
              给对象设置值 

              Reflect.get(对象，属性key) 
              获取对象的值 
              Reflect.apply(fn, 调用的对象, argus)
              指定对象执行函数 
              Reflect.deleteProperty(obj, key) 
              删除对象上的属性 
              Reflect.defineProperty(obj, key, 配置对象)
              给对象的属性添加描述
              Reflect.constructor(fn, argus)
              调用构造函数的方式创建对象 
              Reflect.has(obj, key) 
              判断对象中是否有这个属性和in是一样的 

            作用：有助于实现函数式编程，无需通过=,new等语法进行操作，直接通过.方法的形式；有助于了解Proxy代理对象中能够代理的方法 

          Proxy代理 
            提供了修改底层实现的方式 

            new Proxy(target, handler)
            tareget: 代理的对象
            handler: 要代理的属性,属性为Reflect中的所有api
            返回一个代理对象 

            const obj = {
              a: 1
            }

            const proxyObj = new Proxy(obj, {
              set(target, key, value){ // 代理修改属性的方法
                console.log(target, key, value)
                target[key] = value 
              },
              get(target, key){ // 代理获取的方法
                if (Reflect.has(target, key)) {
                  return Reflect.get(target, key)
                }
                return -1
              }
            })

            proxyObj.a = 2

            观察者模式
              观察一个对象的变化 

              // 创建一个观察者
              function observer(target){
                // const ob = {} 
                // 通过Object.defineProperty实现
                // const pros = Object.keys(target)
                // for(const key of pros){
                  // 代理对象上的属性
                  // Object.defineProperty(ob, key, {
                  //  enumerable: true,
                  //  set(newVal){ // 观察对象身上的属性
                  //    target[key] = newVal
                  //    render()
                  //  },
                  //  get(){
                  //    return target[key]
                  //  },
                  // })
                // }
                // 通过Proxy代理 
                const ob = new Proxy(target, {
                  set(obj, key, value){
                    Reflect.set(obj, key, value)
                    render()
                  },
                  get(obj, key){
                    return Reflect.get(obj, key)
                  }
                })
                render()
                // 根据观察者触发修改模板
                function render() {
                  let html = ''
                  for(const key of Object.keys(ob)){
                    html += `<p>${key}: ${ob[key]}</p>`
                  }
                  document.getElementByElement('html')[0].innerHTML = html
                }


                return ob
              }

            和Object.defineProperty的区别？ 
              Object.defineProperty只能代理取和写并且需要创建一个中间对象进行操作
              Proxy可以代理Reflect对象上的所有的方法，无需额外的对象，只返回一个代理对象

            
            数组中新增的方法 
              Array.of(值)
                创建一个指定值的数组
                和new Array(值)构造函数的区别？ 
                  如果new Array(1)表示创建长度为1的一个空数组；  
                  Array.of(1)表示创建一个数组，其中一项为1 

              Array.from(可迭代的对象)
                把可迭代的对象转换成数组

                Array.from('21') // ['21']

              find((item,index) => { return true|false}) 
                查找返回true的值
                和filter的区别？
                  filter查找所有返回true的项并且是一个新的数组
                  find只查找第一个返回为true的项不是一个数组 
                一般用于查找对象 
              
              fill(值)
                填充数组的每一项为指定的值

              copyWithin(开始覆盖位置，开始复制的位置，结束复制的位置)
                复制指定位置区域的数组中的一段进行覆盖指定位置的值
              
              includes(值)  es7方法
                查找数组中是否包含指定值，返回布尔值

              
            类型数组eg
             和数组一样用来存储数据，但是数组的每一项是通过64位二进制进行存储，而类型数组，可以选择不同的位数二进制进行存储，
             这样可以根据不同的数据选择不同的类型数组进行存储而节约存储空间

              eg: 
                一张大小为100*117的图片，总共需要占据11700个像素，每个像素需要四个元素(红，绿，蓝，透明度)来进行绘制，因此需要 
                一个长度为11700*4=46800的普通数组来进行存储，需要的二进制数量为46800*64=2995200，需要的的总字节为 2995200/8=374400, 
                需要的总kb为 374400 / 1024 = 365kb； 
                如果使用类型化数组，每个元素(红，绿，蓝，透明度)的范围为0-255,因此选择Uint8Array来进行存储，因为它的每项存储范围是0-2^8， 
                因此它需要的二进制数量为46800*8=374400，需要的总字节为374400/8=46800，需要的总kb为46800/1024=45kb;
                因此存储数据通过选择适合的类型化数组进行存储，可以节省很多内存


                每8位二进制表示一个字节
                一kb等于1024字节

                int8Array: 每位使用8位二进制来进行存储，范围 -2^8 到 2^8-1
                Uint8Array: 没有符号的，每位使用8位二进制来进行存储，范围 0 到 2^8-1
                int16Array: ... 
                Uint16Array: ... 
                int32Array: ... 
                Uint32Array: ... 
                int64Array: ... 
                Uint64Array: ... 

                ArrayBuffer: 


              
              






              





            

          


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
          
          Object.keys( myObject )| Object.values(obj)
            获取的是可枚举的属性/值
          
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

            获取属性的描述符
            Object.getOwnPropertyDescripyor(对象,属性)

            获取对象的所有属性的描述符
            Object.getOwnPropertyDescripyors(对象)

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

            组合继承
            function A(name){
              this.name = name
            }
            function B(name, age){
              // 构造函数实现属性的继承
              A.call(this, name)
              this.age = age
            }
            // 原型实现方法的继承
            // 方式一：错误的原型继承，直接继承，这样修改B的原型会影响到A的原型
            B.prototype = A.prototype
            // 正确写法：通过创建对象和原型的方式
            B.prototype = Object.create(A.prototype)

            // 方式二：错误的原型继承，通过构造函数直接继承,这样继承会有副作用，
            // 比如如果函数A有一些副作用（比如写日志、修改状态、注 册到其他对象、给 this 添加数据属性，等等）的话，就会影响到 B() 的“后代
            // A的函数中this.name则会影响B的实例，可能b的实例上没有name,但是原型上有因此可以通过原型找到
            B.prototype = new A()
            // 正确方式：创建一个中间纯函数
            function C(){}
            // 原型的继承
            C.prototype = A.prototype
            // 实现b的原型继承自c,c的原型就是A的原型，从而达到继承
            B.prototype = new C()

            // 方式三：通过es6的Object.setPrototypeOf
            Object.setPrototypeOf(B.prototype, A.prototype)

            // 修改构造函数的引用指向自身
            B.prototype.constructor = B

            a instanceof B 
            B是一个函数，a是一个对象，B的原型是否在a的原型链中，如果在就返回true,
            一般用来判断a是否是B构造出来的实例

            instanceof只能判断对象和函数之间的关系，而无法判断两个对象之间的关系，因此可以
            通过中间函数来判断两个对象的关系

            方法1：
            function isInstanceof (a,b) {
              function F(){}
              F.prototype = b // 函数才有prototype属性，表示实例的原型对象，对象只有__proto__,指向函数的Prototype(它的原型),函数的__proto__指向它的函数的prototype(Function.prototype)
              return a instanceof F 
            }
            const a = {}
            const b = Object.create(a)
            isInstanceof(b,a) // true

            方法2：
              a.isPrototypeOf(b) // true
              a是否是b的原型

            方法3：
              Object.getPrototypeof(b) === a 

            方法4：
              b.__proto__ === a

          __proto__的实现
            Object.defineProperty(Object.prototype, '__proto__', {
              set(o){
                Object.setPrototypeOf( this, o )
                return o
              },
              get(){
                return  Object.getPrototypeOf( this )
              }
            })

          setPrototypeOf和prototype和__proto__设置原型的区别？
          setPrototypeOf内部通过__proto__来给对象设置原型
          一个对象的__proto__指向的是这个对象的构造函数的prototype
          一个函数的__proto__指向的是这个函数的构造函数(Function)的prototype
          一个函数的prototype就是这个函数的原型对象(只有函数才有prototype)

          function A(){}
          const a = new A()
          a.__proto__ === A.prototype 
          A.__proto__ === Function.prototype

          A.prototype并不等于A.__proto__，它们分别是两个东西

          如果使用setPrototypeof给函数设置原型，
          Object.setPrototypeof(A,{}) 
          那么就相当于
          A.__proto__ = {}
          所以setPrototypeof给函数设置的原型和直接给函数的prototype设置值是两个不同的东西
          A.prototype = {}

          Object.create(obj,{属性:{描述符}})
            创建一个新的对象，并且指定这个对象到原型为obj,并且可以给新的对象身上添加额外的属性

            eg:
              创建一个对象myObject，并且给他添加属性b和c 
              var anotherObject = { a:2 }; 
              var myObject = Object.create( anotherObject, {      
                b: {         
                  enumerable: false,          
                  writable: true,          
                  configurable: false,          
                  value: 3     
                },     
                c: {         
                  enumerable: true,          
                  writable: false,          
                  configurable: false,          
                  value: 4     
                } 
              }); 
              myObject.hasOwnProperty( "a" ); // false 
              myObject.hasOwnProperty( "b" ); // true 
              myObject.hasOwnProperty( "c" ); // true 
              myObject.a; // 2  
              myObject.b; // 3  
              myObject.c; // 4

          实现Object.create
            function create(o){
              function F(){}
              F.prototype = o 
              return new F()
            }

          




            

            

          





 







        




        


      



    
  </pre>
</template>

<script>
export default {};
</script>

<style>
</style>