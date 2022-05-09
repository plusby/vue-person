import Observer from "./observer.js";


export default function (data) {
  if (typeof data !== 'object') return
  let ob = data.__ob__
  if (!ob) {
    ob = new Observer(data)
  }
  return ob
}