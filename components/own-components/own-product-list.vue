<!-- TODO 高度差的问题回头解决吧 TMD 烦死了 -->
<template>
	<view class="own-product-list">
		<!-- 有商品 -->
		<!-- <view class="own-product-row" v-if="commody.length>0">
			<view class="own-product-column" id="own-product-column-1">
				<own-product v-for="item in commody1" :data="item" :key="index" boxHeight="300rpx"></own-product>
			</view>
			<view class="own-product-column"id="own-product-column-2">
				<own-product v-for="item in commody2" :data="item" :key="index" boxHeight="300rpx"></own-product>
			</view>
		</view> -->
		<view v-if="commody.length > 0">
			<search-product :postList="commody" :state="state"></search-product>
		</view>
		<!-- 无商品是状态 -->
		<!-- <view class="own-product-row" v-else>
			<image lazy-load="true" class="own-no-product" src="../../static/nobtm.jpg" mode="aspectFit"></image>
		</view> -->
		<view class="apply-success-view" v-if="commody.length==0">
			<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
			<view class="apply-success-text">当前搜索暂无数据～</view>
		</view>
		<!-- 状态 -->
		<!-- <view class="own-product-bottom" v-show="state==200">已经到底了~</view>
		<view class="own-product-bottom" v-show="state==0">正在加载中~</view> -->
		<view class="post-bottom" v-if="commody.length > 0">
			<view class="post-bottom-line"></view>
			<view class="post-bottom-text">我是有底线的</view>
			<view class="post-bottom-line"></view>
		</view>
		
	</view>
</template>

<script>
	import ownProduct from "@/components/own-components/search-product.vue";
	export default {
		components:{
			// 商品块状
			"search-product": ownProduct,
			// 返回顶部
		},
		props:{
			commody: {
				default: []
			},	// 商品列表
			state: {
				default: ""
			},	// 状态
		},
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			
		},
		computed:{
			commody1: function(){
				let commody = [];
				this.commody.forEach((item, index)=>{
					if(index%2!=0){
						commody.push(item)
					}
				})
				return commody;
			},
			commody2: function(){
				var commody = [];
				this.commody.forEach((item, index)=>{
					if(index%2==0){
						commody.push(item)
					}
				})
				return commody;
			}
		},
	}
</script>

<style scope>
.own-product-row{
	font-size: 0!important;
	margin-top: 22rpx;
	padding: 0 16rpx;
	box-sizing: border-box;
}
.own-product-column{
	width: 50%;
	display: inline-block;
	padding: 0 10rpx;
	box-sizing: border-box;
	vertical-align: top;
}
.own-product-bottom{
	/* height: 32rpx; */
	color: #666666;
	text-align: center;
	padding: 20rpx 0;
}

.post-bottom{
		display: flex;
		align-items: center;
		color: #B3B3B3;
		text-align: center;
		padding-top: 24rpx;
		padding-bottom: 48rpx;
		justify-content: center;
	}
	.post-bottom-text{
		font-size: 24rpx;
		color: #B3B3B3;
		line-height: 33rpx;
		margin: 0rpx 18rpx;
	}
	.post-bottom-line{
		width: 240rpx;
		height: 1px;
		background: #E0E0E0;
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
	.apply-success-text{
		padding: 60rpx 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		line-height: 48rpx;
	}
</style>
