

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
					<view class="shop-gift-buys-top" v-for="item in goodsinfo" :key="item.id">
						<img class="img shop-gift-buys-img" @click="goToDetails(item.goodsinfo.keynum)" :src="$utils.imageUrl(item.goodsinfo.head_img)" mode="widthFix">
						<view class="top-right">
							<view class="shop-gift-buys-title" @click="goToDetails(item.goodsinfo.keynum)">{{$utils.cut_str(item.goodsinfo.goodsname,16)}}</view>
							<view class="shop-gift-buys-ltitle">{{item.goods_spec_item}}</view>
							<view class="price-bottom flex-between">
								<view>
									<text style="font-size: 24rpx; color: #FB4133;">￥</text>
									<text class="shop-gift-buys-price">{{item.goodsinfo.price}}</text>
								</view>
								<view class="flex-vertically">
									<image src="../../static/reduce_2021_08_30.png" class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="reduce(item)"></image>
									<!-- <view class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="reduce(item)"><view>-</view></view> -->
									<view class="cart-count">{{item.goodsnum}}</view>
									<image src="../../static/increase_2021_08_30.png" class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="increase(item)"></image>
									<!-- <view class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="increase(item)"><view>+</view></view> -->
									
								</view>
							</view>
							
						</view>
					</view>
					<view class="shop-gift-buys-bottom">
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
					
					<view class="shop-gift-address shop-list">
						<text class="">直接填写收货地址</text>
					</view>
				</view>
				
				<!-- 拼手气红包 -->
				<view class="" v-if="show==='1'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">拼手气红包</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<view class="shop-gift-address shop-list">
						<text class="">{{numberss == 1 ? '手慢无':'每人随机领取一件礼物'}}</text>
					</view>
					<view class="shop-gift-pin shop-list" @click="chooseGift">
						<text>选择礼物封面</text>
						<view class="right">
							<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
							<text class="icon icon-z-right"></text>
						</view>
						
						<!-- <image  class="shop-gift-jiantou" :src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
					</view>
					<view class="shop-gift-pin fu shop-list"  @click="wishes">
						<text>自定义“福语”</text>
						<view class="right">
							<!-- <text class="">{{zhufu_type}}</text> -->
							<text class="yixuan">{{setwishessuccess==1?'已选':''}}</text>
							<text class="icon icon-z-right"></text>
							<!-- <image class="shop-jiantou" :src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
						</view>
					</view>
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
							<text>选择礼物封面</text>
							<view class="right">
								<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
							<!-- <image class="shop-gift-jiantou"
								:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
							</view>
						</view>
						<view class="shop-gift-pin shop-list flex-between"  @click="wishes">
							<text>自定义“福语”</text>
							<view style="display: flex;align-items: center;">
								<!-- <text class="">{{zhufu_type}}</text> -->
								<text class="yixuan" style="margin-left: 0rpx;">{{setwishessuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
								<!-- <image class="shop-jiantou"
									:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
							</view>
							
						</view>
					</view>
				</view>
				
				<!-- 底部送礼方式 -->
				<uni-popup ref="popup" type="bottom" :animation="false">
					<view class="new-shop-gift-buy-bot">
						<text class="shop-bot" @click="box1">直接送礼</text>
						<text class="shop-bot" @click="box2">拼手气红包</text>
						<text class="shop-bot" @click="box3">立即购买</text>
						<text @click="close" class="shop-bot close">取消</text>
					</view>
				</uni-popup>
			</view>
			<!-- 确认订单按钮 -->
			 <view class="z-btn-bottom">
				<view class="shop-bottom-price" v-if="price_zhe"  v-model="price_zhe"><text>￥</text><text>{{price_zhe}}</text></view>
				<view v-if="show==='0'">
					<button class="shop-botton-btn" type="warn" style="opacity: 0.3" v-if="com==false" @click="packages">确认订单</button>
					<button class="shop-botton-btn" type="warn" v-else @click="packages">确认订单</button>
				</view>
				<view v-else>
					<button class="shop-botton-btn" style="opacity: 0.3" type="warn" v-if="com==false" @click="packages">生成礼物红包</button>
					<button class="shop-botton-btn"  type="warn" v-else @click="packages">确认订单</button>
				</view>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				price_zhe: 0,
				goodsinfo: [],
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
				setwishessuccess: '2'
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
				if (res.rs.giftbag.length >= 1) {
					this.goodsinfo = res.rs.giftbag
					this.price_zhe=res.rs.price_zhe
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
           
			//计算总价
			this.caltotalmoney()
		},
		methods: {
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
			},
			// 减法
			reduce: function(e) {
				let goodsid = e.goodsid;
				this.goodsnum=-1
				this.numberss -=1;
				let acount=e.goodsnum-1
				this.goodsid = goodsid;
				this.give(e,acount);
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
						if (res.rs.giftbag.length >= 1) {
							this.goodsinfo = res.rs.giftbag
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
				//如果show=1是拼手气红包，如果show=2是直接送礼
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
				this.$refs.popup.open('')
			},
			toggle: function(e) {
				this.$refs.popup.open('')
			},
			close: function(e) {
				this.$refs.popup.close()
			},
			chooseGift: function(e) {
				let action = "get_giftbag_list";
				let memberid = uni.getStorageSync('id')
				this.memberid=memberid
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
						url: '../shopping/gifts?type=0'
					})
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
					//批量送礼
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
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
						}
					})
				} else if (this.show === '1') {
					//拼手气红包
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log('商品信息11', res)
						if (res.rs.goodslist.length == 0) {
						
							uni.showToast({
								icon: "success",
								title: "当前礼袋无商品"
							})
				        }
						if (this.zhufu_type != null && this.chooses != null && res.rs.goodslist.length!=0) {
							this.$forceUpdate();
							uni.navigateTo({
								url: '../shopping/packages?type=0&fenshu=1&wanfa=4'
							})
						}
					})
				} else {
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
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
					})
				}
			}
		}
	}
</script>
<style>
	@import '../../common/gift.css';
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
</style>