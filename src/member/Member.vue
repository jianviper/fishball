<template>
  <section>
    <!--    成员列表-->
    <el-table :data="data_member" style="width: 100%" stripe>
      <el-table-column prop="member_id" label="ID" width="180" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="job" label="岗位">
      </el-table-column>
      <el-table-column prop="number" label="鱼丸数" sortable>
      </el-table-column>
      <el-table-column label="详情" fixed="right">
        <template slot-scope="scope">
          <el-button @click="get_iter_details(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--鱼丸详情弹窗-->
    <el-dialog title="鱼丸详情" :visible.sync="dialogTableVisible" @close="close_dia">
      <div class="timeline">
        <div style="flex: 1 0 50%">
          <h1>鱼丸获得详情</h1>
          <el-select v-model="op_iter_id" placeholder="请选择迭代" @change="get_ballDetail">
            <el-option
              v-for="item in iter_options"
              :key="item.iter_id"
              :label="item.name"
              :value="item.iter_id">
            </el-option>
          </el-select>
          <el-timeline :reverse="reverse">
            <el-timeline-item v-for="(act, index) in activities" :key="index" :timestamp="act.task_date.split('T')[0]"
                              :color="act.status==1?'green':'red'">
              <div><strong>[任务] </strong>{{ act.task_detail }}</div>
              <div>
                <p>
                  <strong :style="{color:'green'}" v-if="act.status==1">[完成]</strong>
                  <strong :style="{color:'red'}" v-else="act.status==0">[未完成]</strong>
                  鱼丸 <span v-if="act.get_num>0">+</span>{{ act.get_num }}
                  <span v-if="act.count" class="ball_count">剩余 {{ act.count }}</span>
                </p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div style="flex: 1 0 50%">
          <h1>鱼丸使用详情</h1>
          <el-timeline>
            <el-timeline-item v-for="(used,index) in used_ball" :key="index" :timestamp="used.use_date">
              <div><strong>[项目] </strong>{{ used.use_detail }}</div>
              <p>鱼丸 <strong style="color:red">-{{ used.use_num }}</strong><span class="ball_count">剩余 {{
                  used.count
                }}</span></p>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "member",
  data() {
    return {
      content: '',
      dialogTableVisible: false,
      data_member: [],
      reverse: true,
      activities: [],
      used_ball: [],
      op_iter_id: '',
      iter_options: [],
      row: '',
    }
  },
  methods: {
    get_iter_details(row) {
      this.dialogTableVisible = true;
      this.row = row;
      console.log(row);
      this.$axios.get('/iters').then((response) => {
        console.log(response.data);
        this.iter_options = response.data;
      })
      this.get_ball_usedDetail(row.member_id);
    },
    get_ballDetail(iter_id) {
      this.$axios
        .get('/member_ball_detail?member_id=' + this.row.member_id + '&iter_id=' + iter_id)
        .then((response) => {
          // console.log(response.data);
          this.activities = response.data.data;
        })
    },
    get_ball_usedDetail(m_id) {
      this.$axios.get('/used?member_id=' + m_id).then((response) => {
        console.log(response);
        this.used_ball = response.data;
      })
    },
    get_member() {
      this.$axios.get('/member').then((response) => {
        console.log(response.data);
        this.data_member = response.data;
      })
    },
    close_dia() {
      this.op_iter_id = '';
      this.activities = [];
      this.used_ball = [];
    }
  },
  mounted() {
    this.get_member();
  }
}
</script>

<style scoped>
.timeline {
  display: flex;
}

h1 {
  margin-top: 0;
}

p {
  margin: 0;
}

.el-timeline {
  padding-left: 0;
  padding-right: 10px;
  margin-top: 10px;
}

.ball_count {
  padding-left: 10px;
}
</style>
