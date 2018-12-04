<template>
  <div>
    <el-autocomplete
      v-model="company"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import { autoCompleteCompany } from '../../api/compute'

export default {
  data() {
    return {
      company: '',
      timeout: null
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      autoCompleteCompany({ company: queryString }).then(response => {
        for (let i of response.data) {
          i.value = i.biddername// 将想要展示的数据作为value
        }
        var list = response.data
        cb(list)
      }, response => {
        console.log(response.code)
      }).catch(e => {
        // console.log(e)
      })
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");

</style>
