<template>
  <section>
    <el-table :data="data_iter.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%">
      <el-table-column prop="iter_id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <router-link class="name_link"
                       :to="{path:'iteration/'+scope.row.name+'&'+scope.row.iter_id}">
            <i class="el-icon-mouse"></i>{{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="start_date" label="开始时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.start_date }}
        </template>
      </el-table-column>
      <el-table-column prop="end_date" label="结束时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.end_date }}
        </template>
      </el-table-column>
      <el-table-column prop="stage" label="阶段" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.status==0">未完成</div>
          <div v-else-if="scope.row.status==1">完成</div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="鱼丸发放数" width="120">
      </el-table-column>
      <el-table-column prop="detail" label="迭代目标" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <router-link :to="{path:'iteration/'+scope.row.name+'&'+scope.row.iter_id}" style="text-decoration: none">
            详情
          </router-link>
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
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios.get('/iters').then((response) => {
        console.log(response.data);
        this.data_iter = response.data;
        loading.close();
      }).catch((error) => {
        loading.close();
      })
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
    },
  },
  mounted() {
    this.get_iters();
  }
}
</script>

<style scoped>
.name_link {
  text-decoration: none;
  display: block;
}

.name_link:hover {
  color: blue;
  transition: all 0.4s; /*所有属性变化在0.4秒内执行动画*/
  -webkit-transform: translate(20px) scale(1.1);
  transform: translate(20px) scale(1.1); /*鼠标放上之后元素变成1.4倍大小*/
}

.block {
  margin-top: 10px;
}

</style>
