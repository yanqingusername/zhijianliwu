<template>
	<view :class="[fixed===false?'':'fixed']">

		<!-- 长描述隐藏 -->
		<view class="shop-body-hidden " :class="[display===false?'none':'']">
			<view class="details-hidden">
				<!-- 商品 -->
				<view class="details-hidden-introduce flex">
					<view class="details-hidden-img">
						<!-- 选规格里的图片 -->
						<img class="img" :src="$utils.imageUrl(head_img)">
						<view class="guige-name">{{alt.goodsname.substr(0,10)}}...
						</view>
						<view class="details-hidden-number">已选择:
							<text v-for="(item,index) of guige" :key="index">
								{{item}}
							</text>
							
						</view>
						<view class="details-hidden-right">
							<view class="details-hidden-price" v-if="level_name=='普通会员'">¥{{alt.price_level0}}</view>
							<view class="details-hidden-price" v-else-if="level_name=='企业会员'">¥{{alt.price_level3}}</view>
							<view class="details-hidden-number"></view>
						</view>
					</view>
				</view>
				<view class="details-hidden-content">
					<scroll-view scroll-y="true" style="height: 240px;width:690rpx;white-space: normal;">
						<view v-for="(item,index) in choose" :key="index"  v-if="text>1">
							<view class="details-hidden-title">{{item.spec_name}}</view>
							
							<view class="details-hidden-alt flex-wrap"  >
								<view class="details-hidden-inline" v-for="(it,index) in item.goods_spec_item"
									:data-one="item.one" :data-index="index" :data-text="it.item"
									@tap="handleSelect(index)" :data-da="item.spec_name" @click="spec" :key="index"
									:class="[specArr[item.one]==it.item?'active':'']">
									{{it.item}}
								</view>
							</view>
						</view>
						<view v-for="(item,index) in choose" :key="index" v-else>
							<view class="details-hidden-title">{{item.spec_name}}</view>
							<view class="details-hidden-alt flex-wrap">
								<view class="details-hidden-inline" v-for="(it,index) in item.goods_spec_item" :data-one="item.one" :data-index="index" :data-text="it.item"
								 @click="spec" :key="index" :class="[specArr[item.one]==it.item?'active':'']">{{it.item}}</view>
							</view>
						</view>
					</scroll-view>
					
					<!-- 规格里购买数量 -->
					<view class="buy">
						<text class="buy-num">购买数量:</text>
						<view class="reduce" @click="reduce(checknum,-1,index)">
							-
						</view>
						<view class="cart-count">
							{{checknum}}
						</view>
						<view class="add" @click="reduce(checknum,1,index)">
							+
						</view>
					</view>
				</view>
				<!-- <view style="text-align: center;color: #c3c3c3;position: absolute;width: 100%;bottom: 100rpx;">
					(确定立即添加至购物车)
				</view> -->
				<!-- 直接购买规格确定 -->
				<view class="" v-if="btns==1">
					<view class="details-hidden-determine"  @click="determine1">确定</view>
				</view>
				<!-- 直接赠送规格确定 -->
				<view class="" v-if="btns==2">
					<view class="details-hidden-determine"  @click="determine2">确定</view>
				</view>
				<!-- 礼篮规格确定 -->
				<view class="" v-if="btns==3">
					<view class="details-hidden-determine"  @click="determine3">确定</view>
				</view>
				<!-- 关闭 -->
				<image src="../../static/details-close.png" class="details-hidden-close" mode="" @click="close"></image>
			</view>
		</view>

		<!-- 轮播图 -->

		<swiper v-if="details.length>0" class="details-swiper" :circular="true" :indicator-dots="true" :autoplay="true"
			:interval="3000" :duration="1000" indicator-color="#D6D6D6 " indicator-active-color="#FF9999">
			<swiper-item v-for="(item,index) in details" :key="index">
				<view class="details-swiper-img">
					<image :src="$utils.imageUrl(item)" class="img" mode=""></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 不是轮播图的时候 -->
		<view v-else class="details-swiper">
			<view class="details-swiper-img">
				<!-- 报错就是这里... -->
				<image :src="$utils.imageUrl(head_img)" class="img" mode=""></image>
			</view>
		</view>

		<!-- 商品描述 -->
		<view class="details-alt">
			<view class="details-alt-title flex-between">
				<!-- 商品介绍 -->
				<view class="details-alt-text">{{alt.goodsname}}</view>
				<text class="details-alt-xq">{{alt.goodstitle}}</text>
				<!-- 礼篮 -->
				<button class="details-alt-logo lilan" style="margin: 0;padding: 0;" @click="lilan">
					<image class="img" :src="$utils.osspath_url('/xcx-static/details/add.png')" mode=""></image>
				</button>
				<!-- 求礼物 -->
				<view class="details-alt-logo gifts" style="margin: 0;padding: 0;" open-type="share">
					<image @click="gotoShare" class="img" :src="$utils.osspath_url('/xcx-static/details/qiugift.png')"
						mode=""></image>
					<uni-popup ref="popup" backgroundColor="#fff" type="bottom">
						<view class="qiu">
							<text class="wx">发送给微信好友</text>
							<text class="wx">保存图片发朋友圈</text>
							<text class="wx close1" @click="close1">取消</text>
						</view>
					</uni-popup>
				</view>


			</view>

			<!-- 价格 -->
			<view class="details-alt-left">
				<view class="details-alt-btm flex">
					<view class="details-alt-btm-price" v-if="level_name=='普通会员'">¥{{alt.price_level0}}</view>

					<view class="details-alt-btm-price" v-else-if="level_name=='企业会员'">
						¥{{alt.price_level3}}
					<image class="details-alt-xq biao" :src="$utils.osspath_url('/xcx-static/details/biao.png')" mode="">
					</image>
					<view class="details-alt-btm-discount  details-alt-line" >¥{{alt.price}}</view>
					</view>
                   
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="details-tips flex-vertically" v-if="couponList.length>0">
			<view class="details-blessing-alt">领劵送礼更优惠<view class="details-blessing-circular"></view>
			</view>
			<view class="coupon-button" style="position: absolute;right: 0;">
				<own-coupon-list :list="couponList"></own-coupon-list>
			</view>
		</view>
		<!-- 祝福语 -->
		<view class="details-blessing flex-between flex-vertically">
			<text class="details-ch">已选</text>
			<view class="details-ch-xq chec" v-for="(item,index) of guige" :key="index">
				{{item}}
			</view>
		</view>
		<!-- 退款提示 -->
		<view class="details-tips flex-vertically">
			<text class="details-ch">服务</text>
			<text class="details-ch-xq">正品保障 · 可开发票 · 发货&售后</text>
		</view>
		<!-- 商品详情/商品须知 -->
		<view class="details-choose">
			<view class="details-choose-content margin-auto flex-between">
				<view @tap="join" data-index="0" :class="commom">商品详情</view>
				<view @tap="join" class="zengli" data-index="1" :class="commom1">赠礼须知</view>
			</view>

		</view>
		<!-- 商品详情 -->
		<u-parse :content="btmdetails" v-if="btm"></u-parse>
		<!-- 赠礼须知 -->
		<u-parse :content="btmnotice" v-else></u-parse>

		<view class="details-bottom-kong"></view>

		<!-- 底部 -->
		<button class="details-btm flex" v-if="sta == 0" open-type="getUserInfo" @getuserinfo="bindGetUserInfo"
			style="padding: 0;background: transparent;z-index:1;"></button>

		<view class="details-btm flex">
			<view class="details-icon flex-vertically">
				<view class="details-icon-content flex-between ">
					<!-- 底部客服礼篮内容 -->
					<view class="details-icon-flex" >
						<view class="" @click="bottom_btn">
							<view class="flex-between-img">
								<image src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/index/hamper_icon.png" class="tab" mode="widthFix"></image>
							</view>
							<view class="flex-between-text">礼篮</view>
							<text class="num_all">{{num_all}}</text>
						</view>
						
						<view class="online_service">
							<image src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/index/online_service.png" class="tab1" mode=""></image>
							<view class="flex-between-text online">在线客服</view>
						</view>
						<button open-type="contact"></button>
					</view>
				</view>
			</view>

			<view class="details-join" open-type="buy" @click="list_speci">直接购买</view>
			<view class="details-give" open-type="song" @click="goshop">立即赠送</view>
		</view>
	</view>




</template>

<script>
	import ownCouponList from "@/components/own-components/own-coupon-list/own-coupon-list.vue";
	import uParse from "@/components/feng-parse/parse.vue";
	import '@/components/feng-parse/parse.css';
	import config from '../../common/config.js';
	export default {
		components: {
			uParse,
			"own-coupon-list": ownCouponList
		},
		data() {
			return {
				num_all:0,
				btns:0,//规格确定按钮
				fixed: false,
				list:[],
				display: false,
				commom: 'details-choose-left details-choose-active',
				commom1: 'details-choose-left',
				img: true,
				details: [],
				indexNav: [{
						name: '热门',
						style: 'color:#FF0022;border-bottom:4.16rpx solid #FF0022;'
					},
					{
						name: '情人节'
					},
					{
						name: '夏日防暑'
					},
					{
						name: '9.9包邮'
					},
					{
						name: '美物'
					},
					{
						name: '热门'
					},
					{
						name: '情人节'
					},
				],
				alt: '',
				text: '',
				text1: '',
				choose: [{
						src: '../../static/details-small.jpg'
					},
					{
						src: '../../static/details-small.jpg'
					},
					{
						src: '../../static/details-small.jpg'
					},
					{
						src: '../../static/details-small.jpg'
					},
					{
						src: '../../static/details-small.jpg'
					},
					{
						src: '../../static/details-small1.jpg'
					},
					{
						src: '../../static/details-small1.jpg'
					},
					{
						src: '../../static/details-small1.jpg'
					},
					{
						src: '../../static/details-small1.jpg'
					},
					{
						src: '../../static/details-small1.jpg'
					},
				],
				id: '',
				goods_model: "",
				goods_spec: [0],
				goods_item: ["默认"],
				discount_name: '',
				level_name: '',
				level: '',
				images: '',
				head_img: '',
				arr: [],
				first: [],
				btmdetails: '',
				btmnotice: '',
				btm: true,
				listdisplay: false,
				scrollTop: '',
				tt: [],
				top: '',
				keynum: '',
				sta: '',
				openid: '',
				Data: '',
				specArr: {},
				url: "",
				couponList: [],
				goodsinfo: {},
				goods_item: '',
				guige: [],
				checknum: '1'
			}
		},
		onLoad: function(e) {
			this.url = config.URL;
			console.log(e)
			console.log("我执行了")
			const scene = decodeURIComponent(e.scene);
			if (e.keynum) {
				this.keynum = e.keynum;
			} else {
				this.keynum = scene;
			}

			this.level_name = uni.getStorageSync('level_name');
			console.log(this.level_name)
			this.level = uni.getStorageSync('level')
			this.discount_name = uni.getStorageSync('discount_name');

			this.id = uni.getStorageSync('id');
			let id = uni.getStorageSync('id');

			var data = '{"keynum":"' + this.keynum + '","memberid":"' + id + '"}';
			console.log(data)
			var action = 'get_goods_detail';
			this.$utils.post(action, data).then(res => {
				console.log('res： ', res)
				console.log('详情', res.rs.goodsinfo)
				this.goodsinfo = res.rs.goodsinfo;
				var data = JSON.stringify({
					memberid: this.id,
					goodsid: this.goodsinfo.id,
				});
				var action = 'get_coupon_list';

				this.$utils.post(action, data).then(res => {
					console.log();
					this.couponList = res.rs;
				});
				// 首图					  
				this.head_img = res.rs.goodsinfo.head_img;
				// 多图
				if (res.rs.goodsinfo.images) {
					let details = res.rs.goodsinfo.images.split('|');
					details.unshift(res.rs.goodsinfo.head_img)
					this.details = details;
				}


				// 规格
				this.text = res.rs.goodsinfo.goods_spec.length;
				
				// 规格商品
				this.text1 = res.rs.goodsinfo.goods_spec_list.length;
				console.log('规格', res.rs.goodsinfo.goods_spec);
				res.rs.goodsinfo.discount_name1 = (res.rs.goodsinfo.price_level1 / res.rs.goodsinfo.price * 10)
					.toFixed(1) + '折';
				res.rs.goodsinfo.discount_name2 = (res.rs.goodsinfo.price_level2 / res.rs.goodsinfo.price * 10)
					.toFixed(1) + '折';
				res.rs.goodsinfo.discount_name3 = (res.rs.goodsinfo.price_level3 / res.rs.goodsinfo.price * 10)
					.toFixed(1) + '折';
				res.rs.goodsinfo.discount_name4 = (res.rs.goodsinfo.price_level4 / res.rs.goodsinfo.price * 10)
					.toFixed(1) + '折';

				// 内容
				this.alt = res.rs.goodsinfo;
				// 规格
				this.specifications = res.rs.goodsinfo.goods_spec_list;
				// 模型
				this.goods_model = res.rs.goodsinfo.goods_model;
				// 商品详情规格
				this.list = res.rs.goodsinfo.goods_spec_list;
				// 选择
				for (let i in res.rs.goodsinfo.goods_spec) {
					res.rs.goodsinfo.goods_spec[i].one = i
				}

				// 商品详情
				this.btmdetails = res.rs.goodsinfo.details.replace(/<img /g, '<img class="rich_img" ');
				// 商品规格
				this.choose = res.rs.goodsinfo.goods_spec;
				// 商品id
				this.goodsid = res.rs.goodsinfo.id;
				console.log("礼篮");

				console.log("是否只有一个选项：", res.rs.goodsinfo.goods_spec.length, res.rs.goodsinfo.goods_spec
					.goods_spec_item.length);
				if (res.rs.goodsinfo.goods_spec.length == 1 && res.rs.goodsinfo.goods_spec.goods_spec_item ==
					1) {
					// TODO
					this.goods_spec = [0];
					this.goods_item = [res.rs.goodsinfo.goods_spec.goods_spec_item];
				}
			})
			// 赠礼须知
			var data = '{}';
			var action = 'get_webconfig_tiaoli';

			this.$utils.post(action, data).then(res => {
				console.log('赠礼须知')
				res.rs.zenglixuzhi
				this.btmnotice = res.rs.zenglixuzhi.replace(/<img /g, '<img class="rich_img" ')
			})


			var sign = uni.getStorageSync('sign')
			if (sign) {
				this.sta = '200';
			} else {
				this.open();
				this.sta = '0';
			}

		},
		onShareAppMessage: function(e) {
			return {
				// title:this.alt.goodsname,
				title: '我好喜欢这个礼物，可以送给我吗？',
				path: '/pages/details/details?keynum=' + this.keynum,
				desc: '指间送礼',
			}

		},
		computed: {
			selectOption() {
				return this.goods_item
			}
		},
		methods: {
			//底部规格购买数量加减
			reduce(num, type, index) {
				this.checknum = parseInt(num) + parseInt(type);
				return
			},
			handleSelect(goods) {
				this.goods_item = goods
			},
			// 底部选项卡  商品详情   赠礼须知
			join: function(e) {
				let index = e.currentTarget.dataset.index;

				if (index == 0) {
					// 变红
					this.commom = 'details-choose-left details-choose-active';
					this.commom1 = 'details-choose-left';
					// 忘了....干啥的了.
					this.img = true;
					this.btm = true;
				} else {
					this.commom1 = 'details-choose-left details-choose-active';
					this.commom = 'details-choose-left';
					this.img = false;
					this.btm = false;
				}
			},
			
			// 立即赠送
			goshop: function(e) {
				this.btns=2
				let i = 0;
				this.display = !this.display;
				this.fixed = true;
				console.log('打开商品规格')
				if (i == 0) {
					console.log(this.scrollTop)
					i++
				}			
							
					return		
				
				
				
				if (this.text > 1 || this.text1 > 1) {
					let i = 0;
					this.display = !this.display;
					this.fixed = true;
					console.log('打开商品规格')
					if (i == 0) {
						console.log(this.scrollTop)
						i++
					}
					
					
					
				} else {
					let action = "op_buy_shopping_cart";
					let id = this.id;
					let goodsid = this.goodsid
					let goods_model = this.goods_model;
					// 替换 # 为 \u35
					let goods_spec = this.goods_spec;
					let goods_item = this.goods_item;
					console.log(String(goods_item).replace('#', '\\u35'));
					let data = JSON.stringify({
						memberid: id,
						goodsid: goodsid,
						goods_model: goods_model,
						goods_spec: String(goods_spec),
						goods_item: String(goods_item).replace('#', '\\u35'),
						num: 1
					});
					console.log(typeof data, data);
					this.$utils.post(action, data).then(res => {
						
					})
				}
				
			},
			//礼篮
			lilan: function(e) {
				this.btns=3
				let i = 0;
				this.display = !this.display;
				this.fixed = true;
				console.log('打开商品规格')
				if (i == 0) {
					console.log(this.scrollTop)
					i++
				}			
							
					return		
					
				if (this.text > 1 || this.text1 > 1) {
					let i = 0;
					this.display = !this.display;
					this.fixed = true;
					console.log('打开商品规格')
					if (i == 0) {
						console.log(this.scrollTop)
						i++
					}
				} else {
					let action = "op_buy_shopping_cart";
					let id = this.id;
					let goodsid = this.goodsid
					let goods_model = this.goods_model;
					// 替换 # 为 \u35
					let goods_spec = this.goods_spec;
					let goods_item = this.goods_item;
					console.log(String(goods_item).replace('#', '\\u35'));
					let data = JSON.stringify({
						memberid: id,
						goodsid: goodsid,
						goods_model: goods_model,
						goods_spec: String(goods_spec),
						goods_item: String(goods_item).replace('#', '\\u35'),
						num: 1
					});
					this.$utils.post(action, data).then(res => {
						
					})
				}
			},
			meshop: function() {

			},
			// 打开详情规格
			list_speci: function(e) {
				this.btns=1
				console.log(this.text);
				
							
				let i = 0;
				this.display = !this.display;
				this.fixed = true;
				console.log('打开商品规格')
				if (i == 0) {
					console.log(this.scrollTop)
					i++
				}
				
				var action = 'get_goods_detail';
				let data = JSON.stringify({
					memberid: this.id,
					goodsid: this.goodsinfo.id,
					goods_model: this.goodsinfo.goods_model,
					spec_name:this.goodsinfo['goods_spec'][0]['spec_name'],
					goods_spec: this.goodsinfo['goods_spec'][0]['id'],
					goods_item: this.goodsinfo['goods_spec'][0]['goods_spec_item'][0]['item']
				
				});
			
				this.$utils.post(action, data).then(res => {
					console.log(res)
				})			
				
					return		
				
				
				
				if (this.text > 1 || this.text1 > 1) {
					let i = 0;
					this.display = !this.display;
					this.fixed = true;
					console.log('打开商品规格')
					if (i == 0) {
						console.log(this.scrollTop)
						i++
					}
					
					
					
				} else {
					let action = "op_buy_shopping_cart";
					let id = this.id;
					let goodsid = this.goodsid
					let goods_model = this.goods_model;
					// 替换 # 为 \u35
					let goods_spec = this.goods_spec;
					let goods_item = this.goods_item;
					console.log(String(goods_item).replace('#', '\\u35'));
					let data = JSON.stringify({
						memberid: id,
						goodsid: goodsid,
						goods_model: goods_model,
						goods_spec: String(goods_spec),
						goods_item: String(goods_item).replace('#', '\\u35'),
						num: 1
					});
					this.$utils.post(action, data).then(res => {
						
					})
				}
			},
			// 关闭规格
			close: function(e) {
				console.log('关闭规格')
				this.display = false;
				this.fixed = false;
				this.scrolle()
			},
			// 直接购买确定规格  
			determine1: function(e) {
				console.log('确定规格')
				this.display = false;
				this.fixed = false;
				let action = "op_buy_shopping_cart";
				let id = this.id;
				let goodsid = this.goodsid;
				let goods_model = this.goods_model;
				let goods_spec = String(Object.keys(this.specArr));
				let goods_item = String(Object.values(this.specArr)).replace('#', '替换u35');
				console.log(goods_item);
				let data = JSON.stringify({
					memberid: id,
					goodsid: goodsid,
					goods_model: goods_model,
					goods_spec: goods_spec,
					goods_item: goods_item,
					num: this.checknum,
					buy_type:1
				});
				console.log(data);
				this.$utils.post(action, data).then(res => {
					console.log(res+"直接购买")
					let icon="success"
					if (res.sta !=1) {
						icon = "none";
						uni.showToast({
							icon: icon,
							title: res.msg,
							duration: 2000
						});
						return
					}
					if(goods_item!=''){
						uni.navigateTo({
							url:'../shopping/must?type=1'
						})
					}
				})
				this.scrolle()
			},
			//确认规格直接赠送
             determine2: function(e) {
             	console.log('确定规格')
             	this.display = false;
             	this.fixed = false;
             	let action = "op_buy_shopping_cart";
             	let id = this.id;
             	let goodsid = this.goodsid;
             	let goods_model = this.goods_model;
             	let goods_spec = String(Object.keys(this.specArr));
             	let goods_item = String(Object.values(this.specArr)).replace('#', '替换u35');
             	console.log(goods_item);
             	let data = JSON.stringify({
             		memberid: id,
             		goodsid: goodsid,
             		goods_model: goods_model,
             		goods_spec: goods_spec,
             		goods_item: goods_item,
             		num: this.checknum,
					buy_type:1
             	});
             	this.$utils.post(action, data).then(res => {
					console.log("直接赠送")
					console.log(res)
					let icon="success"
					   if (res.sta !=1) {
					   	icon = "none";
					   	uni.showToast({
					   		icon: icon,
					   		title: res.msg,
					   		duration: 2000
					   	});
					   	return
					   }
             		   if(goods_item!=''){
             			uni.navigateTo({
             				url:'../shopping/shop?type=1'
             			})
             		  }
             	})
             	this.scrolle()
             },
			 //确定规格礼篮
			 determine3: function(e) {
			 	this.display = false;
			 	this.fixed = false;
			 	let action = "op_buy_shopping_cart";
			 	let id = this.id;
			 	let goodsid = this.goodsid;
			 	let goods_model = this.goods_model;
			 	
			 	let goods_spec = String(Object.keys(this.specArr));
			 	let goods_item = String(Object.values(this.specArr)).replace('#', '替换u35');
			 	
			 	let data = JSON.stringify({
			 		memberid: id,
			 		goodsid: goodsid,
			 		goods_model: goods_model,
			 		goods_spec: goods_spec,
			 		goods_item: goods_item,
			 		num:  this.checknum,
					buy_type:0
			 	});
			 	console.log(JSON.parse(data))
			 	this.$utils.post(action,data).then(res => {
					console.log("res")
					console.log(res)
					   if (res.sta ===1) {
						   
					   	uni.showToast({
					   		icon: 'success',
					   		title: res.msg,
					   		duration: 1000
					   	});
					   }
					   //把数据给一个小球放底部礼篮
					   let type=0
					   let memberid = uni.getStorageSync('id')
					   this.memberid = memberid;
					   var data1 = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
					   var action="get_buy_shopping_cart"
					   this.$utils.post(action,data1).then(res1=>{
						    console.log('商品信息',res1)
							this.num_all=res1.rs.num_all
					   })
			 	})
			 },
			 // 左下角跳转
			 bottom_btn: function(e) {
				 uni.reLaunch({
				    url:'../shopping/shopping?type=0'
				  })
			 },
			onPageScroll: function(e) { // 获取滚动条当前位置
				let tt = this.tt;
				this.scrollTop = e.scrollTop
			},


			scrolle: function(e) {
				var that = this;
				console.log(this.fixed)
				if (this.fixed == false) {

					var time = setTimeout(function() {
						console.log('执行??')
						uni.pageScrollTo({
							scrollTop: that.top
						})
						clearTimeout(time)
					}, 100)

				}

			},
			// 选择规格
			spec: function(e) {
				console.log(e);
				// 规格第一层
				let one = e.currentTarget.dataset.one;
				// 内容第二层
				let index = e.currentTarget.dataset.index;
				// 已选择文字
				let text = e.currentTarget.dataset.text;
				let da = e.currentTarget.dataset.da;
				console.log("点击规格", e);
				let goods_spec = this.goods_spec;
				let goods_item = this.goods_item;
				let first = this.first;
				let arr = this.arr;
				let specArr = this.specArr;

				let length = this.choose.length;
				console.log(goods_spec);
				console.log(goods_item);
				goods_spec.push(one);
				first.splice(0, 1);
				arr.splice(0, 1);
				if (first.indexOf(one) == -1) {
					first.push(one);
				}
				if (arr.indexOf(index) == -1) {
					arr.push(specArr);
				}
				console.log(specArr[one] == text)
				if (specArr[one] == text) {
					specArr[one] = null;
				} else {
					specArr[one] = text;
				}
				goods_spec = Object.keys(specArr);
				goods_item = Object.values(specArr);
				console.log(specArr);
				console.log(goods_spec);
				console.log(goods_item);
				//规格里的已选择
				this['guige'] = goods_item
				console.log(this.guige.join(","))
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
							uni.hideLoading();
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

							// 为了下次进行数据回刷
							this.showa = 1;
							this.sta = 200;


							var data = '{"keynum":"' + this.keynum + '","memberid":"' + res.rs.id +
								'"}';
							// var data = '{"keynum":"87902C7C7F660EB68B8D2B16FC4259FA","memberid":"'+id+'"}';
							console.log(data)
							var action = 'get_goods_detail';
							this.$utils.post(action, data).then(res => {

								console.log('详情', res.rs.goodsinfo)
								// 轮播					  
								this.head_img = res.rs.goodsinfo.head_img;

								// 多图
								if (res.rs.goodsinfo.images) {
									let details = res.rs.goodsinfo.images.split('|');
									details.unshift(res.rs.goodsinfo.head_img)
									this.details = details;
								}

								this.text = res.rs.goodsinfo.goods_spec.length;
								this.text1 = res.rs.goodsinfo.goods_spec_list.length;

								res.rs.goodsinfo.discount_name1 = (res.rs.goodsinfo
									.price_level1 / res.rs.goodsinfo.price * 10).toFixed(
									1) + '折';
								res.rs.goodsinfo.discount_name2 = (res.rs.goodsinfo
									.price_level2 / res.rs.goodsinfo.price * 10).toFixed(
									1) + '折';
								res.rs.goodsinfo.discount_name3 = (res.rs.goodsinfo
									.price_level3 / res.rs.goodsinfo.price * 10).toFixed(
									1) + '折';
								res.rs.goodsinfo.discount_name4 = (res.rs.goodsinfo
									.price_level4 / res.rs.goodsinfo.price * 10).toFixed(
									1) + '折';
								// 内容
								this.alt = res.rs.goodsinfo;
								// 规格
								this.specifications = res.rs.goodsinfo.goods_spec_list;
								// 商品详情规格
								this.list = res.rs.goodsinfo.goods_spec_list;
								// 选择
								for (let i in res.rs.goodsinfo.goods_spec) {
									res.rs.goodsinfo.goods_spec[i].one = i
								}
								// 商品详情
								this.btmdetails = res.rs.goodsinfo.details.replace(/<img /g,
									'<img class="rich_img" ');

								this.choose = res.rs.goodsinfo.goods_spec;

								this.goodsid = res.rs.goodsinfo.id;

								// 是否收藏

								if (res.rs.goodsinfo.is_collect == 1) {

									this.icon[1].src = '../../static/shoucang-on.png';
								}


							})

							// 赠礼须知
							var data = '{}';
							var action = 'get_webconfig_tiaoli';

							this.$utils.post(action, data).then(res => {

								console.log('赠礼须知')
								res.rs.zenglixuzhi


								this.btmnotice = res.rs.zenglixuzhi.replace(/<img /g,
									'<img class="rich_img" ')


							})
						})
					}

				})
			},
			gotoShare: function() {
				this.$refs.popup.open()
			},

			close1() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.details-hidden-inline {
		    width: 150rpx;
		    height: 53rpx;
		    text-align: center;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: 53rpx;
		padding: 5rpx 18rpx !important;
		border-radius: 50rpx;
		background-color: #f5f5f5;
		color: #696969;
	}

	.details-hidden-alt .active {
		border: 1px solid #BD2C00;
		background-color: #FFD2D2;
		color: #BD2C00;
	}

	.rich_img {
		width: 100% !important;
		margin-top: -4rpx;
	}

	.details-hidden-goodsname {
		white-space: normal !important;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: 40rpx !important;
		margin-top: 8rpx !important;
	}

	.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal {

		margin-bottom: 2rpx;

	}

	.swiper-box .wx-swiper-dot {

		width: 40rpx;

		display: inline-flex;

		height: 4rpx;

		margin-left: 10rpx;

		justify-content: space-between;

	}

	.swiper-box .wx-swiper-dot::before {

		content: '';

		flex-grow: 1;

		background: #ccc8c8;

	}

	.swiper-box .wx-swiper-dot-active::before {
		background: #239758;
	}

	.wxParse .img {
		margin: 0 !important;
		margin-top: 0rpx !important;
	}

	.wxParse .p {
		padding-bottom: 0rpx !important;
	}

	.details-join {
		width: 260rpx;
		line-height: 40px;
		border-radius: 50px;
		background-color: #EFA13C;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
	}

	.details-give {
		width: 260rpx;
		line-height: 40px;
		border-radius: 50px;
		background-color: #EC1815;
		margin-right: 25rpx;
		margin-bottom: 10rpx;
	}

	.details-alt-title {
		position: relative;
	}

	.lilan {
		position: absolute;
		right: -20rpx;
		top: -10rpx;
	}

	.gifts {
		position: absolute;
		top: 141rpx;
		right: -20rpx;
	}

	.details-alt-xq {
		position: absolute;
		top: 86rpx;
		left: -5rpx;
		color: #999999;
		font-size: 13px;
	}

	.details-icon {
		width: 140rpx;
	}

	.details-ch {
		font-weight: bold;
		color: #333333;
		font-size: 13px;
		font-family: "苹方 粗体";
	}

	.details-ch-xq {
		color: #666666;
		margin-left: 30rpx;
		font-size: 13px;
		font-family: "苹方 中等";
	}

	.details-alt-line {
		position: absolute;
		left: 255rpx;
		top: 910rpx;
		color: #999999;
		font-size: 12px;
		text-decoration: line-through;
	}

	.biao {
		width: 63rpx;
		height: 33rpx;
		position: absolute;
		top: 910rpx;
		left: 175rpx;
	}

	.tab {
		width: 40rpx;
		height: 40rpx;
	}
    .tab1 {
    	width: 40rpx;
    	height: 40rpx;
		margin-top: -2rpx;
    }
	.flex-between-text {
		width: 100rpx;
		margin-left: -28rpx;
		font-family: "苹方 中等";
		font-size: 12px;
		color: #333333;
	}

	.person {
		width: 350rpx;
		height: 200rpx;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20rpx;
	}

	.close {
		width: 350rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin-top: 122rpx;
		margin-left: 0;
		color: #007AFF;
	}

	.per {
		color: #4C4C4C;
		position: absolute;
		top: 96rpx;
		left: 60rpx;
	}

	.details-hidden-prices {
		margin-top: 50rpx;
	}

	.details-hidden-prices span {
		color: red;
		position: absolute;
		top: 81rpx;
		left: 517rpx;
	}

	.details-hidden-number {
		width: 340rpx;
		margin-top: -90rpx;
		margin-left: 220rpx;
		font-size: 13px;
	}

	.buy {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		position: absolute;
		top: 655rpx;
		left: 40rpx;
	}

	/* 底部商品规格的减号 */
	.reduce {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border: 1px solid #8C8C8C;
		border-radius: 50rpx;
		color: #979797;
		position: absolute;
		top: 22rpx;
		left: 426rpx;
	}

	.cart-count {
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #f5f5f5;
		position: absolute;
		top: 22rpx;
		left: 480rpx;
	}

	.add {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border: 1px solid #8C8C8C;
		border-radius: 50rpx;
		color: #979797;
		position: absolute;
		top: 22rpx;
		left: 550rpx;
	}

	.qiu {
		width: 100%;
		height: 240rpx;
	}

	.wx {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-bottom: 1px solid #EDEDED;
		display: block;
	}

	.close1 {
		border-top: 3px solid #EEEEEE;
	}

	.guige-name {
		width: 305rpx;
		position: absolute;
		top: 50rpx;
		left: 250rpx;
		font-size: 15px;
	}
    .details-hidden-price{
		position: absolute;
		left: 570rpx;
		top: -24rpx;
		font-size: 15px;
	}
	.chec {
		float: right;
	}
	.flex-between{
		display: flex;
		justify-content: unset;
	}
	.zengli{
		margin-left:240rpx;
	}
	.num_all{
		    position: absolute;
		    top: -5rpx;
		    left: 36rpx;
		    width: 20rpx;
		    height: 20rpx;
			line-height: 20rpx;
			text-align: center;
		    border-radius: 50%;
		    background-color: red;
			font-size: 10px;
	}
	.online_service{
		margin-left: 85rpx;
		margin-top: -68rpx;
	}
	.online{
		margin-top: -12rpx;
	}
	.buy-num{
		font-size: 24rpx;
		    font-weight: bold;
	}
	.details-hidden-close{
		position: absolute;
		top: 0;
		right: 0;
	}
	.details-hidden-determine{
		    border-radius: 50rpx;
		    margin-left: 37rpx;
			margin-bottom: 10rpx;
			width: 90%;
	}
</style>
