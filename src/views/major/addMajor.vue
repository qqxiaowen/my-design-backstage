<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/facultyList' }">院系列表页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/layout/majorList?faculty=${this.forData.faculty}` }">专业列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isrevise">添加专业</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改专业</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>
            <el-form ref="form" :model="forData" label-width="80px" label-position="left" style="width:500px"  class="table-ys">
                <el-form-item label="所属院系" required>
                    <el-input v-model="facultyName" disabled></el-input>
                </el-form-item >
                <el-form-item label="专业名称" required>
                    <el-input v-model="forData.majorName" ></el-input>
                </el-form-item >
                <el-form-item label="专业描述">
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
                facultyName: null
            }
        },
        methods:{
            handleSubmit(){ //创建专业
                if (this.forData.majorName) {

                    this.$axios.post('/major',this.forData).then(res => {
                        if(res.code == 0){
                            this.$message.success(res.msg)
                            setTimeout(() => {
                                this.$router.push(`/layout/majorList?faculty=${this.forData.faculty}`)
                            }, 500)
                        }else{
                            this.$message(res.msg)
                        }
                    })
                } else {
                    this.$message('请输入必填字段');
                }
            },
            getdata(){ //获取修改专业的信息
                let {id} = this.$route.params;
                this.$axios.get(`/major/${id}`).then(res => {
                    this.forData = res.data;
                    this.facultyName = res.data.faculty.facultyName;
                    this.forData.faculty = res.data.faculty._id;
                })
            },
            handlerevise(){ //修改专业
                let {id} = this.$route.params;
                this.$axios.put(`/major/${id}`,this.forData).then(res => {
                    if(res.code == 0){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push(`/layout/majorList?faculty=${this.forData.faculty}`)
                        }, 500);
                    }else{
                        this.$message(res.msg)
                    }
                })
            }
        },
        computed:{
            isrevise(){
                if (this.$route.meta.title == '修改专业') {
                    this.getdata()
                    return true;
                } else if (this.$route.meta.title == '添加专业') {
                    this.forData = {
                        majorName: null,
                        desc: null
                    };
                    this.forData.faculty = this.$route.query.faculty;

                    this.$axios.get(`/faculty/${this.forData.faculty}`).then(res => {
                        this.facultyName = res.data.facultyName;
                    })
                    return false;
                }
            }
        }

        
        
    }
</script>

<style scoped>

</style>