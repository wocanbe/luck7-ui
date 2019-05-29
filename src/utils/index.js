// 判断参数是否是其中之一
function oneOf (value, validList) {
  for (var i = 0; i < validList.length; i++) {
    if (value === validList[i]) return true
  }
  return false
}

function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
export {
  oneOf,
  camelcaseToHyphen
}
