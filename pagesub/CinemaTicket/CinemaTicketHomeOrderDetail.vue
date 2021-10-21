<template>
	<view >
		<view class="ctho-a">
			<view class="cth-b">
				<view class="cth-b-bg">
					<image class="cth-b-bg-1" src="https://slxcx.oss-cn-beijing.aliyuncs.com/static/upload/images/202109/98D7C3CC826DEFED016988476E2BE120.png"></image>
					<view class="cth-b-bg-2">
						<view class="cth-b-bg-2-1">
							<view class="cth-b-bg-2-1-1">失控玩家 2张</view>
							<view class="cth-b-bg-2-1-2">出票中</view>
						</view>
						<view class="cth-b-bg-2-2">2021-10-12 19:20开场</view>
						<view class="cth-b-bg-2-3">2号激光4K全景声厅</view>
						<view class="cth-b-bg-2-4">7排7座，7排8座</view>
						<view class="cth-b-bg-2-1" style="margin-top: 16rpx;">
							<view class="cth-b-bg-2-5">是否支持换座</view>
							<view class="cth-b-bg-2-5">支持</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ctho-c">
				<view class="ctho-c-title">影院<view class="ctho-c-title-a">保利万和国际影城昌乐中百店</view></view>
				<view class="ctho-c-address">昌乐利民街421号中百大厦501室</view>
			</view>
		</view>
		
		<view class="ctho-d">
			<view class="ctho-d-1">
				<view class="ctho-d-1-1">取票码</view>
				<view class="ctho-d-1-3"><image class="ctho-d-1-3-img" src="https://zhijianlw.com/static/web/img/icon_down_time_2021_10_21.png"></image><view class="ctho-d-1-2">距离影片放映 01时 28分</view></view>
			</view>
			<view class="ctho-line"></view>
			
			
			<!-- <view class="cthod-view">
				<image class="cthod-view-img" src="https://zhijianlw.com/static/web/img/icon_buy_up_2021_10_21.png"></image>
				<view class="cthod-view-btn">
					<view class="cthod-view-btn-1">正在出票</view>
					<view class="cthod-view-btn-2">（预计5-40分钟）</view>
				</view>
				<view class="cthod-view-text">2 张电影票</view>
			</view> -->
			
			<!-- <view class="cthod-view">
				<image class="cthod-view-img-fail" src="https://zhijianlw.com/static/web/img/icon_buy_failed_2021_10_21.png"></image>
				<view class="cthod-view-fail-text">出票失败，订单已自动取消</view>
				<view style="height: 26rpx;"></view>
			</view> -->
			
			<view class="cthod-view">
				<view class="cthod-view" v-for="(item, index) in listItems" :key="index">
					<image class="cthod-view-img-su" :src="item.image"></image>
					<view class="cthod-view-su-text">{{item.title}}</view>
					<view class="cthod-view-su-view">
						<view class="cthod-view-su-lable">取票码</view>
						<view class="cthod-view-su-number">{{item.screen}}</view>
					</view>
				</view> 
				<view class="cthod-view-bottom">任意取票机均可取票</view>
				<view style="height: 10rpx;"></view>
			</view>
			
			
		</view>
		
		
		<view class="ctho-d">
			<view class="ctho-d-1" style="height: 40rpx;">
				<view class="ctho-d-1-1">订单信息</view>
				<view class="ctho-d-1-3"></view>
			</view>
			<view class="ctho-line"></view>
			
			
			<view class="ctho-d-1" style="margin-top: 20rpx;">
				<view class="ctho-d-detail">商品总价</view>
				<view class="ctho-d-detail">¥ 80.00</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >优惠券</view>
				<view class="ctho-d-detail" >- ¥10.00</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >余额抵扣</view>
				<view class="ctho-d-detail" >- ¥10.00</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >实付款</view>
				<view class="ctho-d-detail" >¥ 60.00</view>
			</view>
			<view class="ctho-line" style="margin-top: 10rpx;"></view>
			
			<view class="ctho-d-detail-sn" style="margin-top: 20rpx;">订单编号：2560819324121<view class="ctho-d-detail-copy">复制</view></view>
			<view class="ctho-d-detail-sn" style="margin-top: 20rpx;">下单时间：2021/04/08 15:50:12</view>
			<view class="ctho-d-detail-sn" style="margin-top: 20rpx;">支付时间：2021/04/08 16:00:21</view>
			
		</view>
		
		<view class="cthod-online">
			<button class="cthod-online-btn" open-type="contact" @click="$buttonClick(trackClick)">
				<image class="cthod-online-btn-img" src="https://zhijianlw.com/static/web/img/icon_online_service_2021_10_21.png"  mode=""></image>
				<view class="cthod-online-btn-text">在线客服</view>
			</button>
		</view>
		<view style="height: 30rpx;"></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				isBalace: false,
				listItems:[
					{
						"image": 'https://zhijianlw.com/static/web/img/icon_screen_2021_10_21.png',
						"title": '1张电影票',
						"screen": '5656561'
					},
					{
						"image": 'https://zhijianlw.com/static/web/img/icon_screen_2021_10_21.png',
						"title": '1张电影票',
						"screen": '5656561'
					}
				]
			}
		},
		onLoad:function(options){
			let that = this;
			
			
		},
		methods: {
			clickPay(){
				uni.navigateTo({
					url: '/pagesub/CinemaTicket/CinemaTicketHomeSuccess'
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #F6F6F6;
}
.ctho-a{
	margin: 18rpx 25rpx;
	width: 700rpx;
	height: 416rpx;
	background-image: url(https://zhijianlw.com/static/web/img/icon_film_detail_2021_10_21.png);
	background-size: 700rpx 416rpx;
	position: relative;
}

.cth-b{
			padding: 30rpx 20rpx 24rpx 16rpx;
		}
		.cth-b-bg{
			width: 660rpx;
			/* height: 250rpx;
			background: #FFFFFF; */
			/* border-radius: 1px; */
			/* padding: 20rpx 17rpx; */
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
			width: 480rpx;
			position: relative;
		}
		.cth-b-bg-2-1{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.cth-b-bg-2-1-1{
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		.cth-b-bg-2-1-2{
			font-size: 26rpx;
			font-weight: bold;
			color: #DF5250;
		}
		.cth-b-bg-2-2{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #999999;
			font-weight: bold;
			margin-top: 16rpx;
		}
		
		.cth-b-bg-2-3{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #999999;
			font-weight: bold;
			margin-top: 16rpx;
		}
		.cth-b-bg-2-4{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #999999;
			font-weight: bold;
			margin-top: 16rpx;
		}
		.cth-b-bg-2-5{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			margin-top: 16rpx;
		}
		
		.ctho-c{
			position: absolute;
			bottom: 28rpx;
			left: 16rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		
		
		.ctho-c-title{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
		}
		
		.ctho-c-title-a{
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			margin-left: 34rpx;
		}
		
		.ctho-c-address{
			font-size: 26rpx;
			color: #666666;
			margin-top: 18rpx;
			margin-left: 90rpx;
		}
		
		.ctho-d{
			margin: 32rpx 25rpx;
			width: 700rpx;
			/* height: 410rpx; */
			background: #FFFFFF;
			border-radius: 6rpx;
			padding: 22rpx 20rpx 24rpx 20rpx;
		}
		.ctho-d-1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50rpx;
		}
		.ctho-d-1-1{
			display: flex;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		
		.ctho-d-1-3{
			display: flex;
			align-items: center;
		}
		.ctho-d-1-3-img{
			width: 30rpx;
			height: 30rpx;
		}
		
		.ctho-d-1-2{
			font-size: 27rpx;
			font-weight: bold;
			color: #DF5250;
			margin-left: 10rpx;
		}
		
		.cthod-view{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.cthod-view-img{
			width: 160rpx;
			height: 143rpx;
			margin-top: 78rpx;
		}
		.cthod-view-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 646rpx;
			height: 106rpx;
			background: #FAFAFA;
			border-radius: 10rpx;
			border: 2rpx solid #EEEEEE;
			margin-top: 72rpx;
		}
		.cthod-view-btn-1{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		.cthod-view-btn-2{
			font-size: 32rpx;
			font-weight: bold;
			color: #999999;
		}
		.cthod-view-text{
			font-size: 28rpx;
			color: #999999;
			margin-top: 40rpx;
		}
		.ctho-d-detail{
			font-size: 24rpx;
			color: #666666;
		}
		
		.ctho-d-detail-sn{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
		}
		.ctho-d-detail-copy{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 30rpx;
			background: #E6E6E6;
			border-radius: 3rpx;
			font-size: 20rpx;
			color: #666666;
			margin-left: 14rpx;
		}
		
		.ctho-line{
			width: 660rpx;
			height: 2rpx;
			background: #EEEEEE;
			margin-top: 18rpx;
		}
		
		.cthod-online{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 22rpx;
		}
		
		.cthod-online-btn{
			width: 220rpx;
			height: 60rpx;
			background: #F1E0E0;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0rpx;
			padding: 0;
		}
		
		.cthod-online-btn-img{
			width: 30rpx;
			height: 30rpx;
		}
		
		.cthod-online-btn-text{
			font-size: 26rpx;
			color: #DB3C3A;
			margin-left: 4rpx;
		}
		
		.cthod-view-img-fail{
			width: 124rpx;
			height: 148rpx;
			margin-top: 80rpx;
		}
		.cthod-view-fail-text{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 96rpx;
		}
		
		.cthod-view-img-su{
			width: 300rpx;
			height: 300rpx;
			margin-top: 54rpx;
		}
		.cthod-view-su-text{
			font-size: 28rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		.cthod-view-su-view{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 34rpx;
			width: 646rpx;
			height: 76rpx;
			background: #FAFAFA;
			border-radius: 10rpx;
			border: 2rpx solid #EEEEEE;
		}
		.cthod-view-su-lable{
			font-size: 32rpx;
			font-weight: bold;
			color: #999999;
			margin-left: 40rpx;
		}
		.cthod-view-su-number{
			font-size: 38rpx;
			font-weight: bold;
			color: #333333;
			margin-right: 22rpx;
		}
		.cthod-view-bottom{
			font-size: 28rpx;
			color: #999999;
			margin-top: 50rpx;
		}
</style>
