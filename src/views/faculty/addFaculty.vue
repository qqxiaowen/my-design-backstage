<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/facultyList' }">院系列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isrevise">添加院系</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改院系</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>
            <el-form ref="form" :model="forData" label-width="80px" label-position="left" style="width:500px"  class="table-ys">
                <el-form-item label="院系名称" required>
                    <el-input v-model="forData.facultyName" ></el-input>
                </el-form-item >
                 <el-form-item label="院系描述" required>
                    <el-input v-model="forData.desc" ></el-input>
                </el-form-item >
               
                <el-form-item>
                        <el-button type="primary" v-if="!isrevise" @click="handleSubmit">立即创建</el-button>
                        <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                        <el-button @click="$router.push('/layout/facultyList')">取消</el-button>
                    </el-form-item>
            </el-form>
        </el-card>
        
         
    </div>
</template>

<script>
    export default {
        data(){
            return{
                forData:{}
            }
        },
        methods:{
            handleSubmit(){ //创建院系
                this.$axios.post('/faculty',this.forData).then(res => {
                    if(res.code == 0){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push(`/layout/facultyList`)
                        }, 500)
                    }else{
                        this.$message(res.msg)
                    }
                })
            },
            getdata(){ //获取修改院系的信息
                let {id} = this.$route.params;
                this.$axios.get(`/faculty/${id}`).then(res => {
                    this.forData = res.data
                })
            },
            handlerevise(){ //修改分类
                let {id} = this.$route.params;
                this.$axios.put(`/faculty/${id}`,this.forData).then(res => {
                    if(res.code == 0){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/facultyList')
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
                if(this.$route.meta.title == '修改院系'){
                    this.getdata()
                    return true;
                }else{
                    this.forData = {}
                    return false;
                }
            }
        }

        
        
    }
</script>

<style scoped>

</style>