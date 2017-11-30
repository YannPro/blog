<template>
  <body id="account">
    <canvas id="canvas"></canvas>
    <section class="container">
        <article class="half">
            <h1>own space</h1>
            <div class="tabs">
                <span class="tab signin" :class="{'active': isLogin}" @click="switchTab(0)"><a href="#">登 录</a></span>
                <span class="tab signup" :class="{'active': !isLogin}" @click="switchTab(1)"><a href="#">注 册</a></span>
            </div>
            <div class="content">
                <div class="signin-cont cont" v-show="isLogin">
                    <form action="#" method="post" enctype="multipart/form-data">
                        <input type="email" name="email" id="email" class="inpt" required="required" placeholder="你的邮箱">
                        <label for="email">你的邮箱</label>
                        <input type="password" name="password" id="password" class="inpt" required="required" placeholder="你的密码">
                        <label for="password">你的密码</label>
                        <input type="checkbox" id="remember" class="checkbox" checked>
                        <label for="remember">记住密码</label>
                        <div class="submit-wrap">
                            <input type="submit" value="登 录" class="submit">
                            <a href="#" class="more">忘记密码怎么办?</a>
                        </div>
                    </form>
                </div>
                <div class="signup-cont cont" v-show="!isLogin">
                    <form action="#" method="post" enctype="multipart/form-data">
                        <input type="email" name="email" id="name" class="inpt" required="required" placeholder="你的昵称">
                        <label for="name">你的昵称</label>
                        <input type="email" name="email" id="email" class="inpt" required="required" placeholder="你的密码">
                        <label for="email">你的密码</label>
                        <input type="password" name="password" id="password" class="inpt" required="required" placeholder="你的密码">
                        <label for="password">你的密码</label>
                        <div class="submit-wrap">
                            <input type="submit" value="注 册" class="submit">
                            <a href="#" class="more">案例和条款</a>
                        </div>
                    </form>
                </div>
            </div>
        </article>
        <div class="half bg"></div>
    </section>
 </body>
</template>
<script>
/* eslint-disable */ 
// import vfooter from '@/components/footer.vue'
// import axios from 'axios'
export default{
    data () {
        return {
            isLogin: true
        }
    },
    methods: {
        switchTab (flag) {
            if(flag === 0){
                this.isLogin = true
            }else if(flag === 1){
                this.isLogin = false
            }
        }
    }
}
</script>
