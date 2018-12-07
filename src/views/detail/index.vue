<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 20px;margin-left:10px" @submit.native.prevent>
      <el-form-item label="搜索">
        <el-input v-model="formInline.search" placeholder="输入搜索内容"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
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
        label="状态"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status | Status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="callname"
        label="投标项目"
        align="center"/>
      <el-table-column
        prop="calllimit"
        label="控制价"
        align="center"/>
      <el-table-column
        prop="winner"
        label="中标法人"
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
        <el-table-column property="biddername" label="投标公司法人名称"/>
        <el-table-column width="150" property="bidderprice" label="投标价格"/>
        <el-table-column width="100" property="rate" label="下浮率">
          <template slot-scope="scope">
            {{ scope.row.rate | PercentageFormat }}
          </template>
        </el-table-column>
        <el-table-column width="170" property="rateDiff" label="与中标公司的偏差" align="center">
          <template slot-scope="scope">
            {{ scope.row.rateDiff | PercentageFormat }}
          </template>
        </el-table-column>
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
    },
    Status: val => {
      switch (val) {
        // 已经有了return 不需要break语句了
        case 'f': return '已结束'
        case 'u': return '拟投标'
        case 'd': return '正在进行'
      }
    },
    PercentageFormat: val => {
      if (val === 0) {
        return 0
      } else {
        return Number(val * 100).toFixed(2) + '%'
      }
    }
  },
  components:
  {
  },
  data() {
    return {
      loading: true,
      tableData: [
        {
          calldate: '',
          status: '',
          callname: '',
          winner: '',
          method: '',
          calllimit: ''
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
          rate: '',
          rateDiff: 0
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
    this.loading = false
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
        const winnerPrice = this.gridData.find((element) => (element.biddername = row.winner)).bidderprice//  ES6 find写法
        console.log(winnerPrice)
        this.gridData.forEach(element => {
          element.rate = element.bidderprice / row.calllimit
          element.rateDiff = (element.bidderprice - winnerPrice) / row.calllimit
        })
      })
      this.dialogTableVisible = true
    }
  }
}
</script>
