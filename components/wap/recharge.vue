<template>
	<div class="section">
		<div class="banner-list">
			<ul>
				<li :class="activeIndex?'active-li':''" @click="activeIndex=true;rechargeNote=false;">{{$t('recharge.rechargeCenter')}}</li>
				<li :class="!activeIndex?'active-li':''" @click="activeIndex=false;rechargeNote=true;">{{$t('recharge.rechargeHistory')}}</li>
			</ul>
		</div>
		
		<!--遮罩和正确错误弹窗-->
		<div v-show="maskWin" class="mask"></div>
		<div v-show="sucWin" class="suc-window">
			<div class="success_close" @click="sucWin=false;maskWin=false"></div>
			<p class="text-tip">
				<h2 class="suc-flag">{{$t('recharge.rechargeSucceed')}}</h2>
				<p>{{$t('recharge.succeed')}}</p>
			</p>
			<a class="game-btn" @click="sucWin=false;maskWin=false">{{$t('recharge.enter')}}</a>
		</div>
		<div v-show="errorWin" class="error-window">
			<div class="error_close" @click="errorWin=false;maskWin=false"></div>
			<p class="text-tip">
				<h2 class="suc-flag">{{$t('recharge.rechargeFailed')}}</h2>
				<p v-html="$t('recharge.failed')">
					<!-- 请重试或者<br/>
				提供订单号及角色信息给<span>客服</span> -->
				</p>
			</p>
			<a  @click="errorWin=false;maskWin=false;" class="repeat-btn">{{$t('recharge.retry')}}</a>
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
		<!--******************************************************************-->

		<div v-show="!rechargeNote">
			<div class="area-section">
				<label>
				<img src="~assets/img/location.png" />{{$t('recharge.selectRegion')}}：
			</label>
				<div class="ddl collapse driver cover-3">
					<input @click="areaUl=!areaUl" :value="areaValue" readonly type="text" :placeholder="$t('recharge.region')">
					<span v-show="showRed" style="color:crimson;margin-left:5px;font-size:12px">{{$t('recharge.selectRegion')}}</span>
					<ul v-show="areaUl">
						<li @click="getAreaValue(area)" v-for="area in areaList">
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
						<li @click="getGameValue(game)" v-for="game in gameList">
							{{game.gameName}}
						</li>
					</ul>
				</div>
				<div @mouseover="showServer" @mouseout="hideServer" class="ddl cover-2">
					<input type="hidden" id="driverId" name="driverId" value="" />
					<input :value="serverValue" readonly type="text" :placeholder="$t('recharge.selectServer')" @click="showError">
					<ul v-show="serverUl" style="">
						<li @click="getServerValue(server)" v-for="server in serverList">
							{{server.serverName}}
						</li>
					</ul>
				</div>
				<div @mouseover="showRole" @mouseout="hideRole" class="ddl cover-3">
					<input type="hidden" id="driverId" name="driverId" value="" />
					<input :value="roleValue" type="text" :placeholder="$t('recharge.selectCharacter')" readonly @click="showError">
					<ul v-show="roleUl">
						<li @click="getRoleValue(role)" v-for="role in roleList">
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
					<ul style="text-align: left;margin-left: 0.6rem;">
						<li :data-payId="payment.payChannelId" class="l-h-56" @click="getPaymentValue(payment,index)" :class="{'active':index==paymentIndexPrev}" v-for="(payment,index) in paymentList">
							{{payment.name}}
						</li>
					</ul>
				</div>
				<div class="diamond-section">
					<ul>
						<li @click="getProductValue(product,index)" :class="{'active':index==productIndexPrev}" v-for="(product,index) in productList">
							{{product.name}}
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
				<a class="center-btn" href="javascript:;" :class="{disabled:disableSubmit}" @click="addOrder">{{$t('recharge.submit')}}</a>
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
					<ul v-show="renote_areaUl">
						<li @click="renote_getAreaValue(area)" v-for="area in renote_areaList">
							{{area.areaName}}
						</li>
					</ul>
				</div>
			</div>
			<div class="role-box record" >
				<label>
						<img src="~assets/img/role-icon.png" />{{$t('recharge.selectCharacterMes')}}：
					</label>
				<div @mouseover="renote_showGame" @mouseout="renote_hideGame" class="ddl cover-1">
					<input type="hidden" id="driverId" name="driverId" value="" />
					<input :value="renote_gameValue" type="text" :placeholder="$t('recharge.selectGame')" readonly>
					<ul v-show="renote_gameUl">
						<li @click="renote_getGameValue(game)" v-for="game in renote_gameList">
							{{game.gameName}}
						</li>
					</ul>
				</div>
				<div @mouseover="renote_showServer" @mouseout="renote_hideServer" class="ddl cover-2">
					<input type="hidden" id="driverId" name="driverId" value="" />
					<input :value="renote_serverValue" type="text" :placeholder="$t('recharge.selectServer')" readonly>
					<ul v-show="renote_serverUl">
						<li @click="renote_getServerValue(server)" v-for="server in renote_serverList">
							{{server.serverName}}
						</li>
					</ul>
				</div>
				<div @mouseover="renote_showRole" @mouseout="renote_hideRole" class="ddl cover-3">
					<input type="hidden" id="driverId" name="driverId" value="" />
					<input :value="renote_roleValue" type="text" :placeholder="$t('recharge.selectCharacter')" readonly>
					<ul v-show="renote_roleUl">
						<li @click="renote_getRoleValue(role)" v-for="role in renote_roleList">
							{{role.roleName}}
						</li>
					</ul>
				</div>
				<div class="query-record">
					<a @click="getRechargeNote" :class="{disabled:disableQuery}">{{$t('recharge.query')}}</a>
				</div>
			</div>
			<div class="storage-box storage-box-record">
				<table>
					<thead>
						<tr>
							<th>{{$t('recharge.game')}}</th>
							<th>{{$t('recharge.server')}}</th>
							<th>{{$t('recharge.character')}}</th>
							<th>{{$t('recharge.rechargeAmount')}}</th>
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
			<!--分页-->
			<div class="page"  v-show="show">
				<div class="pagelist clearfix">
					<span class="jump subPage" :class="{disabled:pstart}" @click="current_page--">&lt;</span>
					<span v-show="showFirst" class="jump" @click="jumpPage(1)">1</span>
					<span class="ellipsis"  v-show="efont">...</span>
					<span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
					<span class="ellipsis"  v-show="ebehind">...</span>
					<span v-show="showLast" class="jump" @click="jumpPage(pages)">{{pages}}</span>
					<span class="jump" :class="{disabled:pend}"  @click="current_page++">&gt;</span>
				</div>
     		</div>
		</div>
	</div>
</template>

<script>
	import request from "~/service";
	import Cookies from 'js-cookie'
	export default {
		watch:{
			//分页查询
			current_page(curVal,oldVal){
				this.getRechargeNote();
			}
		},
		data() {
			return { //kygoo_sandbox@mol.com abcd1234
				activeIndex: true, //tab标签flag
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
				
				// rechargeNotePackageId: '',
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
						finalLang = nowLang + "-KR";
						break;
				}
				return finalLang;
			},
			showFirst:function(){
				return (this.current_page > 3)&&(this.pages>5) 
			},
			showLast:function(){
				return (this.current_page<this.pages-2)&&(this.pages>5)
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
				if (this.pages <= 5) return false;
				return this.current_page > 3
			},
			ebehind: function() {
				if (this.pages <= 5) return false;
				var nowAy = this.indexs;
				return nowAy[nowAy.length - 1] != this.pages;
			},
			indexs: function() {

				var left = 1,
					right = this.pages,
					ar = [];
				if (this.pages >= 5) {
					if (this.current_page > 3 && this.current_page < this.pages - 2) {
					left = Number(this.current_page) - 1;
					right = Number(this.current_page) + 1;
					} else {
					if (this.current_page <= 3) {
						left = 1;
						right = 5;
					} else {
						right = this.pages;

						left = this.pages - 4;
					}
					}
				}
				while (left <= right) {
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
		mounted(){
			let storageLogin = localStorage.login=='true'?true:false;
			this.$store.commit('SET_LOGIN',storageLogin);
		},
		filters: {
			subStr(value) {
				if(value && value.length > 12) {
					return value.substring(0, 12) + "...";
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

				// this.rechargeNotePackageId = $game.packageId;

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
				this.payCategoryId = $payCategory.payCategoryId; //根据支付类别id去获取支付方式列表
				this.packageId = $payCategory.packageId; //更换packageId

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
					if(resolve.code == 0) {
						$this.areaList = resolve.data;
						$this.renote_areaList = resolve.data;
					}else if(resolve.code == 5){
						localStorage.login = false;
						Cookies.set('token','');
						$this.$router.push('my');
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
			//储值记录确认信息
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
	}
</script>

<style lang="scss" scoped="scoped">
	.active {
		border-top: 3px solid #f8b62b !important;
		border-bottom: 0 !important;
		color: #f8b62b;
	}
	
	.section {
		background: #fff;
	}
	
	.active-li {
		background: #F8B833;
		color: #fcfcfe !important;
	}
	
	.banner-list {
		margin-top: 0.14rem;
		padding-left: 0.86rem;
		ul {
			list-style: none;
			li {
				display: inline-block;
				font-size: 0.38rem;
				color: #010101;
				padding: 0.12rem 0.24rem;
			}
		}
	}
	
	.area-section,.area-box {
		margin-top: 0.94rem;
		padding-bottom: 0.61rem;
		border-bottom: 1px solid #eee;
		label {
			display: inline-block;
			margin-left: 0.32rem;
			margin-right: 0.52rem;
			color: #030000;
			font-size: 0.36rem;
			img {
				vertical-align: middle;
				margin-right: 0.26rem;
			}
		}
	}
	
	.role-box,
	.chose-way-box,
	.storage-box,
	{
		margin-top: 0.94rem;
		padding-bottom: 0.61rem;
		border-bottom: 1px solid #eee;
		label {
			margin-left: 0.32rem;
			margin-right: 0.52rem;
			color: #030000;
			font-size: 0.36rem;
			display: block;
			img {
				height: 0.36rem;
				vertical-align: middle;
				margin-right: 0.26rem;
			}
		}
		.cover-1 {
			margin-left: 0.8rem;
			margin-top: 0.5rem;
		}
	}
	
	.storage-box {
		border-bottom: 0;
		label {
			display: block;
			margin-bottom: 38px;
		}
		table {
			margin: 0.4rem;
			th {
				background: #eeeeee;
				text-align: center;
				font-size: 0.26rem;
				font-weight: 500;
				color: #4c4c4c;
				padding: 0.18rem;
				border: 1px solid #b5b5b5;
			}
			td {
				text-align: center;
				width: 155px;
				height: 41px;
				border: 1px solid #b5b5b5;
				font-size: 12px;
				font-weight: 500;
			}
		}
	}
	
	.storage-box-record{
		th{
			width: 2.25rem !important;
		}
	}
	
	.submit-box, .query-record{
		text-align: center;
		padding-bottom: 0.7rem;
		.center-btn,a {
			background: #f8b62b;
			width: 5.63rem;
			padding: 0.15rem 2.04rem;
			height: 0.72rem;
			line-height: 0.72rem;
			font-size: 0.4rem;
			text-align: center;
			color: #fff;
		}
		.disabled{
			background: #b5b5b5;		
	    }
	}
	
	.query-record{
		margin-top: 1.5rem;
	}
	
	.card-section,
	.self-section {
		ul {
			margin-top: 0.5rem;
			list-style: none;
			text-align: center;
			li {
				width: 2.39rem;
				height: 1.09rem;
				vertical-align: middle;
				text-align: center;
				border: solid 1px #eee;
				display: inline-block;
				font-size: 0.3rem;
				color: #666665;
				padding: 0.17rem 0.44rem;
			}
		}
	}
	
	.diamond-section {
		ul {
			margin-top: 0.5rem;
			list-style: none;
			text-align: center;
			li {
				text-align: left;
				width: 3.2rem;
				height: 1.8rem;
				line-height: 0.5rem;
				vertical-align: middle;
				text-align: center;
				border: solid 1px #eee;
				display: inline-block;
				font-size: 0.3rem;
				color: #666665;
				padding: 0.17rem;
				margin-top: 0.2rem;
			}
		}
	}
	
	.ddl {
		display: inline-block;
		input {
			text-indent: 0.2rem;
			font-size: 0.3rem;
			height: 0.62rem;
			width: 3.06rem;
			color: #f8b62b;
			outline: 0;
			vertical-align: middle;
			appearance: auto !important;
			/*在选择框的最右侧中间显示小箭头图片*/
			background: url("~assets/img/trilow.png") no-repeat scroll right center transparent;
			border: 1px solid #b5b5b5;
			background-position: 2.53rem;
			cursor: pointer;
		}
		ul {
			max-height:2rem;
			overflow:auto;
			z-index: 110;
			position: absolute;
			border: 1px solid #b5b5b5;
			border-top: 0;
			border-bottom: 0;
			li {
				font-size: 0.3rem;
				cursor: pointer;
				width: 3rem;
				background: #fdfcfa;
				color: #9a9998;
				padding: 0.12rem 0.20rem;
				border-bottom: 1px solid #b5b5b5;
				&:hover {
					background: #eeeeee;
				}
			}
		}
	}
	//分页
	.page {
	  width: 100%;
	  text-align: center;
	  margin:0 auto 0.14rem;
	  padding: 0.5rem 0.5rem 1.48rem;
    }

    .pagelist {
      background: #fff;
      display: inline-block;
    }

    .pagelist span {
	  color: #888;
      line-height: 0.68rem;
      width: 0.68rem;
      height: 0.68rem;
      font-size: 0.36rem;
      border: 1px solid #ccc;
      user-select: none;
	  display: inline-block;
    }

	.pagelist .subPage{
		margin-left: 0 !important;
	}

    .pagelist .jump{
      cursor: pointer;
      margin-left: 0.37rem;
    }
    .pagelist .bgprimary {
      cursor: default;
      color: #fff;
      background: #f8b62b;
      border-color: #f8b62b;
    }

    .ellipsis {
      margin-left: 0.37rem;
    }
    .pagelist .jump.disabled{
      pointer-events: none;
      background: #ddd;
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
		width: 7.3rem;
		height: 7.35rem;
		border-radius: 10px;
		z-index: 20;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		font-size: 0.6rem;
		color: #fff;
		text-align: center;
		img {
			animation: myMove 2s linear infinite;
			margin:1.35rem 0;
		}
	}
	
	.suc-window,
	.error-window {
		text-align: center;
		position: fixed;
		z-index: 20;
		// background: url(~assets/img/winsuc.png) no-repeat;
		width: 7.3rem;
		height: 7.35rem;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;

		
		h2{
			margin-top: 3.34rem;
			font-size: 0.6rem;
		}
		p{
			width: 95%;
			font-size: 0.36rem;
			color: #666665;
			line-height: 0.6rem;
			margin: 0.73rem 0;
		}
		span {
			color: #f8b62b;
		}
	}
	.error_close,.success_close{
		position: absolute;
		width: 1.15rem;
		height: 1.15rem;
		left: 3.12rem;
		top: 0.84rem;
	}
	
	.error-window {
		background: url(~assets/img/winerr.png) no-repeat;
		background-size: cover;
		.repeat-btn {
			font-size: 0.4rem;
			background: #a0a0a0;
			border-radius: 25px;
			padding: 0.18rem 1.57rem;
			color: #fff;
			cursor: pointer;
			&:hover {
				text-decoration: none;
			}
		}
	}
	
	.suc-window{
		 background: url(~assets/img/winsuc.png) no-repeat;
		 background-size: cover;
		
		.game-btn {
			font-size: 0.4rem;
			background: #f8b62b;
			border-radius: 25px;
			padding: 0.18rem 1.57rem;
			color: #fff;
			cursor: pointer;
			&:hover {
				text-decoration: none;
			}
		}
	}
	

</style>