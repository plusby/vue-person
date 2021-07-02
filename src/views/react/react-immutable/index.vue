<template>
  <div>
    <h5>immutable和react-immutable的基本使用</h5>
    <pre>
      使用背景：
        react中，每次组件的属性props或者状态state改变，render函数就会重新执行返回新的数据结构，为了提高
        性能我们使用了shouldComponentUpdate生命周期函数，在这个生命周期函数中进行比较props或state是否
        发生了变化，发生了变化就返回true让当前组件执行render函数进行更新，否则就不执行这个render函数，
        如果props或state中某个对象的属性非常多，并且数据量非常大的时候，我们进行递归深度进行比较，这样也
        非常消耗性能，因此出现了immutable.js

      什么是immutable数据：
        immutable数据是一种利用结构共享形成的持久化数据结构，一旦有部分被修改，那么将会返回一个全新的对象，
        并且原来相同的节点会直接共享；(可持久化的数据结构，可持久化的数据结构强制约束所有的操作将返回新版本
        数据结构并且保持原有的数据结构不变，而不是直接修改原来的数据结构。这意味着所有的可持久化数据结构是不
        可变的。鉴于这个约束，第三方库在应用可持久化数据结构后可以更好的优化性能。)

        具体点来说，immutable 对象数据内部采用是多叉树的结构，凡是有节点被改变，那么它和与它相关的所有上级节点
        都更新。并且更新会返回全新的引用，即使是使用 浅比较 也能判断出数据的变化。
        所以，采用 immutable 既能够最大效率的更新数据结构（和普通的 javascript对象相比，在属性成千上万、嵌套比
        较深的情况下 ），又能够和现有的 PureComponent 或者 函数式组件的 memo api结对接，感知数据状态的变化，提
        高 React 渲染性能

      注意：
        一旦创建，就不能更改的数据，对immutable对象的任何修改或删除添加都会返回一个新的immutable对象
        
      使用场景：
        需要处理大量的数据，处理原始数据不需要使用这个工具库

    </pre>
    <pre>
      immutable常用api
        1. fromJs()
          将js对象转换为immutable对象
        
          import { fromJS } from 'immutable'
          const initialState = fromJS({
            name:'xiaoming', 
            age:'19'
          })

        2. toJS()
          将immutable数据结构转换为js对象

          import { fromJS } from 'immutable'
          const initialState = fromJS({
            name:'xiaoming', 
            age:'19'
          })
          initialState.toJS()

        3. is()
          对象两个对象进行比较
          和js中对象的比较不同，在js中两个对象的比较是引用地址，在immutable中比较是对象的hashcode和valueOf
          只要两个对象hashCode相同，值就相等

          import { is, fromJS } from 'immutable'

          const valA = fromJS({a: 1})
          const valB = fromJS({a: 1})
          is(valA, valB) // true

        4. get/getIn()
          获取数据结构中的属性

          import { fromJS } from 'immutable'
          let obj = fromJS({name: 'xiaoming'})
          let val = obj.get('name')


          let obj = fromJS({
            info: {
              name: 'xiaoming'
            }
          })

          let val = obj.getIn(['info', 'name']) // 传入的是数组

        5. set/setIn()
          给immutable对象的属性赋值

          let obj = fromJS({name: 'xiaoming'})
          obj.set('name', 'xiaohong')

          let obj = fromJS({
            info: {
              name: 'xiaoming'
            }
          })

          obj.setIn(['info', 'name'], 'xiaohong')

        6. merge
          合并数据

          let obj = fromJS({name: 'xiaoming'})
          obj.merge({
            name: 'xiaohong',
            age: 19
          }) // 修改了name，增加了age属性

        7. mergeDeep
            深度合并

            const { fromJS } = require('immutable');
            const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });

            const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
            // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

        8. updateIn([],(val)=>{})
            修改具体的某个属性

            const { fromJS } = require('immutable');
            const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ],d:6 } } });

            const nested3 = nested.updateIn([ 'a', 'b', 'd' ], value => value + 1);
            console.log(nested3);
            // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

            const nested4 = nested3.updateIn([ 'a', 'b', 'c' ], list => list.push(6));
            // Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }

        9. map({})
            类似js中的对象,通过set不会修改原有数据，而是返回一个新的数据被修改

            const m1 = Map({a:1,b:2,c:{d:3}})
            const m2 = m1.set('b', 4)
            console.log('map', m1,m2) // {a:1,b:2,c:{d:3}}  {a:1,b:4,c:{d:3}}
            m1.map((v, k) => {}) // 遍历map

        10. list([])
            类似js中的数组, js中数组的方法list几乎都支持

            const { List } = require('immutable');
            const list1 = List([ 1, 2 ]);
            const list2 = list1.push(3, 4, 5);  
            const list3 = list2.unshift(0);
            const list4 = list1.concat(list2, list3);

        11. toArray toObject  toJS
            immutable对象转成js数组
            注意： toArray toObject 浅转换，只转换最外层    toJS：深转换，全部转换，更耗费性能。

            const { Map, List } = require('immutable');
            const deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) });
            console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
            console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
            console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }


        项目中使用：

          npm i -D immutable react-immutable

          在redux中使用

          1. reducer中合并reducer使用redux-immutable中提供的combineReducers
            import { combineReducers } from 'redux-immutable'

            const reducer = combineReducers({
                MenuReducer,
                HomeReducer,
                CateReducer,
            })

          2. createStore传入
              import Immutable from 'immutable'
              // 使用immutable
              const initialState = Immutable.Map()
              const store  = createStore(
                  reducer,
                  initialState,
                  applyMiddleware(sagaMiddleware)
              )

          


          
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>