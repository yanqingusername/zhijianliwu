<template>
	<view class="own-index-coupon-module">
		<!-- <view class="own-index-coupon-activity-top">
			<image lazy-load="true" class="img" src="@/static/lingquan.png" mode=""></image>
		</view> -->
		<!-- <view class="own-index-coupon-activity-top none">领券有优惠,分享抢不停,更多好礼等你来拿!</view> -->
		<view class="own-index-coupon-activity flex-between">
			<view class="z-list">
				<view class="own-index-coupon-image-box ones"   @click="recommend" style="overflow: hidden;">
					<!-- @click="$buttonClick(coupon)" -->
					<view class="z-top-infor">
						<text class="baopin">爆品推荐</text>
						<text class="l_title">热卖单品 送就送爆款</text>
					</view>
					<image lazy-load="true" class="own-index-coupon-activity-left-img" src="https://zhijianlw.com/static/web/img/bg.png" mode="widthFix" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
			<view class="z-list">
				<view class="own-index-coupon-image-box right-item"  @click="$buttonClick(coupon)" style="overflow: hidden; margin-bottom: 20rpx;">
					<view class="z-top-infor">
						<text class="carddui">卡册兑换</text>
						<text class="card">输入卡密 一键兑换</text>
					</view>
					<image lazy-load="true" class="own-index-coupon-activity-left-img" src="https://zhijianlw.com/static/web/img/cardbg.png" mode="widthFix" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="own-index-coupon-image-box threes right-item"  @click="share" style="overflow: hidden;">
					<view class="z-top-infor">
						<!-- <text class="member">开通企业会员</text> 
						<text class="mine">自营商品折上折</text> -->
						<text class="member">看电影</text> 
						<text class="mine">特惠专享低至五折</text>
					</view>
					<image lazy-load="true" class="own-index-coupon-activity-left-img" src="https://zhijianlw.com/static/web/img/mem.png" mode="widthFix" style="width: 100%;height: 100%;"></image>
				</view>
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
				coupon_left1: "",
				coupon_right1: ""
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
				
				var sign = uni.getStorageSync('sign');
				if (sign) {
					uni.navigateTo({
						url: "/pagesub/CinemaTicket/CinemaTicketHome"
					})
				}else{
					uni.navigateTo({
						url: '/pages/signin/signin'
					})
				}
				
				
				// let level_name = uni.getStorageSync("level_name");
				// let typestring = 1;
				// if(level_name=='企业会员'){
				// 	typestring = 2;
				// }
				// uni.navigateTo({
				// 	url:`../Member/Member?typestring=${typestring}`
				// })
			}
		},
		computed:{
		}
	}
</script>

<style>
	.own-index-coupon-module{
		padding: 0 16rpx;
		/* width: 720rpx; */
		/* height: 400rpx; */
		/* border-radius: 16rpx; */
		/* padding-top: 11rpx; */
		/* margin: 0 auto; */
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
		font-size: 0;
	}
	.z-list{
		display: inline-block;
		width: 50%;
		padding: 0 10rpx;
		box-sizing: border-box;
	}
	
	.own-index-coupon-image-box{
		background: #FFF6F7;
		position: relative;
		font-size: 0;
		/* border: 1px dashed #ccc; */
		/* border-radius: 16rpx; */
		/* position: relative; */
	}
	.own-index-coupon-image-box image{
		position: absolute;
		bottom: 0;
	}
	.ones{
		width: 100%;
		height: 330rpx;
	}
	.right-item{
		height: 155rpx;
		display: block;
	}
	.z-top-infor{
		position: relative;
		z-index: 1;
		padding: 30rpx 26rpx;
	}
	
	.z-top-infor text{
		display: block;
	}
	.z-top-infor text:first-child{
		margin-bottom: 14rpx;
	}
	.ones .z-top-infor text{
		text-align: center;
	}
	.baopin{
		color: #333333;
		font-weight: bold;
		/* position: relative;
		top: 30rpx;
		left: 70rpx; */
		font-size: 18px;
		font-family: "苹方 粗体";
	}
	.l_title{
		/* position: absolute; */
		/* left: 70rpx; */
		/* margin-top: 100rpx; */
		color: #FF6464;
		font-size: 11px;
		font-family: "苹方 中等";
	}
	.carddui{
		/* position: relative; */
		/* top: 30rpx; */
		/* left: 20rpx; */
		font-weight: bold;
		font-size: 16px;
		font-family: "苹方 粗体";
	}
	.card{
		color: #FF962C;
		font-size: 10px;
		/* position: relative; */
		/* top: 85rpx; */
		/* left: -110rpx; */
		font-family: "苹方 中等";
		
	}
	.member{
		/* position: relative; */
		/* top: 20rpx; */
		/* left: 30rpx; */
		font-weight: bold;
		font-size: 16px;
		font-family: "苹方 粗体";
		color: #333333;
	}
	.mine{
		/* position: relative; */
		/* top: 70rpx; */
		/* left: -165rpx; */
		font-size: 10px;
		color: #6BAEFF;
		font-family: "苹方 中等";
	}
	.own-index-coupon-activity-left-img{
		/* margin-top: -32rpx; */
	}
</style>
