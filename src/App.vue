<template>
  <div id="app">
    <el-container>
      <el-header>
        <NavMenu/>
      </el-header>
      <el-main style="padding-top: 10px">
        <router-view/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import NavMenu from './components/NavMenu';

export default {
  name: 'App',
  components: {
    NavMenu
  },
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

.el-header {
  padding: 0px !important;
}
</style>
