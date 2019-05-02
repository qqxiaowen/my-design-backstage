import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const components = {
  Layout:() => import('@/views/Layout'),
  Login:() => import('@/views/login'),
  home:() => import('@/views/home'),
  teacherList: () => import('../views/teacher/teacherList.vue'),
  addTeacher:() => import('@/views/teacher/addTeacher'),
  userlist:() => import('@/views/user/userlist'),
  adduser:() => import('@/views/user/adduser'),
  newslist:() => import('@/views/news/newslist'),
  addnews:() => import('@/views/news/addnews'),
  catelist:() => import('@/views/category/catelist'),
  addcate:() => import('@/views/category/addcate'),
  swiperlist:() => import('@/views/swiper/swiperlist'),
  addswiper:() => import('@/views/swiper/addswiper'),
  topiclist:() => import('@/views/topic/topiclist'),
  topicdetail:() => import('@/views/topic/topicdetail'),
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: components.Login
    },
    {
      path: '/layout',
      component: components.Layout,
      redirect: '/layout/home',
      children:[
        {
          path:'home', //前面不要加/
          meta:{
            title:'首页'
          },
          component: components.home
        },

        {
          path:'teacherList', 
          meta:{
            title:'教师列表'
          },
          component: components.teacherList
        },
        {
          path:'addTeacher', 
          meta:{
            title:'添加教师'
          },
          component: components.addTeacher
        },
        {
          path:'reviseTeacher/:id', 
          meta:{
            title:'修改教师'
          },
          component: components.addTeacher
        },
        
        {
          path:'userlist', 
          meta:{
            title:'普通用户列表'
          },
          component: components.userlist
        },
        {
          path:'adduser', 
          meta:{
            title:'添加普通用户'
          },
          component: components.adduser
        },
        {
          path:'reviseuser/:id', 
          meta:{
            title:'修改普通用户'
          },
          component: components.adduser
        },
        {
          path:'newslist',
          meta:{
            title:'新闻列表页'
          },
          component: components.newslist
        },
        {
          path:'addnews', 
          meta:{
            title:'添加新闻页'
          },
          component: components.addnews
        },
        {
          path:'revisenews/:id', 
          meta:{
            title:'修改新闻页'
          },
          component: components.addnews
        },
        {
          path:'catelist', 
          meta:{
            title:'分类列表页'
          },
          component: components.catelist
        },
        {
          path:'addcate', 
          meta:{
            title:'添加分类页'
          },
          component: components.addcate
        },
        {
          path:'revisecate/:id', 
          meta:{
            title:'修改分类页'
          },
          component: components.addcate
        },
        {
          path:'swiperlist', 
          meta:{
            title:'轮播图列表页'
          },
          component: components.swiperlist
        },
        {
          path:'addswiper', 
          meta:{
            title:'添加轮播图页'
          },
          component: components.addswiper
        },
        {
          path:'reviseswiper/:id', 
          meta:{
            title:'修改轮播图页'
          },
          component: components.addswiper
        },
        {
          path:'topiclist', 
          meta:{
            title:'主题列表页'
          },
          component: components.topiclist
        },
        {
          path:'topicdetail/:id', 
          meta:{
            title:'主题详情页'
          },
          component: components.topicdetail
        },
      ]
    }
  ]
})

export default router
