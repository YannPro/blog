<template>
  <div id="container" class="single" :class="{'mode-dark':isDarkMode}">
    <vNav :category="category"></vNav>
    <vBanner></vBanner>
		<section class="body">
      <vHeader @changeMode="changeMode"></vHeader>
			<div id="archives" class="main">
				<div class="article-wrapper">
				<article>
						<h1 class="title">归档</h1>
						<div class="tl-wrapper">
							<div class="timeline">
								<div class="entry">
									<div class="title">
									<h3>2014 - Present</h3>
									<p>Title, Company</p>
									</div>
									<div class="body">
									<p>Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.</p>
									<ul>
										<li>Rerum sit libero possimus amet excepturi</li>
										<li>Exercitationem enim dolores sunt praesentium dolorum praesentium</li>
										<li>Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo</li>
									</ul>
									</div>
								</div>
								<div class="entry">
									<div class="title">
									<h3>2010 - Present</h3>
									<p>Title, Company</p>
									</div>
									<div class="body">
									<p>Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.</p>
									<ul>
										<li>Rerum sit libero possimus amet excepturi</li>
										<li>Exercitationem enim dolores sunt praesentium dolorum praesentium</li>
										<li>Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo</li>
									</ul>
									</div>
								</div>
								<div class="entry">
									<div class="title">
									<h3>2009 - 2010</h3>
									<p>Title, Company</p>
									</div>
									<div class="body">
									<p>Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.</p>
									<ul>
										<li>Rerum sit libero possimus amet excepturi</li>
										<li>Exercitationem enim dolores sunt praesentium dolorum praesentium</li>
										<li>Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo</li>
									</ul>
									</div>
								</div>
								<div class="entry">
									<div class="title">
									<h3>2006 - 2008</h3>
									<p>Title, Company</p>
									</div>
									<div class="body">
									<p>Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.</p>
									<ul>
										<li>Rerum sit libero possimus amet excepturi</li>
										<li>Exercitationem enim dolores sunt praesentium dolorum praesentium</li>
										<li>Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo</li>
									</ul>
									</div>
								</div>
							</div>
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
				category: 'archives',
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
