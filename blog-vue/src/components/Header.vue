<template>
   <header class="header" :class="{'min-open':this.isNavOpen}">
      <div class="type-wrapper fl">
         <ul>
            <li class="item"><router-link to="/">最近</router-link></li>
            <li class="item active"><router-link to="/">前端</router-link></li>
            <!--<li class="item"><a href="#">后台</a></li>
            <li class="item"><a href="#">文章</a></li>
            <li class="item"><a href="#">资源</a></li>-->
         </ul>
      </div>
      <div class="btn btn-denglu fr">
         <router-link to="/login">
            <i class="icon iconfont icon-denglu"></i>
         </router-link>
      </div>
      <div class="btn btn-mode fr" @click="changeMode()">
        <i class="icon iconfont icon-light"></i>
      </div>
      <div class="btn btn-search fr">
         <a href="#">
            <i class="icon iconfont icon-search"></i>
         </a>
      </div>
   </header>
</template>

<script>
/* eslint-disable */ 
import bus from '../assets/eventBus'
export default {
  name: 'Header',
  data () {
    return {
      isDarkMode: false,
      isNavOpen: false
    }
  },
  methods: {
    changeMode () {
      this.isDarkMode = !this.isDarkMode
      this.$emit('changeMode', this.isDarkMode)
    }
  },
  mounted () {
    let self = this
    bus.$on('openNav', (data) => {
      self.isNavOpen = data
      console.log(self.isNavOpen)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
