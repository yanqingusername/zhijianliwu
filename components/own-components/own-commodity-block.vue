<template>
	<view class="own-commodity-block-box">
		<view class="own-commodity-block-title-box">
		礼品精选
		</view>
		<view class="own-commodity-block-move" @click="move">
			更多>
		</view>
		<scroll-view scroll-x="true" class="own-commodity-block" enable-flex="true">
			<view class="own-commodity commodity" @click="details" :data-keynum="data.keynum" v-for="data,index in commody" :key="index">
				<view class="own-commodity-image-box">
					<image :src="$utils.imageUrl(data.head_img)" mode="widthFix" class="own-commodity-image" v-if="data.head_img"></image>
					<!-- 无图时的状态 -->
					<image src="../../static/nono.jpg" mode="widthFix" class="own-commodity-image" v-else></image>
				</view>
				<!-- 商品名称 -->
				<view class="own-commodity-name">{{data.goodsname}}</view>
				<!-- 价格 -->
				<view class="own-commodity-price-box">
					<text class="own-commodity-price">￥{{data['price_level'+level]}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:[
			"commody"
		],
		data() {
			return {
				data:{
					goodsname: "",
				},
			}
		},
		onLoad() {
			console.log(this.commody);
		},
		methods: {
			details:function(e){
				let index = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
			move:function(){
				uni.navigateTo({
					url: "/pages/Recommend/Recommend"
				})
			}
		},
		computed:{
			level:function(){
				return uni.getStorageSync("level");
			}
		}
	}
</script>

<style scope>
	.own-commodity-block-box{
		width: 720rpx;
		margin: 0 auto;
		background-color: rgb(255, 201, 210);
		border-radius:  16rpx;
	}
	.own-commodity-block-title-box{
		text-align: center;
		height: 54rpx;
		line-height: 64rpx;
		padding-top: 8rpx;
	}
	.own-commodity-block-move{
		font-size: 12px;
		right: 8rpx;
		float: right;
		height: 54rpx;
		line-height: 64rpx;
		padding-top: 8rpx;
		margin-top: -64rpx;
		margin-right: 16rpx;
	}
	.own-commodity-block{
		width: 98%;
		height: 320rpx;
		/* width: max-content; */
		display: flex;
		padding: 4rpx 8rpx;
	}
	.own-commodity{
		display: block;
		width: 180rpx;
		margin: 12rpx 8rpx;
		height: max-content;
		border-radius: 12.5rpx;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 6rpx #33333330;
		padding: 16rpx 16rpx 24rpx 16rpx;
	}
	.own-commodity:first-child{
		margin-left: 0;
	}
	.own-commodity:last-child{
		margin-right: 0;
	}
	.own-commodity-image-box{
		width: 100%;
		height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}
	.own-commodity-image{
		width: 100%;
	}
	.own-commodity-name{
		width: 100%;
		text-align: justify;
		/* display: -webkit-box; */
		margin: 8rpx 0;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
	}
	.own-commodity-name::after{
		width: 100%;
		display: inline-block;
		content: '';  //这三个都不可以少
	}
	.own-commodity-price-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.own-commodity-price{
		color: #FF0137;
		font-size: 12px;
		text-align: left;
		white-space: nowrap;
	}
</style>
