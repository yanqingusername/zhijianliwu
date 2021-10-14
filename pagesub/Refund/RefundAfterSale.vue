<template>
	<view class="sale-view" :style="'height:'+ (isreception == 0 ? '260' : '130')+'rpx;'">
		<view class="sale-content flex-between" @click="routeHandler" data-typerefund="2">
			<view class="sale-content-left">
				<image class="sale-content-img" src="../../static/icon_exchange_goods.png"></image>
				<view class="sale-content-title">换货</view>
			</view>
			<view class="sale-content-right">
				<view class="sale-content-text">更换收到的商品</view>
				<image class="sale-content-ar" src="../../static/icon_arrow_r_m.png"></image>
			</view>
		</view>
		<view class="sale-line" v-if="isreception == 0"></view>
		<view class="sale-content flex-between" v-if="isreception == 0" @click="routeHandler" data-typerefund="3">
			<view class="sale-content-left">
				<image class="sale-content-img" src="../../static/icon_return_goods.png"></image>
				<view class="sale-content-title">退货</view>
			</view>
			<view class="sale-content-right">
				<view class="sale-content-text">退回收到的商品</view>
				<image class="sale-content-ar" src="../../static/icon_arrow_r_m.png"></image>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				ordernumber: '',
				isreception: 0
			}
		},
		onShow:function(e){
			
			 
		},
		onLoad:function(e){	
			this.ordernumber = e.ordernumber;
			this.isreception = e.isreception;
		},
		methods: { 
			routeHandler: function(e) {
				let typerefund = e.currentTarget.dataset.typerefund;
				uni.redirectTo({
					url: `./ExchangeGoods?ordernumber=${this.ordernumber}&typerefund=${typerefund}`
				})
			},
		}
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	.sale-view{
		    height: 260rpx;
		    background: #FFFFFF;
		    margin-top: 22rpx;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    padding: 0rpx 24rpx 0rpx 26rpx;
	}
	.sale-content{
		height: 130rpx;
		width: 100%;
	}
	.sale-content-left{
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}
	
	.sale-content-title{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		line-height: 40rpx;
		margin-left: 14rpx;
	}
	.sale-content-right{
		display: flex;
		align-items: center;
		margin-right: 6rpx;
	}
	.sale-content-text{
		font-size: 24rpx;
		color: #AAAAAA;
		line-height: 33rpx;
	}
	.sale-content-img{
		width: 44rpx;
		height: 44rpx;
	}
	.sale-content-ar{
		width: 24rpx;
		height: 24rpx;
		margin-left: 6rpx;
	}
	.sale-line{
		width: 700rpx;
		height: 1px;
		background: #E6E6E6;
	}
</style>
