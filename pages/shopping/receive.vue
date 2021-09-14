<template>
	<view class="" v-if="isShowCheck == 0">
		<!-- 文字祝福 -->
		<view style="position: relative;width: 80%;margin: 100rpx auto;" v-if="gift==='0'">
			<view class="">
				<image class="wishes-fu"
					src="https://zhijianlw.com/static/web/img/mb_fuyu_2021_08_30.png" mode="widthFix">
				</image>
			</view>
			<view class="infor">
				<view class="img-infor">
					<image class="wishes-fu-head" :src="$utils.imageUrl(head_img)" mode=""></image>
					<text class="wishes-fu-head-title">{{name}}</text>
				</view>
				
				<view class="wishes-name zhufu">{{zhufu_msg}}</view>
			</view>
			<view class="wishes-line">
				<text class="wishes-line-font">熊猫送了您一份礼物赶紧领取吧</text>
			</view>
			<view class="kai_view" @click="open">
				<text class="chai1"></text>
			</view>
		</view>
		<!-- <view class="receive" v-if="gift==='0'">
					<view class="receive-yello">
						<image class="receive-head" :src="$utils.imageUrl(head_img)" mode=""></image>
						<text class="receive-cat">{{name}}</text>
						<view class="zhufu">
							<text class="receive-one">{{zhufu_msg}}</text>
							<text class="receive-two">{{send_talk_msg}}</text>
						</view>
		
						<image class="receive-bot" :src="$utils.osspath_url('/xcx-static/wishes/bot.png')" mode=""></image>
						<image class="receive-bar" :src="$utils.osspath_url('/xcx-static/wishes/per_img.png')" mode=""></image>
						<view class="money">
							<text class="chai1" @click="open">拆</text>
						</view>
					</view>
				</view> -->
		<!-- 语音-->
		<view class="sound-border" v-if="gift==='1'">
			<image class="sound-bg" src="https://zhijianlw.com/static/web/img/mb_recording_2021_08_30.png" mode=""></image>
			<image class="sound-head" :src="present_memberid_headimg" mode=""></image>
			<text class="sound-name">{{present_memberid_name}}</text>
			<!-- <image class="sound-cd" :src="$utils.osspath_url('/xcx-static/wishes/cd.png')" mode=""></image>
			 <image class="sound-san" @click="audioPlay" v-if="radio"
			 	:src="$utils.osspath_url('/xcx-static/wishes/piay_icon1.png')" mode=""></image>
			 <image class="sound-san" @click="audioPlay" v-else
			 	:src="$utils.osspath_url('/xcx-static/wishes/piay_icon.png')" mode=""></image>
			<image class="sound-on" @click="audioPlay" :class="radio?'sound-on':'sound-on-rotate'" :src="$utils.osspath_url('/xcx-static/wishes/on.png')" mode=""></image>
			<view class="slider" @click="audioPlay">
				<slider :value="schedule" step="1" activeColor="#D8D8D8" backgroundColor="#767676 " block-color="#D8D8D8" block-size="12"/>
			</view> -->
			
			<view class="audio-box-view">
				<view class="audio-img-view">
					<image class="sound-img-bg1" src="https://zhijianlw.com/static/web/img/icon-cd-2021-09-08-01.png" mode=""></image>
					<arprogress class="sound-img-arprogress" :percent="schedule" inactiveColor='#EEEEEE' activeColor="#F32C14" borderWidth='6' width="284" bgColor="transparent"></arprogress>
					<image v-if="radio" class="sound-img-bg2" @click="audioPlay" src="https://zhijianlw.com/static/web/img/icon-play-2021-09-08-04.png" mode=""></image>
					<image v-else class="sound-img-bg2" @click="audioStop" src="https://zhijianlw.com/static/web/img/icon-play-2021-09-08-05.png" mode=""></image>
				</view>
				<view class="audio-box-view-wrap">
					<view class="audio-box-view-tiem">
					    <view>{{timecount}}</view><view>/{{totalDuration}}</view>
					</view> 
					<view class="audio-box-view-text" style="color: EEEEEE;">播放录音</view>
					
				</view>
			</view>
			
			<text class="line">熊猫送了您一份礼物，赶紧领取吧</text>
			<text class="new-chai" @click="open"></text>
		</view>

        
        <!-- 视频 -->
        <view class="sound-border" v-if="gift==='2'">
           	<image class="sound-bg" src="https://zhijianlw.com/static/web/img/mb_movie_2021_08_30.png"
           		mode=""></image>
				<image class="sound-head" :src="present_memberid_headimg" mode=""></image>
				<text class="sound-name">{{present_memberid_name}}</text>
           	<view class="template-btm-information-video"><video :src="zhufu_mp4" controls></video>
           	</view>
           	
           	<text class="line">熊猫送了您一份礼物，赶紧领取吧</text>
           	<text class="new-chai" @click="open"></text>
        </view>
	</view>
	<view class="" v-else>
		<!-- 文字祝福 -->
		<view style="position: relative;width: 80%;margin: 100rpx auto;">
			<view class="">
				<image class="wishes-fu"
					src="https://zhijianlw.com/static/web/img/libao_09_01.png" mode="widthFix">
				</image>
			</view>
			<view class="infor">
				<view class="img-infor">
					<image class="wishes-fu-head" :src="$utils.imageUrl(head_img)" mode=""></image>
					<text class="wishes-fu-head-title">{{name}}</text>
				</view>
				
				<view class="wishes-name zhufu">{{zhufu_msg}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import arprogress from '@/components/ar-circle-progress/ar-circle-progress.vue';
	import config from '../../common/config.js';
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	const audioCtx = uni.createAudioContext('')

	innerAudioContext.autoplay = true;
	
	const recorderManager1 = uni.getRecorderManager();
	const innerAudioContext1= uni.createInnerAudioContext();
	export default {
		components:{
			"arprogress": arprogress,
		},
		data() {
			return {
				gift: '0',
				send_talk_msg: '',
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
				isShowCheck: 0,
				timecount: '00:00:00',
				hour: 0,
				minute: 0,
				second: 0,
				timer:'',
				totalDuration: ''
			}
		},
		onLoad: function(e) {	
			
			innerAudioContext1.src = 'https://zhijianlw.com/static/web/img/kai_li_bao.wav';
			
			this.url = config.URL;
			let that = this;
			let merberid = uni.getStorageSync('id')
			this.sign = uni.getStorageSync('sign');
			let send_talk_msg = uni.getStorageSync("send_talk_msg")
			this.send_talk_msg = send_talk_msg
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
				console.log('礼包详情', res)
				this.zhufu_msg = res.cardbag_theme.zhufu_msg
				this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
				this.zhufu_mp4=res.cardbag_theme.zhufu_mp4
				this.send_talk_msg = send_talk_msg
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
						uni.reLaunch({
							url: '../index-coupon/ConversionDetails?cardbag=' + that.cardbag_number +
								'&cardbag_detail_id=' + '0' + '&cardbag_number=' +
								that.cardbag_number,
						})
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
              
			  // 音频用到的宽度
			  uni.getSystemInfo({
			  	success: (res) => {
			  		that.width = res.screenWidth,
			  			that.w = res.screenWidth * 0.57
			  	},
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
		onUnload() {
			innerAudioContext1.pause();
		},
		methods: {
			// 计时器
						getTimeInterval(){
							clearInterval(this.timer);
							this.timer = setInterval(()=> {
								this.second += 1;
								if(this.second >= 60){
									this.minute += 1;
									this.second = 0;
								}
								if(this.minute >= 60 && this.second >= 60){
									this.minute += 0;
									this.hour += 1;
								}
								this.timecount = this.showNum(this.hour)+":"+this.showNum(this.minute)+":"+this.showNum(this.second);
								console.log("this.timecount",this.timecount)
							},1000);
						},
						showNum(num) {
							if (num < 10) {
								return '0' + num
							}
							return num
						},
						format(seconds) {
									let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
									seconds -= 3600 * hour;
									let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
									seconds -= 60 * min;
									let sec = seconds >= 10 ? seconds : '0' + seconds;
									return hour + ':' + min + ':' + sec;
								},
			// 播放录音
			audioPlay: function() {
				this.timecount = '00:00:00';
				this.hour = 0;
				this.minute = 0;
				this.second = 0;
				this.getTimeInterval();
				
				this.schedule = 0;
				// 开始播放
				this.stop = 1;
				// 左边小喇叭动
				// this.radio = 1;
				this.radio = false

				let that = this;
				console.log('播放')
                 let zhufu_mp3=this.zhufu_mp3
				// 播放路径
				innerAudioContext.src = zhufu_mp3
				innerAudioContext.play();

				setTimeout(() => {

					innerAudioContext.onTimeUpdate((res) => {
						console.log('总时长', innerAudioContext.duration)
						console.log('当前播放进度', innerAudioContext.currentTime)

						// 已播放进度条
						let duration1 = parseInt(innerAudioContext.duration);
						let currentTime1 = parseInt(innerAudioContext.currentTime);
						
						let schedule1 = (currentTime1/duration1*100);
						
						that.schedule = parseInt(schedule1);
						
						that.totalDuration = that.format(duration1);
						
						// 白色圆点
						let x = (that.width * 0.57 - that.width * 0.57 * 0.07) * schedule / 100;

						if (this.stop == 0) {

						} else {
							// 白色圆点
							this.movable_x = x;
							// 进度条
							// this.schedule = schedule;
							this.duration = innerAudioContext.duration;
							console.log(innerAudioContext.duration / innerAudioContext.currentTime)
						}
						// 播放结束
						innerAudioContext.onEnded((res) => {
							console.log('结束', res)
							// 左边小喇叭停止
							that.radio = true;
							// 按钮    最右边
							// this.movable_x = that.width * 0.57;
							that.movable_x = that.width * 0.5;
							// 进度条  满
							that.schedule = 0
							that.stop=0
							innerAudioContext.stop();
							
							that.schedule = 0;
							that.timecount = '00:00:00';
							that.hour = 0;
							that.minute = 0;
							that.second = 0;
							clearInterval(that.timer);
						})


					})
				},500)


			},
			audioStop: function(e) {
				this.radio = true;
				this.schedule = 0;
				this.stop = 0;
				this.click = 0;
				clearInterval(this.timer);
				innerAudioContext.stop();
				innerAudioContext.offTimeUpdate((res) => {
					console.log('取消监听进度条', res)
				})
			},
            // 滑动
            scroll: function(e) {
            	console.log(e)
            	this.distance = e.detail.x
            },
            
            // 按住
            star: function(e) {
            	this.stop = 0;
            	this.click = 0;
            	console.log('暂停')
            	innerAudioContext.pause()
            	innerAudioContext.offTimeUpdate((res) => {
            		console.log('取消监听进度条', res)
            	})
            },
            // 停止
            to: function(e) {
            	let that = this;
            	let s = this.distance;
            	let time = s / (that.width * 0.57 - that.width * 0.57 * 0.07) * 100;
            	console.log('跳转位置', this.duration * time / 100)
            	innerAudioContext.seek(this.duration * time / 100)
            	this.schedule = time;
            	this.movable_x = s;
                this.stop=0
            }, 

			open: function(e) {
				let that = this;
				if (this.sign == '200') {
					uni.showLoading({
						title: '正在领取'
					})
					// 领取红包
					var data = '{"cardbag_number":"' + this.cardbag_number + '","memberid":"' + this.idd + '"}';
					var action = 'receive_cardbag';
					// console.log(data)
					this.$utils.post(action, data).then(res => {
						console.log('领取卡包', res)
						if (res.sta == 1) {
							
							innerAudioContext1.play();
							setTimeout(function(e) {
								// console.log('停止')
								innerAudioContext1.stop();
							}, 1000)

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
								innerAudioContext.src = that.auto;
								innerAudioContext.play();

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


								setTimeout(function(e) {
									// console.log('停止')
									innerAudioContext.stop();
								}, 2200)
							} else {
								innerAudioContext.src = that.auto;
								innerAudioContext.play();

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

								setTimeout(function(e) {
									// console.log('停止')
									innerAudioContext.stop();
								}, 2200)


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
	@import '@/common/receive.css';
	@import '@/common/sound.css';

	/* .zhufu {
		width: 556rpx;
		height: 180rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		line-height: 40rpx;
		margin-top: 30rpx;
	} */
	.progress-one {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		top: 65px;
	}
	.template-btm-information-video{
		position: absolute;
		top: 180rpx;
		left: 25rpx;
	}
	.b{
		width: 410rpx;
		height: 50rpx;
		margin-top: -26rpx;
	}
	.rotate{
		transform: rotate(-45deg);
		animation: 2s;
	}
	.sound-san{
		top: 364rpx;
	}
	.sound-on {
	    width: 196rpx;
	    height: 90rpx;
	    position: absolute;
	    top: 170rpx;
	    left: 296rpx;
	}
	.sound-on-rotate {
	    width: 196rpx;
	    height: 90rpx;
	    position: absolute;
	    top: 222rpx;
	    left: 286rpx;
		transform: rotate(-45deg);
		animation: 2s;
	}
	
	.receive-yello-view {
	    width: 560rpx;
	    height: 940rpx;
	    position: absolute;
		background: url(https://zhijianlw.com/static/web/img/mb_fuyu_2021_08_30.png) no-repeat center 560rpx 940rpx;
	}
	/* 红包部分 */
	.wishes-fu {
		width: 100%;
		position: relative;
	}
	.infor{
		position: absolute;
		padding: 40rpx;
		box-sizing: border-box;
		width: 100%;
		top: 0;
	}
	.img-infor{
		margin-bottom: 77rpx;
	}
	.say-img .img-infor{
		margin-bottom: 33rpx;
	}
	.img-infor image{
		vertical-align: middle;
		display: inline-block;
	}
	.img-infor text{
		vertical-align: middle;
		display: inline-block;
		margin-left: 18rpx;
	}
	.wishes-fu-head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	
	.wishes-fu-head-title {
		color: #D3A97A;
		font-size: 16px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.wishes-name {
		box-sizing: border-box;
		color: #F6DBA5;
	}
	.zhufu{
		text-align: center;
		color: #F6DBA5;
		font-size: 36rpx;
	}
	
	.wish {
		/* width: 380rpx;/ */
		/* position: relative;
		top: -545rpx;
		left: 180rpx; */
		text-align: center;
		margin-top: 20rpx;
		line-height: 1.5em;
	}
	
	.wishes-line {
		/* width: 180px; */
		line-height: 54rpx;
		background-color: #000;
		position: absolute;
		bottom: 311rpx;
		left: 0;
		opacity: 0.7;
		padding: 0 20rpx;
		border-radius: 0 26rpx 26rpx 0;
	}
	
	.wishes-line-font {
		color: #BD9365;
		font-size: 24rpx;
	}
	
	.kai_view{
		width: 160rpx;
	    height: 160rpx;
		border-radius: 50%;
		position: absolute;
		top: 740rpx;
		left: 220rpx;
	}
	
	.new-chai {
	    font-size: 41px;
	    color: #fff;
	    position: absolute;
	    top: 770rpx;
	    left: 220rpx;
	    width: 160rpx;
	    height: 160rpx;
	}
	
	/**
	 * 
	 */
	.audio-box-view{
		display: flex;
		text-align: center;
	    flex-direction: column;
	    align-items: center;
		position: absolute;
	    top: 220rpx;
	}
	.audio-img-view{
		position: relative;
		width: 280rpx;
	}
	.sound-img-bg1{
		width: 280rpx;
		height: 280rpx;
	}
	.sound-img-arprogress{
		position: absolute;
		top: -2rpx;
		left: -2rpx;
	}
	.sound-img-bg2{
		width: 140rpx;
		height: 140rpx;
		position: absolute;
	    top: 76rpx;
	    left: 70rpx;
	}
	.audio-box-view-wrap{
		
	}
	.audio-box-view-tiem{
		font-size: 28rpx;
		font-weight: 500;
		color: #E0E0E0;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
	}
	.audio-box-view-text{
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 26rpx;
	}
	
</style>
