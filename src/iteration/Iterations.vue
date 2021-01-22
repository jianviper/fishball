<template>
  <section>
    <el-table :data="data_iter.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%">
      <el-table-column prop="iter_id" label="ID" width="80">
      </el-table-column>
      <el-table-column v-if="is_link==false" prop="name" label="名称">
      </el-table-column>
      <el-table-column v-else prop="name" label="名称">
        <template slot-scope="scope">
          <i class="el-icon-mouse"></i>
          <router-link class="name_link"
                       :to="{path:'iteration/'+scope.row.name}">
            {{scope.row.name}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="start_date" label="开始时间" width="150">
        <template slot-scope="scope">
          {{scope.row.start_date.split('T')[0]}}
        </template>
      </el-table-column>
      <el-table-column prop="end_date" label="结束时间" width="150">
        <template slot-scope="scope">
          {{scope.row.end_date.split('T')[0]}}
        </template>
      </el-table-column>
      <el-table-column prop="stage" label="阶段" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.status==0">未完成</div>
          <div v-else-if="scope.row.status==1">完成</div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="鱼丸发放数" width="150">
      </el-table-column>
      <el-table-column prop="detail" label="迭代目标" :show-overflow-tooltip="true">
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
    <!--  分页器-->
    <div class="block">
      <el-pagination align='right' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1,5,10,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="data_iter.length">
      </el-pagination>
    </div>
  </section>
</template>

<script>
  export default {
    name: "iterations",
    data() {
      return {
        currentEdit: -1,
        number: 100,
        data_iter: [],
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 10 // 每页的数据条数
      }
    },
    methods: {
      get_iters() {
        this.$axios.get('http://127.0.0.1:8001/api/iters').then((response) => {
          console.log(response.data);
          this.data_iter = response.data;
        }).catch((error) => {
          console.log(error);
        })
      },
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
      },
      //每页条数改变时触发 选择一页显示多少行
      handleSizeChange(val) {
        console.log('每页 ${val} 条');
        this.currentPage = 1;
        this.pageSize = val;
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        console.log('当前页: ${val}');
        this.currentPage = val;
      }
    },
    props: [
      'is_link', 'is_edit'
    ],
    mounted() {
      this.get_iters();
    }
  }
</script>

<style scoped>
  .name_link {
    text-decoration: none;
  }

  .block {
    margin-top: 10px;
  }
</style>
