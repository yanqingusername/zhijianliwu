<template>
	<view style="width: 100%;overflow-x: hidden;display: flex;flex-direction: column;box-sizing: border-box;">
		<view class="personal-header" style="height:200rpx;">
			<!-- <view class="my-nav" :style="'height:'+nav+'px'"></view>
			<view class="personal-header-interstall" >
				<image @click="$buttonClick(backbutton)" class="icon-back-img" src="../../static/icon_header_back.png"></image>
				<view class="personal-header-title"></view>
			</view> -->
			<view class="recharge-status-top" v-if="typerefund == 1 && cancel_info.status == 1">
				<image class="recharge-status-img" src="../../static/icon_unpaid_order.png"></image>
				<view class="recharge-status-text">待审核</view>
			</view>
			<view class="recharge-status-label" v-if="typerefund == 1 && cancel_info.status == 1">退款申请已提交，请等待客服处理</view>
			<view class="refund-info-content" v-if="typerefund == 1 && cancel_info.status == 6">
				<view class="refund-info-text">退款完成</view>
				<view class="refund-info-text margin-text">退款金额 ¥{{cancel_info.refund_price}}</view>
			</view>
			
			<view class="recharge-status-top" v-if="typerefund == 2 && cancel_info.status == 1">
				<image class="recharge-status-img" src="../../static/icon_unpaid_order.png"></image>
				<view class="recharge-status-text">待审核</view>
			</view>
			<view class="recharge-status-label" v-if="typerefund == 2 && cancel_info.status == 1">您已提交换货申请，待审核</view>
			
			<view class="refund-info-content" v-if="typerefund == 2 && cancel_info.status == 2">
				<view class="refund-info-text">审核通过，请尽快寄出换货商品并填写物流单号</view>
				<view class="refund-info-text margin-text" style="display: flex;align-items: center;">剩余<uni-countdown :showColon="false" :show-day="true" :day="countdown.day" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FB503D" color="#FFFFFF" splitorColor="#FFFFFF"></uni-countdown></view>
			</view>
			
			<view class="recharge-status-label" v-if="typerefund == 2 && cancel_info.status == 4">退回商品入库后，我们将为您寄出换货商品</view>
			<view class="recharge-status-label" v-if="typerefund == 2 && cancel_info.status == 5">已为您寄出换货商品</view>
			
			
			<view class="recharge-status-top" v-if="typerefund == 3 && cancel_info.status == 1">
				<image class="recharge-status-img" src="../../static/icon_unpaid_order.png"></image>
				<view class="recharge-status-text">待审核</view>
			</view>
			<view class="recharge-status-label" v-if="typerefund == 3 && cancel_info.status == 1">您已提交退货申请，待审核</view>
			
			<view class="refund-info-content" v-if="typerefund == 3 && cancel_info.status == 2">
				<view class="refund-info-text">审核通过，请尽快寄出退货商品并填写物流单号</view>
				<view class="refund-info-text margin-text" style="display: flex;align-items: center;">剩余<uni-countdown :showColon="false" :show-day="true" :day="countdown.day" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FB503D" color="#FFFFFF" splitorColor="#FFFFFF"></uni-countdown></view>
			</view>
			
			<view class="recharge-status-label" v-if="typerefund == 3 && cancel_info.status == 4">退回商品入库后，我们将为您处理退款事宜</view>
			
			<view class="refund-info-content" v-if="typerefund == 3 && cancel_info.status == 6">
				<view class="refund-info-text">退款完成</view>
				<view class="refund-info-text margin-text">退款金额 ¥{{cancel_info.refund_price}}</view>
			</view>
			
		</view>
		
		<view class="recharge-flex">
			<view class="order-purchase-view">
				<view class="new-order-li">
					<view class="refund-info-top" v-if="typerefund == 1 && cancel_info.status == 6">
						<view class="refund-text">退款金额</view>
						<view class="refund-money">¥{{cancel_info.refund_price}}</view>
					</view>
					<view v-if="typerefund == 1 && cancel_info.status == 6" style="font-size: 22rpx;color: #AAAAAA;padding-left: 46rpx;padding-bottom: 22rpx;">{{cancel_info.goods_count_price_info}}</view>
					<view class="line-gray" v-if="typerefund == 1 && cancel_info.status == 6"></view>
					
					<view class="refund-info-top" v-if="(typerefund == 2 || typerefund == 3) && cancel_info.status == 2">
						<view class="refund-text">退回地址</view>
						<view class="refund-money"></view>
					</view>
					<view class="line-gray" v-if="(typerefund == 2 || typerefund == 3) && cancel_info.status == 2"></view>
					<view class="recharge-address-text" v-if="(typerefund == 2 || typerefund == 3) && cancel_info.status == 2"><text>{{cancel_info.refund_address}}</text><text class="reception-order-copy" :data-ordernumber="cancel_info.refund_address" @click="copy">复制</text></view>
					<view class="line-bottom" v-if="(typerefund == 2 || typerefund == 3) && cancel_info.status == 2"></view>
					
					<view class="refund-info-top" v-if="(typerefund == 2 || typerefund == 3) && cancel_info.status == 4">
						<view class="refund-text">退货物流</view>
						<view class="refund-money"></view>
					</view>
					<view class="line-gray" v-if="(typerefund == 2 || typerefund == 3) && cancel_info.status == 4"></view>
					
					<view class="refund-info-top" v-if="typerefund == 2 && cancel_info.status == 5">
						<view class="refund-text">换货物流</view>
						<view class="refund-money"></view>
					</view>
					<view class="line-gray" v-if="typerefund == 2 && cancel_info.status == 5"></view>
					
					<view class="refund-info-top" v-if="typerefund == 3 && (cancel_info.status == 1 || cancel_info.status == 2)">
						<view class="refund-text">退款金额</view>
						<view class="refund-money">¥{{cancel_info.refund_price}}</view>
					</view>
					<view v-if="typerefund == 3 && (cancel_info.status == 1 || cancel_info.status == 2)" style="font-size: 22rpx;color: #AAAAAA;padding-left: 46rpx;padding-bottom: 22rpx;">{{cancel_info.goods_count_price_info}}</view>
					<view class="line-gray" v-if="typerefund == 3 && (cancel_info.status == 1 || cancel_info.status == 2)"></view>
					
					
					<view class="reception-flex" v-if="typerefund == 2 && (cancel_info.status == 4 || cancel_info.status == 5) && cancel_info.wuliu_info.length > 0"  @click="logisticInfo" :data-ordernumber="cancel_info.ordernumber">
						<view class="reception-address-view">
							<view class="reception-address-view-left" style="margin-right: 30rpx;">
								<view class="reception-distribution-value">{{cancel_info.wuliu_info[0].context}}</view>
								<view class="reception-distribution-time">{{cancel_info.wuliu_info[0].time}}</view>
							</view>
							<view class="reception-address-view-right" >
								<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
							</view>
						</view>
					</view>
					<view class="reception-flex" v-if="typerefund == 2 && (cancel_info.status == 4 || cancel_info.status == 5) && cancel_info.linkman">
						<view class="reception-address-view" style="margin-top: 0rpx;padding-bottom: 10rpx;">
							<view class="reception-address-view-left">
								<view class="reception-address-name">{{cancel_info.linkman}} {{cancel_info.linktel}}</view>
								<view class="reception-address-value">{{cancel_info.province}}{{cancel_info.city}}{{cancel_info.county}}{{cancel_info.address}}</view>
							</view>
							<view class="reception-address-view-right" ></view>
						</view>
						<image src="../../static/icon_location_reception.png" class="reception-address-icon"></image>
					</view>
					<view class="line-bottom" v-if="typerefund == 2 && (cancel_info.status == 4 || cancel_info.status == 5)"></view>
					
					<view class="reception-flex" v-if="typerefund == 3 && (cancel_info.status == 4 || cancel_info.status == 6) && cancel_info.wuliu_info.length > 0"  @click="logisticInfo" :data-ordernumber="cancel_info.ordernumber">
						<view class="reception-address-view">
							<view class="reception-address-view-left" style="margin-right: 30rpx;">
								<view class="reception-distribution-value">{{cancel_info.wuliu_info[0].context}}</view>
								<view class="reception-distribution-time">{{cancel_info.wuliu_info[0].time}}</view>
							</view>
							<view class="reception-address-view-right" >
								<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
							</view>
						</view>
					</view>
					<view class="reception-flex" v-if="typerefund == 3 && (cancel_info.status == 4 || cancel_info.status == 5) && cancel_info.linkman">
						<view class="reception-address-view" style="margin-top: 0rpx;padding-bottom: 10rpx;">
							<view class="reception-address-view-left">
								<view class="reception-address-name">{{cancel_info.linkman}} {{cancel_info.linktel}}</view>
								<view class="reception-address-value">{{cancel_info.province}}{{cancel_info.city}}{{cancel_info.county}}{{cancel_info.address}}</view>
							</view>
							<view class="reception-address-view-right" ></view>
						</view>
						<image src="../../static/icon_location_reception.png" class="reception-address-icon"></image>
					</view>
					<view class="line-bottom" v-if="typerefund == 3 && (cancel_info.status == 4 || cancel_info.status == 6)"></view>
					
					<view class="refund-info-top" v-if="typerefund == 3 && (cancel_info.status == 4 || cancel_info.status == 6)">
						<view class="refund-text">退款金额</view>
						<view class="refund-money">¥{{cancel_info.refund_price}}</view>
					</view>
					<view v-if="typerefund == 3 && (cancel_info.status == 4 || cancel_info.status == 6)" style="font-size: 22rpx;color: #AAAAAA;padding-left: 46rpx;padding-bottom: 22rpx;">{{cancel_info.goods_count_price_info}}</view>
					<view class="line-gray" v-if="typerefund == 3 && (cancel_info.status == 4 || cancel_info.status == 6)"></view>
					
					
					<!-- v-for="(item,index) in cancel_list" :key="index" -->
					<view class="new-order-li-center" v-for="(item,index) in cancel_list" :key="index">
						<view class="new-order-left">
							<view class="new-order-img">
								<image lazy-load="true" class="new-order-commodity-img" :src="item.head_img" mode=""></image>
							</view>
						</view>
						<view class="new-order-right">
							<view class="new-order-item">
								<view class="new-order-item-title">{{item.goodsname}}</view>
								<view class="new-order-item-money"></view>
							</view>
							<view class="new-order-item">
								<view class="new-order-item-sku">规格：{{item.goods_spec_item}}</view>
								<view class="new-order-item-total">x{{item.goodsnum}}</view>
							</view>
						</view>
					</view>
					<view class="new-order-li-bottom" v-if="typerefund == 1 && cancel_info.status == 1">
						<view class="new-order-nickname">{{cancel_info.goods_count_price_info}}</view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" v-if="typerefund == 1 && cancel_info.status == 1" @click="$buttonClick(applyHandler)">撤销申请</view>
							<view class="new-order-botton-gray" v-if="typerefund == 1 && cancel_info.status == 3" @click="$buttonClick(ApplyRefund)">再次申请</view>
						</view>
					</view>
					
					<view class="new-order-li-bottom" v-if="typerefund == 2 && (cancel_info.status == 1 || cancel_info.status == 2)">
						<view class="new-order-nickname">{{cancel_info.goods_count_price_info}}</view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" v-if="typerefund == 2 && cancel_info.status == 1" @click="$buttonClick(applyHandler)">撤销申请</view>
							<view class="new-order-botton-gray" v-if="typerefund == 2 && cancel_info.status == 2" @click="$buttonClick(logisticsHandler)">填写物流单号</view>
						</view>
					</view>
					
					<view class="new-order-li-bottom" v-if="typerefund == 3 && (cancel_info.status == 1 || cancel_info.status == 2)">
						<view class="new-order-nickname">{{cancel_info.goods_count_price_info}}</view>
						<view class="new-order-botton-view">
							<view class="new-order-botton-gray" v-if="typerefund == 3 && cancel_info.status == 1" @click="$buttonClick(applyHandler)">撤销申请</view>
							<view class="new-order-botton-gray" v-if="typerefund == 3 && cancel_info.status == 2" @click="$buttonClick(logisticsHandler)">填写物流单号</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="reception-order">
			<view class="flex-between-padding">
				<view class="reception-order-title">服务单号：</view>
				<view class="reception-order-money">{{cancel_info.service_order_no}}</view>
			</view>
			<view class="flex-between-padding">
				<view class="reception-order-title">申请时间：</view>
				<view class="reception-order-money">{{cancel_info.add_time}}</view>
			</view>
			<view class="flex-between-padding">
				<view class="reception-order-title">申请类型：</view>
				<view class="reception-order-money">{{cancel_info.type == 1 ? '退款' : cancel_info.type == 2 ? '换货' : '退货'}}</view>
			</view>
			<view class="flex-between-padding">
				<view class="reception-order-title">申请原因：</view>
				<view class="reception-order-money">{{cancel_info.refund_reason}}</view>
			</view>
		</view>
		
		<!-- 填写物流单号 -->
		<uni-popup ref="popuplogistics" type="center" :animation="false" :maskClick="true" @change="change">
			<view class="popup-order" :style="'height:'+boxHeight+'rpx'">
				<view class="popup-order-text">填写物流单号</view>
				<view class="popup-order-content" style="position: relative;">
					<view class="popup-order-title">快递公司：</view>
					<view class="popup-order-input flex-vertically" style="padding-left: 20rpx;" @click="expressHandler">{{ express_name || '请选择快递公司'}}</view>
					<image class="sale-content-ar" src="../../static/drop_down_arrow.png"></image>
					<view class="all-order-left" v-if="isShow">
						<scroll-view scroll-y="true" class="all-order-scroll" :style="'height:'+bHeight+'rpx'">
								<view class="flex" style="flex-direction: column;background: #FFFFFF;width: 348rpx;">
									<view class="all-order-text" v-for="(it,index) in expressInfoList" @click="expressClick" :data-expressname="it.express_name" :data-id="it.id"
									 :key="index" >{{it.express_name}}</view>
								</view>
						</scroll-view>
					</view>
				</view>
				<view class="popup-order-content" v-if="isShowAll">
					<view class="popup-order-title">快递公司：</view>
					<view class="popup-order-input flex-vertically"><input v-if="!isShow" v-model="company_name" name="company_name" placeholder="请输入快递公司" type="text"></view>
				</view>
				<view class="popup-order-content-two">
					<view class="popup-order-title">快递单号：</view>
					<view class="popup-order-input flex-vertically"><input v-if="!isShow" v-model="express_num" name="express_num" placeholder="请输入快递单号" type="text"></view>
				</view>
				
				<view class="popup-order-bottom" @click="$buttonClick(submitlogistics)">
					<view class="popup-order-button">确定提交</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var timer = null;
	var times = 0;
	export default{
		data(){
			return{
				value:'',
				nav:'20',
				screenPurchase: [],
				ordernumber: '',
				typerefund: 1,
				detailid: '',
				cancel_info: '',
				expressInfoList: [],
				express_name: '',
				company_name: '',
				express_num: '',
				isShow: false,
				boxHeight: 475,
				isShowAll: false,
				bHeight: 260,
				countdown: '',
				isSystemInfo: false,
				cancel_list: []
			}
		},
		onLoad:function(options){
			uni.getSystemInfo({
				success: res=>{
					this.nav = res.statusBarHeight 
				}
			})
			
			this.isSystemInfo = this.$utils.isSystemInfo();
			
			this.ordernumber=options.ordernumber;
			this.typerefund=options.typerefund;
			this.detailid=options.detailid;
			
			let action = 'get_order_cancel_info';
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				ordernumber: this.ordernumber,
				memberid: memberid,
				order_detail_id: this.detailid
			})
			this.$utils.postNew(action, data, controller).then(res => {
			    if(res.sta == 1){
			        this.cancel_info = res.rs.cancel_info;
					this.cancel_list = res.rs.cancel_list;
					this.typerefund = res.rs.cancel_info.type;
					if((this.typerefund == 2 || this.typerefund == 3) && this.cancel_info.status == 2){
						this.getCountdown(this.cancel_info.express_surplus_time);
					}
			    }
			})
			
			let action1 = 'get_express_info_list';
			let controller1 = 'order';
			let data1 = JSON.stringify({
			
			})
			this.$utils.postNew(action1, data1, controller1).then(res => {
			    if(res.sta == 1){
			        this.expressInfoList = res.rs;
			    }
			})
		},
		methods:{
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
						console.log('---->:',that.countdown)
						// times--;
					},
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
			ApplyRefund(e) {
				uni.redirectTo({
					url: `./ApplyRefund?ordernumber=${this.ordernumber}&typerefund=${this.typerefund}&detailid=${this.detailid}`
				});
			},
			//撤销申请
			applyHandler(e){
				let action = 'revoke_refund_order';
				let controller = 'order';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					ordernumber: this.ordernumber,
					memberid: memberid,
					order_detail_id: this.detailid
				})
				this.$utils.postNew(action, data, controller).then(res => {
				    if(res.sta == 1){
						uni.showToast({
						  title: '撤销成功',
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							});
						},1000)
				    }
				})
			},
			//物流
			logisticInfo: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: "./LogisticsInfo?ordernumber=" + ordernumber
				});
			},
			logisticsHandler() {
				this.$refs['popuplogistics'].open();
			},
			expressHandler(){
				this.isShow = !this.isShow;
			},
			expressClick(e){
				this.isShow = false;
				let expressname = e.currentTarget.dataset.expressname;
				this.express_name = expressname;
				let id = e.currentTarget.dataset.id;
				if(id == 0){
					this.boxHeight = 560;
					this.bHeight = 450;
					this.isShowAll = true;
				}else{
					this.boxHeight = 475;
					this.bHeight = 260;
					this.isShowAll = false;
				}
			},
			submitlogistics() {
				
				let action = 'set_refund_order_express';
				let controller = 'order';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					ordernumber: this.ordernumber,
					memberid: memberid,
					express_num: this.express_num,
					express_name: this.isShowAll ? this.company_name : this.express_name
				})
				this.$utils.postNew(action, data, controller).then(res => {
				    if(res.sta == 1){
				        this.$refs['popuplogistics'].close();
						this.isShowAll = false;
						this.isShow = false;
						uni.navigateBack({
							delta:1
						})
						this.express_name = ''
						this.company_name = ''
						this.express_num = ''
				    }
				})
				
			},
			change(e) {
			
			},
		}
	}
</script>

<style>
	page{
		background-color: #F9F9F9;
		box-sizing: border-box;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}
	
	.personal-header{
		 height: 160px;
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
	    margin-top: 20rpx;
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
	.recharge-status-label{
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 40rpx;
		text-align: center;
		margin-top: 10rpx;
	}
	.refund-info-content{
		margin-top: 40rpx;
		margin-left: 46rpx;
	}
	.refund-info-text{
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 40rpx;
	}
	.margin-text{
		margin-top: 14rpx;
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
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
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
		font-size: 22rpx;
		color: #AAAAAA;
		line-height: 33rpx;
		width: 408rpx;
		/* margin-left: 8rpx; */
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
		border-radius: 4rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
		border-radius: 4rpx;
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
		margin-left: 20rpx;
		font-size: 20rpx;
		color: #666666;
		padding: 0rpx 10rpx;
	}
	.reception-order-time{
		font-size: 24rpx;
		color: #333333;
	}
	
	.reception-empty{
		height: 100rpx;
	}
	
	.flex-between-padding{
		padding: 5rpx 0rpx;
		display: flex;
		align-items: center;
	}
	.order-line{
		padding: 26rpx 0rpx;
		border-top: 1px solid #EEEEEE;
		border-bottom: 1px solid #EEEEEE;
	}
	.reception-order-title{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
	}
	.reception-order-money{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
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
	
	
	.refund-info-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25rpx 44rpx 22rpx 46rpx;
	}
	.refund-text{
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.refund-money{
		font-size: 28rpx;
		color: #EC1815;
		line-height: 40rpx;
	}
	.line-gray{
		width: 700rpx;
		height: 1px;
		background: #EEEEEE;
		margin: 0 25rpx;
	}
	
	.recharge-address-text{
		padding: 18rpx 23rpx 0rpx 36rpx;
		font-size: 26rpx;
		color: #666666;
		line-height: 52rpx;
	}
	.line-bottom{
		height: 20rpx;
		background: #EEEEEE;
	}
	
	.popup-order{
		display: flex;
		align-items: center;
		width: 644rpx;
		height: 475rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		flex-direction: column;
	}
	.popup-order-text{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90rpx;
		background: #EC1815;
		border-radius: 10rpx 10rpx 0px 0px;
		font-size: 32rpx;
		color: #FFFFFF;
		width: 100%;
	}
	.popup-order-content{
		display: flex;
		align-items: center;
		margin-top: 50rpx;
	}
	.popup-order-content-two{
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}
	.popup-order-title{
		width: 150rpx;
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	.popup-order-input{
		width: 348rpx;
		height: 60rpx;
		border-radius: 3rpx;
		border: 1px solid #AAAAAA;
	}
	.popup-order-input input{
		padding-left: 21rpx;
		font-size: 26rpx;
		height: 37rpx;
		width: 348rpx;
		color: #AAAAAA;
	}
	.popup-order-bottom{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 58rpx;
	}
	.popup-order-button{
		display: flex;
		justify-content: center;
		align-items: center;
		background: #EC1815;
		border-radius: 36rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 42rpx;
		width: 220rpx;
		height: 72rpx;;
	}
	
	.all-order-left{
		width: 174px;
		display: flex;
		align-items: center;
		position: absolute;
		top: 60rpx;
		left: 150rpx;
	}
	
	.sale-content-ar{
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			top: 15rpx;
			right: 14rpx;
		}
	
	.all-order-scroll {
	    width: 174px;
	    height: 260rpx;
	}
	.all-order-text{
		padding: 20rpx 20rpx;
		font-size: 24rpx;
		    width: 174px;
		    background: #EEEEEE;
	}
</style>
