<template>
	<view>
		<view class="record">
			<view class="record-top">充值明细</view>
			<view class="record-li flex-between"  :data-index="index" :class="[index==current?'record-li-border':'']"  v-for="(item,index) in record" :key="index">
				<view class="record-left">
					<view class="record-left-title">{{item.title}}</view>
					<view class="record-left-time">{{item.time}}</view>
				</view>
				<view class="record-right"  :class="[item.title=='商城充值'?'':'flex-vertically']">
					<view class="record-left-price" :class="[item.title=='商城充值'?'':'record-li-margin']"><span>¥{{item.price}}</span></view>
					<view class="record-left-add" v-if="item.title==='商城充值'">+{{item.add}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	export default{
		data(){
			return{
				record:[
					{title:'商城充值',time:'2020-06-19 09:39:12',price:'200.00',add:'15.00'},
					{title:'商城充值',time:'2020-06-19 09:39:12',price:'200.00',add:'15.00'},
					{title:'商城充值',time:'2020-06-19 09:39:12',price:'200.00',add:'15.00'},
					{title:'线下充值',time:'2020-06-19 09:39:12',price:'200.00',add:'15.00'},
				],
				current:''
			}
		},
		methods:{
			
		}
	}
</script>

<style>
page{
	background-color: #F4F5F7;
}
</style>
