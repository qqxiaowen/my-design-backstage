<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/facultyList' }">院系列表页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/layout/majorList?faculty=${this.faculty}` }">专业列表页</el-breadcrumb-item>
            <el-breadcrumb-item >班级列表页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="add-major" @click="handleAdd">
            <el-button type="primary" size="small">添加班级</el-button>
        </div>

        <el-card>
            <el-table :data="formData" stripe style="width: 100%" align="left">
                <el-table-column prop="gradeName" label="班级名称" width="180" align="center"/>
                <el-table-column prop="major.majorName" label="所属专业" width="180" align="center"/>
                <el-table-column label="班级描述" width="240" align="center">
                    <template slot-scope="scope">
                        <div class="desc">
                            {{scope.row.desc}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="340" align="center">
                    <template slot-scope="scope" >
                        <!-- <el-button size="small" @click="handleGrade(scope.row._id)" type="primary">查看专业下班级</el-button> -->
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
                faculty: null,
                major: null
            }
        },
        methods:{
            getdata(){
                let {major} = this.$route.query;
                this.$axios.get(`/grade/major/${major}`).then(res => {
                    this.formData = res.data;
                })
            },
            handlelook(id){
                this.$router.push(`/layout/reviseGrade/${id}`)
            },
            handledel(id){
                this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/grade/${id}`).then( res => {
                            if(res.code == 0){
                                this.$message.success(res.msg);
                                this.getdata();
                            }
                        })
                    }).catch( () => {
                        this.$message.info('已取消删除');          
                    });

            },

            // 添加班级跳转
            handleAdd() {
                this.$router.push(`/layout/addGrade?faculty=${this.$route.query.faculty}&major=${this.$route.query.major}`)
            }
        },

        mounted() {
            this.faculty = this.$route.query.faculty;
            this.major = this.$route.query.major;
        },
        created() {
            this.getdata();
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