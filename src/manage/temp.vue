<template>
  <el-table :data="data_iter" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="180">
    </el-table-column>
    <el-table-column prop="name" label="名称">
    </el-table-column>
    <el-table-column prop="start_date" label="开始时间">
      <template slot-scope="scope">
        {{scope.row.start_date.split('T')[0]}}
      </template>
    </el-table-column>
    <el-table-column prop="end_date" label="结束时间">
      <template slot-scope="scope">
        {{scope.row.end_date.split('T')[0]}}
      </template>
    </el-table-column>
    <el-table-column prop="stage" label="阶段">
      <template slot-scope="scope">
        <div v-if="scope.row.status==0">未完成</div>
        <div v-else-if="scope.row.status==1">完成</div>
      </template>
    </el-table-column>
    <el-table-column prop="number" label="鱼丸发放数">
    </el-table-column>
    <el-table-column v-if="is_edit==true" label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="finishEditClick(scope)" v-if="currentEdit === scope.$index">完成
        </el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)" v-else>编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
  export default {
    name: "temp",
    data() {
      return {
        currentEdit: -1,
        number: 100,
        data_iter: [],
        tableTitle: [
          {
            title: "ID",
            prop: "id",
          },
          {
            title: "名称",
            prop: "name"
          },
          {
            title: "开始时间",
            prop: "start_date"
          },
          {
            title: "结束时间",
            prop: "end_date"
          },
          {
            title: "状态",
            prop: "status"
          },
          {
            title: "鱼丸数",
            prop: "number"
          },
        ],
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.currentEdit = index;
      },
      finishEditClick(scope) {
        console.log(scope);
        this.currentEdit = -1;
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    props: [
      'is_link', 'is_edit'
    ],
    created() {
      this.$axios.get('http://192.168.105.132:8000/api/iters').then((response) => {
        console.log(response.data);
        this.data_iter = response.data;
      })
    }
  }
</script>

<style scoped>
  .name_link {
    text-decoration: none;
  }
</style>
