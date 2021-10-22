<template>
	<view class="collection">
		<view class="fication-content-right-li flex-between" v-for = '(item,index) in commodity' :key="index" >
						   <image class="fication-img" :src="$utils.imageUrl(item.head_img)"  mode="" :data-index="item.keynum"  @click="details" ></image>
						   <view class="fication-introduce"  >
							   <view class="fication-introduce-title" :data-index="item.keynum"  @click="details">{{item.goodsname}}</view>
							   <view class="fication-introduce-alt" :data-index="item.keynum"  @click="details"></view>
							   
							   <!-- 普通会员隐藏 -->
							   <view class="fication-introduce-activity flex" v-if="level==1" :data-index="item.keynum"  @click="details">
							   								   
							   </view>
							   <!-- 其他会员显示 -->
							   <view class="fication-introduce-activity flex" v-else :data-index="item.keynum"  @click="details">
								   <view class="fication-activity-grad">{{level_name}}</view>
								   <view class="fication-activity-grad"  v-if="level_name == '普通会员'"></view>
								   <view class="fication-activity-grad"  v-else-if="level_name == '指间会员'">{{item.discount_name1}}</view>
								   <view class="fication-activity-grad"  v-else-if="level_name == 'plus会员'">{{item.discount_name2}}</view>
								   <view class="fication-activity-grad"  v-else-if="level_name == '企业会员'">{{item.discount_name3}}</view>
								   <view class="fication-activity-grad"  v-else-if="level_name == '合作伙伴'">{{item.discount_name4}}</view>
								   <view class="fication-activity-grad1">折后价</view>
								   <view class="fication-activity-original" v-if="level_name == '普通会员'">¥{{item.price_level0}}</view>
								   <view class="fication-activity-original" v-else-if="level_name == '指间会员'">¥{{item.price_level1}}</view>
								   <view class="fication-activity-original" v-else-if="level_name == 'plus会员'">¥{{item.price_level2}}</view>
								   <view class="fication-activity-original" v-else-if="level_name == '企业会员'">¥{{item.price_level3}}</view>
								   <view class="fication-activity-original" v-else-if="level_name == '合作伙伴'">¥{{item.price_level4}}</view>
								   <view class="fication-activity-original" v-else>¥{{item.price}}</view>
							   </view>
							   
							   
							   <view class="fication-introduce-bottom flex-between">
								   <view class="fication-introduce-bottom-price">{{item.price}}</view>
								   <image class="fication-introduce-bottom-img" :data-id="item.id" @click="give" src="https://zhijianlw.com/static/web/img/give.jpg" mode=""></image>
							   </view>
						   </view>
		</view>		
		 <view class="no-btm" v-if="commodity.length==0">
					   	<image class="img" src="../../static/nobtm.jpg" mode=""></image>
					   </view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				commodity:[],
				level:'',
				level_name:'',
				discount_name:'',
				id:'',
				showa:'',
				url: ""
			}
		},
		onShow:function(){
		  if(this.showa == 1){
			  this.id = uni.getStorageSync('id')
			  this.level = uni.getStorageSync('level')
			  this.level_name = uni.getStorageSync('level_name')
			  this.discount_name = uni.getStorageSync('discount_name')
			  let id = uni.getStorageSync('id')
			  let data = '{"memberid":"'+id+'"}';
			  let action = 'get_goods_collect';
			  	  	  
			    this.$utils.post(action,data).then(res=>{
			  		console.log('收藏列表',res)
					for(let i in res.rs){ 
													
						res.rs[i].discount_name1 = (res.rs[i].price_level1/res.rs[i].price*10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2/res.rs[i].price*10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3/res.rs[i].price*10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4/res.rs[i].price*10).toFixed(1) + '折';
					}
			  	    	this.commodity = res.rs					 
			  		})
		  }
		
		},
		onLoad:function(e){
			this.url = config.URL;
			let that = this
			let time = setTimeout(function(e){
				that.showa = 1;
				clearTimeout(time)
			},100)
			
			this.id = uni.getStorageSync('id')
			this.level = uni.getStorageSync('level')
			this.level_name = uni.getStorageSync('level_name')
			this.discount_name = uni.getStorageSync('discount_name')
			let id = uni.getStorageSync('id')
			let data = '{"memberid":"'+id+'"}';
			let action = 'get_goods_collect';
				  	    
			  this.$utils.post(action,data).then(res=>{
					console.log('收藏列表',res)
					
					for(let i in res.rs){
													
						res.rs[i].discount_name1 = (res.rs[i].price_level1/res.rs[i].price*10).toFixed(1) + '折';
						res.rs[i].discount_name2 = (res.rs[i].price_level2/res.rs[i].price*10).toFixed(1) + '折';
						res.rs[i].discount_name3 = (res.rs[i].price_level3/res.rs[i].price*10).toFixed(1) + '折';
						res.rs[i].discount_name4 = (res.rs[i].price_level4/res.rs[i].price*10).toFixed(1) + '折';
						
					} 
					
				    	this.commodity = res.rs					 
					})
		},
		methods: {
			give:function(e){
			   
			 
				   let goodsid = e.currentTarget.dataset.id;
				   var data = '{"memberid":"'+this.id+'","goodsid":"'+goodsid+'","goodsnum":"1"}';
				   var action = 'add_goods_to_giftbag';
				   	  	  
				     this.$utils.post(action,data).then(res=>{
				   					 console.log('添加购物车',res)
									 uni.navigateTo({
									 	url:'../shopping/shop'
									 })
				   					
				   				 })	   		
			},
			// 商品
			details:function(e){
					let index = e.currentTarget.dataset.index;
					  uni.navigateTo({
					 	 url:'/pages/details/details?keynum=' + index,
					  })  	
			},
		}
	}
</script>

<style>
page{
	background-color: #F4F5F7;
}
.collection{
	width: 708rpx;
	margin: 0 auto;
	padding-top: 22rpx;
}
  .fication-content-right-li{
	  width: 708rpx;
	  height: 255rpx;
	  padding-top: 0;
	  margin-bottom: 10rpx;
	  border:none;
	  background-color: #FFF;
	  border-radius: 6rpx;

  }
  .fication-img {
	margin-top: 19rpx;
	margin-left: 21rpx;
	margin-right: 15rpx;
    width: 216rpx;
    height: 216rpx;
  }
  .fication-introduce{
	  width: 418rpx;
	  height: 210rpx;
  }
  .fication-introduce-title{
	  margin:14rpx 0 15rpx 0;
  }
  .fication-introduce-alt{
	  width: 409rpx;
	  font-size: 28rpx;
	  color: #8A8A8A;
	  line-height: 28rpx;
	  margin-bottom: 30rpx;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;

  }
   .fication-introduce-activity{
	   width: 409rpx;
	   height: 33rpx;
	   margin-bottom: 21rpx;
   }
  .fication-introduce-bottom {
     width: 409rpx;
     height: 44rpx;
  }
  .fication-introduce-bottom-price {
  font-size: 30rpx;
  line-height: 44rpx;
  color: #FF0137;
  font-weight: bold;
  
  }
  .fication-introduce-bottom-img {
  width: 132rpx;
  height: 42rpx;
  }
.fication-activity-grad{
	line-height: 17rpx;
}
</style>
