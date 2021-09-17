<template>
	<view class="must">
		<!-- 订单详情 -->
		<view class="must-list">
			<view class="must-list-xq" v-for="item in list" :key="item.id">
				<view class="must-list-bg">
					<image class="must-list-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
				</view>
				<view class="must-guige">
					<view class="guige-1">
						<text class="must-guige-title">{{$utils.cut_str(item.goodsname,15)}}</text>
						<text class="must-guige-price">{{item.price}}</text>
					</view>
					<view class="guige-2">
						<text class="must-guige-box">规格：{{item.shopping_cart_goods_item}}</text>
						<view class="must-guige-right">x{{item.num}}</view>
					</view>
				</view>
			</view>
			
			
			<!-- <view class="fenshus fens">
				共{{fenshu}}份
			</view> -->
			
			<!-- 订单价格信息 -->
			<view class="message">
				<view class="">
					<text class="message-title zongjia">商品总价：</text>
					<text class="message-price">￥{{new_price_yuanshi}}</text>
				</view>
				<view class="">
					<text class="message-title">运费：</text>
					<text class="message-price">￥{{new_freight}}</text>
				</view>
				<view class="">
					<text class="message-title">优惠券：</text>
					<view class="message-price yhj" v-if="new_price_coupon">
						<text style="color: #EC1815;" @click="open">{{new_price_coupon ? new_price_coupon : '无可用'}}</text>
						<text @click="open" v-if="new_price_coupon" class="iconfont icon-youjiantou message-jiantou1"></text>
					</view>
					<view class="message-price" v-else>无可用</view>
				</view> 
				
				<view class="">
					<text class="message-title">余额：</text>
					<text class="message-price">¥{{new_balance}}</text>
					<text class="circle cir iconfont icon-ico2" @click="switch2Change" v-if="new_balance != ''" v-show="use_balance==0"></text>
					<text class="circle cir iconfont icon-ico1" @click="switch2Change" v-if="new_balance != ''" v-show="use_balance==1"></text>
				</view>
			</view>
		
			
			<uni-popup ref="popup" :animation="false" :maskClick="true" type="bottom">
				<view class="new-youhuijuan">
					<text class="new-you-title">可用优惠券</text>
					<scroll-view scroll-y="true" class="new-scroll-y">
						<view class="juan-wrap" v-for="item in cartCouponList" :key="item.id" v-if="cartCouponList.length > 0" @click="check" :data-id="item.id">
							<view class="juan-list">
								<view class="juan-list-left">
									<text class='z-circle z-circle-top'></text>
									<text class='z-circle z-circle-bottom'></text>
									<view class="z-box">
										<view class="juan-list-left-top">
											<text class="z-price-logo">￥</text>
											<text class="z-price">{{item.money}}</text>
											<view class="z-man uni-ellipsis" style="width: 160rpx;">满{{item.full_money}}元可用</view>
										</view>
										<view class="juan-list-left-center">
											<view class="z-moth uni-ellipsis">{{item.coupon_name}}</view>
											<view class="z-quan" style="margin-top: 26rpx;">{{"("+item.type_info+")"}}</view>
										</view>
									</view>
									<view class="juan-list-left-bottom">有效期：{{item.begin_time}}~{{item.end_time}}</view>
								</view>
								<view class="juan-list-right">
									<text v-show="!item.gou" class="iconfont icon-gouxuan checks"></text>
									<text v-show="item.gou" class="iconfont icon-gouxuancopy checked"></text>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="wucou" style="text-align: center;" v-if="cartCouponList.length == 0">
						<!-- <text class="wucou">暂无优惠券</text> -->
						<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" mode="widthFix" style="width: 50%"></image>
					</view>
				<button class="sure-btn" type="warn" @click="coupon1">确定</button> 
				</view>
			</uni-popup>
			
			<!-- 合计 -->
			<view class="hj">
				<text class="jiage">合计：</text>
				<text class="jiage sum-price">￥{{use_balance == 0 ? new_price_zhe : '0.00'}}</text>
			</view>
		</view>
		
		<!-- 底部合计 -->
		<view class="must-bottom heji">
			<text style="color: #EB1615; font-size: 30rpx;">￥</text>
			<text class="must-bottom-price">{{use_balance == 0 ? new_price_zhe : '0.00'}}</text>
			<view class="pay clearfix">
				<button class="shop-payment shop-payment-active " @click="forsubmit" v-if="com==false">立即付款</button>
			</view>
		</view>
	</view>
</template>

<script>
	import MD5 from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	import config from '../../common/config.js';
	export default{
		data(){
			return{
				sum:0,
				count:0,
				money:0,
				money1:0,
				com:'',
				coupon_id: '',
				coupon_number: '',
				coupon_name: '',
				coupon_money: '',
				showa: '',
				use_balance: 0,//余额的选中
				balance:'',
				showa: 1,
				openid:'',
				sta:1,
				delivery_mode: '快递',
				delivery_mode_arr: ["快递", "同城", "自提"],
				coupon_numbers:0,
				coupon_number1:0,
				fenshu:1,
				wanfa:'',
				price_zhe:'',
				list:[
					 
					],
					gou:true,
					couponList:[],
				cartPriceData: '',
				cartCouponList: [],
				new_price_yuanshi: '',
				new_price_zhe: '',
				new_price_coupon: '',
				new_coupon_number: '',
				new_balance: '',
				new_freight: ''
			}
		},
		onLoad:function(e) {

			//获取份数
			this.fenshu=e.fenshu
			//获取玩法
			this.wanfa=e.wanfa
			
			// 余额s
			this.use_balance = 0;
			this.use_zj_balance = 1;
			this.openid = uni.getStorageSync('openid');
			this.id = uni.getStorageSync('id');
			
			//流水单号
			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
				'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
			];
			
			var nums = "";
			
			for (var i = 0; i < 32; i++) {
				
				var id = parseInt(Math.random() * 61);
			
				nums += chars[id];
			
			}
			
			this.nums = nums;
			
			//商品展示
			let type=e.type
			this.type=type
				let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
				
				var action = 'get_buy_shopping_cart';				  	  
				 this.$utils.post(action,data).then(res=>{
					 console.log('商品信息',res)
					 let icon="success"
					 if (res.sta !=1) {
					 	icon = "none";
					 	uni.showToast({
					 		icon: icon,
					 		title: res.msg,
					 		duration: 2000
					 	});
					 	return
					 }
					 this.list = res.rs.goodslist
					 this.sum=res.rs.price_zhe
					 uni.setStorageSync('price_zhe', res.rs.price_zhe);
					 uni.setStorageSync('type', type);
				 })
			
			// var action='get_coupon_number_list';
			// this.$utils.post(action,data).then(res=>{
			// 	console.log('优惠券',res)
			// 	let icon="success"
			// 	if (res.sta !=1) {
			// 		icon = "none";
			// 		uni.showToast({
			// 			icon: icon,
			// 			title: res.msg,
			// 			duration: 2000
			// 		});
			// 		return
			// 	}
			// 	this.couponList=res.rs
			// 	this.count=res.count
			// })
			// 是否有优惠券
			if (e.coupon_number) {
				this.coupon_number = e.coupon_number;
				this.coupon_name = '-¥' + e.coupon_name;
			}
		},
		onShow: function(e) {
			this.coupon_id = uni.getStorageSync('coupon_id');
			this.coupon_keynum = uni.getStorageSync('coupon_keynum');
			this.coupon_money = uni.getStorageSync('coupon_money');
			this.coupon_number = uni.getStorageSync('coupon_number');
			
			//计算总价
			this.caltotalmoney()
		},
		methods:{
			open(){
				 this.$refs.popup.open('bottom')
			},
			// 余额选中
			 switch2Change(){
				console.log("余额选中")
			 	this.use_balance=!this.use_balance
				console.log("余额", this.use_balance);
			 },
			// 选择优惠券
			coupon1: function(e) {
				this.money1=this.money
				this.coupon_number1=this.coupon_number
				this.$refs.popup.close()
				 //计算结算金额
				this.caltotalmoney()
			},
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				let memberid = uni.getStorageSync('id')
				let buy_type=this.type
				//如果show=1是拼手气红包，如果show=2是直接送礼
				if(this.show==1 ||  this.show==0){
					fenshu=1;
				}
				//玩法等于1是直接送礼,直接送礼有多份概念，其他没有
				if(this.wanfa!='1'){
					fenshu=1
				}
			// 	let money1=this.money1
			// 	let action = "get_fenshu_price";
			// 	let data = JSON.stringify({
			// 		memberid: memberid,
			// 		fenshu:fenshu,
			// 		buy_type:buy_type
			// 	});
			// 	this.$utils.post(action, data).then(res => {
			// 		console.log(res)
			// 		let icon = "success"
			// 		if (res.sta != 1) {
			// 			icon = "none";
			// 			uni.showToast({
			// 				icon: icon,
			// 				title: res.msg,
			// 				duration: 2000
			// 			});
			// 		return 
			// 		}
			// 		//赋值总价 ,只有订单确认页面才会减去money1是优惠券的金额
			// 		this.price_zhe=parseFloat(res.rs.price_zhe)-money1
			// 		this.balance = res.rs.balance;
			
			// 	})	
			
				let action = "get_shopping_cart_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:buy_type,
					coupon_number: this.new_coupon_number
				});
				let controller = "coupon";
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						this.cartPriceData = res.rs;
						this.cartCouponList = res.rs.coupon_list;
						this.new_price_yuanshi= res.rs.price_yuanshi;
						this.new_price_zhe= res.rs.price_zhe;
						this.new_price_coupon= res.rs.price_coupon;
						this.new_coupon_number= res.rs.coupon_number;
						this.new_balance= res.rs.balance;
						this.new_freight = res.rs.freight;
					}
				})
				
			},
			//立即付款
			forsubmit: function(e){
				console.log("立即付款")
				let type=uni.getStorageSync("type")
				this.type=type
				var that = this;
					if (this.sta == 0) {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
					}
					// 优惠券
					let coupon_number = this.coupon_number1;
					let data = JSON.stringify({
						memberid: this.memberid,
						wanfa: this.wanfa,
						coupon_number: this.new_coupon_number,
						use_balance: this.use_balance,
						use_zj_balance: this.use_zj_balance,
						fenshu:this.fenshu,
						buy_type:type
						
					});
					console.log(data)
					var action = 'create_cardbag';
					this.$utils.post(action, data).then(res => {
						console.log("付款");
						console.log(res);
						if (res.pay_status == 1) {
							uni.showToast({
								title: "支付成功"
							})
							this.cardbag_number=res.cardbag_number
							let cardbag_number=res.cardbag_number
							uni.redirectTo({
								url:'../shopping/succes?cardbag_number='+this.cardbag_number
							})
							uni.setStorageSync('coupon', '');
							uni.setStorageSync('coupon_keynum', '');
							uni.setStorageSync('coupon_number',  '');
							uni.setStorageSync('coupon_money', '');
						}else if (res.pay_status == 0) {
							// 获取流水单号
							let action = 'get_cardbag_pay_info';
							let data = JSON.stringify({
								cardbag_number: res.cardbag_number 
							});
							let cardbag_number=res.cardbag_number
							uni.setStorageSync("cardbag_number",res.cardbag_number)
							this.$utils.post(action, data).then(res => {
								console.log("获取流水号", res);
								let serial_number = res.rs.serial_number;
								// 获取ip
								uni.request({
									url: 'https://zhijianlw.com/api.php/index/getip',
									success: (res) => {
										console.log(res.data);
										let action = 'add_paylog_to_wx';
										let data = JSON.stringify({
											serial_number: serial_number,
											ip: res.data.ip,
											openid: this.openid,
											type: 'cardbag',
										});
										this.$utils.post(action, data).then(res => {
											console.log('获取参数', res)
											var serial_number = res.rs.serial_number;
											let arr = [];
											
											const date = {
												// 合作方标识
												appId: 'appId=wx9c53a99b078435f5',
												timeStamp: 'timeStamp=' + this.timeStamp,
												nonceStr: 'nonceStr=' + this.nums,
												package: 'package=prepay_id=' + res.rs.prepay_id,
												signType: 'signType=MD5',
											}
											
											console.log('拼接前', date)
											
											for (let i in date) {
												arr.push(date[i])
											}
											
											arr.sort();
											
											let stringA = '';
											
											// 拼接字符串
											for (let i in arr) {
												if (i == arr.length - 1) {
													stringA += arr[i];
												} else {
													stringA += arr[i] + '&';
												}
											}
											// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
											let stringSignTemp = stringA + '&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv';
											
											console.log('拼接后', stringSignTemp)
											let sign = MD5.hexMD5(stringSignTemp);
											console.log(sign)
											
											
											uni.hideLoading();
											
											uni.requestPayment({
												timeStamp: String(this.timeStamp),
												nonceStr: this.nums,
												package: 'prepay_id=' + res.rs.prepay_id,
												signType: 'MD5',
												paySign: sign.toUpperCase(),
												success(res) {
												uni.showToast({
													title: '支付成功',
													icon: 'none'
												})	
												uni.redirectTo({
													url:'../shopping/succes?cardbag_number='+cardbag_number 
												})	
												return 	
													
													
													
													
													
													uni.hideLoading();
													uni.request({
														url: 'https://zhijianlw.com/api.php/index/set_agent_cardbag',
														data: {
															serial_number: that.outTradeNo
														},
														header: {
															'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
														},
														method: 'GET',
														// 成功回调
														success: (res) => {
															console.log('微信成功回调', res)
															uni.showToast({
																title: '支付成功',
																icon: 'none'
															})
															uni.setStorageSync('coupon', '');
															uni.setStorageSync('coupon_keynum', '');
															uni.setStorageSync('coupon_number',  '');
															uni.setStorageSync('coupon_money', '');
															uni.redirectTo({
																url:'../shopping/succes?cardbag_number='+this.cardbag_number
															})
														},
													})
												},
												fail:(res) =>{
													let cardbag_number=uni.getStorageSync("cardbag_number")
													this.cardbag_number=cardbag_number
													uni.hideLoading();
													console.log(res)
													uni.showToast({
														title: '支付失败',
														icon: 'none'
													})
													uni.navigateTo({
														url:'../orderDetails/orderDetails?cardbag_number='+this.cardbag_number
													})
													that.commodity = ''
												},
											})
										})
									}
								});
							})
							}else {
							uni.showToast({
								icon: "none",	
								title: res.msg?res.msg:"支付错误"
							})
						}
					})
			},
			check: function(e) {
				this.cartCouponList.forEach(item => {
					this.$set(item, 'gou', "")
				})
				for (var i = 0; i < this.cartCouponList.length; i++) {
					if (e.currentTarget.dataset.id == this.cartCouponList[i].id) {
						this.cartCouponList[i].gou = 1
						this.money = this.cartCouponList[i].money
						this.coupon_number = this.cartCouponList[i].coupon_number
						this.new_coupon_number = this.cartCouponList[i].coupon_number
					} else {
						this.cartCouponList[i].gou = 0
					}
				}
				console.log(this.cartCouponList)
			}
		}
	}
</script>

<style>
	@import url('../../static/font/iconfont.css');
	@import '@/common/must.css';
	
	.must{
		padding-bottom: 120rpx;
	}
	.must-address {
		height: auto;
		padding: 40rpx 100rpx 30rpx 56rpx;
		background-color: #fff;
		margin-top: 20rpx;
		position: relative;
	}
	
	.must-address .icon {
		font-size: 32rpx;
		color: #333;
		position: absolute;
		right: 32rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.must-address-name {
		position: static;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
		line-height: 1.8em;
		margin-bottom: 10rpx;
	}
	
	.must-address-add {
		position: static;
		font-size: 26rpx;
		color: #666;
		line-height: 1.8em;
	}
	.fenshus{
		width: 100%;
		background-color: #fff;
		height: 100rpx;
		line-height: 100rpx;
		text-align: right;
		padding: 0 38rpx;
		margin-bottom: 20rpx;
	}
	
	.circle{
		position: static;
		margin-left: 10rpx;
	}
	.icon-ico2{
		color: #999
	}
	.message-jiantou1{
		display: inline-block;
		color: #999;
		margin: 0 0 0 6rx;
		font-size: 28rpx;
	}
	.hj{
		padding: 32rpx 38rpx 32rpx 64rpx;
		text-align: right;
	}
	.hj .sum-price{
		margin-right: 0;
	}
	
	.heji{
		position: fixed;
		bottom: 0;
		display: flex;
		padding: 12rpx 35rpx;
		bottom: 0!important;
		align-items: center;
		height: auto!important;
	}
	.pay {
	/* 	position: absolute;
		left: 408rpx;
		top: -22rpx; */
		text-align: right;
		flex: 1;
		width: 60%;
		display: inline-block;
	}
	.pay button{
		height: 80rpx;
		float: right;
		line-height: 80rpx;
		border-radius: 40rpx;
		width: 278rpx;
		text-align: center;
		margin: 0;
	}
	.must-bottom-price{
		font-size: 44rpx;
		position: static;
	}
	
	
	
	.bot{
		position: fixed;
		bottom: 10rpx;
	}
.button{
	width: 260rpx;
	border-radius: 50rpx;
	position: relative;
	right: -200rpx;
	top: 15rpx;
}
.wucou {
		display: flex;
		justify-content: center;
		margin-top: 200rpx;
		color: #999999;
	}
.must-guige-title{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.must-guige-price{
	margin-top: 0rpx;
}
.fare1{
	margin-top: 69rpx;
}
.coupon{
	margin-top: 135rpx;
	margin-right: 4rpx;
}
.coupon1{
	margin-top: 136rpx;
}
.money{
	margin-top: 200rpx;
	margin-right: 8rpx;
}
.money1{
	margin-top: 200rpx;
}
.cir{
	margin-top: 0rpx;
}
.fenshus{
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: right;
	padding: 0 38rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
}
.heji{
	font-size: 15px;
	font-family: "苹方 中等";
	color: #333333;
}

.new-youhuijuan{
		display: flex;
		flex-direction: column;
		height: 640rpx;
		/* padding-bottom: 20rpx; */
		background: #FAFAFA;
		border-radius: 10rpx 10rpx 0px 0px;
		position: relative;
	}
	.new-you-title {
	    color: #333333;
	    font-size: 15px;
	    font-weight: bold;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    margin-top: 30rpx;
		margin-bottom: 40rpx;
	}
	.new-scroll-y{
		height: 400rpx;
	}
	.sure-btn{
			    width: 660rpx;
			    border-radius: 50px;
			    height: 80rpx;
			    position: absolute;
			    bottom: 0rpx;
			    margin: 0rpx 45rpx;
			/* position: absolute; */
			/* bottom: 20rpx; */
			/* left: 130rpx; */
		}
		.juan-wrap{
				padding: 0rpx 26rpx;
				box-sizing: border-box;
			}
			.juan-list{
				box-shadow: 0px 0px 4px 0px rgba(231, 231, 231, 0.5);
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				border-radius: 20rpx;
				background-color: #fff;
			}
			.juan-list-left{
				text-align: left;
				border-right: 1rpx dotted #FFCAC3;
				position: relative;
				flex:1;
				padding: 20rpx 20rpx 20rpx 32rpx;
			}
			.juan-list-left .z-circle{
				position: absolute;
				display: inline-block;
				border-radius: 50%;
				width: 40rpx;
				background-color: #FAFAFA;
				height: 40rpx;
			}
			.z-box{
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;
			}
			.juan-list-left .z-circle-top{
				top: -20rpx;
				right: -20rpx;
			}
			.juan-list-left .z-circle-bottom{
				bottom: -20rpx;
				right: -20rpx;
			}
			.juan-list-left .juan-list-left-top{
				padding-right: 40rpx;
			}
			.juan-list-left .juan-list-left-top .z-price-logo{
				color: #FB503D;
				font-size: 28rpx;
				vertical-align: bottom;
				display: inline-block;
				margin-bottom: 6rpx;
			}
			.juan-list-left .juan-list-left-top .z-price{
				color: #FB503D;
				font-size: 50rpx;
				vertical-align: bottom;
				display: inline-block;
				font-weight: bold;
			}
			.juan-list-left .juan-list-left-top .z-man,.juan-list-left .juan-list-left-center .z-quan{
				color: #666;
				font-size: 28rpx;
				margin-top: 14rpx;
			}
			.juan-list-left .juan-list-left-center .z-moth{
				color: #333;
				font-size: 36rpx;
				font-weight: bold;
				width: 270rpx;
			}
			.juan-list-left .juan-list-left-center{
				color: #666;
				font-size: 28rpx;
				vertical-align: bottom;
				text-align: left;
				flex: 1;
			}
			.juan-list-left .juan-list-left-bottom{
				font-size: 24rpx;
				color: #999;
				text-align: left;
			}
			.juan-list-right{
				text-align: center;
				height: 100%;
				width: 212rpx;
				box-sizing: border-box;
				padding-right: 0rpx;
			}
			.juan-list-right .checks, .juan-list-right .checked{
				position: static;
				margin: 0;
			}
</style>
