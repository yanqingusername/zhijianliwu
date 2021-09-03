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
				keynum: '',
				QRcodeUrl: '',
				imageUrl: '',
				goodsname: '',
				posterUrl: '',
				url: '',
				bgUrl:'https://zhijianlw.com/static/web/img/gift_hb_09_01.png',
				flowUrl:'https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png'
			}
		},
		onLoad(options) {
			this.url = config.URL;
			if(options && options.keynum && options.imageUrl && options.goodsname){
				this.keynum = options.keynum;
				this.imageUrl = options.imageUrl;
				this.goodsname = options.goodsname;
				
				uni.showToast({
					title: "生成中",
					icon: "loading"
				})
				var action = 'get_haibao';
				let data1 = JSON.stringify({
					scene: this.keynum,  
					page: "pages/details/details",
				});
				this.$utils.post(action, data1).then(res => {
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
								canvas_height: 540,
								hidden: true
							})
							// 画背景图
							await this.$refs.rCanvas.drawImage({
								url: this.$utils.imageUrl(this.bgUrl),
								x: 15,
								y: 10,
								w: 350,
								h: 520
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
								// 画商品框
								await this.$refs.rCanvas.fillRoundRect({
									x: 100,
									y: 100,
									w: 180,
									h: 200,
									radius: 10,
									fill_color: "#CCB586"
								});
								await this.$refs.rCanvas.fillRoundRect({
									x: 102,
									y: 102,
									w: 176,
									h: 196,
									radius: 10,
									fill_color: "rgb(255, 255, 255)"
								});
								//商品上面的装饰
								await this.$refs.rCanvas.drawImage({
									url: this.$utils.imageUrl(this.flowUrl),
									x: 180,
									y: 90,
									w: 20,
									h: 20,
									
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
								// 画商品
								await this.$refs.rCanvas.drawImage({
									url: this.$utils.imageUrl(this.imageUrl),
									x: 125,
									y: 130,
									w: 130,
									h: 120
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
								
								// 画名字sub_str
								await this.$refs.rCanvas.drawText({
									text: this.$utils.sub_str(this.goodsname,7),
									x: 135,
									y: 280,
									max_width: 140,
									font_color: "#333333",
									font_size: 14
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
							
							
							// 画熊猫为你挑选了{{length}}件礼物
							await this.$refs.rCanvas.drawText({
								text: "我发现了一份不错的礼物，快来看看吧！",
								x: 60,
								y: 340,
								font_color: "#FADEA5",
								font_size: 15
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								}) 
							})
							
							// 画小程序二维码
							await this.$refs.rCanvas.drawImage({
								url: this.$utils.imageUrl(this.QRcodeUrl),
								x: 150,
								y: 368,
								w: 80,
								h: 80,
								radius: 16,
								is_radius: true
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							
							// 画 长按扫码即可送礼
							await this.$refs.rCanvas.drawText({
								text: "长按小程序码领礼物",
								x: 130,
								y: 470,
								max_width: 130,
								font_color: "#FFF8F8",
								font_size: 14
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							// 画 长按扫码即可送礼
							await this.$refs.rCanvas.drawText({
								text: "先到先得",
								x: 160,
								y: 490,
								max_width: 130,
								font_color: "#FFF8F8",
								font_size: 14
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							// 生成海报
							await this.$refs.rCanvas.draw((res) => {
								//res.tempFilePath：生成成功，返回base64图片
								uni.hideLoading();
								this.posterUrl = res.tempFilePath;
							})
						})
					})
				}
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
	.share-bag-view{
		display: flex;
		flex-direction: column;
	    align-items: center;
	    justify-content: center;
	}
	.share-bag {
		width: 750rpx;
		height: 1140rpx;
		display: flex;
		justify-content: center;
		margin: auto;
	}
	.poster {
		display: block;
		margin: 0rpx auto;
		width: 440px;
		height: 560px;
		border-radius: 16rpx;
		margin-top: -19rpx;
	}
	
	.share-view{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0rpx;
		width: 200rpx;
		height: 80rpx;
		background: #EC1815;
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	.share-empty{
		height: 30rpx;
	}
</style>
