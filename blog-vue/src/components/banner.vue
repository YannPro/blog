<template>
    <section class="banner">
        <div class="coverImg"></div> 
        <footer class="footer author-wrapper">
            <div class="avatar">
                <img src="/static/image/avatar.jpg" alt="">
            </div>
            <h1 class="siteName">做点什么</h1>
            <h3 class="siteTitle">让我们来聊点哲学</h3>
            <p class="siteDesc">一个大学生的个人博客</p>
            <div class="contactInfo">
                <div v-for="(item,index) in contacts" @click="openUrl(item.url)" class="btn" :class="item.name">
                    <router-link to="#">
                        <i class="icon iconfont" :class="item.icon"></i>
                    </router-link>
                    <div class="qrcode hide" v-show="item.hasPic">
                        <img src="/static/image/wechat.png" width="100" alt="">
                    </div>
                    <div class="qrcode-arrow"><em></em></div>
                </div>
            </div>
        </footer>
    </section>		
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'Banner',
  data () {
    return {
        contacts: []
    }
  },
  mounted () {
    axios.get('/mock/contacts.json',{}).then((res) => {
        this.contacts = res.data.contacts
        console.log(this.contacts)
    })
  },
  methods: {
      openUrl (url) {
        window.open(url)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
