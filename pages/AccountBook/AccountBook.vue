<template>
	<view>
		<view class="record">
			<view class="record-top">收支明细</view>
			<view class="record-li flex-between"  :data-index="index" :class="[index==current?'<record-li-borde></record-li-borde>r':'']"  v-for="(item,index) in arr" :key="index">
				<view class="record-left">
					<view class="record-left-title">{{item.desc}}</view>
					<view class="record-left-time">{{item.time}}</view>
				</view>
				<view class="record-right flex-vertically">
					<view class="record-left-price record-li-margin" v-if="item.type==2">-{{item.balance}}</view>
					<view class="record-left-price record-li-margin" v-if="item.type==0">+{{item.balance}}</view>
					<view class="record-left-price record-li-margin" v-if="item.type==1">-{{item.balance}}</view>
				</view>
			</view>
		</view>
		
		
		  <view class="no-btm" v-if="arr.length==0">
					   	<image class="img" src="../../static/nobtm.jpg" mode=""></image>
					   </view>
	</view>
</template>

<script> 
	export default{
		data(){
			return{
				record:[],
				current:'',
				arr:[]
			}
		},
		onLoad:function(){
			var that = this;
			var id = uni.getStorageSync('id');
			var data = '{"memberid":"'+id+'"}';
			var action = 'get_balance_log';
			
			this.$utils.post(action,data).then(res=>{ 
				
				if(res.rs.length > 0){
					
				  for(let z in res.rs){
					  
					  var dateTime = new Date(parseInt(res.rs[z].time) * 1000)
					   var year = dateTime.getFullYear();
					   var month = dateTime.getMonth() + 1;
					   var day = dateTime.getDate();
					   var hour = dateTime.getHours();
					   var minute = dateTime.getMinutes();
					   var second = dateTime.getSeconds();
					   var now = new Date();
					   var now_new = Date.parse(now.toDateString());
					   var milliseconds = now_new - dateTime;
					   if(hour<10){
					        hour = '0' + hour;
					    }
					   if(minute<10){
					       minute = '0' + minute;
					   }
					   if(second<10){
					       second = '0' + second;
					   }
					   res.rs[z].time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
					   
					   
					   if(res.rs[z].balance_type == 1){
						   
						   res.rs[z].balance =  res.rs[z].balance;
						   that.arr.unshift(res.rs[z])
						   
					   }				  
				  }
				  
				}  
				})
		},
		
	}
</script>

<style>
page{
	background-color: #F4F5F7;
}
</style>
