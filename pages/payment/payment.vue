<template>
	<view>
		<canvas style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas>  
	</view>
</template>

<script>
	import MD5  from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	export default {
		data() {
			return {
				
			}
		},
		onLoad: (res) => {
			let url = uni.getStorageSync('url')
			// 二维码
			drawQrcode({
			  width: 200,
			  height: 200,
			  canvasId: 'myQrcode',
			  // v1.0.0+版本支持在二维码上绘制图片
			  // ctx: wx.createCanvasContext('myQrcode'),
			  text: url,
			  // v1.0.0+版本支持在二维码上绘制图片
			  image: {
			       // imageResource: '../../image/icon.png',
			       dx: 70,
			       dy: 70,
			  	 dWidth: 60,
			  	 dHeight: 60
			   }
			  })
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
