<!-- TODO 高度差的问题回头解决吧 TMD 烦死了 -->
<template>
	<view class="own-product-list">
		<!-- 有商品 -->
		<view class="own-product-row" v-if="commody.length>0">
			<view class="own-product-column" id="own-product-column-1">
				<own-product v-for="item in commody1" :data="item" boxHeight="300rpx"></own-product>
			</view>
			<view class="own-product-column"id="own-product-column-2">
				<own-product v-for="item in commody2" :data="item" boxHeight="300rpx"></own-product>
			</view>
		</view>
		<!-- 无商品是状态 -->
		<view class="own-product-row" v-else>
			<image lazy-load="true" class="own-no-product" src="../../static/nobtm.jpg" mode="aspectFit"></image>
		</view>
		<!-- 状态 -->
		<view class="own-product-bottom" v-show="state==200">已经到底了~</view>
		<view class="own-product-bottom" v-show="state==0">正在加载中~</view>
	</view>
</template>

<script>
	import ownProduct from "@/components/own-components/own-product.vue";
	export default {
		components:{
			// 商品块状
			"own-product": ownProduct,
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
	display: flex;
	justify-content: space-around;
	margin-top: 30rpx;
}
.own-product-column{
	width: 46%;
	display: flex;
	flex-direction: column;
}
.own-product-bottom{
	height: 32rpx;
	color: #666666;
	text-align: center;
}
</style>
