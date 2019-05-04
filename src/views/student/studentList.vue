<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >学生列表</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-card>

            <el-table :data="formData" stripe style="width: 100%" align="center" :highlight-current-row="true">
            <el-table-column prop="numId" label="学号" width="120" align="center"/>
            <el-table-column prop="username" label="用户名" width="120" align="center"/>
            <el-table-column label="头像" width="110" align="center" >
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="avatar-item" alt="">
                </template>
            </el-table-column>
            <el-table-column  label="性别" width="60" align="center">
                <template slot-scope="scope">
                    {{scope.row.sex == 1 ? '男' : '女'}}
                </template>
            </el-table-column>
            <el-table-column prop="grade.major.faculty.facultyName" label="院系" width="160"  align="center"/>
            <el-table-column prop="grade.gradeName" label="班级" width="120"  align="center"/>
            <!-- <el-table-column  label="是否是管理员"  width="120" align="center">
                <template slot-scope="scope">
                    {{scope.row.superAdmin == 1 ? '是' : '否'}}
                </template>
            </el-table-column> -->
            <el-table-column prop="desc" label="简介" width="120" align="center">
                <template slot-scope="scope">
                    <div class="table-content-ys" v-text="scope.row.desc"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleUpdata(scope.row._id)" type="primary" size="small">编辑</el-button>
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
            getdata(updata) {
                this.$axios.get(`/user/student`,this.page).then(res => {
                    this.formData = res.data;
                    this.count = res.count;
                    if (updata && !this.formData[0]) {
                        this.page.pn --;
                        this.getdata();
                    }
                })
            },
            handleUpdata(id){
                this.$router.push(`/layout/reviseStudent/${id}`)
            },
            handledel(id){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/user/student/${id}`).then( res => {
                            if(res.code == 0){
                                this.$message.success(res.msg);
                                this.getdata();
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
.table-content-ys {
    text-align-last: left;
}
</style>