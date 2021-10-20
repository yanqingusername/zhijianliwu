<template>
	<view >
		<view class="cth-a">
			<view class="cth-a-1">
				<view style="display: flex;align-items: center;">
					<image class="cth-a-1-1" src="https://zhijianlw.com/static/web/img/icon_2021_10_19_01.png"></image>
					<view class="cth-a-1-2">{{cityname || '北京'}}</view>
				</view>
				<view class="cth-a-2-2-default"></view>
			</view>
			<view class="cth-a-2" style="margin-left: 40rpx;" @click="clickTabs" data-tabnumber="0">
				<view :class="tabNumber == 0 ? 'cth-a-2-1' : 'cth-a-2-1-default'">热映</view>
				<view :class="tabNumber == 0 ? 'cth-a-2-2' : 'cth-a-2-2-default'"></view>
			</view>
			<view class="cth-a-2" @click="clickTabs" data-tabnumber="1">
				<view :class="tabNumber == 1 ? 'cth-a-2-1' : 'cth-a-2-1-default'">待映</view>
				<view :class="tabNumber == 1 ? 'cth-a-2-2' : 'cth-a-2-2-default'"></view>
			</view>
			<view class="cth-a-2" @click="clickTabs" data-tabnumber="2">
				<view :class="tabNumber == 2 ? 'cth-a-2-1' : 'cth-a-2-1-default'">影院</view>
				<view :class="tabNumber == 2 ? 'cth-a-2-2' : 'cth-a-2-2-default'"></view>
			</view>
		</view>
		
		<view v-if="tabNumber == 0 || tabNumber == 1" style="padding: 16rpx 26rpx 20rpx 26rpx; margin-top: 0rpx;position: relative;display: flex;align-items: center;justify-content: center;">
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
		
		<view v-if="tabNumber == 0" class="cth-b" v-for="(item,index) in cthList" :key="index">
			<view class="cth-b-bg">
				<image class="cth-b-bg-1" src="https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"></image>
				<view class="cth-b-bg-2">
					<view class="cth-b-bg-2-1">
						<view class="cth-b-bg-2-1-1">{{item.title}}</view>
						<view class="cth-b-bg-2-1-2">
							<view class="cth-b-bg-2-1-2-1">3D</view>
							<view class="cth-b-bg-2-1-2-2">IMAX</view>
						</view>
					</view>
					<view class="cth-b-bg-2-2">评分<text class="cth-b-bg-2-2-1">{{item.score}}</text></view>
					<view class="cth-b-bg-2-3">导演：{{item.name}}</view>
					<view class="cth-b-bg-2-4">主演：{{item.name1}}</view>
					
					<view class="cth-b-bg-2-5">购票</view>
				</view>
			</view>
		</view>
		
		<view v-if="tabNumber == 1" class="cth-b" v-for="(item,index) in cthList" :key="index">
			<view class="cth-b-bg">
				<image class="cth-b-bg-1" src="https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"></image>
				<view class="cth-b-bg-2">
					<view class="cth-b-bg-2-1">
						<view class="cth-b-bg-2-1-1">{{item.title}}</view>
						<view class="cth-b-bg-2-1-2">
							<view class="cth-b-bg-2-1-2-1">3D</view>
							<view class="cth-b-bg-2-1-2-2">IMAX</view>
						</view>
					</view>
					<view class="cth-b-bg-2-2">{{item.time}}</view>
					<view class="cth-b-bg-2-3">导演：{{item.name}}</view>
					<view class="cth-b-bg-2-4">主演：{{item.name1}}</view>
					
					<view class="cth-b-bg-2-6" v-if="item.status ==1">预售</view>
					<view class="cth-b-bg-2-7" v-if="item.status ==2">想看</view>
					<view class="cth-b-bg-2-8" v-if="item.status ==3">已想看</view>
				</view>
			</view>
		</view>
		
		<view v-if="tabNumber == 2" class="cth-c">
			<view class="cth-c-top" style="padding-right: 30rpx;height: 100rpx;" v-if="isSearch">
				<view class="cth-search-top">
					<image class="cth-search-top-1" src="https://zhijianlw.com/static/web/img/icon_search_10_19.png"></image>
					<input type="text" name="keyword" @input="onkeyword" :value="keyword" placeholder="影院名称或地址" placeholder-style="color: #AAAAAA;font-size: 28rpx;"/>
					<image class="cth-search-top-1" src="https://zhijianlw.com/static/web/img/icon_close_tab_10_19.png"></image>
				</view>
				<view class="cth-search-top-title" @click="clickSearch">取消</view>
			</view>
			<view class="cth-c-top-two" v-else>
				<view class="cth-c-top" style="padding-left: 30rpx;">
					<view class="cth-c-1">
						<view class="cth-c-1-1">北京<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
						<view class="cth-c-1-1" style="margin-left: 10rpx;">全城<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
						<view @click="clickSelect" class="cth-c-1-1" style="margin-left: 10rpx;">筛选<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
					</view>
					<view class="cth-c-top-img" @click="clickSearch"><image class="cth-c-top-img" src="https://zhijianlw.com/static/web/img/icon_search_tab_10_19.png"></image></view>
				</view>
				
				<view class="cth-select-view" v-if="tabNumber == 2 && currTag" @click="clickSelect">
					<view class="cthtop-view">
						<scroll-view scroll-y="true">
							<view class="cthtop-view-1">
								<view class="cthtop-view-left">放映影厅</view>
								<view class="cthtop-view-right" @click="clickSearch">展开<image class="cthtop-view-right-img" src="https://zhijianlw.com/static/web/img/icon_down_10_19.png"></image></view>
							</view>
							<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
								<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
							</view>
						
							<view class="cthtop-view-1">
								<view class="cthtop-view-left">影院服务</view>
							</view>
							<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
								<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
							</view>
							
							<view class="cthtop-view-1">
								<view class="cthtop-view-left">影院品牌</view>
								<view class="cthtop-view-right" @click="clickSearch">展开<image class="cthtop-view-right-img" src="https://zhijianlw.com/static/web/img/icon_down_10_19.png"></image></view>
							</view>
							<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
								<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
							</view>
						</scroll-view>
						<view class="cth-select-bottom">
							<view class="cth-select-bottom-left">清空</view>
							<view class="cth-select-bottom-right">完成</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="cth-c-item" v-for="(item,index) in cthList" :key="index">
				<view class="cth-c-bg">
					<view class="cth-c-bg-view">
						<view class="cth-c-bg-1">万达影城丰台万达广场店</view>
						<view class="cth-c-bg-2"><text class="cth-c-bg-2-1">¥44.9</text><text class="cth-c-bg-2-2">¥27.8</text><text class="cth-c-bg-2-3">起</text></view>
					</view>
					<view class="cth-c-bg-view" style="margin-top: 18rpx;">
						<view class="cth-c-bg-3">丰台区丰科路6号万达广场6层</view>
						<view class="cth-c-bg-4">3.3km</view>
					</view>
					<view style="margin-top: 20rpx;display: flex;flex-wrap: wrap;">
						<view v-for="(itemInfo,index) in item.itemList" :key="index" class="cth-c-bg-label" :style="'border: 1px solid'+ itemInfo.color+';color: '+itemInfo.color+';'">{{itemInfo.title}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="cth-positon" v-if="tabNumber == 0" @click="clickMyOrder"></view>
		
		<!-- 筛选 -->
		<uni-popup ref="cthcenter" type="top" :animation="false" @change="changePop">
			<view class="cthtop-view" @click="$buttonClick(submitcoupon)">
				<view class="cthtop-view-1">
					<view class="cthtop-view-left">放映影厅</view>
					<view class="cthtop-view-right" @click="clickSearch">展开<image class="cthtop-view-right-img" src="https://zhijianlw.com/static/web/img/icon_down_10_19.png"></image></view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabNumber: 2,
				currTag: false,
				swiper:[],
				swiperCurrentIndex: 0,
				autoplay: true,
				interval: 2000,
				duration: 500,
				isSearch: false,
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
					}
				],
				itemsList:[
					{
						'title': 'IMAX厅',
					},
					{
						'title': 'IMAX厅',
					},
					{
						'title': 'IMAX厅',
					},
					{
						'title': 'IMAX厅',
					}
				]
			} 
		},
		onLoad:function(options){
			// 轮播图
			var data = JSON.stringify({a:0}); 
			var action = 'get_banner';
			this.$utils.post(action, data).then(res => {
				console.log("轮播图：",res);
				this.swiper = res.rs;
			});
			
			// this.$refs['cthcenter'].open();
			
		},
		methods: {
			clickTabs(e){
				this.tabNumber = e.currentTarget.dataset.tabnumber;
				this.currTag = false;
			},
			changeswiper(e) {
			    let {current, source} = e.detail
			    if(source === 'autoplay' || source === 'touch') {
			    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
			      this.swiperCurrentIndex = e.detail.current;
			    }
			},
			clickSearch(){
				this.isSearch = !this.isSearch;
				this.currTag = false;
			},
			clickSelect(){
				this.currTag = !this.currTag;
			}
		}
	}
</script>

<style>
page{
	background-color: #F5F5F5;
}

.cth-a{
	height: 90rpx;
	border-top: 1px solid #F5F5F5;
	display: flex;
	align-items: center;
	background: #FFFFFF;
}
.cth-a-1{
	display: flex;
	align-items: center;
	padding-left: 32rpx;
	flex-direction: column;
	margin-top: 20rpx;
}
.cth-a-1-1{
	width: 40rpx;
	height: 40rpx;
	margin-right: 6rpx;
}
.cth-a-1-2{
	font-size: 30rpx;
	color: #666666;
}
.cth-a-2{
	width: 128rpx;
	display: flex;
    flex-direction: column;
    align-items: center;
	margin-top: 20rpx;
}
.cth-a-2-1{
	font-size: 30rpx;
	font-weight: bold;
	color: #333333;
}
.cth-a-2-1-default{
	font-size: 30rpx;
	color: #333333;
}
.cth-a-2-2{
	width: 26rpx;
    height: 5rpx;
    background: #DB3C3A;
    border-radius: 2rpx;
    margin-top: 12rpx;
}
.cth-a-2-2-default{
	width: 26rpx;
	height: 5rpx;
	background: #FFFFFF;
	border-radius: 2rpx;
	margin-top: 12rpx;
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
		.cth-b{
			padding: 0rpx 25rpx;
			padding-bottom: 20rpx;
		}
		.cth-b-bg{
			width: 700rpx;
			height: 250rpx;
			background: #FFFFFF;
			border-radius: 1px;
			padding: 20rpx 17rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.cth-b-bg-1{
			width: 150rpx;
			height: 210rpx;
			border-radius: 6rpx;
		}
		.cth-b-bg-2{
			margin-left: 24rpx;
			width: 470rpx;
			position: relative;
		}
		.cth-b-bg-2-1{
			display: flex;
			align-items: center;
		}
		.cth-b-bg-2-1-1{
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		.cth-b-bg-2-1-2{
			display: flex;
			margin-left: 10rpx;
			width: 76rpx;
			height: 30rpx;
			border-radius: 3rpx;
			border: 1px solid #AAAAAA;
		}
		.cth-b-bg-2-1-2-1{
			display: flex;
		    align-items: center;
		    justify-content: center;
			width: 30rpx;
			height: 26rpx;
			background: #AAAAAA;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 14rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.cth-b-bg-2-1-2-2{
		    display: flex;
		    align-items: center;
		    justify-content: center;
			width: 46rpx;
			height: 26rpx;
			background: #FFFFFF;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 14rpx;
			font-weight: bold;
			color: #AAAAAA;
		}
		.cth-b-bg-2-2{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 26rpx;
		}
		.cth-b-bg-2-2-1{
			font-size: 26rpx;
			font-weight: bold;
			color: #FA6400;
			margin-left: 6rpx;
		}
		.cth-b-bg-2-3{
			font-size: 20rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 20rpx;
		}
		.cth-b-bg-2-4{
			font-size: 20rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 20rpx;
		}
		.cth-b-bg-2-5{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: 0rpx;
			top: 56rpx;
			width: 120rpx;
			height: 60rpx;
			background: linear-gradient(61deg, #E96C56 0%, #ED2430 100%);
			border-radius: 30rpx;
			font-size: 26rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		
		.cth-b-bg-2-6{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: 0rpx;
			top: 56rpx;
			width: 128rpx;
			height: 60rpx;
			background: linear-gradient(57deg, #5BA3EE 0%, #427DE5 100%);
			border-radius: 30rpx;
			font-size: 26rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		
		.cth-b-bg-2-7{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: 0rpx;
			top: 56rpx;
			width: 128rpx;
			height: 60rpx;
			background: linear-gradient(57deg, #F7CA7F 0%, #EEAA42 100%);
			border-radius: 30rpx;
			font-size: 26rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		
		.cth-b-bg-2-8{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: 0rpx;
			top: 56rpx;
			width: 124rpx;
			height: 56rpx;
			border-radius: 30rpx;
			border: 2rpx solid #AAAAAA;
			font-size: 26rpx;
			font-weight: bold;
			color: #999999;
		}
		.cth-positon{
			position: fixed;
			bottom: 206rpx;
			right: 0rpx;
			width: 210rpx;
			height: 90rpx;
			background-image: url(https://zhijianlw.com/static/web/img/icon_2021_10_19_03.png);
			background-size: 210rpx 90rpx;
			font-size: 26rpx;
			font-weight: bold;
			color: #FFFFFF;
			display: flex;
			align-items: center;
		    justify-content: center;
		}
		
		.cth-c{
			
		}
		
		.cth-c-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			background: #FFFFFF;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}
		
		.cth-c-top-two{
			display: flex;
			/* align-items: center; */
			background: #FFFFFF;
			flex-direction: column;
		}
		
		.cth-c-1{
			display: flex;
			align-items: center;
		}
		
		.cth-c-1-1{
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			width: 100rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.cth-c-1-1-1{
			width: 16rpx;
			height: 16rpx;
			margin-left: 4rpx;
		}
		
		.cth-c-top-img{
			width: 40rpx;
			height: 40rpx;
		}
		
		.cth-c-item{
			padding: 20rpx 25rpx 0rpx;
		}
		
		.cth-c-bg{
			/* width: 700px; */
			/* height: 200px; */
			background: #FFFFFF;
			border-radius: 6px;
			padding: 30rpx 18rpx 30rpx 30rpx;
			display: flex;
			/* align-items: center; */
			justify-content: space-between;
			flex-direction: column;
		}
		.cth-c-bg-view{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
		}
		
		.cth-c-bg-1{
			width: 420rpx;
			word-wrap: break-word;
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		.cth-c-bg-2{
			
		}
		.cth-c-bg-2-1{
			font-size: 24rpx;
			color: #999999;
		}
		.cth-c-bg-2-2{
			font-size: 30rpx;
			font-weight: bold;
			color: #E02020;
			margin-left: 10rpx;
		}
		.cth-c-bg-2-3{
			font-size: 24rpx;
			font-weight: bold;
			color: #999999;
			margin-left: 4rpx;
		}
		.cth-c-bg-3{
			width: 420rpx;
			word-wrap: break-word;
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
		}
		.cth-c-bg-4{
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
		}
		
		.cth-c-bg-label{
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 2rpx;
			opacity: 0.7;
			border: 1px solid #39B498;
			font-size: 18rpx;
			color: #39B498;
			padding: 2rpx 8rpx;
			margin-right: 10rpx;
		}
		
		
		.cth-search-top{
			width: 600rpx;
			height: 66rpx;
			background: #F2F2F2;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
		}
		.cth-search-top-1{
			width: 32rpx;
			height: 32rpx;
			margin-left: 24rpx;
		}
		.cth-search-top input{
			width: 460rpx;
			height: 40rpx;
			font-size: 28rpx;
			color: #333333;
			margin-left: 8rpx;
		}
		.cth-search-top-title{
			width: 70rpx;
			height: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #999999;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 20rpx;
		}
		.cth-select-view{
			    width: 750rpx;
			        height: 100%;
			        border-radius: 0px 0px 20rpx 20rpx;
			        position: fixed;
			        z-index: 99;
			        background: rgba(0, 0, 0, .34);
			        /* opacity: 0.34; */
			        margin-top: 80rpx;
		}
		.cthtop-view{
			width: 750rpx;
			height: 900rpx;
			background: #FFFFFF;
			border-radius: 0px 0px 20rpx 20rpx;
			position: relative;
		}
		
		.cthtop-view-1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50rpx;
			background: #FFFFFF;
			padding-left: 44rpx;
			padding-right: 40rpx;
		}
		
		.cthtop-view-left{
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
		}
		
		.cthtop-view-right{
			font-size: 23rpx;
			color: #999999;
			display: flex;
			align-items: center;
		}
		.cthtop-view-right-img{
			width: 18rpx;
			height: 18rpx;
			margin-left: 6rpx;
		}
		.cthtop-view-label{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 206rpx;
			height: 70rpx;
			background: #F6F6F6;
			border-radius: 10rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
			margin: 0rpx 10rpx 20rpx;
		}
		.cth-select-bottom{
			position: absolute;
			bottom: 0rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 750rpx;
			height: 140rpx;
			background: #FFFFFF;
			border-radius: 0px 0px 20rpx 20rpx;
		}
		.cth-select-bottom-left{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 318rpx;
			height: 78rpx;
			border-radius: 44px;
			border: 2rpx solid #CCCCCC;
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		
		.cth-select-bottom-right{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 318rpx;
			height: 78rpx;
			border-radius: 44px;
			border: 2rpx solid #DF5250;
			background: #DF5250;
			font-size: 30rpx;
			font-weight: bold;
			color: #FFFFFF;
			margin-left: 20rpx;
		}
		
		scroll-view{
			height: 760rpx !important;
		}
</style>
