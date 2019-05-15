import Vue from 'vue'
import Router from 'vue-router'
import Comment from '@/components/Comment'
import AuthComment from '@/components/AuthComment'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/comment/:id',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/oauthcomment/:id',
      name: 'AuthComment',
      component: AuthComment
    }
  ]
})
