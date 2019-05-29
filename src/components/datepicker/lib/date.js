import {format, parse} from './dateFlag'

function formatTime (text) {
  return text < 10 ? '0' + text : '' + text
}

const dateUtil = {
  getFirstOfMonth (dateObj) {
    const backDate = new Date(dateObj.getTime())
    backDate.setDate(1)
    backDate.setHours(0)
    backDate.setMinutes(0)
    backDate.setSeconds(0)
    backDate.setMilliseconds(0)
    return backDate
  },
  getFirstOfWeek (dateObj, weekStart = 0) {
    const backDate = new Date(dateObj.getTime())
    backDate.setDate(dateObj.getDate() - dateObj.getDay() + weekStart)
    backDate.setHours(0)
    backDate.setMinutes(0)
    backDate.setSeconds(0)
    backDate.setMilliseconds(0)
    return backDate
  },
  getLastOfMonth (dateObj) {
    const backDate = new Date(dateObj.getTime())
    backDate.setMonth(dateObj.getMonth() + 1)
    backDate.setDate(0)
    backDate.setHours(23)
    backDate.setMinutes(59)
    backDate.setSeconds(59)
    backDate.setMilliseconds(999)
    return backDate
  },
  getLastOfWeek (dateObj, weekStart = 0) {
    const backDate = new Date(dateObj.getTime())
    backDate.setDate(dateObj.getDate() - dateObj.getDay() + 6 + weekStart)
    backDate.setHours(23)
    backDate.setMinutes(59)
    backDate.setSeconds(59)
    backDate.setMilliseconds(999)
    return backDate
  },
  getFirstOfDateTable (dateObj, weekStart = 0) {
    return this.getFirstOfWeek(this.getFirstOfMonth(dateObj), weekStart)
  },
  getLastOfDateTable (dateObj, weekStart = 0) {
    return this.getLastOfWeek(this.getLastOfMonth(dateObj), weekStart)
  },
  format,
  parse,
  getYearList (dateObj, options) {
    let items = []
    let localYear
    for (let i = -7; i < 8; i++) {
      let isDisable = false
      localYear = new Date(`${dateObj.getFullYear() + i}/01/01 00:00:00`)
      const value = localYear.getFullYear()
      if (options.disabled) isDisable = options.disabled(localYear, 'year')
      if (options.range.end && localYear > options.range.end) isDisable = true
      localYear = new Date(`${dateObj.getFullYear() + i}/12/31 23:59:59`)
      localYear.setMilliseconds(999)
      if (options.range.start && localYear < options.range.start) isDisable = true

      if (isDisable) {
        items.push({text: value, disable: true, value})
      } else {
        items.push({text: value, value})
      }
    }
    return items
  },
  getMonthList (dateObj, options) {
    let items = []
    const localMonth = new Date(`${dateObj.getFullYear()}/01/01 00:00:00`)
    const localEndMonth = new Date(`${dateObj.getFullYear()}/01/01 23:59:59`)
    localEndMonth.setMilliseconds(999)
    for (let i = 0; i < 12; i++) {
      let isDisable = false
      localMonth.setMonth(i)
      const lastDate = this.getLastOfMonth(localMonth).getDate()
      localEndMonth.setDate(1) // 一定要加上这一句，否则获取月份最后一条可能跑到下个月
      localEndMonth.setMonth(i)
      localEndMonth.setDate(lastDate)
      const value = localMonth.getMonth()
      if (options.disabled) isDisable = options.disabled(localMonth, 'month')
      if (options.range.start && localEndMonth < options.range.start) isDisable = true
      if (options.range.end && localMonth > options.range.end) isDisable = true

      if (isDisable) {
        items.push({text: options.monthList[i], showText: formatTime(value + 1), disable: true, value})
      } else {
        items.push({text: options.monthList[i], showText: formatTime(value + 1), value})
      }
    }
    return items
  },
  getDateList (dateObj, options) {
    const localDate = this.getFirstOfMonth(dateObj)
    const localEndDate = this.getLastOfMonth(dateObj)
    let i = 0
    let items = []

    const localDay = localDate.getDay()
    let dayDiff = localDay - options.weekStart
    if (dayDiff < 0) dayDiff += 7
    for (i = 0; i < dayDiff; i++) {
      items.push({})
    }
    i = 1
    const endDate = this.getLastOfMonth(dateObj)
    while (i < 32) {
      localDate.setDate(i)
      localEndDate.setDate(i)
      if (localDate > endDate) break

      let isDisable = false
      if (options.disabled) isDisable = options.disabled(localDate, 'date')
      if (options.range.start && localEndDate < options.range.start) isDisable = true
      if (options.range.end && localDate > options.range.end) isDisable = true

      const classList = []

      if (isDisable) {
        items.push({class: classList, text: formatTime(i), disable: true, value: i})
      } else {
        items.push({class: classList, text: formatTime(i), value: i})
      }

      i++
    }
    return items
  },
  getHourList (dateObj, options) {
    let items = []
    const localHour = new Date(dateObj.getTime())
    localHour.setMinutes(0)
    localHour.setSeconds(0)
    localHour.setMilliseconds(0)
    const localEndHour = new Date(dateObj.getTime())
    localEndHour.setMinutes(59)
    localEndHour.setSeconds(59)
    localEndHour.setMilliseconds(999)
    for (let i = 0; i < 24; i++) {
      let isDisable = false
      localHour.setHours(i)
      localEndHour.setHours(i)
      if (options.disabled) isDisable = options.disabled(localHour, 'hour')
      if (options.range.start && localEndHour < options.range.start) isDisable = true
      if (options.range.end && localHour > options.range.end) isDisable = true

      if (isDisable) {
        items.push({text: formatTime(i), disable: true, value: i})
      } else {
        items.push({text: formatTime(i), value: i})
      }
    }
    return items
  },
  getMinuteList (dateObj, options) {
    let items = []
    const localMinute = new Date(dateObj.getTime())
    localMinute.setSeconds(0)
    localMinute.setMilliseconds(0)
    const localEndMinute = new Date(dateObj.getTime())
    localEndMinute.setSeconds(59)
    localEndMinute.setMilliseconds(999)
    for (let i = 0; i < 60; i++) {
      let isDisable = false
      localMinute.setMinutes(i)
      localEndMinute.setMinutes(i)
      if (options.disabled) isDisable = options.disabled(localMinute, 'minute')
      if (options.range.start && localEndMinute < options.range.start) isDisable = true
      if (options.range.end && localMinute > options.range.end) isDisable = true

      if (isDisable) {
        items.push({text: formatTime(i), disable: true, value: i})
      } else {
        items.push({text: formatTime(i), value: i})
      }
    }
    return items
  },
  getSecondList (dateObj, options) {
    let items = []
    const localSecond = new Date(dateObj.getTime())
    localSecond.setMilliseconds(0)
    const localEndSecond = new Date(dateObj.getTime())
    localEndSecond.setMilliseconds(999)
    for (let i = 0; i < 60; i++) {
      let isDisable = false
      localSecond.setSeconds(i)
      localEndSecond.setSeconds(i)
      if (options.disabled) isDisable = options.disabled(localSecond, 'second')
      if (options.range.start && localEndSecond < options.range.start) isDisable = true
      if (options.range.end && localSecond > options.range.end) isDisable = true

      if (isDisable) {
        items.push({text: formatTime(i), disable: true, value: i})
      } else {
        items.push({text: formatTime(i), value: i})
      }
    }
    return items
  },
}

export default dateUtil
