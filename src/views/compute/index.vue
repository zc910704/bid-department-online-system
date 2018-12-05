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
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
        label="下浮率"
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
          <span>{{ scope.row.score = Number(scope.row.tscore) + Number(scope.row.cscore) }}</span>
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
  </div>
</template>

<script>
import { autoCompleteCompany } from '../../api/compute'

export default {
  filter: {
    ScoreFilter: (val) => {
      if (val) {
        return val
      } else {
        return 0
      }
    }
  },
  data() {
    return {
      company: '',
      timeout: null,
      control: '',
      tableData: [{
        company: '默认公司',
        bid: 200000,
        rate: '',
        cscore: '',
        tscore: '',
        score: '',
        order: ''
      }]
    }
  },
  computed: {
    hash() { // notice: 这里不能使用箭头函数! can't use => here!
      let i = ''
      for (const element of this.tableData) {
        i += String(element.score)
      }
      return i
    }
  },
  watch: {
    hash(newVal, oldVal) {
      console.log(oldVal, newVal)
      const ordered = this.tableData.sort(function() {
        return (a, b) => {
          return a.score - b.score
        }
      })
      for (const element of this.tableData) {
        var i = ordered.find((value, index, arr) => {
          if (value.company === element.company) {
            return index
          }
        })
        element.order = i
      }
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
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.tableData.splice(row, 1)
    },
    onSubmit() {
      this.tableData.push({
        company: this.company
      })
    },
    controlChangeHandle(index, row) {
      if (Number(this.control)) {
        row.rate = Number(row.bid / this.control * 100).toFixed(2)
      }
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
