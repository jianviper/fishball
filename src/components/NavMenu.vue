<template>
  <el-menu :default-active="change_index()" class="el-menu-demo" mode="horizontal" @select="handleSelect"
           background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <router-link to="/" class="router-link">
      <el-menu-item index="1">
        <label>主页</label>
      </el-menu-item>
    </router-link>
    <router-link to="/iterations" class="router-link">
      <el-menu-item index="2">
        <label>迭代</label>
      </el-menu-item>
    </router-link>
    <router-link to="/member" class="router-link">
      <el-menu-item index="3">
        <label>成员</label>
      </el-menu-item>
    </router-link>
    <router-link to="/baiduzhishu" class="router-link">
      <el-menu-item index="4">
        <label>百度指数</label>
      </el-menu-item>
    </router-link>
    <el-menu-item @click="sign_dialog()" style="float: right">
      <label>管理后台</label>
    </el-menu-item>
    <login_dialog ref="login_dialog"/>
  </el-menu>
</template>

<script>
import login_dialog from './login_dialog'

export default {
  name: "NavMenu",
  components: {login_dialog},
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      iter_form: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    handleSelect(key, path) {
      console.log(key, path);
    },
    cancel() {
      this.dialogFormVisible = false;
      this.iter_form.name = '';
      this.iter_form.password = '';
    },
    login(form_data) {
      console.log(form_data.name, form_data.password);
      this.dialogFormVisible = false;
      this.$router.push({path: '/manage'});
    },
    change_index() {
      let url = this.$route.path.split('/')[1];
      console.log(url);
      if (url == '') {
        return '1';
      } else if (url == 'iterations' || url == 'iteration') {
        return '2';
      } else if (url == 'member') {
        return '3';
      } else if (url == 'manage') {
        return '0';
      }
    },
    sign_dialog() {
      this.$refs.login_dialog.change_dialog();
    }
  },
}
</script>

<style scoped>
.router-link {
  display: inline-block;
  text-decoration: none;
}

label {
  cursor: pointer;
}

.router-manage {
  float: right;
}
</style>
