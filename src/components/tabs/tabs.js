import {oneOf} from '../../utils'
import normalmode from './normalmode.vue'
import routemode from './routemode.vue'
import linkmode from './linkmode.vue'
export default {
  name: 'L7Tabs',
  functional: true,
  components: {
    normalmode,
    routemode,
    linkmode,
  },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator (value) {
        return oneOf(value, ['normal', 'brief', 'card'])
      }
    },
    mode: {
      type: String,
      default: 'normal',
      validator (value) {
        return oneOf(value, ['normal', 'route', 'link'])
      }
    },
    className: [String, Object, Array],
    styles: [String, Object]
  },
  render: function (h, context) {
    const comProps = {
      props: {
        type: context.props.type,
        userClass: context.props.className,
        userStyle: context.props.styles
      },
      scopedSlots: context.data.scopedSlots
    }
    if (context.props.mode === 'route') {
      return h(
        routemode,
        comProps,
        context.children
      )
    } else if (context.props.mode === 'link') {
      return h(
        linkmode,
        comProps,
        context.children
      )
    }
    return h(
      normalmode,
      comProps,
      context.children
    )
  }
}
