
<template>
	<view class="success-body margin-auto">
		<!-- 支付成功 -->
		<view class="success-payment">
			<view class="success-payment-img"><image class="img" src="https://zhijianlw.com/static/web/img/success.jpg" mode="widthFix"></image></view>
			<view class="success-payment-tips">恭喜您支付成功</view>
			<view class="success-payment-alt">快去分享您订购的礼物吧,可在礼记中查看领取状态。</view>
			<view class="success-payment-price">订单金额:<span>¥{{price}}</span></view>
		</view>
		<!-- 送出 -->
		<button class="success-forward" open-type="share" @click="$buttonClick(give)">
			<image class="img" src="https://zhijianlw.com/static/web/img/success-forward.jpg" mode=""></image>
		</button>
		<view class="success-alt">直接发给朋友或发到微信群</view>
		<!-- 生成海报 -->
		<view class="success-poster flex-vertically flex-center" @click="poster"><view  class="success-poster-content">生成海报</view></view>
		<view class="success-alt"  >生成礼物海报发送到朋友圈</view>
		<!-- <image :src="'http://zhijianlw.com/'+ src" mode=""></image> -->
	</view>
</template>  

<script> 
	import config from '../../common/config.js';
	import sr from 'sr-sdk-wxapp';
	export default {
		data() {
			return {
				price:'',
				cardbag_number:'',
				src:'',
				sign:'',
				background:'',
				title:'',
				showa:'',
				posterr:'',
				url: ''
			}
		},
		onLoad:function(e){
			this.url = config.URL;
			console.log(e)
			let that = this;
			let times = setTimeout(function(e){
				that.showa = 1;
				clearTimeout(times)
				
			},200)
			
			// 礼包码
			  let cardbag_number = e.cardbag_number; 
			  var sign = uni.getStorageSync('sign');
			  
			  this.price = e.price; 
			  this.cardbag_number = cardbag_number;
			  this.sign = sign;
			  this.id = uni.getStorageSync('id')
			  
			  
			  // 测试用跳转
			  // uni.navigateTo({
			  // 	url:'../redEnvelopes/redEnvelopes?cardbag_number=' + e.cardbag_number +'&name=' + sign.name + '&head_img=' + sign.head_img
			  // })
				let merberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					cardbag_number: this.cardbag_number,
					cardbag_detail_id: "0",
					merberid: merberid
				})
			 let action = 'get_cardbag_detail';
			 this.$utils.post(action,data).then(res=>{
			 	console.log('订单详情',res)
			 	let background = res.cardbag_theme.background;
				let theme_background = res.cardbag_theme.theme_background;
				this.background = theme_background?theme_background:background;
				this.title = res.cardbag_theme.send_talk_msg
			 })
			
			
			   
			   // wx.showShareMenu({
			   //   withShareTicket: true,
			   //   menus: ['shareAppMessage', 'shareTimeline']
			   // })
			
		},
		onShow:function(e) {
			if(this.showa == 1){
				if(this.posterr == 1){
					this.posterr = 0
				}else{
					// 转发返回
					uni.showToast({
						title:'已转发',
						icon:'none'
					})
				}
			}
			
		},
		onShareAppMessage:function(e){
		console.log({
			title:this.title,
			// path:'/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number +'&name=' + this.sign.name + '&head_img=' + this.sign.head_img,
			path:'/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number,
			imageUrl: this.url+this.background,
			desc:'指间送礼',
		});
		// 腾讯有数
			sr.track('page_share_app_message', {
			  "from_type": "menu",
			  "share_title": this.title,
			  "share_path": '/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number,
			  "share_image_url": this.$utils.imageUrl(this.background),
			  "share_to": "friends",
			})

		return{
			title:this.title,
			// path:'/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number +'&name=' + this.sign.name + '&head_img=' + this.sign.head_img,
			path:'/pages/redEnvelopes/redEnvelopes?cardbag_number=' + this.cardbag_number,
			imageUrl: this.$utils.imageUrl(this.background),
			desc:'指间送礼',
		} 
		},
		methods: {
			give:function(e){
				
				// uni.navigateTo({
				// 	url:'../redEnvelopes/redEnvelopes'
				// })
			},
			poster:function(e){
				let data = '{"scene":"'+this.cardbag_number+'","page":"pages/redEnvelopes/redEnvelopes"}';
				console.log(data)
				let action = 'get_haibao';
				 				  
				   this.$utils.post(action,data).then(res=>{
					    console.log('生成海报',res)
						this.posterr = 1
						uni.navigateTo({
							url:'../Poster/Poster2?src=' + res.dir + '&cardbag_number=' + this.cardbag_number
						})
				   })
	
			},
		}
	}
</script>

<style>

page{
	background-color: #F5F5F5;
}

.success-payment-img{
	height: auto;
}
.success-payment{
	height: auto;
	padding-bottom: 50rpx;
}
</style>

