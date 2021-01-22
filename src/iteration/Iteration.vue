<template>
  <section>
    <page_header :content="content"></page_header>
    <!--    成员列表-->
    <el-table :data="data_person" style="width: 100%" stripe show-summary>
      <el-table-column prop="id" label="ID" width="180" sortable>
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
    <el-dialog title="鱼丸详情" :visible.sync="dialogTableVisible">
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(act, index) in activities" :key="index" :timestamp="act.timestamp">
          <div>
            <span><strong>[任务]</strong> {{act.task}}</span>
          </div>
          <strong :style="act.status=='未完成'?{color:'red'}:{color:'black'}">[{{act.status}}]</strong>
          <span>鱼丸</span> <span v-if="act.num>0">+</span>{{act.num}}
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
        row: null,
        data_person: [
          {id: 1, name: '张三', job: '产品', number: 100},
          {id: 2, name: '李四', job: '测试', number: 123},
          {id: 3, name: '王五', job: '前端', number: 232},
          {id: 4, name: '赵柳', job: '后端', number: 124},
          {id: 5, name: '李琦', job: 'UI', number: 341},
        ],
        reverse: true,
        activities: [{
          status: '完成',
          task: '新增登录功能',
          num: 2,
          timestamp: '2018-04-15'
        }, {
          status: '未完成',
          task: '新增登录功能',
          num: -2,
          timestamp: '2018-04-13'
        }, {
          status: '完成',
          task: '新增登录功能',
          num: 3,
          timestamp: '2018-04-11'
        }],
      }
    },
    methods: {
      getID() {
        let params_id = this.$route.params.id;
        this.content = '迭代' + params_id;
        console.log('params:' + params_id);
      },
      get_details(row) {
        this.dialogTableVisible = true;
        this.row = row;
        console.log(row.name);
      }
    },
    mounted: function () {
      this.getID();
    }
  }
</script>

<style scoped>

</style>
