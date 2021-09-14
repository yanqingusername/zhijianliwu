<template>
	<view>
		<form @submit="forsubmit">
			<view class="apply-order-number">订单编号：{{billInfo.orderinfo.ordernumber}}</view>
			<view class="apply-order-money">开票金额：{{billInfo.orderinfo.orderprice_discount}}</view>
			
			<view class="apply-order-info">
				<view class="apply-type">
					<view class="apply-type-text">发票类型</view>
					<view class="apply-type-normal" :class="type==0 ? 'apply-type-normal-active': ''" @click="typeHandler" data-typen="0">电子普通发票</view>
					<view class="apply-type-normal" :class="type==1 ? 'apply-type-normal-active': ''" @click="typeHandler" data-typen="1">增值税专用发票</view>
				</view>
			</view>
			
			<view class="apply-order-info">
				<view class="apply-type">
					<view class="apply-type-text">发票抬头</view>
					<view v-if="type==0" :class="company_type==0 ? 'apply-status-normal-active': 'apply-status-normal'" @click="companytypeHandler" data-typen="0">个人</view>
					<view :class="company_type==1 ? 'apply-status-normal-active': 'apply-status-normal'" @click="companytypeHandler" data-typen="1">公司</view>
				</view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title"><span>*</span>抬头名称</view>
				<view class="apply-flex-input flex-vertically" v-if="type==0 && company_type==0"><input name="name" v-model="name" placeholder="请输入需要开具发票的姓名" type="text"></view>
				<view class="apply-flex-input flex-vertically" v-else><input name="name" v-model="name" placeholder="请输入公司名称" type="text"></view>
				
			</view>
			<view class="apply-flex" v-if="company_type==1">
				<view class="apply-flex-title"><span>*</span>单位税号</view>
				<view class="apply-flex-input flex-vertically"><input name="shuihao" v-model="shuihao" placeholder="请输入税号" type="text"></view>
			</view>
			<view class="apply-flex" v-if="type==1">
				<view class="apply-flex-title"><span>*</span>开户行</view>
				<view class="apply-flex-input flex-vertically"><input name="bank_deposit" v-model="bank_deposit" placeholder="请输入开户行" type="text"></view>
			</view>
			<view class="apply-flex" v-if="type==1">
				<view class="apply-flex-title"><span>*</span>账号</view>
				<view class="apply-flex-input flex-vertically"><input name="bank_num" v-model="bank_num" placeholder="请输入开户账号" type="text"></view>
			</view>
			<view class="apply-flex" v-if="type==1">
				<view class="apply-flex-title"><span>*</span>地址</view>
				<view class="apply-flex-input flex-vertically"><input name="address" v-model="address" placeholder="请输入地址" type="text"></view>
			</view>
			<view class="apply-flex" v-if="type==1">
				<view class="apply-flex-title"><span>*</span>电话</view>
				<view class="apply-flex-input flex-vertically"><input name="linkphone" v-model="linkphone" placeholder="请输入电话" type="text"></view>
			</view>
			<view class="apply-flex" style="height: 110rpx;" @click="defaultHandler">
				<view class="apply-flex-set">设置为默认抬头</view>
				<image class="apply-flex-default-img" :src="[is_default ? '../../static/icon_apply_checked.png':'../../static/icon_apply_default.png']"></image>
				<!-- <image class="apply-flex-default-img" src="../../static/icon_apply_checked.png"></image> -->
			</view>
			
			<view class="apply-userinfo">
				<view style="width: 100%;">
					<view class="apply-userinfo-text">收票人信息</view>
				</view>
				<view class="line-height"></view>
				<view class="apply-flex">
					<view class="apply-flex-title"><span>*</span>手机号码</view>
					<view class="apply-flex-input flex-vertically"><input name="phone" v-model="phone" placeholder="请输入收票人手机号码" type="text"></view>
				</view>
				<view class="apply-flex" v-if="type==0">
					<view class="apply-flex-title"><span>*</span>邮箱地址</view>
					<view class="apply-flex-input flex-vertically" style="border-bottom: none;"><input name="email" v-model="email" placeholder="请输入邮箱地址" type="text"></view>
				</view>
				<view class="apply-flex" v-if="type==1">
					<view class="apply-flex-title"><span>*</span>收票地址</view>
					<view class="apply-flex-input flex-vertically" style="border-bottom: none;"><input name="shoupiao_address" v-model="shoupiao_address" placeholder="请输入收票地址" type="text"></view>
				</view>
			</view>
			
			<view class="apply-userinfo-content">
				<view class="apply-userinfo-item">
					<view class="apply-type-text">发票内容</view>
					<view class="apply-type-normal apply-type-normal-active">商品类别</view>
				</view>
				<view class="apply-content-bottom-text">发票内容将由客服专员与您核实确认，请保持手机通讯畅通。</view>
			</view>
			
			<view class="apply-button-view">
				<button  form-type="submit" class="apply-button">提交</button>
			</view>
			
			<view style="height: 70rpx;"></view>
			
			
			<!-- <view class="apply-content">
				<view class="apply-content-ul">
					<view class="apply-title"><span>*</span>您的企业名称</view>
					<view class="apply-input flex-vertically"><input name="company_name" placeholder="请输入您的企业名称" type="text"></view>
					<view class="apply-title"><span>*</span>联系人姓名</view>
					<view class="apply-input flex-vertically"><input name="linkman" placeholder="请输入联系人姓名" type="text"></view>
					<view class="apply-title"><span>*</span>联系人手机号</view>
					<view class="apply-input flex-vertically"><input name="linkphone" placeholder="请输入联系人手机号" type="text"></view>
					<view class="apply-title">输入串码</view>
					<view class="apply-input flex-vertically"><input name="linkcode" placeholder="无串码, 不用填写" type="text"></view>
					<view class="apply-title"><span>*</span>采购意向简述</view>
					<view class="apply-text"><textarea value="" name="remark" maxlength='100' placeholder="采购意向简述(选填)" /></view>				
			</view> 
		</view>
		
		<button  form-type="submit" class="apply-bottom">完成确认</button>-->
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ordernumber: '',
				billInfo: '',
				type: 0, //发票类型 0普通发票 1专业发票
				company_type: 0, //开票人 0 个人 1公司
				is_default: false,
				name: '', //抬头
				shuihao: '', //税号
				bank_deposit: '', //银行开户行
				bank_num: '', //银行卡号
				address: '', //地址
				linkphone: '', //电话
				phone: '', //手机号码
				email: '', //邮箱地址
				shoupiao_address: '', //收票地址
				member_bill_info: []
			} 
		},
		onLoad:function(options){
			let that = this;
			this.ordernumber = options.ordernumber;
			let action = 'get_order_bill_info';
			let memberid = uni.getStorageSync('id')
			let controller = 'order';
			let data = JSON.stringify({
				ordernumber: this.ordernumber,
				memberid: memberid
			})
			this.$utils.postNew(action, data, controller).then(res => {
				if(res.sta == 1){
					this.billInfo = res.rs;
					this.member_bill_info = res.rs.member_bill_info;
					if(this.member_bill_info.length>0){
						let member_bill_info = this.member_bill_info;
						let item = member_bill_info.filter((ite)=>{
							 if(ite.type == that.type && ite.company_type == that.company_type){
								that.name = ite.name;
							 }
						})
					}
				}
			})
			
		},
		methods: {
			typeHandler(e){
				let type = e.currentTarget.dataset.typen;
				if(type == 1){
					this.company_type = 1;
				}
				this.type = type;
				
				let that = this;
				if(this.member_bill_info.length>0){
					let member_bill_info = this.member_bill_info;
					let item = member_bill_info.filter((ite)=>{
						if(ite.type == that.type && ite.company_type == that.company_type){
							that.name = ite.name;
							that.shuihao = ite.shuihao;
							that.bank_deposit = ite.bank_deposit;
							that.bank_num = ite.bank_num;
							that.address = ite.address;
							that.linkphone = ite.linkphone;
							that.type = ite.type;
							that.company_type = ite.company_type;
						}else{
							that.name = '';
							that.shuihao = '';
							that.bank_deposit = '';
							that.bank_num = '';
							that.address = '';
							that.linkphone = '';
						}
					})
				}
			},
			companytypeHandler(e){
				let company_type = e.currentTarget.dataset.typen;
				this.company_type = company_type;
				
				let that = this;
				if(this.member_bill_info.length>0){
					let member_bill_info = this.member_bill_info;
					let item = member_bill_info.filter((ite)=>{
						if(ite.type == that.type && ite.company_type == that.company_type){
							that.name = ite.name;
							that.shuihao = ite.shuihao;
							that.bank_deposit = ite.bank_deposit;
							that.bank_num = ite.bank_num;
							that.address = ite.address;
							that.linkphone = ite.linkphone;
							that.type = ite.type;
							that.company_type = ite.company_type;
						}else{
							that.name = '';
							that.shuihao = '';
							that.bank_deposit = '';
							that.bank_num = '';
							that.address = '';
							that.linkphone = '';
						}
					})
				}
			},
			defaultHandler(e){
				this.is_default = !this.is_default;
			},
			forsubmit(e){
				let name = e.detail.value.name;
				let shuihao = e.detail.value.shuihao;
				let bank_deposit = e.detail.value.bank_deposit;
				let bank_num = e.detail.value.bank_num;
				let address = e.detail.value.address;
				let linkphone = e.detail.value.linkphone;
				let phone = e.detail.value.phone;
				let email = e.detail.value.email;
				let shoupiao_address = e.detail.value.shoupiao_address;
				let memberid = uni.getStorageSync('id');
				var data = JSON.stringify({
					memberid: memberid,
					type: this.type,
					ordernumber: this.ordernumber,
					name: name,
					shuihao: shuihao,
					money: this.billInfo.orderinfo.orderprice_discount,
					linkphone: linkphone,
					email: email,
					address: address,
					phone: phone,
					company_type: this.company_type,
					is_default: this.is_default,
					bank_num: bank_num,
					bank_deposit: bank_deposit,
					shoupiao_address: shoupiao_address
				});
				 
				var action = 'create_bill';
				this.$utils.post(action,data).then(res=>{
					if(res.sta==1){
						uni.redirectTo({
							url: "./ApplySuccess"
						});
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							mask:true,
						})	
					}	 
				})
				
				// // 企业名称不能为空
				// if(company_name==''||company_name==undefined){
				//    uni.showToast({
				// 	   title:'企业名称不能为空',
				// 	   mask:true,
				// 	   icon:'none'
				//    })	
				// // 联系人不能为空
				// }else if(linkman==''||linkman==undefined){
				// 	uni.showToast({
				// 		title:'联系人不能为空',
				// 		 mask:true,
				// 		 icon:'none'
				// 	})	
			 //    //  手机号不能为空 
				// }else if(linkphone==''||linkphone==undefined){
				// 	uni.showToast({
				// 		title:'手机号不能为空',
				// 		 mask:true,
				// 		 icon:'none'
				// 	})	
				// // 长度等于11位	
				// }else if(linkphone.lenght < 11){
				// 	uni.showToast({
				// 		title:'手机号有误',
				// 		 mask:true,
				// 		 icon:'none'
				// 	})	
				// }else if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(linkphone))){
				// 	uni.showToast({
				// 		title:'手机号有误',
				// 		 mask:true,
				// 		 icon:'none'
				// 	})
				// }else{
				//  var data = '{"memberid":"'+this.id+'","shuihao":"1","apply_level":"'+apply_level+'","company_name":"'+company_name+'","linkman":"'+linkman+'","linkphone":"'+linkphone+'","remark":"'+remark+'"}';
				 
				//  var action = 'create_bill';
					  	  
				//   this.$utils.post(action,data).then(res=>{
				// 	     console.log('企业会员申请请求数据',data)
				// 		  // console.log('企业会员申请',res)					  
					  
				// 			if(res.sta!='1'){
				// 					   uni.showToast({
				// 							title:res.msg,
				// 							icon:'none',
				// 					 	  mask:true})		
				// 			}else{
				// 					   uni.showToast({
				// 						  title:'提交成功!',
				// 						  icon:'success',
				// 						  mask:true,
				// 						  success: (res) =>{
				// 							  setTimeout(function(e){
				// 								  uni.reLaunch({
				// 									url:'../personal/personal'
				// 								  })
				// 							  },1500)
				// 						  }
				// 					   })								
				// 			}	 
				// 	})
				// }
			 
			},
		}
	}
</script>

<style>
page{
	background-color: #F4F5F7;
}
.apply-order-number{
	font-size: 28rpx;
	color: #666666;
	line-height: 40rpx;
	padding: 40rpx 0rpx 0rpx 46rpx;
}

.apply-order-money{
	font-size: 28rpx;
	color: #666666;
	line-height: 40rpx;
	padding: 20rpx 0rpx 24rpx 46rpx;
}

.apply-order-info{
	background: #FFFFFF;
}
.apply-type{
	display: flex;
	align-items: center;
	padding: 38rpx 0rpx 36rpx 46rpx;
	border-bottom: 1px solid #EEEEEE;
}
.apply-type-text{
	min-width: 130rpx;
	font-size: 28rpx;
	color: #333333;
	line-height: 40rpx;
	margin-right: 20rpx;
}
.apply-type-normal{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 214rpx;
	height: 48rpx;
	background: #EBEBEB;
	border: 1px solid #EBEBEB;
	border-radius: 25rpx;
	font-size: 22rpx;
	color: #555555;
	margin-right: 30rpx;
}
.apply-type-normal-active{
	background: #FFEAEA;
	border: 1px solid #EC1815;
	color: #EC1815;
}

.apply-status-normal{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 112rpx;
	height: 48rpx;
	background: #EBEBEB;
	border: 1px solid #EBEBEB;
	border-radius: 25rpx;
	font-size: 22rpx;
	color: #555555;
	margin-right: 30rpx;
}
.apply-status-normal-active{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 112rpx;
	height: 48rpx;
	border-radius: 25rpx;
	font-size: 22rpx;
	margin-right: 30rpx;
	background: #FFEAEA;
	border: 1px solid #EC1815;
	color: #EC1815;
}
.apply-flex{
	display: flex;
	align-items: center;
	padding: 0rpx 46rpx;
	background: #FFFFFF;
}

.apply-flex-title{
	min-width: 140rpx;
	font-size: 28rpx;
	color: #999999;
	line-height: 40rpx;
	margin-right: 20rpx;
}

.apply-flex-title ._span {
    color: #D52643;
    font-size: 26rpx;
    margin-right: 10rpx;
}
.apply-flex-input{
	width: 505rpx;
	font-size: 28rpx;
	color: #666666;
	line-height: 40rpx;
	height: 110rpx;
	border-bottom: 2rpx solid #EEEEEE;
}
.apply-flex-input input {
    font-size: 28rpx;
    height: 110rpx;
    width: 505rpx;
}
.apply-flex-set{
	font-size: 26rpx;
	color: #666666;
	line-height: 37rpx;
}
.apply-flex-default-img{
	width: 32rpx;
	height: 32rpx;
	margin-left: 10rpx;
}
.apply-userinfo{
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #FFFFFF;
}
.apply-userinfo-text{
	font-size: 28rpx;
	color: #333333;
	line-height: 40rpx;
	padding: 36rpx 46rpx;
}
.line-height{
	width: 698rpx;
	height: 1px;
	background: #EEEEEE;
}

.apply-content-bottom-text{
	font-size: 24rpx;
	color: #999999;
	line-height: 33rpx;
	margin-top: 30rpx;
}
.apply-userinfo-content{
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	background: #FFFFFF;
	padding: 30rpx 0rpx 30rpx 46rpx;
}

.apply-userinfo-item{
	display: flex;
	align-items: center;
}

.apply-button-view{
	margin-top: 80rpx;
}

.apply-button {
    width: 660rpx;
    height: 80rpx;
    background: #EC1815;
    border-radius: 40rpx;
    color: #FFF;
    font-size: 30rpx;
    text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
