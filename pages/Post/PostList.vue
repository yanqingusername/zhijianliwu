<template>
	<view>
		<view class="post-list">
			<view class="post" v-for="post in postList" @click="goToPost(post.id)">
				<image :src="$utils.imageUrl(post.title_img)" mode="aspectFill"></image>
				<view class="text">
					<view class="title">
						{{post.title}}
					</view>
				</view>
			</view>
		</view>
		<view class="post-bottom" v-if="isAll">
			-- 全部加载 --
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				isAll: false,
				pageSize: 10,
				pageIndex: 1,
				postNumber: 0,
				url:"",
				postList: []
			}
		},
		onLoad:function() {
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
			goToPost: function(id){
				console.log(id)
				uni.navigateTo({
					url:'./Post?id='+id
				})
			}
		}
	}
</script>

<style>
	.post-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 26rpx;
		box-sizing: border-box;
	}

	.post {
		margin-top: 32rpx;
		width: 100%;
		height: 400rpx;
		border-radius: 16rpx;
		background: #FFF;
		box-shadow: 0px 0px 6px 0px #00000010;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 16px;
	}

	.post .text {
		position: relative;
		text-align: left;
		margin: 30rpx 20rpx;
	}

	.post .title {
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.post .time {
		bottom: 0rpx;
		position: absolute;
		text-align: left;
	}

	.post image {
		float: right;
		width: 100%;
		height: 300rpx;
		background: #33333330;
		border-radius: 16rpx 16rpx 0 0;
		flex-grow: 0;
		flex-shrink: 0;
	}
	.post-bottom{
		color: #888888;
		text-align: center;
		margin-top: 24rpx;
		margin-bottom: 48rpx;
	}
</style>
