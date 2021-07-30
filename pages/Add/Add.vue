<template>
	<view>
		<view class="logistics-add flex-center" v-for="(item,index) in add" :key="index">
			<view class="logistics-add-content flex-vertically">
					<view class="logistics-add-img" :data-index="index"  @click="choose"><image class="img" src="../../static/add.png" mode=""></image></view>
					<view class="logistics-add-img-text" :data-index="item.id" :data-linkman="item.linkman"
						:data-linktel="item.linktel" :data-address ="item.province_name+' '+item.city_name+' '+item.county_name+' '+item.address"@click="choose">
						<view class="logistics-add-name">{{item.linkman}}  {{item.linktel}}</view>
						<view class="logistics-adder">{{item.province_name}}  {{item.city_name}}  {{item.county_name}}  {{item.address}}</view>
					</view>
					<view class="logistics-delete" @click="del" :data-index="index" :data-id="item.id"><image class="img" src="../../static/delete.png" mode=""></image></view>
					<view class="logistics-delete" @click="modify" style="margin-left: 20rpx;" :data-index="index" ><image class="img" src="../../static/add.png" mode=""></image></view>
			</view>
		</view>
		
		<button type="default" @click="addto">添加地址</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				add:'',
				cardbag_number:'',
				logistics:''
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
.logistics-delete{
	width: 50rpx;
	height: 50rpx;
}
</style>
