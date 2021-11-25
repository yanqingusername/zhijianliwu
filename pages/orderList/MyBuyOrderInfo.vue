<template>
	<view style="width: 100%;overflow-x: hidden;display: flex;flex-direction: column;box-sizing: border-box;">
		<view class="personal-header" style="height:200rpx;">
			<!-- <view class="my-nav" :style="'height:'+nav+'px'"></view>
			<view class="personal-header-interstall" >
				<image @click="$buttonClick(backbutton)" class="icon-back-img" src="../../static/icon_header_back.png"></image>
				<view class="personal-header-title"></view>
			</view> -->
			<!-- <view class="recharge-status-top">
				<image v-if="orderBuyInfo.orderinfo.status ==0 || orderBuyInfo.orderinfo.status ==1" class="recharge-status-img" src="../../static/icon_unpaid_order.png"></image>
				<image v-if="orderBuyInfo.orderinfo.status ==2" class="recharge-status-img" src="../../static/icon_completed_reception.png"></image>
				<view class="recharge-status-text">{{orderBuyInfo.orderinfo.order_status_info}}</view>
			</view> -->
			
			<view class="recharge-status-top">
				<image class="recharge-status-img" v-if="orderBuyInfo.orderinfo.status ==5" src="../../static/icon_unpaid_order.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderBuyInfo.orderinfo.status ==5">{{orderBuyInfo.orderinfo.order_status_info}}</view> -->
				<image class="recharge-status-img" v-if="orderBuyInfo.orderinfo.status ==0 || orderBuyInfo.orderinfo.status ==1" src="../../static/icon_giving_order.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderBuyInfo.orderinfo.status ==0 || orderBuyInfo.orderinfo.status ==1 || orderBuyInfo.orderinfo.status ==2">{{orderBuyInfo.orderinfo.order_status_info}}</view> -->
				<image class="recharge-status-img" v-if="orderBuyInfo.orderinfo.status ==3 || orderBuyInfo.orderinfo.status ==2" src="../../static/icon_completed_reception.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderBuyInfo.orderinfo.status ==3">{{orderBuyInfo.orderinfo.order_status_info}}</view> -->
				<view class="recharge-status-text" >{{orderBuyInfo.orderinfo.order_status_info}}</view>
			</view>
			<view class="recharge-status-label" v-if="orderBuyInfo.orderinfo.status ==5">需付款：¥{{orderBuyInfo.orderinfo.orderprice_discount}}   剩余<uni-countdown :showColon="false" :show-day="true" :day="countdown.day" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FB503D" color="#FFFFFF" splitorColor="#FFFFFF"></uni-countdown></view>
			
		</view>
		
		<view class="recharge-flex">
			<view class="reception-flex" v-if="orderBuyInfo.orderinfo.wuliu_info.length > 0">
				<view class="reception-address-view" @click="logisticInfo" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber">
					<view class="reception-address-view-left">
						<view class="reception-distribution-value">{{orderBuyInfo.orderinfo.wuliu_info[0].context}}</view>
						<view class="reception-distribution-time">{{orderBuyInfo.orderinfo.wuliu_info[0].time}}</view>
					</view>
					<view class="reception-address-view-right" >
						<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
					</view>
					<image src="../../static/icon_send_order.png" class="reception-send-icon"></image>
				</view>
			</view>
			<view class="reception-flex" v-if="orderBuyInfo.orderinfo.linkman">
				<view class="reception-address-view" style="margin-top: 0rpx;padding-bottom: 30rpx;">
					<view class="reception-address-view-left">
						<view class="reception-address-name">{{orderBuyInfo.orderinfo.linkman}} {{orderBuyInfo.orderinfo.linktel}}</view>
						<view class="reception-address-value">{{orderBuyInfo.orderinfo.province}}{{orderBuyInfo.orderinfo.city}}{{orderBuyInfo.orderinfo.county}}{{orderBuyInfo.orderinfo.address}}</view>
					</view>
					<view class="reception-address-view-right" ></view>
				</view>
				<image src="https://zhijianlw.com/static/web/img/icon_location_reception.png" class="reception-address-icon"></image>
			</view>
					
			<view class="order-border" v-if="(orderBuyInfo.orderinfo.wuliu_info.length > 0 || orderBuyInfo.orderinfo.linkman)"></view>
			
			<view class="order-purchase-view">
				<view class="new-order-li">
					<view class="new-order-li-center" v-for="(item,index) in orderBuyInfo.orderdetail" :key="index" @click="goToDetails(item.keynum)">
						<view class="new-order-left">
							<view class="new-order-img">
								<image lazy-load="true" class="new-order-commodity-img" :src="item.head_img" mode=""></image>
							</view>
						</view>
						<view class="new-order-right">
							<view class="new-order-item">
								<view class="new-order-item-title">{{item.goodsname}}</view>
								<view class="new-order-item-money">¥{{item.goods_price}}</view>
							</view>
							<view class="new-order-item">
								<view class="new-order-item-sku">规格：{{item.goods_spec_item}}</view>
								<view class="new-order-item-total">x{{item.goodsnum}}</view>
							</view>
						</view>
						<view class="conversion-details" @click.stop="RefundInfo" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber" :data-typerefund="item.cancel_type" :data-detailid="item.id">{{item.cancel_type_info}}</view>
					</view>
					<view class="new-order-li-bottom"  >
						<view class="new-order-nickname"></view>
						<view class="new-order-botton-view">
							<!-- <view class="new-order-botton-gray" @click="ApplyRefund" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber" data-typerefund="1" :data-goodslength="orderBuyInfo.orderdetail.length" :data-detailid="orderBuyInfo.orderdetail[0].id">申请退款</view> -->
							<!-- <view class="new-order-botton" @click="$buttonClick(receptiondetails)">填写收货地址</view> -->
							<view class="new-order-botton-gray" v-if="orderBuyInfo.orderinfo.status == 5" @click="cancel" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber">取消订单</view>
							<view class="new-order-botton" v-if="orderBuyInfo.orderinfo.status == 5" @click="submit" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber">立即支付</view>
							<view class="new-order-botton-gray" v-if="(orderBuyInfo.orderinfo.status ==0 || orderBuyInfo.orderinfo.status ==1) && orderBuyInfo.orderinfo.is_all_refund == 0" @click="ApplyRefund" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber" data-typerefund="1" :data-goodslength="orderBuyInfo.orderdetail.length" :data-detailid="orderBuyInfo.orderdetail[0].id">申请退款</view>
							<view class="new-order-botton-gray_default" v-if="(orderBuyInfo.orderinfo.status ==0 || orderBuyInfo.orderinfo.status ==1) && orderBuyInfo.orderinfo.is_all_refund == 1" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber" data-typerefund="1" :data-goodslength="orderBuyInfo.orderdetail.length" :data-detailid="orderBuyInfo.orderdetail[0].id">申请退款</view>
							<view class="new-order-botton-gray" v-if="orderBuyInfo.orderinfo.status == 3 && orderBuyInfo.orderinfo.is_open_bill == 0" @click="ApplyInvoice" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber">申请开票</view>
							<view class="new-order-botton-gray" v-if="orderBuyInfo.orderinfo.status == 3 && orderBuyInfo.orderinfo.is_open_bill == 1" @click="ApplyInfo" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber">发票详情</view>
							<view class="new-order-botton-gray" v-if="orderBuyInfo.orderinfo.status == 3 && orderBuyInfo.orderinfo.is_all_refund == 0" @click="RefundAfterSale" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber" :data-goodslength="orderBuyInfo.orderinfo.orderdetail.length">退换/售后</view>
							<view class="new-order-botton-gray_default" v-if="orderBuyInfo.orderinfo.status == 3 && orderBuyInfo.orderinfo.is_all_refund == 1" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber" :data-goodslength="orderBuyInfo.orderinfo.orderdetail.length">退换/售后</view>
							<view class="new-order-botton" v-if="orderBuyInfo.orderinfo.status == 2 || orderBuyInfo.orderinfo.status == 3 || orderBuyInfo.orderinfo.status == 99 || orderBuyInfo.orderinfo.status == 6" @click="againProduct" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber">再次购买</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="reception-order">
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">商品总价：</view>
				<view class="reception-order-money">¥{{orderBuyInfo.orderinfo.price || '0.00'}}</view>
			</view>
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">运费：</view>
				<view class="reception-order-money" style="display: flex;align-items: center;"><view style="margin-right: 10rpx;font-size: 30rpx;margin-top: -6rpx;">+</view><view style="font-size: 30rpx;">¥{{orderBuyInfo.orderinfo.delivery_price || '0.00'}}</view></view>
			</view>
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">优惠券：</view>
				<view class="reception-order-money" style="display: flex;align-items: center;"><view style="color: #EC1815;margin-right: 10rpx;font-size: 30rpx;margin-top: -6rpx;">-</view><view style="color: #EC1815;font-size: 30rpx;">¥{{orderBuyInfo.orderinfo.paycoupon || '0.00'}}</view></view>
			</view>
			<view class="flex-between flex-between-padding" v-if="orderBuyInfo.orderinfo.balance_price">
				<view class="reception-order-title">余额抵扣：</view>
				<view class="reception-order-money" style="display: flex;align-items: center;"><view style="font-size: 30rpx;color: #EC1815;margin-right: 10rpx;margin-top: -6rpx;">-</view><view style="color: #EC1815;font-size: 30rpx;">¥{{orderBuyInfo.orderinfo.balance_price || '0.00'}}</view></view>
			</view>
			<view class="flex-between flex-between-padding order-line">
				<view class="reception-order-money"></view>
				<view class="reception-order-money">实付款：<text class="reception-order-label">¥</text><text class="reception-order-totalmoney">{{orderBuyInfo.orderinfo.orderprice_discount || '0.00'}}</text></view>
			</view>
			<view class="reception-order-view" style="margin-top: 36rpx;">
				<view class="reception-order-text">订单编号：</view>
				<view class="reception-ordersn">{{orderBuyInfo.orderinfo.ordernumber}}</view>
				<view class="reception-order-copy" :data-ordernumber="orderBuyInfo.orderinfo.ordernumber" @click="copy">复制</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">下单时间：</view>
				<view class="reception-order-time">{{orderBuyInfo.add_time}}</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;" v-if="orderBuyInfo.paytime">
				<view class="reception-order-text">支付时间：</view>
				<view class="reception-order-time">{{orderBuyInfo.paytime}}</view>
			</view>
		</view>
		<view class="reception-empty"></view>
	</view>
</template>

<script>
	var timer = null;
	var times = 0;
	export default{
		data(){
			return{
				value:'',
				nav:'20',
				ordernumber: '',
				orderBuyInfo: '',
				countdown: '',
				isSystemInfo: false
			}
		},
		onLoad:function(options){
			this.ordernumber = options.ordernumber;
			uni.getSystemInfo({
				success: res=>{
					 // 导航高度
					this.nav = res.statusBarHeight 
				}
			})
			
			this.isSystemInfo = this.$utils.isSystemInfo();
			
			// let that = this;
			// let action = "get_order_buy_info";
			// let controller = 'order';
			// let memberid = uni.getStorageSync('id')
			// let data = JSON.stringify({
			// 	memberid: memberid,
			// 	ordernumber: this.ordernumber
			// });
			// this.$utils.postNew(action,data,controller).then(res=>{
			// 	if(res.sta == 1){
			// 		that.orderBuyInfo = res.rs;
			// 		if(that.orderBuyInfo.orderinfo.status ==5){
			// 			if(res.rs.orderinfo.wait_pay_time){
			// 				that.getCountdown(res.rs.orderinfo.wait_pay_time);
			// 			}
			// 		}
			// 	}
			// });
		},
		onShow() {
			let that = this;
			let action = "get_order_buy_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				memberid: memberid,
				ordernumber: this.ordernumber
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.orderBuyInfo = res.rs;
					if(that.orderBuyInfo.orderinfo.status ==5){
						if(res.rs.orderinfo.wait_pay_time){
							that.getCountdown(res.rs.orderinfo.wait_pay_time);
						}
					}
				}
			});
		},
		methods:{
			goToDetails(keynum) {
				uni.navigateTo({
					url: "../details/details?keynum="+ keynum
				});
			},
			getCountdown(endTime) {
				var that = this;
				// var _endDateTime = new Date(endTime).getTime();
				// // timer = setInterval(function() {
				// 	var _newDateTime = new Date().getTime();
				// 		times = _endDateTime - _newDateTime;
				// 		if (times <= 0) {
				// 			return
				// 		}
				// 		that.setTime(times / 1000)
				// 	// }, 1000);
				if (endTime <= 0) {
					return
				}
				that.setTime(endTime)
			},
			setTime(times) {
					var that = this;
					if (times <= 0) {
						// clearInterval(timer);
						return;
					}
					var day = 0,
						hour = 0,
						minute = 0,
						second = 0; //时间默认值
					day = Math.floor(times / (60 * 60 * 24));
					hour = Math.floor(times / (60 * 60)) - (day * 24);
					minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
					second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
					if (day <= 9) day = '0' + day;
					if (hour <= 9) hour = '0' + hour;
					if (minute <= 9) minute = '0' + minute;
					if (second <= 9) second = '0' + second;
					//
					var countdown = {
						day: day,
						hour: hour,
						minute: minute,
						second: second,
					}
					that.countdown = countdown
					// times--;
				},
			backbutton(e){
				uni.navigateBack({
					delta: 1
				});
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
			//物流
			logisticInfo: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: "../../pagesub/Refund/LogisticsInfo?ordernumber=" + ordernumber
				});
			},
			//申请退款
			ApplyRefund: function(e) {
				// uni.navigateTo({
				// 	url: '../../pagesub/Refund/ApplyRefund' 
				// });

				let ordernumber = e.currentTarget.dataset.ordernumber;
				let typerefund = e.currentTarget.dataset.typerefund;
				let goodslength = e.currentTarget.dataset.goodslength;
				let detailid = e.currentTarget.dataset.detailid;
				if(goodslength > 1){
					uni.navigateTo({
						url: `../../pagesub/Refund/ExchangeGoods?ordernumber=${ordernumber}&typerefund=${typerefund}`
					})
				}else{
					uni.navigateTo({
						url: `../../pagesub/Refund/ApplyRefund?ordernumber=${ordernumber}&typerefund=${typerefund}&detailid=${detailid}`
					});
				}
			},
			RefundInfo(e){
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let typerefund = e.currentTarget.dataset.typerefund;
				let detailid = e.currentTarget.dataset.detailid;
				uni.navigateTo({
					url: `../../pagesub/Refund/RefundInfo?ordernumber=${ordernumber}&typerefund=${typerefund}&detailid=${detailid}`
				});
			},
			// 取消订单
			cancel: function(e) {
				let that = this;
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
						
						let action1 = "get_order_buy_info";
						let controller1 = 'order';
						let memberid1 = uni.getStorageSync('id')
						let data1 = JSON.stringify({
							memberid: memberid1,
							ordernumber: that.ordernumber
						});
						that.$utils.postNew(action1,data1,controller1).then(res=>{
							if(res.sta == 1){
								that.orderBuyInfo = res.rs;
								if(that.orderBuyInfo.orderinfo.status ==5){
									if(res.rs.orderinfo.wait_pay_time){
										that.getCountdown(res.rs.orderinfo.wait_pay_time);
									}
								}
							}
						});
					} else {
						uni.showToast({
							title: "操作失败",
							icon: 'none'
						})
					}
				})
			},
			//  微信支付
			submit: function(e) {
				let rthat = this;
				// 调用订阅消息
				uni.requestSubscribeMessage({
					tmplIds: ['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo','KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs'],
					success(res) {
						let action = "add_wx_subscribe_log";
						let controller = 'subscribe';
						let memberid = uni.getStorageSync('id')
						let data = JSON.stringify({
							memberid: memberid,
							template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"
						});
						
						rthat.$utils.postNew(action,data,controller).then(res=>{
							if(res.sta == 1){
								
							}
						})
					},
					fail(res) {
						
					}
				});
				
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
				uni.navigateTo({
					url: `../../pagesub/Refund/RefundAfterSale?ordernumber=${ordernumber}&isreception=0` //退换/售后
				})
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
		}
	}
</script>

<style>
	page{
		background-color: #F9F9F9;
		box-sizing: border-box;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}
	
	.personal-header{
		 height: 160px;
		 background: #FB503D;
		 width: 100%;
		 position: relative;
	}
	
	.personal-header-interstall{
		    margin-top: 16rpx;
		    height: 60rpx;
		    position: relative;
			display: flex;
		    align-items: center;
			justify-content: center;
	}
	.personal-header-title{
		font-size: 36rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
	
	.icon-back-img{
		position: absolute;
		top: 2rpx;
		left: 26rpx;
		width: 50rpx;
		height: 50rpx;
	}
	
	.recharge-status-top{
		display: flex;
		align-items: center;
	    justify-content: center;
	    /* margin-top: 20rpx; */
		padding-top: 20rpx;
	}
	.recharge-status-img{
		width: 42rpx;
		height: 42rpx;
	}
	.recharge-status-text{
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 59rpx;
		margin-left: 8rpx;
	}
	
	.recharge-flex{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -30rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		flex-direction: column;
		position: relative;
	}
	
	.order-border{
		width: 100%;
		height: 20rpx;
		background: #FAFAFA;
	}
	
	.reception-flex{
		width: 100%;
		display: flex;
		position: relative;
		margin-top: 20rpx;
	}
	
	.reception-address-view{
		background-color: #FFF;
		/* margin-top: 20rpx; */
		padding: 30rpx 30rpx 10rpx 78rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	
	.reception-address-view-left{
		display: flex;
		width: 560rpx;
		flex-direction: column;
	}
	
	.reception-distribution-value{
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		line-height: 42rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.reception-distribution-time{
		width: 570rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #999999;
		line-height: 42rpx;
		margin-top: 10rpx;
	}
	
	.reception-address-name{
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		line-height: 45rpx;
	}
	
	.reception-address-value{
		width: 570rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		margin-top: 10rpx;
	}
	
	
	.reception-address-arrow{
		width: 40rpx;
		height: 40rpx;
	}
	
	.reception-send-icon {
	    position: absolute;
	    top: 50rpx;
	    left: 26rpx;
	    width: 44rpx;
	    height: 44rpx;
	}
	
	.reception-address-icon{
		position: absolute;
		top: 32rpx;
		left: 26rpx;
		width: 44rpx;
		height: 44rpx;
	}
	
	.order-purchase-view{
		/* background-color: #FFF; */
	}
	.new-order-li{
		width: 100%;
		margin-top: 0rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.new-order-li-top{
		display: flex;
		align-items: center;
		padding: 20rpx 45rpx 20rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	
	.new-order-header-img{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}
	.new-order-nickname{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
		margin-left: 8rpx;
	}
	.new-order-li-top-ordersn{
		font-size: 24rpx;
		color: #666666;
		line-height: 33rpx;
		margin-left: 12rpx;
	}
	.new-order-li-top-orderstatus{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		padding: 25rpx 45rpx 40rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.conversion-details{
		font-size: 24rpx;
		color: #EC1815;
		line-height: 33rpx;
		position: absolute;
		bottom: 0rpx;
		right: 35rpx;
		padding: 20rpx 10rpx;
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
		width: 516rpx;
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
		line-height: 33rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.reception-order{
		display: flex;
		flex-direction: column;
		padding: 20rpx 36rpx 30rpx 36rpx;
		margin-top: 20rpx;
		background: #FFFFFF;
	}
	.reception-order-view{
		display: flex;
		align-items: center;
	}
	.reception-order-view-bootom{
		display: flex;
	}
	.reception-order-text{
		min-width: 140rpx;
		font-size: 24rpx;
		color: #999999;
	}
	.reception-ordersn{
		font-size: 24rpx;
		color: #333333;
	}
	.reception-order-copy{
		width: 60rpx;
		height: 30rpx;
		background: #E6E6E6;
		border-radius: 3rpx;
		margin-left: 15rpx;
		font-size: 20rpx;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.reception-order-time{
		font-size: 24rpx;
		color: #333333;
	}
	
	.reception-empty{
		height: 100rpx;
	}
	
	.flex-between-padding{
		padding: 20rpx 0rpx;
	}
	.order-line{
		padding: 26rpx 0rpx;
		border-top: 1px solid #EEEEEE;
		border-bottom: 1px solid #EEEEEE;
	}
	.reception-order-title{
		font-size: 30rpx;
		color: #999999;
		line-height: 42rpx;
	}
	.reception-order-money{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	.reception-order-label{
		font-size: 30rpx;
		color: #EB1615;
	}
	.reception-order-totalmoney{
		font-size: 30rpx;
		color: #EB1615;
		font-weight: bold;
	}
	
	.new-order-li-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 45rpx 30rpx 38rpx;
		width: 100%;
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
	.recharge-status-label{
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 40rpx;
		text-align: center;
		margin-top: 10rpx;
		display: flex;
	    align-items: center;
		justify-content: center;
	}
</style>
