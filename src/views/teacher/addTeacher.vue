<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/teacherList' }">教师用户列表页</el-breadcrumb-item>
            <el-breadcrumb-item  v-if="isrevise">修改教师用户</el-breadcrumb-item>
            <el-breadcrumb-item  v-else>添加教师用户</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>

            <el-form ref="form" :model="formData" label-width="100px" label-position="left"  class="table-ys">
                <el-form-item label="工号" required>
                    <el-input v-model="formData.numId" :disabled="isrevise"></el-input>
                </el-form-item >
                <el-form-item label="用户名" required>
                    <el-input v-model="formData.username" :disabled="isrevise"></el-input>
                </el-form-item >
                <el-form-item label="密码" required v-if="!isrevise">
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="院系" required>
                    <el-select v-model="formData.faculty">
                        <el-option v-for="item in facultyCatalog" :key="item._id" :label="item.facultyName" :value="item._id"/>
                    </el-select>
                </el-form-item>
                 <el-form-item label="管理员权限"   class="admin-desc">
                    <el-switch v-model="formData.superAdminBoole"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                    <span>{{ this.formData.superAdminBoole ? '开' : '关'}}</span>
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
                    <el-button v-if="!isrevise" type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                    <el-button @click="$router.push(`/layout/teacherList`)">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
        

    </div>
</template>

<script>
import Uploadimg from '@/components/Uploadimg'
    export default {
        components:{
            Uploadimg
        },
        data(){
            return{
                formData:{
                    username: '',
                    password: '',
                    numId: '',
                    avatar: '',
                    desc: '',
                    faculty: '',
                    superAdmin: '',
                    superAdminBoole: false,
                    sex: null
                },
                facultyCatalog: []
            }
        },
        methods:{
            // 添加新用户 
            handleSubmit(){
                if (this.formData.numId && this.formData.username && this.formData.password && this.formData.faculty) {
                    if (this.formData.superAdminBoole) {
                        this.formData.superAdmin = 1;
                    } else {
                        this.formData.superAdmin = 0;
                    }

                    this.$axios.post(`/user/teacher`,this.formData).then( res => {
                        if (res.code == 0) {
                            this.$message.success(res.msg)
                            setTimeout( () => {
                                this.$router.push('/layout/teacherList');
                            }, 500)
                        } else {
                            this.$message.info(res.msg)
                        }
                    })
                } else {
                    this.$message('请输入必填字段')
                }
            },
            // 获取用户信息，用于修改
            getdata(){
                let {id} = this.$route.params
                this.$axios.get(`/user/teacher/${id}`).then(res => {
                    let data = res.data;
                    data.faculty = res.data.faculty._id;
                    data.superAdminBoole = data.superAdmin == 0 ? false : true;
                    this.formData = data;
                })
            },
            // 修改用户
            handlerevise(){
                let {id} = this.$route.params
                this.$axios.put(`/user/teacher/${id}`,this.formData).then(res => {
                    if(res.code == 0){
                        setTimeout(() => {
                            this.$message.success(res.msg)
                            this.$router.push(`/layout/teacherList`)
                        }, 500);
                    }
                })
            },

            // 获取全部院系分类
            handleFaculty() {
                this.$axios.get('/faculty').then( res => {
                    if (res.code == 0 ) {
                        this.facultyCatalog = res.data;
                    }
                })
            }

        },
        created(){
            this.handleFaculty();
        },
        computed:{
            isrevise() {
                if (this.$route.meta.title == '修改教师') {
                    this.getdata();
                    return true;
                } else {
                    this.formData = {};
                    return false;
                }
            }
        }
        
    }
</script>

<style lang="less">
    .admin-desc span{
        padding-left: 10px;
        user-select: none;
    }
</style>