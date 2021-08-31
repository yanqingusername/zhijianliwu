<template>
	<view>
		<view class="post-header" >
			<view class="z-logo-top">
				<view class="post-nav" :style="'height:'+statusBarHeight+'px'"></view>
				<view class="post-header-interstall" >
					<view class="post-header-title">攻略</view>
					<view class="post-header-search" @click="goToSearch">
						<image class="post-header-search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image>
						<input class="post-header-search-input" disabled="true" type="text" value="" placeholder="搜索热门礼物" />
					</view>
				</view>
			</view>
		</view>
		
		<view class="post-list">
			<!-- <view class="post" v-for="post in postList" @click="goToPost(post.id)">
				<image :src="$utils.imageUrl(post.title_img)" mode=""></image>
				<view class="text">
					<view class="title">
						{{post.title}}
					</view>
				</view>
			</view> -->
			<post-product :postList="postList" :state="state" @clickLike="clickLike"></post-product>
			<!-- <view class="goodslist">
				<block v-for="post in postList" >
					<view class="goods" @click="goToPost(post.id)">
						<view class="goods-head">
							<image :src="$utils.imageUrl(post.title_img)" mode=""class="goods-head-img" ></image>
							<image src="@/static/post-play-button.png" mode=""class="goods-head-label" ></image>
						</view>
						<view class="goods-text">{{post.title}}</view>
						<view class="goods-bottom">
							<image src="@/static/post-like.png" mode=""class="goods-bottom-img" ></image>
							<view class="goods-number">{{'263'}}</view>
						</view>
					</view>
				</block>
			</view> -->
		</view>
		<view class="post-bottom" v-if="isAll">
			<view class="post-bottom-line"></view>
			<view class="post-bottom-text">我是有底线的</view>
			<view class="post-bottom-line"></view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import postProductList from "@/components/own-components/post-product.vue"
	export default {
		components:{
			"post-product": postProductList,
		},
		data() {
			return {
				isAll: false,
				pageSize: 10,
				pageIndex: 1,
				postList: [],
				statusBarHeight:'20',
			}
		},
		onLoad:function() {
			this.getProductList(1);
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		},
		onPullDownRefresh:function(){
			this.getProductList(1);
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500);
		},
		onReachBottom:function(){
			this.getProductList(2);
		},
		computed: {
			statusBarHeight: function() {
				// 获取顶部状态栏高度
				return uni.getSystemInfoSync().statusBarHeight;
			},
		},
		methods: {
			goToPost: function(id){
				console.log(id)
				uni.navigateTo({
					url:'./Post?id='+id
				})
			},
			goToSearch: function(){
				uni.navigateTo({
					url: './PostSearch'
				})
			},
			getProductList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = "get_gifts_article_list";
				let controller = 'article';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					memberid: memberid
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.postList = res.rs;
						that.isAll = false;
					} else {
						if(res.rs.length>0){
							that.postList = that.postList.concat(res.rs);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
				});
			},
			clickLike: function(id,index,is_collect) {
				let that = this;
				let action = "set_article_live_number";
				let controller = 'article';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					number: 1,
					article_id: id,
					memberid: memberid,
					set_status: is_collect == "1"?"2" : "1"
				});
				
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						if(is_collect == 1){
							let item = that.postList[index];
							item.live_number --;
							item.is_collect = 2;
							that.postList = that.postList;
						}else{
							let item = that.postList[index];
							item.live_number ++;
							item.is_collect = 1;
							that.postList = that.postList;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.post-header{
		background: #FAFAFA;
		width: 100%;
		position: fixed;
	    z-index: 200;
	    height: 176rpx;
	}
	.z-logo-top{
		font-size: 0;
		padding: 0;
		position: fixed;
		top: 0; 
		left: 0; 
		width: 100%; 
		z-index: 222;
		background-color: #FAFAFA;
	}
	.post-nav{
		width: 100%;
		height: 20px;
	}
	.post-header-interstall{
		    margin-top: 16rpx;
		    /* width: 696.52rpx; */
		    height: 60rpx;
		    position: relative;
			display: flex;
		    align-items: center;
	}
	.post-header-title{
		font-size: 36rpx;
		margin-left: 35rpx;
		margin-right: 32rpx;
		color: #333333;
	}
	.post-header-search {
		width: 340rpx;
		height: 60rpx;
		text-align: center;
		border-radius: 50rpx;
		padding: 0rpx 16rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.post-header-search-img{
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		left: 190rpx;
	}
	.post-header-search-input{
		width: calc(100% - 48rpx);
		margin-left: 8rpx;
		height: 28rpx;
	}
	
	.post-list {
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		padding-top: 160rpx;
	}

	/* .post {
		margin-top: 32rpx;
		width: 627.77rpx;
		height: 400rpx;
		border-radius: 16rpx;
		background: #FFF;
		box-shadow: 0px 0px 6px 0px #00000010;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 16px;
	} */

	/* .post .text {
		position: relative;
		text-align: left;
		margin: 30rpx 20rpx;
	} */

	/* .post .title {
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	} */

	/* .post .time {
		bottom: 0rpx;
		position: absolute;
		text-align: left;
	} */

	/* .post image {
		float: right;
		width: 627.77rpx;
		height: 300rpx;
		background: #33333330;
		border-radius: 16rpx 16rpx 0 0;
		flex-grow: 0;
		flex-shrink: 0;
	} */
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
	
	/* .goodslist {
	  padding: 20rpx 24rpx;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  padding-bottom: 10rpx;
	}
	
	.goods {
	    width: 338rpx;
	    margin-bottom: 20rpx;
	    background: #FFFFFF;
	    border-radius: 3rpx;
	    position: relative;
	    height: 580rpx;
	}
	
	.goods-head {
	    position: relative;
	    width: 338rpx;
	    height: 420rpx;
	}
	
	.goods-head-img{
		width: 100%;
		height: 420rpx;
	}
	.goods-head-label{
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width:41rpx;
		height:41rpx;
	}
	
	.goods-text {
		margin: 18rpx 20rpx 0rpx;
		height: 84rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: 42rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		align-items: center;
		justify-content: center;
	}
	
	.goods-bottom{
		display: flex;
		position: absolute;
		bottom: 10rpx;
		right: 0rpx;
		margin-right: 20rpx;
		flex-direction: row;
		align-items: center;
	}
	
	.goods-bottom-img{
		width: 40rpx;
		height: 40rpx;
	}
	
	.goods-number{
		font-size: 26rpx;
		color: #888888;
	} */
</style>
