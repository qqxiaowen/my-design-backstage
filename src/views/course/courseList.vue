<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >课程列表页</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="formData" stripe style="width: 100%" align="left">
                <el-table-column prop="course_name.subjectName" label="课程名称" width="220" align="center"/>
                <el-table-column prop="grade.gradeName" label="上课班级" width="140" align="center"/>
                <el-table-column prop="teacher.username" label="任课教师" width="120" align="center"/>
                <el-table-column label="上课时间及地点" width="260" align="center">
                    <template slot-scope="scope">
                        <div class="time_site" v-for="(item, index) in scope.row.time_site" :key="index">
                            <span>时间：</span>周{{item.day}}第{{item.node}}节，<span>地点：</span>{{item.classroom}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope" >
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
        props: {
            teacherInfo: Object
        },
        data(){
            return{
                formData:[]
            }
        },
        methods:{
            getdata(){
                this.$axios.get(`/course/teacher/${this.teacherInfo._id}`).then(res => {
                    this.formData = res.data
                })
            },
            handlelook(id){
                this.$router.push(`/layout/reviseCourse/${id}`)
            },
            handledel(id){
                this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/course/${id}`).then( res => {
                            if(res.code == 0){
                                this.$message.success(res.msg);
                                this.getdata()
                            }
                        })
                    }).catch(() => {
                        this.$message.info('已取消删除');          
                    });

            }
        },
        mounted() {

            setTimeout(() => {
                this.getdata();
            }, 300);
        }
        
    }
</script>

<style scoped lang="less">
.desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.time_site {
    padding: 6px;

    span {
        color: #409eff;
    }
}
</style>