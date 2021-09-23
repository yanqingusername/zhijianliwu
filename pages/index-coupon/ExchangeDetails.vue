<template>
	<view :class="[fixed===false?'':'fixed']">

		<!-- 轮播图 -->
		<view v-if="details.length>0" style="width: 100%;height: 750rpx;position: relative;">
			<swiper class="details-swiper" :circular="true" :indicator-dots="true" :autoplay="true" @change="changeswiper"
				:interval="3000" :duration="1000" indicator-color="#D6D6D6 " indicator-active-color="#C59A5A">
				<swiper-item v-for="(item,index) in details" :key="index">
					<view class="details-swiper-img">
						<image :src="$utils.imageUrl(item)" class="img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="position-swiper">
				<view class="position-swiper-t">{{swiperCurrentIndex}}</view>
				<view class="position-swiper-q">/{{details.length}}</view>
			</view>
		</view>
		<!-- 不是轮播图的时候 -->
		<view v-else class="details-swiper">
			<view class="details-swiper-img">
				<!-- 报错就是这里... -->
				<image :src="$utils.imageUrl(head_img)" class="img" mode=""></image>
			</view>
		</view>

		<!-- 商品描述 -->
		<view class="details-alt">
			<view class="details-alt-title flex-between">
				<!-- 商品介绍 -->
				<view class="details-alt-text">{{alt.goodsname}}</view>
				<!-- <text class="details-alt-xq">{{alt.goodstitle}}</text> -->
			</view>
			<view class="details-alt-xq">{{alt.goodstitle}}</view>
			<!-- 价格 -->
			<view class="details-alt-left">
				<view class="details-alt-btm flex">
					<view class="details-alt-btm-price" v-if="level_name=='普通会员'">¥{{alt.price_level0}}</view>
					<view class="details-alt-btm-price" v-else-if="level_name=='企业会员'">
						<text>¥{{alt.price_level3}}</text>
						<image class="qi" src="../../static/qi.png" mode="widthFix"></image>
						<text class="details-alt-btm-discount  details-alt-line" >¥{{alt.price}}</text>
					</view>
                   
				</view>
			</view>
		</view>
		
		
		<!-- 商品详情/商品须知 -->
		<view class="details-choose" style="padding: 20rpx 26rpx;display: flex;align-items: center;"><text style="width: 4rpx;height: 32rpx;background: #AF7F38;margin-right: 12rpx;"></text>礼物详情</view>
		<u-parse :content="btmdetails"></u-parse>
		
		<view class="details-bottom-kong"></view>

		<!-- 底部 -->
		<view class="details-btm flex" :data-keynum="alt.keynum" @click="confirm_order" v-if="isShow==1">
			<view class="balance-view">去兑换</view>
		</view>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue";
	import '@/components/feng-parse/parse.css';
	import config from '../../common/config.js';
	import sr from 'sr-sdk-wxapp';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				fixed: false,
				list:[],
				details: [],
				alt: '',
				id: '',
				level_name: '',
				level: '',
				images: '',
				head_img: '',
				btmdetails: '',
				keynum: '',
				openid: '',
				goodsinfo: {},
				goods_item: '',
				isShow: 1,
				swiperCurrentIndex: 1
			}
		},
		onLoad: function(e) {
			if (e.keynum) {
				this.keynum = e.keynum;
				this.isShow = e.isShow;
			}

			this.level_name = uni.getStorageSync('level_name');
			this.level = uni.getStorageSync('level')

			this.id = uni.getStorageSync('id');
			let id = uni.getStorageSync('id');

			var data = '{"keynum":"' + this.keynum + '","memberid":"' + id + '"}';
			var action = 'get_goods_detail';
			this.$utils.post(action, data).then(res => {
				this.goodsinfo = res.rs.goodsinfo;

				//新增腾讯有数
				sr.track('browse_sku_page',
				  {
				    "sku": {
				      "sku_id": this.goodsinfo.id+"", // 若商品无sku_id时，可传spu_id信息
				      "sku_name": this.goodsinfo.goodsname // 若商品无sku_name时，可传spu_name信息
				    },
					"spu": {
						"spu_id": this.goodsinfo.id+"", // 若商品无spu_id时，可传sku_id信息
						"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
					},
				    "primary_image_url": this.goodsinfo.head_img
				  })

				// 首图					  
				this.head_img = res.rs.goodsinfo.head_img;
				// 多图
				if (res.rs.goodsinfo.images) {
					let details = res.rs.goodsinfo.images.split('|');
					details.unshift(res.rs.goodsinfo.head_img)
					this.details = details;
				}

				// 内容
				this.alt = res.rs.goodsinfo;

				// 商品详情
				this.btmdetails = res.rs.goodsinfo.details.replace(/<img /g, '<img class="rich_img" ');
				
				this.goodsid = res.rs.goodsinfo.id;

			})
		},
		computed: {
			
		},
		methods: {
			confirm_order:function (e){
				console.log(e);
				let keynum = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url: './index-address?good_keynum=' + keynum
				})
			},
			changeswiper(e) {
			    let {current, source} = e.detail
			    if(source === 'autoplay' || source === 'touch') {
			    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
			      this.swiperCurrentIndex = e.detail.current + 1;
			    }
			  },
		}
	}
</script>

<style>
	.details-alt-logo{
		width: 140rpx;
		height: auto;
	}
	.z-zlxz{
		background-color: #fff;
		padding: 26rpx;
	}
	.z-zlxz .z-zlxz-title{
		margin-bottom: 40rpx;
		margin-top: 60rpx;
	}
	.z-zlxz .z-zlxz-title .icon-hg{
		color: #CDAD6C;
		font-size: 34rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.z-zlxz .z-zlxz-title .text{
		color: #333;
		font-size: 30rpx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 10rpx;
		font-weight: bold;
	}
	.z-zlxz-second{
		color: #333;
		font-size: 28rpx;
		margin-bottom: 20rpx;
		font-weight: 600;
		font-size: 28rpx;
	}
	.z-zlxz-p{
		font-size: 28rpx;
		font-weight: 500;
		color: #999999;
		line-height: 1.5em;
		margin-bottom: 30rpx;
	}
	
	
	.details-hidden-inline {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		padding: 10rpx 30rpx !important;
		border-radius: 50rpx;
		background-color: #f5f5f5;
		color: #696969;
		border: none;
		margin: 0 20rpx 20rpx 0;
	}
	.details-hidden-alt{
		border: none;
		padding-bottom: 0;
	}

	.details-hidden-alt .active {
		border: 1px solid #BD2C00;
		background-color: #FFD2D2;
		color: #BD2C00;
	}

	.rich_img {
		width: 100% !important;
		margin-top: -4rpx;
	}

	.details-hidden-goodsname {
		white-space: normal !important;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: 40rpx !important;
		margin-top: 8rpx !important;
	}

	.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal {

		margin-bottom: 2rpx;

	}

	.swiper-box .wx-swiper-dot {

		width: 40rpx;

		display: inline-flex;

		height: 4rpx;

		margin-left: 10rpx;

		justify-content: space-between;

	}

	.swiper-box .wx-swiper-dot::before {

		content: '';

		flex-grow: 1;

		background: #ccc8c8;

	}

	.swiper-box .wx-swiper-dot-active::before {
		background: #239758;
	}

	.wxParse .img {
		margin: 0 !important;
		margin-top: 0rpx !important;
	}

	.wxParse .p {
		padding-bottom: 0rpx !important;
	}

	.details-join {
		display: inline-block;
		text-align: center;
		width: 200rpx;
		line-height: 40px;
		border-radius: 50px;
		background-color: #EFA13C;
		margin-right: 20rpx;
		/* margin-bottom: 10rpx; */
	}

	.details-give {
		display: inline-block;
		text-align: center;
		width: 200rpx;
		line-height: 40px;
		border-radius: 50px;
		background-color: #EC1815;
		/* margin-right: 25rpx; */
		/* margin-bottom: 10rpx; */
	}

	.details-alt-title {
		position: relative;
	}
	.slider{
		position: fixed;
		right: 0rpx;
		top: 50%;
	}
	.lilan {
		/* position: absolute;
		right: -20rpx;
		top: -10rpx; */
	}

	.gifts {
		/* position: absolute;
		top: 141rpx;
		right: -20rpx; */
	}

	.details-alt-xq {
		/* position: absolute; */
		/* top: 86rpx; */
		/* left: -5rpx; */
		color: #999999;
		font-size: 26rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.details-icon {
		/* width: 140rpx; */
	}

	.details-ch {
		font-weight: bold;
		color: #333333;
		font-size: 13px;
		font-family: "苹方 粗体";
	}

	.details-ch-xq {
		color: #666666;
		margin-left: 30rpx;
		font-size: 26rpx;
		font-family: "苹方 中等";
	}

	.details-alt-line {
		/* position: absolute; */
		/* left: 255rpx; */
		/* top: 910rpx; */
		color: #999999;
		font-size: 24rpx;
		vertical-align: middle; margin-left: 24rpx;
		text-decoration: line-through;
		display: inline-block;
	}
	.qi{
		width: 40rpx;
		margin-left: 6rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.biao {
		width: 63rpx;
		height: 33rpx;
		position: absolute;
		top: 910rpx;
		left: 175rpx;
	}

	.tab {
		width: 40rpx;
		height: 40rpx;
	}
    .tab1 {
    	width: 40rpx;
    	height: 40rpx;
		margin-top: -2rpx;
    }
	.flex-between-text {
		/* width: 100rpx; */
		/* margin-left: -28rpx; */
		font-family: "苹方 中等";
		font-size: 12px;
		color: #333333;
		padding-top: 0rpx;
		margin-top: 6rpx;
		margin-left: -2rpx;
	}
	
	.flex-between-img{
		width: 40rpx;
		height: 40rpx;
	}
	.person {
		width: 350rpx;
		height: 200rpx;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20rpx;
	}

	.close {
		width: 350rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin-top: 122rpx;
		margin-left: 0;
		color: #007AFF;
	}

	.per {
		color: #4C4C4C;
		position: absolute;
		top: 96rpx;
		left: 60rpx;
	}

	.details-hidden-prices {
		margin-top: 50rpx;
	}

	.details-hidden-prices span {
		color: red;
		position: absolute;
		top: 81rpx;
		left: 517rpx;
	}

	.details-hidden-number {
		/* width: 340rpx; */
		/* margin-top: -90rpx; */
		/* margin-left: 220rpx; */
		font-size: 28rpx;
		color: #999;
	}

	.buy {
		/* width: 100%; */
		height: 90rpx;
		line-height: 90rpx;
		/* position: absolute; */
		/* top: 655rpx; */
		/* left: 40rpx; */
		align-items: center;
	}
	.buy-num{
		font-size: 28rpx;
		color: #333;
		font-weight: normal;
	}
	.buy .flex-1{ 
		width: 60%;
		flex: 1;
		text-align: right;
	}
	.buy .flex-1>view{
		display: inline-block;
		vertical-align: middle;
	}

	/* 底部商品规格的减号 */
	.reduce {
		color: #979797;
		font-size: 32rpx;
	}

	.cart-count {
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #f5f5f5;
		margin: 0 10rpx;
	}

	.add {
		color: #979797;
		font-size: 32rpx;
	}

	.qiu {
		width: 100%;
		height: 240rpx;
	}

	.wx {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-bottom: 1px solid #EDEDED;
		display: block;
		background-color: #FFFFFF !important;
		color: #000 !important;
		font-size: 26rpx !important;
	}

	.close1 {
		border-top: 3px solid #EEEEEE;
	}

	.guige-name {
		/* width: 305rpx; */
		/* position: absolute; */
		/* top: 50rpx; */
		/* left: 250rpx; */
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
		flex: 1;
		width: 60%;
		margin-top: 30rpx;
	}
    .details-hidden-price{
		/* position: absolute; */
		/* left: 570rpx; */
		/* top: -24rpx; */
		font-size: 15px;
		margin-top: 0;
		margin-bottom: 0;
	}
	.chec {
		float: right;
	}
	.flex-between{
		display: flex;
		justify-content: unset;
	}
	.num_all {
	    position: absolute;
	    top: -4rpx;
	    left: 27rpx;
	    /* width: 20rpx; */
	    /* height: 20rpx; */
	    line-height: 20rpx;
	    text-align: center;
	    border-radius: 50%;
	    background-color: red;
	    font-size: 10px;
	    color: #fff;
	    padding: 2rpx 6rpx;
	}
	.bottom-lilan{
		display: inline-block;
		text-align: center;
		position: relative;
		margin-left: 30rpx;
	}
	.online_service{
		text-align: center;
		margin-right: 38rpx;
		display: inline-block;
		/* margin-left: 85rpx; */
		/* margin-top: -68rpx; */
	}
	.online{
		margin-top: -12rpx;
	}
	.details-hidden-close{
		position: absolute;
		top: 0;
		right: 0;
	}
	.shade{
		position: absolute;
		width: 100%;
		height: 100vh;
		background-color: transparent;
	}
	.details-hidden-determine{
		padding: 10rpx 30rpx;
		background-color: #fff;
		position: fixed;
		bottom: 20rpx;
		box-sizing: border-box;
	}
	.details-hidden-determine>view{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		color: #fff; background-color: #EC1815;
		border-radius: 50rpx;
	}
	
	.personal-item-li{
		width: 96rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0rpx;
		    padding: 0;
		    background: #FFFFFF;
	}
	
	.personal-item-li-img{
		width: 40rpx;
		height: 40rpx;
	}
	
	.item-li-img{
		width: 100%;
		height: 100%;
	}
	
	.personal-item-li-text{
		font-size: 24rpx;
		color: #333333;
		margin-top: 8rpx;
		text-align: center;
	}
	.personal-details-content{
		width: 100%;
		position: relative;
	}
	.new-img{
		width: 140rpx;
		height: 140rpx;
	}
	
	.balance-view{
		width: 660rpx;
		height: 80rpx;
		background: #EC1815;
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.position-swiper{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 105rpx;
		height: 40rpx;
		background: #B3B3B3;
		border-radius: 20rpx;
		border: 1px solid #B3B3B3;
		position: absolute;
	    bottom: 20rpx;
	    right: 20rpx;
	}
	.position-swiper-t{
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.position-swiper-q{
		font-size: 18rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 4rpx;
	}
</style>
