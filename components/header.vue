<template>
	<!--页头-->
	<div class="header">
		<div class="content_wrap clearfix">
			<div v-if="!getLoginStatus" class="left l">
				<span class="welcome">{{$t('header.welcome')}}</span>
				<nuxt-link :to="$i18n.path('login')"><span class="login">{{$t('header.login')}}</span></nuxt-link>
				<!--<span class="fengexian">|</span>
                <nuxt-link :to="$i18n.path('register')"><span class="register">{{$t('header.register')}}</span></nuxt-link>-->
			</div>
			<div v-else-if="getLoginStatus" class="left l" style="margin-left: 20px;">
				<a @click="logType" class="welcome" style="color: #fff;cursor: pointer;">{{$t('login.loginOut')}}</a>
			</div>
			<div class="right r clearfix">
				<div class="mobile l">
					<div class="small_ewm l">
						<img src="~assets/img/pc_small_ewm.png" />
					</div>
					<span class="phone l normal">{{$t('header.phone')}}</span>
					<span class="arrowdown l"></span>

					<!--二维码弹窗-->
					<div class="win_phone">
						<div class="win_header clearfix">
							<span class="phone l down">{{$t('header.phone')}}</span>
							<span class="arrowup l"></span>
						</div>
						<div class="big_ewm">
							<img src="~assets/img/pc_big_ewm.png" />
						</div>
					</div>

				</div>
				<span class="fengexian l">|</span>
				<div class="language l">
					<span class="lang l normal">{{$t('header.lang')}}</span>
					<span class="arrowdown l"></span>

					<!--语言弹窗-->
					<div class="win_lang">
						<div class="win_lang_header">
							<span class="lang l down">{{$t('header.lang')}}</span>
							<span class="arrowup l"></span>
						</div>
						<div class="win_lang_body">
							<ul>
								<nuxt-link :to="`/`" class="langItm">
									<li>中文</li>
								</nuxt-link>
								<nuxt-link :to="`/en`" class="langItm">
									<li>English</li>
								</nuxt-link>
								<nuxt-link :to="`/kr`" class="langItm">
									<li>한국어</li>
								</nuxt-link>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '~/service'
	import Cookies from 'js-cookie'
	export default {
		data() {
			return {
				loginStatus: false,
			};
		},
		mounted() {
			this.loginStatus = Cookies.get('token') ? true : false;
		},
		computed: {
			getLoginStatus() {
				return this.$store.state.loginStatus;
			}
		},
		methods: {
			logType(){
				//获取当前路由
				console.log(this.$router);
				let loginType = localStorage.loginType;
				if(loginType == 0){
					this.logOut();
				}else if(loginType == 1){
					this.fBlogOut();
				}else if(loginType == 2){
					this.gLogOut();
				}else{
					this.logOut();
				}
			},
			logOut() {
				let $this = this;
				let url = "/api/login/logout.json";
				request.get(url, {}).then(function(resolve) {
					if(!resolve.code) {
						localStorage.login = false;
						//直接跳回首页
						Cookies.set('token', '');
						$this.$store.commit('SET_LOGIN', false);
						//如果是在储值页面，直接跳回首页
						if($this.$router.history.current.fullPath.indexOf('recharge')> -1){
							$this.$router.push('/'+ $this.$store.state.locale);
						}
						
					} else if(resolve.code == 5){
						localStorage.login = false;
						Cookies.set('token','');
						$this.$store.commit('SET_LOGIN', false);
						$this.$router.push('login');
					}
					//$this.list = resolve.d.banner;
				}, function(reject) {})
			},
			//FB登出
			fBlogOut() {
				let $this = this;
				FB.getLoginStatus(function(_ref5) {
					var status = _ref5.status,
						authResponse = _ref5.authResponse;
					if(status === "connected") {
						FB.logout(function(response) {
							$this.logOut();
						});
					}
				});
			},
			//谷歌登出
			gLogOut() {
				let $this = this;
				gapi.load('auth2', function() {
					let auth2 = gapi.auth2.init({
						client_id: '748752793113-i8kigev01ov1jg4nlmurodscit7vffjq.apps.googleusercontent.com',
						cookiepolicy: 'single_host_origin',
					});
					auth2.signOut().then(function() {
						$this.logOut();
					});
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.langItm:hover {
		text-decoration: none !important;
	}
	
	.header {
		width: 100%;
		height: 40px;
		background: #2e2e2e;
		.content_wrap {
			width: 1200px;
			margin: 0 auto;
			.left {
				font-size: 14px;
				color: #ffffff;
				margin-top: 13px;
				.fengexian {
					margin: 0 10px;
					font-size: 16px;
				}
				span {
					font-size: 14px;
					color: #ffffff;
				}
				.login {
					margin-left: 6px;
				}
			}
			.right {
				position: relative;
				font-size: 14px;
				.mobile,
				.language {
					display: inline-block;
					cursor: pointer;
				}
				.small_ewm {
					margin-top: 10px;
					margin-right: 5px;
				}
				.normal {
					margin-top: 13px;
					color: #cccccc;
				}
				.fengexian {
					margin: 13px 15px 0 0;
					color: #cccccc;
				}
				.arrowdown {
					width: 16px;
					height: 18px;
					background: url('~assets/img/pc_arrow.png') center no-repeat;
					background-size: contain;
					margin: 13px 19px 0 8px;
				}
				.arrowup {
					width: 16px;
					height: 18px;
					margin: 12px 15px 0;
					background: url('~assets/img/pc_arrow_up.png') center no-repeat;
					background-size: contain;
				}
				.down {
					margin-top: 14px;
					margin-left: 28px;
					color: #5a5a5a;
				}
				//hover后显示弹窗
				.mobile:hover .win_phone {
					display: block;
				}
				.language:hover .win_lang {
					display: block;
				}
				//手机浏览弹窗
				.win_phone {
					display: none;
					position: absolute;
					background: #ffffff;
					left: 0px;
					top: 0px;
					padding-bottom: 5px;
					z-index: 999;
					border-right: 1px solid #cccccc;
					border-left: 1px solid #cccccc;
					border-bottom: 1px solid #cccccc;
					.win_header {
						height: 40px;
					}
					.big_ewm {
						width: 80%;
						margin: 0 auto;
						img {
							width: 100%;
						}
					}
				}
				//语言弹窗
				.win_lang {
					display: none;
					position: absolute;
					background: #ffffff;
					right: 0px;
					top: 0px;
					padding-bottom: 5px;
					z-index: 999;
					.win_lang_header {
						height: 40px;
					}
					.win_lang_body {
						position: absolute;
						width: 180px;
						border-bottom: 1px solid #cccccc;
						border-left: 1px solid #cccccc;
						border-right: 1px solid #cccccc;
						background: #ffffff;
						right: 0;
						top: 40px;
						li {
							padding: 10px 0 10px 20px;
							color: #5a5a5a;
						}
						li:hover {
							background: #f2f2f2;
						}
					}
				}
			}
		}
	}
</style>