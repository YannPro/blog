<template>
  <div id="container" :class="{'mode-dark':isDarkMode}">
    <vNav @openNav="openNav"></vNav>
    <vBanner></vBanner>
    <section class="body" :class="{'min-open':isOpen}">
      <vHeader @changeMode="changeMode"></vHeader>
      <div id="scroll" class="main">
				<div class="focus-wrapper">
					<div id="banner" class="carousel slide" data-ride="carousel" data-interval="5000" data-multi="true">
						<div class="carousel-inner" role="listbox">
							<div class="item">
								<a class="banner-item" href="/" style="background-image:url('/static/image/3035073355.png');" title="TeMenu插件使用文档"></a>
							</div>
							<div class="item active">
								<a class="banner-item" href="/" style="background-image:url('/static/image/3257680062.png');" title="仿简书响应式Typecho博客主题 (2016.11.28更新)"></a>
								</div>
							<div class="item ">
								<a class="banner-item" href="/" style="background-image:url('/static/image/3824495239.png');" title="付费Typecho主题：Widget "></a>
							</div>
							<div class="item ">
								<a class="banner-item" href="/" style="background-image:url('/static/image/1833653880.png');" title="Typecho评论增强插件：TeComment（2017.09.07更新）"></a>
							</div>
						</div>
						<a class="left carousel-control" href="#banner" role="button" data-slide="prev">
							<span class="icon icon-prev" aria-hidden="true"></span>
							<span class="sr-only">上一篇</span>
						</a>
						<a class="right carousel-control" href="#banner" role="button" data-slide="next">
							<span class="icon icon-next" aria-hidden="true"></span>
							<span class="sr-only">下一篇</span>
						</a>
					</div>
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
        </div>
      </div>
      <footer>
        <p>归档 标签 链接 留言 关于</p>
        <p>© 2017 山野呓语 · Typecho · 赣ICP备10004449号-5	· Theme By 山野呓语</p>
      </footer>
    </section>
  </div>
</template>
<script>
  /* eslint-disable */ 
  import vNav from '@/components/Nav.vue'
  import vBanner from '@/components/Banner.vue'
  import vHeader from '@/components/Header.vue'
  import carousel from '@/lib/carousel.js'
  // import vfooter from '@/components/footer.vue'
  // import axios from 'axios'
  export default{
    data () {
      return {
        isDarkMode: false,
        'isOpen': false
      }
    },
    methods: {
      changeMode (...data) {
        this.isDarkMode = data[0]
      },
      openNav (...data){
        this.isOpen = data[0]
      }
    },
    mounted () {
    },
    components: {
      vNav,
      vBanner,
      vHeader
    }
  }
</script>
<style scoped>
  @import '../assets/css/carousel'
</style>
