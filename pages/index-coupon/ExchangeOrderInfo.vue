<template>
	<view>
		<view class="personal-header">
			<view class="recharge-status-top" v-if="orderInfo.card_type == 1">
				<view class="recharge-status-text" v-if="orderInfo.order_status_type ==0 || orderInfo.order_status_type ==1">{{orderInfo.order_status_info}}</view>
				<image class="recharge-status-img" v-if="orderInfo.order_status_type ==2" src="../../static/icon_transit_reception.png"></image>
				<view class="recharge-status-text" v-if="orderInfo.order_status_type ==2">{{orderInfo.order_status_info}}</view>
				<image class="recharge-status-img" v-if="orderInfo.order_status_type ==3" src="../../static/icon_completed_reception.png"></image>
				<view class="recharge-status-text" v-if="orderInfo.order_status_type ==3">{{orderInfo.order_status_info}}</view>
				<image class="recharge-status-img" v-if="orderInfo.order_status_type ==4" src="../../static/icon_completed_reception.png"></image>
				<view class="recharge-status-text" v-if="orderInfo.order_status_type ==4">{{orderInfo.order_status_info}}</view>
				
				
				<!-- <image class="recharge-status-img" src="../../static/icon_completed_reception.png"></image>
				<view class="recharge-status-text">已完成</view> -->
				<!-- <image class="recharge-status-img" src="../../static/icon_unpaid_order.png"></image>
				<view class="recharge-status-text">待支付</view> -->
				<!-- <image class="recharge-status-img" src="../../static/icon_giving_order.png"></image>
				<view class="recharge-status-text">赠送中</view> -->
			</view>
			<view class="recharge-status-top" v-if="orderInfo.card_type == 0">
				<view class="recharge-status-text" v-if="orderInfo.order_status_type ==0 || orderInfo.order_status_type ==1">{{orderInfo.order_status_info}}</view>
				<image class="recharge-status-img" v-if="orderInfo.order_status_type ==3" src="../../static/icon_completed_reception.png"></image>
				<view class="recharge-status-text" v-if="orderInfo.order_status_type ==3">{{orderInfo.order_status_info}}</view>
				<image class="recharge-status-img" v-if="orderInfo.order_status_type ==4" src="../../static/icon_completed_reception.png"></image>
				<view class="recharge-status-text" v-if="orderInfo.order_status_type ==4">{{orderInfo.order_status_info}}</view>
			</view>
		</view>
		
		<view class="recharge-flex">
			<view class="reception-flex" v-if="orderInfo.card_type == 1 && orderInfo.wuliu_info.length > 0">
				<view class="reception-address-view" @click="logisticInfo" :data-ordernumber="orderInfo.ordernumber">
					<view class="reception-address-view-left">
						<view class="reception-distribution-value">{{orderInfo.wuliu_info[0].context}}</view>
						<view class="reception-distribution-time">{{orderInfo.wuliu_info[0].time}}</view>
					</view>
					<view class="reception-address-view-right" >
						<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
					</view>
					<!-- <image src="../../static/icon_send_order.png" class="reception-send-icon"></image> -->
				</view>
			</view>
			<view class="reception-flex" v-if="orderInfo.card_type == 1 && orderInfo.linkman">
				<view class="reception-address-view" style="margin-top: 0rpx;padding-bottom: 30rpx;">
					<view class="reception-address-view-left">
						<view class="reception-address-name">{{orderInfo.linkman}} {{orderInfo.linktel}}</view>
						<view class="reception-address-value">{{orderInfo.province}}{{orderInfo.city}}{{orderInfo.county}}{{orderInfo.address}}</view>
					</view>
					<view class="reception-address-view-right" ></view>
				</view>
				<image src="https://zhijianlw.com/static/web/img/icon_location_reception.png" class="reception-address-icon"></image>
			</view>
		
			<view class="order-border" v-if="orderInfo.card_type == 1 && (orderInfo.wuliu_info.length > 0 || orderInfo.linkman)"></view>
			
			<view class="order-purchase-view">
				<view class="new-order-li">
					<view class="new-order-li-center">
						<view class="new-order-left">
							<view class="new-order-img">
								<image lazy-load="true" class="new-order-commodity-img" :src="orderInfo.cardtype_img" mode=""></image>
							</view>
						</view>
						<view class="new-order-right">
							<view class="new-order-item">
								<view class="new-order-item-title">{{orderInfo.card_name}}</view>
								<!-- <view class="new-order-item-money">¥{{orderInfo.price}}</view> -->
							</view>
							<view class="new-order-item">
								<view class="new-order-item-sku">规格：{{orderInfo.card_type_info}}</view>
								<view class="new-order-item-total">x1</view>
							</view>
						</view>
						<!-- <view class="conversion-details">{{item.desc}}</view> -->
					</view>
					<view v-if="orderInfo.card_type == 1 && orderInfo.detail_info.detail_son_info">
						<view class="" style="padding: 15rpx 0rpx;font-size: 24rpx;color: #999999;width: 100%;">兑换商品</view>
						<view class="new-order-li-center-item">
							<view class="new-order-left" style="width: 112rpx;margin-left: 6rpx;">
								<view class="new-order-img" style="width: 112rpx;height: 112rpx;">
									<image lazy-load="true" class="new-order-commodity-img" :src="orderInfo.detail_info.detail_son_info.head_img" mode="" style="width: 112rpx;height: 112rpx;"></image>
								</view>
							</view>
							<view class="new-order-right" style="margin-left: 0rpx;width: 530rpx;">
								<view class="new-order-item">
									<view class="new-order-item-title">{{orderInfo.detail_info.detail_son_info.goodsname}}</view>
									<view class="new-order-item-money"></view>
								</view>
								<view class="new-order-item">
									<view class="new-order-item-sku">规格：{{orderInfo.detail_info.detail_son_info.goods_spec_item}}</view>
									<view class="new-order-item-total"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="new-order-li-bottom">
						<view class="new-order-nickname"></view>
						<view class="new-order-botton-view" v-if="orderInfo.card_type == 0">
							<view class="new-order-botton-gray" v-if="orderInfo.order_status_type == 0" @click.stop="goTransfer" :data-ordernumber="orderInfo.ordernumber">转赠</view>
							<view class="new-order-botton" v-if="orderInfo.order_status_type == 0" @click.stop="goRecharge" :data-ordernumber="orderInfo.ordernumber">去充值</view>
							<view class="new-order-botton-gray" v-if="orderInfo.order_status_type == 4" @click.stop="goConversionDetails" :data-ordernumber="orderInfo.ordernumber">转赠详情</view>
							<!-- <view class="new-order-botton-gray" v-if="orderInfo.order_status_type == 1 || orderInfo.order_status_type == 2 || orderInfo.order_status_type == 3" @click.stop="$buttonClick(refundHandler)">换货/售后</view> -->
						</view>
						<view class="new-order-botton-view" v-if="orderInfo.card_type == 1">
							<view class="new-order-botton-gray" v-if="orderInfo.order_status_type == 0" @click.stop="goTransfer" :data-ordernumber="orderInfo.ordernumber">转赠</view>
							<view class="new-order-botton" v-if="orderInfo.order_status_type == 0" @click.stop="go_exchange" :data-cardid="orderInfo.cardid">去兑换</view>
							<view class="new-order-botton-gray" v-if="orderInfo.order_status_type == 1 || orderInfo.order_status_type == 2 || orderInfo.order_status_type == 3" @click.stop="$buttonClick(refundHandler)">换货/售后</view>
							<view class="new-order-botton-gray" v-if="orderInfo.order_status_type == 4" @click.stop="goConversionDetails" :data-ordernumber="orderInfo.ordernumber">转赠详情</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="reception-order-view" style="margin-top: 20rpx;">
				<view class="reception-order-text">订单编号：</view>
				<view class="reception-ordersn">{{orderInfo.ordernumber}}</view>
				<view class="reception-order-copy" :data-ordernumber="orderInfo.ordernumber" @click="copy">复制</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">绑卡时间：</view>
				<view class="reception-order-time">{{orderInfo.bind_time}}</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text" v-if="orderInfo.card_type == 1 && (orderInfo.order_status_type == 1 || orderInfo.order_status_type == 2 || orderInfo.order_status_type == 3)">兑换成功：</view>
				<view class="reception-order-time" v-if="orderInfo.card_type == 1 && (orderInfo.order_status_type == 1 || orderInfo.order_status_type == 2 || orderInfo.order_status_type == 3)">{{orderInfo.exchange_time }}</view>
				<view class="reception-order-text" v-if="orderInfo.order_status_type == 4 ">转赠成功：</view>
				<view class="reception-order-time" v-if="orderInfo.order_status_type == 4 ">{{orderInfo.give_time }}</view>
				<view class="reception-order-text" v-if="orderInfo.card_type == 0 && orderInfo.order_status_type == 3 ">充值成功：</view>
				<view class="reception-order-time" v-if="orderInfo.card_type == 0 && orderInfo.order_status_type == 3 ">{{orderInfo.recharge_time  }}</view>
			</view>
		</view>
		<view class="reception-empty"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ordernumber: '',
				orderInfo: ''
			}
		},
		onLoad:function(options){
			this.ordernumber = options.ordernumber;
			let that = this;
			let action = "get_exchange_order_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				ordernumber: this.ordernumber,
				memberid: memberid
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.orderInfo = res.rs;
				} 
			})
		},
		methods:{
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
			//转赠
			goTransfer: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=1`
				})
			},
			//去兑换
			go_exchange: function(e) {
				console.log(e);
				let cardid = e.currentTarget.dataset.cardid;
				uni.navigateTo({
					url: './redemption_center?cardid=' + cardid
				})
			},
			//转赠详情 我送出的
			goConversionDetails: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: './ConversionDetails?cardbag=' + ordernumber +
					'&cardbag_detail_id=' + '0' + '&cardbag_number=' + ordernumber
				});
			},
			//物流
			logisticInfo: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: "../../pagesub/Refund/LogisticsInfo?ordernumber=" + ordernumber
				});
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
		}
	}
</script>

<style>
	page{
		background-color: #F9F9F9;
	}
	
	.personal-header{
		 height: 160rpx;
		 background: #FB503D;
		 width: 100%;
		 position: relative;
	}
	
	.recharge-status-top{
		display: flex;
		align-items: center;
	    justify-content: center;
	    margin-top: 0rpx;
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
		padding: 25rpx 45rpx 25rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-li-center-item{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		width: 678rpx;
		height: 135rpx;
		background: #FAFAFA;
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
		min-width: 120rpx;
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
		height: 48rpx;
		border-radius: 3rpx;
		border: 1px solid #EB1615;
		font-size: 24rpx;
		color: #EB1615;
		line-height: 33rpx;
		width: 140rpx;
		/* padding: 0rpx 18rpx; */
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
		width: 140rpx;
		/* padding: 0rpx 18rpx; */
	}
	.recharge-status-label{
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 40rpx;
		text-align: center;
		margin-top: 10rpx;
	}
</style>
