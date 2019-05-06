<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/facultyList' }">院系列表页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/layout/majorList?faculty=${this.faculty}` }">专业列表页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/layout/majorList?faculty=${this.faculty}&major=${this.major}` }">班级列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isrevise">添加班级</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改班级</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>
            <el-form ref="form" :model="forData" label-width="80px" label-position="left" style="width:500px"  class="table-ys">
                <el-form-item label="所属院系" required>
                    <el-input v-model="facultyName" disabled></el-input>
                </el-form-item >
                 <el-form-item label="所属专业" required>
                    <el-input v-model="majorName" disabled></el-input>
                </el-form-item >
                <el-form-item label="班级名称" required>
                    <el-input v-model="forData.gradeName" ></el-input>
                </el-form-item >
                <el-form-item label="班级描述">
                    <el-input v-model="forData.desc" ></el-input>
                </el-form-item >
                <el-form-item>
                        <el-button type="primary" v-if="!isrevise" @click="handleSubmit">立即创建</el-button>
                        <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                        <el-button @click="$router.back()">取消</el-button>
                    </el-form-item>
            </el-form>
        </el-card>
        
         
    </div>
</template>

<script>
    export default {
        data(){
            return{
                forData: {},
                faculty: null,
                major: null,
                facultyName: null,
                majorName: null
            }
        },
        methods:{
            handleSubmit(){ //创建班级
                if (this.forData.gradeName) {

                    this.$axios.post('/grade',this.forData).then(res => {
                        if(res.code == 0){
                            this.$message.success(res.msg)
                            setTimeout(() => {
                                this.$router.push(`/layout/gradeList?faculty=${this.faculty}&major=${this.major}`)
                            }, 500)
                        }else{
                            this.$message(res.msg)
                        }
                    })
                } else {
                    this.$message('请输入必填字段');
                }
            },
            getdata() { //获取修改专业的信息
                let {id} = this.$route.params;
                this.$axios.get(`/grade/${id}`).then(res => {
                    this.forData = res.data;
                    this.major = res.data.major._id;
                    this.faculty = res.data.major.faculty._id;

                    this.majorName = res.data.major.majorName;
                    this.facultyName = res.data.major.faculty.facultyName;
                    this.forData.major = res.data.major._id;
                })
            },
            handlerevise(){ //修改专业
                let {id} = this.$route.params;
                this.$axios.put(`/grade/${id}`,this.forData).then(res => {
                    if(res.code == 0){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push(`/layout/gradeList?faculty=${this.faculty}&major=${this.major}`)
                        }, 500);
                    }else{
                        this.$message(res.msg)
                    }
                })
            }
        },
        computed:{
            isrevise(){
                if (this.$route.meta.title == '修改班级') {
                    this.getdata();
                    return true;
                } else if (this.$route.meta.title == '添加班级') {
                    this.forData = {
                        major: null,
                        gradeName: null,
                        desc: null
                    };
                    this.faculty = this.$route.query.faculty;
                    this.major = this.$route.query.major;
                    this.forData.major = this.$route.query.major;

                    // 获取某专业下所有班级信息
                    this.$axios.get(`/grade/major/${this.major}`).then(res => {
                        this.majorName = res.data[0].major.majorName;
                        this.facultyName = res.data[0].major.faculty.facultyName;
                    })
                    return false;
                }
            }
        }

        
        
    }
</script>

<style scoped>

</style>