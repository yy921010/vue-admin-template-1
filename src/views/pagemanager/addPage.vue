<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="addFloor"
      >
        新增楼层
      </el-button>
      <el-button
        class="filter-item"
        type="warning"
        icon="el-icon-upload"
        size="mini"
      >
        提交页面信息
      </el-button>
    </div>
    <el-form ref="form" :model="pageContent" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="内容名称">
            <el-input v-model="pageContent.name" placeholder="请输入内容名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="展示名称">
            <el-input v-model="pageContent.showName" placeholder="请输入展示名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-bottom: 40px;" label="页面描述">
        <el-input
          v-model="pageContent.introduce"
          :rows="1"
          type="textarea"
          class="article-textarea"
          autosize
          placeholder="请输入内容描述"
        />
      </el-form-item>
      <el-form-item style="margin-bottom: 40px;" label="页面背景图">
        SDSADAS
      </el-form-item>
      <el-form-item style="margin-bottom: 40px;" label="拥有的楼层">
        <el-table
          :data="floorList"
          border
          fit
          highlight-current-row
          style="width: 100%;margin-top: 20px"
        >
          <el-table-column label="ID" prop="id" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="楼层id" prop="id" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.pageId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="楼层名称" prop="id" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.pageName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="150px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="先建时间" width="150px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                编辑
              </el-button>
              <el-button
                v-if="row.status!='deleted'"
                size="mini"
                type="danger"
                @click="handleModifyStatus(row,'deleted')"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-dialog title="添加楼层" :visible.sync="dialogFormVisible" center>
      <div class="filter-dialog">
        <el-input
          placeholder="页面id"
          style="width: 200px;"
          class="filter-item"
          size="mini"
          clearable
          @keyup.enter.native="handleFilter"
        />
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="addFloor"
        >
          搜索
        </el-button>
      </div>
      <el-table
        :data="prepareFloorList"
        border
        fit
        highlight-current-row
        style="width: 100%;margin-top: 20px"
      >
        <el-table-column label="ID" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="楼层id" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.pageId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="楼层名称" prop="id" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.pageName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status!='deleted'"
              size="mini"
              type="danger"
              @click="handleModifyStatus(row,'deleted')"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddPage',
  data() {
    return {
      pageContent: {
        showName: '',
        name: '',
        introduce: ''
      },
      floorList: [],
      dialogFormVisible: false,
      prepareFloorList: []
    }
  },
  methods: {
    addFloor() {
      this.dialogFormVisible = true
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
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
