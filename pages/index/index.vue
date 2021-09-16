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
				<image class="popup-center-view-img" src="https://zhijianlw.com/static/web/img/icon_adopt_apply_in.png"></image>
				<view class="popup-center-view-text">{{poptitle}}</view>
				<view class="popup-center-view-bottom" @click="$buttonClick(submitrefund)">
					<view class="popup-center-view-button">确定</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 优惠券 -->
		<uni-popup ref="couponcenter" type="center" :animation="false" :maskClick="true" @change="changePop">
			<view class="coupon-view" @click="$buttonClick(submitcoupon)" v-if="regCouponInfo.length == 1">
				<image class="coupon-bg-img" v-if="regCouponInfo[0].scene == 1" src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_01-1.png"></image>
				<image class="coupon-bg-img" v-else src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_01-2.png"></image>
				<view class="coupon-content">
					<view class="coupon-content-title">{{regCouponInfo[0].money}}元</view>
					<view class="coupon-content-text">{{regCouponInfo[0].type_info}} | 满{{regCouponInfo[0].full_money}}元可用</view>
				</view>
			</view>
			
			<view class="coupon-view-two" @click="$buttonClick(submitcoupon)" v-if="regCouponInfo.length > 1">
				<image class="coupon-bg-img-two" v-if="regCouponInfo[0].scene == 1" src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_02-1.png"></image>
				<image class="coupon-bg-img-two" v-else src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_02-2.png"></image>
				<view style="height: 400rpx;width: 515rpx;margin-top: 88px;position: absolute;">
					<scroll-view scroll-y="true" class="scroll-x-coupon">
						<view class="coupon-content-two" v-for="item in regCouponInfo" :key="item.id">
							<image class="coupon-bg-img-two_bg" src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_03.png"></image>
							<view class="coupon-content-title-two"><view style="color: #DB3C3A;font-size: 35rpx;">¥</view><view style="font-weight: bold;left: 30rpx;font-size: 67rpx;color: #DB3C3A;line-height: 94rpx;">{{item.money}}</view></view>
							<view class="coupon-content-view">
								<view class="coupon-content-text-two">{{item.type_info}}</view>
								<view class="coupon-content-time-two">{{item.begin_time}}-{{item.end_time}}</view>
							</view>
						</view>
					</scroll-view>
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
				poptitle: '',
				regCouponInfo: []
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
		onShow() {
			let memberid = uni.getStorageSync('id')
			if(memberid){
				//用户登录后判断企业会员是否通过
				this.getMemberAuditStatus();
				
				this.getMemberRegCoupon();
			}
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
			},
			getMemberRegCoupon(){
				let that = this;
				let action = "get_member_reg_coupon";
				let controller = 'coupon';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					memberid: memberid
				});
				
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						that.regCouponInfo = res.rs;
						if(that.regCouponInfo.length > 0){
							that.$refs['couponcenter'].open();
						}
					}
				})
			},
			submitcoupon(){
				this.$refs['couponcenter'].close();
				uni.navigateTo({
					url:'../Coupon/Coupon'
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
	.owm-index-tab-bar-box ::-webkit-scrollbar {
		display: none;
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
		
		/**
		 * 优惠卷
		 */
		.coupon-view{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 711rpx;
			height: 716rpx;
			position: relative;
		}
		.coupon-bg-img{
			width: 711rpx;
			height: 716rpx;
		}
		.coupon-content{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: absolute;
			top: 95rpx;
		}
		.coupon-content-title{
			font-size: 65rpx;
			font-weight: bold;
			color: #DB3C3A;
			line-height: 91rpx;
		}
		.coupon-content-text{
			font-size: 27rpx;
			font-weight: bold;
			color: #DB3C3A;
			line-height: 38rpx;
			margin-top: 4rpx;
			text-align: center;
		}
		
		.coupon-view-two{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 700rpx;
			height: 905rpx;
			position: relative;
		}
		.coupon-bg-img-two{
			width: 700rpx;
			height: 905rpx;
		}
		.scroll-x-coupon{
			  height: 410rpx;
			  /* margin-top: 348rpx; */
			  width: 515rpx;
			  position: relative;
			}
		.coupon-content-two{
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			width: 515rpx;
			height: 124rpx;
			margin-top: 13rpx;
		}
		.coupon-bg-img-two_bg{
			width: 515rpx;
			height: 124rpx;
		}
		.coupon-content-title-two{
			position: absolute;
			left: 30rpx;
			display: flex;
			align-items: baseline;
		}
		.coupon-content-view{
			position: absolute;
			left: 200rpx;
		}
		.coupon-content-text-two{
			font-size: 34rpx;
			font-weight: bold;
			color: #DB3C3A;
			line-height: 47rpx;
		}
		.coupon-content-time-two{
			font-size: 22rpx;
			color: #999999;
			line-height: 30rpx;
		}
		
</style>
