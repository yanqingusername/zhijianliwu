<template>
	<view class="own-coupon own-coupon-box">
		<view class="own-coupon-content">
			<view class="own-coupon-type">
				{{typeName}}
			</view>
			<view class="own-coupon-price">
				￥ <span>{{$utils.formatPrice(coupon.money)}}</span>
			</view>
			<view class="own-coupon-title">{{coupon.coupon_name}}</view>
			<view class="own-coupon-time">有效期至{{$utils.formatTime(coupon.end_time)}}</view>
		</view>
		<view class="own-coupon-button" @click="receive(coupon.id)" v-if="coupon.is_receive==0">
			立即领取
		</view>
		<view class="own-coupon-button" v-else>
			{{state}}
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			'coupon'
		],
		data() {
			return {
				also_number: 80,
				begin_time: 1609862400,
				coupon_name: "500-100",
				end_time: 1612022400,
				full_money: "500",
				goodsids: "1226",
				goodsinfo: {id: 1226, goodsname: "53°茅台王子酒（传承1999）500ml（酱香型）  50140004", price: "556.00", price_level0: "556.00", price_level1: "398.50",},
				id: 39,
				is_receive: 0,
				member_receive_num: 1,
				money: "100.00",
				receive_number: 100,
				type: "0",
			}
		},
		methods: {
			receive(id){
				var data = JSON.stringify({
					memberid: uni.getStorageSync('id'),
					coupon_type: this.coupon.id
				});
				var action = 'receive_coupon';
				// console.log('领取优惠券', data)
				this.$utils.post(action, data).then(res => {
					console.log('领取优惠券', res)
					if (res.sta == 1) {
						this.coupon.is_receive = 1;
						this.$forceUpdate();
						uni.showToast({
							title: '成功领取',
							icon: "none",
							mask: 'true',
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
							mask: 'true',
						})
					}})
			}
		},
		computed:{
			typeName: function(){
				if(this.coupon.type==0){
					return "全品优惠券"
				}else if(this.coupon.type==1){
					return "商品优惠券"
				}else{
					return "未知优惠券"
				}
			},
			state: function(){
				if(this.coupon.is_receive==0){
					return "待领取"
				}else if(this.coupon.end_time> Date.parse(new Date())){
					return "已过期"
				}else if(this.coupon.is_receive==1){
					return "已领取"
				}
			}
		}
	}
</script>

<style>
.own-coupon-box{
	height: 200rpx;
	display: flex;
	border-radius: 16rpx;
	background-color: rgba(255, 1, 55, 0.2);
	justify-content: space-between;
	color: rgba(255, 1, 55, 0.60);
	position: relative;
}
.own-coupon-content{
}
.own-coupon-type{
	padding: 4rpx 0;
	width: 160rpx;
	height: 28rpx;
	text-align: center;
	font-size: 0.8em;
	border-radius: 16rpx 0 0 0;
	background-color: rgba(255, 1, 55, 0.2);
}
.own-coupon-price{
	position: absolute;
	width: 160rpx;
	height: 172rpx;
	line-height: 172rpx;
	text-align: center;
	font-size: 1.2em;
	font-weight: 400;
	top: 28rpx;
	left: 0;
	bottom: auto;
	right: auto;
}
.own-coupon-price span{
	font-size: 1.8em;
	font-weight: 400;
}
.own-coupon-title,
.own-coupon-time{
	position: absolute;
	left: 170rpx;
	bottom: auto;
	right: auto;
}

.own-coupon-title{
	top: 54rpx;
	font-size: 1.2em;
	line-height: 1.2em;
	max-height: 2.4em;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	width: calc(100% - 340rpx);
}
.own-coupon-time{
	top: 148rpx;
	font-size: 0.8em;
}
.own-coupon-button{
	text-align: center;
	width: 160rpx;
	height: 160rpx;
	margin: 20rpx 0;
	line-height: 160rpx;
	border-left: rgba(255, 1, 55, 0.2) dashed 2px;
}
</style>
