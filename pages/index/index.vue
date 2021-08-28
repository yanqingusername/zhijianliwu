<template>
	<view class="page" @scroll="getViewTop">
		<!-- 顶部栏 -->
		<own-index-header @change="change" :List="List" :index="tabBarIndex" :loginUrl="logoUrl"></own-index-header>
		<!-- 轮播图 -->
		<!-- <own-swiper v-if="tabBarIndex==0" :swiper="swiper"></own-swiper> -->
		<own-swiper :swiper="swiper"></own-swiper>
		
		<!-- <view class="index-home index-page" v-if="tabBarIndex==0"> -->
		<view class="index-home index-page">
			<!-- 模块宫格 -->
			<own-grid :list="gridList"></own-grid>
			<view class="index-module-box">
				<!-- 优惠券模块 -->
				<own-index-coupon-module :coupon_left="coupon_left" :coupon_right="coupon_right"></own-index-coupon-module>
				
			</view>
			
			<!-- <view id="z-good-wrap"> -->
				<view class="z-tabar" :class="[nameTop <= rect ? 'is-fixed' : '']" :style="nameTop <= rect ? 'top:'+ (40 + statusBarHeight)+'px' : ''" id="scrollId">
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
					<!-- <navigator url="" class="right-op"><text>分类</text><image src="../../static/op.png" mode="widthFix"></image></navigator> -->
					<view class="right-op owm-index-tab-bar-view" @click="$buttonClick(changeClassifi)">
						<view style="display: flex;align-items: center;">
							<view class="owm-index-tab-bar-item owm-index-tab-bar-item-active">分类</view>
							<image src="../../static/op.png" mode="widthFix"></image>
						</view>
						<view class="search-type-empty"></view>
					</view>
				</view>
				
				<own-product-list :commody="indexCommodyList" :state="state"></own-product-list>
			<!-- </view> -->
		</view>
		
		
		<!-- <view class="index index-page" v-else>
			<own-product-list :commody="commody" :state="state"></own-product-list>
		</view> -->
		
		<!-- 提交成功 -->
		<uni-popup ref="popupcenter" type="center" :animation="false" :maskClick="true" @change="changePop">
			<view class="popup-center-view">
				<image class="popup-center-view-img" src="../../static/icon_adopt_apply_in.png"></image>
				<view class="popup-center-view-text">{{poptitle}}</view>
				<view class="popup-center-view-bottom" @click="$buttonClick(submitrefund)">
					<view class="popup-center-view-button">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import ownProductList from "@/components/own-components/own-product-list.vue"; 
	import ownIndexHeader from "@/components/own-components/own-index-header.vue";
	import ownCommodityBlock from "@/components/own-components/own-commodity-block.vue";
	import ownIndexCouponModule from "@/components/own-components/own-index-coupon-module.vue";
	import ownSwiper from "@/components/own-components/own-swiper.vue";
	import ownGrid from "@/components/own-components/own-grid.vue";
	import indexJrtj from "@/components/own-image/index-jrtj.vue";
	import sr from 'sr-sdk-wxapp';
	export default {
		components:{
			"own-index-header": ownIndexHeader,
			"own-swiper": ownSwiper,
			"own-product-list": ownProductList,
			"own-commodity-block": ownCommodityBlock,
			"own-grid": ownGrid,
			"own-index-coupon-module": ownIndexCouponModule,
			"index-jrtj": indexJrtj
		},
		data() {
			return {
				logoUrl: "",
				coupon_left: "",
				coupon_right: "",
				List: [
					{
						id: 0,
						name: "全部"
					}
				],
				gridList: [],
				commodyBlockList: [],
				indexCommodyList: [],
				tabBarIndex: 0,
				swiper:[],
				commody: [],
				state: 0,
				pageSize: 50,// 分页
				pageIndex_Index: 1,
				pageIndex: 1,
				nameTop: 400,
				rect: 0,
				statusBarHeight: 20,
				poptitle: ''
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
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
			// LOGO
			var data = JSON.stringify({});
			var action = 'get_webconfig_tiaoli';
			this.$utils.post(action, data).then(res => {
				console.log("LOGO: ",res.rs.logo);
				this.coupon_left = res.rs.coupon_left;
				this.coupon_right = res.rs.coupon_right;
				this.logoUrl = res.rs.logo;	
				uni.setStorageSync("coupon_background", res.rs.coupon_background);
			});
			// 导航
			var data = JSON.stringify({});
			var action = 'get_gift_person_list';
			this.$utils.post(action, data).then(res => {
				console.log("导航：",res);
				this.List = this.List.concat(res.rs);
			});
			// 轮播图
			var data = JSON.stringify({a:0}); 
			var action = 'get_banner';
			this.$utils.post(action, data).then(res => {
				console.log("轮播图：",res);
				this.swiper = res.rs;
			});
			// 主题商品
			var data = JSON.stringify({a:""});
			var action = 'get_plan_theme_list';
			this.$utils.post(action, data).then(res => {
				console.log("主题商品：",res);
				this.gridList = res.rs;
			});
			// 推荐商品
			var data = JSON.stringify({a:0});
			var action = 'get_tuijian_goods';
			this.$utils.post(action, data).then(res => {
				console.log("推荐商品：",res);
				this.commodyBlockList = res.rs;
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
			
			//用户登录后判断企业会员是否通过
			this.getMemberAuditStatus();
			
			var zthat = this;
			var query = wx.createSelectorQuery();
			query.select('#scrollId').boundingClientRect();
			query.exec(function(res){
				console.log(33333)
				console.log(res)
				console.log(44444)
				if(res && res[0]){
					zthat.nameTop = res[0].top
					console.log(zthat.nameTop)
				}
			})
		},
		onPageScroll(e){
			this.rect = e.scrollTop;
			console.log(e.scrollTop)
		},
		onShareAppMessage: function(e) {
		
			return {
				// title:this.alt.goodsname,
				title: '指间礼物',
				// desc:'指间送礼',
			}
		
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
					this.pageIndex_Index++;
					this.indexCommodyList = this.indexCommodyList.concat(res.rs);
				}else{
					this.pageIndex++;
					this.indexCommodyList = this.indexCommodyList.concat(res.rs.goodslist);
				}
			});
		},
		methods: {
			change: function(e){
				this.tabBarIndex = e;
				// if(e != 0){
				// 	this.pageIndex = 1;
				// 	var data = JSON.stringify({
				// 		member_level: uni.getStorageSync("level"),
				// 		gift_person_id: this.tabBarIndex,
				// 		pageSize: this.pageSize,
				// 		pageIndex: this.pageIndex
				// 	});
				// 	var action = 'get_gift_person_goods';
					
				// 	uni.pageScrollTo({
				// 		scrollTop: 0,
				// 		duration: 500,
				// 	});
				// 	this.$utils.post(action, data).then(res => {
				// 		this.pageIndex++;
				// 		console.log("切换Teb切换商品：",res);
				// 		this.commody = res.rs.goodslist;
				// 	});
				// }
				
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
			getMemberAuditStatus(){
				let that = this;
				let action = "get_member_audit_status";
				let controller = 'member';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					memberid: memberid
				});
				
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						if(res.rs.status == 1){
							that.poptitle = res.rs.msg;
							that.$refs['popupcenter'].open();
						} else if(res.rs.status == 2){
							that.poptitle = res.rs.msg;
							that.$refs['popupcenter'].open();
						}
					}
				})
			},
			submitrefund(){
				this.$refs['popupcenter'].close();
				// uni.navigateTo({
				// 	url:'../personal/personal'
				// })
			},
			changePop(){
				
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
	.z-tabar{
		/* position: relative;
		padding-right: 150rpx; */
		padding-left: 26rpx;
		box-sizing: border-box;
		display: flex;
		    align-items: center;
		    justify-content: space-between;
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
</style>
