<template>
	<view class="must">
		<!-- 订单地址 -->
		<view class="must-address" @click="choiceAddress">
			<text class="must-address-name">{{address.name}} {{address.phone}}</text>
			<text class="must-address-add">{{address.address}}</text>
			<image class="must-address-jiantou" :src="$utils.osspath_url('/xcx-static/must/return_arrow_r_g(1).png')"
				mode=""></image>
		</view>
		<!-- 订单详情 -->
		<view class="must-list">
			<view class="must-list-xq" v-for="item in list" :key="item.id">
				<view class="must-list-bg">
					<image class="must-list-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
				</view>
				<view class="must-guige">
					<text class="must-guige-title">{{$utils.cut_str(item.goodsname,15)}}</text>
					<text class="must-guige-price">{{item.price}}</text>
					<text class="must-guige-box">规格：{{item.shopping_cart_goods_item}}</text>
					<view class="must-guige-add">
						<view class="must-add-input">
							x{{item.num}}
						</view>

					</view>
				</view>
			</view>
			<!-- 订单价格信息 -->
			<view class="message">
				<view class="">
					<text class="message-title">商品总价：</text>
					<text class="message-price">￥{{sum}}</text>
				</view>
				<view class="">
					<text class="message-title  fare">运费：</text>
					<text class="message-price fare">￥0.00</text>
				</view>
				<view class="">
					<text class="message-title  coupon">优惠券：</text>
					<view class="message-price coupon" v-if="coupon_name">无</view>
					<text class="message-price coupon" v-else>{{money1}}</text>
				</view>
				<view class="">
					<text class="message-title  money">余额：</text>
					<text class="message-price money">¥{{balance}}</text>
					<!-- <view class="" > -->
					<text class="circle iconfont icon-ico2" @click="switch2Change" v-show="!use_balance"></text>
					<text class="circle iconfont icon-ico1" @click="switch2Change" v-show="use_balance"></text>
					<!-- </view> -->
				</view>
			</view>

			<text @click="open" class="iconfont icon-youjiantou message-jiantou"></text>
			<uni-popup ref="popup" backgroundColor="#FAFAFA" type="bottom">
				<view class="youhuijuan">
					<text class="you-title">可用优惠券</text>
					<view v-for="item in couponList" :key="item.id">
						<view class="you-left" v-if="item.status==0">
							<text class="l-price">{{item.coupon_type_info.money}}</text>
							<text class="l-man">满{{item.coupon_type_info.full_money}}元可用</text>
							<text
								class="l-date">有效期：{{$utils.date_time(item.coupon_type_info.begin_time)}}~{{$utils.date_time(item.coupon_type_info.end_time)}}</text>
							<text class="l-moth">{{item.coupon_type_info.coupon_name}}</text>
							<text class="l-quan">全场通用劵</text>

							<view class="you-right" @click="check" :data-id="item.id">
								<text v-show="!item.gou" class="iconfont icon-gouxuan checks"></text>
								<text v-show="item.gou" class="iconfont icon-gouxuancopy checked"></text>
							</view>
						</view>	
					</view>
					<view class="">
						<text class="wucou">暂无优惠券</text>
					</view>
					<button class="sure" type="warn" @click="coupon1">确定</button>
				</view>
			</uni-popup>
			<!-- 合计 -->
			<view class="sum zonghe">
				<text class="jiage">合计：</text>
				<text class="jiage sum-price">￥{{price_zhe}}</text>
			</view>
		</view>
		<!-- 底部合计 -->
		<view class="must-bottom heji">
			<text class="must-bottom-price">￥{{price_zhe}}</text>
			<button class="shop-payment shop-payment-active pay" @click="forsubmit" v-if="com==false">立即付款</button>
		</view>
	</view>
</template>

<script>
	import MD5 from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	import config from '../../common/config.js';
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
				use_balance: true, //余额的选中
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
				price_zhe:''
			}
		},
		onLoad: function(e) {

			// 余额
			this.balance = uni.getStorageSync('balance');
			this.use_balance = 0;
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
			var action = 'get_coupon_number_list';
			this.$utils.post(action, data).then(res => {
				console.log('优惠券', res)
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
				this.couponList = res.rs
				this.count = res.count

			})
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
			},

			switch2Change() {
				console.log(11)
				this.use_balance = !this.use_balance
				console.log("余额", this.use_balance);
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
				let money1=this.money1
				let action = "get_fenshu_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:buy_type
				});
				this.$utils.post(action, data).then(res => {
					console.log(res)
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
					//赋值总价 ,只有订单确认页面才会减去money1是优惠券的金额
					this.price_zhe=res.rs.price_zhe-money1

					
			
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
					coupon_number: this.coupon_number,
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
												uni.hideLoading();
												console.log(res)
												uni.showToast({
													title: '支付失败',
													icon: 'none'
												})
												that.commodity = ''
											},
										})
									})
								}
							});
						})
					} else {
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
				this.couponList.forEach(item => {
					this.$set(item, 'gou', "")
				})
				for (var i = 0; i < this.couponList.length; i++) {
					if (e.currentTarget.dataset.id == this.couponList[i].id) {
						this.couponList[i].gou = 1
						this.money = this.couponList[i].coupon_type_info.money
						this.coupon_number = this.couponList[i].coupon_number
					} else {
						this.couponList[i].gou = 0
					}
				}
				console.log(this.couponList)
			}
		}
	}
</script>

<style>
	@import url('../../static/font/iconfont.css');
	@import '@/common/must.css';

	.pay {
		position: absolute;
		left: 408rpx;
		top: -22rpx;
		border-radius: 50rpx;
	}

	.delivery {
		margin-top: 200rpx;
	}

	.pick {
		margin-top: 198rpx;
	}

	.wucou {
		display: flex;
		justify-content: center;
		margin-top: 200rpx;
		color: #999999;
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
	.jiage{
		font-size: 15px;
		font-family: "苹方 中等";
		color: #333333;
	}
</style>
