<template>
	<view >
		<view class="ctho-a">
			<view class="cth-b">
				<view class="cth-b-bg">
					<image class="cth-b-bg-1" :src="filmOrderInfo.orderPicUrl"></image>
					<view class="cth-b-bg-2">
						<view class="cth-b-bg-2-1">
							<view class="cth-b-bg-2-1-1">{{filmOrderInfo.orderTitle}}</view>
							<view :class="(filmOrderInfo.status == 0 || filmOrderInfo.status == 1) ? 'cth-b-bg-2-1-2' : 'cth-b-bg-2-1-2-1'">{{filmOrderInfo.order_status_info}}</view>
						</view>
						<view class="cth-b-bg-2-2"><view class="cth-b-bg-2-2-2">{{filmOrderInfo.showTime}}开场</view><view v-if="filmOrderInfo.status == 0 && filmOrderInfo.wait_pay_time" class="cth-b-bg-2-2-1">剩余时间：<uni-countdown :showColon="true" :show-day="false" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FFFFFF" color="#FB503D" splitorColor="#FB503D" style="padding: 0rpx;"></uni-countdown></view></view>
						<view class="cth-b-bg-2-3">{{filmOrderInfo.hallName}}</view>
						<view class="cth-b-bg-2-4">{{filmOrderInfo.seatsNoStr}}</view>
						<view class="cth-b-bg-2-1" style="margin-top: 16rpx;">
							<view class="cth-b-bg-2-5">是否支持换座</view>
							<view class="cth-b-bg-2-5">支持</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ctho-c">
				<view class="ctho-c-title"><view class="ctho-c-title-b">影院</view><view class="ctho-c-title-a">{{filmOrderInfo.cinemaName}}</view></view>
				<view class="ctho-c-address">{{filmOrderInfo.cinemaAddress}}</view>
			</view>
		</view>
		
		<view class="ctho-d" v-if="filmOrderInfo.status == 1 || filmOrderInfo.status == 2 || filmOrderInfo.status == 3 || filmOrderInfo.status == 4 || filmOrderInfo.status == 5">
			<view class="ctho-d-1">
				<view class="ctho-d-1-1">取票码</view>
				<view class="ctho-d-1-3" v-if="filmOrderInfo.status == 3"><view class="ctho-d-1-2-1">放映结束</view></view>
				<view class="ctho-d-1-3" v-if="(filmOrderInfo.status == 1 || filmOrderInfo.status == 2 || filmOrderInfo.status == 4 || filmOrderInfo.status == 5) && filmOrderInfo.count_down_time">
					<image class="ctho-d-1-3-img" src="https://zhijianlw.com/static/web/img/icon_down_time_2021_10_21.png"></image>
					<view class="ctho-d-1-2">距离影片放映 <uni-countdown :showColon="true" :show-day="false" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" backgroundColor="#FFFFFF" color="#FB503D" splitorColor="#FB503D" style="padding: 0rpx;"></uni-countdown></view>
				</view>
			</view>
			<view class="ctho-line"></view>
			
			
			<view class="cthod-view" v-if="filmOrderInfo.status == 1">
				<image class="cthod-view-img" src="https://zhijianlw.com/static/web/img/icon_buy_up_2021_10_21.png"></image>
				<view class="cthod-view-btn">
					<view class="cthod-view-btn-1">正在出票</view>
					<view class="cthod-view-btn-2">（预计5-40分钟）</view>
				</view>
				<view class="cthod-view-text">{{filmOrderInfo.quantity}} 张电影票</view>
			</view>
			
			<view class="cthod-view" v-if="filmOrderInfo.status == 4 || filmOrderInfo.status == 5">
				<image class="cthod-view-img-fail" src="https://zhijianlw.com/static/web/img/icon_buy_failed_2021_10_21.png"></image>
				<view class="cthod-view-fail-text">{{filmOrderInfo.cancelReason}}</view>
				<view style="height: 26rpx;"></view>
			</view>
			
			<view class="cthod-view" v-if="filmOrderInfo.status == 2 || filmOrderInfo.status == 3">
				<view class="cthod-view" v-for="(item, index) in listItems" :key="index">
					<image class="cthod-view-img-su" :src="item.seat_ids_img"></image>
					<view class="cthod-view-su-text">{{item.quantityNo}}</view>
					<view class="cthod-view-su-text" v-if="item.seatNo" style="color: #666666;">{{item.seatNo}}</view>
					<view class="cthod-view-su-view">
						<view class="cthod-view-su-view-1">
							<view class="cthod-view-su-lable">取票码</view>
							<view class="cthod-view-su-number">{{item.seat_ids_number}}</view>
						</view>
						<view class="cthod-view-su-view-1" v-if="item.verification_code">
							<view class="cthod-view-su-lable">验证码</view>
							<view class="cthod-view-su-number">{{item.verification_code}}</view>
						</view>
					</view>
				</view> 
				<view class="cthod-view-bottom">任意取票机均可取票</view>
				<view style="height: 10rpx;"></view>
			</view>
			
			
		</view>
		
		
		<view class="ctho-d" v-if="filmOrderInfo.status == 1 || filmOrderInfo.status == 2 || filmOrderInfo.status == 3 || filmOrderInfo.status == 4 || filmOrderInfo.status == 5 || filmOrderInfo.status == 6">
			<view class="ctho-d-1" style="height: 40rpx;">
				<view class="ctho-d-1-1">订单信息</view>
				<view class="ctho-d-1-3"></view>
			</view>
			<view class="ctho-line"></view>
			
			
			<view class="ctho-d-1" style="margin-top: 20rpx;">
				<view class="ctho-d-detail">商品总价</view>
				<view class="ctho-d-detail">¥ {{filmOrderInfo.orderprice}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >优惠券</view>
				<view class="ctho-d-detail" >- ¥{{filmOrderInfo.coupon_price}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >余额抵扣</view>
				<view class="ctho-d-detail" >- ¥{{filmOrderInfo.paybalance}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >实付款</view>
				<view class="ctho-d-detail" >¥ {{filmOrderInfo.paymoney}}</view>
			</view>
			<view class="ctho-line" style="margin-top: 10rpx;"></view>
			
			<view class="ctho-d-detail-sn" style="margin-top: 20rpx;">订单编号：{{filmOrderInfo.channelOrderNo}}<view class="ctho-d-detail-copy" :data-ordernumber="filmOrderInfo.channelOrderNo" @click="copy">复制</view></view>
			<view class="ctho-d-detail-sn" style="margin-top: 20rpx;">下单时间：{{filmOrderInfo.add_time}}</view>
			<view class="ctho-d-detail-sn" style="margin-top: 20rpx;">支付时间：{{filmOrderInfo.pay_time}}</view>
			
		</view>
		
		<view class="cthod-online" v-if="filmOrderInfo.status == 1 || filmOrderInfo.status == 2 || filmOrderInfo.status == 3 || filmOrderInfo.status == 4 || filmOrderInfo.status == 5">
			<button class="cthod-online-btn" open-type="contact" @click="$buttonClick(trackClick)">
				<image class="cthod-online-btn-img" src="https://zhijianlw.com/static/web/img/icon_online_service_2021_10_21.png"  mode=""></image>
				<view class="cthod-online-btn-text">在线客服</view>
			</button>
		</view>
		
		
		<view class="ctho-d" v-if="filmOrderInfo.status == 0">
			<view class="ctho-d-1">
				<view class="ctho-d-1-111">手机号码<text class="ctho-d-1-222">（手机号仅用于生成订单）</text></view>
				<view class="ctho-d-1-3">{{filmOrderInfo.phone}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 18rpx;">
				<view class="ctho-d-1-111">自动换座<text class="ctho-d-1-222">（当前座位锁定失败时，系统智能更换座位）</text></view>
				<view class="ctho-d-1-3"><evan-switch class="evan" size="15" v-model="checked" activeColor="#5AC024" activeColor1="#FFFFFF" activeColor2="#FFFFFF"></evan-switch></view>
			</view>
			<view class="ctho-line"></view>
			<view class="ctho-d-1" style="margin-top: 20rpx;">
				<view class="ctho-d-detail">共{{filmOrderInfo.quantity}}张</view>
				<view class="ctho-d-detail">总价：¥ {{filmOrderInfo.orderprice}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >优惠券</view>
				<view class="ctho-d-detail" >- ¥{{filmOrderInfo.coupon_price}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >余额抵扣</view>
				<view class="ctho-d-detail" >- ¥{{filmOrderInfo.paybalance}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 0rpx;">
				<view class="ctho-d-detail" >实付款</view>
				<view class="ctho-d-detail" >¥ {{filmOrderInfo.paymoney}}</view>
			</view>
		</view>
		
		<view style="height: 30rpx;"></view>
		
		<view style="height: 130rpx;" v-if="filmOrderInfo.status == 0"></view>
		<view class="ctho-bottom" v-if="filmOrderInfo.status == 0">
			<view class="ctho-bottom-price">¥<text style="font-size: 48rpx;">{{filmOrderInfo.paymoney}}</text></view>
			<view class="ctho-bottom-title" @click="clickPay" :data-ordernumber="filmOrderInfo.channelOrderNo">立即付款</view>
		</view>
		
	</view>
</template>

<script>
	var timer = null;
	var times = 0;
	export default {
		data() {
			return {
				channelOrderNo: '',
				filmOrderInfo: '',
				countdown: '',
				listItems:[]
			}
		},
		onLoad:function(options){
			//流水单号
			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
				'e', 'f', 'g',
				'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
			];
			var nums = "";
			for (var i = 0; i < 32; i++) {
				var id = parseInt(Math.random() * 61);
				nums += chars[id];
			}
			this.nums = nums;
			
			let that = this;
			this.channelOrderNo = options.channelOrderNo;
			this.getFilmOrderInfo();
		},
		onPullDownRefresh:function(){
			this.getFilmOrderInfo();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500);
		},
		methods: {
			getFilmOrderInfo(){
				let memberid = uni.getStorageSync('id');
				let that = this;
				var data = JSON.stringify({
					memberid: memberid,
					channelOrderNo: this.channelOrderNo,
				}); 
				var action = 'get_film_order_info';
				let controller = 'filmset';
				this.$utils.postNew(action, data, controller).then(res => {
					that.filmOrderInfo = res.rs;
					that.listItems = res.rs.qrcode || [];
					if(that.filmOrderInfo.status ==1 || that.filmOrderInfo.status ==2 || that.filmOrderInfo.status == 4 || that.filmOrderInfo.status == 5){
						if(res.rs.count_down_time){
							that.getCountdown(res.rs.count_down_time);
						}
					}else if(that.filmOrderInfo.status == 0){
						if(res.rs.wait_pay_time){
							that.getCountdown(res.rs.wait_pay_time);
						}
					}
				});
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
			clickPay(e){
				let rthat = this;
				// 调用订阅消息
				// uni.requestSubscribeMessage({
				// 	tmplIds: ['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo','KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE','hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs'],
				// 	success(res) {
				// 		let action = "add_wx_subscribe_log";
				// 		let controller = 'subscribe';
				// 		let memberid = uni.getStorageSync('id')
				// 		let data = JSON.stringify({
				// 			memberid: memberid,
				// 			template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"
				// 		});
						
				// 		rthat.$utils.postNew(action,data,controller).then(res=>{
				// 			if(res.sta == 1){
								
				// 			}
				// 		})
				// 	},
				// 	fail(res) {
						
				// 	}
				// });
				
				let that = this;
				let channelOrderNo = e.currentTarget.dataset.ordernumber;
				// 获取流水单号
				let action = 'get_film_order_pay_info';
				let data = JSON.stringify({
					ordernumber: channelOrderNo
				});
				this.$utils.post(action, data).then(res => {
					console.log("获取流水号", res);
					if(res.sta == 1){
						let serial_number = res.rs.serial_number;
						let openid = uni.getStorageSync('openid');
						// 获取ip
						uni.request({
							url: 'https://zhijianlw.com/api.php/test/getip',
							success: (res) => {
								console.log(res.data);
								let action = 'add_paylog_to_wx';
								let data = JSON.stringify({
									serial_number: serial_number,
									ip: res.data.ip,
									openid: openid,
									type: 'film',
								});
								this.$utils.post(action, data).then(res => {
									console.log('获取参数', res)
									let arr = [];
									const date = {
										// 合作方标识
										appId: 'appId=wx9c53a99b078435f5',
										timeStamp: 'timeStamp=' + that.timeStamp,
										nonceStr: 'nonceStr=' + that.nums,
										package: 'package=prepay_id=' + res.rs.prepay_id,
										signType: 'signType=MD5',
									}
											
									console.log('拼接前', date)
											
									for (let i in date) {
										arr.push(date[i])
									}
											
									arr.sort();
											
									let stringA = '';
											
									// 拼接字符串
									for (let i in arr) {
										if (i == arr.length - 1) {
											stringA += arr[i];
										} else {
											stringA += arr[i] + '&';
										}
									}
									// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
									let stringSignTemp = stringA +
										'&key=45579fcdb646746f02d9e041d50975b4';
											
									console.log('拼接后', stringSignTemp)
									let sign = MD5.hexMD5(stringSignTemp);
									console.log(sign)
											
									uni.hideLoading();
											
									uni.requestPayment({
										timeStamp: String(that.timeStamp),
										nonceStr: that.nums,
										package: 'prepay_id=' + res.rs.prepay_id,
										signType: 'MD5',
										paySign: sign.toUpperCase(),
										success(res) {
											uni.hideLoading();
											// 腾讯有数
											let timestamp=new Date().getTime();
											sr.track('custom_order', {
											    "order": {
											        "order_id": channelOrderNo,
											        "order_time": timestamp,
											        "order_status": "pay"
											    },
											    "sub_orders": [{
											        "sub_order_id": channelOrderNo,
											        "order_amt": parseFloat(that.filmOrderInfo.orderprice),
											        "pay_amt": parseFloat(that.filmOrderInfo.orderprice)
											    }],
											})

											// 调用订阅消息
											uni.requestSubscribeMessage({
												tmplIds: ['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo','KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE'],
												success(res) {
													if (res['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo'] == 'accept' && res['KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE'] == 'accept') {
														let action = "add_wx_subscribe_log";
														let controller = 'subscribe';
														let memberid = uni.getStorageSync('id')
														let data = JSON.stringify({
															memberid: memberid,
															template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"
														});
														
														rthat.$utils.postNew(action,data,controller).then(res=>{
															if(res.sta == 1){
																
															}
														})
													}
												},
												fail(res) {
													
												},
												complete(res){
													setTimeout(()=>{
														uni.redirectTo({
															url: `/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=${that.filmOrderInfo.quantity}&movieName=${that.filmOrderInfo.movieName}&channelOrderNo=${channelOrderNo}&isnumber=2`
														})
													},200)
												}
											});				
											
										},
										fail(res) {
											// 腾讯有数
											let timestamp=new Date().getTime();
											sr.track('custom_order', {
											    "order": {
											        "order_id": channelOrderNo,
											        "order_time": timestamp,
											        "order_status": "cancel_pay"
											    },
											    "sub_orders": [{
											        "sub_order_id": channelOrderNo,
											        "order_amt": parseFloat(that.filmOrderInfo.paymoney),
											        "pay_amt": parseFloat(that.filmOrderInfo.paymoney)
											    }],
											})

											uni.hideLoading();
											uni.showToast({
												title: '支付失败',
												icon: 'none'
											})
											that.commodity = ''

											// 调用订阅消息
											uni.requestSubscribeMessage({
												tmplIds: ['hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs'],
												success(res) {
													if (res['hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs'] == 'accept') {
														let action = "add_wx_subscribe_log";
														let controller = 'subscribe';
														let memberid = uni.getStorageSync('id')
														let data = JSON.stringify({
															memberid: memberid,
															template_id:"hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"
														});
														
														rthat.$utils.postNew(action,data,controller).then(res=>{
															if(res.sta == 1){
																
															}
														})
													}
												},
												fail(res) {
													
												},
												complete(res){
													setTimeout(()=>{
														uni.redirectTo({
															url: `/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=${that.filmOrderInfo.quantity}&movieName=${that.filmOrderInfo.movieName}&channelOrderNo=${channelOrderNo}&isnumber=1`
														})
													},200)
												}
											});
											
											
											// uni.redirectTo({
											// 	url: '/pagesub/CinemaTicket/CinemaTicketOrderList'
											// })
											
										},
									})
								})
							}
						});
					}else{
						uni.hideLoading();
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
				// uni.navigateTo({
				// 	url: '/pagesub/CinemaTicket/CinemaTicketHomeSuccess'
				// })
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
page{
	background-color: #F6F6F6;
}
.ctho-a{
	margin: 18rpx 25rpx;
	width: 700rpx;
	height: 416rpx;
	background-image: url(https://zhijianlw.com/static/web/img/icon_film_detail_2021_10_21.png);
	background-size: 700rpx 416rpx;
	position: relative;
}

.cth-b{
			padding: 30rpx 20rpx 24rpx 16rpx;
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
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.cth-b-bg-2-1-2{
			font-size: 26rpx;
			font-weight: bold;
			color: #DF5250;
		}
		.cth-b-bg-2-1-2-1{
			font-size: 26rpx;
			font-weight: bold;
			color: #999999;
		}
		.cth-b-bg-2-2{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 16rpx;
		}
		
		.cth-b-bg-2-2-2{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			/* font-weight: bold; */
		}
		
		.cth-b-bg-2-2-1{
			font-size: 24rpx;
			color: #DB3C3A;
			    display: flex;
			    align-items: center;
		}
		
		.uni-countdown__splitor{
			padding: 0rpx !important;
		}
		.uni-countdown__number{
			margin: 0rpx !important;
		}
		
		.cth-b-bg-2-3{
			/* display: flex; */
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			/* font-weight: bold; */
			margin-top: 16rpx;
			width: 330rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.cth-b-bg-2-4{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			/* font-weight: bold; */
			margin-top: 16rpx;
			width: 330rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.cth-b-bg-2-5{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			margin-top: 16rpx;
		}
		
		.ctho-c{
			position: absolute;
			bottom: 28rpx;
			left: 16rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		
		
		.ctho-c-title{
			display: flex;
			align-items: center;
			width: 100%;
		}
		
		.ctho-c-title-a{
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			/* margin-left: 34rpx; */
		}
		
		.ctho-c-title-b{
			font-size: 28rpx;
			color: #666666;
			width: 100rpx;
		}
		
		.ctho-c-address{
			font-size: 26rpx;
			color: #666666;
			margin-top: 18rpx;
			margin-left: 100rpx;
		}
		
		.ctho-d{
			margin: 32rpx 25rpx;
			width: 700rpx;
			/* height: 410rpx; */
			background: #FFFFFF;
			border-radius: 6rpx;
			padding: 22rpx 20rpx 24rpx 20rpx;
		}
		.ctho-d-1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50rpx;
		}
		.ctho-d-1-1{
			display: flex;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		
		.ctho-d-1-3{
			display: flex;
			align-items: center;
		}
		.ctho-d-1-3-img{
			width: 30rpx;
			height: 30rpx;
		}
		
		.ctho-d-1-2{
			font-size: 27rpx;
			font-weight: bold;
			color: #DF5250;
			margin-left: 10rpx;
			display: flex;
			align-items: center;
		}
		
		.ctho-d-1-2-1{
			font-size: 28rpx;
			font-weight: bold;
			color: #999999;
		}
		
		.cthod-view{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.cthod-view-img{
			width: 160rpx;
			height: 143rpx;
			margin-top: 78rpx;
		}
		.cthod-view-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 646rpx;
			height: 106rpx;
			background: #FAFAFA;
			border-radius: 10rpx;
			border: 2rpx solid #EEEEEE;
			margin-top: 72rpx;
		}
		.cthod-view-btn-1{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		.cthod-view-btn-2{
			font-size: 32rpx;
			font-weight: bold;
			color: #999999;
		}
		.cthod-view-text{
			font-size: 28rpx;
			color: #999999;
			margin-top: 40rpx;
		}
		.ctho-d-detail{
			font-size: 24rpx;
			color: #666666;
		}
		
		.ctho-d-detail-sn{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
		}
		.ctho-d-detail-copy{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 30rpx;
			background: #E6E6E6;
			border-radius: 3rpx;
			font-size: 20rpx;
			color: #666666;
			margin-left: 14rpx;
		}
		
		.ctho-line{
			width: 660rpx;
			height: 2rpx;
			background: #EEEEEE;
			margin-top: 18rpx;
		}
		
		.cthod-online{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 22rpx;
		}
		
		.cthod-online-btn{
			width: 220rpx;
			height: 60rpx;
			background: #F1E0E0;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0rpx;
			padding: 0;
		}
		
		.cthod-online-btn-img{
			width: 30rpx;
			height: 30rpx;
		}
		
		.cthod-online-btn-text{
			font-size: 26rpx;
			color: #DB3C3A;
			margin-left: 4rpx;
		}
		
		.cthod-view-img-fail{
			width: 124rpx;
			height: 148rpx;
			margin-top: 80rpx;
		}
		.cthod-view-fail-text{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 96rpx;
		}
		
		.cthod-view-img-su{
			width: 300rpx;
			height: 300rpx;
			margin-top: 54rpx;
		}
		.cthod-view-su-text{
			font-size: 28rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		.cthod-view-su-view{
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-top: 34rpx;
			width: 646rpx;
			background: #FAFAFA;
			border-radius: 10rpx;
			border: 2rpx solid #EEEEEE;
		}
		.cthod-view-su-view-1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 72rpx;
			width: 646rpx;
		}
		.cthod-view-su-lable{
			font-size: 28rpx;
			font-weight: bold;
			color: #999999;
			margin-left: 40rpx;
		}
		.cthod-view-su-number{
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			margin-right: 22rpx;
		}
		.cthod-view-bottom{
			font-size: 28rpx;
			color: #999999;
			margin-top: 50rpx;
		}
		
		.ctho-d-1-111{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: bold;
			color: #333333;
		}
		
		.ctho-d-1-222{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #999999;
		}
		
		
		.ctho-bottom{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 750rpx;
			height: 126rpx;
			background: #FFFFFF;
			position: fixed;
		    bottom: 0rpx;
			padding: 0rpx 26rpx 0rpx 46rpx;
		}
		.ctho-bottom-price{
			font-size: 32rpx;
			font-weight: bold;
			color: #F7481B;
		}
		.ctho-bottom-title{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 226rpx;
			height: 88rpx;
			background: linear-gradient(61deg, #E96C56 0%, #ED2430 100%);
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
</style>
