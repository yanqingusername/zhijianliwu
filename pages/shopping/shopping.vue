

<template>
	<view class="shop z-gift">
		<view class="shop-header-backgrounds">
		</view>
		
		<view style="margin-top: -100rpx">
			<view class="shop-header" v-if="com==false">
				<image class="shop-header-xiong" :src="$utils.osspath_url('/xcx-static/xiong.png')" mode=""></image>
				<button class="shop-header-btn" type="warn" @click="box_gift">开始挑选礼物</button>
			</view>
			
			<view class="box" v-else>
				<view class="box-content">
					<view class="shop-gift-buys-top" style="border-bottom: 1rpx solid #EDEDED;" v-for="item in goodsinfo" :key="item.id">
						<img class="img shop-gift-buys-img" @click="goToDetails(item.goodsinfo.keynum)" :src="$utils.imageUrl(item.goodsinfo.head_img)" mode="">
						<view class="top-right">
							<view class="shop-gift-buys-title" @click="goToDetails(item.goodsinfo.keynum)">{{$utils.cut_str(item.goodsinfo.goodsname,16)}}</view>
							<view class="shop-gift-buys-ltitle">{{item.goods_spec_item}}</view>
							<view class="price-bottom flex-between">
								<view>
									<text style="font-size: 24rpx; color: #FB4133;">￥</text>
									<text class="shop-gift-buys-price">{{item.goodsinfo.price}}</text>
								</view>
								<view class="flex-vertically">
									<image src="https://zhijianlw.com/static/web/img/reduce_2021_08_30.png" class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="reduce(item)"></image>
									<!-- <view class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="reduce(item)"><view>-</view></view> -->
									<view class="cart-count">{{item.goodsnum}}</view>
									<image src="https://zhijianlw.com/static/web/img/increase_2021_08_30.png" class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="increase(item)"></image>
									<!-- <view class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="increase(item)"><view>+</view></view> -->
									
								</view>
							</view>
							
						</view>
					</view>
					<view class="shop-gift-buys-top" style="border-bottom: 1rpx solid #EDEDED;" v-for="item in undercarriage_list" :key="item.id">
						<view style="position: relative;" @click="goToDetails(item.goodsinfo.keynum)">
							<img class="img shop-gift-buys-img" :src="$utils.imageUrl(item.goodsinfo.head_img)" mode="">
							<view style="width: 92rpx;height: 92rpx;background: #5D5D5D;opacity: 0.69;display: flex;align-items: center;justify-content: center;color: #FFFFFF;font-size: 28rpx;position: absolute;top: 24rpx;left: 24rpx;border-radius: 50%;">失效</view>
						</view>
						
						<view class="top-right">
							<view class="shop-gift-buys-title" @click="goToDetails(item.goodsinfo.keynum)" style="color: #AAAAAA;">{{$utils.cut_str(item.goodsinfo.goodsname,16)}}</view>
							<view class="price-bottom flex-between">
								<view class="shop-gift-buys-ltitle" style="color: #AAAAAA;">{{item.goods_spec_item}}</view>
								<view class="flex-vertically">
									<view class="delete-view" @click="goDel.stop(item.goodsinfo.id)">移除</view>
								</view>
							</view>
							<view>
								<text style="font-size: 24rpx; color: #333333;">失效商品，已下架</text>
							</view>
						</view>
					</view>
					<view class="shop-gift-buys-bottom" style="border-top: none;">
						<text class="shop-gift-buys-bottom-num" v-if="show==='1'">共{{numberss}}件礼物</text>
						<text class="shop-gift-buys-bottom-num" v-else>共{{numberss}}件礼物/份</text>
						<view class="right">
							<text class="shop-gift-buys-bottom-add" @click="add">继续添加</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 送礼方式 -->
			<view class="shop-gift">
				<!-- 立即购买 -->
				<!-- <text class="shop-gift-title">送礼方式</text> -->
				<view class="" v-if="show==='0'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">立即购买</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<!-- <view class="shop-gift-address shop-list">
						<text class="">直接填写收货地址</text>
					</view> -->
				</view>
				
				<!-- 拼手气礼包 -->
				<view class="" v-if="show==='1'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">拼手气礼包</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<view class="shop-gift-address shop-list">
						<text class="">{{numberss == 1 ? '手慢无':'随机领取一件礼物'}}</text>
					</view>
					<view class="msg-view">写祝福语</view>
					<view class="shop-gift-address shop-list" style="margin-top: 13rpx;height: 130rpx;line-height: 130rpx;padding-top: 26rpx;position: relative;">
						<view class="apply-refund-text"><textarea @input='inputRemark' :placeholder="remark" maxlength='20'/></view>
						<view class="apply-refund-number" v-if="remarkNumber > 0">{{remarkNumber}}{{'/20'}}</view>
					</view>
					
					<!-- <view class="shop-gift-pin shop-list" @click="chooseGift">
						<text>选择礼物封面</text>
						<view class="right">
							<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					<view class="shop-gift-pin fu shop-list"  @click="wishes">
						<text>自定义“福语”</text>
						<view class="right">
							<text class="yixuan">{{setwishessuccess==1?'已选':''}}</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view> -->
				</view>
				
				<!-- 直接送礼 -->
				<view class="" v-else-if="show==='2'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">直接送礼</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<view class="shop-gift-address shop-list">
						<text class="">每个人最多可领取1份礼物</text>
						<view class="right">
							<text class="shop-gift-cheng">x</text>
							<input class="shop-gift-input" type="number" value="1"  v-model="fenshu"   @change="changefenshu"     />
							<text class="shop-gift-person">人</text>
						</view>
					</view>
					<view>
						<view class="shop-gift-pin shop-list"  @click="chooseGift">
							<text>定制祝福卡</text>
							<view class="right">
								<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
							</view>
						</view>
						<!-- <view class="shop-gift-pin shop-list"  @click="chooseGift">
							<text>选择礼物封面</text>
							<view class="right">
								<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
							</view>
						</view>
						<view class="shop-gift-pin shop-list flex-between"  @click="wishes">
							<text>自定义“福语”</text>
							<view style="display: flex;align-items: center;">
								<text class="yixuan" style="margin-left: 0rpx;">{{setwishessuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
								</view>
							
						</view> -->
					</view>
				</view>
				
				<!-- 底部送礼方式 -->
				<uni-popup ref="popup" type="bottom" :animation="false">
					<view class="new-shop-gift-buy-bot">
						<text class="shop-bot" @click="box1">直接送礼</text>
						<text class="shop-bot" @click="box2">拼手气礼包</text>
						<text class="shop-bot" @click="box3">立即购买</text>
						<text @click="close" class="shop-bot close" style="border-bottom: 1px solid #FFFFFF;">取消</text>
					</view>
				</uni-popup>
			</view>
			<!-- 确认订单按钮 -->
			 <view class="z-btn-bottom">
				<view class="shop-bottom-price" v-if="price_zhe"  v-model="price_zhe"><text>￥</text><text>{{price_zhe}}</text></view>
				<view v-if="show==='0'">
					<button class="shop-botton-btn" type="warn" style="opacity: 0.3" v-if="com==false">确认订单</button>
					<button class="shop-botton-btn" type="warn" v-else @click="packages">确认订单</button>
				</view>
				<view v-else>
					<button class="shop-botton-btn" style="opacity: 0.3" type="warn" v-if="com==false">确认订单</button>
					<button class="shop-botton-btn"  type="warn" v-else @click="packages">确认订单</button>
				</view>
			 </view>
		</view>
		
		<!-- 失效 -->
		<view class="success-pop" style="z-index: 120;" v-if="isShowPop && unShopList.length > 0">
			<view class="pop-center-view clearfix" v-if="unShopList.length == 1">
				<image @click="goDel('')" class="pop-center-view-close" src="https://zhijianlw.com/static/web/img/icon_2021_12_09_01.png" mode="widthFix"></image>
				<view class="shop-gift-buys-top" style="margin-top: 80rpx;padding: 0rpx 30rpx;" v-for="item in unShopList" :key="item.id">
					<view style="position: relative;">
						<img class="img shop-gift-buys-img" style="margin-right: 10rpx;" :src="item.head_img" mode="">
						<view style="width: 92rpx;height: 92rpx;background: #5D5D5D;opacity: 0.69;display: flex;align-items: center;justify-content: center;color: #FFFFFF;font-size: 28rpx;position: absolute;top: 24rpx;left: 24rpx;border-radius: 50%;">失效</view>
					</view>
					<view class="top-right">
						<view class="shop-gift-buys-title" style="color: #AAAAAA;text-align: left;">{{$utils.cut_str(item.goodsname,16)}}</view>
						<view class="shop-gift-buys-ltitle" style="color: #AAAAAA;text-align: left;">{{item.shopping_cart_goods_item}}</view>
						<view style="font-size: 24rpx; color: #333333;text-align: left;">失效商品，已下架</view>
					</view>
				</view>
				<view style="margin-top: 54rpx;display: flex;align-items: center;justify-content: center;">
					<view @click="goDel('')" class="pop-center-view-bottom">移除</view>
				</view>
			</view>
			
			<view class="pop-center-view clearfix" style="height: 425rpx;" v-if="unShopList.length > 1">
				<image @click="goDel('')" class="pop-center-view-close" src="https://zhijianlw.com/static/web/img/icon_2021_12_09_01.png" mode="widthFix"></image>
				<view style="font-size: 28rpx; color: #333333;margin-top: 38rpx;">失效商品，已下架</view>
				<view class="shop-gift-buys-top" style="margin-top: 38rpx;padding: 0rpx 44rpx;">
					<view style="position: relative;margin-right: 10rpx;margin-left: 10rpx;" v-for="item in unShopList" :key="item.id">
						<img class="img shop-gift-buys-img" style="margin-right: 0rpx;margin-left: 0rpx;" :src="item.head_img" mode="">
						<view style="width: 92rpx;height: 92rpx;background: #5D5D5D;opacity: 0.69;display: flex;align-items: center;justify-content: center;color: #FFFFFF;font-size: 28rpx;position: absolute;top: 24rpx;left: 24rpx;border-radius: 50%;">失效</view>
					</view>
				</view>
				<view style="font-size: 24rpx; color: #333333;margin-top: 18rpx;">……</view>
				<view style="margin-top: 32rpx;display: flex;align-items: center;justify-content: center;">
					<view @click="goDel('')" class="pop-center-view-bottom">一键移除</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import sr from 'sr-sdk-wxapp';
	export default {
		data() {

			return {
				price_zhe: 0,
				goodsinfo: [],
				undercarriage_list:[],
				goodsid: "",
				flag: true,
				type: '',
				show: '2',
				gift: true,
				chooses: 1,
				numberss: 0,
				com: '',
				fenshu:1,
				zhufu_type:0,
				id:'',
				setgiftssuccess: '2',
				setwishessuccess: '2',
				remark: '大吉大利，恭喜发财！',
				remarkNumber: 0,
				isShowPop: false,
				unShopList:[],
				cart_goods_id: '', //购买商品ID
				shareInfo: ''
			}

		},
		onShow: function(e) {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			console.log("当前页面的路由", curRoute);
			let curParam = routes[routes.length - 1].options; //获取路由参数
			console.log("当前页面的参数", curParam);
			let type = curParam.type
			if(typeof(type)=='undefined'){
				type=0
				
			}
			this.type = type;
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
			var action = 'get_giftbag_list';

			this.$utils.post(action, data).then(res => {
				console.log('商品', res)
				if (res.rs.giftbag.length >= 1 || res.rs.undercarriage_list >= 1) {
					this.goodsinfo = res.rs.giftbag;
					this.undercarriage_list = res.rs.undercarriage_list;
					this.price_zhe=res.rs.price_zhe;
					this.cart_goods_id = res.rs.cart_goods_id;
					let numberss = 0
					for (let i in res.rs.giftbag) {
						numberss += Number(res.rs.giftbag[i].goodsnum)
					}
					this.numberss = numberss
					uni.setStorageSync("type", type)
					this.com = true
				} else {
					this.com = false
				}
			})
			
				this.setgiftssuccess = uni.getStorageSync('setgiftssuccess');
				this.setwishessuccess = uni.getStorageSync('setwishessuccess');
				
				let zhufu_type = uni.getStorageSync('zhufu_type')
				this.zhufu_type=zhufu_type
				console.log("this.zhufu_type11")
				console.log(this.zhufu_type)
				if(this.zhufu_type==0){
					this.zhufu_type="福语"
				}else if(this.zhufu_type==1){
					this.zhufu_type="语音"
				}else if(this.zhufu_type==2){
					this.zhufu_type="视频"
				}
			
			//计算总价
			this.caltotalmoney()
		},
		onLoad: function(e) {
			
			// 分享链接
			var datashare = JSON.stringify({type:"2"});
			var actionshare = 'get_share_img';
			this.$utils.post(actionshare, datashare).then(res => {
				this.shareInfo = res.rs;
			});
           
			//计算总价
			this.caltotalmoney()
		},
		onShareAppMessage: function(e) {
		
			// 腾讯有数
			sr.track('page_share_app_message', {
			  "from_type": "menu",
			  "share_title": "指间礼物",
			  "share_path": '/pages/shopping/shopping',
			  "share_image_url": '',
			  "share_to": "friends",
			})
		
			return {
				// title:this.alt.goodsname,
				title: this.shareInfo.title || '我发现了一个不错的送礼平台～',
				imageUrl: this.shareInfo.share_img || 'https://zhijianlw.com/static/web/img/share_img.png',
				path: this.shareInfo.url || '/pages/index/index',
				// desc:'指间送礼',
			}
		
		},
		methods: {
			// 删除失效
			goDel(id){
				let memberid = uni.getStorageSync('id')
				let that = this;
				let action = "del_shopping_cart";
				let controller = 'goods';
				let data = JSON.stringify({
					goodsid: id,
					memberid: memberid,
					buy_type: this.type
				});
				this.$utils.postNew(action,data,controller).then(ress=>{
					if(ress.sta == 1){
						this.isShowPop = false;
						let memberid = uni.getStorageSync('id')
						let data = '{"memberid":"' + memberid + '","buy_type":"' + this.type + '"}';
						let action = 'get_giftbag_list';
						this.$utils.post(action, data).then(res => {
							console.log('商品', res)
							if (res.rs.giftbag.length >= 1 || res.rs.undercarriage_list >= 1) {
								that.goodsinfo = res.rs.giftbag;
								that.undercarriage_list = res.rs.undercarriage_list;
								that.price_zhe=res.rs.price_zhe;
								that.cart_goods_id = res.rs.cart_goods_id;
								let numberss = 0
								for (let i in res.rs.giftbag) {
									numberss += Number(res.rs.giftbag[i].goodsnum)
								}
								that.numberss = numberss
								that.com = true
							} else {
								that.com = false
							}
						});
						//计算总价
						this.caltotalmoney()
						
					} 
				})
			},
			inputRemark(e){
				this.remark = e.detail.value;
				this.remarkNumber = e.detail.value.length;
			},
			box_gift() {
				// uni.reLaunch({
				// 	url: '../index/index' //跳转首页
				// })
				uni.navigateTo({
					url: "./shoppingList"
				});
			},
			goToDetails(keynum) {
				uni.navigateTo({
					url: "../details/details?keynum="+ keynum
				});
			},
			// 加法
			increase: function(e) {
				console.log(e)
				let goodsid = e.goodsid;
				this.goodsid = goodsid;
				this.goodsnum = 1;
				this.numberss +=1;
				let acount=e.goodsnum+1
				this.give(e,acount);
				
				sr.track('add_to_cart', {
				    "action_type": 'append_to_cart',
					"sku": {
				      "sku_id": e.sku+"", // 若商品无sku_id时，可传spu_id信息
				      "sku_name": e.goodsinfo.goodsname + e.goods_spec_item // 若商品无sku_name时，可传spu_name信息
				    },
					"spu": {
						"spu_id": e.spu+"", // 若商品无spu_id时，可传sku_id信息
						"spu_name": e.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
					},
					"sku_num": parseInt(this.goodsnum),
					   	"primary_image_url": e.head_img
					})
			},
			// 减法
			reduce: function(e) {
				let goodsid = e.goodsid;
				this.goodsnum=-1
				this.numberss -=1;
				let acount=e.goodsnum-1
				this.goodsid = goodsid;
				this.give(e,acount);
				
				sr.track('add_to_cart', {
				    "action_type": 'remove_from_cart',
					"sku": {
				      "sku_id": e.sku+"", // 若商品无sku_id时，可传spu_id信息
				      "sku_name": e.goodsinfo.goodsname + e.goods_spec_item // 若商品无sku_name时，可传spu_name信息
				    },
					"spu": {
						"spu_id": e.spu+"", // 若商品无spu_id时，可传sku_id信息
						"spu_name": e.goodsinfo.goodsname // 若商品无spu_name时，可传sku_name信息
					},
					"sku_num": 1,
					   	"primary_image_url": e.head_img
					})
			},
			// 加减数量
			give: function(e,acount) {
				let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				let type = uni.getStorageSync('type')
				this.type = type;
				var data = '{"memberid":"' + this.memberid + '","goodsid":"' + this.goodsid + '","num":"' + this.goodsnum + '","buy_type":"' +type+'","goods_model":"' +e.goods_model+'","goods_spec":"' +e.goods_spec+'","goods_item":"' +e.goods_spec_item+'"}';
				var action = 'op_buy_shopping_cart';
				console.log(data)
				
				this.$utils.post(action, data).then(res => {
					console.log('添加购物车', res)
                       //e.goodsnum=acount  
					   //更改为下面的重新获取
					var data = '{"memberid":"' + this.memberid + '","buy_type":"' +type+'"}';
					var action = 'get_giftbag_list';

					this.$utils.post(action, data).then(res => {
						console.log('更改价格', res)
						if (res.rs.giftbag.length >= 1 || this.undercarriage_list >= 1) {
							this.goodsinfo = res.rs.giftbag
							
							this.undercarriage_list = res.rs.undercarriage_list;
							this.price_zhe=res.rs.price_zhe;
							this.cart_goods_id = res.rs.cart_goods_id;
							let numberss = 0
							for (let i in res.rs.giftbag) {
								numberss += Number(res.rs.giftbag[i].goodsnum)
							}
							this.numberss = numberss
							this.com = true
						} else {
							this.com = false
						}
						//计算总价
						this.caltotalmoney()
					})
				})
			},
			changefenshu:function (e){
				console.log("获取价格接口")
				this.caltotalmoney()
				
			},
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				//console.log('show')
				//console.log(this.show)
				
				let memberid = uni.getStorageSync('id')
				let buy_type=0
				//如果show=1是拼手气礼包，如果show=2是直接送礼
				if(this.show==1 ||  this.show==0){
					fenshu=1;
				}
				
				let action = "get_fenshu_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:0
				});
				this.$utils.post(action, data).then(res => {
					console.log(res)
					let icon = "success"
					if (res.sta != 1) {
						icon = "none";
						uni.showToast({
							icon: icon,
							title: res.msg,
							duration: 2000
						});
					return 
					}
					//赋值总价
					this.price_zhe=res.rs.price_zhe

				})					
				
			},
			add: function(e) {
				// uni.reLaunch({
				// 	url:'../index/index' //跳转首页
				// })
				uni.navigateTo({
					url: "./shoppingList"
				});
			},
			open() {
				this.$refs.popup.open()
			},
			toggle: function(e) {
				this.$refs.popup.open()
			},
			close: function(e) {
				this.$refs.popup.close()
			},
			chooseGift: function(e) {
				// let action = "get_giftbag_list";
				// let memberid = uni.getStorageSync('id')
				// this.memberid=memberid
				// let data = JSON.stringify({
				// 	memberid:this.memberid,
				// 	buy_type: 0
				// });
				// this.$utils.post(action, data).then(res => {
				// 	console.log("直接赠送")
				// 	console.log(res)
				// 	let icon = "success"
				// 	if (res.sta != 1) {
				// 		icon = "none";
				// 		uni.showToast({
				// 			icon: icon,
				// 			title: res.msg,
				// 			duration: 2000
				// 		});
				// 	}
				// 	uni.navigateTo({
				// 		url: '../shopping/gifts?type=0'
				// 	})
				// })
				uni.navigateTo({
					url: '../shopping/CBlessingCard'
				})
			},
			wishes: function(e) {
				let zhufu_type = uni.getStorageSync('zhufu_type')
				this.zhufu_type=zhufu_type
				let memberid = uni.getStorageSync('id')
				this.memberid=memberid
				if (this.zhufu_type==this.zhufu_type) {
					let action = "get_giftbag_list";
					let data = JSON.stringify({
						memberid:this.memberid,
						buy_type: 0
					});
					this.$utils.post(action, data).then(res => {
						console.log("直接赠送")
						console.log(res)
						let icon = "success"
						if (res.sta != 1) {
							icon = "none";
							uni.showToast({
								icon: icon,
								title: res.msg,
								duration: 2000
							});
						}
						uni.navigateTo({
							url: '../shopping/wishes?type=0'
						})
					})
				}

			},
			box1() {
				this.show = '2'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			box2() {
				this.show = '1'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			box3() {
				this.show = '0'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			packages: function(e) {
				if (this.show === '2') {
					this.setgiftssuccess =  uni.getStorageSync('setgiftssuccess')|| 2;
					if(this.setgiftssuccess == 2){
						uni.showToast({
							icon: "none",
							title: "请先定制祝福卡！"
						});
						return
					}
					
					//批量送礼
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '","cart_goods_id":"' + this.cart_goods_id +'"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
						if(res.sta == 1){
							if (res.rs.goodslist.length == 0) {
							
								uni.showToast({
									icon: "none",
									title: "当前礼袋无商品"
								})
							}
							if (this.zhufu_type != null && this.chooses != null && res.rs.goodslist.length!=0) {
								uni.navigateTo({
									url: '../shopping/packages?type=0&fenshu='+this.fenshu+'&wanfa=1'
								})
								this.fenshu = 1;
							}
						}else if(res.sta == 2){
							this.isShowPop = true;
							this.unShopList = res.rs.undercarriage_list;
						}
					})
				} else if (this.show === '1') {
					//拼手气礼包
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '","cart_goods_id":"' + this.cart_goods_id +'"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log('商品信息11', res)
						if(res.sta == 1){
							if (res.rs.goodslist.length == 0) {
							
								uni.showToast({
									icon: "success",
									title: "当前礼袋无商品"
								})
							}
							if (this.zhufu_type != null && this.chooses != null && res.rs.goodslist.length!=0) {
								this.$forceUpdate();
								uni.navigateTo({
									url: '../shopping/packages?type=0&fenshu=1&wanfa=4&remark='+this.remark
								})
							}
						}else if(res.sta == 2){
							this.isShowPop = true;
							this.unShopList = res.rs.undercarriage_list;
						}
					})
				} else {
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '","cart_goods_id":"' + this.cart_goods_id +'"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
						if(res.sta == 1){
							if (res.rs.goodslist.length == 0) {
							
								uni.showToast({
									icon: "success",
									title: "当前礼袋无商品"
								})
							}
							if (this.zhufu_type != null && this.chooses != null && res.rs.goodslist.length!=0) {
								uni.navigateTo({
									url: '../shopping/must?type=0'
								})
							}
						}else if(res.sta == 2){
							this.isShowPop = true;
							this.unShopList = res.rs.undercarriage_list;
						}
					})
				}
			}
		}
	}
</script>
<style>
	@import '../../common/gift.css';
	
	page{
		background: #FAFAFA;
	}
	.new-shop-gift-buy-bot {
	    width: 750rpx;
	    /* height: 338rpx; */
	    background-color: #fff;
	}
	
	.new-reduce {
	    font-size: 36rpx;
	    display: flex;
	    vertical-align: middle;
	    width: 42rpx;
	    height: 42rpx;
	    line-height: 42rpx;
	    text-align: center;
	   /* border: 1px solid #CCCCCC;
	    border-radius: 50rpx;
	    color: #999999; */
	    align-items: center;
	    justify-content: center;
	}
	
	.shop-header-xiong {
	    width: 700rpx;
	    height: 288rpx;
	}
	
	.msg-view{
		font-size: 26rpx;
		color: #333333;
		margin-top: 30rpx;
		margin-left: 18rpx;
	}
	
	
	.apply-refund-text{
		padding: 30rpx 0rpx;
	}
	.apply-refund-text textarea{
		font-size: 28rpx;
		    color: #999999;
		    height: 100rpx;
		    width: 660rpx;
	}
	.apply-refund-number{
		font-size: 28rpx;
		color: #999999;
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
	}
	
	.delete-view{
		width: 110rpx;
		height: 48rpx;
		border-radius: 24rpx;
		border: 1px solid #ED2430;
		font-size: 24rpx;
		color: #DB3C3A;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.pop-center-view{
		width: 567rpx;
		height: 364rpx;
		    background: #FFFFFF;
		    border-radius: 3rpx;
		    position: absolute;
		    top: 35%;
		    left: 50%;
		    -webkit-transform: translateY(-50%) translateX(-50%);
		    transform: translateY(-50%) translateX(-50%);
		    /* padding: 55rpx; */
		    text-align: center;
	}
	
	.pop-center-view-close {
	    cursor: pointer;
	    position: absolute;
	    top: 12rpx;
	    right: 12rpx;
	    width: 50rpx;
		height: 50rpx;
	}
	
	.pop-center-view-bottom{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 142rpx;
		height: 48rpx;
		border: 1px solid #ED2430;
		font-size: 24rpx;
		color: #DB3C3A;
	}
</style>