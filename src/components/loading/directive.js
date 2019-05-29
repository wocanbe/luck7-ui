const directivePrefix = 'l7-loading-'
function getConfig (el) {
  const l7LoadOpts = {}
  const msg = el.getAttribute(directivePrefix + 'msg')
  const type = el.getAttribute(directivePrefix + 'type')
  const layerColor = el.getAttribute(directivePrefix + 'layer-color')
  const animation = el.getAttribute(directivePrefix + 'animation')
  const icon = el.getAttribute(directivePrefix + 'icon')
  const hideTime = parseInt(el.getAttribute(directivePrefix + 'hide-time'))
  if (msg) l7LoadOpts['msg'] = msg
  if (type) l7LoadOpts['type'] = type
  if (layerColor) l7LoadOpts['layerColor'] = layerColor
  if (animation) l7LoadOpts['animation'] = animation
  if (icon) l7LoadOpts['icon'] = icon
  if (!isNaN(hideTime)) l7LoadOpts['hideTime'] = hideTime
  return l7LoadOpts
}
function creatDirective (Vue, creatLoading) {
  Vue.directive('loading', {
    bind (el, binding) {
      const l7Loader = creatLoading(Vue, el)
      el.l7Loader = l7Loader
      if (binding.value === true) {
        l7Loader.show(getConfig(el))
      }
    },
    update (el, binding) {
      if (binding.value === true) {
        el.l7Loader.show(getConfig(el))
      } else el.l7Loader.hide()
    },
    unbind (el) {
      el.l7Loader = undefined
    }
  })
}
export default creatDirective
