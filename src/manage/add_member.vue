<template>
  <el-dialog title="添加成员" :visible.sync="dialogVisible" width="560px" @close="close_dialog()">
    <el-form :model="member_form" label-position="top" ref="member_form" :rules="rules">
      <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
        <el-input v-model="member_form.name" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <div style="display:flex">
        <el-form-item prop="job" label="职位" style="flex: 1 0 50%">
          <el-input v-model="member_form.job" autocomplete="off" placeholder="请输入职位"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add_submit(member_form)">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: "add_member",
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      member_form: {},
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 5, message: '姓名长度在2到5个字符', trigger: "blur"}
        ],
        job: [
          {required: true, message: '请输入岗位', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    add_submit(data) {
      console.log(data);
      this.$refs['member_form'].validate((valid) => {
        if (valid) {
          this.$axios.post('http://192.168.105.132:8001/api/add_member', data).then((response) => {
            console.log(response.data);
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.$emit('emit_member');
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
      this.$refs.member_form.resetFields();
    },
    close_dialog() {
      this.$refs.member_form.resetFields();
    }
  }
}
</script>

<style scoped>

</style>
