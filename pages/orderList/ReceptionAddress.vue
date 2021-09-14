<template>
	<view>
		<view class="reception-address-view" v-if="addli.linkman" @click="address">
			<view class="reception-address-view-left">
				<view class="reception-address-name">{{addli.linkman}} {{addli.linktel}}</view>
				<view class="reception-address-value">{{addli.province_name}} {{addli.city_name}} {{addli.county_name}} {{addli.address}}</view>
			</view>
			<view class="reception-address-view-right" >
				<image src="../../static/return_arrow_r_g.png" class="reception-address-arrow"></image>
			</view>
		</view>
		
		<view class="reception-address-add" v-else>
			<view class="reception-address-left" @click="address">
				<image src="../../static/reception-address-add.png" class="reception-address-img"></image>
				<view class="reception-address-text">手动添加地址</view>
			</view>
			<view class="reception-address-left" @click="chooseaddbutton">
				<image src="../../static/reception-address-location.png" class="reception-address-img"></image>
				<view class="reception-address-text">获取微信地址</view>
			</view>
			<image src="../../static/reception-address-line.png" class="reception-address-line"></image>
		</view>
		
		<!--  -->
		<view class="order-purchase-view">
			<view class="new-order-li">
				<view class="new-order-li-center" v-for="(item,index) in purchase" :key="index">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.goodsname}}</view>
							<view class="new-order-item-money">¥{{item.price}}</view>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：{{item.goods_spec}}</view>
							<view class="new-order-item-total">x{{item.goodsnum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="reception-submit">
			<view class="reception-address-submit" @click="generate">确认提交</view>
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
		onShow: function() {
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
			this.cardbag_number = e.ordernumber;
			
			
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
		computed: {
			
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
			// 			uni.getSetting({
			// 				success(res) {
			// 					console.log('授权', res.authSetting['scope.address'])
			// 					if (res.authSetting['scope.address'] == true) {} else {
			// 						// 调起微信收货地址
			// 						that.chooseadd()
			// 					}
			
			
			// 				}
			// 			})
			
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
											uni.navigateBack({
												delta:1
											})
			
											// uni.redirectTo({
											// 	url: "../order/order?nav=" + '1'
											// })
			
											// uni.reLaunch({
											// 	url:'../order/order'
											// })
										}, 500)
			
									} else if (that.title_length > 1) {
										// 还有礼包
										that.title.splice(that.navv, 1);
										console.log(navv)
										console.log((that.title))
										console.log(that.title[navv])
										if (that.title[navv] == null || that.title[navv] == undefined) {
											console.log('无了')
											setTimeout(function(e) {
												uni.navigateBack({
													delta:1
												})
			
												// uni.redirectTo({
												// 	url: "../order/order?nav=" + '1'
												// })
			
												// uni.reLaunch({
												// 	url:'../order/order'
												// })
											}, 500)
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
			chooseaddbutton: function(e){
				let that = this;
				uni.getSetting({
					success(res) {
						console.log('授权', res.authSetting['scope.address'])
						if (res.authSetting['scope.address'] == true) {
							// 调起微信收货地址
							that.chooseadd()
						} else {
							
						}
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F7F5;
	}
	
	.reception-address-view{
		background-color: #FFF;
		margin-top: 20rpx;
		padding: 40rpx 30rpx 30rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.reception-address-view-left{
		display: flex;
		width: 560rpx;
		flex-direction: column;
	}
	
	.reception-address-name{
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		line-height: 45rpx;
	}
	
	.reception-address-value{
		width: 560rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		margin-top: 10rpx;
	}
	
	.reception-address-arrow{
		width: 40rpx;
		height: 40rpx;
	}
	
	.reception-address-add{
		background-color: #FFF;
		margin-top: 20rpx;
		/* padding: 58rpx 62rpx; */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.reception-address-left{
		display: flex;
		align-items: center;
		/* justify-content: center;
		width: 296rpx;
		height: 70rpx;
		border-radius: 35rpx;
		border: 2rpx solid #FB5142; */
		width: 100%;
		border-bottom: 2rpx solid #EEEEEE;
		padding: 30rpx 0rpx 28rpx 36rpx;
	}
	.reception-address-img{
		width: 40rpx;
		height: 40rpx;
	}
	.reception-address-text{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		margin-left: 6rpx;
	}
	.reception-address-line{
		width: 100%;
		height: 6rpx;
	}
	.order-purchase-view{
		background-color: #FFF;
	}
	.new-order-li{
		width: 100%;
		margin-top: 20rpx;
	}
	
	
	.new-order-li-top-orderstatus{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25rpx 45rpx 25rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-left{
		width: 140rpx;
		display: flex;
		align-items: center;
	}
	.new-scroll-left{
		width: 540rpx;
		display: flex;
		align-items: center;
	}
	.new-order-scroll {
	    width: 540rpx;
	    height: 140rpx;
	}
	.new-scroll-right{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.new-order-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 420rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-right{
		display: flex;
		flex-direction: column;
		width: 516rpx;
		margin-left: 20rpx;
	}
	.new-order-item-money{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	
	.reception-submit{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 114rpx;
	}
	
	.reception-address-submit{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 384rpx;
		height: 80rpx;
		background: #F55856;
		border-radius: 10rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 45rpx;
	}
	
</style>
