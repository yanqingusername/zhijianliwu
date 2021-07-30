<template>
	<view class="own-product product" @click="details" :data-keynum="data.keynum">
		<view class="own-image-box" :style="'height:'+boxHeight">
			<image lazy-load="true" :src="$utils.imageUrl(data.head_img)" mode="widthFix" class="own-image" v-if="data.head_img"></image>
			<!-- 无图时的状态 -->
			<image src="../../static/nono.jpg" mode="widthFix" class="own-image" v-else></image>
		</view>
		<!-- 商品名称 -->
		<text class="own-name">{{data.goodsname}}</text>
		<!-- 会员状态 -->
		<view class="own-other-info-box" v-if="level>1">
			<text class="own-discount-price">￥{{data.price}}</text>
			<view class="own-tag-box">
				<view class="own-tag">
					{{level_name}}
				</view>
				<view class="own-tag">
					{{discount_name}}
				</view>
			</view>
		</view>
		<!-- 价格 -->
		<view class="own-price-box">
			<text class="own-price">￥{{price_level}}</text>
			<image class="own-give" src="../../static/fica-give.jpg" mode="heightFix"></image>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			"data":{},
			"boxHeight": {
				default: 'auto'
			}
		},
		data: function(){
			return {
				// data: {
				// 	head_img: "http://zhijianlw.com/static/upload/images/202101/9F199379446FE954B124C86F7DCA904E.png"
				// }
			}
		},
		methods:{
			details:function(e){
				let index = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
		},
		computed:{
			level_name:function(){
				return uni.getStorageSync("level_name");
			},
			level:function(){
				return uni.getStorageSync("level");
			},
			discount_name:function(){
				let data = this.data;
				let level = this.level;
				return (data["price_level" + level] / data.price * 10).toFixed(1) + '折';
			},
			price_level:function(){
				let data = this.data;
				let level = this.level;
				return data["price_level"+(level-1)];
			}
		}
	}
</script>

<style scope>
	.own-product-box{
		/* width: 50%; */

	}
	.own-product{
		/* width: 49%; */
		margin: 12rpx auto;
		height: max-content;
		border-radius: 12.5rpx;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 6rpx #33333330;
		padding: 16rpx 16rpx 24rpx 16rpx;
	}
	.own-image-box{
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		/* border: 1px dashed #ccc; */
		/* background: #333; */
	}
	.own-image{
		width: 100%;
	}
	.own-name{
		height: 2em;
		text-align: justify;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin: 24rpx 0;
		font-size: 0.8em;
	}
	.own-name::after{
		width: 100%;
		display: inline-block;
		content: '';  //这三个都不可以少
	}
	.own-price-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.own-price{
		color: #FF0137;
		font-size: 18px;
		text-align: left;
		white-space: nowrap;
		margin-left: -5rpx;
	}
	.own-discount-price{
		font-size: 12px;
		text-decoration: line-through;
		color: #898989;
	}
	.own-give{
		height:38.19rpx;
		width: 60.7273px;
	}
	.own-other-info-box{
		margin: 20rpx 0rpx 16rpx 0rpx;
		display: flex;
		justify-content: space-between;
	}
	.own-tag{
		display: inline-block;
		padding: 0 11.8rpx;
		font-size: 16rpx;
		line-height: 27rpx;
		height: 27rpx;
		color: #FF0137;
		margin-right: 9.02rpx;
		border: 1px solid #FF0137;
		background: #ffe0db;
		border-radius: 8rpx;
	}
	.own-tag:last-child{
		margin-right: 2rpx;
	}
</style>
