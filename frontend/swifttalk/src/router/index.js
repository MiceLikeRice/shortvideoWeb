import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:()=>import("@/views/LayoutView.vue"),
    redirect:"/home",
    children:[{
      path:"/home",
      component:()=>import("@/views/home/HomeView.vue"),
    },
    {
      path:"/chat",
      component:()=>import("@/views/chat/ChatView.vue"),
    },
    {
      path:"/music",
      component:()=>import("@/views/music/MusicView.vue"),
    }
    ]    
  },
  {
    path:"/video",
    component:()=>import("@/views/video/VideoView.vue"),
    redirect:"/shortvideo",
    children:[{
      path:"/shortvideo",
      component:()=>import("@/views/video/ShortVideoView.vue"),
    },
    {
      path:"/recommend",
      component:()=>import("@/views/video/RecommendView.vue"),
    },
    {
      path:"/hot",
      component:()=>import("@/views/video/HotView.vue"),
    },
    {
      path:"/film",
      component:()=>import("@/views/video/FilmView.vue"),
    },
    ]
  },
  {
    path:"/playvideo",
    component:()=>import("@/views/video/ShortVideoPlay.vue")
  },
  {
    path:"/swip",
    component:()=>import("@/components/SwipeView.vue")
  },
  {
    path:"/login",
    component:()=>import("@/views/video/LoginView.vue")
  },
  {
    path:"/logup",
    component:()=>import("@/views/video/LogupView.vue")
  },
  {
    path:"/upload",
    component:()=>import("@/views/video/UploadView.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
