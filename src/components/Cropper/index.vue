<template>
  <div class="cropper">
    <vueCropper
      ref="cropper"
      style="height: 300px"
      :img="url"
      :output-size="option.size"
      :output-type="option.outputType"
      :info="true"
      :full="option.full"
      :can-move="option.canMove"
      :can-move-box="option.canMoveBox"
      :original="option.original"
      :auto-crop="option.autoCrop"
      :fixed="option.fixed"
      :fixed-number="fixedNumber"
      :center-box="option.centerBox"
      :info-true="option.infoTrue"
      :fixed-box="option.fixedBox"
    />
    <div class="actions">
      <el-button @click="changeImageSize('1,1')">1:1</el-button>
      <el-button @click="changeImageSize('16,9')">16:9</el-button>
      <el-button @click="changeImageSize('3,5')">3:5</el-button>
      <el-button @click="changeImageSize('21,9')">21:9</el-button>
      <el-button @click="changeImageSize('3,4')">3:4</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    url: {
      type: String,
      default: '',
      require: true
    }
  },
  data: () => ({
    fixedNumber: [1, 1],
    option: {
      info: true, // 裁剪框的大小信息
      outputSize: 0.8, // 裁剪生成图片的质量
      outputType: 'webp', // 裁剪生成图片的格式
      canScale: false, // 图片是否允许滚轮缩放
      autoCrop: true, // 是否默认生成截图框
      fixedBox: false, // 固定截图框大小 不允许改变
      fixed: true, // 是否开启截图框宽高固定比例
      full: true, // 是否输出原图比例的截图
      canMoveBox: true, // 截图框能否拖动
      original: false, // 上传图片按照原始比例渲染
      centerBox: true, // 截图框是否被限制在图片里面
      infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    }
  }),
  methods: {
    getCropBlob(fn) {
      return this.$refs.cropper.getCropBlob(fn)
    },
    changeImageSize(flexedNumber) {
      this.$refs.cropper.refresh()
      this.fixedNumber = flexedNumber.split(',')
      this.$emit('onCropper', this.fixedNumber)
    }
  }
}
</script>

<style scoped>
.actions{
  margin-top: 20px;
}
</style>
