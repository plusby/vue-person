
<template>
  <div class="isolation-wrap">
    <pre>
      css 隔离
      1. css-in-js
        缺点: 元素中写入大量的Css，不利于维护

      2. css modules(目前比较广泛使用)

      3. css shadow
        把指定的元素设置为独立的模块，这个模块中的css,html和js不受外部的干扰
        html中的video标签就是使用shadow DOM的一个案例。使用它时，你在html只会看到一个video标签，但实际上播放器上还有一系列按钮和其他操作，这些就都是封装到shadow dom中的，对外界是不可见的。
      
      eg:
        这是一个p元素
        <p>这是一个p元素</p>
        这是一个具有shadow的元素
        <div id='shadow'></div>

        代码：
          html: 
            p 这是一个p元素 p 
            div id='shadow'  div

          js部分：
            const shadow = document.getElementById('shadow')
            // 给指定元素开始shadow并且设置mode为close不影响外部元素
            let shadowDOM = shadow.attachShadow({mode: 'closed'})
            let p = document.createElement('p')
            p.innerHTML = '这是shadow中的p元素'
            let style = document.createElement('style')
            style.textContent = `
              p{
                color: red;
              }
            `
            shadowDOM.appendChild(style) //把样式添加到shadowDOM元素中
            shadowDOM.appendChild(p)  // 把子元素添加到shadowDOM元素中

      
    </pre>
  </div>
</template>

<script>
export default {
  mounted(){
    const shadow = document.getElementById('shadow')
    let shadowDOM = shadow.attachShadow({mode: 'closed'})
    let p = document.createElement('p')
    p.innerHTML = '这是shadow中的p元素'
    let style = document.createElement('style')
    style.textContent = `
      p{
        color: red;
      }
    `
    shadowDOM.appendChild(style) //把样式添加到shadowDOM元素中
    shadowDOM.appendChild(p)  // 把子元素添加到shadowDOM元素中


  },
  methods: {

  }
}
</script>

<style>

</style>