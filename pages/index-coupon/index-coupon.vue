<template>
	<div class="index-coupon">
		<img class="index-img" src="https://zhijianlw.com/static/web/img/index-coupons-2021-08-28.png" mode="widthFix">
		<form @submit="submit">
			<view class="card">
				<h3>礼品卡/册兑换:</h3>
				<uni-forms :value="formData" ref="form">
					<uni-forms-item name="pass">
						<input type="text" name="cardpass" v-if="showInput" v-model="formData.pass" placeholder="请输入礼品卡/册密码" @input="binddata('pass',$event.detail.value)" />
					</uni-forms-item>
					<button form-type="submit" class="sub">立即绑定</button>
				</uni-forms>
			</view>
		</form>
		
		<!-- 绑定成功提示 -->
		<view class="success-pop" style="z-index: 33;" v-if="showPop">
			<view class="pop-center clearfix" style="top: 35%;">
				<image @click="close" class="close" src="https://zhijianlw.com/static/web/img/z-close.png" mode="widthFix"></image>
				<view class="p">恭喜您，绑定成功！</view>
				<view class="n" hover-class="none" @click="clickHandler">立即查看</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					pass: ''
				},
				showInput: true,
				showPop: false
			}
		},
		methods: {
			open(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					console.log('表单返回得值：', res)
				})
			},
			close: function(){
				this.showInput = true;
				this.showPop = false;
				this.formData.pass = '';
			},
			clickHandler(){
				this.showPop = false;
				this.showInput = true;
				this.formData.pass = '';
				uni.navigateTo({
					url:"./ExchangeOrder" //新需求 兑换订单列表页
					// url: './change'
				});
			},
			submit: function(e) {
               console.log(e)

				var mid = uni.getStorageSync('id');
				if (mid == '') {
					// uni.showToast({
					// 	title: "请先登录！",
					// 	icon: 'none'
					// })
					uni.reLaunch({
						url: '../signin/signin?receive=giftcard'
					})
					return false;
				}
				const cardpass = e.detail.value.cardpass;
				if (cardpass == '') {
					uni.showToast({
						title: "请输入礼品册上的密码！",
						icon: 'none'
					})
					return false;
				}

				var action = 'bind_giftcard';
				var data = '{"memberid":"' + mid + '","cardpwd":"' + cardpass + '","type":1}';
				this.$utils.post(action, data).then(res => {
					console.log(res)
					if (res.sta == 1) {
						this.showInput = false;
						this.showPop = true;
						
						// uni.showModal({
						// 	title: '',
						// 	content: '恭喜您，绑定成功！',
						// 	success: function(res1) {
						// 		if (res1.confirm) {
						// 			uni.navigateTo({ //跳转页面
						// 				url: "./change"
						// 			})
						// 		} else if (res1.cancel) {
						// 			console.log('用户点击取消');
						// 		}
						// 	}
						// });
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						/*
						uni.navigateTo({ //跳转页面
							url: "./change"
						})
						*/
					}


				})







			}
		}
	}
</script>

<style>
	.index-img {
		width: 100%;
		height: 350rpx;
	}
	
	._h3{
		font-size: 32rpx;
		color: #333;
	}

	.card {
		/* margin-top: 50rpx; */
		/* margin-left: 100rpx; */
		padding: 50rpx;
		box-sizing: border-box;
	}

	.card input {
		width: 628rpx;
		border: 2rpx solid #999999;
	    height: 76rpx;
	    margin-top: 36rpx;
		/* padding-bottom: 20rpx; */
	    font-size: 26rpx;
	    color: #999999;
	    padding-left: 20rpx;
	}

	.sub {
		    display: block;
		    width: 648rpx;
		    background-color: #EC1815;
		    color: #fff;
		    margin: 40rpx auto 0;
	}
</style>
