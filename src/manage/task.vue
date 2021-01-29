<template>
  <section>
    <!--    任务列表-->
    <el-table :data="data_task" style="width: 100%" stripe>
      <el-table-column prop="task_id" label="ID" width="80" sortable>
      </el-table-column>
      <el-table-column prop="iter_name" label="迭代名称">
        <!--        <template slot-scope="{row,$index}">-->
        <!--          <el-input v-if="currentEdit==$index" v-model="row.iter_name"></el-input>-->
        <!--          <span v-else>{{ row.iter_name }}</span>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column prop="member_name" label="执行人">
        <!--        <template slot-scope="{row,$index}">-->
        <!--          <el-input v-if="currentEdit==$index" v-model="row.member_name"></el-input>-->
        <!--          <span v-else>{{ row.member_name }}</span>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column prop="task_detail" label="任务" width="500">
        <template slot-scope="{row,$index}">
          <el-input v-if="currentEdit==$index" v-model="row.task_detail" type="textarea"></el-input>
          <span v-else>{{ row.task_detail }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="target_num" label="奖励鱼丸数" width="100">
      </el-table-column>
      <el-table-column prop="get_num" label="实得鱼丸数" width="100">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="{row,$index}">
          <el-button type="text" size="small" @click="finishEditClick($index,row)" v-if="currentEdit === $index">完成
          </el-button>
          <el-button type="text" size="small" @click="handleEdit($index, row)" v-else>编辑</el-button>
          <el-button size="small" type="success " @click="handleComplete($index, row)">结算</el-button>
          <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="完成任务" :visible.sync="completeVisible" width="600px" @close="close_complete()">
      <el-radio-group v-model="radio" @change="rad">
        <el-radio label=1>完成</el-radio>
        <el-radio label=0>未完成</el-radio>
      </el-radio-group>
      <el-button type="primary" @click="taskComplete" style="margin-left: 20px">确定</el-button>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "task",
  data() {
    return {
      currentEdit: -1,
      content: '',
      dialogTableVisible: false,
      completeVisible: false,
      radio: '1',
      data_task: [],
      reverse: true,
      row: '', //行数据
    }
  },
  methods: {
    rad() {
      console.log(this.radio);
    },
    get_task() {
      this.$axios.get('http://192.168.105.132:8001/api/task').then((response) => {
        console.log(response.data);
        this.data_task = response.data;
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.currentEdit = index;
      this.value = row.status;
    },
    finishEditClick(index, row) {
      console.log(index, row);
      let params = {task_id: row.task_id, task_detail: row.task_detail};
      this.$axios.patch('http://192.168.105.132:8001/api/update_task', params).then((response) => {
        this.currentEdit = -1;
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('http://192.168.105.132:8001/api/delete_task/?task_id=' + row.task_id).then((response) => {
          this.get_task();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '删除失败'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleComplete(index, row) { //点击 完成 打开弹窗
      this.completeVisible = true;
      this.row = row;
      this.radio = row.status.toString();
      console.log(this.row);
    },
    close_complete() {
      this.completeVisible = false;
    },
    taskComplete() { //点击 确定
      let url_params = this.row.task_id + '&status=' + this.radio + '&member_id=' + this.row.member_id
      this.$axios.get('http://192.168.105.132:8001/api/complete_task/?task_id=' + url_params).then((response) => {
        console.log(response.data.data);
        this.row.status = parseInt(this.radio);
        this.completeVisible = false;
        this.data_task = response.data.data;
      })
    },
  },
  mounted() {
    // this.get_task();
  }
}
</script>

<style scoped>

</style>
