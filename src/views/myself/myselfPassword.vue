<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >修改个人密码</el-breadcrumb-item>
        </el-breadcrumb>

          <el-card>

            <el-form ref="form" :model="formData" label-width="140px" label-position="left"  class="table-ys">
                <el-form-item label="原密码" required>
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item >
                <el-form-item label="新密码" required>
                    <el-input v-model="formData.newPassword" type="password"></el-input>
                </el-form-item >
                <el-form-item label="再次输入新密码" required>
                    <el-input v-model="formData.agePassword" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handlerevise">立即修改</el-button>
                    <el-button @click="$router.push('/layout/home')">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            teacherInfo: Object
        },
       
        data() {
            return {
                formData: {}
            }
        },

        methods: {
            handlerevise() {
                if (!this.formData.password || !this.formData.newPassword || !this.formData.agePassword) {
                    this.$message('请输入必填字段')
                }
                else if (this.formData.newPassword != this.formData.agePassword) {
                    this.$message('两次输入的密码不一致')
                } else {
                    
                    this.$axios.put(`/user/password/${this.teacherInfo._id}`, this.formData).then( res => {
                        if (res.code == 0) {
                            this.$message.success(res.msg);
                            setTimeout(() => {
                                this.$router.push('/login');
                            }, 500);
                        } else {
                            this.$message(res.msg);
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>