<template>
	<view class="flex-vertically" style="justify-content: center;">
		<view style="position: relative;">
			<view class="z-logo-top">
				<!-- <view class="post-nav" :style="'height:'+statusBarHeight+'px'"></view> -->
				<view class="personal-header-interstall" >
					<image @click="$buttonClick(backbutton)" class="icon-back-img" src="../../static/icon_post_back.png"></image>
					<view class="personal-header-title"></view>
				</view>
			</view>
			
			<view class="parse-view" v-if="postStyle=='post'">
				<image class="parse-view-img" :src="title_img"></image>
			</view>
			<view :class="postStyle=='post'?'parse-con':'poster-con'">
				<!-- <u-parse :content="postContnet" @navigate="navigate" :className="postStyle=='post'?'parse':'poster'" :imageProp="imageProp"></u-parse>-->
				<view v-for="(item, index) in detail_list">
					<u-parse :content="item.content" @navigate="navigate" :className="postStyle=='post'?'parse':'poster'" :imageProp="imageProp"></u-parse>
					<view class="post-goods-list" v-for="(goodData,index) in item.goods_list" :key="index" @click="goToDetails(goodData.keynum)">
							<view class="new-order-left">
								<view class="new-order-img">
									<image lazy-load="true" class="new-order-commodity-img" :src="goodData.head_img" mode=""></image>
								</view>
							</view>
							<view class="new-order-right">
								<view class="new-order-item">
									<view class="new-order-item-title">{{goodData.goodsname}}</view>
									<view class="new-order-item-money"></view>
								</view>
								<view class="new-order-item" style="margin-top: 20rpx;">
									<view class="new-order-item-money">¥{{goodData.price}}</view>
									<view class="new-order-item-detail">查看详情</view>
								</view>
							</view>
					</view>
				</view>
				<!-- <u-parse :content="postContnet" @navigate="navigate" :className="postStyle=='post'?'parse':'poster'" :imageProp="imageProp"></u-parse> -->
			</view>
			<!-- <view class="product-list" v-if="!(productList.length<=0)">
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
			</view> -->
			<view style="height: 50rpx;"></view>
		</view>
		<!-- <view class="post-bottom-fixed" @click="clickLike(article_id,is_collect)">
			<image v-if="is_collect == 1" src="@/static/icon-post-like-now.png" mode="" class="post-bottom-fixed-img" ></image>
			<image v-else src="@/static/post-like.png" mode="" class="post-bottom-fixed-img" ></image>
			<view class="post-bottom-fixed-number">{{live_number || 0}}</view>
		</view> -->
		<view class='sock_all' :animation="slide_up">
			<image src='@/static/bg_slices_2021_0830.png' style='width:460rpx;height:200rpx' />
			<view class="post-bottom-fixed" @click="clickLike(article_id,is_collect)">
				<image v-if="is_collect == 1" src="@/static/icon-post-like-now.png" mode="" class="post-bottom-fixed-img" ></image>
				<image v-else src="@/static/post-like.png" mode="" class="post-bottom-fixed-img" ></image>
				<view class="post-bottom-fixed-number">{{live_number || 0}}</view>
			</view>
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
				is_collect: 1,
				statusBarHeight:'20',
				detail_list: [],
				slide_up:''
			}
		},
		onShow() {
			const that = this
		},
		onLoad:function(e){
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			
			uni.showToast({
				title: "加载中",
				icon: "loading"
			})
			this.url = config.URL;
			this.imageProp.domain = config.URL.replace("https://","").replace("http://", "");
			let that = this;
			let action = "get_gifts_article_detail";
			let controller = "article";
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				gifts_article_id: e.id,
				memberid: memberid
			});
			this.$utils.postNew(action,data,controller).then(res=>{
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
				that.detail_list = res.rs.gifts_article.detail_list;
			})
		},
		computed: {
			statusBarHeight: function() {
				// 获取顶部状态栏高度
				return uni.getSystemInfoSync().statusBarHeight;
			},
		},
		// 监测滑动距离
		onPageScroll: function(e) {
			if (e.scrollTop > 200) {
				this.fadeIn();
			} else if (e.scrollTop < 200) {
				this.fadeOut();
			}
		},
		methods: {
			//渐显
			    fadeIn() {
			      var animation = wx.createAnimation({
			        duration: 400,
			        timingType: 'ease'
			      });
			      this.animation = animation
			      animation.opacity(1).step();
				  animation.translateY(-60).step()
			      this.slide_up = animation.export()
			    },
			    //渐隐消失
			    fadeOut() {
			      var animation = wx.createAnimation({
			        duration: 400,
			        timingType: 'ease'
			      });
			      this.animation = animation
				  animation.translateY(60).step()
				  animation.opacity(0).step();
			      this.slide_up = animation.export()
			    },
			backbutton(e){
				uni.navigateBack({
					delta: 1
				});
			},
			goToDetails(keynum) {
				uni.navigateTo({
					url: "../details/details?keynum="+ keynum
				});
			},
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
	width: 700rpx;
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
	position: absolute;
	width: 100%;
	height: 200rpx;
	z-index: 222;
	bottom: 0;
	/* left: 0;
	background: #FFFFFF; */
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.post-bottom-fixed-img{
		width: 74rpx;
		height: 74rpx;
	}
	
.post-bottom-fixed-number{
	font-size: 28rpx;
	color: #999999;
}

	.z-logo-top{
		font-size: 0;
		padding: 0;
		position: fixed;
	    top: 20px;
	    left: 0;
	    width: 100%;
	    z-index: 20;
	}
	
	.post-nav{
		width: 100%;
		height: 20px;
	}
		
	.personal-header-interstall{
		margin-top: 16rpx;
	    height: 60rpx;
	    position: relative;
		display: flex;
	    align-items: center;
		justify-content: center;
	}
	.personal-header-title{
		font-size: 36rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
			
	.icon-back-img{
		position: absolute;
		top: 2rpx;
		left: 26rpx;
		width: 60rpx;
		height: 60rpx;
	}
	
	.post-goods-list{
		width: 700rpx;
		height: 180rpx;
		background: #F5F5F5;
		border-radius: 2rpx;
		padding: 16rpx 20rpx 16rpx 16rpx;
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
	}
	.new-order-left{
		width: 140rpx;
		display: flex;
		align-items: center;
	}
	.new-order-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-right{
		display: flex;
		flex-direction: column;
		width: 516rpx;
		margin-left: 20rpx;
	}
	.new-order-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 500rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-item-money{
		font-size: 30rpx;
		color: #EB1615;
	}
	.new-order-item-detail{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 160rpx;
		height: 50rpx;
		border-radius: 2rpx;
		border: 1px solid #EB1615;
		font-size: 24rpx;
		color: #EB1615;
	}
	
	
	.sock_all {
	    position: fixed;
	    bottom: -60rpx;
	    display: flex;
	    z-index: 999;
	    opacity: 0;
	  }
	  
	
	
			
</style>