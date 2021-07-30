<template>
	<view class="bag">
		<view class="">
			<text class="bag-title">恭喜您，收到了一份礼物</text>
		</view>
		<view class="bag-con">
			<image class="bag-head" :src="cardbag.present_memberid_headimg" mode=""></image>
			<text class="bag-font">{{cardbag.present_memberid_name}}送出一份礼物给你!</text>

			<view class="" v-if="com==1">
				<view class="bag-tea" v-for="item in goodslist" :key="item.id">
					<image class="flowers" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png"
						mode=""></image>
					<image class="bag-tea-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
					<text class="bag-tea-title">{{$utils.cut_str(item.goodsname,6)}} x{{item.goodsnum}}</text>
				</view>
			</view>
			<view class="many" v-else="com==2">
				<view class="bag-tea1" v-for="item in goodslist" :key="item.id">
					<image class="bag-tea-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
					<text class="bag-tea-title1">{{$utils.cut_str(item.goodsname,6)}}</text>
					<text class="bag-tea-fen">x{{item.goodsnum}}</text>
				</view>
			</view>


			<view class="bag-gift">
				<view class="bag-gift-title">
					<text class="bag-gift-title-font">{{cardbag_in_people.length}}份礼物已被抢光</text>
				</view>

				<view class="bag-gift-title" v-for="item1 in cardbag_in_people" :key="item1.id">
					<image class="bag-gift-title-head" :src="item1.head_img" mode=""></image>
					<text>{{item1.member_name}}</text>
					<text class="bag-gift-title-tea">{{$utils.cut_str(item1.goods_name,6)}}</text>
				</view>

			</view>



			<button type="default" class="transfer" @click="givee">转增礼物</button>
			<button type="warn" class="write" :data-cardbag_number="cardbag_number" @click="address">填写地址</button>


			<view class="bag-red" v-if="gift==='0'">
				<image class="bag-red-img" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/mb_yuyin_z.png"
					mode=""></image>
				<image class="bag-red-head" :src="cardbag.present_memberid_headimg" mode=""></image>
				<text class="bag-red-title">{{cardbag.present_memberid_name}}</text>
				<view class="zhufu">
					<text class="bag-red-fu">{{cardbag_theme.zhufu_msg}}</text>
					<text class="bag-red-con">{{cardbag_theme.send_talk_msg}}</text></text>
				</view>
			</view>
			<view class="bag-red" v-if="gift==='1'">
				<image class="bag-red-img" :src="$utils.osspath_url('/xcx-static/wishes/mb_recording.png')" mode="">
				</image>
				<image class="bag-red-head" :src="cardbag.present_memberid_headimg" mode=""></image>
				<text class="bag-red-title">{{cardbag.present_memberid_name}}</text>
				<image class="sound-cd" :src="$utils.osspath_url('/xcx-static/wishes/cd.png')" mode=""></image>

				<image class="sound-san" @click="audioPlay" v-show="radio"
					:src="$utils.osspath_url('/xcx-static/wishes/piay_icon1.png')" mode=""></image>
				<image class="sound-san" @click="audioPlay" v-show="!radio"
					:src="$utils.osspath_url('/xcx-static/wishes/piay_icon.png')" mode=""></image>


				<image class="sound-on" @click="audioPlay" :class="stop==0?'sound-on':'rotate'" :src="$utils.osspath_url('/xcx-static/wishes/on.png')"
					mode=""></image>
					
				<view class="slider" @click="audioPlay">
					<movable-area class="progress" :style="'width:'+w+'px'">
						<!-- 按钮 -->
						<movable-view direction="horizontal" damping="1000" @change="scroll" @touchstart="star"
							@touchend="to" class="progress-one" :x="movable_x">
							<view class="progress-view">
								<view class="progress-circular"></view>
							</view>
						</movable-view>
					</movable-area>
					<!-- 进度条 -->
					<progress :percent="schedule" class="b" data-index="index" activeColor='#D8D8D8'
						backgroundColor='#767676' border-radius="10" stroke-width="8" />
				</view>



			</view>
			<view class="bag-red" v-if="gift==='2'">
				<image class="bag-red-img" :src="$utils.osspath_url('/xcx-static/wishes/mb_movie.png')" mode=""></image>
				<view class="template-btm-information-video"><video :src="cardbag_theme.zhufu_mp4" controls></video>
				</view>
				<image class="bag-red-head" :src="cardbag.present_memberid_headimg" mode=""></image>
				<text class="bag-red-title">{{cardbag.present_memberid_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	const audioCtx = uni.createAudioContext('')

	innerAudioContext.autoplay = true;
	export default {
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
				schedule: '0',
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
			let old_cardbag_number = e.old_cardbag_number
			var data = '{"cardbag_number":"' + old_cardbag_number + '","cardbag_detail_id":"0"}';
			var action = "get_cardbag_detail";
			this.$utils.post(action, data).then(res => {
				console.log('礼包信息')
				console.log(res)
				this.cardbag_in_people = res.cardbag_in_people
				this.cardbag = res.cardbag
				this.cardbag_theme = res.cardbag_theme
				this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
				this.price=res.cardbag.price
				if (res.cardbag_theme.zhufu_type == "1") {
					this.gift = '1'
				} else if (res.cardbag_theme.zhufu_type == "0") {
					this.gift = '0'
				} else {
					this.gift = '2'
				}
			})
			
            var data = '{"cardbag_number":"' + cardbag_number + '","cardbag_detail_id":"0"}';
            var action = "get_cardbag_detail";
            this.$utils.post(action, data).then(res => {
            	console.log('礼包信息')
            	console.log(res)
            	this.cardbag_in_people = res.cardbag_in_people
            	this.cardbag = res.cardbag
            	this.cardbag_theme = res.cardbag_theme
            	this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
            	this.price=res.cardbag.price
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
			address: function(e) {
				//let cardbag_number = e.currentTarget.dataset.cardbag_number;
				let cardbag_number = this.cardbag_number
				uni.navigateTo({
					url: '../ordeDetails/ordeDetails?cardbag_number=' + cardbag_number
				})
			},
			givee: function(e) {
				// let cardbag_number = e.currentTarget.dataset.cardbag_number;
				let cardbag_number = this.cardbag_number
				let price = this.price;
				let status = this.status;


				uni.setStorageSync('cardbag_theme', this.cardbag_theme)


				var data = '{"cardbag_number":"' + this.cardbag_number + '","zhufu_theme_id":"' + this
					.cardbag_theme
					.id + '","memberid":"' + this.cardbag.present_memberid + '"}';
				console.log(data)
				var action = 'save_shoudao_zhufu_theme';
				this.$utils.post(action, data).then(res => {
					console.log(res)
					if (res.sta == 1) {
						if (this.cardbag.type == 3) {

							var data = '{"cardbag_number":"' + cardbag_number + '"}';
							var action = 'save_cardbag_wanfa';
							this.$utils.post(action, data).then(res => {
								console.log('定时转成直接', res)
								if (res.sta == 1) {

									var data = '{"cardbag_number":"' + cardbag_number + '"}';
									var action = 'share_cardbag';
									console.log(data)

									this.$utils.post(action, data).then(res => {
										console.log('赠送好友', res)
										if (res.sta == 1) {
											uni.showToast({
												title: res.msg,
												icon: 'success',
												mask: true,
												success: (res) => {
													setTimeout(function(e) {
														uni.navigateTo({
															url: '../success/success?cardbag_number=' +
																cardbag_number +
																'&price=' +
																price
														})
													}, 1500)
												}
											})
										}
									})
								}
							})
						} else {
							// let cardbag_number = e.currentTarget.dataset.cardbag_number;
							let cardbag_number = this.cardbag_number
							let price = this.price;
							let status = this.status;

							var data = '{"cardbag_number":"' + this.cardbag_number + '"}';
							var action = 'share_cardbag';
							console.log(data)
							this.$utils.post(action, data).then(res => {
								console.log('赠送好友', res)
								
								if (res.sta == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'success',
										mask: true,
										success: (res) => {
											setTimeout(function(e) {
												uni.navigateTo({
													url: '../success/success?cardbag_number=' +
														cardbag_number +
														'&price=' +
														price
												})
											}, 1500)
										}
									})
								}
							})
						}



					}
				})
			},
			// 播放录音
			audioPlay: function() {
				// 开始播放
				this.stop = 1;
				// 左边小喇叭动
				// this.radio = 1;
				this.radio = !this.radio

				let that = this;
				console.log('播放')
                let zhufu_mp3=this.zhufu_mp3
				// 播放路径
				innerAudioContext.src = zhufu_mp3
				innerAudioContext.play();

				setTimeout(() => {

					innerAudioContext.currentTime

					innerAudioContext.onTimeUpdate((res) => {
						console.log('总时长', innerAudioContext.duration)
						console.log('当前播放进度', innerAudioContext.currentTime)

						// 已播放进度条
						let schedule = innerAudioContext.currentTime / innerAudioContext.duration *
							100;
						// 白色圆点
						let x = (that.width * 0.57 - that.width * 0.57 * 0.07) * schedule / 100;

						if (this.stop == 0) {

						} else {
							// 白色圆点
							this.movable_x = x;
							// 进度条
							this.schedule = schedule;
							this.duration = innerAudioContext.duration;
							console.log(innerAudioContext.duration / innerAudioContext.currentTime)
						}
						// 播放结束
						innerAudioContext.onEnded((res) => {
							console.log('结束', res)
							// 左边小喇叭停止
							that.radio = 0;
							this.stop=0
							// 按钮    最右边
							this.movable_x = that.width * 0.57;
							// 进度条  满
							this.schedule = 100
						})


					})
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
		position: relative;
		top: 50rpx;
		left: 150rpx;
	}

	.bag-con {
		width: 90%;
		height: 2000rpx;
		background-color: #fff;
		position: relative;
		top: 160rpx;
		left: 35rpx;
		border-radius: 10rpx;
	}

	.bag-head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		position: absolute;
		top: -60rpx;
		left: 288rpx;
	}

	.bag-font {
		position: absolute;
		top: 100rpx;
		left: 195rpx;
	}

	.bag-tea {
		width: 320rpx;
		height: 350rpx;
		border: 1px solid #CCB586;
		position: absolute;
		top: 100px;
		left: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bag-tea-img {
		width: 200rpx;
		height: 200rpx;
	}

	.bag-tea-title {
		position: absolute;
		top: 300rpx;
	}

	.bag-gift {
		width: 90%;
		height: 204rpx;
		background-color: #F8F8F8;
		position: absolute;
		margin-top: 350px;
		left: 35rpx;
	}

	.bag-gift-title {
		width: 100%;
		height: 100rpx;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		align-items: center;
	}

	.bag-gift-title-font {
		margin-left: 40rpx;
	}

	.bag-gift-title-head {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-left: 40rpx;
		margin-right: 20rpx;
	}

	.bag-gift-title-tea {
		position: absolute;
		right: 40rpx;
	}

	.transfer {
		width: 250rpx;
		border-radius: 50rpx;
		background-color: #EFEFEF;
		position: absolute;
		margin-top: 490px;
		left: 50rpx;
	}

	button[type=default] {
		color: #F33E2B;
	}

	.write {
		width: 250rpx;
		border-radius: 50rpx;
		position: absolute;
		margin-top: 490px;
		left: 350rpx;
	}

	.bag-red {
		width: 70%;
		height: 700rpx;
		/* background-color: #00BFFF; */
		position: relative;
		top: 1200rpx;
		margin-left: 100rpx;
	}

	.bag-red-img {
		width: 100%;
		height: 700rpx;
	}

	.bag-red-head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position: absolute;
		top: 30rpx;
		left: 30rpx;
	}

	.bag-red-title {
		position: absolute;
		top: 60rpx;
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
		width: 425rpx;
		height: 150rpx;
		line-height: 35rpx;
		position: absolute;
		top: 145rpx;
		left: 30rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.many {
		width: 100%;
		height: 580rpx;
		/* border: 1px solid #000000; */
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: absolute;
		top: 80px;
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
		width: 180rpx;
		height: 180rpx;
		position: absolute;
		top: 160rpx;
		left: 140rpx;
	}

	.sound-san {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		top: 245rpx;
		left: 190rpx;
	}

	.sound-on {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		top: 110rpx;
		left: 240rpx;
	}

	.slider {
		width: 400rpx;
		position: absolute;
		top: 400rpx;
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
		width: 400rpx;
		position: absolute;
		top: 100rpx;
	}
	.b{
		width: 410rpx;
		height: 50rpx;
		margin-top: -26rpx;
	}
	.template-btm-information-video video{
		width: 466rpx;
	}
	.rotate{
		transform: translate(-40rpx,20rpx);
		animation: 2s;
	}
</style>
