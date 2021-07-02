<template>
  <div>
    <pre>
      <h3>set、map、WeakSet、WeakMap</h3>
      Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构

      什么是集合?
        集合就是一堆无序的、相关联的并且不重复的内存结构组成的组合

      什么是字典？
        字典就是一些元素的集合，每个元素都有一个key的域，不同元素key不相同

      集合和字典的区别？
        相同点：都可以存储不重复的值
        不同点：集合是以[值，值]的形式存储，字典是以[键，值]形式

      <h3>Set</h3>
        Set对象可以存储任何类型的值，Set对象的值是一个集合，可以按照插入顺序进行迭代它的元素
        Set对象中的元素都是唯一的

        Set本身就是一个构造函数，用来生成Set数据结构

        语法：
          new Set([iterable]) 接收一个数组或具有迭代接口的其他数据结构，返回一个Set对象

          const set = new Set([1,2,1,2])
          console.log(set) // {1,2} 值是唯一的

        属性和方法：
          属性：
            size: 返回集合中所有元素的数量
            console.log(new Set([1,2,3,1]).size) // 3
          
          方法：
            add(val) 
              向集合中添加一项
            
            delete(val)
              从集合中删除一个值

            has(val)
              如果值在集合中存在就返回true否则就是false

            clear()
              清空集合

              eg:
                const s = new Set()
                s.add(1)
                s.add(2).add(3).add(2)
                console.log(s) // {1, 2, 3}
                s.delete(2)
                s.has(2) // false
                s.has(3) // true
                s.clear()

            遍历方法：
              keys()
                返回键名的遍历器

              values()
                返回键值的遍历器

              entries()
                返回键值对的遍历器

              forEach()
                遍历整个对象

                eg：
                  const set = new Set([1,2,3,4,5,1,2,3])
                  console.log(Array.from(set.keys())) // [1, 2, 3, 4, 5]
                  console.log(Array.from(set.values())) // [1, 2, 3, 4, 5]
                  console.log(Array.from(set.entries())) // [[1,1],[2,2],[3,3],[4,4],[5,5]]
                  set.forEach(item=>{
                    console.log(item) // 1 2 3 4 5
                  })

            应用场景：
              去重、交集、差集和并集

      <h3>WeakSet</h3>
         WeakSet对象是一些对象的集合，其中每个对象的值只能出现一次，因此WeakSet中的值都是唯一的

         WeakSet主要解决了弱引用对象的存储场景，其结构与Set类似      

         弱引用：不能确保其引用的对象不会被垃圾回收机制回收的引用(随时可能会回收)

         WeakSet与Set区别：
          WeakSet只能存储对象，Set能够存储任何类型
          WeakSet中的对象都是弱引用，在没有其他对WeakSet中的对象进行引用的时候垃圾回收机制就会收回掉，
            意味着WeakSet中没有存储当前对象的列表，因为它不可枚举

        注意:
          WeakSet 的属性跟操作方法与 Set 一致，不同的是 WeakSet 没有遍历方法，因为其成员都是弱引用，
          弱引用随时都会消失，遍历机制无法保证成员的存在

      <h3>Map</h3>
        Map对象中保存的是键值对，任何类型的值都可以作为键或值，一个Map对象在迭代的时候是根据对象元素的插入
        顺序进行， 一个 for...of 循环在每次迭代后会返回一个形式为[key，value]的数组

        语法：
          new Map([iterable]) iterable是一个迭代对象或者是一个数组，其元素为键值对形式[[1,2]]

        属性及方法：
          属性：
            size
              返回对象元素的总数

            let map = new Map()
            map.set('name', 'vuejs.cn');
            console.log(map.size) // 1

          操作方法：
            set(key,val)  
              像对象中添加元素

            get(key) 
              获取对象中指定键的值

            has(key)
              查看对象中是否有指定键

            delete(key)
              删除对象中指定的键
            
            clear()
              清空对象中所有元素

            eg:
              let map = new Map()
              map.set('name','vue3js.cn')
              map.set('age','18')
              console.log(map) // Map {"name" => "vuejs.cn", "age" => "18"}
              map.get('name') // vue3js.cn 
              map.has('name') // true
              map.delete('name')  
              map.has(name) // false
              map.clear() // Map {} 

          遍历方法:
            keys()
              返回键名的遍历器

            values()
              返回值的遍历器

            entries()
              返回键值对的遍历器

            forEach()
              遍历对象

            eg:
              let map = new Map()
              map.set('name','vue3js.cn')
              map.set('age','18')

              console.log([...map.keys()])  // ["name", "age"]
              console.log([...map.values()])  // ["vue3js.cn", "18"]
              console.log([...map.entries()]) // [['name','vue3js.cn'], ['age','18']]

              // name vuejs.cn
              // age 18
              map.forEach((value, key) => { console.log(key, value)})

      <h3>WeakMap</h3>
        WeakMap对象是一组键值对的集合，其中的键是弱引用类型，其键必须是对象，其值可以是任意类型

        与Map区别：
          Map的键可以是任意类型，WeakMap键只能是对象类型
          WeakMap 键名所指向的对象，不计入垃圾回收机制

        方法和属性：
          WeakMap属性和方法操作和Map一样，对于遍历方法，和weakSet一样，因为是弱类型引用，因此没有遍历方法

      <h3>类型转换</h3>

        1. Map转Array
          const map = new Map([[1,1],[2,2],[3,3]])
          // 解构
          console.log([...map]) // [[1, 1], [2, 2], [3, 3]]
          // Array.from()
          console.log(Array.from(map)) // [[1, 1], [2, 2], [3, 3]]

        2. Array 转为 Map
          const arr = [[1,1],[2,2],[3,3]]
          const map = new Map(arr)
          console.log(map)	// Map {1 => 1, 2 => 2, 3 => 3}

        3. Map转Object
          function mapToObj(map){
            let obj = Object.create(null)
            for(let [key,val] of map){
              obj[key] = val
            }
            return obj
          }
          const map = new Map().set('name','a').set('age',11)
          console.log(mapToObj(map)) // {name: "a", age: 11}

        4. Object转map 
          let obj = {"name":"a", "age": 22}
          const map = new Map(Object.entries(obj))
          console.log(map) // map {"name" => "a", "age" => 22}

      <h3>总结： </h3>
        1. Set、Map、weakSet、WeakMap都是一种集合的数据结构

        2. Set和WeakSet是[值,值]的集合，且具有唯一性，值可以是任意类型

        3. Map和WeakMap是一种[键，值]的集合，Map的键和值可以是任意类型，WeakMap的键只能是对象类型，值可以是任意类型

        4. Set和Map具有遍历方法，WeakMap和WeakSet是弱引用类型，因此没有遍历方法

        export const mutableHandlers: ProxyHandler<object> = {
          get, // 用于拦截对象的读取属性操作
          set, // 用于拦截对象的设置属性操作
          deleteProperty, // 用于拦截对象的删除属性操作
          has, // 检查一个对象是否拥有某个属性
          ownKeys // 针对 getOwnPropertyNames,  getOwnPropertySymbols, keys 的代理方法
        }

        /**
        * @description: 用于拦截对象的删除属性操作 
        * @param {target} 目标对象 
        * @param {key} 键值 
        * @return {Boolean}
        */
        function deleteProperty(target: object, key: string | symbol): boolean {
          // hasOwn 的实现放下方了，检查一个对象是否包含当前key
          const hadKey = hasOwn(target, key)
          const oldValue = (target as any)[key]
          // Reflect 作用在于完成目标对象的默认，这里即指删除
          const result = Reflect.deleteProperty(target, key)

          // 如果该值被成功删除则调用 trigger, 
          // trigger 为 effect 里的方法，effect 为 reactive 的核心, 后面会讲到
          if (result && hadKey) {
            trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
          }

          return result
        }
        /**
        * @description: 检查一个对象是否拥有某个属性 
        * @param {target} 目标对象 
        * @param {key} 键值 
        * @return {Boolean}
        */
        function has(target: object, key: string | symbol): boolean {
          const result = Reflect.has(target, key)
          // track 也为 effect 里的方法，effect 为 reactive 的核心, 后面会讲到 
          track(target, TrackOpTypes.HAS, key)
          return result
        }

        // 返回一个由目标对象自身的属性键组成的数组
        function ownKeys(target: object): (string | number | symbol)[] {
          track(target, TrackOpTypes.ITERATE, ITERATE_KEY)
          return Reflect.ownKeys(target)
        }

        const hasOwnProperty = Object.prototype.hasOwnProperty
        export const hasOwn = (
          val: object,
          key: string | symbol
        ): key is keyof typeof val => hasOwnProperty.call(val, key)

        const set = /*#__PURE__*/ createSetter()
        /**
        * @description: 拦截对象的设置属性操作 
        * @param {shallow} 是否是浅观察 
        */
        function createSetter(shallow = false) {
          /**
          * @description: 
          * @param {target} 目标对象
          * @param {key} 设置的属性的名称
          * @param {value} 要改变的属性值 
          * @param {receiver} 如果遇到 setter，receiver则为setter调用时的this值 
          */
          return function set(
            target: object,
            key: string | symbol,
            value: unknown,
            receiver: object
          ): boolean {
            const oldValue = (target as any)[key]

            // 如果模式不是浅观察
            if (!shallow) {
              value = toRaw(value)
              // 并且目标对象不是数组，旧值是ref，新值不是ref，则直接赋值，注意这里提到ref，这里不展开讲，后面详细讲
              if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                oldValue.value = value
                return true
              }
            } else {
              // in shallow mode, objects are set as-is regardless of reactive or not
            }

            // 检查对象是否有这个属性
            const hadKey = hasOwn(target, key)
            // 赋值
            const result = Reflect.set(target, key, value, receiver)
            // don't trigger if target is something up in the prototype chain of original
            if (target === toRaw(receiver)) {
              if (!hadKey) {
                // 如是不存在则trigger ADD
                trigger(target, TriggerOpTypes.ADD, key, value)
              } else if (hasChanged(value, oldValue)) {
                // 存在则trigger SET
                trigger(target, TriggerOpTypes.SET, key, value, oldValue)
              }
            }
            return result
          }
        }

        const get = /*#__PURE__*/ createGetter()
        /**
        * @description: 用于拦截对象的读取属性操作
        * @param {isReadonly} 是否只读 
        * @param {shallow} 是否浅观察  
        */
        function createGetter(isReadonly = false, shallow = false) {
          /**
          * @description: 
          * @param {target} 目标对象
          * @param {key} 需要获取的值的键值
          * @param {receiver} 如果遇到 setter，receiver则为setter调用时的this值 
          */
          return function get(target: object, key: string | symbol, receiver: object) {
            //  ReactiveFlags 是在reactive中声明的枚举值，如果key是枚举值则直接返回对应的布尔值
            if (key === ReactiveFlags.isReactive) {
              return !isReadonly
            } else if (key === ReactiveFlags.isReadonly) {
              return isReadonly
            } else if (key === ReactiveFlags.raw) {  // 如果key是raw 则直接返回目标对象
              return target
            }

            const targetIsArray = isArray(target)

            // 如果目标对象是数组并且 key 属于三个方法之一 ['includes', 'indexOf', 'lastIndexOf']，即触发了这三个操作之一
            if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
              return Reflect.get(arrayInstrumentations, key, receiver)
            }
            const res = Reflect.get(target, key, receiver)

            // 如果 key 是 symbol 内置方法，或者访问的是原型对象，直接返回结果，不收集依赖
            if (isSymbol(key) && builtInSymbols.has(key) || key === '__proto__') {
              return res
            }
            
            // 如果是浅观察并且不为只读则调用 track Get, 并返回结果
            if (shallow) {
              !isReadonly && track(target, TrackOpTypes.GET, key)
              return res
            }

            // 如果get的结果是ref
            if (isRef(res)) {
              // 目标对象为数组并且不为只读调用 track Get, 并返回结果 
              if (targetIsArray) {
                !isReadonly && track(target, TrackOpTypes.GET, key)
                return res
              } else {
                // ref unwrapping, only for Objects, not for Arrays.
                return res.value
              }
            }

            // 目标对象不为只读则调用 track Get
            !isReadonly && track(target, TrackOpTypes.GET, key)

            // 由于 proxy 只能代理一层，所以 target[key] 的值如果是对象，就继续对其进行代理
            return isObject(res)
              ? isReadonly
                ? // need to lazy access readonly and reactive here to avoid
                  // circular dependency
                  readonly(res)
                : reactive(res)
              : res
          }
        }

        const arrayInstrumentations: Record<string, Function> = {}
        ;['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
          arrayInstrumentations[key] = function(...args: any[]): any {
            const arr = toRaw(this) as any
            for (let i = 0, l = (this as any).length; i < l; i++) {
              track(arr, TrackOpTypes.GET, i + '')
            }
            // we run the method using the original args first (which may be reactive)
            const res = arr[key](...args)
            if (res === -1 || res === false) {
              // if that didn't work, run it again using raw values.
              return arr[key](...args.map(toRaw))
            } else {
              return res
            }
          }
        })

        export interface ReactiveEffectOptions {
          lazy?: boolean //  是否延迟触发 effect
          computed?: boolean // 是否为计算属性
          scheduler?: (job: ReactiveEffect) => void // 调度函数
          onTrack?: (event: DebuggerEvent) => void // 追踪时触发
          onTrigger?: (event: DebuggerEvent) => void // 触发回调时触发
          onStop?: () => void // 停止监听时触发
        }

        export function effect<T = any>(
          fn: () => T,
          options: ReactiveEffectOptions = EMPTY_OBJ
        ): ReactiveEffect<T> {
          // 如果已经是 `effect` 先重置为原始对象
          if (isEffect(fn)) {
            fn = fn.raw
          }

          // 创建`effect`
          const effect = createReactiveEffect(fn, options)

          // 如果没有传入 lazy 则直接执行一次 `effect`
          if (!options.lazy) {
            effect()
          }
          return effect
        }

        


        
    </pre>
  </div>
</template>

<script>
export default {
  mounted(){
    // 遍历方法
    const set = new Set([1,2,3,4,5,1,2,3])
    console.log(Array.from(set.keys())) // [1, 2, 3, 4, 5]
    console.log(Array.from(set.values())) // [1, 2, 3, 4, 5]
    console.log(Array.from(set.entries())) // [[1,1],[2,2],[3,3],[4,4],[5,5]]
    set.forEach(item=>{
      console.log(item) // 1 2 3 4 5
    })

    // 去重
    const arr = [1,2,3,2,1,2]
    console.log([...new Set(arr)])

    
    let a = [1,2,3,4,5]
    let b = [1,2,6,7]
    let set1 = new Set(b)
    let set2 = new Set(a)

    // 交集
    let c = [...set1].filter(item=>{
      return set2.has(item)
    })
    console.log('交集',c) // [1, 2]

    // 并集
    let d = [...new Set([...a,...b])]
    console.log('并集',d) // [1, 2, 3, 4, 5, 6, 7]

    // 差集
    let f = d.filter(item=>{
      return !new Set(c).has(item)
    })
    console.log('差集',f) // [3, 4, 5, 6, 7]



  }
}
</script>

<style>

</style>