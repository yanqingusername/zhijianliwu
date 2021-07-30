<template>
	<view class="address">



		<view class="addre" v-if="address.id != ''" @click="choiceAddress">
			<h3 class="phone">{{address.name}}{{address.phone}}</h3>
			<text class="text">{{address.address}}</text>
			<img class="icon" :src="addre.img">
		</view>

		<view class="addre" v-else @click="choiceAddress">
			<h3 class="phone"></h3>
			<text class="text">选择地址</text>
			<img class="icon" src="../../static/core-right.png">
		</view>



		<view class="a-tea">
			<view class="top">
				<view class="a-img">
					<img :src="$utils.imageUrl(goodsinfo.head_img)" style="width:80px;height:80px;">
				</view>
				<view class="tree">
					<text class="title">{{goodsinfo.goodsname}}</text>
					<text class="price"></text>
					<text class="title1"></text>
					<text class="num">×1</text>
				</view>
			</view>
			<view class="bottom">
				<view>
					<text class="day">配送</text>
					<text class="date">{{tea.day}}</text>
				</view>
				<view>
					<text class="say">给商家留言</text>
					<input class="message" type="text"  v-model="remark" placeholder="选填,可备注联系人,备用电话,说明等" />
				</view>
			</view>
		</view>
		<button class="button" @click="sub">立即兑换</button>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				goodsinfo: [],
				address: {},
				good_keynum: "",
				remark: ""
			}
		},
		onLoad: function(e) {
			console.log(e);
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			var good_keynum = e.good_keynum;
			var memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			this.good_keynum = good_keynum;
			var action = 'get_goods_detail';
			var data = JSON.stringify({
				keynum: good_keynum,
				memberid: memberid,
			});

			this.$utils.post(action, data).then(res => {
				console.log('获取商品详细信息', res)
				this.goodsinfo = res.rs.goodsinfo;
			})
		},
		onShow: function(e) {
			this.$set(this.address, 'id', uni.getStorageSync('member_area_id'));
			this.$set(this.address, 'name', uni.getStorageSync('member_area_linkman'));
			this.$set(this.address, 'phone', uni.getStorageSync('member_area_linktel'));
			this.$set(this.address, 'address', uni.getStorageSync('member_area_address'));

		},
		methods: {
			sub: function(e) {
				//获取需要的数据

				let data = JSON.stringify({
					memberid: this.memberid,
					member_area_id: this.address.id,
					cardid: uni.getStorageSync('dh_cardid'),
					goodsid: this.goodsinfo.id,
					goods_model: this.goodsinfo.goods_model,
					goods_spec: this.goodsinfo['goods_spec'][0]['id'],
					goods_item: this.goodsinfo['goods_spec'][0]['goods_spec_item'][0]['item'],
					delivery_type: '快递',
					remark: this.remark

				});
				console.log(data);

				var action = 'exchange_giftcard';
				this.$utils.post(action, data).then(res => {
					console.log(res);
					if (res.sta == 1) {
						uni.showModal({
							title: '',
							content: '恭喜您，兑换成功！',
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


					}
				})
			},
			choiceAddress: function() {
				uni.navigateTo({
					url: '../Add/Add?cardbag_number=5',
				});
			},
		}
	}
</script>

<style>
	.addre {
		width: 100%;
		height: 150rpx;
		line-height: 60rpx;
		background-color: #fff;
		margin-top: 20rpx;
	}

	.icon {
		width: 20rpx;
		height: 33rpx;
		float: right;
		margin-top: -7rpx;
		margin-right: 20rpx;
	}

	.phone {
		margin-left: 60rpx;
		padding-top: 39rpx;
	}

	.text {
		margin-left: 60rpx;
	}

	.a-tea {
		width: 100%;
		height: 360rpx;
		background-color: #fff;
		margin-top: 20rpx;
		position: relative;
	}

	.top {
		width: 600rpx;
	}

	.a-img {
		width: 150rpx;
		height: 150rpx;
		background-color: #F3F3F3;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 30rpx;
		left: 30rpx;
	}

	.a-tea img {
		height: 100rpx;
	}

	.tree {
		width: 500rpx;
		height: 200rpx;
		margin-left: 209rpx;
		position: relative;
	}

	.title {
		width: 459rpx;
		height: 30rpx;
		position: absolute;
		top: 40rpx;
	}

	.title1 {
		width: 490rpx;
		position: absolute;
		top: 100rpx;
		color: #999;
	}

	.price {
		position: absolute;
		top: 40rpx;
		right: 0;
	}

	.num {
		position: absolute;
		top: 98rpx;
		right: 0;
		color: #999;
	}

	.bottom {
		width: 700rpx;
		height: 150rpx;
		margin-left: 25rpx;
		position: relative;
	}

	.day {
		font-weight: bold;
		position: absolute;
		top: 40rpx;
	}

	.date {
		width: 200rpx;
		height: 30rpx;
		position: absolute;
		top: 50rpx;
		left: 500rpx;
		color: #ccc;
		font-weight: normal;
	}

	.say {
		font-size: 12px;
		position: absolute;
		top: 90rpx;
	}

	.message {
		width: 520rpx;
		position: absolute;
		top: 80rpx;
		left: 310rpx;
		font-size: 12px;
	}

	.button {
		margin-top: 564rpx;
		background-color: red;
		color: #fff;
		border-radius: unset;
	}
</style>
