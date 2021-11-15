<template>
	<view class="center">
		<img class="index-img" :src="cardtype_img" mode="">
		<view class="choose">您可以选择下列1款礼物进行兑换</view>
		
		<view class="wrapper">
			<!-- 假数据 -->
			<view v-for="(item, index) in goodslist" class="tea" :key="index">
				<view>
					<view class="tea-img" :data-keynum="item.keynum" @click="confirm_order">
						<image class="img" :src="$utils.imageUrl(item.head_img)" mode="widthFix"></image>
					</view>
					<view style="padding: 16rpx 20rpx 26rpx">
						<view class="t-title">{{item.goodsname}}</view>
						<view class="l-title">{{item.goodstitle}}</view>
						<button size="mini" class="sub" :data-keynum="item.keynum"   @click="goto">去兑换</button>
					</view>
				</view>
			</view>
			
			
			<!-- <view v-for="item in goodslist" class="tea">
				<view class="tea-img">
					<image class="img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
				</view>
				<view>
					<text class="t-title">{{item.goodsname}}</text>
					<text class="l-title">{{item.goodstitle}}</text>
					<button size="mini" class="sub"   :data-keynum="item.keynum"   @click="confirm_order">去兑换</button>
				</view>
			</view> -->
		</view>
		
		<!-- 绑卡 -->
		<view class="success-pop" style="z-index: 33;" v-if="showPop">
			<view class="pop-center clearfix">
				<image @click="close" class="close" src="https://zhijianlw.com/static/web/img/z-close.png" mode="widthFix"></image>
				<form @submit="submit">
					<view class="card">
						<h3>礼品卡/册兑换:</h3>
						<uni-forms :value="formData" ref="form">
							<uni-forms-item name="pass">
								<input type="text" name="cardpass" v-if="showInput" v-model="formData.pass" placeholder="请输入礼品卡/册密码" @input="binddata('pass',$event.detail.value)" />
							</uni-forms-item>
							<button form-type="submit" class="sub">立即绑定</button>
						</uni-forms>
					</view>
				</form>
			</view>
		</view>
		
		<!-- 绑定成功提示 -->
		<view class="success-pop" style="z-index: 33;" v-if="isPopSucc">
			<view class="pop-center clearfix">
				<image @click="close" class="close" src="https://zhijianlw.com/static/web/img/z-close.png" mode="widthFix"></image>
				<view class="p" style="margin-bottom:40rpx;margin-top:40rpx;">{{popTitle}}</view>
				<view v-if="bindNumber" class="n" hover-class="none" @click="clickHandler">确定</view>
				<view v-else class="n" hover-class="none" @click="close">确定</view>
			</view>
		</view>
		
		<view class="slider">
			<view class="details-alt-logo lilan" style="margin: 0;padding: 0;" @click="goTransfer">
				<image class="new-img" src="https://zhijianlw.com/static/web/img/icon_transfer_2021_11_15_01.png" mode="widthFix"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodslist:[],
				isOrder: 0,
				cardid:'',
				type:'',
				cardtype_img: 'https://zhijianlw.com/static/web/img/index-coupons-2021-08-28.png',
				formData: {
					pass: ''
				},
				showInput: true,
				showPop: false,
				keynum: '',
				isPopSucc: false,
				popTitle: '',
				bindNumber: "",
				ordernumber: '',
				isTransfer: false
			}
		},
		onLoad: function(e) {
			if(e && e.scene){
				var scene = decodeURIComponent(e.scene)
				let cardidstr= scene.split("&")[0];
				let typestr= scene.split('&')[1];
				let cardid = cardidstr.split("=");
				let type = typestr.split("=");
				
				uni.showToast({
					icon: "loading",
					title: "加载中"
				})
				this.cardid = cardid[1];
				this.type = type[1];
				uni.setStorageSync("dh_cardid",cardid[1])
				this.getCardGoods();
			}else{
				if(e && e.isOrder){
					this.isOrder =  e.isOrder;
				}
				if(e && e.type){
					this.type = e.type;
				}
				uni.showToast({
					icon: "loading",
					title: "加载中"
				})
				if(e && e.ordernumber){
					this.ordernumber = e.ordernumber;
				}
				
				var cardid = e.cardid;
				this.cardid = cardid
				uni.setStorageSync("dh_cardid",cardid)
				this.getCardGoods();
			}
		},
		methods: {
			getCardGoods(){
				var memberid = uni.getStorageSync('id')
				var action = 'get_card_goods';
				var data = JSON.stringify({
					cardid: this.cardid,
				    memberid: memberid,
				});
				
				this.$utils.post(action, data).then(res => {
					console.log('获取商品列表', res)
					this.goodslist = res.rs.goodslist || [];
					this.cardtype_img = res.rs.cardtype.cardtype_img;
				})
			},
			goto(e) {
				let keynum = e.currentTarget.dataset.keynum;
				this.keynum = keynum;
				if(this.type == 2){
					var memberid = uni.getStorageSync('id')
					if(memberid){
						this.showPop = true;
						this.isTransfer = false;
					}else{
						uni.reLaunch({
							url: '../signin/signin?receive=' + this.type +'&cardbag_number=' + this.cardid
						})
					}
				}else{
					uni.redirectTo({
						url: './index-address?good_keynum=' + keynum + '&isOrder=' + this.isOrder
					})
				}
			},
			confirm_order:function (e){
				let keynum = e.currentTarget.dataset.keynum;
				if(this.type == 2){
					uni.redirectTo({
						url: './ExchangeDetails?keynum=' + keynum + '&isOrder=' + this.isOrder + '&type=' + this.type
					})
				}else{
					uni.redirectTo({
						url: './ExchangeDetails?keynum=' + keynum + '&isOrder=' + this.isOrder
					})
				}
			},
			close: function(){
				this.showInput = true;
				this.showPop = false;
				this.formData.pass = '';
				this.isPopSucc = false;
				this.popTitle = '';
				this.bindNumber = "";
				this.isTransfer = false;
			},
			submit: function(e) {
				var mid = uni.getStorageSync('id');
				if (mid == '') {
					uni.showToast({
						title: "请先登录！",
						icon: 'none'
					})
					return false;
				}
				const cardpass = e.detail.value.cardpass;
				if (cardpass == '') {
					uni.showToast({
						title: "请输入礼品册上的密码！",
						icon: 'none'
					})
					return false;
				}
			
				var action = 'bind_giftcard';
				var data = '{"memberid":"' + mid + '","cardpwd":"' + cardpass + '","type":1}';
				this.$utils.post(action, data).then(res => {
					console.log(res)
					if (res.sta == 1) {
						this.showInput = true;
						this.showPop = false;
						this.formData.pass = '';
						this.isPopSucc = true;
						this.popTitle = res.msg;
						this.bindNumber = res.rs.ordernumber;
						this.ordernumber = res.rs.ordernumber;
					} else {
						this.showInput = true;
						this.showPop = false;
						this.formData.pass = '';
						this.isPopSucc = true;
						this.popTitle = res.msg;
						this.bindNumber = res.rs.ordernumber;
						this.ordernumber = res.rs.ordernumber;
						// uni.showToast({
						// 	title: res.msg,
						// 	icon: 'none'
						// })
					}
				})
			},
			clickHandler(){
				this.showInput = true;
				this.showPop = false;
				this.formData.pass = '';
				if(this.isTransfer){
					uni.navigateTo({
						url: `/pages/shopping/shop?type=1&statutype=exchange&ordernumber=${this.ordernumber}&is_exchange_type=1`
					})
				}else{
					uni.redirectTo({
						url: './index-address?good_keynum=' + this.keynum + '&isOrder=' + this.isOrder
					})
				}
			},
			goTransfer: function(e) {
				if(this.type == 2){
					var memberid = uni.getStorageSync('id')
					if(memberid){
						this.showPop = true;
						this.isTransfer = true;
					}else{
						uni.reLaunch({
							url: '../signin/signin?receive=' + this.type +'&cardbag_number=' + this.cardid
						})
					}
				}else{
					uni.navigateTo({
						url: `/pages/shopping/shop?type=1&statutype=exchange&ordernumber=${this.ordernumber}&is_exchange_type=1`
					})
				}
			},
		}
	}
</script>

<style>
	.center{
		background: #FAFAFA;
	}
	.index-img {
		width: 100%;
		height: 350rpx;
	}

	.choose {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	
	.wrapper{
		padding: 0 16rpx;
		box-sizing: border-box;
		font-size: 0;
	}

	.tea {
		display: inline-block;
		width: 50%;
		padding: 0 10rpx;
		box-sizing: border-box;
		margin-bottom: 40rpx;
	}
	.tea>view{
		background-color: #fff;
		box-sizing: border-box;
	}
	.tea-img {
		width: 100%;
		height: 350rpx;
		position: relative;
		/* border: 1px dashed #000; */
	}
	.tea-img .img {
		max-width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.sub {
		color: #fff;
		width: 180rpx;
		border-radius: 15px;
		height: 56rpx;
		line-height: 56rpx!important;
		margin: 0 auto;
		display: block!important;
		background-color: #EC1815;
	}

	.t-title {
		font-weight: bold;
		display: block;
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 8rpx;
	}

	.l-title {
		color: #999;
		font-weight: bold;
		font-size: 24rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 22rpx;
	}
	
	
	.card {
		/* margin-top: 50rpx; */
		/* margin-left: 100rpx; */
		padding-top: 30rpx;
		box-sizing: border-box;
	}
	
	.card input {
		width: 340rpx;
		border: 2rpx solid #999999;
	    height: 76rpx;
	    margin-top: 36rpx;
		/* padding-bottom: 20rpx; */
	    font-size: 26rpx;
	    color: #999999;
	    padding-left: 20rpx;
	}
	
	.sub {
		    display: block;
		    width: 300rpx;
		    background-color: #EC1815;
		    color: #fff;
			font-size: 28rpx;
	}
	
	
	.slider{
		position: fixed;
		right: 0rpx;
		bottom: 8%;
	}
	.lilan {
		/* position: absolute;
		right: -20rpx;
		top: -10rpx; */
	}
	.new-img{
		width: 120rpx;
		height: 120rpx;
	}
	.details-alt-logo{
		width: 120rpx;
		height: auto;
	}
</style>
