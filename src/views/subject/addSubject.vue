<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/subjectList' }">科目列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isrevise">添加科目</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改科目</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>
            <el-form ref="ref" :model="formData" label-width="80px" label-position="left" style="width:500px"  class="table-ys">
                <el-form-item label="科目名称" prop="subjectName" :rules="[{required: true, message: '科目名称不能为空'}]">
                    <el-input v-model="formData.subjectName" auto-complete="off"></el-input>
                </el-form-item >
                 <el-form-item label="科目描述" >
                    <el-input v-model="formData.desc"></el-input>
                </el-form-item >
               
                <el-form-item>
                    <el-button v-if="!isrevise" type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                    <el-button @click="$router.push('/layout/subjectList')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
         
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:{}
            }
        },
        methods:{
            handleSubmit(){ //创建科目
               if (!this.formData.subjectName) {
                   this.$message('请输入必填项')
               } else {
                    this.$axios.post('/subject',this.formData).then(res => {
                        if(res.code == 0){
                            this.$message.success(res.msg)
                            setTimeout(() => {
                                this.$router.push(`/layout/subjectList`)
                            }, 500)
                        }else{
                            this.$message(res.msg)
                        }
                    })
               }
            },
            getdata(){ //获取修改科目的信息
                let {id} = this.$route.params;
                this.$axios.get(`/subject/${id}`).then(res => {
                    this.formData = res.data
                })
            },
            handlerevise(){ //修改分类
                let {id} = this.$route.params;
                this.$axios.put(`/subject/${id}`,this.formData).then(res => {
                    if(res.code == 0){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/subjectList')
                        }, 500);
                    }else{
                        this.$message(res.msg)
                    }
                })
            }
        },
        created(){

        },
        computed:{
            isrevise(){
                if(this.$route.meta.title == '修改科目'){
                    this.getdata()
                    return true;
                }else{
                    this.formData = {}
                    return false;
                }
            }
        }

        
        
    }
</script>

<style scoped>

</style>