<template>
	<section class="">
		<div class="pc container">
			<navbar></navbar>
			<div class="content">
				<div class="cont-center">
					<!--<div class="title">
					{{$t('recharge.account')}} : XXXXXXX
				</div>-->
					<ul class="list-theme">
						<li @click="showRecharge" :class="[recharge?'hover':'']" class="b-r-0">
							<img class="m-b-3" src="~assets/img/recharge.png" />
							<span>{{$t('recharge.recharge')}}</span>
						</li>
						<li @click="showRechargeNote" :class="[rechargeNote?'hover':'']">
							<img src="~assets/img/recharge-time.png" />
							<span>{{$t('recharge.rechargeHistory')}}</span>
						</li>
					</ul>
					<div v-show="recharge">
						<div class="area-box">
							<label>
						<img src="~assets/img/location.png" />{{$t('recharge.selectRegion')}}：
					</label>
							<div @mouseover="showArea" @mouseout="hideArea" class="ddl collapse driver cover-3">
								<input type="hidden" id="driverId" name="driverId" value="" />
								<input :value="areaValue" type="text" :placeholder="$t('recharge.region')" :class="{'redBorder':showRed}">
								<span style="color:crimson;margin-left:20px;" v-show="showRed">{{$t('recharge.selectRegion')}}</span>
								<ul v-show="areaUl">
									<li @click="getAreaValue(area)" v-for="area in areaList" :key="area.areaId">
										{{area.areaName}}
									</li>
								</ul>
							</div>
						</div>
						<div class="role-box">
							<label>
						<img src="~assets/img/role-icon.png" />{{$t('recharge.selectCharacterMes')}}：
					</label>
							<div @mouseover="showGame" @mouseout="hideGame" class="ddl cover-1">
								<input type="hidden" id="driverId" name="driverId" value="" />
								<input :value="gameValue" type="text" :placeholder="$t('recharge.selectGame')" readonly @click="showError">
								<ul v-show="gameUl">
									<li @click="getGameValue(game)" v-for="game in gameList" :key="game.appId">
										{{game.gameName}}
									</li>
								</ul>
							</div>
							<div @mouseover="showServer" @mouseout="hideServer" class="ddl cover-2">
								<input type="hidden" readonly id="driverId" name="driverId" value="" />
								<input :value="serverValue" readonly type="text" :placeholder="$t('recharge.selectServer')" @click="showError">
								<ul v-show="serverUl">
									<li @click="getServerValue(server)" v-for="server in serverList" :key="server.serverId">
										{{server.serverName}}
									</li>
								</ul>
							</div>
							<div @mouseover="showRole" @mouseout="hideRole" class="ddl cover-3">
								<input type="hidden" id="driverId" name="driverId" value="" />
								<input :value="roleValue" type="text" :placeholder="$t('recharge.selectCharacter')" readonly @click="showError">
								<ul v-show="roleUl">
									<li @click="getRoleValue(role)" v-for="role in roleList" :key="role.roleId">
										{{role.roleName}}
									</li>
								</ul>
							</div>
						</div>
						<div class="chose-way-box">
							<label>
						<img src="~assets/img/moneykou.png" />{{$t('recharge.selectPaymentAndAmount')}}
					</label>
							<div class="card-section">
								<ul>
									<li @click="getPayCategoryValue(payCategory,index)" :class="{'active':index==payCategoryIndexPrev,'l-h-56': lineHeight}" v-for="(payCategory,index) in payCategoryList">
										{{payCategory.name}}
									</li>
								</ul>
							</div>
							<div class="self-section">
								<ul>
									<li :data-payId="payment.payChannelId" class="l-h-56" @click="getPaymentValue(payment,index)" :class="{'active':index==paymentIndexPrev}" v-for="(payment,index) in paymentList">
										{{payment.name}}
									</li>
								</ul>
							</div>
							<div class="diamond-section">
								<ul>
									<li @click="getProductValue(product,index)" :class="{'active':index==productIndexPrev}" v-for="(product,index) in productList" :title="product.name">
										{{product.name | subStr}}
									</li>
								</ul>
							</div>
						</div>
						<div class="storage-box">
							<label>
						<img src="~assets/img/storage.png" />{{$t('recharge.confirm')}}
					</label>
							<table>
								<thead>
									<tr>
										<!--<th>{{$t('recharge.account')}}</th>-->
										<th>{{$t('recharge.game')}}</th>
										<th>{{$t('recharge.server')}}</th>
										<th>{{$t('recharge.character')}}</th>
										<th>{{$t('recharge.rechargeAmount')}}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<!--<td>yeqian</td>-->
										<td>{{gameValue}}</td>
										<td>{{serverValue}}</td>
										<td>{{roleValue}}</td>
										<td>{{nowAmount}}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div class="submit-box">
							<a class="center-btn" :class="{disabled:disableSubmit}" href="javascript:;" @click="addOrder">{{$t('recharge.submit')}}</a>
						</div>
					</div>
					<!--储值记录页面-->
					<div v-show="rechargeNote">
						<div class="area-box">
							<label>
						<img src="~assets/img/location.png" />{{$t('recharge.selectRegion')}}：
					</label>
							<div @mouseover="renote_showArea" @mouseout="renote_hideArea" class="ddl collapse driver cover-3">
								<input type="hidden" readonly id="driverId" name="driverId" value="" />
								<input :value="renote_areaValue" readonly type="text" :placeholder="$t('recharge.region')">
								<span style="color:crimson;margin-left:20px;" v-show="showRed">{{$t('recharge.selectRegion')}}</span>
								<ul v-show="renote_areaUl">
									<li @click="renote_getAreaValue(area)" v-for="area in renote_areaList" :key="area.areaId">
										{{area.areaName}}
									</li>
								</ul>
							</div>
						</div>
						<div class="role-box record" style="height: 251px;">
							<label>
						<img src="~assets/img/role-icon.png" />{{$t('recharge.selectCharacterMes')}}：
					</label>
							<div @mouseover="renote_showGame" @mouseout="renote_hideGame" class="ddl cover-1">
								<input type="hidden" id="driverId" name="driverId" value="" />
								<input :value="renote_gameValue" type="text" :placeholder="$t('recharge.selectGame')" readonly >
								<ul v-show="renote_gameUl">
									<li @click="renote_getGameValue(game)" v-for="game in renote_gameList" :key="game.appId">
										{{game.gameName}}
									</li>
								</ul>
							</div>
							<div @mouseover="renote_showServer" @mouseout="renote_hideServer" class="ddl cover-2">
								<input type="hidden" id="driverId" name="driverId" value="" />
								<input :value="renote_serverValue" type="text" :placeholder="$t('recharge.selectServer')" readonly >
								<ul v-show="renote_serverUl">
									<li @click="renote_getServerValue(server)" v-for="server in renote_serverList" :key="server.serverId">
										{{server.serverName}}
									</li>
								</ul>
							</div>
							<div @mouseover="renote_showRole" @mouseout="renote_hideRole" class="ddl cover-3">
								<input type="hidden" id="driverId" name="driverId" value="" />
								<input :value="renote_roleValue" type="text" :placeholder="$t('recharge.selectCharacter')" readonly>
								<ul v-show="renote_roleUl">
									<li @click="renote_getRoleValue(role)" v-for="role in renote_roleList" :key="role.roleId">
										{{role.roleName}}
									</li>
								</ul>
							</div>
							<div class="query-record">
								<a @click="getRechargeNote" :class="{disabled:disableQuery}">{{$t('recharge.query')}}</a>
							</div>
						</div>
						<div class="storage-box">
							<table>
								<thead>
									<tr>
										<th>{{$t('recharge.game')}}</th>
										<th>{{$t('recharge.server')}}</th>
										<th>{{$t('recharge.character')}}</th>
										<th>{{$t('recharge.rechargeAmount')}}</th>
										<!--订单状态-->
										<th>{{$t('recharge.orderStatus')}}</th>
										<th>{{$t('recharge.time')}}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="note in rechargeRecoders">
										<td>{{note.gameName}}</td>
										<td>{{note.serverName}}</td>
										<td>{{note.roleName}}</td>
										<td>{{note.currency}} {{note.amount}}</td>
										<td>{{note.status|orderStatus}}</td>
										<td>{{note.createTime}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- 分页 -->
						<div class="page" v-show="show">
							<div class="pagelist clear">
								<span class="jump subPage" :class="{disabled:pstart}" @click="current_page--" >&lt;</span>
								<span v-show="showFirst" class="jump" @click="jumpPage(1)">1</span>
								<span class="ellipsis" v-show="efont">...</span>
								<span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
								<span class="ellipsis" v-show="ebehind">...</span>
								<span v-show="showLast" class="jump" @click="jumpPage(pages)">{{pages}}</span>
								<span class="jump" :class="{disabled:pend}" @click="current_page++">&gt;</span>
							</div>
						</div>
					</div>
				</div>

				<div v-show="maskWin" class="mask"></div>
				<div v-show="sucWin" class="suc-window">
					<p class="text-tip">
						<h2 class="suc-flag">{{$t('recharge.rechargeSucceed')}}</h2>
						<p>{{$t('recharge.succeed')}}</p>
					</p>
					<a class="game-btn">{{$t('recharge.enter')}}</a>
				</div>
				<div v-show="errorWin" class="error-window">
					<p class="text-tip">
						<h2 class="suc-flag">{{$t('recharge.rechargeFailed')}}</h2>
						<p v-html="$t('recharge.failed')">
							<!-- 请重试或者<br/>
						提供订单号及角色信息给<span>客服</span> -->
						</p>
					</p>
					<a @click="errorWin=false;maskWin=false;" class="repeat-btn">{{$t('recharge.retry')}}</a>
				</div>
				<div v-show="loadingWin" class="loading-window">
					<p class="text-tip">
						<img src="../../assets/img/loading.png" />
						<p>
							<!--储值中-->
							{{$t('recharge.rechargeIng')}}
						</p>
					</p>
				</div>
			</div>
			<!-- 充值界面iframe-->
			<div v-if="iframeShow" class="full-screen">
				<div class="header-close">
					<a @click="closeIframe" class="iconfont icon-htmal5icon21"></a>
				</div>
				<iframe style="margin-top: 48px;overflow: hidden;" :src="bluePayIframe" border="0" height="100%" width="100%"></iframe>
			</div>
		</div>
	</section>
</template>

<script>
	import request from "~/service";
	import navbar from '~/components/navbar.vue'
	import Cookies from 'js-cookie'
	export default {
		middleware: 'authenticated',
		components: {
			navbar,
		},
		watch: {
			//分页查询
			current_page(curVal, oldVal) {
				this.getRechargeNote();
			}
		},
		mounted() {
			let storageLogin = localStorage.login=='true'?true:false;
			this.$store.commit('SET_LOGIN',storageLogin);
			//刷新页面不会执行中间件，只能在做判断
			if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (this.$router.options.base.indexOf('/wap') < 0)) {
				this.$router.push('/wap/recharge');
			}
		},
		data() {
			return { //kygoo_sandbox@mol.com abcd1234

				lineHeight: true, //判断字符串长度是否大于25个
				userId: -1, //当前用户
				maskWin: false, //遮罩
				loadingWin: false,
				errorWin: false, //错误弹窗
				sucWin: false, //正确弹窗
				recharge: true,
				rechargeNote: false,
				areaUl: false,
				areaValue: this.$t('recharge.region'),
				areaList: '',
				areaId: '', //用户选择的地区id
				gameUl: false,
				gameValue: this.$t('recharge.selectGame'),
				gameList: '',
				appId: '', //用户选择的游戏id
				packageId: '', //该游戏的支付方式
				serverUl: false,
				serverValue: this.$t('recharge.selectServer'),
				serverList: '',
				serverId: '', //用户选择的服务器id
				roleUl: false,
				roleValue: this.$t('recharge.selectCharacter'),
				roleList: '',
				roleId: '', //用户选择的角色id
				payCategoryList: '', //支付类别列表
				payCategoryId: '', //用户选择的支付类别的id
				payCategoryIndexPrev: -1, //选中的支付类别下标
				paymentList: '', //支付方式列表
				paymentId: '', //用户选择的支付方式id
				paymentIndexPrev: -1, //选中的支付方式下标
				productList: '', //商品列表
				productId: '', //用户选择的商品id
				productIndexPrev: -1, //选中的商品
				nowAmount: '', //当前选中的商品的金额
				showRed: false, //地区红框

				rechargeRecoders: [], //储值页的储值记录

				bluePayIframe: '', //ifram充值URL
				iframeShow: false,
				payChannelId: 0, //支付方式payChannelId=100:mycard  200:mol  300:mycard

				current_page: 1, //当前页
				pages:0, //总页数


				orderCreate:this.$t('recharge.orderCreate'),
				orderFail:this.$t('recharge.orderFail'),
				orderCompleted:this.$t('recharge.orderCompleted'),


				//*******************储值记录页面的input框数据***********************************************
				renote_areaUl: false,
				renote_areaValue: this.$t('recharge.region'),
				renote_areaList: '',
				renote_areaId: '', //用户选择的地区id
				renote_gameUl: false,
				renote_gameValue: this.$t('recharge.selectGame'),
				renote_gameList: '',
				renote_appId: '', //用户选择的游戏id
				renote_packageId:'',//用户选完游戏后的packageId
				renote_serverUl: false,
				renote_serverValue: this.$t('recharge.selectServer'),
				renote_serverList: '',
				renote_serverId: '', //用户选择的服务器id
				renote_roleUl: false,
				renote_roleValue: this.$t('recharge.selectCharacter'),
				renote_roleList: '',
				renote_roleId: '', //用户选择的角色id
			};
		},
		computed: {
			lang() {
				//返回当前语言
				let nowLang = this.$store.state.locale;
				let finalLang;
				switch(nowLang) {
					case "zh":
						finalLang = nowLang + "-CN";
						break;
					case "en":
						finalLang = nowLang + "-US";
						break;
					case "kr":
						finalLang = "ko-KR";
						break;
				}
				return finalLang;
			},
			showFirst: function() {
				return(this.current_page > 3) && (this.pages > 5)
			},
			showLast: function() {
				return(this.current_page < this.pages - 2) && (this.pages > 5)
			},
			show:function(){
             	return this.pages > 0;
         	},
			pstart: function() {
				return this.current_page == 1;
			},
			pend: function() {
				return this.current_page == this.pages;
			},
			efont: function() {
				if(this.pages <= 5) return false;
				return this.current_page > 3
			},
			ebehind: function() {
				if(this.pages <= 5) return false;
				var nowAy = this.indexs;
				return nowAy[nowAy.length - 1] != this.pages;
			},
			indexs: function() {

				var left = 1,
					right = this.pages,
					ar = [];
				if(this.pages >= 5) {
					if(this.current_page > 3 && this.current_page < this.pages - 2) {
						left = Number(this.current_page) - 1;
						right = Number(this.current_page) + 1;
					} else {
						if(this.current_page <= 3) {
							left = 1;
							right = 5;
						} else {
							right = this.pages;

							left = this.pages - 4;
						}
					}
				}
				while(left <= right) {
					ar.push(left);
					left++;
				}
				return ar;
			},
			disableSubmit(){
				if(!this.areaId || !this.appId || !this.serverId || !this.roleId || !this.packageId || !this.productId || !this.roleValue || !this.serverValue || !this.userId || !this.nowAmount)
					return true;
				return false;
			},
			disableQuery(){
				if(!this.renote_areaId || !this.renote_appId || !this.renote_serverId || !this.renote_roleId || !this.renote_packageId)
					return true;
				return false;
			}
		},
		created() {
			//请选择地区
			this.getAreaList();

		},
		filters: {
			subStr(value) {
				if(value && value.length > 32) {
					return value.substring(0, 32) + "...";
				} else {
					return value || "";
				}
			},
			orderStatus(order) {
				if(order == 1) {
					return "Success";
				} else {
					return "Fail";
				}
			}
		},
		methods: {
			//分页
			jumpPage: function(id) {
				this.current_page = id;
			},
			// submitForm(){
			// 	console.log(this.areaId+"-"+this.areaValue+" "+this.appId+"-"+this.gameValue+" "+this.serverId+"-"+this.serverValue+" "+this.roleId+"-"+this.roleValue)
			// },
			/*重置选择框的选项*/
			refreshAreaValue() {
				this.areaValue = this.$t('recharge.region');
				this.areaId = '';
				this.areaList = '';
			},
			refreshGameValue() {
				this.gameValue = this.$t('recharge.selectGame');
				this.appId = '';
				this.gameList = '';
			},
			refreshServerValue() {
				this.serverValue = this.$t('recharge.selectServer');
				this.serverId = '';
				this.serverList = '';
			},
			refreshRoleValue() {
				this.roleValue = this.$t('recharge.selectCharacter');
				this.roleId = '';
				this.roleList = '';
			},
			refreshPayCategory() {
				this.payCategoryList = '';
				this.payCategoryId = '';
				this.payCategoryIndexPrev = -1;
			},
			refreshPayment() {
				this.paymentList = '';
				this.paymentId = '';
				this.paymentIndexPrev = -1;
			},
			refreshProduct() {
				this.productList = '';
				this.productId = '';
				this.productIndexPrev = -1;
				this.nowAmount = '';
			},

			//储值记录页的部分
			renote_refreshAreaValue() {
				this.renote_areaValue = this.$t('recharge.region');
				this.renote_areaId = '';
				this.renote_areaList = '';
			},
			renote_refreshGameValue() {
				this.renote_gameValue = this.$t('recharge.selectGame');
				this.renote_appId = '';
				this.renote_gameList = '';
			},
			renote_refreshServerValue() {
				this.renote_serverValue = this.$t('recharge.selectServer');
				this.renote_serverId = '';
				this.renote_serverList = '';
			},
			renote_refreshRoleValue() {
				this.renote_roleValue = this.$t('recharge.selectCharacter');
				this.renote_roleId = '';
				this.renote_roleList = '';
			},


			showArea() {
				this.areaUl = true;
			},
			hideArea() {
				this.areaUl = false;
			},
			renote_showArea() {
				this.renote_areaUl = true;
			},
			renote_hideArea() {
				this.renote_areaUl = false;
			},
			getAreaValue($area) {
				//input 重新赋值
				this.areaValue = $area.areaName;
				this.areaId = $area.areaId;

				//下拉框消失
				this.areaUl = false;
				//红框消失
				this.showRed = false;

				//选择地区后请求游戏
				//先重置选项
				this.refreshGameValue();
				this.refreshServerValue();
				this.refreshRoleValue();
				this.refreshPayCategory();
				this.refreshPayment();
				this.refreshProduct();
				//请求游戏列表
				this.getGameList();
			},
			renote_getAreaValue($area) {
				//input 重新赋值
				this.renote_areaValue = $area.areaName;
				this.renote_areaId = $area.areaId;

				//下拉框消失
				this.renote_areaUl = false;

				//选择地区后请求游戏
				//先重置选项
				this.renote_refreshGameValue();
				this.renote_refreshServerValue();
				this.renote_refreshRoleValue();
				//请求游戏列表
				this.renote_getGameList();
			},
			showGame() {
				this.gameUl = true;
			},
			hideGame() {
				this.gameUl = false;
			},
			renote_showGame() {
				this.renote_gameUl = true;
			},
			renote_hideGame() {
				this.renote_gameUl = false;
			},
			getGameValue($game) {
				//input 重新赋值
				this.gameValue = $game.gameName;
				this.appId = $game.appId;
				this.packageId = $game.packageId;

				//下拉框消失
				this.gameUl = false;

				//选择地区/游戏后请求服务区
				//先重置选项
				this.refreshServerValue();
				this.refreshRoleValue();
				this.refreshPayCategory();
				this.refreshPayment();
				this.refreshProduct();
				//请求服务器列表
				this.getServerList();

			},
			renote_getGameValue($game) {
				//input 重新赋值
				this.renote_gameValue = $game.gameName;
				this.renote_appId = $game.appId;
				this.renote_packageId = $game.packageId;//后端必要的参数，虽然对于查询记录没有什么用
				//下拉框消失
				this.renote_gameUl = false;

				// this.rechargeNotePackageId = $game.packageId;

				//选择地区/游戏后请求服务区
				//先重置选项
				this.renote_refreshServerValue();
				this.renote_refreshRoleValue();

				//请求服务器列表
				this.renote_getServerList();

			},
			showServer() {
				this.serverUl = true;
			},
			hideServer() {
				this.serverUl = false;
			},
			renote_showServer() {
				this.renote_serverUl = true;
			},
			renote_hideServer() {
				this.renote_serverUl = false;
			},
			getServerValue($server) {
				//input 重新赋值
				this.serverValue = $server.serverName;
				this.serverId = $server.serverId;
				//下拉框消失
				this.serverUl = false;

				//选择地区/游戏/服务器后请求角色
				//先重置选项
				this.refreshRoleValue();
				this.refreshPayCategory();
				this.refreshPayment();
				this.refreshProduct();
				//请求角色列表
				this.getRoleList();

			},
			renote_getServerValue($server) {
				//input 重新赋值
				this.renote_serverValue = $server.serverName;
				this.renote_serverId = $server.serverId;
				//下拉框消失
				this.renote_serverUl = false;

				//选择地区/游戏/服务器后请求角色
				//先重置选项
				this.renote_refreshRoleValue();
				//请求角色列表
				this.renote_getRoleList();

			},
			showRole() {
				this.roleUl = true;
			},
			hideRole() {
				this.roleUl = false;
			},
			renote_showRole() {
				this.renote_roleUl = true;
			},
			renote_hideRole() {
				this.renote_roleUl = false;
			},
			getRoleValue($role) {
				//input 重新赋值
				this.roleValue = $role.roleName;
				this.roleId = $role.roleId;
				// console.log("重新选择了角色"+this.roleId);
				//下拉框消失
				this.roleUl = false;

				//先重置选项
				this.refreshPayCategory();
				this.refreshPayment();
				this.refreshProduct();
				//请求支付渠道
				this.getPayCategoryList();
			},
			renote_getRoleValue($role) {
				//input 重新赋值
				this.renote_roleValue = $role.roleName;
				this.renote_roleId = $role.roleId;
				// console.log("重新选择了角色"+this.roleId);
				//下拉框消失
				this.renote_roleUl = false;
				//查询前重置当前页为1
				this.current_page = 1;
			},
			showRecharge() {
				this.recharge = true;
				this.rechargeNote = false;
				//去除同级元素的hover状态
			},
			showRechargeNote() {
				this.recharge = false;
				this.rechargeNote = true;
			},
			getPayCategoryValue($payCategory, $index) {
				this.payCategoryIndexPrev = $index; //点击时添加样式
				this.packageId = $payCategory.packageId; //更换packageId
				this.payCategoryId = $payCategory.payCategoryId; //根据支付类别id去获取支付方式列表

				//先重置选项
				this.refreshPayment();
				this.refreshProduct();
				//请求支付方式列表
				this.getPaymentList();
			},
			getPaymentValue($payment, $index) {
				this.paymentIndexPrev = $index; //点击时添加样式
				this.paymentId = $payment.paymentId; //根据支付方式id去获取商品
				this.packageId = $payment.packageId; //更换packageId
 
				//payChannelId支付方式判断
				this.payChannelId = $payment.payChannelId;
				//先重置选项
				this.refreshProduct();

				//请求商品列表
				this.getProductList();
			},
			getProductValue($product, $index) {
				this.productIndexPrev = $index;
				this.productId = $product.productId;

				this.nowAmount = $product.currency + '' + $product.amount; //币种+金额

				//生成储值订单
				//this.getRechargeOrder();
			},
			/*----------------- 数据交互----------------*/
			/*获取地区列表*/
			getAreaList() {
				let $this = this;
				let url = '/api/recharge/queryAreaList.json?lang=' + this.lang;
				request.get(url, {}).then(function(resolve) {
					console.log(resolve);
					if(resolve.code == 0) {
						$this.areaList = resolve.data;
						$this.renote_areaList = resolve.data;
					}else if(resolve.code == 5){
						localStorage.login = false;
						Cookies.set('token','');
						$this.$router.push('login');
					}
				}, function(reject) {

				})
			},
			/*请选择角色信息*/
			/*获取游戏列表*/
			getGameList() {
				let $this = this;
				let url = '/api/recharge/queryGameList.json?lang=' + this.lang + '&areaId=' + this.areaId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.gameList = resolve.data;
					}
				}, function(reject) {

				})
			},
			/*获取服务器列表*/
			getServerList() {
				let $this = this;
				let url = '/api/recharge/queryServerList.json?lang=' + this.lang + '&appId=' + this.appId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.serverList = resolve.data;
					}
				}, function(reject) {

				})
			},
			/*获取角色列表*/
			getRoleList() {
				let $this = this;
				let url = '/api/recharge/queryRole.json?lang=' + this.lang + '&appId=' + this.appId + '&serverId=' + this.serverId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.roleList = resolve.data;
					}
				}, function(reject) {

				})
			},


			//****************************以下是储值记录页面***********************************
			/*获取游戏列表*/
			renote_getGameList() {
				let $this = this;
				let url = '/api/recharge/queryGameList.json?lang=' + this.lang + '&areaId=' + this.renote_areaId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.renote_gameList = resolve.data;
					}
				}, function(reject) {

				})
			},
			/*获取服务器列表*/
			renote_getServerList() {
				let $this = this;
				let url = '/api/recharge/queryServerList.json?lang=' + this.lang + '&appId=' + this.renote_appId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.renote_serverList = resolve.data;
					}
				}, function(reject) {

				})
			},
			/*获取角色列表*/
			renote_getRoleList() {
				let $this = this;
				let url = '/api/recharge/queryRole.json?lang=' + this.lang + '&appId=' + this.renote_appId + '&serverId=' + this.renote_serverId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.renote_roleList = resolve.data;
					}
				}, function(reject) {

				})
			},
			//*****************************以上是储值记录页面************************************* */


			/*请选择储值渠道和金额*/
			/*获取支付类别*/
			getPayCategoryList() {
				let $this = this;
				let url = '/api/recharge/queryPayCategoryList.json?lang=' + this.lang + '&appId=' + this.appId + '&packageId=' + this.packageId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.payCategoryList = resolve.data;
						// $this.payCategoryList = [{'name':'点卡','packageId':1,'payCategoryId':1},{'name':'点卡2','packageId':2,'payCategoryId':2},{'name':'点卡3','packageId':3,'payCategoryId':3},{'name':'点卡4','packageId':4,'payCategoryId':4},{'name':'点卡5','packageId':5,'payCategoryId':5},]
					}
				}, function(reject) {

				})
			},
			/*获取支付方式列表*/
			getPaymentList() {
				let $this = this;
				let url = '/api/recharge/queryPaymentList.json?lang=' + this.lang + '&appId=' + this.appId + '&packageId=' + this.packageId + '&categoryId=' + this.payCategoryId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.paymentList = resolve.data;
						// $this.paymentList = [{'name':'支付方式1','paymentId':1},{'name':'支付方式2','paymentId':2},{'name':'支付方式3','paymentId':3},]
					}
				}, function(reject) {

				})
			},
			/*获取商品列表*/
			getProductList() {
				let $this = this;
				let url = '/api/recharge/queryProductList.json?lang=' + this.lang + '&appId=' + this.appId + '&packageId=' + this.packageId + '&paymentId=' + this.paymentId;
				request.get(url, {}).then(function(resolve) {
					// console.log(url);
					if(resolve.code == 0) {
						$this.productList = resolve.data;
						// $this.productList = [{'name':'商品1'},{'name':'商品2'},];
					}
				}, function(reject) {

				})
			},

			/*确认提交*/
			addOrder() {
				let $this = this;
				let url = '/api/recharge/addOrder.json?lang=' + this.lang;
				if(this.checkOrder()) {
					this.maskWin = true;
					this.loadingWin = true;
					//先确认用户选择了足够的信息
					let data = {
						'areaId': this.areaId,
						"appId": this.appId,
						"packageId": this.packageId,
						"productId": this.productId,
						"roleId": this.roleId,
						"roleName": this.roleValue,
						"serverId": this.serverId,
						"serverName": this.serverValue,
						"userId": this.userId,
						"lang": this.lang
					}
					request.commonPOST(url, data).then(function(resolve) {
						if(resolve && !resolve.code) {
							let resUrl = resolve.redirectUrl;
							//通过payChannelId 判断支付方式
							if($this.payChannelId == 300) {
								$this.bluePayIframe = resUrl;
								$this.iframeShow = true;
								//利用jq操作顶层html对象
								$("html").scrollTop(0);
								$("html").css('overflow', 'hidden');
							} else {
								window.location.href = resUrl;
							}

							$this.maskWin = false;
							$this.loadingWin = false;
						}else{
							$this.maskWin = true;
							$this.loadingWin = false;
							$this.errorWin = true;
						}
					}, function(reject) {

					})
				} else {
					// alert("lack of message");
					return false;

				}
			},

			/*确认信息*/
			checkOrder() {
				if(!this.areaId || !this.appId || !this.serverId || !this.roleId || !this.packageId || !this.productId || !this.roleValue || !this.serverValue || !this.userId || !this.nowAmount) {
					// this.disableSubmit = true;
					return false;
				}
				// this.disableSubmit = false;
				return true;
			},
			showError() {
				//先选择地区再选择角色信息
				if(!this.areaId) {
					this.showRed = true;
				} else {
					this.showRed = false;
				}
			},

			/*查询储值记录*/
			getRechargeNote() {
				let $this = this;
				let url = '/api/recharge/qcr.json?lang=' + this.lang;
				let data = {
					"areaId": this.renote_areaId,
					"appId": this.renote_appId,
					"packageId": this.renote_packageId,
					"pageIndex": this.current_page - 1,
					"roleId": this.renote_roleId
				}

				if(this.checkRecord()) {
					request.commonPOST(url, data).then(function(resolve) {
						if(!resolve.code) {
							$this.rechargeRecoders = resolve.items;
							let result = (resolve.totalCount/resolve.pageSize);
							if(Number.isInteger(result)){
								$this.pages = result;
							}else{
								$this.pages = Math.ceil(result);
							}
							$this.current_page = resolve.pageIndex + 1;
						}
					}, function(reject) {

					})
				} else {
					// alert("Missing input");
					return false;
				}

			},
			checkRecord() {
				if(!this.renote_areaId || !this.renote_appId || !this.renote_serverId || !this.renote_roleId || !this.renote_packageId) {
					return false;
				}
				return true;
			},
			//修改页面page
			// changePage(page) {
			// 	this.pageIndex = page;
			// 	this.getRechargeNote(page);
			// },
			//关闭iframe
			closeIframe() {
				this.iframeShow = false;
				$("html").css('overflow', 'auto');
			},
		}
	};
</script>
<style lang="scss" scoped>
	.l-h-56 {
		line-height: 36px;
	}
	
	.redBorder {
		border: 1px solid crimson !important;
	}
	
	.b-r-0 {
		border-right: 0px !important;
	}
	
	.m-b-3 {
		margin-bottom: 3px;
	}
	
	.hover {
		border-top: 3px solid #f8b62b !important;
	}
	
	.active {
		border-top: 3px solid #f8b62b !important;
		border-bottom: 0 !important;
		color: #f8b62b;
	}
	
	.container {
		margin-bottom: 96px;
	}
	
	@keyframes myMove {
		0% {
			transform: rotate(-360deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
	
	.mask {
		position: fixed;
		z-index: 10;
		background: #e4e4e4;
		top: 0;
		width: 100%;
		opacity: 0.6;
		height: 100%;
		left: 0;
	}
	
	.loading-window {
		position: fixed;
		background: #666666;
		width: 200px;
		height: 200px;
		border-radius: 10px;
		z-index: 20;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		font-size: 24px;
		color: #fff;
		img {
			animation: myMove 2s linear infinite;
			margin-top: 55px;
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
	
	.game-btn {
		position: relative;
		top: 56px;
		margin-top: 20px;
		background: #f8b62b;
		border-radius: 25px;
		padding: 13px 80px;
		color: #fff;
		cursor: pointer;
		&:hover {
			text-decoration: none;
		}
	}
	
	.content {
		text-align: center;
		margin-top: 96px;
		.cont-center {
			background: #fff;
			margin: auto;
			width: 1200px;
		}
		.title {
			font-size: 30px;
			color: #333333;
			padding-bottom: 99px;
			padding-top: 58px;
		}
		.list-theme {
			list-style: none;
			border-bottom: 1px solid #dcdcdc;
			overflow: hidden;
			li {
				float: left;
				cursor: pointer;
				text-align: center;
				padding: 26px 0;
				font-size: 16px;
				width: 300px;
				border: 1px solid #dcdcdc;
				border-bottom: 0;
				&:hover {
					border-top: 4px solid #f8b62b;
				}
				img {
					vertical-align: middle;
					margin-right: 10px;
				}
			}
		}
		.area-box,
		.role-box,
		.chose-way-box,
		.storage-box {
			position: relative;
			padding: 59px 32px;
			font-size: 16px;
			text-align: left;
			border-bottom: 1px solid #dcdcdc;
		}
		.role-box {
			input {
				width: 224px;
				background-position: 195px;
				&:hover {
					background-position: 195px;
				}
			}
			.cover-2 {
				left: 503px !important;
			}
			.cover-3 {
				left: 726px !important;
			}
			ul {
				li {
					width: 222px !important;
				}
			}
		}
		.chose-way-box {
			label {
				display: block;
			}
			ul {
				margin: 38px 0 0;
				li {
					display: inline-block;
					border: 1px solid #7a7a7a;
					width: 154px;
					padding: 11px 10px;
					vertical-align: middle;
					text-align: center;
					cursor: pointer;
					height: 56px;
					&:hover {
						color: #f8b62b;
						border-bottom: 0;
						border-top: 3px solid #f8b62b;
					}
				}
			}
			.diamond-section {
				li {
					width: 224px;
					line-height: 18px;
					margin-bottom: 38px;
				}
			}
		}
		.storage-box {
			border-bottom: 0;
			label {
				display: block;
				margin-bottom: 38px;
			}
			table {
				margin-left: 44px;
				th {
					background: #eeeeee;
					text-align: center;
					font-size: 16px;
					font-weight: 500;
					color: #4c4c4c;
					width: 155px;
					height: 41px;
					border: 1px solid #b5b5b5;
				}
				td {
					text-align: center;
					width: 155px;
					height: 41px;
					border: 1px solid #b5b5b5;
					font-size: 14px;
					font-weight: 500;
				}
			}
		}
		.submit-box {
			margin-top: 108px;
			padding-bottom: 190px;
			.center-btn {
				background: #f8b62b;
				width: 350px;
				padding: 13px 139px;
				height: 45px;
				line-height: 45px;
				font-size: 18px;
				text-align: center;
				color: #fff;
				&:hover {
					text-decoration: none;
				}
			}

			.disabled{
				background: #b5b5b5;
				cursor: default;
			}
		}
	}
	
	label {
		display: inline-block;
		color: #030000;
		margin-right: 79px;
		img {
			vertical-align: middle;
			margin-right: 23px;
		}
	}
	
	.ddl {
		position: absolute;
		bottom: 45px;
		left: 280px;
		input {
			height: 45px;
			width: 174px;
			color: #f8b62b;
			appearance: auto !important;
			/*在选择框的最右侧中间显示小箭头图片*/
			background: url("~assets/img/trilow.png") no-repeat scroll right center transparent;
			border: 1px solid #b5b5b5;
			background-position: 147px;
			cursor: pointer;
			padding-left: 20px;
			&:hover {
				background: #f8b62b;
				color: #fff;
				background-image: url("~assets/img/trilowhover.png");
				background-repeat: no-repeat;
				background-position: 147px;
			}
		}
		ul {
			max-height: 300px;
			overflow: auto;
			z-index: 110;
			position: absolute;
			border: 1px solid #b5b5b5;
			border-top: 0;
			border-bottom: 0;
			li {
				cursor: pointer;
				width: 172px;
				background: #fdfcfa;
				color: #9a9998;
				padding: 12px 20px;
				border-bottom: 1px solid #b5b5b5;
				&:hover {
					background: #eeeeee;
				}
			}
		}
	}
	
	select {
		/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
		position: relative;
		text-align: center;
		padding-left: 25px;
		color: #f8b62b;
		/*很关键：将默认的select选择框样式清除*/
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		/*在选择框的最右侧中间显示小箭头图片*/
		background: url("~assets/img/trilow.png") no-repeat scroll right center transparent;
		/*为下拉小箭头留出一点位置，避免被文字覆盖*/
		padding-right: 14px;
	}
	
	select:hover {
		background: #f8b62b;
		color: #fff;
		background-image: url("~assets/img/trilowhover.png");
		background-repeat: no-repeat;
		background-position: 153px;
	}
	
	select:focus {
		outline: none;
	}
	/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
	
	select::-ms-expand {
		display: none;
	}
	
	:-webkit-input-placeholder {
		color: red;
		font-size: 20px;
		line-height: 50px;
	}
	
	.full-screen {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1231;
		top: 0;
		left: 0;
		transition: all 0.5s;
		.header-close {
			position: absolute;
			top: 0;
			left: 0;
			background: #eee;
			height: 50px;
			width: 100%;
			a {
				position: absolute;
				top: 15px;
				right: 50px;
				cursor: pointer;
				font-size: 20px;
			}
		}
		iframe {
			html {
				overflow: hidden;
			}
		}
	}
	
	.record {
		.ddl {
			bottom: 102px;
		}
	}
	
	.page-component {
		text-align: right;
		margin-top: 50px;
	}
	
	.query-record {
		text-align: center;
		position: absolute;
		margin: auto;
		bottom: 20px;
		left: 0;
		right: 0;
		a {
			cursor: pointer;
			background: #f8b62b;
			width: 350px;
			padding: 13px 139px;
			height: 45px;
			line-height: 45px;
			font-size: 18px;
			text-align: center;
			color: #fff;
			&:hover {
				text-decoration: none;
			}
		}
		.disabled{
			background: #b5b5b5;
			cursor: default;
		}
	}
	
	.ivu-page-item-active {
		border-color: #f8b62b !important;
	}
	
	.ivu-page-item-active a,
	.ivu-page-item-active:hover a {
		color: #f8b62b !important;
	}
	
	//分页的样式
	.page {
		width: 100%;
		text-align: center;
		margin: 20px auto;
		padding: 20px 280px 108px;
	}
	
	.pagelist {
		background: #fff;
		// height: 42px;
		// line-height: 42px;
		display: inline-block;
		// text-align: center;
	}
	
	.pagelist span {
		color: #888;
		display: inline-block;
		width: 42px;
		height: 42px;
		line-height: 42px;
		font-size: 18px;
		border: 1px solid #ccc;
		user-select: none;
	}

	.pagelist .subPage{
		margin-left: 0 !important;
	}
	
	.pagelist .jump {
		cursor: pointer;
		margin-left: 25px;
	}
	
	.pagelist .bgprimary {
		cursor: default;
		color: #fff;
		background: #f8b62b;
		border-color: #f8b62b;
	}
	
	.ellipsis {
		margin-left: 25px;
	}
	
	.pagelist .jump.disabled {
		pointer-events: none;
		background: #ddd;
	}
</style>