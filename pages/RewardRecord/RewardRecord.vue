<template>
	<view>
		<view class="record-img">
			<image src="../../static/touxiang.jpg" mode=""></image>
			<view class="record-text">朱孟存</view>
		</view>
		<view class="record">
			<view class="record-top">奖励记录</view>
			<view class="record-li flex-between"  :data-index="index" :class="[index==current?'record-li-border':'']"  v-for="(item,index) in record" :key="index">
				<view class="record-left">
					<view class="record-left-title">{{item.title}}</view>
					<view class="record-left-time">{{item.time}}</view>
				</view>
				<view class="record-right flex-vertically">
					<view class="record-left-price record-li-margin"><span>¥{{item.price}}</span></view>
				</view>
			</view>
		</view>
		<view class="record-bottom">已经到底了~</view>
	</view>
</template>

<script> 
	export default{
		data(){
			return{
				record:[],
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
