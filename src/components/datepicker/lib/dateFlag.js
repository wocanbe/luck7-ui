import isDate from 'lodash/isDate'
import isInteger from 'lodash/isInteger'
import isString from 'lodash/isString'
const token = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|tt|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g
function pad (val, len) {
  val = String(val)
  len = len || 2
  while (val.length < len) {
    val = '0' + val
  }
  return val
}
const formatFlags = {
  yyyy (dateObj) {
    return dateObj.getFullYear()
  },
  yy (dateObj) {
    return dateObj.getFullYear().substr(2)
  },
  MM (dateObj) {
    return pad(dateObj.getMonth() + 1)
  },
  M (dateObj) {
    return dateObj.getMonth() + 1
  },
  dd (dateObj) {
    return pad(dateObj.getDate())
  },
  d (dateObj) {
    return dateObj.getDate()
  },
  hh (dateObj) {
    return pad(dateObj.getHours())
  },
  h (dateObj) {
    return dateObj.getHours()
  },
  mm (dateObj) {
    return pad(dateObj.getMinutes())
  },
  m (dateObj) {
    return dateObj.getMinutes()
  },
  ss (dateObj) {
    return pad(dateObj.getSeconds())
  },
  s (dateObj) {
    return dateObj.getSeconds()
  },
  tt (dateObj) {
    return dateObj.getTime()
  }
}

const parseFlags = {
  yyyy (dateObj, val) {
    dateObj.setFullYear(val)
  },
  yy (dateObj, val) {
    dateObj.setYear(val)
  },
  M (dateObj, val) {
    dateObj.setMonth(parseInt(val) - 1)
  },
  d (dateObj, val) {
    dateObj.setDate(val)
  },
  h (dateObj, val) {
    dateObj.setHours(val)
  },
  m (dateObj, val) {
    dateObj.setMinutes(val)
  },
  s (dateObj, val) {
    dateObj.setSeconds(val)
  },
  tt (dateObj, val) {
    dateObj.setTime(val)
  }
}
parseFlags.MM = parseFlags.M
parseFlags.dd = parseFlags.d
parseFlags.hh = parseFlags.h
parseFlags.mm = parseFlags.m
parseFlags.ss = parseFlags.s

function format (val, mask) {
  return mask.replace(token, function ($0) {
    return $0 in formatFlags ? formatFlags[$0](val) : $0.slice(1, $0.length - 1)
  })
}

function parse (val, mask) {
  let dateObj
  if (isDate(val)) {
    dateObj = val
  } else if (isString(val)) {
    try {
      dateObj = new Date(val)
      if (isNaN(dateObj.getDate())) {
        throw new Error('不合法的日期格式')
      }
    } catch (e) {
      dateObj = new Date(631123200000)
      const datePat = mask.match(token)
      if (datePat !== null) {
        for (const key of datePat) {
          if (key in parseFlags) {
            const value = val.substr(mask.indexOf(key), key.length)
            parseFlags[key](dateObj, value)
          }
        }
      }
    }
  } else if (isInteger(val)) {
    try {
      dateObj = new Date(val)
    } catch (e) {
      console.warn('错误的时间: ' + val)
      dateObj = new Date()
    }
  } else {
    dateObj = new Date()
  }
  return dateObj
}
export {format, parse}
