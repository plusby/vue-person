<template>
  <div>
    <pre>
      <h3>vue3为什么要使用Proxy代替defineProperty</h3>
      1. Proxy观察的类型比defineProperty更加丰富
      2. defineProperty是劫持对象的属性，而对于新增对象则需要再次defineProperty，而Proxy是劫持整个对象的
      3. defineProperty是直接修改原来的对象，而Proxy是修改代理对象

      注意: Proxy 不兼容IE，也没有 polyfill, defineProperty 能支持到IE9

      
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>