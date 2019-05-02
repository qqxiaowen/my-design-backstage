<template>
    <div class="hearder">
        黄淮学院学生课堂考勤台管理系统

            <el-dropdown class="dropdown" @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link">
                我的状态<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled command=1>{{this.statusMsg}}用户</el-dropdown-item>
                <el-dropdown-item command=0>退出登录</el-dropdown-item>
                <!-- <el-dropdown-item command="b">狮子头</el-dropdown-item> -->
            </el-dropdown-menu>
            </el-dropdown>

    </div>
</template>

<script>
    export default {
        props: {
            statusMsg: String
        },
        data(){
            return{
                
            }
        },
        methods:{
            handleCommand(id){
                if (id == 0) {
                    this.$axios.get('/user/logout').then(res => {
                        if (res.code == 0){
                            this.$message.success(res.msg)
                            setTimeout(() => {
                                this.$router.push('/login')
                            },500)
                        }
                    })
                    
                }
            }
        },
        
        created() {

        }
    }
</script>

<style scoped lang='less'>
.hearder{
    position: fixed;
    top: 0;
    right: 0;
    width: 83.333333333333333vw;
    height: 56px;
    line-height: 56px;
    text-align: center;
    font-size: 26px;
    color: #fff;
    background: #2d3a4b;
    z-index: 955;
}
.dropdown{
    position: fixed;
    color: #fff;
    right: 40px;
    top: 0;
}
</style>