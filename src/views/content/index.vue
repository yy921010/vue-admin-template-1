<template>
  <div class="app-container">
    <el-input
      v-model="searchCondition.pageId"
      placeholder="页面id"
      style="width: 200px;"
      class="filter-item"
      size="mini"
      clearable
      @keyup.enter.native="handleFilter"
    />
    <el-input
      v-model="searchCondition.pageName"
      placeholder="页面名称"
      style="width: 200px;"
      class="filter-item"
      size="mini"
      clearable
      @keyup.enter.native="handleFilter"
    />
    <el-input
      v-model="searchCondition.floorId"
      placeholder="关联楼层id"
      style="width: 200px;"
      class="filter-item"
      size="mini"
      clearable
      @keyup.enter.native="handleFilter"
    />
    <el-input
      v-model="searchCondition.floorName"
      placeholder="关联楼层名称"
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
      @click="handleFilter"
    >
      搜索
    </el-button>
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="handleCreate"
    >
      新增内容
    </el-button>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 20px"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="页面id" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pageId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="页面名称" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pageName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联楼层名称" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联楼层id" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorId }}</span>
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
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination />
  </div>
</template>

<script>
export default {
  name: 'Content',
  data: () => ({
    searchCondition: {
    },
    list: []
  }),
  methods: {
    handleCreate() {
      this.$router.push({
        name: 'contentAdd'
      })
    },
    handleFilter() {},
    sortChange() {}
  }
}
</script>

<style scoped>

</style>
