<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/studentList' }">学生用户列表页</el-breadcrumb-item>
            <el-breadcrumb-item  v-if="isrevise">修改学生用户</el-breadcrumb-item>
            <el-breadcrumb-item  v-else>添加学生用户</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>

            <el-form ref="form" :model="formData" label-width="100px" label-position="left"  class="table-ys">
                <el-form-item label="学号" required>
                    <el-input v-model="formData.numId" :disabled="isrevise"></el-input>
                </el-form-item >
                <el-form-item label="用户名" required>
                    <el-input v-model="formData.username" :disabled="isrevise"></el-input>
                </el-form-item >
                <el-form-item label="密码" required v-if="!isrevise">
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="院系" required>
                    <el-select v-model="faculty">
                        <el-option v-for="item in facultyCatalog" :key="item._id" :label="item.facultyName" :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业" required>
                    <el-select v-model="major" placeholder="请先选择一个院系">
                        <el-option v-for="item in majorCatalog" :key="item._id" :label="item.majorName" :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" required>
                    <el-select v-model="formData.grade" placeholder="请先选择一个专业">
                        <el-option v-for="item in gradeCatalog" :key="item._id" :label="item.gradeName" :value="item._id"/>
                    </el-select>
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
                    <el-button @click="$router.push(`/layout/studentList`)">取消</el-button>
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
                    grade: null,
                    sex: null
                },
                faculty: null,
                major: null,
                facultyCatalog: [],
                majorCatalog: [],
                gradeCatalog: []
            }
        },
        methods:{
            // 添加新用户 
            handleSubmit(){

                this.$axios.post(`/user/student`, this.formData).then( res => {
                    if (res.code == 0) {
                        this.$message.success(res.msg)
                        setTimeout( () => {
                            this.$router.push('/layout/studentList');
                        }, 500)
                    } else {
                        this.$message.info(res.msg)
                    }
                })
            },
            // 获取用户信息，用于修改
            getdata(){
                let {id} = this.$route.params
                this.$axios.get(`/user/student/${id}`).then(res => {
                    let data = res.data;
                    this.formData = data;
                })
            },
            // 修改用户
            handlerevise(){
                let {id} = this.$route.params
                this.$axios.put(`/user/student/${id}`,this.formData).then(res => {
                    if(res.code == 0){
                        setTimeout(() => {
                            this.$message.success(res.msg)
                            this.$router.push(`/layout/studentList`)
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
            },

            // 获取某院系下所有专业
            handleMajor(id) {
                this.$axios.get(`/major/${id}`).then( res => {
                    if (res.code == 0 ) {
                        this.majorCatalog = res.data;
                    }
                })
            },

            // 获取某专业下所有班级
            handleGrade(id) {
                this.$axios.get(`/grade/${id}`).then( res => {
                    if (res.code == 0 ) {
                        this.gradeCatalog = res.data;
                    }
                })
            },
           
        },
        created(){
            this.handleFaculty();
        },
        computed:{
            isrevise() {
                if (this.$route.meta.title == '修改学生') {
                    this.getdata();
                    return true;
                } else {
                    this.formData = {};
                    return false;
                }
            }
        },
        watch: {
            faculty: function(val) {
                this.handleMajor(val);
                this.major = '';
                delete this.formData.grade;
            },
            major: function(val) {
                this.handleGrade(val);
                delete this.formData.grade;
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