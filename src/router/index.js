import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import("../views/Home"),
    children:[{
      path:"index",
      component:()=>import("../views/index/Index")
    },{
      path:"design",
      component:()=>import("../views/design/Design")
    },{
      path:"profile",
      component :()=>import("../views/profile/Profile")
    },
    {
      path:"",
      redirect:"/index"
    }
  ]
  },
  {
    path:"/scenepage/:id/:name",
    component:()=>import("../components/scenepage/ScenePage")
  },{
    path:"/recomproject/:id",
    component:()=>import("../components/recomproject/RecomProject")
  },{
    path:"/searchs",
    component:()=>import("../components/searchs/SearchJia")
  },
  {
    path:"/searchdetail/:keyword",
    component:()=>import("../components/searchdedail/SearchDetial")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
