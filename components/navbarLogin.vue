<template>
	<!--这是登录和注册的导航条-->
	<div class="navBar">
		<div class="barWrap">
			<nuxt-link :to="$i18n.path('')" class="l icon">
				<img src="~assets/img/logoUb.png" />
			</nuxt-link>
			<span>{{welcome}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:['welcome'],
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>

	.nuxt-link-active {
		color: #f8ae1a !important;
	}
	
	.navBar {
		width: 100%;
		height: 120px;
		line-height: 120px; 
		position: relative;
		background: #fff;
		.barWrap {
			width: 1200px;
			margin: 0 auto;
			span {
				color: #333333;
				font-size: 36px;
				margin-left: 50px;
			}
			img{
				position: relative;
				vertical-align: middle;
			}
		}
	}
</style>