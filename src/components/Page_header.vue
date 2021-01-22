<template>
  <el-page-header @back="goBack" :content="content">
  </el-page-header>
</template>

<script>
  export default {
    name: "Page_header",
    props: {
      content: {
        type: String,
        default: '迭代'
      }
    },
    methods:{
      goBack() {
        this.$router.replace('/iterations');
      }
    }
  }
</script>

<style scoped>

</style>
