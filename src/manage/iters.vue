<template>
  <section>
    <el-table :data="data_iter.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%"
              :cell-style="{padding:'7px 0'}">
      <el-table-column prop="iter_id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="name" label="名称" sortable>
        <template slot-scope="{row,$index}">
          <el-input v-if="currentEdit==$index" v-model="row.name" @change="watch_change"></el-input>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="迭代目标">
        <template slot-scope="{row,$index}">
          <el-input v-if="currentEdit==$index" v-model="row.detail" @change="watch_change"></el-input>
          <span v-else>{{ row.detail }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_date" label="开始时间" width="200">
        <template slot-scope="{row,$index}">
          <el-date-picker class="date_picker" v-if="currentEdit==$index" v-model="row.start_date" type="date"
                          placeholder="选择日期" value-format="yyyy-MM-dd" @change="watch_change">
          </el-date-picker>
          <p v-else>{{ row.start_date.split('T')[0] }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="end_date" label="结束时间" width="200">
        <template slot-scope="{row,$index}">
          <el-date-picker class="date_picker" v-if="currentEdit==$index" v-model="row.end_date" type="date"
                          placeholder="选择日期" value-format="yyyy-MM-dd" @change="watch_change">
          </el-date-picker>
          <p v-else>{{ row.end_date.split('T')[0] }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="{row,$index}">
          <el-select v-if="currentEdit==$index" v-model="row.status" placeholder="请选择" @change="watch_change">
            <el-option
              v-for="item in ops_status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div v-else>
            <div v-if="row.status==0">未完成</div>
            <div v-else-if="row.status==1">完成</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="鱼丸发放数" width="120">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="{row,$index}">
          <el-button type="text" size="small" @click="finishEditClick($index, row)" v-if="currentEdit === $index">完成
          </el-button>
          <el-button type="text" size="small" @click="handleEdit($index, row)" v-else>编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete($index, row)">删除
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
  name: "iters",
  data() {
    return {
      currentEdit: -1,
      data_iter: [],
      ops_status: [{
        value: 1,
        label: '完成'
      }, {
        value: 0,
        label: '未完成'
      }],
      // value: 0,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      changed: false,
    }
  },
  methods: {
    watch_change() { //监控有没有修改
      this.changed = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.currentEdit = index;
    },
    finishEditClick(index, row) { //更新迭代数据
      console.log(index, row);
      if (this.changed) {
        if (row.name && row.start_date && row.end_date && row.detail) {
          this.$axios.put('/update_iter', row).then((response) => {
            this.currentEdit = -1;
            this.changed = false;
            this.$message.success('更新成功');
          })
        } else {
          this.$message.warning('请填写必要信息');
        }
      } else {
        this.currentEdit = -1;
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/delete_iter/?iter_id=' + row.iter_id).then((response) => {
          this.get_iters();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message.warning('删除失败');
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    get_iters() {
      this.$axios.get('/iters').then((response) => {
        // console.log(response.data);
        this.data_iter = response.data;
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
  created() {
    this.get_iters();
  }
}
</script>

<style scoped>
.name_link {
  text-decoration: none;
}

.date_picker {
  width: 90%;
}

.block {
  margin-top: 10px;
}
</style>
