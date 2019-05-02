<template>
    <div class="main">
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>欢迎来到黄淮学院学生课堂考勤台管理系统</h2>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
.main {
    flex: 1;
    background: url('../assets/huangHuai.jpg') no-repeat;
    background-size: 100% 100%;

    h2 {
        color: #333;
    }
    /deep/ .el-breadcrumb__inner {
        color: #fff;
    }
}
</style>