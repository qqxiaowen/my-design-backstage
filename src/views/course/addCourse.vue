<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/courseList' }">课程列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isrevise">添加课程</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改课程</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>
            <el-form ref="ref" :model="formData" label-width="80px" label-position="left" style="width:500px"  class="table-ys">
                <el-form-item label="任课教师" v-if="this.teacherInfo" required>
                    <el-input v-model="this.teacherInfo.username" disabled/>
                </el-form-item >
                 <el-form-item label="选择科目" required>
                    <el-select v-model="formData.course_name">
                        <el-option v-for="item in subjectCatalog" :key="item._id" :label="item.subjectName" :value="item._id"/>
                    </el-select>
                </el-form-item >
                <el-form-item label="院系">
                    <el-select v-model="faculty">
                        <el-option v-for="item in facultyCatalog" :key="item._id" :label="item.facultyName" :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select v-model="major" placeholder="请先选择一个院系">
                        <el-option v-for="item in majorCatalog" :key="item._id" :label="item.majorName" :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" required>
                    <el-select v-model="formData.grade" placeholder="请先选择一个专业">
                        <el-option v-for="item in gradeCatalog" :key="item._id" :label="item.gradeName" :value="item._id"/>
                    </el-select>
                </el-form-item>

                <hr class="line">

                <div v-for="(item, index) in this.formData.time_site" :key=index>
                    <el-form-item label="上课时间" required>
                        <el-select v-model="item.day" placeholder="请选择周几上课">
                            <el-option v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7]" :key="index" :label="item" :value="item"/>
                        </el-select>
                        <el-select v-model="item.node" placeholder="请选择第几节上课">
                            <el-option v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index" :label="item" :value="item"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上课地点" required>
                        <el-input v-model="item.classroom"/>
                    </el-form-item >
                </div>

                <el-form-item>
                    <el-button v-if="!isrevise" type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                    <el-button @click="handelAddTime">再次添加上课时间和地点</el-button>
                    <el-button @click="$router.push('/layout/facultyList')">取消</el-button>
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
        data(){
            return{
                formData: {
                    time_site: [
                        {}
                    ]
                },
                subjectCatalog: null,
                faculty: null,
                facultyCatalog: null,
                major: null,
                majorCatalog: null,
                gradeCatalog: null
            }
        },
        methods:{

            // 创建课程
            handleSubmit(){ 
                if (!this.formData.course_name || !this.formData.grade || !this.formData.time_site[0].day || !this.formData.time_site[0].node|| !this.formData.time_site[0].classroom) {
                    this.$message('请输入必填项')
                } else {
                    let newArr = [];

                    this.formData.time_site.forEach((item, index) => {
                        if (item.day && item.node && item.classroom) {
                            newArr.push(item);
                        }
                    })
                    this.formData.time_site = newArr;
                    this.formData.teacher = this.teacherInfo._id;

                    this.$axios.post('/course',this.formData).then(res => {
                        if(res.code == 0){
                            this.$message.success(res.msg)
                            setTimeout(() => {
                                this.$router.push(`/layout/courseList`)
                            }, 500)
                        }else{
                            this.$message(res.msg)
                        }
                    })
               }
            },

            getdata(){ //获取修改课程的信息
                let {id} = this.$route.params;
                
                this.$axios.get(`/course/${id}`).then(res => {
                    this.formData = res.data;
                    this.gradeCatalog = [res.data.grade];
                    this.formData.grade = res.data.grade._id;
                })
            },
            handlerevise(){ //修改分类
                let {id} = this.$route.params;
                let newArr = [];

                this.formData.time_site.forEach((item, index) => {
                    if (item.day && item.node && item.classroom) {
                        newArr.push(item);
                    }
                })
                this.formData.time_site = newArr;
                this.$axios.put(`/course/${id}`,this.formData).then(res => {
                    if(res.code == 0){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/courseList')
                        }, 500);
                    }else{
                        this.$message(res.msg)
                    }
                })
            },

            // 获取全部科目
            getSubject() {
                
                this.$axios.get('/subject').then(res => {
                    this.subjectCatalog = res.data;
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
                this.$axios.get(`/major/faculty/${id}`).then( res => {
                    if (res.code == 0 ) {
                        this.majorCatalog = res.data;
                    }
                })
            },

            // 获取某专业下所有班级
            handleGrade(id) {
                this.$axios.get(`/grade/major/${id}`).then( res => {
                    if (res.code == 0 ) {
                        this.gradeCatalog = res.data;
                    }
                })
            },

            // 添加时间和地点input
            handelAddTime() {
                this.formData.time_site.push({});
            }
        },
        
        mounted(){
            this.getSubject();
            this.handleFaculty();
        },
        computed:{
            isrevise(){
                if(this.$route.meta.title == '修改课程'){
                    this.getdata()
                    return true;
                }else{
                    this.formData = {
                        time_site: [
                            {}
                        ]
                    }
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

<style scoped lang="less">
.line {
    border: none;
    height: 2px;
    background: #eee;
    margin: 0 0 20px -60px;
}
</style>