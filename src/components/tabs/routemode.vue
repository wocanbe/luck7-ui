<template lang="pug">
- var prefix = 'lt-tabs';
div(class=prefix :class="className")
  ul(class=prefix+'-title')
    li(
      v-for="(item,index) in navList"
      :class="{'lt-tabs-this':index===activeOrder}"
      :key="index"
      @click="handleChange(index)"
    )
      L7Icon(
        v-if="item.icon"
        v-bind="item.icon"
        style="margin-right:6px;"
      )
      |{{item.label}}
      L7Badge(
        v-if="item.badge"
        v-bind="item.badge"
        style="margin-left:8px"
      )
      L7Icon(class=prefix+'-close' type="close" v-if="item.closable" @click.native.stop="handleRemove(index)")
  div(class=prefix+'-content' :class="userClass" :style="userStyle")
    router-view
</template>
<script>
import L7Icon from 'luck7-ui/src/components/icon/icon'
import L7Badge from 'luck7-ui/src/components/badge/badge'
export default {
  components: {
    L7Icon,
    L7Badge
  },
  name: 'L7Tabs',
  props: {
    type: String,
    userClass: [String, Object, Array],
    userStyle: [String, Object]
  },
  data () {
    return {
      navList: [],
      activeOrder: 0
    }
  },
  computed: {
    className () {
      return `lt-tabs-${this.type}`
    }
  },
  mounted () {
    this.updateRoute()
  },
  beforeUpdate () {
    this.updateRoute()
  },
  methods: {
    updateRoute () {
      if (this.remItems && this.$slots.default === this.remItems) return
      this.remItems = this.$slots.default
      if (this.quiet) {
        this.quiet = false
        return
      }
      if (!this.$slots.default) {
        this.navList = []
        this.activeOrder = -1
        this.quiet = true
        return
      }
      const navList = []
      const tabsItems = this.$slots.default.filter(item => item.componentOptions && item.componentOptions.Ctor.options.name === 'L7TabsItem')
      tabsItems.forEach((pane, index) => {
        let icon = pane.componentOptions.propsData.icon
        let iconConfig
        if (typeof (icon) === 'object') {
          iconConfig = icon
        } else if (typeof (icon) === 'string') {
          iconConfig = {type: icon}
        }
        let badge = pane.componentOptions.propsData.badge
        let badgeConfig
        if (typeof (badge) === 'object') {
          badgeConfig = badge
        } else if (badge !== undefined) {
          badgeConfig = {value: badge}
        }
        navList.push({
          label: pane.componentOptions.propsData.label,
          path: pane.componentOptions.propsData.path,
          name: pane.currentName || index,
          disabled: pane.componentOptions.propsData.disabled,
          closable: pane.componentOptions.propsData.closable,
          icon: iconConfig,
          badge: badgeConfig
        })
        if (!pane.currentName) pane.currentName = index
      })
      if (navList[this.activeOrder]) {
        this.$router.push(`./${navList[this.activeOrder].path}`)
      } else if (navList[0]) {
        this.activeOrder = 0
        this.$router.replace(`./${navList[this.activeOrder].path}`)
      } else {
        this.activeOrder = -1
        this.$router.replace(`./`)
      }
      this.navList = navList
    },
    handleChange (index) {
      const nav = this.navList[index]
      if (nav.disabled) return
      this.activeOrder = index
      this.$router.push(`./${this.navList[this.activeOrder].path}`)
    },
    handleRemove (index) {
      const leftList = this.navList.slice(0, index)
      const localItem = this.navList[index]
      const rightList = this.navList.slice(index + 1, this.navList.length)
      const navList = leftList.concat(rightList)
      let activeOrder = -1

      if (index === this.activeOrder) {
        const newLength = navList.length

        if (newLength) {
          if (this.activeOrder < newLength) {
            activeOrder = this.activeOrder
          } else {
            activeOrder = this.activeOrder - 1
          }
        }
        this.activeOrder = activeOrder
      } else if (index < this.activeOrder) {
        this.activeOrder -= 1
      }
      this.navList = navList
      this.quiet = true
      if (this.activeOrder === -1) {
        this.$router.push(`./`)
      } else {
        this.$router.push(`./${navList[this.activeOrder].path}`)
      }
      this.$emit('tab-remove', localItem.name)
    },
  }
}
</script>
