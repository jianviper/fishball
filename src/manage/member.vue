<template>
  <section>
    <!--    成员列表-->
    <el-table :data="data_member" style="width: 100%" stripe>
      <el-table-column prop="member_id" label="ID" width="180" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template slot-scope="{row,$index}">
          <el-input v-if="currentEdit==$index" v-model="row.name" @change="watch_change"></el-input>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="job" label="岗位">
        <template slot-scope="{row,$index}">
          <el-input v-if="currentEdit==$index" v-model="row.job" @change="watch_change"></el-input>
          <span v-else>{{ row.job }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="鱼丸数" sortable>
        <template slot-scope="{row,$index}">
          <p class="ball_detail" @click="ball_detail_dia(row)">
            <i class="el-icon-mouse"></i>
            <span>{{ row.number }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="{row,$index}">
          <el-button type="text" size="small" @click="finishEditClick($index,row)" v-if="currentEdit === $index">完成
          </el-button>
          <!--          <el-button>详情</el-button>-->
          <el-button type="text" size="small" @click="handleEdit($index, row)" v-else>编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete($index, row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--鱼丸详情弹窗-->
    <el-dialog title="鱼丸详情" :visible.sync="dialogballVisible" @close="close_balldia">
      <div class="timeline">
        <div style="flex: 1 0 50%">
          <h1>鱼丸获得详情</h1>
          <el-select v-model="op_iter_id" placeholder="请选择迭代" @change="get_ballDetail">
            <el-option
              v-for="item in iter_options"
              :key="item.iter_id"
              :label="item.name"
              :value="item.iter_id">
            </el-option>
          </el-select>
          <el-timeline :reverse="reverse">
            <el-timeline-item v-for="(act, index) in activities" :key="index" :timestamp="act.task_date"
                              :color="act.status==1?'green':'red'">
              <div><strong>[任务] </strong>{{ act.task_detail }}</div>
              <div>
                <p>
                  <strong :style="{color:'green'}" v-if="act.status==1">[完成]</strong>
                  <strong :style="{color:'red'}" v-else="act.status==0">[未完成]</strong>
                  鱼丸 <span v-if="act.get_num>0">+</span>{{ act.get_num }}
                  <span v-if="act.count" class="ball_count">剩余 {{ act.count }}</span>
                </p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div style="flex: 1 0 50%">
          <h1>鱼丸使用详情</h1>
          <el-timeline>
            <el-timeline-item v-for="(used,index) in used_ball" :key="index" :timestamp="used.use_date">
              <div><strong>[项目] </strong>{{ used.use_detail }}</div>
              <p>鱼丸 <strong style="color:red">-{{ used.use_num }}</strong><span class="ball_count">剩余 {{
                  used.count
                }}</span></p>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "member",
  data() {
    return {
      currentEdit: -1, //当前行号
      content: '',
      dialogTableVisible: false,
      dialogballVisible: false,
      op_iter_id: '',
      iter_options: [],
      activities: [],// 任务鱼丸详情
      used_ball: [],//鱼丸使用详情
      row: null,
      data_member: [],
      reverse: true,
      changed: false,
    }
  },
  methods: {
    watch_change() { //监控有没有修改
      this.changed = true;
    },
    get_member() {
      this.$axios.get('http://192.168.105.132:8001/api/member').then((response) => {
        this.data_member = response.data;
      })
    },
    ball_detail_dia(row) {
      console.log(row);
      this.dialogballVisible = true;
      this.get_iter_details(row)
    },
    get_iter_details(row) {
      this.dialogTableVisible = true;
      this.row = row;
      console.log(row);
      this.$axios.get('http://192.168.105.132:8001/api/iters').then((response) => {
        console.log(response.data);
        this.iter_options = response.data;
      })
      this.get_ball_usedDetail(row.member_id);
    },
    get_ballDetail(iter_id) {
      this.$axios
        .get('http://192.168.105.132:8001/api/member_ball_detail?member_id=' + this.row.member_id + '&iter_id=' + iter_id)
        .then((response) => {
          // console.log(response.data);
          this.activities = response.data.data;
        })
    },
    get_ball_usedDetail(m_id) {
      this.$axios.get('http://192.168.105.132:8001/api/used?member_id=' + m_id).then((response) => {
        console.log(response);
        this.used_ball = response.data;
      })
    },
    handleEdit(index, row) { //点击编辑
      this.currentEdit = index;
      console.log(index, row);
    },
    finishEditClick(index, row) { //完成提交编辑
      console.log(index, row, this.row);
      if (this.changed) { //有修改才提交接口
        if (row.name && row.job) {
          this.$axios.post('http://192.168.105.132:8001/api/update_member', row).then((response) => {
            this.currentEdit = -1;
            this.$message.success('更新成功');
            this.changed = false;
          })
        } else {
          this.$message.warning('请填写必要信息');
        }
      } else {
        this.currentEdit = -1;
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('http://192.168.105.132:8001/api/delete_member/?member_id=' + row.member_id).then((response) => {
          this.get_member();
          this.$message.success('删除成功');
        }).catch(() => {
          this.$message.warning('删除失败');
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    close_balldia() {
      this.op_iter_id = '';
      this.activities = [];
      this.used_ball = [];
    }
  },
  mounted() {
    // this.get_member();
  }
}
</script>

<style scoped>
.ball_detail {
  cursor: pointer;
}

.ball_detail:hover {
  color: blue;
}

.timeline {
  display: flex;
}

h1 {
  margin-top: 0;
  margin-bottom: 10px;
}

.el-timeline {
  padding-left: 0;
  padding-right: 10px;
  margin-top: 10px;
}

.ball_count {
  padding-left: 10px;
}
</style>
