<template>
  <el-dialog title="添加任务" :visible.sync="dialogVisible" width="560px" @close="close_dialog()">
    <el-form :model="task_form" label-position="top" ref="task_form">
      <el-form-item prop="iter_name" label="迭代名称" :label-width="formLabelWidth">
        <template>
          <el-select v-model="task_form.iter_id" placeholder="请选择">
            <el-option
              v-for="item in ops_iter" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item prop="member_name" label="执行人" :label-width="formLabelWidth">
        <template>
          <el-select v-model="task_form.member_name" placeholder="请选择">
            <el-option
              v-for="item in ops_iter" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add_submit(task_form)">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "add_task",
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '120px',
        task_form: {},
        ops_iter: [],//下拉列表-迭代
        ops_member: [],//下拉列表-成员
        value_iter: '',
        value_member: '',
      }
    },
    methods: {
      add_submit(data) {
        console.log(data);
        this.dialogVisible = false;
        this.$axios.post('http://localhost:8001/api/add_task', data).then((response) => {
          console.log(response.data);
          this.$emit('emit_task');
          this.task_form = {};
        })
      },
      change_dialog() {
        this.dialogVisible = true;
      },
      cancel() {
        this.dialogVisible = false;
        this.$refs.task_form.resetFields();
      },
      close_dialog() {
        this.$refs.task_form.resetFields();
      },
      get_iter_info() { //获取迭代信息
        let iters = [];
        this.$axios.get('http://localhost:8001/api/iters').then((response) => {
          console.log('iter_info');
          response.data.map((value, index) => {
            // console.log(index, value.iter_id, value.name);
            this.ops_iter.push({value: value.iter_id, label: value.name});
          });
          console.log(this.ops_iter);
        })
      },
    },
    mounted() {
      this.get_iter_info();
    }
  }
</script>

<style scoped>

</style>
