<template>
  <el-dialog title="添加任务" :visible.sync="dialogVisible" width="700px" @close="close_dialog()">
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
        <el-form-item prop="task_date" label="任务日期" style="flex: 1 0 50%">
          <el-date-picker class="date_picker" v-model="task_form.task_date" type="date" placeholder="选择日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </div>
      <div><p><span style="color: red">*</span> 任务目标</p></div>
      <!--      选择成员-->
      <el-form-item prop="member_name" label="执行人" :label-width="formLabelWidth" style="margin-bottom: 0">
        <template>
          <div style="display: flex">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                         style="margin-right: 20px">全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedmembers" @change="handleCheckedMembersChange">
              <el-checkbox v-for="(mb,index) in member_s" :label="mb.name" :key="index"
                           @change="CheckedChange(index,mb.name,mb.member_id)">
                {{ mb.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </template>
      </el-form-item>
      <!--      任务添加-->
      <div class="task_target" v-for="(member,index) in task_form.members" :key="index">
        <el-form-item :label="member.name" style="flex: 1 0" :prop="`members[${index}].task`"
                      :rules="{required:true,message:'请输入任务',trigger:'blur'}">
          <el-input v-model="member.task" placeholder="请输入任务"></el-input>
        </el-form-item>
        <el-form-item label="奖励数" style="margin-left: 10px" :prop="`members[${index}].target_num`"
                      :rules="{required:true,message:'请输入奖励数',trigger:['blur','change']}">
          <el-input-number :min="1" v-model.number="member.target_num"></el-input-number>
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
let memberOptions = [];
export default {
  name: "add_task",
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      task_form: {members: []},
      ops_iter: [],//下拉列表-迭代
      ops_member: [],//下拉列表-成员
      value_iter: '',
      value_member: '',
      checkAll: false,
      checkedmembers: [],
      member_s: memberOptions,
      isIndeterminate: true,
      rules: {
        iter_name: [
          {required: true, message: '请选择一个迭代', trigger: 'change'},
        ],
        task_date: [
          {required: true, message: '请选择日期', trigger: 'change'},
        ],
      }
    }
  },
  methods: {
    add_submit(data) {
      console.log(data);
      // data.target_num = parseInt(data.target_num);
      this.$refs['task_form'].validate((valid) => {
        if (valid) {
          this.$axios.post('http://192.168.105.132:8001/api/add_task', data).then((response) => {
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
    handleCheckAllChange(val) { //全选按钮
      let m_names = memberOptions.map((item) => {
        return item.name
      });
      this.checkedmembers = val ? m_names : [];
      this.isIndeterminate = false;
      if (val) { //全选
        let checked_m = [];
        this.task_form.members.map((item) => {
          checked_m.push(item.name);
        })
        for (let mo of memberOptions) {
          if (checked_m.indexOf(mo.name) < 0) {
            this.task_form.members.push({member_id: mo.member_id, name: mo.name, task: ''});
          }
        }
      } else {
        this.task_form.members = [];
      }
    },
    handleCheckedMembersChange(value) { //判断是否全选
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.member_s.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.member_s.length;
    },
    CheckedChange(index, value, m_id) { //改变选项时动态增减任务输入项
      if (this.checkedmembers.indexOf(value) > -1) {
        this.task_form.members.push({member_id: m_id, name: value, task: ''});
      } else {
        this.task_form.members.map((item, index) => {
          if (item.name === value) {
            this.task_form.members.splice(index, 1);
          }
        })
      }
    },
    change_dialog() {
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.task_form.resetFields();
    },
    close_dialog() {
      this.task_form.members = [];
      this.checkedmembers = [];
      this.checkAll = false;
      this.$refs.task_form.resetFields();
    },
    get_iter_info() { //获取迭代信息
      this.$axios.get('http://192.168.105.132:8001/api/iters').then((response) => {
        console.log('iter_info');
        this.ops_iter = [];
        response.data.map((value, index) => {
          // console.log(index, value.iter_id, value.name);
          this.ops_iter.push({value: value.iter_id, label: value.name});
        });
        console.log(this.ops_iter);
      })
    },
    get_member_info() { //获取成员信息
      this.$axios.get('http://192.168.105.132:8001/api/member').then((response) => {
        console.log('member_info');
        let mo = memberOptions.map((item) => {
          return item.name;
        })
        response.data.map((value, index) => {
          console.log(index, value);
          if (mo.indexOf(value.name) < 0) {
            memberOptions.push({member_id: value.member_id, name: value.name});
          }
        });
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
.task_target {
  display: flex;
}

.task_target > div {
  margin-bottom: 10px
}
</style>
