<template>
  <div>
    <el-form :inline="true" class="el-form--inline" @submit.native.prevent>
      <el-form-item label="添加将要参与投标的公司：">
        <el-autocomplete
          v-model="company"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @keyup.native.enter="onSubmit"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
      <el-form-item label="控制价">
        <el-input v-model="control" placeholder="请输入控制价"/>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"/>
      <!--这种写法也可以-->
      <!--<el-table-column
        label="序号"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        label="投标公司"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-tag size="large">{{ scope.row.company }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fit="True"
        label="报价记录">
        <template slot-scope="scope">
          <el-button
            size="medium"
            @click="handleCheck(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="投标价"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bid" @change="controlChangeHandle(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="下浮率（%）"
        align="center"
        fit="True">
        <template slot-scope="scope">
          <el-input v-model="scope.row.rate"/>
        </template>
      </el-table-column>
      <el-table-column
        label="商务标得分"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cscore"/>
        </template>
      </el-table-column>
      <el-table-column
        label="技术标得分"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.tscore"/>
        </template>
      </el-table-column>
      <el-table-column
        label="总得分"
        align="center"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>  <!--= Number(scope.row.tscore) + Number(scope.row.cscore)-->
        </template>
      </el-table-column>
      <el-table-column
        label="中标顺序"
        align="center"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.order }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 报价历史对话框 -->
    <el-dialog :visible.sync="dialogTableVisible" title="报价历史" width="80%">
      <el-table :data="dialogData" :summary-method="getSummaries" show-summary >
        <el-table-column property="callfor__callname" label="招标项目"/>
        <el-table-column property="callfor__calldate" label="日期">
          <template slot-scope="scope">
            {{ scope.row.callfor__calldate | DateFormat }}
          </template>
        </el-table-column>
        <el-table-column width="150" property="bidderprice" label="投标价格"/>
        <el-table-column width="100" property="history_rate" label="下浮率">
          <template slot-scope="scope">
            {{ scope.row.history_rate | PercentageFormat }}
          </template>
        </el-table-column>
        <el-table-column width="200" property="callfor__method" label="评标方法"/>
        <el-table-column width="150" property="isWinner" label="是否中标"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { autoCompleteCompany, historyCheck } from '../../api/compute'
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
  data() {
    return {
      company: '',
      timeout: null,
      control: '',
      tableData: [{
        company: '中建七局有限公司',
        bid: '',
        rate: '',
        cscore: '',
        tscore: '',
        score: '',
        order: ''
      }],
      dialogTableVisible: false,
      dialogData: [
        {
          callfor__callname: '',
          callfor__calldate: '',
          bidderprice: '',
          callfor__calllimit: '',
          callfor__method: '',
          history_rate: 0,
          callfor__winner: '',
          isWinner: ''
        }
      ]
    }
  },
  computed: {
    scoreHash() { // notice: 这里不能使用箭头函数! can't use => here!
      let hash = 0
      for (var element of this.tableData) {
        element.score = Number(element.cscore) + Number(element.tscore)
        hash += Number(element.score)
      }
      return hash
    }
  },
  watch: {
    scoreHash(newVal, oldVal) {
      console.log(oldVal, newVal)
      const order = []
      for (const element of this.tableData) {
        order.push(Number(element.score))
      }
      order.sort(function(m, n) {
        if (m < n) return 1
        else if (m > n) return -1
        else return 0
      })
      this.tableData.forEach((item, index, array) => {
        var i = order.findIndex((val, i, arr) => { // notice： ES6中findIndex与find的用法：回调内直接return符合要求的对象即可
          return val === item.score
        })
        array[index].order = i + 1
      })
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      autoCompleteCompany({ company: queryString }).then(response => {
        for (const element of response.data) {
          element.value = element.biddername// 将想要展示的数据作为value
        }
        var list = response.data
        cb(list)
      }, response => {
        console.log(response.code)
      }).catch(e => {
        console.log(e)
      })
    },
    handleSelect(item) {
      console.log(item)
    },
    handleCheck(index, row) {
      historyCheck({ 'company': row.company }).then(response => {
        this.dialogData = response.data
        this.dialogData.forEach(element => {
          element.history_rate = 1 - element.bidderprice / element.callfor__calllimit
          if (row.company === element.callfor__winner) {
            element.isWinner = '是'
          } else {
            element.isWinner = '否'
          }
        })
        this.dialogTableVisible = true
      })
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    },
    onSubmit() {
      this.tableData.push({
        company: this.company,
        cscore: '',
        tscore: '',
        score: ''
      })
      this.company = ''
    },
    controlChangeHandle(index, row) {
      if (Number(this.control)) {
        row.rate = 100 - Number(row.bid / this.control * 100).toFixed(2)
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const avg = []
      columns.forEach((column, index) => {
        if (index === 0) {
          avg[index] = '平均值'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (index === 3) {
          if (!values.every(value => isNaN(value))) {
            avg[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            avg[index] = Number(avg[index] * 100 / values.length).toFixed(2)
            avg[index] += '%'
          }
        }
      })
      return avg
    }
  }
}
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");
  .el-form--inline{
    margin: 10px 10px;
  }
</style>
