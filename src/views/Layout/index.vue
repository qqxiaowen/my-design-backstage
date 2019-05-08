<template>
    <div>
        <el-row>
            <el-col style="height:100vh;" :span='4'>
                <LeftNav :status=status />
            </el-col>
            <el-col style="height:100vh; overflow-y:scroll; display:flex" :span='20'>
                <Hearder :statusMsg=statusMsg />
                <router-view :teacherInfo="teacherInfo"  class="content"/>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import Hearder from '@/components/Hearder';
import LeftNav from '@/components/LeftNav';
import Vue from 'vue'
    export default {
        components:{
            Hearder,
            LeftNav,
        },

        data() {
            return {
                statusMsg: '普通教师',
                status: 0,
                teacherInfo: null
            }
        },

        created() {

            this.$axios.get('/user/myself').then(res => {
                if (res.code == 0 && res.data.superAdmin == 1) {
                    this.statusMsg = '管理员',
                    this.status = 1;
                }
                    this.teacherInfo = res.data;
            })
        }
        
    }
</script>

<style scoped lang='less'>
/deep/ .content{
    padding: 30px;
    margin-top: 56px;
}

</style>