<template>
	<div>
		<navbar></navbar>
			<banner></banner>
			<gameCenter></gameCenter>
			<div v-show="maskWin" class="mask"></div>
			<div v-show="sucWin" class="suc-window">
				<p class="text-tip">
					<h2 class="suc-flag">{{$t('recharge.rechargeSucceed')}}</h2>
					<p>{{$t('recharge.succeed')}}</p>
				</p>
				<a @click="closeWin" class="game-btn">{{$t('recharge.enter')}}</a>
			</div>
			<div v-show="errorWin" class="error-window">
				<p class="text-tip">
					<h2 class="suc-flag">{{$t('recharge.rechargeFailed')}}</h2>
					<p v-html="$t('recharge.failed')">
						<!-- 请重试或者<br/>
						提供订单号及角色信息给<span>客服</span> -->
					</p>
				</p>
				<a @click="closeWin" class="repeat-btn">{{$t('recharge.retry')}}</a>
			</div>
	</div>
</template>

<script>
	import request from '~/service'
	/*pc*/
	import banner from '~/components/swiper.vue'
	import gameCenter from '~/components/games.vue'
	import navbar from '~/components/navbar.vue'
	
	export default{
		components: {
			/*pc*/
			navbar,
			banner,
			gameCenter,
		},
		data() {
			return {
				maskWin: false, //遮罩
				sucWin: false, //正确弹窗
				errorWin: false, //错误弹窗
				list: [],
				urlParams: [],
				orderId: ''
			}
		},
		mounted(){
			let $this = this;
			this.$nextTick(function(){
				//刷新页面不会执行中间件，只能在做判断
				if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (this.$router.options.base.indexOf('/wap') < 0)){
					this.$router.push('/wap');
				}
				
				//解析url参数
				this.getUrlParams();
				if(this.urlParams['orderId']){
					//paydibs支付方式不需要查询订单
					if(this.urlParams['payMethod'] != "paydibs"){
						this.orderId = this.urlParams['orderId'];
						this.queryOrderStatus();
					}else{
						$this.maskWin = true;
						if(this.urlParams['redirectState'] == 1){
							$this.sucWin = true;
						}else{
							$this.errorWin = true;
						}
					}
				}else if(this.urlParams['redirectState'] && this.urlParams['payMethod'] == "mycard"){
					$this.maskWin = true;
					if(this.urlParams['redirectState'] == 1){
						$this.sucWin = true;
					}else{
						$this.errorWin = true;
					}
				}else if(this.urlParams['redirectState'] && this.urlParams['payMethod'] == "paydibs"){
					$this.maskWin = true;
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
			queryOrderStatus(){
				let $this = this;
				let url = '/api/recharge/queryOrderStatus.json?orderId=' + this.orderId;
				request.get(url, {}).then(function(resolve) {
					if(!resolve.code) {
						$this.maskWin = true;
						if(resolve.data.status == 1){ //成功
							$this.sucWin = true;
						}else{	//失败
							 $this.errorWin = true;
						}
					} else {
					}
				}, function(reject) {})
			},
			closeWin(){
				this.maskWin = false;
				this.sucWin = false;
				this.errorWin = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask{
		position: fixed;
	    z-index: 10;
	    background: #e4e4e4;
	    top: 0;
	    width: 100%;
	    opacity: 0.6;
	    height: 100%;
	    left: 0;
	}
	
	.suc-window,.error-window{
		position: fixed;
		z-index: 20;
		background: url(~assets/img/winsuc.png) no-repeat;
		width: 459px;
		height: 462px;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		text-align: center;
		.text-tip{
			margin-top: 236px;
			h2{
				
			}
		}
	}
	
	.error-window{
		background: url(~assets/img/winerr.png) no-repeat;
		line-height: 22px;
		span{
			color: #f8b62b;
		}
		.repeat-btn{
			position: relative;
			top: 56px;
			margin-top: 20px;
			background: #a0a0a0;
			border-radius: 25px;
			padding: 13px 80px;
			color: #fff;
			cursor: pointer;
			&:hover{
				text-decoration: none;
			}
		}
	}
	
	.suc-flag{
		font-size: 26px;	
		margin-bottom: 10px;
	}

	.game-btn{
		position: relative;
		top: 56px;
		margin-top: 20px;
		background: #f8b62b;
		border-radius: 25px;
		padding: 13px 80px;
		color: #fff;
		cursor: pointer;
		&:hover{
			text-decoration: none;
		}
	}
</style>