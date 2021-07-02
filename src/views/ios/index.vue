<template>
  <div>
    <h2>ios中时间问题</h2>
    <pre>
      ios中时间不能使用-,
      比如''2019-02-19'
      new Date('2019-02-19').getTime() 获取到的都是NaN

      解决需要把-换成/
      "2020-06-19".replace(/\-/g, '/')

      new Date("2020-06-19".replace(/\-/g, '/')).getTime()
    </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>