<template>
	<view>
		<view v-if="postList.length > 0">
			<post-product :postList="postList" :state="state" @clickLike="clickLike"></post-product>
		</view>
		<view class="post-bottom" v-if="isAll && postList.length > 0">
			<view class="post-bottom-line"></view>
			<view class="post-bottom-text">我是有底线的</view>
			<view class="post-bottom-line"></view>
		</view>
		<view class="apply-success-view" v-if="postList.length==0">
			<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
			<view class="apply-success-text">当前暂无数据～</view>
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
			} 
		},
		onLoad() {
			this.getProductList(1);
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
			getProductList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = "article_my_live_list";
				let controller = 'article';
				let level = uni.getStorageSync("level");
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					member_level: level,
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
				})
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
		},
		computed:{
			
		}
		
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	
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
