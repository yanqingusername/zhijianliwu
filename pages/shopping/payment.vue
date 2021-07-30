<template>
	<view class="payment">
		<view class="payment-top">
			<text class="payment-top-title">支付成功</text>
			<text class="payment-top-pay">实付 ￥{{orderinfo.orderprice_discount}}</text>
			<text class="payment-top-wx">{{payinfo.paymethod}}</text>
			<image class="payment-top-suc" :src="$utils.osspath_url('/xcx-static/payment/success.png')" mode=""></image>
			<text class="buy"  @click="buy">再次购买</text>
			<text class="buy list"  @click="dingdan">查看订单</text>
		</view>
		<view class="payment-bottom">
			<view>
				<view class="left-line"></view>
				<text class="hot">热卖推荐</text>
				<view class="right-line"></view>
			</view>
			<view class="payment-bottom-list">
				<view class="list1" v-for="item in list1" :key="item.id">
					<image class="list1_img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
					<text class="list1-title">{{item.goodsname}}</text>
					<text class="list1-ltitle">{{item.goodstitle}}</text>
					<text class="price">{{item.price}}</text>
					<text class="look">267人已购</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				price_zhe:0,
				list1:[],
				payinfo:{},
				orderinfo:{}
			}
		},
		onLoad:function(e){
			let type=e.type
			let price_zhe = uni.getStorageSync('price_zhe');
			this.price_zhe = price_zhe;
			let memberid = uni.getStorageSync('memberid');
			this.memberid = memberid;
			var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
			
			var action = 'get_buy_shopping_cart';				  	  
			 this.$utils.post(action,data).then(res=>{
				 console.log('商品信息',res)
			  })
			  
			  var data = JSON.stringify({a:0});
			  var action = 'get_tuijian_goods';
			  this.$utils.post(action, data).then(res => {
			  	console.log("推荐商品：",res);
			  	this.list1 = res.rs;
			  });
			  
			//获取订单详情
			let ordernumber = e.ordernumber
			let uid=uni.getStorageSync('id')
			let data1 = '{"ordernumber":"' + ordernumber + '","memberid":"'+uid+'"}';
			var action = 'get_order_info';
			this.$utils.post(action, data1).then(res => {
				console.log(res)
				this.payinfo=res.payinfo
				this.orderinfo=res.orderinfo
			})
			  
			  
			  
			  
		},
		methods:{
			buy:function(e){
					uni.reLaunch({
					   url:'../index/index'
					 })
					
					
			},
			dingdan:function(e){
				uni.navigateTo({
					url:'../orderList/orderList'
				})
			}
		}
	}
</script>

<style>
	@import '@/common/payment.css';
</style>
