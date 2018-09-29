<template>
	<section class="container">
		<navbarLogin :welcome="registration"></navbarLogin>
		<div class="content">
			<div class="title">{{$t('register.title')}}</div>
			<div class="input-wrap">
				<span class="iconfont icon-zhanghao">&#xe65e;</span>
				<input type="text" :placeholder="$t('register.account')" />
				<p>{{$t('register.accountRequire')}}</p>
			</div>
			<div class="input-wrap">
				<span class="iconfont">&#xe603;</span>
				<input type="text" :placeholder="$t('register.password')" />
				<p>{{$t('register.passwordRequire')}}</p>
			</div>
			<div class="input-wrap m-b-32">
				<span class="iconfont">&#xe603;</span>
				<input type="text" :placeholder="$t('register.repassword')" />
			</div>
			<div class="input-wrap m-b-32">
				<span class="iconfont">&#xe601;</span>
				<input type="text" :placeholder="$t('register.email')" />
			</div>
			<div class="input-wrap">
				<input type="text" class="veify-input" :placeholder="$t('register.code')" />
				<a class="verify-code">{{$t('register.getCode')}}</a>
			</div>
			<div class="input-checkbox">
				<img @click="checkChange($event)" v-show="checkedFile" src="~assets/img/checked.png" />
				<input @click="checkChange($event)" v-model="checkedFile" type="checkbox" />
				<span>{{$t('register.agree')}}</span>
			</div>
			<a class="register-block">{{$t('register.btn')}}</a>
			
			<div class="fb-block">
				<img src="~assets/img/fblogo.png" />
				<a>{{$t('register.facebook')}}</a>
			</div>
		</div>
	</section>
</template>

<script>
	import navbarLogin from '~/components/navbarLogin.vue'
	export default {
		components: {
			navbarLogin
		},
		data() {
			return {
				registration:this.$t('register.registration'),
				checkedFile: true
			};
		},
		methods: {
			checkChange() {
				this.checkedFile = !this.checkedFile;
			}
		}
	};
</script>
<style lang="scss" scoped>
	@font-face {
		font-family: 'iconfont';
		/* project id 229929 */
		src: url('//at.alicdn.com/t/font_229929_6b906vg0q8s.eot');
		src: url('//at.alicdn.com/t/font_229929_6b906vg0q8s.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_229929_6b906vg0q8s.woff') format('woff'), url('//at.alicdn.com/t/font_229929_6b906vg0q8s.ttf') format('truetype'), url('//at.alicdn.com/t/font_229929_6b906vg0q8s.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.m-b-32 {
		margin-bottom: 32px;
	}
	
	.content {
		width: 1200px;
		background: #fff;
		margin: 0 auto;
		margin-top: 96px;
		margin-bottom: 80px;
		text-align: center;
		.title {
			font-size: 36px;
			color: #333333;
			padding-top: 59px;
			margin-bottom: 98px;
		}
		.input-wrap {
			position: relative;
			input {
				width: 350px;
				height: 45px;
				border: 1px solid #dcdcdc;
				text-indent: 35px;
				&:focus {
					outline: 1px solid #1a9fcb;
				}
			}
			span {
				position: absolute;
				top: 14px;
				left: 435px;
			}
			p {
				text-align: left;
				padding-left: 440px;
				color: #888585;
				font-size: 14px;
				margin: 14px 0 21px 0;
			}
			.veify-input {
				width: 206px;
				margin-right: 30px;
			}
			.verify-code {
				color: #fff;
				background: #F8B62B;
				padding: 14px 16px;
				cursor: pointer;
			}
		}
		.input-checkbox {
			position: relative;
			text-align: left;
			margin-left: 428px;
			margin-top: 15px;
			margin-bottom: 31px;
			img {
				position: absolute;
				z-index: 121;
				top: 6px;
				left: 2px;
			}
			input {
				position: relative;
				top: 2px;
				margin-right: 10px;
				background: #F8B62B;
				width: 16px;
				height: 16px;
				&:focus {
					outline: 0;
				}
			}
		}
		.register-block {
			position: relative;
			background: #F8B62B;
			color: #fff;
			display: block;
			font-size: 18px;
			padding: 14px;
			width: 350px;
			margin: auto;
			cursor: pointer;
			margin-bottom: 32px;
		}
		
		.fb-block{
			padding-bottom: 100px;
			text-align: left;
			margin-left: 427px;
			cursor: pointer;
			img{
				margin-right: 15px;
				vertical-align: middle;
				position: relative;
				top: -3px;
			}
		}
	}
</style>