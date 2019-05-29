import isFunction from 'lodash/isFunction'
import isInteger from 'lodash/isInteger'
import defaultConfig from './config'
import dateUtil from '../lib/date'

const selectOrder = ['year', 'month', 'date', 'hour', 'minute', 'second']
function formatTime (text) {
  return text < 10 ? '0' + text : '' + text
}
function getOutTarget (date1, date2, start) {
  let i = selectOrder.indexOf(start) + 1
  /* eslint-disable no-fallthrough */
  switch (selectOrder[i]) {
    case 'month':
      if (date1.getMonth() < date2.getMonth()) return selectOrder.indexOf('month') - 1
    case 'date':
      if (date1.getDate() < date2.getDate()) return selectOrder.indexOf('date') - 1
    case 'hour':
      if (date1.getHours() < date2.getHours()) return selectOrder.indexOf('hour') - 1
    case 'minute':
      if (date1.getMinutes() < date2.getMinutes()) return selectOrder.indexOf('minute') - 1
    case 'second':
      if (date1.getSeconds() < date2.getSeconds()) return selectOrder.indexOf('second') - 1
  }
  /* eslint-enable no-fallthrough */
  return 99
}

function getWeekItem () {
  const weekitems = []
  let startDay = defaultConfig.weekStart
  for (let i = 0; i < defaultConfig.weekday.length; i++) {
    weekitems.push({text: defaultConfig.weekday[startDay]})
    startDay++
    if (startDay === defaultConfig.weekday.length) startDay -= defaultConfig.weekday.length
  }
  return weekitems
}

class DateTable {
  constructor (options = {}) {
    if (options.format) {
      this.dateFormat = options.format
    } else {
      this.dateFormat = 'yyyy-MM-dd'
    }
    this.range = {
      start: undefined,
      end: undefined
    }
    if (options.range) this.setRange(options.range)
    if (isFunction(options.check)) this.check = options.check
    if (isFunction(options.disabled)) this.disabled = options.disabled
    if (isInteger(options.weekStart)) {
      this.weekStart = options.weekStart > 0 ? 1 : 0
    } else {
      this.weekStart = defaultConfig.weekStart
    }
    this.weekitems = getWeekItem()
  }
  setRange (range) {
    if (range.start === undefined) {
      this.range.start = undefined
    } else {
      this.range.start = dateUtil.parse(range.start, this.dateFormat)
    }
    if (range.end === undefined) {
      this.range.end = undefined
    } else {
      const endRange = dateUtil.parse(range.end, this.dateFormat)
      if (this.range.start) {
        if (endRange < this.range.start) console.error('结束时间不能早于开始时间')
        else this.range.end = endRange
      } else {
        this.range.end = endRange
      }
    }
  }
  setValue (dateObj) {
    this.currentObj = dateUtil.parse(dateObj, this.dateFormat)
    let outRange = 99
    if (this.range.start && this.currentObj < this.range.start) {
      outRange = getOutTarget(this.currentObj, this.range.start, 'year')
    }
    if (this.range.end && this.currentObj > this.range.end) {
      outRange = getOutTarget(this.range.end, this.currentObj, 'year')
    }
    return {
      outRange,
      value: dateUtil.format(this.currentObj, this.dateFormat)
    }
  }
  getValue () {
    return dateUtil.format(this.currentObj, this.dateFormat)
  }
  setItemValue (type, value) {
    switch (type) {
      case 'year':
        this.currentObj.setFullYear(value)
        break
      case 'month':
        this.currentObj.setMonth(value)
        break
      case 'date':
        this.currentObj.setDate(value)
        break
      case 'hour':
        this.currentObj.setHours(value)
        break
      case 'minute':
        this.currentObj.setMinutes(value)
        break
      case 'second':
        this.currentObj.setSeconds(value)
        break
    }
    let outRange = 99
    if (this.range.start && this.currentObj < this.range.start) {
      outRange = getOutTarget(this.currentObj, this.range.start, type)
    }
    if (this.range.end && this.currentObj > this.range.end) {
      outRange = getOutTarget(this.range.end, this.currentObj, type)
    }
    if (this.check && !this.check(this.currentObj)) {
      outRange = selectOrder.indexOf(type)
    }

    return {
      outRange,
      value: dateUtil.format(this.currentObj, this.dateFormat)
    }
  }
  // getItemValue (type) {
  //   switch (type) {
  //     case 'year': return this.currentObj.getFullYear()
  //     case 'month': return this.currentObj.getMonth()
  //     case 'date': return this.currentObj.getDate()
  //     case 'hour': return this.currentObj.getHours()
  //     case 'minute': return this.currentObj.getMinutes()
  //     case 'second': return this.currentObj.getSeconds()
  //     default: return this.currentObj.getDate()
  //   }
  // }
  getItems (type) {
    switch (type) {
      case 'year':
        return dateUtil.getYearList(this.currentObj, {
          disabled: this.disabled,
          range: this.range
        })
      case 'month':
        return dateUtil.getMonthList(this.currentObj, {
          disabled: this.disabled,
          range: this.range,
          monthList: defaultConfig.monthList
        })
      case 'date':
        return this.weekitems.concat(dateUtil.getDateList(this.currentObj, {
          disabled: this.disabled,
          range: this.range,
          weekStart: this.weekStart
        }))
      case 'hour':
        return dateUtil.getHourList(this.currentObj, {
          disabled: this.disabled,
          range: this.range
        })
      case 'minute':
        return dateUtil.getMinuteList(this.currentObj, {
          disabled: this.disabled,
          range: this.range
        })
      case 'second':
        return dateUtil.getSecondList(this.currentObj, {
          disabled: this.disabled,
          range: this.range
        })
      default:
        return []
    }
  }
  getFileds () {
    const fileds = []
    const values = {}
    let target = false
    if (this.dateFormat.indexOf('yy') > -1) {
      fileds.push({class: 'char4', name: 'year', order: 0})
      const localVal = this.currentObj.getFullYear()
      values['year'] = {
        text: '' + localVal,
        value: localVal
      }
      if (!target) target = 'year'
    }
    if (this.dateFormat.indexOf('M') > -1) {
      fileds.push({name: 'month', order: 1})
      const localVal = this.currentObj.getMonth()
      values['month'] = {
        text: formatTime(localVal + 1),
        value: localVal
      }
      if (!target) target = 'month'
    }
    if (this.dateFormat.indexOf('d') > -1) {
      fileds.push({name: 'date', order: 2})
      const localVal = this.currentObj.getDate()
      values['date'] = {
        text: formatTime(localVal),
        value: localVal
      }
      if (!target) target = 'date'
    }
    if (this.dateFormat.indexOf('h') > -1) {
      fileds.push({name: 'hour', order: 3})
      const localVal = this.currentObj.getHours()
      values['hour'] = {
        text: formatTime(localVal),
        value: localVal
      }
      if (!target) target = 'hour'
    }
    if (this.dateFormat.indexOf('m') > -1) {
      fileds.push({name: 'minute', order: 4})
      const localVal = this.currentObj.getMinutes()
      values['minute'] = {
        text: formatTime(localVal),
        value: localVal
      }
      if (!target) target = 'minute'
    }
    if (this.dateFormat.indexOf('s') > -1) {
      fileds.push({name: 'second', order: 5})
      const localVal = this.currentObj.getSeconds()
      values['second'] = {
        text: formatTime(localVal),
        value: localVal
      }
      if (!target) target = 'year'
    }
    return {
      fileds,
      target,
      values
    }
  }
}

export default DateTable
