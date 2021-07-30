<template>
	<view class="own-index-coupon-module">
		<!-- <view class="own-index-coupon-activity-top">
			<image lazy-load="true" class="img" src="@/static/lingquan.png" mode=""></image>
		</view> -->
		<!-- <view class="own-index-coupon-activity-top none">领券有优惠,分享抢不停,更多好礼等你来拿!</view> -->
		<view class="own-index-coupon-activity flex-between">
			<view class="own-index-coupon-image-box ones"   @click="recommend" style="overflow: hidden;">
				  <!-- @click="$buttonClick(coupon)" -->
				<text class="baopin">爆品推荐</text>
				<text class="l_title">热卖单品 送就送爆款</text>
				<image lazy-load="true" class="own-index-coupon-activity-left-img" :src="$utils.osspath_url('/xcx-static/index/bg.png')" mode="" style="width: 100%;height: 100%;position:unset"></image>
			</view>
			<view class="own-index-coupon-image-box"  @click="$buttonClick(coupon)" style="overflow: hidden;">
				<text class="carddui">卡册兑换</text>
				<text class="card">输入卡密 一键兑换</text>
				<image lazy-load="true" class="own-index-coupon-activity-left-img" :src="$utils.osspath_url('/xcx-static/index/cardbg.png')" mode="" style="width: 100%;height: 100%;position:unset"></image>
			</view>
			<view class="own-index-coupon-image-box threes"  @click="share" style="overflow: hidden;">
				<text class="member">开通企业会员</text> 
				<text class="mine">自营商品折上折</text>
				<image lazy-load="true" class="own-index-coupon-activity-left-img" :src="$utils.osspath_url('/xcx-static/index/mem.png')" mode="" style="width: 100%;height: 100%;position:unset"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			"coupon_left",
			"coupon_right"
		],
		data() {
			return {
				sta: 0,
				coupon_left: "",
				coupon_right: ""
			}
		},
		onLoad() {
			var sign = uni.getStorageSync('sign');
			if (sign) {
				this.sta = '200';
			}
		},
		methods: {
			// 优惠券   主题下面左边的
			coupon: function(e) {
				uni.navigateTo({
					url: '../index-coupon/index-coupon'
				})
			},
			recommend(){
				uni.navigateTo({
					url:'../Recommend/Recommend'
				})
			},
			// 分享推荐  主题下面右边的
			share: function(e) {
				/*let parent_member = uni.getStorageSync('id');
				this.parent_member = parent_member;
				let data = '{"scene":"' + parent_member + '","page":"pages/signin/signin"}';
				console.log(data)
				let action = 'get_haibao';
				
				this.$utils.post(action, data).then(res => {
					console.log('生成海报', res)
					this.dir = res.dir;
					uni.navigateTo({
							url: '../Poster/Poster?src=' + this.dir + '&parent_member=' + this.parent_member
						})
					
				})*/
				uni.navigateTo({
					url:'../Member/Member'
				})
			}
		},
		computed:{
		}
	}
</script>

<style>
	.own-index-coupon-module{
		width: 720rpx;
		height: 400rpx;
		border-radius: 16rpx;
		padding-top: 11rpx;
		margin: 0 auto;
		/* background: -webkit-linear-gradient(#FF647F,#FF879A,#FFB0BC,#FFE3E5);
		background: linear-gradient(#FF647F,#FF879A,#FFB0BC,#FFE3E5); */
	}
	.own-index-coupon-activity-top{
		width: 519rpx;
		height: 26rpx;
		margin: 0 auto;
		padding: 30rpx 0 18rpx 0;
		font-size: 26rpx;
		color: #FEE5E7;
	}
	.own-index-coupon-activity-top image{
		width: 100%;
		height: 100%;
	}
	.own-index-coupon-activity{
		display: flex;
		justify-content: space-around;
	}
	.own-index-coupon-image-box{
		width: 345rpx;
		height: 156rpx;
		background: #FFF6F7;
		/* border: 1px dashed #ccc; */
		/* border-radius: 16rpx; */
		/* position: relative; */
	}
	.ones{
		    width: 303rpx;
		    height: 360rpx;
	}
	.threes{
		margin-left: 335rpx;
		margin-top: -170rpx;
	}
	.baopin{
		color: #333333;
		font-weight: bold;
		position: relative;
		top: 30rpx;
		left: 70rpx;
		font-size: 18px;
		font-family: "苹方 粗体";
	}
	.l_title{
		position: absolute;
		left: 70rpx;
		margin-top: 100rpx;
		color: #FF6464;
		font-size: 11px;
		font-family: "苹方 中等";
	}
	.carddui{
		position: relative;
		top: 30rpx;
		left: 20rpx;
		font-weight: bold;
		font-size: 16px;
		font-family: "苹方 粗体";
	}
	.card{
		color: #FF962C;
		font-size: 10px;
		position: relative;
		top: 85rpx;
		left: -110rpx;
		font-family: "苹方 中等";
		
	}
	.member{
		position: relative;
		top: 20rpx;
		left: 30rpx;
		font-weight: bold;
		font-size: 16px;
		font-family: "苹方 粗体";
		color: #333333;
	}
	.mine{
		position: relative;
		top: 70rpx;
		left: -165rpx;
		font-size: 10px;
		color: #6BAEFF;
		font-family: "苹方 中等";
	}
	.own-index-coupon-activity-left-img{
		margin-top: -32rpx;
	}
</style>
