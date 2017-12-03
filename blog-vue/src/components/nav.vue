<template>
    <section class="nav" :class="{'min-open':isOpen}">
        <div class="nav-wrapper">
            <a href="#" class="item-nav siteName active"  @click="open()">说</a>
            <ul>
                <li v-for="(nav,index) in navs" :key="index" :class="{'active':nav.isActive}">
                    <router-link class="item-nav" :to="nav.url">
                        <i class="icon iconfont" :class="nav.icon"></i>
                        <span class="text">{{nav.text}}</span>
                    </router-link>
                    <div class="bubble hide">
                        <div class="arrow">
                            <em></em>
                        </div>
                        {{nav.text}}
                    </div>
                </li>
            </ul>
        </div>	
    </section>		
</template>

<script>
/* eslint-disable */
import bus from '../assets/eventBus'
import axios from 'axios'

export default {
    props: [
        'category'
    ],
    data () {
        return {
            isOpen: false,
            navs: []
        }
    },
    mounted () {
        axios.get('/mock/navs.json',{}).then((res) => {
            this.navs = res.data.navs
            for(let item of this.navs){
                if(item.category === this.category){
                    item.isActive = true
                } 
            }
        })
    },
    methods: {
        open () {
            let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if(w<=768){
                this.isOpen = !this.isOpen
            }
            bus.$emit("openNav",this.isOpen)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
