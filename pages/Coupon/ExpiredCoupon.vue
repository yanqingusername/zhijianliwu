<template>
	<view>
		<view class="new-coupon-content">
			<view class="new-coupon-content-li flex" v-if="couponList.length > 0" v-for="(item,index) in couponList" :key="index">
				<image :src="[item.out_time == 0 ? 'https://zhijianlw.com/static/web/img/coupon_apply_bg.png' : 'https://zhijianlw.com/static/web/img/coupon_expired_bg.png']" class="new-coupon-img" lazy-load="true"></image>
				<view class="new-coupon-view">
					<view class="new-coupon-left">
						<view class="new-coupon-lable">¥<text class="new-coupon-money">{{item.money}}</text></view>
						<view class="new-coupon-text">满{{item.full_money}}元可用</view>
					</view>
					<view class="new-coupon-left" style="margin-left: 80rpx;">
						<view class="new-coupon-desc">{{item.title}}</view>
						<view class="new-coupon-coupontype">{{'('+item.type_info+')'}}</view>
					</view>
				</view>
				
				<view class="new-coupon-time">有效期：{{item.begin_time}}~{{item.end_time}}</view>
			</view>
			<view class="apply-success-view" v-if="couponList.length==0">
				<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
				<view class="apply-success-text">当前暂无数据～</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				couponList: []
			}
		},
		onLoad: function(e) {
			
		},
		onShow() {
			this.getCouponList();
		},
		methods: {
			getCouponList(){
				let that = this;
				let action = "get_coupon_number_list";
				let controller = 'coupon';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					memberid: memberid,
					status: 2
				});
				
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						that.couponList = res.rs;
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #FAFAFA;
	}
	.new-coupon-content{
		width: 708rpx;
		margin: 0 auto 26rpx auto;
	}
	.new-coupon-content-li{
		width: 708rpx;
		height: 190rpx;
		position: relative;
		margin-top: 20rpx;
	}
	.new-coupon-img{
		width: 708rpx;
		height: 190rpx;
	}
	
	.new-coupon-view{
		/* position: absolute;
		top: 40rpx;
		left: 36prx; */
		margin-top: 40rpx;
	    margin-left: 36rpx;
	    position: absolute;
	    display: flex;
	}
	
	.new-coupon-left{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.new-coupon-lable{
		font-size: 33rpx;
		color: #CCCCCC;
	}
	
	.new-coupon-money{
		font-size: 55rpx;
		color: #CCCCCC;
		font-weight: bold;
	}
	.new-coupon-text{
		font-size: 20rpx;
		color: #CCCCCC;
		line-height: 28rpx;
		margin-top: 10rpx;
	}
	.new-coupon-desc{
		font-size: 28rpx;
		font-weight: bold;
		color: #CCCCCC;
		line-height: 40rpx;
	}
	.new-coupon-coupontype{
		font-size: 20rpx;
		color: #CCCCCC;
		line-height: 28rpx;
		margin-top: 10rpx;
	}
	
	
	.new-coupon-time{
		position: absolute;
		bottom: 15rpx;
		left: 36rpx;
		font-size: 18rpx;
		color: #CCCCCC;
		line-height: 25rpx
	}
	
	.apply-success-view{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.apply-success-img{
		width: 255rpx;
		height: 180rpx;
		margin-top: 172rpx;
	}
	.apply-success-text{
		padding: 60rpx 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		line-height: 48rpx;
	}
	
</style>
