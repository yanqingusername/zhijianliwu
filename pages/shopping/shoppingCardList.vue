<template>
	<view class="page">
		<view class="index-home index-page">
			<view style="padding-top: 0rpx;">
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
	import config from '../../common/config.js';
	import searchproduct from "@/components/own-components/search-product.vue"; 
	import sr from 'sr-sdk-wxapp';
	export default {
		components:{
			"search-product": searchproduct,
		},
		data() {
			return {
				indexCommodyList: [],
				state: 99,
				pageSize: 50,// 分页
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
			
			
			// 首页推荐商品
			var data = JSON.stringify({
				member_level: uni.getStorageSync("level"),
				pageSize: this.pageSize,
				pageIndex: this.pageIndex_Index
			});
			var action = 'get_gift_person_goods';
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
			
			this.pageIndex = 1;
			var action = 'get_gift_person_goods';
			var data = JSON.stringify({
				member_level: uni.getStorageSync("level"),
				pageSize: this.pageSize,
				pageIndex: this.pageIndex
			});
			
			this.$utils.post(action, data).then(res => {
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				}, 500)
				console.log("商品：",res);
				this.isAll = false;
				this.pageIndex++;
				this.indexCommodyList = res.rs.goodslist;
			});
		},
		onReachBottom(){
			
			var action = 'get_gift_person_goods';
			var data = JSON.stringify({
				member_level: uni.getStorageSync("level"),
				pageSize: this.pageSize,
				pageIndex: this.pageIndex
			});
			this.$utils.post(action, data).then(res => {
				// console.log("首页推荐商品：",res);
				
					if(res.rs.goodslist.length>0){
						this.pageIndex++;
						this.indexCommodyList = this.indexCommodyList.concat(res.rs.goodslist);
					}else{
						this.isAll = true;
					}
			});
		},
		methods: {

		},
		computed:{
			
		},
	}
</script>

<style>
	page{
		background: #F5F5F5;
	}
	
	.page{
		/* padding-top: 80rpx; */
		background: #F5F5F5;
	}
	
	
	
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
