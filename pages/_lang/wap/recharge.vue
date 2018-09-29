<template>
	<section class="">
		<wapRecharge></wapRecharge>
	</section>
</template>

<script>
	import wapRecharge from '~/components/wap/recharge'
	export default {
		layout: 'wap',
		middleware: 'authenticated',
		components: {
			wapRecharge,
		},
		mounted() {
			this.$router.push('/'+ this.$store.state.locale +'/recharge');
		}
	}
</script>
