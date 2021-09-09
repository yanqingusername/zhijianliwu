<template>
	<view>
		<view class="reception-address-view">
			<view class="reception-address-view-left">
				<view class="reception-address-name">王女士 18801182514</view>
				<view class="reception-address-value">北京市北京市丰台区纪家庙村丰管路天丰大厦238室</view>
			</view>
			<view class="reception-address-view-right" >
				<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
			</view>
		</view>
		
		<view class="reception-address-add">
			<view class="reception-address-left" @click="$buttonClick(chooseAddr)">
				<image src="../../static/reception-address-location.png" class="reception-address-img"></image>
				<view class="reception-address-text">获取微信地址</view>
			</view>
			<view class="reception-address-left" @click="$buttonClick(receptiondetails)">
				<image src="../../static/reception-address-add.png" class="reception-address-img"></image>
				<view class="reception-address-text">手动添加地址</view>
			</view>
		</view>
		
		<!-- v-for="(item,index) in screenPurchase" :key="index -->
		<view class="order-purchase-view">
			<view class="new-order-li">
				<view class="new-order-li-center">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" src="../../static/nono.jpg" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item">
							<view class="new-order-item-title">云南古树茶叶</view>
							<view class="new-order-item-money">¥1080</view>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：礼盒装</view>
							<view class="new-order-item-total">x1</view>
						</view>
					</view>
					<!-- <view class="new-scroll-left">
						<scroll-view scroll-x="true" class="new-order-scroll">
							<view class="flex">
								<view class="flex">
									<image lazy-load="true" class="new-order-img" style="margin-right: 20rpx;" v-for="(it,index) in goodsList"
									 :key="index" :src="$utils.imageUrl(it.img)" mode=""></image>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="new-scroll-right">
						<view class="new-order-item-money"></view>
						<view class="new-order-item-total">共1件</view>
					</view> -->
				</view>
			</view>
		</view>
		
		<view class="reception-submit">
			<view class="reception-address-submit">确认提交</view>
		</view>
	</view>
</template>

<script>
	import btn from "@/common/btn.js";
	import MD5 from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	export default {
		data() {
			return {
				ip: '',
				nav: -1,
				order: [],
				purchase: [],
				appid: '',
				key: '',
				merchantCode: '',
				openid: '',
				outTradeNo: '',
				totalAmount: '',
				nums: '',
				memberid: '',
				notifyUrl: '',
				display: false,
				cardbag_number: '',
				index: '',
				showa: '',
				sta: '',
				i: '',
				onpull: 0,
				scrolltop: '0',
				triggered: false,
				timeStamp: "",
				nums: '',
				pageSize: 10,
				pageIndex: 1,
				status: null,
				goodsList: [
					{
						"img": '../../static/nono.jpg'
					},
					{
						"img": '../../static/nono.jpg'
					},
					{
						"img": '../../static/nono.jpg'
					},
					{
						"img": '../../static/nono.jpg'
					},
					{
						"img": '../../static/nono.jpg'
					}
				]
				
			}
		},
		onShow: function() {

		},
		onLoad: function(e) {
			this.openid = uni.getStorageSync('openid');
			if (e.nav) {
				this.nav = e.nav
			}
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			// 填写地址
			// let cardbag_number = '202007301412516191315541';
			// uni.navigateTo({
			// 	url:'../ordeDetails/ordeDetails?cardbag_number=' + cardbag_number
			// })
			// 查看物流
			// let cardbag_number = '202007301412516191315541';
			// uni.navigateTo({
			// 	url:'../logistics/logistics?cardbag_number=' + cardbag_number
			// })

			let that = this;

			// 1.判断当前登录状态    200已登录   0未登录
			var sign = uni.getStorageSync('sign');

			if (sign) {

				let time = setTimeout(function(e) {
					that.showa = 1;
					clearTimeout(time)
				}, 100)

				this.sta = '200';
				var memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				var action = 'get_order_list';
				var data = JSON.stringify({
					memberid: this.memberid,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					status: this.status
				});

				this.$utils.post(action, data).then(res => {
					console.log('订单列表', res)
					that.purchase = res.rs;
					that.pageIndex++;
				})
			} else {
				this.sta = '0';
				// 供浏览使用 
				this.level = 1;
				this.level_name = '普通会员';
				this.discount_name = '无折扣'
				uni.setStorageSync('level', 1)
				uni.setStorageSync('level_name', '普通会员')
				uni.setStorageSync('discount_name', '无折扣')
			}



			var data = JSON.stringify({
				memberid: this.memberid,
				pageSize: this.pageSize,
				pageIndex: this.pageIndex,
				status: this.status
			});
			var action = 'get_order_list';

			this.$utils.post(action, data).then(res => {
				uni.hideLoading();
				console.log('第三方参数', res)
				that.purchase = res.rs;
				this.appid = res.rs.appid;
				this.key = res.rs.key;
				this.merchantCode = res.rs.merchantCode;
				this.openid = uni.getStorageSync('openid');
			})
		},
		computed: {
			screenPurchase: function() {
				let screenPurchase = [];
				let purchase = this.purchase;
				let nav = this.nav;
				for (let i = 0; i < purchase.length; i++) {
					let purchaseItem = purchase[i];
					console.log(purchaseItem.status, nav, purchaseItem.status == nav);
					if (nav == -1) {
						screenPurchase.push(purchaseItem);
					} else if (nav == 1) {
						if (purchaseItem.status == 0 || purchaseItem.status == 1) {
							screenPurchase.push(purchaseItem);
						}
					} else if (purchaseItem.status == nav) {
						screenPurchase.push(purchaseItem);
					}
				}
				return screenPurchase;
			}
		},
		methods: {
			// 赠送好友
			give: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				let price = e.currentTarget.dataset.price;
				let status = e.currentTarget.dataset.status;

				let index = e.currentTarget.dataset.index;
				console.log(this.purchase[index].status)

				var data = '{"cardbag_number":"' + cardbag_number + '"}';
				var action = 'share_cardbag';
				console.log(data)
				// if(status == 2){
				//  uni.navigateTo({
				//  	url:'../success/success?cardbag_number=' + cardbag_number +'&price=' + price
				//  })
				// }else{
				this.$utils.post(action, data).then(res => {
					console.log('赠送好友', res)
					if (res.sta == 1) {
						this.purchase[index].status = '2'
						uni.showToast({
							title: res.msg,
							icon: 'success',
							mask: true,
							success: (res) => {
								setTimeout(function(e) {
									uni.navigateTo({
										url: '../success/success?cardbag_number=' + cardbag_number + '&price=' + price
									})
								}, 1500)
							}
						})
					}
				})
				// }

			},
			// 赠送好友
			zengsong: function(e) {
				var that = this;
				let cardbag_number = that.cardbag_number;
				let price = that.totalAmount;

				var data = '{"cardbag_number":"' + cardbag_number + '"}';
				var action = 'share_cardbag';
				that.$utils.post(action, data).then(res => {
					console.log('赠送好友', res)
					if (res.sta == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
							mask: true,
							success: (res) => {
								setTimeout(function(e) {
									uni.navigateTo({
										url: '../success/success?cardbag_number=' + cardbag_number + '&price=' + price
									})
								}, 1500)
							}
						})
					}
				})
			},
			// 取消订单
			cancel: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let data = JSON.stringify({
					memberid: this.memberid,
					ordernumber: ordernumber
				});
				let action = 'cancel_buy_order';

				this.$utils.post(action, data).then(res => {
					console.log("取消订单", res);
					if (res.sta == 1) {
						uni.showToast({
							title: "取消成功"
						})
						uni.startPullDownRefresh();
					} else {
						uni.showToast({
							title: "操作失败",
							icon: 'none'
						})
					}
				})
			},
			// 申请退款
			refund: function(e) {
				var that = this;
				let cardbag_number = e.currentTarget.dataset.cardbag_number;

				let index = e.currentTarget.dataset.index;


				uni.showModal({
					title: '',
					content: '是否退款',
					cancelText: '取消',
					confirmText: '确认',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							var data = '{"memberid":"' + that.memberid + '","cardbag_number":"' + cardbag_number + '"}';
							var action = 'refund_cardbag';
							console.log(data)
							that.$utils.post(action, data).then(res => {
								console.log('申请退款', res)
								if (res.sta == 1) {
									that.purchase[index].status = '4'
									uni.showToast({
										title: res.msg,
										icon: 'success',
									})
								} else if (res.sta == 0) {
									uni.showToast({
										title: res.msg,
										icon: 'none',
									})
								}


							})
						}
					}
				})





			},

			// 撤回赠送
			withdraw: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;

				let index = e.currentTarget.dataset.index;
				console.log(this.purchase[index].status)

				var data = '{"memberid":"' + this.memberid + '","cardbag_number":"' + cardbag_number + '"}';
				var action = 'recall_cardbag';

				this.$utils.post(action, data).then(res => {
					console.log('撤回赠送', res)
					if (res.sta == 1) {
						this.purchase[index].status = '1';
						uni.showToast({
							title: res.msg,
							icon: 'success',

						})
					}


				})
			},
			// 撤回赠送
			withdraww: function(e) {

				let cardbag_number = e.currentTarget.dataset.cardbag_number;



				let index = e.currentTarget.dataset.index;

				console.log(this.purchase[index].status)



				var data = '{"memberid":"' + this.memberid + '","cardbag_number":"' + cardbag_number + '"}';

				var action = 'recall_cardbag';



				this.$utils.post(action, data).then(res => {

					console.log('撤回赠送', res)

					if (res.sta == 1) {


						this.order[index].status = '1';

						uni.showToast({

							title: res.msg,

							icon: 'success',



						})

					}





				})

			},
			//删除记录
			dele: function(e) {
				let that = this;
				let cardbag_number = e.currentTarget.dataset.cardbag_number;

				let index = e.currentTarget.dataset.index;
				console.log(this.purchase[index].status)

				var data = '{"memberid":"' + this.memberid + '","cardbag_number":"' + cardbag_number + '"}';
				var action = 'del_cardbag';
				console.log(data)


				uni.showModal({
					title: '',
					content: '是否删除',
					cancelText: '取消',
					confirmText: '删除',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							that.$utils.post(action, data).then(res => {
								console.log('删除记录', res)
								if (res.sta == 1) {
									this.purchase.splice(index, 1)
									uni.showToast({
										title: res.msg,
										icon: 'success',

									})
								}


							})
						}
					}
				})






			},
			// 我收到的再次购买
			shop: function(e) {
				let index = e.currentTarget.dataset.index;
				let arr = [];
				let z = 0;
				// 商品列表
				let purchase = this.order[index];
				//  玩法 直接1 批量2 定时3 即时4
				let type = order.type;
				//  份数
				let fenshu = order.all_details_num;
				// 全部商品
				let all = order.goodsinfo_all;

				// 直接  批量    全部商品/份数  个商品   传份数  玩法
				// 定时          全部商品       玩法
				// 即时          全部商品       份数/全部商品-1  玩法
				if (type == 1 || type == 2) {
					for (let i = 0; i < all.length / fenshu; i++) {
						arr.push(all[i])
					}
				} else if (type == 3) {
					for (let i in all) {
						arr.push(all[i])
					}
				} else if (type == 4) {
					for (let i in all) {
						arr.push(all[i])
					}
					fenshu = fenshu / all.length - 1;
				}



				// 一种是循环查重  另一种是sleep休眠

				for (let i in arr) {
					z++
					this.sleep(100, +arr[i].id, arr[i].goodsnum, fenshu, type, z, arr.length)
				}
			},
			// 我购买的再次购买
			again: function(e) {
				let index = e.currentTarget.dataset.index;
				let arr = [];
				let z = 0;
				// 商品列表
				let purchase = this.purchase[index];
				//  玩法 直接1 批量2 定时3 即时4
				let type = purchase.type;
				//  份数
				let fenshu = purchase.all_details_num;
				// 全部商品
				let all = purchase.goodsinfo_all;

				// 直接  批量    全部商品/份数  个商品   传份数  玩法
				// 定时          全部商品       玩法
				// 即时          全部商品       份数/全部商品-1  玩法
				if (type == 1 || type == 2) {
					for (let i = 0; i < all.length / fenshu; i++) {
						arr.push(all[i])
					}
				} else if (type == 3) {
					for (let i in all) {
						arr.push(all[i])
					}
				} else if (type == 4) {
					for (let i in all) {
						arr.push(all[i])
					}
					fenshu = fenshu / all.length - 1;
				}



				// 一种是循环查重  另一种是sleep休眠

				for (let i in arr) {
					z++
					this.sleep(100, arr[i].id, arr[i].goodsnum, fenshu, type, z, arr.length)
				}


			},
			// 添加购物车
			sleep: function(e, id, num, fenshu, type, z, length) {



				var now = new Date();
				var exitTime = now.getTime() + e;
				while (true) {

					now = new Date();

					if (now.getTime() > exitTime) {

						var data = '{"memberid":"' + this.memberid + '","goodsid":"' + id + '","goodsnum":"' + num + '"}';
						var action = 'add_goods_to_giftbag';
						this.$utils.post(action, data).then(res => {
							console.log('添加购物车', res)
							if (res.sta == 1) {
								if (z == length) {
									uni.navigateTo({
										url: '../shopping/shop?fenshu=' + fenshu + '&type=' + type
									})
								}
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}

						})
						return;
						break;
					}
				}

			},
			// 填写地址
			address: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				uni.navigateTo({
					url: '../ordeDetails/ordeDetails?cardbag_number=' + cardbag_number
				})
			},
			// 查看物流
			logistics: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				uni.navigateTo({
					url: '../logistics/logistics?cardbag_number=' + cardbag_number
				})
			},
			//  微信支付
			submit: function(e) {
				let orderNumber = e.currentTarget.dataset.ordernumber;
				// 接口地址
				let action = 'get_buy_order_pay_info';
				// 传入参数
				let data = JSON.stringify({
					ordernumber: orderNumber,
				});
				console.log(data);
				// 请求
				this.$utils.post(action, data).then(res => {
					this.$utils.wxPay(res.rs.serial_number, "buy_order");
				});
			},
			// 微信支付
			wx: function(e) {
				var that = this;
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
					uni.requestPayment({
						timeStamp: String(this.timeStamp),
						nonceStr: this.nums,
						package: 'prepay_id=' + res.rs.prepay_id,
						signType: 'MD5',
						paySign: sign.toUpperCase(),
						success(res) {
							uni.hideLoading();

							uni.request({
								url: 'http://zhijianlw.com/api.php/index/set_agent_cardbag',
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
			ipp: function(e) {
				var that = this;
				// 获取IP地址
				uni.request({
					url: 'https://pv.sohu.com/cityjson?ie=utf-8',
					success: function(e) {
						console.log(e)
						var aaa = e.data.split(' ');
						var bbb = aaa[4]
						var ccc = bbb.replace('"', '')
						var ddd = ccc.replace('"', '')
						var eee = ddd.replace(',', '')
						that.ip = eee;
						that.wx();
					}
				})

			},
			// 小程序支付
			forsubmit: function(e) {

				let arr = [];


				const date = {
					// 合作方标识
					appId: 'appId=' + 'EW_N3213842400',
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + 'EW_N5247492162',
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
				}

				console.log(date)

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
				let stringSignTemp = stringA + '&key=' + '730ed24645b1a54e82a3d2bcff63db37';


				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)

				const datt = {
					// 合作方标识
					appId: 'appId=' + 'EW_N3213842400',
					//  签名
					sign: 'sign=' + sign,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + 'EW_N5247492162',
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5'
				}
				console.log(datt)
				let arrr = [];

				for (let i in datt) {
					arrr.push(datt[i])
				}

				arrr.sort();

				let string = '';

				// 拼接字符串
				for (let i in arrr) {
					if (i == arrr.length - 1) {
						string += arrr[i];
					} else {
						string += arrr[i] + '&';
					}

				}
				console.log('字符串', string)


				uni.request({
					url: 'https://api.liantuofu.com/open/precreate',
					data: string,
					header: {
						'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
					},
					method: 'POST',
					// 成功回调
					success: (res) => {
						console.log(res.data)
					},
				})
			},

			xiaochengxu: function(e) {
				let index = this.index
				let that = this;
				let arr = [];

				const date = {
					// 合作方标识
					// appId: 'appId=' + 'EW_N3213842400',
					appId: 'appId=' + this.appid,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					// merchantCode:'merchantCode=' + 'EW_N5247492162',
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
					notifyUrl: 'notifyUrl=' + this.notifyUrl
				}

				console.log(date)

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
				let stringSignTemp = stringA + '&key=' + this.key;

				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)

				const datt = {
					// 合作方标识
					// appId:'appId=' + 'EW_N3213842400',
					appId: 'appId=' + this.appid,
					//  签名
					sign: 'sign=' + sign,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号   
					// merchantCode:'merchantCode=' + 'EW_N5247492162',
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
					notifyUrl: 'notifyUrl=' + this.notifyUrl
				}
				console.log(datt)
				let arrr = [];

				for (let i in datt) {
					arrr.push(datt[i])
				}

				arrr.sort();

				let string = '';

				// 拼接字符串
				for (let i in arrr) {
					if (i == arrr.length - 1) {
						string += arrr[i];
					} else {
						string += arrr[i] + '&';
					}

				}
				console.log('字符串', string)
				uni.request({
					url: 'https://api.liantuofu.com/open/precreate',
					data: string,
					header: {
						'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
					},
					method: 'POST',
					// 成功回调
					success: (res) => {
						console.log(res.data)
						uni.hideLoading();


						that.purchase[that.index].status = '1'


						wx.requestPayment({
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.payPackage,
							signType: res.data.signType,
							paySign: res.data.paySign,
							success(res) {
								// 一级页面用switchTab   二级页面用redirectTo
								wx.showModal({
									title: '微信支付',
									content: '支付成功',
									cancelText: '查看详情',
									confirmText: '立即赠送',
									success(res) {
										if (res.confirm) {
											console.log('点击立即赠送')
											that.zengsong()
										} else if (res.cancel) {
											console.log(that.cardbag_number)
											console.log('点击查看详情')


											uni.navigateTo({
												url: '../orderDetails/orderDetails?cardbag_number=' + that.cardbag_number
											})

										}

									}
								})
							},
							fail(res) {
								console.log(res)
							}
						})


					},
				})
			},

			// 选项卡切换
			top: function(e) {
				uni.showToast({
					icon: "loading",
					title: "加载中"
				})
				let index = e.currentTarget.dataset.index;
				this.nav = index;
				this.pageIndex = 1;
				var action = 'get_order_list';
				var data = JSON.stringify({
					memberid: this.memberid,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					status: this.nav == null ? '' : this.nav
				});

				this.$utils.post(action, data).then(res => {
					uni.hideLoading();
					console.log('订单列表', res)
					this.purchase = res.rs;
					this.pageIndex++;
				})
			},
			// 我购买的订单详情
			purchasedetails: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				btn.buttonClick(function(e) {
					uni.navigateTo({
						url: './orderDetails?ordernumber=' + ordernumber
					})
				})
			},
			// 我收到的订单详情
			orderdetails: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				let index = e.currentTarget.dataset.index;
				let member = {
					memberid_headimg: this.order[index].present_member.head_img,
					memberid_name: this.order[index].present_member.name
				}
				uni.setStorageSync('member', member)
				btn.buttonClick(function(e) {
					uni.navigateTo({
						url: '../ordeeDetails/ordeeDetails?cardbag_number=' + cardbag_number
					})
				})
			},
			// 订单查询
			chaxun: function(e) {
				let arr = [];


				const date = {
					// 合作方标识
					appId: 'appId=' + this.appid,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
				}

				console.log(date)

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
				let stringSignTemp = stringA + '&key=' + this.key;


				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)

				const datt = {
					// 合作方标识
					appId: 'appId=' + this.appid,
					//  签名
					sign: 'sign=' + sign,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
				}
				console.log(datt)
				let arrr = [];

				for (let i in datt) {
					arrr.push(datt[i])
				}

				arrr.sort();

				let string = '';

				// 拼接字符串
				for (let i in arrr) {
					if (i == arrr.length - 1) {
						string += arrr[i];
					} else {
						string += arrr[i] + '&';
					}

				}
				console.log('字符串', string)
				uni.request({
					url: 'https://api.liantuofu.com/open/pay/query',
					data: string,
					header: {
						'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
					},
					method: 'POST',
					// 成功回调
					success: (res) => {
						console.log('订单状态', res.data)

						if (res.data.msg == "订单已支付") {

							uni.reLaunch({
								url: '../success/success?cardbag_number=' + this.cardbag_number
							})
						}
					}

				})
			},
			// 滑动
			onPageScroll: function(e) {
				if (e.scrollTop > 3) {
					this.fixed = 1
				} else if (e.scrollTop < 3) {
					this.fixed = 0
				}

				if (this.indexx == 0 || this.indexx == 1) {
					this.showleft = false;
					this.showright = false;
				}

				if (e.scrollTop > 100) {

				} else {
					this.scrolltop = e.scrollTop;
				}

			},
			start: function(e) {
				// 触摸位置
				let sy = e.touches[0].clientY;
				this.sy = sy;
				console.log('开始触摸 sy : ' + sy + ' scrolltop : ' + this.scrolltop)
			},
			end: function(e) {
				// 移动距离
				// 触发下拉刷新
				if (this.removal >= 50) {

					setTimeout(() => {
						this.triggered = false;
					}, 3000)
					// setTimeout(() => {
					//     this.triggered = false;
					// }, 3100)
				}
				// 初始化
				else {
					this.removal = 0;
					this.triggered = false;
				}
			},
			move: function(e) {
				// 如果是在顶部
				if (this.scrolltop <= 0) {
					// 计算手指滑动距离
					var delta = e.touches[0].clientY - this.sy;
					if (delta > 20) {
						if (this.triggered == true) {

						} else {
							this.onpull = 40;
							this.removal = 50;
							this.triggered = true;
						}

					}

				}
				// 否则不触发
				else {

				}
			},


			// 下拉被触发
			onRefresh() {
				// uni.showLoading({
				// 	title:'刷新中',
				// })

				var purchase = [];
				var order = [];
				let memberid = this.memberid;
				this.pageIndex = 1;
				var data = JSON.stringify({
					memberid: this.memberid,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					status: this.status
				});
				var action = 'get_order_list';

				this.$utils.post(action, data).then(res => {
					console.log('订单列表', res)
					this.purchase = res.rs;
					this.purchase = purchase;
					this.order = order;
					uni.stopPullDownRefresh();
					this.pageIndex++;
				})
			},
			// 被下拉
			onPulling(e) {
				console.log("onpulling", e);
			},
			// 下拉被复位
			onRestore() {
				// this.triggered = 'restore'; // 需要重置
				this.onpull = 0;
				console.log("onRestore");
			},
			// 目测无效
			code: function(e) {
				this.display = false
			},
			// 开启订阅 取消了这个..
			subscribe: function(e) {
				if (this.sta == 200) {
					uni.requestSubscribeMessage({
						tmplIds: ['wMP3q9gTNfqVg2QEshGiNyQXZcZFam2SjmlDpcartBc'],
						success(res) {

							var data = '{"memberid":"' + this.memberid + '"}';
							var action = 'cancel_cardbag';

							this.$utils.post(action, data).then(res => {
								console.log(res)
							})
						}
					})
				} else if (this.sta == 0) {
					wx.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}

			},
			goToLoistics: function(e) {
				console.log(e);
				uni.navigateTo({
					url: './logistics/logistics?ordernumber=' + e.target.dataset.ordernumber
				})
			},
			receptiondetails: function(e) {
				uni.navigateTo({
					url: './ReceptionDetails'
				})
			},
			copy: function(e) {
				let orderNumber = e.currentTarget.dataset.ordernumber;
				uni.setClipboardData({
				    data: orderNumber,
				    success: function (res) {
				        uni.showToast({
				          title: '复制成功',
				        });
				    },
				})	
			},
			chooseAddr(){
			    let that = this;
				// 判断是否授权过地址
				// uni.getSetting({
				// 	success(res) {
				// 		console.log('授权', res.authSetting['scope.address'])
				// 		if (res.authSetting['scope.address'] == true) {} else {
				// 			// 调起微信收货地址
				// 			that.chooseadd()
				// 		}
				// 	}
				// })
										
			    uni.chooseAddress({
		            success(res){
						console.log('---->:',res)
						that.inputData.ToAddress = res.provinceName + res.cityName;     // 收件地址
						that.inputData.addrDetail = res.countyName+res.detailInfo;    　// 详细地址
						that.inputData.Recipient = res.userName;                    　　// 收货人
						that.inputData.phoneNumber = res.telNumber;                    // 联系电话            
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F7F5;
	}
	
	.reception-address-view{
		background-color: #FFF;
		margin-top: 20rpx;
		padding: 40rpx 30rpx 30rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.reception-address-view-left{
		display: flex;
		width: 560rpx;
		flex-direction: column;
	}
	
	.reception-address-name{
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		line-height: 45rpx;
	}
	
	.reception-address-value{
		width: 560rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		margin-top: 10rpx;
	}
	
	.reception-address-arrow{
		width: 40rpx;
		height: 40rpx;
	}
	
	.reception-address-add{
		background-color: #FFF;
		margin-top: 20rpx;
		padding: 58rpx 62rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.reception-address-left{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 296rpx;
		height: 70rpx;
		border-radius: 35rpx;
		border: 2rpx solid #FB5142;
	}
	.reception-address-img{
		width: 40rpx;
		height: 40rpx;
	}
	.reception-address-text{
		font-size: 30rpx;
		color: #DE3225;
		line-height: 42rpx;
		margin-left: 6rpx;
	}
	
	.order-purchase-view{
		background-color: #FFF;
	}
	.new-order-li{
		width: 100%;
		margin-top: 20rpx;
	}
	
	
	.new-order-li-top-orderstatus{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25rpx 45rpx 25rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-left{
		width: 140rpx;
		display: flex;
		align-items: center;
	}
	.new-scroll-left{
		width: 540rpx;
		display: flex;
		align-items: center;
	}
	.new-order-scroll {
	    width: 540rpx;
	    height: 140rpx;
	}
	.new-scroll-right{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.new-order-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 420rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-right{
		display: flex;
		flex-direction: column;
		width: 516rpx;
		margin-left: 20rpx;
	}
	.new-order-item-money{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	
	.reception-submit{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 114rpx;
	}
	
	.reception-address-submit{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 384rpx;
		height: 80rpx;
		background: #F55856;
		border-radius: 10rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 45rpx;
	}
	
</style>
