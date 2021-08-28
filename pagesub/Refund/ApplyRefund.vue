<template>
	<view class="refund-view">
		<view class="apply-refund">
			<view class="new-order-li-center">
				<view class="new-order-left">
					<view class="new-order-img">
						<image lazy-load="true" class="new-order-commodity-img" src="../../static/nono.jpg" mode=""></image>
					</view>
				</view>
				<view class="new-order-right">
					<view class="new-order-item-title">云南古树茶叶</view>
					<view class="new-order-item">
						<view class="new-order-item-sku">规格：礼盒装</view>
						<view class="new-order-item-total">x1</view>
					</view>
				</view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title">申请原因</view>
				<view class="apply-flex-input flex-vertically" @click="toggle('bottom')">
					<view>请选择</view>
					<image lazy-load="true" class="apply-flex-input-img" src="../../static/drop_down_arrow.png" mode=""></image>
				</view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title">换货数量</view>
				<view class="apply-flex-view-number flex-vertically">1件</view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title">退款金额</view>
				<view class="apply-flex-view flex-vertically">¥1080</view>
			</view>
		</view>
		<view class="apply-refund padding-refund">
			<view class="apply-flex">
				<view class="apply-flex-title">补充描述和凭证</view>
			</view>
			<view class="apply-refund-view">
				<view class="apply-refund-text"><textarea value="" name="remark" maxlength='100' placeholder="补充描述，有助于更好的处理售后问题" /></view>	
				<view class='imglist'>
					<view v-for="(item,index) in IMG_DATA" :key="index" class='imglist-view'>
						<view class="img" @click="delImages" :data-id="index"><image src="../../static/icon_describe_close.png" style="width:24rpx;height:24rpx" /></view>
						<image :src="$utils.imageUrl(item)" style="width:165rpx;height:156rpx;" lazy-load />
					</view>
					<view class="up" @click="uploadSub" v-if="6>IMG_DATA.length">
						<image src="../../static/icon_phone.png"/>
						<view class="title">上传凭证</view>
						<view class="number">(最多6张)</view>
					</view>
				</view>
			</view>
		</view>
		<view class="refund-empty"></view>
		<view class="refund-submit-view" @click="togglecenter('center')">
			<view class="refund-submit">提交</view>
		</view>
		
		<!-- 退款原因 -->
		<uni-popup ref="popup" type="bottom" :animation="false" :maskClick="true" @change="change">
			<view class="popup-view">
				<view class="popup-view-top">
					<view class="popup-view-title">申请原因</view>
					<image class="popup-view-img" src="../../static/icon_close_reason.png" @click="$buttonClick(closepopup)"></image>
				</view>
				<view @click="bindPickerChange" v-for="(item, index) in items" :key="index" :data-index="index">
				    <view class="picker-view">
						<view class="picker-view-title">{{item.value}}</view>
						<image class="picker-view-img" :src="[indexPicker == index ? '../../static/icon_reason_d.png' : '../../static/icon_reason_m.png']"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 退款提交成功 -->
		<uni-popup ref="popupcenter" type="center" :animation="false" :maskClick="true" @change="change">
			<view class="popup-center-view">
				<image class="picker-center-view-img" src="../../static/icon_refund_success.png"></image>
				<view class="popup-center-view-text">退款申请已提交，请等待客服处理</view>
				<view class="popup-center-view-bottom" @click="$buttonClick(submitrefund)">
					<view class="popup-center-view-button">确定</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 选择照片 -->
		<uni-popup ref="popuppic" type="bottom" :animation="false" :maskClick="true" @change="change">
			<view class="popup-pic">
				<view class="popup-pic-text" @click="$buttonClick(cameraPic)">拍照</view>
				<view class="popup-pic-border" @click="$buttonClick(albumPic)">从相册选择</view>
				<view class="popup-pic-view" @click="$buttonClick(closepic)">取消</view>
			</view>
		</uni-popup>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				IMG_DATA: [
					"https://zhijianlw.com/static/web/img/empty_page_xm.png",
					"https://zhijianlw.com/static/web/img/empty_page_xm.png"
				],
				count: 6,
				indexPicker: 0,
				items: [
					{
				        name: 'TUR',
				        value: '不想要了'
				    },
					{
					    name: 'TUR',
					    value: '商品无货'
					},
					{
					    name: 'TUR',
					    value: '发货时间问题'
					},
					{
					    name: 'TUR',
					    value: '没用/少用优惠'
					},
					{
					    name: 'TUR',
					    value: '其他'
					}
				]
			}
		},
		onShow:function(e){
			
			 
		},
		onLoad:function(e){	
			
		},
		methods: { 
			// 删除选中的图片
			delImages(e) {
				console.log('---->:',e.currentTarget.dataset.id)
			    let DATA = [];
			    let count = 6;
			    for (var i = 0; i < this.IMG_DATA.length; i++) {
			      if (i != e.currentTarget.dataset.id) {
			        DATA.push(this.IMG_DATA[i])
			      }
			    }
			    count = count - DATA.length;
			    this.IMG_DATA = DATA;
			    this.count = count;
			},
			toggle(type) {
				this.$refs['popup'].open();
			},
			closepopup(){
				this.$refs['popup'].close();
			},
			togglecenter(type) {
				this.$refs['popupcenter'].open();
			},
			submitrefund(){
				this.$refs['popupcenter'].close();
				uni.navigateTo({
					url:'./RefundInfo'
				})
			},
			uploadSub(){
				this.$refs['popuppic'].open();
			},
			cameraPic(){
				this.closepic();
				uni.chooseImage({
				  	count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['camera'], //这要注意，camera掉拍照，album是打开手机相册
				    success: (res)=> {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
				    }
				});
			},
			albumPic(){
				this.closepic();
				uni.chooseImage({
				  	count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'], //这要注意，camera掉拍照，album是打开手机相册
				    success: (res)=> {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
				    }
				});
			},
			closepic(){
				this.$refs['popuppic'].close();
			},
			change(e) {
			
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.currentTarget.dataset.index)
				this.indexPicker = e.currentTarget.dataset.index
			},
		}
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	.refund-view{
		position: relative;
	}
	.apply-refund{
		background: #FFFFFF;
		margin-top: 20rpx;
		padding: 40rpx 40rpx 0rpx 46rpx;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		padding: 0rpx 0rpx 30rpx 0rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-left{
		width: 140rpx;
		display: flex;
		align-items: center;
	}
	.new-order-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-right{
		display: flex;
		flex-direction: column;
		width: 500rpx;
		margin-left: 20rpx;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 500rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.new-order-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.apply-flex{
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}
	.apply-flex-title{
		min-width: 140rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		margin-right: 20rpx;
	}
	
	.apply-flex-input{
		width: 505rpx;
		font-size: 28rpx;
		color: #AAAAAA;
		line-height: 40rpx;
		height: 110rpx;
		border-bottom: 2rpx solid #EEEEEE;
		justify-content: flex-end;
	}
	.apply-flex-input-img{
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}
	.apply-flex-view{
		width: 505rpx;
		font-size: 28rpx;
		color: #EC1815;
		line-height: 40rpx;
		height: 110rpx;
		justify-content: flex-end;
	}
	.apply-flex-view-number{
		width: 505rpx;
		font-size: 28rpx;
		color: #999999;
		line-height: 40rpx;
		height: 110rpx;
		justify-content: flex-end;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.padding-refund{
		padding-bottom: 30rpx;
	}
	.apply-refund-view{
		width: 660rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
		margin-top: 30rpx;
	}
	.apply-refund-text{
		padding: 30rpx;
	}
	.apply-refund-text textarea{
		font-size: 26rpx;
		color: #999999;
		height: 100rpx;
	}
	
	.imglist {
	    display: flex;
	    flex-wrap: wrap;
		padding: 0rpx 30rpx 10rpx 30rpx;
	}
	.imglist .imglist-view{
	    margin-right: 20rpx;
	    width: 165rpx;
	    position: relative;
	    height: 156rpx;
	    margin-bottom: 30rpx;
	}
	.imglist .imglist-view .img {
	    position: absolute;
	    border-radius: 50%;
	    right: -10rpx;
	    top: -10rpx;
	    width: 24rpx;
	    text-align: center;
	    line-height:30rpx;
	    height: 24rpx;
	}
	.imglist .up {
	    width: 165rpx;
	    text-align:center;
	    height: 156rpx;
		margin-right: 20rpx;
		position: relative;
		margin-bottom: 30rpx;
		display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.imglist .up image {
		width:165rpx;
		height:156rpx;
	    margin-bottom: 0rpx;
	    margin-top: 0rpx;
	}
	.imglist .up .title {
	    color: #BBBBBB;
	    font-size: 20rpx;
	    position:absolute;
		top: 90rpx;
	}
	.imglist .up .number {
	    color: #BBBBBB;
	    font-size: 20rpx;
	    position:absolute;
		bottom: 18rpx;
	}
	.refund-empty{
		height: 200rpx;
	}
	.refund-submit-view{
		position: absolute;
		bottom: 10rpx;
	    display: flex;
	    width: 100%;
	    align-items: center;
	    justify-content: center;
	}
	.refund-submit{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 660rpx;
		height: 80rpx;
		background: #EC1815;
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 42rpx;
	}
	.popup-view{
		display: flex;
		flex-direction: column;
		width: 750rpx;
		/* height: 660rpx; */
		background: #FFFFFF;
		border-radius: 10rpx 10rpx 3rpx 3rpx;
	}
	.popup-view-top{
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		/* margin-bottom: 20rpx; */
	}
	.popup-view-title{
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		line-height: 50rpx;
		padding: 30rpx 0rpx;
	}
	.popup-view-img{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right: 43rpx;
		top: 24rpx;
	}
	.radio-group{
		display: flex;
		flex-direction: column;
	}
	.picker-view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 106rpx;
		padding: 0rpx 46rpx;
	}
	.picker-view-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
	}
	.picker-view-img{
		width: 36rpx;
		height: 36rpx;
	}
	.popup-center-view{
		display: flex;
		align-items: center;
		width: 644rpx;
		height: 434rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		flex-direction: column;
	}
	.picker-center-view-img{
		width: 68rpx;
		height: 68rpx;
		margin-top: 70rpx;
	}
	.popup-center-view-text{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		margin-top: 40rpx;
	}
	.popup-center-view-bottom{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 76rpx;
	}
	.popup-center-view-button{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 196rpx;
		height: 72rpx;
		background: #EC1815;
		border-radius: 36rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 42rpx;
	}
	.popup-pic{
		display: flex;
		width: 750rpx;
		/* height: 318rpx; */
		background: #FFFFFF;
		border-radius: 10rpx 10rpx 3rpx 3rpx;
		flex-direction: column;
	}
	.popup-pic-text{
		font-size: 34rpx;
		color: #333333;
		padding: 40rpx 0rpx 24rpx 0rpx;
		border-bottom: 1px solid #EDEDED;
		text-align: center;
	}
	.popup-pic-border{
		font-size: 34rpx;
		color: #333333;
		padding: 28rpx 0rpx 24rpx 0rpx;
		border-bottom: 4px solid #EDEDED;
		text-align: center;
	}
	.popup-pic-view{
		font-size: 34rpx;
		color: #333333;
		padding: 30rpx 0rpx 22rpx 0rpx;
		text-align: center;
	}
</style>
