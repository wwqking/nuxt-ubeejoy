<template>
<!--这是手机版的登录组件-->
	<section class="wap_login" :class="loginError?'mask':''">
		<div>
			<div :class="[isSucAccount?'success':'',isErrorAccount?'error':'']" class="input-wrap">
				<span class="iconfont">&#xe65e;</span>
				<input @blur="accountBlur" @focus="accountFocus" type="text" v-model="username" :placeholder="$t('login.account')" />
				<div class="error-tip clearfix" style="display: none;">
					<span class="l">账号格式有误</span>
					<img src="~/assets/img/error.png" class="l"/>
				</div>
				<div class="success-tip" style="display: none;">
					<img src="~/assets/img/success.png" />
				</div>
			</div>
			<div :class="[isSucPwd?'success':'',isErrorPwd?'error':'']" class="input-wrap">
				<span class="iconfont">&#xe603;</span>
				<input @blur="pwdBlur" @focus="pwdFocus" v-show="switchPwd" v-model="pwd" type="text" :placeholder="$t('login.password')" @keyup.enter="login"/>
				<input @blur="pwdBlur" @focus="pwdFocus" v-show="!switchPwd" v-model="pwd" type="password"  :placeholder="$t('login.password')" @keyup.enter="login"/>
				<span v-show="!isErrorPwd" @click="changeSwitch" tabindex="0" :class="switchPwd?'ivu-switch-checked':''" class="ivu-switch ivu-switch-default">
					<input type="hidden" value="true"> 
					<span :class="!switchPwd?'cor-ccc':''" class="ivu-switch-inner">{{$t('login.show')}}</span>
				</span>
				<div class="error-tip clearfix" style="display: none;">
					<span class="l">密码格式有误</span>
					<img src="~/assets/img/error.png" class="l"/>
				</div>
				<div class="success-tip" style="display: none;">
					<img src="~/assets/img/success.png" />
				</div>
			</div>
			<div class="input-checkbox">
                <div class="content_wrap clearfix">
                    <img @click="checkChange($event)" v-show="checkedFile" src="~assets/img/checked.png"/>
                    <input @click="checkChange($event)" v-model="checkedFile" type="checkbox" class="l"/>
                    <span class="l">{{$t('login.remember')}}</span>
                    <!-- <a class="l" v-html="$t('login.register')" style="margin-left:0.2rem"></a> -->
                </div>
				<a class="forgetPW" v-html="$t('login.forgetPW')"></a>
			</div>
			<a class="login-block" @click="login">{{$t('login.login')}}</a>

			<div class="other-sdk">
                <p>{{$t('sidebar.third')}}</p>
					<img src="~assets/img/wap/fblogo.png"  @click="fbLogin"/>
					<img src="~assets/img/wap/glogo.png" @click="gLogin" />
			</div>

		</div>
		<div v-show="loginError" class="error-window">
			<p class="text-tip">
				<h2 class="suc-flag">登录失败</h2>
			</p>
			<a class="repeat-btn" @click="retry">{{$t('recharge.retry')}}</a>
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
			navbar
		},
		data() {
			return {
				errorWin: false, //错误弹窗
				checkedFile: true,
                switchPwd: false,
                showSwitch:true,//按钮
				username: '',
				pwd: '',
				isSucAccount: false,
				isErrorAccount: false,
				isSucPwd: false,
				isErrorPwd: false,
                loginError: false, //登录状态
			};
		},
		created() {
		},
		mounted(){
			this.fbAsyncInit();
		},
		methods: {
			checkChange() {
				this.checkedFile = !this.checkedFile;
			},
			changeSwitch() {
                this.switchPwd = !this.switchPwd;
                this.isSucPwd = false;
                this.isErrorPwd = false;
				if(this.switchPwd) {

				}
			},
			login() {
				let $this = this;
				let password = md5.hex_md5(this.pwd);
				let url = "/api/login/login.json?account=" + this.username + "&password=" + password +"&lang=zh";
				request.get(url, {}).then(function(resolve) {
					if(!resolve.code) {
						//直接跳回首页
						Cookies.set('token',resolve.data.outUserId);
						$this.$store.commit('SET_LOGIN',true);
						$this.$router.push("/");
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
            accountFocus(){
                this.isSucAccount = false;
                this.isErrorAccount = false;
            },
            pwdFocus(){
                
                 this.isErrorPwd = false;
				 this.isSucPwd = false;
            },
            retry(){
                this.loginError = false;
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
					if(!resolve.code) {
						//直接跳回首页
						Cookies.set('token',resolve.data.outUserId);
						$this.$store.commit('SET_LOGIN',true);
						$this.$router.push("/");
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
						if(!resolve.code) {
							console.log(resolve);
							//直接跳回首页
							Cookies.set('token',resolve.outUserId);
							$this.$store.commit('SET_LOGIN',true);
							$this.$router.push("/");
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

@font-face {
    font-family: 'iconfont';
    /* project id 229929 */
    src: url('//at.alicdn.com/t/font_229929_6b906vg0q8s.eot');
    src: url('//at.alicdn.com/t/font_229929_6b906vg0q8s.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_229929_6b906vg0q8s.woff') format('woff'), url('//at.alicdn.com/t/font_229929_6b906vg0q8s.ttf') format('truetype'), url('//at.alicdn.com/t/font_229929_6b906vg0q8s.svg#iconfont') format('svg');
}
.wap_login{
    background: #fff;
    padding:1.99rem 0 6.18rem 0;
    font-size: 0.36rem;


    .ivu-switch {
        outline: none !important;
        position: absolute !important;
        padding-top:0.02rem;
		display: inline-block;
        left: 6.8rem !important;
        top:0.05rem;
		width: 1.18rem;
		height: 0.47rem;
		line-height: 0.47rem;
		border-radius: 0.2rem;
		vertical-align: middle;
		border: 1px solid #ccc;
		background-color: #ccc;
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		transition: all .2s ease-in-out;
	}
	
	.ivu-switch-checked {
		border-color: #F8B62B;
		background-color: #F8B62B;
	}
	
	.ivu-switch-checked .ivu-switch-inner {
		left: 0.05rem;
	}
	
	.ivu-switch-inner {
		color: #fff;
		font-size: 0.26rem;
		position: absolute;
        top: 0px !important;
		display: inline-block;
	}
	
	.ivu-switch:after {
		content: "";
		width: 0.39rem;
		height: 0.39rem;
		border-radius:50%;
		background-color: #fff;
        position: absolute;
		transition: left .2s ease-in-out, width .2s ease-in-out;
	}
	
	.ivu-switch-checked:after {
		left: 0.75rem;
    }
    .cor-ccc {
		color: #ccc;
	}
    
    
    
    .input-wrap{
        width: 8.14rem;
        margin:0 auto 0.27rem;
        padding-bottom: 0.39rem;
        border-bottom: 0.03rem solid #dcdcdc;
        position: relative;

        .iconfont{

            font-family: "iconfont" !important;
            font-size: 0.36rem;
		    font-style: normal;
		    -webkit-font-smoothing: antialiased;
		    -webkit-text-stroke-width: 0.2px;
		    -moz-osx-font-smoothing: grayscale;

        }

        input{
            outline: none !important;
            border: none;
            width: 95%;
            height: 0.6rem;
            text-indent: 0.28rem;
        } 
    }
    .error {
		.error-tip {
            font-size: 0.36rem;
			position: absolute;
			display: inline-block !important;
			color: #fb5454;
            right: 0.1rem;
			top: 0.05rem;
			img {
                // vertical-align: middle;
                width: 0.37rem;
                height: 0.37rem;
                margin-left: 0.3rem;
			}
		}
    }
    .success {
		.success-tip {
			position: absolute;
			display: inline-block !important;
			right: 0.1rem;
            top: 0.1rem;
            
            img {
                // vertical-align: middle;
                width: 0.37rem;
                height: 0.37rem;
                margin-left: 0.3rem;
			}
		}
    }
    
    .input-checkbox {
            position: relative;
            padding: 2.11rem 0 0 0 ;
			input {
				position: relative;
				background: #F8B62B;
				width:0.36rem;
                height: 0.36rem;
                margin-right: 0.26rem;
                outline: none !important;
            }
            .forgetPW{
                position: absolute;
                right: 1rem;
                top:0;
            }
            .content_wrap{
               position: relative;
               margin:0 0 0 4rem;

                img {
                    z-index: 6;
                    position: absolute;
                    top:0.02rem;
                    left: 0;
                    width: 0.35rem;
                    height: 0.3rem;

			    }
            }
    }
    .login-block{
        display:block;
        line-height: 0.79rem;
        font-size: 0.4rem;
        text-align: center;
        width: 6.06rem;
        height: 0.79rem;
        margin: 0.57rem auto 2.48rem;
        color:#fff;
        background-color: #f8b62b;

    }
    .other-sdk{
        color:#666;
        font-size: 0.36rem;
        text-align: center;

        img{
            width: 1.1rem;
            height: 1.1rem;
            margin: 0.44rem;
        }
    }

    .suc-window,
	.error-window {
		position: fixed;
		z-index: 666;
		width: 7.3rem;
		height: 7.36rem;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		.text-tip {
			margin-top: 3.83rem;
		}
	}
	
	.error-window {
        background: url(~assets/img/winerr.png) no-repeat;
        background-size: contain;
		text-align: center;
        line-height: 0.6rem;
        font-size: 0.6rem;
		.repeat-btn {
            font-size: 0.4rem;
			position: relative;
			top: 1rem;
			margin-top: 20px;
			background: #a0a0a0;
			border-radius: 25px;
			padding: 0.24rem 1.55rem;
			color: #fff;
			cursor: pointer;
		}
	}
     
}
.mask{
        background-color: #d2d2d2;;
        opacity: 0.6;
}  
	
</style>