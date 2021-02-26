<template>
  <div>
    <el-dialog title="登录验证" :visible.sync="dialogVisible" center @close="cancel()" width="400px"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-form :model="form_data" label-position="top" :rules="rules" ref="form_data">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form_data.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="form_data.password" autocomplete="off"
                    @keyup.enter.native="login(form_data)"></el-input>
        </el-form-item>
        <span v-if="isShow" class="el-message-box__errormsg">账号或密码错误</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-input type="text" style="display: none;" disabled autocomplete="off"></el-input>
        <el-input type="password" style="display: none;" disabled autocomplete="off"></el-input>
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="login(form_data)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login_dialog",
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      form_data: {},
      isShow: false,
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: ['blur', 'change']},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: ['blur', 'change']},
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
      // this.form_data = {};
      this.$nextTick(() => {
        this.$refs['form_data'].resetFields();
        this.isShow = false;
      })
    },
    login(data) {
      this.$refs['form_data'].validate((vaild) => {
        if (vaild) {
          this.$axios.post('/login', data).then((response) => {
            if (response.data.code == 200) {
              this.$message.success('登录成功');
              this.dialogVisible = false;
              localStorage.setItem('token',response.data.data.token);
              this.$router.push({path: '/manage'});
            } else {
              this.isShow = true;
            }
          })
        } else {
          return false;
        }
      })
    },
    change_dialog() {
      this.dialogVisible = true;
      // this.$refs['form_data'].resetFields();
    }
  },
}
</script>

<style scoped>

</style>
