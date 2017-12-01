import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import ArticleList from '@/views/ArticleList'
import Article from '@/views/Article'
import Archives from '@/views/Archives'
import Tags from '@/views/Tags'
import Message from '@/views/Message'
import Links from '@/views/Links'
import About from '@/views/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ArticleList
    }, {
      path: '/article',
      component: Article
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/archives',
      component: Archives
    }, {
      path: '/tags',
      component: Tags
    }, {
      path: '/message',
      component: Message
    }, {
      path: '/links',
      component: Links
    }, {
      path: '/about',
      component: About
    }
  ]
})
