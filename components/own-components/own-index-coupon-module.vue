<template>
	<view class="own-index-coupon-module">
		<!-- <view class="own-index-coupon-activity-top">
			<image lazy-load="true" class="img" src="@/static/lingquan.png" mode=""></image>
		</view> -->
		<!-- <view class="own-index-coupon-activity-top none">领券有优惠,分享抢不停,更多好礼等你来拿!</view> -->
		<view class="own-index-coupon-activity flex-between">
			<view class="z-list">
				<view class="own-index-coupon-image-box ones"   @click="recommend(coupon_left[0])" style="overflow: hidden;">
					<!-- @click="$buttonClick(coupon)" -->
					<!-- <view class="z-top-infor" style="padding-top: 42rpx;">
						<text class="baopin" style="margin-bottom: 22rpx;">{{coupon_left[0].name}}</text>
						<text class="l_title">{{coupon_left[0].title}}</text>
					</view> -->
					<image lazy-load="true" class="own-index-coupon-activity-left-img" :src="coupon_left[0].background" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
			<view class="z-list">
				<view class="own-index-coupon-image-box right-item"  @click="$buttonClick(coupon)" style="overflow: hidden; margin-bottom: 20rpx;width: 375rpx;">
					<!-- <view class="z-top-infor" style="padding-top: 40rpx;">
						<text class="carddui">{{coupon_left[1].name}}</text>
						<text class="card">{{coupon_left[1].title}}</text>
					</view> -->
					<image lazy-load="true" class="own-index-coupon-activity-left-img" :src="coupon_left[1].background" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="own-index-coupon-image-box threes right-item"  @click="share" style="overflow: hidden;width: 375rpx;">
					<!-- <view class="z-top-infor" style="padding-top: 40rpx;">
						<text class="member">{{coupon_left[2].name}}</text> 
						<text class="mine">{{coupon_left[2].title}}</text>
					</view> -->
					<image lazy-load="true" class="own-index-coupon-activity-left-img" :src="coupon_left[2].background" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uma from 'umtrack-wx';
	export default {
		props:[
			"coupon_left",
			"coupon_right"
		],
		data() {
			return {
				sta: 0,
				coupon_left: "",
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
				let url = this.coupon_left[1].url;
				if(url){
					uma.trackEvent('Um_Event_Exchange', {
						Um_Key_ItemName: "首页卡册兑换",
						Um_Key_ItemUrl: url
					});
					
					uni.navigateTo({
						url:url
					})
				}
				// uni.navigateTo({
				// 	url: '../index-coupon/index-coupon'
				// })
			},
			recommend(e){
				uma.trackEvent('Um_Event_CinemaTicket', {
					Um_Key_ItemName: "首页电影票",
					Um_Key_ItemUrl: e.url
				});
				
				let url = e.url
				var sign = uni.getStorageSync('sign');
				if (sign) {
					if(url){
						uni.navigateTo({
							url:url
						})
					}
				}else{
					uni.navigateTo({
						url: '/pages/signin/signin'
					})
				}
				// uni.navigateTo({
				// 	url:'../Recommend/Recommend'
				// })
				
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
				
				// var sign = uni.getStorageSync('sign');
				// if (sign) {
				// 	uni.navigateTo({
				// 		url: "/pagesub/CinemaTicket/CinemaTicketHome"
				// 	})
				// }else{
				// 	uni.navigateTo({
				// 		url: '/pages/signin/signin'
				// 	})
				// }
				
				let url = this.coupon_left[2].url;
				if(url){
					uma.trackEvent('Um_Event_OpenMember', {
						Um_Key_ItemName: "首页开通企业会员",
						Um_Key_ItemUrl: url
					});
					
					uni.navigateTo({
						url:url
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
		/* width: 50%; */
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
		width: 300rpx;
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
		color: #999999;
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
		color: #333333;
	}
	.card{
		color: #999999;
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
		color: #999999;
		font-family: "苹方 中等";
	}
	.own-index-coupon-activity-left-img{
		/* margin-top: -32rpx; */
	}
</style>
