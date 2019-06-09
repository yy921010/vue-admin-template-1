<template>
  <div class="app-container">
    <el-form ref="form" :model="contentInfo" label-width="140px">
      <el-form-item label="内容名称">
        <el-input v-model="contentInfo.name" placeholder="请输入内容名称" :width="200" />
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
          <el-option v-for="(contentType,index) in contentTypeRender" :key="index" :label="contentType.label" :value="contentType.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容流派">
        <el-select
          v-model="contentInfo.genres"
          multiple
          placeholder="影片内容类型"
        >
          <el-option v-for="(genre,index) in genres" :key="index" :label="genre" :value="genre" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容评级">
        <el-select v-model="contentInfo.rating" placeholder="内容评级">
          <el-option v-for="(rating,index) in ratingsRender" :key="index" :label="rating.label" :value="rating.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容标题">
        <el-input v-model="contentInfo.title" placeholder="请输入内容标题" />
      </el-form-item>
      <el-form-item label="内容副标题">
        <el-input v-model="contentInfo.subtitle" placeholder="请输入内容副标题" />
      </el-form-item>
      <el-form-item style="margin-bottom: 40px;" label="内容简介">
        <el-input
          v-model="contentInfo.introduce"
          :rows="1"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6}"
          class="article-textarea"
          placeholder="请输入内容描述"
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
          :file-list="previewPictures"
          :auto-upload="false"
          :show-file-list="true"
          :on-change="changeUpload"
          list-type="picture"
          accept="image/jpeg,image/gif,image/png"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">点击上传</div>
          <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
        </el-upload>
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
      <el-form>
        <el-form-item label="">
          <cropper ref="cropper" :url="chosenImgUrl" @onCropper="changeFlexed" />
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
import UIConstant from './ContentConstant'
import cropper from '@/components/Cropper'
export default {
  name: 'AddContent',
  components: {
    cropper
  },
  data: () => ({
    contentTypeRender: UIConstant.contentTypeRender,
    ratingsRender: UIConstant.ratingsRender,
    genres: UIConstant.genres,
    contentInfo: {
      name: '',
      type: '',
      contentType: '',
      rating: '',
      title: '',
      subtitle: '',
      introduce: '',
      isShortVideo: '',
      genres: []
    },
    chosenImgUrl: '',
    addDefinition: {
      type: '',
      url: ''
    },
    dialogFormVisible: false,
    prepareDefinitions: [],
    dialogPosterVisible: false,
    loading: false,
    _posterFlexed: '',
    posterFlexed: 'avatar',
    previewPictures: []
  }),
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
        _this.chosenImgUrl = this.result
        _this.dialogPosterVisible = true
      }
      this.fileinfo = file
    },
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        this.loading = true
        this.previewPictures.push({
          name: this.fileinfo.uid,
          url: window.URL.createObjectURL(data)
        })
        console.log(this.previewPictures)
        this.dialogPosterVisible = false
      })
    },
    changeFlexed(evt) {
      console.log(evt)
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
</style>
