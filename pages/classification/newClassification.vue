<template>
	<!-- 选项卡分类 -->
	<view>
		<!-- 顶部 -->
		<view class="navgation">
			<view :style="{height:a + 'px'}"></view>
			<view class="navgation-header flex-vertically white">
			</view>
		</view>
		<view class="navgation fixed">
			<view :style="{height:a + 'px'}"></view>
			<view class="navgation-header flex-vertically white">
				<view class="navgation-logo" @click="$buttonClick(index)">
					<image class="navgation-logo" :src="$utils.imageUrl(logo)" mode="widthFix"></image>
				</view>
				<view class="navgation-search flex-vertically" @click="$buttonClick(search)">
					<image class="navgation-search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image>
					<input class="navgation-search-input" disabled="true" type="text" value="" placeholder="搜索热门礼物" />
				</view>
			</view>
		</view>
		<view style="float: right;width: 100%;">
			<!-- 内容 -->
			<scroll-view scroll-y="true" class="fication-content-left" :style="{height:height + 'px'}" style="scrollbars:none;position: fixed;z-index: 999;"
			 show-scrollbar=true>
				<view class="fication-content-left-li" :key="index" :class="[left==index?active:'']" @click="bind" :data-keynum="item.keynum"
				 :data-index="index" v-for="(item,index) in title">{{item.classify_name}}</view>
			</scroll-view>
			<view class="fication-content-left" style="width: 180rpx;"></view>
			<!-- 右侧 -->
			<view class="fication-content-right" style="scrollbars:none">
				<!-- 选择 -->
				<view class="fication-content-choose" style="position: fixed;z-index:3;">
					<view class="fication-content-back flex">
						<view class="fication-content-choose-content" @click="choo" data-index='0'>
							商品分类 <view class="fication-content-choose-triangle"></view>
						</view>
						<view class="fication-content-choose-content" @click="choo" data-index='1'>
							品牌分类 <view class="fication-content-choose-triangle"></view>
						</view>
						<view class="fication-content-choose-content" @click="choo" data-index='2'>
							全部价格 <view class="fication-content-choose-triangle"></view>
						</view>
					</view>
					<!-- 隐藏 -->
					<!-- 商品 -->
					<view class="show" v-show="hiddenl">
						<scroll-view scroll-y="true" style="width: 165rpx;height: 500rpx;">
							<view class="show-li" @click="showl" :data-index="index" :data-keynum="item.keynum" v-for="(item,index) in show"
							 :key="index">{{item.classify_name}}</view>
						</scroll-view>
					</view>
					<!-- 价格 -->
					<view class="show-right  show-content" v-show="hiddenc">
						<scroll-view scroll-y="true" style="width: 165rpx;height: 500rpx;">
							<view class="show-li" @click="showc" :data-index="index" :data-keynum="item.keynum" v-for="(item,index) in brand"
							 :key="index">{{item.brand_name}}</view>
						</scroll-view>
					</view>
					<!-- 品牌 -->
					<view class="show-right" v-show="hiddenr">
						<scroll-view scroll-y="true" style="width: 165rpx;height: 500rpx;">
							<view class="show-li" @click="showr" :data-index="index" :data-begin_price="item.begin_price" :data-end_price="item.end_price"
							 v-for="(item,index) in price" :key="index">{{item.price}}</view>
						</scroll-view>
					</view>
				</view>
				<view style="width: 134%;height: 120rpx;"></view>
				<!-- 内容 -->
				<view class="fication-content-right-li flex-between" v-for='(item,index) in commodity' :key="index">
					<image lazy-load="true" class="fication-img" :src="$utils.imageUrl(item.head_img)" v-if="item.head_img"
					 mode="" :data-index="item.keynum" @click="details"></image>
					<image lazy-load="true" class="fication-img" src="../../static/nono.jpg" v-else mode="" :data-index="item.keynum"
					 @click="details"></image>
					<view class="fication-introduce">
						<view class="fication-introduce-title " :data-index="item.keynum" @click="details">{{item.goodsname}}</view>
						<view class="fication-introduce-alt none" :data-index="item.keynum" @click="details">{{item.alt}}</view>
						<view class="fication-introduce-activity flex" :data-index="item.keynum" @click="details" v-if="level == 1"></view>
						<view class="fication-introduce-activity flex" :data-index="item.keynum" @click="details" v-else>
							<view class="fication-activity-original">¥ {{item.price}}</view>
							<div class="fication-activity-grad-box flex">
								<view class="fication-activity-grad">{{level_name}}</view>
								<view class="fication-activity-grad">{{item["discount_name"+(level-1)]}}</view>
							</div>
						</view>
						
						<button class="index-commodity-bottom flex-between" v-if="sta == 0" open-type="getUserInfo" @getuserinfo="bindGetUserInfo"
						 style="padding: 0;background: transparent">
							<view class="index-bottom-price"><span style="margin-right: 4rpx;">¥</span> {{item["price_level"+(level-1)]}}</view>
							<view class="index-bottom-give">
								<image lazy-load="true" class="index-bottom-img" src="https://zhijianlw.com/static/web/img/give.png" mode=""></image>
							</view>
						</button>
						<view class="index-commodity-bottom flex-between" v-else-if="sta == 200" :data-id="item.id" @click="give">
							<view class="index-bottom-price"><span style="margin-right: 4rpx;">¥</span>{{item["price_level"+(level-1)]}}</view>
							<view class="index-bottom-give">
								<image lazy-load="true" class="index-bottom-img" src="https://zhijianlw.com/static/web/img/give.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="no-btm" v-if="commodity.length==0">
					<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				</view>				
				<view v-else>
					<view class="record-bottom" v-if="none==20">已经到底了~</view>
					<view class="record-bottom" v-else-if="none==0">正在加载中~</view>
				</view>
			</view>
			<view class="return-top" @click="top">
				<!-- 伞 -->
				<view class="return-horn"></view>
				<view class="return-text">顶部</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	import Navgation from "@/wxcomponents/navgation/navgation.vue";
	import btn from "@/common/btn.js";
	export default {
		data() {
			return {
				a: '',
				height: '',
				logo: '',
				title: [],
				left: 0,
				active: 'fication-content-li-active1',
				commodity: [],
				level_name: '',
				pageIndex: '',
				discount_name: '',
				price: [],
				brand: [],
				show: [],
				hiddenl: false,
				hiddenc: false,
				hiddenr: false,
				choose: '',
				goods_brand_keynum: '',
				sta: '',
				keynum: '',
				indexx: '',
				id: '',
				none: '0',
				openid: '',
				Data: '',
				showa: "",
				fixed: 0

			}
		},
		// 监测滑动距离
		onPageScroll: function(e) {
			if (e.scrollTop > 0) {
				this.fixed = 1
			} else if (e.scrollTop < 10) {
				this.fixed = 0
			}
			if (this.indexx == 0 || this.indexx == 1 || this.indexx == 2) {
				this.hiddenl = false;
				this.hiddenc = false;
				this.hiddenr = false;
			}
		},
		// 下拉刷新 多余...
		onPullDownRefresh(e) {
			// // 分类 品牌  价格
			if (this.goods_brand_keynum && this.begin_price) {
				console.log('分类 品牌 价格')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level + '","goods_brand_keynum":"' +
					this.goods_brand_keynum + '","pageSize":"20","pageIndex":"1","begin_price":"' + this.begin_price +
					'","end_price":"' + this.end_price + '"}';
			}
			// 分类 价格
			else if (this.begin_price) {
				console.log('分类 价格')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level +
					'","pageSize":"20",pageIndex":"1","begin_price":"' + this.begin_price + '","end_price":"' + this.end_price + '"}';
			}
			// 分类 品牌
			else if (this.goods_brand_keynum) {
				console.log('分类 品牌')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level + '","goods_brand_keynum":"' +
					this.goods_brand_keynum + '",pageIndex":"1","pageSize":"20"}';
			}
			// 分类 
			else {
				console.log('分类')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level +
					'","pageSize":"20",pageIndex":"1"}';
			}

			console.log(data)
			var action = 'get_goodsclassify_goods';

			this.$utils.post(action, data).then(res => {
				console.log('获取分类商品', res.rs)
				if (res.rs == '') {
					this.none = '20',
						uni.stopPullDownRefresh();
				} else {
					for (let i in res.rs) {
						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
					}
					uni.stopPullDownRefresh();
					this.commodity = res.rs;
				}
			})


		},
		onLoad: function() {
			let that = this;
			let time = setTimeout(function() {
				that.showa = 1;
				clearTimeout(time)
			}, 1500)

			this.level_name = uni.getStorageSync('level_name');
			this.discount_name = uni.getStorageSync('discount_name');
			this.id = uni.getStorageSync('id')
			var level = uni.getStorageSync('level');
			this.level = level;


			var data = '{}';
			var action = 'get_webconfig_tiaoli';
			this.$utils.post(action, data).then(res => {

				if (res.sta == 1) {
					// logo图
					this.logo = config.URL + res.rs.logo;
				}


			})

			// 高度
			uni.getSystemInfo({
				success: res => {
					this.a = res.statusBarHeight;
					this.height = res.windowHeight - res.statusBarHeight - (134 / res.pixelRatio);
				}
			})


			this.pageIndex = 1;

			var data = '{"classify_level":"1","member_level":"' + level + '"}';
			var action = 'get_goods_classify';
			console.log(data)
			this.$utils.post(action, data).then(res => {
				console.log('左侧分类', res.rs)


				// 左侧
				this.title = res.rs;

				// 分类商品
				var data = '{"goodsclassify":"' + res.rs[0].keynum + '","member_level":"' + level +
					'","pageSize":"20","pageIndex":"1"}';
				var action = 'get_goodsclassify_goods';
				console.log(data)
				this.keynum = res.rs[0].keynum;
				this.$utils.post(action, data).then(res => {
					console.log('获取分类商品', res.rs)
					if (res.rs && res.rs.length < 20) {
						this.none = '20';
					} else {
						this.none = '0';
					}


					for (let i in res.rs) {


						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';


					}
					// 右侧
					this.commodity = res.rs
				})


				var data = '{"classify_level":"2","member_level":"' + level + '","parentkeynum":"' + res.rs[0].keynum + '"}';
				var action = 'get_goods_classify';
				this.$utils.post(action, data).then(res => {
					console.log('获取商品分类', res.rs)
					this.show = res.rs;
				})

				var data = '{"goodsclassify":"' + res.rs[0].keynum + '"}';
				var action = 'get_goods_brand';

				this.$utils.post(action, data).then(res => {
					console.log('获取品牌', res.rs)
					this.brand = res.rs
				})
			})
			var data = '{}';
			var action = 'get_price_range';

			this.$utils.post(action, data).then(res => {
				console.log('2.价格区间', res.rs)
				for (let i in res.rs) {
					res.rs[i].price = res.rs[i].begin_price + '-' + res.rs[i].end_price
				}
				this.price = res.rs;
			})

			// 1.判断当前登录状态    20已登录   0未登录
			var sign = uni.getStorageSync('sign')
			if (sign) {
				this.sta = '200';
			} else {
				this.open();
				this.sta = '0';
				// 供浏览使用 
				this.level = 1;
				this.level_name = '普通会员';
				this.discount_name = '无折扣'
				uni.setStorageSync('level', 1)
				uni.setStorageSync('level_name', '普通会员')
				uni.setStorageSync('discount_name', '无折扣')
			}
		},
		onShow: function() {
			this.hiddenl = false;
			this.hiddenc = false;
			this.hiddenr = false;
			if (this.showa == 1) {

				if (this.title == null || this.title == undefined || this.title == '') {

					this.level_name = uni.getStorageSync('level_name');
					this.discount_name = uni.getStorageSync('discount_name');
					this.id = uni.getStorageSync('id')

					var level = uni.getStorageSync('level');
					this.level = level;


					var data = '{}';
					var action = 'get_webconfig_tiaoli';
					this.$utils.post(action, data).then(res => {

						if (res.sta == 1) {
							// logo图
							this.logo = config.URL + res.rs.logo;
						}
					})
					// 高度
					uni.getSystemInfo({
						success: res => {
							this.a = res.statusBarHeight;
							this.height = res.windowHeight - res.statusBarHeight - (134 / res.pixelRatio);
						}
					})
					this.pageIndex = 1;

					var data = '{"classify_level":"1","member_level":"' + level + '"}';
					var action = 'get_goods_classify';
					console.log(data)
					this.$utils.post(action, data).then(res => {
						console.log('左侧分类', res.rs)
						this.title = res.rs;
						var data = '{"classify_level":"2","member_level":"' + level + '","parentkeynum":"' + res.rs[0].keynum + '"}';
						var action = 'get_goods_classify';
						this.$utils.post(action, data).then(res => {
							console.log('获取商品分类', res.rs)
							this.show = res.rs;
						})

						var data = '{"goodsclassify":"' + res.rs[0].keynum + '"}';
						var action = 'get_goods_brand';

						this.$utils.post(action, data).then(res => {
							console.log('获取品牌', res.rs)
							this.brand = res.rs
						})

						// 分类商品
						var data = '{"goodsclassify":"' + res.rs[0].keynum + '","member_level":"' + level +
							'","pageSize":"20","pageIndex":"1"}';
						var action = 'get_goodsclassify_goods';
						console.log(data)
						this.keynum = res.rs[0].keynum;
						this.$utils.post(action, data).then(res => {
							console.log('获取分类商品', res.rs)
							if (res.rs && res.rs.length < 20) {
								this.none = '20';
							} else {
								this.none = '0';
							}


							for (let i in res.rs) {


								res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
								res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
								res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
								res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
							}

							this.commodity = res.rs
						})

					})
					var data = '{}';
					var action = 'get_price_range';

					this.$utils.post(action, data).then(res => {
						console.log('2.价格区间', res.rs)
						for (let i in res.rs) {
							res.rs[i].price = res.rs[i].begin_price + '-' + res.rs[i].end_price
						}
						this.price = res.rs;
					})

					// 1.判断当前登录状态    20已登录   0未登录
					var sign = uni.getStorageSync('sign')
					if (sign) {
						this.sta = '200';
					} else {
						this.open();
						this.sta = '0';
						// 供浏览使用 
						this.level = 1;
						this.level_name = '普通会员';
						this.discount_name = '无折扣'
						uni.setStorageSync('level', 1)
						uni.setStorageSync('level_name', '普通会员')
						uni.setStorageSync('discount_name', '无折扣')
					}
				}
			}

		},
		// 上拉刷新
		onReachBottom: function() {
			this.pageIndex++;
			// // 分类 品牌  价格
			if (this.goods_brand_keynum && this.begin_price) {
				console.log('分类 品牌 价格')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level + '","goods_brand_keynum":"' +
					this.goods_brand_keynum + '","pageSize":"20","pageIndex":"' + this.pageIndex + '","begin_price":"' + this.begin_price +
					'","end_price":"' + this.end_price + '"}';
			}
			// 分类 价格
			else if (this.begin_price) {
				console.log('分类 价格')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level +
					'","pageSize":"20","pageIndex":"' + this.pageIndex + '","begin_price":"' + this.begin_price + '","end_price":"' +
					this.end_price + '"}';
			}
			// 分类 品牌
			else if (this.goods_brand_keynum) {
				console.log('分类 品牌')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level + '","goods_brand_keynum":"' +
					this.goods_brand_keynum + '","pageIndex":"' + this.pageIndex + '","pageSize":"20"}';
			}
			// 分类 
			else {
				console.log('分类')
				var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level +
					'","pageSize":"20","pageIndex":"' + this.pageIndex + '"}';
			}

			console.log(data)
			var action = 'get_goodsclassify_goods';

			this.$utils.post(action, data).then(res => {
				console.log('获取分类商品', res.rs)
				if (res.rs == '') {
					this.none = '20'
				} else {
					for (let i in res.rs) {
						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
						this.commodity.push(res.rs[i]);
					}
				}
			})

		},
		methods: {
			index: function(e) {
				uni.reLaunch({
					url: '../index/index'
				})
			},
			top: function(e) {
				uni.pageScrollTo({
					scrollTop: '0'
				})
			},
			// 左侧点击
			bind: function(e) {
				this.hiddenl = false;
				this.hiddenc = false;
				this.hiddenr = false;
				this.commody = []
				uni.showLoading({})
				uni.pageScrollTo({
					scrollTop: '0'
				})
				this.none = '0'
				var that = this;
				// 点击变色
				let index = e.currentTarget.dataset.index;
				let keynum = e.currentTarget.dataset.keynum;
				this.keynum = keynum;
				let left = this.left;
				this.left = index;
				if (index == 0) {
					this.active = 'fication-content-li-active1'
				} else {
					this.active = 'fication-content-li-active'
				}

				var data = '{"classify_level":"2","member_level":"' + this.level + '","parentkeynum":"' + keynum + '"}';
				var action = 'get_goods_classify';
				this.$utils.post(action, data).then(res => {
					console.log('获取商品分类', res.rs)
					this.show = res.rs;
				})


				var data = '{"goodsclassify":"' + keynum + '"}';
				var action = 'get_goods_brand';

				this.$utils.post(action, data).then(res => {
					console.log('获取品牌', res.rs)
					this.brand = res.rs
				})


				// 初始化
				this.goods_brand_keynum = '',
					this.begin_price = '';
				this.end_price = '';

				this.pageIndex = 1;
				var data = '{"goodsclassify":"' + keynum + '","member_level":"' + this.level +
					'","pageSize":"20","pageIndex":"1"}';
				var action = 'get_goodsclassify_goods';
				console.log('分类', data)
				this.$utils.post(action, data).then(res => {
					if (res.rs && res.rs.length < 20) {
						this.none = '20'
					} else {
						this.none = '0';
					}
					console.log('获取分类商品', res.rs)
					for (let i in res.rs) {
						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
					}
					that.commodity = res.rs;
					uni.hideLoading()
				})

			},
			// 右侧三个点击
			choo: function(e) {
				let index = e.currentTarget.dataset.index;
				this.indexx = index;
				if (index == 0) {
					this.hiddenc = false;
					this.hiddenr = false;
					this.hiddenl = !this.hiddenl;
				} else if (index == 1) {
					this.hiddenl = false;
					this.hiddenr = false;
					this.hiddenc = !this.hiddenc;
				} else if (index == 2) {
					this.hiddenl = false;
					this.hiddenc = false;
					this.hiddenr = !this.hiddenr;
				}
			},
			// 分类
			showl: function(e) {
				this.commody = []
				uni.showLoading({})
				uni.pageScrollTo({
					scrollTop: '0'
				})
				this.none = '0'
				// 点击隐藏
				this.hiddenl = false;
				// 返回 提供给底触使用
				this.keynum = e.currentTarget.dataset.keynum;
				this.pageIndex = 1;
				// 初始化
				this.goods_brand_keynum = '',
				this.begin_price = '';
				this.end_price = '';

				var data = '{"goodsclassify":"' + e.currentTarget.dataset.keynum + '","member_level":"' + this.level +
					'","pageSize":"20","pageIndex":"1"}';
				var action = 'get_goodsclassify_goods';
				console.log('分类', data)
				this.$utils.post(action, data).then(res => {
					console.log('分类商品 ', res.rs)
					if (res.rs && res.rs.length < 20) {
						this.none = '20'
					} else {
						this.none = '0';
					}
					for (let i in res.rs) {
						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
					}
					uni.hideLoading()
					this.commodity = res.rs;
				})
			},
			// 品牌
			showc: function(e) {
				this.commody = []
				uni.showLoading({})
				uni.pageScrollTo({
					scrollTop: '0'
				})
				this.none = '0'
				// 点击隐藏
				this.hiddenc = false;
				// 返回 提供给底触使用
				this.goods_brand_keynum = e.currentTarget.dataset.keynum;
				this.pageIndex = 1;

				if (this.begin_price) {
					var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level + '","goods_brand_keynum":"' +
						e.currentTarget.dataset.keynum + '","pageSize":"20","pageIndex":"1","begin_price":"' + this.begin_price +
						'","end_price":"' + this.end_price + '"}';
				} else {
					var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level + '","goods_brand_keynum":"' +
						e.currentTarget.dataset.keynum + '","pageSize":"20","pageIndex":"1"}';
				}
				console.log('品牌', data)
				var action = 'get_goodsclassify_goods';

				this.$utils.post(action, data).then(res => {
					if (res.rs && res.rs.length < 20) {
						this.none = '20'
					} else {
						this.none = '0';
					}
					console.log('分类商品 ', res.rs)
					for (let i in res.rs) {
						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
					}
					uni.hideLoading()
					this.commodity = res.rs;
				})
			},
			// 价格
			showr: function(e) {
				this.commody = []
				uni.showLoading({})
				uni.pageScrollTo({
					scrollTop: '0'
				})
				this.none = '0'
				let index = e.currentTarget.dataset.index;
				// 点击隐藏
				this.hiddenr = false;

				// 返回 提供给底触使用
				this.pageIndex = 1;
				this.begin_price = e.currentTarget.dataset.begin_price;
				this.end_price = e.currentTarget.dataset.end_price;
				// 接口使用
				let begin_price = e.currentTarget.dataset.begin_price;
				let end_price = e.currentTarget.dataset.end_price;


				// 品牌
				if (this.goods_brand_keynum) {
					var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level + '","goods_brand_keynum":"' +
						this.goods_brand_keynum + '","pageSize":"20","pageIndex":"1","begin_price":"' + begin_price + '","end_price":"' +
						end_price + '"}';
					// 分类
				} else {
					var data = '{"goodsclassify":"' + this.keynum + '","member_level":"' + this.level +
						'","pageSize":"20","pageIndex":"1","begin_price":"' + begin_price + '","end_price":"' + end_price + '"}';
				}
				console.log(data)
				var action = 'get_goodsclassify_goods';
				this.$utils.post(action, data).then(res => {
					console.log(res)
					console.log('商品', res.rs)
					if (res.rs && res.rs.length < 20) {
						this.none = '20'
					} else {
						this.none = '0';
					}

					for (let i in res.rs) {
						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
					}
					uni.hideLoading()
					this.commodity = res.rs;
				})
			},
			// 详情跳转
			details: function(e) {
				let index = e.currentTarget.dataset.index;


				btn.buttonClick(function(e) {
					uni.navigateTo({
						url: '../details/details?keynum=' + index
					})
				})
			},

			search: function(e) {
				uni.navigateTo({
					url: '../../pages/search/search'
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
							})

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

					if (res.msg === "操作成功！" || res.msg === '该用户已经注册,请勿重复注册！') {
						//登录 
						var data = '{"wx_openid":"' + openid + '"}';
						var action = 'member_login';
						this.$utils.post(action, data).then(res => {
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
							uni.setStorageSync('level', res.rs.level)
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

							// 为了下次进行数据回刷
							this.showa = 1;
							this.sta = 200;

							this.level_name = res.rs.level_name;
							this.level = res.rs.level;

							this.pageIndex = 1;

							var data = '{"classify_level":"1","member_level":"' + res.rs.level + '"}';
							var action = 'get_goods_classify';
							console.log(data)
							this.$utils.post(action, data).then(res => {
								console.log('左侧分类', res.rs)
								this.title = res.rs;


								// 分类商品
								var data = '{"goodsclassify":"' + res.rs[0].keynum + '","member_level":"' + res.rs.level +
									'","pageSize":"20","pageIndex":"1"}';
								var action = 'get_goodsclassify_goods';
								console.log(data)
								this.keynum = res.rs[0].keynum;
								this.$utils.post(action, data).then(res => {
									console.log('获取分类商品', res.rs)
									if (res.rs && res.rs.length < 20) {
										this.none = '20';
									} else {
										this.none = '0';
									}


									for (let i in res.rs) {
										res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
										res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
										res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
										res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';
									}

									this.commodity = res.rs
								})

							})

						})
					}

				})
			},
			// 立即赠送
			give: function(e) {

				if (this.sta == 200) {
					let goodsid = e.currentTarget.dataset.id;
					var data = '{"memberid":"' + this.id + '","goodsid":"' + goodsid + '","goodsnum":"1"}';
					var action = 'add_goods_to_giftbag';
					console.log(data)
					this.$utils.post(action, data).then(res => {
						console.log('添加购物车', res)
						if (res.sta == 1) {
							uni.navigateTo({
								url: '../shopping/shop'
							})
							
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'success',
								mask: true,
							})
						}
					})
				}
			},
		},
		computed:{
			level: function(){
				console.log(uni.getStorageSync("level"));
				return uni.getStorageSync("level");
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.fication-activity-grad {
		line-height: 16rpx;
		display: inline-block;
		padding: 0 11.8rpx;
		font-size: 16rpx;
		line-height: 27rpx;
		height: 27rpx;
		color: #FF0137;
		margin-right: 9.02rpx;
		border: 1px solid #FF0137;
		background: #ffe0db;
		border-radius: 4rpx;
}

	.show {
		width: 165rpx !important;
		top: 78rpx !important;
		left: 3rpx !important;
	}

	.show-content {
		width: 165rpx !important;
		left: 50% !important;
		margin-left: -17%;
		top: 78rpx !important;
	}

	.show-right {
		width: 165rpx !important;
		top: 78rpx !important;
		right: 21rpx !important;
	}

	scroll-view {
		white-space: unset !important;
	}
	.fication-activity-original{
		color: #666666;
		text-decoration: line-through;
	}
	.fication-introduce-activity{
		justify-content: space-between;
	}
	.index-bottom-give {
		right: 15rpx;
	}
</style>
