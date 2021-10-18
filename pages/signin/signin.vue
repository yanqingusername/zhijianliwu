<template>
	<view>
		<view class="new-sign"><image class="new-sign-img" src="https://zhijianlw.com/static/web/img/Embellishment_2021_08_28.jpg" mode=""></image></view>
		<!-- <view class="sign-alt">指间礼物</view> -->
		<!-- <button  open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="new-wxsign margin-auto" style="margin-top: 80rpx;">微信一键登录</button> -->
		<button  v-if='AuthStatus' @click="toLoginLink" :disabled="!isChecked" class="new-wxsign margin-auto" style="margin-top: 80rpx;">微信授权登录</button>
		<button  v-else class="new-wxsign margin-auto" style="margin-top: 80rpx;" open-type="getPhoneNumber"
		            @getphonenumber="bindPhoneNumber">手机号授权</button>

		<view class="sign-view">
			<checkbox color="#FF0022"class="flex" style="transform:scale(0.5)"
			@click="selectClick" :checked="isChecked"></checkbox>
			<text class="sign-text">未注册的微信号将自动注册指间礼物账号，且表示已经同意</text>
			<text class="sign-text" style="color: #E02020;" @click="signintext">注册协议</text>
		</view>
	</view>
</template>

<script>
	import sr from 'sr-sdk-wxapp';
	export default {
		data() {
			return {
				Data:'',
				receive:'',
				parent_member:'',
				cardbag_number:'',
				isChecked: true,
				AuthStatus: true, // true: 用户信息 false : 手机号
				telstring: '',
				keynum: ''
			}
		}, 
		
		onLoad:function(e){
			// console.log('扫码进来的',e)
			
		    this.openid();
			
			let telstring = uni.getStorageInfoSync('telstring');
			this.telstring = telstring;
		  
		  // 登录领取红包
		 if(e.receive){
			 this.receive = e.receive;
			 this.cardbag_number = e.cardbag_number;
		 }
		 if(e.keynum){
			 this.keynum = e.keynum;
		 }
		 // 是否扫码
		 if(e.scene){
			 this.parent_member = e.scene;
			 var sign = uni.getStorageSync('sign')
			 if(sign){
				this.getRou();
			 }
		 }
		},
		
		methods: {
			signintext(e){
				uni.navigateTo({
					url:'./signintext'
				})
			},
			selectClick(e){
				this.isChecked = !this.isChecked;
			},
			bindGetUserInfo(e){
				// 用户信息
				
				
				if(e.detail.rawData){
				   this.Data = JSON.parse(e.detail.rawData);
				   // if(id){
				   // 	// console.log('存在')
				   // 	uni.reLaunch({
				   // 		url:'../personal/personal'
				   // 	 })
				   	 
				   // }else{
				   	// console.log('登录')
				   	uni.showLoading({
				   		title:'登录中',
				   		mask:'true'
				   	})
				   	 
				   	this.zhu();
				   // }	
				}
			},
			toLoginLink() {
			    uni.getUserProfile({
			        desc: '用于完善资料',
			        success: (res) => {
			            this.uniGetUserInfo(res);
			        }
			    });
			},
			uniGetUserInfo(e){
				let that = this;
				            const OK = "getUserProfile:ok"
				            if (e.errMsg == OK) {
				                if (!e.userInfo) {
				                    return;
				                }
				                if(e.rawData){
				                   that.Data = JSON.parse(e.rawData);
				                   	uni.showLoading({
				                   		title:'登录中',
				                   		mask:'true'
				                   	})
				                   	that.zhu(e);
				                }
				            } else {
				                uni.showToast({
				                    title: '温馨提示:为了您更好的体验,请授权用户信息',
				                    icon: 'none',
				                })
				            }
			},
		
			zhu(e){
				let that = this;
				// 基本信息
				var rawdata = this.Data; 
				// openid
				var openid = uni.getStorageSync('openid');
			    uni.setStorageSync('rawdata',rawdata)
				// 推荐人id parent_member  
				// 手机号  Phone

				let nickName = rawdata.nickName.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, "");
				let data;

				if(this.parent_member){
					// console.log('扫码')
					data = JSON.stringify({
						wx_openid: openid,
						parent_member: this.parent_member,
						name: nickName,
						sex: rawdata.gender,
						head_img: rawdata.avatarUrl
					});
					// var data ='{"wx_openid":"'+openid+'","parent_member":"'+this.parent_member+'","name":"'+nickName+'","sex":"'+rawdata.gender+'","head_img":"'+rawdata.avatarUrl+'"}';
				}else{
					// console.log('没有扫码')
					data = JSON.stringify({
						wx_openid: openid,
						name: nickName,
						sex: rawdata.gender,
						head_img: rawdata.avatarUrl
					});
				  // var data ='{"wx_openid":"'+openid+'","name":"'+nickName+'","sex":"'+rawdata.gender+'","head_img":"'+rawdata.avatarUrl+'"}';
				}
				// console.log(data)
				 // 注册接口
				 var action = 'member_register';
				  this.$utils.post(action,data).then(res=>{  
					// console.log('注册',res)
					if( res.msg === "操作成功！"  || res.msg=== '该用户已经注册,请勿重复注册！'){
					   //登录   
						var data = '{"wx_openid":"'+openid+'"}';
						var action = 'member_login';
						 that.$utils.post(action,data).then(res=>{
							 // console.log('基本信息',res.rs)
							 // 全部
							 uni.setStorageSync('sign',res.rs)
							 // 会员id
							   uni.setStorageSync('id',res.rs.id)
							 // 会员昵称
							   uni.setStorageSync('name',res.rs.name)
							 // 会员唯一标识
							   uni.setStorageSync('keynum',res.rs.keynum)
							 // 会员性别
							   uni.setStorageSync('sex',res.rs.sex)
							 // 会员头像
							   uni.setStorageSync('head_img',res.rs.head_img)
							 // 会员级别
							   uni.setStorageSync('level_name',res.rs.level_name)
							   uni.setStorageSync('level',res.rs.level)
							 // 会员余额
							   uni.setStorageSync('balance',res.rs.balance)
							 // 会员指尖币余额
							   uni.setStorageSync('zj_balance',res.rs.zj_balance)
							 // 会员手机号
							  uni.setStorageSync('phone',res.rs.phone)
							 // 折扣
							 if(res.rs.discount_name==null||res.rs.discount_name==''){}else{
							 	uni.setStorageSync('discount_name',res.rs.discount_name)  
							 }
							 
							
							uni.hideLoading();
							if(that.telstring == 'phone_number'){
								that.getRou();
							}else{
								that.AuthStatus = false;
							}
							 
							 //  if(that.receive){
								//   uni.hideLoading();
								//   uni.showToast({
								//    	title:'登录成功',  
								//    	icon:"success",
								//    	mask:'true', 
								//    	success: (res) => {
								//    		setTimeout(function(e){
								//    			uni.reLaunch({
								//    				url:'../redEnvelopes/redEnvelopes?cardbag_number=' + that.cardbag_number
								//    			})
								//    		}
								//    		,1500) 
								//    	}
								//   })  
							 //  }else{
								//  uni.hideLoading();
								//  // that.getMemberPhone(e);
								// // 登录跳转
							 //     uni.showToast({
							 //     	title:'登录成功',
							 //     	icon:"success",
							 //     	mask:'true',
							 //     	success: (res) => {
							 //     		setTimeout(function(e){
							 //     			uni.reLaunch({
							 //     				// url:'../personal/personal' 
								// 				url:'../index/index'
							 //     			})
							 //     		}
							 //     		,1500) 
							 //     	}
							 //    })  
							 //  }
							  
								 
						 })
					}else{
						uni.showModal({
							title: '注册失败',
							content: '可能由于微信昵称包含特殊符号原因导致注册失败，建议修改昵称后重试',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}			
				  })
				    
				// 腾讯有数
				sr.track('register_wxapp',{})
				sr.track('login_wxapp',{})
				sr.startReport();
				sr.setUser({
					open_id: openid
				})
			},

			
			// 获取openid
			openid:function(){
				var openid = uni.getStorageSync('openid');
						
				// 判断是否获取
				if(openid){
					// console.log('已获取openid')
				}
				else{
				  // 获取openid
				  uni.login({
				  	success: (res) => {
				  	    var data = '{"wx_code":"'+res.code+'"}';
				  		var action = 'get_openid';
				  
				  		  this.$utils.post(action,data).then(res=>{
				  			// console.log('openid',res)
				  			uni.setStorageSync('openid',res.openid);
				  		  })
				  	
				  		} 
				  }) 	
				} 
			},
			// 授权手机号
			    bindPhoneNumber(e) {
					console.log(e)
			        // 用户同意授权
			        const OK = 'getPhoneNumber:ok'
			        if (e.detail.errMsg == OK) {
			            // 判断 session_key 有无到期
			            this.getMemberPhone(e)
			        } else {
						this.getRou();
					}
			    },
			// 获取
			getMemberPhone(e){
				let that = this;
				var openid = uni.getStorageSync('openid');
						
				// 判断是否获取
				if(openid){
					
							var data = JSON.stringify({
								encrypted_data: e.detail.encryptedData,
								wx_openid: openid,
								iv: e.detail.iv
							})
							var action = 'get_member_phone_number';
							var controller = 'member';
							this.$utils.postNew(action,data,controller).then(res=>{
								uni.setStorageSync('telstring','phone_number');
								that.getRou();
							})
						
				} 
			},
			getRou(){
				let that = this;
				if(this.receive == 'on'){
					
					uni.showToast({
						title:'登录成功',  
						icon:"success",
						mask:'true', 
						success: (res) => {
							setTimeout(function(e){
								uni.reLaunch({
									url:'../redEnvelopes/redEnvelopes?cardbag_number=' + that.cardbag_number
								})
							},1500) 
						}
					})  
				}else if(this.receive == 'onone'){
					uni.showToast({
						title:'登录成功',  
						icon:"success",
						mask:'true', 
						success: (res) => {
							setTimeout(function(e){
								uni.reLaunch({
									url:'../shopping/CBlessingCardWe?cardbag_number=' + that.cardbag_number
								})
							},1500) 
						}
					})  
				}else if(this.receive == 'ondetails'){
					uni.showToast({
						title:'登录成功',  
						icon:"success",
						mask:'true', 
						success: (res) => {
							setTimeout(function(e){
								uni.reLaunch({
									url:'../details/details?keynum=' + that.keynum
								})
							},500) 
						}
					})  
				}else{
					uni.showToast({
						title:'登录成功',
						icon:"success",
						mask:'true',
						success: (res) => {
							setTimeout(function(e){
								uni.reLaunch({
									url:'../index/index'
								})
							},1500) 
						}
					})  
				}
			}
		}
	}
</script>

<style>
@import '@/common/index.css';
page{
	background-color: #FFFFFF;
}
.new-sign{
	width: 100%;
	height: 370rpx;
}
.new-sign-img{
	width: 100%;
	height: 100%;
}

.new-wxsign {
	width: 608rpx;
	height: 80rpx;
	background: #52A91C;
	border-radius: 40rpx;
	font-size: 34rpx;
	color: #FFFFFF;
    text-align: center;
}
.sign-view{
	display: flex;
	align-items: center;
	margin-top: 36rpx;
	justify-content: center;
}
.sign-text{
	font-size: 20rpx;
	color: #AAAAAA;
}

</style>
