<template>
	<div class="index-coupon">
		<img class="index-img" :src="$utils.osspath_url('/xcx-static/index-coupons.png')">
		<form @submit="submit">
			<view class="card">
				<h3>卡密兑换</h3>
				<uni-forms :value="formData" ref="form">
					<uni-forms-item name="pass">
						<input type="text" name="cardpass" v-model="formData.pass" placeholder="请输入卡册上的密码" @input="binddata('pass',$event.detail.value)" />
					</uni-forms-item>
					<button form-type="submit" class="sub">立即绑定</button>
				</uni-forms>
			</view>
		</form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					pass: ''
				}
			}
		},
		methods: {
			open(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					console.log('表单返回得值：', res)
				})
			},
			submit: function(e) {
               console.log(e)

				var mid = uni.getStorageSync('id');
				if (mid == '') {
					uni.showToast({
						title: "请先登录！",
						icon: 'none'
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
						uni.showModal({
							title: '',
							content: '恭喜您，绑定成功！',
							success: function(res1) {
								if (res1.confirm) {
									uni.navigateTo({ //跳转页面
										url: "./change"
									})
								} else if (res1.cancel) {
									console.log('用户点击取消');
								}
							}
						});
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

	.card {
		margin-top: 50rpx;
		margin-left: 100rpx;
	}

	.card input {
		width: 260px;
		border-bottom: 1px solid #000;
		margin-top: 40rpx;
	}

	.sub {
		width: 300rpx;
		background-color: #EC1815;
		color: #fff;
		margin-left: 100rpx;
		margin-top: 100rpx;
	}
</style>
