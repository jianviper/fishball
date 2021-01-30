<template>
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
    </el-table-column>
    <el-table-column label="操作" width="160">
      <template slot-scope="{row,$index}">
        <el-button type="text" size="small" @click="finishEditClick($index,row)" v-if="currentEdit === $index">完成
        </el-button>
        <el-button type="text" size="small" @click="handleEdit($index, row)" v-else>编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete($index, row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "member",
  data() {
    return {
      currentEdit: -1, //当前行号
      content: '',
      dialogTableVisible: false,
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
  },
  mounted() {
    // this.get_member();
  }
}
</script>

<style scoped>

</style>
