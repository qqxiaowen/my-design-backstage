<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/swiperlist' }">轮播图列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="isrevise">修改轮播图页</el-breadcrumb-item>
            <el-breadcrumb-item v-else>添加轮播图页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>

            <el-form ref="form" :model="formData" label-width="100px" label-position="left"  class="table-ys">
                <el-form-item label="轮播图标题" required>
                    <el-input v-model="formData.title" ></el-input>
                </el-form-item >
               
                <el-form-item label="轮播图头图" required>
                    <Uploadimg v-model="formData.img" />
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-switch
                        v-model="formData.status"
                        :active-value=1
                        :inactive-value=0
                        active-text="显示"
                        inactive-text="不显示">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序号">
                    <el-input-number v-model="formData.sort"  :min="1"  />
                </el-form-item>
                <el-form-item label="选择新闻分类">
                    <el-select v-model="selectCateId" >
                        <el-option v-for="(item,index) in category" :key="index"
                                    :value="item._id" :label="item.title"
                                    @click.native="selectCate"/>
                    </el-select>
                </el-form-item>

                    <el-dialog title="选择分类下新闻" :visible.sync="ishow" >
                    <el-table :data="news">
                        <el-table-column property="title" label="新闻标题" width="120" />
                        <el-table-column property="author.nicheng" label="作者" width="120" />
                        <el-table-column label="新闻头图" width="100" align="center" >
                            <template slot-scope="scope">
                                <img :src="scope.row.img" class="avatar-item" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column  label="新闻内容" width="200" align="center">
                            <template slot-scope="scope">
                                <div class="table-content-ys" v-text="scope.row.contentText"></div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button @click="selectNew(scope.row)" type="primary" size="small">选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="pageing"
                        :page-size="page.size"
                        :total="count">
                        </el-pagination>
                    </el-dialog>

                <el-form-item label="关联的新闻" v-if="selectNewitem">
                    <div class="relevance claerfix">
                        <div class=" fll">
                            <img class="re-img" :src="selectNewitem.img" >
                        </div>
                        <div class="re-info fll">
                            <div class="re-title" >标题：{{selectNewitem.title}}</div>
                            <div class="re-content" >内容：{{selectNewitem.contentText}}</div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!isrevise" type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                    <el-button @click="$router.push(`/layout/swiperlist`)">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
import Uploadimg from '@/components/Uploadimg'
    export default {
        components:{
            Uploadimg
        },
        data(){
            return{
                formData:{
                    title:'',
                    img:'',
                    newsId:'',
                    status:1,
                    sort:1
                },
                selectCateId:'',
                category:[],
                ishow:false,
                news:[],
                selectNewitem:'',

                // 选中分类后新闻的分页
                page:{
                    pn:1,
                    size:3
                },
                count:1,
             }
        },
        methods:{
            handleSubmit(){
                if(!this.formData.title||!this.formData.img||this.formData.newsId){
                    this.$message.error('请输入关键信息')
                }else{
                    this.$axios.post('/ddyj/swiper',this.formData).then(res => {
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            setTimeout(() => {
                                this.$router.push(`/layout/swiperlist`)
                            }, 500);
                        }else{
                            this.$message(res.msg)
                        }
                    })
                }
            },
            handlerevise(){
                if(!this.formData.title||!this.formData.img||this.formData.newsId){
                    this.$message.error('请输入关键信息')
                }else{
                    let {id} = this.$route.params;
                    this.$axios.put(`/ddyj/swiper/${id}`,this.formData).then(res => {
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            setTimeout(() => {
                                this.$router.push('/layout/swiperlist')
                            }, 500);
                        }else{
                            this.$message(res.msg)
                        }
                    })
                }

            },
            getCategoty(){
                this.$axios.get('/ddyj/category').then(res => {
                    this.category = res.data
                })
            },
            getNews(){
                this.$axios.get(`/ddyj/category/${this.selectCateId}/news`,this.page).then(res => {
                    this.news = res.data
                    this.count = res.count
                })
            },
            pageing(pn){
                this.page.pn = pn;
                this.getNews()
            },
            selectCate(){ //选择分类后
                this.ishow = true;
                this.getNews()
            },
            
            selectNew(row){ //选择新闻后
                this.ishow = false;
                this.selectNewitem = row
                this.formData.newsId = row._id
            },
           
            getData(){ //编辑下重获轮播图数据
                let {id} = this.$route.params;
                this.$axios.get(`/ddyj/swiper/${id}`).then(res => {
                    this.formData = res.data
                    if(res.data.newsId&&res.data.newsId._id){
                        var nesId = res.data.newsId._id
                        this.formData.newsId = nesId
                        this.getReviseNew()
                    }
                })
                
            },
            getReviseNew(){ //编辑下重获所选新闻数据
                this.$axios.get(`/ddyj/news/${this.formData.newsId}`).then(res => {
                    this.selectNewitem = res.data //重填新闻
                    this.selectCateId = res.data.type._id //重填选择后的分类
                })
            }

        },
        created(){
            this.getCategoty()
        },
        computed:{
            isrevise(){
                if(this.$route.meta.title == '修改轮播图页'){
                    this.getData()
                    return true
                }else{
                    this.formData = {
                        title:'',
                        img:'',
                        newsId:'',
                        status:1,
                        sort:1
                    }
                    this.selectNewitem = ''
                    this.selectCateId = '' 
                    return false
                }
            }
        },
       
        
        
    }
</script>

<style scoped lang='less'>
.relevance{
    /deep/ .re-img{
        width: 80px;
        height: 80px;
    }
    .re-info{
        margin-left: 20px;
        .re-content{
            width: 400px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>