<template>
  <!--    成员列表-->
  <el-table :data="data_member" style="width: 100%" stripe show-summary>
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
</template>

<script>
  export default {
    name: "member",
    data() {
      return {
        content: '',
        dialogTableVisible: false,
        row: null,
        data_member: [],
        data_member1: [
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
      get_details(row) {
        this.dialogTableVisible = true;
        this.row = row;
        console.log(row.name);
      },
      get_member() {
        this.$axios.get('http://127.0.0.1:8001/api/member').then((response) => {
          console.log(response.data);
          this.data_member = response.data;
        })
      }
    },
    mounted() {
      this.get_member();
    }
  }
</script>

<style scoped>

</style>
