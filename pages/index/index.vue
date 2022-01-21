<template>
	<view class="page" @scroll="getViewTop">
		
		<!-- <view style="position: fixed;background: #F2341E;height: 150px;border-radius: 0px 0px 35px 35px;margin-top: 61px;width: 100%;"></view> -->
		
		<!-- 顶部栏 -->
		<own-index-header @change="change" :List="List" :index="tabBarIndex" :loginUrl="logoUrl" :isShowScene="isShowScene"></own-index-header>
		<!-- 轮播图 -->
		<!-- <own-swiper v-if="tabBarIndex==0" :swiper="swiper"></own-swiper> -->
		<!-- <own-swiper :swiper="swiper"></own-swiper> -->
		
		<view class="z-tabar" style="margin-top: 70px;z-index: 30;position: fixed;width: 100%;">
			<scroll-view scroll-x="true" class="owm-index-tab-bar-box" show-scrollbar="false" upper-threshold="20" >
				<view class="owm-index-tab-bar">
					<view class="owm-index-tab-bar-item-view" v-for="(item, index) in List" @click="changeProduct(item.id,item.keynum,item.name)" :key="index">
						<view class="owm-index-tab-bar-view">
							<view class="owm-index-tab-bar-item" :class="[tabBarIndex==item.id?'owm-index-tab-bar-item-active':'']">{{item.name}} </view>
						</view>
					</view>
				</view>
			</scroll-view>
				
			<view class="tuijian-view" @click="changeProduct('0','','推荐')">
				<view class="tuijian-view-1">
					<view class="tuijian-view-2">
						<view class="owm-index-tab-bar-item" :class="[tabBarIndex==0 ?'owm-index-tab-bar-item-active':'']">{{'首页推荐'}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- <view class="index-home index-page" v-if="tabBarIndex==0"> -->
		<view class="index-home index-page" v-if="tabBarIndex==0">
			
			<view :style="'padding-top:5px;background: #F2341E;height: 80px;border-radius: 0px 0px 15px 15px;margin-top: 95px;width: 100%;opacity:'+ opationnumber + ';'"></view>
			
			<view style="padding: 0 26rpx; margin-top: -75px;position: relative;display: flex;align-items: center;justify-content: center;">
				<swiper v-if="swiper.length>0" :autoplay="autoplay" :interval="interval" :duration="duration" circular class="own-swiper swiper-box" @change="changeswiper" :current="swiperCurrentIndex">
					<swiper-item v-for="(item,index) in swiper" :key="index">
						<image lazy-load="true" class="own-swiper-img" :src="$utils.imageUrl(item.banner)" 
						@click="bannerJump(item.jump_action, item.jump_id)" mode="widthFix"></image>
					</swiper-item>
				</swiper>
				<view class="indicator-view" v-if="swiper.length>0">
					<view :class="[swiperCurrentIndex == index ? 'indicator-view-item' : 'indicator-view-item-default']" v-for="(item,index) in swiper" :key="index"></view>
				</view>
			</view>
			
			<!-- 模块宫格 -->
			<own-grid :list="gridList"></own-grid>
			<view class="index-module-box" style="margin-top: 40rpx;">
				<!-- 优惠券模块 -->
				<own-index-coupon-module :coupon_left="adList" :coupon_right="coupon_right"></own-index-coupon-module>
				
			</view>
			
			<view class="class-view" v-if="allgiftList.length > 0">
					<view class="class-view-item" v-for="(item,index) in allgiftList" :key="index" :style="'height: ' + (item.goods_list.length > 3 ? '925':'550')+'rpx;background-image: url('+ item.zq_background +');background-size:700rpx 925rpx;'">
						<view class="class-view-item-more" :style="'background: ' + item.color + ';'" @click="toMore" :data-keynum="item.keynum" :data-name="item.name">更多></view>
						<view class="class-view-item-list" >
							<view class="class-view-item-good" v-for="(items,index) in item.goods_list" :key="index" @click="details" :data-keynum="items.keynum" :data-dataitem="items">
								<image :src="items.head_img" mode="" class="class-view-img" ></image>
								<view class="class-view-text">{{items.goodsname}}</view>
								<view class="class-view-other">
									<text class="class-view-price">￥</text><text style="font-size: 34rpx;color: #FB4133;">{{items.price}}</text>
									<image class="class-view-qi" v-if="post.level_sign == 1" src="../../static/icon_corporate_members.png"></image>
								</view>
							</view>
						</view>
					</view>
			</view>
			
			<!-- <view id="z-good-wrap"> -->
				<!-- <view class="z-tabar" :class="[nameTop <= rect ? 'is-fixed' : '']" :style="nameTop <= rect ? 'top:'+ (38 + statusBarHeight)+'px' : ''" id="scrollId">
					<scroll-view scroll-x="true" class="owm-index-tab-bar-box"  show-scrollbar="false" upper-threshold="20" >
						<view class="owm-index-tab-bar">
							<view class="owm-index-tab-bar-item-view" v-for="(item, index) in List" @click="change(item.id)" :key="index">
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
				</view> -->
				
				<view class="personal-product" v-if="indexCommodyList.length>0">
					<view class="personal-line" style="margin-right: 16px;"></view>
					<image src="https://zhijianlw.com/static/web/img/icon_2021_12_20_01.png" class="personal-product-icon"></image>
					<view class="personal-product-title">精选推荐</view>
					<view class="personal-line" style="margin-left: 16px;"></view>
				</view>
				
				<own-product-list :commody="indexCommodyList" :state="state"></own-product-list>
			<!-- </view> -->
		</view>
		
		
		<view class="index index-page" v-else style="margin-top: 95px;position: relative;">
			<view class="search-type" :animation="slide_up">
				<view class="search-type-content flex-between" style="align-items: center;">
					<view class="search-type-nav" data-index='0' @click="clickHandler" :data-conditionkey="recommendData.key">
						<view class="search-type-title" :class="[indexCurrent == 0 ? 'search-type-title-active':'']">{{recommendData.name}}</view>
						<image class="search-type-img" v-if="indexCurrent == 0" src="../../static/icon_current_slices.png"></image>
						<view class="search-type-empty" v-else></view>
					</view>
					<view class="search-type-nav" data-index='1' @click="clickHandler" :data-conditionkey="salesData.key">
						<view class="search-type-title" :class="[indexCurrent == 1 ? 'search-type-title-active':'']">{{salesData.name}}</view>
						<image class="search-type-img" v-if="indexCurrent == 1" src="../../static/icon_current_slices.png"></image>
						<view class="search-type-empty" v-else></view>
					</view>
					<view class="search-type-nav-price" style="flex-direction: row;" data-index='2' @click="clickPopUp" :data-conditionkey="priceData.key">
						<view class="search-type-nav-ar" style="flex-direction: column;">
							<view class="search-type-title" :class="[indexCurrent == 2 ? 'search-type-title-active':'']">{{priceData.name}}</view>
							<image class="search-type-img" v-if="indexCurrent == 2" src="../../static/icon_current_slices.png"></image>
							<view class="search-type-empty" v-else></view>
						</view>
						<image class="search-type-img-ar" src="../../static/drop_down_arrow.png"></image>
					</view>
				</view>
			</view>
			<view style="height: 80rpx;"></view>
			<own-product-list :commody="indexCommodyList" :state="state"></own-product-list>
		</view>
		
		<!-- 价格弹框	 -->
		<uni-popup ref="popupSearch" type="top" :animation="false" :maskClick="true" @change="change">
			<view class="popup-search">
				<view class="popup-search-item" @click="bindPickerChange" v-for="(item, index) in rsdataList" :key="index" :data-pricekey="item.price_key">
					<view class="popup-search-title-default" :class="[pricekey==item.price_key?'popup-search-title':'']">{{item.price_name}}</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 提交成功 -->
		<uni-popup ref="popupcenter" type="center" :animation="false" @change="changePop">
			<view class="popup-center-view">
				<image class="popup-center-view-img" src="https://zhijianlw.com/static/web/img/icon_adopt_apply_in.png"></image>
				<view class="popup-center-view-text">{{poptitle}}</view>
				<view class="popup-center-view-bottom" @click="$buttonClick(submitrefund)">
					<view class="popup-center-view-button">确定</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 优惠券 -->
		<uni-popup ref="couponcenter" type="center" :animation="false" @change="changePop">
			<view class="coupon-view" @click="$buttonClick(submitcoupon)" v-if="regCouponInfo.length == 1">
				<image class="coupon-bg-img" v-if="regCouponInfo[0].scene == 1" src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_01-1.png"></image>
				<image class="coupon-bg-img" v-else src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_01-2.png"></image>
				<view class="coupon-content">
					<view class="coupon-content-title">{{regCouponInfo[0].money}}元</view>
					<view class="coupon-content-text">{{regCouponInfo[0].type_info}} | 满{{regCouponInfo[0].full_money}}元可用</view>
				</view>
				<image @click.stop="closeClick" class="close" src="https://zhijianlw.com/static/web/img/icon_index_close_12_23.png" ></image>
			</view>
			
			<view class="coupon-view-two" @click="$buttonClick(submitcoupon)" v-if="regCouponInfo.length > 1">
				<image class="coupon-bg-img-two" v-if="regCouponInfo[0].scene == 1" src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_02-1.png"></image>
				<image class="coupon-bg-img-two" v-else src="https://zhijianlw.com/static/web/img/icon_member_reg_coupon_02-2.png"></image>
				<view class="coupon-a-a" :style="'top:'+(isSystemInfo ? '179' : '164')+'px;'">
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
				<image @click.stop="closeClick" class="close" src="https://zhijianlw.com/static/web/img/icon_index_close_12_23.png"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import ownProductList from "@/components/own-components/own-product-list.vue"; 
	import ownIndexHeader from "@/components/own-components/own-index-header.vue";
	import ownCommodityBlock from "@/components/own-components/own-commodity-block.vue";
	import ownIndexCouponModule from "@/components/own-components/own-index-coupon-module.vue";
	// import ownSwiper from "@/components/own-components/own-swiper.vue";
	import ownGrid from "@/components/own-components/own-grid.vue";
	import indexJrtj from "@/components/own-image/index-jrtj.vue";
	import sr from 'sr-sdk-wxapp';
	import uma from 'umtrack-wx';
	// "own-swiper": ownSwiper,
	let timer;
	export default {
		components:{
			"own-index-header": ownIndexHeader,
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
				List: [],
				gridList: [],
				commodyBlockList: [],
				indexCommodyList: [],
				tabBarIndex: 0,
				swiper:[],
				commody: [],
				state: 0,
				pageSize: 20,// 分页
				pageIndex_Index: 1,
				pageIndex: 1,
				nameTop: 400,
				rect: 0,
				statusBarHeight: 20,
				poptitle: '',
				regCouponInfo: [],
				swiperCurrentIndex: 0,
				autoplay: true,
				interval: 2000,
				duration: 500,
				isSystemInfo: false,
				opationnumber: 1,
				allgiftList: [],
				isShowScene: true,
				adList: [],
				rsdataList: [],
				priceData: '',
				salesData: '',
				recommendData: '',
				pagePlanSize: 10,
				pagePlanIndex: 1,
				postList: [],
				indexCurrent: 0,
				conditionkey: '1',
				pricekey: '',
				keynum1: "",
				coupon_type: '',
				Key: "",
				slide_up:'',
				isScroll: false,
				shareInfo:''
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			
			this.isSystemInfo = this.$utils.isSystemInfo();
			
			var sign = uni.getStorageSync('sign');
			if (sign) {
				this.sta = '200';
			}else{
				// uni.navigateTo({
				// 	url: '../signin/signin'
				// })
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
			// 得到广告的相应列表
			let dataad = JSON.stringify({
				"module":"index"
			});
			let actionad = 'get_ad_list';
			let controllerad = "ad";
			this.$utils.postNew(actionad, dataad,controllerad).then(res => {
				this.adList = res.data;
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
			
			//搜索条件
			let action1 = "serach_condition";
			let controller1 = 'search';
			let data1 = JSON.stringify({});
			this.$utils.postNew(action1,data1,controller1).then(res=>{
				this.rsdataList = res.rs.price.rs_data;
				this.priceData = res.rs.price;
				this.salesData = res.rs.sales;
				this.recommendData = res.rs.recommend;
			})
			
			// 分享链接
			var datashare = JSON.stringify({type:"1"});
			var actionshare = 'get_share_img';
			this.$utils.post(actionshare, datashare).then(res => {
				this.shareInfo = res.rs;
			});
			
			// 推荐商品
			// var data = JSON.stringify({
			// 	a:0,
			// 	member_level: uni.getStorageSync("level"),
			// });
			// var action = 'get_tuijian_goods';
			// this.$utils.post(action, data).then(res => {
			// 	console.log("推荐商品：",res);
			// 	this.commodyBlockList = res.rs;
			// });
			
			this.pageIndex_Index = 1;
			
			this.get_all_gift_person_goods();
			
			// 首页推荐商品
			var data = JSON.stringify({
				member_level: uni.getStorageSync("level"),
				pageSize: this.pageSize,
				pageIndex: this.pageIndex_Index,
				is_type:1,
			});
			var action = 'get_tuijian_goods';
			this.$utils.post(action, data).then(res => {
				console.log("首页推荐商品：",res);
				this.indexCommodyList = res.rs;
				if(res.rs.length > 0){
					this.pageIndex_Index++;
				}
				uni.hideLoading();

				// 腾讯有数
				if(this.indexCommodyList.length > 0){
					for (var i = 0; i < this.indexCommodyList.length; i++) {
						let item = this.indexCommodyList[i];
						sr.track('expose_sku_component',
							{
							   "sku": {
								 "sku_id": item.sku+'', // 若商品无sku_id时，可传spu_id信息
								 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
							   },
							   "spu": {
									"spu_id": item.sku+'', // 若商品无spu_id时，可传sku_id信息
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
			
			let scene = wx.getLaunchOptionsSync();
			if(scene==1089){
				this.isShowScene = false
			} else {
				setTimeout(()=>{
					this.isShowScene = false
				},5000);
			}
			
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
			let that = this;
			if(this.isScroll){
				this.isScroll = false;
			}else{
				clearTimeout(timer) // 每次滚动前 清除一次
				that.fadeOut();
				timer = setTimeout(function() { 
					that.fadeIn();
				}, 500);
			}
			
			this.rect = e.scrollTop;
			console.log(e.scrollTop)
			
			if(e.scrollTop> 10){
				this.opationnumber= 0.8
			}else if(e.scrollTop> 15){
				this.opationnumber= 0.7
			}else if(e.scrollTop> 20){
				this.opationnumber= 0.6
			}else if(e.scrollTop> 25){
				this.opationnumber= 0.5
			}else if(e.scrollTop> 30){
				this.opationnumber= 0.4
			}else if(e.scrollTop> 35){
				this.opationnumber= 0.3
			}else if(e.scrollTop> 40){
				this.opationnumber= 0.2
			}else if(e.scrollTop> 45){
				this.opationnumber= 0.1
			}else if(e.scrollTop> 50){
				this.opationnumber= 0
			}else{
				this.opationnumber= 1
			}
		},
		onShareAppMessage: function(e) {

			// 腾讯有数
			// sr.track('page_share_app_message', {
			//   "from_type": "menu",
			//   "share_title": "指间礼物",
			//   "share_path": '/pages/index/index',
			//   "share_image_url": '',
			//   "share_to": "friends",
			// })
		
			return {
				// title:this.alt.goodsname,
				title: this.shareInfo.title || '我发现了一个不错的送礼平台～',
				imageUrl: this.shareInfo.share_img || 'https://zhijianlw.com/static/web/img/share_img.png',
				path: this.shareInfo.url || '/pages/index/index',
				// desc:'指间送礼',
			}
		
		},
		onPullDownRefresh(){
			let tabBarIndex = this.tabBarIndex;
			if(tabBarIndex == 0){
				this.pageIndex_Index = 1;
				var action = 'get_tuijian_goods';
				var data = JSON.stringify({
					member_level: uni.getStorageSync("level"),
					pageSize: this.pageSize,
					pageIndex: tabBarIndex==0?this.pageIndex_Index:this.pageIndex,
					is_type: 1
				});
				this.$utils.post(action, data).then(res => {
					setTimeout(()=>{
						uni.stopPullDownRefresh();
					}, 500)
					console.log("商品：",res);
						if(res.rs.length > 0){
							this.pageIndex_Index++;
						}
						this.indexCommodyList = res.rs;
				});
				
			}else{
				this.pageIndex = 1;
				this.getProductList(1);
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				}, 500);
			}
			
			// 主题商品
			var data = JSON.stringify({a:""});
			var action = 'get_plan_theme_list';
			this.$utils.post(action, data).then(res => {
				console.log("主题商品：",res);
				this.gridList = res.rs;
			});
			// 得到广告的相应列表
			let dataad = JSON.stringify({
				"module":"index"
			});
			let actionad = 'get_ad_list';
			let controllerad = "ad";
			this.$utils.postNew(actionad, dataad,controllerad).then(res => {
				this.adList = res.data;
			});
			
			// 导航
			var data1 = JSON.stringify({});
			var action1 = 'get_gift_person_list';
			this.$utils.post(action1, data1).then(res => {
				let List = []
				this.List = List.concat(res.rs);
			});
			
			// 礼盒列表
			this.get_all_gift_person_goods();
			
		},
		onReachBottom(){
			let tabBarIndex = this.tabBarIndex;
			if(tabBarIndex == 0){
				var action = 'get_tuijian_goods';
				var data = JSON.stringify({
					member_level: uni.getStorageSync("level"),
					pageSize: this.pageSize,
					pageIndex: tabBarIndex==0?this.pageIndex_Index:this.pageIndex,
					is_type: 1
				});
				this.$utils.post(action, data).then(res => {
					// console.log("首页推荐商品：",res);
						if(res.rs.length > 0){
							this.pageIndex_Index++;
						}
						
						this.indexCommodyList = this.indexCommodyList.concat(res.rs);
						
						// 腾讯有数
						if(res.rs.length > 0){
							for (var i = 0; i < res.rs.length; i++) {
								let item =res.rs[i];
								sr.track('expose_sku_component',
									{
									   "sku": {
										 "sku_id": item.sku+'', // 若商品无sku_id时，可传spu_id信息
										 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
									   },
									   "spu": {
											"spu_id": item.sku+'', // 若商品无spu_id时，可传sku_id信息
											"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
										},
									   "primary_image_url": item.head_img
									})
							}
						}
				});
			}else{
				this.getProductList(2);
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
				  animation.translateY(0).step()
			      this.slide_up = animation.export()
			    },
			    //渐隐消失
			    fadeOut() {
			      var animation = wx.createAnimation({
			        duration: 400,
			        timingType: 'ease'
			      });
			      this.animation = animation
				  animation.translateY(-40).step()
				  animation.opacity(0).step();
			      this.slide_up = animation.export()
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
				this.getProductList(1);
				this.$refs['popupSearch'].close();
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
				console.log(this.keynum1)
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
					goodsclassify: this.keynum1,
					coupon_type: this.coupon_type
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					
					if(typeNumber == 1){
						if(res.rs.length>0){
							that.pageIndex++;
						}
						that.indexCommodyList = res.rs;
						this.goToScrollTop();
					} else {
						if(res.rs.length>0){
							that.pageIndex++;
						}
						that.indexCommodyList = that.indexCommodyList.concat(res.rs);
					}
					
					// 腾讯有数
					if(res.rs && res.rs.length > 0){
						for (var i = 0; i < res.rs.length; i++) {
							let item = res.rs[i];
							sr.track('expose_sku_component',
								{
								   "sku": {
									 "sku_id": item.sku+'', // 若商品无sku_id时，可传spu_id信息
									 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
								   },
								   "spu": {
										"spu_id": item.sku+'', // 若商品无spu_id时，可传sku_id信息
										"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
									},
								   "primary_image_url": item.head_img
								})
						}
					}
					
					
				})
			},
			details:function(e){
				// 腾讯有数
				let dataitem = e.currentTarget.dataset.dataitem;
				
				uma.trackEvent('Um_Event_ShoppingDetail', {
					Um_Key_ItemName: dataitem.goodsname,
					Um_Key_ItemID: dataitem.sku
				});
				
				sr.track('trigger_sku_component',
					{
					   "sku": {
						 "sku_id": dataitem.sku, // 若商品无sku_id时，可传spu_id信息
						 "sku_name": dataitem.goodsname // 若商品无sku_name时，可传spu_name信息
					   },
					   "spu": {
							"spu_id": dataitem.sku, // 若商品无spu_id时，可传sku_id信息
							"spu_name": dataitem.goodsname // 若商品无spu_name时，可传sku_name信息
						},
					   "primary_image_url": dataitem.head_img
					})
				  
				let index = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
			toMore(e){
				let keynum = e.currentTarget.dataset.keynum;
				let name = e.currentTarget.dataset.name;

				uma.trackEvent('Um_Event_More', {
					Um_Key_ItemName: name,
					Um_Key_ItemKeynum: keynum
				});

				if(keynum && name){
					uni.navigateTo({
						url:'/pages/search/search?keynum='+ keynum +'&name='+name
					});
				}
			},
			changeswiper(e) {
			    let {current, source} = e.detail
			    if(source === 'autoplay' || source === 'touch') {
			    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
			      this.swiperCurrentIndex = e.detail.current;
			    }
			  },
			bannerJump:function(action, id){
				
				uma.trackEvent('Um_Event_BannerJump', {
					Um_Key_ItemAction: action,
					Um_Key_ItemId: id
				});
				
				console.log(action, id);
				if(action=="gifts_article"){
					uni.navigateTo({
						url:'/pages/Post/Post?id=' + id
					})
				}
				if(action=="goods"){
					uni.navigateTo({
						url:'/pages/details/details?keynum=' + id
					})
				}
				if(action=="member"){
					uni.navigateTo({
						url:'/pages/Member/Member?typestring=1'
					})
				}
			},
			changeProduct: function(e,keynum1,name){
				
				uma.trackEvent('Um_Event_Change', {
					Um_Key_ItemTitle: "首页分类管理",
					Um_Key_ItemUrl: e,
					Um_Key_ItemName: name
				});
				
				console.log(e,keynum1,name)
				this.tabBarIndex = e;
				
				this.isScroll = true;
				
				let tabBarIndex = e;
				if(tabBarIndex == 0){
					this.pageIndex_Index = 1;
					var action = 'get_tuijian_goods';
					var data = JSON.stringify({
						member_level: uni.getStorageSync("level"),
						pageSize: this.pageSize,
						pageIndex: tabBarIndex==0?this.pageIndex_Index:this.pageIndex,
						is_type: 1
					});
					
					this.$utils.post(action, data).then(res => {
						console.log("商品：",res);
						if(tabBarIndex == 0){
							if(res.rs.length > 0){
								this.pageIndex_Index++;
							}
							this.indexCommodyList = res.rs;
						}
					});
				}else{
					this.pageIndex = 1;
					this.keynum1 = keynum1;
					this.Key = name;
					this.getProductList(1);
				}
				
				
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
			get_all_gift_person_goods(){
				let that = this;
				let action = "get_all_gift_person_goods";
				let data = JSON.stringify({
					member_level: uni.getStorageSync("level"),
				});
				
				this.$utils.post(action,data).then(res=>{
					if(res.sta == 1){
						this.allgiftList = res.rs;
						
						// 腾讯有数
						if(this.allgiftList.length > 0){
							for (var i = 0; i < this.allgiftList.length; i++) {
								let goods_list = this.allgiftList[i].goods_list;
								for (var j = 0; j < goods_list.length; j++) {
									let item = goods_list[j];
									sr.track('expose_sku_component',
										{
										   "sku": {
											 "sku_id": item.sku+'', // 若商品无sku_id时，可传spu_id信息
											 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
										   },
										   "spu": {
												"spu_id": item.sku+'', // 若商品无spu_id时，可传sku_id信息
												"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
											},
										   "primary_image_url": item.head_img
										})
								}
							}
						}
					}
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
			closeClick(){
				this.$refs['couponcenter'].close();
			},
			submitcoupon(){
				this.$refs['couponcenter'].close();
				let that = this;
				// 调用订阅消息
				uni.requestSubscribeMessage({
					tmplIds: ['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo','UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM'],
					success(res) {
						if (res['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo'] == 'accept' && res['UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM'] == 'accept') {
							let action = "add_wx_subscribe_log";
							let controller = 'subscribe';
							let memberid = uni.getStorageSync('id')
							let data = JSON.stringify({
								memberid: memberid,
								template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"
							});
							
							that.$utils.postNew(action,data,controller).then(res=>{
								if(res.sta == 1){
									
								}
							})
						}
					},
					fail(res) {
						
					},
					complete(res){
						uni.navigateTo({
							url:'../Coupon/Coupon'
						})
					}
				});
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
		/* width: 80%; */
		width: 100%;
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
		font-size: 30rpx;
		color: #FFFFFF;
		display: block;
		width: 100%;
		padding-bottom: 4rpx;
		border-bottom: 4rpx solid transparent;
	}
	
	.owm-index-tab-bar-item-view:first-child{
		margin-left: 150rpx;
	}
	
	.owm-index-tab-bar-item-view:last-child .owm-index-tab-bar-item{
		margin-right: 26rpx;
	}
	
	.owm-index-tab-bar-item-active {
		color: #FFFFFF;
		font-weight: bold;   
		display: block;
	    width: 100%;
	    padding-bottom: 4rpx;
	    border-bottom: 4rpx solid #FFFFFF;
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
		margin-bottom: 0rpx;
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
			z-index: 99;
		}
		.coupon-bg-img-two{
			width: 700rpx;
			height: 905rpx;
			position: absolute;
			left: 0rpx;
			top: 0rpx;
		}
		.coupon-a-a{
			height: 400rpx;
			width: 515rpx;
			top: 164px;
			position: absolute;
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
		
		/**
		 * 
		 */
		.own-swiper{
			box-sizing: border-box;
			width: 100%;
			height: 280rpx;
			border-radius: 10rpx;
			/* margin-top: -50rpx; */
			/* position: fixed; */
			/* z-index: 99; */
		}
		.swiper-box {
			border-radius: 10rpx;
			overflow: hidden;
			transform: translateY(0);
		}
		swiper-item{
			border-radius: 10rpx !important;
		}
		.own-swiper-img{
			width: 100%;
			height: 100%!important;
			border-radius: 10rpx;
		}
		
		/* 自定义轮播图的指示点 */
		.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal{
		  margin-bottom: 2rpx;
		}
		.swiper-box .wx-swiper-dot{
		 width: 12rpx;
		 display: inline-flex;
		 height: 4rpx;
		 justify-content:space-between;
		}
		.swiper-box .wx-swiper-dot::before{
		 content: '';
		 flex-grow: 1; 
		 background: #000;
		 opacity: 0.2;
		 border-radius: 8rpx
		}
		.swiper-box .wx-swiper-dot-active::before{
		 background: #fff;   
		 width: 24rpx;
		}
		
		.indicator-view{
			position: absolute;
			bottom: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.indicator-view-item{
			width: 36rpx;
			height: 6rpx;
			background: #FFFFFF;
			border-radius: 2rpx;
			margin-right: 6rpx;
		}
		.indicator-view-item-default{
			width: 24rpx;
			height: 6rpx;
			background: #000000;
			border-radius: 2rpx;
			opacity: 0.2;
			margin-right: 6rpx;
		}
		
		/**
		 * 礼盒
		 */
		.class-view{
			width: 750rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		.class-view-item{
			width: 700rpx;
			height: 925rpx;
			position: relative;
			margin-top: 20rpx;
			/* background-image: url(https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/bc.png);
			background-size: 700rpx 925rpx; */
		}
		
		.class-view-item-more{
			    display: flex;
			    align-items: center;
			    justify-content: center;
			position: absolute;
			top: 82rpx;
			right: 20rpx;
			width: 108rpx;
			height: 40rpx;
			background: #E9B979;
			border-radius: 20rpx;
			opacity: 0.7;
			font-size: 24rpx;
			color: #333333;
			text-align: center;
		}
		.class-view-item-list{
			display: flex;
			flex-wrap: wrap;
			
			padding-bottom: 10rpx;
			/* background: #F8F8F8; */
			padding: 20rpx 0rpx 20rpx 20rpx;
			margin-top: 140rpx;
		}
		.class-view-item-list-active{
			justify-content: space-between;
		}
		.class-view-item-good{
			width: 210rpx;
			height: 363rpx;
			background: #FFFFFF;
			border-radius: 2rpx;
			margin-bottom: 20rpx;
			position: relative;
			padding-bottom: 20rpx;
			margin-right: 15rpx;
		}
		.class-view-item-good-active{
			margin-right: 20rpx;
		}
		.class-view-img{
			width: 210rpx;
			height: 210rpx;
		}
		
		.class-view-text {
			margin: 16rpx 8rpx 0rpx 10rpx;
			height: 76rpx;
			font-size: 26rpx;
			line-height: 37rpx;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			align-items: center;
			justify-content: center;
			font-family: monospace;
		}
		.class-view-other{
			margin: 6rpx 8rpx 10rpx 10rpx;
		}
		
		.class-view-price{
			font-size: 24rpx;
			color: #FB4133;
		}
		.class-view-qi{
			width: 38rpx;
			height: 24rpx;
			margin-left: 6rpx;
		}
		
		.personal-product{
			 width:694rpx;
			 height:60rpx;
			 margin:0 auto;
			 margin-top: 20rpx;
			 display: flex;
			 align-items: center;
			 justify-content: center;
		}
		
		.personal-line{
			 width: 47rpx;
			 border: 1px solid #CCCCCC;
		}
		.personal-product-icon{
			width: 42rpx;
			height: 42rpx;
			margin-right: 6rpx;
		}
		
		.personal-product-title{
			 font-size: 34rpx;
			 font-weight: bold;
			 color: #333333;
			 line-height: 42rpx;
			 
		}
		
		.search-type {
		    /* border-top: 2rpx solid #F4F5F7; */
		    height: 80rpx;
		    background-color: #FFF;
		    /* padding-bottom: 10rpx; */
		    padding-top: 10rpx;
		    position: fixed;
		    z-index: 18;
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
			font-size: 28rpx;
			color: #333333;
		}
		.search-type-title-active{
			font-weight: bold;
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
		    top: 390rpx;
		    right: 0rpx;
		}
		
		.popup-search-item{
			display: flex;
			align-items: center;
			height: 64rpx;
			width: 100%;
			justify-content: center;
		}
		.popup-search-title-default{
			font-size: 26rpx;
			color: #333333;
			line-height: 37rpx;
			padding-bottom: 4rpx;
			border-bottom: 4rpx solid #FFFFFF;
		}
		.popup-search-title{
		font-size: 26rpx;
		color: #333333;
		line-height: 37rpx;
		padding-bottom: 4rpx;
		border-bottom: 4rpx solid #FF0137;
	}
	
		.tuijian-view{
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 0;
			left: 26rpx;
			background: #F2341E;
		}
		
		.tuijian-view-1{
			text-align: center;
			    line-height: 40rpx;
			    position: relative;
			    display: flex;
			    align-items: center;
				width: 130rpx;
				    margin-right: 10rpx;
		}
		
		.tuijian-view-2{
			    display: flex;
			    flex-direction: column;
		}
		
		.close{
				/* position: absolute;
				top: 20rpx;
				right: 20rpx;
				width: 40rpx; */
				    position: absolute;
				    bottom: -80rpx;
				    width: 60rpx;
					height: 60rpx;
		}
		
</style>
