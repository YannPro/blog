<template>
  <div id="container" class="single" :class="{'mode-dark':isDarkMode}">
    <vNav :category="category" @openNav="openNav"></vNav>
    <vBanner></vBanner>
		<section class="body" :class="{'min-open':isOpen}">
      <vHeader @changeMode="changeMode"></vHeader>
			<div id="tags" class="main">
				<div class="article-wrapper">
					<article>
						<h1 class="title">标签</h1>
						<div class="post-content markdown">
							<router-link v-for="(item,index) in tags" :key="index" to="/" class="btn" 
								v-bind:style="item.style">{{`${item.name}(${item.articleNum})`}}</router-link>
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
	import axios from 'axios'
  export default{
    data () {
      return {				
        category: 'tags',
				isDarkMode: false,
        'isOpen': false,
				tags: [],
				colorArr: ['#8B0000','#C0FF3E','#f49484','#333','#8B4726'
				,'#66CDAA','#00EEEE','#FFA54F','#FFEC8B','#FF3030'],
				sizeArr: ['10px','12px','14px','26px']
      }
		},
    components: {
      vNav,
      vBanner,
      vHeader
		},
		mounted () {  
			this.initTags()
		},
		methods: {
			changeMode (...data) {
        this.isDarkMode = data[0]
      },
      openNav (...data){
        this.isOpen = data[0]
      },
			initTags () {
				axios.get('/mock/tags.json', {}).then(res => {
					this.tags = res.data.tags
					let genColorArr = this.colorArr
					let colorNum = 5
					for(let i=0;i<this.colorArr.length-colorNum;i++){
							genColorArr.shift();
					}
					/*获取tags最大值和最小组,用来分类*/
					let numArr = [],max,min
					for(let tag of this.tags){
							numArr.push(tag.articleNum)
							tag.style = {
								
							}
					}
					max = Math.max.apply(null,numArr)
					min = Math.min.apply(null,numArr)
					//每组字体大小的数量
					let n = (max-min)/this.sizeArr.length
					//暂时存储min
					let t = min
					//存储范围数组
					let range = []
					while(t <= max){
							range.push(t)
							t += n
					}
					/*给tag赋予字体的color和size*/
					for(let tag of this.tags){
							//设置tag对象的color
							var index = Math.floor((Math.random()*genColorArr.length))             
							tag.style.color = genColorArr[index];
							//根据范围数组和文章数量设置字体大小
							for(let i=0;i<range.length-1;i++){
									if(range[i]<=tag.articleNum&&tag.articleNum<=range[i+1]){
											tag.style.fontSize = this.sizeArr[i]
									}
							}
					}
				}) 
			}
		}
  }
</script>
