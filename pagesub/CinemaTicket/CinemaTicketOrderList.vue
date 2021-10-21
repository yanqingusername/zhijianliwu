<template>
	<view style="width: 100%;overflow-x: hidden;display: flex;flex-direction: column;box-sizing: border-box;">
		<view class="personal-header" :style="'height:' + (isSystemInfo ? '100' : '70') + 'px;'">
			<view class="my-nav" :style="'height:'+nav+'px'"></view>
			<view class="personal-header-interstall" >
				<view style="display: flex;position: absolute;align-items: center;left: 20rpx;">
					<image @click="$buttonClick(backbutton)" class="icon-back-img" src="https://zhijianlw.com/static/web/img/icon_cime_back_2021_10_21.png"></image>
					<view class="personal-header-lable">首页</view>
				</view>
				<view class="personal-header-title">我的订单</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav:'20',
				isSystemInfo: false
			}
		},
		onLoad:function(options){
			let that = this;
			uni.getSystemInfo({
				success: res=>{
					 // 导航高度
					this.nav = res.statusBarHeight 
				}
			})
			
			this.isSystemInfo = this.$utils.isSystemInfo();
			
		},
		methods: {
			clickTabs(e){
				this.tabNumber = e.currentTarget.dataset.tabnumber;
			},
			
		}
	}
</script>

<style>
page{
	background-color: #F5F5F5;
	box-sizing: border-box;
	width: 100%;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
}
.personal-header{
		 height: 160px;
		 background: #FFFFFF;
		 width: 100%;
		 position: relative;
	}
.personal-header-interstall{
		    margin-top: 16rpx;
		    height: 60rpx;
		    position: relative;
			display: flex;
		    align-items: center;
			justify-content: center;
	}
	.personal-header-lable{
		font-size: 30rpx;
		color: #333333;
	}
	
	.icon-back-img{
		/* position: absolute;
		top: 2rpx;
		left: 26rpx; */
		width: 50rpx;
		height: 50rpx;
	}
	
	.personal-header-title{
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

</style>
