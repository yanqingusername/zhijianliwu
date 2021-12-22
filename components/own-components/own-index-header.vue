<template>
	<view class="owm-index-header" :style="'padding-top:'+ (statusBarHeight + 30)+'px'">
		<!-- <view class="owm-index-header-box"></view> -->
		<view class="z-logo-top">
			<view class="owm-index-status-bar" :style="'height:'+ statusBarHeight+'px'"></view>
			<!-- <image :src="$utils.osspath_url('/xcx-static/index/logo.png')" mode="" mode="heightFix" class="owm-index-logo" @click="goTo()"></image> -->
			<image src="https://zhijianlw.com/static/web/img/logo.png" mode="" mode="heightFix" class="owm-index-logo" @click="goTo()" lazy-load="true"></image>
			
			<view class="fixed-item" v-if="isShowScene">添加到我的小程序，下次不迷路</view>
		</view>
		
		
		<view class="bg">
			<!-- <image :src="$utils.osspath_url('/xcx-static/index/bgs.png')" mode="widthFix" style="width: 100%;"></image> -->
			<view class="owm-index-box">
				<!-- <image :src="$utils.imageUrl(loginUrl)" mode="heightFix" class="owm-index-logo" @click="goTo()"></image> -->
				<!-- <input type="text" placeholder="搜索想要的礼物" class="owm-index-search-box" confirm-type="search"/> -->
				<view class="owm-index-search" @click="goToSearch">
					<image class="owm-index-search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image>
					<!-- <input class="owm-index-search-input" disabled="true" type="text" value="" placeholder="搜索热门礼物" /> -->
					<text class="owm-index-search-input">搜索热门礼物</text>
				</view>
				<view class="owm-index-class-title" @click="$buttonClick(changeClassifi)">分类</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			List: {
				default: [{
					id: 48,
					name: "首页"
				}]
			},
			index: {
				default: 0
			},
			loginUrl: {
				default: ""
			},
			isShowScene:{
				default: true
			}
		},
		data() {
			return {
				Index: 0,
			}
		},
		onLoad() {
			let index = this.index;
			if(index){
				this.Index = this.index;
			}else{
				this.Index = 0;
			}
		},
		methods: {
			change: function(index) {
				this.Index = index;
			},
			goTo: function(){},
			goToSearch: function(){
				uni.navigateTo({
					url: '../../pages/search/search'
				})
			},
			changeClassifi(){ //分类跳转
				uni.navigateTo({
					url:'../classification/classification'
				})
			},
		},
		computed: {
			statusBarHeight: function() {
				// 获取顶部状态栏高度
				return uni.getSystemInfoSync().statusBarHeight;
			},
		},
		watch: {
			Index: function(val) {
				// 如果index发生了改变
				this.$emit('change', this.Index);
			}
		}

	}
</script>

<style scope>
		.owm-index-tab-bar-box{
			position: absolute;
			top: 1080rpx;
		}
		.sticky-box {
		    display: flex;
		    position: -webkit-sticky;
		    position: sticky;
		    top: var(--window-top);
		    z-index: 9999;
		    flex-direction: row;
		    margin: 0px;
		    padding: 1px 0 1px 0;
		    background-color: #F4F5F6;
		}
	.owm-index-header{
		/* padding-top: 80rpx; */
	}
	.z-logo-top{
		font-size: 0;
		padding: 0 26rpx 0;
		position: fixed;
		top: 0; 
		left: 0; 
		width: 100%; 
		z-index: 20;
		background-color: #F2341E;
	}
	.z-logo-top image{
		
	}
	.bg{
		/* margin-top: -60rpx; */
		/* height: 460rpx; */
		/* background: url(https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/index/bgs.png) no-repeat center center/100% 100%; */
		/* background: linear-gradient(133deg, #F32C14 0%, #EB1515 100%); */
		/* background-repeat: no-repeat; */
		/* margin-top: -60rpx; */
		/* padding: 0 26rpx; */
		
		    width: 100%;
		    position: fixed;
		    box-sizing: border-box;
		    height: 95px;
		    background: #F2341E;
		    z-index: 19;
	}
	.owm-index-header-box{
		/* height: 95rpx; */
	}
	.owm-index-header {
		/* background: #FFFFFF; */
		/* position: fixed; */
		/* left: 0; */
		/* top: 0; */
		width: 100%;
		/* z-index: 99; */
	}

	.owm-index-status-bar {
		width: auto;
	}

	.owm-index-box {
		/* display: flex; */
		/* height: 95rpx; */
		width: 100%;
		box-sizing: border-box;
		/* align-items: center; */
		/* justify-content: center; */
		/* margin-left: 30rpx; */
		position: absolute;
		width: 100%;
		padding: 0 26rpx;
		top: 46rpx;
		left: 0;
		display: flex;
	}

	.owm-index-logo {
		/* height: 23px; */
		/* margin: 0 54rpx 0 15rpx; */
		/* width: 173.61rpx; */
		    height: 72rpx;
			margin-bottom: 10rpx;
		    /* margin-top: 70rpx; */
		    /* margin-left: 30rpx; */
		/* background: #33333330; */
	}

	.owm-index-search {
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		border-radius: 50rpx;
		padding: 0rpx 16rpx;
		background: #F9F9F9;
		width: 100%;
		box-sizing: border-box;
		/* display: flex;
		justify-content: space-around;
		align-items: center; */
	}
	.owm-index-search-img{
		width: 28rpx;
		height: 28rpx;
		display: inline-block;
		vertical-align: middle;
		/* position: absolute; */
		/* left: 240rpx; */
	}
	.owm-index-search-input{
		display: inline-block;
		vertical-align: middle;
		/* width: calc(100% - 48rpx); */
		margin-left: 8rpx;
		/* height: 100% */
		color: #AAAAAA;
		font-size: 24rpx;
	}

	.owm-index-tab-bar {
		display: flex;
		height: 64rpx;
	}

	.owm-index-tab-bar-item {
		text-align: center;
		line-height: 64rpx;
		height: 64rpx;
		width: 120rpx;
		margin: 0 24rpx;
	}

	.owm-index-tab-bar-item-active {
		color: #FF0137;
		height: 60rpx;
		border-bottom: 4rpx solid #FF0137;
	}
	
	.owm-index-class-title{
		text-align: right;
		line-height: 32px;
		height: 64rpx;
		width: 90rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
	}
	.fixed-item{
		    position: absolute;
		        right: 38rpx;
		        top: 100rpx;
		        color: #FFFFFF;
		        opacity: 0.65;
		        display: flex;
		        align-items: center;
		        justify-content: center;
		        background-image: url(https://zhijianlw.com/static/web/img/icon_2021_12_18_01.png);
		        width: 366rpx;
		        height: 61rpx;
		        background-size: 366rpx 61rpx;
		        font-size: 24rpx;
		        padding-top: 14rpx;
	}
</style>
