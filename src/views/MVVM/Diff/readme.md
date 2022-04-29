### Diff算法
* 最小量更新
* 遍历元素身上key的作用：是这个元素的唯一标识，告诉这个Diff算法，在修改前后这个元素是否变化，没有变化的不进行重新渲染，
  如果没有指定key,那么每次修改其中一个元素，这个父级元素下的所有子元素都会呗删除重新添加
* 只有同一个虚拟节点，才能最小量更新，否则就暴力删除，重新插入，同一个虚拟节点(节点相同，key相同)
  比如修改了父级元素的标签类型由div修改为ul,那么就不是同一个虚拟节点，父级下的所有子元素都会删除重新插入
* 最小量更新只进行同层比较，不会跨层比较