<template>
	<view @touchmove='move' @touchstart="start" @touchend="end">
		<view>
			<view :style="{height: onpull + 'px' }" style="width: 100%;"></view>
			<view class="order-nav" style="background-color: #F8F7F5;"></view>
			<!-- <view class="order-subscribe flex-center" :class="[nav==0?'':'']" style="background-color: #F8F7F5;" @click="subscribe"></view> -->
		</view>

		<view style="position: fixed; top:0;z-index: 999;width: 100%;">
			<view>
				<scroll-view :style="{height: onpull + 'px' }" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
				 :refresher-threshold="100" refresher-background="white" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
				 @refresherrestore="onRestore" @refresherabort="onAbort"></scroll-view>
			</view>
			<!-- 我购买的,我收到的 -->
			
			<!-- 选项卡 -->
			<view class="coupon-header">
				<view class="coupon-header-content flex-between">
					<view class="recharge-header-nav" data-index='1' @click="top" :class="[nav==1?'recharge-header-nav-active':'']">我购买的</view>
					<view class="recharge-header-nav" data-index='2' @click="top" :class="[nav==2?'recharge-header-nav-active':'']">我送出的</view>
					<view class="recharge-header-nav" data-index='3' @click="top" :class="[nav==3?'recharge-header-nav-active':'']">我收到的</view>
				</view>
			</view>
			
		</view>

		<view class="empty-no-btm" v-if="screenPurchase.length==0">
			<image class="empty-no-img" src="https://zhijianlw.com/static/web/img/empty_page_xm.png" mode=""></image>
			<view class="empty-no-text" v-if="nav==1">您还没有购买过礼物，快去挑选吧～</view>
			<view class="empty-no-view" v-if="nav==1" @click="$buttonClick(selectliwu)">买礼物送好友</view>
			
			<view class="empty-no-text" v-if="nav==2">您还没有购买过礼物，快去挑选吧～</view>
			<view class="empty-no-view" v-if="nav==2" @click="$buttonClick(selectliwu)">挑礼物</view>
			
			<view class="empty-no-text" v-if="nav==3">您还没有领取礼物～</view>
			<view class="empty-no-view" v-if="nav==3" @click="$buttonClick(selectliwu)">买礼物送好友</view>
		</view>
		<!-- 我购买的 -->
		<view v-if="screenPurchase.length > 0" class="order-purchase-view" v-for="(item,index) in screenPurchase" :key="index">
			<view class="new-order-li" @click="receptiondetails" :data-ordernumber="item.ordernumber" :data-status="item.status" :data-cardtype="item.card_type">
				<view class="new-order-li-top">
					<view class="new-order-li-top-ordersn">订单号：{{item.ordernumber}}</view>
					<view class="new-order-li-top-orderstatus">{{item.order_status_info}} <image style="width: 20rpx;height: 24rpx;margin-left: 0rpx;margin-right: -4rpx;" src="../../static/return_arrow_r_g.png"/></view>
				</view>
				<view class="new-order-li-center">
					<view class="new-order-left" v-if="item.goods_info_list.length == 1">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.goods_info_list[0].head_img" mode=""></image>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.goods_info_list[0].goodsname}}</view>
							<view class="new-order-item-sku">规格：{{item.goods_info_list[0].goods_spec_item}}</view>
						</view>
					</view>
					<view class="new-order-left" v-if="item.goods_info_list.length > 1">
						<scroll-view scroll-x="true" class="new-order-scroll">
							<view class="flex">
								<view class="flex">
									<image lazy-load="true" class="new-order-img" style="margin-right: 20rpx;" v-for="(it,index) in item.goods_info_list"
									 :key="index" :src="$utils.imageUrl(it.head_img)" mode=""></image>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item-money">¥<text style="font-size: 34rpx;">{{item.orderprice_discount}}</text></view>
						<view class="new-order-item-total">共{{item.goods_count}}件</view>
					</view>
				</view>
				<view class="new-order-li-bottom">
					<view class="new-order-nickname">
						<view v-if="nav==3">{{item.give_name}}送出</view>
						<view v-else></view>
					</view>
					<view class="new-order-botton-view" v-if="nav==1">
						<view class="new-order-botton-gray" v-if="item.status == 5" @click.stop="cancel" :data-ordernumber="item.ordernumber">取消订单</view>
						<view class="new-order-botton" v-if="item.status == 5" @click.stop="submit" :data-ordernumber="item.ordernumber">立即支付</view>
						<view class="new-order-botton-gray" v-if="(item.status == 0 || item.status == 1) && item.is_all_refund == 0" @click.stop="ApplyRefund" :data-ordernumber="item.ordernumber" data-typerefund="1" :data-goodslength="item.goods_info_list.length" :data-detailid="item.goods_info_list[0].id" data-nav="1" >申请退款</view>
						<view class="new-order-botton-gray_default" v-if="(item.status == 0 || item.status == 1) && item.is_all_refund == 1" :data-ordernumber="item.ordernumber" data-typerefund="1" :data-goodslength="item.goods_info_list.length" :data-detailid="item.goods_info_list[0].id" data-nav="1" >申请退款</view>
						<view class="new-order-botton-gray" v-if="item.status == 3 && item.is_open_bill == 0" @click.stop="ApplyInvoice" :data-ordernumber="item.ordernumber">申请开票</view>
						<view class="new-order-botton-gray" v-if="item.status == 3 && item.is_open_bill == 1" @click.stop="ApplyInfo" :data-ordernumber="item.ordernumber">发票详情</view>
						<view class="new-order-botton-gray" v-if="item.status == 3 && item.is_all_refund == 0" @click.stop="RefundAfterSale" :data-ordernumber="item.ordernumber" :data-goodslength="item.goods_info_list.length" data-isreception="0" :data-isexchangegoods="item.is_exchange_goods" :data-detailid="item.goods_info_list[0].id">退换/售后</view>
						<view class="new-order-botton-gray_default" v-if="item.status == 3 && item.is_all_refund == 1" :data-ordernumber="item.ordernumber" :data-goodslength="item.goods_info_list.length" data-isreception="0" :data-isexchangegoods="item.is_exchange_goods" :data-detailid="item.goods_info_list[0].id">退换/售后</view>
						<view class="new-order-botton" v-if="item.status == 2 || item.status == 3 || item.status == 99 || item.status == 6" @click.stop="againProduct" :data-ordernumber="item.ordernumber">再次购买</view>
					</view>
					
					<view class="new-order-botton-view" v-if="nav==2">
						<view class="new-order-botton-gray" v-if="item.status == 5" @click.stop="cancel" :data-ordernumber="item.ordernumber">取消订单</view>
						<view class="new-order-botton" v-if="item.status == 5" @click.stop="submit" :data-ordernumber="item.ordernumber">立即支付</view>
						<view class="new-order-botton-gray" v-if="item.status == 0 || item.status == 1" @click.stop="ApplyRefund" :data-ordernumber="item.ordernumber" data-typerefund="1" :data-goodslength="item.goods_info_list.length" :data-detailid="item.goods_info_list[0].id" data-nav="2" :data-goodsinfolist="item.goods_info_list" :data-isrefundprice="item.is_refund_price">申请退款</view>
						<view class="new-order-botton" v-if="item.status == 0 || item.status == 1" @click.stop="PresentNow" :data-ordernumber="item.ordernumber">立即赠送</view>
						<view class="new-order-botton-gray" v-if="item.status == 3 && item.is_open_bill == 0" @click.stop="ApplyInvoice" :data-ordernumber="item.ordernumber">申请开票</view>
						<view class="new-order-botton-gray" v-if="item.status == 3 && item.is_open_bill == 1" @click.stop="ApplyInfo" :data-ordernumber="item.ordernumber">发票详情</view>
						
						<view class="new-order-botton" v-if="item.status == 2 || item.status == 3 || item.status == 99 || item.status == 6" @click.stop="GiveitAgain" :data-ordernumber="item.ordernumber">再次赠送</view>
					</view>
					
					<view class="new-order-botton-view" v-if="nav==3">
						<view class="new-order-botton-gray" v-if="(item.status == 0 || item.status == 1) && (item.card_type == 1 || item.card_type == 2 || item.card_type == 3)" @click.stop="goTransfer" :data-ordernumber="item.ordernumber" :data-isexchangetype="item.is_exchange_type">转赠</view>
						<view class="new-order-botton" v-if="(item.status == 0 || item.status == 1) && item.card_type == 1" @click.stop="go_exchange" :data-cardid="item.cardid">去兑换</view>
						<view class="new-order-botton" v-if="(item.status == 0 || item.status == 1) && item.card_type == 2" @click.stop="ReceptionAddress" :data-ordernumber="item.ordernumber">填写收货地址</view>
						<view class="new-order-botton" v-if="(item.status == 0 || item.status == 1) && item.card_type == 3" @click.stop="goRecharge" :data-ordernumber="item.ordernumber">充值</view>
						<view class="new-order-botton-gray" v-if="item.status == 3" @click.stop="RefundAfterSale" :data-ordernumber="item.ordernumber" :data-goodslength="item.goods_info_list.length" data-isreception="1" :data-isexchangegoods="item.is_exchange_goods" :data-detailid="item.goods_info_list[0].id">退换/售后</view>
					</view>
				</view>
			</view>
			
		</view>
		<view style="height: 20rpx;"></view>
		<view class="post-bottom" v-if="isAll">
			<view class="post-bottom-line"></view>
			<view class="post-bottom-text">我是有底线的</view>
			<view class="post-bottom-line"></view>
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
				nav: 1,
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
				screenPurchase: [],
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
			// uni.showToast({
			// 	icon: "loading",
			// 	title: "加载中"
			// })
			this.getOrderList(1);
		},
		// 下拉刷新
		onLoad: function(e) {
			this.openid = uni.getStorageSync('openid');
			if (e.nav) {
				this.nav = e.nav
			}
			
		},
		onPullDownRefresh:function(){
			this.getOrderList(1);
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500);
		},
		onReachBottom:function(){
			this.getOrderList(2);
		},
		computed: {
			
		},
		methods: {
			getOrderList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = "get_my_order_list";
				let controller = 'order';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					memberid: memberid,
					type: this.nav
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.screenPurchase = res.rs;
						that.isAll = false;
					} else {
						if(res.rs.length>0){
							that.screenPurchase = that.screenPurchase.concat(res.rs);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
				});
			},
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
				let memberid = uni.getStorageSync('id')
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let data = JSON.stringify({
					memberid: memberid,
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
					// var serial_number = res.rs.serial_number;
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
					let stringSignTemp = stringA + '&key=45579fcdb646746f02d9e041d50975b4';

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
				// uni.showToast({
				// 	icon: "loading",
				// 	title: "加载中"
				// })
				let index = e.currentTarget.dataset.index;
				this.nav = index;
				this.getOrderList(1);
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
			//买礼物送好友
			selectliwu: function(e) {
				uni.reLaunch({
					url: '../index/index'
				})
			},
			//申请退款
			ApplyRefund: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let typerefund = e.currentTarget.dataset.typerefund;
				let goodslength = e.currentTarget.dataset.goodslength;
				let detailid = e.currentTarget.dataset.detailid;
				let nav = e.currentTarget.dataset.nav;
				if(nav == 2){
					let goodsinfolist = e.currentTarget.dataset.goodsinfolist;
					let isrefundprice = e.currentTarget.dataset.isrefundprice;
					let detailidList = []
					for(let i in goodsinfolist){
						detailidList.push(goodsinfolist[i].id)
					}
					let detailids = detailidList.join(",");
					if(isrefundprice == 0){
						uni.navigateTo({
							url: `../../pagesub/Refund/ApplyRefund?ordernumber=${ordernumber}&typerefund=${typerefund}&detailid=${detailids}`
						});
					}else{
						uni.navigateTo({
							url: `../../pagesub/Refund/RefundInfo?ordernumber=${ordernumber}&typerefund=${typerefund}&detailid=${detailids}`
						});
					}
					
				}else{
					// 我购买的
					if(goodslength > 1){
						uni.navigateTo({
							url: `../../pagesub/Refund/ExchangeGoods?ordernumber=${ordernumber}&typerefund=${typerefund}`
						})
					}else{
						uni.navigateTo({
							url: `../../pagesub/Refund/ApplyRefund?ordernumber=${ordernumber}&typerefund=${typerefund}&detailid=${detailid}`
						});
					}
				}
			},
			//申请开票
			ApplyInvoice(e){
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: "../Apply/ApplyInvoice?ordernumber=" + ordernumber
				});
			},
			//发票详情
			ApplyInfo(e){
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: `../Apply/ApplySuccess?ordernumber=${ordernumber}&types=1`
				});
			},
			//退换/售后
			RefundAfterSale: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let isreception = e.currentTarget.dataset.isreception;
				let isexchangegoods = e.currentTarget.dataset.isexchangegoods || 0;
				let detailid = e.currentTarget.dataset.detailid;
				
				//  我收到的
				if(isreception == 1){
					if(isexchangegoods == 0){
						uni.navigateTo({
							url: `../../pagesub/Refund/RefundAfterSale?ordernumber=${ordernumber}&isreception=${isreception}` //退换/售后
						})
					}else{
						uni.navigateTo({
							url: `../../pagesub/Refund/RefundInfo?ordernumber=${ordernumber}&typerefund=2&detailid=${detailid}`
						});
					}
				}else{
					//  我购买的
					uni.navigateTo({
						url: `../../pagesub/Refund/RefundAfterSale?ordernumber=${ordernumber}&isreception=${isreception}` //退换/售后
					})
				}
				
			},
			//再次购买
			againProduct: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let action = 'order_add_shopping_cart';
                let memberid = uni.getStorageSync('id')
                let controller = 'order';
                let data = JSON.stringify({
                    ordernumber: ordernumber,
                    memberid: memberid
                })
                this.$utils.postNew(action, data, controller).then(res => {
					
                    if(res.sta == 1){
                        uni.reLaunch({
                            url:'../shopping/shopping?type=0'
                        })
                    }
                })
			},
			//立即赠送
			PresentNow: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: '../shopping/succes?cardbag_number=' + ordernumber
				})
			},
			//再次赠送
			GiveitAgain: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let action = 'order_add_shopping_cart';
                let memberid = uni.getStorageSync('id')
                let controller = 'order';
                let data = JSON.stringify({
                    ordernumber: ordernumber,
                    memberid: memberid
                })
                this.$utils.postNew(action, data, controller).then(res => {
                    if(res.sta == 1){
                        uni.reLaunch({
                            url:'../shopping/shopping?type=0'
                        })
                    }
                })
			},
			//去兑换
			go_exchange: function(e) {
				console.log(e);
				let cardid = e.currentTarget.dataset.cardid;
				uni.navigateTo({
					url: '../index-coupon/redemption_center?cardid=' + cardid + '&isOrder=1'
				})
			},
			//去充值
			goRecharge: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let memberid = uni.getStorageSync('id')
				let controller = 'order';
				let action = 'recharge_giftcard';
				let data = JSON.stringify({
					memberid: memberid,
					ordernumber: ordernumber
				});
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						setTimeout(()=>{
							uni.navigateTo({
								url: '../balance/RechargeStatus?istype=1&ordernumber=' + ordernumber
							})
						},500)
					} else {
						uni.showToast({
						 	title:res.msg,
						 	icon:"none",
						 	mask:'true',
						});
					}
				});
			},
			//转赠
			goTransfer: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let isexchangetype = e.currentTarget.dataset.isexchangetype;
				if(isexchangetype == 0){
					let ordernumber = e.currentTarget.dataset.ordernumber;
					let action = 'order_add_shopping_cart';
					let memberid = uni.getStorageSync('id')
					let controller = 'order';
					let data = JSON.stringify({
					    ordernumber: ordernumber,
					    memberid: memberid,
						buy_type: 1
					})
					this.$utils.postNew(action, data, controller).then(res => {
					    if(res.sta == 1){
					        uni.navigateTo({
					        	url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=${isexchangetype}`
					        })
					    }
					})
				}else{
					uni.navigateTo({
						url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=${isexchangetype}`
					})
				}
			},
			//填写收货地址
			ReceptionAddress: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: './ReceptionAddress?ordernumber=' + ordernumber
				})
			},
			//收礼详情
			receptiondetails: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let status = e.currentTarget.dataset.status;
				let cardtype = e.currentTarget.dataset.cardtype;
				if(ordernumber){
					if(this.nav == 1){
						uni.navigateTo({
							url: './MyBuyOrderInfo?ordernumber='+ ordernumber //我购买的
						})
					} else if(this.nav == 2){
						uni.navigateTo({
							url: './MySendOrderInfo?ordernumber='+ ordernumber //我送出的
						})
					} else {
						if((status == 0 || status == 1) &&cardtype==2) {
							uni.navigateTo({
								url: './ReceptionDetails?ordernumber='+ ordernumber //收礼详情
							})
						} else {
							uni.navigateTo({
								url: './ReceptionOrderInfo?ordernumber='+ ordernumber //我收到的
							})
						}
					}
				}
				// uni.navigateTo({
				// 	url: './ReceptionDetails' //收礼详情
				// })
				// uni.navigateTo({
				// 	url: '../../pagesub/Refund/ApplyRefund' //申请退款
				// })
				// uni.navigateTo({
				// 	url: '../../pagesub/Refund/RefundAfterSale' //退换/售后
				// })
				// uni.navigateTo({
				// 	url: '../../pagesub/Refund/RefundExchangeInfo' //填写物流信息
				// })
				// uni.navigateTo({
				// 	url: '../../pagesub/Refund/RefundExchangeDown' //审核通过-退货/换货物流  审核通过-退货详情/退货已完成
				// })
				
			},
			receptionOrderInfo: function(e) {
				// uni.navigateTo({
				// 	url: './ReceptionOrderInfo' //我收到的
				// })
				// uni.navigateTo({
				// 	url: './MyBuyOrderInfo' //我购买的
				// })
				uni.navigateTo({
					url: './MySendOrderInfo' //我送出的
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F8F7F5;
	}
	
	.recharge-header-nav {
	    height: 52rpx;
	    border-bottom: 4rpx solid #fff;
	    color: #333333;
		font-size: 28rpx;
	}
	
	.recharge-header-nav-active {
	    border-bottom: 4rpx solid #EB1615;
	    color: #EB1615;
	}

	.order-commodity-name {
		width: 75%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.order-purchase-li-btm {
		display: flex;
		justify-content: flex-end;
	}

	.order-nav-content {
		width: 550rpx;
	}

	.order-purchase-li-btm-button {
		width: min-content;
	}

	.order-purchase-btm-li {
		margin-left: 20rpx;
	}

	.no-btm {
		line-height: 64rpx;
		color: #B4B4B4;
		text-align: center;
	}
	
	.order-purchase-view{
		background-color: #FFF;
	}
	.new-order-li{
		width: 100%;
		margin-top: 20rpx;
	}
	.new-order-li-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 45rpx 20rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-li-top-ordersn{
		font-size: 24rpx;
		color: #666666;
		line-height: 33rpx;
	}
	.new-order-li-top-orderstatus{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25rpx 45rpx 25rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-left{
		width: 540rpx;
		display: flex;
		align-items: center;
	}
	
	.new-order-scroll {
	    width: 540rpx;
	    height: 140rpx;
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
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 380rpx;
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
		align-items: center;
		flex-direction: column;
	}
	.new-order-item-money{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-nickname{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
	}
	.new-order-li-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15rpx 45rpx 18rpx 38rpx;
		height: 40px;
	}
	
	.new-order-botton-view{
		display: flex;
		align-items: center;
	}
	.new-order-botton{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 44rpx;
		border-radius: 3rpx;
		border: 1px solid #EB1615;
		font-size: 24rpx;
		color: #EB1615;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
		margin-left: 20rpx;
	}
	.new-order-botton-gray{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 44rpx;
		border-radius: 3rpx;
		border: 1px solid #979797;
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
		margin-left: 20rpx;
	}
	
	.new-order-botton-gray_default{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 44rpx;
		border-radius: 3rpx;
		border: 1px solid #999999;
		font-size: 24rpx;
		color: #FFFFFF;
		background-color: #999999;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
		margin-left: 20rpx;
	}
	
	.empty-no-btm{
		margin-top: 184rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.empty-no-img{
		width: 255rpx;
		height: 180rpx;
	}
	.empty-no-text{
		margin-top: 56rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.empty-no-view{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 468rpx;
		height: 80rpx;
		background: #EC1815;
		border-radius: 40rpx;
		margin-top: 75rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	
	.post-bottom{
		display: flex;
		align-items: center;
		color: #B3B3B3;
		text-align: center;
		padding-top: 24rpx;
		padding-bottom: 48rpx;
		justify-content: center;
	}
	.post-bottom-text{
		font-size: 24rpx;
		color: #B3B3B3;
		line-height: 33rpx;
		margin: 0rpx 18rpx;
	}
	.post-bottom-line{
		width: 240rpx;
		height: 1px;
		background: #E0E0E0;
	}
</style>
