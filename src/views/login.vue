<template>
    <div class="login">
        <div class="login-box" label-width="80px">
            <div class="title">黄淮学院学生课堂考勤台管理系统</div>
            <el-form>
                <el-form-item>
                    <el-input v-model="formData.numId" placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formData.password" type="password" @keyup.enter.native="handleLogin" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-ys" @click="handleLogin" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>

<script>
    export default {
        data(){
            return{
                formData:{
                    numId:'',
                    password:''
                }
            }
        },
        methods:{
            handleLogin() {
                if (this.formData.numId && this.formData.password) {
                    
                    this.$axios.post('/user/login', this.formData).then(res => {
                        if (res.code == 0) {
                            if (res.data.faculty) {
                                // 教师用户登录
                                this.$message.success('登录成功');
                                this.$router.push('/layout');
                            } else {
                                // 学生用户登录
                                this.$message.warning('学生用户不能登录后台管理系统');
                            }
                        } else {
                            this.$message.warning(res.msg);
                        }
                    })
                } else {
                    this.$message.error('请输入工号或者密码')
                }
               
            }
        }
    }
</script>

<style scoped lang='less'>
.login{
    height: 100vh;
    background: #2d3a4b;
    .login-box{
        // height: 200px;
        width: 450px;
        border-top: 1px solid transparent;
        padding-top: 200px;
        margin:0 auto ;
        .title{
            padding-bottom: 50px;
            text-align: center;
            color: #fff;
            font-size: 28px;
        }
        .button-ys{
            width: 100%;
        }
    }
}
</style>