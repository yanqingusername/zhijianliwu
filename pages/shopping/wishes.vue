<template>
	<view class="wishes">
		<view class="wishes-gift">
			<text>打开礼包模板三选一</text>
		</view>
		<view class="">
			<view>
				<view class="inv-h-w">
					<view>
						<radio-group @change="radiofun" class="template-btm-choose-input">
							<view :class="['inv-h',Inv==0?'inv-h-se':'']"  @click="changeInv(0)">
								<view class="a-circle"><text></text></view>
								<radio style="display: none" value="语音" :checked="textt"></radio>
								<!-- <text @click="radios" v-if="img==0" class="iconfont icon-ico2"></text>
								<text v-else="img==1" @click="radios" class="iconfont icon-ico1 font"></text> -->
								<text>福语</text>
							</view>
							<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="changeInv(1)">
								<view class="a-circle"><text></text></view>
								<radio style="display: none" value="语音" :checked="auto"></radio>
								<!-- <text @click="radio1" class="iconfont icon-ico2"></text>
								<text v-show="!imgs" @click="radio1" class="iconfont icon-ico1  say"></text> -->
								<text>语音</text>
							</view>
							<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="changeInv(2)">
								<view class="a-circle"><text></text></view>
								<radio style="display: none" value="视频" :checked="videoo"></radio>
								<!-- <text @click="radio2" class="iconfont icon-ico2"></text>
								<text v-show="!imgs2" @click="radio2" class="iconfont icon-ico1 video"></text> -->
								<text>视频</text>
							</view>
						</radio-group>
					</view>
					
					<view class="wishes-card1"  v-show="Inv == 0">
						<view class="wishes-font">
							<input type="text" @input="alt" maxlength="20" :focus="isFocus" @blur="isFocus = false" :value="zhufu_msg">
							<view class="bottom-icon">
								<text class="icon icon-refresh"></text>
								<text @click="getShowZhufuList">换一换</text>
								<text class="icon icon-edit wishes-font-edit" @click="editText"></text>
							</view>
						</view>
						
						<view style="position: relative;">
							<view class="">
								<image class="wishes-fu"
									src="https://zhijianlw.com/static/web/img/mb_fuyu_2021_08_30.png" mode="widthFix">
								</image>
							</view>
							<view class="infor">
								<view class="img-infor">
									<image class="wishes-fu-head" :src="sign.head_img" mode=""></image>
									<text class="wishes-fu-head-title">{{sign.name}}</text>
								</view>
								
								<view class="wishes-name zhufu">{{zhufu_msg}}</view>
								<!-- <view class="wishes-name wish">{{send_talk_msg}}</view> -->
							</view>
							<view class="wishes-line">
								<text class="wishes-line-font">熊猫送了您一份礼物赶紧领取吧</text>
							</view>
						</view>
					</view>
					<view class="wishes-card1" v-show="Inv == 1">
						<!-- <view class="" v-if="begin==3" @longpress="start" @touchend="stopp">
							<view class="wishes-say-btn" type="warn"><text style="color: #fff; " class="iconfont icon-luyin"></text>重新录音</view>
						</view>

						<view class="" v-else-if="begin==1" @longpress="start" @touchend="stopp">
							<view class="wishes-say-btn" type="warn"><text style="color: #fff; " class="iconfont icon-luyin"></text>按住录音</view>
						</view>
						<view class="" v-else @tap="stopp">
							<view class="wishes-say-btn" type="warn"><text style="color: #fff; " class="iconfont icon-luyin"></text>停止录音</view>
						</view> -->

						<view class="say-img">
							<image class="say-img-bg" src="https://zhijianlw.com/static/web/img/mb_recording_2021_08_30.png" mode="widthFix"></image>
							<view class="infor">
								<view class="img-infor">
									<image class="wishes-fu-head says" :src="sign.head_img" mode=""></image>
									<text class="wishes-fu-head-title">{{sign.name}}</text>
								</view>
								<!-- <view class="audio-box">
									<view class="audio-img">
										<image class="say-img-open" :src="$utils.osspath_url('/xcx-static/wishes/cd.png')" mode="widthFix"></image>
										
										<image class="sound-on" @click="audioPlay" :class="radio ?'sound-on':'rotate'" :src="$utils.osspath_url('/xcx-static/wishes/on.png')" mode="widthFix"></image>
										
										<image class="say-img-off" @click="audioPlay" v-if="radio" :src="$utils.osspath_url('/xcx-static/wishes/piay_icon1.png')" mode=""></image>
										<image class="say-img-off" @click="audioPlay" v-else :src="$utils.osspath_url('/xcx-static/wishes/piay_icon.png')" mode=""></image>
									</view>
									
									<view class="uni-padding-wrap" @click="audioPlay">
										<view class="duration">
										</view> 
										<slider :value="schedule" step="1" activeColor="#D8D8D8" backgroundColor="#767676 " block-color="#D8D8D8" block-size="12"/>
									</view>
								</view> -->
								<view class="audio-box-view">
									<view class="audio-img-view">
										<image class="sound-img-bg1" src="https://zhijianlw.com/static/web/img/icon-cd-2021-09-08-01.png" mode=""></image>
										<arprogress v-if="begin==5" class="sound-img-arprogress" :percent="schedule" inactiveColor='#EEEEEE' activeColor="#F32C14" borderWidth='7' width="284" bgColor="transparent"></arprogress>
										<image v-if="begin==1" @click="start" class="sound-img-bg2" src="https://zhijianlw.com/static/web/img/icon-play-2021-09-08-02.png" mode=""></image>
										<!-- <image v-else-if="begin==3" class="sound-img-bg2" src="https://zhijianlw.com/static/web/img/icon-play-2021-09-08-02.png" mode=""></image> -->
										<image v-else-if="begin==2" @click="stopp" class="sound-img-bg2" src="https://zhijianlw.com/static/web/img/icon-play-2021-09-08-03.png" mode=""></image>
										
										<image v-else-if="begin==4" class="sound-img-bg2" @click="audioPlay" :data-begin="4" src="https://zhijianlw.com/static/web/img/icon-play-2021-09-08-04.png" mode=""></image>
										<image v-else-if="begin==5" class="sound-img-bg2" @click="audioStop" :data-begin="5" src="https://zhijianlw.com/static/web/img/icon-play-2021-09-08-05.png" mode=""></image>
									</view>
									
									<view class="audio-box-view-wrap">
										<view class="audio-box-view-tiem" v-if="begin==1 || begin==2">
										    <view class="em" v-for="(item,index) in 11" :key="index" v-if="begin==2"></view><view style="margin: 0rpx 20rpx;">{{timecount}}</view><view v-if="begin==2" class="em" v-for="(item,index) in 11" :key="index"></view>
										</view> 
										<view class="audio-box-view-tiem" v-if="begin==5 || begin==4">
										    <view>{{timecount}}</view><view v-if="begin==5">/{{totalDuration}}</view>
										</view> 
										<view class="audio-box-view-text" v-if="begin==1 || begin==2">开始录音</view> 
										<view class="audio-box-view-text" style="color: EEEEEE;" @click="start" v-if="begin==4 || begin==5">重新录音</view>
										
									</view>
								</view>
							</view>
							
							<view class="wishes-line">
								<text class="wishes-line-font">熊猫送了您一份礼物赶紧领取吧</text>
							</view>
						</view>
					</view>
					
					<!-- 视频 -->
					<view class="wishes-card1" v-show="Inv == 2">
						<view class="video-btn">
							<view>
								<button class="video-btn-top" @click="vide"><text style="font-size: 44rpx;" class="iconfont icon-M_shipinzhuanyinpin68 videos"></text><text>上传视频</text></button>
							</view>
							<view>
								
								<button class="video-btn-top" type="warn" @click="vide"><text class="iconfont icon-luzhi videos luzhi"></text><text>录制视频</text></button>
							</view>
							
						</view>							
						<view class="proposal">建议上传/录制竖版视频展示效果更佳!</view>
						<view class="wishes-video">
							<!-- <image class="wishes-video-bg" :src="$utils.osspath_url('/xcx-static/wishes/mb_movie.png')" mode="widthFix"></image> -->
							<!-- <image class="wishes-video-bg-bottom" src="https://zhijianlw.com/static/web/img/mb_movie_b.png" mode="widthFix"></image>
							<image class="wishes-video-bg" src="https://zhijianlw.com/static/web/img/mb_movie-2.png" mode="widthFix"></image> -->
							<image class="wishes-video-bg" src="https://zhijianlw.com/static/web/img/mb_movie_2021_08_30.png" mode="widthFix"></image>
							<view class="z-template-btm-information-video">
								<!-- 有视频才能点击播放按钮 -->
								<image v-if="showvideoPlayBtn" class="say-img-off" @click="videoPlay" :src="$utils.osspath_url('/xcx-static/wishes/piay_icon1.png')" mode=""></image>
								<video @play="videoPlay1" @timeupdate="videoTimeUpdateEvent" @click="videoClick" id="video1" :src="zhufu_mp4" controls=false v-if="videoShow"></video>
								<!-- 假视频 -->
								<!-- <video v-else src="https://vd4.bdstatic.com/mda-mh111pqinqwbcaim/fhd/cae_h264_nowatermark/1627865408525244257/mda-mh111pqinqwbcaim.mp4?v_from_s=hkapp-haokan-nanjing&auth_key=1627905918-0-0-cee74aed351f3977de54a964e4102ffe&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=" controls></video> -->
								
								<!-- zhufu_mp4 -->
							</view>
							<view class="infor">
								<view class="img-infor">
									<image class="wishes-fu-head says videoimg" :src="sign.head_img" mode=""></image>
									<text class="wishes-fu-head-title videoimg">{{sign.name}}</text>
								</view>
							</view>
							<view class="wishes-line">
								<text class="wishes-line-font">熊猫送了您一份礼物赶紧领取吧</text>
							</view>
						</view>
					</view>
				</view>
				<view style="text-align: center; padding: 54rpx 0 50rpx;">
					<button class="wishes-btn" type="warn" @click="wish">使用该祝福方式</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import arprogress from '@/components/ar-circle-progress/ar-circle-progress.vue';
	import config from '../../common/config.js';
	const recorderManager = uni.getRecorderManager()
	const innerAudioContext = uni.createInnerAudioContext()
	
	innerAudioContext.autoplay = true;
	export default {
		components:{
			"arprogress": arprogress,
		},
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
				videoShow: false,
				voicePath: null,
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
				statusVideo: false,   // 视频博凡状态
				zhufu_mp4:'',   // 视频url
				showvideoPlayBtn: true,   // 视频播放按钮
				videoTime: 0,   // 视频总时长
				innerVideoContext: null,   // 视频
				isFocus: false,
				timecount: '00:00:00',
				hour: 0,
				minute: 0,
				second: 0,
				timer:'',
				totalDuration: ''
			}
		},
		onLoad: function(e) {
			this.sign = uni.getStorageSync('sign');
			this.url = config.URL;
			let that = this;
			console.log('份数', e)
			this.fenshu = e.fenshu;
			
			// 获取祝福语
			this.getShowZhufuList();
			// 得到自定义祝福
			this.getCustomZhufuTheme();
    
			// 音频用到的宽度
			uni.getSystemInfo({
				success: (res) => {
					that.width = res.screenWidth,
						that.w = res.screenWidth * 0.5
				},
			})
         
			// 录音管理
			let self = this;
			console.log(recorderManager)
			recorderManager.onStop(function(res) {
				console.log(3333)
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
						self.begin = 4
						self.schedule = 0;
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
						self.schedule = 0;
					}
				});
			});

		},
		methods: {
			editText(){
				setTimeout(()=>{
					this.isFocus = true;
				},0);
			},
			getShowZhufuList(){
				var data = JSON.stringify({});
				var action = 'show_zhufu_list';
				var controller = 'zhufu';
				this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta ==1){
						this.zhufu_msg = res.rs.info;
					}
				});
			},
			getCustomZhufuTheme(){
				var memberid = uni.getStorageSync('id');
				var data = JSON.stringify({
					memberid: memberid
				});
				var action = 'get_custom_zhufu_theme';
				var controller = 'zhufu';
				this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta ==1){
						console.log(res.rs)
						this.Inv = res.rs.zhufu_type;
						this.zhufu_msg = res.rs.zhufu_msg;
						this.voicePath = res.rs.zhufu_mp3;
						this.zhufu_mp4 = res.rs.zhufu_mp4;
						if(res.rs.zhufu_mp3){
							this.begin = 4
							this.schedule = 0;
						}else{
							this.begin = 1
						}
					}
				});
			},
			changeInv: function(v){
				this.Inv = v;
				if(this.innerVideoContext){
					this.showvideoPlayBtn = true;
					this.innerVideoContext.pause();
					this.statusVideo = false;
				}
				
			},
			openSetting(authouName){
				uni.showModal({
					title:'授权',
					content:'获取授权'+ authouName + '失败,是否前往授权设置？',
					success:function(result){
						if(result.confirm){
							uni.openSetting();
						}
		            },
					fail:function(){
			            uni.showToast({
			                title:'系统错误！',
			                icon:'none'
			            });
			        }
			    })
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
			//开始录音
			start: function() {
				recorderManager.stop();
				innerAudioContext.offTimeUpdate((res) => {
					console.log('取消监听进度条', res)
				})
				clearInterval(this.timer);
				
				
					let that = this;
					uni.authorize({
					    scope:'scope.record',
					    success:function(){
							that.timecount = '00:00:00';
							that.hour = 0;
							that.minute = 0;
							that.second = 0;
							that.getTimeInterval();
							that.radio = true
							that.begin = 2;
							that.schedule = 0;
							console.log('开始录音');
							recorderManager.start();
							// uni.showLoading({
							// 	title: '正在录音中'
							// });
					    },
					    fail:function(){
					        that.openSetting("录音功能");
					    }
					});
			},		
			//结束录音  
			stopp: function() {
				this.begin = 4;
				this.schedule = 0;
				uni.hideLoading();
				this.radio = true
				console.log('结束录音')
				recorderManager.stop();
				innerAudioContext.offTimeUpdate((res) => {
					console.log('取消监听进度条', res)
				})
				clearInterval(this.timer);
			},
			// 播放录音
			audioPlay: function(e) {
				if(!this.voicePath){
					uni.showToast({
						title:'请先完成录音',
						mask:true,
						icon:'none'
					})
					return
				}
				
				recorderManager.stop();
				innerAudioContext.offTimeUpdate((res) => {
					console.log('取消监听进度条', res)
				})
				clearInterval(this.timer);
				
				this.timecount = '00:00:00';
				this.hour = 0;
				this.minute = 0;
				this.second = 0;
				this.getTimeInterval();
				
				this.begin = 5;
				this.schedule = 0;
				// 开始播放
				this.stop = 1;
				// 左边小喇叭动
				// this.radio = 1;
				this.radio = false

				let that = this;
				console.log('播放')
				console.log(this.voicePath)

				// 播放路径
				innerAudioContext.src = this.voicePath
				innerAudioContext.play();
				
				setTimeout(() => {
					console.log('总时长', innerAudioContext.duration)
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
						let x = (that.width * 0.5 - that.width * 0.5 * 0.07) * schedule1 / 100;

						if (that.stop == 0) {

						} else {
							// 白色圆点
							that.movable_x = x;
							// 进度条
							// that.schedule = schedule;
							that.duration = innerAudioContext.duration;
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
							innerAudioContext.offTimeUpdate((res) => {
								console.log('取消监听进度条', res)
							})
							
							that.begin = 4;
							that.schedule = 100;
							that.timecount = '00:00:00';
							that.hour = 0;
							that.minute = 0;
							that.second = 0;
							clearInterval(that.timer);
						})
					})
				},200)

			},
			audioStop: function(e) {
				this.timecount = '00:00:00';
				this.hour = 0;
				this.minute = 0;
				this.second = 0;
				
				this.begin = 4;
				this.schedule = 0;
				this.stop = 0;
				this.click = 0;
				clearInterval(this.timer);
				innerAudioContext.stop();
				innerAudioContext.offTimeUpdate((res) => {
					console.log('取消监听进度条', res)
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
			
			// 自定义播放视频按钮
			videoPlay: function(){
				// 判断是否有视频
				if(this.zhufu_mp4){
					// let innerVideoContext = uni.createVideoContext("video1", this);
					this.innerVideoContext.play();
					this.showvideoPlayBtn = false;
					this.statusVideo = true;
				}
			},
			//点击视频任意位置暂停
			videoClick: function(){
				// 判断当前视频播放状态
				if(this.statusVideo){
					this.showvideoPlayBtn = true;
					this.innerVideoContext.pause();
					this.statusVideo = false;
				}else{
					this.innerVideoContext.play();
					this.showvideoPlayBtn = false;
					this.statusVideo = true;
				}
			},
			videoPlay1: function(){
				this.isfirstClickVideo = false;
			},
			videoTimeUpdateEvent(e) { // 播放进度改变
				// e.detail.currentTime为每次触发时,视频的当前播放时间
				let currentTime = Number(e.detail.currentTime);
				console.log('播放进度条改变', currentTime)
				if (currentTime >= this.videoTime) {
					// 试看结束,在这做一些想做的操作,例如停止视频播放
					this.innerVideoContext.exitFullScreen();
					this.innerVideoContext.pause();
					this.innerVideoContext.seek(0);
					this.showvideoPlayBtn = true;
					this.statusVideo = false;
				}
			},
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
			
			vide: function(e) {
				console.log(e)
				var that = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log('视频', res)
						that.videoTime = Math.floor(res.duration);
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
									uni.showToast({
										title: "上传成功",
										icon: 'none',
										mask: 'true',
									})
									that.innerVideoContext = uni.createVideoContext("video1", that);
									that.videoShow = true;
									that.showvideoPlayBtn = false;
									that.statusVideo = false;
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
			radiofun: function(e) {
				console.log(545435454)
				// 显示对应文字和判断
				this.value = e.detail.value;
				this.val = e.detail.value;
				
				this.showvideoPlayBtn = true;
				this.innerVideoContext.pause();
				this.statusVideo = false;
			},
			// sliderChange(e) {
			// 	console.log('value 发生变化：' + e.detail.value)
			// },
			wish: function(e) {
				var that = this;
				var memberid = uni.getStorageSync('id');
				var data = {
					memberid: memberid,
					zhufu_type: 0,
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

				var action = 'save_custom_zhufu_theme';
				var controller = 'zhufu';

				this.$utils.postNew(action, JSON.stringify(data),controller).then(res => {
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
								uni.setStorageSync('setwishessuccess', '1');
								setTimeout(function(e) {
									uni.navigateBack({
										url: 1
									})
								}, 1000)
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
		padding: 30rpx 0 40rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
	}

	/* 文字 语音 视频 导航样式 */
	.inv-h-w {
		/* height: 100rpx; */
	}
	.template-btm-choose-input{
		text-align: center;
		height: auto!important;
		width: 100%!important;
		margin-bottom: 50rpx;
	}
	.inv-h {
		display: inline-block;
		font-size: 30rpx;
		flex: 1;
		text-align: center;
		color: #333333;
		padding: 0 20rpx;
	}

	page {
		background-color: #F2F2F2;
	}

	.wishes-card1 {
		padding: 0 70rpx;
		/* position: absolute; */
		/* top: 100rpx; */
		/* left: 10rpx; */
		box-sizing: border-box;
	}

	/* 财源滚滚 */
	.wishes-font {
		box-sizing: border-box;
		width: 100%;
		padding: 24rpx;
		background-color: #fff;
		border-radius: 5px;
		/* position: relative; */
		margin-bottom: 40rpx;
	}

	.wishes-font-con {
		width: 83%;
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		font-size: 12px;
		color: #999999;
	}
	.bottom-icon{
		margin-top: 26rpx;
		font-size: 28rpx;
	}
	.bottom-icon text{
		display: inline-block;
		vertical-align: middle;
		font-size: 28rpx;
		color: #EC1815;
	}
	.icon-refresh {
		margin-right: 8rpx;
	}
	.bottom-icon .wishes-font-edit {
		color: #ccc;
		float: right;
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

	.win {
		position: relative;
		top: -520rpx;
		margin-left: 110rpx;
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

	/* 语音 */
	.wishes-say-btn {
		width: 422rpx;
		height: 70rpx;
		border-radius: 5rpx;
		line-height: 70rpx;
		text-align: center;
		color: #fff;
		margin: 40rpx auto 59rpx;
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
		width: 100%;
		position: relative;
	}

	.say-img-bg {
		width: 100%;
	}

	.says {
		
	}
	.audio-box{
		text-align: center;
	}
	.audio-box .audio-img{
		position: relative;
	}
	.say-img-open {
		width: 389rpx;
		/* height: 389rpx; */
		/* position: absolute;
		top: 160rpx;
		left: 146rpx; */
	}

	.say-img-off {
		width: 89rpx;
		height: 89rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
	.wishes-video .say-img-off{
		z-index: 2;
	}

	.uni-padding-wrap {
		width: 100%;
		position: relative;
		/* position: absolute;
		top: 360rpx;
		left: 5rpx; */
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
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 0rpx;
	}
	.b {
		width: 100%;
		height: 20rpx; 
		border-radius: 10rpx !important;
		margin-top: -10rpx;
	
	}
	.sound-on{
		width: 169rpx;
		height: 90rpx;
		position: absolute;
		top: -70rpx;
		right: 40rpx;
	}
	.rotate{
		transform: rotate(-45deg);
		top: 0;
		animation: 2s;
	}
	/* 视频 */
	.video-btn {
		/* width: 650rpx;
		height: 100rpx; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.video-btn>view{
		padding: 0 15rpx;
	}

	.z-template-btm-information-video {
		position: absolute;
		width: 100%!important;
		height: 100%!important;
		margin: 0;
		top: 0;
		border-radius: 20rpx;
		overflow: hidden;
		border: 4rpx solid #ea5e4c;
	}

	.z-template-btm-information-video video {
		width: 100%;
		height: 100%;
	}

	.video-btn-top {
		font-size: 0;
		width: 230rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding: 0!important;
		background-color: #F55856;
		color: #fff;
		text-align: center;
	}
	.video-btn-top text{
		display: inline-block;
		vertical-align: middle;
		font-size: 32rpx;
	}
	.video-btn-top text:first-child{
		margin-right: 10rpx;
	}

	.videos {
		/* position: absolute; */
		/* left: 100rpx; */
		font-size: 35px;
		color: #fff;
	}

	.luzhi {
		/* position: absolute; */
		/* left: 430rpx; */
		font-size: 25px;
	}

	.wishes-video {
		width: 100%;
		/* height: 700rpx; */
		position: relative;
		/* top: 80rpx; */
		/* left: 145rpx; */
	}

	.wishes-video-bg {
		width: 100%;
	}
	.wishes-video-bg-bottom{
		position: absolute;
		bottom: 0;
		width: 100%;
		z-index: 2;
	}

	/* .videoimg {
		margin-left: -10rpx;
		margin-top: -10rpx;
	} */

	/* 使用该祝福方式按钮 */
	.wishes-btn {
		width: 384rpx;
		margin-top: rpx;
		background: #F55856;
	}

	.wishes-font input {
		width: 450rpx;
		height: 50rpx;
		font-size: 12px;
		color: #9D9D9D;
	}
	.proposal{
		/* position: absolute;
		top: -55rpx; */
		color: #999999;
		display: block;
		text-align: center;
		margin: 20rpx 0 30rpx;
	}
	.duration{
		color: #fff;
		position: absolute;
		top: 2rpx;
		right: 90rpx;
		font-size: 10px;
	}
	
	.a-circle{
		display: inline-block;
		border: 1rpx solid #999;
		border-radius: 50%;
		background-color: #fff;
		font-size: 0;
		padding: 6rpx;
		margin-right: 10rpx;
	}
	.a-circle text{
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #fff;
	}
	.inv-h-se .a-circle{
		border: 1rpx solid #EC1815;
	}
	.inv-h-se .a-circle text{
		background-color: #EC1815;
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
	
	/**
	 * 
	 */
	.audio-box-view{
		display: flex;
		text-align: center;
	    flex-direction: column;
	    align-items: center;
		margin-top: 80rpx;
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
	
	/* 语音音阶------------- */
		.prompt-loader {
			width: 96px;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 6px;
		}
		.em {
			display: block;
			background: #D8D8D8;
			width: 1px;
			height: 20rpx;
			margin-right: 3px;
			float: left;
		}
		.em:last-child {
			margin-right: 0px;
		}
		.em:nth-child(1) {
		 animation:  2.5s 1.4s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(2) {
		 animation:  2.5s 1.2s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(3) {
		 animation:  2.5s 1s infinite linear;
		 background: #FFFFFF;
		}
	    .em:nth-child(4) {
		 animation:  2.5s 0.8s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(5) {
		 animation:  2.5s 0.6s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(6) {
		 animation:  2.5s 0.4s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(7) {
		 animation:  2.5s 0.2s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(8) {
		 animation:  2.5s 0s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(9) {
		 animation:  2.5s 0.2s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(10) {
		 animation:  2.5s 0.4s infinite linear;
		 background: #FFFFFF;
		}
		.em:nth-child(11) {
		 animation: 2.5s 0.6s infinite linear;
		 background: #FFFFFF;
		}
		
</style>
