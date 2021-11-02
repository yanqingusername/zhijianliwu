<template>
	<view >
		<view class="cths-a" v-if="isnumber == 2">
			<image class="cths-a-img" src="https://zhijianlw.com/static/web/img/icon_success_2021_10_21.png"></image>
			<view class="cths-a-title">购票成功</view>
			<view class="cths-a-text">{{movieName}}({{quantity}}张)</view>
			<view class="cths-a-view">
				<view class="cths-a-view-left" @click="clickOrderHome">返回首页</view>
				<view class="cths-a-view-right" @click="clickOrderDetail">查看电影票</view>
			</view>
		</view>
		
		<view class="cths-a" v-if="isnumber == 1">
			<image class="cths-a-img" src="https://zhijianlw.com/static/web/img/icon_recharge_status_2021_10_29_02.png"></image>
			<view class="cths-a-title">购票失败</view>
			<view class="cths-a-text">{{movieName}}({{quantity}}张)</view>
			<view class="cths-a-view">
				<view class="cths-a-view-left" @click="clickOrderHome">返回首页</view>
				<view class="cths-a-view-right" @click="clickBuy">重新购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quantity:'',
				movieName: '',
				channelOrderNo: '',
				isnumber: "2" //2成功  1 失败
			}
		},
		onLoad:function(options){
			let that = this;
			this.quantity = options.quantity;
			this.movieName = options.movieName;
			this.channelOrderNo = options.channelOrderNo;
			this.isnumber = options.isnumber;
		},
		methods: {
			clickOrderDetail(){
				uni.redirectTo({
					url: `/pagesub/CinemaTicket/CinemaTicketHomeOrderDetail?channelOrderNo=${this.channelOrderNo}`
				})
			},
			clickOrderHome(){
				uni.redirectTo({
					url: `/pagesub/CinemaTicket/CinemaTicketHome`
				})
			},
			clickBuy(){
				uni.redirectTo({
					url: `/pagesub/CinemaTicket/CinemaTicketHome`
				})
			},
		}
	}
</script>

<style>
page{
	background-color: #F6F6F6;
}
.cths-a{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.cths-a-img{
	margin-top: 64rpx;
	width: 90rpx;
	height: 90rpx;
}
.cths-a-title{
	font-size: 50rpx;
	font-weight: bold;
	color: #333333;
	margin-top: 40rpx;
}

.cths-a-text{
	font-size: 30rpx;
	color: #333333;
	margin-top: 24rpx;
}
.cths-a-view{
	margin-top: 90rpx;
	display: flex;
	align-items: center;
}

.cths-a-view-left{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 300rpx;
	height: 76rpx;
	border-radius: 44rpx;
	border: 1px solid #CCCCCC;
	font-size: 30rpx;
	color: #333333;
}
.cths-a-view-right{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 300rpx;
	height: 80rpx;
	background: #DF5250;
	border-radius: 44rpx;
	font-size: 30rpx;
	color: #FFFFFF;
	margin-left: 30rpx;
}

</style>
