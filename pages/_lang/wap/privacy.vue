<template>
	<section class="container">
		<div class="wap">
			<wap-navbar2></wap-navbar2>
			<wapSomeMessage :message="message"></wapSomeMessage>
			<new-privacy></new-privacy>
		</div>
	</section>
</template>

<script>
	import request from "~/service";

	/*wap*/
	import wapHeader2 from '~/components/wap/header2';
	import wapNavbar2 from '~/components/wap/navbar2.vue'
	import wapSomeMessage from "~/components/wap/someMessage.vue";

	import newPrivacy from '~/components/wap/privacy.vue'

	export default {
		layout: 'private',
		components: {
			/*wap*/
			wapHeader2,
			wapNavbar2,
			wapSomeMessage,
			newPrivacy
		},
		data() {
			return {
				message: {
					title: this.$t('privacy.title'),
					content:'',
					//content: "UBEEJOY GAMES RESPECTS AND PROTECTS THE PERSONAL PRIVACY OF ALL SERVICE USERS. IN ORDER TO PROVIDE YOU WITH MORE ACCURATE AND MORE PERSONALIZED SERVICE, UBEEJOY WILL USE AND DISCLOSE YOUR PERSONAL INFORMATION IN ACCORDANCE WITH THE PROVISIONS OF THIS PRIVACY POLICY. HOWEVER, UBEEJOY WILL TREAT SUCH INFORMATION IN A HIGH DEGREE OF DILIGENCE AND DISCRETION. EXCEPT AS OTHERWISE PROVIDED IN THIS PRIVACY POLICY, WITHOUT YOUR PRIOR CONSENT, UBEEJOY WILL NOT DISCLOSE SUCH INFORMATION TO ANY THIRD PARTY. UBEEJOY MAY CONTINUE TO UPDATE THIS PRIVACY POLICY. AT THE TIME YOU AGREE TO OUR SERVICE AGREEMENT, YOU ARE DEEMED TO HAVE AGREED TO ALL OF THE CONTENTS OF THIS PRIVACY POLICY. THIS PRIVACY POLICY BELONGS TO AN INTEGRAL PART OF THE SERVICE AGREEMENT."
				}
			};
		},
		mounted() {
			this.$router.push('/'+ this.$store.state.locale +'/privacy');
		}
	};
</script>

<style lang="scss" scoped>

</style>