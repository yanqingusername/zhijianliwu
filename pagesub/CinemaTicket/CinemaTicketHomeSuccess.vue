<template>
	<view >
		<view class="cths-a">
			<image class="cths-a-img" src="https://zhijianlw.com/static/web/img/icon_success_2021_10_21.png"></image>
			<view class="cths-a-title">购票成功</view>
			<view class="cths-a-text">{{movieName}}({{quantity}}张)</view>
			<view class="cths-a-view">
				<view class="cths-a-view-left">返回首页</view>
				<view class="cths-a-view-right" @click="clickOrderDetail">查看电影票</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quantity:'',
				movieName: ''
			}
		},
		onLoad:function(options){
			let that = this;
			this.quantity = options.quantity;
			this.movieName = options.movieName;
			
		},
		methods: {
			clickOrderDetail(){
				uni.navigateTo({
					url: '/pagesub/CinemaTicket/CinemaTicketHomeOrderDetail'
				})
			}
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
