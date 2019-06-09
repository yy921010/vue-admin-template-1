<template>
  <div class="app-container">
    <el-form ref="form" :model="contentInfo" label-width="120px">
      <el-form-item label="内容名称">
        <el-input v-model="contentInfo.contentName" placeholder="请输入内容名称" />
      </el-form-item>
      <el-form-item label="影片类型">
        <el-select v-model="contentInfo.type" placeholder="影片类型">
          <el-option label="单品" :value="1" />
          <el-option label="剧集" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item v-show="contentInfo.type === 2" label="子集序号">
        <el-input v-model="contentInfo.serialNumber" placeholder="子集序号" />
      </el-form-item>
      <el-form-item label="内容类型">
        <el-select v-model="contentInfo.contentType" placeholder="影片内容类型">
          <el-option label="电影" :value="1" />
          <el-option label="电视剧" :value="2" />
          <el-option label="动漫" :value="3" />
          <el-option label="综艺" :value="4" />
          <el-option label="少儿" :value="5" />
          <el-option label="子集" :value="6" />
          <el-option label="短视频" :value="7" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容评级">
        <el-select v-model="contentInfo.contentLevel" placeholder="内容评级">
          <el-option label="G" :value="1" />
          <el-option label="PG" :value="8" />
          <el-option label="PG-13" :value="13" />
          <el-option label="R" :value="16" />
          <el-option label="NC-17" :value="18" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容标题">
        <el-input v-model="contentInfo.contentTitle" placeholder="请输入内容标题" />
      </el-form-item>
      <el-form-item label="内容副标题">
        <el-input v-model="contentInfo.contentSubtitle" placeholder="请输入内容副标题" />
      </el-form-item>
      <el-form-item style="margin-bottom: 40px;" label="内容简介">
        <el-input
          v-model="contentInfo.contentIntroduce"
          :rows="1"
          type="textarea"
          class="article-textarea"
          placeholder="请输入内容描述"
          autosize
        />
      </el-form-item>
      <el-form-item label="是否短视频">
        <el-switch v-model="contentInfo.isShortVideo" />
      </el-form-item>
      <el-form-item label="添加媒资">
        <el-button type="primary" size="mini" @click="openDialogForDefinition">添加</el-button>
        <el-table :data="prepareDefinitions">
          <el-table-column label="清晰度" prop="id" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="播放地址" prop="id" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="definitionHandle(row)">
                编辑
              </el-button>
              <el-button
                v-if="row.status!='deleted'"
                size="mini"
                type="danger"
                @click="definitionHandle(row,'deleted')"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="添加图片">
        <!-- element 上传图片按钮 -->
        <el-upload
          action=""
          drag
          :auto-upload="false"
          :show-file-list="false"
          :on-change="changeUpload"
          accept="image/jpeg,image/gif,image/png"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">点击上传</div>
          <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
        </el-upload>
        <div class="image-preview">
          <div v-for="(picture,index) in previewPictures" :key="index" class="block">
            <span class="demonstration">{{ picture.name }}</span>
            <el-image
              style="height: 100px;width: 100px"
              :src="picture.url"
              fit="contain"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="添加媒体资源" :visible.sync="dialogFormVisible" center>
      <el-form :model="addDefinition">
        <el-form-item label="视频清晰度">
          <el-select v-model="addDefinition.type" placeholder="影片类型">
            <el-option label="TS" :value="1" />
            <el-option label="SD" :value="2" />
            <el-option label="HD" :value="3" />
            <el-option label="UHD" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="视频播放地址">
          <el-input v-model="addDefinition.url" placeholder="影片地址" />
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="dialogFormVisible =false">取消</el-button>
          <el-button type="primary" @click="confirmDefinition">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="添加图片" :visible.sync="dialogPosterVisible" center>
      <el-form :model="addDefinition">
        <el-form-item label="">
          <vueCropper
            ref="cropper"
            style="height: 300px"
            :img="option.img"
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
            @realTime="realTime"
          />
        </el-form-item>
        <el-form-item label="图片比例">
          <el-select v-model="posterFlexed" placeholder="请选择图片类型">
            <el-option key="avatar" label="1:1 头像图片" value="avatar" />
            <el-option key="video" label="16：9 影片图片" value="video" />
            <el-option key="series" label="3：5 电视剧图片" value="series" />
            <el-option key="banner" label="21：9 banner 图片" value="banner" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="dialogPosterVisible=false">取消</el-button>
          <el-button type="primary" @click="finish">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddContent',
  data: () => ({
    contentInfo: {
      contentName: '',
      type: '',
      contentType: '',
      contentLevel: '',
      contentTitle: '',
      contentSubtitle: '',
      contentIntroduce: '',
      isShortVideo: ''
    },
    addDefinition: {
      type: '',
      url: ''
    },
    dialogFormVisible: false,
    prepareDefinitions: [],
    dialogPosterVisible: false,
    fixedNumber: [1, 1],
    option: {
      img: '', // 裁剪图片的地址
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
      centerBox: false, // 截图框是否被限制在图片里面
      infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    },
    loading: false,
    _posterFlexed: '',
    previewPictures: []
  }),
  computed: {
    posterFlexed: {
      set(val) {
        this._posterFlexed = val
        switch (val) {
          case 'avatar':
            this.fixedNumber = [1, 1]
            break
          case 'video':
            this.fixedNumber = [16, 9]
            break
          case 'series':
            this.fixedNumber = [3, 5]
            break
          default:
            this.fixedNumber = [21, 9]
            break
        }
      },
      get() {
        return this._posterFlexed
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.contentInfo)
    },
    openDialogForDefinition() {
      this.dialogFormVisible = true
      this.addDefinition = {}
    },
    confirmDefinition() {
      this.dialogFormVisible = false
      if (this.addDefinition && this.addDefinition.url !== '' && this.addDefinition.type) {
        this.prepareDefinitions.push(this.addDefinition)
      }
    },
    definitionHandle(row, actionType) {
      if (actionType === 'deleted') {
        this.prepareDefinitions = this.prepareDefinitions.filter(item => item.url !== row.url)
      }
    },
    openDialogPoster() {
      this.dialogPosterVisible = true
    },
    changeUpload(file, filList) {
      const isLt5M = file.size / 1024 / 1024 < 5
      const _this = this
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        // 将图片base64的数据传递给vueCropper组件
        _this.option.img = this.result
        _this.dialogPosterVisible = true
      }
      this.fileinfo = file
    },
    realTime(data) {
      console.log(data)
    },
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        const imgBase64Url = window.URL.createObjectURL(data)
        const fileName = 'goods' + this.fileinfo.uid
        this.loading = true
        this.previewPictures.push({
          name: fileName,
          url: imgBase64Url
        })
        this.dialogPosterVisible = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .filter-container {
    margin-bottom: 20px;
    padding: 0 30px;
    border-bottom: 1px solid #bfcbd9;
    height: 50px;
  }
  .article-textarea /deep/ {
    textarea {
      height: 200px;
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
