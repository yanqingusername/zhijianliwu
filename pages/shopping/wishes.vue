<template>
	<view class="wishes">
		<view class="wishes-gift">
			<text>打开礼包模板三选一</text>
		</view>
		<view class="">
			<view>
					
				<view class="inv-h-w">
					<radio-group @change="radio" class="template-btm-choose-input flex-between ">
					<view :class="['inv-h',Inv==0?'inv-h-se':'']"  @click="Inv=0">
						<radio value="语音" :checked="textt"></radio>
						<!-- <text @click="radios" v-if="img==0" class="iconfont icon-ico2"></text>
						<text v-else="img==1" @click="radios" class="iconfont icon-ico1 font"></text> -->
						<text>福语</text>
					</view>
					<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">
						<radio value="语音" :checked="auto"></radio>
						<!-- <text @click="radio1" class="iconfont icon-ico2"></text>
						<text v-show="!imgs" @click="radio1" class="iconfont icon-ico1  say"></text> -->
						<text>语音</text>
					</view>
					<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">
						<radio value="视频" :checked="videoo"></radio>
						<!-- <text @click="radio2" class="iconfont icon-ico2"></text>
						<text v-show="!imgs2" @click="radio2" class="iconfont icon-ico1 video"></text> -->
						<text>视频</text>
					</view>
					</radio-group>
					<view class="wishes-card1"  v-show="Inv == 0">
						<view class="wishes-font">
							<input type="text" @input="alt" maxlength="20" :value="zhufu_msg">
							<image class="wishes-font-edit"
								src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/wishes/write_icon.png"
								mode=""></image>
						</view>
						<view class="">
							<image class="wishes-fu"
								src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/wishes/mb_fuyu.png" mode="">
							</image>
						</view>
						<view class="">
							<image class="wishes-fu-head" :src="sign.head_img" mode=""></image>
							<text class="wishes-fu-head-title">{{sign.name}}</text>
							<text class="wishes-name zhufu">{{zhufu_msg}}</text>
							<view class="wishes-name wish">
								{{send_talk_msg}}
							</view>
							<view class="wishes-line">
								<text class="wishes-line-font">熊猫送了您一份礼物赶紧领取吧</text>
							</view>
						</view>
					</view>
					<view class="wishes-card1" v-show="Inv == 1">



						<view class="" v-if="begin==3" @longpress="start" @touchend="stopp">
							<text class="iconfont icon-luyin yin"></text>
							<view class="wishes-chongxin" type="warn">重新录音</view>
						</view>



						<view class="" v-else-if="begin==1" @longpress="start" @touchend="stopp">
							<view class="wishes-say-btn" type="warn">按住录音</view>
							<text class="iconfont icon-luyin yin"></text>
						</view>

						<view class="" v-else @tap="stopp">
							<text class="iconfont icon-luyin yin"></text>
							<view class="wishes-say-btn">停止 录音</view>
						</view>

						<view class="say-img">
							<image class="say-img-bg" :src="$utils.osspath_url('/xcx-static/wishes/mb_recording.png')"
								mode=""></image>
							<image class="wishes-fu-head says" :src="sign.head_img" mode=""></image>
							<text class="wishes-fu-head-title">{{sign.name}}</text>
							<image class="say-img-open" :src="$utils.osspath_url('/xcx-static/wishes/cd.png')" mode="">
							</image>
							
							<image class="sound-on" @click="audioPlay" :class="stop==0?'sound-on':'rotate'" :src="$utils.osspath_url('/xcx-static/wishes/on.png')" mode=""></image>
							
							<image class="say-img-off" @click="audioPlay" v-show="!radio"
								:src="$utils.osspath_url('/xcx-static/wishes/piay_icon1.png')" mode=""></image>
							<image class="say-img-off" @click="audioPlay" v-show="radio" 
								:src="$utils.osspath_url('/xcx-static/wishes/piay_icon.png')" mode=""></image>
							
								<view class="uni-padding-wrap" @click="audioPlay">
									<movable-area class="progress" :style="'width:'+w+'px'">
										<!-- 按钮 -->
										<movable-view direction="horizontal" damping="1000" @change="scroll" @touchstart="star" @touchend="to" class="progress-one"
										 :x="movable_x">
											<view class="progress-view">
												<view class="progress-circular"></view>
											</view>
										</movable-view>
									</movable-area>
									<!-- 进度条 -->
									<progress :percent="schedule" class="b"  duration data-index="index" activeColor='#D8D8D8' backgroundColor='#767676'
									 border-radius="50" stroke-width="8" />
									 <view class="duration">
									 	<!-- {{duration}} -->
									 </view> 
								</view>
							
							<view class="wishes-line tan">
								<text class="wishes-line-font">熊猫送了您一份礼物赶紧领取吧</text>
							</view>
						</view>
					</view>
					<view class="wishes-card1" v-show="Inv == 2">
						<view class="video-btn">
							<button class="video-btn-top" @click="vide">上传视频</button>
							<button class="video-btn-top" type="warn" @click="vide">录制视频</button>
							<text class="iconfont icon-M_shipinzhuanyinpin68 videos"></text>
							<text class="iconfont icon-luzhi videos luzhi"></text>
						</view>
						<view class="wishes-video">
							<text class="proposal">建议上传/录制竖版视频展示效果更佳!</text>
							<image class="wishes-video-bg" :src="$utils.osspath_url('/xcx-static/wishes/mb_movie.png')"
								mode=""></image>
							<view class="template-btm-information-video"><video :src="zhufu_mp4" controls></video>
							<!-- zhufu_mp4 -->
							</view>
							<image class="wishes-fu-head says videoimg" :src="sign.head_img" mode=""></image>
							<text class="wishes-fu-head-title videoimg">{{sign.name}}</text>
							<view class="wishes-line tan">
								<text class="wishes-line-font">熊猫送了您一份礼物赶紧领取吧</text>
							</view>
						</view>
					</view>
				</view>
				<button class="wishes-btn" type="warn" @click="wish">使用该祝福方式</button>
			</view>
		</view>

	</view>
</template>

<script>
	import config from '../../common/config.js';
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				Inv: 0,
				value: '福语',
				val: '福语',
				send_talk_msg: '',
				theme_background: '',
				zhufu_theme_id: '',
				zhufu_msg: '大吉大利 恭喜发财',
				sign: '',
				begin: 1,
				radio: true,
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
				zhufu_mp4:''
			}
		},
		onLoad: function(e) {
			this.sign = uni.getStorageSync('sign');
			this.url = config.URL;
			let that = this;
			console.log('份数', e)
			this.fenshu = e.fenshu;
    
			// 音频用到的宽度
			uni.getSystemInfo({
				success: (res) => {
					that.width = res.screenWidth,
						that.w = res.screenWidth * 0.5
				},
			})
         
			// 录音管理
			let self = this;
			recorderManager.onStop(function(res) {
				uni.showLoading({
					title: '上传中'
				})
				console.log(res)
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;

				uni.uploadFile({
					url: 'https://zhijianlw.com/api.php/index/upload_file', //仅为示例，非真实的接口地址
					filePath: res.tempFilePath,
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						self.begin = 3
						console.log('上传音频', uploadFileRes)
						let file = JSON.parse(uploadFileRes.data)
						if (file.sta == 1) {
							uni.hideLoading()
							console.log('重置')
							// 进度条位置
							self.schedule = 0;
							// 按钮位置
							self.movable_x = 0;
							//  跳转进度
							innerAudioContext.seek(0)


							self.zhufu_mp3 = self.$utils.imageUrl(file.filename);
							console.log('上传成功', file)
							console.log(that.url + file.filename)
						} else {
							uni.showToast({
								title: '上传失败',
								icon: 'none',
								mask: 'true',
							})
						}

					},
					fail: (res) => {
						self.begin = 1;
					}
				});
			});

		},
		methods: {
			// 福语文字编辑
			// 发送模板文字编辑
			alt: function(e) {
				this.zhufu_msg = e.detail.value;
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			radioChange(e) {
				console.log('type:' + e.detail.value);
				this.sex = e.detail.value;
			},

			//开始录音
			start: function() {
				// this.begin = 0;
				console.log('开始录音');
				recorderManager.start();
				uni.showLoading({
					title: '正在录音中'
				});
			},
			//结束录音  
			stopp: function() {
				// this.begin = 1;

				uni.hideLoading();
				console.log('结束录音')
				recorderManager.stop();
			},
			// 播放录音
			audioPlay: function() {
				// 开始播放
				this.stop = 1;
				// 左边小喇叭动
				// this.radio = 1;
				this.radio=!this.radio 

				let that = this;
				console.log('播放')

				// 播放路径
				innerAudioContext.src = this.voicePath
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
						let x = (that.width * 0.5 - that.width * 0.5 * 0.07) * schedule / 100;

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
							// 按钮    最右边
							// this.movable_x = that.width * 0.57;
							this.movable_x = that.width * 0.5;
							// 进度条  满
							this.schedule = 100
							this.stop=0
						})


					})
				})

			},
			// 暂停录音
			audioPause: function(e) {
				this.stop = 0;
				this.click = 0;
				console.log('暂停')
				innerAudioContext.pause()
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

			vide: function(e) {
				console.log(e)
				var that = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log('视频', res)

						const tempFilePaths = res.tempFilePath;

						uni.showLoading({
							title: '上传中'
						})

						uni.uploadFile({
							url: 'https://zhijianlw.com/api.php/index/upload_file', //仅为示例，非真实的接口地址
							filePath: tempFilePaths,
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								if (uploadFileRes.statusCode == 200) {
									let file = JSON.parse(uploadFileRes.data)
									uni.hideLoading();
									that.zhufu_mp4 = that.$utils.imageUrl(file.filename);
									console.log(file)
								} else if (uploadFileRes.statusCode == 413) {
									uni.hideLoading();
									uni.showToast({
										title: '视频过大',
										icon: 'none',
										mask: 'true',
									})

								} else {
									uni.hideLoading();
									uni.showToast({
										title: '上传失败',
										icon: 'none',
										mask: 'true',
									})
								}
							},
							fail: (res) => {
								console.log(res)

							}
						});
					},
					fail: function(res) {
						console.log('失败', res)
					}
				})
			},
			radio: function(e) {
				// 显示对应文字和判断
				this.value = e.detail.value;
				this.val = e.detail.value;
			},
			// sliderChange(e) {
			// 	console.log('value 发生变化：' + e.detail.value)
			// },
			wish: function(e) {
				var that = this;
				var memberid = uni.getStorageSync('id');
				var zhufu_theme_id = uni.getStorageSync('zhufu_theme_id');
				var theme_type = uni.getStorageSync('theme_type');
				var send_talk_msg = uni.getStorageSync('send_talk_msg');
				this.memberid = memberid;
				this.zhufu_theme_id = zhufu_theme_id
				this.theme_type = theme_type
				this.send_talk_msg = send_talk_msg
				var data = {
					zhufu_theme_id: this.zhufu_theme_id,
					memberid: this.memberid,
					theme_type: this.theme_type,
					send_talk_msg: this.send_talk_msg,
					zhufu_type: 0,
					theme_background: this.theme_background,
					update_type: 1
				};
				if (this.Inv == 0) {
					data['zhufu_type'] = 0;
					data['zhufu_msg'] = this.zhufu_msg;
				} else if (this.Inv == 1) {
					data['zhufu_type'] = 1;
					data['zhufu_mp3'] = this.zhufu_mp3;
				} else {
					data['zhufu_type'] = 2;
					data['zhufu_mp4'] = this.zhufu_mp4;
				}
				console.log(data)

				var action = 'save_zhufu_theme';

				this.$utils.post(action, JSON.stringify(data)).then(res => {
					console.log('修改祝福模板', res)
					if (res.sta == 0) {
						uni.showToast({
							title: res.msg,
							icon: "none",
							mask: 'true',
							success: (res) => {

							}
						})
						this.send_talk_msg = send_talk_msg
					} else {
						uni.showToast({
							title: '设置成功',
							icon: "success",
							mask: 'true',
							success: (res) => {
								setTimeout(function(e) {
									uni.navigateBack({
										url: 1
									})
								}, 1500)
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url('../../static/font/iconfont.css');

	/* 打开礼包模板三选一 */
	.wishes-gift {
		width: 100%;
		height: 80rpx;
		line-height: 40px;
		display: flex;
		justify-content: center;
		color: #333333;
		font-size: 16px;
		font-weight: bold;
	}

	/* 文字 语音 视频 导航样式 */
	.inv-h-w {
		height: 100rpx;
		display: flex;
		position: relative;
	}

	.inv-h {
		font-size: 30rpx;
		flex: 1;
		text-align: center;
		color: #333333;
		height: 100rpx;
		line-height: 100rpx;
	}

	page {
		background-color: #F2F2F2;
	}

	.wishes-card1 {
		position: absolute;
		top: 100rpx;
		left: 10rpx;
	}

	/* 财源滚滚 */
	.wishes-font {
		width: 490rpx;
		height: 130rpx;
		background-color: #fff;
		border-radius: 5px;
		position: relative;
		top: 10rpx;
		left: 120rpx;
	}

	.wishes-font-con {
		width: 83%;
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		font-size: 12px;
		color: #999999;
	}

	.wishes-font-edit {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 90rpx;
		left: 420rpx;
	}

	.wan {
		position: absolute;
		top: 50rpx;
		left: 10rpx;
	}

	/* 导航图标 */
	.font {
		color: #EC1815;
	}

	.say {
		color: #EC1815;
		position: absolute;
		top: 0rpx;
		left: 330rpx;
	}

	.video {
		color: #EC1815;
		position: absolute;
		top: 0rpx;
		left: 580rpx;
	}

	/* 红包部分 */
	.wishes-fu {
		width: 490rpx;
		height: 700rpx;
		position: relative;
		top: 50rpx;
		left: 120rpx;
	}

	.wishes-fu-head {
		width: 100rpx;
		height: 100rpx;
		position: relative;
		top: -620rpx;
		left: 150rpx;
		border-radius: 50%;
	}

	.wishes-fu-head-title {
		position: relative;
		top: -660rpx;
		left: 160rpx;
		color: #D3A97A;
		font-size: 16px;
	}

	.wishes-name {
		position: relative;
		top: -580rpx;
		left: 140rpx;
		color: #F6DBA5;
	}

	.wish {
		width: 380rpx;
		position: relative;
		top: -545rpx;
		left: 180rpx;
	}

	.win {
		position: relative;
		top: -520rpx;
		margin-left: 110rpx;
	}

	.wishes-line {
		width: 180px;
		height: 40rpx;
		line-height: 17px;
		background-color: #000;
		position: absolute;
		top: 650rpx;
		left: 120rpx;
		opacity: 0.8;
		border-radius: 0 5px 5px 0;
	}

	.wishes-line-font {
		color: #BD9365;
		font-size: 12px;
		padding-left: 10rpx;
	}

	/* 语音 */
	.wishes-say-btn {
		width: 400rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #fff;
		margin-top: 40rpx;
		margin-left: 180rpx;
		background-color: #F55856;
	}

	.yin {
		font-size: 18px;
		position: absolute;
		top: 60rpx;
		left: 270rpx;
		color: #fff;
		z-index: 99;
	}

	.say-img {
		width: 490rpx;
		height: 720rpx;
		position: relative;
		top: 40rpx;
		left: 132rpx;
	}

	.say-img-bg {
		width: 490rpx;
		height: 720rpx;
	}

	.says {
		position: absolute;
		top: 30rpx;
		left: 30rpx;
	}

	.say-img-open {
		width: 200rpx;
		height: 200rpx;
		position: absolute;
		top: 160rpx;
		left: 146rpx;
	}

	.say-img-off {
		width: 89rpx;
		height: 89rpx;
		position: absolute;
		top: 252rpx;
		left: 204rpx;
	}

	.uni-padding-wrap {
		width: 500rpx;
		position: absolute;
		top: 360rpx;
		left: 5rpx;
	}

	.tan {
		position: absolute;
		top: 450rpx;
		left: 0rpx;
	}

	.wishes-chongxin {
		width: 400rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #fff;
		margin-top: 40rpx;
		margin-left: 180rpx;
		background-color: #F55856;
	}
    .progress-one {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		top: 116rpx;
		left: 0rpx;
	}
	.b {
		width: 360rpx;
		height: 50rpx; 
		border-radius: 10rpx !important;
		margin-top: -26rpx;
		margin-left: 10rpx;
	
	}
	.sound-on{
		width: 90rpx;
		height:90rpx;
		position: absolute;
		top: 90rpx;
		left: 260rpx;
	}
	.rotate{
		transform: translate(-40rpx,20rpx);
		animation: 2s;
	}
	/* 视频 */
	.video-btn {
		width: 650rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 50rpx;
	}

	.template-btm-information-video {
		position: absolute;
		top: 108rpx;
	}

	.template-btm-information-video video {
		width: 430rpx;
		height: 260rpx;
		margin-left: 24rpx;
	}

	.video-btn-top {
		width: 280rpx;
		background-color: #F55856;
		color: #fff;
		padding-left: 70rpx;
	}

	.videos {
		position: absolute;
		left: 100rpx;
		font-size: 35px;
		color: #fff;
	}

	.luzhi {
		position: absolute;
		left: 430rpx;
		font-size: 25px;
	}

	.wishes-video {
		width: 480rpx;
		height: 700rpx;
		position: relative;
		top: 80rpx;
		left: 145rpx;
	}

	.wishes-video-bg {
		width: 480rpx;
		height: 700rpx;
	}

	.videoimg {
		margin-left: -10rpx;
		margin-top: -10rpx;
	}

	/* 使用该祝福方式按钮 */
	.wishes-btn {
		width: 400rpx;
		margin-top: 907rpx;
		margin-left: 175rpx;
	}

	.wishes-font input {
		width: 450rpx;
		height: 50rpx;
		font-size: 12px;
		color: #9D9D9D;
	}

	.zhufu {
		margin-left: -60rpx;
	}
	.proposal{
		position: absolute;
		top: -55rpx;
		color: #999999;
	}
	.duration{
		color: #fff;
		position: absolute;
		top: 2rpx;
		right: 90rpx;
		font-size: 10px;
	}
	radio .wx-radio-input {
		width: 35rpx;
		height: 35rpx;
		background-color: #FFF;
		border-radius: 50rpx;
	}
	
	radio .wx-radio-input.wx-radio-input-checked::before {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50rpx;
		line-height: 35rpx;
		text-align: center;
		font-size: 20rpx;
		color: #595656;
		background: #FFF;
		transform: translate(-50%, -50%) scale(1);
		border: none;
	}
</style>
