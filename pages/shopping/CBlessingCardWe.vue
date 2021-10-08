<template>
	<view class="gift">
		<view class="gift-small">
			<image class="icon-card-select-0" :src="background"></image>
			<image class="icon-card-select-1" :src="IMG_DATA" ></image>
			<view class="icon-card-select-2">{{text}}</view>
			<!-- <image  class="icon-card-select-3" src="https://zhijianlw.com/static/web/img/icon-card-edit-title-09-27.png"></image> -->
			<view class="icon-card-select-3">
				<view class="section" >
				   <textarea class="text" disabled="true" maxlength="60" :value="content"/>
				 </view>
			</view>
			<view class="icon-card-select-4">{{title}}</view>
		</view>
		<button class="gift-btn" v-if="isShowCheck == 0" type="warn" @click="getgift">立即收礼</button>
		<button class="gift-btn" v-else-if="isShowCheck == 2" type="warn" @click="toConversionDetails">查看领取详情</button>		
		
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default{
		data(){
			return{
				IMG_DATA: 'https://zhijianlw.com/static/web/img/icon-card-morenlogo-09-27-01.png',
				text: '',
				content: '',
				title: '',
				background: '',
				isShowCheck: 0,
				gift: '0',
				zhufu_msg: '',
				name: '',
				w: '',
				// 进度条位置
				schedule: 0,
				// 按钮位置
				movable_x: '0',
				// 按钮移动距离
				distance: '0',
				// 总时长
				duration: '',
				// 1播放  0不播放
				stop: '0',
				// 页面宽度
				width: '',
				zhufu_mp4:'',
				zhufu_mp3:'',
				radio: true,
				present_memberid_headimg:'',
				present_memberid_name:'',
				timecount: '00:00:00',
				hour: 0,
				minute: 0,
				second: 0,
				timer:'',
				totalDuration: '00:00:00',
			}
		},
		computed:{
			
		},
		onShow() {
			
		},
		onLoad: function(e) {
			// this.getShowcustomized();
			
			this.url = config.URL;
			let that = this;
			let merberid = uni.getStorageSync('id')
			this.sign = uni.getStorageSync('sign');
			// 拿到传过来的礼包号
			if (e.cardbag_number) {
				this.cardbag_number = e.cardbag_number;
			} else {
				this.cardbag_number = e.scene;
			}
			
			
			let data = JSON.stringify({
				cardbag_number: this.cardbag_number,
				cardbag_detail_id: "0",
				merberid: merberid
			})
			var action = 'get_cardbag_detail';
			this.$utils.post(action, data).then(res => {
				this.background = res.cardbag_theme.theme_background;
				this.IMG_DATA = res.cardbag_theme.customized_head_img;
				this.text = res.cardbag_theme.customized_call;
				this.content = res.cardbag_theme.zhufu_msg;
				this.title = res.cardbag_theme.customized_company;
				
				console.log('礼包详情', res)
				this.zhufu_msg = res.cardbag_theme.zhufu_msg
				this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
				this.zhufu_mp4=res.cardbag_theme.zhufu_mp4
				this.present_memberid_headimg=res.cardbag.present_memberid_headimg
				this.present_memberid_name=res.cardbag.present_memberid_name
				if (res.cardbag.type == 3) {
					var time = Date.parse(new Date()) / 1000;
					// console.log('当前时间戳',time)
					var fixedtime = res.cardbag.fixed_time
					// console.log('开奖时间戳',fixedtime)
				}
				if (res.cardbag_theme.zhufu_type == "1") {
					this.gift = '1'
				} else if (res.cardbag_theme.zhufu_type == "0") {
					this.gift = '0'
				}else{
					this.gift = '2'
				}
				var data = '{"cardbag_number":"' + this.cardbag_number + '","memberid":"' + merberid + '"}';
				var action = 'check_receive_cardbag';
				this.$utils.post(action, data).then(re => {
					console.log('判断礼包是否领取', re)
					// sta  0不可领  1可领取
					// 定时开奖   0未参与不调走  1参与没返回id之类的
					if (re.sta == 1) {
						// 定时开奖未领取到礼包还能进去的
						if (time > fixedtime) {
							this.display = '0';
							uni.reLaunch({
								url: '../redEnvelopes/redEnvelopes?cardbag=' + that.cardbag_number +
									'&cardbag_detail_id=' + '0' + '&cardbag_number=' +
									that.cardbag_number,
							})
						} else {
							this.display = '1';
						}
					} else if (re.sta == 0) {
						this.display = '1';
			
						if (re.cardbag_number) {
							this.number = re.cardbag_number;
							this.cardbag_detail_id = re.cardbag_detail_id
							this.display = '0';
							uni.reLaunch({
								url: '../redEnvelopes/redEnvelopes?cardbag_number=' + re
									.cardbag_number + '&cardbag_detail_id=' + re
									.cardbag_detail_id + '&cardbag=' + that.cardbag_number +
									'&head_img=' + res.cardbag.present_memberid_headimg +
									'&all_details_num=' + res.cardbag.all_details_num +
									'&present_memberid_name=' + res.cardbag.present_memberid_name
							})
						} else if (time < fixedtime) {
			
						} else {
							this.isShowCheck = 1;
							this.zhufu_msg = re.msg;
							// uni.showToast({
							// 	title: re.msg,
							// 	icon: 'none'
							// })
						}
			
					} else if (re.sta == 101) {
						this.isShowCheck = 2;
						// this.zhufu_msg = re.msg;
						// uni.reLaunch({
						// 	url: '../index-coupon/ConversionDetails?cardbag=' + that.cardbag_number +
						// 		'&cardbag_detail_id=' + '0' + '&cardbag_number=' +
						// 		that.cardbag_number,
						// })
					} else {
						this.display = '1';
					}
			
				})
			
				// 模板信息
				this.template = res.cardbag_theme;
				// 判断当前礼包是否为定时开奖
				this.type = res.cardbag.type;
				// 礼包信息
				this.cardbag = res.cardbag;
				// 头像 昵称
				this.head_img = res.cardbag.present_memberid_headimg;
				this.name = res.cardbag.present_memberid_name;
				// 是否领取
				this.all_details_num = res.cardbag.all_details_num
				this.id = res.cardbag.present_memberid;
			
			})
			//判断是否登录
			var id = uni.getStorageSync('id')
			if (id) {
				// console.log('登录')
				this.idd = id;
				this.sign = '200'
			} else {
				// console.log('未登录')
				this.sign = '0'
			}
		},
		methods:{
			getShowcustomized(){
				var action = 'get_theme_type_by_customized';
				var controller = 'zhufu';
				var memberid = uni.getStorageSync('id');
				var data = JSON.stringify({
					memberid: memberid
				});
				this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta ==1){
						this.customizData = res.rs;
						this.IMG_DATA = res.rs.customized_head_img;
						this.text = res.rs.customized_call;
						this.content = res.rs.customized_zhufu;
						this.title = res.rs.customized_company;
						this.background = res.rs.default_theme_background;
						this.id = res.rs.default_theme_id;
					}
				});
			},
			toConversionDetails(){
				uni.reLaunch({
					url: '../index-coupon/ConversionDetails?cardbag=' + this.cardbag_number +
						'&cardbag_detail_id=' + '0' + '&cardbag_number=' +
						this.cardbag_number,
				})
			},
			getgift: function(e) {
				let that = this;
				if (this.sign == '200') {
					// uni.showLoading({
					// 	title: '正在领取'
					// })
					// 领取红包
					var data = '{"cardbag_number":"' + this.cardbag_number + '","memberid":"' + this.idd + '"}';
					var action = 'receive_cardbag';
					// console.log(data)
					this.$utils.post(action, data).then(res => {
						console.log('领取卡包', res)
						if (res.sta == 1) {
							
							// 存入本地缓存
							uni.setStorageSync('new_cardbag_number', res)
			
							// 定时开奖的话  未到开奖时间提示
							if (this.type == 3) {
								uni.hideLoading();
								// 提示参与成功
								uni.showToast({
									title: '成功参与',
									icon: 'none',
									mask: true,
								})
								// 调用订阅消息
								uni.requestSubscribeMessage({
									tmplIds: ['K7Go9Ex49p5hfB8qm3LhggEDJoZ1p2mKu2lyspAsqM0'],
									success(res) {
										// console.log(res)
			
										that.dingyue();
			
									},
									fail(res) {
										// console.log('失败',res) 
										wx.showToast({
											title: res.errMsg,
											icon: 'none',
											mask: true,
										})
									}
			
								})
			
							}
							// 即时开奖
							else if (this.type == 4) {
			
								setTimeout(function(e) {
									uni.navigateTo({
										url: '../redEnvelopes/redEnvelopes?cardbag_number=' +
											res.cardbag_number + '&cardbag_detail_id=' + res
											.cardbag_detail_id + '&head_img=' + that.head_img +
											'&all_details_num=' + that.all_details_num +
											'&present_memberid_name=' + that.name +
											'&old_cardbag_number=' + that.cardbag_number,
									})
									uni.hideLoading();
								}, 500)
			
			
								
							} else {
			
								setTimeout(function(e) {
									uni.reLaunch({
										url: '../redEnvelopes/redEnvelopes?cardbag_number=' +
											res.cardbag_number + '&cardbag_detail_id=' + res
											.cardbag_detail_id + '&head_img=' + that.head_img +
											'&all_details_num=' + that.all_details_num +
											'&present_memberid_name=' + that.name +
											'&old_cardbag_number=' + that.cardbag_number,
									})
									uni.hideLoading();
								}, 500)
			
								
			
							}
						} else {
							uni.hideLoading()
							// uni.showToast({
							// 	title: res.msg,
							// 	icon: 'none',
							// })
						}
					})
				} else {
			
					uni.showToast({
						title: '请先登录',
						icon: "none",
						mask: 'true',
						success: (res) => {
							setTimeout(function(e) {
								uni.reLaunch({
									url: '../signin/signin?receive=' + 'on' +
										'&cardbag_number=' + that.cardbag_number
								})
							}, 1500)
						}
					})
				}
			
			}
		 
		}
	}
</script>

<style>
	page{
		flex-wrap: wrap;  
	}
	
	
	/* 信息 */
	.gift-small{
		width: 100%;
		position: relative;
		/* height: 600rpx; */
	}
	
	.icon-card-select-0{
		width: 750rpx;
		height: 1275rpx;
	}
	
	.icon-card-select-1{
		position: absolute;
		    top: 340rpx;
		    left: 84rpx;
		    width: 76rpx;
		    height: 76rpx;
	}
	.icon-card-select-2{
		position: absolute;
		    top: 439rpx;
		        left: 84rpx;
		    width: 400rpx;
		    font-size: 24rpx;
		    color: #575D65;
		    height: 34rpx;
		    /* border-bottom: 1px solid #EEEEEE; */
	}
	.icon-card-select-3{
		    position: absolute;
		    top: 490rpx;
		    left: 84rpx;
		    width: 584rpx;
		    height: 224rpx;
	}
	.icon-card-select-4{
		position: absolute;
		    top: 736rpx;
		    right: 80rpx;
		    width: 353rrpx;
		    height: 30rpx;
		    font-size: 24rpx;
		    color: #575D65;
		    /* border-bottom: 1px solid #EEEEEE; */
	}
	
	.gift-btn{
		margin-top: 60rpx;
		    width: 640rpx;
		    background-color: #F55856;
		    height: 80rpx;
		    line-height: 80rpx;
		    margin-bottom: 30rpx;
		    font-size: 32rpx;
		    border-radius: 50rpx;
	}
	
	/*wxss*/
	.section{
	    height: 220rpx;
	    width: 100%;
	    position: absolute;
	    line-height: 50rpx;
	    overflow: scroll;
	    font-size: 24rpx;
	    background: #FFF7EA;
	  /* text-decoration-line: underline; */
	}
	.text{
		height: 220rpx;
		    -webkit-text-decoration-line: underline;
		    text-decoration-line: underline;
		    position: absolute;
		    width: 100%;
		    background: repeating-linear-gradient(#FFF7EA,#FFF7EA 34rpx ,#FFF7EA 50rpx);
		    background: repeating-linear-gradient(#FFF7EA,#FFF7EA 34rpx ,#FFF7EA 50rpx);
	}
	.section textarea{
		width: 100%;
		font-size: 24rpx;
		color: #575D65;
	}
</style>