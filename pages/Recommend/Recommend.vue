<template>
	<view>
		<!-- 商品 -->
<own-product-list :commody="commody" :state="none"></own-product-list>

	</view>

</template>

<script>
	import config from '../../common/config.js';
	import Navgation from "@/wxcomponents/navgation/navgation.vue"; 
	import ownProductList from "@/components/own-components/own-product-list.vue";
	import MD5 from "@/common/md5.js";
	import btn from "@/common/btn.js";
	import utils from "@/common/utils.js";
	export default {
		components:{
			"own-product-list": ownProductList
		},
		data() {
			return {
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
				url: ''
			}

		},
		onLoad: function() {
			this.url = config.URL;
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

			// 4.推荐商品相关
			this.recommend();
		},

		// 上拉刷新
		onReachBottom: function() {
			let begin_price = this.begin_price;
			let end_price = this.end_price;
			let choose = this.choose;
			let pageIndex = this.pageIndex;

			pageIndex++;



			var data = JSON.stringify({
				pageIndex: pageIndex,
				pageSize: 20,
				is_type: 1
			})
			var action = 'get_tuijian_goods';
			this.$utils.post(action, data).then(res => {
				// console.log('推荐商品',res.rs)
				if (res.rs.length < 20) {
					this.none = '200';
				} else {
					this.none = '0';
				}
				if (res.rs == '') {} else {
					this.pageIndex++;
					for (let i in res.rs) {


						res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';


						this.commody.push(res.rs[i]);
					}
				}

			})

			// 新的
			//  var that = this;
			//  this.pageIndex = 1;

			//  var data = '{"member_level":"'+that.level+'","pageSize":"20","pageIndex":"'+pageIndex+'"}';
			//  console.log(data)
			//  // var data = '{"gift_person_id":"'+res.rs[0].id+'","member_level":"'+that.level+'","pageSize":"20","pageIndex":"1","begin_price":"10","end_price":"60"}';
			//  var action = 'get_index_tuijian_goods';
			//    that.$utils.post(action,data).then(res=>{
			// 	if(res.rs.length<20){
			// 		this.none = '200';
			// 	}else{
			// 		this.none = '0';
			// 	}
			// 	if(res.rs==''){}else{
			// 		this.pageIndex++;
			// 		for(let i in res.rs){


			// 			res.rs[i].discount_name1 = (res.rs[i].price_level1/res.rs[i].price*10).toFixed(1) + '折';
			// 			res.rs[i].discount_name2 = (res.rs[i].price_level2/res.rs[i].price*10).toFixed(1) + '折';
			// 			res.rs[i].discount_name3 = (res.rs[i].price_level3/res.rs[i].price*10).toFixed(1) + '折';
			// 			res.rs[i].discount_name4 = (res.rs[i].price_level4/res.rs[i].price*10).toFixed(1) + '折';


			// 			this.commody.push(res.rs[i]);  
			// 		}
			// 	}
			// })
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
				// 旧的
				var data = JSON.stringify({
					pageIndex: 1,
					pageSize: 20,
					is_type: 1
				})
				var action = 'get_tuijian_goods';

				this.pageIndex = 1;

				this.$utils.post(action, data).then(res => {
					if (res.sta == 1) {
						// console.log('4.推荐商品列表',res.rs)
						if (res.rs.length < 20) {
							this.none = '200';
						} else {
							this.none = '0';
						}

						for (let i in res.rs) {


							res.rs[i].discount_name1 = (res.rs[i].price_level1 / res.rs[i].price * 10).toFixed(1) + '折';
							res.rs[i].discount_name2 = (res.rs[i].price_level2 / res.rs[i].price * 10).toFixed(1) + '折';
							res.rs[i].discount_name3 = (res.rs[i].price_level3 / res.rs[i].price * 10).toFixed(1) + '折';
							res.rs[i].discount_name4 = (res.rs[i].price_level4 / res.rs[i].price * 10).toFixed(1) + '折';


							this.commody.push(res.rs[i]);
						}
						this.commody = res.rs;
					}
				})

				// // 新的
				// var that = this;
				// this.pageIndex = 1;

				// var data = '{"member_level":"'+that.level+'","pageSize":"20","pageIndex":"1"}';
				// console.log(data)
				// // var data = '{"gift_person_id":"'+res.rs[0].id+'","member_level":"'+that.level+'","pageSize":"20","pageIndex":"1","begin_price":"10","end_price":"60"}';
				// var action = 'get_index_tuijian_goods';
				//   that.$utils.post(action,data).then(res=>{
				// 				if(res.sta == 1){
				// 					// console.log('4.推荐商品列表',res.rs)
				// 					if(res.rs.length<20){
				// 						this.none = '200';
				// 					}else{
				// 						this.none = '0';
				// 					}

				// 					for(let i in res.rs){


				// 						res.rs[i].discount_name1 = (res.rs[i].price_level1/res.rs[i].price*10).toFixed(1) + '折';
				// 						res.rs[i].discount_name2 = (res.rs[i].price_level2/res.rs[i].price*10).toFixed(1) + '折';
				// 						res.rs[i].discount_name3 = (res.rs[i].price_level3/res.rs[i].price*10).toFixed(1) + '折';
				// 						res.rs[i].discount_name4 = (res.rs[i].price_level4/res.rs[i].price*10).toFixed(1) + '折';


				// 						this.commody.push(res.rs[i]);  
				// 					}
				// 					this.commody = res.rs;
				// 				}
				//   })



			},




		}
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	.index-banner {
		margin: 0 auto 15rpx auto !important;
	}
</style>
