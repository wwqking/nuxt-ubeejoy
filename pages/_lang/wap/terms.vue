<template>
	<section class="container">
		<div class="wap">
			<wap-navbar2></wap-navbar2>
			<wapSomeMessage :message="message"></wapSomeMessage>
			<new-terms></new-terms>
		</div>
	</section>
</template>

<script>
	import request from "~/service";

	/*wap*/
	import wapNavbar2 from '~/components/wap/navbar2.vue'
	import wapSomeMessage from "~/components/wap/someMessage.vue";
	import newTerms from "~/components/wap/terms.vue"

	export default {
		layout: 'private',
		components: {
			/*wap*/
			wapNavbar2,
			wapSomeMessage,
			newTerms
		},
		data() {
			return {
				message: {
					title: this.$t('terms.title'),
					content: ''
				}
			};
		},
		mounted() {
			this.$router.push('/'+ this.$store.state.locale +'/terms');
		}
	};
</script>

<style lang="scss" scoped>

</style>