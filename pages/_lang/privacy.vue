<template>
	<section class="container" style="background:#fff">
    <div class="pc">
      <navbar2></navbar2>
	  	<someMessage :message="message"></someMessage>
      <new-privacy></new-privacy>
    </div>
	</section>
</template>

<script>
import request from "~/service";
/*pc*/
import someMessage from "~/components/someMessage.vue";
import navbar2 from '~/components/navbar2.vue'

import newPrivacy from '~/components/privacy.vue'


export default {
  components: {
    /*pc*/
    navbar2,
    someMessage,
    newPrivacy
  },
  data() {
    return {
        message:{
            title:this.$t('privacy.title'),
            content:'',
            //content:"UBEEJOY GAMES RESPECTS AND PROTECTS THE PERSONAL PRIVACY OF ALL SERVICE USERS. IN ORDER TO PROVIDE YOU WITH MORE ACCURATE AND MORE PERSONALIZED SERVICE, UBEEJOY WILL USE AND DISCLOSE YOUR PERSONAL INFORMATION IN ACCORDANCE WITH THE PROVISIONS OF THIS PRIVACY POLICY. HOWEVER, UBEEJOY WILL TREAT SUCH INFORMATION IN A HIGH DEGREE OF DILIGENCE AND DISCRETION. EXCEPT AS OTHERWISE PROVIDED IN THIS PRIVACY POLICY, WITHOUT YOUR PRIOR CONSENT, UBEEJOY WILL NOT DISCLOSE SUCH INFORMATION TO ANY THIRD PARTY. UBEEJOY MAY CONTINUE TO UPDATE THIS PRIVACY POLICY. AT THE TIME YOU AGREE TO OUR SERVICE AGREEMENT, YOU ARE DEEMED TO HAVE AGREED TO ALL OF THE CONTENTS OF THIS PRIVACY POLICY. THIS PRIVACY POLICY BELONGS TO AN INTEGRAL PART OF THE SERVICE AGREEMENT."
        }
    };
  },
  created() {},
  mounted(){
  	let storageLogin = localStorage.login=='true'?true:false;
	this.$store.commit('SET_LOGIN',storageLogin);
  	//刷新页面不会执行中间件，只能在做判断
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (this.$router.options.base.indexOf('/wap') < 0)){
		this.$router.push('/wap/privacy');
	}
  }
};
</script>
