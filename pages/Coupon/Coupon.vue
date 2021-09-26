<template>
	<view>
		<view class="new-coupon-content" v-if="couponList.length > 0">
			<view class="new-coupon-content-li flex" v-for="(item,index) in couponList" :key="index">
				<image src="https://zhijianlw.com/static/web/img/coupon_bg.png" class="new-coupon-img" lazy-load="true"></image>
				<view class="new-coupon-view">
					<view class="new-coupon-left">
						<view class="new-coupon-lable">¥<text class="new-coupon-money">{{item.money}}</text></view>
						<view class="new-coupon-text">满{{item.full_money}}元可用</view>
					</view>
					<view class="new-coupon-left" style="margin-left: 20rpx;">
						<view class="new-coupon-desc">{{item.title}}</view>
						<view class="new-coupon-coupontype">{{'('+item.type_info+')'}}</view>
					</view>
				</view>
				<view class="new-coupon-right">
					<view class="new-coupon-button" @click="downNow" :data-item="item">立即使用</view>
				</view>
				<view class="new-coupon-time">有效期：{{item.begin_time}}~{{item.end_time}}</view>
			</view>
		</view>
		<view class="apply-success-view" v-if="couponList.length == 0">
			<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
		</view>
		<view class="new-coupon-bottom" @click="expiredCoupon">
			<view class="new-coupon-bottom-text">没有更多可用优惠券 | </view>
			<view class="new-coupon-bottom-text" style="color: #FC6853;margin-left: 6rpx;">查看已失效的优惠券></view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import sr from 'sr-sdk-wxapp';
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
					status: 1
				});
				
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						that.couponList = res.rs;
						if(that.couponList.length > 0){
							for(let item in that.couponList){
								//腾讯有数
								sr.track('expose_coupon', {
								  "coupon": {
								    "coupon_id": item.id,
								    "coupon_name": item.title
								  },
								  "coupon_batch": {
								    "coupon_batch_id": item.coupon_number,
								    "coupon_batch_name": item.type_info
								  },
								})
							}
						}
					}
				})
			},
			downNow: function(e){
				let item = e.currentTarget.dataset.item;
				let name = '全场'
				if(item.type == "0"){
					name = '全场'
				} else if(item.type == "1"){
					name = '单品'
				} else {
					name = '分类'
				}
				uni.navigateTo({
					url: '../../pages/search/search?coupon_type='+item.coupon_type + "&name=" + name
				});
				
				//腾讯有数
				sr.track('trigger_coupon', {
				  "coupon": {
				    "coupon_id": item.id,
				    "coupon_name": item.title
				  },
				  "coupon_batch": {
				    "coupon_batch_id": item.coupon_number,
				    "coupon_batch_name": item.type_info
				  },
				})
			},
			expiredCoupon: function(e) {
				uni.navigateTo({
					url: './ExpiredCoupon'
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
		/* align-items: center; */
		justify-content: center;
		flex-direction: column;
	}
	.new-coupon-lable{
		font-size: 33rpx;
		color: #FB503D;
	}
	
	.new-coupon-money{
		font-size: 55rpx;
		color: #FB503D;
		font-weight: bold;
	}
	.new-coupon-text{
		font-size: 20rpx;
		color: #666666;
		line-height: 28rpx;
		margin-top: 10rpx;
		width: 140rpx;
	}
	.new-coupon-desc{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		line-height: 40rpx;
	}
	.new-coupon-coupontype{
		font-size: 20rpx;
		color: #666666;
		line-height: 28rpx;
		margin-top: 10rpx;
	}
	.new-coupon-right{
		position: absolute;
		top: 68rpx;
		right: 38rpx;
	}
	.new-coupon-button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 144rpx;
		height: 50rpx;
		background: linear-gradient(180deg, #FD8870 0%, #FB503D 100%);
		border-radius: 28rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 33rpx;
	}
	.new-coupon-time{
		position: absolute;
		bottom: 15rpx;
		left: 36rpx;
		font-size: 18rpx;
		color: #999999;
		line-height: 25rpx
	}
	
	.new-coupon-bottom{
		height: 60rpx;
		display: flex;
		align-items: center;
	    justify-content: center;
	}
	.new-coupon-bottom-text{
		font-size: 20rpx;
		color: #999999;
		line-height: 28rpx;
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
</style>
