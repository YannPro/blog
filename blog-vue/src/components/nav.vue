<template>
    <section class="nav" :class="{'min-open':isOpen}">
        <div class="nav-wrapper">
            <a href="#" class="item-nav siteName active"  @click="isOpen=!isOpen">说</a>
            <ul>
                <li>
                    <router-link class="item-nav" to="/archives">
                        <i class="icon iconfont icon-guidang"></i>
                        <span class="text">归档</span>
                    </router-link>
                    <div class="bubble hide">
                        <div class="arrow">
                            <em></em>
                        </div>
                        归档
                    </div>
                </li>
                <li>
                    <router-link class="item-nav" to="/tags">
                        <i class="icon iconfont icon-tag"></i>
                        <span class="text">标签</span>
                    </router-link>
                    <div class="bubble hide">
                        <div class="arrow">
                            <em></em>
                        </div>
                        标签
                    </div>
                </li>
                <li>
                    <router-link class="item-nav" to="/message">
                        <i class="icon iconfont icon-liuyan"></i>
                        <span class="text">留言</span>
                    </router-link>
                    <div class="bubble hide">
                        <div class="arrow">
                            <em></em>
                        </div>
                        留言
                    </div>
                </li>
                <li>
                    <router-link class="item-nav" to="/links">
                        <i class="icon iconfont icon-lianjie1"></i>
                        <span class="text">链接</span>
                    </router-link>
                    <div class="bubble hide">
                        <div class="arrow">
                            <em></em>
                        </div>
                        链接
                    </div>
                </li>
                <li>
                    <router-link class="item-nav" to="/about">
                        <i class="icon iconfont icon-guanyu"></i>
                        <span class="text">关于</span>
                    </router-link>
                    <div class="bubble hide">
                        <div class="arrow">
                            <em></em>
                        </div>
                        关于
                    </div>
                </li>
            </ul>
        </div>	
    </section>		
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
        isOpen: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
