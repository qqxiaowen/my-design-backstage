<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >修改个人信息</el-breadcrumb-item>
        </el-breadcrumb>

          <el-card>

            <el-form ref="form" :model="formData" label-width="100px" label-position="left"  class="table-ys">
                <el-form-item label="工号" required>
                    <el-input v-model="formData.numId" disabled></el-input>
                </el-form-item >
                <el-form-item label="用户名" required>
                    <el-input v-model="formData.username" disabled></el-input>
                </el-form-item >
                <el-form-item label="管理员权限"   class="admin-desc">
                    <span>{{ this.formData.superAdmin == 1 ? '开' : '关'}}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formData.sex">
                        <el-option label="男" :value=1></el-option>
                        <el-option label="女" :value=0></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像">
                <Uploadimg v-model="formData.avatar" />
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="formData.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handlerevise">立即修改</el-button>
                    <el-button @click="$router.push(`/layout/home`)">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
import Uploadimg from '../../components/Uploadimg';
    export default {
        props: {
            teacherInfo: Object
        },
        components: {
            Uploadimg
        },
        data() {
            return {
                formData: {}
            }
        },
        methods: {
            handlerevise() {
                this.$axios.put(`/user/teacher/${this.formData._id}`, this.formData).then(res => {
                    if (res.code == 0) {
                        this.$message.success(res.msg);
                        this.$router.push('/layout/home');
                    } else {
                        this.$message('修改失败');
                    }
                })
            }
        },
        mounted() {
            setTimeout( () => {
                this.formData = this.teacherInfo;
            }, 300)
        }
    }
</script>

<style lang="less" scoped>

</style>