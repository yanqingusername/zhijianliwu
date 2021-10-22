<template>
	<view>
		<!-- 需求 -->
		<!-- <view class="index-h3">按需求选礼</view> -->
		<!-- 选择 -->
		<!-- <view class="index-choose content flex-center">
				<view class="show" v-if="showleft">
					<scroll-view scroll-y="true" style="max-height: 800rpx;"  >
						<view class="show-li"  @click="showl" :data-index="index" :data-choose="item.id"  v-for="(item,index) in show" :key="index">{{item.name}}</view>
					</scroll-view>
				</view>
				
				<view class="show-right" v-if="showright">
					<scroll-view scroll-y="true" style="max-height: 800rpx;" >
						<view class="show-li" style="display: flex;justify-content: center;align-items: center;">
							<input type="number" :value="showPrice" @blur="begin"  @click="click"  style="margin-right: 10rpx;">-<input @blur="bend"  @click="click" :value="showPrice"  style="margin-left: 10rpx;" type="number">
						</view>
				     	<view class="show-li"  @click="showr"  :data-index="index" :data-begin_price="item.begin_price" :data-end_price="item.end_price" v-for="(item,index) in price" :key="index">{{item.price}}</view>
				    </scroll-view>
				</view> 
				
				<button class="balance-button" v-if="btmShow==1" style="z-index: 99999;" @click="button">确定</button>
				
				<view class="index-choose-content flex-vertically flex-between">
					<view class="index-choose-left" @click="showw"  data-index='0' >全部分类 <view class="index-choose-triangle"></view></view>
					<view class="index-choose-line"></view>
					<view class="index-choose-left" @click="showw"  data-index='1'>全部价位 <view class="index-choose-triangle"></view></view>
				</view>
			</view> -->


		<!-- 商品 -->
		<view class="index-commodity  flex-between-wrap">
			<view class="index-commodity-li" v-for="(item,index) in commody" :key="index" v-preventReClick='3000'>
				<view class="index-commodity-auto margin-auto">
					<image lazy-load="true" class="index-commodity-img" :src="$utils.imageUrl(item.head_img)" v-if="item.head_img"
					 @click="details" :data-index="item.keynum" mode=""></image>
					<image lazy-load="true" class="index-commodity-img" src="../../static/nono.jpg" v-else @click="details"
					 :data-index="item.keynum" mode=""></image>
					<view class="index-commodity-alt" @click="details" :data-index="item.keynum">{{item.goodsname}}</view>

					<!-- 普通会员 -->
					<view @click="details" :data-index="item.keynum" v-if="level ==1">

					</view>
					<view class="index-commodity-label flex" @click="details" :data-index="item.keynum" v-else>
						<view class="index-label-left">{{level_name}}</view>
						<view class="index-label-left" v-if="level_name == '指间会员'">{{item.discount_name1}}</view>
						<view class="index-label-left" v-else-if="level_name == 'plus会员'">{{item.discount_name2}}</view>
						<view class="index-label-left" v-else-if="level_name == '企业会员'">{{item.discount_name3}}</view>
						<view class="index-label-left" v-else-if="level_name == '合作伙伴'">{{item.discount_name4}}</view>

						<!-- <view class="index-label-discount" v-if="level_name == '普通会员'">¥{{item.price_level0}}</view> -->
						<!-- <view class="index-label-discount">¥{{item.price}}</view> -->


					</view>


					<button class="index-commodity-bottom flex-between" v-if="sta == 0 " open-type="getUserInfo" @getuserinfo="bindGetUserInfo"
					 style="padding: 0;background: transparent">
						<view class="index-bottom-price" v-if="level_name == '普通会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price}}</view>
						<view class="index-bottom-price" v-else-if="level_name == '指间会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level1}}</view>
						<view class="index-bottom-price" v-else-if="level_name == 'plus会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level2}}</view>
						<view class="index-bottom-price" v-else-if="level_name == '企业会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level3}}</view>
						<view class="index-bottom-price" v-else-if="level_name == '合作伙伴'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level4}}</view>
						<view class="index-bottom-give">
							<image lazy-load="true" class="index-bottom-img" src="https://zhijianlw.com/static/web/img/give.png" mode=""></image>
						</view>
					</button>
					<view class="index-commodity-bottom flex" v-else-if="level>1" :data-id="item.id" @click="give">
						<view class="index-bottom-price" v-if="level_name == '普通会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price}}</view>
						<view class="index-bottom-price" v-else-if="level_name == '指间会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level1}}</view>
						<view class="index-bottom-price" v-else-if="level_name == 'plus会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level2}}</view>
						<view class="index-bottom-price" v-else-if="level_name == '企业会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level3}}</view>
						<view class="index-bottom-price" v-else-if="level_name == '合作伙伴'"><span style="margin-right: 4rpx;">¥</span>{{item.price_level4}}</view>
						<view class="index-label-discount">¥{{item.price}}</view>
						<view class="index-bottom-give">
							<image lazy-load="true" class="index-bottom-img" src="https://zhijianlw.com/static/web/img/give.png" mode=""></image>
						</view>
					</view>
					<view class="index-commodity-bottom flex-between" v-else-if="level==1" :data-id="item.id" @click="give">
						<view class="index-bottom-price" v-if="level_name == '普通会员'"><span style="margin-right: 4rpx;">¥</span>{{item.price}}</view>
						<view class="index-bottom-give">
							<image lazy-load="true" class="index-bottom-img" src="https://zhijianlw.com/static/web/img/give.png" mode=""></image>
						</view>
					</view>


				</view>
			</view>
		</view>


		<view class="no-btm" v-if="commody.length==0">
			<image class="img" src="../../static/nobtm.jpg" mode=""></image>
		</view>
		<view v-else>
			<view class="record-bottom" v-if="none==200">已经到底了~</view>
			<view class="record-bottom" v-else-if="none==0">正在加载中~</view>
		</view>

	</view>

</template>

<script>
	import config from '../../common/config.js';
	import Navgation from "@/wxcomponents/navgation/navgation.vue";
	import MD5 from "@/common/md5.js";
	import btn from "@/common/btn.js";
	import utils from "@/common/utils.js";
	export default {
		data() {
			return {
				btmShow: 0,
				none: '0',
				// 折扣
				discount_name: '',
				// 会员id
				id: '',
				// 会员级别 数字 和文字
				level: '',
				level_name: '',
				// 导航高度
				a: '',
				// logo图
				logo: '',
				// 轮播图 多张
				swiper: [],
				// 轮播图 单张
				img_lunbo: '',
				// 主题方案
				first: [],
				// 推荐商品
				activity: [],
				// 顶部导航
				indexNav: [],
				// 导航第一个 keynum
				choose: '',
				// 全部分类
				show: [],
				// 分类banner图
				louceng: '',
				// 商品
				commody: [],
				// 商品分页 
				pageIndex: '',
				price: [],
				q: '0',
				nav: '0',
				showleft: false,
				showright: false,
				code: '',
				begin_price: '',
				end_price: '',
				sta: '',
				banner: [],
				openid: '',
				Data: '',
				planid: '',
				url: ''
			}

		},
		onLoad: function(e) {
			this.url = config.URL;
			var that = this;
			// console.log(e)
			// 需要用到的参数
			// 打几折  商品会使用
			this.discount_name = uni.getStorageSync('discount_name');
			// 会员id   一级分类    立即赠送 使用
			this.id = wx.getStorageSync('id');
			// 会员级别  数字     商品分类+导航需要
			this.level = uni.getStorageSync('level');
			// 会员级别 文字    渲染时使用
			this.level_name = uni.getStorageSync('level_name')
			// 自定义导航高度
			uni.getSystemInfo({
				success: res => {
					this.a = res.statusBarHeight
				}
			})

			// 1.判断当前登录状态    200已登录   0未登录
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
			this.planid = e.id
			// 4.推荐商品相关
			this.recommend();


			// 价格区间
			var data = '{}';
			var action = 'get_price_range';

			this.$utils.post(action, data).then(res => {
				console.log('2.价格区间', res.rs)
				for (let i in res.rs) {
					res.rs[i].price = res.rs[i].begin_price + '-' + res.rs[i].end_price
				}
				this.price = res.rs;
			})
			// 人群
			var data = '{}';
			var action = 'get_gift_person_list';

			that.$utils.post(action, data).then(res => {
				console.log('2.商品头部导航,选择器分类', res.rs)

				// 顶部导航  正式操作
				this.show = res.rs
			})




		},

		// 上拉刷新
		onReachBottom: function() {
			let begin_price = this.begin_price;
			let end_price = this.end_price;
			let choose = this.choose;
			let pageIndex = this.pageIndex;

			pageIndex++;

			var data = '{"plan_theme_id":"' + this.planid + '","pageSize":"20","pageIndex":"' + pageIndex + '"}';
			// console.log(data)
			var action = 'get_plan_theme_goods';
			this.$utils.post(action, data).then(res => {
				// console.log('推荐商品',res.rs)
				if (res.rs.goodslist.length < 20) {
					this.none = '200';
				} else {
					this.none = '0';
				}
				if (res.rs.goodslist == '') {
					this.none = '200';
				} else {
					this.pageIndex++;
					for (let i=0;i<res.rs.goodslist.length;i++) {
						res.rs.goodslist[i].discount_name1 = (res.rs.goodslist[i].price_level1 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name2 = (res.rs.goodslist[i].price_level2 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name3 = (res.rs.goodslist[i].price_level3 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name4 = (res.rs.goodslist[i].price_level4 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						this.commody.push(res.rs.goodslist[i]);
					}
				}

			})
		},

		methods: {
			// 点击跳转 
			// 搜索
			search: function(e) {
				uni.navigateTo({
					url: '../../pages/search/search'
				})
			},



			// 商品
			details: function(e) {
				let index = e.currentTarget.dataset.index;

				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
			// 获取openid
			open: function() {
				var openid = uni.getStorageSync('openid');

				// 判断是否获取
				if (openid) {
					this.openid = openid;
					// console.log('已获取openid')
				} else {
					// 获取openid
					uni.login({
						success: (res) => {

							var data = '{"wx_code":"' + res.code + '"}';
							var action = 'get_openid';

							this.$utils.post(action, data).then(res => {
								// console.log('openid',res)
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
					uni.showLoading({
						title: '登录中',
						mask: 'true'
					})
					this.zhu();
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
				// console.log(data)
				// 注册接口
				var action = 'member_register';

				this.$utils.post(action, data).then(res => {
					// console.log('注册',res)

					if (res.msg === "操作成功！" || res.msg === '该用户已经注册,请勿重复注册！') {
						//登录 
						var data = '{"wx_openid":"' + openid + '"}';
						var action = 'member_login';
						this.$utils.post(action, data).then(res => {
							uni.hideLoading();
							this.level_name = res.rs.level_name;
							this.level = res.rs.level;
							this.recommend();
							// console.log('基本信息',res.rs)
							// 全部
							uni.setStorageSync('NO', res.rs.NO)
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

					this.$utils.post(action, data).then(res => {
						// console.log('添加购物车',res)
						uni.navigateTo({
							url: '../shopping/shop'
						})
						// uni.showToast({
						// 	  title:'成功加入礼袋',
						//  icon:'success',
						//  mask:true,
						// })

					})
				}



			},







			// 获取推荐商品列表
			recommend: function(e) {
				var data = '{"plan_theme_id":"' + this.planid + '","pageSize":"20","pageIndex":"1"}';
				// console.log(data)
				var action = 'get_plan_theme_goods';

				this.pageIndex = 1;

				this.$utils.post(action, data).then(res => {
					// console.log(res.rs)
					if (res.sta == 1) {
						if (res.rs.goodslist.length < 20) {
							this.none = '200';
						} else {
							this.none = '0';
						}
						for (let i in res.rs.goodslist) {


							res.rs.goodslist[i].discount_name1 = (res.rs.goodslist[i].price_level1 / res.rs.goodslist[i].price * 10).toFixed(
								1) + '折';
							res.rs.goodslist[i].discount_name2 = (res.rs.goodslist[i].price_level2 / res.rs.goodslist[i].price * 10).toFixed(
								1) + '折';
							res.rs.goodslist[i].discount_name3 = (res.rs.goodslist[i].price_level3 / res.rs.goodslist[i].price * 10).toFixed(
								1) + '折';
							res.rs.goodslist[i].discount_name4 = (res.rs.goodslist[i].price_level4 / res.rs.goodslist[i].price * 10).toFixed(
								1) + '折';


							this.commody.push(res.rs[i]);
						}
						this.commody = res.rs.goodslist;
					}
				})


			},
			// 分类 价位点击
			showw: function(e) {
				this.value = '';
				let index = e.currentTarget.dataset.index;
				this.indexx = e.currentTarget.dataset.index
				let showleft = this.showleft;
				let showright = this.showright;
				if (index == 0) {
					this.showleft = !showleft;
				} else {
					this.showright = !showright;
				};
			},
			// 分类 
			showl: function(e) {
				// this.value = '';
				// let index = e.currentTarget.dataset.index;
				// this.nav = index;
				// if(this.indexNav[index].louceng_img.match('|')[0] == '|'){
				// 	this.banner = this.indexNav[index].louceng_img.split('|');
				// }else{
				// 	this.louceng = this.indexNav[index].louceng_img;
				// }		

				// let choose = e.currentTarget.dataset.choose;
				// this.choose = e.currentTarget.dataset.choose;

				// let showleft = this.showleft;
				// let show = this.show;
				// let translate = this.show[index];

				// this.showleft = false;
				// this.pageIndex = 1;
				// var data = '{"goodsclassify":"'+choose+'","member_level":"'+this.level+'","pageSize":"20","pageIndex":"1"}';
				// var action = 'get_index_goods';

				//   this.$utils.post(action,data).then(res=>{
				// 		 console.log('2.2底部商品',res.rs)
				// 		 if(res.rs.length<20){
				// 		 	this.none = '200';
				// 		 }else{
				// 		 	this.none = '0';
				// 		 }
				// 		 for(let i in res.rs){


				// 		 	res.rs[i].discount_name1 = (res.rs[i].price_level1/res.rs[i].price*10).toFixed(1) + '折';
				// 		 	res.rs[i].discount_name2 = (res.rs[i].price_level2/res.rs[i].price*10).toFixed(1) + '折';
				// 		 	res.rs[i].discount_name3 = (res.rs[i].price_level3/res.rs[i].price*10).toFixed(1) + '折';
				// 		 	res.rs[i].discount_name4 = (res.rs[i].price_level4/res.rs[i].price*10).toFixed(1) + '折';


				// 		 }
				// 		 this.commody = res.rs;
				//   })

				var that = this;
				this.btmShow = 0;
				let index = e.currentTarget.dataset.index;
				this.nav = index;
				this.begin_price = '';
				this.end_price = '';
				// this.jump.index = index;
				// this.jump.keynum = this.indexNav[index].keynum;

				// if(this.indexNav[index].louceng_img.match('|')[0] == '|'){
				// 	this.banner = this.indexNav[index].louceng_img.split('|');
				// }else{
				// 	this.louceng = this.indexNav[index].louceng_img;
				// }	

				let choose = e.currentTarget.dataset.choose;
				this.choose = e.currentTarget.dataset.choose;

				let showleft = this.showleft;
				let show = this.show;
				let translate = this.show[index];

				this.showleft = false;
				this.pageIndex = 1;
				var data = '{"gift_person_id":"' + choose + '","member_level":"' + this.level +
					'","pageSize":"20","pageIndex":"1"}';
				var action = 'get_gift_person_goods';
				console.log(data)
				this.$utils.post(action, data).then(res => {
					console.log('2.2底部商品', res.rs.goodslist)
					if (res.rs.goodslist.length < 20) {
						this.none = '200';
					} else {
						this.none = '0';
					}

					for (let i in res.rs.goodslist) {
						res.rs.goodslist[i].discount_name1 = (res.rs.goodslist[i].price_level1 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name2 = (res.rs.goodslist[i].price_level2 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name3 = (res.rs.goodslist[i].price_level3 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name4 = (res.rs.goodslist[i].price_level4 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
					}
					that.commody = res.rs.goodslist;
				})


			},
			// 价位
			showr: function(e) {


				var that = this;
				this.btmShow = 0;
				let index = e.currentTarget.dataset.index;
				this.begin_price = e.currentTarget.dataset.begin_price;
				this.end_price = e.currentTarget.dataset.end_price;
				let begin_price = e.currentTarget.dataset.begin_price;
				let end_price = e.currentTarget.dataset.end_price;
				let showright = this.showright;
				let show = this.show;
				let price = this.show[index];
				this.showright = false;
				this.pageIndex = 1;
				var data = '{"gift_person_id":"' + this.choose + '","member_level":"' + this.level +
					'","pageSize":"20","pageIndex":"1","begin_price":"' + begin_price + '","end_price":"' + end_price + '"}';
				var action = 'get_gift_person_goods';
				console.log(data)
				this.$utils.post(action, data).then(res => {
					console.log('2.2底部商品', res.rs.goodslist)
					if (res.rs.goodslist.length < 20) {
						this.none = '200';
					} else {
						this.none = '0';
					}
					
					for (let i in res.rs.goodslist) {
						res.rs.goodslist[i].discount_name1 = (res.rs.goodslist[i].price_level1 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name2 = (res.rs.goodslist[i].price_level2 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name3 = (res.rs.goodslist[i].price_level3 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name4 = (res.rs.goodslist[i].price_level4 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
					}
					that.commody = res.rs.goodslist;
				})

			},
			// 点击确定
			button: function() {
				var that = this;
				this.btmShow = 0;
				let begin_price = this.begin_price;
				let end_price = this.end_price;
				let showright = this.showright;
				let show = this.show;
				this.begin_price = this.begin_price;
				this.end_price = this.end_price;
				// let index = e.currentTarget.dataset.index;
				// let price = this.show[index];
				this.showright = false;
				this.pageIndex = 1;
				var data = '{"gift_person_id":"' + this.choose + '","member_level":"' + this.level +
					'","pageSize":"20","pageIndex":"1","begin_price":"' + begin_price + '","end_price":"' + end_price + '"}';
				var action = 'get_gift_person_goods';
				console.log(data)
				this.$utils.post(action, data).then(res => {
					console.log('2.2底部商品', res.rs.goodslist)
					if (res.rs.goodslist.length < 20) {
						this.none = '200';
					} else {
						this.none = '0';
					}

					for (let i in res.rs.goodslist) {
						res.rs.goodslist[i].discount_name1 = (res.rs.goodslist[i].price_level1 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name2 = (res.rs.goodslist[i].price_level2 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name3 = (res.rs.goodslist[i].price_level3 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
						res.rs.goodslist[i].discount_name4 = (res.rs.goodslist[i].price_level4 / res.rs.goodslist[i].price * 10).toFixed(
							1) + '折';
					}
					that.commody = res.rs.goodslist;

				})


			},
			// 点击显示确定按钮
			click: function() {
				this.btmShow = 1;
			},
			// 左侧
			begin: function(e) {
				this.begin_price = e.target.value;
			},
			// 右侧
			bend: function(e) {
				this.end_price = e.target.value;
			},






		}
	}
</script>

<style>
	.index-banner {
		margin: 0 auto 15rpx auto !important;
	}
</style>
