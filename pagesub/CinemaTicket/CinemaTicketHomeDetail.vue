<template>
	<view >
		<view style="margin-top: 0rpx;position: relative;display: flex;align-items: center;justify-content: center;">
			<swiper v-if="swiper.length>0" :autoplay="autoplay" :interval="interval" :duration="duration" circular class="own-swiper swiper-box" @change="changeswiper" :current="swiperCurrentIndex">
				<swiper-item v-for="(item,index) in swiper" :key="index">
					<image lazy-load="true" class="own-swiper-img" :src="$utils.imageUrl(item.banner)" 
					@click="bannerJump(item.jump_action, item.jump_id)" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<view class="indicator-view" v-if="swiper.length>0">
				<view :class="[swiperCurrentIndex == index ? 'indicator-view-item' : 'indicator-view-item-default']" v-for="(item,index) in swiper" :key="index"></view>
			</view>
			<view class="position-swiper">
				<view class="position-swiper-t">{{swiperIndex}}</view>
				<view class="position-swiper-q">/{{swiper.length}}</view>
			</view>
		</view>
		
		<view class="cth-b">
			<view class="cth-b-bg">
				<image class="cth-b-bg-1" src="https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"></image>
				<view class="cth-b-bg-2">
					<view class="cth-b-bg-2-1">
						<view class="cth-b-bg-2-1-1">失控玩家</view>
						<view class="cth-b-bg-2-1-2">
							<view class="cth-b-bg-2-1-2-1">3D</view>
							<view class="cth-b-bg-2-1-2-2">IMAX</view>
						</view>
					</view>
					<view class="cth-b-bg-2-2">114分钟/灾难/动作/中国大陆</view>
					<view class="cth-b-bg-2-3">2021-09-17 18:00 在中国大陆上映</view>
					<view class="cth-b-bg-2-4">
						<view v-for="item in imgList"><image class="cth-b-bg-2-4-img" :src="item.imgurl"></image></view>9.2分
					</view>
				</view>
			</view>
		</view>
		
		<view class="cth-content">
			<view class="cth-content-title">参演演员</view>
			<view class="cth-conten-view">
				<scroll-view scroll-x="true" class="scroll-view-top">
					<view style="display: flex;">
						<view class="scroll-view-item" style="padding-right: 20rpx;" v-for="(item,index) in cthList" :key="index" @click="clickTime" :data-timeindex="index">
							<image class="scroll-view-item-img" src="https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"></image>
							<view class="scroll-view-item-title">肖恩·利维</view>
							<view class="scroll-view-item-lable">导演</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view style="height: 160rpx;width: 100%;"></view>
		
		<view class="cthd-bottom" @click="clickBuy">
			<view class="cthd-bottom-title">购票</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper:[],
				swiperCurrentIndex: 0,
				swiperIndex: 1,
				autoplay: true,
				interval: 2000,
				duration: 500,
				cthList:[
					{
						'id': 1,
						"title":'失控玩家',
						"score":'9.2',
						"name":'肖恩·维利',
						"name1":'瑞安·雷诺兹 朱迪·科默',
						"time": '2021-09-30上映',
						"status": '1',
						"itemList":[
							{
								'title': '影城卡特惠¥19.9',
								'color': '#39B498'
							},
							{
								'title': '特惠票',
								'color': '#FF5B40'
							},
							{
								'title': '可改签',
								'color': '#427DE5'
							},
							{
								'title': '杜比影院',
								'color': '#DDDDDD'
							}
						]
					},
					{
						'id': 1,
						"title":'失控玩家',
						"score":'9.2',
						"name":'肖恩·维利',
						"name1":'瑞安·雷诺兹 朱迪·科默',
						"time": '2021-09-30上映',
						"status": '2',
						"itemList":[
							{
								'title': '影城卡特惠¥19.9',
								'color': '#39B498'
							},
							{
								'title': '特惠票',
								'color': '#FF5B40'
							},
							{
								'title': '可改签',
								'color': '#427DE5'
							},
							{
								'title': '杜比影院',
								'color': '#DDDDDD'
							}
						]
					},
					{
						'id': 1,
						"title":'失控玩家',
						"score":'9.2',
						"name":'肖恩·维利',
						"name1":'瑞安·雷诺兹 朱迪·科默',
						"time": '2021-09-30上映',
						"status": '1',
						"itemList":[
							{
								'title': '影城卡特惠¥19.9',
								'color': '#39B498'
							},
							{
								'title': '特惠票',
								'color': '#FF5B40'
							},
							{
								'title': '可改签',
								'color': '#427DE5'
							},
							{
								'title': '杜比影院',
								'color': '#DDDDDD'
							}
						]
					},
					{
						'id': 1,
						"title":'失控玩家',
						"score":'9.2',
						"name":'肖恩·维利',
						"name1":'瑞安·雷诺兹 朱迪·科默',
						"time": '2021-09-30上映',
						"status": '3',
						"itemList":[
							{
								'title': '影城卡特惠¥19.9',
								'color': '#39B498'
							},
							{
								'title': '特惠票',
								'color': '#FF5B40'
							},
							{
								'title': '可改签',
								'color': '#427DE5'
							},
							{
								'title': '杜比影院',
								'color': '#DDDDDD'
							}
						]
					},
					{
						'id': 1,
						"title":'失控玩家',
						"score":'9.2',
						"name":'肖恩·维利',
						"name1":'瑞安·雷诺兹 朱迪·科默',
						"time": '2021-09-30上映',
						"status": '1'
					},
				],
				imgList: [
					{
						imgurl: 'https://zhijianlw.com/static/web/img/icon_star_10_20.png'
					},
					{
						imgurl: 'https://zhijianlw.com/static/web/img/icon_star_10_20.png'
					},
					{
						imgurl: 'https://zhijianlw.com/static/web/img/icon_star_10_20.png'
					},
					{
						imgurl: 'https://zhijianlw.com/static/web/img/icon_star_10_20.png'
					},
					{
						imgurl: 'https://zhijianlw.com/static/web/img/icon_star_default_10_20.png'
					}
				]
			} 
		},
		onLoad:function(options){
			let that = this;
			// 轮播图
			var data = JSON.stringify({a:0}); 
			var action = 'get_banner';
			this.$utils.post(action, data).then(res => {
				console.log("轮播图：",res);
				this.swiper = res.rs;
			});
			
		},
		methods: {
			changeswiper(e) {
			    let {current, source} = e.detail
			    if(source === 'autoplay' || source === 'touch') {
			    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
			      this.swiperCurrentIndex = e.detail.current;
				  this.swiperIndex = e.detail.current + 1;
			    }
			},
			
		}
	}
</script>

<style>
page{
	background-color: #FFFFFF;
}

/**
		 * 
		 */
		.own-swiper{
			box-sizing: border-box;
			width: 100%;
			height: 488rpx;
			border-radius: 0rpx;
			/* margin-top: -50rpx; */
			/* position: fixed; */
			/* z-index: 99; */
		}
		.swiper-box {
			border-radius: 0rpx;
			overflow: hidden;
			transform: translateY(0);
		}
		swiper-item{
			border-radius: 00rpx !important;
		}
		.own-swiper-img{
			width: 100%;
			height: 100%!important;
			border-radius: 0rpx;
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
			bottom: 32rpx;
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
		
		.position-swiper{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
		    height: 30rpx;
			background: #000000;
			border-radius: 20rpx;
			border: 1px solid #FFFFFF;
			position: absolute;
		    bottom: 20rpx;
		    right: 20rpx;
			opacity: 0.29;
		}
		.position-swiper-t{
			font-size: 18rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
		.position-swiper-q{
			font-size: 18rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
		
		
		.cth-b{
			margin-top: 60rpx;
			padding: 0rpx 25rpx;
		}
		.cth-b-bg{
			width: 700rpx;
			/* height: 250rpx;
			background: #FFFFFF; */
			/* border-radius: 1px; */
			/* padding: 20rpx 17rpx; */
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.cth-b-bg-1{
			width: 190rpx;
			height: 266rpx;
			border-radius: 6rpx;
		}
		.cth-b-bg-2{
			margin-left: 24rpx;
			width: 480rpx;
			position: relative;
		}
		.cth-b-bg-2-1{
			display: flex;
			align-items: center;
		}
		.cth-b-bg-2-1-1{
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
		}
		.cth-b-bg-2-1-2{
			display: flex;
			margin-left: 10rpx;
			width: 92rpx;
			    height: 36rpx;
			border-radius: 4rpx;
			border: 1px solid #AAAAAA;
		}
		.cth-b-bg-2-1-2-1{
			display: flex;
		    align-items: center;
		    justify-content: center;
			width: 36rpx;
			height: 32rpx;
			background: #AAAAAA;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 17rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.cth-b-bg-2-1-2-2{
		    display: flex;
		    align-items: center;
		    justify-content: center;
			width: 56rpx;
			height: 32rpx;
			background: #FFFFFF;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 17rpx;
			font-weight: bold;
			color: #AAAAAA;
		}
		.cth-b-bg-2-2{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
			margin-top: 28rpx;
		}
		
		.cth-b-bg-2-3{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
			margin-top: 28rpx;
		}
		.cth-b-bg-2-4{
			display: flex;
			align-items: center;
			margin-top: 40rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #FA9800;
		}
		.cth-b-bg-2-4-img{
			width: 22rpx;
			height: 22rpx;
			margin-right: 8rpx;
		}
		
		.cth-content{
			margin-top: 56rpx;
			padding: 0rpx 25rpx;
		}
		.cth-content-title{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		
		
		.cth-conten-view{
			height: 350rpx;
			display: flex;
			align-items: center;
			background: #FFFFFF;
			margin-top: 18rpx;
		}
		.scroll-view-top{
			height: 350rpx !important;
		}
		.scroll-view-item{
			display: flex;
		    align-items: center;
			flex-direction: column;
		}
		scroll-view{
			height: 350rpx !important;
		}
		
		
		
		.scroll-view-item-img{
			width: 160rpx;
			height: 250rpx;
			border-radius: 6rpx;
		}
		.cth-content-title{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		.scroll-view-item-title{
			font-size: 26rpx;
			color: #333333;
			margin-top: 26rpx;
		}
		.scroll-view-item-lable{
			font-size: 24rpx;
			color: #666666;
			margin-top: 14rpx;
		}
		
		.cthd-bottom{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 750rpx;
			height: 126rpx;
			background: #FAFAFA;
			border-radius: 20rpx 20rpx 0px 0px;
			position: fixed;
		    bottom: 0rpx;
		}
		
		.cthd-bottom-title{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 700rpx;
			height: 88rpx;
			background: linear-gradient(61deg, #E96C56 0%, #ED2430 100%);
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
</style>
