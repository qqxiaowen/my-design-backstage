<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >主题列表页</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>

            <el-table :data="formData" stripe style="width: 100%" align="center">
            <el-table-column prop="user.username" label="创建者帐号" width="120" align="center"/>
            <el-table-column prop="user.nicheng" label="创建者昵称" width="180" align="center"/>
            <el-table-column label="创建者头像" width="120" align="center" >
                <template slot-scope="scope">
                    <img :src="scope.row.user.avatar" class="avatar-item" alt="">
                </template>
            </el-table-column>
            <el-table-column label="主题名称"  width="180"  align="center">
                <template slot-scope="scope">
                    <div class="table-content-ys" v-text="scope.row.content"></div>
                </template>
            </el-table-column>
            <el-table-column prop="common.length" label="主题下评论数"  width="180" align="center"/>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                     <el-button @click="handlelook(scope.row._id)" type="primary" size="small">查看详情</el-button>
                     <el-button @click="handledel(scope.row._id)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            class="page-ys"
            layout="prev, pager, next"
            @current-change="pageing"
            :page-size="page.size"
            :total="count">
            </el-pagination>

        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:[],
                count:'',
                page:{
                    pn:1,
                    size:4,
                },
                count:1,
            }
        },
        methods:{
            pageing(pn){ //翻页
                this.page.pn = pn
                this.getdata()
            },
            getdata(){
                this.$axios.get(`/ddyj/topic`,this.page).then(res => {
                    this.formData = res.data
                    this.count = res.count
                })
            },
            handlelook(id){
                this.$router.push(`/layout/topicdetail/${id}`)
            },
            handledel(id){
                this.$confirm('此操作将永久删除该主题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/ddyj/topic/${id}`).then( res => {
                            if(res.code == 200){
                                this.$message.success(res.msg);
                                this.getdata()
                            }
                        })
                    }).catch(() => {
                        this.$message.info('已取消删除');          
                    });

            }
        },
        created(){
            this.getdata()
        }
        
    }
</script>

<style scoped>

</style>