<template>
  <div>
    <pre>
      Proxy

      语法：
        const proxy = new Proxy(target, handle)

          target是一个目标对象，这个对象可以是任何类型的对象包括数组函数甚至是另一个代理对象

          handle一个通常以函数作为属性的对象，用来定制拦截行为

        eg:
          const origin = {}
          const obj = new Proxy(origin, {
            get: function (target, propKey, receiver) {
              return '10'
            }
          });

          obj.a // 10
          obj.b // 10
          origin.a // undefined
          origin.b // undefined
        
          上方代码我们给一个空对象的get架设了一层代理，所有get操作都会直接返回我们定制的数字10，需要注意的是，
          代理只会对proxy对象生效，如上方的origin就没有任何效果

          handle对象常用的方法：
            handler.has()：in 操作符的捕捉器。
            handler.get()：属性读取操作的捕捉器。
            handler.set()：属性设置操作的捕捉器。
            handler.deleteProperty()：delete 操作符的捕捉器。
            handler.ownKeys()：Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器
            handler.apply()：函数调用操作的捕捉器。
            handler.construct()：new 操作符的捕捉器

      handler.get
        授受三个参数 get(target, propKey, ?receiver)
          target 目标对象
          propkey 属性名
          receiver Proxy 实例本身

          eg:
            const person = {
              name: 'vue'
            }

            const obj = new Proxy(person,{
              get: function(target, key){
                if(key in target){
                  return target[key]
                }else{
                  throw new ReferenceError('此对象身上没有此属性')  
                }
              }
            })

            obj.like // vue
            obj.test // Uncaught ReferenceError: 此对象身上没有此属性

      注意:
        如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同

        eg:
          const obj = {}
          Object.defineProperty(obj,"a",{
            configurable: false,
            enumerable: false,
            value: 20,
            writable: false
          })

          const p = new Proxy(obj, {
            get: function(){
              return 10  // 这里必须和上面设置的value为相同的值，否则报错
            }
          })

          p.a // Uncaught TypeError: 'get' on proxy: property 'a' is a read-only and non-configurable


      1. 可撤销的Proxy
        proxy 有一个唯一的静态方法，Proxy.revocable(target,handler)
        Proxy.revocable()方法可以用来创建一个可撤销的代理对象

        该方法的返回值是一个对象，其结构为： {"proxy": proxy, "revoke": revoke}

        proxy 表示新生成的代理对象本身，和用一般方式 new Proxy(target, handler) 创建的代理对象没什么不同，只是它可以被撤销掉。

        revoke 撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那个代理对象。

        eg:
          const obj = {
            name: 'xiaoming',
            age: 12
          }
          const { proxy, revoke } = Proxy.revocable(obj,()=>{})
          console.log(proxy.name) // xiaoming
          revoke()  // 撤销代理
          console.log(proxy.name) // TypeError: Revoked

      Proxy的应用场景:
        1. 校验器
        2. 定义私有属性

      


      
    </pre>
  </div>
</template>

<script>
export default {
  mounted(){
    this.revocable()
  },
  methods:{
    revocable(){
      const obj = {
        name: 'xiaoming',
        age: 12
      }
      const { proxy, revoke } = Proxy.revocable(obj,()=>{})
      console.log(proxy.name) // xiaoming
      revoke()  // 撤销代理
      console.log(proxy.name) // TypeError: Revoked
    }
  }
}
</script>

<style>

</style>