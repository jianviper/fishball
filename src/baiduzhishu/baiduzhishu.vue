<template>
  <section>
    <el-form :model="export_data" label-position="top" ref="task_form" style="width: 80%">
      <el-form-item label="选择日期范围（可选）">
        <el-date-picker
          v-model="export_data.date_range"
          type="daterange" align="right" unlink-panels
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          :picker-options="pickerOptions" @change="confirm_date" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键词">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 回车添加</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="excel_export(export_data)">导 出</el-button>
      </span>
  </section>
</template>

<script>
export default {
  name: "baiduzhishu",
  data() {
    return {
      export_data: {keywords: []},
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  methods: {
    excel_export(data) {
      console.log(this.export_data);
      this.$axios({
        method: "post",
        url: 'http://192.168.105.132:8001/baiduzhishu/download',
        data: data,
        responseType: 'blob'
      }).then((response) => {
        console.log(response)
        this.download(response.data);
      })
    },
    download(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'Excel.xls')

      document.body.appendChild(link)
      link.click()

    },
    confirm_date() {
      console.log(this.export_data.date_range);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        this.export_data.keywords.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
