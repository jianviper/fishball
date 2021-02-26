<template>
  <section>
    <!--    任务列表-->
    <el-table :data="data_task.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" stripe
              :default-sort="{prop: 'task_date', order: 'descending'}" :cell-style="{padding: '3px 0'}">
      <el-table-column prop="task_date" label="日期" width="120" sortable>
      </el-table-column>
      <el-table-column prop="iter_name" label="迭代名称" sortable>
        <!--        <template slot-scope="{row,$index}">-->
        <!--          <el-input v-if="currentEdit==$index" v-model="row.iter_name"></el-input>-->
        <!--          <span v-else>{{ row.iter_name }}</span>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column prop="task_detail" label="任务">
        <template slot-scope="{row,$index}">
          <el-input v-if="currentEdit==$index" v-model="row.task_detail" type="textarea"
                    @change="watch_change"></el-input>
          <span v-else>{{ row.task_detail }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="member_name" label="执行人" width="90" sortable>
        <!--        <template slot-scope="{row,$index}">-->
        <!--          <el-input v-if="currentEdit==$index" v-model="row.member_name"></el-input>-->
        <!--          <span v-else>{{ row.member_name }}</span>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column prop="target_num" label="奖励鱼丸数" width="120">
        <template slot-scope="{row,$index}">
          <el-input-number v-if="currentEdit==$index" v-model="row.target_num" @change="watch_change" size="small"
                           style="width: 100%" :min="1">
          </el-input-number>
          <span v-else>{{ row.target_num }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="get_num" label="实得鱼丸数" width="100">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="{row,$index}">
          <p v-if="row.status==0">
            <el-button type="text" size="small" @click="finishEditClick($index,row)" v-if="currentEdit === $index">完成
            </el-button>
            <el-button type="text" size="small" @click="handleEdit($index, row)" v-else>编辑</el-button>
            <el-button size="small" type="success " @click="handleComplete($index, row)">结算</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
          </p>
          <p v-else-if="row.status==1">
            <el-tag type="success" effect="dark">已完成</el-tag>
          </p>
          <p v-else-if="row.status==2">
            <el-tag type="danger" effect="dark">未完成</el-tag>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页器-->
    <div class="block">
      <el-pagination align='right' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1,5,10,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="data_task.length">
      </el-pagination>
    </div>
    <el-dialog title="完成任务" :visible.sync="completeVisible" width="500px" @close="close_complete()">
      <el-radio-group v-model="radio" @change="rad">
        <el-radio label=1>完成</el-radio>
        <el-radio label=0>未完成</el-radio>
      </el-radio-group>
      <div style="margin: 10px 0 10px 0">
        <label for="mark">完成情况(选填)</label>
        <el-input id="mark" type="textarea" v-model="row.mark" style="margin-top: 5px" placeholder="请填写完成情况"></el-input>
      </div>
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
      data_task: [], //任务数据
      reverse: true,
      row: '', //行数据
      changed: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    }
  },
  methods: {
    change(e) {
      this.$forceUpdate();
    },
    watch_change() { //监控有没有修改
      this.changed = true;
    },
    rad() {

    },
    get_task() {
      this.$axios.get('/task').then((response) => {
        console.log(response.data);
        this.data_task = response.data;
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.currentEdit = index;
    },
    finishEditClick(index, row) { //完成编辑
      console.log(index, row);
      if (this.changed) { //有修改才提交接口
        if (row.task_detail) {
          let params = {task_id: row.task_id, task_detail: row.task_detail, target_num: row.target_num};
          this.$axios.patch('/update_task', params).then((response) => {
            this.currentEdit = -1;
            this.changed = false;
            this.$message.success('更新成功');
          })
        } else {
          this.$message.warning('请填写必要信息');
        }
      } else {
        this.currentEdit = -1;
      }
    },
    handleDelete(index, row) {
      this.currentEdit = -1;
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/delete_task/?task_id=' + row.task_id).then((response) => {
          this.get_task();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message.warning('删除失败');
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleComplete(index, row) { //点击 结算 打开弹窗
      this.completeVisible = true;
      this.currentEdit = -1;
      this.row = row;
      // this.radio = row.status == 0 ? (row.status + 1).toString() : row.status;
      console.log(this.radio, this.row);
    },
    close_complete() {
      this.completeVisible = false;
    },
    taskComplete() { // 完成任务，点击 确定
      this.row.status = this.radio;
      // let params = {member: this.row.member_id, task_id: this.row.task_id, status: this.row.status, mark: this.row.mark}
      this.$axios.post('/complete_task', this.row).then((response) => {
        // console.log(response.data.data);
        this.row.status = parseInt(this.radio);
        this.completeVisible = false;
        this.data_task = response.data.data;
      })
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log('每页 ${val} 条');
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log('当前页: ${val}');
      this.currentPage = val;
    },
  },
  mounted() {
    // this.get_task();
  }
}
</script>

<style scoped>
.block {
  margin-top: 10px;
}
</style>
