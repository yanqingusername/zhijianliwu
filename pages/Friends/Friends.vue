<template>
	<view class="friends" style="width: 100%;">
		<!-- 搜索 -->
		<view class="friends-head flex-vertically  none">
			<view class="friends-head-left"><image  src="../../static/friends-search.png" mode=""></image></view>
			<view class="friends-head-input"><input placeholder="输入微信名或微信号查询你的好友" type="text" value="" /></view>
		</view>
		<!-- 选项卡 -->
		<view class="friends-nav flex-vertically">
			<view class="friends-nav-left" @click="left" data-index='0' :class="[number==0?'friends-nav-left-active':'']">我的好友</view>
			<view class="friends-nav-line"></view>
			<view class="friends-nav-left" @click="left" data-index='1' :class="[number==1?'friends-nav-left-active':'']">会员等级</view>
		</view> 
		<!-- 我的好友 -->
		 <view class="friends-my-content" v-if="true">
			<view class="friends-my-li flex-vertically" v-for="(item,index) in [0]" :key="index">
			 <view class="friends-my-img"><image :src="$utils.imageUrl(item.head_img)" mode=""></image></view>
			 <view class="friends-my-alt">
				 <view class="friends-my-name">{{item.name}}</view>
				 <view class="friends-my-time">{{item.add_time}}</view>
			 </view>
			 <view class="friends-my-price"></view>
			 <view class="friends-my-price" v-if="item.zj_balance>0">+{{item.zj_balance}}</view>
			 <view class="friends-my-right none"><image src="../../static/friends-right.png" mode=""></image></view>
			</view>
		 </view>
		 
		<!-- 会员等级 -->
		<view class="friends-my-content" v-else>
		    <view class="friends-my-li flex-vertically" v-for="(item,index) in friends" :key="index">
		      <view class="friends-my-img"><image :src="item.head_img" mode=""></image></view>
		      <view class="friends-my-alt">
			      <view class="friends-my-name">{{item.name}}</view>
				  <view class="friends-my-time">{{item.add_time}}</view>
		      </view>
			  <view class="friends-my-images flex-vertically">
				  <view class="friends-my-images-left"><image src="../../static/friends-img.png"  mode=""></image></view>
				  <view class="friends-my-images-right">{{item.level_name}}</view>
			  </view>
		    </view>
		</view>
		
		 <view class="no-btm" v-if="friends.length==0">
					   	<image class="img" src="../../static/nobtm.jpg" mode=""></image>
					   </view>
					   <view v-else>
					   	<view class="record-bottom">已经到底了~</view>
					   </view>
		
	</view>
</template>

<script>
	export default {   
		data() {
			return {
				friends:[],
				number:0,
			}
		},
		onLoad:function(){
			var that = this;
			var id = uni.getStorageSync('id');
			var data = '{"memberid":"'+id+'"}';
			var action = 'get_my_member';
			
			this.$utils.post(action,data).then(res=>{ 
				console.log('我的好友',res)
				for(let i in res.rs){
					
					var dateTime = new Date(parseInt(res.rs[i].add_time) * 1000)
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
					 res.rs[i].add_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
					 
					if(res.rs[i].level == 1){
						res.rs[i].level_name = '普通会员';
					}
					else if(res.rs[i].level == 2){
						res.rs[i].level_name = '指间会员';
					}
					else if(res.rs[i].level == 3){
						res.rs[i].level_name = 'plus会员';
					}
					else if(res.rs[i].level == 4){
						res.rs[i].level_name = '企业会员';
					}
					else if(res.rs[i].level == 5){
						res.rs[i].level_name = '合作伙伴';
					}
				}
				
				that.friends = res.rs;
			})
			
			
		},
		methods: {
			left:function(e){
				const index = e.currentTarget.dataset.index;
				this.number = index;
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F5F7;
	}
</style>
