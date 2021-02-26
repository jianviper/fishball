<template>
  <section>
    <page_header :content="content"></page_header>
    <!--    成员列表-->
    <el-table :data="data_iter_member" style="width: 100%" stripe show-summary>
      <!--      <el-table-column prop="$index" label="ID" width="180" sortable>-->
      <!--      </el-table-column>-->
      <el-table-column prop="member_name" label="姓名">
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
    <el-dialog title="鱼丸详情" :visible.sync="dialogTableVisible">
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
import page_header from '../components/Page_header'

export default {
  name: "iteration",
  components: {page_header},
  data() {
    return {
      content: '',
      dialogTableVisible: false,
      iter_id: '',
      data_iter_member: [],
      reverse: true,
      activities: [],
    }
  },
  methods: {
    getID() { //从url中获取迭代名称
      let iter_name = this.$route.params.id.split('&')[0];
      this.iter_id = this.$route.params.id.split('&')[1];
      this.content = iter_name;
    },
    get_iter_member() {
      this.$axios.get('/iter_member?iter_id=' + this.iter_id).then((response) => {
        console.log(response.data);
        this.data_iter_member = response.data;
      })
    },
    get_details(row) { //当前迭代成员的任务详细
      this.dialogTableVisible = true;
      console.log(row);
      this.$axios
        .get('/iter_member_detail?iter_id=' + this.iter_id + '&member_id=' + row.member_id)
        .then((response) => {
          // console.log(response.data);
          this.activities = response.data.data;
        })
    }
  },
  mounted: function () {
    this.getID();
    this.get_iter_member();
  }
}
</script>

<style scoped>

</style>
