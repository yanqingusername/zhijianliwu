<template>
	<view>
		<view class="order-purchase-view">
			<view class="new-order-li">
				<view class="new-order-li-top">
					<image lazy-load="true" class="new-order-header-img" :src="orderReceptionInfo.orderinfo.give_head_img" mode=""></image>
					<view class="new-order-nickname">{{orderReceptionInfo.orderinfo.give_name}}</view>
					<view class="new-order-li-top-ordersn">送出的</view>
				</view>
				<view class="new-order-li-center" v-for="(item,index) in orderReceptionInfo.orderdetail" :key="index">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.head_img" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item-title">{{item.goodsname}}</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：{{item.goods_spec_item}}</view>
							<view class="new-order-item-total">x{{item.goodsnum}}</view>
						</view>
					</view>
					<view class="conversion-details" v-if="orderReceptionInfo.orderinfo.is_new_cardbag ==1 " @click="goConversionDetails" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber">转赠详情</view>
				</view>
				<view class="new-order-li-bottom" v-if="orderReceptionInfo.orderinfo.is_new_cardbag !=1 ">
					<view class="new-order-nickname"></view>
					<view class="new-order-botton-view">
						<view class="new-order-botton-gray" @click="goTransfer" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber" :data-isexchangetype="orderReceptionInfo.orderinfo.is_exchange_type">转赠</view>
						<view class="new-order-botton" @click="ReceptionAddress" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber">填写收货地址</view>
					</view>
				</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="reception-order-view">
				<view class="reception-order-text">领取编号：</view>
				<view class="reception-ordersn">{{orderReceptionInfo.orderinfo.ordernumber}}</view>
				<view class="reception-order-copy" :data-ordernumber="orderReceptionInfo.orderinfo.ordernumber" @click="copy">复制</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">领取时间：</view>
				<view class="reception-order-time">{{orderReceptionInfo.add_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import btn from "@/common/btn.js";
	export default {
		data() {
			return {
				ordernumber: '',
				orderReceptionInfo: '',
			}
		},
		onShow: function() {

		},
		onLoad: function(options) {
			this.ordernumber = options.ordernumber;
			let that = this;
			let action = "get_order_receivegifts_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				memberid: memberid,
				ordernumber: this.ordernumber
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.orderReceptionInfo = res.rs;
				}
			});
		},
		computed: {
			
		},
		methods: {
			//转赠详情 我送出的
			goConversionDetails: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: '../index-coupon/ConversionDetails?cardbag=' + ordernumber +'&cardbag_detail_id=' + '0' + '&cardbag_number=' + ordernumber
				});
			},
			//转赠
			goTransfer: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let isexchangetype = e.currentTarget.dataset.isexchangetype;
				uni.navigateTo({
					url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=${isexchangetype}`
				})
			},
			//填写收货地址
			ReceptionAddress: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: './ReceptionAddress?ordernumber=' + ordernumber
				})
			},
			copy: function(e) {
				let orderNumber = e.currentTarget.dataset.ordernumber;
				uni.setClipboardData({
				    data: orderNumber,
				    success: function (res) {
				        uni.showToast({
				          title: '复制成功',
				        });
				    },
				})	
			},
		}
	}
</script>

<style>
	page {
		background-color: #F8F7F5;
	}
	
	.recharge-header-nav {
	    height: 52rpx;
	    border-bottom: 4rpx solid #fff;
	    color: #333333;
		font-size: 28rpx;
	}
	
	.recharge-header-nav-active {
	    border-bottom: 4rpx solid #EB1615;
	    color: #EB1615;
	}

	.order-commodity-name {
		width: 75%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.order-purchase-li-btm {
		display: flex;
		justify-content: flex-end;
	}

	.order-nav-content {
		width: 550rpx;
	}

	.order-purchase-li-btm-button {
		width: min-content;
	}

	.order-purchase-btm-li {
		margin-left: 20rpx;
	}

	.no-btm {
		line-height: 64rpx;
		color: #B4B4B4;
		text-align: center;
	}
	
	.order-purchase-view{
		background-color: #FFF;
	}
	.new-order-li{
		width: 100%;
		margin-top: 20rpx;
	}
	.new-order-li-top{
		display: flex;
		align-items: center;
		padding: 20rpx 45rpx 20rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	
	.new-order-header-img{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}
	.new-order-nickname{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
		margin-left: 8rpx;
	}
	.new-order-li-top-ordersn{
		font-size: 24rpx;
		color: #666666;
		line-height: 33rpx;
		margin-left: 12rpx;
	}
	.new-order-li-top-orderstatus{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		padding: 25rpx 45rpx 25rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.conversion-details{
		font-size: 24rpx;
		color: #EC1815;
		line-height: 33rpx;
		position: absolute;
		bottom: 12rpx;
		right: 34rpx;
	}
	.new-order-left{
		width: 140rpx;
		display: flex;
		align-items: center;
	}
	.new-scroll-left{
		width: 540rpx;
		display: flex;
		align-items: center;
	}
	.new-order-scroll {
	    width: 540rpx;
	    height: 140rpx;
	}
	.new-scroll-right{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.new-order-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 516rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-right{
		display: flex;
		flex-direction: column;
		width: 516rpx;
		margin-left: 20rpx;
	}
	.new-order-item-money{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-li-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15rpx 45rpx 18rpx 38rpx;
	}
	
	.new-order-botton-view{
		display: flex;
		align-items: center;
	}
	.new-order-botton{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48rpx;
		border-radius: 3rpx;
		border: 1px solid #EB1615;
		font-size: 24rpx;
		color: #EB1615;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
		margin-left: 20rpx;
	}
	.new-order-botton-gray{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48rpx;
		border-radius: 3rpx;
		border: 1px solid #979797;
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
	}
	
	.reception-order{
		display: flex;
		flex-direction: column;
		padding: 20rpx 0rpx 20rpx 36rpx;
		margin-top: 20rpx;
		background: #FFFFFF;
	}
	.reception-order-view{
		display: flex;
		align-items: center;
	}
	.reception-order-text{
		font-size: 24rpx;
		color: #999999;
	}
	.reception-ordersn{
		font-size: 24rpx;
		color: #333333;
	}
	.reception-order-copy{
		width: 60rpx;
		height: 30rpx;
		background: #E6E6E6;
		border-radius: 3rpx;
		margin-left: 15rpx;
		font-size: 20rpx;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.reception-order-time{
		font-size: 24rpx;
		color: #333333;
	}
</style>
