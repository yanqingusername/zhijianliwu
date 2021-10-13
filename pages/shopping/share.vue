<template>
	<view class="share-bag-view">
		<view class="share-bag">
				<r-canvas v-if="com==1" ref="rCanvas"></r-canvas>
				<r-canvas v-else="com==2" ref="rCanvas"></r-canvas>
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
				gift: [],
				gifts: [],
				keynum: 'keynum',
				QRcodeUrl: '',
				imageUrl: '',
				goodsname: '',
				cost_price: '',
				posterUrl: '',
				url: '',
				com: 1,
				length: 0,
				bgUrl:'https://zhijianlw.com/static/web/img/gift_hb_09_01.png',
				flowUrl:'https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png',
				goodsname1:'',
				imageUrl1: '',
				goodsnum1: '',
				nickname: '',
				goods_count_num: 0
			}
		},
		onLoad(e) {
			
			this.nickname = uni.getStorageSync('name')
			
			this.url = config.URL;
			let cardbag_number = e.cardbag_number
			var action = 'get_cardbag_detail';
			let merberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				cardbag_number: cardbag_number,
				cardbag_detail_id: "0",
				merberid: merberid
			})
			this.$utils.post(action, data).then(res => {
				console.log('礼包', res)
				if (res.goods_list.length == 1) {
					this.gift = res.goods_list
					this.goodsname=res.goods_list[0].goodsname
					this.goodsnum=res.goods_list[0].goodsnum
					this.imageUrl=res.goods_list[0].head_img
					this.length=res.goods_list.length
					this.com=1
				} else {
					this.gifts = res.goods_list
					
					if (res.cardbag.type == 1) {
						this.length = res.type1_goodslist.length
					} else {
						this.length = res.goods_list.length
					}
					
					this.goodsname=res.goods_list[0].goodsname
					this.goodsnum=res.goods_list[0].goodsnum
					this.imageUrl=res.goods_list[0].head_img
					
					this.goodsname1=res.goods_list[1].goodsname
					this.goodsnum1=res.goods_list[1].goodsnum
					this.imageUrl1=res.goods_list[1].head_img
					
					this.com=2
				}
				
				this.goods_count_num = res.cardbag.goods_count_num;
				
				console.log(this);
				uni.showToast({
					title: "生成中",
					icon: "loading"
				})
				var action = 'get_haibao';
				let data1 = JSON.stringify({
					scene: cardbag_number,  
					page: "pages/shopping/receive",
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
								canvas_height: 560,
								hidden: true
							})
							// 画背景图
							await this.$refs.rCanvas.drawImage({
								url: this.$utils.imageUrl(this.bgUrl),
								x: 15,
								y: 10,
								w: 350,
								h: 540
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							
							
							if(this.com == 1){
								// 画商品框
								await this.$refs.rCanvas.fillRoundRect({
									x: 100,
									y: 100,
									w: 180,
									h: 225,
									radius: 10,
									fill_color: "#CCB586"
								});
								await this.$refs.rCanvas.fillRoundRect({
									x: 102,
									y: 102,
									w: 176,
									h: 221,
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
									x: 106,
									y: 106,
									w: 170,
									h: 170
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
								
								// 画名字
								await this.$refs.rCanvas.drawText({
									text: this.$utils.sub_str(this.goodsname,9),
									x: 130,
									y: 301,
									font_color: "#333333",
									font_size: 14
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
							}else{
								// 画商品框
								await this.$refs.rCanvas.fillRoundRect({
									x: 65,
									y: 100,
									w: 255,
									h: 80,
									radius: 10,
									fill_color: "#CCB586"
								});
								await this.$refs.rCanvas.fillRoundRect({
									x: 66,
									y: 101,
									w: 253,
									h: 78,
									radius: 10,
									fill_color: "#fff"
								});
								// 画商品
								await this.$refs.rCanvas.drawImage({
									url: this.$utils.imageUrl(this.imageUrl),
									x: 71,
									y: 115,
									w: 60,
									h: 50
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
								// 画名字
								await this.$refs.rCanvas.drawText({
									text: this.$utils.sub_str(this.goodsname,6),
									x: 150,
									y: 130,
									max_width: 200,
									font_color: "#333333",
									font_size: 14
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
								// 画件数
								await this.$refs.rCanvas.drawText({
									text: "共"+this.goodsnum+"件",
									x: 150,
									y: 160,
									font_color: "#666666",
									font_size: 14
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									}) 
								})
								
								
								// 画商品框
								await this.$refs.rCanvas.fillRoundRect({
									x: 65,
									y: 200,
									w: 255,
									h: 80,
									radius: 10,
									fill_color: "#CCB586"
								});
								await this.$refs.rCanvas.fillRoundRect({
									x: 66,
									y: 201,
									w: 253,
									h: 78,
									radius: 10,
									fill_color: "#fff"
								});
								// 画商品
								await this.$refs.rCanvas.drawImage({
									url: this.$utils.imageUrl(this.imageUrl1),
									x: 71,
									y: 210,
									w: 60,
									h: 50
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
								// 画名字
								await this.$refs.rCanvas.drawText({
									text: this.$utils.sub_str(this.goodsname1,6),
									x: 150,
									y: 230,
									max_width: 200,
									font_color: "#333333",
									font_size: 14
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									})
								})
								// 画件数
								await this.$refs.rCanvas.drawText({
									text: "共"+this.goodsnum1+"件",
									x: 150,
									y: 260,
									font_color: "#666666",
									font_size: 14
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									}) 
								})
								
								//省略号
								await this.$refs.rCanvas.drawText({
									text: "•••",
									x: 170,
									y: 310,
									font_color: "#FADEA5"
								}).catch(err_msg => {
									uni.showToast({
										title: err_msg,
										icon: "none"
									}) 
								})
							}
							
							
							// 画熊猫为你挑选了{{length}}件礼物
							await this.$refs.rCanvas.drawText({
								text: this.nickname + "为你挑选了"+this.goods_count_num+"件礼物",
								x: 110,
								y: 360,
								font_color: "#FADEA5",
								font_size: 16
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								}) 
							})
							
							
							
							
							// 画小程序二维码
							await this.$refs.rCanvas.drawImage({
								url: this.$utils.imageUrl(this.QRcodeUrl),
								x: 148,
								y: 380,
								w: 85,
								h: 85,
								radius: 12,
								is_radius: true
							}).catch(err_msg => {
								uni.showToast({
									title: err_msg,
									icon: "none"
								})
							})
							
							
							// 画 长按扫码即可送礼
							await this.$refs.rCanvas.drawText({
								text: "长按小程序二维码识别",
								x: 120,
								y: 510,
								font_color: "#FFF8F8",
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
		height: 1140rpx;
		display: flex;
		justify-content: center;
		margin: auto;
	}
	.poster {
		display: block;
		margin: 0rpx auto;
		width: 375px;
		height: 540px;
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
