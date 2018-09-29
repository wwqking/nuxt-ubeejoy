<template>
	<section class="container" style="background:#fff">
    <div class="pc">
      <navbar2></navbar2>
		  <someMessage :message="message"></someMessage>
      <new-terms></new-terms>
    </div>
	</section>
</template>

<script>
import request from "~/service";
/*pc*/
import someMessage from "~/components/someMessage.vue";
import navbar2 from '~/components/navbar2.vue'
import newTerms from '~/components/terms.vue'
export default {
  components: {
    /*pc*/
    navbar2,
    someMessage,
    newTerms
  },
  data() {
    return {
        message:{
            title:this.$t('terms.title'),
            content:''
        }
    };
  },
  mounted(){
  	let storageLogin = localStorage.login=='true'?true:false;
	this.$store.commit('SET_LOGIN',storageLogin);
  	//刷新页面不会执行中间件，只能在做判断
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (this.$router.options.base.indexOf('/wap') < 0)){
		this.$router.push('/wap/terms');
	}
  }
};
</script>

<style lang="scss" scoped>
   .container{
     padding-bottom: 105px;
   }
</style>