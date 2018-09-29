<template>
	<section class="container">
      <div class="pc">
          <navbar></navbar>
          <banner></banner>
          <div class="content">
              <div class="title">{{ $t('about.title') }}</div>
              <div class="icon"></div>
              <p class="text">{{ $t('about.introduction') }}</p>
          </div>
      </div>
	</section>
</template>

<script>
import request from "~/service";
/*pc*/
import banner from "~/components/swiper.vue";
import navbar from '~/components/navbar.vue';


export default {
  components: {
    /*pc*/
    banner,
    navbar,
  },
  data() {
    return {
    };
  },
  mounted(){
  	let storageLogin = localStorage.login=='true'?true:false;
	this.$store.commit('SET_LOGIN',storageLogin);
  	//刷新页面不会执行中间件，只能在做判断
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (this.$router.options.base.indexOf('/wap') < 0)){
		this.$router.push('/wap/about');
	}
  }
};
</script>
<style lang="scss" scoped>
.pc{
    .content {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        padding: 5% 0 20%;
        line-height: 1.5em;

        .title {
          font-size: 44px;
          color: #333333;
          font-weight: bold;
        }
        .icon {
          width: 340px;
          height: 20px;
          background: url("~assets/img/pc_fengexian.png") no-repeat center;
          background-size: contain;
          margin: 62px auto 105px;
        }
        .text {
          font-size: 18px;
          color: #333333;
        }
    }
}
</style>