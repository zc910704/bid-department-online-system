<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="text item">
        <div class="dashboard-text">name:{{ name }}</div>
        <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
        <div class="dashboard-text">user:{{ status.user }}</div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>服务器状态</span>
      </div>
      <div class="text item">
        <div class="dashboard-text">CPU负载:{{ status.cpu_load }}%</div>
        <div class="dashboard-text">内存使用:{{ status.memo_load }}%</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getStatus } from '@/api/status'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      status: {
        cpu_load: 0,
        memo_load: 0,
        user: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.loadStatus()
  },
  methods: {
    loadStatus() {
      getStatus().then(response => {
        this.status = response.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  float: left;
  margin: 5px 5px 5px 5px;
  width: 400px;
}
</style>
