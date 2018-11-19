<template>
  <ve-pie :data="chartData"/>
</template>
<script>
import Vue from 'vue'
import VCharts from 'v-charts'
Vue.use(VCharts)
export default {
  name: 'StaticPie',
  data() {
    return {
      chartData: {
        columns: ['类别', '数量'],
        rows: [
          { 类别: '中标数', 数量: 1393 },
          { 类别: '投标数', 数量: 3530 }
        ]
      }
    }
  }
}
</script>

