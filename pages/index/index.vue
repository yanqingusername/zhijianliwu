<template>
	<view class="page">
		<!-- 顶部栏 -->
		<own-index-header @change="change" :List="List" :index="tabBarIndex" :loginUrl="logoUrl"></own-index-header>
			
		<view class="index-home index-page" v-if="tabBarIndex==0">
			<!-- 轮播图 -->
			<own-swiper :swiper="swiper"></own-swiper>
			<!-- 模块宫格 -->
			<own-grid :list="gridList"></own-grid>
			<view class="index-module-box">
				<!-- 优惠券模块 -->
				<own-index-coupon-module :coupon_left="coupon_left" :coupon_right="coupon_right"></own-index-coupon-module>
				
			</view>
			<own-product-list :commody="indexCommodyList" :state="state"></own-product-list>
		</view>
		<view class="index index-page" v-else>
			<own-product-list :commody="commody" :state="state"></own-product-list>
		</view>
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
						name: "首页"
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
			console.log(data);
			this.$utils.post(action, data).then(res => {
				console.log("首页推荐商品：",res);
				this.indexCommodyList = res.rs;
				uni.hideLoading();
			});
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
					this.commody = res.rs.goodslist;
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
				console.log("首页推荐商品：",res);
				if(tabBarIndex == 0){
					this.pageIndex_Index++;
					this.indexCommodyList = this.indexCommodyList.concat(res.rs);
				}else{
					this.pageIndex++;
					this.commody = this.commody.concat(res.rs.goodslist);
				}
			});
		},
		methods: {
			change: function(e){
				console.log("切换Tab");
				this.tabBarIndex = e;
				if(e != 0){
					this.pageIndex = 1;
					var data = JSON.stringify({
						member_level: uni.getStorageSync("level"),
						gift_person_id: this.tabBarIndex,
						pageSize: this.pageSize,
						pageIndex: this.pageIndex
					});
					var action = 'get_gift_person_goods';
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 500,
					});
					this.$utils.post(action, data).then(res => {
						this.pageIndex++;
						console.log("切换Teb切换商品：",res);
						this.commody = res.rs.goodslist;
					});
				}
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
	.page{
		padding-top: 200rpx;
	}
	.index-page{
		padding-top: 87rpx;
	}
	.index-banner{
		display: block;
		margin: 12rpx auto;
		width: 80%;
	}
	.index-module-box{
		width: 100%;
	}
	.owm-index-search{
		margin-top: 140rpx;
		width: 600rpx;
	}
	
</style>
