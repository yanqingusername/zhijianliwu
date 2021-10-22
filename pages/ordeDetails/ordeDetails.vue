<template>
	<view :class="[fixed===false?'':'fixed']">
		<!-- 地址 -->
		<view class="logistics-add flex-center" @click="address">
			<view class="logistics-add-content flex">
				<view class="logistics-add-img">
					<image class="img" src="https://zhijianlw.com/static/web/img/add.png" mode=""></image>
				</view>
				<view class="logistics-add-img-text">
					<view class="logistics-add-name">{{addli.linkman}} {{addli.linktel}}</view>
					<view class="logistics-adder">{{addli.province_name}} {{addli.city_name}} {{addli.county_name}} {{addli.address}}
					</view>
				</view>

				<view class="logistics-toast" v-if="addli.toast">{{addli.toast}}</view>

			</view>
		</view>

		<!-- 包裹 -->
		<scroll-view scroll-x="true" class="logistics-number-scroll" v-if="title_length>1">
			<view class="flex">
				<view class="flex">
					<view class="logistics-number-scroll-li" v-for="(item,index) in title" :key="index">
						<view class="logistics-number-top" @click="choo" :class="[navv==index?'activee':'']" :data-id="item.id"
						 :data-index="index">礼包{{item.index}}</view>
						<view class="logistics-number-commodity margin-auto">
							<image class="img" :src="$utils.imageUrl(item.goodsinfo[0].head_img)" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="order-purchase" v-for="(item,index) in purchase" :key="index" :class="[nav==0?'':'none']">
			<view class="order-purchase-li">
				<!-- 商品 介绍 -->
				<view class="order-purchase-li-top flex flex-vertically" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="orderdetails">
					<!-- 商品图 -->
					<view class="order-purchase-top-img">
						<image class="order-purchase-top-img-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
					</view>
					<!-- 介绍 -->
					<view class="order-purchase-top-introduce">
						<!-- 名称,状态-->
						<view class="order-purchase-top-header flex-between">
							<view>{{item.goodsname}}</view>
							<view class="order-purchase-top-header-right" v-if="item.status=='0'">支付中></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='1'">待赠送></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='2'">赠送中></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='4'">已退款></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='5'">已关闭></view>
							<view class="order-purchase-top-header-right" v-else-if="item.status=='8'">已完成></view>
						</view>
						<view class="order-purchase-top-header flex-between">
							<!-- 规格 -->
							<view class="order-purchase-top-specifications">规格:{{item.goods_spec}}</view>
							<!-- 数量 -->
							<view class="order-purchase-top-number">数量:<span>x</span>{{item.goodsnum}}</view>
						</view>


						<!-- 价格 礼包数量 -->
						<view class="new-order-purchase-right">
							<view class="order-purchase-right-price">¥{{item.price}}</view>
							<!-- <view class="order-purchase-right-gift">礼包领取<span>{{item.goodsinfo[0].price}}</span>/{{item.all_details_num}}</view> -->
						</view>
					</view>
				</view>
				<!-- 礼品 按钮 -->
				<view class="order-purchase-li-btm flex-between" v-if="status != 0">
					<view class="order-purchase-li-btm-number" v-if="item.type=='1'">{{item.goodsnum_all}}件礼物/直接/共{{item.all_details_num}}份</view>
					<view class="order-purchase-li-btm-number" v-else-if="item.type=='2'">{{item.goodsnum_all}}件礼物/批量/共{{item.all_details_num}}份</view>
					<view class="order-purchase-li-btm-number" v-else-if="item.type=='3'">{{item.goodsnum_all}}件礼物/定时/共{{item.all_details_num}}份</view>
					<view class="order-purchase-li-btm-number" v-else-if="item.type=='4'">{{item.goodsnum_all}}件礼物/即时/共{{item.all_details_num}}份</view>
					<view class="order-purchase-li-btm-number" v-else></view>


					<!-- 待赠送 -->
					<!-- <view class=" flex-between"  v-if="item.status=='1'"> -->
					<!-- <view class="flex-between" v-if="status == 0">
						<view class="order-purchase-btm-li" :data-keynum="item.keynum" :data-index="index" @click="spec">选择规格</view>

					</view> -->

					<view class=" flex-between" v-if="status == 1">
						<view class="order-purchase-btm-li" :data-keynum="item.keynum" :data-index="index" @click="spec">查看物流</view>
					</view>

					<!-- 已退款  已完成  已关闭 -->
					<!-- <view class=" flex-between"  v-else>
			  		<view class="order-purchase-btm-li" :data-index="index" :data-cardbag_number="item.cardbag_number" @click="see">查看物流</view>
			  </view> -->


				</view>
			</view>
		</view>


		<!-- 商品规格 -->
		<view class="shop-body-hidden " :class="[display===false?'none':'']">
			<view class="details-hidden">
				<!-- 商品 -->
				<scroll-view scroll-y="true" style="height: 528rpx;margin-bottom: 22rpx;">
					<!-- 商品 -->
					<view class="details-hidden-introduce flex" v-for="(item,index) in list" :key="index" :data-keynum="item.keynum"
					 @click="listDetails" v-show="list.length>0">
						<view class="details-hidden-img">
							<image :src="$utils.imageUrl(item.head_img)" class="img" mode=""></image>
						</view>
						<view class="details-hidden-right">
							<view class="details-hidden-goodsname">{{item.goodsname}}</view>
							<view class="details-hidden-price" v-if="level_name=='普通会员'">¥{{alt.price_level0}}</view>
							<view class="details-hidden-price" v-else-if="level_name=='指间会员'">¥{{alt.price_level1}}</view>
							<view class="details-hidden-price" v-else-if="level_name=='plus会员'">¥{{alt.price_level2}}</view>
							<view class="details-hidden-price" v-else-if="level_name=='企业会员'">¥{{alt.price_level3}}</view>
							<view class="details-hidden-price" v-else-if="level_name=='合作伙伴'">¥{{alt.price_level4}}</view>
							<view class="details-hidden-number"></view>
						</view>
					</view>
					<!-- 单个商品 -->
					<view @click="listDetails" v-show="list.length<=0" style="width: 100%;height: 100%;">
						<image :src="$utils.imageUrl(head_img)" class="img" mode="aspectFit" style="width: 100%;height: 100%;"></image>
					</view>
				</scroll-view>


				<!-- 口味  规格 -->
				<view class="details-hidden-content">

					<scroll-view scroll-y="true" style="height: 541rpx;">
						<view v-for="(item,index) in choose" :key="index">
							<view class="details-hidden-title">{{item.spec_name}}</view>
							<view class="details-hidden-alt flex-wrap">
								<view class="details-hidden-inline" :class="[it.click == 1?'active':'']" :data-click="it.click" v-for="(it,index) in item.goods_spec_item"
								 :data-id="item.index" :data-index="index" @click="specc" :key="index">{{it.item}}</view>
							</view>
						</view>
					</scroll-view>

				</view>
				<!-- 确定 -->
				<view class="details-hidden-determine" @click="determine">确定</view>
				<!-- 关闭 -->
				<image src="../../static/details-close.png" class="details-hidden-close" mode="" @click="close"></image>
			</view>
		</view>
		
		<view style="height:176rpx;width: 100%;"></view>
		
		<view class="new-balance-button-view">
			<button class="new-balance-button" @click="generate">确认提交</button>
		</view>
	</view>
</template>

<script>
	import btn from "@/common/btn.js";
	import MD5 from "../../common/md5.js";
	export default {
		data() {
			return {
				nav: '0',
				order: [],
				purchase: [],
				appid: '',
				key: '',
				merchantCode: '',
				openid: '',
				outTradeNo: '',
				totalAmount: '',
				nums: '',
				memberid: '',
				id: '',
				cardbag_number: '',
				fixed: false,
				display: false,
				choose: [],
				member_area_id: '',
				cardbag_detail_id: '',
				length: '',
				status: '',
				// 最终规格参数
				goods_spec: '',
				arr: '',
				// 商品goodsid
				goodsid: '',
				// 商品的model
				model: '',
				// 商品的规格id
				spe: '',
				// 规格描述
				item: '',
				// 选择规格
				specc_choose: '',
				// 最外层商品id
				indexx: '',
				provinceName: '',
				cityName: '',
				countyName: '',
				userName: '',
				linktel: '',
				telNumber: '',
				detailInfo: '',
				head_img: '',
				list: [],
				title: '',
				navv: '0',
				addresss: '',
				// 地址渲染
				addli: {
					linkman: '',
					linktel: '',
					province_name: '',
					city_name: '',
					county_name: '',
					toast: ''
				},
				// 不存在地址标识
				addsign: '',
				delivery_type: '快递',
				showa: '',
				title_length: "",
				// 开启地址权限
				scope: ''
			}
		},
		onShow: function(e) {

			var that = this;

			if (this.showa == 1) {
				// uni.getSetting({
				// 	success(res){ 
				// 		that.addresss = res.authSetting['scope.address']
				// 	console.log('授权',res.authSetting['scope.address'])
				// 	} 
				// })
				let member_area_id = uni.getStorageSync('member_area_id')
				this.index = member_area_id;
				this.addlist();
			}

			if (this.scope == true) {
				that.scope = false
				that.chooseadd()
			}
		},

		onLoad: function(e) {



			let that = this;

			// 全局变量(应该是叫这个吧)
			// 会员id
			this.id = uni.getStorageSync('id');
			// 会员等级
			this.level_name = uni.getStorageSync('level_name')
			// 礼包号
			this.cardbag_number = e.cardbag_number;


			// 1.获取地址列表
			this.addlist();
			// 2.子订单列表
			this.orderlist();


			// 清除缓存
			uni.setStorageSync('member_area_id', '')

			// 第二次调用show
			let time = setTimeout(function(e) {
				that.showa = 1;
				clearTimeout(time)
			}, 200)



		},
		methods: {
			// 1.获取地址列表
			addlist: function(e) {
				var that = this;
				var data = '{"memberid":"' + this.id + '"}';
				var action = 'get_member_area';

				this.$utils.post(action, data).then(res => {
					console.log('地址列表', res)
					// 1.先判断是否存在地址 如果存在地址默认第一个选择并渲染   member_area_id返回全局
					if (res.rs.length > 0) {
						// 是Onshow 从地址列表页面选择地址用的
						if (this.index) {
							console.log('选择的地址')
							this.addli = res.rs[this.index];
							this.member_area_id = res.rs[this.index].id;
							this.addsign = 2;
						} else if (res.rs.length > 0) {
							console.log('默认第一个地址')
							this.addli = res.rs[0];
							this.member_area_id = res.rs[0].id;
							this.addsign = 2;
						}
					} else {
						this.addli = {
							linkman: '',
							linktel: '',
							province_name: '',
							city_name: '',
							county_name: '',
							address: '',
							toast: '请填写收货地址'
						};
						console.log('没地址')
						// 不存在地址标识  用于下方判断是否存在地址 
						this.addsign = 0;


						// 判断是否授权过地址
						uni.getSetting({
							success(res) {
								console.log('授权', res.authSetting['scope.address'])
								if (res.authSetting['scope.address'] == true) {} else {
									// 调起微信收货地址
									that.chooseadd()
								}


							}
						})

					}

				})
			},



			// 1.1添加地址 
			address: function(e) {
				var that = this;




				// 0是不存在地址        调用过就跳转添加地址 
				if (this.addsign == 0) {
					console.log('直接添加来着')
					// 干啥的来着???
					let addr = uni.setStorageSync('add', '');
					uni.navigateTo({
						url: '../Address/Address'
					})
				} // 存在地址  跳转地址列表  选择成功后直接返回并渲染或者添加成功后直接渲染
				else if (this.addsign > 0) {
					console.log('选择地址')
					// 其实cardbag_number传这个没啥意义..就是有个判断
					uni.navigateTo({
						url: '../Add/Add?cardbag_number=' + that.cardbag_number
					})
				}

			},


			// 礼包切换
			choo: function(e) {
				this.navv = e.currentTarget.dataset.index;
				this.cardbag_detail_id = e.currentTarget.dataset.id;
			},
			// 打开规格
			spec: function(e) {
				// 打开规格
				this.display = !this.display;
				this.fixed = !this.display;

				//第几个商品 
				let index = e.currentTarget.dataset.index;
				this.indexx = e.currentTarget.dataset.index;


				console.log(e.currentTarget.dataset.index)
				// 商品keynum
				let keynum = e.currentTarget.dataset.keynum;
				let id = this.id;

				var data = '{"keynum":"' + keynum + '","memberid":"' + id + '"}';
				var action = 'get_goods_detail';
				this.$utils.post(action, data).then(res => {
					console.log('详情', res.rs)

					// 商品规格
					this.list = res.rs.goodsinfo.goods_spec_list;

					// 商品头图
					this.head_img = res.rs.goodsinfo.head_img;



					let alt = [];

					// 有几个商品  留几个规格位置
					if (this.item[index]) {
						alt = this.item[index].split(',')
						console.log(alt)

					}

					// 给每种规格加个索引   res.rs.goodsinfo.goods_spec          specifications
					for (let i in res.rs.goodsinfo.goods_spec) {
						res.rs.goodsinfo.goods_spec[i].index = i;

						for (let j in res.rs.goodsinfo.goods_spec[i].goods_spec_item) {

							// 判断是否选中某个规格 选中 1  未选中0
							if (alt[i] == res.rs.goodsinfo.goods_spec[i].goods_spec_item[j].item) {
								res.rs.goodsinfo.goods_spec[i].goods_spec_item[j].click = 1;
							} else {
								res.rs.goodsinfo.goods_spec[i].goods_spec_item[j].click = 0;
							}

						}

					}


					// 商品规格
					this.choose = res.rs.goodsinfo.goods_spec;


					// 创建4个空数组  goodsid   model   spec  item  

					let goodsid = new Array(this.length);
					let model = new Array(this.length);
					let spe = new Array(this.length);


					let spec_id = ''

					// 拿到规格id
					for (let i in res.rs.goodsinfo.goods_spec) {

						if (i == res.rs.goodsinfo.goods_spec.length - 1) {
							spec_id += res.rs.goodsinfo.goods_spec[i].id;
						} else {
							spec_id += res.rs.goodsinfo.goods_spec[i].id + ',';
						}

					}

					// 商品id
					goodsid[index] = res.rs.goodsinfo.id;
					// 商品goods_model
					model[index] = res.rs.goodsinfo.goods_model;
					// 商品规格Id
					spe[index] = spec_id;

					this.goodsid = goodsid;
					this.model = model;
					this.spe = spe;


					// 商品有几种规格
					this.specc_choose = new Array(res.rs.goodsinfo.goods_spec.length);

					console.log('商品', goodsid)
					console.log('规格的model', model)
					console.log('规格id', spe)




					// 需要用到的参数
					// let goodsid = res.rs.goodsinfo.id;
					// let model = res.rs.goodsinfo.goods_model;
					// let spec = '';  
					// let item = '';


					// model   商品的goods_model   spec  规格的id   item  规格的名字
					// console.log(res.rs.goodsinfo.goods_model)f
					// console.log(spec)
					// console.log(item)

					// 单个商品  应该在点击确定之后吧
					// this.goods_spec = '{"'+goodsid+'":{"model":"'+model+'","spec":"'+spec+'","item":"'+item+'"}}';




				})
			},
			// 选择规格
			specc: function(e) {

				// 规格第一层 索引
				let id = e.currentTarget.dataset.id;
				// 内容第二层 选中
				let index = e.currentTarget.dataset.index;
				// 规格长度
				let length = this.choose.length;
				// 最外层商品索引  哪个商品的
				let indexx = this.indexx;

				// 商品详情
				let choose = this.choose

				// 判断是否选中某个规格 选中 1  未选中0
				for (let i in this.choose[id].goods_spec_item) {
					choose[id].goods_spec_item[i].click = 0
				}
				choose[id].goods_spec_item[index].click = 1

				this.choose = choose;



				// 遍历状态  哪个选中了 就加入到this.specc_choose[i] 对应商品的规格的描述
				for (let i in choose) {
					for (let j in choose[i].goods_spec_item) {
						console.log(choose[i].goods_spec_item[j].click)
						if (choose[i].goods_spec_item[j].click == 1) {
							this.specc_choose[i] = choose[i].goods_spec_item[j].item
						}
					}
				}


				// 规格描述
				// this.specc_choose[id] = this.choose[id].goods_spec_item[index].item;

				console.log(this.specc_choose)

				let alt = ''

				for (let i in this.specc_choose) {
					if (i == this.specc_choose.length - 1) {
						alt += this.specc_choose[i];
					} else {
						alt += this.specc_choose[i] + ',';
					}

				}


				//  如何保存


				// 规格描述
				this.item[indexx] = alt


				//   接口需要的参数              是商品id  goodsid     商品model  model   商品规格id  spe   规格描述item   item  拼接起来的
				this.goods_spec[indexx] = '"' + this.goodsid[indexx] + '"' + ':' + '{"model":"' + this.model[indexx] +
					'","spec":"' + this.spe[indexx] + '","item":"' + this.item[indexx] + '"}'

				console.log(this.goods_spec)

			},
			// 关闭规格 
			close: function(e) {
				this.display = false;
			},
			// 确定规格
			determine: function(e) {
				let indexx = this.indexx;

				this.purchase[indexx].guige = this.item[indexx];
				// 关闭
				this.display = false;
				let choose = this.choose;

				// 初始化  规格变成未选中
				for (let i in choose) {
					for (let j in choose[i].goods_spec_item) {
						choose[i].goods_spec_item[j].click = 0
					}
				}

				this.choose = ''
			},

			// 生成订单
			generate: function(e) {
				let that = this;
				// let item = this.item;;
				// // 判断是否选择规格
				// if (item.length == 1) {
				// 	if (item[0] == null || item[0] === undefined) {
				// 		console.log('无')
				// 		var num = 1;
				// 	} else {
				// 		console.log('有')
				// 	}
				// } else {
				// 	console.log('这边??')
				// 	console.log(item.length)
				// 	for (let i = 0; i < item.length; i++) {
				// 		console.log(i)
				// 		console.log(item[i])

				// 		if (item[i] == undefined || item[i] == null) {
				// 			console.log('无')
				// 			var num = 1;
				// 		} else {
				// 			console.log('有')
				// 		}
				// 	}
				// }

				// if (num == 1) {
				// 	console.log('存在未选择规格')
				// 	uni.showToast({
				// 		title: '请选择规格',
				// 		icon: 'none'
				// 	})
				// } else {
				// 	console.log('nice.没问题')




					// delivery_type	    配送方式 订单提取方式 快递,同城,自提  这块不知道啥  先写死
					// goods_spec		    
					// 商品规格json串 {goodsid:{model:”model1”,spec:”spec1”,item:”item1”},goodsid:{model:”model1”,spec:”spec1”,item:”item1”}}

					// let details = ''
					// let goods_spec = this.goods_spec;
					// if (this.length == 1) {
					// 	details = '{' + this.goods_spec[0] + '}'
					// } else {
					// 	for (let i in goods_spec) {
					// 		if (i == 0) {
					// 			details += '{' + goods_spec[i] + ','
					// 		} else if (i == this.length - 1) {
					// 			details += goods_spec[i] + '}'
					// 		} else {
					// 			details += goods_spec[i] + ','
					// 		}
					// 	}
					// }


					let navv = that.navv
					var data = '{"memberid":"' + this.id + '","member_area_id":"' + this.member_area_id + '","cardbag_number":"' +
						this.cardbag_number + '","cardbag_detail_id":"' + this.cardbag_detail_id + '","delivery_type":"' + this.delivery_type + '"}';
						// '","goods_spec":' + details.replace('#', '替换u35') + '}';
					var action = 'create_order';
					console.log(data)
					this.$utils.post(action, data).then(res => {
						console.log('生成订单', res)
						if (res.sta == 1) {
							// 清除缓存
							uni.navigateBack({})
							uni.setStorageSync('member_area_id', '')
							uni.showToast({
								title: '已生成订单',
								icon: 'success',
								success: (res) => {



									// 最后一个礼包或者无礼包
									if (that.title_length == 1 || that.title.length == 0) {
										console.log('最后一个礼包')
										setTimeout(function(e) {
											// uni.navigateBack({
											// 	url:1
											// })

											uni.redirectTo({
												url: "../order/order?nav=" + '1'
											})

											// uni.reLaunch({
											// 	url:'../order/order'
											// })
										}, 0)

									} else if (that.title_length > 1) {
										// 还有礼包
										that.title.splice(that.navv, 1);
										console.log(navv)
										console.log((that.title))
										console.log(that.title[navv])
										if (that.title[navv] == null || that.title[navv] == undefined) {
											console.log('无了')
											setTimeout(function(e) {
												// uni.navigateBack({
												// 	url:1
												// })

												uni.redirectTo({
													url: "../order/order?nav=" + '1'
												})

												// uni.reLaunch({
												// 	url:'../order/order'
												// })
											}, 0)
										} else {
											that.cardbag_detail_id = that.title[navv].id;
										}
									}
								}
							})
						} else {
							wx.showToast({
								title: res.msg
							})
						}
					})
				// }
			},
			// 调用微信收货地址
			chooseadd: function(e) {
				let that = this;
				uni.chooseAddress({
					// 成功
					success(res) {
						console.log('获取地址', res)

						that.provinceName = res.provinceName;
						that.cityName = res.cityName;
						that.countyName = res.countyName;
						that.userName = res.userName;
						that.linktel = res.linktel;
						that.detailInfo = res.detailInfo;
						that.telNumber = res.telNumber;
						// 匹配地址
						that.add()
					},
					// 失败
					fail(res) {
						console.log('失败')
						uni.openSetting({
							success(res) {
								console.log(res.authSetting)
								that.scope = true
							},
							fail(res) {
								console.log(res)
								console.log(res.authSetting)



							}
						})
					}
				})
			},
			// 查询地址id
			add: function(e) {
				let that = this;
				let provinceName = this.provinceName;
				let cityName = this.cityName;
				let countyName = this.countyName;
				var data = '{"level":"1"}';
				var action = 'get_area';

				// addresss  true  失败  false 成功..我为啥这么写.
				this.$utils.post(action, data).then(res => {
					// console.log('省',res)
					if (res.rs.length == 0) {
						that.addresss = true;
					}

					for (let i in res.rs) {
						if (provinceName == res.rs[i].name) {
							this.provinceName = res.rs[i].id;
							console.log(res.rs[i].name)
							var data = '{"level":"2","parentid":"' + res.rs[i].id + '"}';
							var action = 'get_area';
							this.$utils.post(action, data).then(res => {
								// console.log('市')
								if (res.rs.length == 0) {
									that.addresss = true;
								}
								for (let j in res.rs) {
									if (cityName == res.rs[j].name) {
										this.cityName = res.rs[j].id;
										console.log(res.rs[j].name)
										var data = '{"level":"3","parentid":"' + res.rs[j].id + '"}';
										var action = 'get_area';
										this.$utils.post(action, data).then(res => {
											console.log('县', res)
											if (res.rs.length == 0) {
												that.addresss = true;
											}
											for (let z in res.rs) {
												if (countyName == res.rs[z].name) {
													this.countyName = res.rs[z].id;
													console.log(res.rs[z].name)
													this.adds()
												} else {
													that.addresss = true;
												}
											}
										})


									} else {
										that.addresss = true;
									}
								}
							})
						} else {
							that.addresss = true;
						}
					}

					if (that.addresss == true) {
						uni.showToast({
							title: '匹配失败',
							icon: 'none'
						})
					}

				})
			},

			adds: function(e) {
				// 添加地址
				var that = this;
				var data = '{"memberid":"' + that.id + '","linkman":"' + that.userName + '","linktel":"' + that.telNumber +
					'","province":"' + that.provinceName + '","city":"' + that.cityName + '","county":"' + that.countyName +
					'","address":"' + that.detailInfo + '"}';
				console.log(data)
				var action = 'add_member_area';
				that.$utils.post(action, data).then(res => {
					console.log(res)
					if (res.sta == 1) {
						var data = '{"memberid":"' + this.id + '"}';
						var action = 'get_member_area';

						this.$utils.post(action, data).then(res => {
							console.log('地址列表', res)
							// 1.先判断是否存在地址 如果存在地址默认第一个选择并渲染   member_area_id返回全局
							console.log('默认第一个地址')
							this.addli = res.rs[0];
							this.member_area_id = res.rs[0].id;
							this.addsign = 2;

						})

					} else {
						uni.showToast({
							title: '匹配失败,请手动填写地址',
							icon: 'none',
							success: () => {

								let time = setTimeout(function(e) {
									let addr = uni.setStorageSync('add', '');
									uni.navigateTo({
										url: '../Address/Address'
									})
									clearTimeout(time)
								}, 1000)

							}
						})
					}

				})
			},
			// 2.子订单列表
			orderlist: function(e) {
				// 存放未生成订单礼包
				let arr = [];
				let data = '{"cardbag_number":"' + this.cardbag_number + '"}';
				let action = 'get_cardbag_fenshu';


				this.$utils.post(action, data).then(res => {
					console.log('子订单列表', res.rs)

					// 留给礼包规格位置
					for (let i in res.rs[0].goodsinfo) {
						res.rs[0].goodsinfo[i].guige = ''
					}
					// 礼包号+未生成礼包订单
					for (let i in res.rs) {
						if (res.rs[i].status == 0) {
							// 加个索引
							res.rs[i].index = Number(i) + 1;
							arr.push(res.rs[i])
						}
					}


					this.title_length = arr.length;
					// 未生成礼包列表
					this.title = arr;


					// 第一个子礼包下的商品 
					this.purchase = res.rs[0].goodsinfo;
					// 第一个子礼包id
					this.cardbag_detail_id = arr[0].id;

					// 一个子礼包下有几个商品  判断规格数量使用
					this.length = res.rs[0].goodsinfo.length;

					//  1订单已支付  0订单未支付
					this.status = res.rs.status;

					// 规格需要的参数
					// 规格传的参  比如我有四个商品  一个接口一个参..留四个位置.
					this.goods_spec = new Array(res.rs[0].goodsinfo.length);
					// 规格名称   比如颜色  规格  之类的
					this.item = new Array(res.rs[0].goodsinfo.length);


				})
			},









			// 查看物流
			// see:function(e){
			//  uni.navigateTo({
			//  	url:'../orderDetails/orderDetails'
			//  })
			// },

		}
	}
</script>

<style>
	page {
		background-color: #F8F7F5;
	}

	.active {
		background: #FFF5F6 !important;
		color: #EC0A3A !important;
		border: 3rpx solid #FF3260 !important;
	}

	.activee {
		border-bottom: 5rpx solid #DB2528;
	}

	.logistics-number-scroll-li {
		width: 120rpx;
	}
	.order-purchase-top-header{
		height: auto!important;
		padding: 0!important;
	}
	.order-purchase-li{
		width: auto;
	}
	.order-purchase-top-img{
		width: 140rpx;
		margin-left: 26rpx;
		height: auto;
	}
	.order-purchase-top-img-img{
		width: 140rpx;
		height: 140rpx;
	}
	.order-purchase-top-introduce{
		flex: 1;
		padding-right: 26rpx;
	}
	.order-purchase-right{
		transform: translateY(-50%);
		right: 26rpx;
		top: 50%;
	}
	.order-purchase-top-header view:first-child{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		background-color: white;
		width: 70%;
	}
	
	.order-purchase-li-btm {
		height: auto!important;
	}
	
	.new-order-purchase-right {
	    position: absolute;
	    right: 26rpx;
	    bottom: -45rpx;
	}
	
	.new-balance-button-view{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0rpx 30rpx;
		position: fixed;
	    bottom: 0;
		width: 100%;
		height: 88rpx;
	}
	
	.new-balance-button {
	    width: 100%;
	    height: 88rpx;
	    line-height: 88rpx;
	    font-size: 32rpx;
	    color: #FFF;
	    background-color: #FF0137;
	    text-align: center;
	    /* position: fixed;
	    bottom: 0; */
	    border-radius: 40rpx;
	}
</style>
