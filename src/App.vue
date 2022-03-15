<template>
  <div id="app">
    <my-header></my-header>
    <div class="container">
      <my-nav v-show="value"></my-nav>
      <el-switch
        class="switch"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      <div class="main">
        <router-view/>
      </div>


    </div>
  </div>
</template>
<script>
import myHeader from '@view/header';
import myNav from '@view/side';

export default {
  components: {
    myHeader,
    myNav,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      value: true
    }
  }
}
</script>
<style scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.main {
  flex: 1;
  position: relative;
  overflow: auto;
}

.main::after {
  position: absolute;
  content: '';
  width: 1px;
  height: 100%;
  background-color: #e6e6e6;;
  left: 0;
  top: -10px;
}

.switch {
  position: fixed;
  bottom: 20px;
  left: 20px;
}
</style>