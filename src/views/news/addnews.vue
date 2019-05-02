<template>
    <div>
        <el-breadcrumb separator="/" class="mb30">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/newslist' }">新闻列表页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="isrevise">修改新闻页</el-breadcrumb-item>
            <el-breadcrumb-item v-else>添加新闻页</el-breadcrumb-item>

        </el-breadcrumb>
        <el-card>

            <el-form ref="form" :model="formData" label-width="80px" label-position="left"  >
                <el-form-item label="新闻标题" required>
                    <el-input v-model="formData.title" ></el-input>
                </el-form-item >
                <el-form-item label="作者" required>
                    <el-select v-model="formData.author">
                        <el-option v-for="(item,index) in users" :key=index :label="item.nicheng" :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" required>
                    <el-select v-model="formData.type">
                        <el-option v-for="(item,index) in category" 
                        :key="index" :value="item._id" 
                        :label="item.title"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻内容" required>
                    <div class="quill-wrap">
                        <quill-editor
                        v-model="formData.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="handleChange"
                        >
                        </quill-editor>
                    </div>

                </el-form-item>
                <el-form-item label="新闻头图">
                    <Uploadimg v-model="formData.img" />
                </el-form-item>
                
               
               
                <el-form-item>
                    <el-button v-if="!isrevise" type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button v-else type="primary" @click="handlerevise">立即修改</el-button>
                    <el-button @click="$router.push(`/layout/newslist`)">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
        
    </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import Uploadimg from '@/components/Uploadimg'

import axios from 'axios'
Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        components: {quillEditor,Uploadimg},
        data(){
            return{
                formData:{
                    title:'',
                    content:'',
                    contentText:'',
                    author:'',
                    type:'',
                    img:''
                },
                users:[],
                token:'',
                category:'',
                // 富文本参设置
                editorOption: {  
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: 'file',
                        action: 'https://upload-z1.qiniup.com',
                        response: (res) => {
                            return res.url
                            },
                        change: (xhr, formData) => {
                            formData.append('token', this.token)
                            }
                    },
                    toolbar: {
                        container: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    ['blockquote', 'code-block'],
                                    [{'header': 1}, {'header': 2}],
                                    [{'list': 'ordered'}, {'list': 'bullet'}],
                                    [{'size': ['small', false, 'large', 'huge']}],
                                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                                    [{'color': []}, {'background': []}],
                                    [{'font': []}],
                                    [ 'image' ]
                                ],
                        handlers: {
                            'image': function () {
                            QuillWatch.emit(this.quill.id)
                            }
                        }
                    }
                }
                }
            }
        },
        methods:{
            handleSubmit(){ // 点击创建
                this.$axios.post(`/ddyj/news`,this.formData).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(()=>{
                            this.$router.push(`/layout/newslist`)
                        },500)
                    }else{
                        this.$message(res.msg)
                    }
                })

            },
            handlerevise(){ // 点击修改
                let {id} = this.$route.params
                this.$axios.put(`/ddyj/news/${id}`,this.formData).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/layout/newslist')
                        }, 500);
                    }else{
                        this.$message(res.msg)
                    }
                })
            },
            getUser(){ //获取用户信息
                this.$axios.get('/admin/user').then(res => {
                    this.users = res.data
                })
            },
            getToken(){ //获取token
                axios.get(`http://mawenli.xyz:3000/getToken`).then(res => {
                    this.token = res.data.data
                })
            },
            handleChange({ quill, html, text }){ //富文本框发生变化
                let contenttext = text.substring(0,200) + '...'
                this.formData.contentText = contenttext
            },
            getCategory(){ //获取所有分类
                this.$axios.get('/ddyj/category').then(res => {
                    this.category = res.data
                })
            },
            getData(){ 
                let {id} = this.$route.params;
                this.$axios.get(`ddyj/news/${id}`).then(res => {
                    this.formData = res.data
                })
            }
            
            
        },
        created(){
            this.getUser()
            this.getToken()
            this.getCategory()

        },
        computed:{
            isrevise(){
                if(this.$route.meta.title == '修改新闻页'){
                    this.getData()
                    return true;
                }else{
                    this.formData = {}
                    return false;
                }
            }
        }
        
    }
</script>

<style >
.ql-editor{
    min-height: 200px;
}
</style>