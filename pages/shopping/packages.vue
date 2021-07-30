<template>
	<view class="must">
		<!-- 订单详情 -->
		<view class="must-list">
			<view class="must-list-xq" v-for="item in list" :key="item.id">
							<view class="must-list-bg">
								<image class="must-list-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
							</view>
							<view class="must-guige">
								<text class="must-guige-title">{{$utils.cut_str(item.goodsname,15)}}</text>
								<text class="must-guige-price">{{item.price}}</text>
								<text class="must-guige-box">规格：{{item.shopping_cart_goods_item}}</text>
								<view class="must-guige-add">
									<view class="must-add-input">
										x{{item.num}}
									</view>
			
								</view>
				</view>
			</view>
			
			
			<view class="fenshus fens">
				共{{fenshu}}份
			</view>
			
				<!-- 订单价格信息 -->
				<view class="message">
					<view class="">
						<text class="message-title zongjia">商品总价：</text>
						<text class="message-price">￥{{sum}}</text>
					</view>
					<view class="">
						<text class="message-title  fare1">运费：</text>
						<text class="message-price fare1">￥0.00</text>
					</view>
					<view class="">
						<text class="message-title  coupon1">优惠券：</text>
						<view class="message-price coupon" v-if="coupon_name">无</view>
						<text class="message-price coupon" v-else>{{money1}}</text>
					</view> 
					
					<view class="">
						<text class="message-title  money1">余额：</text>
						<text class="message-price money">¥{{balance}}</text>
							<text class="circle cir iconfont icon-ico2" @click="switch2Change" v-show="use_balance==0"></text>
							<text class="circle cir iconfont icon-ico1" @click="switch2Change"  v-show="use_balance==1"></text>
					</view>
				</view>
			
				<text  @click="open" class="iconfont icon-youjiantou message-jiantou1"></text>
				<uni-popup ref="popup" backgroundColor="#FAFAFA" type="bottom">
					<view class="youhuijuan">
						<text class="you-title">可用优惠券</text>
						 <view v-for="item in couponList" :key="item.id">
							 <view class="you-left" v-if="item.status==0">
							 	<text class="l-price">{{item.coupon_type_info.money}}</text>
							 	<text class="l-man">满{{item.coupon_type_info.full_money}}元可用</text>
							 	<text class="l-date">有效期：{{$utils.date_time(item.coupon_type_info.begin_time)}}~{{$utils.date_time(item.coupon_type_info.end_time)}}</text>
							 	<text class="l-moth">{{item.coupon_type_info.coupon_name}}</text>
							 	<text class="l-quan">全场通用劵</text>
							 							
							 	<view class="you-right"  @click="check" :data-id="item.id">
							 		<text v-show="!item.gou" class="iconfont icon-gouxuan checks"></text> 
							 		<text v-show="item.gou"  class="iconfont icon-gouxuancopy checked"></text> 
							 	</view> 
							 </view>
						</view>
						<view class="">
							<text class="wucou">暂无优惠券</text>
						</view>
					<button class="sure" type="warn" @click="coupon1">确定</button> 
					</view>
				</uni-popup>
			<!-- 合计 -->
			<view class="sum zong">
				<text class="heji">合计：</text>	
				<text class="heji sum-price">￥{{price_zhe}}</text>
			</view>
		</view>
		<!-- 底部合计 -->
		<view class="must-bottom bot">
			<text class="must-bottom-price">￥{{price_zhe}}</text>
			<button class="button" type="warn" @click="forsubmit" v-if="com==false">立即付款</button>
		</view>
	</view>
</template>

<script>
	import MD5 from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	import config from '../../common/config.js';
	export default{
		data(){
			return{
				sum:0,
				count:0,
				money:0,
				money1:0,
				com:'',
				coupon_id: '',
				coupon_number: '',
				coupon_name: '',
				coupon_money: '',
				showa: '',
				use_balance: 0,//余额的选中
				balance:'',
				showa: 1,
				openid:'',
				sta:1,
				delivery_mode: '快递',
				delivery_mode_arr: ["快递", "同城", "自提"],
				coupon_numbers:0,
				coupon_number1:0,
				fenshu:1,
				wanfa:'',
				price_zhe:'',
				list:[
					 
					],
					gou:true,
					couponList:[]
			}
		},
		onLoad:function(e) {

			//获取份数
			this.fenshu=e.fenshu
			//获取玩法
			this.wanfa=e.wanfa
			
			// 余额s
			this.balance = uni.getStorageSync('balance');
			this.use_balance = 0;
			this.use_zj_balance = 1;
			this.openid = uni.getStorageSync('openid');
			this.id = uni.getStorageSync('id');
			
			//流水单号
			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
				'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
			];
			
			var nums = "";
			
			for (var i = 0; i < 32; i++) {
				
				var id = parseInt(Math.random() * 61);
			
				nums += chars[id];
			
			}
			
			this.nums = nums;
			
			//商品展示
			let type=e.type
			this.type=type
				let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
				
				var action = 'get_buy_shopping_cart';				  	  
				 this.$utils.post(action,data).then(res=>{
					 console.log('商品信息',res)
					 let icon="success"
					 if (res.sta !=1) {
					 	icon = "none";
					 	uni.showToast({
					 		icon: icon,
					 		title: res.msg,
					 		duration: 2000
					 	});
					 	return
					 }
					 this.list = res.rs.goodslist
					 this.sum=res.rs.price_zhe
					 uni.setStorageSync('price_zhe', res.rs.price_zhe);
					 uni.setStorageSync('type', type);
				 })
			
			var action='get_coupon_number_list';
			this.$utils.post(action,data).then(res=>{
				console.log('优惠券',res)
				let icon="success"
				if (res.sta !=1) {
					icon = "none";
					uni.showToast({
						icon: icon,
						title: res.msg,
						duration: 2000
					});
					return
				}
				this.couponList=res.rs
				this.count=res.count
			})
			// 是否有优惠券
			if (e.coupon_number) {
				this.coupon_number = e.coupon_number;
				this.coupon_name = '-¥' + e.coupon_name;
			}
		},
		onShow: function(e) {
			this.coupon_id = uni.getStorageSync('coupon_id');
			this.coupon_keynum = uni.getStorageSync('coupon_keynum');
			this.coupon_money = uni.getStorageSync('coupon_money');
			this.coupon_number = uni.getStorageSync('coupon_number');
			
			//计算总价
			this.caltotalmoney()
		},
		methods:{
			open(){
				 this.$refs.popup.open('bottom')
			},
			// 余额选中
			 switch2Change(){
				console.log("余额选中")
			 	this.use_balance=!this.use_balance
				console.log("余额", this.use_balance);
			 },
			// 选择优惠券
			coupon1: function(e) {
				this.money1=this.money
				this.coupon_number1=this.coupon_number
				this.$refs.popup.close()
				 //计算结算金额
				this.caltotalmoney()
			},
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				let memberid = uni.getStorageSync('id')
				let buy_type=this.type
				//如果show=1是拼手气红包，如果show=2是直接送礼
				if(this.show==1 ||  this.show==0){
					fenshu=1;
				}
				//玩法等于1是直接送礼,直接送礼有多份概念，其他没有
				if(this.wanfa!='1'){
					fenshu=1
				}
				let money1=this.money1
				let action = "get_fenshu_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:buy_type
				});
				this.$utils.post(action, data).then(res => {
					console.log(res)
					let icon = "success"
					if (res.sta != 1) {
						icon = "none";
						uni.showToast({
							icon: icon,
							title: res.msg,
							duration: 2000
						});
					return 
					}
					//赋值总价 ,只有订单确认页面才会减去money1是优惠券的金额
					this.price_zhe=res.rs.price_zhe-money1

					
			
				})					
				
			},
			//立即付款
			forsubmit: function(e){
				console.log("立即付款")
				let type=uni.getStorageSync("type")
				this.type=type
				var that = this;
					if (this.sta == 0) {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
					}
					// 优惠券
					let coupon_number = this.coupon_number1;
					let data = JSON.stringify({
						memberid: this.memberid,
						wanfa: this.wanfa,
						coupon_number: this.coupon_number,
						use_balance: this.use_balance,
						use_zj_balance: this.use_zj_balance,
						fenshu:this.fenshu,
						buy_type:type
						
					});
					console.log(data)
					var action = 'create_cardbag';
					this.$utils.post(action, data).then(res => {
						console.log("付款");
						console.log(res);
						if (res.pay_status == 1) {
							uni.showToast({
								title: "支付成功"
							})
							this.cardbag_number=res.cardbag_number
							let cardbag_number=res.cardbag_number
							uni.redirectTo({
								url:'../shopping/succes?cardbag_number='+this.cardbag_number
							})
							uni.setStorageSync('coupon', '');
							uni.setStorageSync('coupon_keynum', '');
							uni.setStorageSync('coupon_number',  '');
							uni.setStorageSync('coupon_money', '');
						}else if (res.pay_status == 0) {
							// 获取流水单号
							let action = 'get_cardbag_pay_info';
							let data = JSON.stringify({
								cardbag_number: res.cardbag_number 
							});
							let cardbag_number=res.cardbag_number
							uni.setStorageSync("cardbag_number",res.cardbag_number)
							this.$utils.post(action, data).then(res => {
								console.log("获取流水号", res);
								let serial_number = res.rs.serial_number;
								// 获取ip
								uni.request({
									url: 'https://zhijianlw.com/api.php/index/getip',
									success: (res) => {
										console.log(res.data);
										let action = 'add_paylog_to_wx';
										let data = JSON.stringify({
											serial_number: serial_number,
											ip: res.data.ip,
											openid: this.openid,
											type: 'cardbag',
										});
										this.$utils.post(action, data).then(res => {
											console.log('获取参数', res)
											var serial_number = res.rs.serial_number;
											let arr = [];
											
											const date = {
												// 合作方标识
												appId: 'appId=wx9c53a99b078435f5',
												timeStamp: 'timeStamp=' + this.timeStamp,
												nonceStr: 'nonceStr=' + this.nums,
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
											let stringSignTemp = stringA + '&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv';
											
											console.log('拼接后', stringSignTemp)
											let sign = MD5.hexMD5(stringSignTemp);
											console.log(sign)
											
											
											uni.hideLoading();
											
											uni.requestPayment({
												timeStamp: String(this.timeStamp),
												nonceStr: this.nums,
												package: 'prepay_id=' + res.rs.prepay_id,
												signType: 'MD5',
												paySign: sign.toUpperCase(),
												success(res) {
												uni.showToast({
													title: '支付成功',
													icon: 'none'
												})	
												uni.redirectTo({
													url:'../shopping/succes?cardbag_number='+cardbag_number 
												})	
												return 	
													
													
													
													
													
													uni.hideLoading();
													uni.request({
														url: 'https://zhijianlw.com/api.php/index/set_agent_cardbag',
														data: {
															serial_number: that.outTradeNo
														},
														header: {
															'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
														},
														method: 'GET',
														// 成功回调
														success: (res) => {
															console.log('微信成功回调', res)
															uni.showToast({
																title: '支付成功',
																icon: 'none'
															})
															uni.setStorageSync('coupon', '');
															uni.setStorageSync('coupon_keynum', '');
															uni.setStorageSync('coupon_number',  '');
															uni.setStorageSync('coupon_money', '');
															uni.redirectTo({
																url:'../shopping/succes?cardbag_number='+this.cardbag_number
															})
														},
													})
												},
												fail:(res) =>{
													let cardbag_number=uni.getStorageSync("cardbag_number")
													this.cardbag_number=cardbag_number
													uni.hideLoading();
													console.log(res)
													uni.showToast({
														title: '支付失败',
														icon: 'none'
													})
													uni.navigateTo({
														url:'../orderDetails/orderDetails?cardbag_number='+this.cardbag_number
													})
													that.commodity = ''
												},
											})
										})
									}
								});
							})
							}else {
							uni.showToast({
								icon: "none",	
								title: res.msg?res.msg:"支付错误"
							})
						}
					})
			},
			check: function(e) {
				this.couponList.forEach(item => {
					this.$set(item, 'gou', "")
				})
				for (var i = 0; i < this.couponList.length; i++) {
					if (e.currentTarget.dataset.id == this.couponList[i].id) {
						this.couponList[i].gou = 1
						this.money = this.couponList[i].coupon_type_info.money
						this.coupon_number = this.couponList[i].coupon_number
					} else {
						this.couponList[i].gou = 0
					}
				}
				console.log(this.couponList)
			}
		}
	}
</script>

<style>
	@import url('../../static/font/iconfont.css');
	@import '@/common/must.css';
	.bot{
		position: fixed;
		bottom: 10rpx;
	}
	.message-jiantou1 {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
        margin-left: 680rpx;
        margin-top: 191rpx;
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
.must-guige-price{
	margin-top: -29rpx;
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
}
.fens{
	padding-left: 630rpx;
}
.zong{
	position: absolute;
	margin-top: 320rpx;
}
.heji{
	font-size: 15px;
	font-family: "苹方 中等";
	color: #333333;
}
</style>
