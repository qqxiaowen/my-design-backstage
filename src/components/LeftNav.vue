<template>
    <div class="left-nav">
        <el-menu
        :default-active="text"
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        text-color="#fff"
    
        active-text-color="#ffd04b">
            <router-link to='/layout/home'><el-menu-item index="/layout/home"> 首页</el-menu-item></router-link>
            <el-submenu index="admin-manage" v-if="status">
                <template slot="title"> 教师用户管理 </template>
                <router-link to="/layout/teacherList"><el-menu-item index="/layout/teacherList">教师用户列表</el-menu-item></router-link>
                <router-link to="/layout/addTeacher"><el-menu-item index="/layout/addTeacher"> 添加教师用户</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="user-manage" v-if="status">
                <template slot="title"> 学生用户管理 </template>
                <router-link to="/layout/studentList"><el-menu-item index="/layout/studentList"> 学生用户列表</el-menu-item></router-link>
                <router-link to="/layout/addStudent"><el-menu-item index="/layout/addStudent"> 添加学生用户</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="category-manage" v-if="status">
                <template slot="title"> 院系、专业、班级管理 </template>
                <router-link to="/layout/facultyList"><el-menu-item index="/layout/facultyList"> 院系列表</el-menu-item></router-link>
                <router-link to="/layout/addFaculty"><el-menu-item index="/layout/addFaculty"> 添加院系</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="swiper-manage" v-if="status">
                <template slot="title"> 科目管理 </template>
                <router-link to="/layout/swiperlist"><el-menu-item index="/layout/swiperlist"> 科目列表</el-menu-item></router-link>
                <router-link to="/layout/addswiper"><el-menu-item index="/layout/addswiper"> 添加科目</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="topic-manage">
                <template slot="title"> 课程表管理 </template>
                <router-link to="/layout/topiclist"><el-menu-item index="/layout/topiclist"> 课程表列表</el-menu-item></router-link>
                <router-link to="/layout/topiclist2"><el-menu-item index="/layout/topiclist2"> 新增课程表</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="news-manage">
                <template slot="title"> 个人管理 </template>
                <router-link to="/layout/newslist"><el-menu-item index="/layout/newslist">修改个人信息</el-menu-item></router-link>
                <router-link to="/layout/addnews"><el-menu-item index="/layout/addnews">修改个人密码</el-menu-item></router-link>
            </el-submenu>
            
        </el-menu>

    </div>
</template>

<script>
export default {
    props: {
        status: Number
    },
    data() {
        return {
            text: ''
        }
    },
    watch: { 
        $route(to, from){
            this.text = to.path
        }
    }
}
</script>

<style scoped lang='less'>
.left-nav{
    min-height: 100vh;
    background: #2d3a4b;
    z-index: 955;
    /deep/ .el-menu{
        border: none;
    }
}
</style>