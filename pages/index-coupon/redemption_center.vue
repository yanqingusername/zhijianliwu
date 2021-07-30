<template>
	<view class="center">
		<img class="index-img" src="../../static/index-coupons.png">
		<text class="choose">您可以选择下列1款礼物进行兑换</text>
		<view v-for="item in goodslist" class="tea">
			<view class="tea-img">
				<image class="img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
			</view>
			<view>
				<text class="t-title">{{item.goodsname}}</text>
				<text class="l-title">{{item.goodstitle}}</text>
				<button size="mini" class="sub"    :data-keynum="item.keynum"   @click="confirm_order">去兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodslist:[]
			}
		},
		onLoad: function(e) {
			console.log(e);
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			var cardid=e.cardid
		    uni.setStorageSync("dh_cardid",cardid)
			var memberid = uni.getStorageSync('id')
			var action = 'get_card_goods';
			var data = JSON.stringify({
				cardid: cardid,
			    memberid: memberid,
			});

			this.$utils.post(action, data).then(res => {
				console.log('获取商品列表', res)
				this.goodslist = res.rs;
			})
		},
		methods: {
			goto() {
				uni.navigateTo({
					url: './index-address'
				})
			},
			goodsItem(item, e) {
				console.log(item);
				console.log(e);
			},
			clickLoadMore(e) {
				uni.showToast({
					icon: 'none',
					title: "当前状态：" + e.detail.status
				})
			},
			confirm_order:function (e){
				console.log(e);
				let keynum = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url: './index-address?good_keynum=' + keynum
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

	.choose {
		font-size: 16px;
		color: #8C8C8C;
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
	}

	.tea {
		width: 345rpx;
		float: left;
		margin-left: 20rpx;
		margin-top: 30rpx;
		background-color: #fff;
	}

	.tea-img {
		width: 345rpx;
		height: 350rpx;
		border: 1px dashed #000;
	}

	.img {
		width: 350rpx;
		width:350rpx;
	}

	.sub {
		color: #fff;
		width: 200rpx;
		border-radius: 15px;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 70rpx;
		background-color: #EC1815;
	}

	.t-title {
		font-weight: bold;
		display: block;
		text-align: center;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		font-size: 15px;
	}

	.l-title {
		color: #999;
		font-size: 12px;
		display: flex;
		justify-content: center;
	}
</style>
