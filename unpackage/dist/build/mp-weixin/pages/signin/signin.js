(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/signin/signin"],{"0b2a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("e56b"));function r(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{Data:"",receive:"",parent_member:"",cardbag_number:"",isChecked:!0,AuthStatus:!0,telstring:""}},onLoad:function(t){this.openid();var n=e.getStorageInfoSync("telstring");if(this.telstring=n,t.receive&&(this.receive=t.receive,this.cardbag_number=t.cardbag_number),t.scene){this.parent_member=t.scene;var a=e.getStorageSync("sign");a&&this.getRou()}},methods:{signintext:function(t){e.navigateTo({url:"./signintext"})},selectClick:function(e){this.isChecked=!this.isChecked},bindGetUserInfo:function(t){t.detail.rawData&&(this.Data=JSON.parse(t.detail.rawData),e.showLoading({title:"登录中",mask:"true"}),this.zhu())},toLoginLink:function(){var t=this;e.getUserProfile({desc:"用于完善资料",success:function(e){t.uniGetUserInfo(e)}})},uniGetUserInfo:function(t){var n=this,a="getUserProfile:ok";if(t.errMsg==a){if(!t.userInfo)return;t.rawData&&(n.Data=JSON.parse(t.rawData),e.showLoading({title:"登录中",mask:"true"}),n.zhu(t))}else e.showToast({title:"温馨提示:为了您更好的体验,请授权用户信息",icon:"none"})},zhu:function(t){var n=this,r=this.Data,i=e.getStorageSync("openid");e.setStorageSync("rawdata",r);var s,o=r.nickName.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,"");s=this.parent_member?JSON.stringify({wx_openid:i,parent_member:this.parent_member,name:o,sex:r.gender,head_img:r.avatarUrl}):JSON.stringify({wx_openid:i,name:o,sex:r.gender,head_img:r.avatarUrl});var c="member_register";this.$utils.post(c,s).then((function(t){if("操作成功！"===t.msg||"该用户已经注册,请勿重复注册！"===t.msg){var a='{"wx_openid":"'+i+'"}',r="member_login";n.$utils.post(r,a).then((function(t){e.setStorageSync("sign",t.rs),e.setStorageSync("id",t.rs.id),e.setStorageSync("name",t.rs.name),e.setStorageSync("keynum",t.rs.keynum),e.setStorageSync("sex",t.rs.sex),e.setStorageSync("head_img",t.rs.head_img),e.setStorageSync("level_name",t.rs.level_name),e.setStorageSync("level",t.rs.level),e.setStorageSync("balance",t.rs.balance),e.setStorageSync("zj_balance",t.rs.zj_balance),e.setStorageSync("phone",t.rs.phone),null==t.rs.discount_name||""==t.rs.discount_name||e.setStorageSync("discount_name",t.rs.discount_name),e.hideLoading(),"phone_number"==n.telstring?n.getRou():n.AuthStatus=!1}))}else e.showModal({title:"注册失败",content:"可能由于微信昵称包含特殊符号原因导致注册失败，建议修改昵称后重试",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})})),a.default.track("register_wxapp",{}),a.default.track("login_wxapp",{}),a.default.startReport(),a.default.setUser({open_id:i})},openid:function(){var t=this,n=e.getStorageSync("openid");n||e.login({success:function(n){var a='{"wx_code":"'+n.code+'"}',r="get_openid";t.$utils.post(r,a).then((function(t){e.setStorageSync("openid",t.openid)}))}})},bindPhoneNumber:function(e){console.log(e);var t="getPhoneNumber:ok";e.detail.errMsg==t?this.getMemberPhone(e):this.getRou()},getMemberPhone:function(t){var n=this,a=e.getStorageSync("openid");if(a){var r=JSON.stringify({encrypted_data:t.detail.encryptedData,wx_openid:a,iv:t.detail.iv}),i="get_member_phone_number",s="member";this.$utils.postNew(i,r,s).then((function(t){e.setStorageSync("telstring","phone_number"),n.getRou()}))}},getRou:function(){this.receive?e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(t){setTimeout((function(t){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+this.cardbag_number})}),1500)}}):e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(t){setTimeout((function(t){e.reLaunch({url:"../index/index"})}),1500)}})}}};t.default=i}).call(this,n("543d")["default"])},4666:function(e,t,n){},"7b10":function(e,t,n){"use strict";n.r(t);var a=n("0b2a"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},a162:function(e,t,n){"use strict";var a=n("4666"),r=n.n(a);r.a},c1cd:function(e,t,n){"use strict";n.r(t);var a=n("e1bf"),r=n("7b10");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("a162");var s,o=n("f0c5"),c=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=c.exports},c704:function(e,t,n){"use strict";(function(e){n("334b");a(n("66fd"));var t=a(n("c1cd"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},e1bf:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=[]}},[["c704","common/runtime","common/vendor"]]]);