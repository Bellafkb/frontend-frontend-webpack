import Vue from 'vue'
import Router from 'vue-router'
import Comment from '@/components/Comment'
import AuthComment from '@/components/AuthComment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/upsweep/comment/:id',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/upsweep/oauthcomment/:id',
      name: 'AuthComment',
      component: AuthComment
    }
  ]
})
