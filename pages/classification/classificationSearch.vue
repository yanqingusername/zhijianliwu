<template>
	<view>
		<view class="post-search-top flex-vertically">
			<view class="search-text flex-vertically">
				<icon type="search" size="14" class="search-icon"/>
				<input type="text" name="input" v-model="Key" placeholder="搜索热门推荐">
			</view>
			<view class="post-search-right" @click="search">搜索</view>
		</view>
		
		<!-- <view class="post-search-content">
			<view class="post-search-title flex-between" v-show="hasHistory">
				<view class="post-search-title-left">历史搜索</view>
				<view class="search-title-img" @click="daleteHistory"><image class="img" src="../../static/delete.png" mode=""></image></view>
			</view>
			<view class="search-ul" v-show="hasHistory">
				<view class="post-search-li" v-for="item in historySearchList" @click="searchKey(item)">{{ item }}</view>
			</view>
			<view class="post-search-title flex-between" style="margin-top: 20rpx;" v-show="hasHistory">
				<view class="post-search-title-left">热门搜索</view>
			</view>
			<view class="search-ul" v-show="hasHistory">
				<view class="post-search-li" v-for="item in historySearchList" @click="searchKey(item)">{{ item }}</view>
			</view>
		</view> -->
		
		<view>
			<view class="search-type">
				<view class="search-type-content flex-between">
					<view class="search-type-nav" data-index='0' @click="clickHandler" >
						<view class="search-type-title">综合推荐</view>
						<image class="search-type-img" v-if="indexCurrent == 0" src="../../static/icon_current_slices.png"></image>
						<view class="search-type-empty" v-else></view>
					</view>
					<view class="search-type-nav" data-index='1' @click="clickHandler" >
						<view class="search-type-title">销量</view>
						<image class="search-type-img" v-if="indexCurrent == 1" src="../../static/icon_current_slices.png"></image>
						<view class="search-type-empty" v-else></view>
					</view>
					<view class="search-type-nav" data-index='2' @click="clickPopUp" >
						<view class="search-type-nav-ar">
							<view class="search-type-title">价格</view>
							<image class="search-type-img-ar" src="../../static/drop_down_arrow.png"></image>
						</view>
						<image class="search-type-img" v-if="indexCurrent == 2" src="../../static/icon_current_slices.png"></image>
						<view class="search-type-empty" v-else></view>
					</view>
				</view>
			</view>
			
			<view class="post-list">
				<search-product :postList="postList" :state="state"></search-product>
			</view>
			<view class="post-bottom" v-if="isAll">
				-- 我是有底线的 --
			</view>
		</view>
		
		<!-- <view class="apply-success-view">
			<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
			<view class="apply-success-text">当前搜索暂无数据～</view>
		</view> -->
		
		<view class="post-scroll-top" @click="goToScrollTop">
			<image class="post-scroll-top-img" src="https://zhijianlw.com/static/web/img/post-scroll-top-img.png" mode="widthFix"></image>
		</view>
		
		<!-- 退款原因 -->
		<uni-popup ref="popupSearch" type="top" :animation="false" :maskClick="true" @change="change">
			<view class="popup-search">
				<view class="popup-search-item" @click="bindPickerChange" v-for="(item, index) in items" :key="index" :data-index="index">
					<view class="popup-search-title">{{item.name}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import searchProductList from "@/components/own-components/search-product.vue";
	import sr from 'sr-sdk-wxapp';
	export default {
		components:{
			"search-product": searchProductList,
		},
		data() {
			return {
				Key: "",
				hotSearchList:[],
				historySearchList:[],
				isAll: false,
				pageSize: 10,
				pageIndex: 1,
				postNumber: 0,
				url:"",
				postList: [],
				indexCurrent: 0,
				items:[
					{
						"id": 1,
						"name": "100以下"
					},{
						"id": 2,
						"name": "200-300"
					},{
						"id": 3,
						"name": "300-500"
					},{
						"id": 4,
						"name": "500-1000"
					},{
						"id": 5,
						"name": "1000-2000"
					},{
						"id": 6,
						"name": "2000-5000"
					},{
						"id": 7,
						"name": "5000以上"
					}
				]
			} 
		},
		onLoad() {
			this.historySearchList = uni.getStorageSync("historySearchList")||[];
			console.log();
			
			this.url = config.URL;
			let that = this;
			let action = "get_gifts_article_list";
			let data = JSON.stringify({pageSize: this.pageSize,pageIndex: this.pageIndex});
			this.$utils.post(action,data).then(res=>{
				that.postList = res.rs;
				that.pageIndex++;
				that.postNumber += res.rs.length;
				console.log("文章列表-首页", res.rs);
			})
		},
		onPullDownRefresh:function(){
			this.postNumber = 0;
			this.pageIndex = 1;
			let that = this;
			let action = "get_gifts_article_list";
			let data = JSON.stringify({pageSize: this.pageSize,pageIndex: this.pageIndex});
			this.$utils.post(action,data).then(res=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				}, 500)
				that.pageIndex++;
				that.postList = res.rs;
				that.isAll = false;
				that.postNumber += res.rs.length;
				console.log("文章列表-刷新", res.rs);
			})
		},
		onReachBottom:function(){
			let that = this;
			let action = "get_gifts_article_list";
			let data = JSON.stringify({pageSize: this.pageSize,pageIndex: this.pageIndex});
			this.$utils.post(action,data).then(res=>{
				if(res.rs.length>0){
					that.postList = that.postList.concat(res.rs);
					that.pageIndex++;
					that.postNumber += res.rs.length;
					// console.log("文章列表-全部", that.postList);
					console.log("文章列表-下一页", res.rs);
				}else{
					console.log("文章列表-全部加载");
					that.isAll = true;
				}
			})
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
				
				//新增腾讯有数
				sr.track('search', {
				    "keyword": Key,
				});
				
				this.historySearchList.push(Key);
				uni.setStorageSync("historySearchList", this.historySearchList);
				console.log(this.historySearchList);
				uni.navigateTo({
					url:'../product-list/product-list?type=search&key=' + Key
				})
			},
			searchKey:function(Key) {
				//新增腾讯有数
				sr.track('search', {
				    "keyword": Key,
				});
				uni.navigateTo({
					url:'../product-list/product-list?type=search&key=' + Key
				})
			},
			daleteHistory: function(){
				this.historySearchList=[];
				uni.setStorageSync("historySearchList", this.historySearchList);
			},
			goToScrollTop: function(){
				uni.pageScrollTo({
					scrollTop: 0, 
					duration: 1000
				})
			},
			clickHandler: function(e){
				let index = e.currentTarget.dataset.index;
				this.indexCurrent = index;
			},
			clickPopUp: function(e){
				let index = e.currentTarget.dataset.index;
				this.indexCurrent = index;
				this.$refs['popupSearch'].open();
			},
			change(e) {
			
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.currentTarget.dataset.index)
				this.indexPicker = e.currentTarget.dataset.index
				this.$refs['popupSearch'].close();
			},
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
	page{
		background: #FFFFFF;
	}
	.search-type {
	    /* border-top: 2rpx solid #F4F5F7; */
	    height: 80rpx;
	    background-color: #FFF;
	    margin-bottom: 10rpx;
		margin-top: 10rpx;
	}
	.search-type-content {
	    width: 600rpx;
	    margin: 0 auto;
	    height: 80rpx;
	    /* padding-top: 21rpx; */
	}
	
	.search-type-nav {
	    display: flex;
	    align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.search-type-nav-ar{
		display: flex;
		align-items: center;
		
	}
	.search-type-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	.search-type-img{
		width: 31rpx;
		height: 20rpx;
	}
	.search-type-img-ar{
		width: 30rpx;
		height: 30rpx;
		margin-left: 5rpx;
	}
	.search-type-empty{
		width: 31rpx;
		height: 20rpx;
	}
	.post-search-top{
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0rpx 30rpx 0rpx 24rpx;
		height: 100rpx;
	}
	.search-ul{
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
	}
	.post-search-li{
		padding: 0rpx 26rpx;
		margin: 0rpx 20rpx 20rpx;
		margin-left: 0rpx;
		height: 46rpx;
		background: #F5F5F5;
		border-radius: 23rpx;
		display: flex;
		align-items: center;
		color: #666666;
		font-size: 24rpx;
	} 
	.search-text{
		width: 607rpx;
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
	
	.post-search-content{
		width: 696rpx;
		margin: 20rpx auto 23rpx auto;
	}
	
	.post-search-title-left{
		font-size: 30rpx;
		color: #333333;
	}
	
	.post-search-title{
		width: 100%;
	    margin-bottom: 26rpx;
	}
	
	.post-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.post-bottom{
		color: #888888;
		text-align: center;
		padding-top: 24rpx;
		padding-bottom: 48rpx;
		background: #F8F8F8;
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
	
	.popup-search{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		/* border-radius: 10rpx 10rpx 3rpx 3rpx; */
		width: 234rpx;
		height: 450rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 8rpx 0px rgba(212, 212, 212, 0.5);
		position: absolute;
	    top: 200rpx;
	    right: 0rpx;
	}
	
	.popup-search-item{
		display: flex;
		align-items: center;
		height: 64rpx;
		width: 100%;
		justify-content: center;
	}
	.popup-search-title{
		font-size: 26rpx;
		color: #333333;
		line-height: 37rpx;
	}
</style>
