<template>
  <div id="container" class="single" :class="{'mode-dark':isDarkMode}">
    <vNav :category="category" @openNav="openNav"></vNav>
    <vBanner></vBanner>
		<section class="body" :class="{'min-open':isOpen}">
      <vHeader @changeMode="changeMode"></vHeader>
			<div id="links" class="main">
				<div class="article-wrapper">
					<article>
						<h1 class="title">链接</h1>
						<div class="post-content markdown">
							<p>由于本站是一个纯个人性质的博客，主要用于记录个人生活以及其他一些杂文随笔，我也主要是希望通过博客结识更多的朋友，一起交流、探讨对生活的认知。所以，如果觉得本站不错，愿意交换友情链接，那么请务必符合以下要求：<br>（1）贵站类型必须是博客类、文章类、技术类三者中的一个，本站绝不与游戏类、导购类、博彩类、影视类、小说类等娱乐、擦边类型网站交换友情。<br>（2）贵站提供的内容要正常，如果含有色情、暴力等违法内容，一律谢绝交换。<br>（3）符合以上两点要求者，不论贵站权重如何，建站时间长短如何，只要认真建站，均可交换。<br>（4）申请友链的方式，可以加我QQ：MzU0MTI3MTYy 或者Email：master#lixinahua.com告知，也可在本博客任何页面留言。</p>
						</div>
					</article>
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
  // import vfooter from '@/components/footer.vue'
  // import axios from 'axios'
  export default{
    data () {
      return {				
        category: 'links',
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
    components: {
      vNav,
      vBanner,
      vHeader
    }
  }
</script>
