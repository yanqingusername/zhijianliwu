<template>
	<view class="share-bag-view">
		<view class="share-bag">
				<r-canvas ref="rCanvas"></r-canvas>
				<image :src="$utils.imageUrl(posterUrl)" mode="" class="poster"></image>
		</view>
		<view class="share-view" @click="down">保存图片</view>
		<view class="share-empty"></view>
	</view>

</template>

<script>
	import config from '../../common/config.js';
	import rCanvas from "@/components/r-canvas/r-canvas.vue"
	export default {
		components: {
			rCanvas
		},
		data() {
			return {
				posterUrl:'',
				QRcodeUrl: '',
				bgUrl:'',
				flowUrl:'',
				imageUrl: '',
				text: '',
				content: '',
				title: '',
				bg_icon:"https://zhijianlw.com/static/web/img/icon_card_share_2021_10_09_01.png"
			}
		},
		onLoad(e) {
			let cardbag_number = e.cardbag_number || '';
			var action = 'get_cardbag_detail';
			var memberid = uni.getStorageSync('id');
			var data = JSON.stringify({
				cardbag_number: cardbag_number,
				cardbag_detail_id: 0,
				merberid: memberid
			});
			this.$utils.post(action, data).then(res => {
				this.bgUrl = res.cardbag_theme.theme_background;
				this.flowUrl = res.cardbag_theme.customized_head_img;
				this.text = res.cardbag_theme.customized_call;
				this.content = res.cardbag_theme.zhufu_msg;
				this.title = res.cardbag_theme.customized_company;
				
				wx.getImageInfo({
					src: this.flowUrl,
				    success: (resImg) => {
						let width = (76*resImg.width)/resImg.height;
						this.coverWidth = parseInt(width/2);
						if(this.coverWidth < 38){
							this.coverWidth = 38
						}
				    },
				    fail: (err) => {
						console.log(err)
				    }
				});
				
				
				uni.showToast({
					title: "生成中",
					icon: "loading"
				})
				var action1 = 'get_haibao';
				let data1 = JSON.stringify({
					scene: cardbag_number,  
					page: "pages/shopping/CBlessingCardWe",
				});
				this.$utils.post(action1, data1).then(res => {
					console.log(res)
					this.QRcodeUrl = res.dir;
					console.log('QRcodeUrl:', this.QRcodeUrl);
				}).then(
					res => {
						this.$nextTick(async () => {
							// 初始化
							await this.$refs.rCanvas.init({
								canvas_id: "rCanvas",
								canvas_width: 375,
								canvas_height: 638,
								hidden: true,
								showType: 1
							})
							// 画背景图
							await this.$refs.rCanvas.drawImage({
								url: this.bgUrl,
								x: 0,
								y: 0,
								w: 375,
								h: 638
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							// 画头像
							await this.$refs.rCanvas.drawImage({
								url: this.flowUrl,
								x: 42,
								y: 170,
								w: this.coverWidth,
								h: 38
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							// 画名字
							await this.$refs.rCanvas.drawText({
								text: this.text,
								x: 42,
								y: 225,
								font_color: "#575D65",
								font_size: 12,
								max_width: 200,
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							// await this.$refs.rCanvas.drawLineTo1({
							// 	x: 330,
							// 	y: 232,
							// 	w: 42,
							// 	h: 232,
							// 	line_width: 330,
							// 	line_color: "#575D65"
							// })
							
							// 画名字
							await this.$refs.rCanvas.drawText({
								text: this.content,
								x: 42,
								y: 250,
								font_color: "#575D65",
								font_size: 12,
								max_width: 295,
								line_clamp: 4,
								line_height: 30,
								is_line_break: true
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							// 画名字
							await this.$refs.rCanvas.drawText({
								text: this.title,
								x: 335,
								y: 370,
								font_color: "#575D65",
								font_size: 12,
								max_width: 280,
								text_align: 'right'
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							await this.$refs.rCanvas.drawImage({
								url: this.bg_icon,
								x: 0,
								y: 497,
								w: 375,
								h: 141
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							// 画小程序二维码
							await this.$refs.rCanvas.drawImage({
								url: this.QRcodeUrl,
								x: 145,
								y: 490,
								w: 92,
								h: 92,
								radius: 12,
								border_color: '#F7E8CB',
								border_width: 6,
								is_radius: true
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							
							// 画 长按扫码即可送礼
							await this.$refs.rCanvas.drawText({
								text: "长按小程序二维码领取礼物",
								x: 85,
								y: 610,
								font_color: "#B58D3D",
								font_size: 14
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							// 画 长按扫码即可送礼
							// await this.$refs.rCanvas.drawText({
							// 	text: "先到先得",
							// 	x: 160,
							// 	y: 495,
							// 	max_width: 130,
							// 	font_color: "#FFF8F8",
							// 	font_size: 14
							// }).catch(err_msg => {
							// 	uni.showToast({
							// 		title: err_msg,
							// 		icon: "none"
							// 	})
							// })
							// 生成海报
							await this.$refs.rCanvas.draw((res) => {
								//res.tempFilePath：生成成功，返回base64图片
								uni.hideLoading();
								this.posterUrl = res.tempFilePath;
							})
						})
					})
				})
		},
		methods:{
			down: function(e) {
				uni.saveImageToPhotosAlbum({
					filePath: this.posterUrl,
					success(res) {
						// console.log(res)
						uni.showToast({
							title: "图片已保存",
							icon: "none"
						})
					},
					fail(err) {
						if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg ===
							"saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
						) {
							uni.showModal({
								title: '提示',
								content: '需要您授权保存相册',
								showCancel: false,
								success: modalSuccess => {
									uni.openSetting({
										success(settingdata) {
											if (settingdata.authSetting['scope.writePhotosAlbum']) {
												// console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
											} else {
												// console.log('获取权限失败，给出不给权限就无法正常使用的提示')
											}
										}
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.share-bag-view{
		display: flex;
		flex-direction: column;
	    align-items: center;
	    justify-content: center;
	}
	.share-bag {
		width: 750rpx;
		height: 1275rpx;
		display: flex;
		justify-content: center;
		margin: auto;
	}
	.poster {
		display: block;
		margin: 0rpx auto;
		width: 375px;
		height: 638px;
		/* border-radius: 16rpx;
		margin-top: -19rpx; */
	}
	.share-view{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 48rpx;
		width: 642rpx;
		height: 82rpx;
		background: #DB3C3A;
		border-radius: 44rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	.share-empty{
		height: 30rpx;
	}
</style>
