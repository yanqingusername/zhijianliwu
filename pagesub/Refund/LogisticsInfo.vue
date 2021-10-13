<template>
	<view>
		<view class="logistics-info-view">
			<view class="logistics-info-view-title">{{stepsInfo.express_name}}：{{stepsInfo.express_num}}</view>
			<view class="logistics-info-view-lable" @click="copy" :data-ordernumber="stepsInfo.express_num">复制</view>
		</view>
		<!-- 签收信息 -->
		<view class="Logistics_information">
			<view class="Logistics_informationBox" v-for="(item,index) in stepsInfo.wuliu_info" :key="index">
				<view class="Logistics_information_left"></view>
				<view class="Logistics_information_right">
					<view class="imagesimg">
						<view class="wl_Order_placed" v-if="item.status_type">
							<image src="../../static/icon_list_logistics_01.png" class="wl_Order_placed_img" v-if="item.status_type ==1"></image>
							<image src="../../static/icon_warehouse_logistics_02.png" class="wl_Order_placed_img" v-if="item.status_type ==2"></image>
							<image src="../../static/icon_delivered_logistics_03.png" class="wl_Order_placed_img" v-if="item.status_type ==3"></image>
							<image src="../../static/icon_transit_logistics_04.png" class="wl_Order_placed_img" v-if="item.status_type ==4"></image>
							<image src="../../static/icon_delivery_logistics_05.png" class="wl_Order_placed_img" v-if="item.status_type ==5"></image>
							<image src="../../static/icon_signed_logistics_06.png" class="wl_Order_placed_img" v-if="item.status_type ==6"></image>
							<view style="font-size: 20rpx;color: #FFCDCD;width: 40rpx;height: 40rpx;display: flex;align-items: center;justify-content: center;" v-if="item.status_type ==7">收</view>
							<view style="font-size: 20rpx;color: #FFCDCD;width: 40rpx;height: 40rpx;display: flex;align-items: center;justify-content: center;" v-if="item.status_type ==8">完</view>
						</view>
						<view class="wl_Order_placed_view" v-else></view>
					</view>
					<view class="content">
						<view class="content_title">{{item.status}}</view>
						<view class="content_detail">{{item.context}}</view>
						<view class="content_data">{{item.time}}</view>
						<view style="height: 40rpx;"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ordernumber: '',
				stepsInfo: '',
				steps: [
					{
						text: '',
						spans: '',
						desc: '收货地址：北京市北京市丰台区纪家庙村天丰大厦238室',
						icon: '../imgs/text-logo.png',
						status: true
					},
					{
						text: '已签收',
						spans: '2021-04-21 17:09:20',
						desc: '您的订单已由本人签收。如有疑问您可联系配送员【李阳，13728372378】确认。',
						icon: '../../static/icon_signed_logistics_06.png',
						status: true
					},
					{
						text: '派送中',
						spans: '2021-04-21 17:00:10',
						desc: '您的订单正在派送途中（快递员：李阳，电话：13728372378），请您耐心等待。',
						icon: '../../static/icon_delivery_logistics_05.png',
						status: true
					},
					{
						spans: '2021-04-21 11:50:21',
						desc: '您的订单由【北京园区-al】送往【北京大兴分拣中心】',
						icon: '../../static/icon_transit_logistics_04.png',
						status: false
					},
					{
						spans: '2021-04-21 11:52:32',
						desc: '您的订单由【北京大兴分拣中心】送往【北京纪家庙营业部】',
						icon: '../../static/icon_transit_logistics_04.png',
						status: false
					},
					{
						text: '运输中',
						spans: '2021-04-21 15:19:25',
						desc: '您的订单已到达【北京纪家庙营业部】',
						icon: '../../static/icon_transit_logistics_04.png',
						status: true
					},
					{
						text: '已发货',
						spans: '2021-04-20 17:00:10',
						desc: '您的订单已拣货完成，待交付申通快递，运单号：9838273627782',
						icon: '../../static/icon_delivered_logistics_03.png',
						status: true
					},
					{
						text: '库房已确认',
						spans: '2021-04-20 16:52:32',
						desc: '订单已确认，准备出库',
						icon: '../../static/icon_warehouse_logistics_02.png',
						status: true
					},
					{
						text: '商品已下单',
						spans: '2021-04-20 16:40:26',
						desc: '您已提交了订单，请等待系统确认',
						icon: '../../static/icon_list_logistics_01.png',
						status: true
					}
				],
			}
		},
		onLoad: function(options) {
			this.ordernumber = options.ordernumber;
			let that = this;
			let action = "get_order_wuliu_info";
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				ordernumber: this.ordernumber,
				memberid: memberid
			});
			this.$utils.postNew(action,data,controller).then(res=>{
				if(res.sta == 1){
					that.stepsInfo = res.rs;
				} 
			})
		},
		methods: {
			copy: function(e) {
				let orderNumber = e.currentTarget.dataset.ordernumber;
				uni.setClipboardData({
					data: orderNumber,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					},
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.logistics-info-view {
		display: flex;
		align-items: center;
		padding: 40rpx 0rpx 30rpx 53rpx;
	}

	.logistics-info-view-title {
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}

	.logistics-info-view-lable {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 66rpx;
		height: 32rpx;
		background: #E6E6E6;
		border-radius: 3rpx;
		font-size: 24rpx;
		color: #333333;
		margin-left: 22rpx;
	}

	.logistics-template {
		width: 100%;
		height: 100%;
	}

	// 物流信息
	.Logistics_information {
		padding: 10rpx 40rpx 40rpx 60rpx;
	}

	.Logistics_informationBox {
		display: flex;
	}


	.Logistics_information_left {
		width: 2rpx;
		background-color: #CCCCCC;
	}

	.Logistics_information_right {
		display: flex;
	}

	.imagesimg {
		
	}

	.wl_Order_placed {
		width: 40rpx !important;
		height: 40rpx !important;
		background-color: #EB1615 !important;
		margin-left: -20rpx !important;
		margin-right: 20rpx !important;
		border-radius: 50%;
	}

	.wl_Order_placed_img{
		width: 40rpx !important;
		height: 40rpx !important;
	}
	
	.wl_Order_placed_view {
		background-color: #fff !important;
		margin-left: 40rpx !important;
	}
	.imgs {
		margin-left: -12rpx;
		width: 18rpx;
		height: 18rpx;
		background-color: #fff;
		margin-right: 49rpx;
	}
	.content {}

	.content_title {
		width: 580rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #999999;
		display: flex;
		justify-content: space-between;
		line-height: 42rpx;
	}

	.content_data {
		font-size: 26rpx;
		font-weight: bold;
		color: #999999;
		margin-top: 10rpx;
	}

	.content_detail {
		margin-top: 16rpx;
		width: 580rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
	}

	.Logistics_informationBox:last-child .Logistics_information_left {
		width: 0;
	}

	.Logistics_informationBox:first-child .Logistics_information_right .content .content_title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333 !important;
	}

	.Logistics_informationBox:first-child .Logistics_information_right .content .content_detail {
		font-size: 26rpx;
		font-weight: bold;
		color: #333333 !important;

	}
</style>
