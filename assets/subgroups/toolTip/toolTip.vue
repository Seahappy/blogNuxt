<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-08-30 17:11:00
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-30 14:18:32
 * @FilePath: \blog\blogweb\src\components\subgroups\toolTip\toolTip.vue
-->
<template>

  <span ref='toolTip' class='toolTip'>
    <div v-show='SHDom' id='popper' ref='popper' class='ToolTipUi' :style='(widthAuto ? "width:" + toolTipDomWidth + "px;" : "") + ToolTipStyle'>
      <slot/>
      <div ref='arrow' class='arrow' data-popper-arrow='true'/>
    </div>
    <span :style='{color: iconColor}'>
      <slot name='icon'/>
    </span>
  </span>
</template>
<script>
import { createPopper } from '@popperjs/core'
export default {
  name: 'SHToolTip',
  props: {
    direction: {
      type: String,
      default: 'bottom'
    },
    eventType: {
      type: String,
      default: 'click',
      validator: value => ['click', 'focus', 'hover'].indexOf(value) > -1
    },
    iconColor: {
      type: String,
      default: 'rgb(107, 107, 107)'
    },
    offset: {
      type: Array,
      default: function() {
        return [0, 10]
      }
    },
    widthAuto: {
      default: false,
      type: Boolean
    },
    ToolTipStyle: {
      type: String,
      default: 'background: #303133'
    }
  },
  data() {
    return {
      SHDom: false,
      operBtn: {},
      operPage: {},
      popperInstance: {},
      timer: null,
      toolTipDomWidth: 0
    }
  },
  mounted() {
    this.operBtn = this.$slots.icon[0].elm
    this.operPage = this.$refs.popper
    const { operBtn, operPage } = this
    if (this.eventType === 'hover') {
      this.on(operBtn, 'mouseenter', this.showOperation)
      this.on(operBtn, 'mouseleave', this.hideOperation)
      this.on(operPage, 'mouseenter', this.showOperation)
      this.on(operPage, 'mouseleave', this.hideOperation)
    }
    if (this.eventType === 'click') {
      this.on(operBtn, 'click', this.SHOpertion)
      this.on(document, 'click', this.handleDocumentClick)
    }
    if (this.eventType === 'focus') {
      this.on(operBtn, 'mousedown', this.showOperation)
      this.on(operBtn, 'mouseup', this.hideOperation)
    }
    this.toolTipDomWidth = this.$refs.toolTip.clientWidth
  },
  methods: {
    SHOpertion() {
      this.SHDom = !this.SHDom
      this.toolTip_Constructor(this.$refs.popper, this.$slots.icon[0].elm)
    },
    handleDocumentClick(e) {
      const { operBtn, operPage } = this
      if (this.$el.contains(e.target) || operBtn.contains(e.target) || operPage.contains(e.target)) return
      this.SHDom = false
    },
    showOperation() {
      this.SHDom = true
      this.toolTip_Constructor(this.$refs.popper, this.$slots.icon[0].elm)
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    hideOperation() {
      this.timer = setTimeout(() => {
        this.SHDom = false
        clearTimeout(this.timer)
        this.timer = null
      }, 200)
    },
    on(dom, eventType, callback) {
      dom.addEventListener(eventType, callback, false)
    },
    off(dom, eventType, callback) {
      dom.removeEventListener(eventType, callback, false)
    },
    toolTip_Constructor(toolP, toolR) {
      const { offset } = this
      this.popperInstance = createPopper(toolR, toolP, {
        placement: this.direction,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset
            }
          }
        ]
      })
      document.body.appendChild(toolP)
    }
  },
  watch: {
    SHDom: function(newV) {
      const { operPage } = this
      newV ? operPage.setAttribute('data-show', '') : operPage.removeAttribute('data-show')
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: newV }
        ]
      }))
    }
  },
  beforeDestroy() {
    const { operBtn, operPage } = this
    operPage.remove()
    this.off(operPage, 'mouseenter', this.handleMouseEnter)
    this.off(operPage, 'mouseleave', this.handleMouseLeave)
    this.off(operBtn, 'mouseenter', this.handleMouseEnter)
    this.off(operBtn, 'mouseleave', this.handleMouseLeave)
    this.off(operBtn, 'click', this.SHOpertion)
    this.off(document, 'click', this.handleDocumentClick)
    this.off(operBtn, 'mousedown', this.showOperation)
    this.off(operBtn, 'mouseup', this.hideOperation)
  }
}
</script>
<style scoped lang="less">
.toolTip {
  cursor: pointer;
}
.ToolTipUi {
  position: absolute;
  border-radius: 4px;
  padding: 10px;
  z-index: 2000;
  font-size: 12px;
  min-width: 10px;
  color: #fff;
  line-height: 1.4;
  .arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    visibility: hidden;
    background: inherit;
    &::before {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      visibility: visible;
      content: '';
      transform: rotate(45deg);
    }
  }
  &[data-popper-placement^='top'] > .arrow {
    bottom: -4px;
  }

  &[data-popper-placement^='bottom'] > .arrow {
    top: -4px;
  }

  &[data-popper-placement^='left'] > .arrow {
    right: -4px;
  }

  &[data-popper-placement^='right'] > .arrow {
    left: -4px;
  }
}
</style>
