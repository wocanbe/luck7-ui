<template lang="pug">
- var prefix = 'lt-swiper';
  div(class=prefix)
    ul(class=prefix+'-boxs' :class="effect" ref="sliderBoxs")
      slot
    ul(class=prefix+'-dots' v-if="indicatorDots")
      li(v-for="item in datas" :key="item")
        slot(name="dots" :active="active" :index="item" :sliderFun="slideTo")
          span(
            :class="{'active': active===item}"
            :style="dotStyles(item)"
            @click="dotsEvent('click', item)"
            @mouseover="dotsEvent('hover', item)"
          )
    .left(class=prefix+'-arrow' @click="prevSlide('click')" :class="arrow")
      L7Icon(type="angle-left" size="32")
    .right(class=prefix+'-arrow' @click="nextSlide('click')" :class="arrow")
      L7Icon(type="angle-right" size="32")
</template>
<script>
import {oneOf} from 'luck7-ui/src/utils/'
import L7Icon from 'luck7-ui/src/components/icon/icon'
export default {
  name: 'L7Swiper',
  components: {L7Icon},
  props: {
    effect: {
      type: String,
      default: 'fade'
    },
    current: {
      type: Number,
      default: 0
    },
    value: Number,
    // 自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 自动播放时间间隔，单位ms，不得小于1000
    interval: {
      type: Number,
      default: 5000,
      validator (value) {
        if (value < 1000) {
          console.error('自动播放时间间隔不能小于1000')
          return false
        }
        return true
      }
    },
    // 显示轮播状态栏
    indicatorDots: {
      type: Boolean,
      default: false
    },
    // 轮播状态颜色
    indicatorColor: {
      type: String,
      default: 'rgba(0,0,0,.3)'
    },
    // 当前轮播状态颜色
    indicatorActiveColor: {
      type: String,
      default: 'rgba(0,0,0,1)'
    },
    // 显示左右切换箭头
    arrow: {
      type: String,
      default: 'hover',
      validator (value) {
        return oneOf(value, ['hover', 'always', 'never'])
      }
    },
    // 轮播状态点触发控制的方式
    trigger: {
      type: String,
      default: 'click',
      validator (value) {
        return oneOf(value, ['click', 'hover'])
      }
    },
    height: {
      type: [String, Number],
      default: 'auto',
      validator (value) {
        return value === 'auto' || Object.prototype.toString.call(value) === '[object Number]'
      }
    },
    bindchange: Function
  },
  data () {
    return {
      active: 0,
      datas: [],
      slideInstances: []
    }
  },
  watch: {
    active (newVal, oldVal) {
      this.slideInstances[newVal].$el.classList.add('on')
      if (oldVal < this.slideInstances.length) {
        this.slideInstances[oldVal].$el.classList.remove('on')
      }
    }
  },
  mounted() {
    this.startPoint = 0
    this.sliderTimer = undefined
    this.$el.addEventListener('touchstart', this.touchStart.bind(this))
    this.$el.addEventListener('touchend', this.touchEnd.bind(this))
  },
  methods: {
    dotStyles (i) {
      const backStyles = {}
      if (this.indicatorActiveColor && this.active === i) backStyles['backgroundColor'] = this.indicatorActiveColor
      else if (this.indicatorColor) backStyles['backgroundColor'] = this.indicatorColor
      return backStyles
    },
    dotsEvent (event, i) {
      if (event === this.trigger) this.slideTo(i, event)
    },
    updateSlides () {
      this.$nextTick(() => {
        const slides = []
        const slideInstances = []
        let i = 0
        const find = (child) => {
          const name = child.$options.componentName
          if (name === 'L7SwiperItem') {
            slides.push(i++)
            slideInstances.push({
              $el: child.$el
            })
            child.$el.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
          }
        }
        this.$children.forEach((child) => {
          find(child)
        })
        this.active = this.value || this.current
        slideInstances[this.active].$el.classList.add('on')
        this.datas = slides
        this.slideInstances = slideInstances
        this.updataPos()
      })
    },
    updataPos () {
      if (this.autoplay) this.sliderTimer = setTimeout(this.nextSlide, this.interval)
    },
    touchStart (e) {
      this.startPoint = e.changedTouches[0].pageX
    },
    touchEnd (e) {
      const diff = e.changedTouches[0].pageX - this.startPoint
      if (diff < -20) {
        this.nextSlide('touch')
      } else if (diff > 20) {
        this.prevSlide('touch')
      }
    },
    nextSlide (event) {
      let target = this.active + 1
      if (target === this.datas.length) target = 0
      this.slideTo(target, event)
    },
    prevSlide (event) {
      let target = this.active - 1
      if (target === -1) target = this.datas.length - 1
      this.slideTo(target, event)
    },
    slideTo (target, event) {
      this.active = target
      if (this.sliderTimer) clearTimeout(this.sliderTimer)
      if (this.autoplay) this.sliderTimer = setTimeout(this.nextSlide, this.interval)
      this.$emit('input', target)
      let source = ''
      if (!event) source = 'autoplay'
      else if (event === 'touch') source = 'touch'
      if (this.bindchange) this.bindchange({current: target, source})
    }
  },
  beforeDestroy () {
    if (this.sliderTimer) clearTimeout(this.sliderTimer)
  }
}
</script>
