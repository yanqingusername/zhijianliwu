<template>
	<view class="must">
		<!-- 订单地址 -->
		<view class="must-address" @click="choiceAddress">
			<block v-if="address.id != ''">
				<view class="must-address-name">{{address.name}} {{address.phone}}</view>
				<view class="must-address-add">{{address.address}}</view>
				<text class="icon icon-z-right"></text>
			</block>
			<block v-else>
				<view class="text">选择地址</view>
				<text class="icon icon-z-right"></text>
			</block>
		</view>
		
		<!-- 订单详情 -->
		<view class="must-list">
			<view class="must-list-xq" v-for="item in list" :key="item.id">
				<view class="must-list-bg">
					<image class="must-list-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
				</view>
				<view class="must-guige">
					<view class="guige-1">
						<text class="must-guige-title uni-ellipsis">{{$utils.cut_str(item.goodsname,15)}}</text>
						<text class="must-guige-price">{{item.price}}</text>
					</view>
					<view class="guige-2">
						<text class="must-guige-box">规格：{{item.shopping_cart_goods_item}}</text>
						<view class="must-guige-right">x{{item.num}}</view>
					</view>
				</view>
			</view>
		<!-- 	<view class="fenshus fens">共1份</view> -->
			
			<!-- 订单价格信息 -->
			<view class="message">
				<view class="">
					<text class="message-title">商品总价：</text>
					<text class="message-price" style="margin-right: 0rpx;">￥{{new_price_yuanshi}}</text>
				</view>
				<view class="">
					<text class="message-title">运费：</text>
					<text class="message-price" style="margin-right: 0rpx;">￥{{new_freight}}</text>
				</view>
				<!-- <view class="">
					<text class="message-title">优惠券：</text>
					<view class="message-price" v-if="coupon_name">无</view>
					<view class="message-price yhj" v-else @click="open">
						<text style="color: #EC1815;">{{money1}}</text>
						<text class="iconfont icon-youjiantou message-jiantou1"></text>
					</view>
				</view> -->
				
				<view class="">
					<text class="message-title">优惠券：</text>
					<view class="message-price yhj" v-if="new_price_coupon">
						<text style="color: #EC1815;" @click="open">{{new_price_coupon ? new_price_coupon : '无可用'}}</text>
						<text @click="open" v-if="new_price_coupon" class="iconfont icon-youjiantou message-jiantou1" style="font-size: 32rpx;margin-left: 10rpx;margin-top: -6rpx;margin-right: -8rpx;"></text>
					</view>
					<view class="message-price yhj" v-else>
						<text style="color: #BBBBBB;">{{'无可用'}}</text>
						<text class="iconfont icon-youjiantou message-jiantou1" style="font-size: 32rpx;margin-left: 10rpx;margin-top: -6rpx;margin-right: -8rpx;"></text>
					</view>
					<!-- <view class="message-price" v-else>无可用</view> -->
				</view> 
				
				<view class="">
					<text class="message-title">余额：</text>
					
					<!-- <view class="" > -->
					<!-- <text class="circle iconfont icon-ico2" @click="switch2Change" v-show="!use_balance"></text>
					<text class="circle iconfont icon-ico1" @click="switch2Change" v-show="use_balance"></text> -->
					
					<!-- <text class="circle iconfont icon-ico2" @click="switch2Change" v-if="new_balance != '' && use_balance==0" style="width: 32rpx;height: 32rpx;display: flex;align-items: center;"></text>
					<text class="circle iconfont icon-ico1" @click="switch2Change" v-if="new_balance != '' && use_balance==1" style="width: 32rpx;height: 32rpx;display: flex;align-items: center;"></text> -->
					<view class="message-price yhj" @click="switch2Change" style="display: flex;align-items: center;justify-content: center;">
						<text class="message-price">¥{{new_balance}}</text>
						<image class="picker-view-img" v-if="new_balance_price != '' && use_balance==0" style="margin-left: 10rpx;width: 32rpx;height: 32rpx;display: flex;align-items: center;" src="../../static/icon_reason_m.png"></image>
						<image class="picker-view-img" v-if="new_balance_price != '' && use_balance==1" style="margin-left: 10rpx;width: 32rpx;height: 32rpx;display: flex;align-items: center;" src="../../static/icon_reason_d.png"></image>
					</view>
					<!-- </view> -->
				</view>
			</view>

			<uni-popup ref="popup" :animation="false" :maskClick="true" type="bottom" background-color="#fff">
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
											<view class="z-man uni-ellipsis" style="width: 160rpx;font-size: 20rpx;">满{{item.full_money}}元可用</view>
										</view>
										<view class="juan-list-left-center" style="margin-top: 16rpx;">
											<view class="z-moth uni-ellipsis" style="font-size: 28rpx;">{{item.coupon_name}}</view>
											<view class="z-quan" style="margin-top: 20rpx;font-size: 20rpx;">{{"("+item.type_info+")"}}</view>
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
				<text class="jiage sum-price">￥{{new_price_zhe || '0.00'}}</text>
			</view>
		</view>
		<!-- 底部合计 -->
		<view class="must-bottom heji">
			<text style="color: #EB1615; font-size: 30rpx;">￥</text>
			<text class="must-bottom-price">{{new_price_zhe || '0.00'}}</text>
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
	import sr from 'sr-sdk-wxapp';
	export default {
		data() {
			return {
				status: '',
				sum: 0,
				money: 0,
				money1: 0,
				address: {},
				com: '',
				coupon_id: '',
				coupon_number: '',
				coupon_name: '',
				coupon_money: '',
				showa: '',
				use_balance: 1, //余额的选中
				balance: 0,
				showa: 1,
				openid: '',
				sta: 1,
				delivery_mode: '快递',
				delivery_mode_arr: ["快递", "同城", "自提"],
				coupon_numbers: 0,
				coupon_number1: 0,
				list: [],
				gou: true,
				couponList: [],
				buy_type:'',
				price_zhe:'',
				cartPriceData: '',
				cartCouponList: [],
				new_price_yuanshi: '',
				new_price_zhe: '',
				new_price_coupon: '',
				new_coupon_number: '',
				new_balance: '0.00',
				new_balance_price: '',
				new_freight: ''
			}
		},
		onLoad: function(e) {

			// 余额
			this.balance = uni.getStorageSync('balance');
			this.use_balance = 1;
			this.use_zj_balance = 1;
			this.openid = uni.getStorageSync('openid');
			this.id = uni.getStorageSync('id');

			//流水单号
			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
				'e', 'f', 'g',
				'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
			];

			var nums = "";

			for (var i = 0; i < 32; i++) {
				0.


				var id = parseInt(Math.random() * 61);

				nums += chars[id];

			}

			this.nums = nums;

			//商品展示
			let type = e.type
			this.buy_type=type
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';

			var action = 'get_buy_shopping_cart';
			this.$utils.post(action, data).then(res => {
				console.log('商品信息', res)
				let icon = "success"
				if (res.sta != 1) {
					icon = "none";
					uni.showToast({
						icon: icon,
						title: res.msg,
						duration: 2000
					});
					return
				}
				this.list = res.rs.goodslist
				this.sum = res.rs.price_zhe
			})
			// var action = 'get_coupon_number_list';
			// this.$utils.post(action, data).then(res => {
			// 	console.log('优惠券', res)
			// 	let icon = "success"
			// 	if (res.sta != 1) {
			// 		icon = "none";
			// 		uni.showToast({
			// 			icon: icon,
			// 			title: res.msg,
			// 			duration: 2000
			// 		});
			// 		return
			// 	}
			// 	this.couponList = res.rs
			// 	this.count = res.count

			// })
			// 是否有优惠券
			if (e.coupon_number) {
				this.coupon_number = e.coupon_number;
				this.coupon_name = '-¥' + e.coupon_name;
			}

		},
		onShow: function(e) {
			this.$set(this.address, 'id', uni.getStorageSync('member_area_id'));
			this.$set(this.address, 'name', uni.getStorageSync('member_area_linkman'));
			this.$set(this.address, 'phone', uni.getStorageSync('member_area_linktel'));
			this.$set(this.address, 'address', uni.getStorageSync('member_area_address'));


			this.coupon_id = uni.getStorageSync('coupon_id');
			this.coupon_keynum = uni.getStorageSync('coupon_keynum');
			this.coupon_money = uni.getStorageSync('coupon_money');
			this.coupon_number = uni.getStorageSync('coupon_number');
			
			//计算总计金额
			this.caltotalmoney()
		},
		methods: {
			choiceAddress: function() {
				uni.navigateTo({
					url: '../Add/Add?cardbag_number=5',
				});
			},
			// 余额选中
			switch2Change() {
				this.use_balance = !this.use_balance
				//计算总价
				this.caltotalmoney()
			},
			// 选择优惠券
			coupon1: function(e) {
				this.money1 = this.money
				this.coupon_number1 = this.coupon_number
				this.$refs.popup.close()
				
				//计算总计金额
				this.caltotalmoney()
				
			},
			
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				let memberid = uni.getStorageSync('id')
				let buy_type=this.buy_type
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
			// 		this.price_zhe=parseFloat(res.rs.price_zhe)- parseFloat(money1)
			
			// 	})
			
				let action = "get_shopping_cart_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:buy_type,
					coupon_number: this.new_coupon_number,
					is_balance: this.use_balance == 0 ? false : true
				});
				let controller = "coupon";
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						this.cartPriceData = res.rs;
						this.cartCouponList = res.rs.coupon_list;
						this.new_price_yuanshi= res.rs.price_yuanshi;
						this.new_price_zhe= res.rs.show_price;
						this.new_price_coupon= res.rs.price_coupon;
						this.new_coupon_number= res.rs.coupon_number;
						this.new_balance= res.rs.balance;
						this.new_balance_price= res.rs.balance;
						this.new_freight = res.rs.freight;
						if(parseInt(res.rs.balance) > 0){
							
						}else{
							this.new_balance_price= '';
						}
					}
				})
				
			},			
			
			
			
			//立即付款
			forsubmit: function(e) {
				console.log("立即付款")
				// console.log(e)
				var that = this;
				if (this.sta == 0) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}
				console.log(this.sta + "1111")
				// 优惠券
				// let coupon_number = "202106071635207977209222";
				let coupon_number = this.coupon_number1;
				let data = JSON.stringify({
					memberid: this.memberid,
					member_area_id: this.address.id,
					delivery_type: this.delivery_mode,
					coupon_number: this.new_coupon_number,
					use_balance: this.use_balance,
					use_zj_balance: this.use_zj_balance,
					buy_type: this.buy_type
				});
				console.log(data)
				var action = 'create_buy_order';
				this.$utils.post(action, data).then(res => {
					
					let  ordernumber=res.ordernumber
					console.log("付款");
					console.log(res);
					if (res.pay_status == 1) {

						// 腾讯有数
						let timestamp=new Date().getTime();
						sr.track('custom_order', {
						    "order": {
						        "order_id": ordernumber,
						        "order_time": timestamp,
						        "order_status": "pay"
						    },
						    "sub_orders": [{
						        "sub_order_id": ordernumber,
						        "order_amt": this.price_zhe,
						        "pay_amt": this.price_zhe
						    }],
						})

						uni.showToast({
							title: "支付成功"
						})
						uni.redirectTo({
							url: '../shopping/payment?ordernumber='+ordernumber
						})
						uni.setStorageSync('coupon', '');
						uni.setStorageSync('coupon_keynum', '');
						uni.setStorageSync('coupon_number', '');
						uni.setStorageSync('coupon_money', '');
					} else if (res.pay_status == 0) {
						// 获取流水单号
						let action = 'get_buy_order_pay_info';
						let data = JSON.stringify({
							ordernumber: res.ordernumber
						});
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
										type: 'buy_order',
									});
									this.$utils.post(action, data).then(res => {
										console.log('获取参数', res)
										var serial_number = res.rs.serial_number;
										let arr = [];

										const date = {
											// 合作方标识
											appId: 'appId=wx9c53a99b078435f5',
											timeStamp: 'timeStamp=' + this
												.timeStamp,
											nonceStr: 'nonceStr=' + this.nums,
											package: 'package=prepay_id=' + res
												.rs.prepay_id,
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
										let stringSignTemp = stringA +
											'&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv';

										console.log('拼接后', stringSignTemp)
										let sign = MD5.hexMD5(stringSignTemp);
										console.log(sign)


										uni.hideLoading();

										uni.requestPayment({
											timeStamp: String(this
												.timeStamp),
											nonceStr: this.nums,
											package: 'prepay_id=' + res.rs
												.prepay_id,
											signType: 'MD5',
											paySign: sign.toUpperCase(),
											success(res) {
												uni.hideLoading();
												uni.request({
													url: 'https://zhijianlw.com/api.php/index/set_agent_cardbag',
													data: {
														serial_number: that
															.outTradeNo
													},
													header: {
														'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
													},
													method: 'GET',
													// 成功回调
													success: (
														res) => {
															// 腾讯有数
															let timestamp=new Date().getTime();
															sr.track('custom_order', {
															    "order": {
															        "order_id": ordernumber,
															        "order_time": timestamp,
															        "order_status": "pay"
															    },
															    "sub_orders": [{
															        "sub_order_id": ordernumber,
															        "order_amt": that.price_zhe,
															        "pay_amt": that.price_zhe
															    }],
															})

															console
																.log(
																	'微信成功回调',
																	res
																	)
															uni.showToast({
																title: '支付成功',
																icon: 'none'
															})
															uni.setStorageSync(
																'coupon',
																''
																);
															uni.setStorageSync(
																'coupon_keynum',
																''
																);
															uni.setStorageSync(
																'coupon_number',
																''
																);
															uni.setStorageSync(
																'coupon_money',
																''
																);
															uni.redirectTo({
																url: '../shopping/payment?ordernumber='+ordernumber
															})
														},
												})
											},
											fail(res) {
												// 腾讯有数
												let timestamp=new Date().getTime();
												sr.track('custom_order', {
												    "order": {
												        "order_id": ordernumber,
												        "order_time": timestamp,
												        "order_status": "cancel_pay"
												    },
												    "sub_orders": [{
												        "sub_order_id": ordernumber,
												        "order_amt": that.price_zhe,
												        "pay_amt": that.price_zhe
												    }],
												})
												
												uni.hideLoading();
												console.log(res)
												uni.showToast({
													title: '支付失败',
													icon: 'none'
												})
												that.commodity = ''
												uni.navigateTo({
														url:'../orderList/orderList?nav=1'
													})
											},
										})
									})
								}
							});
						})
					} else {
						// 腾讯有数
						let timestamp=new Date().getTime();
						sr.track('custom_order', {
						    "order": {
						        "order_id": ordernumber,
						        "order_time": timestamp,
						        "order_status": "cancel_pay"
						    },
						    "sub_orders": [{
						        "sub_order_id": ordernumber,
						        "order_amt": this.price_zhe,
						        "pay_amt": this.price_zhe
						    }],
						})
						
						uni.showToast({
							icon: "none",
							title: res.msg ? res.msg : "支付错误"
						})
					}
				})
			},
			// 微信支付
			wx: function(e) {
				var that = this;
				let cardbag_number = this.cardbag_number;
				// let  cardbag_number = "202009251006539216673724"
				let ip = this.ip;
				let openid = this.openid;
				var data = '{"serial_number":"' + that.outTradeNo + '","ip":"' + ip + '","openid":"' + openid +
					'","type":"cardbag"}';
				var action = 'add_paylog_to_wx';
				console.log(data)
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
								},
							})
							uni.showModal({
								title: '微信支付',
								content: '支付成功',
								cancelText: '查看订单',
								confirmText: '立即赠送',
								success(res) {
									if (res.confirm) {
										console.log('点击立即赠送')
										that.zengsong()
									} else if (res.cancel) {
										console.log('点击查看详情')
										let cardbag_number = that.cardbag_number;
										uni.switchTab({
											url: '../order/order'
										})
									}
								}
							})

						},
						fail(res) {
							uni.hideLoading();
							console.log(res)
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							})
							that.commodity = ''
						}
					})


				})
			},
			//配送方式
			deliveryModeChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.delivery_mode_index = e.target.value
			},
			open() {
				this.$refs.popup.open('bottom')
			},
			pay() {
				uni.navigateTo({
					url: './payment'
				})
			},
			//领取优惠券
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
		padding: 40rpx 100rpx 30rpx 38rpx;
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
	

	.delivery {
		margin-top: 200rpx;
	}

	.pick {
		margin-top: 198rpx;
	}

	.wucou {
		/* display: flex; */
		/* justify-content: center; */
		margin: 60rpx 0;
		/* color: #999999; */
	}
	.heji{
		position: fixed;
		bottom: 10rpx;
		display: flex;
		align-items: center;
	}
	.must-address{
		background-color: #fff;
	}
	.zonghe{
		position: absolute;
		margin-top: 320rpx;
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
	.jiage{
		font-size: 15px;
		font-family: "苹方 中等";
		color: #333333;
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
