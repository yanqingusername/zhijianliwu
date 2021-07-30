<template>
	<view>
		<view class="" v-if="com==false">
			<view class="shop-no-img">
				<image src="../../static/shop-no.png" class="img" mode=""></image>
			</view>
		</view>

		<!-- 有商品时 -->
		<view class="shop-commodity margin-auto" v-if="com!=false" style="margin-top: 28rpx;">
			<view class="shop-ul margin-auto">
				<checkbox-group @change='select'>
					<view style="width: 660rpx;" class="shop-li flex margin-auto"
					 v-for="(item,index) in commodity" :key="index">
						<checkbox :value="item.shopping_cart_id" color="#FF0022"class="flex margin-auto"
						@click="selectClick(item.shopping_cart_id)" :checked="item.checked==1?true:false">
						</checkbox>
						<!-- 图片 -->
						<image class="shop-li-img" :src="$utils.imageUrl(item.head_img)" v-if="item.head_img" @click.stop="details"
						 :data-index="item.keynum" mode=""></image>
						<image class="shop-li-img" src="../../static/nono.jpg" v-else mode="" @click.stop="details" :data-index="item.keynum"></image>
						<view class="shop-li-text" style="float: right;">
							<!-- 商品名字 -->
							<view class="shop-li-title">{{item.goodsname}}</view>
							<!-- 描述 -->
							<veiw class="shop-li-alt" style="">{{item.shopping_cart_goods_item}}</veiw>
							<!-- 价格 -->
							<view class="shop-li-price" v-if="level_name ==='普通会员'">¥{{item.price_level0}}</view>
							<view class="shop-li-price" v-else-if="level_name ==='指间会员'">¥{{item.price_level1}}</view>
							<view class="shop-li-price" v-else-if="level_name ==='plus会员'">¥{{item.price_level2}}</view>
							<view class="shop-li-price" v-else-if="level_name ==='企业会员'">¥{{item.price_level3}}</view>
							<view class="shop-li-price" v-else-if="level_name ==='合作伙伴'">¥{{item.price_level4}}</view>
							<view class="shop-li-price" v-else>¥{{item.price}}</view>
						</view>
						<!-- 						shopping_cart_goods_item: "0"
						shopping_cart_goods_model: 0
						shopping_cart_goods_spec -->
						<view class="shop-li-bottom flex-vertically">
							<view class="shop-li-reduce" :data-index="index" :data-goodsid="item.id" :data-model="item.shopping_cart_goods_model"
							 :data-spec="item.shopping_cart_goods_spec" :data-item="item.shopping_cart_goods_item" @click.stop="reduce">-</view>
							<view class="shop-li-number">{{item.num}}</view>
							<view class="shop-li-plus" :data-index="index" :data-goodsid="item.id" :data-model="item.shopping_cart_goods_model"
							 :data-spec="item.shopping_cart_goods_spec" :data-item="item.shopping_cart_goods_item" @click.stop="increase">+</view>
						</view>
					</view>

				</checkbox-group>

			</view>
			<view class="shop-commodity-bottom margin-auto flex-between">
				<view class="shop-commodity-number">
					<!-- 共{{numberss}}件礼物 -->
				</view>
				<view class="shop-type-right" @click="go">继续添加></view>
			</view>
		</view>

		<!-- 客户要的支付 -->
		<view class="shop-money none ">
			<!-- 商品金额 -->
			<view class="shop-money-li flex-between">
				<view class="shop-money-left">商品金额</view>
				<view class="shop-money-right">¥{{price_yuanshi}}</view>
			</view>
			<!-- 指间币 -->
			<view class="shop-money-li flex-between" style="height: 37rpx;line-height: 37rpx;">
				<view class="shop-money-left flex" style="line-height: 36rpx;">
					<view style="width:72rpx;font-size: 25rpx;line-height: 36rpx;">指间币</view>
					<span style="font-size: 20rpx;line-height: 36rpx;margin-left: 20rpx;;">(共{{zj_balance}}个,可用{{zj_balance}}个)</span>
				</view>
				<view class="shop-money-right">
					<switch color="#26a2ff" @change="switch1Change" />
				</view>
			</view>
			<!-- 余额 -->
			<view class="shop-money-li flex-between" style="height: 37rpx;line-height: 37rpx;padding-bottom: 32rpx;">
				<view class="shop-money-left flex" style="line-height: 36rpx">
					<view style="width:22rpx;font-size: 25rpx;line-height: 36rpx;">余</view>
					<view style="line-height: 36rpx;width:22rpx;font-size: 25rpx;margin-left: 25rpx;">额</view>
					<span style="font-size: 20rpx;line-height: 36rpx;margin-left: 20rpx;;">(共¥{{balance}},可用¥{{balance}})</span>
				</view>
				<view class="shop-money-right">
					<switch color="#26a2ff" @change="switch2Change" />
				</view>
			</view>
			<!-- 优惠券 -->
			<view class="shop-money-li shop-money-bottom flex-between" @click="coupon" tyle="height: 25rpx;line-height: 25rpx;padding-bottom: 32rpx;">
				<view class="shop-money-left" style="line-height: 36rpx;">优惠券
					<span style="font-size: 20rpx;line-height: 36rpx;margin-left: 20rpx;color:#FF1E4E;">(已默认推荐使用)</span></view>
				<view class="shop-money-right" v-if="coupon_name">无</view>
				<view class="shop-money-right" v-else style="color:#FF0137;">-¥{{coupon_name}}<span style="font-size: 32rpx;color:#000000;">></span></view>
			</view>


		</view>
		<!-- 支付 无商品时背景 -->

		<view @submit="forsubmit" v-if="com==false">
			<button class="shop-payment s" v-if="sta==0" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" style="padding: 0;background: #E27F8C;z-index:1;">前往登录</button>
			<button class="shop-payment s" v-else-if="sta==200" @click="goToindex">添加商品</button>
		</view>




		<!-- 协议 -->
		<!-- <button class="shop-bottom flex-between margin-auto" v-if="sta==0" open-type="getUserInfo" @getuserinfo="bindGetUserInfo"
		 style="padding: 0;background: transparent;z-index:1;">
			<view class="shop-explain" data-index='1' @click="text">服务协议</view>
			<view class="shop-line"></view>
			<view class="shop-explain" data-index='2' @click="text">用户协议</view>
		</button>
		<view class="shop-bottom flex-between margin-auto" v-else-if="sta==200">
			<view class="shop-explain" data-index='1' @click="text">服务协议</view>
			<view class="shop-line"></view>
			<view class="shop-explain" data-index='2' @click="text">用户协议</view>
		</view>

		<view class="flex-center shop-code" v-if="display" @click="code">
			<canvas style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas>
		</view>
 -->


		<view class="index-tabbar-kong"></view>
		<!-- 底部选项卡 -->
		<view class="index-tabbar flex">
			<!-- 合计 -->
			<view class="shop-money-btm" style="font-weight: bold;text-align: left;margin-left: 28rpx;
    font-size: 14px;">
				合计:<span>¥{{price_zhe}}</span>
<!-- 				<p style="font-size: 12px;display: inline;color: #888888;margin-left: 8rpx;">
					本次共为您节省¥{{price_all}}
				</p> -->
			</view>
			<form @submit="forsubmit" v-if="com==true" style="width: auto;">
				<button class="shop-payment shop-payment-active" form-type="submit" style="margin: 0;width: 200rpx;">去付款</button>
			</form>
		</view>

	</view>

</template>

<script>
	import MD5 from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
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
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				height: '',
				commodity: [],
				selectCommodity: [],
				selectCommodityIds: [],
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
				price_all: 0,
				price_zhe: '0',
				price_zhekou: '0',
				nav: '',
				price_yuanshi: '',
				switch1: '',
				switch2: '',
				zj_balance: '',
				balance: '',
				coupon_number: '',
				coupon_name: '',
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
			}
		},
		onShow: function(e) {

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
					console.log('商品', res);
					let numberss = 0;
					if (res.sta == 1) {
						console.log(res.rs.goodslist);
						// {
						// 	img: '../../static/shop-li.jpg',
						// 	title: 'sketch素描中式台灯',
						// 	alt: '翠玉功能随意无线开灯模式你值得拥有',
						// 	price: '¥444.00',
						// 	number: '3'
						// }
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

		},
		onLoad: function(e) {
			this.openid = uni.getStorageSync('openid');
			this.id = uni.getStorageSync('id');
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
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
			let that = this;

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
				uni.hideLoading();
				console.log('商品', res)
				if (res.sta == 1) {
					let numberss = 0

					for (let i in res.rs.goodslist) {
						numberss += Number(res.rs.goodslist[i].goodsnum)
						if(res.rs.goodslist[i].checked==1){
							that.selectCommodity.push(res.rs.goodslist[i]);
						}
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


				// this.appid = 'EW_N0810019757'; 
				// this.key = 'a7f802950ad9b174839391048b770253';
				// this.merchantCode = 'EW_N7058517273';


			})
			// 是否有优惠券
			if (e.coupon_number) {
				this.coupon_number = e.coupon_number;
				this.coupon_name = '-¥' + e.coupon_name;
			}

		},
		methods: {
			details: function(e) {
				let index = e.currentTarget.dataset.index;

				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
			// 添加礼物继续购买 
			go: function(e) {
				if (this.sta == 200) {
					uni.reLaunch({
						url: '../index/index'
					})
				} else if (this.sta == 0) {
					wx.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}
			},
			// 指间币选中
			switch1Change: function(e) {
				console.log(e)
				this.switch1 = e.detail.value;
			},
			// 余额选中
			switch2Change: function(e) {
				console.log(e)
				this.switch2 = e.detail.value;
			},
			// 选择优惠券
			coupon: function(e) {
				if (this.sta == 200) {
					uni.navigateTo({
						url: '../Coupon/Coupon?choose=' + '1'
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
				console.log(this.length)
				if (this.length == 0) {
					if (this.sta == 0) {
						wx.showToast({
							title: '请先登录',
							icon: 'none'
						})
					} else {
						wx.showToast({
							title: '请先添加商品',
							icon: 'none'
						})
					}
				} else if (this.length > 0) {
					if (this.selectCommodity.length <= 0) {
						wx.showToast({
							title: '请先勾选商品',
							icon: 'none'
						})
					} else {
						uni.navigateTo({
							url: '../settlement/settlement',
						});

					}
				}
			},
			signIn: function(e) {
				uni.navigateTo({
					url: '../signin/signin'
				})
			},
			// 加法
			increase: function(e) {
				let goodsid = e.currentTarget.dataset.goodsid;
				let index = e.currentTarget.dataset.index;
				this.$set(this.commodity[index], "num", this.commodity[index].num + 1)
				this.goodsid = goodsid;
				this.goodsnum = 1;
				this.item = e.currentTarget.dataset.item,
					this.model = e.currentTarget.dataset.model,
					this.spec = e.currentTarget.dataset.spec,
					this.give();

			},
			// 减法
			reduce: function(e) {
				let goodsid = e.currentTarget.dataset.goodsid;
				let index = e.currentTarget.dataset.index;


				if (this.commodity[index].num == 1) {
					this.$set(this.commodity[index], "num", this.commodity[index].num - 1);
					this.commodity.splice(index, 1)
					console.log("删除")
				} else {
					console.log('不删除')
					this.$set(this.commodity[index], "num", this.commodity[index].num - 1);
				}

				this.goodsnum = -1;
				this.goodsid = goodsid;
				this.item = e.currentTarget.dataset.item,
					this.model = e.currentTarget.dataset.model,
					this.spec = e.currentTarget.dataset.spec,
					this.give();

			},
			// 加减数量
			give: function(e) {
				// var data = '{"memberid":"' + this.id + '","goodsid":"' + this.goodsid + '","goodsnum":"' + this.goodsnum + '"}';
				var data = JSON.stringify({
					memberid: this.id,
					goodsid: this.goodsid,
					goods_model: this.model,
					goods_spec: this.spec,
					goods_item: this.item,
					num: this.goodsnum,
				});
				var action = 'op_buy_shopping_cart';
				this.$utils.post(action, data).then(res => {
					console.log('添加购物车', res)

					var data = '{"memberid":"' + this.memberid + '"}';
					var action = 'get_buy_shopping_cart';

					this.$utils.post(action, data).then(res => {
						console.log('更改价格', res);
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
						let selectCommodity = this.selectCommodity;
						console.log("selectCommodity", selectCommodity);
						this.price_zhe = 0;
						for (let i = 0; i < selectCommodity.length; i++) {
							this.price_zhe += selectCommodity[i].price * selectCommodity[i].num;
						}
					})

				})

				console.log(this.commodity)
				if (this.commodity.length == 0) {
					this.com = false;
				}
			},
			select: function(e) {
				this.selectCommodity = [];
				this.selectCommodityIds = e.detail.value;
				console.log(typeof e.detail.value);
				console.log("选中的值", e.detail.value);
				console.log(this.commodity[0].id);
				for (let i = 0; i < this.commodity.length; i++) {
					console.log("goodsname: ", this.commodity[i].goodsname,this.commodity[i].shopping_cart_id, this.selectCommodityIds, this.selectCommodityIds.indexOf(String(this.commodity[i].shopping_cart_id)),this.selectCommodityIds.indexOf(String(this.commodity[i].shopping_cart_id))!=-1);
					if(this.selectCommodityIds.indexOf(String(this.commodity[i].shopping_cart_id))!=-1){
						this.selectCommodity.push(this.commodity[i]);
						console.log("goodsname: ", this.commodity[i].goodsname);
					}
				}
				let selectCommodity = this.selectCommodity;
				this.price_zhe = this.price_zhe == 0 ? this.price_zhe : 0;
				console.log("selectCommodity", selectCommodity);
				for (let i = 0; i < selectCommodity.length; i++) {
					this.price_zhe += selectCommodity[i].price * selectCommodity[i].num;
				}
				console.log("selectCommodityChange", this.price_zhe);
				console.log("选中商品", this.selectCommodity);
			},
			selectClick: function(cartid) {
				console.log(cartid);
				// let shopping_cart_id = 
				let action = "checked_buy_shopping_cart";
				let data = JSON.stringify({
					memberid: this.memberid,
					shopping_cart_id: cartid
				});
				this.$utils.post(action, data).then(res => {
					console.log("checked_buy_shopping_cart", res);
				});
			},
			goToindex: function(){
				uni.reLaunch({
					url: '../index/index'
				})
			}
		},
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

	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		color: #fff;
		border-color: rgb(0, 122, 255);
		background: rgb(0, 122, 255);
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:after {
		font-size: 18px;
	}
</style>
