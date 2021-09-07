<template>
	<view>
		<view class="new-coupon-content">
			<view class="new-coupon-content-li flex" v-for="(item,index) in couponList" :key="index">
				<image src="../../static/coupon_bg.png" class="new-coupon-img"></image>
				<view class="new-coupon-view">
					<view class="new-coupon-left">
						<view class="new-coupon-lable">¥<text class="new-coupon-money">{{item.money}}</text></view>
						<view class="new-coupon-text">{{item.selecttext}}</view>
					</view>
					<view class="new-coupon-left" style="margin-left: 80rpx;">
						<view class="new-coupon-desc">{{item.desc}}</view>
						<view class="new-coupon-coupontype">{{item.coupontype}}</view>
					</view>
				</view>
				<view class="new-coupon-right">
					<view class="new-coupon-button" @click="$buttonClick(downNow)">立即使用</view>
				</view>
				<view class="new-coupon-time">{{item.timestring}}</view>
			</view>
			<view class="no-btm" v-if="couponList.length==0">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
			</view>
		</view>
		<view class="new-coupon-bottom" @click="expiredCoupon">
			<view class="new-coupon-bottom-text">没有更多可用优惠券 | </view>
			<view class="new-coupon-bottom-text" style="color: #FC6853;margin-left: 6rpx;">查看已失效的优惠券></view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import sr from 'sr-sdk-wxapp';
	export default {
		data() {
			return {
				number: 0,
				top: [],
				btm: [],
				top1: [],
				btm1: [],
				top2: [],
				btm2: [],
				level: '',
				choose: '',
				level_name: '',
				url: "",
				couponList: [
					{
						"id": 1,
						"money":20,
						"desc":"母亲节专享",
						"selecttext":"满200元可用",
						"coupontype":"（全品类类可用）",
						"timestring":"有效期：2021/06/12~2021/06/14",
					},
					{
						"id": 21,
						"money":50,
						"desc":"端午节优惠券",
						"selecttext":"满300元可用",
						"coupontype":"（限食品类可用）",
						"timestring":"有效期：2021/06/12~2021/06/14",
					},
					{
						"id": 12,
						"money":20,
						"desc":"母亲节专享",
						"selecttext":"满200元可用",
						"coupontype":"（全品类类可用）",
						"timestring":"有效期：2021/06/12~2021/06/14",
					},
					{
						"id": 14,
						"money":50,
						"desc":"端午节优惠券",
						"selecttext":"满500元可用",
						"coupontype":"（全品类类可用）",
						"timestring":"有效期：2021/06/12~2021/06/14",
					},
				]
			}
		},
		onLoad: function(e) {
			this.url = config.URL;
			if (e.choose) {
				this.choose = e.choose;
			}
			// 再次进入不选择优惠券就取消优惠券
			uni.setStorageSync('coupon', '');
			uni.setStorageSync('coupon_keynum', '');
			uni.setStorageSync('coupon_number',  '');
			uni.setStorageSync('coupon_money', '');
			
			this.level_name = uni.getStorageSync('level_name')
			this.level = uni.getStorageSync('level')
			let id = uni.getStorageSync('id');
			var data = '{"memberid":"' + id + '"}';
			var action = 'get_coupon_number_list';

			this.$utils.post(action, data).then(res => {
				console.log('我的优惠券', res)

				let times = new Date().getTime()

				for (let i in res.rs) {

					res.rs[i].coupon_type_info.begin_time = res.rs[i].coupon_type_info.begin_time * 1000
					res.rs[i].coupon_type_info.end_time = res.rs[i].coupon_type_info.end_time * 1000

					// type 通用0  单品1
					// status 未使用0  已使用

					// 通用券
					if (res.rs[i].coupon_type_info.type == 0) {


						if (res.rs[i].coupon_type_info.end_time - times <= 0) {
							res.rs[i].time = '已过期'
						} else if (res.rs[i].coupon_type_info.end_time - times > 0) {

							var dateTime = new Date(parseInt(res.rs[i].coupon_type_info.begin_time))
							var year = dateTime.getFullYear();
							var month = dateTime.getMonth() + 1;
							var day = dateTime.getDate();
							var hour = dateTime.getHours();
							var minute = dateTime.getMinutes();
							var second = dateTime.getSeconds();
							if (hour < 10) {
								hour = '0' + hour;
							}
							if (minute < 10) {
								minute = '0' + minute;
							}
							if (second < 10) {
								second = '0' + second;
							}
							res.rs[i].coupon_type_info.begin_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' +
								second;

							var dateTime = new Date(parseInt(res.rs[i].coupon_type_info.end_time))
							var year = dateTime.getFullYear();
							var month = dateTime.getMonth() + 1;
							var day = dateTime.getDate();
							var hour = dateTime.getHours();
							var minute = dateTime.getMinutes();
							var second = dateTime.getSeconds();
							if (hour < 10) {
								hour = '0' + hour;
							}
							if (minute < 10) {
								minute = '0' + minute;
							}
							if (second < 10) {
								second = '0' + second;
							}
							res.rs[i].coupon_type_info.end_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' +
								second;

							res.rs[i].time = res.rs[i].coupon_type_info.begin_time + '-' + res.rs[i].coupon_type_info.end_time;


							res.rs[i].money = parseInt(res.rs[i].money);
						}
						// 单品券
					} else {
						if (res.rs[i].coupon_type_info.end_time - times <= 0) {
							res.rs[i].time = '已过期'
						} else if (res.rs[i].coupon_type_info.end_time - times > 0) {
							res.rs[i].time = parseInt((res.rs[i].coupon_type_info.end_time - times) / (1000 * 3600 * 24))
						}
					}
					if (res.rs[i].status == 0) {
						// 全场未使用券
						if (res.rs[i].coupon_type_info.type == 0) {
							// 全场过期券
							if (res.rs[i].time == '已过期') {
								this.top2.push(res.rs[i])
							} else {
								this.top.push(res.rs[i])
							}
						}
						// 单品未使用券
						else {
							// 单品过期券
							if (res.rs[i].time == '已过期') {
								this.btm2.push(res.rs[i])
							} else {
								this.btm.push(res.rs[i])
							}
						}
					} else if (res.rs[i].status == 1) {
						// 全场已使用券
						if (res.rs[i].coupon_type_info.type == 0) {
							this.top1.push(res.rs[i])
						}
						// 单品已使用券
						else {
							this.btm1.push(res.rs[i])
						}
					}
				}
			})
			
			//腾讯有数
			sr.track('expose_coupon', {
			  "coupon": {
			    "coupon_id": "48390200020058042",
			    "coupon_name": "母亲节大促10元代金券"
			  },
			  "coupon_batch": {
			    "coupon_batch_id": "48390200020058042",
			    "coupon_batch_name": "母亲节大促"
			  },
			})
		},
		methods: {
			downNow: function(e){
				//腾讯有数
				sr.track('trigger_coupon', {
				  "coupon": {
				    "coupon_id": "48390200020058042",
				    "coupon_name": "母亲节大促10元代金券"
				  },
				  "coupon_batch": {
				    "coupon_batch_id": "48390200020058042",
				    "coupon_batch_name": "母亲节大促"
				  },
				})
			},
			// 使用通用优惠券
			use: function(e) {
				let keynum = e.currentTarget.dataset.keynum;
				let money = e.currentTarget.dataset.money;
				let id = e.currentTarget.dataset.id;
				console.log(keynum)
				// 优惠券码
				let coupon_number = e.currentTarget.dataset.coupon_number;
				// 优惠券额度
				let coupon_name = e.currentTarget.dataset.coupon_name;
				// 购物车过来使用优惠券
				console.log(this.choose);
				if (this.choose=='1') {
					uni.reLaunch({
						url: '../shopping/shopping?coupon_number=' + coupon_number + '&coupon_name=' + coupon_name
					})
					// 这个就当个调转吧...
				} else if (this.choose==2) {
					// 返回一页
					uni.setStorageSync('coupon', id);
					uni.setStorageSync('coupon_keynum', keynum);
					uni.setStorageSync('coupon_number', coupon_number);
					uni.setStorageSync('coupon_money', money);
					console.log("coupon_money", money);
					console.log("coupon_number", coupon_number);
					uni.navigateBack({
						delta:1
					});
				} else {
					uni.setStorageSync('coupon', id);
					uni.setStorageSync('coupon_keynum', keynum);
					uni.setStorageSync('coupon_number', coupon_number);
					uni.setStorageSync('coupon_money', money);
					uni.reLaunch({
						url: '../index/index'
					})
				}
			},
			// 使用单品优惠券
			Single: function(e) {
				let keynum = e.currentTarget.dataset.keynum;
				let money = e.currentTarget.dataset.money;
				let id = e.currentTarget.dataset.id;
				console.log(keynum)
				// 优惠券码
				let coupon_number = e.currentTarget.dataset.coupon_number;
				// 优惠券额度
				let coupon_name = e.currentTarget.dataset.coupon_name;
				// 购物车过来使用优惠券
				console.log(this.choose);
				if (this.choose==1) {
					uni.reLaunch({
						url: '../shopping/shopping?coupon_number=' + coupon_number + '&coupon_name=' + coupon_name
					})
					// 查看对应单品...
				} else if (this.choose==2) {
					// 返回一页
					uni.setStorageSync('coupon', id);
					uni.setStorageSync('coupon_keynum', keynum);
					uni.setStorageSync('coupon_number', coupon_number);
					uni.setStorageSync('coupon_money', money);
					console.log("coupon_money", money);
					console.log("coupon_number", coupon_number);
					uni.navigateBack({
						delta:1
					});
				} else {
					uni.setStorageSync('coupon', id);
					uni.setStorageSync('coupon_keynum', keynum);
					uni.setStorageSync('coupon_number', coupon_number);
					uni.setStorageSync('coupon_money', money);
					uni.reLaunch({
						url: '../index/index'
					})
				}
			},
			// 切换导航
			nav: function(e) {
				let index = e.currentTarget.dataset.index;
				this.number = index;
			},
			// 领券中心
			receive: function(e) {
				uni.navigateTo({
					url: '../index-coupon/index-coupon'
				})
			},
			expiredCoupon: function(e) {
				uni.navigateTo({
					url: './ExpiredCoupon'
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #FAFAFA;
	}
	.new-coupon-content{
		width: 708rpx;
		margin: 0 auto 26rpx auto;
	}
	.new-coupon-content-li{
		width: 708rpx;
		height: 190rpx;
		position: relative;
		margin-top: 20rpx;
	}
	.new-coupon-img{
		width: 708rpx;
		height: 190rpx;
	}
	
	.new-coupon-view{
		/* position: absolute;
		top: 40rpx;
		left: 36prx; */
		margin-top: 40rpx;
	    margin-left: 36rpx;
	    position: absolute;
	    display: flex;
	}
	
	.new-coupon-left{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.new-coupon-lable{
		font-size: 33rpx;
		color: #FB503D;
	}
	
	.new-coupon-money{
		font-size: 55rpx;
		color: #FB503D;
		font-weight: bold;
	}
	.new-coupon-text{
		font-size: 20rpx;
		color: #666666;
		line-height: 28rpx;
		margin-top: 10rpx;
	}
	.new-coupon-desc{
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		line-height: 40rpx;
	}
	.new-coupon-coupontype{
		font-size: 20rpx;
		color: #666666;
		line-height: 28rpx;
		margin-top: 10rpx;
	}
	.new-coupon-right{
		position: absolute;
		top: 68rpx;
		right: 38rpx;
	}
	.new-coupon-button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 144rpx;
		height: 50rpx;
		background: linear-gradient(180deg, #FD8870 0%, #FB503D 100%);
		border-radius: 28rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 33rpx;
	}
	.new-coupon-time{
		position: absolute;
		bottom: 15rpx;
		left: 36rpx;
		font-size: 18rpx;
		color: #999999;
		line-height: 25rpx
	}
	
	.new-coupon-bottom{
		height: 60rpx;
		display: flex;
		align-items: center;
	    justify-content: center;
	}
	.new-coupon-bottom-text{
		font-size: 20rpx;
		color: #999999;
		line-height: 28rpx;
	}
</style>
