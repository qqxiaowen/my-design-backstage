<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >院系列表页</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="formData" stripe style="width: 100%" align="left">
                <el-table-column prop="facultyName" label="院系名称" width="180" align="center"/>
                <el-table-column label="院系描述" width="240" align="center">
                    <template slot-scope="scope">
                        <div class="desc">
                            {{scope.row.desc}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="340" align="center">
                    <template slot-scope="scope" >
                        <el-button size="small" @click="handleMajor(scope.row._id)" type="primary">查看院系下专业</el-button>
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
                formData:[]
            }
        },
        methods:{
            getdata(){
                this.$axios.get('/faculty').then(res => {
                    this.formData = res.data
                })
            },
            handlelook(id){
                this.$router.push(`/layout/reviseFaculty/${id}`)
            },
            handledel(id){
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/faculty/${id}`).then( res => {
                            if(res.code == 0){
                                this.$message.success(res.msg);
                                this.getdata()
                            }
                        })
                    }).catch(() => {
                        this.$message.info('已取消删除');          
                    });

            },
            // 查看院系下专业
            handleMajor(id) {
                this.$router.push(`/layout/majorList/${id}`);
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
</style>