<template>
  <el-dialog title="添加使用记录" :visible.sync="dialogVisible" width="560px" @close="close_dialog()">
    <el-form :model="used_form" label-position="top" ref="used_form" :rules="rules">
      <div style="display: flex">
        <el-form-item prop="member_name" label="姓名" label-width="120" style="flex: 1 0 50%">
          <template>
            <el-select v-model="used_form.member_name" placeholder="请选择" @change="set_m_name">
              <el-option
                v-for="item in ops_members" :key="item.value" :label="item.label" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item prop="use_date" label="使用日期" style="flex: 1 0 50%">
          <el-date-picker class="date_picker" v-model="used_form.use_date" type="date" placeholder="选择日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </div>
      <el-form-item prop="use_num" label="消耗数量">
        <el-input-number :min="1" :max="select_num" v-model.number="used_form.use_num"></el-input-number>
      </el-form-item>
      <el-form-item prop="use_detail" label="使用详情" label-width="120">
        <el-input v-model="used_form.use_detail" autocomplete="off" placeholder="请输入使用详情"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add_submit(used_form)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "add_used",
  data() {
    return {
      dialogVisible: false,
      used_form: {use_detail: ''},
      ops_members: [], //成员列表
      select_num: 0, //鱼丸可使用最大值
      rules: {
        member_name: [
          {required: true, message: '请选择姓名', trigger: 'change'},
        ],
        use_date: [
          {required: true, message: '请选择日期', trigger: 'change'},
        ],
        use_num: [
          {required: true, message: '请输入消耗数量', trigger: ['blur', 'change']},
        ],
        use_detail: [
          {required: true, message: '请输入使用详情', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    add_submit(data) {
      console.log(data);
      this.$refs['used_form'].validate((valid) => {
        if (valid) {
          this.$axios.post('/add_used', data).then((response) => {
            console.log(response.data);
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.$emit('emit_used');
          })
        } else {
          return false;
        }
      })
    },
    get_member_info() { //获取迭代信息
      this.$axios.get('/member').then((response) => {
        console.log('member_info');
        this.ops_members = [];
        response.data.map((value, index) => {
          this.ops_members.push({value: value.member_id, label: value.name, count: value.number});
        });
        console.log(this.ops_members);
      })
    },
    set_m_name(val) {
      this.used_form.member_id = val.value;
      this.used_form.member_name = val.label;
      this.select_num = val.count;
    },
    change_dialog() {
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.used_form.resetFields();
    },
    close_dialog() {
      this.$refs.used_form.resetFields();
    }
  }
}
</script>

<style scoped>

</style>
