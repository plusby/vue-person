import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import MetaInfo from 'vue-meta-info'  // 使用meta插件便于seo
import './assets/css/common.less';
import '@service/element-ui';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/monokai-sublime.css'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


Vue.use(VueCodeMirror)
Vue.use(VueHighlightJS);
Vue.use(MetaInfo)  // 使用meta
Vue.config.productionTip = false;
console.log()

new Vue({
  router,
  store,
  render: h => h(App),
  // mounted(){ // vue页面挂载之后进行预渲染
  //   document.dispatchEvent(new Event('render-active'))
  // }
}).$mount('#app')
