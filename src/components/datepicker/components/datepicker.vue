<template lang="pug">
- var prefix='lt-date-picker';
div
  slot(v-if="!single" :show="showPicker" :value="value")
    input(
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      @focus="showPicker"
      @click="showPicker"
      readonly
    )
  div(class=prefix v-if="isShow||single" :class="{'single':single}")
    div(class=prefix+'-title' v-if="title") {{title}}
    ul(class=prefix+'-fields')
      li.field(v-for="filed in pickerFileds" @click="viewTarget=filed.name")
        span(:class="[filed.class, {'active': filed.name==viewTarget, 'out': filed.order>outOrder}]")
          |{{fieldValue[filed.name].text}}
    div(class=prefix+'-table')
      ul(:class="tableClass")
        li(class=prefix+'-cell' v-for="item in dateGroup")
          em(
            v-if="item.value!=undefined"
            @click="handleItem(item)"
            :class="itemCls(item)"
          ) {{item.text}}
          span(v-else) {{item.text}}
    div(class=prefix+'-confirm')
      .confirm-cancel(@click="onClean") 清除
      .confirm-ok(:class="{'disable':outOrder<99}" @click="onOk") 确认
</template>
<script>
import DateTime from '../utils/dateTime'

// const selectOrder = ['year', 'month', 'date', 'hour', 'minute', 'second']

export default {
  name: 'L7DatePicker',
  props: {
    name: String,
    placeholder: String,
    disabled: String,
    value: [String, Number],
    title: String,
    options: Object,
    single: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      fieldValue: {},
      viewTarget: 'date',
      outOrder: 99,
      isShow: false
    }
  },
  created () {
    this.table = this.initDate()
    document.addEventListener('click', this.hidePicker)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hidePicker)
  },
  computed: {
    pickerFileds () {
      const filedsObj = this.table.getFileds()
      this.viewTarget = filedsObj.target
      this.fieldValue = filedsObj.values
      return filedsObj.fileds
    },
    tableClass () {
      return this.viewTarget + '-' + 'picker'
    },
    dateGroup () {
      return this.table.getItems(
        this.viewTarget,
        this.currentValue
      )
    },
  },
  methods: {
    initDate () {
      const table = new DateTime(this.options)
      const localDate = table.setValue(this.value)
      this.currentValue = localDate.value
      this.outOrder = localDate.outRange
      // 当输入的时间格式不符合要求的时间格式时，自动重置为符合要求的时间格式
      this.$emit('input', table.getValue())
      return table
    },
    showPicker () {
      this.isShow = true
    },
    hidePicker (e) {
      if (this.$el.contains(e.target)) return false
      if (this.isShow) {
        this.isShow = false
      }
    },
    handleItem (item) {
      if (!item.disable) {
        const localDate = this.table.setItemValue(this.viewTarget, item.value)
        this.currentValue = localDate.value
        if (item.showText) {
          this.fieldValue[this.viewTarget].text = item.showText
        } else {
          this.fieldValue[this.viewTarget].text = item.text
        }
        this.fieldValue[this.viewTarget].value = item.value
        this.outOrder = localDate.outRange
      }
    },
    onOk () {
      if (this.outOrder === 99) this.handleChange(this.currentValue)
    },
    onClean () {
      this.handleChange(undefined)
    },
    handleChange (val) {
      this.$emit('input', val)
      this.isShow = false
    },
    changeTable (backFun) {
      backFun()
    },
    itemCls (item) {
      const backCls = []
      backCls.push(item.class)
      if (item.disable) backCls.push('disable')

      if (item.value === this.fieldValue[this.viewTarget].value) {
      // if (item.value === this.table.getItemValue(this.viewTarget, this.currentValue)) {
        backCls.push('select')
      }
      return backCls
    }
  },
  watch: {
    value (val) {
      if (val !== this.currentValue) {
        this.table.setValue(val)
        this.currentValue = this.table.getValue()
      }
    },
    // currentValue: {
    //   immediate: true,
    //   handler (val) {
    //     this.$emit('input', val)
    //   }
    // }
  }
}
</script>
