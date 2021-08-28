<template>
	<view class="page">
		<view class="index-home index-page">
			<view class="shopping-list-tabar">
				<view class="z-tabar">
					<scroll-view scroll-x="true" class="owm-index-tab-bar-box"  show-scrollbar="false" upper-threshold="20" >
						<view class="owm-index-tab-bar">
							<view class="owm-index-tab-bar-item-view" v-for="item, index in List" @click="change(item.id)">
								<view class="owm-index-tab-bar-view">
									<view class="owm-index-tab-bar-item" :class="[tabBarIndex==item.id?'owm-index-tab-bar-item-active':'']">{{item.name}} </view>
									<image class="search-type-img" v-if="tabBarIndex==item.id" src="../../static/icon_current_slices.png"></image>
									<view class="search-type-empty" v-else></view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="right-op owm-index-tab-bar-view" @click="$buttonClick(changeClassifi)">
						<view style="display: flex;align-items: center;">
							<view class="owm-index-tab-bar-item owm-index-tab-bar-item-active">分类</view>
							<image src="../../static/op.png" mode="widthFix"></image>
						</view>
						<view class="search-type-empty"></view>
					</view>
				</view>
			</view>
			<view style="padding-top: 80rpx;">
				<view v-if="indexCommodyList.length > 0">
					<search-product :postList="indexCommodyList" :state="state"></search-product>
				</view>
				<view class="post-bottom" v-if="isAll && indexCommodyList.length > 0">
					<view class="post-bottom-line"></view>
					<view class="post-bottom-text">我是有底线的</view>
					<view class="post-bottom-line"></view>
				</view>
				<view class="apply-success-view" v-if="indexCommodyList.length==0">
					<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
					<view class="apply-success-text">当前搜索暂无数据～</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import searchproduct from "@/components/own-components/search-product.vue"; 
	import sr from 'sr-sdk-wxapp';
	export default {
		components:{
			"search-product": searchproduct,
		},
		data() {
			return {
				indexCommodyList: [],
				List: [
					{
						id: 0,
						name: "全部"
					}
				],
				tabBarIndex: 0,
				state: 0,
				pageSize: 50,// 分页
				pageIndex_Index: 1,
				pageIndex: 1,
				isAll: false,
			}
		},
		onLoad() {
			var sign = uni.getStorageSync('sign');
			if (sign) {
				this.sta = '200';
			}else{
				uni.navigateTo({
					url: '../signin/signin'
				})
			}
			uni.showToast({
				icon: "loading",
				title: "加载中"
			});
			// 导航
			var data = JSON.stringify({});
			var action = 'get_gift_person_list';
			this.$utils.post(action, data).then(res => {
				console.log("导航：",res);
				this.List = this.List.concat(res.rs);
			});
			
			// 首页推荐商品
			var data = JSON.stringify({
				member_level: uni.getStorageSync("level"),
				pageSize: this.pageSize,
				pageIndex: this.pageIndex_Index
			});
			var action = 'get_index_tuijian_goods';
			this.$utils.post(action, data).then(res => {
				console.log("首页推荐商品：",res);
				this.isAll = false;
				this.indexCommodyList = res.rs;
				uni.hideLoading();

				// 腾讯有数
				if(this.indexCommodyList.length > 0){
					for (var i = 0; i < this.indexCommodyList.length; i++) {
						let item = this.indexCommodyList[i];
						sr.track('expose_sku_component',
							{
							   "sku": {
								 "sku_id": item.sku, // 若商品无sku_id时，可传spu_id信息
								 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
							   },
							   "spu": {
									"spu_id": item.sku, // 若商品无spu_id时，可传sku_id信息
									"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
								},
							   "primary_image_url": item.head_img
							})
					}
				}
			});
		},
		onPullDownRefresh(){
			let tabBarIndex = this.tabBarIndex;
			if(tabBarIndex == 0){
				this.pageIndex_Index = 1;
				var action = 'get_index_tuijian_goods';
			}else{
				this.pageIndex = 1;
				var action = 'get_gift_person_goods';
			}
			var data = JSON.stringify({
				member_level: uni.getStorageSync("level"),
				gift_person_id: tabBarIndex,
				pageSize: this.pageSize,
				pageIndex: tabBarIndex==0?this.pageIndex_Index:this.pageIndex
			});
			
			this.$utils.post(action, data).then(res => {
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				}, 500)
				console.log("商品：",res);
				this.isAll = false;
				if(tabBarIndex == 0){
					this.pageIndex_Index++;
					this.indexCommodyList = res.rs;
				}else{
					this.pageIndex++;
					this.indexCommodyList = res.rs.goodslist;
				}
			});
		},
		onReachBottom(){
			let tabBarIndex = this.tabBarIndex;
			if(tabBarIndex == 0){
				var action = 'get_index_tuijian_goods';
			}else{
				var action = 'get_gift_person_goods';
			}
			var data = JSON.stringify({
				member_level: uni.getStorageSync("level"),
				gift_person_id: tabBarIndex,
				pageSize: this.pageSize,
				pageIndex: tabBarIndex==0?this.pageIndex_Index:this.pageIndex
			});
			this.$utils.post(action, data).then(res => {
				// console.log("首页推荐商品：",res);
				if(tabBarIndex == 0){
					if(res.rs.length>0){
						this.pageIndex_Index++;
						this.indexCommodyList = this.indexCommodyList.concat(res.rs);
					}else{
						this.isAll = true;
					}
				}else{
					if(res.rs.goodslist.length>0){
						this.pageIndex++;
						this.indexCommodyList = this.indexCommodyList.concat(res.rs.goodslist);
					}else{
						this.isAll = true;
					}
				}
			});
		},
		methods: {
			change: function(e){
				this.tabBarIndex = e;
				let tabBarIndex = e;
				if(tabBarIndex == 0){
					this.pageIndex_Index = 1;
					var action = 'get_index_tuijian_goods';
				}else{
					this.pageIndex = 1;
					var action = 'get_gift_person_goods';
				}
				var data = JSON.stringify({
					member_level: uni.getStorageSync("level"),
					gift_person_id: tabBarIndex,
					pageSize: this.pageSize,
					pageIndex: tabBarIndex==0?this.pageIndex_Index:this.pageIndex
				});
				
				this.$utils.post(action, data).then(res => {
					console.log("商品：",res);
					this.isAll = false;
					if(tabBarIndex == 0){
						this.pageIndex_Index++;
						this.indexCommodyList = res.rs;
					}else{
						this.pageIndex++;
						this.indexCommodyList = res.rs.goodslist;
					}
				});

				//腾讯有数
				sr.track('element',
				{
				    "type": "change",
				    "element_id": "tabBarPage-tabBar1_"+ this.tabBarIndex,
				    "index": this.tabBarIndex,
				    "name": "首页页面-tabBar1_"+ this.tabBarIndex
				})
			},
			changeClassifi(){ //分类跳转
				uni.navigateTo({
					url:'../classification/classification'
				})
			}
		},
		computed:{
				level:function(){
					return uni.getStorageSync("level");
				},
				level_name:function(){
					return uni.getStorageSync("level_name");
				}
		},
	}
</script>

<style>
	page{
		background: #F5F5F5;
	}
	.is-fixed{
		position: fixed!important;
		left: 0;
		right: 0;
		width: 100%;
		background-color: #F9FAFE;
		padding: 24rpx 0 24rpx;
		z-index: 2;
	}
	.page{
		/* padding-top: 80rpx; */
		background: #F5F5F5;
	}
	.shopping-list-tabar{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		position: fixed;
		top: 0;
		height: 80rpx;
		width: 100%;
		z-index: 555;
	}
	.z-tabar{
		/* position: relative;
		padding-right: 150rpx; */
		padding-left: 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	    justify-content: space-between;
		width: 100%;
	}
	.owm-index-tab-bar{
		display: flex;
		align-items: center;
	}
	.owm-index-tab-bar-box{
		width: 80%;
		/* position: absolute; */
		/* top: 1080rpx; */
	}
	.right-op{
		/* position: absolute;
		right: 26rpx;
		top: 50%;
		transform: translateY(-50%); */
		/* background-color: #f5f5f5; */
		padding-right: 26rpx;
	}
	.right-op text{
		vertical-align: middle;
		display: inline-block;
		color: #333;
		font-size: 28rpx;
		font-weight: bold;
	}
	.right-op image{
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
		vertical-align: middle;
		display: inline-block;
	}
/* 	.sticky-box {
	    display: flex;
	    position: -webkit-sticky;
	    position: sticky;
	    top: var(--window-top);
	    z-index: 9999;
	    flex-direction: row;
	    margin: 0px;
	    padding: 1px 0 1px 0;
	    background-color: #F4F5F6;
	} */
	
	.owm-index-tab-bar-item-view{
		text-align: center;
		/* line-height: 64rpx; */
		/* height: 64rpx; */
		/* width: 120rpx; */
		line-height: 40rpx;
		margin: 0 20rpx;
		position: relative;
		display: flex;
		align-items: center;
	}
	.owm-index-tab-bar-view{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.owm-index-tab-bar-item {
		text-align: center;
		/* line-height: 64rpx; */
		/* height: 64rpx; */
		/* width: 120rpx; */
		font-size: 28rpx;
		color: #777777;
	}
	
	.owm-index-tab-bar-item-view:first-child{
		margin-left: 0rpx;
	}
	/* .owm-index-tab-bar-item:last-child{
		margin-right: 40rpx;
	} */
	
	.owm-index-tab-bar-item-active {
		color: #333333;
		font-weight: bold;
	}
	/* .owm-index-tab-bar-item-active:after{
		position: absolute;
		left: 0;
		bottom: -4rpx;
		content: "";
		display: block;
		width: 100%;
		border-bottom: 4rpx solid #EC1815;
	} */
	
	.index-page{
		/* margin-top: -190rpx; */
		
	}
	.index-banner{
		display: block;
		margin: 12rpx auto;
		width: 80%;
	}
	.index-module-box{
		width: 100%;
		margin-bottom: 40rpx;
	}
	.owm-index-search{
		/* margin-top: 140rpx; */
		/* width: 600rpx; */
	}
	
	.popup-center-view{
			display: flex;
			align-items: center;
			width: 644rpx;
			height: 469rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			flex-direction: column;
		}
		.popup-center-view-img{
			width: 68rpx;
			height: 68rpx;
			margin-top: 70rpx;
		}
		.popup-center-view-text{
			font-size: 30rpx;
			color: #333333;
			line-height: 52rpx;
			margin-top: 34rpx;
			padding: 0rpx 36rpx 0rpx 66rpx;
		}
		.popup-center-view-bottom{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 54rpx;
		}
		.popup-center-view-button{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 196rpx;
			height: 72rpx;
			background: #E1B87A;
			border-radius: 36rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
		}
		.search-type-img{
			width: 31rpx;
			height: 20rpx;
		}
		.search-type-empty{
			width: 31rpx;
			height: 20rpx;
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
</style>
