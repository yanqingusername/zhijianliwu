<template>
	<view>
		<view class="cd-a">
			<view class="cd-a-img">
				<view class="cd-a-item">
					<view class="cd-a-item-left">
						<view class="cd-a-item-left-title">万达影城丰台万达广场店</view>
						<view class="cd-a-item-left-1">
							<view class="cd-a-item-left-1-1">丰台区丰科路6号万达广场购物中心6层…</view>
							<view class="cd-a-item-left-1-2">· 2.0km</view>
						</view>
						<view class="cd-a-item-left-lable">好评度94% · 可改签 · 3D眼镜收费 · 儿童特惠</view>
					</view>
					<view class="cd-a-item-right">
						<image class="cd-a-item-right-img"
							src="https://zhijianlw.com/static/web/img/icon_cd_position_2021_10_21.png"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="" style="padding-top: 40rpx;background: #FFFFFF;">
			<view class="">
				<swiper class="swiper-tall" :indicator-dots="indicatorDots" :autoplay="autoplay"
					:previous-margin="previousMargin" :next-margin="nextMargin" :circular="circular" @change="change"
					:current="swiperCurrentIndex">
					<swiper-item class="swiper-container" v-for="(item,index) in textList" :key="index">
						<image :class="swiperCurrentIndex == index ? 'swiper-item' : 'swiper-itemDefault'"
							:src="$utils.imageUrl(item.background)">
						</image>
					</swiper-item>
				</swiper>
			</view>
			<view class="cd-b">失控玩家<text class="cd-b-1">评分</text><text class="cd-b-2">8.7</text></view>
			<view class="cd-c">{{'115分钟 | 动作 | 瑞安·雷诺兹、朱迪·科默、里尔·莱尔·哈瓦瑞…  >'}}</view>
			<view style="height: 30rpx;"></view>
			
			<view class="cth-a">
				<scroll-view scroll-x="true" class="scroll-view-top">
						<view style="display: flex;padding-left: 44rpx;">
							<view class="cth-a-2" style="padding-right: 36rpx;" v-for="(item,index) in itemsTime" :key="index" @click="clickTime" :data-timeindex="index">
								<view :class="[timeIndex == index ? 'cth-a-2-1' : 'cth-a-2-1-default']">{{item.title}}</view>
								<view :class="[timeIndex == index ? 'cth-a-2-2' : 'cth-a-2-2-default']"></view>
							</view>
						</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="cd-item-view">
			<view class="cd-item" v-for="(item,index) in textList" :style="index == 0 ? 'margin-top: 14rpx;' : 'margin-top:20rpx;'">
				<view class="cd-item-left">
					<view class="cd-item-left-1"><text class="cd-item-left-1-1">18:10</text><text class="cd-item-left-1-2">国语 2D</text></view>
					<view class="cd-item-left-2"><text class="cd-item-left-2-1">20:09散场</text><text class="cd-item-left-2-2">11号激光厅</text></view>
				</view>
				<view class="cd-item-right">
					<view class="cd-item-right-1">¥<text class="cd-item-right-1-1">27.8</text><text class="cd-item-right-1-2">起</text></view>
					<!-- <view class="cd-item-right-2">满座</view> -->
					<view class="cd-item-right-3">购票</view>
				</view>
			</view>
		</view>

		<view style="height: 40rpx;"></view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				previousMargin: '148px',
				nextMargin: '148px',
				circular: true,
				swiperCurrentIndex: 0,
				textList:[
					{
						"background": "https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"
					},
					{
						"background": "https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"
					},
					{
						"background": "https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"
					},
					{
						"background": "https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"
					},
					{
						"background": "https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"
					},
					{
						"background": "https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"
					}
				],
				itemsTime:[
					{
						'title': '今天 09-22',
					},
					{
						'title': '明天 09-23',
					},
					{
						'title': '后天 09-24',
					},
					{
						'title': '周六 09-25',
					},
					{
						'title': '周日 09-25',
					},
				],
				timeIndex: 0,
			}
		},
		onLoad: function(options) {
			let that = this;


		},
		methods: {
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				
			},
			clickTime(e){
				this.timeIndex = e.currentTarget.dataset.timeindex;
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.cd-a {
		margin-top: 0rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 320rpx;
		background-image: url(https://zhijianlw.com/static/web/img/icon_cd_film_2021_10_21.png);
		background-size: 750rpx 320rpx;
	}

	.cd-a-img {
		position: absolute;
		bottom: -18rpx;
		/* left: 0rpx; */
		width: 730rpx;
		height: 242rpx;
		background-image: url(https://zhijianlw.com/static/web/img/icon_cd_map_2021_10_21.png);
		background-size: 730rpx 242rpx;
	}

	.cd-a-item {
		padding: 54rpx 44rpx 42rpx 46rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cd-a-item-left {
		width: 570rpx;
	}

	.cd-a-item-left-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.cd-a-item-left-1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 24rpx;
	}

	.cd-a-item-left-1-1 {
		width: 438rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
	}

	.cd-a-item-left-1-2 {
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
		margin-left: 32rpx;
	}

	.cd-a-item-left-lable {
		font-size: 18rpx;
		color: #999999;
		margin-top: 24rpx;
	}

	.cd-a-item-right {
		width: 72rpx;
		height: 72rpx;
	}

	.cd-a-item-right-img {
		width: 72rpx;
		height: 72rpx;
	}
	
	.swiper-tall {
		display: flex;
		align-items: center;
		height: 216rpx;
	}
	.swiper-container {
		display: flex;
		align-items: flex-end;
		border-radius: 6rpx;
	}
	.swiper-itemDefault{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		height: 180rpx;
		width: 136rpx;
		text-align: center;
		border-radius: 6rpx;
	}
	swiper-item {
		border-radius: 6rpx;
	}
	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		width: 170rpx;
	    height: 216rpx;
		text-align: center;
		border-radius: 6rpx;
	}
	
	.cd-b{
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		justify-content: center;
	}
	.cd-b-1{
		margin-left: 20rpx;
		font-size: 26rpx;
		color: #333333;
	}
	.cd-b-2{
		margin-left: 6rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FA9800;
	}
	.cd-c{
		font-size: 20rpx;
		color: #999999;
		margin-top: 18rpx;
		text-align: center;
	}
	
	.cth-a{
		/* height: 60rpx; */
		/* border-top: 1px solid #F5F5F5; */
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}
	.scroll-view-top{
		height: 48rpx !important;
	}
	.cth-a-2{
		/* width: 130rpx; */
		display: flex;
	    align-items: center;
		flex-direction: column;
		margin-top: 0rpx;
	}
	.cth-a-2-1{
		font-size: 24rpx;
		font-weight: bold;
		color: #333333;
	}
	.cth-a-2-1-default{
		font-size: 24rpx;
		color: #999999;
	}
	.cth-a-2-2{
		width: 28rpx;
		height: 4rpx;
		background: #DB3C3A;
		border-radius: 2rpx;
	    margin-top: 12rpx;
	}
	.cth-a-2-2-default{
		width: 28rpx;
		height: 4rpx;
		background: #FFFFFF;
		border-radius: 2rpx;
		margin-top: 12rpx;
	}
	
	.cd-item-view{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.cd-item{
		width: 700rpx;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 6rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 20rpx 30rpx 30rpx;
	}
	
	.cd-item-left{
		display: flex;
		/* align-items: center; */
		flex-direction: column;
	}
	.cd-item-left-1{
		display: flex;
		align-items: baseline;
	}
	.cd-item-left-1-1{
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		width: 90rpx;
	}
	.cd-item-left-1-2{
		margin-left: 24rpx;
		font-size: 22rpx;
		color: #666666;
	}
	
	.cd-item-left-2{
		display: flex;
		align-items: baseline;
		margin-top: 20rpx;
	}
	
	.cd-item-left-2-1{
		font-size: 18rpx;
		color: #999999;
		width: 90rpx;
	}
	.cd-item-left-2-2{
		font-size: 18rpx;
		color: #999999;
		margin-left: 24rpx;
	}
	
	.cd-item-right{
		display: flex;
		align-items: center;
	}
	.cd-item-right-1{
		font-size: 28rpx;
		color: #E02020;
	}
	.cd-item-right-1-1{
		font-size: 36rpx;
		color: #E02020;
		font-weight: bold;
	}
	.cd-item-right-1-2{
		font-size: 24rpx;
		color: #999999;
		margin-left: 4rpx;
	}
	.cd-item-right-2{
		margin-left: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 116rpx;
		height: 56rpx;
		border-radius: 30rpx;
		border: 2rpx solid #AAAAAA;
		font-size: 26rpx;
		font-weight: bold;
		color: #AAAAAA;
	}
	
	.cd-item-right-3{
		margin-left: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 116rpx;
		height: 56rpx;
		border-radius: 30rpx;
		border: 2rpx solid #DB3C3A;
		font-size: 26rpx;
		font-weight: bold;
		color: #DB3C3A;
	}
	
</style>
