<template>
  <el-dialog title="添加任务" :visible.sync="dialogVisible" width="600px" @close="close_dialog()">
    <el-form :model="task_form" label-position="top" ref="task_form" :rules="rules">
      <div style="display: flex">
        <el-form-item prop="iter_name" label="迭代名称" :label-width="formLabelWidth" style="flex: 1 0 50%">
          <template>
            <el-select v-model="task_form.iter_name" placeholder="请选择" @change="set_iter_name">
              <el-option
                v-for="item in ops_iter" :key="item.value" :label="item.label" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item prop="member_name" label="执行人" :label-width="formLabelWidth">
          <template>
            <el-select v-model="task_form.member_name" placeholder="请选择" @change="set_m_name">
              <el-option
                v-for="item in ops_member" :key="item.value" :label="item.label" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </div>
      <el-form-item prop="task_detail" label="任务目标" :label-width="formLabelWidth">
        <el-input v-model="task_form.task_detail" type="textarea" placeholder="请输入任务目标"
                  rows="5" :autosize="{minRows:4}" show-word-limit minlength=6 maxlength=249>
        </el-input>
      </el-form-item>
      <div style="display: flex">
        <el-form-item prop="task_date" label="任务日期" style="flex: 1 0 50%">
          <el-date-picker class="date_picker" v-model="task_form.task_date" type="date" placeholder="选择日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="target_num" label="奖励数" :label-width="formLabelWidth">
          <el-input type="number" v-model.number="task_form.target_num" autocomplete="off" placeholder="请输入奖励数"
                    maxlength=3></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add_submit(task_form)">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: "add_task",
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      task_form: {},
      ops_iter: [],//下拉列表-迭代
      ops_member: [],//下拉列表-成员
      value_iter: '',
      value_member: '',
      rules: {
        iter_name: [
          {required: true, message: '请选择一个迭代', trigger: 'change'},
        ],
        member_name: [
          {required: true, message: '请选择一个执行人', trigger: 'change'},
        ],
        task_detail: [
          {required: true, message: '请输入任务目标', trigger: 'blur'},
        ],
        task_date: [
          {required: true, message: '请选择日期', trigger: 'change'},
        ],
        target_num: [
          {required: true, message: '请输入奖励数', trigger: 'blur'},
          {type: 'number', message: '数量必须为数字', trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    add_submit(data) {
      console.log(data);
      // data.target_num = parseInt(data.target_num);
      this.$refs['task_form'].validate((valid) => {
        if (valid) {
          this.$axios.post('/add_task', data).then((response) => {
            console.log(response.data);
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.$emit('emit_task');
          })
        } else {
          return false;
        }
      })
    },
    change_dialog() {
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.task_form.resetFields();
    },
    close_dialog() {
      this.$refs.task_form.resetFields();
    },
    get_iter_info() { //获取迭代信息
      this.$axios.get('/iters').then((response) => {
        console.log('iter_info');
        this.ops_iter = [];
        response.data.map((value, index) => {
          // console.log(index, value.iter_id, value.name);
          this.ops_iter.push({value: value.iter_id, label: value.name});
        });
        console.log(this.ops_iter);
      })
    },
    get_member_info() { //获取迭代信息
      this.$axios.get('/member').then((response) => {
        console.log('member_info');
        this.ops_member = [];
        response.data.map((value, index) => {
          // console.log(index, value.iter_id, value.name);
          this.ops_member.push({value: value.member_id, label: value.name});
        });
        console.log(this.ops_iter);
      })
    },
    set_iter_name(val) {
      this.task_form.iter_id = val.value;
      this.task_form.iter_name = val.label;
    },
    set_m_name(val) {
      this.task_form.member_id = val.value;
      this.task_form.member_name = val.label;
    },
  },
  mounted() {
    // this.get_iter_info();
    // this.get_member_info();
  }
}
</script>

<style scoped>

</style>
