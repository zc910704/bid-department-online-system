<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 20px;margin-left:10px">
      <el-form-item label="搜索">
        <el-input v-model="formInline.search" placeholder="输入搜索内容"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="calldate"
        label="日期"
        width="180"/>
      <el-table-column
        prop="status"
        label="状态"
        width="180"/>
      <el-table-column
        prop="callname"
        label="投标项目"/>
      <el-table-column
        prop="winner"
        label="中标人"/>
      <el-table-column
        prop="method"
        label="评标方法"/>
    </el-table>
  </div>
</template>

<script>
import { getcallist, searchCallList } from '../../api/table'

export default {
  data() {
    return {
      tableData: [
        {
          calldate: '',
          status: '',
          callname: '',
          winner: '',
          method: ''
        }
      ],
      formInline: {
        search: ''
      }
    }
  },
  watch: {
    formInline: function() {
      console.log(this.formInline.search)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSearch: (formInline) => {
      searchCallList(formInline.search).then(response => {
        this.tableData = response.data
      })
    },
    isGottoString: val => {
      if (val) {
        return '是'
      } else {
        return '否'
      }
    },
    fetchData() {
      getcallist().then(response => {
        console.log(response.data)
        this.tableData = response.data
      })
    }
  }
}
</script>
