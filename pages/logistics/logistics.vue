<template>
	<view>
		<!-- 状态 -->
		 <view class="logistics-header flex-center" v-if="wuliu.status !=2">
			 <!-- 已完成 -->
			 <view class="logistics-header-content flex-between flex-vertically" v-if="wuliu.status==3">
			 	 <view class="logistics-header-img"><image class="img" src="https://zhijianlw.com/static/web/img/wancheng.png" mode=""></image></view>
			 	 <view class="logistics-header-text">已完成</view>
			 </view>
			 <!-- 待发货 -->
			 <view class="logistics-header-content flex-between flex-vertically " v-if="wuliu.status !=3">
				 <view class="logistics-header-img"><image class="img" src="../../static/daifahuo.png" mode=""></image></view>
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
		 			 <view class="logistics-header-other-top-img"><image class="img" src="../../static/yifahuo.png" mode=""></image></view>
		 			 <view  class="logistics-header-other-top-text">已发货</view>
		 		 </view>
		 		 <view class="logistics-header-content-other-btm">礼物身向你飞奔而来。。。。</view>
		 	 </view>
		  </view>
		<!-- 温馨提示 -->
		 <!-- <view class="logistics-tips">
			 温馨提示:若倒计时<span>{{timese}}</span>结束仍未收到货,我们将给您优惠券红包补偿.
		 </view> -->
		<!-- 地址 -->
		 <view class="logistics-add flex-center" >
			 <view class="logistics-add-content flex">
				 <view class="logistics-add-img"><image class="img" src="https://zhijianlw.com/static/web/img/add.png" mode=""></image></view>
			     <view class="logistics-add-img-text">
					 <view class="logistics-add-name">{{wuliu.linkman}}  {{wuliu.linktel}}</view>
					 <view class="logistics-adder">{{wuliu.province}}  {{wuliu.city}}  {{wuliu.county}}  {{wuliu.address}} </view>
				 </view>
			 </view>
		 </view>
		<!-- 包裹 -->
		 <view class="logistics-number">
			  <view class="logistics-number-title">礼物已经被拆分为<span>{{list_length}}</span>个包裹</view>
			  <!-- 包裹 -->
			  <scroll-view scroll-x="true"  class="logistics-number-scroll">
			  	<view class="flex">
					<view class="flex">
						<view class="logistics-number-scroll-li"  v-for = "(item,index) in list" :key="index"  >
							<view class="logistics-number-top" @click="choo"  :class="[nav==index?'active':'']"  :data-id="item.id" :data-index="index">礼包{{item.index}}</view>
							<view class="logistics-number-commodity margin-auto"><image class="img" :src="$utils.imageUrl(item.goodsinfo[0].head_img)" mode=""></image></view>
						</view>
					</view>
				</view>
			  </scroll-view>
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
		<!-- 查看更多好礼物 -->
		 <view class="logistics-top none">查看更多好礼物</view>
		<!-- 商品 -->
			<view class="index-commodity margin-auto flex-between-wrap none">
				<view class="index-commodity-li" v-for="(item,index) in list" :key="index">
				  <view class="index-commodity-auto margin-auto">
					  <image class="index-commodity-img" :src="$utils.imageUrl(item.src)" mode=""></image>
					  <view class="index-commodity-alt">{{item.alt}}</view>
					  
					  <view class="index-commodity-label flex">
					  	<view class="index-label-left">{{item.label}}</view>
					  	<view class="index-label-left">{{item.label1}}</view>
					  	<view class="index-label-discount">{{item.discount}}</view>
					  </view>
					  
					  <view class="index-commodity-bottom flex-between">
					  	<view class="index-bottom-price">{{item.price}}</view>
					  	<view class="index-bottom-give"><image class="index-bottom-img" src="https://zhijianlw.com/static/web/img/give.jpg" mode=""></image></view>
					  </view>
				  </view>
				</view>
			</view>
			<view @click="$buttonClick(index)" class="gift-content-index">首页</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
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
			let arr = [];
			setTimeout(function(e){
				this.showa == 1
			},200)
			
			clearInterval(this.Interval);
			this.cardbag_number = e.cardbag_number;
			
			let data = '{"cardbag_number":"'+e.cardbag_number+'"}';
			let action = 'get_cardbag_fenshu';
			
			this.$utils.post(action,data).then(res=>{
				console.log('礼包子份数',res)
				this.commody = res.rs;
				
                 for(let i in res.rs){
			 		if(res.rs[i].status == 1){
			 				res.rs[i].index = Number(i) + 1;
			 				arr.push(res.rs[i])
			 			}
			 		}
				
				this.list = arr;
				
				this.list_length = arr.length;
				this.cardbag_detail_id = res.rs[0].id;
				// 子礼包详情
				this.logistics();
				
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
				let merberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					cardbag_number: this.cardbag_number,
					cardbag_detail_id: this.cardbag_detail_id,
					merberid: merberid
				})
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
			// add:function(e){
			// 	console.log(this.choose)
			// 	if(this.choose == true){
			// 		uni.navigateTo({
			// 			url:'../Add/Add?ordernumber=' + this.ordernumber
			// 		})
			// 	}else{
			// 		uni.showToast({
			// 			title:'超时,无法更改',
			// 			icon:'none'
			// 		})
			// 	}
			// },
			
			// num:function(e){
				
				
			// 	let that = this;
				
			// 	let time = this.countdown.split(':');
				
				
				
				
			
				
			// 	this.Interval = setInterval(function(e){
			// 		console.log('执行')
					
					
			// 		time[1]--;  
			// 		if(time[1] == -1){
			// 			if(time[0]!=0){
			// 				time[1] = 59;
			// 				time[0]--;
			// 			}else{
			// 				time[1] = 0;
			// 				time[0] = 0;
			// 				that.choose = false;
			// 				that.clear();
							
			// 			}
			// 		}
					
			// 		let minute = time[0];
			// 		let second = time[1];
					
			// 		// 前面加个0
			// 		if(time[0]<10){
			// 			 minute =  '0' + time[0];
			// 		}
					
			// 		if(time[1]<10){
			// 			 second = '0' + time[1];
			// 		}
					
			// 		// 渲染一下
			// 		that.timese = minute + ':' + second;
					
			// 		console.log(that.timese)
					
			// 	},1000)
				

				
			// },
			// clear:function(e){
			//   clearInterval(this.Interval);	
			// }
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
</style>


