<template>
  <div>
    <!-- 当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 标签上添加 @submit.native.prevent。 -->
    <el-form :inline="true" v-model="search" style="margin-top: 20px;margin-left:10px" @submit.native.prevent>
      <el-form-item label="搜索">
        <el-input v-model="search.keyword" placeholder="输入搜索内容" @keyup.native.enter="onSearch"/>
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
        prop="contract__contractName"
        label="合同名称"
        align="center"/>
      <el-table-column
        label="合同日期"
        width="130"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.contract__contractDate" class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.contract__contractDate | DateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="item"
        label="清单名称"
        align="center"/>
      <el-table-column
        label="清单特征"
        prop="feature"
        align="center"/>
      <el-table-column
        label="清单内容"
        prop="description"
        align="center"/>
      <el-table-column
        prop="unit"
        label="单位"
        width="50px"
        align="center"/>
      <el-table-column
        label="不含税价"
        width="100px"
        align="center">
        <template v-if="scope.row.item" slot-scope="scope">
          {{ scope.row.priceNet | DecimalFormat }}
        </template>
      </el-table-column>
      <el-table-column
        prop="priceTaxed"
        label="含税价"
        width="100px"
        align="center"/>
      <el-table-column
        prop="comment"
        label="备注"
        align="center"/>
    </el-table>
  </div>
</template>
<script>
import Moment from 'moment'
import { searchContractPrice } from '@/api/contract'

export default {
  filters: {
    DateFormat: val => {
      if (val) return Moment(val).format('YYYY-MM-DD')
    },
    DecimalFormat: val => {
      return Number(val).toFixed(2)
    }
  },
  components:
  {
  },
  data() {
    return {
      search: {
        keyword: ''
      },
      loading: false,
      tableData: [
        {
          contract__contractName: '',
          contract__contractDate: '',
          item: '',
          feature: '',
          description: '',
          unit: '',
          priceNet: '',
          priceTaxed: '',
          comment: ''
        }
      ]
    }
  },
  methods: {
    onSearch: function() {
      this.loading = true
      searchContractPrice(this.search).then(response => {
        this.tableData = response.data
        this.tableData.forEach(element => {
          if (!element.priceNet) {
            if (element.priceTaxed) {
              element.priceNet = element.priceTaxed / 1.1
            }
          }
        })
        this.loading = false
      })
    }
  }
}
</script>
