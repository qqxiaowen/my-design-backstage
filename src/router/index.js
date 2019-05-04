import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const components = {
  Layout:() => import('@/views/Layout'),
  Login:() => import('@/views/login'),
  home:() => import('@/views/home'),
  teacherList: () => import('../views/teacher/teacherList.vue'),
  addTeacher:() => import('@/views/teacher/addTeacher'),
  studentList:() => import('@/views/student/studentList.vue'),
  addStudent:() => import('@/views/student/addStudent.vue'),
  newslist:() => import('@/views/news/newslist'),
  addnews:() => import('@/views/news/addnews'),
  facultyList:() => import('@/views/faculty/facultyList'),
  addFaculty:() => import('@/views/faculty/addFaculty'),
  majorList: () => import('@/views/major/majorList.vue'),
  addMajor: () => import('@/views/major/addMajor.vue'),
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
          path:'studentList', 
          meta:{
            title:'学生列表'
          },
          component: components.studentList
        },
        {
          path:'addStudent', 
          meta:{
            title:'添加学生'
          },
          component: components.addStudent
        },
        {
          path:'reviseStudent/:id', 
          meta:{
            title:'修改学生'
          },
          component: components.addStudent
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
          path:'facultyList', 
          meta:{
            title:'院系列表'
          },
          component: components.facultyList
        },
        {
          path:'addFaculty', 
          meta:{
            title:'添加院系'
          },
          component: components.addFaculty
        },
        {
          path:'reviseFaculty/:id', 
          meta:{
            title:'修改院系'
          },
          component: components.addFaculty
        },
        {
          path:'majorList/:id', 
          meta:{
            title:'专业列表'
          },
          component: components.majorList
        },
        {
          path:'addMajor', 
          meta:{
            title:'添加专业'
          },
          component: components.addMajor
        },
        {
          path:'reviseMajor/:id', 
          meta:{
            title:'修改专业'
          },
          component: components.addMajor
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
