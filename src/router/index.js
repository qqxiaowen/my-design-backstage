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
  facultyList:() => import('@/views/faculty/facultyList'),
  addFaculty:() => import('@/views/faculty/addFaculty'),
  majorList: () => import('@/views/major/majorList.vue'),
  addMajor: () => import('@/views/major/addMajor.vue'),
  gradeList: () => import('@/views/grade/gradeList.vue'),
  addGrade: () => import('@/views/grade/addGrade.vue'),
  subjectList: () => import('@/views/subject/subjectList.vue'),
  addSubject: () => import('@/views/subject/addSubject.vue'),
  courseList: () => import('../views/course/courseList.vue'),
  addCourse: () => import('../views/course/addCourse.vue'),
  myselfInfo: () => import('../views/myself/myselfInfo.vue'),
  myselfPassword: () => import('../views/myself/myselfPassword.vue')
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
          path:'majorList', 
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
          path:'gradeList', 
          meta:{
            title:'班级列表'
          },
          component: components.gradeList
        },
        {
          path:'addGrade', 
          meta:{
            title:'添加班级'
          },
          component: components.addGrade
        },
        {
          path:'reviseGrade/:id', 
          meta:{
            title:'修改班级'
          },
          component: components.addGrade
        },
        {
          path:'subjectList', 
          meta:{
            title:'科目列表'
          },
          component: components.subjectList
        },
        {
          path:'addSubject', 
          meta:{
            title:'添加科目'
          },
          component: components.addSubject
        },
        {
          path:'reviseSubject/:id', 
          meta:{
            title:'修改科目'
          },
          component: components.addSubject
        },
        {
          path: 'courseList',
          meta: {
            title : '课程列表'
          },
          component: components.courseList
        },
        {
          path: 'addCourse',
          meta: {
            title : '添加课程'
          },
          component: components.addCourse
        },
        {
          path: 'reviseCourse/:id',
          meta: {
            title : '修改课程'
          },
          component: components.addCourse
        },
        {
          path: 'myselfInfo',
          meta: {
            title: '修改个人信息'
          },
          component: components.myselfInfo
        },
        {
          path: 'myselfPassword',
          meta: {
            title: '修改个人密码'
          },
          component: components.myselfPassword
        }
      ]
    }
  ]
})

export default router
