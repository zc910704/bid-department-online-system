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
        label="日期"
        width="180"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.calldate | DateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180"
        align="center"/>
      <el-table-column
        prop="callname"
        label="投标项目"
        align="center"/>
      <el-table-column
        prop="winner"
        label="中标人"
        align="center"/>
      <el-table-column
        prop="method"
        label="评标方法"
        align="center"/>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="primary"
            @click="handleCheck(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getcallist, searchCallList } from '../../api/table'
import Moment from 'moment'

export default {
  filters: {
    DateFormat: val => {
      return Moment(val).format('YYYY-MM-DD')
    }
  },
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
      },
      search: ''
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
    },
    handleCheck(index, row) {
      console.log(index, row)
    }
  }
}
</script>
