<template>
	<view>
		<view class="" v-if="com==false">
			<view class="shop-no-img">
				<image src="https://zhijianlw.com/static/web/img/shop-no.png" class="img" mode=""></image>
			</view>
		</view>
		<!-- 地址栏 -->	
		<view class="address-bar" v-if="address.id != ''" @click="choiceAddress" style="margin-top: 28rpx;">
			<view class="address-border"></view>
			<view class="name">{{address.name}}</view>
			<view class="phone">{{address.phone}}</view>
			<view class="address">{{address.address}}</view>
			<view class="move">></view>
		</view>
		<view class="address-bar" v-else  @click="choiceAddress" style="margin-top: 28rpx;">
			<view class="address-border"></view>
			<view class="name"> </view>
			<view class="phone"> </view>
			<view class="address">选择地址</view>
			<view class="move">></view>
		</view>
		<!-- 有商品时 -->
		<view class="shop-commodity margin-auto" v-if="com!=false" style="margin-top: 24rpx; border-radius: 16rpx;">
			<view class="shop-ul margin-auto">
				<view class="shop-li flex margin-auto" v-for="(item,index) in commodity" :key="index" v-if="item.checked==1">
					<image class="shop-li-img" :src="$utils.imageUrl(item.head_img)" v-if="item.head_img" @click="details" :data-index="item.keynum"
					 mode=""></image>
					<image class="shop-li-img" src="../../static/nono.jpg" v-else mode="" @click="details" :data-index="item.goodsinfo.keynum"></image>
					<view class="shop-li-text">
						<view class="shop-li-title">{{item.goodsname}}</view>
						<!-- 描述 -->
						<veiw class="shop-li-alt" style="color:#333;">{{item.shopping_cart_goods_item}}</veiw>

						<view class="shop-li-price" v-if="level_name ==='普通会员'">￥{{item.price_level0}}</view>
						<view class="shop-li-price" v-else-if="level_name ==='指间会员'">￥{{item.price_level1}}</view>
						<view class="shop-li-price" v-else-if="level_name ==='plus会员'">￥{{item.price_level2}}</view>
						<view class="shop-li-price" v-else-if="level_name ==='企业会员'">￥{{item.price_level3}}</view>
						<view class="shop-li-price" v-else-if="level_name ==='合作伙伴'">￥{{item.price_level4}}</view>
						<view class="shop-li-price" v-else>￥{{item.price}}</view>

					</view>
					<view class="shop-li-bottom flex-vertically">
						<!-- <view class="shop-li-reduce" :data-index="index" :data-goodsid="item.goodsid" @click="reduce">-</view> -->
						<view class="shop-li-number">× {{item.num}}</view>
						<!-- <view class="shop-li-plus" :data-index="index" :data-goodsid="item.goodsid" @click="increase">+</view> -->
					</view>
				</view>
			</view>
		</view>


		<!-- 客户要的支付 -->
		<view class="shop-money" style="margin-bottom: 32rpx;">
			<!-- 商品金额 -->
			<view class="shop-money-li flex-between">
				<view class="shop-money-left">商品金额</view>
				<view class="shop-money-right">￥{{price_yuanshi}}</view>
			</view>
			<!-- 指间币 -->
			<view class="shop-money-li flex-between" style="height: 37rpx;line-height: 37rpx;">
				<view class="shop-money-left flex" style="line-height: 36rpx;">
					<view style="width:72rpx;font-size: 25rpx;line-height: 36rpx;white-space: nowrap">指间币</view>
					<span style="font-size: 20rpx;line-height: 36rpx;margin-left: 20rpx;;">(共{{zj_balance}}个,可用{{zj_balance}}个)</span>
				</view>
				<view class="shop-money-right">
					<switch color="#26a2ff" @change="switch1Change" :checked="use_zj_balance==1?true:false"/>
				</view>
			</view>
			<!-- 余额 -->
			<view class="shop-money-li flex-between" style="height: 37rpx;line-height: 37rpx;padding-bottom: 32rpx;">
				<view class="shop-money-left flex" style="line-height: 36rpx">
					<view style="width:22rpx;font-size: 25rpx;line-height: 36rpx;">余</view>
					<view style="line-height: 36rpx;width:22rpx;font-size: 25rpx;margin-left: 25rpx;">额</view>
					<span style="font-size: 20rpx;line-height: 36rpx;margin-left: 20rpx;;">(共￥{{balance}},可用￥{{balance}})</span>
				</view>
				<view class="shop-money-right">
					<switch color="#26a2ff" @change="switch2Change" :checked="use_balance==1?true:false"/>
				</view>
			</view>
			<!-- 优惠券 -->
			<view class="shop-money-li flex-between" @click="coupon" tyle="height: 25rpx;line-height: 25rpx;padding-bottom: 32rpx;">
				<view class="shop-money-left" style="line-height: 36rpx;white-space: nowrap">优惠券
					<span style="font-size: 20rpx;line-height: 36rpx;margin-left: 20rpx;color:#FF1E4E;">(已默认推荐使用)</span></view>
				<view class="shop-money-right" v-if="coupon_name">无</view>
				<view class="shop-money-right" v-else style="color:#FF0137;">-{{coupon_money}}￥<span style="font-size: 32rpx;color:#000000;">></span></view>
			</view>
			<view class="shop-money-li flex-between" tyle="height: 25rpx;line-height: 25rpx;padding-bottom: 32rpx;">
				<view class="shop-money-left" style="line-height: 36rpx;white-space: nowrap">配送方式</view>
				<picker :value="delivery_mode_index" :range="delivery_mode_arr" 
				 @change="deliveryModeChange" style="width: 100%;height: 36rpx;">
					<view style="text-align: right; line-height: 36rpx;">{{delivery_mode_arr[delivery_mode_index]}}</view>
				</picker>
			</view>
			<!-- 合计 -->
			<view class="shop-money-btm" style="font-weight: bold; border-top: 2.08rpx solid #ECECEC;">
				合计:<span>￥{{ total_price }}</span>
			</view>
		</view>
		<!-- 支付 无商品时背景 -->
		<form @submit="forsubmit" v-if="com==false">
			<button class="shop-payment s" v-if="sta==0" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" style="padding: 0;background: #E27F8C;z-index:1;">添加商品</button>
			<!-- <button class="shop-payment s" v-else-if="sta==200" form-type="submit">添加商品</button> -->
		</form>
		<view class="index-tabbar-kong"></view>
		<!-- 底部选项卡 -->
		<view class="index-tabbar flex">
			<!-- 合计 -->
			<view class="shop-money-btm" style="font-weight: bold;text-align: left;margin-left: 28rpx;
    font-size: 16px;">
				合计:<span>{{ total_price }}</span>
				<p style="font-size: 12px;display: inline;color: #888888;margin-left: 8rpx;">
					本次共为您节省￥{{ save_money }}
				</p>
			</view>
			<form @submit="forsubmit" v-if="com==true" style="width: auto;">
				<button class="shop-payment shop-payment-active" form-type="submit" style="margin: 0;width: 200rpx;">付款</button>
			</form>
		</view>

	</view>

</template>

<script>
	import MD5 from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	import config from '../../common/config.js';
	export default {
		data: function() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				ip: '',
				// 头像
				head_img: '',
				input: '',
				sta: '',
				array: [],
				nul: [],
				years,
				year,
				month,
				days,
				day,
				display: false,
				zjb: 0,
				rmb: 0,
				numbers: '1',
				delivery_mode: '快递',
				delivery_mode_arr: ["快递", "同城", "自提"],
				delivery_mode_index: 0,
				address: {},
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				height: '',
				commodity: [],
				choose: 'false',
				id: '',
				// 玩法  0  1  2  3
				number: '0',
				level_name: '',
				com: '',
				num: '',
				num0: '',
				num1: '',
				num2: '',
				num3: '',
				num4: '',
				share: '1',
				times: '',
				key: '',
				merchantCode: '',
				openid: '',
				notifyUrl: "",
				cardbag_numbe: '',
				length: '',
				price_zhe: '0',
				price_zhekou: '0',
				nav: '',
				price_yuanshi: '',
				switch1: '',
				switch2: '',
				zj_balance: '',
				balance: '',
				coupon_id: '',
				coupon_number: '',
				coupon_name: '',
				coupon_money: '',
				zhufu_msg: '恭喜发财,大吉大利',
				// 当前时间
				nowtime: '',
				// 月份
				month: '',
				// 天数
				date: '',
				// 小时
				hours: '',
				// 分钟
				minutes: '',
				// 月份数组
				months: [],
				// 天数数组
				dates: [],
				// 小时数组
				hour: [],
				// 分钟数组
				minute: [],
				// 八个字
				topback: '',
				// 模板图
				templateimg: '',
				cardbag_number: '',
				numberss: '',
				showa: '',
				openid: '',
				Data: '',
				timeStamp: '',
				outTradeNo: '',
				url: "",
				use_zj_balance: 1,
				use_balance: 1,
			}
		},
		onShow: function(e) {
			this.url = config.URL;
			var data = '{}';
			var action = 'get_webconfig_songli';
			this.$set(this.address, 'id', uni.getStorageSync('member_area_id'));
			this.$set(this.address, 'name', uni.getStorageSync('member_area_linkman'));
			this.$set(this.address, 'phone', uni.getStorageSync('member_area_linktel'));
			this.$set(this.address, 'address', uni.getStorageSync('member_area_address'));
			this.$utils.post(action, data).then(res => {
				console.log('送礼页面配置', res)
				if (res.sta == 1) {
					// 八个字
					this.topback = res.rs.background;
					// 模板图
					this.templateimg = res.rs.moban_img;
				}
			})



			if (this.showa == 1) {

				// this.chaxun();
				// 送礼页面基本配置

				// 指间币
				this.zj_balance = uni.getStorageSync('zj_balance');
				// 余额
				this.balance = uni.getStorageSync('balance');

				var data = '{"memberid":"' + this.memberid + '"}';
				var action = 'get_buy_shopping_cart';

				this.$utils.post(action, data).then(res => {
					console.log('商品', res)
					let numberss = 0;
					if (res.sta == 1) {

						for (let i in res.rs.goodslist) {
							numberss += Number(res.rs.goodslist[i].goodsnum)
						}
						this.numberss = numberss


						this.length = res.rs.goodslist.length;
						if (res.rs.goodslist.length >= 1) {


							this.price_yuanshi = res.rs.price_yuanshi;
							this.price_zhe = res.rs.price_zhe
							let zhekou = res.rs.price_yuanshi - res.rs.price_zhe;
							if (zhekou == 0) {
								this.price_zhekou = '0';
							} else {
								this.price_zhekou = zhekou.toFixed(2);
							}
							console.log(this.price_yuanshi)

							this.commodity = res.rs.goodslist;

							this.com = true
						} else {
							this.com = false
						}
					} else {
						this.length = 0;
					}

				})
			}

			this.coupon_id = uni.getStorageSync('coupon_id');
			this.coupon_keynum = uni.getStorageSync('coupon_keynum');
			this.coupon_money = uni.getStorageSync('coupon_money');
			this.coupon_number = uni.getStorageSync('coupon_number');
		},
		onLoad: function(e) {
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			this.use_balance = 1;
			this.use_zj_balance = 1;
			this.openid = uni.getStorageSync('openid');
			this.id = uni.getStorageSync('id');


			// 送礼页面基本配置
			var data = '{}';
			var action = 'get_webconfig_songli';

			this.$utils.post(action, data).then(res => {
				console.log('送礼页面配置', res)
				if (res.sta == 1) {
					// 八个字
					this.topback = res.rs.background;
					// 模板图
					this.templateimg = res.rs.moban_img;
				}
			})


			// 1.判断当前登录状态    200已登录   0未登录
			var sign = uni.getStorageSync('sign')
			this.head_img = sign.head_img;
			if (sign) {
				this.level_name = sign.level_name;
				let that = this;
				let time = setTimeout(function(e) {
					that.showa = 1;
					clearTimeout(time)
				}, 100)

				this.sta = '200';
			} else {
				this.open();
				this.sta = '0';
				// 供浏览使用 
				this.level = 1;
				this.level_name = '普通会员';
				uni.setStorageSync('level', 1)
				uni.setStorageSync('level_name', '普通会员')
			}

			// 时间选择器 

			// 当前时间戳
			let myData = new Date();

			// 当前年份
			let year = myData.getFullYear();
			// 当前月份
			let month = myData.getMonth() + 1;
			// 当前天数
			let date = myData.getDate();
			// 当前星期几
			let day = myData.getDay();
			// 当前小时
			let hours = myData.getHours();
			// 当前分钟
			let minutes = myData.getMinutes();

			// 当前月份天数
			let nowDate = new Date(year, month, 0).getDate();


			// 月份数组
			let months = [];
			// 天数数组
			let dates = [];
			// 小时数组
			let hour = [];
			// 分钟数组
			let minute = [];



			console.log('年', year);
			console.log('月', month);
			console.log('日', date);
			console.log('星期', day);
			console.log('小时', hours);
			console.log('分钟', minutes);

			if (day == 0) {
				day = '天'
			} else if (day == 1) {
				day = '一'
			} else if (day == 2) {
				day = '二'
			} else if (day == 3) {
				day = '三'
			} else if (day == 4) {
				day = '四'
			} else if (day == 5) {
				day = '五'
			} else if (day == 6) {
				day = '六'
			}
			this.nowtime = month + '月' + date + '日星期' + day + '  ' + hours + ':' + minutes;
			this.times = year + '-' + month + '-' + date + '  ' + hours + ':' + minutes;

			// 月份
			for (let i = month; i < 13; i++) {
				months.push(i)

			}
			this.months = months;

			console.log(new Date(year, 7, 13).getDay())
			// 当前月份+天数
			for (let i in months) {

				// 遍历剩下月份天数
				let nowDate = new Date(year, months[i], 0).getDate();

				for (let j = 1; j < nowDate + 1; j++) {

					let day = new Date(year, months[i] - 1, j).getDay();

					if (day == 0) {
						day = '天'
					} else if (day == 1) {
						day = '一'
					} else if (day == 2) {
						day = '二'
					} else if (day == 3) {
						day = '三'
					} else if (day == 4) {
						day = '四'
					} else if (day == 5) {
						day = '五'
					} else if (day == 6) {
						day = '六'
					}


					dates.push(months[i] + '月' + j + '日' + '星期' + day)
				}
			}

			// 删除当前已过天数
			dates.splice(0, date - 1)
			this.dates = dates;

			// 当前小时
			for (let i = hours; i < 24; i++) {
				if (i < 10) {
					this.hour.push('0' + i);
				} else {
					this.hour.push(i);
				}
			}
			// 当前分钟
			for (let i = minutes; i < 60; i++) {
				if (i < 10) {
					this.minute.push('0' + i)
				} else {
					this.minute.push(i)
				}
			}
			var memberid = uni.getStorageSync('id');
			// 祝福模板
			var data = '{"memberid":"' + memberid + '"}';
			var action = 'get_zhufu_theme';

			this.$utils.post(action, data).then(res => {
				console.log('当前祝福模板', res)
				if (res.sta == 1) {
					if (res.rs.zhufu_type == 0) {
						this.zhufu_msg = res.rs.zhufu_msg;
					}
				}

			})

			for (let i = 1; i < 101; i++) {
				this.array.push(i)
			}
			for (let i = 1; i < 10; i++) {
				this.nul.push(i)
			}

			uni.getSystemInfo({
				success: res => {
					// 导航高度
					this.nav = res.statusBarHeight

				}
			})

			this.level_name = uni.getStorageSync('level_name')

			uni.getSystemInfo({
				success: (res) => {
					this.height = res.windowHeight;
				},

			})
			this.memberid = memberid;
			var data = '{"memberid":"' + memberid + '"}';
			var action = 'get_buy_shopping_cart';

			this.$utils.post(action, data).then(res => {
				console.log('商品', res)
				uni.hideLoading();

				if (res.sta == 1) {


					let numberss = 0

					for (let i in res.rs.goodslist) {
						numberss += Number(res.rs.goodslist[i].goodsnum)
					}
					this.numberss = numberss

					this.length = res.rs.goodslist.length;
					if (res.rs.goodslist.length >= 1) {

						this.price_yuanshi = res.rs.price_yuanshi;
						this.price_zhe = res.rs.price_zhe
						let zhekou = res.rs.price_yuanshi - res.rs.price_zhe;

						if (zhekou == 0) {
							this.price_zhekou = '0';
						} else {
							this.price_zhekou = zhekou.toFixed(2);
						}
						console.log(this.price_yuanshi)

						this.commodity = res.rs.goodslist;
						console.log("：", res.rs.goodslist);
						this.com = true
					} else {
						this.com = false
					}
				} else {
					this.length = 0;
				}

				if (e.fenshu) {
					console.log('页面加载', e)
					// 玩法
					let number = e.type - 1;
					this.number = number;
					// 批量
					if (number == 1) {
						this.numbers = Number(e.fenshu);
					} else if (number == 3) {
						this.numbers = '1 : ' + Number(e.fenshu);
					}
					// 其他
					else {
						this.numbers = Number(e.fenshu);
					}
					// 份数
					this.share = e.fenshu;

					this.calculation();
				} else {
					console.log('页面加载不存在', e)
				}

			})


			// 指间币
			this.zj_balance = uni.getStorageSync('zj_balance');
			// 余额
			this.balance = uni.getStorageSync('balance');


			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
				'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
			];

			var nums = "";

			for (var i = 0; i < 32; i++) {
				0.


				var id = parseInt(Math.random() * 61);

				nums += chars[id];

			}

			this.nums = nums;

			this.timeStamp = new Date().getTime();

			var data = '{}';
			var action = 'get_payconfig';

			this.$utils.post(action, data).then(res => {
				console.log('第三方参数', res)
				this.appid = res.rs.appid;
				this.key = res.rs.key;
				this.merchantCode = res.rs.merchantCode;
			})
			// 是否有优惠券
			if (e.coupon_number) {
				this.coupon_number = e.coupon_number;
				this.coupon_name = '-￥' + e.coupon_name;
			}
			console.log(this.commodity);
		},
		methods: {
			tabbar: function(e) {
				let index = e.currentTarget.dataset.index;
				if (index == 0) {
					uni.switchTab({
						url: '../index/index'
					})
				} else if (index == 1) {
					uni.switchTab({
						url: '../shopping/shopping'
					})
				} else if (index == 2) {
					uni.switchTab({
						url: '../classification/classification'
					})
				} else if (index == 3) {
					uni.switchTab({
						url: '../order/order'
					})
				} else if (index == 4) {
					uni.switchTab({
						url: '../personal/personal'
					})
				}
			},
			details: function(e) {
				let index = e.currentTarget.dataset.index;

				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
			
			// 余额选中
			switch2Change: function(e) {
				// console.log(e.detail.value)
				this.switch2 = e.detail.value;
				this.use_balance = e.detail.value ? 1 : 0;
				console.log("余额", this.use_balance);
			},
			// 选择优惠券
			coupon: function(e) {
				if (this.sta == 200) {
					uni.navigateTo({
						url: '../Coupon/Coupon?choose=' + '2'
					})
				} else if (this.sta == 0) {
					wx.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}

			},
			
			forsubmit: function(e) {
				var that = this;
				if (this.length == 0) {
					if (this.sta == 0) {
						wx.showToast({
							title: '请先登录',
							icon: 'none'
						})
					}
				} else if (this.length > 0) {

					// 玩法  wanfa
					let wanfa = Number(this.number) + 1;
					// 优惠券
					// let coupon_number = "202007281146152159913922";
					let coupon_number = this.coupon_number;
					console.log("coupon_number")
					console.log(coupon_number)
					let data = JSON.stringify({
						memberid: this.memberid,
						member_area_id: this.address.id,
						delivery_type: this.delivery_mode_arr[this.delivery_mode_index],
						coupon_number: this.coupon_number,
						use_balance: this.use_balance,
						use_zj_balance: this.use_zj_balance,
					});
					console.log(data)
					var action = 'create_buy_order';

					this.$utils.post(action, data).then(res => {
						console.log(res);
						if (res.pay_status == 1) {
							uni.showToast({
								title: "支付成功"
							})
							uni.redirectTo({
								url:'../orderList/orderList'
							})
							uni.setStorageSync('coupon', '');
							uni.setStorageSync('coupon_keynum', '');
							uni.setStorageSync('coupon_number',  '');
							uni.setStorageSync('coupon_money', '');
						}
						else if (res.pay_status == 0) {
							// 获取流水单号
							let action = 'get_buy_order_pay_info';
							let data = JSON.stringify({
								ordernumber: res.ordernumber
							});
							this.$utils.post(action, data).then(res => {
								console.log("获取流水号", res);
								let serial_number = res.rs.serial_number;
								// 获取ip
								uni.request({
									url: 'https://zhijianlw.com/api.php/test/getip',
									success: (res) => {
										console.log(res.data);
										let action = 'add_paylog_to_wx';
										let data = JSON.stringify({
											serial_number: serial_number,
											ip: res.data.ip,
											openid: this.openid,
											type: 'buy_order',
										});
										this.$utils.post(action, data).then(res => {
											console.log('获取参数', res)
											// var serial_number = res.rs.serial_number;
											let arr = [];
											
											const date = {
												// 合作方标识
												appId: 'appId=wx9c53a99b078435f5',
												timeStamp: 'timeStamp=' + this.timeStamp,
												nonceStr: 'nonceStr=' + this.nums,
												package: 'package=prepay_id=' + res.rs.prepay_id,
												signType: 'signType=MD5',
											}
											
											console.log('拼接前', date)
											
											for (let i in date) {
												arr.push(date[i])
											}
											
											arr.sort();
											
											let stringA = '';
											
											// 拼接字符串
											for (let i in arr) {
												if (i == arr.length - 1) {
													stringA += arr[i];
												} else {
													stringA += arr[i] + '&';
												}
											}
											// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
											let stringSignTemp = stringA + '&key=45579fcdb646746f02d9e041d50975b4';
											
											console.log('拼接后', stringSignTemp)
											let sign = MD5.hexMD5(stringSignTemp);
											console.log(sign)
											
											
											uni.hideLoading();
											
											uni.requestPayment({
												timeStamp: String(this.timeStamp),
												nonceStr: this.nums,
												package: 'prepay_id=' + res.rs.prepay_id,
												signType: 'MD5',
												paySign: sign.toUpperCase(),
												success(res) {
													uni.hideLoading();
													uni.request({
														url: 'https://zhijianlw.com/api.php/test/set_agent_cardbag',
														data: {
															serial_number: that.outTradeNo
														},
														header: {
															'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
														},
														method: 'GET',
														// 成功回调
														success: (res) => {
															console.log('微信成功回调', res)
															uni.showToast({
																title: '支付成功',
																icon: 'none'
															})
															uni.setStorageSync('coupon', '');
															uni.setStorageSync('coupon_keynum', '');
															uni.setStorageSync('coupon_number',  '');
															uni.setStorageSync('coupon_money', '');
															uni.redirectTo({
																url:'../orderList/orderList'
															})
														},
													})
												},
												fail(res) {
													uni.hideLoading();
													console.log(res)
													uni.showToast({
														title: '支付失败',
														icon: 'none'
													})
													that.commodity = '',
													uni.redirectTo({
														url:'../orderList/orderList'
													})
												},
											})
										})
									}
								});
							})
						}
						else {
							uni.showToast({
								icon: "none",	
								title: res.msg?res.msg:"支付错误"
							})
						}
					})
				}


			},
			// 微信支付
			wx: function(e) {
				var that = this;
				let cardbag_number = this.cardbag_number;
				// let  cardbag_number = "202009251006539216673724"
				let ip = this.ip;
				let openid = this.openid;
				var data = '{"serial_number":"' + that.outTradeNo + '","ip":"' + ip + '","openid":"' + openid +
					'","type":"cardbag"}';
				var action = 'add_paylog_to_wx';
				console.log(data)
				this.$utils.post(action, data).then(res => {
					console.log('获取参数', res)
					// var serial_number = res.rs.serial_number;
					let arr = [];

					const date = {
						// 合作方标识
						appId: 'appId=wx9c53a99b078435f5',
						timeStamp: 'timeStamp=' + this.timeStamp,
						nonceStr: 'nonceStr=' + this.nums,
						package: 'package=prepay_id=' + res.rs.prepay_id,
						signType: 'signType=MD5',

					}


					console.log('拼接前', date)

					for (let i in date) {
						arr.push(date[i])
					}

					arr.sort();

					let stringA = '';

					// 拼接字符串
					for (let i in arr) {
						if (i == arr.length - 1) {
							stringA += arr[i];
						} else {
							stringA += arr[i] + '&';
						}

					}
					// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
					let stringSignTemp = stringA + '&key=45579fcdb646746f02d9e041d50975b4';

					console.log('拼接后', stringSignTemp)
					let sign = MD5.hexMD5(stringSignTemp);
					console.log(sign)


					uni.hideLoading();

					uni.requestPayment({
						timeStamp: String(this.timeStamp),
						nonceStr: this.nums,
						package: 'prepay_id=' + res.rs.prepay_id,
						signType: 'MD5',
						paySign: sign.toUpperCase(),
						success(res) {
							uni.hideLoading();
							uni.request({
								url: 'https://zhijianlw.com/api.php/test/set_agent_cardbag',
								data: {
									serial_number: that.outTradeNo
								},
								header: {
									'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
								},
								method: 'GET',
								// 成功回调
								success: (res) => {
									console.log('微信成功回调', res)
								},
							})
							uni.showModal({
								title: '微信支付',
								content: '支付成功',
								cancelText: '查看订单',
								confirmText: '立即赠送',
								success(res) {
									if (res.confirm) {
										console.log('点击立即赠送')
										that.zengsong()
									} else if (res.cancel) {
										console.log('点击查看详情')
										let cardbag_number = that.cardbag_number;
										uni.switchTab({
											url: '../order/order'
										})
									}
								}
							})

						},
						fail(res) {
							uni.hideLoading();
							console.log(res)
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							})
							that.commodity = ''
						}
					})


				})
			},
			ipp: function(e) {
				var that = this;
				// 获取IP地址
				uni.request({
					url: 'https://pv.sohu.com/cityjson?ie=utf-8',
					success: function(e) {
						console.log(e)
						var aaa = e.data.split(' ');
						var bbb = aaa[4]
						var ccc = bbb.replace('"', '')
						var ddd = ccc.replace('"', '')
						var eee = ddd.replace(',', '')
						that.ip = eee;
						that.wx();
					}
				})

			},
			// 二维码
			code: function(e) {
				this.display = false
			},
			// 操作指南
			operation: function(e) {
				uni.navigateTo({
					url: ''
				})
			},
			signIn: function(e) {
				uni.navigateTo({
					url: '../signin/signin'
				})
			},
			// 立即开通
			now: function(e) {
				if (this.sta == 200) {
					uni.navigateTo({
						url: '../Member/Member'
					})
				} else if (this.sta == 0) {
					uni.navigateTo({
						url: '../signin/signin'
					})
				}

			},
			inputChoose: function(e) {
				this.numbers = e.target.value;
				this.share = 1 + Number(e.detail.value);
				this.calculation();
			},
			// 份数选择
			bindPickerChange: function(e) {
				if (this.number == 1) {
					this.numbers = 1 + Number(e.detail.value);
				} else {
					this.numbers = 1 + Number(e.detail.value);
				}
				this.share = 1 + Number(e.detail.value);

				this.calculation();
			},
			// 空包选择
			EmptyPacket: function(e) {
				this.numbers = '1 : ' + (1 + Number(e.detail.value));
				this.share = 1 + Number(e.detail.value);
			},
			// 时间选择
			bindChange: function(e) {
				console.log(e)

				const val = e.detail.value

				let myData = new Date();
				let hour = [];
				let minute = [];
				// 重置时间
				if (val[0] > 0) {
					console.log('更换日')
					this.hour = [];
					this.minute = [];

					// 当前小时
					for (let i = 0; i < 24; i++) {
						if (i < 10) {
							hour.push('0' + i);
						} else {
							hour.push(i);
						}
					}

					// 当前分钟
					for (let i = 0; i < 60; i++) {
						if (i < 10) {
							minute.push('0' + i)
						} else {
							minute.push(i)
						}
					}
				} else {



					// 当前小时
					let hours = myData.getHours();
					// 当前分钟
					let minutes = myData.getMinutes();
					// 当前小时
					for (let i = hours; i < 24; i++) {
						if (i < 10) {
							hour.push('0' + i);
						} else {
							hour.push(i);
						}
					}


					if (val[1] > 0) {
						// 当前分钟
						for (let i = 0; i < 60; i++) {
							if (i < 10) {
								minute.push('0' + i)
							} else {
								minute.push(i)
							}
						}
					} else {
						// 当前分钟
						for (let i = minutes; i < 60; i++) {
							if (i < 10) {
								minute.push('0' + i)
							} else {
								minute.push(i)
							}
						}
					}




				}
				this.hour = hour;
				this.minute = minute;

				this.nowtime = this.dates[val[0]] + '' + this.hour[val[1]] + ':' + this.minute[val[2]]



				// 正则提取数字
				let time = this.dates[val[0]].match(/\d+/g);

				let year = myData.getFullYear();
				let month = time[0];
				let date = time[1];
				let hours = this.hour[val[1]];
				let minutes = this.minute[val[2]];

				this.times = year + '-' + month + '-' + date + '  ' + hours + ':' + minutes


			},
			// 加法
			increase: function(e) {

				let goodsid = e.currentTarget.dataset.goodsid;
				let index = e.currentTarget.dataset.index;
				this.commodity[index].goodsnum++;
				this.goodsid = goodsid;
				this.goodsnum = 1;
				this.give();


			},
			// 减法
			reduce: function(e) {
				let goodsid = e.currentTarget.dataset.goodsid;
				let index = e.currentTarget.dataset.index;


				if (this.commodity[index].goodsnum == 1) {
					this.commodity.splice(index, 1)
					console.log("删除")
				} else {
					console.log('不删除')
					this.commodity[index].goodsnum--;

				}

				this.goodsnum = -1;
				this.goodsid = goodsid;
				this.give();

			},
			// 加减数量
			give: function(e) {

				var data = '{"memberid":"' + this.id + '","goodsid":"' + this.goodsid + '","goodsnum":"' + this.goodsnum + '"}';
				var action = 'add_goods_to_giftbag';
				console.log(data)
				this.$utils.post(action, data).then(res => {
					console.log('添加购物车', res)

					var data = '{"memberid":"' + this.memberid + '"}';
					var action = 'get_buy_shopping_cart';

					this.$utils.post(action, data).then(res => {
						console.log('更改价格', res)


						let numberss = 0

						for (let i in res.rs.goodslist) {
							numberss += Number(res.rs.goodslist[i].goodsnum)
						}
						this.numberss = numberss

						this.price_zhe = res.rs.price_zhe;
						this.price_yuanshi = res.rs.price_yuanshi
						let zhekou = res.rs.price_yuanshi - res.rs.price_zhe;

						if (zhekou == 0) {
							this.price_zhekou = '0';
						} else {
							this.price_zhekou = zhekou.toFixed(2);
						}



					})
				})

				console.log(this.commodity)
				if (this.commodity.length == 0) {
					this.com = false;
				}
			},
			// 选择份数
			calculation: function(e) {

				var data = '{"memberid":"' + this.id + '","fenshu":"' + this.share + '"}';
				console.log('选择份数参数', data)
				var action = 'get_fenshu_price';

				this.$utils.post(action, data).then(res => {
					console.log('选择份数', res.rs)

					this.price_zhe = res.rs.price_zhe;
					let zhekou = res.rs.price_yuanshi - res.rs.price_zhe;
					this.price_yuanshi = res.rs.price_yuanshi;
					if (zhekou == 0) {
						this.price_zhekou = '0';
					} else {
						this.price_zhekou = zhekou.toFixed(2);
					}

				})

			},
			// 更多玩法 显示
			choosebtn: function(e) {
				this.choose = true;
			},
			// 选择玩法
			btn: function(e) {
				let index = e.currentTarget.dataset.index;

				if (index == 4) {

				} else if (index == 1) {
					this.number = index;
					this.numbers = '1'
				} else if (index == 3) {
					this.number = index;
					this.numbers = '1:1'
				} else {
					this.number = index;
					this.numbers = '1'
				}
				this.choose = false;
			},

			// 选择模板
			template: function(e) {

				var fenshu = 0;
				if (this.number == 0) {
					fenshu = this.share
				} else if (this.number == 1) {
					fenshu = 1;
				} else {
					for (let i in this.commodity) {
						fenshu += this.commodity[i].goodsnum;
					}
				}
				uni.navigateTo({
					url: "../template/template?fenshu=" + fenshu
				})

			},

			chaxun: function(e) {
				let arr = [];


				const date = {
					// 合作方标识
					appId: 'appId=' + this.appid,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
				}

				console.log(date)

				for (let i in date) {
					arr.push(date[i])
				}

				arr.sort();

				let stringA = '';

				// 拼接字符串
				for (let i in arr) {
					if (i == arr.length - 1) {
						stringA += arr[i];
					} else {
						stringA += arr[i] + '&';
					}

				}
				let stringSignTemp = stringA + '&key=' + this.key;


				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)

				const datt = {
					// 合作方标识
					appId: 'appId=' + this.appid,
					//  签名
					sign: 'sign=' + sign,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
				}
				console.log(datt)
				let arrr = [];

				for (let i in datt) {
					arrr.push(datt[i])
				}

				arrr.sort();

				let string = '';

				// 拼接字符串
				for (let i in arrr) {
					if (i == arrr.length - 1) {
						string += arrr[i];
					} else {
						string += arrr[i] + '&';
					}

				}
				console.log('字符串', string)


				uni.request({
					url: 'https://api.liantuofu.com/open/pay/query',
					data: string,
					header: {
						'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
					},
					method: 'POST',
					// 成功回调
					success: (res) => {
						console.log('订单状态', res.data)

						if (res.data.msg == "订单已支付") {
							wx.showToast({
								title: '支付成功',
								mask: true,
								success: (res) => {
									setTimeout(function(e) {
										uni.reLaunch({
											url: '../order/order'
										})
									}, 1500)
								}
							})
						}
					}
				})
			},
			xiaochengxu: function(e) {
				let that = this;
				let arr = [];

				const date = {
					// 合作方标识
					// appId: 'appId=' + 'EW_N3213842400',
					appId: 'appId=' + this.appid,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					// merchantCode:'merchantCode=' + 'EW_N5247492162',
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
					notifyUrl: 'notifyUrl=' + this.notifyUrl
				}

				console.log(date)

				for (let i in date) {
					arr.push(date[i])
				}

				arr.sort();

				let stringA = '';

				// 拼接字符串
				for (let i in arr) {
					if (i == arr.length - 1) {
						stringA += arr[i];
					} else {
						stringA += arr[i] + '&';
					}

				}
				// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
				let stringSignTemp = stringA + '&key=' + this.key;

				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)

				const datt = {
					// 合作方标识
					// appId:'appId=' + 'EW_N3213842400',
					appId: 'appId=' + this.appid,
					//  签名
					sign: 'sign=' + sign,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号   
					// merchantCode:'merchantCode=' + 'EW_N5247492162',
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
					notifyUrl: 'notifyUrl=' + this.notifyUrl
				}
				console.log(datt)
				let arrr = [];

				for (let i in datt) {
					arrr.push(datt[i])
				}
				arrr.sort();
				let string = '';

				// 拼接字符串
				for (let i in arrr) {
					if (i == arrr.length - 1) {
						string += arrr[i];
					} else {
						string += arrr[i] + '&';
					}
				}
				console.log('字符串', string)
				uni.request({
					url: 'https://api.liantuofu.com/open/precreate',
					data: string,
					header: {
						'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
					},
					method: 'POST',
					// 成功回调
					success: (res) => {
						console.log(res.data)
						console.log('判断一下', res)
						uni.hideLoading()

						if (res.statusCode == 200) {
							wx.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.payPackage,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success(res) {
									// 一级页面用switchTab   二级页面用redirectTo
									wx.showModal({
										title: '微信支付',
										content: '支付成功',
										cancelText: '查看订单',
										confirmText: '立即赠送',
										success(res) {
											if (res.confirm) {
												console.log('点击立即赠送')
												that.zengsong()
											} else if (res.cancel) {

												console.log('点击查看详情')
												let cardbag_number = that.cardbag_number;
												uni.switchTab({
													url: '../order/order'
												})
												
											}
										}
									})
								},
								fail(res) {
									console.log(res)
									uni.showToast({
										title: '支付失败',
										icon: 'none'
									})
								}
							})
						} else {
							uni.showToast({
								title: res.subMsg,
								icon: 'none'
							})
						}
					},
				})
			},
			zengsong: function(e) {
				var that = this;
				console.log('赠送')
				let cardbag_number = that.cardbag_number;
				let price = that.price_zhe;
				console.log(that.price_zhe)
				this.price_yuanshi = 0;
				this.price_zhe = 0;
				var data = '{"cardbag_number":"' + cardbag_number + '"}';
				var action = 'share_cardbag';
				this.$utils.post(action, data).then(res => {
					console.log('赠送好友', res)
					if (res.sta == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
							mask: true,
							success: (res) => {
								setTimeout(function(e) {
									uni.navigateTo({
										url: '../success/success?cardbag_number=' + cardbag_number + '&price=' + price
									})
								}, 1500)
							}
						})
					}
				})
			},
			// 获取openid
			open: function() {
				var openid = uni.getStorageSync('openid');

				// 判断是否获取
				if (openid) {
					this.openid = openid;
					console.log('已获取openid')
				} else {
					// 获取openid
					uni.login({
						success: (res) => {
							var data = '{"wx_code":"' + res.code + '"}';
							var action = 'get_openid';
							this.$utils.post(action, data).then(res => {
								console.log('openid', res)
								uni.setStorageSync('openid', res.openid);
								this.openid = res.openid;
							});
						}
					})
				}
			},
			bindGetUserInfo(e) {
				// 用户信息
				if (e.detail.rawData) {
					this.Data = JSON.parse(e.detail.rawData);
					this.zhu();
					uni.showLoading({
						title: '登录中',
						mask: 'true'
					})
				}

			},
			zhu: function() {
				// 基本信息
				var rawdata = this.Data;
				// openid
				var openid = this.openid;
				uni.setStorageSync('rawdata', rawdata)
				// 推荐人id parent_member  
				// 手机号  Phone
				var data = '{"wx_openid":"' + openid + '","name":"' + rawdata.nickName + '","sex":"' + rawdata.gender +
					'","head_img":"' + rawdata.avatarUrl + '"}';
				console.log(data)
				// 注册接口
				var action = 'member_register';

				this.$utils.post(action, data).then(res => {
					console.log('注册', res)
					uni.hideLoading();
					if (res.msg === "操作成功！" || res.msg === '该用户已经注册,请勿重复注册！') {
						//登录 
						var data = '{"wx_openid":"' + openid + '"}';
						var action = 'member_login';
						this.$utils.post(action, data).then(res => {
							uni.setStorageSync('NO', res.rs.NO)
							console.log('基本信息', res.rs)
							// 全部
							uni.setStorageSync('sign', res.rs)
							// 会员id
							uni.setStorageSync('id', res.rs.id)
							// 会员昵称
							uni.setStorageSync('name', res.rs.name)
							// 会员唯一标识
							uni.setStorageSync('keynum', res.rs.keynum)
							// 会员性别
							uni.setStorageSync('sex', res.rs.sex)
							// 会员头像
							uni.setStorageSync('head_img', res.rs.head_img)
							// 会员级别
							uni.setStorageSync('level_name', res.rs.level_name)
							uni.setStorageSync('level', res.rs.lmevemml)
							// 会员余额
							uni.setStorageSync('balance', res.rs.balance)
							// 会员指尖币余额
							uni.setStorageSync('zj_balance', res.rs.zj_balance)
							// 会员手机号
							uni.setStorageSync('phone', res.rs.phone)
							// 折扣
							if (res.rs.discount_name == null || res.rs.discount_name == '') {} else {
								uni.setStorageSync('discount_name', res.rs.discount_name)
							}
							this.head_img = res.rs.head_img;

							// 为了下次进行数据回刷
							this.showa = 1;
							this.sta = 200;

							// 指间币
							this.zj_balance = uni.getStorageSync('zj_balance');
							// 余额
							this.balance = uni.getStorageSync('balance');

							var data = '{"memberid":"' + this.memberid + '"}';
							var action = 'get_buy_shopping_cart';

							this.$utils.post(action, data).then(res => {
								console.log('商品', res)
								let numberss = 0;
								if (res.sta == 1) {

									for (let i in res.rs.goodslist) {
										numberss += Number(res.rs.goodslist[i].goodsnum)
									}
									this.numberss = numberss
									this.length = res.rs.goodslist.length;
									if (res.rs.goodslist.length >= 1) {

										this.price_yuanshi = res.rs.price_yuanshi;
										this.price_zhe = res.rs.price_zhe
										let zhekou = res.rs.price_yuanshi - res.rs.price_zhe;
										if (zhekou == 0) {
											this.price_zhekou = '0';
										} else {
											this.price_zhekou = zhekou.toFixed(2);
										}
										console.log(this.price_yuanshi)

										this.commodity = res.rs.goodslist;

										this.com = true
									} else {
										this.com = false
									}
								} else {
									this.length = 0;
								}

							})

						})
					}
				});

			},
			choiceAddress: function() {
				uni.navigateTo({
					url: '../Add/Add?cardbag_number=5',
				});
			},
			deliveryModeChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.delivery_mode_index = e.target.value
			}
		},
		computed:{
			cache:false,
			total_price: function(){
				
				// 只有优惠券对合计有影响
				return this.price_zhe-this.coupon_money>0?this.price_zhe-this.coupon_money:0
			},
			save_money: function(){
				return this.price_zhe - this.total_price;
			}
		}
	}
</script>

<style>
	@import '@/common/index.css';

	page {
		background-color: #F5F5F5;
	}

	/*swtich整体大小及背景色*/
	.wx-switch-input {
		width: 82rpx !important;
		height: 37rpx !important;
		border-radius: 19rpx !important;
		/* 点击之后的边框 */
		border: 4rpx solid #FF0137 !important;
		/* 点击之后的背景颜色 */
		background-color: #FFF !important;

	}

	/*白色样式（false的样式）*/
	.wx-switch-input::before {
		width: 80rpx !important;
		height: 32rpx !important;
		/* margin-top: -6rpx; */
		margin-left: -6rpx;
		border: 4rpx solid #BFBFBF !important;
		/* 点击之前背景色 */
		background-color: transpent !important;
	}

	/* 按钮样式 */
	.wx-switch-input::after {
		width: 24rpx !important;
		height: 24rpx !important;
		margin-top: 3rpx;
		margin-left: 4rpx;
		/* background: #FF0137 !important; */
		box-shadow: none !important;
		border-radius: 50%;
		background: #BFBFBF !important;
	}



	.item {
		width: 263rpx;
	}

	.picker-view-column1 {
		width: 250rpx !important;
		margin-left: 26rpx;
	}

	.picker-view-column {
		width: 200rpx !important;
	}

	.shop-number input {
		width: 100rpx;
		float: right;
		text-align: center;
		background-color: #F7F7F7;
	}

	/* 购物样式 */
	.shop-money-input {
		margin-top: -8rpx;
		width: 100rpx;
		float: right;
		text-align: center;
		background-color: #F7F7F7;
		margin-left: 28rpx;
	}

	.shop-bottom {
		padding-top: 10rpx;
	}

	.shop-li-bottom {
		width: min-content;
	}

	.shop-money {
		margin: 0 auto;
		border-radius: 0;
	}

	.shop-money:last-child {
		border-radius: 16rpx 16rpx 0 0;
	}

	.shop-li-number {
		background: #FFFFFF;
		border: none;
		box-shadow: none;
		text-align: right;
	}

	.address-bar {
		position: relative;
		width: 696.52rpx;
		border-radius: 0 0 16rpx 16rpx;
		background: #FFFFFF;
		margin: 0 auto;
		margin-top: 22rpx;
		padding-bottom: 28rpx;
		overflow: hidden;
	}

	.address-bar view {
		padding: 0 28rpx;
		line-height: 22px;
	}

	.address-bar .name {
		font-weight: 400;
		font-size: 16px;
		display: inline;
	}

	.address-bar .phone {
		color: #888888;
		font-size: 14px;
		display: inline;
	}

	.address-bar .address {
		font-weight: 400;
		font-size: 16px;
	}

	.address-border {
		width: 100%;
		height: 8rpx;
		background-image: repeating-linear-gradient(-45deg, #488BA7, #488BA7 12px, #FFFFFF 12px, #FFFFFF 16px, #CE5656 16px, #CE5656 28px, #FFFFFF 28px, #FFFFFF 32px);
		background-position: -75rpx;
		margin-bottom: 28rpx;
	}

	.move {
		position: absolute;
		width: 20px;
		right: 0px;
		top: 50%;
		margin-top: -10px;
	}
	.shop-li:last-of-type{
		border: none;
	}
	.shop-money-li:last-of-type{
		border-bottom: 1px solid #ECECEC;
	}
</style>
