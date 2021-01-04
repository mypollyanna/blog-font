<template>
  <el-form style="width: 30%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户编号">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>

    <el-form-item label="昵称" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-select v-model="ruleForm.sex" placeholder="请选择">
        <el-option label="男" value="false"></el-option>
        <el-option label="女" value="true"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios'
  export default    {
    data() {
      return {
        ruleForm: {
          id: '',
          username: '',
          sex: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8181/api/user/update', this.ruleForm).then(function (resp) {
              if(resp.status === 200){
                _this.$alert('<'+ _this.ruleForm.username+'> 修改成功', '消息',{
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/UserManage')
                  }
                });

              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    created(){
      const _this = this
      axios.get('http://localhost:8181/api/user/queryInfo/'+this.$route.query.id).then(function (resp) {
        console.log(resp)
        _this.ruleForm = resp.data
      })
    }
  }
</script>

<style scoped>

</style>

