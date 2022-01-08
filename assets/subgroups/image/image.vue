<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-10-19 16:35:32
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 16:45:32
 * @FilePath: \blog\blogweb\src\components\subgroups\image\image.vue
-->
<template>
  <div>
    <div v-if='src && !typeImg' :style="{backgroundImage: 'url(' + src + ')'}" class='preview_Img' @click='preview_Operation'/>
    <img v-else-if='src && typeImg' :src='src' alt='' style='width: 100%;height: 100%;' @click='preview_Operation'>
    <div v-else class='prompt_Text'>
      <span>{{ title || '图片未上传' }}</span>
    </div>
    <div v-show='SHDom' ref='SHImage' class='SHImage'>
      <div class='image_Mask'/>
      <span class='image_Btn image_close' @click='close_Image'><i class='fa fa-times' aria-hidden='true'/></span>
      <span v-if='srcList' class='image_Btn image_Prev' @click='indexImg === 0 ? indexImg = srcList.length - 1 : indexImg -= 1'><i class='fa fa-chevron-left' aria-hidden='true'/></span>
      <span v-if='srcList' class='image_Btn image_Next' @click='indexImg === srcList.length - 1 ? indexImg = 0 : indexImg += 1'><i class='fa fa-chevron-right' aria-hidden='true'/></span>
      <div class='image_Btn image_operation'>
        <i class='fa fa-search-minus' aria-hidden='true' @click='image_Scale < 0.4 ? image_Scale = 0.2 : image_Scale -= 0.2'/>
        <i class='fa fa-search-plus' aria-hidden='true' @click='image_Scale += 0.2'/>
        <i/>
        <i v-if='full_Image' class='fa fa-compress' aria-hidden='true' @click='full_Image = false'/>
        <i v-else class='fa fa-expand' aria-hidden='true' @click='full_Image = true'/>
        <i/>
        <i class='fa fa-undo' aria-hidden='true' @click='image_Rotate += 90'/>
        <i class='fa fa-repeat' aria-hidden='true' @click='image_Rotate -= 90'/>
      </div>
      <div class='image_Img_Wrap' @click='close_Image'>
        <img class='image_Img' :src='srcList ? srcList[indexImg] : src' :style="'transform: scale(' + image_Scale + ') rotate(' + image_Rotate + 'deg);' + (full_Image ? 'maxHeight: 100%; maxWidth: 100%' : '')">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SHImage',
  props: {
    'src': {
      type: String
    },
    'title': {
      type: String
    },
    'typeImg': {
      type: String
    },
    'srcList': {
      type: Array
    }
  },
  data() {
    return {
      SHDom: false,
      full_Image: true,
      image_Rotate: 0,
      image_Scale: 1,
      indexImg: 0
    }
  },
  methods: {
    preview_Operation() {
      this.SHDom = true
      document.body.appendChild(this.$refs.SHImage)
    },
    close_Image(e) {
      const event = e || window.e
      const target = event.target || event.srcElement
      if (target.className === 'image_Img') return
      this.SHDom = false
      this.full_Image = true
      this.image_Rotate = 0
      this.image_Scale = 1
      document.body.removeChild(this.$refs.SHImage)
    }
  }
}
</script>
<style lang="less">
.preview_Img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.prompt_Text {
  width: 100%;
  height: 100%;
  display: flex;
  color: #c0c4cc;
  font-size: 12px;
  align-items: center;
  justify-content: center;
}
.SHImage {
  z-index: 2021;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .image_Mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
  }
  .image_Btn {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0.8;
    box-sizing: border-box;
    user-select: none;
    background-color: #606266;
    color: #fff;
    i {
      cursor: pointer;
    }
  }
  .image_close {
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
  .image_Prev,
  .image_Next {
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    border-color: #fff;
    cursor: pointer;
  }
  .image_Prev {
    left: 40px;
  }
  .image_Next {
    right: 40px;
    text-indent: 2px;
  }
  .image_operation {
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    width: 282px;
    height: 44px;
    padding: 0 23px;
    border-radius: 22px;
    display: flex;
    justify-content: space-around;
    font-size: 20px;
  }
  .image_Img_Wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .image_Img {
      margin-left: 0px;
      margin-top: 0px;
      transition: transform 0.3s ease 0s;
    }
  }
}
</style>
