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
			<div id="tags" class="main">
				<div class="article-wrapper">
					<article>
						<h1 class="title">标签</h1>
						<div class="post-content markdown">
							<!--<a href="https://lixianhua.com/tag/%E7%AE%80%E4%B9%A6/" class="btn" style="font-size:8pt;color:#f74e1e;">简书(1)</a>
							<a href="https://lixianhua.com/tag/Ajax%E8%AF%84%E8%AE%BA/" class="btn" style="font-size:8pt;color:#ffb900;">Ajax评论(1)</a>
							!-->
						</div>
						<!--<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>
						<div class="post-content markdown"></div>-->
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
    components: {
      vNav,
      vBanner,
      vHeader
    }
  }
</script>
