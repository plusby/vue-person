
/*
    找出对象中字符串的值

    obj = {
      a: {
        b: 1
      }
    }

    lookup(obj, 'a.b') // 1
 */

export default function lookup (obj, keyStr) {
  keyStr = keyStr.trim()
  console.log(keyStr, obj[keyStr])
  if (keyStr === '.') {
    return obj[keyStr]
  }
  const arr = keyStr.split('.')
  let val = obj
  for (let i = 0; i < arr.length; i++) {
    val = val[arr[i]]
  }
  return val
}