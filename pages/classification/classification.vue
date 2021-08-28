<template>
	<view>
		<view class="post-search-top flex-vertically">
			<view class="search-text flex-vertically" @click="goToSearch">
				<icon type="search" size="14" class="search-icon"/>
				<input type="text" disabled="true" value="" placeholder="搜索热门礼物">
			</view>
			<!-- <view class="post-search-right" @click="search">搜索</view> -->
		</view>
		
		<view class="post-list flex-between border-top">
				<!-- 内容 -->
				<scroll-view scroll-y="true" class="classifi-left" :style="{height:height + 'px'}" style="scrollbars:none;"
				 show-scrollbar=true>
					<view class="classifi-left-li" :key="index" :class="[leftIndex==index?'classifi-left-li-active':'']" @click="bind" :data-keynum="item.keynum"
					 :data-index="index" v-for="(item,index) in leftList">{{item.name}}</view>
				</scroll-view>
				<view class="classifi-right">
					<view class="classifi-list">
						<block v-for="classifi in rightList" >
							<view class="classifi-goods" @click="goToPost(classifi.keynum,classifi.name)">
								<image :src="classifi.icon" mode=""class="classifi-bottom-img" ></image>
								<view class="classifi-number">{{classifi.name}}</view>
							</view>
						</block>
					</view>
				</view>
			<!-- <view class="post-bottom" v-if="isAll">
				-- 我是有底线的 --
			</view> -->
		</view>
		
		<!-- <view class="apply-success-view">
			<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
			<view class="apply-success-text">当前搜索暂无数据～</view>
		</view> -->
		
		<view class="post-scroll-top" @click="goToScrollTop">
			<image class="post-scroll-top-img" src="@/static/post-scroll-top-img.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				isAll: false,
				height: '',
				leftIndex: 0,
				leftList: [],
				rightList: [],
				parentId: ""
			} 
		},
		onLoad() {
			let that = this;
			let action = "get_scene_category_list";
			let controller = 'scenecategory';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				keynum: ""
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.leftList = res.rs;
					let parentId = res.rs[0].keynum;
					that.getCategoryList(parentId);
				} 
			});
			
			// 高度
			uni.getSystemInfo({
				success: res => {
					this.height = res.windowHeight - res.statusBarHeight - (134 / res.pixelRatio);
				}
			})
		},
		onPullDownRefresh:function(){
			
		},
		onReachBottom:function(){
			
		},
		methods: {
			getCategoryList(parentId){
				let that = this;
				let action = "get_scene_category_list";
				let controller = 'scenecategory';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					keynum: parentId
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						that.rightList = res.rs;
					} 
				});
			},
			goToPost: function(keynum,name){
				console.log(keynum,name)
				uni.navigateTo({
					url: '../../pages/search/search?keynum='+keynum + "&name=" + name
				});
			},
			goToScrollTop: function(){
				uni.pageScrollTo({
					scrollTop: 0, 
					duration: 1000
				})
			},
			bind: function(e) {
				let index = e.currentTarget.dataset.index;
				let parentId = e.currentTarget.dataset.keynum;
				this.leftIndex = index;
				this.getCategoryList(parentId);
			},
			goToSearch: function(){
				uni.navigateTo({
					url: '../../pages/search/search'
				})
			}
			
		},
		computed:{
			
		}
		
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	
	.post-search-top{
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0rpx 30rpx 0rpx 24rpx;
		height: 100rpx;
	}
	
	
	.search-text{
		width: 699rpx;
		height: 58rpx;
		border: 4rpx solid #F5F5F5;
		margin: 0;
		background-color: #F5F5F5;
	}
	.search-text input{
		padding: 0;
		width: 100%;
		font-size: 24rpx;
	}
	.search-icon{
		color: #FF0137;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.post-search-right{
		height: 42rpx;
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	
	.post-bottom{
		color: #888888;
		text-align: center;
		margin-top: 24rpx;
		margin-bottom: 48rpx;
	}
	
	.post-scroll-top{
		position: fixed;
		bottom: 200rpx;
		right: 35rpx;
		height: 90rpx;
		width: 90rpx;
	}
	
	.post-scroll-top-img{
		height: 90rpx;
		width: 90rpx;
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
	
	.post-list {
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
	}
	
	.border-top{
		height: 100%;
		border-top: 1px solid #F5F5F5;
		/* background: #F5F5F5; */
	}
	.classifi-left {
	    background-color: #F8F8F8;
	    width: 180rpx;
	}
	
	.classifi-left-li {
	    width: 180rpx;
	    height: 120rpx;
	    text-align: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
	    justify-content: center;
	}
	.classifi-left-li-active {
	    width: 180rpx;
	    height: 120rpx;
	    text-align: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		background: #FFFFFF;
	}
	
	.classifi-right{
		width: 75%;
	}
	
	.classifi-list {
	  padding: 20rpx 22rpx;
	  display: flex;
	  flex-wrap: wrap;
	  padding-bottom: 10rpx;
	}
	
	.classifi-goods {
	    width: 170rpx;
	    margin-bottom: 30rpx;
	    background: #FFFFFF;
	    border-radius: 10rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	
	
	.classifi-bottom-img{
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
	}
	
	.classifi-number{
		font-size: 24rpx;
		color: #666666;
		line-height: 33rpx;
		margin-top: 16rpx;
	}
</style>
