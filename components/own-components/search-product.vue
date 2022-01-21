<template>
	<!-- <view class="post-list"> -->
	<view class="goodslist">
			<view class="goods" @click="details" :data-keynum="post.keynum" :data-dataitem="post" v-for="post in postList" :key="post.id">
				<view class="goods-head">
					<image :src="$utils.imageUrl(post.head_img)" mode=""class="goods-head-img" ></image>
					<!-- <image src="@/static/post-play-button.png" mode=""class="goods-head-label" ></image> -->
				</view>
				<view class="goods-text">{{post.goodsname}}</view>
				<!-- <view class="goods-sub-text uni-ellipsis">{{post.goodstitle}}</view> -->
				<!-- <view class="goods-bottom">
					<view class="goods-bottom-money">¥<text style="font-size: 34rpx;">{{post.price}}</text><image class="goods-members-icon" v-if="post.level_sign == 1" src="../../static/icon_corporate_members.png"></image></view>
					<view class="goods-number" v-if="state == 99">已售{{post.buy_count || 0}}件</view>
					<view class="goods-number" v-else>{{post.buy_count || 0}}人已购</view>
				</view> -->
				<view class="own-other-info-box" v-if="post.level_sign == 1">
					<text class="price-i">￥</text><text style="font-size: 34rpx;color: #FB4133;">{{post.price}}</text>
					<image class="qi" src="../../static/icon_corporate_members.png" mode="widthFix"></image>
				</view>
				<!-- 价格 -->
				<view class="own-price-box">
					<text class="own-discount-price" v-if="post.level_sign == 1">￥{{post.price_level0}}</text>
					<view v-else>
						<text class="price-i">￥</text><text class="own-price" style="font-size: 34rpx;color: #FB4133;">{{post.price}}</text>
					</view>
					<text class="goods-number" v-if="state == 99">已售{{post.buy_count || 0}}件</text>
					<text class="goods-number" v-else>{{post.buy_count || 0}}人已购</text>
				</view>
			</view>
	</view>
	<!-- </view> -->
</template>

<script>
	import sr from 'sr-sdk-wxapp';
	import uma from 'umtrack-wx';
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
			},
			details:function(e){
				// 腾讯有数
				let dataitem = e.currentTarget.dataset.dataitem;
				
				uma.trackEvent('Um_Event_ShoppingDetail', {
					Um_Key_ItemName: dataitem.goodsname,
					Um_Key_ItemID: dataitem.sku
				});
				
				sr.track('trigger_sku_component',
					{
					   "sku": {
						 "sku_id": dataitem.sku, // 若商品无sku_id时，可传spu_id信息
						 "sku_name": dataitem.goodsname // 若商品无sku_name时，可传spu_name信息
					   },
					   "spu": {
							"spu_id": dataitem.sku, // 若商品无spu_id时，可传sku_id信息
							"spu_name": dataitem.goodsname // 若商品无spu_name时，可传sku_name信息
						},
					   "primary_image_url": dataitem.head_img
					})
				  
				let index = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
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
		padding-bottom: 20rpx;
	    /* height: 510rpx; */
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
		height: 76rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 38rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		align-items: center;
		justify-content: center;
		font-family: monospace;
	}
	
	.goods-sub-text{
		margin: 6rpx 20rpx 0rpx;
		font-size: 24rpx;
		color: #999999;
		height: 33rpx;
		line-height: 33rpx;
		/* overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		align-items: center;
		justify-content: center; */
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
		/* line-height: 33rpx; */
	}
	.goods-members-icon{
		width: 38rpx;
		height: 24rpx;
		position: absolute;
		top: 18rpx;
		margin-left: 6rpx;
	}
	
	
	
	.own-other-info-box{
		margin: 20rpx 20rpx 16rpx 20rpx;
	}
	.price-i{
		font-size: 24rpx;
		color: #FB4133;
	}
	.qi{
		width: 40rpx;
		margin-left: 6rpx;
	}
	.own-price-box{
		margin-top: 14rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.own-discount-price{
		font-size: 12px;
		text-decoration: line-through;
		color: #898989;
	}
	.own-price-box .number{
		float: right;
		font-size: 26rpx;
		font-weight: bold;
		color: #999;
	}
</style>
