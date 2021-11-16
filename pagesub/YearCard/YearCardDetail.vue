<template>
	<view class="ycd_view">
		<view class="ycd_view_bg">
			<view class="ycd_view_top">
				<view class="ycd_left">
					<image class="ycd_left_img" :src="orderInfo.cardtype_img"></image>
				</view>
				<view class="ycd_right">
					<view class="ycd_right_title">{{orderInfo.card_name}}</view>
					<view class="ycd_right_content">
						<view class="ycd_right_content_1">{{orderInfo.cheange_term_of_validity}}</view>
						<view class="ycd_right_content_2">剩余可兑换<text style="color: #DB3C3A;">{{orderInfo.cheange_frequency}}</text>次</view>
					</view>
				</view>
			</view>
			<view class="ycd_view_bottom">
				<view class="ycd_view_bottom_1"></view>
				<view class="ycd_view_bottom_2">
					<view class="ycd_click_3" v-if="orderInfo.is_exchange == 1" @click="clickHandler" :data-ordernumber="orderInfo.ordernumber" >兑换记录</view>
					<view class="ycd_click_2" v-if="orderInfo.is_exchange == 0" @click="goTransfer" :data-ordernumber="orderInfo.ordernumber" :data-iscardbaglogo="orderInfo.is_cardbag_logo">转赠</view>
					<view class="ycd_click_1" v-if="orderInfo.is_cheange_complete == 0 && orderInfo.is_cardbag_logo == 0" @click="clickHandlerShop" :data-ordernumber="orderInfo.ordernumber" :data-cardid="orderInfo.cardid">去兑换</view>
				</view>
			</view>
		</view>
		<view class="ycd_bg">
			<view class="reception-order-view" style="margin-top: 0rpx;">
				<view class="reception-order-text">订单编号：</view>
				<view class="reception-ordersn">{{orderInfo.ordernumber}}</view>
				<view class="reception-order-copy" :data-ordernumber="orderInfo.ordernumber" @click="copy">复制</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">绑卡时间：</view>
				<view class="reception-order-time">{{orderInfo.bind_time}}</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text" >{{orderInfo.giftgiving_status_info}}</view>
				<view class="reception-order-time" >{{orderInfo.giftgiving_time }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ordernumber: '',
				orderInfo: ''
			} 
		},
		onLoad:function(options){
			this.ordernumber = options.ordernumber;
			
		},
		onShow() {
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
		methods: {
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
			clickHandler: function(e){
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: '/pagesub/YearCard/YearCardOrderList?ordernumber='+ordernumber
				})
			},
			clickHandlerShop: function(e){
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let cardid = e.currentTarget.dataset.cardid;
				uni.navigateTo({
					url: `/pagesub/YearCard/YearCardShopList?ordernumber=${ordernumber}&cardid=${cardid}`
				})
			},
			goTransfer: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let iscardbaglogo = e.currentTarget.dataset.iscardbaglogo;
				if(iscardbaglogo == 0){
					uni.navigateTo({
						url: `/pages/shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=1`
					})
				}else{
					uni.navigateTo({
						url: '/pages/index-coupon/ConversionDetails?cardbag=' + ordernumber +'&cardbag_detail_id=' + '0' + '&cardbag_number=' + ordernumber
					});
				}
			},
		}
	}
</script>

<style>
page{
	background-color: #FAFAFA;
}
.ycd_view{
	
}

.ycd_view_bg{
	border-top: 22rpx solid #FAFAFA;
	width: 750rpx;
	/* height: 296rpx; */
	background: #FFFFFF;
}

.ycd_view_top{
	padding: 40rpx 40rpx 30rpx 38rpx;
	display: flex;
	border-bottom: 1px solid #EEEEEE;
}
.ycd_left{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140rpx;
	height: 140rpx;
	background: #F3F3F3;
	border-radius: 4rpx;
}
.ycd_left_img{
	width: 121rpx;
	height: 76rpx;
}
.ycd_right{
	width: 512rpx;
	margin-left: 20rpx;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.ycd_right_title{
	font-size: 30rpx;
	color: #333333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.ycd_right_content{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 24rpx;
}

.ycd_right_content_1{
	font-size: 24rpx;
	color: #999999;
}
.ycd_right_content_2{
	font-size: 24rpx;
	color: #666666;
}

.ycd_view_bottom{
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #FFFFFF;
	padding: 16rpx 40rpx 22rpx 0rpx;
}
.ycd_view_bottom_2{
	display: flex;
}

.ycd_click_1{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140rpx;
	height: 48rpx;
	border-radius: 3rpx;
	border: 1px solid #EB1615;
	font-size: 24rpx;
	color: #EB1615;
	margin-left: 20rpx;
}

.ycd_click_2{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140rpx;
	height: 48rpx;
	border-radius: 3rpx;
	border: 1px solid #979797;
	font-size: 24rpx;
	color: #999999;
	margin-left: 20rpx;
}
.ycd_click_3{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140rpx;
	height: 48rpx;
	border-radius: 3rpx;
	border: 1px solid #979797;
	font-size: 24rpx;
	color: #999999;
	margin-left: 20rpx;
}
.ycd_bg{
	width: 750rpx;
	/* height: 181rpx; */
	background: #FFFFFF;
	border-top: 24rpx solid #FAFAFA;
	padding: 30rpx 36rpx;
}

.reception-order-view{
		display: flex;
		align-items: center;
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
	
</style>
