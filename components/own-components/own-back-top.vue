<template>
	<view class="own-back-top" @click="toTop" v-show="show">
		<view class="own-horn"></view>
		<view class="own-text">顶部</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				default: false
			}
		},
		data() {
			return {
			}
		},
		methods: {
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100,
				});
			}
		},
		// onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
		// 	let windowHeight = uni.getSystemInfoSync().windowHeight;
		// 	if (e.scrollTop < windowHeight*this.heightRatio) {
		// 		this.Show = false;
		// 	}else{
		// 		console.log("应该粗线了");
		// 		this.Show = true;
		// 	}
		// },
	}
</script>

<style>
	.own-back-top {
		width: 110rpx;
		height: 110rpx;
		position: fixed;
		right: 31rpx;
		border-radius: 50%;
		border: 2rpx solid #BFBFBF;
		bottom: 70rpx;
		background-color: #FFF;
		z-index: 3;
	}

	.own-horn {
		margin: 20rpx auto 10rpx auto;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		width: 20rpx;
		height: 20rpx;
		border: 2rpx solid;
		border-color: #000000 transparent transparent #000000;
		border-top-right-radius: 5rpx;
		border-bottom-left-radius: 5rpx;
		border-bottom-right-radius: 5rpx;
	}

	.own-text {
		font-size: 29rpx;
		text-align: center;
	}
</style>
