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
          <el-button @click="get_details(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--鱼丸详情弹窗-->
    <el-dialog title="鱼丸详情" :visible.sync="dialogTableVisible" @close="close_dia">
      <el-select v-model="op_iter_id" placeholder="请选择迭代" @change="get_ballDetail" style="margin:0 0 20px 40px">
        <el-option
          v-for="item in options"
          :key="item.iter_id"
          :label="item.name"
          :value="item.iter_id">
        </el-option>
      </el-select>
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(act, index) in activities" :key="index" :timestamp="act.task_date.split('T')[0]"
                          :color="act.status==1?'green':'red'">
          <div><strong>[任务]</strong> {{ act.task_detail }}</div>
          <div>
            <strong :style="{color:'green'}" v-if="act.status==1">[完成]</strong>
            <strong :style="{color:'red'}" v-else="act.status==0">[未完成]</strong>
            <span>鱼丸</span> <span v-if="act.get_num>0">+</span>{{ act.get_num }}
          </div>
        </el-timeline-item>
      </el-timeline>
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
      op_iter_id: '',
      options: [],
      row: '',
    }
  },
  methods: {
    get_details(row) {
      this.dialogTableVisible = true;
      this.row = row;
      this.$axios.get('http://192.168.105.132:8001/api/iters').then((response) => {
        console.log(response.data);
        this.options = response.data;
      })
    },
    get_ballDetail(iter_id) {
      this.$axios
        .get('http://192.168.105.132:8001/api/member_ball_detail?member_id=' + this.row.member_id + '&iter_id=' + iter_id)
        .then((response) => {
          // console.log(response.data);
          this.activities = response.data.data;
        })
    },
    get_member() {
      this.$axios.get('http://192.168.105.132:8001/api/member').then((response) => {
        console.log(response.data);
        this.data_member = response.data;
      })
    },
    close_dia(){
      this.op_iter_id='';
      this.activities=[];
    }
  },
  mounted() {
    this.get_member();
  }
}
</script>

<style scoped>
</style>
