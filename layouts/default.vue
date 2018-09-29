<template>
  <div class="root-app">
    <!--pc-->
    <div class="pc">
        <top></top>
        <nuxt/>
        <foot></foot>
    </div>
  </div>
</template>
<script>
  /*PC*/
  import top from '~/components/header.vue'
  import foot from '~/components/footer.vue'
  /*WAP*/
  import wapFooter from '~/components/wap/footer.vue'
	export default {
    components: {
      /*pc*/
      top,
      foot,

      /*wap*/
      wapFooter

    },
    data(){
      return {
        isWap : this.isWap
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
  user-select: none;
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

