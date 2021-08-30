<template>
	<view style="padding: 0 26rpx; margin-top: -210rpx;position: relative;display: flex;align-items: center;justify-content: center;">
		<swiper v-if="swiper.length>0" :autoplay="isOne" circular class="own-swiper swiper-box" @change="change" :current="swiperCurrentIndex">
			<swiper-item v-for="(item,index) in swiper" :key="index">
				<image lazy-load="true" class="own-swiper-img" :src="$utils.imageUrl(item.banner)" 
				@click="bannerJump(item.jump_action, item.jump_id)" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="indicator-view">
			<view :class="[swiperCurrentIndex == index ? 'indicator-view-item' : 'indicator-view-item-default']" v-for="(item,index) in swiper" :key="index"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			"swiper"
		],
		data() {
			return {
				swiperCurrentIndex: 0,
			}
		},
		methods: {
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
			},
			bannerJump:function(action, id){
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
			}
		},
		computed:{
			isOne: function(){
				return this.swiper.length<=1?false:true;
			}
		}
	}
</script>

<style scope>
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
	display: flex
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
</style>
