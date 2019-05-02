<template>
    <div class="uploadimg">
        <el-upload
            class="avatar-uploader"
            action="https://upload-z1.qiniup.com"
            :show-file-list="false"
            :data="imgtoken"
            :on-success="handleSuccess" >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        props:{
            value:String,
        },
        data() {
            return {
                imageUrl: this.value,
                imgtoken:{
                    token:'' 
                }
            };
        },
        methods: {
            handleSuccess(res) {
                this.imageUrl = res.url
                this.$emit('input',this.imageUrl)
            },
            getToken(){
                axios.get('http://upload.mawenli.xyz').then(res =>{
                    this.imgtoken.token = res.data.data
                })
            },
            
        },
        created(){
            this.getToken()
        },
        watch:{
            value(val){
                this.imageUrl = val
            }
        }
        
    }
</script>

<style scoped lang='less'>
.avatar-uploader /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>