<template>
	<view>
		<uni-swipe-action>
			<view v-for="(item,index) in add" :key="index">
				
				<uni-swipe-action-item :right-options="options" @click="onClick($event, index,item.id)" @change="swipeChange($event, index,item.id)">
					<view class="new-logistics-add flex-center" >
						<view class="logistics-add-content flex-vertically" style="width: 750rpx;height: 100rpx;">
								<!-- <view class="logistics-add-img" :data-index="index"  @click="choose"><image class="img" src="../../static/add.png" mode=""></image></view> -->
								<view class="logistics-add-img-text" style="width: 630rpx;margin-left: 40rpx;flex-direction: column;justify-content: center;height: 100rpx;" :data-index="item.id" :data-linkman="item.linkman"
									:data-linktel="item.linktel" :data-address ="item.province_name+' '+item.city_name+' '+item.county_name+' '+item.address"@click="choose">
									<view class="logistics-add-name" style="display: flex;align-items: center;font-size: 32rpx;font-weight: bold;color: #333333;">{{item.linkman}}  {{item.linktel}} <view v-if="item.is_default ==1" class="logistics-default">默认</view></view>
									<view class="logistics-adder" style="margin-top: 18rpx;font-size: 28rpx;color: #666666;">{{item.province_name}}  {{item.city_name}}  {{item.county_name}}  {{item.address}}</view>
								</view>
								<!-- <view class="logistics-delete" @click="del" :data-index="index" :data-id="item.id"><image class="img" src="../../static/delete.png" mode=""></image></view> -->
								<view class="logistics-delete" @click="modify" style="margin-left: 0rpx;" :data-index="index" ><image class="img" src="https://zhijianlw.com/static/web/img/icon_edit_09_16_01.png" mode="" style="width: 40rpx;height: 40rpx;"></image></view>
						</view>
						<view style="width: 700rpx;height: 1px;background: #E6E6E6;margin-top: 24rpx;"></view>
					</view>
				</uni-swipe-action-item>
				
		    </view>
		</uni-swipe-action>
		
		<view class="logistics-button-view">
			<view class="logistics-button" @click="addto">
				<image class="logistics-button-img" src="https://zhijianlw.com/static/web/img/icon_xm_09_15_02.png"></image>
				<view class="logistics-button-text">新增地址</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				add:'',
				cardbag_number:'',
				logistics:'',
				options:[
				       {
				            text: '删除',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }
				      ]
			}
		},
		onShow:function(e){
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			
			
			var data = '{"memberid":"'+memberid+'"}';
			var action = 'get_member_area';
			 this.$utils.post(action,data).then(res=>{
				 this.add = res.rs
			 })
			 
		},
		onLoad:function(e){	
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			var data = '{"memberid":"'+memberid+'"}';
			
			var action = 'get_member_area';
								  	  
			 this.$utils.post(action,data).then(res=>{
				 this.add = res.rs
			 })
			 
			 // 选择地址
			 if(e.cardbag_number){
				 // console.log('来选择地址的');
				 this.cardbag_number = e.cardbag_number;
			 }
			 // 更改地址
			 else if(e.ordernumber){
				 this.ordernumber = e.ordernumber;
			 }
		},
		methods: {
			onClick(e,index,id ){
				uni.showModal({
					title:'地址',
					content:'是否要删除地址',
					success:(res) =>{
						if (res.confirm) {
								  var data = '{"member_area_id":"'+id+'"}';
								  var action = 'del_member_area';
																  	  
								this.$utils.post(action,data).then(res=>{
												 if(res.sta == 1){
													 this.add.splice(index,1)
												 }
								})
								
						    } else if (res.cancel) {
						        // console.log('用户点击取消');
						    }
					}
				})
			},
			swipeChange(e,index,id){
			},
			// 选择地址
			choose:function(e){
				let index = e.currentTarget.dataset.index;
				let linkman = e.currentTarget.dataset.linkman;
				let linktel = e.currentTarget.dataset.linktel;
				let address = e.currentTarget.dataset.address;
				console.log("linktel:",linktel);
				// 缓存地址
				if(this.cardbag_number.length>0){
					// console.log('选择地址返回')
					uni.setStorageSync('member_area_id',index);
					uni.setStorageSync('member_area_linkman',linkman);
					uni.setStorageSync('member_area_linktel',linktel);
					uni.setStorageSync('member_area_address',address);
					
					uni.navigateBack({
						delta:1
					})
				}
			
			},
			// 删除地址
			del:function(e){
				let id = e.currentTarget.dataset.id;
				let index = e.currentTarget.dataset.index;
				
				
				uni.showModal({
					title:'地址',
					content:'是否要删除地址',
					success:(res) =>{
						if (res.confirm) {
								  var data = '{"member_area_id":"'+id+'"}';
								  var action = 'del_member_area';
																  	  
								this.$utils.post(action,data).then(res=>{
												 if(res.sta == 1){
													 this.add.splice(index,1)
												 }
								})
								
						    } else if (res.cancel) {
						        // console.log('用户点击取消');
						    }
					}
				})
				
			   
			},
			// 修改地址
			modify:function(e){
				let index = e.currentTarget.dataset.index;
				let add = this.add[index];
				uni.setStorageSync('add',add)
				uni.navigateTo({
					url:'../Address/Address?modify=' + 1 + '&index=' + index
				})
			},
		// 添加地址
		 addto:function(e){
				uni.navigateTo({
					url:'../Address/Address?addto=' + 1
				}) 
		 }
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
.new-logistics-add {
    width: 100%;
        /* height: 160rpx; */
        /* border-top: 2rpx solid #F1F5F4; */
        /* border-bttom: 2rpx soild #F4F4F4; */
        background-color: #FFF;
        position: relative;
        flex-direction: column;
        margin-top: 30rpx;
}
.logistics-delete{
	width: 68rpx;
	height: 68rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.logistics-button-view{
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 50rpx;
}
.logistics-button{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 384rpx;
	height: 80rpx;
	background: #F55856;
	border-radius: 10rpx;
}
.logistics-button-img{
	width: 42rpx;
	height: 42rpx;
}
.logistics-button-text{
	font-size: 32rpx;
	color: #FFFFFF;
	margin-left: 6rpx;
}

.logistics-default{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6rpx 8rpx;
	background: #E6E6E6;
	color: #FFFFFF;
	font-size: 24rpx;
	margin-left: 10rpx;
}
</style>
