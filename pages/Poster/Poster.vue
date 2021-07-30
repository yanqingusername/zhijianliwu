<template>
    <view>
        <!-- :item="item" -->
        <view  v-for="(item,index) in result" :key="index">
                <view style="color: #000000;">
					<view class="addre">
						<view class="a-con" :data-index="item.id" :data-linkman="item.linkman" :data-linktel="item.linktel" :data-address ="item.province_name+' '+item.city_name+' '+item.county_name+' '+item.address">
							<delSlideLeft :data_transit="{index:index,item:item}"   @delItem="delItem" @click="del">
								<view class="" @click="check" :data-id="item.id">
									<image  v-show="item.gou"  class="con-img" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/checked_icon_r.png" mode=""></image>
									<text  v-show="!item.gou"  class="iconfont icon-ico2 con-img1"></text> 
								</view>
								
								<view class="con-addre">
									<text class="a-phone">{{item.linkman}}  {{item.linktel}}</text>
									<text class="a-addre">{{item.province_name}}  {{item.city_name}}  {{item.county_name}}  {{item.address}}</text>
								</view>
								<view class="" @click="modify" style="margin-left: 20rpx;" :data-index="index">
									<image class="con-edit_img" :src="$utils.osspath_url('/xcx-static/edit_icon.png')" mode=""></image>
								</view>
								
						   </delSlideLeft>
						</view>
					</view>
			   </view>
        </view>
		<view class="bottom">
			<!-- <image class="btn-img" :src="$utils.osspath_url('/xcx-static/add_icon.png')" mode=""></image> -->
			<text class="iconfont icon-tianjia btn-img"></text>
		    <button type="warn" class="btn" @click="addto">新增地址</button>
		</view>
    </view>
</template>

<script>
    import delSlideLeft from '@/components/ay-operate/del_slideLeft.vue'
    export default {
        components: {
            delSlideLeft,
        },

        data() {
            return {
                // 前台用户标志
                result: [],
				gou:true,
				cardbag_number:'',
				logistics:''
            };
        },
       
        onShow:function(e){
        	let memberid = uni.getStorageSync('id')
        	this.memberid = memberid;
        	
        	
        	var data = '{"memberid":"'+memberid+'"}';
        	var action = 'get_member_area';
        	 this.$utils.post(action,data).then(res=>{
        		 // console.log('地址列表',res)
        		 this.result = res.rs
        	 })
        	 
        },
        onLoad:function(e){	
        	let memberid = uni.getStorageSync('id')
        	this.memberid = memberid;
        	var data = '{"memberid":"'+memberid+'"}';
        	
        	var action = 'get_member_area';
        						  	  
        	 this.$utils.post(action,data).then(res=>{
        		 console.log('地址列表',res)
        		 this.result = res.rs
				 // this.id=res.rs.id
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
        	 
        	 // this.cardbag_detail_id = e.cardbag_detail_id;
        	 
        	 
        	 
        	 
        },
        methods: {
            //点击删除按钮事件
            delItem: function(e) {
                let that = this;
                that.result.splice(e.data.index,1)

            },
			//勾选
			check:function(e) {
				this.result.forEach(item => {
					this.$set(item, 'gou', "")
				})
				for (var i = 0; i < this.result.length; i++) {
					if (e.currentTarget.dataset.id == this.result[i].id) {
						this.result[i].gou = 1
					} else {
						this.result[i].gou = 0
					}
				}
				console.log(this.result)
				
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
							        // console.log('用户点击确定');
									
									  var data = '{"member_area_id":"'+id+'"}';
									  var action = 'del_member_area';
																	  	  
									this.$utils.post(action,data).then(res=>{
													 // console.log('地址列表',res)
													 if(res.sta == 1){
														 this.result.splice(index,1)
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
					let add = this.result[index];
					uni.setStorageSync('add',add)
					uni.navigateTo({
						url:'../Address/Address?modify=' + 1 + '&index=' + index
					})
				},
			// 添加地址
			 addto:function(e){
				 // if(this.ordernumber.length>0){
					//  uni.navigateTo({
					//  	url:'../Address/Address?addto=' + 1 + '&ordernumber=' + this.ordernumber
					//  })
				 // }else{
					uni.navigateTo({
						url:'../Address/Address?addto=' + 1
					}) 
				 // }
			 } 
        }
 
    }
</script>

<style>
	@import url('../../static/font/iconfont.css');
.addre{
		height: 200rpx;
		background-color: #fff;
	}
	.a-con{
		width: 90%;
		height: 180rpx;
		border-bottom: 1px solid #E6E6E6;
		margin: auto;
	}
	.con-img{
		width: 45rpx;
		height: 45rpx;
		margin-top: 65rpx;
		float: left;
	}
	.con-img1{
		width: 45rpx;
		height: 45rpx;
		margin-top: 65rpx;
		float: left;
		/* margin-left: -45rpx; */
		font-size: 22px;
	}
	.con-addre{
		width: 520rpx;
		height: 100rpx;
		float: left;
		position: relative;
		top: 40rpx;
		left: 20rpx;
	}
	.a-phone{
		font-weight: bold;
		display: block;
	}
	.a-addre{
		position: absolute;
		top: 55rpx;
		font-size: 13px;
		color: #666;
	}
	.con-edit_img{
		width: 45rpx;
		height: 45rpx;
		float: right;
		margin-top: 70rpx;
	}
	.bottom{
		width: 100%;
		height: 150rpx;
		/* background-color: pink; */
		position: relative;
		top: 230rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn-img{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 207rpx;
		left: 240rpx;
		color: #fff;
		font-size: 21px;
		z-index: 1;
	}
	.btn{
		width: 500rpx;
		margin-top: 300rpx;
	}
</style>