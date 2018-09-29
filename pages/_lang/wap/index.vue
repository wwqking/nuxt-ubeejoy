<template>
	<div :class="errorWin||sucWin?'mask':''">
		<wap-banner></wap-banner>
		<wap-game-center></wap-game-center>
		<div v-show="errorWin" class="error-window">
			<p class="text-tip">
				<h2 class="suc-flag">{{$t('recharge.rechargeFailed')}}</h2>
			</p>
			<a class="repeat-btn" @click="closeWin">{{$t('recharge.retry')}}</a>
		</div>
		
		<div v-show="sucWin" class="suc-window">
			<p class="text-tip">
				<h2 class="suc-flag">{{$t('recharge.rechargeSucceed')}}</h2>
			</p>
			<a class="repeat-btn" @click="closeWin">{{$t('recharge.enter')}}</a>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.suc-window,
	.error-window {
		position: fixed;
		z-index: 666;
		background: url(~assets/img/winsuc.png) no-repeat;
		background-size: contain;
		width: 7.3rem;
		height: 7.36rem;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.6rem;
		.text-tip {
			margin-top: 3.83rem;
		}
		.repeat-btn {
			font-size: 0.4rem;
			position: relative;
			top: 1rem;
			margin-top: 20px;
			background: #f8b62b;
			border-radius: 25px;
			padding: 0.24rem 1.55rem;
			color: #fff;
			cursor: pointer;
		}
	}
	
	.error-window {
		background: url(~assets/img/winerr.png) no-repeat;
		background-size: contain;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.6rem;
		.repeat-btn {
			background: #a0a0a0;
		}
	}
	.mask{
        background-color: #d2d2d2;;
        opacity: 0.6;
}  
</style>
<script>
	import wapBanner from '~/components/wap/swiper.vue'
	import wapGameCenter from '~/components/wap/games.vue'
	import wapHeader from '~/components/wap/header.vue'
	import wapNavbar from '~/components/wap/navbar.vue'
	export default {
		layout: 'wapIndex', //引用wap端布局文件
		components: {
			wapBanner,
			wapGameCenter,
			wapHeader,
			wapNavbar,
		},
		data() {
			return {
				errorWin: false,
				sucWin: false,
				urlParams: []
			};
		},
		mounted() {
			let $this = this;
			this.$nextTick(function(){
				//解析url参数
				this.getUrlParams();
				if(this.urlParams['orderId']){
					//paydibs支付方式不需要查询订单
					if(this.urlParams['payMethod'] != "paydibs"){
						this.orderId = this.urlParams['orderId'];
						this.queryOrderStatus();
					}else{
						if(this.urlParams['redirectState'] == 1){
							$this.sucWin = true;
						}else{
							$this.errorWin = true;
						}
					}
				}else if(this.urlParams['redirectState'] && this.urlParams['payMethod'] == "mycard"){
					if(this.urlParams['redirectState'] == 1){
						$this.sucWin = true;
					}else{
						$this.errorWin = true;
					}
				}else if(this.urlParams['redirectState'] && this.urlParams['payMethod'] == "paydibs"){
					if(this.urlParams['redirectState'] == 1){
						$this.sucWin = true;
					}else{
						$this.errorWin = true;
					}
				}
			})
		},
		methods: {
			getUrlParams: function() {
				let pairs = location.search.substring(1).split('&');
				for(let i = 0; i < pairs.length; i++) {
					let pos = pairs[i].indexOf('=');
					if(pos === -1) {
						continue;
					}
					this.urlParams[pairs[i].substring(0, pos)] = decodeURIComponent(pairs[i].substring(pos + 1));
				}
			},
			queryOrderStatus() {
				let $this = this;
				let url = '/api/recharge/queryOrderStatus.json?orderId=' + this.orderId;
				request.get(url, {}).then(function(resolve) {
					if(!resolve.code) {
						$this.maskWin = true;
						if(resolve.data.status == 1) { //成功
							$this.sucWin = true;
						} else { //失败
							$this.errorWin = true;
						}
					} else {}
				}, function(reject) {})
			},
			closeWin() {
				this.sucWin = false;
				this.errorWin = false;
			}
		}
	}
</script>