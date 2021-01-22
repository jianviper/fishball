<template>
  <section>
    <h1 class="hh">欢迎进入管理后台</h1>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" addable>
      <el-tab-pane label="迭代管理" name="first">
        <iters ref="iters"/>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="second">
        <task ref="task"/>
      </el-tab-pane>
      <el-tab-pane label="成员管理" name="third">
        <member ref="member"/>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <add_iter ref="add_iter" @emit_iter="iter_init"/>
    <add_member ref="add_member" @emit_member="member_init"/>
    <add_task ref="add_task" @emit_task="task_init"/>
  </section>
</template>

<script>
  import iters from './Iters';
  import add_iter from './add_iter'
  import member from './member'
  import add_member from "./add_member";
  import task from './task'
  import add_task from './add_task'

  export default {
    name: "manage",
    components: {
      iters, add_iter, member, add_member, task, add_task,
    },
    data() {
      return {
        activeName: 'first',
        btn_name: '+创建迭代',
      };
    },
    methods: {
      handleClick(tab) {
        console.log(tab.index);
        let addbtn = document.getElementsByClassName('el-tabs__new-tab')[0];
        if (tab.index == 0) {
          addbtn.innerText = '+创建迭代';
          addbtn.onclick = this.dialog_add_iter;
        } else if (tab.index == 1) {
          addbtn.innerText = '+添加任务';
          addbtn.onclick = this.dialog_add_task;
        } else if (tab.index == 2) {
          addbtn.innerText = '+添加成员';
          addbtn.onclick = this.dialog_add_member;
        }
      },
      dialog_add_iter() {
        this.$refs.add_iter.change_dialog();
      },
      dialog_add_task() {
        this.$refs.add_task.change_dialog();
      },
      dialog_add_member() {
        this.$refs.add_member.change_dialog();
      },
      iter_init() {
        this.$refs.iters.get_iters();
      },
      member_init() {
        this.$refs.member.get_member();
      },
      task_init(){
        this.$refs.task.get_task();
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
  }
</style>
