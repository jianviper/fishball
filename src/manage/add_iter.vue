<template>
  <el-dialog title="创建迭代" :visible.sync="dialogVisible" width="560px" @close="close_dialog()">
    <el-form :model="iter_form" label-position="top" ref="iter_form" :rules="rules">
      <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
        <el-input v-model="iter_form.name" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <div style="display:flex">
        <el-form-item prop="start_date" label="开始时间" style="flex: 1 0 50%">
          <el-date-picker class="date_picker" v-model="iter_form.start_date" type="date" placeholder="选择日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="end_date" label="结束时间">
          <el-date-picker class="date_picker" v-model="iter_form.end_date" type="date" placeholder="选择日期"
                          value-format="yyyy-MM-dd">
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
      rules: {
        name: [
          {required: true, message: '请输入迭代名称', trigger: 'blur'},
          {min: 1, max: 10, message: '名称长度在1到10个字符', trigger: "blur"}
        ],
        detail: [
          {required: true, message: '请输入迭代目标', trigger: 'blur'},
        ],
        start_date: [
          {required: true, message: '请选择日期', trigger: 'blur'}
        ],
        end_date: [
          {required: true, message: '请选择时间', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    add_submit(data) {
      console.log(data);
      this.$refs['iter_form'].validate((valid) => {
        if (valid) {
          this.$axios.post('http://192.168.105.132:8001/api/add_iter', data).then((response) => {
            console.log(response.data.data);
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.$emit('emit_iter');
          })
        } else {
          return false;
        }
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
