<template>
	<view>
		<view class="exchange-head" @click="$buttonClick(couponHander)">
			<view class="exchange-head-item">
				<image class="exchange-head-item-img" src="../../static/reception-address-add.png"></image>
				<view class="exchange-head-item-title">绑定礼品卡/册</view>
			</view>
		</view>
		<view class="order-purchase-view" v-for="(item,index) in screenPurchase" :key="index">
			<view class="new-order-li">
				<view class="new-order-li-center">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.img" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.title}}</view>
							<!-- <view class="new-order-item-money">¥{{item.money}}</view> -->
						</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：{{item.sku}}</view>
							<!-- <view class="new-order-item-total">x{{item.number}}</view> -->
						</view>
					</view>
				</view>
				<view class="new-order-li-bottom">
					<view class="new-order-time">
						<view class="new-order-time-text">绑定日期：2021/07/01 12:20:12</view>
						<view class="new-order-time-text" style="margin-top: 6rpx;">有效期至：2022/07/01 12:20:12</view>
					</view>
					<view class="new-order-botton-view">
						<view class="new-order-botton-gray" @click="$buttonClick(refundHandler)">转赠</view>
						<view class="new-order-botton" @click="$buttonClick(receptiondetails)">去兑换</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenPurchase: [
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 180,
						"sku": "礼盒装",
						"number": 3,
						"desc": "退货成功"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 980,
						"sku": "礼盒装",
						"number": 5,
						"desc": "换货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					}
				]
			}
		},
		methods: {
			couponHander: function(e){
				uni.navigateTo({
					url:'./index-coupon'
				})
			},
			receptiondetails: function(e){
				uni.navigateTo({
					url:'./ExchangeOrder'
				})
			},
		}
	}
</script>

<style>
	page{
		background: #F7F7F7;
	}
	.exchange-head{
		width: 700rpx;
		height: 228rpx;
		background: #FFFFFF;
		border: 1px dashed #8D8D8D;
		margin: 20rpx 25rpx 0rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.exchange-head-item{
		display: flex;
		align-items: center;
	}
	.exchange-head-item-img{
		width: 40rpx;
		height: 40rpx;
	}
	.exchange-head-item-title{
		margin-left: 16rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}
	
	.order-purchase-view{
		display: flex;
		align-items: center;
		margin: 20rpx 25rpx 0rpx;
		width: 700rpx;
		height: 275rpx;
		background: #FFFFFF;
	}
	.new-order-li{
		width: 700rpx;
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
		padding: 28rpx 16rpx 25rpx 18rpx;
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
		width: 500rpx;
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
		width: 500rpx;
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
	.reception-order-text{
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
	.new-order-time{
		display: flex;
		flex-direction: column;
	}
	.new-order-time-text{
		font-size: 18rpx;
		color: #999999;
		line-height: 25rpx;
	}
	
	.reception-empty{
		height: 100rpx;
	}
	
	.new-order-li-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15rpx 16rpx 18rpx 18rpx;
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
		/* line-height: 33rpx; */
		/* padding: 6rpx 0rpx; */
		margin-left: 20rpx;
		width: 140rpx;
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
		/* line-height: 33rpx; */
		/* padding: 6rpx 0rpx; */
		width: 140rpx;
	}
</style>
