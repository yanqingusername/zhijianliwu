<template>
	<view style="width: 100%;overflow-x: hidden;display: flex;flex-direction: column;">
		<view class="personal-header" style="height:200rpx;">
			<!-- <view class="my-nav" :style="'height:'+nav+'px'"></view>
			<view class="personal-header-interstall" >
				<image @click="$buttonClick(backbutton)" class="icon-back-img" src="../../static/icon_header_back.png"></image>
				<view class="personal-header-title"></view>
			</view> -->
			<view class="recharge-status-top">
				<image class="recharge-status-img" v-if="orderReceptionInfo.orderinfo.status ==2" src="../../static/icon_transit_reception.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderReceptionInfo.orderinfo.status ==2">{{orderReceptionInfo.orderinfo.order_status_info}}</view> -->
				<image class="recharge-status-img" v-if="orderReceptionInfo.orderinfo.status ==3" src="../../static/icon_completed_reception.png"></image>
				<!-- <view class="recharge-status-text" v-if="orderReceptionInfo.orderinfo.status ==3">{{orderReceptionInfo.orderinfo.order_status_info}}</view> -->
				<view class="recharge-status-text">{{orderReceptionInfo.orderinfo.order_status_info}}</view>
			</view>
		</view>
		
		<view class="recharge-flex" :style="'margin-top: ' + (orderReceptionInfo.orderinfo.wuliu_info.length > 0 || orderReceptionInfo.orderinfo.linkman ? '-30':'0') +'rpx'">
			<view class="reception-flex" v-if="orderReceptionInfo.orderinfo.wuliu_info.length > 0">
				<view class="reception-address-view" @click="logisticInfo" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber">
					<view class="reception-address-view-left">
						<view class="reception-distribution-value">{{orderReceptionInfo.orderinfo.wuliu_info[0].context}}</view>
						<view class="reception-distribution-time">{{orderReceptionInfo.orderinfo.wuliu_info[0].time}}</view>
					</view>
					<view class="reception-address-view-right" >
						<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
					</view>
				</view>
			</view>
			<view class="reception-flex" v-if="orderReceptionInfo.orderinfo.linkman">
				<view class="reception-address-view" style="margin-top: 0rpx;padding-bottom: 30rpx;">
					<view class="reception-address-view-left">
						<view class="reception-address-name">{{orderReceptionInfo.orderinfo.linkman}} {{orderReceptionInfo.orderinfo.linktel}}</view>
						<view class="reception-address-value">{{orderReceptionInfo.orderinfo.province}}{{orderReceptionInfo.orderinfo.city}}{{orderReceptionInfo.orderinfo.county}}{{orderReceptionInfo.orderinfo.address}}</view>
					</view>
					<view class="reception-address-view-right" ></view>
				</view>
				<image src="../../static/icon_location_reception.png" class="reception-address-icon"></image>
			</view>
		</view>
		
		<view class="order-border" v-if="(orderReceptionInfo.orderinfo.wuliu_info.length > 0 || orderReceptionInfo.orderinfo.linkman)"></view>
		
		<view class="order-purchase-view">
			<view class="new-order-li">
				<view class="new-order-li-top">
					<image lazy-load="true" class="new-order-header-img" :src="orderReceptionInfo.orderinfo.give_head_img" mode=""></image>
					<view class="new-order-nickname">{{orderReceptionInfo.orderinfo.give_name}}</view>
					<view class="new-order-li-top-ordersn">送出的</view>
				</view>
				<view class="new-order-li-center" v-for="(item,index) in orderReceptionInfo.orderdetail" :key="index" @click="goToDetails(item.keynum)">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.head_img" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.goodsname}}</view>
							<view class="new-order-item-money" style="font-size: 30rpx;">¥{{item.goods_price}}</view>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：{{item.goods_spec_item}}</view>
							<view class="new-order-item-total">x{{item.goodsnum}}</view>
						</view>
					</view>
					<view class="conversion-details" @click.stop="RefundInfo" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber" :data-typerefund="item.cancel_type" :data-detailid="item.id">{{item.cancel_type_info}}</view>
				</view>
				
				<!-- 兑换卡册 -->
				<view style="padding: 25rpx 45rpx 25rpx 38rpx;" v-if="orderReceptionInfo.currency_type == 1 && orderReceptionInfo.currency_list.length > 0">
					<view class="" style="padding: 15rpx 0rpx;font-size: 24rpx;color: #999999;width: 100%;">兑换商品</view>
					<view class="new-order-li-center-item">
						<view class="new-order-left" style="width: 112rpx;margin-left: 6rpx;">
							<view class="new-order-img" style="width: 112rpx;height: 112rpx;">
								<image lazy-load="true" class="new-order-commodity-img" :src="orderReceptionInfo.currency_list[0].head_img" mode="" style="width: 112rpx;height: 112rpx;"></image>
							</view>
						</view>
						<view class="new-order-right" style="margin-left: 0rpx;width: 530rpx;">
							<view class="new-order-item">
								<view class="new-order-item-title">{{orderReceptionInfo.currency_list[0].goodsname}}</view>
								<view class="new-order-item-money"></view>
							</view>
							<view class="new-order-item">
								<view class="new-order-item-sku">规格：{{orderReceptionInfo.currency_list[0].goods_spec_item}}</view>
								<view class="new-order-item-total"></view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="new-order-li-bottom" v-if="orderReceptionInfo.orderinfo.status ==3" >
					<view class="new-order-nickname"></view>
					<view class="new-order-botton-view">
						<view class="new-order-botton-gray" @click="RefundAfterSale" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber" :data-isexchangegoods="orderReceptionInfo.orderinfo.is_exchange_goods" :data-detailid="orderReceptionInfo.orderdetail[0].id">退换/售后</view>
					</view>
				</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="reception-order-view">
				<view class="reception-order-text">领取编号：</view>
				<view class="reception-ordersn">{{orderReceptionInfo.orderinfo.ordernumber}}</view>
				<view class="reception-order-copy" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber" @click="copy">复制</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">领取时间：</view>
				<view class="reception-order-time">{{orderReceptionInfo.add_time}}</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;" v-if="orderReceptionInfo.currency_type == 1 && orderReceptionInfo.currency_time">
				<view class="reception-order-text">兑换成功：</view>
				<view class="reception-order-time">{{orderReceptionInfo.currency_time}}</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;" v-if="orderReceptionInfo.currency_type == 2 && orderReceptionInfo.currency_time">
				<view class="reception-order-text">充值成功：</view>
				<view class="reception-order-time">{{orderReceptionInfo.currency_time}}</view>
			</view>
		</view>
		<view class="reception-empty"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				nav:'20',
				ordernumber: '',
				orderReceptionInfo: '',
				isSystemInfo: false
			}
		},
		onLoad:function(options){
			uni.getSystemInfo({
				success: res=>{
					 // 导航高度
					this.nav = res.statusBarHeight 
				}
			})
			
			this.isSystemInfo = this.$utils.isSystemInfo();
			
			this.ordernumber = options.ordernumber;
			// let that = this;
			// let action = "get_order_receivegifts_info";
			// let controller = 'order';
			// let memberid = uni.getStorageSync('id')
			// let data = JSON.stringify({
			// 	memberid: memberid,
			// 	ordernumber: this.ordernumber
			// });
			// this.$utils.postNew(action,data,controller).then(res=>{
			// 	if(res.sta == 1){
			// 		that.orderReceptionInfo = res.rs;
			// 	}
			// });
		},
		onShow(){
			let that = this;
			let action = "get_order_receivegifts_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				memberid: memberid,
				ordernumber: this.ordernumber
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.orderReceptionInfo = res.rs;
				}
			});
		},
		methods:{
			goToDetails(keynum) {
				uni.navigateTo({
					url: "../details/details?keynum="+ keynum
				});
			},
			backbutton(e){
				uni.navigateBack({
					delta: 1
				});
			},
			RefundInfo(e){
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let typerefund = e.currentTarget.dataset.typerefund;
				let detailid = e.currentTarget.dataset.detailid;
				uni.navigateTo({
					url: `../../pagesub/Refund/RefundInfo?ordernumber=${ordernumber}&typerefund=${typerefund}&detailid=${detailid}`
				});
			},
			//退换/售后
			RefundAfterSale: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let isexchangegoods = e.currentTarget.dataset.isexchangegoods || 0;
				let detailid = e.currentTarget.dataset.detailid;
				if(isexchangegoods == 0){
					uni.navigateTo({
						url: `../../pagesub/Refund/RefundAfterSale?ordernumber=${ordernumber}&isreception=${1}` //退换/售后
					})
				}else{
					uni.navigateTo({
						url: `../../pagesub/Refund/RefundInfo?ordernumber=${ordernumber}&typerefund=2&detailid=${detailid}`
					});
				}
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
		}
	}
</script>

<style>
	page{
		background-color: #F9F9F9;
		box-sizing: border-box;
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
	
	.reception-address-icon{
		position: absolute;
		top: 32rpx;
		left: 26rpx;
		width: 44rpx;
		height: 44rpx;
	}
	
	.order-purchase-view{
		background-color: #FFF;
	}
	.new-order-li{
		width: 100%;
		margin-top: 0rpx;
		/* display: flex;
		flex-direction: column;
		align-items: center; */
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
	.new-order-li-center-item{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		width: 678rpx;
		height: 135rpx;
		background: #FAFAFA;
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
		padding: 20rpx 0rpx 20rpx 36rpx;
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
	}
	
</style>
