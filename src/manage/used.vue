<template>
  <section>
    <el-table :data="data_used" style="width: 100%">
      <el-table-column prop="use_id" label="ID" sortable>
      </el-table-column>
      <el-table-column prop="member_name" label="姓名">
      </el-table-column>
      <el-table-column prop="use_detail" label="详情">
      </el-table-column>
      <el-table-column prop="use_num" label="消耗数量">
      </el-table-column>
      <el-table-column prop="use_date" label="使用时间">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  name: "used",
  data() {
    return {
      data_used: [],
    }
  },
  methods: {
    get_used() {
      this.$axios.get('/used').then((response) => {
        console.log(response);
        this.data_used = response.data;
      })
    },
  }
}
</script>

<style scoped>

</style>
