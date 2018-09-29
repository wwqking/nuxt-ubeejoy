<template>
	<section class="container">
	 <div class="pc">
		<navbar :welcome="welcome"></navbar>
		<div :class="loginError?'b-g-e':''" class="content">
			<div class="title">{{$t('login.title')}}</div>
			<div :class="[isSucAccount?'success':'',isErrorAccount?'error':'']" class="input-wrap m-b-32">
				<span class="iconfont icon-zhanghao">&#xe65e;</span>
				<input @blur="accountBlur" type="text" class="error-b-1" v-model="username" :placeholder="$t('login.account')" />
				<div class="error-tip" style="display: none;">
					{{$t('login.userError')}}
					<img src="../../assets/img/error.png" />
				</div>
				<div class="success-tip" style="display: none;">
					<img src="../../assets/img/success.png" />
				</div>
			</div>
			<div :class="[isSucPwd?'success':'',isErrorPwd?'error':'']" class="input-wrap">
				<span class="iconfont">&#xe603;</span>
				<input @blur="pwdBlur" v-show="switchPwd" class="error-b-1" v-model="pwd" type="text" :placeholder="$t('login.password')" @keyup.enter="login"/>
				<input @blur="pwdBlur" v-show="!switchPwd" class="error-b-1" v-model="pwd" type="password" :placeholder="$t('login.password')" @keyup.enter="login"/>
				<span @click="changeSwitch" tabindex="0" :class="switchPwd?'ivu-switch-checked':''" class="ivu-switch ivu-switch-default">
					<input type="hidden" value="true"> 
					<span :class="!switchPwd?'cor-ccc':''" class="ivu-switch-inner">{{$t('login.show')}}</span>
				</span>
				<div class="error-tip" style="display: none;">
					{{$t('login.pwdError')}}
					<img src="../../assets/img/error.png" />
				</div>
				<div class="success-tip" style="display: none;">
					<img src="../../assets/img/success.png" />
				</div>
			</div>
			<div class="input-checkbox">
				<img @click="checkChange($event)" v-show="checkedFile" src="~assets/img/checked.png" />
				<input @click="checkChange($event)" v-model="checkedFile" type="checkbox" />
				<span class="f-s-14">{{$t('login.remember')}}</span>
				<!-- <a class="free-register" v-html="$t('login.register')"></a> -->
				<!--<a class="forget-pwd" v-html="$t('login.forgetPW')"></a>-->
			</div>
			<a class="register-block" @click="login" href="javascript:void(0)">{{$t('login.login')}}</a>

			<div class="other-sdk">
				<div @click="fbLogin" class="fb-block">
					<img src="~assets/img/fblogo.png" />
					<a>{{$t('login.facebook')}}</a>
				</div>
				<div  class="goo-block" @click="gLogin">
					<img src="~assets/img/glogo.png" />
					<a>{{$t('login.google')}}</a>
				</div>
			</div>

		</div>
		<div v-show="loginError" class="error-window">
			<p class="text-tip">
				<h2 class="suc-flag">{{$t('login.loginFail')}}</h2>
			</p>
			<a class="repeat-btn" @click="retry">{{$t('recharge.retry')}}</a>
		</div>
	 </div>
	</section>
</template>


<script>
	//428804984298445
	import request from '~/service'
	import navbar from '~/components/navbarLogin.vue'
	import md5 from '~/static/js/md5.js'
	import Cookies from 'js-cookie'
	export default {
		components: {
			/*pc*/
			navbar,
		},
		data() {
			return {
				errorWin: false, //错误弹窗
				welcome: this.$t('login.welcome'),
				checkedFile: true,
				switchPwd: false,
				username: '',
				pwd: '',
				isSucAccount: false,
				isErrorAccount: false,
				isSucPwd: false,
				isErrorPwd: false,
				loginError: false //登录状态
			};
		},
		mounted(){
			let storageLogin = localStorage.login=='true'?true:false;
			this.$store.commit('SET_LOGIN',storageLogin);
			//刷新页面不会执行中间件，只能在做判断
			if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (this.$router.options.base.indexOf('/wap') < 0)){
				this.$router.push('/wap/my');
			}
			if(window.FB){
				this.fbAsyncInit();
			}
			
		},
		methods: {
			retry(){
                this.loginError = false;
            },
			checkChange() {
				this.checkedFile = !this.checkedFile;
			},
			changeSwitch() {
				this.switchPwd = !this.switchPwd;
				if(this.switchPwd) {

				}
			},
			login() {
				let $this = this;
				let password = md5.hex_md5(this.pwd);
				let url = "/api/login/login.json?account=" + this.username + "&password=" + password +"&lang=zh";
				request.get(url, {}).then(function(resolve) {
					if(!resolve.code) {
						//判断当前登录类型
						localStorage.loginType = resolve.data.loginType;
						//直接跳回首页
						localStorage.login = true;
						Cookies.set('token',resolve.data.outUserId,{expires: 1});
						$this.$store.commit('SET_LOGIN',true);
						$this.$router.push("/"+$this.$store.state.locale);
					} else {
						$this.loginError = true;
					}
					//$this.list = resolve.d.banner;
				}, function(reject) {})
			},
			//验证账号
			accountBlur() {
				if(this.username.length < 3) {
					this.isErrorAccount = true;
					this.isSucAccount = false;
				} else {
					this.isSucAccount = true;
					this.isErrorAccount = false;
				}
			},
			//验证密码
			pwdBlur() {
				if(this.pwd.length < 6) {
					this.isErrorPwd = true;
					this.isSucPwd = false;
				} else {
					this.isSucPwd = true;
					this.isErrorPwd = false;
				}
			},
			fbLogin() {
				let $this = this;
				FB.login(function(response) {
					var authResponse = response.authResponse;
					if(response.status === 'connected') {
						//调用ids_for_business
						var idsUrl = authResponse.userID + '/ids_for_business';
						FB.api(
							idsUrl,
							function(response) {
								if(response && !response.error) {
									/* handle the result */
									//调用成功之后的回调
									$this.fbLoginCallBack(authResponse.accessToken,authResponse.userID,response.data);
								}
							}
						);

						// Logged into your app and Facebook.
					} else {
						// The person is not logged into this app or we are unable to tell. 
					}
				});
			},
			//Fb登录之后的回调
			fbLoginCallBack(token,userId,data){
				let params = {
					"thirdToken": token,
					"thirdId": 1,
					"thirdUserId": userId,
					"extArgs": {},
					"data": data
				};
				let $this = this;
				let url = "/api/login/thirdPartLogin.json";
				request.commonPOST(url, JSON.stringify(params)).then(function(resolve) {
					if(resolve) {
						//判断当前登录类型
						localStorage.loginType = resolve.loginType;
						//直接跳回首页
						localStorage.login = true;
						Cookies.set('token',resolve.outUserId);
						$this.$store.commit('SET_LOGIN',true);
						$this.$router.push("/"+$this.$store.state.locale);
					} else {
						$this.loginError = true;
					}
					//$this.list = resolve.d.banner;
				}, function(reject) {})
			},
			//初始化facebook应用程式
			fbAsyncInit() {	//428804984298445
				FB.init({	//2024124547835993
					appId: '428804984298445',
					version: 'v3.0',
					cookie: true,
					xfbml: true, // parse social plugins on this page
					oauth: true
				});
			},

			//谷歌登录
			gLogin(){
				let $this = this;
				// console.log(gapi);
				gapi.load('auth2', function(){
				let auth2 = gapi.auth2.init({
					client_id: '748752793113-i8kigev01ov1jg4nlmurodscit7vffjq.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin',
				});
				auth2.signIn().then(function() {
					let token = auth2.currentUser.get().getAuthResponse().id_token;
					let userId = auth2.currentUser.get().getBasicProfile().getId();

					let params = {
						"thirdToken": token,
						"thirdId": 2,
						"thirdUserId": userId,
						"extArgs": {},
						"data": []
					};
					// console.log(params);
					let url = "/api/login/thirdPartLogin.json";
					request.commonPOST(url, JSON.stringify(params)).then(function(resolve) {
						if(resolve) {
							//判断当前登录类型
							localStorage.loginType = resolve.loginType;
							
							localStorage.login = true;
							//直接跳回首页
							Cookies.set('token',resolve.outUserId);
							$this.$store.commit('SET_LOGIN',true);
							$this.$router.push("/"+$this.$store.state.locale);
						} else {
							$this.loginError = true;
						}
					}, function(reject) {})
						
				});
				
				});
			},
		}
	};
</script>
<style lang="scss" scoped>
	.ivu-switch {
		display: inline-block;
		left: 713px !important;
		width: 50px;
		height: 22px;
		line-height: 20px;
		border-radius: 22px;
		vertical-align: middle;
		border: 1px solid #ccc;
		background-color: #ccc;
		position: relative;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		transition: all .2s ease-in-out;
		&:focus {
			outline: none;
		}
	}
	
	.ivu-switch-checked {
		border-color: #F8B62B;
		background-color: #F8B62B;
	}
	
	.ivu-switch-checked .ivu-switch-inner {
		left: 7px;
	}
	
	.ivu-switch-inner {
		color: #fff;
		font-size: 12px;
		position: absolute;
		top: 0px !important;
		width: 36px;
		left: -2px !important;
		display: inline-block;
	}
	
	.ivu-switch:after {
		content: "";
		width: 18px;
		height: 18px;
		border-radius: 18px;
		background-color: #fff;
		position: absolute;
		left: 1px;
		top: 1px;
		cursor: pointer;
		transition: left .2s ease-in-out, width .2s ease-in-out;
	}
	
	.ivu-switch-checked:after {
		left: 31px;
	}
	
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
	
	.f-s-14 {
		font-size: 14px;
	}
	
	.m-b-32 {
		margin-bottom: 32px;
	}
	
	.cor-ccc {
		color: #ccc;
	}
	
	.cor-9 {
		margin-left: 50px;
		color: #999;
		font-size: 14px;
	}
	
	.free-register {
		font-size: 14px;
		color: #999;
		cursor: pointer;
	}
	
	.forget-pwd {
		color: #f8b62b;
		font-size: 14px;
		cursor: pointer;
		margin-left: 10px;
	}
	
	.content {
		width: 1200px;
		background: #fff;
		margin: 0 auto;
		margin-top: 63px;
		margin-bottom: 80px;
		text-align: center;
		.title {
			font-size: 36px;
			color: #333333;
			padding-top: 59px;
			margin-bottom: 59px;
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
		.other-sdk {
			text-align: left;
			margin-left: 428px;
			padding-bottom: 100px;
		}
		.fb-block,
		.goo-block {
			display: inline-block;
			margin-right: 20px;
			text-align: left;
			cursor: pointer;
			img {
				margin-right: 15px;
				vertical-align: middle;
				position: relative;
				top: -3px;
			}
		}
	}
	
	.suc-window,
	.error-window {
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
		.text-tip {
			margin-top: 236px;
			h2 {}
		}
	}
	
	.error-window {
		background: url(~assets/img/winerr.png) no-repeat;
		text-align: center;
		line-height: 22px;
		span {
			color: #f8b62b;
		}
		.repeat-btn {
			position: relative;
			top: 56px;
			margin-top: 20px;
			background: #a0a0a0;
			border-radius: 25px;
			padding: 13px 80px;
			color: #fff;
			cursor: pointer;
			&:hover {
				text-decoration: none;
			}
		}
	}
	
	.suc-flag {
		font-size: 26px;
		margin-bottom: 10px;
	}
	
	.error {
		.error-b-1 {
			border: 1px solid #fb5454 !important;
		}
		.error-tip {
			position: absolute;
			display: inline-block !important;
			color: #fb5454;
			margin-left: 20px;
			top: 10px;
			img {
				vertical-align: middle;
			}
		}
	}
	
	.success {
		.success-tip {
			position: absolute;
			display: inline-block !important;
			margin-left: 20px;
			top: 8px;
		}
	}
	
	.b-g-e {
		background: #eee !important;
	}
</style>