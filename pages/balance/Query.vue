<template>
	<view>
		<view class="new-query-record" v-if="arr.length > 0">
			<view class="new-query-record-li"  :data-index="index"  v-for="(item,index) in arr" :key="index">
					<view class="new-record-left">
						<view class="new-record-left-title uni-ellipsis">{{item.desc}}</view>
						<view class="new-record-left-add" v-if="item.type==2">-{{item.balance}}</view>
						<view class="new-record-left-add" v-if="item.type==0">+{{item.balance}}</view>
						<view class="new-record-left-add" v-if="item.type==1">-{{item.balance}}</view>
						<view class="new-record-left-add" v-if="item.type==3">+{{item.balance}}</view>
					</view>
					<view class="new-record-right">
						<view class="new-record-left-time">{{item.time}}</view>
						<view class="new-record-left-price">余额 {{item.after_balance}}</view>
					</view>  
			</view>
		</view> 
		<view class="post-bottom" v-if="isAll">
			<view class="post-bottom-line"></view>
			<view class="post-bottom-text">我是有底线的</view>
			<view class="post-bottom-line"></view>
		</view>
		<view class="apply-success-view" v-if="arr.length==0">
			<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
			<view class="apply-success-text">当前暂无数据～</view>
		</view>
	</view>
</template>

<script>   
	export default{
		data(){
			return{
				record:[],
				current:'',
				arr:[],
				isAll: false,
				pageSize: 10,
				pageIndex: 1
			}
		},
		onLoad:function(){ 
			this.getProductList(1);
		},
		onPullDownRefresh:function(){
			this.getProductList(1);
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500);
		},
		onReachBottom:function(){
			this.getProductList(2);
		},
		methods:{
			getProductList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = "get_balance_log";
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					memberid: memberid
				});
				this.$utils.post(action,data).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.arr = res.rs;
						that.isAll = false;
					} else {
						if(res.rs.length>0){
							that.arr = that.arr.concat(res.rs);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
				});
			}
		}
	}
</script>

<style>
page{
	background-color: #FFFFFF;
}

.new-query-record {
    width: 688rpx;
    margin: 0 auto;
    background-color: #FFF;
}

.new-query-record-li {
    padding: 30rpx 0rpx;
    border-bottom: 2rpx solid #F4F5F7;
}
.new-record-left{
	width: 100%;
	align-items: center;
    display: flex;
    justify-content: space-between;
	margin-bottom: 24rpx;
}
.new-record-right{
	width: 100%;
	align-items: center;
	display: flex;
	justify-content: space-between;
}
.new-record-left-title {
	width: 420rpx;
    text-align: left;
	font-size: 30rpx;
	color: #333333;
}


.new-record-left-time {
    text-align: left;
	font-size: 26rpx;
	color: #666666;
}

.new-record-left-add {
    font-size: 18rpx;
    text-align: right;
}

.new-record-left-add {
    font-size: 30rpx;
    color: #333333;
    text-align: right;
}

.new-record-left-price {
    text-align: right;
	font-size: 26rpx;
	color: #666666;
}
.apply-success-view{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.apply-success-img{
		width: 255rpx;
		height: 180rpx;
		margin-top: 172rpx;
	}
	.apply-success-text{
		padding: 60rpx 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		line-height: 48rpx;
	}
	
	.post-bottom{
		display: flex;
		align-items: center;
		color: #B3B3B3;
		text-align: center;
		padding-top: 24rpx;
		padding-bottom: 48rpx;
		justify-content: center;
	}
	.post-bottom-text{
		font-size: 24rpx;
		color: #B3B3B3;
		line-height: 33rpx;
		margin: 0rpx 18rpx;
	}
	.post-bottom-line{
		width: 240rpx;
		height: 1px;
		background: #E0E0E0;
	}

</style>
