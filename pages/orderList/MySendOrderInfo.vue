<template>
	<view>
		<view class="personal-header">
			<view class="my-nav" :style="'height:'+nav+'px'"></view>
			<view class="personal-header-interstall" >
				<image @click="$buttonClick(backbutton)" class="icon-back-img" src="../../static/icon_header_back.png"></image>
				<view class="personal-header-title"></view>
			</view>
			<view class="recharge-status-top">
				<image class="recharge-status-img" v-if="orderSendInfo.orderinfo.status ==5" src="../../static/icon_unpaid_order.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderSendInfo.orderinfo.status ==5">{{orderSendInfo.orderinfo.order_status_info}}</view> -->
				<image class="recharge-status-img" v-if="orderSendInfo.orderinfo.status ==0 || orderSendInfo.orderinfo.status ==1 || orderSendInfo.orderinfo.status ==2" src="../../static/icon_giving_order.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderSendInfo.orderinfo.status ==0 || orderSendInfo.orderinfo.status ==1 || orderSendInfo.orderinfo.status ==2">{{orderSendInfo.orderinfo.order_status_info}}</view> -->
				<image class="recharge-status-img" v-if="orderSendInfo.orderinfo.status ==3" src="../../static/icon_completed_reception.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderSendInfo.orderinfo.status ==3">{{orderSendInfo.orderinfo.order_status_info}}</view> -->
				<view class="recharge-status-text" >{{orderSendInfo.orderinfo.order_status_info}}</view>
			</view>
			<view class="recharge-status-label" v-if="orderSendInfo.orderinfo.status ==5">需付款：¥{{orderSendInfo.orderinfo.orderprice_discount}}   剩余<uni-countdown :showColon="false" :show-day="true" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FB503D" color="#FFFFFF" splitorColor="#FFFFFF"></uni-countdown></view>
			<view class="recharge-status-label" v-if="orderSendInfo.orderinfo.status ==2">剩余<uni-countdown :showColon="false" :show-day="true" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FB503D" color="#FFFFFF" splitorColor="#FFFFFF"></uni-countdown></view>
			
		</view>
		
		<view class="recharge-flex">
			<!-- <view class="reception-flex">
				<view class="reception-address-view">
					<view class="reception-address-view-left">
						<view class="reception-distribution-value">您的订单已由本人签收。如有疑问您可联系 配送员【李阳，13728372378】确认。</view>
						<view class="reception-distribution-time">2021-04-08 06:36:51</view>
					</view>
					<view class="reception-address-view-right" >
						<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
					</view>
					<image src="../../static/icon_send_order.png" class="reception-send-icon"></image>
				</view>
			</view>
			<view class="reception-flex">
				<view class="reception-address-view" style="margin-top: 0rpx;padding-bottom: 30rpx;">
					<view class="reception-address-view-left">
						<view class="reception-address-name">王女士 18801182514</view>
						<view class="reception-address-value">北京市北京市丰台区纪家庙村丰管路天丰大厦238室</view>
					</view>
					<view class="reception-address-view-right" ></view>
				</view>
				<image src="../../static/icon_location_reception.png" class="reception-address-icon"></image>
			</view>
		
			<view class="order-border"></view> -->
			
			<view class="order-purchase-view">
				<view class="new-order-li">
					<view class="new-order-li-center" v-for="(item,index) in orderSendInfo.orderdetail" :key="index">
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
						<!-- <view class="conversion-details">{{item.cancel_type_info}}</view> -->
					</view>
					
					<view class="new-order-li-bottom" v-if="orderSendInfo.orderinfo.status ==5" >
						<view class="new-order-nickname"></view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" @click="cancel" :data-ordernumber="orderSendInfo.orderinfo.ordernumber">取消订单</view>
							<view class="new-order-botton" @click="submit" :data-ordernumber="orderSendInfo.orderinfo.ordernumber">立即支付</view>
						</view>
					</view>
					
					<view class="new-order-li-bottom" v-if="orderSendInfo.orderinfo.status ==0 || orderSendInfo.orderinfo.status ==1">
						<view class="new-order-nickname"></view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" @click="ApplyRefund" :data-ordernumber="orderSendInfo.orderinfo.ordernumber" data-typerefund="1" :data-goodslength="orderSendInfo.orderdetail.length" :data-detailid="orderSendInfo.orderdetail[0].id">申请退款</view>
							<view class="new-order-botton" @click="PresentNow" :data-ordernumber="orderSendInfo.orderinfo.ordernumber">立即赠送</view>
						</view>
					</view>
					
					<view class="new-order-li-bottom" v-if="orderSendInfo.orderinfo.status ==2">
						<view class="new-order-nickname"></view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" @click="GiveitAgain" :data-ordernumber="orderSendInfo.orderinfo.ordernumber">再次赠送</view>
						</view>
					</view>
					
					<view class="new-order-li-bottom" v-if="orderSendInfo.orderinfo.status ==3">
						<view class="new-order-nickname"></view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" v-if="orderSendInfo.orderinfo.is_open_bill == 0" @click="ApplyInvoice" :data-ordernumber="orderSendInfo.orderinfo.ordernumber">申请开票</view>
							<view class="new-order-botton-gray" v-if="orderSendInfo.orderinfo.is_open_bill == 1" @click="ApplyInfo" :data-ordernumber="orderSendInfo.orderinfo.ordernumber">发票详情</view>
							<view class="new-order-botton" @click="GiveitAgain" :data-ordernumber="orderSendInfo.orderinfo.ordernumber">再次赠送</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">商品总价：</view>
				<view class="reception-order-money">¥{{orderSendInfo.orderinfo.price || '0.00'}}</view>
			</view>
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">运费：</view>
				<view class="reception-order-money" style="display: flex;align-items: center;"><view style="font-size: 34rpx;color: #EC1815;margin-right: 10rpx;">+</view><view>¥{{orderSendInfo.orderinfo.delivery_price || '0.00'}}</view></view>
			</view>
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">优惠券：</view>
				<view class="reception-order-money" style="display: flex;align-items: center;"><view style="font-size: 34rpx;color: #EC1815;margin-right: 10rpx;">-</view><view>¥{{orderSendInfo.orderinfo.paycoupon || '0.00'}}</view></view>
			</view>
			<view class="flex-between flex-between-padding" v-if="orderSendInfo.orderinfo.balance_price">
				<view class="reception-order-title">余额抵扣：</view>
				<view class="reception-order-money" style="display: flex;align-items: center;"><view style="font-size: 34rpx;color: #EC1815;margin-right: 10rpx;">-</view><view>¥{{orderSendInfo.orderinfo.balance_price || '0.00'}}</view></view>
			</view>
			
			<view class="flex-between flex-between-padding order-line">
				<view class="reception-order-money"></view>
				<view class="reception-order-money">实付款：<text class="reception-order-label">¥</text><text class="reception-order-totalmoney">{{orderSendInfo.orderinfo.orderprice_discount || '0.00'}}</text></view>
			</view>
			<view class="reception-order-view" style="margin-top: 36rpx;">
				<view class="reception-order-text">订单编号：</view>
				<view class="reception-ordersn">{{orderSendInfo.orderinfo.ordernumber}}</view>
				<view class="reception-order-copy" :data-ordernumber="orderSendInfo.orderinfo.ordernumber" @click="copy">复制</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">下单时间：</view>
				<view class="reception-order-time">{{orderSendInfo.add_time}}</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;" v-if="orderSendInfo.paytime">
				<view class="reception-order-text">支付时间：</view>
				<view class="reception-order-time">{{orderSendInfo.paytime}}</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="reception-order-view" style="margin-top: 36rpx;">
				<view class="reception-order-text">礼包状态：</view>
				<view class="reception-ordersn">{{orderSendInfo.cardbag_info.card_type_info}}</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;" v-if="orderSendInfo.orderinfo.status ==0 || orderSendInfo.orderinfo.status ==1 || orderSendInfo.orderinfo.status ==2 || orderSendInfo.orderinfo.status ==3">
				<view class="reception-order-text">礼包送法：</view>
				<view class="reception-order-time">{{orderSendInfo.orderinfo.order_status_info}}  {{orderSendInfo.receive_info}}</view>
				<view class="reception-order-copy" style="width: 100rpx;margin-left: 60rpx;" :data-ordernumber="orderSendInfo.orderinfo.ordernumber" @click="goConversionDetails">查看详情</view>
			</view>
			<view class="reception-order-view-bootom" style="margin-top: 12rpx;">
				<view class="reception-order-text">超时说明：</view>
				<view class="reception-order-time">支付完成超过24小时，未成功领取的礼物系统将自动退款</view>
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
				orderSendInfo: '',
				countdown: '',
				teamEnd: false
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
			let that = this;
			let action = "get_order_giftgiving_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				memberid: memberid,
				ordernumber: this.ordernumber
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.orderSendInfo = res.rs;
					if(that.orderSendInfo.orderinfo.status ==5){
						if(res.ra.wait_pay_time){
							that.getCountdown(res.ra.wait_pay_time);
						}
					}else if(that.orderSendInfo.orderinfo.status ==2){
						if(res.ra.wait_receive_time){
							that.getCountdown(res.ra.wait_receive_time);
						}
					}
				}
			});
		},
		methods:{
			getCountdown(endTime) {
				var that = this;
				var _endDateTime = new Date(endTime).getTime();
				// timer = setInterval(function() {
					var _newDateTime = new Date().getTime();
						times = _endDateTime - _newDateTime;
						if (times <= 0) {
							return
						}
						that.setTime(times / 1000)
					// }, 1000);
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
			//转赠详情 我送出的
			goConversionDetails: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: '../index-coupon/ConversionDetails?cardbag=' + ordernumber +'&cardbag_detail_id=' + '0' + '&cardbag_number=' + ordernumber
				});
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
		}
	}
</script>

<style>
	page{
		background-color: #F9F9F9;
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
	    margin-top: 20rpx;
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
		/* margin-bottom: 20rpx; */
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
	}
	
	.reception-address-view{
		background-color: #FFF;
		margin-top: 20rpx;
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
		padding: 25rpx 45rpx 25rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.conversion-details{
		font-size: 24rpx;
		color: #EC1815;
		line-height: 33rpx;
		position: absolute;
		bottom: 12rpx;
		right: 34rpx;
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
		padding: 15rpx 45rpx 18rpx 38rpx;
	}
	
	.new-order-botton-view{
		display: flex;
		align-items: center;
	}
	.new-order-botton{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48rpx;
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
		height: 48rpx;
		border-radius: 3rpx;
		border: 1px solid #979797;
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
	}
	.recharge-status-label{
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 40rpx;
		text-align: center;
		margin-top: 10rpx;
		display: flex;
	    align-items: center;
	}
</style>
