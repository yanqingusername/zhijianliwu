<template>
	<!-- <view class="post-list"> -->
	<view class="goodslist">
			<view class="goods" @click="goToPost(post.keynum)" v-for="post in postList" :key="post.id">
				<view class="goods-head">
					<image :src="$utils.imageUrl(post.head_img)" mode=""class="goods-head-img" ></image>
					<!-- <image src="@/static/post-play-button.png" mode=""class="goods-head-label" ></image> -->
				</view>
				<view class="goods-text">{{post.goodsname}}</view>
				<view class="goods-sub-text">{{post.goodstitle}}</view>
				<view class="goods-bottom">
					<view class="goods-bottom-money">¥<text style="font-size: 34rpx;">{{post.price}}</text><image class="goods-members-icon" v-if="post.level_sign == 1" src="../../static/icon_corporate_members.png"></image></view>
					<view class="goods-number" v-if="post.buy_count">{{post.buy_count}}人已购</view>
				</view>
			</view>
	</view>
	<!-- </view> -->
</template>

<script>
	export default {
		props:{
			postList: {
				default: []
			},	// 商品列表
			state: {
				default: ""
			},	// 状态
		},
		data: function(){
			return {
				
			}
		},
		methods:{
			goToPost: function(keynum){
				uni.navigateTo({
					url:'../../pages/details/details?keynum='+keynum
				})
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped>
	.post-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #F8F8F8;
		padding: 20rpx 25rpx;
	}
	.goodslist {
	  /* padding: 20rpx 26rpx; */
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  padding-bottom: 10rpx;
	  background: #F8F8F8;
	  padding: 20rpx 25rpx;
	  /* width: 700rpx; */
	  /* background: #F8F8F8; */
	}
	
	.goods {
	    width: 338rpx;
	    margin-bottom: 20rpx;
	    background: #FFFFFF;
	    border-radius: 10rpx;
	    position: relative;
	    height: 510rpx;
	}
	
	.goods-head {
	    position: relative;
	    width: 338rpx;
	    height: 338rpx;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}
	
	.goods-head-img{
		width: 100%;
		height: 338rpx;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}
	.goods-head-label{
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width:41rpx;
		height:41rpx;
	}
	
	.goods-text {
		margin: 18rpx 20rpx 0rpx;
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		align-items: center;
		justify-content: center;
	}
	
	.goods-sub-text{
		margin: 6rpx 20rpx 0rpx;
		font-size: 24rpx;
		color: #999999;
		height: 33rpx;
		line-height: 33rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		align-items: center;
		justify-content: center;
	}
	
	.goods-bottom{
		display: flex;
		margin: 10rpx 20rpx 10rpx;
		justify-content: space-between;
		align-items: center;
	}
	
	.goods-bottom-money{
		font-size: 24rpx;
		color: #FB4133;
		line-height: 33px;
		position: relative;
	}
	
	.goods-number{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
	}
	.goods-members-icon{
		width: 38rpx;
		height: 24rpx;
		position: absolute;
		top: 18rpx;
		margin-left: 6rpx;
	}
</style>
