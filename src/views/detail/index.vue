<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 20px;margin-left:10px">
      <el-form-item label="搜索">
        <el-input v-model="formInline.search" placeholder="输入搜索内容"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180"/>
      <el-table-column
        prop="company"
        label="公司"
        width="180"/>
      <el-table-column
        prop="item"
        label="投标项目"/>
      <el-table-column
        prop="price"
        label="报价"/>
      <el-table-column
        prop="rate"
        label="下浮率"/>
      <el-table-column
        prop="isGot"
        label="是否中标"/>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          company: '中建七局',
          item: '秦潭湖综合治理',
          price: 250000000,
          rate: '50%',
          isGot: this.isGottoString(true)
        },
        {
          date: '2016-05-02',
          company: '铁4局',
          item: '秦潭湖综合治理',
          price: 280000000,
          rate: '56%',
          isGot: this.isGottoString(false)
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
  methods: {
    isGottoString: val => {
      if (val) {
        return '是'
      } else {
        return '否'
      }
    }
  }
}
</script>
