<template>
  <!--    成员列表-->
  <el-table :data="data_member" style="width: 100%" stripe>
    <el-table-column prop="m_id" label="ID" width="180" sortable>
    </el-table-column>
    <el-table-column prop="name" label="姓名">
      <template slot-scope="{row,$index}">
        <el-input v-if="currentEdit==$index" v-model="row.name"></el-input>
        <span v-else>{{row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="job" label="岗位">
      <template slot-scope="{row,$index}">
        <el-input v-if="currentEdit==$index" v-model="row.job"></el-input>
        <span v-else>{{row.job}}</span>
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
        currentEdit: -1,
        content: '',
        dialogTableVisible: false,
        row: null,
        data_member: [],
        reverse: true,
      }
    },
    methods: {
      get_details(row) {
        this.dialogTableVisible = true;
        this.row = row;
        console.log(row.name);
      },
      get_member() {
        this.$axios.get('http://127.0.0.1:8001/api/member').then((response) => {
          console.log(response.data);
          this.data_member = response.data;
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.currentEdit = index;
        this.value = row.status;
      },
      finishEditClick(index, row) {
        console.log(index, row);
        this.$axios.post('http://127.0.0.1:8001/api/update_member', row).then((response) => {
          this.currentEdit = -1;
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete('http://127.0.0.1:8001/api/delete_member/?m_id=' + row.m_id).then((response) => {
            this.get_member();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '删除失败'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    mounted() {
      this.get_member();
    }
  }
</script>

<style scoped>

</style>
