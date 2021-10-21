<template>
	<view >
		<view class="ctho-a">
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
						<view class="cth-b-bg-2-2">今天 09-22 17:20～19:15 英语 3D</view>
						<view class="cth-b-bg-2-3">9号激光巨幕厅 6排5座 6排6排</view>
						<view class="cth-b-bg-2-4">万达影城丰台万达广场店</view>
						<view class="cth-b-bg-2-5">丰台区丰科路6号万达广场6层</view>
					</view>
				</view>
			</view>
			<view class="ctho-c">
				<image class="ctho-c-img" src="https://zhijianlw.com/static/web/img/icon_close_2021_10_21.png"></image>
				<view class="ctho-c-title">不支持退票&改签</view>
			</view>
		</view>
		
		<view class="ctho-d">
			<view class="ctho-d-1">
				<view class="ctho-d-1-1">手机号码<text class="ctho-d-1-2">（手机号仅用于生成订单）</text></view>
				<view class="ctho-d-1-3">18801182514<view class="ctho-d-1-4">授权手机号</view></view>
			</view>
			<view class="ctho-d-1" style="margin-top: 18rpx;">
				<view class="ctho-d-1-1">自动换座<text class="ctho-d-1-2">（当前座位锁定失败时，系统智能更换座位）</text></view>
				<view class="ctho-d-1-3"><evan-switch class="evan" size="15" v-model="checked" activeColor="#5AC024" activeColor1="#FFFFFF" activeColor2="#FFFFFF"></evan-switch></view>
			</view>
			<view class="ctho-line"></view>
			<view class="ctho-d-1" style="margin-top: 30rpx;">
				<view class="ctho-d-1-1" style="font-weight: bold;">共2张</view>
				<view class="ctho-d-1-1" style="font-weight: bold;">总计：¥110.00</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 14rpx;">
				<view class="ctho-d-1-1" style="font-weight: bold;">优惠券</view>
				<view class="ctho-d-1-1" style="font-weight: bold;">- ¥10.00<image class="ctho-arr-img" src="https://zhijianlw.com/static/web/img/icon_arrow_r_2021_10_21.png"></image></view>
			</view>
			
			<view class="ctho-d-1" style="margin-top: 16rpx;">
				<view class="ctho-d-1-1" style="font-weight: bold;">余额</view>
				<view class="ctho-d-1-1" style="font-weight: bold;">可用¥10.00<image class="ctho-rad-img" :src="[isBalace ? '../../static/icon_reason_d.png' : '../../static/icon_reason_m.png']"></image></view>
			</view>
		</view>
		
		<view class="ctho-e">
			<view class="ctho-e-1">购票须知</view>
			<view class="ctho-line"></view>
			<view class="ctho-e-2" style="margin-top: 20rpx;">1.由于影院系统不稳定等因素，存在出票失败的情况，会进行退款 </view>
			<view class="ctho-e-2">2.付款成功后5-40分钟为您出票，此电影票为特价电影票，青确认时间和场次无误，付款成功后将无法退票和改签。下单即代表您同意《用户购票协议》</view>
			
		</view>
		
		<view style="height: 240rpx;width: 100%;"></view>
		
		<view class="ctho-bottom" @click="clickPay">
			<view class="ctho-bottom-price">¥<text style="font-size: 48rpx;">90</text></view>
			<view class="ctho-bottom-title">立即付款</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				isBalace: false
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
	height: 426rpx;
	background-image: url(https://zhijianlw.com/static/web/img/icon_film_bg_2021_10_21.png);
	background-size: 700rpx 426rpx;
	position: relative;
}

.cth-b{
			padding: 30rpx 20rpx;
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
			width: 190rpx;
			height: 266rpx;
			border-radius: 6rpx;
		}
		.cth-b-bg-2{
			margin-left: 24rpx;
			width: 440rpx;
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
			color: #666666;
			margin-top: 28rpx;
		}
		
		.cth-b-bg-2-3{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 22rpx;
		}
		.cth-b-bg-2-4{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 22rpx;
		}
		.cth-b-bg-2-5{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 22rpx;
		}
		
		.ctho-c{
			position: absolute;
			bottom: 26rpx;
			left: 20rpx;
			display: flex;
			align-items: center;
		}
		
		.ctho-c-img{
			width: 22rpx;
			height: 22rpx;
		}
		
		.ctho-c-title{
			margin-left: 4rpx;
			font-size: 24rpx;
			color: #666666;
		}
		
		.ctho-d{
			margin: 20rpx 25rpx;
			width: 700rpx;
			height: 410rpx;
			background: #FFFFFF;
			border-radius: 6rpx;
			padding: 30rpx 20rpx;
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
			font-size: 24rpx;
			font-weight: bold;
			color: #333333;
		}
		.ctho-d-1-2{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #999999;
		}
		.ctho-d-1-3{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #333333;
		}
		.ctho-d-1-4{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 124rpx;
			height: 32rpx;
			border-radius: 20rpx;
			border: 2rpx solid #427DE5;
			font-size: 20rpx;
			color: #427DE5;
			margin-left: 10rpx;
		}
		
		.ctho-line{
			width: 660rpx;
			height: 2rpx;
			background: #EEEEEE;
			margin-top: 18rpx;
		}
		.ctho-arr-img{
			width: 30rpx;
			height: 30rpx;
			margin-left: 18rpx;
		}
		.ctho-rad-img{
			width: 26rpx;
			height: 26rpx;
			margin-left: 18rpx;
		}
		
		.ctho-e{
			margin: 20rpx 25rpx;
			width: 700rpx;
			height: 296rpx;
			background: #FFFFFF;
			border-radius: 6rpx;
			padding: 25rpx 20rpx;
		}
		.ctho-e-1{
			display: flex;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			height: 40rpx;
		}
		.ctho-e-2{
			font-size: 24rpx;
			color: #999999;
		    line-height: 33rpx;
		}
		
		.ctho-bottom{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 750rpx;
			height: 126rpx;
			background: #FFFFFF;
			position: fixed;
		    bottom: 0rpx;
			padding: 0rpx 26rpx 0rpx 46rpx;
		}
		.ctho-bottom-price{
			font-size: 32rpx;
			font-weight: bold;
			color: #F7481B;
		}
		.ctho-bottom-title{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 226rpx;
			height: 88rpx;
			background: linear-gradient(61deg, #E96C56 0%, #ED2430 100%);
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
</style>
