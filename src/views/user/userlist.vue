<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >普通用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>

            <el-table :data="formData" stripe style="width: 100%" align="center">
            <el-table-column prop="username" label="用户名" width="110" align="center"/>
            <el-table-column prop="nicheng" label="昵称" width="180" align="center"/>
            <el-table-column label="头像" width="120" align="center" >
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="avatar-item" alt="">
                </template>
            </el-table-column>
            <el-table-column  label="性别" width="80" align="center">
                <template slot-scope="scope">
                    {{scope.row.sex == 0 ? '女' : '男'}}
                </template>
            </el-table-column>
            <el-table-column prop="job" label="工作" width="140"  align="center"/>
            <el-table-column prop="branchStatusName" label="所属支部" width="140"  align="center"/>
            <el-table-column prop="phone" label="电话" width="140" align="center"/>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                     <el-button @click="handlelook(scope.row._id)" type="primary" size="small">编辑</el-button>
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
                this.$axios.get(`/user/user`,this.page).then(res => {
                   
                    res.data.forEach(item => {
                        let branchStatusName = ''
                        switch(item.branchStatus){
                            case 1:
                                item.branchStatusName = '第一支队'
                                break;
                            case 2:
                                item.branchStatusName = '第二支队'
                                break;
                            case 3:
                                item.branchStatusName = '第三支队'
                                break;
                            default:
                                item.branchStatusName = '第三支队'
                                break;
                        }
                    })
                    this.formData = res.data
                    this.count = res.count
                })
            },
            handlelook(id){
                this.$router.push(`/layout/reviseuser/${id}`)
            },
            handledel(id){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/user/user/${id}`).then( res => {
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