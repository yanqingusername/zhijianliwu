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
			<view class="order-nav">
				<view class="order-nav-content flex-between margin-auto">
					<view class="order-nav-content-left" data-index="0" @click="top" :class="[nav==0?'order-nav-content-active':'']">我购买的</view>
					<view class="order-nav-content-left" data-index="1" @click="top" :class="[nav==1?'order-nav-content-active':'']">我收到的</view>
				</view>
			</view>
			<!-- 开启订阅 -->
			<!-- <view class="order-subscribe flex-center" :class="[nav==0?'':'']"  @click="subscribe">
<view class="order-subscribe-content flex-vertically">
<image lazy-load="true" class="order-subscribe-content-img" src="../../static/order-subscribe.png" mode=""></image>
<view class="order-subscribe-content-alt">请开启订阅,当好友收到或领取礼物后系统将通知您。</view>
<view class="order-subscribe-content-open">开启</view>
</view> 
</view> -->
		</view>

		<view class="no-btm" v-if="sta==0">
			<image class="img" src="../../static/nobtm.jpg" mode=""></image>
		</view>

		<!-- 我购买的 -->
		<view class="order-purchase" v-for="(item,index) in purchase" :key="index" :class="[nav==0?'':'none']">
			<view class="no-btm" v-if="purchase.length==0">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
			</view>
			<view class="order-purchase-li">
				<!-- 商品 介绍 -->
				<view class="order-purchase-li-top flex" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="purchasedetails">
					<!-- 商品图 -->
					<view class="order-purchase-top-img">
						<image lazy-load="true" class="img" :src="$utils.imageUrl(item.goodsinfo_all[0].head_img)" v-if="item.goodsinfo_all[0].head_img"
						 mode=""></image>
						<image lazy-load="true" class="img" src="../../static/nono.jpg" v-else mode=""></image>
					</view>

					<!-- 介绍 -->
					<view class="order-purchase-top-introduce">
						<!-- 名称,状态-->
						<view class="order-purchase-top-header flex-between">
							<view class="order-commodity-name">{{item.goodsinfo_all[0].goodsname}}</view>
							<view class="order-alt-title-right" v-if="item.has_order =='1' && item.has_exchange_order=='0'">已完成></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='0'">支付中></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='2'">赠送中></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='3'">已领取></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='4'">已退款></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='5'">已关闭></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='6'">待发货></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='7'">已发货></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='8'">已完成></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='1'">待赠送></view>
						</view>
						<!-- 规格 -->
						<view class="order-purchase-top-specifications"></view>
						<!-- 数量 -->
						<view class="order-purchase-top-number">数量:<span>x</span>{{item.goodsnum_all}}</view>

						<!-- 其他商品 -->
						<scroll-view scroll-x="true" class="order-purchase-top-scroll">
							<view class="flex">
								<view class="flex">
									<image lazy-load="true" class="order-purchase-top-scroll-img" style="padding-right: 20rpx;" v-for="(it,index) in item.goodsinfo_all"
									 :key="index" :src="$utils.imageUrl(it.head_img)" mode=""></image>
								</view>
							</view>
							<!-- 立即支付	 -->
						</scroll-view>

						<!-- 价格 礼包数量 -->
						<view class="order-purchase-right">
							<view class="order-purchase-right-price">¥{{item.price_discount}}</view>
							<view class="order-purchase-right-gift">礼包领取<span>{{item.receive_details_num}}</span>/{{item.all_details_num}}</view>
						</view>
					</view>
				</view>


				<!-- 礼品 按钮 -->
				<view class="order-purchase-li-btm flex-between">
					<view class="order-purchase-li-btm-number" v-if="item.type=='1'">{{item.goodsnum_all}}件礼物/直接/共{{item.all_details_num}}份</view>
					<view class="order-purchase-li-btm-number" v-else-if="item.type=='2'">{{item.goodsnum_all}}件礼物/批量/共{{item.all_details_num}}份</view>
					<view class="order-purchase-li-btm-number" v-else-if="item.type=='3'">{{item.goodsnum_all}}件礼物/定时/共{{item.all_details_num}}份</view>
					<view class="order-purchase-li-btm-number" v-else-if="item.type=='4'">{{item.goodsnum_all}}件礼物/即时/共{{item.all_details_num}}份</view>



					<!-- <x></x>  已完成  已关闭 -->
					<view class="order-purchase-li-btm-button flex-between" v-if="item.status == '5' || item.status == '8'">
						<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="dele">删除记录</view>
						<view class="order-purchase-btm-li" :data-index="index" @click="again">再次购买</view>
					</view>


					<!-- 订单全部生成 -->
					<view class="flex-between" v-else-if="item.has_order =='1' && item.has_exchange_order=='0'">
						<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="purchasedetails">查看详情</view>
					</view>



					<!-- 支付中 -->
					<view class="order-purchase-li-btm-button flex-between" v-else-if="item.status=='0'">
						<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="cancel">取消订单</view>
						<view class="" @click="immediately" :data-index="index" :data-cardbag_number="item.cardbag_number">
							<form @submit="submit"><button :data-index="index" class="order-purchase-btm-li" :data-cardbag_number="item.cardbag_number"
								 form-type="submit">立即支付</button></form>
						</view>
					</view>

					<!-- 已生成订单并且还有可生成订单 -->
					<!--  <view class="flex-between" v-else-if=" item.status=='2' && item.has_order =='1' && item.has_exchange_order=='1'" style="width: 354rpx;">
<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="orderdetails">查看详情</view>
<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="address">填写收货地址</view>
</view>  -->

					<!-- 赠送中 -->
					<view class="order-purchase-li-btm-button flex-between" v-else-if="item.status=='2'">
						<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="withdraw">撤回赠送</view>
						<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" :data-status="item.status"
						 :data-price="item.price_discount" @click="give">赠送好友</view>
					</view>
					<!-- 已退款  -->
					<view class=" flex-between" v-else-if="item.status == '4'">
						<view class="order-purchase-btm-li" :data-index="index" @click="again">再次购买</view>
					</view>



					<!-- 待赠送 -->
					<view class="order-purchase-li-btm-button flex-between" v-else-if="item.status=='1'">
						<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="refund">申请退款</view>
						<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" :data-price="item.price_discount"
						 @click="give">赠送好友</view>
					</view>




				</view>
			</view>
		</view>

		<view class="order-purchase" v-if="purchase.length<=0" style="background: transparent;" :class="[nav==0?'':'none']">
			<view class="no-btm">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				暂无相关订单
			</view>
		</view>
		
		<!-- 我收到的 -->
		<view class="order-li " v-for="(item,index) in order" :key="index" :class="[nav==1?'':'none']">
			<view class="no-btm" v-if="order.length==0">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
			</view>
			<view class="order-li-top flex-between margin-auto" :data-cardbag_number="item.cardbag_number" :data-index="index"
			 @click="orderdetails">
				<!-- 商品图 -->
				<image lazy-load="true" class="order-commodity" :src="$utils.imageUrl(item.goodsinfo_all[0].head_img)" v-if="item.goodsinfo_all[0].head_img"
				 mode=""></image>
				<image lazy-load="true" class="order-commodity" src="../../static/nono.jpg" v-else mode=""></image>
				<!-- 介绍 -->
				<view class="order-alt">
					<view class="order-alt-title flex-between">
						<view class="order-commodity-name">{{item.goodsinfo_all[0].goodsname}}</view>

						<view class="order-alt-title-right" v-if="item.has_order =='1' && item.has_exchange_order=='0'">已完成></view>
						<view class="order-alt-title-right" v-else-if="item.status=='0'">未支付></view>
						<view class="order-alt-title-right" v-else-if="item.status=='2'">赠送中></view>
						<view class="order-alt-title-right" v-else-if="item.status =='1'">待赠送></view>
						<view class="order-alt-title-right" v-else-if="item.status=='3'">已领取></view>
						<view class="order-alt-title-right" v-else-if="item.status=='4'">已退款></view>
						<view class="order-alt-title-right" v-else-if="item.status=='5'">已关闭></view>
						<view class="order-alt-title-right" v-else-if="item.status=='6'">待发货></view>
						<view class="order-alt-title-right" v-else-if="item.status=='7'">已发货></view>
						<view class="order-alt-title-right" v-else-if="item.status=='8'">已完成></view>
						<!-- <view class="order-alt-title-right" v-else>已转增></view> -->
					</view>
					<view class="order-alt-number">礼物共{{item.goodsnum_all}}件</view>
					<!-- 其他商品 -->
					<scroll-view scroll-x="true" class="order-scroll">
						<view class="flex">
							<view class="flex">
								<image lazy-load="true" class="order-scroll-img" style="margin-right: 20rpx;" v-for="(it,index) in item.goodsinfo_all"
								 :key="index" :src="$utils.imageUrl(it.head_img)" mode=""></image>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<view class="order-purchase-li-btm  flex-between margin-auto">
				<!-- 赠送人信息 -->
				<view class="flex" v-if="item.present_member.head_img&&item.present_member.name">
					<image lazy-load="true" class="order-li-btm-touxiang" :src="$utils.imageUrl(item.present_member.head_img)" mode=""></image>
					<view class="order-li-btm-name"> {{item.present_member.name}}</view>
				</view>
				<view class="flex" v-else></view>
				<!-- 按钮选择 -->
				<!-- 已领取 -->
				<!-- <view class="flex-between order-li-btn" v-if="item.status=='3'">
<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="address">填写收货地址</view>
<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="give">赠送好友</view>
</view> -->



				<!-- 订单全部生成 -->
				<view class="flex-between" v-if="item.has_order =='1' && item.has_exchange_order=='0'">
					<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="logistics">查看物流</view>
				</view>
				<!-- 赠送中 -->
				<view class="order-purchase-li-btm-button flex-between" v-else-if="item.status=='2'">
					<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="withdraww">撤回赠送</view>
					<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" :data-status="item.status"
					 :data-price="item.price_discount" @click="give">赠送好友</view>
				</view>
				<!-- 已退款  -->
				<view class=" flex-between" v-else-if="item.status == '4'">
					<view class="order-purchase-btm-li" :data-cardbag_number="item.cardbag_number" @click="again">再次购买</view>
				</view>
				<!--   已完成  已关闭 -->
				<view class="order-purchase-li-btm-button flex-between" v-else-if="item.status == '8' || item.status == '5'">
					<view class="order-li-btn-right" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="dele">删除记录</view>
					<view class="order-li-btn-right" :data-index="index" @click="shop">再次购买</view>
				</view>
				<!-- 未生成订单 -->
				<view class="flex-between" v-else-if="item.has_order =='0'" style="width: 354rpx;">
					<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" :data-index="index" @click="orderdetails">查看详情</view>
					<!-- <view class="order-purchase-btm-li" v-if="item.pay_memberid==memberid" :data-index="index"  :data-cardbag_number="item.parent_cardbag" @click="refund">申请退款</view> -->
					<!-- <view class="order-li-btn-right" v-else :data-cardbag_number="item.cardbag_number" :data-index="index" @click="orderdetails">查看详情</view> -->
					<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="address">填写收货地址</view>
				</view>
				<!-- 已生成订单并且还有可生成订单 -->
				<view class="flex-between" v-else-if=" item.has_order =='1' && item.has_exchange_order=='1'" style="width: 354rpx;">
					<!-- <view class="order-purchase-btm-li" :data-index="index"  :data-cardbag_number="item.cardbag_number" @click="refund">申请退款</view> -->
					<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" :data-index="index" @click="orderdetails">查看详情</view>
					<view class="order-li-btn-right" :data-cardbag_number="item.cardbag_number" @click="address">填写收货地址</view>
				</view>



			</view>
		</view>
		<view class="order-li" v-if="order.length<=0" style="background: transparent;" :class="[nav==1?'':'none']">
			<view class="no-btm">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				暂无相关订单
			</view>
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
				nav: '0',
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
				pageIndex: 1
			}
		},
		onShow: function() {
			console.log("重新载入页面");
			uni.startPullDownRefresh({
				fail(err){
					console.log(err)
				}
			});
			var purchase = [];
			var order = [];
			if (this.showa == 1) {

				let memberid = this.memberid;
				var data = JSON.stringify({
					memberid: this.memberid,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
				});
				
				var action = 'get_cardbag_list';

				this.memberid = memberid;

				this.$utils.post(action, data).then(res => {
					console.log('订单列表', res)

					for (let i in res.rs) {
						if (res.rs[i].pay_type == 0) {
							// 我购买的
							this.purchase.push(res.rs[i])
						}
						if (res.rs[i].pay_type == 1) {
							// 我收到的
							if (res.rs[i].goodsinfo_all.length > 0) {
								this.order.push(res.rs[i])
							}
						}
					}
				})
				// this.chaxun();
			}


		},
		onLoad: function(e) {

			if (e.nav) {
				this.nav = e.nav
			}
			var purchase = [];
			var order = [];

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
			var sign = uni.getStorageSync('sign')
			if (sign) {

				let time = setTimeout(function(e) {
					that.showa = 1;
					clearTimeout(time)
				}, 100)

				this.sta = '200';
				this.memberid = uni.getStorageSync('id');
				// this.memberid = 46;
				var data = JSON.stringify({
					memberid: this.memberid,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
				});
				
				var action = 'get_cardbag_list';


				this.$utils.post(action, data).then(res => {
					console.log('订单列表', res)
					this.pageIndex ++;
					for (let i in res.rs) {
						if (res.rs[i].pay_type == 0) {
							// 我购买的
							purchase.push(res.rs[i])
						}
						if (res.rs[i].pay_type == 1) {

							// 我收到的
							if (res.rs[i].goodsinfo_all.length > 0) {
								order.push(res.rs[i])
							}
						}
					}
					console.log('我购买的', this.purchase)
					console.log('我收到的', this.order)
					this.purchase = purchase;
					this.order = order;

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



			var data = '{}';
			var action = 'get_payconfig';

			this.$utils.post(action, data).then(res => {
				console.log('第三方参数', res)
				this.appid = res.rs.appid;
				this.key = res.rs.key;
				this.merchantCode = res.rs.merchantCode;
				this.openid = uni.getStorageSync('openid');

				// this.appid = 'EW_N0810019757'; 
				// this.key = 'a7f802950ad9b174839391048b770253';
				// this.merchantCode = 'EW_N7058517273';
			})




			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
				'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
			];

			var nums = "";

			for (var i = 0; i < 32; i++) {

				var id = parseInt(Math.random() * 61);

				nums += chars[id];

			}
			// 字符串
			this.nums = nums;
			// 时间戳
			this.timeStamp = new Date().getTime();

		},
		// 下拉刷新
		onPullDownRefresh(e) {
			var purchase = [];
			var order = [];
			if (this.showa == 1) {
		
				let memberid = this.memberid;
				this.pageIndex = 1;
				var data = JSON.stringify({
					memberid: this.memberid,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
				});
				var action = 'get_cardbag_list';
		
				this.memberid = memberid;
		
				this.$utils.post(action, data).then(res => {
					console.log('订单列表', res)
					this.pageIndex ++;
					for (let i in res.rs) {
						if (res.rs[i].pay_type == 0) {
							// 我购买的
							purchase.push(res.rs[i])
						}
						if (res.rs[i].pay_type == 1) {
							// 我收到的
							if (res.rs[i].goodsinfo_all.length > 0) {
								order.push(res.rs[i])
							}
						}
					}
					this.purchase = purchase;
					this.order = order;
		
				})
				// this.chaxun();
			}
		
		
			setTimeout(function() {
				// uni.hideLoading();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(e) {
			var data = JSON.stringify({
				memberid: this.memberid,
				pageSize: this.pageSize,
				pageIndex: this.pageIndex,
			});
			
			var action = 'get_cardbag_list';
			
			this.$utils.post(action, data).then(res => {
				console.log('订单列表', res)
				this.pageIndex ++;
				for (let i in res.rs) {
					if (res.rs[i].pay_type == 0) {
						// 我购买的
						this.purchase.push(res.rs[i])
					}
					if (res.rs[i].pay_type == 1) {
						// 我收到的
						if (res.rs[i].goodsinfo_all.length > 0) {
							this.order.push(res.rs[i])
						}
					}
				}
			})
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
				let cardbag_number = e.currentTarget.dataset.cardbag_number;

				let index = e.currentTarget.dataset.index;

				var data = '{"memberid":"' + this.memberid + '","cardbag_number":"' + cardbag_number + '"}';
				var action = 'cancel_cardbag';

				this.$utils.post(action, data).then(res => {
					console.log('取消订单', res)
					if (res.sta == 1) {
						this.purchase[index].status = '5'
						uni.showToast({
							title: res.msg,
							icon: 'success',
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
				uni.redirectTo({
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
				this.cardbag_number = e.detail.target.dataset.cardbag_number;
				var data = '{"cardbag_number":"' + e.detail.target.dataset.cardbag_number + '","memberid":"' + this.memberid +
					'"}';
				var action = 'get_cardbag_pay_info';
				this.index = e.detail.target.dataset.index;
				this.$utils.post(action, data).then(res => {
					console.log('获取支付金额', res)
					if (res.sta == 1) {
						uni.showLoading({
							title: '加载中',
							mask: true
						})
						this.outTradeNo = res.rs.serial_number;
						this.notifyUrl = 'https://zhijianlw.com/api.php/index/set_agent_cardbag?serial_number=' + res.rs.serial_number;
						this.totalAmount = res.rs.paymoney;
						// this.totalAmount = '0.01';
						// this.erweima();	  
						// this.xiaochengxu()
						this.ipp();
					} else {
						uni.showToast({
							title: res.msg,
							icon: none
						})
					}

				})



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
				let index = e.currentTarget.dataset.index;
				let nav = this.nav;
				this.nav = index;
			},
			// 我购买的订单详情
			purchasedetails: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				btn.buttonClick(function(e) {
					uni.navigateTo({
						url: '../orderDetails/orderDetails?cardbag_number=' + cardbag_number
					})
				})
			},
			// 我收到的订单详情
			orderdetails: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				let index = e.currentTarget.dataset.index;
				let member = {
					memberid_headimg: this.order[index].present_member!=null?this.order[index].present_member.head_img: "",
					memberid_name: this.order[index].present_member!=null?this.order[index].present_member.name: ""
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
				if (this.showa == 1) {

					let memberid = this.memberid;
					this.pageIndex = 1;
					var data = JSON.stringify({
						memberid: this.memberid,
						pageSize: this.pageSize,
						pageIndex: this.pageIndex,
					});
					var action = 'get_cardbag_list';

					this.memberid = memberid;

					this.$utils.post(action, data).then(res => {
						console.log('订单列表', res)

						for (let i in res.rs) {
							if (res.rs[i].pay_type == 0) {
								// 我购买的
								purchase.push(res.rs[i])
							}
							if (res.rs[i].pay_type == 1) {
								// 我收到的
								if (res.rs[i].goodsinfo_all.length > 0) {
									order.push(res.rs[i])
								}
							}
						}
						this.purchase = purchase;
						this.order = order;

					})
					// this.chaxun();
				}


				setTimeout(function() {
					// uni.hideLoading();
					uni.stopPullDownRefresh();
				}, 1000);
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
		}
	}
</script>

<style>
	page {
		background-color: #F8F7F5;
	}

	.order-commodity-name {
		width: 75%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.no-btm {
		line-height: 64rpx;
		color: #B4B4B4;
		text-align: center;
	}
</style>
