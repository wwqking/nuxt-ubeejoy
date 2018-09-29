<template>
  <div class="root-app">
    <!--wap-->
    <div class="wap">
    	<wapHeader2></wapHeader2>
      <nuxt/>
      <wap-footer></wap-footer>
    </div>
  </div>
</template>
<script>
  /*PC*/
  /*WAP*/
	import wapHeader2 from '~/components/wap/header2'
	import wapNavbar from '~/components/wap/navbar.vue'
  import wapFooter from '~/components/wap/footer.vue'
	export default {
    components: {
      /*wap*/
     wapHeader2,
     wapNavbar,
     wapFooter

    },
    data(){
      return {
      } 
    }
  }
</script>
<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  transition: all 0.5s;
}

.root-app{
	background: #fafafa;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  padding: 0;
  margin: 0;
  overflow: hidden;//隐藏侧边栏
}

</style>

