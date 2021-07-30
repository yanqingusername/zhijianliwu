<template>
	<view>
		<!-- 状态 -->
		 <view class="logistics-header flex-center" v-if="wuliu.status !=2">
			 <!-- 已完成 -->
			 <view class="logistics-header-content flex-between flex-vertically" v-if="wuliu.status==3">
			 	 <view class="logistics-header-img"><image class="img" src="../../../static/wancheng.png" mode=""></image></view>
			 	 <view class="logistics-header-text">已完成</view>
			 </view>
			 <!-- 待发货 -->
			 <view class="logistics-header-content flex-between flex-vertically " v-if="wuliu.status !=3">
				 <view class="logistics-header-img"><image class="img" src="../../../static/daifahuo.png" mode=""></image></view>
				 <view class="logistics-header-text" v-if="wuliu.status==0">未审核</view>
				 <view class="logistics-header-text" v-else-if="wuliu.status==1">待发货</view>
				 <view class="logistics-header-text" v-else-if="wuliu.status==99">已取消</view>
				 <view class="logistics-header-text" v-else-if="wuliu.status==4">异常订单</view>
			 </view>
		 </view>
		 <!-- 状态 -->
		  <view class="logistics-header"  v-if="wuliu.status==2">
		 	 <!-- 已发货 -->
		 	 <view class="logistics-header-content-other">
		 		 <view class="logistics-header-content-other-top flex-between ">
		 			 <view class="logistics-header-other-top-img"><image class="img" src="../../../static/yifahuo.png" mode=""></image></view>
		 			 <view  class="logistics-header-other-top-text">已发货</view>
		 		 </view>
		 		 <view class="logistics-header-content-other-btm">美好总会如期而至</view>
		 	 </view>
		  </view>
		<!-- 温馨提示 -->
		 <!-- <view class="logistics-tips">
			 温馨提示:若倒计时<span>{{timese}}</span>结束仍未收到货,我们将给您优惠券红包补偿.
		 </view> -->
		<!-- 地址 -->
		 <view class="logistics-add flex-center" >
			 <view class="logistics-add-content flex">
				 <view class="logistics-add-img"><image class="img" src="../../../static/add.png" mode=""></image></view>
			     <view class="logistics-add-img-text">
					 <view class="logistics-add-name">{{wuliu.linkman}}  {{wuliu.linktel}}</view>
					 <view class="logistics-adder">{{wuliu.province}}  {{wuliu.city}}  {{wuliu.county}}  {{wuliu.address}} </view>
				 </view>
			 </view>
		 </view>
		<!-- 包裹 -->
		 <view class="logistics-number">
			  <!-- 物流信息 -->
			  <view class="logistics-number-information">
				   <view class="logistics-number-information-li flex" v-for="(item,index) in wuliu.wuliu_info" :key="index">
					   <view class="logistics-number-circular"></view>
					   <view class="logistics-number-text">
						   <view class="logistics-number-alt">{{item.context}}</view>
						   <view class="logistics-number-time">{{item.ftime}}</view>
					   </view>
				   </view>
			  </view>
		 </view>
		<view @click="$buttonClick(index)" class="gift-content-index">首页</view>
	</view>
</template>

<script>
	import config from '../../../common/config.js';
	export default {
		data() {
			return {
				// commody:[
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// 	{src:'../../static/commodity.jpg',alt:'湖北叫小甘 鲜桃礼盒 兑换电子卡券免密码配送到家撒大声地',label:'合作伙伴',label1:'5.0折',discount:'¥100.00',price:'¥200.00'},
				// ],
				commody:[],
				wuliu:'',
				nav:'0',
				cardbag_detail_id:'',
				countdown:'',
				timese:'无法更改',
				choose:true,
				ordernumber:'',
				Interval:'',
				list:[],
				showa:'',
				list_length:'',
				url: ''
			}
		}, 
		onShow:function(){
			if(this.showa == 1){
				if(this.cardbag_number){
					 this.logistics();
				}
			}
		},
		onHide:function(e){
			clearInterval(this.Interval);
		},
		onUnload:function(e){
			clearInterval(this.Interval);
		},
		onLoad:function(e){
			this.url = config.URL;
			this.memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				memberid: this.memberid,
				ordernumber: e.ordernumber
			});
			let action = 'get_order_info';
			
			this.$utils.post(action,data).then(res=>{
				this.wuliu = res.orderinfo;
				this.wuliu.wuliu_info = JSON.parse(res.orderinfo.wuliu_info);
				console.log(this.wuliu_info);
			})
			
			
		},  
		methods: {
			index:function(e){
				clearInterval(this.Interval);
				uni.switchTab({
					url:'../index/index'
				})
			},
			// 切换礼包
			choo:function(e){
				this.clear();
				this.cardbag_detail_id = e.currentTarget.dataset.id;
				this.nav = e.currentTarget.dataset.index;
				this.logistics()
			},
			// 物流信息
			logistics:function(e){
				let data = '{"cardbag_number":"'+this.cardbag_number+'","cardbag_detail_id":"'+this.cardbag_detail_id+'"}';
				console.log(data)
				let action = 'get_cardbag_detail';
							
				this.$utils.post(action,data).then(res=>{
					console.log('礼包详情',res)
					
					
					if(res.orderinfo){
						this.ordernumber = res.orderinfo.ordernumber
						res.orderinfo.wuliu_info = JSON.parse(res.orderinfo.wuliu_info)
					}
					
					this.wuliu = res.orderinfo
					
				})
			},
		}
	}
</script>

<style>
page{
	background-color: #F2F6F9;
}
.index-commodity{
	background-color: #F5F5F5;
	margin: 0;
	padding: 0 4% 0 4%;
}
.active{
	border-bottom:5rpx solid #DB2528;
}
.logistics-number-information {
    padding: 36rpx;
}
.logistics-header-content-other-btm{
	text-align: center;
}
.logistics-header-content-other {
    width: min-content;
}
</style>