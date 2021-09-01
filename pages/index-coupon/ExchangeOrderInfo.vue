<template>
	<view>
		<view class="personal-header">
			<view class="recharge-status-top">
				<!-- <image class="recharge-status-img" src="../../static/icon_completed_reception.png"></image>
				<view class="recharge-status-text">已完成</view> -->
				<image class="recharge-status-img" src="../../static/icon_unpaid_order.png"></image>
				<view class="recharge-status-text">待支付</view>
				<!-- <image class="recharge-status-img" src="../../static/icon_giving_order.png"></image>
				<view class="recharge-status-text">赠送中</view> -->
			</view>
		</view>
		
		<view class="recharge-flex">
			<view class="reception-flex">
				<view class="reception-address-view">
					<view class="reception-address-view-left">
						<view class="reception-distribution-value">您的订单已由本人签收。如有疑问您可联系 配送员【李阳，13728372378】确认。</view>
						<view class="reception-distribution-time">2021-04-08 06:36:51</view>
					</view>
					<view class="reception-address-view-right" >
						<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
					</view>
					<image src="../../static/icon_send_order.png" class="reception-send-icon"></image>
				</view>
			</view>
			<view class="reception-flex">
				<view class="reception-address-view" style="margin-top: 0rpx;padding-bottom: 30rpx;">
					<view class="reception-address-view-left">
						<view class="reception-address-name">王女士 18801182514</view>
						<view class="reception-address-value">北京市北京市丰台区纪家庙村丰管路天丰大厦238室</view>
					</view>
					<view class="reception-address-view-right" ></view>
				</view>
				<image src="../../static/icon_location_reception.png" class="reception-address-icon"></image>
			</view>
		
			<view class="order-border"></view>
			
			<view class="order-purchase-view">
				<view class="new-order-li">
					<view class="new-order-li-center" v-for="(item,index) in screenPurchase" :key="index">
						<view class="new-order-left">
							<view class="new-order-img">
								<image lazy-load="true" class="new-order-commodity-img" :src="item.img" mode=""></image>
							</view>
						</view>
						<view class="new-order-right">
							<view class="new-order-item">
								<view class="new-order-item-title">{{item.title}}</view>
								<view class="new-order-item-money">¥{{item.money}}</view>
							</view>
							<view class="new-order-item">
								<view class="new-order-item-sku">规格：{{item.sku}}</view>
								<view class="new-order-item-total">x{{item.number}}</view>
							</view>
						</view>
						<view class="conversion-details">{{item.desc}}</view>
					</view>
					<view class="new-order-li-bottom">
						<view class="new-order-nickname"></view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" @click="$buttonClick(applyHandler)">申请开票</view>
							<view class="new-order-botton" @click="$buttonClick(receptiondetails)">再次赠送</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">商品总价：</view>
				<view class="reception-order-money">¥2160</view>
			</view>
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">运费：</view>
				<view class="reception-order-money">¥0</view>
			</view>
			<view class="flex-between flex-between-padding">
				<view class="reception-order-title">优惠券：</view>
				<view class="reception-order-money">¥0</view>
			</view>
			<view class="flex-between flex-between-padding order-line">
				<view class="reception-order-money"></view>
				<view class="reception-order-money">实付款：<text class="reception-order-label">¥</text><text class="reception-order-totalmoney">2160</text></view>
			</view>
			<view class="reception-order-view" style="margin-top: 36rpx;">
				<view class="reception-order-text">订单编号：</view>
				<view class="reception-ordersn">2560819324121</view>
				<view class="reception-order-copy" data-ordernumber="2560819324121" @click="copy">复制</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">下单时间：</view>
				<view class="reception-order-time">2021/04/08 16:12:27</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">支付时间：</view>
				<view class="reception-order-time">2021/04/08 16:12:27</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="reception-order-view" style="margin-top: 36rpx;">
				<view class="reception-order-text">礼包状态：</view>
				<view class="reception-ordersn">直接送礼</view>
			</view>
			<view class="reception-order-view" style="margin-top: 12rpx;">
				<view class="reception-order-text">礼包送法：</view>
				<view class="reception-order-time">待领取  礼包领取 (件) 3/3</view>
				<view class="reception-order-copy" style="width: 100rpx;margin-left: 60rpx;" data-ordernumber="2560819324121" @click="copy">查看详情</view>
			</view>
			<view class="reception-order-view-bootom" style="margin-top: 12rpx;">
				<view class="reception-order-text">超时说明：</view>
				<view class="reception-order-time">支付完成超过24小时，未成功领取的礼物系统将自动退款</view>
			</view>
		</view>
		<view class="reception-empty"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ordernumber: '',
				orderInfo: '',
				screenPurchase: [
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 180,
						"sku": "礼盒装",
						"number": 3,
						"desc": "退货成功"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 980,
						"sku": "礼盒装",
						"number": 5,
						"desc": "换货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					}
				]
			}
		},
		onLoad:function(options){
			this.ordernumber = options.ordernumber;
			let that = this;
			let action = "get_exchange_order_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				ordernumber: this.ordernumber,
				memberid: memberid
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.rs.sta == 1){
					that.orderInfo = res.rs;
				} 
			})
		},
		methods:{
			backbutton(e){
				uni.navigateBack({
					delta: 1
				});
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
			applyHandler(e){
				uni.navigateTo({
					url: "../Apply/ApplyInvoice"
				});
			},
		}
	}
</script>

<style>
	page{
		background-color: #F9F9F9;
	}
	
	.personal-header{
		 height: 160rpx;
		 background: #FB503D;
		 width: 100%;
		 position: relative;
	}
	
	.recharge-status-top{
		display: flex;
		align-items: center;
	    justify-content: center;
	    margin-top: 0rpx;
	}
	.recharge-status-img{
		width: 42rpx;
		height: 42rpx;
	}
	.recharge-status-text{
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 59rpx;
		margin-left: 8rpx;
	}
	
	.recharge-flex{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -30rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		flex-direction: column;
		position: relative;
		/* margin-bottom: 20rpx; */
	}
	
	.order-border{
		width: 100%;
		height: 20rpx;
		background: #FAFAFA;
	}
	.reception-flex{
		width: 100%;
		display: flex;
		position: relative;
	}
	
	.reception-address-view{
		background-color: #FFF;
		margin-top: 20rpx;
		padding: 30rpx 30rpx 10rpx 78rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	
	.reception-address-view-left{
		display: flex;
		width: 560rpx;
		flex-direction: column;
	}
	
	.reception-distribution-value{
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		line-height: 42rpx;
	}
	
	.reception-distribution-time{
		width: 570rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #999999;
		line-height: 42rpx;
		margin-top: 10rpx;
	}
	
	.reception-address-name{
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		line-height: 45rpx;
	}
	
	.reception-address-value{
		width: 570rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		margin-top: 10rpx;
	}
	
	
	.reception-address-arrow{
		width: 40rpx;
		height: 40rpx;
	}
	
	.reception-send-icon {
	    position: absolute;
	    top: 50rpx;
	    left: 26rpx;
	    width: 44rpx;
	    height: 44rpx;
	}
	
	.reception-address-icon{
		position: absolute;
		top: 32rpx;
		left: 26rpx;
		width: 44rpx;
		height: 44rpx;
	}
	
	.order-purchase-view{
		/* background-color: #FFF; */
	}
	.new-order-li{
		width: 100%;
		margin-top: 0rpx;
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
	.reception-order{
		display: flex;
		flex-direction: column;
		padding: 20rpx 36rpx 30rpx 36rpx;
		margin-top: 20rpx;
		background: #FFFFFF;
	}
	.reception-order-view{
		display: flex;
		align-items: center;
	}
	.reception-order-view-bootom{
		display: flex;
	}
	.reception-order-text{
		min-width: 140rpx;
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
	
	.reception-empty{
		height: 100rpx;
	}
	
	.flex-between-padding{
		padding: 20rpx 0rpx;
	}
	.order-line{
		padding: 26rpx 0rpx;
		border-top: 1px solid #EEEEEE;
		border-bottom: 1px solid #EEEEEE;
	}
	.reception-order-title{
		font-size: 30rpx;
		color: #999999;
		line-height: 42rpx;
	}
	.reception-order-money{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	.reception-order-label{
		font-size: 30rpx;
		color: #EB1615;
	}
	.reception-order-totalmoney{
		font-size: 30rpx;
		color: #EB1615;
		font-weight: bold;
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
	.recharge-status-label{
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 40rpx;
		text-align: center;
		margin-top: 10rpx;
	}
</style>
