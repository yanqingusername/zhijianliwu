<template>
	<view class="goodslist">
		<block v-for="(post, index) in postList" :key="index">
			<view class="goods" @click="goToPost(post.id)">
				<view class="goods-head">
					<image :src="$utils.imageUrl(post.title_img)" mode=""class="goods-head-img" ></image>
					<!-- <image src="@/static/post-play-button.png" mode=""class="goods-head-label" ></image> -->
				</view>
				<view class="goods-text">{{post.title}}</view>
				<view class="goods-bottom" @click.stop="clickLike(post.id,index,post.is_collect)">
					<image v-if="post.is_collect == 1" src="@/static/icon-post-like-now.png" mode=""class="goods-bottom-img" ></image>
					<image v-else src="@/static/post-like.png" mode=""class="goods-bottom-img" ></image>
					<view class="goods-number">{{post.live_number || 0}}</view>
				</view>
			</view>
		</block>
	</view>
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
			goToPost: function(id){
				uni.navigateTo({
					url:'../../pages/Post/Post?id='+id
				})
			},
			clickLike: function(id,index,is_collect){
				this.$emit("clickLike", id,index,is_collect);
			},
		},
		computed:{
			
		}
	}
</script>

<style scoped>
	.goodslist {
	  padding: 20rpx 24rpx;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  padding-bottom: 10rpx;
	}
	
	.goods {
	    width: 338rpx;
	    margin-bottom: 20rpx;
	    background: #FFFFFF;
	    border-radius: 10rpx;
	    position: relative;
	    height: 580rpx;
	}
	
	.goods-head {
	    position: relative;
	    width: 338rpx;
	    height: 420rpx;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}
	
	.goods-head-img{
		width: 100%;
		height: 420rpx;
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
		height: 84rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: 42rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		align-items: center;
		justify-content: center;
	}
	
	.goods-bottom{
		display: flex;
		position: absolute;
		bottom: 10rpx;
		right: 0rpx;
		margin-right: 20rpx;
		flex-direction: row;
		align-items: center;
	}
	
	.goods-bottom-img{
		width: 40rpx;
		height: 40rpx;
	}
	
	.goods-number{
		font-size: 26rpx;
		color: #888888;
	}
</style>
