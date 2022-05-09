import lookup from "./lookup.js";
import renderTemplate from "./renderTemplate.js";

export  default function parseArray(token, data){
  console.log('token', token)
  const value = lookup(data, token[1])
  let str = ''
  for(let i = 0; i < value.length; i++){
    str += renderTemplate(token[2], {
      '.':value[i],
      ...value[i],
    })
  }
  return str
}