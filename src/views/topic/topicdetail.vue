<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/topiclist' }">主题列表页</el-breadcrumb-item>
            <el-breadcrumb-item >主题详情页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div class="topic">
                <div class="user-box clearfix" v-if="topicData.user">
                    <div class="left fll">
                        <img :src="topicData.user.avatar"  alt="">
                    </div>
                    <div class="right fll">
                        <!-- <div class="username">帐号：{{topicData.user.username}}</div> -->
                        <div class="nicheng">{{topicData.user.nicheng}}</div>
                        <div class="topic-content" v-text="topicData.content"></div>
                    </div>
                </div>
                <div class="common-title">评论信息：
                    <span v-if="isloading">加载中……</span>
                    <span v-if="!commonData[0]&&!isloading">暂无评论信息</span>
                </div>
                <div class="common clearfix" v-if="commonData[0]">
                    <div  class="item flr" v-for="(item,index) in commonData" :key='index'>
                        <div class="left fll">
                            <img :src="item.user.avatar" alt="">
                        </div>
                        <div class="right fll">
                            <div class="item-nicheng">{{item.user.nicheng}}</div> 
                            <div class="item-content">{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
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
                topicData:{},
                commonData:{},
                isloading:true,
                page:{
                    pn:1,
                    size:10,
                },
                count:1,
            }
        },
        methods:{
            pageing(pn){ //翻页
                this.page.pn = pn
                this.getCommonData()
            },
            getTopicaData(){
                let {id} = this.$route.params
                this.$axios.get(`/ddyj/topic/${id}`).then(res => {
                    this.topicData = res.data
                    this.getCommonData()
                })
            },
            getCommonData(){
                let {id} = this.$route.params
                this.$axios.get(`/ddyj/common/bytopic/${id}`,this.page).then(res => {
                    this.commonData = res.data
                    this.isloading = false
                    this.count = res.count;
                })
            }
        },
        created(){
            this.getTopicaData()
        }
        
    }
</script>

<style scoped lang="less">
.topic{
    margin: 0 auto ;
    max-width: 900px;
    /deep/ img{
            width: 80px;
            height: 80px;
            display: block;
        }
}

.user-box{
    width: 700px;
    padding: 20px;
    background: #f1f1f1;
    border-radius: 6px;
    .left{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
    }
    .right{
        .nicheng{
            padding-bottom: 10px;
            font-size: 20px;
            color: #409eff;
        }
    }
}
.common-title{
    padding: 20px 30px;
    color: #999;
    font-size: 18px
}
.common{
    .item{
        width: 700px;
        padding: 20px;
        border: 1px solid #e8e8e8;
        border-radius: 6px;
        margin-bottom: 10px;
        .left{
            margin-right: 20px;
        }
        .right{
            .item-content{
                padding-top: 10px;
                color: #b8b8b8;
                font-size: 14px;
            }
        }
    }
    
}
</style>