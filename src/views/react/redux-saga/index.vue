<template>
  <pre>
    # redux-saga 学习总结
      redux-saga 是一个用于管理 Redux 应用异步操作的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件

      Reducers 负责处理 action 的 state 更新
      Sagas 负责协调那些复杂或异步的操作

      调用时机：
      Sagas 不同于thunks，thunks 是在action被创建时调用，而 Sagas只会在应用启动时调用，在 redux-saga 的世界里，所有的任务都通用 yield Effects 来完成

      核心api:

      Saga 辅助函数
        1. takeEvery

            takeEvery(type, 回调函数)

            一直处于监听中，当触发这个type的Action的时候就执行这个任务，并且每次都会执行这个任务，执行几次就有几个任务

        2. takeLatest
            takeEvery(type, 回调函数)
            一直处于监听中，当触发这个type的Action的时候就执行这个任务，但是每次执行都会取消上一个的执行，
            获得最后一次执行的结果，不管执行几次最终都是执行最后一次的任务

      effect的函数
        阻塞的effect: 等待执行函数返回结果之后再继续往下执行
        非阻塞的Effect： 不会等待执行函数返回结果就继续往下执行

        1. take
          take(type)
            返回一个action对象

          只监听一次，当触发这个type的action的时候执行，它没有回调函数，因此它的逻辑都是写在它的下一条执行语句，
          如果想要一直处于监听中可以使用While(true)循环，take是阻塞的effect

            eg:
            function* watchFetchData() {
              while(true) { // 通过while实现一直监听
                  // 监听一个type为 'FETCH_REQUESTED' 的action的执行，直到等到这个Action被触发，才会接着执行下面//// 的 yield fork(fetchData)  语句
                yield take('FETCH_REQUESTED');
                yield fork(fetchData); // 执行相关逻辑
              }
            }

        2. put
            put(action)
            和dispatch一样，触发一个action，计算新的state; put是阻塞的Effect

            eg:
            export function* toggleItemFlow() {
                let list = []
                // 发送一个type为 'UPDATE_DATA' 的Action，用来更新数据，参数为 `data：list`
                yield put({
                  type: actionTypes.UPDATE_DATA,
                  data: list
                })
            }

        3. call
            call(fn, ...args)
              返回执行函数的返回结果

            call函数就是调用其他函数的函数，它命令middlewara来调用fn函数，args为函数的参数。call是阻塞Ef
          
            eg:
            export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
            export function* removeItem() {
              try {
                  // 这里call 函数就调用了 delay 函数，delay 函数为一个返回promise 的函数
                return yield call(delay, 500)
              } catch (err) {
                yield put({type: actionTypes.ERROR})
              }
            }

        4. fork
            fork(fn, ...args)

            fork 函数和 call 函数很像，都是用来调用其他函数的，但是fork函数是非阻塞函数，也就是说，程序执行完 yield fork(fn， args) 这一行代码后，会立即接着执行下一行代码语句，而不会等待fn函数返回结果后，在执行下面的语句

          eg:
            import { fork } from 'redux-saga/effects'

            export default function* rootSaga() {
              // 下面的四个 Generator 函数会一次执行，不会阻塞执行
              yield fork(addItemFlow)
              yield fork(removeItemFlow)
              yield fork(toggleItemFlow)
              yield fork(modifyItem)
            }

        5. select
            select(selector, ...args)
            指示middle调用提供的选择器获取store上的state数据。类似store.getState()

            eg：
              export function* toggleItemFlow() {
                  // 通过 select effect 来获取 全局 state上的 `getTodoList` 中的 list
                  let tempList = yield select(state => state.getTodoList.list)
              }

      createSagaMiddleware()
          createSagaMiddleware 函数是用来创建一个 Redux 中间件，将 Sagas 与 Redux Store 链接起来
          sagas 中的每个函数都必须返回一个 Generator 对象，middleware 会迭代这个 Generator 并执行所有 
          yield 后的 Effect

      middleware.run(sagas, ...args)
        动态执行sagas，用于applyMiddleware阶段之后执行sagas
        sagas: Function: 一个 Generator 函数
        args: Array: 提供给 saga 的参数 (除了 Store 的 getState 方法)

        eg:
          import {createStore, applyMiddleware} from 'redux'
          import createSagaMiddleware from 'redux-saga'
          import reducers from './reducers'
          import rootSaga from './rootSaga'

          // 创建一个saga中间件
          const sagaMiddleware = createSagaMiddleware()

          // 创建store
          const store = createStore(
            reducers,
            将sagaMiddleware 中间件传入到 applyMiddleware 函数中
            applyMiddleware(sagaMiddleware)
          )

          // 动态执行saga，注意：run函数只能在store创建好之后调用
          sagaMiddleware.run(rootSaga)

          export default store

    # 高级功能
        1. 同步执行多个任务，使用yield []
            import { call } from 'redux-saga/effects'

            // 正确写法, effects 将会同步执行
            const [users, repos] = yield [
              call(fetch, '/users'),
              call(fetch, '/repos')
            ]

          当我们需要 yield 一个包含 effects 的数组， generator 会被阻塞直到所有的 effects 都执行完毕，或者当一个 effect 被拒绝 （就像 Promise.all 的行为）

        2. 非阻塞执行任务
            fork(fn, args)  
              返回一个任务对象
            
            和call的区别：
              call会阻塞执行任务，必须等到当前fn函数执行完毕返回结果之后才会继续往下执行
              fork不会阻塞执行任务，fn执行的同时继续往下走

        3. 取消执行指定任务
            cancel(task)

            eg:
              const task = yield fork(authorize, user, password)
              yield cancel(task)

            通过 yield canceled() 判断是否执行了取消任务  

        4. 同时启动多个任务，但是只需获取到其中一个
            race({})
              返回执行任务的结果
            eg:
              const {posts, timeout} = yield race({
                posts: call(fetchApi, '/posts'),
                timeout: call(delay, 1000)
              })

        takeEvery的实现：
          import { fork, take } from 'redux-saga'
          const takeEvery = (pattern, saga, ...args) => fork(function *(){
            while(true){
              const action = yield take(pattern)
              yield fork(saga, ...args.concat(action))
            }
          })

        takeLatest的实现：
          import { fork, take } from 'redux-saga'
          const takeLatest = (pattern, saga, ...args) => {
            let latest = 0
            while(true){
              const action = yield take(pattern)
              if(latest){
                yield cancel(latest)
              }
              latest = yield fork(saga, ...args.concat(action))
            }
          }


    #  简述react、redux、react-redux、redux-saga、dva之间的关系 

      1. React
      
        React 是一个用于构建用户界面的JavaScript库

        特点：
          它采用声明范式来描述应用，建立虚拟的dom,支持jsx语法，通过react构建组件，能够很好的去复用代码

        缺点：
          react抽离了dom,使我们构建页面变得更加简单，但是对于一个大型复杂应用来说，只有dom层的便捷是不够的，
          如何组织，管理应用的代码，如何在组件之间进行有效的通信，这些它都没有解决；因此还需要其他库配合才能
          应对大型应用

      2. redux

        它是将flux和函数式编程思想结合在一起形成的架构

        特点：
        视图与状态是一一对应的；所有的状态，都保存在一个对象里面；

        API：
        store：就是一个数据池，一个应用只有一个  
        state：一个 State 对应一个 View。只要 State 相同，View 就相同
        action：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，
              State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
              Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置。
        dispatch：它是view发出action的唯一方法；
        reducer：view发出action后，state要发生变化，reducer就是改变state的处理层，它接收action和state，
                  通过处理action来返回新的state； 
        subscribe：监听。监听state，state变化view随之改变


      3. react-redux

          react-redux是为了让redux更好的适用于React而生的一个库，使用这个库，需要遵循一些规范

        结构： 
          UI组件：就像一个纯函数，没有state,不做数据处理，只关注view,长什么样子完全取决于接收什么参数

          容器组件：关注行为派发和数据梳理，把处理好的数据交给UI组件呈现；react-redux规定，所有的UI组件都由用户
                  提供，容器组件则是由react-redux自动生成，也就是说，用户负责视觉层，状态管理则是全部交给它

          connect: 这个方法可以从UI组件生产容器组件，但容器组件的定位是处理数组，响应行为，因此，需要对UI组件
                  添加额外的东西，即mapStateToProps和mapDispatchToProps,也就是在组件外层加了一层state;

          mapStateToProps: 一个函数，建立一个从(外部的)state对象到(UI组件的)props对象的映射关系。它返回一个
                  拥有键值对的对象

          mapDispatchToProps: 用来建立UI组件的参数到store.dispatch方法的映射，它定义了哪些用户的操作应该当作
                  动作，他可以是一个函数，也可以是一个对象

        redux和react结合可以建立一个大型的应用，而且能够很好的管理状态，组织代码，但是对于异步问题还未解决

      4. redux-saga
          react中间件，更好的、更加容易的解决异步问题，redux-saga相当于在redux原有的数据流中多了一层，对Action
          进行监听，捕获到监听的Action后可以派生一个新的任务对state进行维护

          特点：
            通过Generator函数来创建，可以用同步的方式写异步的代码

        API:
          Effect: 一个简单的对象，这个对象包含一些给middleware解释执行的信息，所有的Effect都必须被yield才会执行
          put: 出发某个action，和dispatch的作用相同

      5. dva
          dva是一个基于Redux和redux-saga的数据流方案，然后为了简化开发体验，dva还额外内置了react-router和fetch
          可以理解为一个轻量级的应用框架；dva = rect-router + redux + redux-saga

          结构：
            state: 一个对象，保存整个应用的状态
            View: react组件构成的视图层
            action: 一个对象，描述事件
            connect: 一个函数，绑定State到View
            dispatch: 一个函数，发送Action到State

          model: 
            dva提供app.model这个对象，所有的应用逻辑都定义在他上面
            nameSpace: model的命名空间，整个应用的State,由多个小的Model的state以namespace为keu合成
            state: 该命名空间下的数据池
            effects：副作用处理函数
            reducers: 等同于redux里的reducer,接收action,同步更新state
            subscriptions: 订阅信息

      总结：
        react是一个用于构建用户界面的JavaScript库，但是它只是一个dom的抽象层，它不能很好的解决代码结构和组件之间的通信，
        对于大型应用这些是必不可少的，因此提出了flux概念，之后出现了redux.redux是将flux与函数式编程结合一起。redux的出现
        很好的解决了以上两个问题，为了使得React和redux更好的结合，又出现了React-redux,react-redux只能解决同步的数据，对于
        异步的数据又出现了React-saga,而dva就是react-router和react-redux和react-saga结合一起封装的一个库
  </pre>
</template>

<script>
export default {

}
</script>

<style>

</style>