<template>
	<view class="own-product product" @click="details" :data-keynum="data.keynum">
		<view class="own-image-box">
			<image lazy-load="true" :src="$utils.imageUrl(data.head_img)" mode="widthFix" class="own-image" v-if="data.head_img"></image>
			<!-- 无图时的状态 -->
			<image src="../../static/nono.jpg" mode="widthFix" class="own-image" v-else></image>
		</view>
		
		<view class="z-good-bottom">
			<!-- 商品名称 -->
			<view class="own-name">{{data.goodsname}}</view>
			<view class="own-introduce">这是介绍这是介绍这是介绍这是介绍</view>
			<!-- 会员状态 -->
			<view class="own-other-info-box" v-if="level>1">
				<text class="price-i">￥</text><text class="own-price">{{price_level}}</text>
				<image class="qi" src="../../static/qi.png" mode="widthFix"></image>
				<!-- <view class="own-tag">
					{{level_name}}
				</view>
				<view class="own-tag-box">
					<text class="own-price">￥{{price_level}}</text>
					<text class="own-tag">
						{{discount_name}}
					</text>
				</view> -->
			</view>
			<!-- 价格 -->
			<view class="own-price-box clearfix">
				<text class="own-discount-price" v-if="level>1">￥{{data.price}}</text>
				<block v-else>
					<text class="price-i">￥</text><text class="own-price" style="font-size: 34rpx">{{price_level}}</text>
				</block>
				<text class="number" style="margin-top: 6rpx;">34人已购</text>
				<!-- <image class="own-give" src="../../static/fica-give.jpg" mode="heightFix"></image> -->
			</view>
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
		margin: 0 0 20rpx;
		height: max-content;
		/* border-radius: 12.5rpx; */
		background: #FFFFFF;
		/* box-shadow: 0px 2rpx 6rpx #33333330; */
		/* padding: 16rpx 16rpx 24rpx 16rpx; */
	}
	.own-image-box{
		height: 338rpx;
		background-color: #fff;
		text-align: center;
		width: 100%;
		overflow: hidden;
		/* display: flex;
		justify-content: center;
		align-items: center; */
		/* border: 1px dashed #ccc; */
		/* background: #333; */
	}
	.own-image{
		width: 100%;
		height: 100%;
	}
	.own-name{
		display: block;
		overflow : hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333;
		font-size: 28rpx;
		margin: 0 0 16rpx ;
	}
	.own-name::after{
		width: 100%;
		display: inline-block;
		content: '';  //这三个都不可以少
	}
	.own-introduce{
		color: #999;
		font-size: 24rpx;
		margin-bottom: 24rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.own-price-box{
		margin-top: 14rpx;
		/* display: flex;
		justify-content: space-between;
		align-items: center; */
	}
	.z-good-bottom{
		padding: 16rpx 20rpx 22rpx;
	}
	.own-price{
		color: #FB4133;
		font-size: 24rpx;
		font-weight: bold;
		text-align: left;
		white-space: nowrap;
		/* margin-top: 8rpx; */
		display: inline-block;
	}
	.price-i{
		font-size: 20rpx;
		color: #FB4133;
	}
	.own-price-box .number{
		float: right;
		font-size: 26rpx;
		font-weight: bold;
		color: #999;
	}
	.own-discount-price{
		font-size: 12px;
		text-decoration: line-through;
		color: #898989;
	}
	.own-give{
		float: right;
		height:38.19rpx;
		width: 60.7273px;
	}
	.own-other-info-box{
		margin: 20rpx 0rpx 16rpx 0rpx;
	}
	.own-other-info-box .own-price{
		font-size: 28rpx;
	}
	.qi{
		width: 40rpx;
		margin-left: 6rpx;
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
