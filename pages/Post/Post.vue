<template>
	<view>
		<!-- <view class="parse-title" v-if="postStyle=='post'">
			<view class="title">
				{{title}}
			</view>
			<view class="time">
				{{time}}
			</view>
		</view> -->
		<view style="padding-bottom: 80rpx;">
			<view class="parse-view" v-if="postStyle=='post'">
				<image class="parse-view-img" :src="title_img"></image>
			</view>
			<view :class="postStyle=='post'?'parse-con':'poster-con'">
				<!-- <u-parse :content="postContnet" @navigate="navigate" :className="postStyle=='post'?'parse':'poster'" :imageProp="imageProp"></u-parse>-->
			<u-parse :content="postContnet" @navigate="navigate" :className="postStyle=='post'?'parse':'poster'" :imageProp="imageProp"></u-parse>
			</view>
			<view class="product-list" v-if="!(productList.length<=0)">
				<view class="title" style="font-size: 1.8em;">
					推荐商品
				</view>
				<view class="product" v-for="product in productList" 
					@click="goToShop(product.keynum)">
					<image :src="$utils.imageUrl(product.head_img)" mode=""></image>
					<view class="product-text">
						<view class="product-title">
							{{product.goodsname}}
						</view>
						<view class="product-price">
							￥{{product.price}}
						</view>
						<view class="product-move">
							去送礼 >
						</view>
					</view>
				</view>
			</view>
			<view class="post-bottom" v-if="postStyle=='post'">
				-- 看完了，去送礼 --
			</view>
		</view>
		<view class="post-bottom-fixed" @click="clickLike(article_id,is_collect)">
			<image v-if="is_collect == 1" src="@/static/icon-post-like-now.png" mode="" class="post-bottom-fixed-img" ></image>
			<image v-else src="@/static/post-like.png" mode="" class="post-bottom-fixed-img" ></image>
			<view class="post-bottom-fixed-number">{{live_number || 0}}</view>
		</view>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue";
	import '@/components/feng-parse/parse.css';
	import config from '../../common/config.js';
	export default {
		components:{
			uParse
		},
		data() {
			return {
				postStyle: "",
				url:"",
				title: "",
				time: "",
				postContnet: ``,
				productList: [],
				imageProp: {},
				title_img: '',
				article_id: '',
				live_number: '',
				is_collect: 1
			}
		},
		onShow() {
			const that = this
		},
		onLoad:function(e){
			uni.showToast({
				title: "加载中",
				icon: "loading"
			})
			this.url = config.URL;
			this.imageProp.domain = config.URL.replace("https://","").replace("http://", "");
			let that = this;
			let action = "get_gifts_article_detail";
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				gifts_article_id: e.id,
				memberid: memberid
			});
			this.$utils.post(action,data).then(res=>{
				uni.hideToast();
				uni.setNavigationBarTitle({
				　　title:res.rs.gifts_article.title
				})
				console.log(res.rs.gifts_article.detail);
				console.log(res.rs.gifts_article.detail.replace(/<[^>]+>/g,""));
				if(res.rs.gifts_article.detail.replace(/<[^>]+>/g,"")==""){
					// uni.setNavigationBarTitle({
					// 　　title:res.rs.gifts_article.title;
					// })
					this.postStyle = "poster";
				}else{
					this.postStyle = "post";
				}
				console.log('文章详情',res);
				that.title=res.rs.gifts_article.title;
				that.title_img = res.rs.gifts_article.title_img;
				that.article_id = res.rs.gifts_article.id;
				that.is_collect = res.rs.gifts_article.is_collect;
				that.live_number = res.rs.gifts_article.live_number;
				that.time=res.rs.gifts_article.time;
				that.postContnet=res.rs.gifts_article.detail;
				that.productList=res.rs.goodslist;
			})
		},
		methods: {
			navigate(e){
				console.log(e);
				uni.setClipboardData({
					data: e,
					success: function() {
						// 	title: "连接已复制",
						// 	icon: "none"
						// });
					}
				});
			},
			goToShop:function(keynum){
				console.log(keynum);
				uni.navigateTo({
					url: '../details/details?keynum='+keynum,
				});
			},
			clickLike: function(id, is_collect) {
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
							that.live_number --;
							that.is_collect = 2;
						}else{
							that.live_number ++;
							that.is_collect = 1;
						}
					}
				})
			}
		}
	}
</script>

<style>
.parse-title{
	margin: 1em auto;
	width: 627.77rpx;
}
.title{
	margin: 0.5em 0;
	font-size: 2em;
	color: #333333;
}
.time{
	font-size: 0.8em;
	color: #888888;
}
.parse-con{
	margin: 0 auto;
	width: 627.77rpx;
}
.parse .h1,
.parse .h2,
.parse .h3,
.parse .h4,
.parse .h5,
.parse .h6{
	font-size: 1.5em;
	line-height: 1.2em;
}
.parse .p{
	line-height: 1em;
}
.parse .li{
	line-height: 2em;
	/* margin: 0.5em 0; */
}
.parse .img{
	width: 100%;
	margin: 2em 0;
}
.parse .a{
	color: #FF0137;
	border-bottom: 1px dotted #555555 !important;
}
.product-list{
	margin: 0 auto;
	width: 627.77rpx;
}
.product-list .product{
	width: 627.77rpx;
	border-radius: 16rpx;
	box-shadow: 0 0 12rpx 0 rgba(0,0,0,0.1);
	margin: 32rpx 0;
	display: flex;
	background: #FFFFFF;
}
.product-list image{
	width: 200rpx;
	height: 160rpx;
	/* border: #F0F0F0 1rpx solid; */
	border-radius: 16rpx;
	margin: 20rpx;
	flex-grow: 0;
	flex-shrink: 0;
}
.product-list .product-text{
	height: 160rpx;
	margin: 20rpx;
	flex-grow: 1;
	position: relative;
}
.product-list .product-price{
	font-size: 1em;
	color: rgb(255, 9, 60);
	display: inline;
	position: absolute;
	bottom: 0;
}
.product-list .product-title{
	font-size: 1.2em;
	line-height: 1.2em;
	height: 2.3em;
	text-align: justify;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.product-list .product-move{
	display: inline;
	position: absolute;
	color: rgb(255, 9, 60);
	bottom: 0;
	right: 0;
}
.post-bottom{
	color: #888888;
	text-align: center;
	margin-bottom: 64rpx;
}
.poster .p {
    padding: 0;
}
.poster .img{
	margin: 0em 0;
}
.poster-con{
	width: 100%;
}

.parse-view{
	width: 750rpx;
	height: 938rpx;
	margin-bottom: 30rpx;
}
.parse-view-img{
	width: 750rpx;
	height: 938rpx;
}

.post-bottom-fixed{
	position: fixed;
	width: 100%;
	height: 80rpx;
	z-index: 222;
	bottom: 0;
	left: 0;
	background: #FFFFFF;
	display: flex;
	align-items: center;
}

.post-bottom-fixed-img{
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
	}
	
.post-bottom-fixed-number{
	font-size: 26rpx;
	color: #888888;
}
</style>