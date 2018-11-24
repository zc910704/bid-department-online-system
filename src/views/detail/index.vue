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
    <el-dialog :visible.sync="dialogTableVisible" title="招标详情" width="50%">
      <el-table :data="gridData">
        <el-table-column width="300" property="biddername" label="投标公司法人名称"/>
        <el-table-column width="200" property="bidderprice" label="投标价格"/>
        <el-table-column width="100" property="rate" label="下浮率"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getcallist, searchCallList, callDetail } from '../../api/table'
import Moment from 'moment'

export default {
  filters: {
    DateFormat: val => {
      return Moment(val).format('YYYY-MM-DD')
    }
  },
  components:
  {
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
      dialogTableVisible: false,
      gridData: [
        {
          biddername: '',
          bidderprice: '',
          rate: ''
        }
      ]
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
        this.tableData = response.data
      })
    },
    handleCheck(index, row) {
      callDetail({ 'call': row.callname }).then(response => {
        this.gridData = response.data
      })
      this.dialogTableVisible = true
    }
  }
}
</script>
