<template>
  <div id="container">
    <vNav></vNav>
    <vBanner></vBanner>
    <vMainContent></vMainContent>
  </div>
</template>
<script>
  import vNav from '@/components/nav.vue'
  import vBanner from '@/components/banner.vue'
  import vMainContent from '@/components/MainContent.vue'
  // import vfooter from '@/components/footer.vue'
  // import axios from 'axios'
  export default{
    data () {
      return {
      }
    },
    components: {
      vNav,
      vBanner,
      vMainContent
    }
  }
</script>
