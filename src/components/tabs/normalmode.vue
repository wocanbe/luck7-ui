<template lang="pug">
- var prefix = 'lt-tabs';
div(class=prefix :class="className")
  ul(class=prefix+'-title')
    li(
      v-for="(item,index) in navList"
      :class="{'lt-tabs-this':index===activeOrder}"
      :key="item.name"
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
  ul(class=prefix+'-content' :class="userClass" :style="userStyle")
    slot
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
    this.updateNav()
  },
  methods: {
    getTabs () {
      return this.$children.filter(item => item.$options.name === 'L7TabsItem')
    },
    updateNav () {
      const navList = []
      const tabsItems = this.getTabs()
      tabsItems.forEach((pane, index) => {
        let icon = pane.icon
        let iconConfig
        if (typeof (icon) === 'object') {
          iconConfig = icon
        } else if (typeof (icon) === 'string') {
          iconConfig = {type: icon}
        }
        let badge = pane.badge
        let badgeConfig
        if (typeof (badge) === 'object') {
          badgeConfig = badge
        } else if (badge !== undefined) {
          badgeConfig = {value: badge}
        }
        navList.push({
          label: pane.label,
          path: pane.path,
          name: pane.currentName || index,
          disabled: pane.disabled,
          closable: pane.closable,
          icon: iconConfig,
          badge: badgeConfig
        })
        if (!pane.currentName) pane.currentName = index
      })
      if (this.activeOrder > -1) tabsItems[this.activeOrder].$el.style.display = 'block'
      this.navList = navList
    },
    handleChange (index) {
      const nav = this.navList[index]
      if (nav.disabled) return
      const tabsItems = this.getTabs()
      tabsItems[this.activeOrder].$el.style.display = ''
      this.activeOrder = index
      tabsItems[index].$el.style.display = 'block'
    },
    handleRemove (index) {
      const tabs = this.getTabs()
      const tab = tabs[index]
      tabs[index].$el.style.display = ''
      if (index === this.activeOrder) {
        const newLength = tabs.length - 1
        let activeOrder = -1
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
      tab.$destroy()
      this.$emit('tab-remove', tab.currentName)
      this.updateNav()
    },
  }
}
</script>
