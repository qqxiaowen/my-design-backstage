<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/facultyList' }">院系列表页</el-breadcrumb-item>
            <el-breadcrumb-item >专业列表页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="add-major" @click="handleAddMajor">
            <el-button type="primary" size="small">添加专业</el-button>
        </div>

        <el-card>
            <el-table :data="formData" stripe style="width: 100%" align="left">
                <el-table-column prop="majorName" label="专业名称" width="180" align="center"/>
                <el-table-column prop="faculty.facultyName" label="所属院系" width="180" align="center"/>
                <el-table-column label="专业描述" width="240" align="center">
                    <template slot-scope="scope">
                        <div class="desc">
                            {{scope.row.desc}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="340" align="center">
                    <template slot-scope="scope" >
                        <el-button size="small" @click="handleGrade(scope.row._id)" type="primary">查看专业下班级</el-button>
                        <el-button size="small" @click="handlelook(scope.row._id)" type="primary">编辑</el-button>
                        <el-button size="small" @click="handledel(scope.row._id)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:[],
                // faculty: ''
            }
        },
        methods:{
            getdata(){
                let {faculty} = this.$route.query;
                this.$axios.get(`/major/faculty/${faculty}`).then(res => {
                    this.formData = res.data;
                    // this.faculty = res.data[0].faculty.facultyName;
                })
            },
            handlelook(id){
                this.$router.push(`/layout/reviseMajor/${id}`)
            },
            handledel(id){
                this.$confirm('此操作将永久删除该专业, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/major/${id}`).then( res => {
                            if(res.code == 0){
                                this.$message.success(res.msg);
                                this.getdata()
                            }
                        })
                    }).catch(() => {
                        this.$message.info('已取消删除');          
                    });

            },

            // 查看专业下班级
            handleGrade(major) {
                this.$router.push(`/layout/gradeList?faculty=${this.$route.query.faculty}&major=${major}`)
            },

            // 添加专业跳转
            handleAddMajor() {
                this.$router.push(`/layout/addMajor?faculty=${this.$route.query.faculty}`)
            }
        },
        created(){
            this.getdata()
        }
        
    }
</script>

<style scoped lang="less">
.desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.add-major {
    padding-bottom: 20px;
}
</style>