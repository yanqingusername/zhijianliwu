(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/signin/signin"],{"0b2a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(n("e56b"));function a(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{Data:"",receive:"",parent_member:"",cardbag_number:"",isChecked:!0,AuthStatus:!0,telstring:"",keynum:""}},onLoad:function(t){this.openid();var n=e.getStorageInfoSync("telstring");if(this.telstring=n,t.receive&&(this.receive=t.receive,this.cardbag_number=t.cardbag_number),t.keynum&&(this.keynum=t.keynum),t.scene){this.parent_member=t.scene;var s=e.getStorageSync("sign");s&&this.getRou()}},methods:{signintext:function(t){e.navigateTo({url:"./signintext"})},selectClick:function(e){this.isChecked=!this.isChecked},bindGetUserInfo:function(t){t.detail.rawData&&(this.Data=JSON.parse(t.detail.rawData),e.showLoading({title:"登录中",mask:"true"}),this.zhu())},toLoginLink:function(){var t=this;e.getUserProfile({desc:"用于完善资料",success:function(e){t.uniGetUserInfo(e)}})},uniGetUserInfo:function(t){var n=this,s="getUserProfile:ok";if(t.errMsg==s){if(!t.userInfo)return;t.rawData&&(n.Data=JSON.parse(t.rawData),e.showLoading({title:"登录中",mask:"true"}),n.zhu(t))}else e.showToast({title:"温馨提示:为了您更好的体验,请授权用户信息",icon:"none"})},zhu:function(t){var n=this,a=this.Data,i=e.getStorageSync("openid");e.setStorageSync("rawdata",a);var r,o=a.nickName.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,"");r=this.parent_member?JSON.stringify({wx_openid:i,parent_member:this.parent_member,name:o,sex:a.gender,head_img:a.avatarUrl}):JSON.stringify({wx_openid:i,name:o,sex:a.gender,head_img:a.avatarUrl});var u="member_register";this.$utils.post(u,r).then((function(t){if("操作成功！"===t.msg||"该用户已经注册,请勿重复注册！"===t.msg){var s='{"wx_openid":"'+i+'"}',a="member_login";n.$utils.post(a,s).then((function(t){e.setStorageSync("sign",t.rs),e.setStorageSync("id",t.rs.id),e.setStorageSync("name",t.rs.name),e.setStorageSync("keynum",t.rs.keynum),e.setStorageSync("sex",t.rs.sex),e.setStorageSync("head_img",t.rs.head_img),e.setStorageSync("level_name",t.rs.level_name),e.setStorageSync("level",t.rs.level),e.setStorageSync("balance",t.rs.balance),e.setStorageSync("zj_balance",t.rs.zj_balance),e.setStorageSync("phone",t.rs.phone),null==t.rs.discount_name||""==t.rs.discount_name||e.setStorageSync("discount_name",t.rs.discount_name),e.hideLoading(),"phone_number"==n.telstring?n.getRou():n.AuthStatus=!1}))}else e.showModal({title:"注册失败",content:"可能由于微信昵称包含特殊符号原因导致注册失败，建议修改昵称后重试",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})})),s.default.track("register_wxapp",{}),s.default.track("login_wxapp",{}),s.default.startReport(),s.default.setUser({open_id:i})},openid:function(){var t=this,n=e.getStorageSync("openid");n||e.login({success:function(n){var s='{"wx_code":"'+n.code+'"}',a="get_openid";t.$utils.post(a,s).then((function(t){e.setStorageSync("openid",t.openid)}))}})},bindPhoneNumber:function(e){console.log(e);var t="getPhoneNumber:ok";e.detail.errMsg==t?this.getMemberPhone(e):this.getRou()},getMemberPhone:function(t){var n=this,s=e.getStorageSync("openid");if(s){var a=JSON.stringify({encrypted_data:t.detail.encryptedData,wx_openid:s,iv:t.detail.iv}),i="get_member_phone_number",r="member";this.$utils.postNew(i,a,r).then((function(t){e.setStorageSync("telstring","phone_number"),n.getRou()}))}},getRou:function(){var t=this;"on"==this.receive?e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(n){setTimeout((function(n){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+t.cardbag_number})}),1500)}}):"onone"==this.receive?e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(n){setTimeout((function(n){e.reLaunch({url:"../shopping/CBlessingCardWe?cardbag_number="+t.cardbag_number})}),1500)}}):"ondetails"==this.receive?e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(n){setTimeout((function(n){e.reLaunch({url:"../details/details?keynum="+t.keynum})}),500)}}):e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(t){setTimeout((function(t){e.reLaunch({url:"../index/index"})}),1500)}})}}};t.default=i}).call(this,n("543d")["default"])},4666:function(e,t,n){},"7b10":function(e,t,n){"use strict";n.r(t);var s=n("0b2a"),a=n.n(s);for(var i in s)"default"!==i&&function(e){n.d(t,e,(function(){return s[e]}))}(i);t["default"]=a.a},a162:function(e,t,n){"use strict";var s=n("4666"),a=n.n(s);a.a},aff4:function(e,t,n){"use strict";var s;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return s}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]},c1cd:function(e,t,n){"use strict";n.r(t);var s=n("aff4"),a=n("7b10");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("a162");var r,o=n("f0c5"),u=Object(o["a"])(a["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],r);t["default"]=u.exports},c704:function(e,t,n){"use strict";(function(e){n("334b");s(n("66fd"));var t=s(n("c1cd"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["c704","common/runtime","common/vendor"]]]);