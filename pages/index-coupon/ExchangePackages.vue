<template>
	<view class="must">
		<!-- 订单详情 -->
		<view class="must-list">
			<view class="must-list-xq">
				<view class="must-list-bg">
					<image class="must-list-img" :src="$utils.imageUrl(orderInfo.cardtype_img)" mode=""></image>
				</view>
				<view class="must-guige">
					<view class="guige-1" style=" margin-bottom: 0rpx;">
						<text class="must-guige-title">{{$utils.cut_str(orderInfo.card_name,15)}}</text>
						<text class="must-guige-price">￥{{'0.00'}}</text>
					</view>
					<view class="guige-2" style=" margin-top: -6rpx;">
						<text class="must-guige-box"></text>
						<text class="must-guige-right" style="color: #999999;text-decoration-line: line-through;">￥{{orderInfo.price}}</text>
					</view>
					<view class="guige-2" style=" margin-top: 10rpx;">
						<text class="must-guige-box">规格：{{orderInfo.card_type_info}}</text>
						<view class="must-guige-right">x1</view>
					</view>
				</view>
			</view>
			
			<!-- 订单价格信息 -->
			<view class="message" style="margin-top: 0rpx;">
				<view class="">
					<text class="message-title zongjia" style="color: #999999;">商品总价：</text>
					<text class="message-price">￥0.00</text>
				</view>
				<view class="">
					<text class="message-title" style="color: #999999;">运费：</text>
					<text class="message-price">￥0.00</text>
				</view>
			</view>
			<!-- 合计 -->
			<view class="hj" style="background: #FFFFFF;">
				<text class="jiage">合计：</text>
				<text class="jiage sum-price">￥0.00</text>
			</view>
		</view>
		
		<!-- 底部合计 -->
		<view class="must-bottom heji">
			<text style="color: #EB1615; font-size: 30rpx;">￥</text>
			<text class="must-bottom-price">0.00</text>
			<view class="pay clearfix">
				<button class="shop-payment shop-payment-active " @click="forsubmit" >立即付款</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default{
		data(){
			return{
				ordernumber: '',
				orderInfo:''
			}
		},
		onLoad:function(e) {
			if(e && e.ordernumber){
				this.ordernumber = e.ordernumber;
			}
			
		},
		onShow: function(e) {
			let that = this;
			let action = "get_exchange_order_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				ordernumber: this.ordernumber,
				memberid: memberid
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.orderInfo = res.rs;
				} 
			})
		},
		methods:{
			//立即付款
			forsubmit: function(e){
				let memberid = uni.getStorageSync('id');
				var that = this;
				let data = JSON.stringify({
					memberid: memberid,
					ordernumber: this.ordernumber
					// wanfa: 1,
					// coupon_number: "",
					// use_balance: "",
					// use_zj_balance: "",
					// fenshu: 1,
					// buy_type:1
				});
				var action = 'create_cardbag';
				this.$utils.post(action, data).then(res => {
					console.log(res);
					if (res.sta == 1) {
						uni.showToast({
							title: "支付成功"
						})
						this.cardbag_number=res.cardbag_number
						let cardbag_number=res.cardbag_number
						uni.redirectTo({
							url:'../shopping/succes?cardbag_number='+this.cardbag_number
						})
					}else {
						uni.showToast({
							icon: "none",	
							title: res.msg?res.msg:"支付错误"
						})
					}
				})
			},
		}
	}
</script>

<style>
	@import url('../../static/font/iconfont.css');
	@import '@/common/must.css';
	
	.must{
		padding-bottom: 120rpx;
	}
	.must-address {
		height: auto;
		padding: 40rpx 100rpx 30rpx 56rpx;
		background-color: #fff;
		margin-top: 20rpx;
		position: relative;
	}
	
	.must-address .icon {
		font-size: 32rpx;
		color: #333;
		position: absolute;
		right: 32rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.must-address-name {
		position: static;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
		line-height: 1.8em;
		margin-bottom: 10rpx;
	}
	
	.must-address-add {
		position: static;
		font-size: 26rpx;
		color: #666;
		line-height: 1.8em;
	}
	.fenshus{
		width: 100%;
		background-color: #fff;
		height: 100rpx;
		line-height: 100rpx;
		text-align: right;
		padding: 0 38rpx;
		margin-bottom: 20rpx;
	}
	
	.circle{
		position: static;
		margin-left: 10rpx;
	}
	.icon-ico2{
		color: #999
	}
	.message-jiantou1{
		display: inline-block;
		color: #999;
		margin: 0 0 0 6rx;
		font-size: 28rpx;
	}
	.hj{
		padding: 32rpx 64rpx;
		text-align: right;
	}
	.hj .sum-price{
		margin-right: 0;
	}
	
	.heji{
		position: fixed;
		bottom: 0;
		display: flex;
		padding: 12rpx 35rpx;
		bottom: 0!important;
		align-items: center;
		height: auto!important;
	}
	.pay {
	/* 	position: absolute;
		left: 408rpx;
		top: -22rpx; */
		text-align: right;
		flex: 1;
		width: 60%;
		display: inline-block;
	}
	.pay button{
		height: 80rpx;
		float: right;
		line-height: 80rpx;
		border-radius: 40rpx;
		width: 278rpx;
		text-align: center;
		margin: 0;
	}
	.must-bottom-price{
		font-size: 44rpx;
		position: static;
	}
	
	
	
	.bot{
		position: fixed;
		bottom: 10rpx;
	}
.button{
	width: 260rpx;
	border-radius: 50rpx;
	position: relative;
	right: -200rpx;
	top: 15rpx;
}
.wucou {
		display: flex;
		justify-content: center;
		margin-top: 200rpx;
		color: #999999;
	}
.must-guige-title{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.must-guige-price{
	margin-top: 0rpx;
}
.fare1{
	margin-top: 69rpx;
}
.coupon{
	margin-top: 135rpx;
	margin-right: 4rpx;
}
.coupon1{
	margin-top: 136rpx;
}
.money{
	margin-top: 200rpx;
	margin-right: 8rpx;
}
.money1{
	margin-top: 200rpx;
}
.cir{
	margin-top: 10rpx;
}
.fenshus{
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: right;
	padding: 0 38rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
}
.heji{
	font-size: 15px;
	font-family: "苹方 中等";
	color: #333333;
}
</style>
