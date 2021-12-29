<template>
	<view>
		<view class="post-search-top-fixed">
			<view class="post-search-top flex-vertically">
				<view class="search-text flex-vertically" @click="searchKeword(Key)">
					<icon type="search" size="14" class="search-icon"/>
					<input v-if="isShowView == 1" type="text" name="input" confirm-type="search" focus @confirm="search" @input="onKeyInput" v-model="Key" placeholder="搜索热门礼物">
					<view v-else class="search-result-view" @click.stop="clearKeword">
						<view class="search-result-text">{{Key}}</view>
						<image class="search-result-img" src="../../static/icon_close_reason.png"></image>
					</view>
				</view>
				<view class="post-search-right" @click="search">搜索</view>
			</view>
		</view>
		
		<view class="post-search-content" v-if="hasProduct">
			<view class="post-search-title flex-between" v-show="hasHistory">
				<view class="post-search-title-left">历史搜索</view>
				<view class="search-title-img" @click="daleteHistory"><image class="img" src="../../static/delete.png" mode=""></image></view>
			</view>
			<view class="search-ul" v-show="hasHistory">
				<view class="post-search-li" v-for="item in historySearchList" @click="searchKey" :data-itemkey="item" :key="index">{{ item }}</view>
			</view>
			<view class="post-search-title flex-between" style="margin-top: 20rpx;" v-show="hasHot">
				<view class="post-search-title-left">热门搜索</view>
			</view>
			<view class="search-ul" v-show="hasHot">
				<view class="post-search-li" v-for="item in hotSearchList" @click="searchKey" :data-itemkey="item" :key="index">{{ item }}</view>
			</view>
		</view>
		
		<view v-else style="padding-top: 200rpx;">
			<view class="search-type">
				<view class="search-type-content flex-between" style="align-items: center;">
					<view class="search-type-nav" data-index='0' @click="clickHandler" :data-conditionkey="recommendData.key">
						<view class="search-type-title">{{recommendData.name}}</view>
						<image class="search-type-img" v-if="indexCurrent == 0" src="../../static/icon_current_slices.png"></image>
						<view class="search-type-empty" v-else></view>
					</view>
					<view class="search-type-nav" data-index='1' @click="clickHandler" :data-conditionkey="salesData.key">
						<view class="search-type-title">{{salesData.name}}</view>
						<image class="search-type-img" v-if="indexCurrent == 1" src="../../static/icon_current_slices.png"></image>
						<view class="search-type-empty" v-else></view>
					</view>
					<view class="search-type-nav-price" style="flex-direction: row;" data-index='2' @click="clickPopUp" :data-conditionkey="priceData.key">
						<view class="search-type-nav-ar" style="flex-direction: column;">
							<view class="search-type-title">{{priceData.name}}</view>
							<image class="search-type-img" v-if="indexCurrent == 2" src="../../static/icon_current_slices.png"></image>
							<view class="search-type-empty" v-else></view>
						</view>
						<image class="search-type-img-ar" src="../../static/drop_down_arrow.png"></image>
					</view>
				</view>
			</view>
			
			<view v-if="postList.length > 0">
				<search-product :postList="postList" :state="state"></search-product>
			</view>
			<view class="post-bottom" v-if="isAll && postList.length > 0">
				<view class="post-bottom-line"></view>
				<view class="post-bottom-text">我是有底线的</view>
				<view class="post-bottom-line"></view>
			</view>
			<view class="apply-success-view" v-if="postList.length==0">
				<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
				<view class="apply-success-text">当前搜索暂无数据～</view>
			</view>
		</view>
		
		<view class="post-scroll-top" @click="goToScrollTop">
			<image class="post-scroll-top-img" src="https://zhijianlw.com/static/web/img/post-scroll-top-img.png" mode="widthFix"></image>
		</view>
		
		<!-- 价格弹框	 -->
		<uni-popup ref="popupSearch" type="top" :animation="false" :maskClick="true" @change="change">
			<view class="popup-search">
				<view class="popup-search-item" @click="bindPickerChange" v-for="(item, index) in rsdataList" :key="index" :data-pricekey="item.price_key">
					<view class="popup-search-title">{{item.price_name}}</view>
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
				rsdataList: [],
				priceData: '',
				salesData: '',
				recommendData: '',
				isAll: false,
				pageSize: 10,
				pageIndex: 1,
				postNumber: 0,
				url:"",
				postList: [],
				indexCurrent: 0,
				conditionkey: '1',
				pricekey: '',
				keynum: "",
				isShowView: 1,
				coupon_type: ''
			} 
		},
		onLoad(options) {
			this.historySearchList = uni.getStorageSync("historySearchList")||[];
			console.log(options)
			if(options){
				if(options.keynum && options.name){
					this.keynum = options.keynum;
					this.Key = options.name;
					this.isShowView = 2;
					this.getProductList(1);
				} else if(options.coupon_type && options.name){
					this.coupon_type = options.coupon_type;
					this.Key = options.name;
					this.isShowView = 2;
					this.getProductList(1);
				}
			}
			
			let that = this;
			//热门 历史搜索
			let action = "search_hot_key";
			let controller = 'search';
			let data = JSON.stringify({});
			this.$utils.postNew(action,data,controller).then(res=>{
				that.hotSearchList = res.rs;
			})
			
			//搜索条件
			let action1 = "serach_condition";
			let controller1 = 'search';
			let data1 = JSON.stringify({});
			this.$utils.postNew(action1,data1,controller1).then(res=>{
				that.rsdataList = res.rs.price.rs_data;
				that.priceData = res.rs.price;
				that.salesData = res.rs.sales;
				that.recommendData = res.rs.recommend;
			})
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
				this.isShowView = 2;
				this.Key = Key;
				this.historySearchList.unshift(Key);
				this.historySearchList = [...new Set(this.historySearchList)];
				uni.setStorageSync("historySearchList", this.historySearchList);
				this.pricekey = "";
				this.conditionkey = "1";
				this.indexCurrent = 0;
				this.keynum = "";
				this.coupon_type = "";
				this.getProductList(1);
				// uni.navigateTo({
				// 	url:'../product-list/product-list?type=search&key=' + Key
				// })
			},
			searchKey:function(e) {
				let itemkey = e.currentTarget.dataset.itemkey;
				//新增腾讯有数
				sr.track('search', {
				    "keyword": itemkey,
				});
				this.isShowView = 2;
				this.Key = itemkey;
				this.historySearchList.unshift(itemkey);
				this.historySearchList = [...new Set(this.historySearchList)];
				uni.setStorageSync("historySearchList", this.historySearchList);
				this.pricekey = "";
				this.conditionkey = "1";
				this.indexCurrent = 0;
				this.keynum = "";
				this.coupon_type = "";
				this.getProductList(1);
				// uni.navigateTo({
				// 	url:'../product-list/product-list?type=search&key=' + Key
				// })
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
				this.conditionkey = e.currentTarget.dataset.conditionkey;
				this.pricekey = "";
				this.$refs['popupSearch'].close();
				this.getProductList(1);
			},
			clickPopUp: function(e){
				this.conditionkey = e.currentTarget.dataset.conditionkey;
				let index = e.currentTarget.dataset.index;
				this.indexCurrent = index;
				this.$refs['popupSearch'].open();
			},
			change(e) {
			
			},
			bindPickerChange: function(e) {
				this.pricekey = e.currentTarget.dataset.pricekey;
				this.$refs['popupSearch'].close();
				this.getProductList(1);
			},
			getProductList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = "search_list";
				let controller = 'search';
				let level = uni.getStorageSync("level");
				let data = JSON.stringify({
					condition_key:this.conditionkey,
					price_key:this.pricekey,
					keyword:this.Key,
					member_level: level,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					goodsclassify: this.keynum,
					coupon_type: this.coupon_type
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.postList = res.rs;
						that.isAll = false;
						this.goToScrollTop();
					} else {
						if(res.rs.length>0){
							that.postList = that.postList.concat(res.rs);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
					
					// 腾讯有数
					if(res.rs && res.rs.length > 0){
						for (var i = 0; i < res.rs.length; i++) {
							let item = res.rs[i];
							sr.track('expose_sku_component',
								{
								   "sku": {
									 "sku_id": item.sku, // 若商品无sku_id时，可传spu_id信息
									 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
								   },
								   "spu": {
										"spu_id": item.spu, // 若商品无spu_id时，可传sku_id信息
										"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
									},
								   "primary_image_url": item.head_img
								})
						}
					}
				})
			},
			clearKeword() {
				this.Key = '';
				this.isShowView = 1;
				this.historySearchList = uni.getStorageSync("historySearchList")||[];
			},
			searchKeword(Key) {
				this.Key = Key;
				this.isShowView = 1;
			},
			onKeyInput(e){
				this.Key = e.detail.value;
				
				let Key = this.Key.replace(/[ ]/g,"");
				if(!Key){
					uni.showToast({
						icon:"none",
						title: "请输入搜索内容"
					})
					return
				}
				this.Key = Key;
				this.pricekey = "";
				this.conditionkey = "1";
				this.indexCurrent = 0;
				this.keynum = "";
				this.coupon_type = "";
				this.getProductList(1);
			}
		},
		computed:{
			hasHot: function(){
				return this.hotSearchList.length>0;
			},
			hasHistory: function(){
				return this.historySearchList.length>0;
			},
			hasProduct: function(){
				return this.Key == '';
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
	    height: 100rpx;
	    background-color: #FFF;
	    padding-bottom: 10rpx;
	    padding-top: 10rpx;
	    position: fixed;
        top: 50px;
        z-index: 999;
        width: 100%;
	}
	.search-type-content {
	    width: 600rpx;
	    margin: 0 auto;
	    height: 80rpx;
	    /* padding-top: 21rpx; */
	}
	
	.search-type-nav-price {
	    display: flex;
		justify-content: center;
		flex-direction: column;
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
		margin-top: 6rpx;
	}
	.search-type-empty{
		width: 31rpx;
		height: 20rpx;
	}
	.post-search-top-fixed{
		position: fixed;
		background: #FFFFFF;
		top: 0;
		z-index: 999;
		width: 100%;
	}
	.post-search-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 30rpx 0rpx 24rpx;
		height: 100rpx;
		/* width: 696rpx; */
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
		margin: 0rpx auto 23rpx auto;
		padding-top: 120rpx;
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
		background: #F8F8F8;
		padding: 20rpx 25rpx;
	}
	
	.post-bottom{
		display: flex;
		align-items: center;
		color: #B3B3B3;
		text-align: center;
		padding-top: 24rpx;
		padding-bottom: 48rpx;
		justify-content: center;
		background: #F8F8F8;
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
		/* height: 450rpx; */
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
	.search-result-view{
		/* height: 50rpx; */
		background: #D8D8D8;
		border-radius: 25rpx;
		padding: 6rpx 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.search-result-text{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.search-result-img{
		width: 14rpx;
		height: 14rpx;
		margin-left: 6rpx;
	}
</style>
