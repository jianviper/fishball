<template>
  <section>
    <div>
      <h1 class="hh">欢迎进入康康鱼丸管理后台</h1>
      <span class="logout" @click="logout">退出<i class="el-icon-d-arrow-right"></i></span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" addable>
      <el-tab-pane label="迭代管理" name="mg_iter">
        <iters ref="iters"/>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="mg_task">
        <task ref="task"/>
      </el-tab-pane>
      <el-tab-pane label="成员管理" name="mg_member">
        <member ref="member"/>
      </el-tab-pane>
      <el-tab-pane label="鱼丸使用管理" name="mg_ball_used">
        <used ref="used"/>
      </el-tab-pane>
    </el-tabs>
    <add_iter ref="add_iter" @emit_iter="iter_init"/>
    <add_member ref="add_member" @emit_member="member_init"/>
    <add_task ref="add_task" @emit_task="task_init"/>
    <add_used ref="add_used" @emit_used="used_init"/>
  </section>
</template>

<script>
import iters from './iters';
import add_iter from './add_iter'
import member from './member'
import add_member from "./add_member";
import task from './task'
import add_task from './add_task'
import used from './used'
import Add_used from "./add_used";

export default {
  name: "manage",
  components: {
    Add_used, iters, add_iter, member, add_member, task, add_task, used
  },
  data() {
    return {
      activeName: 'mg_iter',
      btn_name: '+创建迭代',
    };
  },
  methods: {
    handleClick(tab) {
      let addbtn = document.getElementsByClassName('el-tabs__new-tab')[0];
      if (tab.index == 0) {
        addbtn.innerText = '+创建迭代';
        addbtn.onclick = this.dialog_add_iter;
        this.$refs.iters.get_iters();
      } else if (tab.index == 1) {
        addbtn.innerText = '+添加任务';
        addbtn.onclick = this.dialog_add_task;
        this.$refs.task.get_task();
      } else if (tab.index == 2) {
        addbtn.innerText = '+添加成员';
        addbtn.onclick = this.dialog_add_member;
        this.$refs.member.get_member();
      } else if (tab.index == 3) {
        addbtn.innerText = '+添加记录';
        addbtn.onclick = this.dialog_add_used;
        this.$refs.used.get_used();
      }
    },
    dialog_add_iter() { //调用子组件方法
      this.$refs.add_iter.change_dialog();
    },
    dialog_add_task() {
      this.$refs.add_task.change_dialog();
      this.$refs.add_task.get_iter_info();
      this.$refs.add_task.get_member_info();
    },
    dialog_add_member() {
      this.$refs.add_member.change_dialog();
    },
    dialog_add_used() {
      this.$refs.add_used.change_dialog();
      this.$refs.add_used.get_member_info();
    },
    iter_init() {
      this.$refs.iters.get_iters();
    },
    member_init() {
      this.$refs.member.get_member();
    },
    task_init() {
      this.$refs.task.get_task();
    },
    used_init() {
      this.$refs.used.get_used();
    },
    logout() {
      this.$confirm('确认退出登录？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        this.$router.push('/');
        this.$message.info('退出登录成功');
      })
    }
  },
  mounted() {
    let addbtn = document.getElementsByClassName('el-tabs__new-tab')[0];
    addbtn.innerText = this.btn_name;
    addbtn.style.width = '100px';
    addbtn.style.height = '30px';
    addbtn.style.marginTop = '0px';
    addbtn.style.lineHeight = '30px';
    addbtn.style.backgroundColor = 'black';
    addbtn.style.fontSize = 'medium';
    addbtn.onclick = this.dialog_add_iter;
  }
}
</script>

<style scoped>
.hh {
  margin: 0;
  margin-bottom: 10px;
  display: inline-block;
}

.logout {
  display: inline-block;
  float: right;
}

.logout:hover {
  cursor: pointer;
  color: blue;
}
</style>
