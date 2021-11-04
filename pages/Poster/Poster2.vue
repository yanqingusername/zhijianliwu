<template>

	<view class="poster">


		<view class="content">
			<canvas canvas-id="myCanvas" />
		</view>

		<view class="poster-btm flex-between">
			<button class="poster-li" open-type="share" @click="share">
				<view class="poster-img">
					<image class="img" src="https://zhijianlw.com/static/web/img/wx.jpg" mode="" lazy-load="true"></image>
				</view>
				<view class="poster-text">分享好友</view>
			</button>
			<view class="poster-li" @click="down">
				<view class="poster-img">
					<image class="img" src="https://zhijianlw.com/static/web/img/down.jpg" mode=""></image>
				</view>
				<view class="poster-text">保存图片</view>
			</view>
		</view>
		<!-- <image class="background none" :src='"https://zhijianlw.com/" + background' mode=""></image>
		<image class="haibao none" :src="'https://zhijianlw.com/'+src" mode=""></image>
		<view class="poster-text none">
			<view class="poster-text-left flex"><image :src="sign.head_img" mode=""></image> {{sign.name}}</view>
			<view>长按识别小程序码</view>
			<view>人气爆款，立刻抢购</view>
		</view> -->


	</view>
</template>

<script>
	import config from '../../common/config.js';
	import sr from 'sr-sdk-wxapp';
	export default {
		data() {
			return {
				src: '',
				sign: '',
				background: '',
				parent_member: '',
				cardbag_number: '',
				share_msg: '',
				url: ''
			}
		},
		onLoad: function(e) {
			this.url = '';
			uni.showLoading({
				title: '生成中',
				mask: true
			})

			this.sign = uni.getStorageSync('sign')
			this.src = e.src;
			// 推广
			console.log(e);
			if (e.parent_member) {
				this.parent_member = e.parent_member
				console.log(e.parent_member);
			}
			// 商品领取
			else if (e.cardbag_number) {
				this.cardbag_number = e.cardbag_number;
				console.log(e.parent_member);
			}

			var data = '{}';
			var action = 'get_webconfig_songli';
			this.$utils.post(action, data).then(res => {
				console.log('送礼页面配置',res)
				uni.hideLoading();
				this.background = res.rs.share_img;
				this.msg();
			})



		},
		onShareAppMessage: function(e) {
			// 推广
			if (this.parent_member) {
				// 腾讯有数
				sr.track('page_share_app_message', {
				"from_type": "menu",
				"share_title": this.share_msg,
				"share_path": '/pages/signin/signin?scene=' + this.parent_member,
				"share_image_url": this.tempFilePath,
				"share_to": "friends",
				})

				return {
					title: this.share_msg,
					// path:'/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number +'&name=' + this.sign.name + '&head_img=' + this.sign.head_img+'&id=' + id,
					path: '/pages/signin/signin?scene=' + this.parent_member,
					imageUrl: this.tempFilePath,
					desc: '指间送礼',
				}
			}
			// 商品领取
			else if (this.cardbag_number) {
				// 腾讯有数
				sr.track('page_share_app_message', {
				"from_type": "menu",
				"share_title": this.share_msg,
				"share_path": '/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number,
				"share_image_url": this.tempFilePath,
				"share_to": "friends",
				})
				return {
					title: this.share_msg,
					// path:'/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number +'&name=' + this.sign.name + '&head_img=' + this.sign.head_img+'&id=' + id,
					path: '/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number,
					imageUrl: this.tempFilePath,
					desc: '指间送礼',
				}
			}


		},

		methods: {
			msg: function(e) {
				var data = '{}';
				var action = 'get_webconfig_songli';

				this.$utils.post(action, data).then(res => {
					console.log('送礼页面配置', res)
					if (res.sta == 1) {
						this.share_msg = res.rs.share_msg;
						this.canvas();
					}
				})
			},
			share: function(e) {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: this.tempFilePath,
					success: function(res) {
						// console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						// console.log("fail:" + JSON.stringify(err));
					}
				});

				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSenceTimeline",
				//     type: 2,
				//     imageUrl: this.tempFilePath,
				//     success: function (res) {
				//         // console.log("success:" + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         // console.log("fail:" + JSON.stringify(err));
				//     }
				// });
			},
			down: function(e) {
				uni.saveImageToPhotosAlbum({
					filePath: this.tempFilePath,
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
			},
			canvas: function(e) {

				let that = this;
				let src = this.url + this.background;
				let head_img = uni.getStorageSync('head_img')
				let name = uni.getStorageSync('name')
				let text = this.share_msg;
				text = text.replace(/\s+/g, "");

				// 创建画布对象
				const ctx = uni.createCanvasContext("myCanvas", that)

				// 获取图片信息
				uni.getImageInfo({
					src: src,
					success(res) {
						// 根据图片大小  绘制底图大小
						// console.log('图片信息',res)
						// 绘制底图
						ctx.drawImage(res.path, 0, 0, 254, 439)

						// 绘制姓名
						ctx.font = "8px Arial";
						ctx.fillStyle = "#A0A0A0";
						ctx.fillText(name, 56, 367);
						// 绘制  人气爆款,立即抢购!
						ctx.font = "10px Arial";
						ctx.fillStyle = "#2E2E2E";
						if (text.length > 13) {
							for (var i = 0; i < text.length / 13; i++) {
								ctx.fillText(text.slice(i * 13, (i + 1) * 13), 34, 390 + i * 15);
							}
						} else {
							ctx.fillText(text, 34, 390);
						}
						// 绘制背景  
						// 绘制  长按识别小程序码

						// 二维码路径
						uni.getImageInfo({
							src: that.url + that.src,
							success(res) {
								// console.log('二维码',res)
								// 绘制二维码
								ctx.drawImage(res.path, 170, 358, 53, 53)

								// 头像路径
								uni.getImageInfo({
									src: head_img,
									success(res) {
										// console.log('头像',res)
										// 范围   x坐标 y坐标 半径 起始弧度 终止弧度 
										ctx.arc(42, 363, 10, 0, 2 * Math.PI)
										// 价格边框..方便判断位置
										ctx.stroke();
										// 裁剪
										ctx.clip()
										// 绘制头像  x轴  y轴  宽 高 
										ctx.drawImage(res.path, 32, 353, 20, 20)


										ctx.draw()

										setTimeout(function() {
											uni.canvasToTempFilePath({
												canvasId: 'myCanvas',
												quality: 1,
												success: function(res) {
													uni.hideLoading();
													// console.log('保存图片',res)
													that.tempFilePath = res.tempFilePath
												}
											})
										}, 200)





									}
								})





								// uni.showLoading({
								// 	title:'正在保存',
								// 	mask:true
								// })

							}
						})


					},
				})
			},


		}
	}
</script>

<style>
	.poster {
		width: 100%;
		min-height: 1400rpx;
		/* position: fixed; */
		background-color: #242424;
		/* background-color: rgba(0,0,0,.8); */
	}

	.content {
		width: 100%;
		min-height: 877rpx;
		border-radius: 9rpx !important;
		background: #242424;
		padding-top: 30rpx;
		display: flex;
		justify-content: center;
	}

	canvas {
		width: 254px;
		height: 439px;
		border-radius: 9rpx !important;
		overflow: hidden;
	}
</style>
