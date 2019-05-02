<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/catelist' }">分类列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isrevise">添加分类页</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改分类页</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>
            <el-form ref="form" :model="forData" label-width="80px" label-position="left" style="width:500px"  class="table-ys">
                <el-form-item label="新闻标题" required>
                    <el-input v-model="forData.title" ></el-input>
                </el-form-item >
                <el-form-item required label="新闻头图">
                    <Uploadimg v-model="forData.icon" />
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" v-if="!isrevise" @click="handleSubmit">立即创建</el-button>
                        <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                        <el-button @click="$router.push('/layout/catelist')">取消</el-button>
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
                forData:{}
            }
        },
        methods:{
            handleSubmit(){ //创建分类
                this.$axios.post('/ddyj/category',this.forData).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push(`/layout/catelist`)
                        },500)
                    }else{
                        this.$message(res.msg)
                    }
                })
            },
            getdata(){ //获取修改分类的信息
                let {id} = this.$route.params;
                this.$axios.get(`/ddyj/category/${id}`).then(res => {
                    this.forData = res.data
                })
            },
            handlerevise(){ //修改分类
                let {id} = this.$route.params;
                this.$axios.put(`/ddyj/category/${id}`,this.forData).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/catelist')
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
                if(this.$route.meta.title == '修改分类页'){
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