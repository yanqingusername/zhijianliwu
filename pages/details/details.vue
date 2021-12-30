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
					</view>
					<view class="guige-top-right">
						<view class="flex" style="align-items: center;">
							<view class="guige-name">{{alt.goodsname.substr(0,10)}}...</view>
							<view class="guige-price-right">
								<view class="details-hidden-price" style="font-weight: bold;" v-if="level_name=='企业会员'">¥{{alt.price_level3}}</view>
								<view class="details-hidden-price" style="font-weight: bold;" v-else>¥{{alt.price_level0}}</view>
								<view class="new_details-hidden-number"></view>
							</view>
						</view>
						
						<view class="new_details-hidden-number">已选择：
							<text v-for="(item,index) of guige" :key="index">{{item}}</text>
						</view>
					</view>
				</view>
				<view class="details-hidden-content">
					<scroll-view scroll-y="true" style="max-height: 220px;white-space: normal;">
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
					<view class="buy flex">
						<text class="buy-num">购买数量：</text>
						<view class="flex-1">
							<view class="reduce" @click="reduce(checknum,-1,index)"><text class="icon icon-desc-circle"></text></view>
							<view class="cart-count">{{checknum}}</view>
							<view class="add" @click="reduce(checknum,1,index)"><text class="icon icon-add-circle"></text></view>
						</view>
					</view>
				</view>				
				<!-- <view style="text-align: center;color: #c3c3c3;position: absolute;width: 100%;bottom: 100rpx;">
					(确定立即添加至购物车)
				</view> -->
				<!-- 直接购买规格确定 -->
				<view class="details-hidden-determine" v-if="btns==1">
					<view @click="determine1">确定</view>
				</view>
				<!-- 直接赠送规格确定 -->
				<view class="details-hidden-determine" v-if="btns==2">
					<view  @click="determine2">确定</view>
				</view>
				<!-- 礼篮规格确定 -->
				
				<view class="details-hidden-determine" v-if="btns==3">
					<view  @click="determine3">确定</view>
				</view>
				
				<!-- 关闭 -->
				<!-- <image src="../../static/details-close.png" class="details-hidden-close" mode="" @click="close"></image> -->
			</view>
			<view class="shade" @click="close"></view>
		</view>

		<!-- 轮播图 -->
		<view v-if="details.length>0" style="width: 100%;height: 750rpx;position: relative;">
			<swiper class="details-swiper" :circular="true" :indicator-dots="false" :autoplay="true" @change="changeswiper"
				:interval="3000" :duration="1000" indicator-color="#D6D6D6 " indicator-active-color="#C59A5A">
				<swiper-item v-for="(item,index) in details" :key="index">
					<view class="details-swiper-img">
						<image :src="$utils.imageUrl(item)" class="img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="position-swiper">
				<view class="position-swiper-t">{{swiperCurrentIndex}}</view>
				<view class="position-swiper-q">/{{details.length}}</view>
			</view>
		</view>
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
				
			</view>
				<view class="details-alt-xq">{{alt.goodstitle}}</view>
			<!-- 价格 -->
			<view class="details-alt-left">
				<view class="details-alt-btm flex">
					<view class="details-alt-btm-price" v-if="level_name=='企业会员'">
						<text>¥{{alt.price_level3}}</text>
						<image class="qi" src="../../static/qi.png" mode="widthFix"></image>
						<text class="details-alt-btm-discount  details-alt-line" >¥{{alt.price}}</text>
					</view>
                    <view class="details-alt-btm-price" v-else>¥{{alt.price_level0}}</view>
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<!-- <view class="details-tips" v-if="couponList.length>0">
			<view class="details-blessing-alt">领劵送礼更优惠<view class="details-blessing-circular"></view>
			</view>
			<view class="coupon-button" style="position: absolute;right: 0;">
				<own-coupon-list :list="couponList"></own-coupon-list>
			</view>
		</view> -->
		<!-- 祝福语 -->
		<view class="details-blessing flex-vertically" v-if="alt.is_currency_type == 0 || alt.is_currency_type == 2">
			<text class="details-ch">规格</text>
			<view class="details-ch-xq chec" v-for="(item,index) of guige" :key="index">
				{{item}}
			</view>
		</view>
		<!-- 退款提示 -->
		<view class="details-tips flex-vertically" v-if="alt.is_currency_type == 0 || alt.is_currency_type == 2">
			<text class="details-ch">服务</text>
			<text class="details-ch-xq">正品保障 · 可开发票 · 发货&售后</text>
		</view>
		<!-- 商品详情/商品须知 -->
		<view class="details-choose" style="border-bottom: 1px solid #EEEEEE" v-if="alt.is_currency_type == 0 || alt.is_currency_type == 2">
			<view class="details-choose-content margin-auto flex-between">
				<view @tap="join" data-index="0" :class="commom">商品详情</view>
				<view @tap="join" class="zengli" data-index="1" :class="commom1">赠礼须知</view>
			</view>

		</view>
		<!-- 商品详情 -->
		<u-parse :content="btmdetails" v-if="btm && (alt.is_currency_type == 0 || alt.is_currency_type == 2)"></u-parse>
		<!-- 赠礼须知 -->
		<!-- <view v-if="!btm && (alt.is_currency_type == 0 || alt.is_currency_type == 2)"> -->
		<view v-else v-if="alt.is_currency_type == 0 || alt.is_currency_type == 2">
			<!-- <u-parse :content="btmnotice" style="background: #fff;"></u-parse> -->
			<image lazy-load="true" src="https://zhijianlw.com/static/web/img/lizengxuzhi_2021_11_25.jpg" mode="widthFix" style="width: 100%;height: 100%;"></image>
			<view class="z-zlxz">
				<view class='z-zlxz-title' style="margin-top: 40rpx;">
					<text class="icon-hg"></text>
					<text class='text'>退换以及售后</text>
				</view>
				<view style="padding: 0 24rpx 0 44rpx; margin-bottom: 50rpx;">
					<view class="z-zlxz-second">购买人</view>
					<view class="z-zlxz-p">1.购买完成后24小时未赠送，或赠送后24小时未被领取的礼物，将发起自动退款，订单支付金额原路退回；</view>
					<view class="z-zlxz-p">2.已被领取的礼物不支持退款。</view>
				</view>
				<view style="padding: 0 24rpx 0 44rpx; margin-bottom: 50rpx;">
					<view class="z-zlxz-second">领取人</view>
					<view class="z-zlxz-p">领取人兑换的实物商品订单，无法直接操作退款，如遇商品质量问题可以进行售后/退换。</view>
				</view>
				
				<view class='z-zlxz-title'>
					<text class="icon-hg"></text>
					<text class='text'>服务承诺</text>
				</view>
				<view style="padding: 0 24rpx 0 44rpx; margin-bottom: 50rpx;">
					<view class="z-zlxz-p">1.商品因质量/漏发/错发等原因需要售后的，需要在到货时间起48小时内（生鲜易腐产品应在到货12小时内）与客服联系，进行售后处理。</view>
					<view class="z-zlxz-p">2.指间礼物承诺：凡在指间礼物平台购买的商品均按照《中华人民共和国产品质量法》、《中华人民共和国消费者权益保护法》等法律法规执行相应的售后政策。</view>
				</view>
			</view>
		</view>
		
		<!-- 卡册类型 -->
		<view class="card-details-tips" v-if="alt.is_currency_type == 1">
			<image class="card-details-img" src="https://zhijianlw.com/static/web/img/icon-service-09-23-01.png" lazy-load="true"></image>
			<view class="card-details-title" style="margin-left: 10rpx;">正品保障</view>
			<image class="card-details-img" style="margin-left: 60rpx;" src="https://zhijianlw.com/static/web/img/icon-service-09-23-01.png" lazy-load="true"></image>
			<view class="card-details-title" style="margin-left: 10rpx;">可开发票</view>
			<image class="card-details-img" style="margin-left: 60rpx;" src="https://zhijianlw.com/static/web/img/icon-service-09-23-01.png" lazy-load="true"></image>
			<view class="card-details-title" style="margin-left: 10rpx;">发货&售后</view>
		</view>
		<view class="card-details-center" v-if="alt.is_currency_type == 1">
			<view class="card-details-center-title">收礼人可以选择以下1款礼物进行兑换</view>
		</view>
		<view class="card-goodslist" v-if="alt.is_currency_type == 1 && alt.client_card_goods_list.length > 0">
				<view class="card-goods" :data-keynum="post.keynum" @click="confirm_order" v-for="post in alt.client_card_goods_list" :key="post.id">
					<view class="card-goods-head">
						<image :src="$utils.imageUrl(post.head_img)" mode=""class="card-goods-head-img" ></image>
					</view>
					<view class="card-goods-text">{{post.goodsname}}</view>
					<!-- <view class="card-goods-sub-text uni-ellipsis">{{post.goodstitle}}</view> -->
					<view class="card-goods-bottom">
						<view class="card-goods-bottom-title">查看</view>
					</view>
				</view>
		</view>
		<view v-if="alt.is_currency_type == 1 && alt.client_card_goods_list.length == 0" style="height: 30rpx;"></view>

		<view class="new-details-bottom-kong"></view>

		<!-- 底部 -->
		<button class="details-btm flex" v-if="sta == 0" open-type="getUserInfo" @getuserinfo="bindGetUserInfo"
			style="padding: 0;background: transparent;z-index:1;"></button>

		<!-- 底部客服礼篮内容 -->
		<view class="details-btm flex-between">
			<view class="details-icon flex-vertically">
				<view class="personal-details-content flex">
					<button class="personal-item-li" open-type="contact" @click="$buttonClick(trackClick)">
						<view class="personal-item-li-img"><image class="item-li-img" src="../../static/online_service.png"  mode=""></image></view>
						<view class="personal-item-li-text">客服</view>
					</button>
					
						<!-- <view class="online_service">
							<image src="../../static/online_service.png" class="tab1" mode=""></image>
							<view class="flex-between-text online">在线客服</view>
						</view> -->
						
						<view class="bottom-lilan" @click="bottom_btn">
							<view class="flex-between-img">
								<image src="../../static/hamper_icon.png" class="tab" mode="widthFix"></image>
							</view>
							<view class="flex-between-text">礼篮</view>
							<text class="num_all10" v-if="num_all>10">{{num_all}}</text>
							<text class="num_all" v-else>{{num_all}}</text>
						</view>
						
				</view>
			</view>

			<view style="text-align: right;width: 50%;flex: 1;">
				<view class="details-join" open-type="buy" @click="list_speci" v-if="alt.status == 1">直接购买</view>
				<view class="details-give" open-type="song" @click="goshop" v-if="alt.status == 1">立即赠送</view>
				
				<view class="details-give" style="background-color: #cccccc;color: #ffffff;" v-if="alt.status != 1">暂时无货</view>
			</view>
		</view>
		
		<view class="slider">
			<!-- 礼篮 -->
			<view class="details-alt-logo lilan" style="margin: 0;padding: 0;" @click="lilan">
				<!-- <image class="img" :src="$utils.osspath_url('/xcx-static/details/add.png')" mode=""></image> -->
				<image class="new-img" src="https://zhijianlw.com/static/web/img/lilan.png" mode="widthFix"></image>
			</view>
			<!-- 求礼物 -->
			<view class="details-alt-logo gifts" style="margin: 0;padding: 0;">
				<!-- <image @click="gotoShare" class="img" :src="$utils.osspath_url('/xcx-static/details/qiugift.png')" -->
				<image @click="gotoShare" class="new-img" src="https://zhijianlw.com/static/web/img/liwu.png" lazy-load="true" mode="widthFix"></image>
				<uni-popup ref="popup" backgroundColor="#fff" type="bottom">
					<view class="qiu">
						<!-- <text class="wx">发送给微信好友</text>
						<text class="wx">保存图片发朋友圈</text> -->
						<button type="warn" class="wx" open-type="share" >发送给微信好友</button>
						<button type="warn" class="wx" @click="firend">保存图片发朋友圈</button>
						<text class="wx close1" @click="close1">取消</text>
					</view>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import ownCouponList from "@/components/own-components/own-coupon-list/own-coupon-list.vue";
	import uParse from "@/components/feng-parse/parse.vue";
	import '@/components/feng-parse/parse.css';
	import config from '../../common/config.js';
	import sr from 'sr-sdk-wxapp';
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
				checknum: '1',
				swiperCurrentIndex: 1,
				action_type: 'append_to_cart'
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

				//新增腾讯有数
				sr.track('browse_sku_page',
				  {
				    "sku": {
				      "sku_id": this.goodsinfo.sku+"", // 若商品无sku_id时，可传spu_id信息
				      "sku_name": this.goodsinfo.goodsname // 若商品无sku_name时，可传spu_name信息
				    },
					"spu": {
						"spu_id": this.goodsinfo.spu+"", // 若商品无spu_id时，可传sku_id信息
						"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
					},
				    "primary_image_url": this.goodsinfo.head_img
				  })
				  
					// sr.track('add_to_cart', {
					// 	"action_type": 'append_to_cart',
					// 	"sku": {
					// 		"sku_id": this.goodsinfo.sku+"", // 若商品无sku_id时，可传spu_id信息
					// 		"sku_name": this.goodsinfo.goodsname // 若商品无sku_name时，可传spu_name信息
					// 	  },
					// 	"spu": {
					// 		"spu_id": this.goodsinfo.spu+"", // 若商品无spu_id时，可传sku_id信息
					// 		"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
					// 	},
					// 	"sku_num": 1,
					// 	"primary_image_url": this.goodsinfo.head_img
				 	//  	})

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

				//礼篮数量
				this.num_all = res.rs.goodsinfo.buy_shopping_cart_number;

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

				if (res.rs.goodsinfo.goods_spec.length == 1 && res.rs.goodsinfo.goods_spec.goods_spec_item ==
					1) {
					// TODO
					this.goods_spec = [0];
					this.goods_item = [res.rs.goodsinfo.goods_spec.goods_spec_item];
				}
				
				/**
				 * 默认设置商品规格
				 */
				// 规格第一层
				let one;
				// 内容第二层
				let index;
				// 已选择文字
				let text;
				let goods_spec = this.goods_spec;
				let goods_item = this.goods_item;
				let first = this.first;
				let arr = this.arr;
				let specArr = this.specArr;
				
				if(this.choose.length > 0){
					for (let i in this.choose) {
						let item = this.choose[i];
						let goods_spec_item = item.goods_spec_item;
						one = item.one;
						
						goods_spec.push(one);
						first.splice(0, 1);
						arr.splice(0, 1);
						if (first.indexOf(one) == -1) {
							first.push(one);
						}
						
						for (let j in goods_spec_item) {
							let specitem = goods_spec_item[0]
							index = j;
							text = specitem.item;
							
							if (arr.indexOf(index) == -1) {
								arr.push(specArr);
							}
							specArr[one] = text;
						}
					}
				}
				goods_spec = Object.keys(specArr);
				goods_item = Object.values(specArr);
				//规格里的已选择
				this['guige'] = goods_item
				console.log(this.guige.join(","))
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
		onShow() {
			if(this.goodsinfo && this.goodsinfo.id){
				//新增腾讯有数
				sr.track('browse_sku_page',
				  {
					"sku": {
					  "sku_id": this.goodsinfo.sku+"", // 若商品无sku_id时，可传spu_id信息
					  "sku_name": this.goodsinfo.goodsname // 若商品无sku_name时，可传spu_name信息
					},
					"spu": {
						"spu_id": this.goodsinfo.spu+"", // 若商品无spu_id时，可传sku_id信息
						"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
					},
					"primary_image_url": this.goodsinfo.head_img
				  })
			}
		},
		onShareAppMessage: function(e) {
			this.$refs.popup.close()
			// 腾讯有数
			// sr.track('page_share_app_message', {
			//   "from_type": "menu",
			//   "share_title": "我发现了一份不错的礼物，快来看看吧！",
			//   "share_path": '/pages/details/details?keynum=' + this.keynum,
			//   "share_image_url": this.alt.head_img,
			//   "share_to": "friends",
			// })

			return {
				imageUrl: this.alt.head_img,
				title: '我发现了一份不错的礼物，快来看看吧！',
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
			firend: function(e) {
				this.$refs.popup.close()
				uni.navigateTo({
					url: `./detailsshare?keynum=${this.keynum}&imageUrl=${this.head_img}&goodsname=${this.alt.goodsname}`
				})
			},
			trackClick:function(e){
				//腾讯有数
				sr.track('start_consult', {
				  "action_type": "consult_online",
				})
			},
			//底部规格购买数量加减
			reduce(num, type, index) {
				
				// 腾讯有数
				let action_type;
				let numInt = parseInt(num);
				if(type == 1){
					numInt++;
					action_type = 'append_to_cart';
				} else {
					numInt--
					action_type = 'remove_from_cart'
				}
				if(numInt < 1){
					uni.showToast({
						title:'商品购买数量最少一个',
						mask:true,
						icon:'none'
					})
					return
				}
				
				this.action_type = action_type;
				// sr.track('add_to_cart', {
				//     "action_type": action_type,
				// 	"sku": {
				//       "sku_id": this.goodsinfo.id+"", // 若商品无sku_id时，可传spu_id信息
				//       "sku_name": this.goodsinfo.goodsname // 若商品无sku_name时，可传spu_name信息
				//     },
				// 	"spu": {
				// 		"spu_id": this.goodsinfo.id+"", // 若商品无spu_id时，可传sku_id信息
				// 		"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
				// 	},
				// 	"sku_num": numInt,
				// 	   	"primary_image_url": this.goodsinfo.head_img
				// 	})
					
				// this.checknum = parseInt(num) + parseInt(type);
				this.checknum = parseInt(numInt);
				return
			},
			handleSelect(goods) {
				this.goods_item = goods
				console.log('---->:',goods)
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
				let that = this;
				//判断是否登录
				var id = uni.getStorageSync('id')
				if(id){
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
				}else{
					uni.showToast({
						title: '请先登录',
						icon: "none",
						mask: 'true',
						success: (res) => {
							setTimeout(function(e) {
								uni.reLaunch({
									url: '../signin/signin?receive=' + 'ondetails' +
										'&keynum=' + that.keynum
								})
							}, 500)
						}
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
				let itemname = this.guige.join(""); 
				sr.track('add_to_cart', {
				    "action_type": 'append_to_cart',
					"sku": {
				      "sku_id": this.goodsinfo.sku+"", // 若商品无sku_id时，可传spu_id信息
				      "sku_name": this.goodsinfo.goodsname  + itemname// 若商品无sku_name时，可传spu_name信息
				    },
					"spu": {
						"spu_id": this.goodsinfo.spu+"", // 若商品无spu_id时，可传sku_id信息
						"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
					},
					"sku_num": parseInt(this.checknum),
					   	"primary_image_url": this.goodsinfo.head_img
					})
					
				let that = this;
				//判断是否登录
				var id = uni.getStorageSync('id')
				if(id){
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
				}else{
					uni.showToast({
						title: '请先登录',
						icon: "none",
						mask: 'true',
						success: (res) => {
							setTimeout(function(e) {
								uni.reLaunch({
									url: '../signin/signin?receive=' + 'ondetails' +
										'&keynum=' + that.keynum
								})
							}, 500)
						}
					})
				}
			},
			//确认规格直接赠送
             determine2: function(e) {
				 let itemname = this.guige.join(""); 
				 sr.track('add_to_cart', {
				     "action_type": 'append_to_cart',
				 	"sku": {
				       "sku_id": this.goodsinfo.sku+"", // 若商品无sku_id时，可传spu_id信息
				       "sku_name": this.goodsinfo.goodsname + itemname // 若商品无sku_name时，可传spu_name信息
				     },
				 	"spu": {
				 		"spu_id": this.goodsinfo.spu+"", // 若商品无spu_id时，可传sku_id信息
				 		"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
				 	},
				 	"sku_num": parseInt(this.checknum),
				 	   	"primary_image_url": this.goodsinfo.head_img
				 	})
					
				let that = this;
				//判断是否登录
				var id = uni.getStorageSync('id')
				if(id){
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
							// 打开新页面跳转
							// uni.navigateTo({
							// 	url:'../shopping/shop?type=1'
							// })
							 uni.redirectTo({
								url:'../shopping/shop?type=1'
							})
						  }
					})
					this.scrolle()
				}else{
					uni.showToast({
						title: '请先登录',
						icon: "none",
						mask: 'true',
						success: (res) => {
							setTimeout(function(e) {
								uni.reLaunch({
									url: '../signin/signin?receive=' + 'ondetails' +
										'&keynum=' + that.keynum
								})
							}, 500)
						}
					})
				}
             },
			 //确定规格礼篮
			 determine3: function(e) {
				 let itemname = this.guige.join(""); 
				 sr.track('add_to_cart', {
				     "action_type": 'append_to_cart',
				 	"sku": {
				       "sku_id": this.goodsinfo.sku+"", // 若商品无sku_id时，可传spu_id信息
				       "sku_name": this.goodsinfo.goodsname + itemname // 若商品无sku_name时，可传spu_name信息
				     },
				 	"spu": {
				 		"spu_id": this.goodsinfo.spu+"", // 若商品无spu_id时，可传sku_id信息
				 		"spu_name": this.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
				 	},
				 	"sku_num": parseInt(this.checknum),
				 	   	"primary_image_url": this.goodsinfo.head_img
				 	})
					
				let that = this;
				//判断是否登录
				var id = uni.getStorageSync('id')
				if(id){
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
						   if (res.sta ==1) {
							   
							uni.showToast({
								icon: 'success',
								title: '添加成功',
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
				}else{
					uni.showToast({
						title: '请先登录',
						icon: "none",
						mask: 'true',
						success: (res) => {
							setTimeout(function(e) {
								uni.reLaunch({
									url: '../signin/signin?receive=' + 'ondetails' +
										'&keynum=' + that.keynum
								})
							}, 500)
						}
					})
				}
			 },
			 // 左下角跳转
			 bottom_btn: function(e) {
				let that = this;
				//判断是否登录
				var id = uni.getStorageSync('id')
				if(id){
					uni.reLaunch({
						url:'../shopping/shopping?type=0'
					})
				}else{
					uni.showToast({
						title: '请先登录',
						icon: "none",
						mask: 'true',
						success: (res) => {
							setTimeout(function(e) {
								uni.reLaunch({
									url: '../signin/signin?receive=' + 'ondetails' +
										'&keynum=' + that.keynum
								})
							}, 500)
						}
					})
				}
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
				let that = this;
				//判断是否登录
				var id = uni.getStorageSync('id')
				if(id){
					this.$refs.popup.open()
				}else{
					uni.showToast({
						title: '请先登录',
						icon: "none",
						mask: 'true',
						success: (res) => {
							setTimeout(function(e) {
								uni.reLaunch({
									url: '../signin/signin?receive=' + 'ondetails' +
										'&keynum=' + that.keynum
								})
							}, 500)
						}
					})
				}
			},

			close1() {
				this.$refs.popup.close()
			},
			confirm_order:function (e){
				let keynum = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url: '../index-coupon/ExchangeDetails?keynum=' + keynum + '&isShow=2'
				})
				
			},
			changeswiper(e) {
			    let {current, source} = e.detail
			    if(source === 'autoplay' || source === 'touch') {
			    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
			      this.swiperCurrentIndex = e.detail.current + 1;
			    }
			  },
		}
	}
</script>

<style>
	.details-alt-logo{
		width: 140rpx;
		height: auto;
	}
	.z-zlxz{
		background-color: #fff;
		padding: 26rpx;
	}
	.z-zlxz .z-zlxz-title{
		margin-bottom: 40rpx;
		margin-top: 60rpx;
	}
	.z-zlxz .z-zlxz-title .icon-hg{
		color: #CDAD6C;
		font-size: 34rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.z-zlxz .z-zlxz-title .text{
		color: #333;
		font-size: 30rpx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 10rpx;
		font-weight: bold;
	}
	.z-zlxz-second{
		color: #333;
		font-size: 28rpx;
		margin-bottom: 20rpx;
		font-weight: 600;
		font-size: 28rpx;
	}
	.z-zlxz-p{
		font-size: 28rpx;
		font-weight: 500;
		color: #999999;
		line-height: 1.5em;
		margin-bottom: 30rpx;
	}
	
	
	.details-hidden-inline {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		padding: 8rpx 36rpx !important;
		border-radius: 24rpx;
		background-color: #f5f5f5;
		color: #666666;
		border: none;
		margin: 0 20rpx 48rpx 0;
		font-size: 24rpx;
	}
	.details-hidden-alt{
		border: none;
		padding-bottom: 0;
	}

	.details-hidden-alt .active {
		color: #EB302F;
		background: #FFDBDA;
		border-radius: 24rpx;
		border: 1px solid #EB302F;
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
		display: inline-block;
		text-align: center;
		width: 200rpx;
		line-height: 40px;
		border-radius: 50px;
		background-color: #EFA13C;
		margin-right: 20rpx;
		/* margin-bottom: 10rpx; */
	}

	.details-give {
		display: inline-block;
		text-align: center;
		width: 200rpx;
		line-height: 40px;
		border-radius: 50px;
		background-color: #EC1815;
		/* margin-right: 25rpx; */
		/* margin-bottom: 10rpx; */
	}

	.details-alt-title {
		position: relative;
	}
	.slider{
		position: fixed;
		right: 0rpx;
		top: 60%;
	}
	.lilan {
		/* position: absolute;
		right: -20rpx;
		top: -10rpx; */
	}

	.gifts {
		/* position: absolute;
		top: 141rpx;
		right: -20rpx; */
	}

	.details-alt-xq {
		/* position: absolute; */
		/* top: 86rpx; */
		/* left: -5rpx; */
		color: #999999;
		font-size: 26rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.details-icon {
		/* width: 140rpx; */
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
		font-size: 26rpx;
		font-family: "苹方 中等";
	}

	.details-alt-line {
		/* position: absolute; */
		/* left: 255rpx; */
		/* top: 910rpx; */
		color: #999999;
		font-size: 24rpx;
		vertical-align: middle; margin-left: 24rpx;
		text-decoration: line-through;
		display: inline-block;
	}
	.qi{
		width: 40rpx;
		margin-left: 6rpx;
		display: inline-block;
		vertical-align: middle;
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
		/* width: 100rpx; */
		/* margin-left: -28rpx; */
		font-family: "苹方 中等";
		font-size: 12px;
		color: #333333;
		padding-top: 0rpx;
		margin-top: 6rpx;
		margin-left: -2rpx;
	}
	
	.flex-between-img{
		width: 40rpx;
		height: 40rpx;
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

	.new_details-hidden-number {
		/* width: 340rpx; */
		/* margin-top: -90rpx; */
		/* margin-left: 220rpx; */
		font-size: 28rpx;
		color: #999;
	}

	.buy {
		/* width: 100%; */
		height: 90rpx;
		line-height: 90rpx;
		/* position: absolute; */
		/* top: 655rpx; */
		/* left: 40rpx; */
		align-items: center;
	}
	.buy-num{
		font-size: 28rpx;
		color: #333;
		font-weight: normal;
	}
	.buy .flex-1{ 
		width: 60%;
		flex: 1;
		text-align: right;
	}
	.buy .flex-1>view{
		display: inline-block;
		vertical-align: middle;
	}

	/* 底部商品规格的减号 */
	.reduce {
		color: #979797;
		font-size: 32rpx;
	}

	.cart-count {
		width: 90rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #f5f5f5;
		margin: 0 10rpx;
	}

	.add {
		color: #979797;
		font-size: 32rpx;
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
		background-color: #FFFFFF !important;
		color: #000 !important;
		font-size: 26rpx !important;
	}

	.close1 {
		border-top: 3px solid #EEEEEE;
	}

	.guige-name {
		/* width: 305rpx; */
		/* position: absolute; */
		/* top: 50rpx; */
		/* left: 250rpx; */
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
		flex: 1;
		width: 60%;
		margin-top: 30rpx;
	}
    .details-hidden-price{
		/* position: absolute; */
		/* left: 570rpx; */
		/* top: -24rpx; */
		font-size: 15px;
		margin-top: 0;
		margin-bottom: 0;
	}
	.chec {
		float: right;
	}
	.flex-between{
		display: flex;
		justify-content: unset;
	}
	.num_all10{
		position: absolute;
		top: -4rpx;
		left: 28rpx;
		/* width: 20rpx; */
		/* height: 20rpx; */
		line-height: 26rpx;
		text-align: center;
		border-radius: 12rpx;
		background-color: red;
		font-size: 18rpx;
		color: #fff;
		width: 36rpx;
		height: 24rpx;
		display: flex;
		align-items: center;
	    justify-content: center;
	}
	.num_all {
	    position: absolute;
	    top: -4rpx;
	    left: 28rpx;
	    /* width: 20rpx; */
	    /* height: 20rpx; */
	    line-height: 26rpx;
	    text-align: center;
	    border-radius: 50%;
	    background-color: red;
	    font-size: 18rpx;
	    color: #fff;
	    width: 24rpx;
		height: 24rpx;
		display: flex;
		align-items: center;
	    justify-content: center;
	}
	.bottom-lilan{
		display: inline-block;
		text-align: center;
		position: relative;
		margin-left: 30rpx;
	}
	.online_service{
		text-align: center;
		margin-right: 38rpx;
		display: inline-block;
		/* margin-left: 85rpx; */
		/* margin-top: -68rpx; */
	}
	.online{
		margin-top: -12rpx;
	}
	.details-hidden-close{
		position: absolute;
		top: 0;
		right: 0;
	}
	.shade{
		position: absolute;
		width: 100%;
		height: 100vh;
		background-color: transparent;
	}
	.details-hidden-determine{
		padding: 10rpx 30rpx;
		background-color: #fff;
		position: fixed;
		bottom: 40rpx;
		box-sizing: border-box;
	}
	.details-hidden-determine>view{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		color: #fff; background-color: #EC1815;
		border-radius: 50rpx;
	}
	
	.personal-item-li{
		width: 96rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0rpx;
		    padding: 0;
		    background: #FFFFFF;
	}
	
	.personal-item-li-img{
		width: 40rpx;
		height: 40rpx;
	}
	
	.item-li-img{
		width: 100%;
		height: 100%;
	}
	
	.personal-item-li-text{
		font-size: 24rpx;
		color: #333333;
		margin-top: 8rpx;
		text-align: center;
	}
	.personal-details-content{
		width: 100%;
		position: relative;
	}
	.new-img{
		width: 140rpx;
		height: 140rpx;
	}
	
	/**
	 * 卡册
	 */
	.card-details-tips{
		width: 750rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-bottom: 10rpx solid #FAFAFA;
		border-top: 10rpx solid #FAFAFA;
		display: flex;
		align-items: center;
		/* justify-content: center; */
	}
	.card-details-img{
		width: 34rpx;
		height: 34rpx;
		margin-left: 26rpx;
	}
	.card-details-title{
		font-size: 26rpx;
		font-weight: 500;
		color: #666666;
	}
	.card-details-center{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 78rpx;
		background: #FFFFFF;
	}
	.card-details-center-title{
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}
	.card-goodslist {
	  /* padding: 20rpx 26rpx; */
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  padding-bottom: 10rpx;
	  background: #F8F8F8;
	  padding: 20rpx 25rpx;
	  /* width: 700rpx; */
	  /* background: #F8F8F8; */
	}
	
	.card-goods {
	    width: 338rpx;
	    margin-bottom: 20rpx;
	    background: #FFFFFF;
	    border-radius: 3rpx;
	    position: relative;
	    height: 556rpx;
	}
	
	.card-goods-head {
	    position: relative;
	    width: 338rpx;
	    height: 338rpx;
	}
	
	.card-goods-head-img{
		width: 100%;
		height: 338rpx;
	}
	
	.card-goods-text {
		margin: 23rpx 26rpx 0rpx 22rpx;
		width: 290rpx;
		height: 76rpx;
	    font-size: 28rpx;
	    color: #333333;
	    line-height: 38rpx;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
		justify-content: center;
	    font-family: monospace;
	}
	
	.card-goods-sub-text{
		margin: 6rpx 26rpx 0rpx 22rpx;
		font-size: 24rpx;
		color: #999999;
	}
	
	.card-goods-bottom{
		display: flex;
		margin-top: 27rpx;
		justify-content: center;
		align-items: center;
		width: 180rpx;
		height: 56rpx;
		border-radius: 28rpx;
		/* opacity: 0.4; */
		border: 1px solid #F9B4B2;
		margin-left: 80rpx;
	}
	.card-goods-bottom-title{
		font-size: 24rpx;
		font-weight: 500;
		color: #EC1815;
	}
	
	.position-swiper{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 105rpx;
		height: 40rpx;
		background: #000000;
		border-radius: 20rpx;
		border: 1px solid #FFFFFF;
		position: absolute;
	    bottom: 20rpx;
	    right: 20rpx;
		opacity: 0.29;
	}
	.position-swiper-t{
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.position-swiper-q{
		font-size: 18rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 4rpx;
	}
	
	.new-details-bottom-kong{
		width: 100%;
		height: 120rpx;
	}
</style>
