<template>
	<div class="wap_sidebar">
		<div class="content">
			<div v-if="!getLoginStatus" class="b-1">
				<nuxt-link :to="$i18n.path('my')"><span @click="gotoLogin()">{{$t('header.login')}}</span></nuxt-link>
				<!--<span class="or">{{$t('sidebar.or')}}</span>
                <nuxt-link :to="$i18n.path('register')" exact><span>{{$t('header.register')}}</span></nuxt-link>-->
			</div>
			<div v-else-if="getLoginStatus" class="b-1">
				<a @click="logType" style="color: #fff;cursor: pointer;">{{$t('login.loginOut')}}</a>
			</div>
			<ul class="langList b-2">
				<nuxt-link :to="`/`">
					<li @click="langSet('zh');$emit('closed')" class="langItm" exact>{{$t('sidebar.zh')}}</li>
				</nuxt-link>
				<nuxt-link :to="`/en`">
					<li @click="langSet('en');$emit('closed')" class="langItm" exact>{{$t('sidebar.en')}}</li>
				</nuxt-link>
				<nuxt-link :to="`/kr`">
					<li @click="langSet('kr');$emit('closed')" class="langItm" exact>{{$t('sidebar.kr')}}</li>
				</nuxt-link>
			</ul>
			<div class="b-3">
				<p>{{$t('sidebar.third')}}</p>
				<div class="fb-block logo" @click="fbLogin">
					<img src="~assets/img/wap/fblogo.png" />
				</div>
				<div class="goo-block logo" @click="gLogin">
					<img src="~assets/img/wap/glogo.png" />
				</div>
			</div>

		</div>
		<div class="close" @click="$emit('closed')"></div>
	</div>
</template>

<script>
	//:to="$i18n.path('my')"
	import request from "~/service";
	import Cookies from "js-cookie";
	export default {
		components: {},
		data() {
			return {};
		},
		mounted() {
			this.fbAsyncInit();
		},
		computed: {
			getLoginStatus() {
				return this.$store.state.loginStatus;
			}
		},
		methods: {
			logType() {
				let loginType = localStorage.loginType;
				if(loginType == 0) {
					this.logOut();
				} else if(loginType == 1) {
					this.fBlogOut();
				} else if(loginType == 2) {
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
					}  else if(resolve.code == 5){
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
			},
			langSet(lang) {
				Cookies.set("lang", lang);
			},
			//之前路由问题，强行加上路由跳转
			gotoLogin() {
				//this.$router.push(this.$store.state.locale + 'my');
			},

			//fb登录
			fbLogin() {
				let $this = this;
				FB.login(function(response) {
					var authResponse = response.authResponse;
					if(response.status === "connected") {
						//调用ids_for_business
						var idsUrl = authResponse.userID + "/ids_for_business";
						FB.api(idsUrl, function(response) {
							if(response && !response.error) {
								/* handle the result */
								//调用成功之后的回调
								$this.fbLoginCallBack(
									authResponse.accessToken,
									authResponse.userID,
									response.data
								);
							}
						});

						// Logged into your app and Facebook.
					} else {
						// The person is not logged into this app or we are unable to tell.
					}
				});
			},
			//Fb登录之后的回调
			fbLoginCallBack(token, userId, data) {
				let params = {
					thirdToken: token,
					thirdId: 1,
					thirdUserId: userId,
					extArgs: {},
					data: data
				};
				let $this = this;
				let url = "/api/login/thirdPartLogin.json";
				request.commonPOST(url, JSON.stringify(params)).then(
					function(resolve) {
						if(!resolve.code) {
							//直接跳回首页
							Cookies.set("token", resolve.data.outUserId);
							$this.$store.commit("SET_LOGIN", true);
							$this.$router.push("/");
						} else {
							$this.loginError = true;
						}
						//$this.list = resolve.d.banner;
					},
					function(reject) {}
				);
			},
			//初始化facebook应用程式
			fbAsyncInit() {
				//428804984298445
				FB.init({
					//2024124547835993
					appId: "428804984298445",
					version: "v3.0",
					cookie: true,
					xfbml: true, // parse social plugins on this page
					oauth: true
				});
			},

			//谷歌登录
			gLogin() {
				let $this = this;
				// console.log(gapi);
				gapi.load("auth2", function() {
					let auth2 = gapi.auth2.init({
						client_id: "748752793113-i8kigev01ov1jg4nlmurodscit7vffjq.apps.googleusercontent.com",
						cookiepolicy: "single_host_origin"
					});
					auth2.signIn().then(function() {
						let token = auth2.currentUser.get().getAuthResponse().id_token;
						let userId = auth2.currentUser
							.get()
							.getBasicProfile()
							.getId();

						let params = {
							thirdToken: token,
							thirdId: 2,
							thirdUserId: userId,
							extArgs: {},
							data: []
						};
						// console.log(params);
						let url = "/api/login/thirdPartLogin.json";
						request.commonPOST(url, JSON.stringify(params)).then(
							function(resolve) {
								if(!resolve.code) {
									console.log(resolve);
									//直接跳回首页
									Cookies.set("token", resolve.outUserId);
									$this.$store.commit("SET_LOGIN", true);
									$this.$router.push("/");
								} else {
									$this.loginError = true;
								}
							},
							function(reject) {}
						);
					});
				});
			}
		},
	};
</script>
<style lang="scss" scoped>
	.wap_sidebar {
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		z-index: 666;
		.content {
			width: 5.4rem;
			height: 100%;
			background: #666666;
			text-align: center;
			.b-1 {
				height: 2.35rem;
				border-bottom: 0.03rem solid #999999;
				line-height: 2.35rem;
				span {
					font-size: 0.48rem;
					color: #fffefd;
				}
				.or {
					font-size: 0.36rem;
					color: #a5a4a3;
					margin: 0 0.15rem;
				}
			}
			.b-2 {
				font-size: 0.48rem;
				color: #fbfaf9;
				.langItm {
					color: #fbfaf9;
					height: 1.08rem;
					border-bottom: 0.03rem solid #999999;
					line-height: 1.08rem;
				}
				.nuxt-link-exact-active .langItm {
					color: #f8b833;
				}
			}
			.b-3 {
				font-size: 0.48rem;
				color: #fbfaf9;
				padding: 3.59rem 0;
				.logo {
					width: 1.97rem;
					height: 1.98rem;
					margin: 0 auto;
					img {
						width: 100%;
					}
				}
				.fb-block {
					margin: 0.86rem auto 0.92rem;
				}
			}
		}
		.close {
			width: 0.5rem;
			height: 0.5rem;
			background: url("~assets/img/wap/close.png") no-repeat center;
			background-size: contain;
			position: absolute;
			left: -0.97rem;
			top: 0.4rem;
		}
	}
</style>