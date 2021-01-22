<template>
  <el-dialog title="创建迭代" :visible.sync="dialogVisible" width="560px" @close="close_dialog()">
    <el-form :model="iter_form" label-position="top" ref="iter_form">
      <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
        <el-input v-model="iter_form.name" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <div style="display:flex">
        <el-form-item prop="start_date" label="开始时间" style="flex: 1 0 50%">
          <el-date-picker class="date_picker" v-model="iter_form.start_date" type="date" placeholder="选择日期"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="end_date" label="结束时间">
          <el-date-picker class="date_picker" v-model="iter_form.end_date" type="date" placeholder="选择日期"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </div>
      <el-form-item prop="detail" label="迭代目标" :label-width="formLabelWidth">
        <el-input v-model="iter_form.detail" type="textarea" placeholder="请输入迭代目标"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add_submit(iter_form)">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "add_iter",
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '120px',
        iter_form: {},
      }
    },
    methods: {
      add_submit(data) {
        console.log(data);
        this.dialogVisible = false;
        this.$axios.post('http://localhost:8001/api/add_iter', data).then((response) => {
          console.log(response.data);
          this.$emit('emit_iter');
        })
      },
      change_dialog() {
        this.dialogVisible = true;
      },
      cancel() {
        this.dialogVisible = false;
        this.$refs.iter_form.resetFields();
      },
      close_dialog() {
        this.$refs.iter_form.resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
