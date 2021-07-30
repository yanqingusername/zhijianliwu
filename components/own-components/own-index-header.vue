<template>
	<view class="owm-index-header">
		<view class="owm-index-header-box"></view>
		<view class="owm-index-status-bar" :style="'height:'+ statusBarHeight+'px'"></view>
		<view class="bg">
			<!-- <image :src="$utils.osspath_url('/xcx-static/index/bgs.png')" mode=""></image> -->
			<view class="">
				<image :src="$utils.osspath_url('/xcx-static/index/logo.png')" mode="" mode="heightFix" class="owm-index-logo" @click="goTo()"></image>
			</view>
			<view class="owm-index-box">
				<!-- <image :src="$utils.imageUrl(loginUrl)" mode="heightFix" class="owm-index-logo" @click="goTo()"></image> -->
				<!-- <input type="text" placeholder="搜索想要的礼物" class="owm-index-search-box" confirm-type="search"/> -->
				<view class="owm-index-search" @click="goToSearch">
					<image class="owm-index-search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image>
					<input class="owm-index-search-input" disabled="true" type="text" value="" placeholder="搜索热门礼物" />
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="owm-index-tab-bar-box"  show-scrollbar="false">
			<view class="owm-index-tab-bar  sticky-box">
				<view class="owm-index-tab-bar-item" :class="[Index==item.id?'owm-index-tab-bar-item-active':'']" v-for="item, index in List"
				 @click="change(item.id)">{{item.name}}</view> 
			</view>
		</scroll-view>
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
			}
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
	.bg{
		width: 100%;
		height: 350rpx;
		background-image: url(https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/index/bgs.png);
		background-size: 753rpx 300rpx;
		background-repeat: no-repeat;
		margin-top: -60rpx;
	}
	.owm-index-header-box{
		/* height: 95rpx; */
	}
	.owm-index-header {
		/* background: #FFFFFF; */
		position: fixed; 
		left: 0; 
		top: 0;
		width: 100%;
		z-index: 99;
	}

	.owm-index-status-bar {
		width: auto;
	}

	.owm-index-box {
		display: flex;
		height: 95rpx;
		width: 90%;
		align-items: center;
		justify-content: center;
		margin-left: 30rpx;
		margin-top: -50rpx;
	}

	.owm-index-logo {
		/* height: 23px; */
		/* margin: 0 54rpx 0 15rpx; */
		/* width: 173.61rpx; */
		    height: 50rpx;
		    margin-top: 70rpx;
		    margin-left: 30rpx;
		/* background: #33333330; */
	}

	.owm-index-search {
		height: 60rpx;
		text-align: center;
		border-radius: 50rpx;
		padding: 0rpx 16rpx;
		background: #F9F9F9;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.owm-index-search-img{
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		left: 240rpx;
	}
	.owm-index-search-input{
		width: calc(100% - 48rpx);
		margin-left: 8rpx;
		height: 28rpx;
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
</style>
