<template>
	<view >
		<view class="ctho-a">
			<view class="cth-b">
				<view class="cth-b-bg">
					<image class="cth-b-bg-1" :src="film_order_info.pic"></image>
					<view class="cth-b-bg-2">
						<view class="cth-b-bg-2-1">
							<view class="cth-b-bg-2-1-1">{{film_order_info.movieName}}</view>
							<view class="cth-b-bg-2-1-2" v-if="film_order_info.versionTypesStatus ==1">
								<view class="cth-b-bg-2-1-2-1">3D</view>
								<view class="cth-b-bg-2-1-2-2">IMAX</view>
							</view>
						</view>
						<view class="cth-b-bg-2-2">{{film_order_info.showTimeWeek}} {{film_order_info.showTimeStr}} {{film_order_info.language}} {{film_order_info.planType}}</view>
						<view class="cth-b-bg-2-3">{{film_order_info.hallName}} {{film_order_info.seatsNoStr}}</view>
						<view class="cth-b-bg-2-4">{{film_order_info.cinemaName}}</view>
						<view class="cth-b-bg-2-5">{{film_order_info.cinemaAddress}}</view>
					</view>
				</view>
			</view>
			<view class="ctho-c">
				<image class="ctho-c-img" src="https://zhijianlw.com/static/web/img/icon_close_2021_10_21.png"></image>
				<view class="ctho-c-title">不支持退票&改签</view>
			</view>
		</view>
		
		<view class="ctho-d">
			<view class="ctho-d-1">
				<view class="ctho-d-1-1">手机号码<text class="ctho-d-1-2">（手机号仅用于生成订单）</text></view>
				<view class="ctho-d-1-3">{{phone}}<button  class="ctho-d-1-4" v-if="!phone" style="margin-top: 0rpx;background: #FFFFFF;padding: 0rpx;" open-type="getPhoneNumber"
		            @getphonenumber="bindPhoneNumber">授权手机号</button>
					<!-- <view class="ctho-d-1-4" v-if="phone">授权手机号</view> -->
					</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 18rpx;">
				<view class="ctho-d-1-1">自动换座<text class="ctho-d-1-2">（当前座位锁定失败时，系统智能更换座位）</text></view>
				<view class="ctho-d-1-3"><evan-switch class="evan" size="15" v-model="checked" activeColor="#5AC024" activeColor1="#FFFFFF" activeColor2="#FFFFFF"></evan-switch></view>
			</view>
			<view class="ctho-line"></view>
			<view class="ctho-d-1" style="margin-top: 30rpx;">
				<view class="ctho-d-1-1" style="font-weight: bold;">共{{quantity}}张</view>
				<view class="ctho-d-1-1" style="font-weight: bold;">总计：¥{{FilmPrice.price_zhe}}</view>
			</view>
			<view class="ctho-d-1" style="margin-top: 14rpx;">
				<view class="ctho-d-1-1" style="font-weight: bold;">优惠券</view>
				<view v-if="coupon_number != '' && coupon_number != '-1'" class="ctho-d-1-1" @click="open"><view class="ctho-d-1-1" style="font-weight: bold;">- ¥{{FilmPrice.price_coupon}}</view><image class="ctho-arr-img" src="https://zhijianlw.com/static/web/img/icon_arrow_r_2021_10_21.png"></image></view>
				<view v-if="coupon_number == ''" class="ctho-d-1-1"><view class="ctho-d-1-1" style="font-weight: bold;">暂无优惠券</view><image class="ctho-arr-img" src="https://zhijianlw.com/static/web/img/icon_arrow_r_2021_10_21.png"></image></view>
				<view v-if="coupon_number == '-1'" class="ctho-d-1-1" @click="open"><view class="ctho-d-1-1" style="font-weight: bold;">不使用优惠券</view><image class="ctho-arr-img" src="https://zhijianlw.com/static/web/img/icon_arrow_r_2021_10_21.png"></image></view>
			</view>
			
			<view class="ctho-d-1" style="margin-top: 16rpx;">
				<view class="ctho-d-1-1" style="font-weight: bold;">余额</view>
				<view class="ctho-d-1-1" style="font-weight: bold;" @click="switch2Change">可用¥{{FilmPrice.balance}}<image class="ctho-rad-img" :src="[is_balance ? '../../static/icon_reason_d.png' : '../../static/icon_reason_m.png']"></image></view>
			</view>
		</view>
		
		<view class="ctho-e">
			<view class="ctho-e-1">购票须知</view>
			<view class="ctho-line"></view>
			<view class="ctho-e-2" style="margin-top: 20rpx;">1.由于影院系统不稳定等因素，存在出票失败的情况，会进行退票退款；</view>
			<view class="ctho-e-2">2.付款成功后5-40分钟为您出票，此电影票为特价电影票，请确认时间和场次无误，付款成功后将无法退票和改签。下单即代表您已阅读该项须知；</view>
			
		</view>
		
		<view style="height: 240rpx;width: 100%;"></view>
		
		<view class="ctho-bottom" @click="clickPay">
			<view class="ctho-bottom-price">¥<text style="font-size: 48rpx;">{{FilmPrice.show_price}}</text></view>
			<view class="ctho-bottom-title">立即付款</view>
		</view>
		
		<uni-popup ref="popup" :animation="false" :maskClick="true" type="bottom" background-color="#fff">
			<view class="new-youhuijuan">
				<text class="new-you-title">可用优惠券</text>
				<scroll-view scroll-y="true" class="new-scroll-y">
					<view class="juan-wrap" v-for="(item, index) in cartCouponList" :key="item.id" v-if="cartCouponList.length > 0" @click="check" :data-id="item.id" :data-index="index" :data-couponnumber="item.coupon_number">
						<view class="juan-list">
							<view class="juan-list-left">
								<text class='z-circle z-circle-top'></text>
								<text class='z-circle z-circle-bottom'></text>
								<view class="z-box">
									<view class="juan-list-left-top">
										<text class="z-price-logo">￥</text>
										<text class="z-price">{{item.money}}</text>
										<view class="z-man uni-ellipsis" style="width: 160rpx;font-size: 20rpx;">满{{item.full_money}}元可用</view>
									</view>
									<view class="juan-list-left-center" style="margin-top: 16rpx;">
										<view class="z-moth uni-ellipsis" style="font-size: 28rpx;">{{item.coupon_name}}</view>
										<view class="z-quan" style="margin-top: 20rpx;font-size: 20rpx;">{{"("+item.type_info+")"}}</view>
									</view>
								</view>
								<view class="juan-list-left-bottom">有效期：{{item.begin_time}}~{{item.end_time}}</view>
							</view>
							<view class="juan-list-right">
								<text v-show="!item.gou" class="iconfont icon-gouxuan checks"></text>
								<text v-show="item.gou" class="iconfont icon-gouxuancopy checked"></text>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="wucou" style="text-align: center;" v-if="cartCouponList.length == 0">
					<!-- <text class="wucou">暂无优惠券</text> -->
					<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" mode="widthFix" style="width: 50%"></image>
				</view>
				<button class="sure-btn" type="warn" @click="coupon">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import MD5 from "../../common/md5.js";
	import sr from 'sr-sdk-wxapp';
	export default {
		data() {
			return {
				checked: false,
				showId: '',
				seatIds: '',
				quantity: '',
				originPrice: '',
				salePrice: '',
				coupon_number: '',
				FilmPrice: '',
				film_order_info: '',
				cartCouponList: [],
				phone: '',
				is_balance: true
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
			this.showId = options.showId;
			this.seatIds = options.seatIds;
			
			var data = JSON.stringify({
				showId: that.showId,
				seatIds: that.seatIds
			}); 
			var action = 'get_film_movie_order_check';
			let controller = 'films';
			this.$utils.postNew(action, data, controller).then(res => {
				if(res.sta == 1){
					if(res.rs.errCode == 0){
						that.quantity = res.rs.data.quantity;
						that.originPrice = res.rs.data.originPrice;
						that.salePrice = res.rs.data.salePrice;
						
						that.getFilmPrice(1);
					}else{
						uni.showToast({
							title: res.rs.errMessage,
							icon: 'none',
							duration: 2000
						})
					}
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
			});
		},
		methods: {
			getFilmPrice(number){
				let memberid = uni.getStorageSync('id');
				let that = this;
				var data = JSON.stringify({
					memberid: memberid,
					quantity: that.quantity,
					originPrice: that.originPrice,
					salePrice: that.salePrice,
					coupon_number: that.coupon_number,
					showId: that.showId,
					seatIds: that.seatIds,
					is_balance: that.is_balance ? '1' : '0'
				}); 
				var action = 'get_film_price';
				let controller = 'coupon';
				this.$utils.postNew(action, data, controller).then(res => {
					that.FilmPrice = res.rs;
					that.phone = res.rs.phone || '';
					that.is_balance = res.rs.is_balance == '1' ? true : false; 
					that.film_order_info = res.rs.film_order_info;
					// that.cartCouponList = res.rs.coupon_list;
					if(number == 1){
						that.cartCouponList = res.rs.coupon_list;
						that.cartCouponList.forEach(item => {
							that.$set(item, 'gou', "0")
						})
						for (var i = 0; i < that.cartCouponList.length; i++) {
							if (res.rs.coupon_number == that.cartCouponList[i].coupon_number) {
								that.cartCouponList[i].gou = 1
								that.coupon_number = that.cartCouponList[i].coupon_number
							} else {
								that.cartCouponList[i].gou = 0
							}
						}
					}
				});
			},
			// 余额选中
			switch2Change() {
				this.is_balance = !this.is_balance
				//计算总价
				this.getFilmPrice(1)
			},
			// 选择优惠券
			coupon: function(e) {
				this.coupon_number = this.coupon_number
				this.$refs.popup.close()
				
				//计算总计金额
				this.getFilmPrice()
				
			},
			//领取优惠券
			check(e) {
				let index = e.currentTarget.dataset.index;
				let couponnumber = e.currentTarget.dataset.couponnumber;
				
				if ((couponnumber == this.coupon_number)) {
					if(this.cartCouponList[index].gou == 1){
						this.cartCouponList[index].gou = 0
						this.coupon_number = '-1'
					}else if(this.cartCouponList[index].gou == 0){
						this.cartCouponList[index].gou = 1
						this.coupon_number = this.cartCouponList[index].coupon_number
					}
				} else {
					for (var i = 0; i < this.cartCouponList.length; i++) {
						this.cartCouponList[i].gou = 0
						if(couponnumber == this.cartCouponList[i].coupon_number){
							this.cartCouponList[index].gou = 1
							this.coupon_number = this.cartCouponList[index].coupon_number
						}
					}
				}
			},
			// 授权手机号
			    bindPhoneNumber(e) {
					let that = this;
			        // 用户同意授权
			        const OK = 'getPhoneNumber:ok'
			        if (e.detail.errMsg == OK) {
			           
			            var openid = uni.getStorageSync('openid');
			            // 判断是否获取
			            if(openid){
							var data = JSON.stringify({
								encrypted_data: e.detail.encryptedData,
								wx_openid: openid,
								iv: e.detail.iv
							})
							var action = 'get_member_phone_number';
							var controller = 'member';
							this.$utils.postNew(action,data,controller).then(res=>{
								that.phone = res.rs.phoneNumber;
							})
			            } 
			        } 
			    },
				open() {
					this.$refs.popup.open()
				},
				
			clickPay(){
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
				
				let memberid = uni.getStorageSync('id');
				let that = this;
				var data = JSON.stringify({
					memberid: memberid,
					cinemaId: that.film_order_info.cinemaId,
					movieId: that.film_order_info.movieId,
					showId: that.showId,
					seatIds: that.seatIds,
					coupon_number: that.coupon_number,
					use_balance: that.is_balance ? '1' : '0',
					allowChanged : that.checked ? "1" : "0"
				}); 
				var action = 'set_movie_order_submit';
				let controller = 'films';
				this.$utils.postNew(action, data, controller).then(res => {
					console.log('---->:',res.rs)
					if(res.sta == 1){
						
						// if(res.rs.errCode == 0){
						// 	uni.navigateTo({
						// 		url: '/pagesub/CinemaTicket/CinemaTicketHomeSuccess'
						// 	})
						// }else{
						// 	uni.showToast({
						// 		title: res.rs.errMessage,
						// 		icon: 'none',
						// 		duration: 2000
						// 	})
						// }
						let  channelOrderNo=res.rs.channelOrderNo
						if (res.rs.pay_status == 1) {
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
							        "order_amt": parseFloat(that.FilmPrice.price_zhe),
							        "pay_amt": parseFloat(that.FilmPrice.price_zhe)
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
											url: `/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=${that.quantity}&movieName=${that.film_order_info.movieName}&channelOrderNo=${channelOrderNo}&isnumber=2`
										})
									},200)
								}
							});
						} else if (res.rs.pay_status == 0) {
							// 获取流水单号
							let action = 'get_film_order_pay_info';
							let data = JSON.stringify({
								ordernumber: res.rs.channelOrderNo
							});
							this.$utils.post(action, data).then(res => {
								console.log("获取流水号", res);
								let serial_number = res.rs.serial_number;
								let openid = uni.getStorageSync('openid');
								// 获取ip
								uni.request({
									url: 'https://zhijianlw.com/api.php/index/getip',
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
													        "order_amt": parseFloat(that.FilmPrice.price_zhe),
													        "pay_amt": parseFloat(that.FilmPrice.price_zhe)
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
																	url: `/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=${that.quantity}&movieName=${that.film_order_info.movieName}&channelOrderNo=${channelOrderNo}&isnumber=2`
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
													        "order_amt": parseFloat(that.FilmPrice.price_zhe),
													        "pay_amt": parseFloat(that.FilmPrice.price_zhe)
													    }],
													})

													uni.hideLoading();
													uni.showToast({
														title: '支付失败',
														icon: 'none'
													})
													that.commodity = ''
													// uni.redirectTo({
													// 	url: '/pagesub/CinemaTicket/CinemaTicketOrderList'
													// })

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
																	url: `/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=${that.quantity}&movieName=${that.film_order_info.movieName}&channelOrderNo=${channelOrderNo}&isnumber=1`
																})
															},200)
														}
													});
												},
											})
										})
									}
								});
							})
						} else {
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
							        "order_amt": parseFloat(that.FilmPrice.price_zhe),
							        "pay_amt": parseFloat(that.FilmPrice.price_zhe)
							    }],
							})

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
									
								}
							});
							
							uni.showToast({
								icon: "none",
								title: res.msg ? res.msg : "支付错误"
							})
						}
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		}
	}
</script>

<style>
	@import url('../../static/font/iconfont.css');
	@import '@/common/must.css';
page{
	background-color: #F6F6F6;
}
.ctho-a{
	margin: 18rpx 25rpx;
	width: 700rpx;
	height: 426rpx;
	background-image: url(https://zhijianlw.com/static/web/img/icon_film_bg_2021_10_21.png);
	background-size: 700rpx 426rpx;
	position: relative;
}

.cth-b{
			padding: 30rpx 20rpx;
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
			width: 190rpx;
			height: 266rpx;
			border-radius: 6rpx;
		}
		.cth-b-bg-2{
			margin-left: 24rpx;
			width: 440rpx;
			position: relative;
		}
		.cth-b-bg-2-1{
			display: flex;
			align-items: center;
		}
		.cth-b-bg-2-1-1{
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
		}
		.cth-b-bg-2-1-2{
			display: flex;
			margin-left: 10rpx;
			width: 92rpx;
			    height: 32rpx;
			border-radius: 4rpx;
			border: 1px solid #AAAAAA;
			background: #aaa;
		}
		.cth-b-bg-2-1-2-1{
			display: flex;
		    align-items: center;
		    justify-content: center;
			width: 36rpx;
			/* height: 32rpx; */
			background: #AAAAAA;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 17rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.cth-b-bg-2-1-2-2{
		    display: flex;
		    align-items: center;
		    justify-content: center;
			width: 56rpx;
			/* height: 32rpx; */
			background: #FFFFFF;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 17rpx;
			font-weight: bold;
			color: #AAAAAA;
		}
		.cth-b-bg-2-2{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 28rpx;
		}
		
		.cth-b-bg-2-3{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 22rpx;
			/* overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap; */
		}
		.cth-b-bg-2-4{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 22rpx;
		}
		.cth-b-bg-2-5{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 22rpx;
		}
		
		.ctho-c{
			position: absolute;
			bottom: 26rpx;
			left: 20rpx;
			display: flex;
			align-items: center;
		}
		
		.ctho-c-img{
			width: 22rpx;
			height: 22rpx;
		}
		
		.ctho-c-title{
			margin-left: 4rpx;
			font-size: 24rpx;
			color: #666666;
		}
		
		.ctho-d{
			margin: 20rpx 25rpx;
			width: 700rpx;
			height: 410rpx;
			background: #FFFFFF;
			border-radius: 6rpx;
			padding: 30rpx 20rpx;
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
			font-size: 24rpx;
			font-weight: bold;
			color: #333333;
		}
		.ctho-d-1-2{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #999999;
			font-weight: normal;
		}
		.ctho-d-1-3{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #333333;
		}
		.ctho-d-1-4{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 124rpx;
			height: 32rpx;
			border-radius: 20rpx;
			border: 2rpx solid #427DE5;
			font-size: 20rpx;
			color: #427DE5;
			margin-left: 10rpx;
		}
		
		.ctho-line{
			width: 660rpx;
			height: 2rpx;
			background: #EEEEEE;
			margin-top: 18rpx;
		}
		.ctho-arr-img{
			width: 30rpx;
			height: 30rpx;
			margin-left: 18rpx;
		}
		.ctho-rad-img{
			width: 26rpx;
			height: 26rpx;
			margin-left: 18rpx;
		}
		
		.ctho-e{
			margin: 20rpx 25rpx;
			width: 700rpx;
			height: 296rpx;
			background: #FFFFFF;
			border-radius: 6rpx;
			padding: 25rpx 20rpx;
		}
		.ctho-e-1{
			display: flex;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			height: 40rpx;
		}
		.ctho-e-2{
			font-size: 24rpx;
			color: #999999;
		    line-height: 33rpx;
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


.new-youhuijuan{
		display: flex;
		flex-direction: column;
		height: 640rpx;
		/* padding-bottom: 20rpx; */
		background: #FAFAFA;
		border-radius: 10rpx 10rpx 0px 0px;
		position: relative;
	}
.new-you-title {
	    color: #333333;
	    font-size: 15px;
	    font-weight: bold;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    margin-top: 30rpx;
		margin-bottom: 40rpx;
	}
	.new-scroll-y{
		height: 400rpx;
	}
	.jiage{
		font-size: 15px;
		font-family: "苹方 中等";
		color: #333333;
	}
	.sure-btn{
		    width: 660rpx;
		    border-radius: 50px;
		    height: 80rpx;
		    position: absolute;
		    bottom: 20rpx;
		    margin: 0rpx 45rpx;
		/* position: absolute; */
		/* bottom: 20rpx; */
		/* left: 130rpx; */
	}
	
	.juan-wrap{
		padding: 0rpx 26rpx;
		box-sizing: border-box;
	}
	.juan-list{
		box-shadow: 0px 0px 4px 0px rgba(231, 231, 231, 0.5);
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		border-radius: 20rpx;
		background-color: #fff;
	}
	.juan-list-left{
		text-align: left;
		border-right: 1rpx dotted #FFCAC3;
		position: relative;
		flex:1;
		padding: 20rpx 20rpx 20rpx 32rpx;
	}
	.juan-list-left .z-circle{
		position: absolute;
		display: inline-block;
		border-radius: 50%;
		width: 40rpx;
		background-color: #FAFAFA;
		height: 40rpx;
	}
	.z-box{
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
	}
	.juan-list-left .z-circle-top{
		top: -20rpx;
		right: -20rpx;
	}
	.juan-list-left .z-circle-bottom{
		bottom: -20rpx;
		right: -20rpx;
	}
	.juan-list-left .juan-list-left-top{
		padding-right: 40rpx;
	}
	.juan-list-left .juan-list-left-top .z-price-logo{
		color: #FB503D;
		font-size: 28rpx;
		vertical-align: bottom;
		display: inline-block;
		margin-bottom: 6rpx;
	}
	.juan-list-left .juan-list-left-top .z-price{
		color: #FB503D;
		font-size: 50rpx;
		vertical-align: bottom;
		display: inline-block;
		font-weight: bold;
	}
	.juan-list-left .juan-list-left-top .z-man,.juan-list-left .juan-list-left-center .z-quan{
		color: #666;
		font-size: 28rpx;
		margin-top: 14rpx;
	}
	.juan-list-left .juan-list-left-center .z-moth{
		color: #333;
		font-size: 36rpx;
		font-weight: bold;
		width: 270rpx;
	}
	.juan-list-left .juan-list-left-center{
		color: #666;
		font-size: 28rpx;
		vertical-align: bottom;
		text-align: left;
		flex: 1;
	}
	.juan-list-left .juan-list-left-bottom{
		font-size: 24rpx;
		color: #999;
		text-align: left;
	}
	.juan-list-right{
		text-align: center;
		height: 100%;
		width: 212rpx;
		box-sizing: border-box;
		padding-right: 0rpx;
	}
	.juan-list-right .checks, .juan-list-right .checked{
		position: static;
		margin: 0;
	}
</style>
