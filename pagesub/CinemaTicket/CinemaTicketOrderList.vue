<template>
	<view style="width: 100%;overflow-x: hidden;display: flex;flex-direction: column;box-sizing: border-box;">
		<view class="personal-header" :style="'height:' + (isSystemInfo ? '100' : '70') + 'px;'">
			<view class="my-nav" :style="'height:'+nav+'px'"></view>
			<view class="personal-header-interstall" >
				<view style="display: flex;position: absolute;align-items: center;left: 20rpx;" @click="$buttonClick(clickOrderHome)">
					<image class="icon-back-img" src="https://zhijianlw.com/static/web/img/icon_cime_back_2021_10_21.png"></image>
					<view class="personal-header-lable">首页</view>
				</view>
				<view class="personal-header-title">我的订单</view>
			</view>
		</view>
		
		
		<view class="ctol-tabs">
			<view class="ctol-tabs-item">
				<view class="cth-a-2" v-for="(item,index) in itemsTime" :key="index" @click="clickTabs" :data-timeindex="index" :data-values="item.value">
					<view :class="[timeIndex == index ? 'cth-a-2-1' : 'cth-a-2-1-default']">{{item.title}}</view>
					<view :class="[timeIndex == index ? 'cth-a-2-2' : 'cth-a-2-2-default']"></view>
				</view>
			</view>
		</view>
		
		<view class="ctol-list">
			<view class="ctol-list-item" @click="clickOrderDetail" v-for="(item,index) in cthList" :key="index" :data-channelorderno="item.channelOrderNo">
				<view class="cth-item-view">
					<view class="cth-item-view-1">{{item.cinemaName}}</view>
					<view class="cth-item-view-2">{{item.pay_status_info}}</view>
				</view>
				<view class="cth-item-line"></view>
				
				<view class="cth-b">
					<view class="cth-b-bg">
						<image class="cth-b-bg-1" :src="item.orderPicUrl"></image>
						<view class="cth-b-bg-2">
							<view class="cth-b-bg-2-1">
								<view class="cth-b-bg-2-1-1">{{item.movieName}} {{item.quantity}}张</view>
								<view class="cth-b-bg-2-1-2"></view>
							</view>
							<view class="cth-b-bg-2-2">{{item.showTime}}开场</view>
							<view class="cth-b-bg-2-3">{{item.hallName}}</view>
							<view class="cth-b-bg-2-4">{{item.seatsNoStr}}</view>
							<view class="cth-b-bg-2-1" style="margin-top: 16rpx;">
								<view class="cth-b-bg-2-5">总价：¥ {{item.orderprice}}</view>
								<view class="cth-b-bg-2-5">实付：¥ {{item.orderprice_discount}}</view>
							</view>
							
							<view v-if="item.status == 0 || item.status == 1" class="cth-b-bg-2-6">{{item.order_status_info}}</view>
							<view v-else class="cth-b-bg-2-7">已退单</view>
						</view>
					</view>
				</view>
				
				<view class="ctol-bottom" v-if="item.status == 1 || item.status == 2 || item.status == 4 || item.status == 5">
					<image class="ctol-bottom-img" src="https://zhijianlw.com/static/web/img/icon_down_time_2021_10_21.png"></image><view class="ctol-bottom-title">距离影片放映 <uni-countdown :showColon="true" :show-day="false" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FFFFFF" color="#FB503D" splitorColor="#FB503D" style="padding: 0rpx;"></uni-countdown></view>
				</view>
				
				
				
				
			</view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	var timer = null;
	var times = 0;
	export default {
		data() {
			return {
				nav:'20',
				isSystemInfo: false,
				timeIndex: 0,
				typeValue: '',
				itemsTime: [
					{
						"title": "全部",
						"value": ''
					},
					{
						"title": "待支付",
						"value": '0'
					},
					{
						"title": "已支付",
						"value": '1'
					},
					{
						"title": "已完成",
						"value": '2'
					},
					{
						"title": "已取消",
						"value": '3'
					}
				],
				cthList: [],
				countdown: ''
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
			this.getFilmOrderList(1);
		},
		methods: {
			clickOrderHome(){
				uni.redirectTo({
					url: `/pagesub/CinemaTicket/CinemaTicketHome`
				})
			},
			clickTabs(e){
				this.timeIndex = e.currentTarget.dataset.timeindex;
				this.typeValue = e.currentTarget.dataset.values;
				this.getFilmOrderList(1);
			},
			getFilmOrderList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = 'get_film_order_list';
				let controller = 'filmset';
				let memberid = uni.getStorageSync('id');
				let data = JSON.stringify({
					type: this.typeValue,
					memberid: memberid,
					size: this.pageSize,
					page: this.pageIndex,
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.cthList = res.rs;
						that.isAll = false;
					} else {
						if(res.rs.list.length>0){
							that.cthList = that.cthList.concat(res.rs);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
					
					if(that.cthList.length>0){
						that.cthList.forEach((item) =>{
							if(item.count_down_time){
								that.getCountdown(item.count_down_time);
								item.countdown = that.countdown
							}
						})
						that.cthList = that.cthList
					}
				})
			},
			getCountdown(endTime) {
				var that = this;
				// var _endDateTime = new Date(endTime).getTime();
				// // timer = setInterval(function() {
				// 	var _newDateTime = new Date().getTime();
				// 		times = _endDateTime - _newDateTime;
				// 		if (times <= 0) {
				// 			return
				// 		}
				// 		that.setTime(times / 1000)
				// 	// }, 1000);
				if (endTime <= 0) {
					return
				}
				that.setTime(endTime)
			},
			setTime(times) {
					var that = this;
					if (times <= 0) {
						// clearInterval(timer);
						return;
					}
					var day = 0,
						hour = 0,
						minute = 0,
						second = 0; //时间默认值
					day = Math.floor(times / (60 * 60 * 24));
					hour = Math.floor(times / (60 * 60)) - (day * 24);
					minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
					second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
					if (day <= 9) day = '0' + day;
					if (hour <= 9) hour = '0' + hour;
					if (minute <= 9) minute = '0' + minute;
					if (second <= 9) second = '0' + second;
					//
					var countdown = {
						day: day,
						hour: hour,
						minute: minute,
						second: second,
					}
					that.countdown = countdown
					// times--;
				},
			clickOrderDetail(e){
				let channelorderno = e.currentTarget.dataset.channelorderno;
				uni.redirectTo({
					url: `/pagesub/CinemaTicket/CinemaTicketHomeOrderDetail?channelOrderNo=${channelorderno}`
				})
			},
		},
		onPullDownRefresh:function(){
			this.getFilmOrderList(1);
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500);
		},
		onReachBottom:function(){
			this.getFilmOrderList(2);
		},
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
	
	
	.ctol-tabs{
		height: 90rpx;
		border-top: 1px solid #F5F5F5;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		padding: 0rpx 12rpx;
	}
	
	.ctol-tabs-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	
	.cth-a-2{
		/* width: 130rpx; */
		display: flex;
	    align-items: center;
		flex-direction: column;
		margin-top: 0rpx;
		width: 20%;
	}
	.cth-a-2-1{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}
	.cth-a-2-1-default{
		font-size: 28rpx;
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
	.ctol-list{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0rpx 25rpx 0rpx;
	}
	.ctol-list-item{
		background: #FFFFFF;
		border-radius: 1px;
		padding: 0rpx 20rpx 20rpx 16rpx;
		display: flex;
		/* align-items: center; */
		justify-content: space-between;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.cth-item-view{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 92rpx;
	}
	.cth-item-view-1{
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		margin-left: 0rpx;
		width: 480rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.cth-item-view-2{
		font-size: 30rpx;
		font-weight: bold;
		color: #999999;
	}
	.cth-item-line{
		height: 1px;
		background: #EEEEEE;
	}
	
	.cth-c-bg-view{
		margin-top: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.cth-b{
				padding: 28rpx 0rpx 24rpx 0rpx;
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
				font-weight: bold;
				color: #333333;
				margin-top: 16rpx;
			}
			
			.cth-b-bg-2-6{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 124rpx;
				height: 56rpx;
				border-radius: 30rpx;
				border: 2rpx solid #DF5250;
				font-size: 26rpx;
				font-weight: bold;
				color: #DF5250;
				position: absolute;
				top: 62rpx;
				right: 0rpx;
			}
			
			.cth-b-bg-2-7{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 124rpx;
				height: 56rpx;
				border-radius: 30rpx;
				border: 2rpx solid #AAAAAA;
				font-size: 26rpx;
				font-weight: bold;
				color: #AAAAAA;
				position: absolute;
				top: 62rpx;
				right: 0rpx;
			}
			
			.ctol-bottom{
				display: flex;
				align-items: center;
				    padding-top: 20rpx;
				    border-top: 1px solid #EEEEEE;
			}
					.ctol-bottom-img{
						width: 30rpx;
						height: 30rpx;
					}
					
					.ctol-bottom-title{
						font-size: 28rpx;
						font-weight: bold;
						color: #666666;
						margin-left: 10rpx;
					}
</style>
