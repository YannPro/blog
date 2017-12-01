<template>
  <div id="container" class="single" :class="{'mode-dark':isDarkMode}">
    <vNav></vNav>
    <vBanner></vBanner>
    <section class="body">
      <vHeader @changeMode="changeMode"></vHeader>
			<div id="about" class="main">
				<div class="article-wrapper">
					<article>
						<h1 class="title">关于</h1>
						<div class="post-content markdown">
							<p>90后伪宅男程序猿</p><ul><li><p>昵称：绛木子</p></li><li><p>职业：程序猿</p></li><li><p>爱好：吃好吃的，睡大觉……</p></li><li><p>特长：特长！</p></li><li><p>QQ：MzU0MTI3MTYy</p></li><li><p>QQ群: <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=cd36073c6e4f9371546ad3c496738f8967327da0a31379ae88fc2a0fa8f25006">点我进群</a></p></li><li><p>邮箱：master#lixianhua.com</p></li></ul>
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
