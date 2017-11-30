<template>
  <div id="container" class="single" :class="{'mode-dark':isDarkMode}">
    <vNav></vNav>
    <vBanner></vBanner>
		<section class="body">
			<header class="header">
				<div class="type-wrapper fl">
					<ul>
						<li class="item"><a href="../index.html">最近</a></li>
						<li class="item active"><a href="#">前端</a></li>
					</ul>
				</div>
				<div class="btn btn-denglu fr">
					<a href="../page/login.html">
						<i class="icon iconfont icon-denglu"></i>
					</a>
				</div>
				<div class="btn btn-mode fr">
					<a href="#">
						<i class="icon iconfont icon-light"></i>
					</a>
				</div>
				<div class="btn btn-search fr">
					<a href="#">
						<i class="icon iconfont icon-search"></i>
					</a>
				</div>
			</header>
			<div id="message" class="main">
				<div class="article-wrapper">
					<article>
						<h1 class="title">链接</h1>
                        <div class="post-content markdown">
                            <blockquote><p>有什么需要联系我的可以再此留下您想说的信息,我会尽快回复您!</p></blockquote>
                        </div>
					</article>
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
        'isDarkMode': false
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
