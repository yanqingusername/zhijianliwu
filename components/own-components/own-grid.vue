<template>
	<scroll-view class="monthDescTab" scroll-x="true" scroll-with-animation>
		<view class="own-grid-box" :style="'height:'+boxHeight+'rpx'">
				<view class="own-grid-item" v-for="item, index in list" @click="goToTheme" :data-id="item.id">
					<image :src="$utils.imageUrl(item.icon)" mode="" class="own-grid-item-image"></image>
					<view class="own-grid-item-text">
						{{item.name}}
					</view>
				</view>
		</view>
    </scroll-view>
</template>

<script>
	export default {
		props: ["list"],
		data() {
			return {
				list: []
			}
		},
		methods: {
			goToTheme: function(e) {
				let id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: "../product-list/product-list?type=module&key=" + id
				})
			}
		},
		computed:{
			boxHeight: function(){
				return Math.floor(this.list.length/5)*80;
			}
		}
	}
</script>

<style>
	.monthDescTab {
	    width: 100%;
	    white-space: nowrap;
	    font-size: 30rpx;
	    height: 200upx;
	    line-height: 200rpx;
		margin-top: 220rpx;
	}
.own-grid-box{
	width: 600px;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	overflow: hidden;
	margin-top: 30rpx;
}
.own-grid-item{
	width: 120rpx;
	height: 140rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 12rpx;
}
.own-grid-item-image{
	display: block;
	margin: 0 auto;
	width: 82rpx;
	height: 82rpx;
}
.own-grid-item-text{
	width: 120rpx;
	text-align: center;
	margin-top: 28rpx;
	font-size: 12px;
}
</style>
