<template>
	<view class="payment">
		<view class="z-payment-top">
			<view class="z-payment-top-box">
				<view class="flex flex-center">
					<view style="flex: 1">
						<view class="z-payment-top-title">支付成功</view>
						<view class="z-payment-top-pay">实付 ￥{{orderinfo.orderprice_discount}}</view>
						<view class="z-payment-top-wx">{{payinfo.paymethod}}</view>
					</view>
					<image class="z-payment-top-suc" src="https://zhijianlw.com/static/web/img/icon-success-09-26-01.png" mode="widthFix"></image>
				</view>
				
				<view class="bottom">
					<text class="z-buy"  @click="buy">再次购买</text>
					<text class="z-buy list"  @click="dingdan">查看订单</text>
				</view>
			</view>
		</view>
		
		<view class="z-payment-bottom">
			<view class="z-payment-bottom-hot">
				<text class="z-left-line"></text>
				<text class="z-hot">热卖推荐</text>
				<text class="z-right-line"></text>
			</view>
			<view class="z-payment-bottom-list">
				<view class="z-list1" v-for="item in list1" :key="item.id">
					<view @click="goToDetails(item.keynum)">
						<view class="z-list1_img">
							<image :src="$utils.imageUrl(item.head_img)" mode="" style="width:300rpx;height: 300rpx;"></image>
						</view>
						<view class="z-list-bottom">
							<view class="list1-title">{{item.goodsname}}</view>
							<view class="list1-ltitle">{{item.goodstitle}}</view>
							<!-- <view class="z-price">
								<text style="font-size: 24rpx; color: #FB4133;">￥</text>
								<text class="price">{{item.price}}</text>
								<text class="look" >{{item.buy_count || 0}}人已购</text>
							</view> -->
							<view class="own-other-info-box" v-if="item.level_sign == 1">
								<text class="price-i">￥</text><text style="font-size: 34rpx;color: #FB4133;">{{item.price}}</text>
								<image class="qi" src="../../static/icon_corporate_members.png" mode="widthFix"></image>
							</view>
							<!-- 价格 -->
							<view class="own-price-box">
								<text class="own-discount-price" v-if="item.level_sign == 1">￥{{item.price_level0}}</text>
								<view v-else>
									<text class="price-i">￥</text><text class="own-price" style="font-size: 34rpx;color: #FB4133;">{{item.price}}</text>
								</view>
								<text class="goods-number" v-if="state == 99">已售{{item.buy_count || 0}}件</text>
								<text class="goods-number" v-else>{{item.buy_count || 0}}人已购</text>
							</view>
						</view>
					</view>
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
			  
			  var data = JSON.stringify({
				  a:0,
				  member_level: uni.getStorageSync("level"),
				});
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
			goToDetails(keynum) {
				uni.navigateTo({
					url: "/pages/details/details?keynum="+ keynum
				});
			},
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
	.z-payment-top{
		background: linear-gradient(154deg, #FF3B3B 0%, #FF9E56 100%);
		padding: 160rpx 180rpx 58rpx 138rpx;
		height: auto!important;
	}
	.z-payment-top-box{
		
	}
	.z-payment-top-suc{
		width: 80rpx;
	}
	.z-list1_img{
		border: none;
	}
	.z-payment-top-title{
		color: #fff;
		font-size: 36rpx;
		margin-bottom: 30rpx;
		font-weight: 600;
	}
	.z-payment-top-pay, .z-payment-top-wx{
		color: #fff;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}
	.bottom{
		margin-top: 70rpx;
	}
	.bottom text{
		display: inline-block;
		border: 1px solid #fff;
		border-radius: 32rpx;
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #fff;
		font-size: 26rpx;
		font-weight: 500;
		text-align: center;
	}
	.z-payment-bottom{
		padding: 50rpx 16rpx;
		border-radius: 10rpx 10rpx 0 0;
	}
	.z-payment-bottom-hot{
		text-align: center;
		margin-bottom: 20rpx;
	}
	.z-payment-bottom-hot text{
		display: inline-block;
		vertical-align: middle;
	}
	.z-left-line{
		width: 238rpx;
		height: 2rpx;
		background: linear-gradient(243deg, #CCCCCC 0, rgba(230, 230, 230, 0) 100% );
		border-radius: 3rpx;
	}
	.z-right-line{
		width: 238rpx;
		height: 2rpx;
		background: linear-gradient(243deg, rgba(230, 230, 230, 0) 0%, #CCCCCC 100%);
		border-radius: 3rpx;
	}
	.z-payment-bottom-hot .z-hot{
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin: 0 20rpx;
	}
	.z-payment-bottom-list{
		font-size: 0;
	}
	.z-list1{
		display: inline-block;
		width: 50%;
		padding: 0 10rpx;
		margin-top: 20rpx;
	}
	.z-list1 > view{
		background-color: #fff;
		border-radius: 20rpx;
	}
	.z-list1_img{
		padding: 20rpx;
		/* margin-bottom: 14rpx; */
	}
	.z-list1_img image{
		width: 100%;
	}
	.z-list-bottom{
		padding: 0rpx 20rpx 20rpx;
	}
	
	.z-list-bottom .list1-title{
		margin: 0 0 20rpx;
		color: #333;
		font-size: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.z-list-bottom .list1-ltitle{
		margin: 0 0 20rpx;
		color: #999;
		font-size: 24rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.z-price{
		display: flex;
		align-items: baseline;
	}
	.z-price .price{
		color: #FB4133;
		font-size: 34rpx;
		margin: 0;
		font-weight: bold;
	}
	.z-price .look{
		flex: 1;
		color: #999;
		font-size: 24rpx;
		width: 50%;
		text-align: right;
		display: inline-block;
		margin: 0;
	}
	
	
	.own-other-info-box{
		/* margin: 20rpx 20rpx 16rpx 20rpx; */
	}
	.price-i{
		font-size: 24rpx;
		color: #FB4133;
	}
	.qi{
		width: 40rpx;
		margin-left: 6rpx;
	}
	.own-price-box{
		margin-top: 14rpx;
		/*margin-left: 20rpx;
		margin-right: 20rpx; */
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.own-discount-price{
		font-size: 12px;
		text-decoration: line-through;
		color: #898989;
	}
	.own-price-box .number{
		float: right;
		font-size: 26rpx;
		font-weight: bold;
		color: #999;
	}
	.goods-number{
		font-size: 24rpx;
		color: #999999;
		/* line-height: 33rpx; */
	}
</style>

