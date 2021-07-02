<template>
  <div class="api-wrap">
      <pre>
      <h2>组合模式和响应式api</h2>
      <h3>组合模式</h3>
       将之前选择模式中的data和methods这些方法，通过vue提供的components API ，放在setup中去处理。

       优点：
            面试题：
            composition api相比option api有哪些优势？
            1. 为了更好的逻辑复用和代码组织
            2. 更好的类型推导

            有了composition api,配合reactivity api，可以在组件内部进行更加细粒度的控制，
            使得组件中不同的功能高度聚合，提升了代码的可维护性，对于不同组件的相同功能，也
            能够更好的复用；相比option api,composition api中没有了指向奇怪的this,所有api
            变得更加函数式，这有利于和类型推断系统(ts)深度配合

      <h4>setup函数(composition api)</h4>
        setup 函数是一个新的组件选项，作为在组件内使用 Composition API 的入口点

        import { h, ref, reactive } from 'vue'

        export default {
            setup(props,context) {
                const count = ref(0)
                // return () => h('div', [count.value]) // 返回一个渲染函数
                return { // 返回一个对象
                  count  
                }
            }
        }

        参数：
            props: 接受上级传递的数据，并且是响应式的，可以基于watchEffect/watch监听，解构赋值后则无效
            context: 提供了一个上下文对象，该对象暴露了以前在 this 上暴露的 property 的选择列表
                    context对象成员：
                        attrs 对象  同vue2 this.$attrs 
                        slots 对象  同vue2 this.$slots 
                        emit  方法  同vue2 thihs.$emit 

        返回值：返回一个对象或者是渲染函数

        执行时机：在创建组件实例时，在初始 prop 解析之后立即调用 setup。它是在 beforeCreate 钩子之前调用的。
                 此时还不能访问this

        <h4>组合式生命周期</h4>
            vue3 options api        vue3 composition api
            beforeCreate            不需要，代码可直接写在setup中
            created                 不需要，代码可直接写在setup中
            beforeMount             onBeforeMount
            mounted                 onMounted
            beforeUpdate            onBeforeUpdate
            updated                 onUpdated
            beforeUnmount           onBeforeUnmount  //组件销毁之前
            unmounted               onUnmounted
            errorCaptured           onErrorCaptured
            renderTracked           onRenderTracked     // 模板渲染之后获取动态数据
            renderTriggered         onRenderTriggered   // 模板中动态数据变化导致模板重新渲染的时候执行

            这些生命周期钩子注册函数只能在 setup() 期间同步使用，因为它们依赖于内部全局状态来定位当前活动实例 (此时正在调用其 setup() 的组件实例)。
            在没有当前活动实例的情况下调用它们将导致错误
        
        <h3>响应式api(reactivity api)</h3>
            reactive
            readonly
            isProxy
            isReactive
            isReadonly
            toRaw
            markRaw
            shallowReactive
            shallowReadonly
            ref
            unref
            toRef
            toRefs
            isRef
            customRef
            shallowRef
            triggerRef
            computed
            watchEffect
            watch

            vue3中有两种响应式数据格式：
                1. ref形式的: {value: XXX}
                2  proxy对象

                ref或者computed得到的是第一种
                reactive或readonly得到的是proxy

            应用：
        如果想要让一个对象变为响应式数据，可以使用reactive或Ref

        如果想要让一个对象的所有属性只读，可以使用readonly

        如果想要让一个非对象数据变为响应式数据，使用ref

        如果想要根据已知的响应式数据得到一个新的响应式数据可以使用computed

        eg:
            // 1. readonly传递一个代理对象为a，当原代理对象属性改变，a的这个属性也改变
            const reactiveObj = reactive({a:1, b: 2})
            reactiveObj.a++ 
            const stateRef = readonly(reactiveObj)
            console.log(stateRef.a)   // 2
            reactiveObj.a++ 
            console.log(stateRef.a)   // 3
            console.log(reactiveObj == stateRef) // false

            // 2. ref传递一个对象，内部调用使用reactive进行数据响应
            const objrefReactive = {a:1,b:{c:2}}
            const refReactive = reactive(objrefReactive)
            const refToObj = ref(objrefReactive) 
            console.log('refReactive === refToObj',refReactive === refToObj.value) // true

            // 3. computed 有缓存，依赖的响应式数据变化的时候下次使用才会执行
            const computedObj = { a:1 ,b :2}
            const computedReactiveObj = computed(()=>{
                console.log('普通对象改变不能被计算属性所监听') // 执行一次 普通对象改变不能被计算属性所监听
                return computedObj.a + computedObj.b
            })
            console.log('computedReactiveObj.value',computedReactiveObj.value) // 3
            computedObj.b = 4 // 改变普通对象的属性
            console.log('computedReactiveObj.value',computedReactiveObj.value) // 3 因为依赖的数据不是响应的所以监听不到依赖的数据的变化，因此使用缓存中的值
            console.log('computedReactiveObj.value',computedReactiveObj.value)   // 3

            // 4. 面试题
            const statequest1 = reactive({a:'a', b: 'b'})
            const name = computed(()=>{ // 计算属性在使用的时候才执行
                console.log('computed执行')
                return statequest1.a + '+' + statequest1.b
            })
            console.log('ready') 
            console.log('statequest1 a', statequest1.a)
            console.log(' statequest1 b', statequest1.b)
            const imState = readonly(statequest1)
            console.log('imState === statequest1',imState === statequest1) 
            const stateRefquest1 = ref(statequest1)
            console.log('statequest1 === stateRefquest1', statequest1 === stateRefquest1.value) // ref 传递一个代理对象直接返回这个对象 所以相等
            statequest1.a = 'aa'
            statequest1.b = 'bb'
            console.log(imState.a,imState.b) 
            console.log('computed',name.value) 
            console.log('computed',name.value) // 依赖的响应式数据没有改变 读取缓存中的计算属性
            const onlyState1 = readonly(stateRefquest1)
            console.log(onlyState1.value === stateRefquest1.value)

            // ready   statequest1 a a   statequest1 b b   imState === statequest1 false 
            // statequest1 === stateRefquest1 true    aa  bb  computed执行 computed aa+bb computed aa+bb
            // false

        
            // 5. 面试题
            function useUser(){
                // 这里补全函数
                const originUser = reactive({})
                const user = readonly(originUser)
                const setUserName = (name) => {
                    originUser.name = name
                }
                const setUserAge = (age) => {
                    originUser.age = age
                }
                return {
                    user,  // 这里是一个只读的用户对象，响应式数据，默认为一个空对象
                    setUserName,  // 这里是一个函数，传入用户姓名，用于修改用户的名称
                    setUserAge, // 这里是一个函数，传入用户年龄，用于修改用户的年龄
                }
            }

            // 6 面试题
            function useDebounce(obj, duration){
                const originUser = reactive(obj)
                const value = readonly(originUser)
                let timer = ''
                const setValue = () => {
                    timer && clearTimeout(timer)
                    timer = setTimeout(()=>{
                        Object.keys(originUser).forEach(element => {
                           originUser.element = originUser[element]    
                        });
                    },duration)
                }
                return {
                    value, // 这里是一个只读属性，响应式数据，默认为参数值
                    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，
                              // 混合操作需要在duration得时间中防抖
                }
            }

        <h4>1. reactive</h4>
            作用：使普通对象具有响应式，递归深度代理对象中的所有属性，不能代理基本类型的数据
            参数：接收一个对象
            返回一个代理对象

            const state = reactive({})

        <h4>2. readonly</h4>
            作用：使得reactive响应式对象只能获取，不能修改，递归深度代理对象中的所有属性
            参数：接收一个对象或代理对象
            返回一个代理对象

            const state = readonly({}/reactiveObj)

        <h4>3. isProxy</h4>
            判断某个数据是否是由reactive和readonly创建的 proxy

            isProxy(obj)

        <h4>4. isReactive</h4>
            检查对象是否是 reactive创建的响应式 proxy

            注意：
                readonly代理reactive为只读的proxy，通过isReactive检测也是返回true
                isReactive(readonly(reactive({a:1}))) // true
                isReactive(readonly({a:1})) // false

        <h4>5. isReadonly</h4>
            检查对象是否是由readonly创建的只读 proxy。

        <h4>6. toRaw</h4>
            返回 reactive 或 readonly proxy 的原始对象。这是一个转义口，可用于临时读取
            而不会引起 proxy 访问/跟踪开销，也可用于写入而不会触发更改。不建议保留对原始
            对象的持久引用。请谨慎使用

            const foo = {}
            const reactiveFoo = reactive(foo)
            console.log(toRaw(reactiveFoo) === foo) // true

        <h4>7. markRaw</h4>
            标记一个对象，使其永远不会转换为 proxy。返回对象本身，但是它内部的属性还是可以被代理

            const markRawOriginObj =  {a:11, b: { c: 2}}   
            const markRawObj = markRaw(markRawOriginObj)
            const markRawAObj = reactive(markRawObj)
            const markRawOriginObjObj = reactive(markRawOriginObj)
            const markRawBObj = reactive(markRawOriginObj.b)
            console.log(isReactive(markRawAObj), isReactive(markRawOriginObjObj), isReactive(markRawBObj)) // false false true

        <h4>8. shallowReactive</h4>
            非深度代理对象属性，只代理对象的第一层，只有第一层改变的时候才能渲染视图更新, 大量数据优化的时候可以使用这个方法；
            如果代理的对象本身就是响应式对象，则不影响本身的响应式

            const obj = {
                foo: 1,
                nested: {
                    bar: 2
                }
            }
            const state = shallowReactive(obj)
            state.nested.bar = 3 // 视图不会更新
            const state2 = shallowReactive(reactive(obj)) // 如果代理的对象本身就是响应式对象，则不影响本身的响应式
            state2.nested.bar = 3 // 视图更新

        <h4>9. shallowReadonly</h4>
            非深度代理对象属性，只代理对象的第一层，只有第一层是只读的不可修改, 大量数据优化的时候可以使用这个方法；
        
        <h4>10. ref</h4>
            作用：使任何类型的数据具有响应式
            参数： 任何类型
                对value的访问是响应的
                如果传递的是一个对象则内部会通过调用reactive进行代理
                如果传递的是一个代理对象，则直接返回这个代理对象

            返回一个对象{ value: 代理对象 }

            const count = ref(0)
            console.log(count.value) // 0

             通过ref获取dom元素
            <div ref="dom">123</div>
            setup(){
                const dom = ref(null)
                onMounted(){ // dom元素渲染之后再获取使用
                    console.log(dom.value) // div元素
                }
                return {
                    dom
                }
            }

        <h4>11. unref</h4>
            转换为Ref类型的响应式对象
            unref(val) 等同于isRef(val) ? val.value: val

        <h4>12. toRef</h4>
            让指定对象的属性转换为Ref响应式格式,如果指定对象不是响应式的,那么通过toRef转换之后的属性不会更新视图,
            但是原始数据下的这个属性也会变化

            eg:1
            const state = reactive({a:1,b:2})
            const stateRef = toRef(state, 'a')
            stateRef.value++ // 会更新视图
            console.log(state.a) // 3 // 原始数据的a变成了3

            eg:2
            const state = {a:1} // 不是响应式的
            const stateRef = toRef(state,'a')
            stateRef++  // 视图不会被更新
            console.log(state.a) // 3

        <h4>13. toRefs</h4>
            把一个响应式对象的所有属性转换为ref格式，然后包装到一个plain-object中返回,
            如果指定对象不是响应式的,那么通过toRef转换之后的属性不会更新视图,
            但是原始数据下的这个属性也会变化

            const state = reactive({a:1,b:2})
            const stateAsRefs = toRefs(state)
            console.log(stateAsRefs) // {a: {value: xx}, b:{value:xx}}

            应用：
            setup(){
                const state1 = reactive({a:1,b:2})
                const state2 = reactive({c:3,d:4})
                return {
                    ...state1, // 直接平面展开的Reactive对象不再具有响应式功能 相当于{ a: 1, b: 2, c:3}
                    ...state2
                }
            }

            可以使用toRefs把响应式对象的属性的值转换为ref响应式对象，
            一般情况下composition function返回的数据均以toRefs进行转换，防止造成数据不能响应
            setup(){
                const state1 = reactive({a:1,b:2})
                const state2 = reactive({c:3,d:4})
                return {
                    ...toRefs(state1), // {a:{value:XXX},b:{value:XXX}}
                    ...toRefs(state2)
                }
            }

            eg:
                function useUser(){
                    const user = reactive({name:1,age:2})
                    return toRefs(user)
                }

                function useWork(){
                    const work = ref('打豆豆')
                    return {
                        work
                    }
                }

                setup(){
                    return{
                        ...useUser() // 不用担心展开之后不具有响应式
                        ...useWork()
                    }
                }

        <h4>14. isRef</h4>
            查看一个值是否是ref对象

        <h4>15. customRef</h4>
            自定义Ref，返回一个Ref, 可以显示的控制返回的值和显示的值，也可控制是否视图更新;
            customRef它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并应返回一个带有 get 和 set 的对象

            customRef((track, trigger)=>{
                return {
                    set(newsVal){ // 修改数据
                        // ...逻辑处理
                        value = newsVal
                        trigger() // 触发视图更新
                    },
                    get(){ // 获取数据
                        track() // 追踪数据的变化
                        // ...逻辑处理
                        return value     
                    }
                }
            })
            eg:

            function myRef(value){
                return customRef((track, trigger)=>{
                    // 异步请求数据
                    fetch(value).then(res=>(res.json())).then((res)=>{
                        value = res.data
                        trigger() // 触发更新视图
                    }).catch(err)   
                    return {
                        set(newsVal){ // 修改数据
                            value = newsVal
                            trigger() // 触发视图更新
                        },
                        get(){ // 获取数据
                           track() // 追踪数据的变化
                           return value     
                        }
                    }
                })
            }

            setup(){
                cosnt data = myRef('/api/list')
                return{
                    data
                }
            }

        <h4>16. shallowRef</h4>
            非深度代理对象属性，只代理value,只有value改变的时候才能渲染视图更新, 大量数据优化的时候可以使用这个方法

        <h4>17. triggerRef</h4>
            triggerRef(ref)
            主动触发视图更新,如果只想通过shallowRef来改变某一层的数据，并且需要视图更新可以使用这个方法

        <h4>18. computed</h4>
            参数： 函数
                根据响应式的数据得到一个计算属性，这个计算属性有缓存，当依赖的响应式
                数据变化的时候在下一次使用这个计算属性才会执行
            返回一个对象{ value: 代理对象 }

        <h4>19. watchEffect</h4>
            监听数据的变化，该函数在首次加载的时候就会执行，然后在监听的数据变化的时候会再次执行
            外部改变了当前监听属性中的属性，这里监听不到，这里只能监听到外部改变了当前属性或及其以上的祖先属性，兄弟属性或子属性改变不会被监听到

            const w = watchEffect(()=>{
                //函数中使用到的响应式数据都会被监听
            })
            w() // 停止监听

            eg:
                const weffState = reactive({ a: { c: 2}, b: 2})
                watchEffect(()=>{
                    console.log('监听state的变化', weffState.a) // 外部改变了a中的属性，这里监听不到，这里只能监听到外部改变了当前属性及其以上的祖先属性，兄弟属性改变不会被监听到
                })
                watchEffect(()=>{
                    console.log('监听state的变化', weffState.a.c) //可以被监听到
                })
                weffState.a.c++

        <h4>20. watch</h4>
            监听数据的变化
            无论是watchEffect还是Watch，当依赖变化的时候，回调的函数都是异步执行的(微任务)

            watch的使用场景：
                不希望回调函数一开始就执行
                需要监听到旧的数据
                纯粹的监听数据，但是在回调函数中不用使用到被监听的数据

            除了以上场景其他场景均使用 watchEffect

            watch可以监听多个数据，使用数组包裹
            可以传递第二个参数{immediate:true} 在首次的时候就执行

            watch和watchEffect区别：

            1. watch不能监听原始值，可以监听对象，如果想要监听对象上的原始值，可以监听一个函数并且这个函数返回这个对象的属性
            2. watch在没有配置第二个参数{immediate:true}时不会立即执行，而watchEffect会立即执行
            3. watch可以深度监听到对象下的属性的变化，而watchEffect只能监听到当前对象的属性的变化，他们都能监听到当前属性的祖先属性的变化

            eg:
                const state = reactive({a: { c: 1}, b: 2, d: 3, f: 4})
                // 监听对象上的原始属性
                watch(state.b,(newval, oldval)=>{  // 监听不到对象的属性并且这个属性是原始值
                    console.log('新1', newval, '旧1', oldval)
                })
                state.b++

                // 监听对象上的对象
                watch(state.a,(newval, oldval)=>{  // 可以监听到对象上的对象
                    console.log('新2', newval, '旧2', oldval) // 新2 2 旧2 2
                })
                state.a.c++

                // 对象上的其他属性改变无法监听到这个属性意外的属性, state的d改变，state.b和state.a都不会被监听到
                state.d ++ 

                // 通过函数包裹监听对象上的原始值属性的变化
                watch(()=>(state.f),(newVal,oldVal)=>{
                    console.log('新3', newVal, '旧3', oldVal)
                })

                // 监听多个数据
                watch([state.a,state.b],([new1,old1],[new2,old2])=>{})

        <h2>源码解析：</h2>
            <h4>通过proxy进行代理</h4>
            let obj = {a:1}
            let state = new Proxy(obj,{
                get(obj,key){
                    return obj[key]
                },
                set(obj,key,value){
                    obj[key] = value
                    // 更新ui
                    return true // 返回赋值成功，否则下次赋值就会失败报错
                }
            })

            <h4>1. 实现shallowReactive</h4>
            const shallowReactive = function(obj){
                return new Proxy(obj,{
                    get(obj,key){
                        return obj[key]
                    },
                    set(obj,key,value){
                        obj[key] = value
                        // 更新ui
                        console.log('更新ui')
                        return true // 返回赋值成功，否则下次赋值就会失败报错
                    }
                })
            }

            <h4>2. 实现shallowRef</h4>
            const shallowRef = function(val){
                return shallowReactive({value:val})
            }

            <h4>3. 实现reactive</h4>
            const reactive = function(obj){
                if(typeof obj === 'object'){ // reactive传递的必须是一个对象，否则报错
                    if(Object.prototype.toString.call(obj) === "[object Object]"){ // 是否是对象
                        for(let key in obj){
                            if(typeof obj[key] === 'object'){
                                obj[key] = reactive(obj[key])
                            }    
                        }
                    }else{ // 否则就是数组
                        obj.forEach((item,index)=>{
                            if(typeof item === 'object'){
                                obj[index] = reactive(item)
                            }
                        })
                    }
                }else{
                    new Error('params is not a Object')
                }
                return new Proxy(obj,{
                    get(obj,key){
                        return obj[key]
                    },
                    set(obj,key,value){
                        obj[key] = value
                        // 更新ui
                        console.log('更新ui')
                        return true // 返回赋值成功，否则下次赋值就会失败报错
                    }
                })
            }

            <h4>4. 实现ref</h4>
            const ref = function(val){
                return reactive({value:val})
            }

            <h4>5. 实现readonly</h4>
            const readonly = function(obj){
                if(typeof obj === 'object'){ // reactive传递的必须是一个对象，否则报错
                    if(Object.prototype.toString.call(obj) === "[object Object]"){ // 是否是对象
                        for(let key in obj){
                            if(typeof obj[key] === 'object'){
                                obj[key] = reactive(obj[key])
                            }    
                        }
                    }else{ // 否则就是数组
                        obj.forEach((item,index)=>{
                            if(typeof item === 'object'){
                                obj[index] = reactive(item)
                            }
                        })
                    }
                }else{
                    new Error('params is not a Object')
                }
                return new Proxy(obj,{
                    get(obj,key){
                        return obj[key]
                    },
                    set(obj,key,value){
                       console.warn(`${obj} is readonly`)
                    }
                })
            }
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>