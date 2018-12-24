<template>
  <div class="dashboard-container">
    <el-row type="flex">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <div class="text item">
          <div class="dashboard-text">name:{{ name }}</div>
          <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
          <div class="dashboard-text">user:{{ status.user }}</div>
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>服务器状态</span>
        </div>
        <div class="text item">
          <div class="dashboard-text">CPU负载:{{ status.cpu_load }}%</div>
          <div class="dashboard-text">内存使用:{{ status.memo_load }}%</div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-col :span="24" class="update">
        <div class="update-header">
          最近更新
        </div>
        <div class="text item">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="item in update" :key="item.id" :title="item.title" :name="item.id" align="left">
              <p>{{ item.time | DateFormat }} </p>
              {{ item.content }}
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStatus, getUpdate } from '@/api/status'
import { mapGetters } from 'vuex'
import Moment from 'moment'

export default {
  name: 'Dashboard',
  filters: {
    DateFormat: val => Moment(val).format('YYYY-MM-DD HH:MM')
  },
  data() {
    return {
      status: {
        cpu_load: 0,
        memo_load: 0,
        user: ''
      },
      update: [{
        id: '',
        title: '',
        time: '',
        content: ''
      }],
      activeNames: ['1']
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
    this.loadUpdate()
  },
  methods: {
    loadStatus() {
      getStatus().then(response => {
        this.status = response.data
      })
    },
    loadUpdate() {
      getUpdate().then(response => {
        this.update = response.data
      })
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    height: 100%;
    position:absolute;
    width: 100%;
    top: 0px;
    bottom: 30px;
    padding: 30px;
    margin: 0px;
  }
  &-text {
    font-size: 18px;
    line-height: 28px;
  }
}
.text {
  font-size: 10px;
}
.item {
  margin-bottom: 15px;
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
  width: 300px;
}
  .update{
    bottom: 0px;
    margin: 20px;
  }
  .update-header{
    margin: 55px 0px 15px 0px;
  }
</style>
