import get from 'lodash/get'
import L7DatePicker from './components/datepicker.vue'
import defaultConfig from './utils/config'

function install (Vue, options = {}) {
  if (install.installed) return
  const userMonthList = get(options, 'monthList')
  const userWeekDay = get(options, 'weekday')
  const userWeekStart = get(options, 'weekStart')
  if (userMonthList) defaultConfig.monthList = userMonthList
  if (userWeekDay) defaultConfig.weekday = userWeekDay
  if (userWeekStart) defaultConfig.weekStart = userWeekStart
  Vue.component(L7DatePicker.name, L7DatePicker)
}
export default {install}
