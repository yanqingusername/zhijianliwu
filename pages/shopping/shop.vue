<template>
	<view class="shop">
		<view class="shop-header-backgrounds"></view>
		<view class="shop-header">
			<image class="shop-header-xiong" :src="$utils.osspath_url('/xcx-static/xiong.png')" mode=""></image>
			<button class="shop-header-btn" type="warn" @click="box_gift()">开始挑选礼物</button>
		</view>
		<view class="box">
				<view class="shop-gift-buys-top" v-for="item in goodsinfo" :key="item.id">
					<img class="img shop-gift-buys-img" :src="$utils.imageUrl(item.goodsinfo.head_img)">
					<text class="shop-gift-buys-title">{{$utils.cut_str(item.goodsinfo.goodsname,16)}}</text>
					<text class="shop-gift-buys-ltitle">{{item.goods_spec_item}}</text>
					<text class="shop-gift-buys-price">{{item.goodsinfo.price}}</text>
					<view class="shop-gift-num">
						
						<view class="cart-count">
							x{{item.goodsnum}}
						</view>
					</view>
				</view>
				<view class="shop-gift-buys-bottom">
					<text class="shop-gift-buys-bottom-num">共{{goodsinfo.length}}件礼物</text>
					<text class="shop-gift-buys-bottom-add" @click="add">继续添加></text>
				</view>
		</view>
		<!-- 送礼方式 -->
		 <view class="shop-gift">
			 <!-- 立即购买 -->
				<text class="shop-gift-title">送礼方式</text>
				<!-- 拼手气红包 -->
				<view class="" v-if="show==='1'">
					<text class="shop-gift-buy" @click="toggle">拼手气红包></text>
					<view class="shop-gift-address">
						<text class="">随机领取一件礼物</text>
					</view>
					<view>
						<view class="shop-gift-pin"  @click="chooseGift">
							<text>选择礼物封面</text>
							<text class="yixuan">{{chooses==1?'已选':''}}</text>
							<image class="shop-gift-jiantou" :src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
						</view>
						 <view class="shop-gift-pin fu" @click="wishes">
						 	<text>自定义“福语”</text>
							<view class="jiantou">
								<text class="">{{zhufu_type}}</text>
								<image class="shop-jiantou"
									:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
							</view>
						 </view>
					</view>
				</view>
				<!-- 直接送礼 -->
				<view class="" v-else-if="show==='2'">
					<text class="shop-gift-buy" @click="toggle">直接送礼></text>
					<view class="shop-gift-address">
						<text class="">每个人最多可领取1份礼物</text>
						<text class="shop-gift-cheng">x</text>
						<input class="shop-gift-input" type="text" value="1"   v-model="fenshu"   @change="changefenshu"    />
						<text class="shop-gift-person">人</text>
					</view>
					<view>
						<view class="shop-gift-pin"  @click="chooseGift">
							<text>选择礼物封面</text>
							<text class="yixuan">{{chooses==1?'已选':''}}</text>
							<image class="shop-gift-jiantou" :src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
						</view>
						 <view class="shop-gift-pin fu" @click="wishes">
						 	<text>自定义“福语”</text>
							<view class="jiantou">
								<text class="">{{zhufu_type}}</text>
								<image class="shop-jiantou"
									:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
							</view>
						 </view>
					</view>
				</view>
				<!-- 底部送礼方式 -->
				<uni-popup ref="popup" type="bottom" :animation="false"  >
					<view class="shop-gift-buy-bot">
						<text class="shop-bot" @click="box1">直接送礼</text>
						<text class="shop-bot" @click="box2">拼手气红包</text>
						<text @click="close" class="shop-bot close">取消</text>
					</view>
				</uni-popup>
		  </view> 
		  <!-- 确认订单按钮 -->
		
			  <text class="shop-bottom-price">￥{{price_zhe}}</text>
		      <button class="shop-botton-btn" type="warn" @click="packages">生成礼物红包</button>
	</view>
</template> 

<script>
	export default {
	
		data() {
		
			return {
				price_zhe:0,
				goodsinfo:[],
			   goodsid: "",
			   checknum: '1',
			   flag:true,
			   type: '',
			   show: '1',
			   gift:true,
			   zhufu_type:0,
			   chooses:1,
			   length:0,
			   fenshu:1,
			}
		
		},
		onLoad:function(e){
				let type=e.type
				this.type=type
			    let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
				var action = 'get_giftbag_list';
				 this.$utils.post(action,data).then(res=>{
					 console.log('商品信息',res)
					 if (res.sta ===1) {				   
						uni.showToast({
							icon: 'success',
							title: res.msg,
							duration: 1000
						});
					 }
					this.goodsinfo = res.rs.giftbag
					this.price_zhe=res.rs.price_zhe
				})
				
				//计算总价
				this.caltotalmoney()
		},
		onShow: function(e){
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
		},
		methods: {
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				console.log('show')
				console.log(this.show)
				
				let memberid = uni.getStorageSync('id')
				let buy_type=1
				//如果show=1是拼手气红包，如果show=2是直接送礼
				if(this.show==1 ||  this.show==0){
					fenshu=1;
				}
				
				let action = "get_fenshu_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:1
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
			changefenshu:function (e){
				console.log("获取价格接口")
				this.caltotalmoney()
				
			},						
			add: function(e) {
				uni.reLaunch({
					url:'../index/index'
				})
			},						
		 box_gift(){
			uni.navigateTo({
				url:'../index/index'
			})
		 },
		 
		 reduce(num, type) {
		 	this.checknum = parseInt(num) + parseInt(type);
		 	return
		 },
		   open() {
		      this.$refs.popup.open('')
		   },
		   toggle:function(e) {
		   		this.$refs.popup.open('')
		   	},
		   	close:function(e) {
		   		this.$refs.popup.close()
		   	},
			chooseGift:function(e){
				let action = "get_giftbag_list";
				let memberid = uni.getStorageSync('id')
				this.memberid=memberid
				let data = JSON.stringify({
					memberid:this.memberid,
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
					}
					   uni.navigateTo({
					   	url:'../shopping/gifts?type=1'
					   })
					})
			},
			wishes:function(e){
				let zhufu_type = uni.getStorageSync('zhufu_type')
				this.zhufu_type=zhufu_type
				let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				if(this.zhufu_type==this.zhufu_type){
					let action = "get_giftbag_list";
					let data = JSON.stringify({
						memberid:this.memberid,
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
						}
						   uni.navigateTo({
						   	url:'../shopping/wishes?type=1'
						   })
						})
				}
				
			},
			box1(){
				this.show='2'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			box2(){
				this.show='1'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			packages:function(e){
				if(this.show==='2'){
					let type=e.type
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
							if(this.zhufu_type!=null && this.chooses!=null){
								uni.navigateTo({
									url:'../shopping/packages?type=1&fenshu='+this.fenshu+'&wanfa=1' 
								})
							}
					})
				}else if(this.show==='1'){
					let type=e.type
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
							if(this.zhufu_type!=null && this.chooses!=null){
								uni.navigateTo({
									url:'../shopping/packages?type=1&fenshu=1&wanfa=4' 
								})
							}
					})
				}
			}
		}
	}
</script>

<style>
	.shop{
		width: 100%;
	}
	.shop-header-backgrounds{
		width: 100%;
		height: 410rpx;
		background-image: url(https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/bc.png);
		background-size:100%  410rpx;
	}
	.shop-header-xiong{
		width: 680rpx;
		height: 300rpx;
	    margin-left: 30rpx;
	    margin-top: -104rpx;
	}
	.shop-header-btn{
		width: 300rpx;
		height: 80rpx;
		line-height: 40px;
		position: absolute;
		top: 485rpx;
		left: 230rpx;
		background-color: #EC1815;
		font-size: 16px;
		font-family: "苹方 中等";
	}
	.shop-gift{
		width: 100%;
		height:450rpx;
		margin-top: 42rpx;
	}
	.shop-gift-title{
		margin-left: 45rpx;
		color: #333;
		font-family: "苹方 中等";
		font-size: 13px;
	}
	.shop-gift-buy{
		float: right;
		margin-right: 60rpx;
		color: #DB3C3A;
		margin-top: -50rpx;
		font-family: "苹方-简 常规体";
		font-size: 13px;
	}
	.shop-gift-address{
		width: 90%;
		height: 100rpx;
		line-height: 50px;
		padding-left: 30rpx;
		background-color: #fff;
		margin:20rpx auto;
		color: #999;
	}
	.shop-botton-btn{
		width: 300rpx;
		margin-top: 78rpx;
		margin-left: 214rpx;
		font-family: "苹方 中等";
		font-size: 16px;
		color: #fff;
	}
	.shop-gift-pin{
		width: 90%;
		height: 100rpx;
		line-height: 50px;
		padding-left: 30rpx;
		background-color: #fff;
		margin:auto;
		color: #333333;
	}
	.shop-gift-jiantou{
		width: 50rpx;
		height: 50rpx;
		float: right;
		margin-top: 30rpx;
	}
	.fu{
		margin-top: 21rpx;
	}
	 .shop-gift-buys{
		width: 90%;
		height: 295rpx;
		background-color: #fff;
		margin-top: 300rpx;
		margin-left: 39rpx;
		border-radius: 5px;
	}
	.shop-gift-buys-top{
		width: 100%;
		height: 220rpx;
		border-bottom: 1px solid #eee;
		position: relative;
	}
	.shop-gift-buys-img{
		width: 150rpx;
		height: 150rpx;
		margin-left: 20rpx;
		margin-top: 40rpx;
	}
	.shop-gift-buys-title{
		width: 68%;
		position: absolute;
		top: 44rpx;
		left: 190rpx;
		font-family: "苹方 中等";
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}
	.shop-gift-buys-ltitle{
		position:absolute;
		top: 103rpx;
		left: 190rpx;
		color: #999999;
	}
	.shop-gift-buys-price{
		position:absolute;
		top: 155rpx;
		left: 190rpx;
		color: #FB4133;
	}
	.shop-gift-num{
		width: 260rpx;
		height: 55rpx;
		position:absolute;
		top: 140rpx;
		right: 0rpx;
	}
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
		left: 30rpx;
	}
	.cart-count {
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #F5F5F5;
		position: absolute;
		top: 22rpx;
		left: 90rpx;
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
		left: 167rpx;
	}
	.shop-gift-buys-bottom{
		width: 100%;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.shop-gift-buys-bottom-num{
		margin-left: 40rpx;
		color: #666666;
	}
	.shop-gift-buys-bottom-add{
		margin-right: 21rpx;
		color: #DB3C3A;
		font-size: 13px;
		font-family: "苹方-简 常规体";
	}
	.shop-bottom-price{
		font-size: 18px;
		position: absolute;
		    margin-top: 25rpx;
		    margin-left: 310rpx;
			font-family: "苹方 中等";
			color: #333;
	}
	.shop-gift-buy-bot{
		width: 750rpx;
		height: 257rpx;
		background-color: #fff;
	}
   .shop-bot{
   		width: 750rpx;
   		height: 82rpx;
   		line-height: 40px;
   		text-align: center;
   		background-color: #FFF;
   		display: block;
   		border-bottom: 1px solid #ccc;
   	}
	.close{
			border-top:3px solid #ccc;
	}
	.box{
		width: 675rpx;
		    background-color: #fff;
		    border-bottom: 1px solid #eee;
		    margin-top: -453rpx;
		    margin-left: 37rpx;
		    border-radius: 5px;
		    position: relative;
		    z-index: 99;
	}
	.shop-gift-cheng{
		float: right;
		margin-right: 140rpx;
	}
	.shop-gift-input{
		width: 60rpx;
		height: 30rpx;
		background-color: #F5F5F5;
		text-align: center;
		color: #333333;
		position: absolute;
		top:723rpx;
		left: 600rpx;
	}
	.shop-gift-person{
		position: absolute;
		top: 695rpx;
		left: 666rpx;
		color: #333333;
	}
	.yixuan{
		margin-left:397rpx;
		color: #999999;
		font-family: "苹方 中等";
		font-size: 14px;
	}
	.jiantou{
			width: 300rpx;
			height: 100rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			/* border: 1px solid #000; */
			margin-top: -100rpx;
			margin-left: 370rpx;
			color: #999999;
			font-family: "苹方 中等";
			font-size: 14px;
	}
	.shop-jiantou{
			 width: 50rpx;
			 height: 50rpx;
			 margin-top: 5rpx;
	}
	.shop-header{
		position:unset;
		z-index: -1;
		margin-left: 0rpx;
	}
</style>
