<template>
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
      ]
    }
  },
  methods: {
    isGottoString: (val) => {
      if (val) {
        return '是'
      } else {
        return '否'
      }
    }
  }
}
</script>
