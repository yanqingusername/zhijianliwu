<template>
	<view class="bag" style="position: relative;">
		<view class="" style="margin-top: 40px;display: flex;align-items: center;justify-content: center;">
			<text class="bag-title">恭喜您，收到了一份礼物</text>
		</view>
		<image class="bag-head" :src="cardbag.present_memberid_headimg" mode=""></image>
		<view class="bag-con">
			
			<text class="bag-font">{{cardbag.present_memberid_name}}送出一份礼物给你!</text>

			<view class="many-com" v-if="com==1">
				<view class="bag-tea" v-for="item in goodslist" :key="item.id" @click="goToDetails(item.keynum)">
					<image class="flowers" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png"
						mode=""></image>
					<image class="bag-tea-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
					<text class="bag-tea-title">{{item.goodsname}}</text>
					<!-- <text class="bag-tea-title">{{$utils.cut_str(item.goodsname,6)}} x{{item.goodsnum}}</text> -->
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll-x" v-if="com==2">
				<view class="many">
					<view class="gift2" v-for="item in goodslist" :key="item.id">
						<view class='gift2-list' >
							<image class="gift-img2" :src="$utils.imageUrl(item.head_img)" mode="widthFix"></image>
							<view class="gift-xq2">
								<view class="gift-xq-title">{{$utils.cut_str(item.goodsname,9)}}</view>
								<view class="gift-xq-num">共{{item.goodsnum}}件</view>
							</view>
						</view>
					</view>
					<!-- <view class="bag-tea1" v-for="item in goodslist" :key="item.id">
						<image class="bag-tea-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
						<text class="bag-tea-title1">{{$utils.cut_str(item.goodsname,6)}}</text>
						<text class="bag-tea-fen">x{{item.goodsnum}}</text>
					</view> -->
				</view>
			</scroll-view>

			<view class="bag-gift">
				<view class="bag-gift-title">
					<text class="bag-gift-title-font">{{receive_info}}</text>
				</view>

				<view class="bag-gift-title" style="height: 120rpx;border-top: 1px solid #E6E6E6;" v-for="item1 in cardbag_in_people" :key="item1.id">
					<view class="flex-between flex-vertically">
						<view class="bag-gift-title-head">
							<image class="bag-gift-title-head-img" :src="item1.head_img" mode=""></image>
						</view>
						<view style="flex-direction: column;">
							<view class="flex-between flex-vertically" style="width: 450rpx;">
								<view>{{item1.member_name}}</view>
								<view class="bag-gift-title-tea" v-if="cardbag.type != 1">{{$utils.cut_str(item1.goods_name,11)}}</view>
							</view>
							<view style="font-size: 22rpx;color: #999999;margin-top: 16rpx;">{{item1.exchange_time}}</view>
						</view>
					</view>
					
					
				</view>

			</view>

			<view style="display: flex;" v-if="cardbag.type == 1">
				<button type="default" class="transfer" @click="lockliwu">查看礼物</button>
			</view>

			<view style="display: flex;" v-else>
				<button type="default" v-if="card_type != 0" class="transfer" @click="givee">转赠礼物</button>
				<button type="warn" v-if="card_type == 2" class="write" :data-cardbag_number="cardbag_number" @click="address">填写地址</button>
				<button type="default" v-if="card_type == 0 || card_type == 1 || card_type == 3" class="transfer" @click="lockliwu">查看礼物</button>
			</view>

			<!-- <view style="height: 30rpx;width: 100%;background: #EEEEEE;margin-top: 50rpx;"></view>
			
			<view class="bag-red" v-if="gift==='0'">
				<image class="bag-red-img" src="https://zhijianlw.com/static/web/img/mb_yuyin_z_2021_08_30.png"
					mode=""></image>
				<image class="bag-red-head" :src="cardbag.present_memberid_headimg" mode=""></image>
				<text class="bag-red-title">{{cardbag.present_memberid_name}}</text>
				<view class="zhufu">
					<text class="bag-red-fu">{{cardbag_theme.zhufu_msg}}</text>
				</view>
			</view>
			<view class="bag-red" v-if="gift==='1'" style="display: flex;align-items: center;justify-content: center;">
				<image class="bag-red-img" src="https://zhijianlw.com/static/web/img/mb_recording_z_2021_08_30.png" mode="">
				</image>
				<image class="bag-red-head" :src="cardbag.present_memberid_headimg" mode=""></image>
				<text class="bag-red-title">{{cardbag.present_memberid_name}}</text>
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

				<view class="wishes-line">
					<text class="wishes-line-font">{{cardbag.present_memberid_name}}送了您一份礼物赶紧领取吧</text>
				</view>


			</view>
			<view class="bag-red" v-if="gift==='2'">
				<image class="bag-red-img" src="https://zhijianlw.com/static/web/img/mb_movie_z_2021_08_30.png" mode=""></image>
				<view class="template-btm-information-video"><video :src="cardbag_theme.zhufu_mp4" controls></video>
				</view>
				<image class="bag-red-head" :src="cardbag.present_memberid_headimg" mode=""></image>
				<text class="bag-red-title">{{cardbag.present_memberid_name}}</text>
				<view class="wishes-line">
					<text class="wishes-line-font">{{cardbag.present_memberid_name}}送了您一份礼物赶紧领取吧</text>
				</view>
			</view> -->
			
			<!-- <view style="height: 50rpx;width: 100%;"></view> -->
		</view>
		<view style="height: 30rpx;width: 100%;"></view>
	</view>
</template>

<script>
	import arprogress from '@/components/ar-circle-progress/ar-circle-progress.vue';
	import config from '../../common/config.js';
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	const audioCtx = uni.createAudioContext('')

	innerAudioContext.autoplay = true;
	export default {
		components:{
			"arprogress": arprogress,
		},
		data() {
			return {
				liwu: [],
				zhufu_msg: '',
				send_talk_msg: '',
				cardbag_number: '',
				cardbag: '',
				level_name: '',
				sign: '',
				type: '',
				goodslist: [],
				com: 1,
				cardbag_in_people: [],
				cardbag: [],
				cardbag_theme: [],
				gift: '0',
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
				zhufu_mp4: '',
				zhufu_mp3:'',
				radio: true,
				receive_info: '',
				timecount: '00:00:00',
				hour: 0,
				minute: 0,
				second: 0,
				timer:'',
				totalDuration: '00:00:00',
				is_exchange_type: 0,
				card_type: '', //card_type 1 去兑换按钮   card_type 2  写地址按钮  card_type 3  充值按钮 card_type 0 (订单完成)显示详情或列表
			}
		},
		onLoad: function(e) {
			let cardbag_number = e.cardbag_number
			this.cardbag_number = cardbag_number
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			var data = '{"memberid":"' + memberid + '","cardbag_number":"' + cardbag_number + '"}';

			var action = 'get_cardbag_fenshu';
			this.$utils.post(action, data).then(res => {
				if (res.rs[0].goodsinfo.length == 1) {
					this.goodslist = res.rs[0].goodsinfo
					this.com = 1
				} else {
					this.goodslist = res.rs[0].goodsinfo
					this.com = 2
				}


				console.log(res.rs[0])
			})

			//获取旧的礼包信息，主要是获取领取人信息
			// let old_cardbag_number = e.old_cardbag_number
			// let data1 = JSON.stringify({
			// 	cardbag_number: old_cardbag_number,
			// 	cardbag_detail_id: "0",
			// 	merberid: memberid
			// })
			// var action1 = "get_cardbag_detail";
			// this.$utils.post(action1, data1).then(res => {
			// 	if(res.sta == 1){
			// 		console.log('礼包信息')
			// 		console.log(res)
			// 		this.cardbag_in_people = res.cardbag_in_people
			// 		this.cardbag = res.cardbag
			// 		this.cardbag_theme = res.cardbag_theme
			// 		this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
			// 		this.price=res.cardbag.price
			// 		this.receive_info = res.receive_info
			// 		if (res.cardbag_theme.zhufu_type == "1") {
			// 			this.gift = '1'
			// 		} else if (res.cardbag_theme.zhufu_type == "0") {
			// 			this.gift = '0'
			// 		} else {
			// 			this.gift = '2'
			// 		}
			// 	}
			// })
			
			let data2 = JSON.stringify({
				cardbag_number: cardbag_number,
				cardbag_detail_id: "0",
				merberid: memberid
			})
            var action2 = "get_cardbag_detail";
            this.$utils.post(action2, data2).then(res => {
            	console.log('礼包信息')
            	console.log(res)
				this.card_type = res.card_type
            	this.cardbag_in_people = res.cardbag_in_people
            	this.cardbag = res.cardbag
            	this.cardbag_theme = res.cardbag_theme
            	this.price=res.cardbag.price
				this.receive_info = res.receive_info
				this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
				this.is_exchange_type = res.is_exchange_type
            	if (res.cardbag_theme.zhufu_type == "1") {
            		this.gift = '1'
            	} else if (res.cardbag_theme.zhufu_type == "0") {
            		this.gift = '0'
            	} else {
            		this.gift = '2'
            	}
            })
	
	      // 音频用到的宽度
		  let that = this;
	      uni.getSystemInfo({
				success: (res) => {
					that.width = res.screenWidth,
					that.w = res.screenWidth * 0.57
				},
		   })
		},
		methods: {
			goToDetails(keynum) {
				uni.navigateTo({
					url: "../details/details?keynum="+ keynum
				});
			},
			address: function(e) {
				//let cardbag_number = e.currentTarget.dataset.cardbag_number;
				let cardbag_number = this.cardbag_number
				// uni.navigateTo({
				// 	url: '../ordeDetails/ordeDetails?cardbag_number=' + cardbag_number
				// })
				uni.navigateTo({
					url: '../orderList/ReceptionAddress?ordernumber=' + cardbag_number
				})
			},
			givee: function(e) {
				// let ordernumber = this.cardbag_number;
				// uni.navigateTo({
				// 	url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=${this.is_exchange_type}`
				// })
				let ordernumber = this.cardbag_number;
				let isexchangetype = this.is_exchange_type;
				if(isexchangetype == 0){
					let ordernumber = this.cardbag_number;
					let action = 'order_add_shopping_cart';
					let memberid = uni.getStorageSync('id')
					let controller = 'order';
					let data = JSON.stringify({
					    ordernumber: ordernumber,
					    memberid: memberid,
						buy_type: 1
					})
					this.$utils.postNew(action, data, controller).then(res => {
					    if(res.sta == 1){
					        uni.navigateTo({
								url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=${isexchangetype}`
							})
					    }
					})
				}else{
					uni.navigateTo({
						url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=${isexchangetype}`
					})
				}
				// // let cardbag_number = e.currentTarget.dataset.cardbag_number;
				// let cardbag_number = this.cardbag_number
				// let price = this.price;
				// let status = this.status;
				// uni.setStorageSync('cardbag_theme', this.cardbag_theme)
				// var data = '{"cardbag_number":"' + this.cardbag_number + '","zhufu_theme_id":"' + this
				// 	.cardbag_theme
				// 	.id + '","memberid":"' + this.cardbag.present_memberid + '"}';
				// console.log(data)
				// var action = 'save_shoudao_zhufu_theme';
				// this.$utils.post(action, data).then(res => {
				// 	console.log(res)
				// 	if (res.sta == 1) {
				// 		if (this.cardbag.type == 3) {

				// 			var data = '{"cardbag_number":"' + cardbag_number + '"}';
				// 			var action = 'save_cardbag_wanfa';
				// 			this.$utils.post(action, data).then(res => {
				// 				console.log('定时转成直接', res)
				// 				if (res.sta == 1) {

				// 					var data = '{"cardbag_number":"' + cardbag_number + '"}';
				// 					var action = 'share_cardbag';
				// 					console.log(data)

				// 					this.$utils.post(action, data).then(res => {
				// 						console.log('赠送好友', res)
				// 						if (res.sta == 1) {
				// 							uni.showToast({
				// 								title: res.msg,
				// 								icon: 'success',
				// 								mask: true,
				// 								success: (res) => {
				// 									setTimeout(function(e) {
				// 										uni.navigateTo({
				// 											url: '../success/success?cardbag_number=' +
				// 												cardbag_number +
				// 												'&price=' +
				// 												price
				// 										})
				// 									}, 1500)
				// 								}
				// 							})
				// 						}
				// 					})
				// 				}
				// 			})
				// 		} else {
				// 			// let cardbag_number = e.currentTarget.dataset.cardbag_number;
				// 			let cardbag_number = this.cardbag_number
				// 			let price = this.price;
				// 			let status = this.status;

				// 			var data = '{"cardbag_number":"' + this.cardbag_number + '"}';
				// 			var action = 'share_cardbag';
				// 			console.log(data)
				// 			this.$utils.post(action, data).then(res => {
				// 				console.log('赠送好友', res)
								
				// 				if (res.sta == 1) {
				// 					uni.showToast({
				// 						title: res.msg,
				// 						icon: 'success',
				// 						mask: true,
				// 						success: (res) => {
				// 							setTimeout(function(e) {
				// 								uni.navigateTo({
				// 									url: '../success/success?cardbag_number=' +
				// 										cardbag_number +
				// 										'&price=' +
				// 										price
				// 								})
				// 							}, 1500)
				// 						}
				// 					})
				// 				}
				// 			})
				// 		}
				// 	}
				// })
			},
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
						
						let schedule1 = (currentTime1/duration1*1000);
						
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
			lockliwu: function(e){
				uni.reLaunch({
					url:'../orderList/orderList?nav=3'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F32C14;
	}

	.bag-title {
		font-size: 20px;
		color: #fff;
		/* position: relative;
		top: 50rpx;
		left: 150rpx; */
	}

	.bag-con {
	    width: 90%;
	    /* height: 2000rpx; */
	    background-color: #fff;
	    /* position: relative; */
	    /* top: 160rpx; */
	    /* left: 35rpx; */
	    border-radius: 10rpx;
	    margin: 100rpx auto 0rpx ;
	    /* padding-top: 200rpx; */
	    display: flex;
	    flex-direction: column;
		align-items: center;
		min-height: 1000rpx;
		padding-bottom: 30rpx;
	}

	.bag-head {
		    width: 120rpx;
		    height: 120rpx;
		    border-radius: 50%;
		    position: absolute;
		    top: 80rpx;
		    left: 310rpx;
	}

	.bag-font {
		/* position: absolute;
		top: 100rpx;
		left: 195rpx; */
		    text-align: center;
		        margin-top: 90rpx;
	}

	.bag-tea {
		width: 368rpx;
    	height: 460rpx;
		border: 3rpx solid #CCB586;
		/* position: absolute;
		top: 100px;
		left: 180rpx; */
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
		border-radius: 10rpx;
	}

	.bag-tea-img {
		height: 360rpx;
    	width: 360rpx;
		border-radius: 10rpx;
	}

	.bag-tea-title {
		/* position: absolute;
		top: 300rpx; */
		margin-top: 20rpx;
		padding: 0rpx 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 90%;
		text-align: center;
	}

	.bag-gift {
		/* width: 90%; */
		/* height: 204rpx; */
		background-color: #F8F8F8;
		margin: 80rpx 0rpx;
		    width: 90%;
		/* position: absolute;
		margin-top: 350px;
		left: 35rpx; */
	}

	.bag-gift-title {
		width: 100%;
		height: 100rpx;
		/* border-bottom: 1px solid #E6E6E6; */
		display: flex;
		align-items: center;
	}

	.bag-gift-title-font {
		margin-left: 40rpx;
	}

	.bag-gift-title-head {
		width: 80rpx;
		height: 80rpx;
		/* border-radius: 50%; */
		margin-left: 40rpx;
		margin-right: 20rpx;
	}
	
	.bag-gift-title-head-img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.bag-gift-title-tea {
		/* position: absolute;
		right: 40rpx; */
	}

	.transfer {
		width: 270rpx;
		height: 80rpx;
		border-radius: 50rpx;
		background-color: #EFEFEF;
		/* position: absolute;
		margin-top: 490px;
		left: 50rpx; */
		font-size: 30rpx;
		margin-right: 30rpx;
	}

	button[type=default] {
		color: #F33E2B;
	}

	.write {
		width: 270rpx;
		height: 80rpx;
		border-radius: 50rpx;
		/* position: absolute;
		margin-top: 490px;
		left: 350rpx; */
		font-size: 30rpx;
	}

	.bag-red {
		width: 612rpx;
		height: 1025rpx;
		position: relative;
		margin-top: 50rpx;
		/* background-color: #00BFFF; */
		/* position: relative;
		top: 1200rpx;
		margin-left: 100rpx; */
	}

	.bag-red-img {
		width: 100%;
		height: 1025rpx;
	}

	.bag-red-head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position: absolute;
		top: 40rpx;
		left: 40rpx;
	}

	.bag-red-title {
		position: absolute;
		top: 70rpx;
		left: 150rpx;
		color: #D3A97A;
	}

	.bag-red-fu {

		color: #F6DBA5;
	}

	.bag-red-con {
		width: 380rpx;
		color: #F6DBA5;
	}

	.bag-red-con1 {
		position: absolute;
		top: 45rpx;
		left: 70rpx;
	}

	.zhufu {
		width: 468rpx;
		height: 150rpx;
	    line-height: 35rpx;
	    position: absolute;
	    top: 200rpx;
	    left: 72rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.many-com {
	    display: flex;
	    justify-content: center;
	    flex-wrap: wrap;
	        margin-top: 50rpx;
	    /* height: 370rpx; */
	    position: relative;
	}

	.many {
		/* width: 100%; */
		/* border: 1px solid #000000; */
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		    margin-top: 0rpx;
		    height: 370rpx;
		/* position: absolute;
		top: 80px; */
	}

	.bag-tea1 {
		width: 80%;
		height: 240rpx;
		border: 1px solid #CCB586;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	}

	.bag-tea-title1 {
		margin-top: -80rpx;
	}

	.bag-tea-fen {
		margin-top: 80rpx;
		/* margin-left: -100rpx; */
		color: #666666;
	}

	.flowers {
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		top: -9px;
	}

	.sound-cd {
		width: 390rpx;
		    height: 390rpx;
		    position: absolute;
		    top: 178rpx;
		    left: 120rpx;
	}

	.sound-san {
		width: 94rpx;
		    height: 94rpx;
		    position: absolute;
		    top: 367rpx;
		    left: 269rpx;
	}

	.sound-on {
	    width: 196rpx;
	        height: 90rpx;
	        position: absolute;
	        top: 100rpx;
	        right: 110rpx;
	    
	}

	.slider {
		width: 570rpx;
		    position: absolute;
		    top: 580rpx;
		    left: 30rpx;
	}

	.progress-one {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		top: 130rpx;
	}

	.template-btm-information-video {
		width: 590rpx;
		    position: absolute;
		    top: 150rpx;
		    left: 10rpx;
	}
	.b{
		width: 410rpx;
		height: 50rpx;
		margin-top: -26rpx;
	}
	.template-btm-information-video video{
		width: 590rpx;
		height: 400rpx;
	}
	.sound-on-rotate{
		transform: rotate(-45deg);
		animation: 2s;
		width: 196rpx;
		    height: 90rpx;
		    position: absolute;
		    top: 142rpx;
		    right: 110rpx;
	}
	
	
	.gift2{
		padding: 0 70rpx;
		    width: 100%;
			height: 170rpx;
			margin-bottom: 20rpx;
	}
	.gift2-list{
		border: 1rpx solid #CCB586;
		border-radius: 10rpx;
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
	}
	.gift2-list .gift-img2{
		width: 100rpx;
		border-radius: 10rpx;
	}
	.gift2-list .gift-xq2{
		text-align: left;
		flex: 1;
		padding-left: 30rpx;
	}
	.gift2-list .gift-xq2{
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #333;
	}
	.gift2-list .gift-xq2{
		font-size: 28rpx;
		color: #666;
	}
	.gift-xq-title{
	font-weight: bold;
	font-size: 14px;
}
.gift-xq-num{
	color: #666666;
	font-size: 14px;
	margin-top: 30rpx;
}

.wishes-line {
		line-height: 54rpx;
		background-color: #000;
		position: absolute;
		bottom: 311rpx;
		left: 4px;
		opacity: 0.7;
		padding: 0 20rpx;
		border-radius: 0 26rpx 26rpx 0;
	}
	
	.wishes-line-font {
		color: #BD9365;
		font-size: 24rpx;
	}
	
	.scroll-x{
	  height: 370rpx;
	  margin-top: 50rpx;
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
