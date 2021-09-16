<template>
	<view>
		<view class="personal-header">
			<view class="my-nav" :style="'height:'+nav+'px'"></view>
			<view class="personal-header-interstall" >
				<image @click="$buttonClick(backbutton)" class="icon-back-img" src="../../static/icon_header_back.png"></image>
				<view class="personal-header-title">充值</view>
			</view>
			<view class="recharge-status-top" :style="'margin-top:'+ (isSystemInfo ? '20' : '40')+'px'">
				<image v-if="isSuccess" class="recharge-status-img" src="../../static/recharge_success.png"></image>
				<view v-if="isSuccess" class="recharge-status-text">充值成功</view>
				<image v-if="!isSuccess" class="recharge-status-img" src="../../static/recharge_failed.png"></image>
				<view v-if="!isSuccess" class="recharge-status-text">充值失败</view>
			</view>
		</view>
		
		<view class="recharge-flex" v-if="!isSuccess">
			<view class="recharge-failed">
				<view class="recharge-failed-text">原因：订单支付异常</view>
				<view class="recharge-bottom-view" style="margin-top: 60rpx;" @click="$buttonClick(balanceRecharge)">
					<view class="recharge-bottom">再次充值</view>
				</view>
			</view>
		</view>
		
		<view class="recharge-flex" v-if="isSuccess">
			<view class="recharge-center">
				<view class="recharge-view">
					<view class="recharge-money">¥{{orderInfo.recharge_price}}</view>
					<view class="recharge-text">充值金额</view>
					<view class="recharge-text" style="margin-top: 10rpx;">实付金额：¥{{orderInfo.pay_price}}</view>
				</view>
				<view class="recharge-orderinfo">
					<view class="recharge-orderinfo-time">充值时间：{{orderInfo.recharge_time}}</view>
					<view class="recharge-orderinfo-time" style="margin-top: 14rpx;">订 单 号 ：{{orderInfo.recharge_number}}</view>
				</view>
				<view class="recharge-bottom-view" @click="$buttonClick(balance)">
					<view class="recharge-bottom">查询余额</view>
				</view>
				<view class="recharge-bottom-text" v-if="istype != 1">如需开具发票请您联系在线客服处理</view>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				nav:'20',
				ordernumber: '',
				istype: '',
				orderInfo: '',
				isSuccess: true,
				isSystemInfo: false
			}
		},
		onLoad:function(options){
			uni.getSystemInfo({
				success: res=>{
					 // 导航高度
					this.nav = res.statusBarHeight 
				}
			})
			
			this.isSystemInfo = this.$utils.isSystemInfo();
			
			this.istype = options.istype;
			this.ordernumber = options.ordernumber;
			
			let mid = uni.getStorageSync('id');
			let controller = 'order';
			let action = 'select_recharge_status_info';
			let data = JSON.stringify({
				memberid: mid,
				ordernumber: this.ordernumber
			});
			this.$utils.postNew(action, data, controller).then(res => {
				console.log(res)
				if (res.sta == 1) {
					this.isSuccess = true;
					this.orderInfo = res.rs;
				} else {
					this.isSuccess = false;
					uni.showToast({
					 	title:res.msg,
					 	icon:"none",
					 	mask:'true',
					});
				}
			})
		},
		methods:{
			backbutton(e){
				uni.navigateBack({
					delta: 1
				});
			},
			// 余额充值
			balanceRecharge:function(e){
				uni.redirectTo({
					url:'../balance/Recharge'
				})
			},
			// 余额
			balance:function(e){
				uni.redirectTo({
					url:'../balance/balance'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F9F9F9;
	}
	
	.personal-header{
		 height: 184px;
		 background: #FB503D;
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
	.personal-header-title{
		font-size: 36rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
	
	.icon-back-img{
		position: absolute;
		top: 2rpx;
		left: 26rpx;
		width: 50rpx;
		height: 50rpx;
	}
	
	.recharge-status-top{
		display: flex;
		align-items: center;
	    justify-content: center;
	    margin-top: 80rpx;
	}
	.recharge-status-img{
		width: 55rpx;
		height: 55rpx;
	}
	.recharge-status-text{
		font-size: 42rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 59rpx;
		margin-left: 16rpx;
	}
	
	.recharge-flex{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.recharge-center{
		margin-top: -45rpx;
		width: 700rpx;
	    height: 465rpx;
	    background: #FFFFFF;
	    border-radius: 10rpx;
	    position: relative;
	}
	
	.recharge-view{
		margin-top: 60rpx;
	}
	
	.recharge-money{
		font-size: 36rpx;
		font-weight: bold;
		color: #FB503D;
		line-height: 50rpx;
		text-align: center;
	}
	.recharge-text{
		font-size: 18rpx;
		color: #666666;
		line-height: 25rpx;
		text-align: center;
	}
	.recharge-orderinfo{
		margin-top: 40rpx;
		margin-left: 30rpx;
	}
	.recharge-orderinfo-time{
		font-size: 18rpx;
		color: #999999;
		line-height: 25rpx;
	}
	
	.recharge-bottom-view{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
	}
	
	.recharge-bottom{
		width: 200rpx;
		height: 60rpx;
		border-radius: 32rpx;
		border: 1px solid #EC1815;
		font-size: 26rpx;
		color: #EC1815;
		line-height: 37rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.recharge-bottom-text{
		margin-top: 20rpx;
		font-size: 18rpx;
		color: #999999;
		line-height: 25rpx;
		text-align: center;
	}
	
	.recharge-failed{
		margin-top: -45rpx;
		width: 700rpx;
		height: 285rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		position: relative;
	}
	.recharge-failed-text{
		font-size: 24rpx;
		color: #666666;
		line-height: 33rpx;
		text-align: center;
		margin-top: 70rpx;
	}
</style>
