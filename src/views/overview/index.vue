<template>
  <div>
    <el-row>
      <el-col :span="12"><h3>当年中标情况</h3></el-col>
      <el-col :span="12"><h3>分公司当年指标落实度情况</h3></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-light"><static-pie /></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"><fullfill /></div></el-col>
    </el-row>
    <el-row>
      <h3>当年月度投标中标情况</h3>
    </el-row>
    <el-row>
      <colstatus/>
    </el-row>
  </div>
</template>
<script>
import StaticPie from './components/static-pie'
import Fullfill from './components/fullfill'
import Colstatus from './components/colstatus'
export default {
  components: { StaticPie, Fullfill, Colstatus }
}
</script>
<style lang="scss" >
h3{
  text-align: center;
}
</style>

