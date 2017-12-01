<template>
  <div id="container" :class="{'mode-dark':isDarkMode}">
    <vNav></vNav>
    <vBanner></vBanner>
    <section class="body">
      <vHeader @changeMode="changeMode"></vHeader>
      <div id="scroll" class="main">
        <div class="focus-wrapper">
        </div>
        <div class="article-wrapper" >				
          <article v-for="n in 10">
            <a href="" class="cover-img"></a>
            <div class="article-box">
              <div class="article-author">
                <a href="#" class="avatar">
                  <img src="/static/image/avatar.jpg" alt="">
                </a>
                <a href="#">山野呓语</a>
                <span>11月24日</span>
              </div>
              <div class="article-title"><router-link to="/article">不使用插件实现Ajax评论功能</router-link></div>
              <div class="article-abstract">为了不使表单的系统方法themeInit实现）当访问文章加载主题时，themeIni法中判断是否为了不使用插件实现Ajax评论功能需要实现：监听评论表单，改用ajax方式提交创建新的评论表单提交地址（用Typecho 主题提供的系统方法themeInit实现）当访
              </div>
              <div class="article-meta">
                <ul>
                  <li class="tag"><a href="#">代码</a></li>
                  <li class="browse"><a href="#"><i class="icon iconfont icon-Artboard"></i>111</a></li>
                  <li class="comment"><a href="#"><i class="icon iconfont icon-pinglun1"></i>222</a></li>
                  <li class="like"><a href="#"><i class="icon iconfont icon-xihuan"></i>333</a></li>
                </ul>
              </div>
            </div>
          </article>				
          <div id="pagination">
          </div>
          <footer>
            <p>归档 标签 链接 留言 关于</p>
            <p>© 2017 山野呓语 · Typecho · 赣ICP备10004449号-5	· Theme By 山野呓语</p>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  /* eslint-disable */ 
  import vNav from '@/components/Nav.vue'
  import vBanner from '@/components/Banner.vue'
  import vHeader from '@/components/Header.vue'
  // import vfooter from '@/components/footer.vue'
  // import axios from 'axios'
  export default{
    data () {
      return {
        isDarkMode: false
      }
    },
    methods: {
      changeMode (...data) {
        this.isDarkMode = data[0]
      }
    },
    components: {
      vNav,
      vBanner,
      vHeader
    }
  }
</script>
