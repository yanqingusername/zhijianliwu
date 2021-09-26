<template>
	<view>
		<!-- 选项卡 -->
		<view class="coupon-header">
			<view class="coupon-header-content flex-between">
				<view class="coupon-header-nav" data-index='0' @click="nav" :class="[number==0?'coupon-header-nav-active':'']">未使用</view>
				<view class="coupon-header-nav" data-index='1' @click="nav" :class="[number==1?'coupon-header-nav-active':'']">已使用</view>
				<view class="coupon-header-nav" data-index='2' @click="nav" :class="[number==2?'coupon-header-nav-active':'']">已过期</view>
			</view>
		</view>
		<!-- 领券中心 -->
		<view class="coupon-core flex-vertically" @click="$buttonClick(receive)">
			<view class="coupon-core-left">
				<image class="img" src="../../static/coupon-core.png" mode=""></image>
			</view>
			<view class="coupon-core-alt">领券中心</view>
			<view class="coupon-core-right">
				<image class="img" src="../../static/core-right.png" mode=""></image>
			</view>
		</view>
		<!-- 全场通用券 -->
		<view class="coupon-h3">全场通用券</view>
		<view class="coupon-content">
			<!-- 未使用 -->
			<view class="coupon-content-li flex" v-if="number==0" v-for="(item,index) in top" :key="index">
				<view class="no-btm" v-if="top.length==0">
					<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				</view>
				<view class="coupon-content-left">
					<!-- 券 -->
					<view class="coupon-content-alt">
						<view class="coupon-content-coupon">指间券</view><span class="coupon-content-alt-left"></span>本券可购买任意礼物,不限产品满足消费金额支付即可时即可抵扣商品贷款
					</view>
					<!-- 时间 -->
					<view class="coupon-content-time">{{item.time}}</view>
					<view class="coupon-content-text flex-between flex-vertically">详细信息<view class="coupon-content-text-img">
							<image class="img" src="../../static/text-img.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="coupon-content-right">
					<view class="coupon-content-price"><span>￥</span>{{item.money}}</view>
					<view class="coupon-content-condition">{{item.coupon_type_info.coupon_name}}</view>
					<view class="coupon-content-button" :data-coupon_number="item.coupon_number" :data-coupon_name="item.money" :data-keynum="item.goodsinfo.keynum"
				 :data-money="item.money" :data-id="item.id" @click="use">立即使用</view>
				</view>
				<view class="coupon-content-circular-top"></view>
				<view class="coupon-content-circular-btm"></view>
			</view>
			<!-- 已使用   -->
			<view class="coupon-content-li flex" v-if="number==1" v-for="(item,index) in top1" :key="index">
				<view class="no-btm" v-if="top1.length==0">
					<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				</view>
				<view class="coupon-content-left">
					<!-- 券 -->
					<view class="coupon-content-alt coupon-no-alt">
						<view class="coupon-content-coupon coupon-no">指间券</view><span class="coupon-content-alt-left"></span>{{item.coupon_type_info.remark}}
					</view>
					<!-- 时间 -->
					<view class="coupon-content-time">{{item.time}}</view>
					<view class="coupon-content-text flex-between flex-vertically">详细信息<view class="coupon-content-text-img">
							<image class="img" src="../../static/text-img.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="coupon-content-right coupon-no">
					<view class="coupon-content-price coupon-no-price"><span>￥</span>{{item.money}}</view>
					<view class="coupon-content-condition">{{item.coupon_type_info.coupon_name}}</view>
				</view>
				<view class="coupon-content-circular-top"></view>
				<view class="coupon-content-circular-btm"></view>
				<view class="coupon-bottom-state coupon-no-right-state">
					<image class="img" src="https://zhijianlw.com/static/web/img/shiyong.png" mode="" lazy-load="true"></image>
				</view>
			</view>
			<!--  已过期 -->
			<view class="coupon-content-li flex" v-if="number==2" v-for="(item,index) in top2" :key="index">
				<view class="no-btm" v-if="top2.length==0">
					<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				</view>
				<view class="coupon-content-left">
					<!-- 券 -->
					<view class="coupon-content-alt coupon-no-alt">
						<view class="coupon-content-coupon coupon-no">指间券</view><span class="coupon-content-alt-left"></span>{{item.coupon_type_info.remark}}
					</view>
					<!-- 时间 -->
					<view class="coupon-content-time">{{item.time}}</view>
					<view class="coupon-content-text flex-between flex-vertically">详细信息<view class="coupon-content-text-img">
							<image class="img" src="../../static/text-img.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="coupon-content-right coupon-no">
					<view class="coupon-content-price coupon-no-price"><span>￥</span>{{item.money}}</view>
					<view class="coupon-content-condition">{{item.coupon_name}}</view>
				</view>
				<view class="coupon-content-circular-top"></view>
				<view class="coupon-content-circular-btm"></view>
				<view class="coupon-bottom-state coupon-no-right-state">
					<image class="img" src="https://zhijianlw.com/static/web/img/yiguoqi.png" mode="" lazy-load="true"></image>
				</view>
			</view>
		</view>

		<!-- 单品折扣券 -->
		<view class="coupon-h3">单品折扣券</view>

		<!-- 未使用 -->
		<view class="coupon-bottom flex" v-if="number==0" v-for="(item,index) in btm" :key="index">
			<view class="no-btm" v-if="btm.length==0">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
			</view>
			<!-- 左侧图 -->
			<view class="coupon-bottom-left">
				<image :src="'http://zhijianlw.com/'+item.goodsinfo.head_img" mode=""></image>
			</view>
			<!-- 内容 -->
			<view class="coupon-bottom-content">
				<view class="coupon-bottom-alt">{{item.goodsinfo.goodsname}}</view>
				<view class="coupon-bottom-price" v-if="level_name=='普通会员'">券后价￥{{item.goodsinfo.price_level0}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='指尖会员'">券后价￥{{item.goodsinfo.price_level1}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='plus会员'">券后价￥{{item.goodsinfo.price_level2}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='企业会员'">券后价￥{{item.goodsinfo.price_level3}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='合作伙伴'">券后价￥{{item.goodsinfo.price_level4}}</view>

				<view class="coupon-bottom-after" v-if="level_name=='普通会员'">券后价￥{{item.goodsinfo.price_level0-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='指尖会员'">券后价￥{{item.goodsinfo.price_level1-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='plus会员'">券后价￥{{item.goodsinfo.price_level2-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='企业会员'">券后价￥{{item.goodsinfo.price_level3-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='合作伙伴'">券后价￥{{item.goodsinfo.price_level4-item.money}}</view>
			</view>
			<!-- 领券 -->
			<view class="coupon-bottom-right">
				<view class="coupon-right-price"><span>￥</span>{{item.money}}</view>
				<view class="coupon-right-text">{{item.coupon_type_info.coupon_name}}</view>
				<view class="coupon-right-btm" :data-coupon_number="item.coupon_number" :data-coupon_name="item.money" :data-keynum="item.goodsinfo.keynum"
				 :data-money="item.money" :data-id="item.id" @click="Single">立即使用</view>
				<view class="coupon-right-time" v-if="item.time=='已过期'">{{item.time}}</view>
				<view class="coupon-right-time" v-else>仅剩{{item.time}}天</view>
			</view>
			<view class="coupon-content-circular-top"></view>
			<view class="coupon-content-circular-btm"></view>
			<view class="coupon-bottom-state">
				<image class="img" src="https://zhijianlw.com/static/web/img/yilingqu.png" mode="" lazy-load="true"></image>
			</view>
		</view>
		<!-- 已使用 -->
		<view class="coupon-bottom flex" v-if="number==1" v-for="(item,index) in btm1" :key="index">
			<view class="no-btm" v-if="btm1.length==0">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
			</view>
			<!-- 左侧图 -->
			<view class="coupon-bottom-left">
				<image :src="$utils.imageUrl(item.goodsinfo.head_img)" mode=""></image>
			</view>
			<!-- 内容 -->
			<view class="coupon-bottom-content coupon-no-content">
				<view class="coupon-bottom-alt coupon-no-alt">{{item.goodsinfo.goodsname}}</view>
				<view class="coupon-bottom-price" v-if="level_name=='普通会员'">券后价￥{{item.goodsinfo.price_level0}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='指尖会员'">券后价￥{{item.goodsinfo.price_level1}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='plus会员'">券后价￥{{item.goodsinfo.price_level2}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='企业会员'">券后价￥{{item.goodsinfo.price_level3}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='合作伙伴'">券后价￥{{item.goodsinfo.price_level4}}</view>

				<view class="coupon-bottom-after" v-if="level_name=='普通会员'">券后价￥{{item.goodsinfo.price_level0-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='指尖会员'">券后价￥{{item.goodsinfo.price_level1-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='plus会员'">券后价￥{{item.goodsinfo.price_level2-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='企业会员'">券后价￥{{item.goodsinfo.price_level3-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='合作伙伴'">券后价￥{{item.goodsinfo.price_level4-item.money}}</view>
			</view>
			<!-- 领券 -->
			<view class="coupon-bottom-right coupon-no">
				<view class="coupon-right-price coupon-no-right-price whi"><span>￥</span>{{item.money}}</view>
				<view class="coupon-right-text whi">{{item.coupon_type_info.coupon_name}}</view>
			</view>
			<view class="coupon-content-circular-top"></view>
			<view class="coupon-content-circular-btm"></view>
			<view class="coupon-bottom-state coupon-no-right-state">
				<image class="img" src="https://zhijianlw.com/static/web/img/shiyong.png" mode="" lazy-load="true"></image>
			</view>
		</view>
		<!-- 已过期 -->
		<view class="coupon-bottom flex" v-if="number==2" v-for="(item,index) in btm2" :key="index">
			<view class="no-btm" v-if="btm2.length==0">
				<image class="img" src="../../static/nobtm.jpg" mode=""></image>
			</view>
			<!-- 左侧图 -->
			<view class="coupon-bottom-left">
				<image :src="$utils.imageUrl(item.goodsinfo.head_img)" mode=""></image>
			</view>
			<!-- 内容 -->
			<view class="coupon-bottom-content coupon-no-content">
				<view class="coupon-bottom-alt coupon-no-alt">{{item.goodsinfo.goodsname}}</view>
				<view class="coupon-bottom-price" v-if="level_name=='普通会员'">券后价￥{{item.goodsinfo.price_level0}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='指尖会员'">券后价￥{{item.goodsinfo.price_level1}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='plus会员'">券后价￥{{item.goodsinfo.price_level2}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='企业会员'">券后价￥{{item.goodsinfo.price_level3}}</view>
				<view class="coupon-bottom-price" v-else-if="level_name=='合作伙伴'">券后价￥{{item.goodsinfo.price_level4}}</view>

				<view class="coupon-bottom-after" v-if="level_name=='普通会员'">券后价￥{{item.goodsinfo.price_level0-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='指尖会员'">券后价￥{{item.goodsinfo.price_level1-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='plus会员'">券后价￥{{item.goodsinfo.price_level2-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='企业会员'">券后价￥{{item.goodsinfo.price_level3-item.money}}</view>
				<view class="coupon-bottom-after" v-else-if="level_name=='合作伙伴'">券后价￥{{item.goodsinfo.price_level4-item.money}}</view>
			</view>
			<!-- 领券 -->
			<view class="coupon-bottom-right coupon-no">
				<view class="coupon-right-price coupon-no-right-price whi"><span>￥</span>{{item.money}}</view>
				<view class="coupon-right-text whi">{{item.coupon_type_info.coupon_name}}</view>
			</view>
			<view class="coupon-content-circular-top"></view>
			<view class="coupon-content-circular-btm"></view>
			<view class="coupon-bottom-state coupon-no-right-state">
				<image class="img" src="https://zhijianlw.com/static/web/img/yiguoqi.png" mode="" lazy-load="true"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import config from '../../common/config.js';
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
				url: ""
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
		},
		methods: {
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

		}
	}
</script>

<style>
	page {
		background-color: #F4F5F7;
	}
</style>
