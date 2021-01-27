import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routesList = [
  {
    label:"webpack",
    id:"webpack",
    children:[
      {
        label:'js',
        id:'js',
        path:"/js",
        children:[
          {
            label:'babel',
            id:'babel',
            path:"/babel",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/js/summary'),
          },
        ]
      },
      {
        label:'优化',
        id:'performance',
        path:"/performance",
        children:[
          {
            label:'prerenderSpaPlugin',
            id:'prerenderSpaPlugin',
            path:"/prerenderSpaPlugin",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/performance/prerender-spa-plugin'),
          },
          {
            label:'summary',
            id:'performance-summary',
            path:"/performance-summary",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/performance/summary'),
          },
        ]
      },
      {
        label:'css',
        id:'css',
        path:"/css",
        children:[
          {
            label:'css-loader',
            id:'css-loader',
            path:"/css-loader",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/css/css-loader'),
          },
          {
            label:'style-loader',
            id:'style-loader',
            path:"/style-loader",
            component: () => import(/* webpackChunkName: "function2" */ '../views/webpack/css/style-loader'),
          },
          {
            label:'summary',
            id:'summary',
            path:"/summary",
            component: () => import(/* webpackChunkName: "function2" */ '../views/webpack/css/summary'),
          },
          {
            label:'postcss',
            id:'postcss',
            path:"/postcss",
            component: () => import(/* webpackChunkName: "function2" */ '../views/webpack/css/postcss'),
          },
        ]
      },
      {
        label:'实战练习',
        id:'training',
        path:"/training",
        children:[
          {
            label:'webpack-react',
            id:'webpackReact',
            path:"/webpackReact",
            component: () => import(/* webpackChunkName: "function1" */ '../views/webpack/training/webpack-react/react'),
          },
        ]
      },
    ]
  },
  {
    label:'css',
    id:'css',
    path:"/css",
    children:[
      {
        label:'position',
        id:'position',
        path:"/position",
        component: () => import(/* webpackChunkName: "function2" */ '../views/css/position'),
      },
      {
        label:'grid',
        id:'grid',
        path:"/grid",
        component: () => import(/* webpackChunkName: "function2" */ '../views/css/grid'),
      },
    ]
  },
  {
    label:'算法',
    id:'algorithm',
    path:"/algorithm",
    children:[
      {
        label:'数据结构',
        id:'dataStructure',
        path:"/dataStructure",
        children:[
          {
            label:'总结',
            id:'summary',
            path:"/dataStructure/summary",
            component: () => import(/* webpackChunkName: "function2" */ '../views/algorithm/dataStructure/summary'),
          },
          {
            label:'线性数据结构',
            id:'linear',
            path:"/linear",
            component: () => import(/* webpackChunkName: "function2" */ '../views/algorithm/dataStructure/linear'),
          },
        ]
      },
    ]
  },
  {
    label:'性能优化',
    id:'performanceHome',
    path:"/performanceHome",
    children:[
      {
        label:'压缩图片的方式',
        id:'imgCompress',
        path:"/imgCompress",
        component: () => import(/* webpackChunkName: "function1" */ '../views/performance/imgCompress'),
      },
      {
        label:'http压缩',
        id:'httpCompress',
        path:"/httpCompress",
        component: () => import(/* webpackChunkName: "function1" */ '../views/performance/http-compress'),
      },
    ]
  },
  {
    label:'vue3',
    id:'vue3',
    path:"/vue3",
    children:[
      {
        label:'路由变化',
        id:'route',
        path:"/route",
        component: () => import(/* webpackChunkName: "function2" */ '../views/vue3/router'),
      },
      {
        label:'性能方面',
        id:'performance',
        path:"/performance",
        component: () => import(/* webpackChunkName: "function2" */ '../views/vue3/performance'),
      },
      {
        label:'vite',
        id:'vite',
        path:"/vite",
        component: () => import(/* webpackChunkName: "function2" */ '../views/vue3/vite'),
      },
      {
        label:'api',
        id:'api',
        path:"/api",
        component: () => import(/* webpackChunkName: "function2" */ '../views/vue3/api'),
      },
    ]
  },
  {
    label:'面试题',
    id:'InterviewQuest',
    path:"/InterviewQuest",
    children:[
      {
        label:'面试题',
        id:'InterviewQuest',
        path:"/InterviewQuest",
        component: () => import(/* webpackChunkName: "function2" */ '../views/interviewQuest/index'),
      },
    ]
  },
  {
    label:'长列表优化',
    id:'LongList',
    path:"/LongList",
    children:[
      {
        label:'长列表优化',
        id:'LongList',
        path:"/LongList",
        component: () => import(/* webpackChunkName: "function2" */ '../views/longList/index'),
      },
    ]
  },
]

const routes = [
  {
    path: '*',
    redirect: '/babel'
  },
  // 首页
  {
    path: '/babel',
    name: 'babel',
    component: () => import(/* webpackChunkName: "home" */ '../views/webpack/js/summary'),
  },
  // { 
  //   path: '/brand-detail/:code', 
  //   component: () => import(/* webpackChunkName: "brandDetail" */ '../views/brand/detail'),
  //   props: true,
  //   name: 'brandDetail'    
  // }
]

// 添加路由
function addRoute(arr){
  for(let i=0;i<arr.length;i++){
    if(arr[i].component){
      routes.push({path:arr[i]['path'],component:arr[i]['component']})
    }
    if(arr[i].children){addRoute(arr[i].children)}
  }
}
addRoute(routesList);
console.log(routes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)  
  next()
});

export  {
  routesList,
  router
} 
