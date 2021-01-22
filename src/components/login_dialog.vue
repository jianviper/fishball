<template>
  <div>
    <el-dialog title="登录验证" :visible.sync="dialogVisible" center @close="cancel()" width="400px"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-form :model="form_data" label-position="top">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form_data.name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form_data.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-input type="text" style="display: none;" disabled autocomplete="off"></el-input>
        <el-input type="password" style="display: none;" disabled autocomplete="off"></el-input>
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="login()">确 定</el-button>
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
        form_data: {
          name: '',
          password: ''
        }
      }
    }
    ,
    methods: {
      cancel() {
        this.dialogVisible = false;
        this.form_data.name = '';
        this.form_data.password = '';
      },
      login() {
        this.dialogVisible = false;
        this.$router.push({path: '/manage'});
      },
      change_dialog() {
        this.dialogVisible = true;
      }
    },
  }
</script>

<style scoped>

</style>
