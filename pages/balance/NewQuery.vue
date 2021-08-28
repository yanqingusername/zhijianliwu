<template>
	<view>
		<view class="query-record">
			<view class="query-record-li flex-between"  :data-index="index"   v-for="(item,index) in arrList" :key="index">
					<view class="record-left">
						<view class="record-left-title">{{item.desc}}</view>
						<view class="record-left-time">{{item.time}}</view>
					</view>
					<view class="query-record-right">
						<view class="record-left-add" v-if="item.type==2">-{{item.money}}</view>
						<view class="record-left-add" v-if="item.type==0">+{{item.money}}</view>
						<view class="record-left-add" v-if="item.type==1">-{{item.money}}</view>
						<view class="record-left-price">{{item.balance}}</view>
					</view>  
			</view>
		</view> 
		<!-- <view class="no-btm" v-if="arr.length==0">
			<image class="img" src="../../static/nobtm.jpg" mode=""></image>
		</view> -->
	</view>
</template>

<script>   
	export default{
		data(){
			return{
				record:[],
				current:'',
				arr:[],
				arrList:[
					{
						"type": 1,
						"desc": "支付-订单号20212331321",
						"money": " 100.00",
						"time": "2021-04-23 12:23:10",
						"balance": "余额 500.00"
					},
					{
						"type": 0,
						"desc": "充值-订单号20212331321",
						"money": " 100.00",
						"time": "2021-04-22 12:23:10",
						"balance": "余额 600.00"
					},
					{
						"type": 0,
						"desc": "退款-订单号20212331321",
						"money": " 400.00",
						"time": "2021-04-29 12:23:10",
						"balance": "余额 1000.00"
					},
					{
						"type": 0,
						"desc": "退款-订单号20212331321",
						"money": " 1000.00",
						"time": "2021-05-10 12:23:10",
						"balance": "余额 2000.00"
					}
				],
			}
		},
		onLoad:function(){ 
			var that = this;
			var id = uni.getStorageSync('id');
			var data = '{"memberid":"'+id+'"}';
			var action = 'get_balance_log';
			
			this.$utils.post(action,data).then(res=>{ 
				// console.log('余额变更记录',res)
				
				if(res.rs.length > 0){
					
				  for(let z in res.rs){
					  
					  var dateTime = new Date(parseInt(res.rs[z].time) * 1000)
					   var year = dateTime.getFullYear();
					   var month = dateTime.getMonth() + 1;
					   var day = dateTime.getDate();
					   var hour = dateTime.getHours();
					   var minute = dateTime.getMinutes();
					   var second = dateTime.getSeconds();
					   if(hour<10){
					        hour = '0' + hour;
					    }
					   if(minute<10){
					       minute = '0' + minute;
					   }
					   if(second<10){
					       second = '0' + second;
					   }
					   var now = new Date();
					   var now_new = Date.parse(now.toDateString());
					   var milliseconds = now_new - dateTime;
					   res.rs[z].time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
					   
					  if(res.rs[z].balance_type == 0){
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
	background-color: #FFFFFF;
}

.query-record {
    width: 688rpx;
    margin: 0 auto;
    background-color: #FFF;
}

.query-record-li {
    padding: 30rpx 0rpx 10rpx 0rpx;
    border-bottom: 2rpx solid #F4F5F7;
}

.record-left-title {
    margin-bottom: 13rpx;
    text-align: left;
    overflow: hidden;
	height: 42rpx;
	font-size: 30rpx;
	color: #333333;
	line-height: 42rpx;
}


.record-left-time {
    text-align: left;
	font-size: 26rpx;
	color: #666666;
	line-height: 37rpx;
	margin-top: 16rpx;
}

.record-left-add {
    font-size: 18rpx;
    text-align: right;
}

.record-left-add {
    height: 42rpx;
    font-size: 30rpx;
    color: #333333;
    line-height: 42rpx;
    text-align: right;
}

.record-left-price {
    margin-top: 18rpx;
    text-align: right;
	height: 37rpx;
	font-size: 26rpx;
	color: #666666;
	line-height: 37rpx;
}

</style>
