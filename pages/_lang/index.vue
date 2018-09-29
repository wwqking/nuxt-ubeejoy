<template>
	<section class="container">
		<!--pc端-->
		<pcIndex></pcIndex>
	</section>
</template>

<script>
	import request from '~/service'

	/*pc*/
	import pcIndex from '~/components/index.vue'
	export default {
		middleware: 'authenticated',
		components: {
			/*pc*/
			pcIndex

		},
		data() {
			return {
			}
		},
		created(){
		},
		mounted(){
			let storageLogin = localStorage.login=='true'?true:false;
			this.$store.commit('SET_LOGIN',storageLogin);
		}
	}
</script>

