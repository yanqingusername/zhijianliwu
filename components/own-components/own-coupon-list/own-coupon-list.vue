<template>
	<view>
		<view class="own-coupon-list-start" @click="showCouponList()">
			领劵
		</view>
		<view class="own-coupon-list-layer" v-show="listShow" @click="hideCouponList()">
		</view>
		<view class="own-coupon-list-box" v-show="listShow">
			<view class="own-coupon-list">
				<view class="own-coupon" v-for="item,index in list" :key="index">
					<own-coupon :coupon='item'></own-coupon>
				</view>
			</view>
			<view class="own-coupon-list-button" @click="hideCouponList()">
				<text>确定</text>
			</view>
		</view>

	</view>
</template>

<script>
	import ownCoupon from "@/components/own-components/own-coupon/own-coupon.vue";
	export default {
		props:{
			"list":{
				default: []
			}
		},
		components:{
			// 商品块状
			"own-coupon": ownCoupon
			// 返回顶部
		},
		data() {
			return {
				listShow: false
			}
		},
		methods: {
			showCouponList(){
				this.listShow = true;
			},
			hideCouponList(){
				this.listShow = false;
			}
		}
	}
</script>

<style>
	.own-coupon-list-start{
		border-radius: 50rpx 0 0 50rpx;
		color: #FFFFFF;
		background-color: rgba(255, 1, 55, 1);
		width: 100rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;

	}
	.own-coupon-list-layer{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 998;
	}
	.own-coupon-list-box{
		width: 100%;
		height: max-content;
		border-radius: 32rpx 32rpx 0 0;
		background: #FFF;
		box-shadow: 0 0 6rpx 0rpx rgba(0, 0, 0, 0.3);
		position: fixed;
		padding-top: 40rpx;
		top: auto;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}
	.own-coupon-list{
		width: 90%;
		margin: 0 auto;
	}
	.own-coupon{
		margin-bottom: 24rpx;
	}
	.own-coupon-list-button{
		width: 90%;
		margin: 0 auto;
		height: 64rpx;
		line-height: 64rpx;
		color: #fff;
		border-radius: 16rpx;
		text-align: center;
		background-color: rgba(255, 1, 55, 1);
		margin-bottom: 24rpx;
	}
	.own-coupon-list-button text{
		display: inline-block;
		font-size: 1.2em;
		width: 120rpx;
		text-align-last: justify;
	}
</style>
