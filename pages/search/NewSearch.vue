<template>
	<view style="background: #F9FAFE;">
		<view class="search-top flex-vertically" style="background: #FFF;">
			<view class="search-text flex-vertically">
				<!-- <image class="search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image> -->
				<!-- <svg t="1611282088273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="https://www.w3.org/2000/svg" p-id="2507" width="32" height="32"><path d="M887.3 842.05L750.38 705.13C865.55 566.98 858.5 360.7 728.9 231.09c-137.25-137.25-360.56-137.25-497.81 0-137.23 137.25-137.23 360.56 0 497.81C299.72 797.53 389.86 831.83 480 831.83c80.11 0 160.13-27.24 225.13-81.44L842.05 887.3c6.25 6.25 14.44 9.38 22.62 9.38s16.38-3.12 22.62-9.38c12.51-12.5 12.51-32.75 0.01-45.25zM276.34 683.66c-112.28-112.3-112.28-295.02 0-407.31 56.16-56.14 129.91-84.2 203.66-84.2s147.5 28.06 203.66 84.2c112.28 112.3 112.28 295.02 0 407.31-112.32 112.25-295.04 112.25-407.32 0z" p-id="2508" fill="#FF0137"></path></svg> -->
				<icon type="search" size="14" class="search-icon"/>
				<!-- <input type="text" name="input" @blur="value"> -->
				<input type="text" name="input" v-model="Key">
			</view>
			<view class="search-right" @click="search">搜索</view>
		</view>
		
		<view class="search-content">

			<view class="search-title flex-between" v-show="hasHistory">
				<view class="search-title-left">历史搜索</view>
				<view class="search-title-img" @click="daleteHistory"><image class="img" src="../../static/delete.png" mode=""></image></view>
			</view>
			<view class="search-ul" v-show="hasHistory">
				<view class="search-li" v-for="item in historySearchList" @click="searchKey(item)">{{ item }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Key: "",
				hotSearchList:[],
				historySearchList:[]
			} 
		},
		onLoad() {
			this.historySearchList = uni.getStorageSync("historySearchList")||[];
			console.log();
		},
		methods: {
			search:function(){
				let Key = this.Key.replace(/[ ]/g,"");
				if(!Key){
					uni.showToast({
						icon:"none",
						title: "请输入搜索内容"
					})
					return
				}
				this.historySearchList.push(Key);
				uni.setStorageSync("historySearchList", this.historySearchList);
				console.log(this.historySearchList);
				uni.navigateTo({
					url:'../product-list/product-list?type=search&key=' + Key
				})
			},
			searchKey:function(Key) {
				uni.navigateTo({
					url:'../product-list/product-list?type=search&key=' + Key
				})
			},
			daleteHistory: function(){
				this.historySearchList=[];
				uni.setStorageSync("historySearchList", this.historySearchList);
			}
		},
		computed:{
			hasHot: function(){
				return this.hotSearchList.length>0;
			},
			hasHistory: function(){
				return this.historySearchList.length>0;
			}
		}
		
	}
</script>

<style>
	.search-top{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.search-ul{
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
	}
	.search-li{
		padding: 12rpx;
		border-radius: 8rpx;
		background: #fff;
		margin: 4rpx 24rpx;
		margin-left: 0rpx;
	} 
	.search-text{
		height: 48rpx;
		border: 4rpx solid #FF0137;
		margin: 0;
	}
	.search-text input{
		padding: 0;
		width: 100%;
		font-size: 20rpx;
	}
	.search-icon{
		color: #FF0137;
		margin-left: 12rpx;
		margin-right: 12rpx;
	}
	.search-right{
		margin: 0;
		border: none;
		background: linear-gradient(30deg,#FF0137, #FFA0B4);
	}
</style>
