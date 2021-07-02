<template>
  <div>
    <pre>
      <h1>1. 快照沙箱</h1>
        当应用沙箱挂载或卸载时记录快照，在切换时依据快照恢复环境 (无法支持多实例)

        缺点：
          快照沙箱只能针对单实例应用场景，如果是多个实例同时挂载的情况则无法解决，这时只能通过Proxy代理沙箱来实现

        实现：
          class SnapshotSandbox{
            constructor(){
              this.proxy = window
              this.midifyPropsMap = {} // 保存差异
              this.active()
            }

            // 激活快照
            active(){ 
              this.windowSnapshot = {}  // 保存本次window上的属性
              for(let prop in window){
                if(window.hasOwnProperty(prop)){
                  this.windowSnapshot[prop] = window[prop]
                }
              }
              // 还原window上的属性
              Object.keys(this.midifyPropsMap).forEach(item=>{
                window[item] = this.midifyPropsMap[item]
              })
            }

            // 失活
            inActive(){
              for(let prop in window){
                if(window.hasOwnProperty(prop)){
                  if(this.windowSnapshot[prop] !== window[prop]){ // 失活的时候当前window上的属性和之前保存的不一样就保存到差异对象上
                    this.midifyPropsMap[prop] = window[prop] // 保存差异
                    window[prop] = this.windowSnapshot[prop] // 还原window
                  } 
                }
              }
            }
          }


          const sandBox = new SnapshotSandbox();

          let sandbox = new SnapshotSandbox();
          ((window) => {
              window.a = 1;
              window.b = 2;
              window.c = 3
              console.log(a,b,c) // 1 2 3
              sandbox.inActive();
              console.log(a,b,c) // undefined undefined undefined
              sandbox.active();
              console.log(a,b,c) // 1 2 3
          })(sandbox.proxy);

      <h1>2. Proxy 代理沙箱</h1>
        每个应用都创建一个proxy来代理window对象，好处是每个应用都是相对独立的，不需要直接更改全局的window属性。

        class ProxySandbox {
        constructor() {
            const rawWindow = window;
            const fakeWindow = {}
            const proxy = new Proxy(fakeWindow, {
                set(target, p, value) {
                    target[p] = value;
                    return true
                },
                get(target, p) {
                    return target[p] || rawWindow[p];
                }
            });
            this.proxy = proxy
        }
    }
    let sandbox1 = new ProxySandbox();
    let sandbox2 = new ProxySandbox();
    window.a = 1;
    ((window) => {
        window.a = 'hello';
        console.log(window.a)
    })(sandbox1.proxy);
    ((window) => {
        window.a = 'world';
        console.log(window.a)
    })(sandbox2.proxy);

    </pre>
  </div>
</template>

<script>
export default {
  mounted(){
    class SnapshotSandbox{

      constructor(){
        this.proxy = window
        this.midifyPropsMap = {} // 保存差异
        this.active()
      }

      // 激活快照
      active(){ 
        this.windowSnapshot = {}  // 保存本次window上的属性
        for(let prop in window){
          if(window.hasOwnProperty(prop)){
            this.windowSnapshot[prop] = window[prop]
          }
        }
        // 还原window上的属性
        Object.keys(this.midifyPropsMap).forEach(item=>{
          window[item] = this.midifyPropsMap[item]
        })
      }

      // 失活
      inActive(){
        for(let prop in window){
          if(window.hasOwnProperty(prop)){
            if(this.windowSnapshot[prop] !== window[prop]){ // 失活的时候当前window上的属性和之前保存的不一样就保存到差异对象上
              this.midifyPropsMap[prop] = window[prop] // 保存差异
              window[prop] = this.windowSnapshot[prop] // 还原window
            } 
          }
        }
      }
    }


    const sandBox = new SnapshotSandbox();

    let sandbox = new SnapshotSandbox();
    ((window) => {
        window.a = 1;
        window.b = 2;
        window.c = 3
        console.log(a,b,c) // 1 2 3
        sandbox.inActive();
        console.log(a,b,c) // undefined undefined undefined
        sandbox.active();
        console.log(a,b,c) // 1 2 3
    })(sandbox.proxy);
  }
}
</script>

<style>

</style>