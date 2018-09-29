<template>
	<section class="container">
		<div class="wap">
			<wap-banner></wap-banner>
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

	/*wap*/
	import wapHeader2 from '~/components/wap/header2';
	import wapNavbar from '~/components/wap/navbar.vue'
	import wapBanner from '~/components/wap/swiper.vue'

	export default {
		layout: 'wap', //引用wap端布局文件
		components: {
			/*wap*/
			wapHeader2,
			wapNavbar,
			wapBanner,
		},
		data() {
			return {};
		},
		mounted(){
			this.$router.push('/'+ this.$store.state.locale +'/about');
		}
	};
</script>
<style lang="scss" scoped>
	.wap {
		.content {
			width: 100%;
			text-align: center;
			background: #fff;
			padding: 0.84rem 0 0.84rem 0;
			.title {
				font-size: 0.6rem;
				color: #333333;
				font-weight: bold;
			}
			.icon {
				width: 5.52rem;
				height: 0.04rem;
				background: url("~assets/img/wap/fengexian.png") no-repeat center;
				background-size: contain;
				margin: 0.34rem auto 1.05rem;
			}
			.text {
				width: 7.95rem;
				margin: 0 auto;
				font-size: 0.36rem;
				line-height: 2em;
				color: #333333;
			}
		}
	}
</style>