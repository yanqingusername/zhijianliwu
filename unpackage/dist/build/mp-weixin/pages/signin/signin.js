(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/signin/signin"],{"0b2a":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=r(t("e56b"));function r(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{Data:"",receive:"",parent_member:"",cardbag_number:""}},onLoad:function(e){this.openid(),e.receive&&(this.receive=e.receive,this.cardbag_number=e.cardbag_number),e.scene&&(this.parent_member=e.scene)},methods:{bindGetUserInfo:function(n){n.detail.rawData&&(this.Data=JSON.parse(n.detail.rawData),e.showLoading({title:"登录中",mask:"true"}),this.zhu())},zhu:function(){var n=this,t=this.Data,r=e.getStorageSync("openid");e.setStorageSync("rawdata",t);var s,c=t.nickName.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,"");s=this.parent_member?JSON.stringify({wx_openid:r,parent_member:this.parent_member,name:c,sex:t.gender,head_img:t.avatarUrl}):JSON.stringify({wx_openid:r,name:c,sex:t.gender,head_img:t.avatarUrl});var o="member_register";this.$utils.post(o,s).then((function(t){if("操作成功！"===t.msg||"该用户已经注册,请勿重复注册！"===t.msg){var a='{"wx_openid":"'+r+'"}',s="member_login";n.$utils.post(s,a).then((function(t){if(e.setStorageSync("sign",t.rs),e.setStorageSync("id",t.rs.id),e.setStorageSync("name",t.rs.name),e.setStorageSync("keynum",t.rs.keynum),e.setStorageSync("sex",t.rs.sex),e.setStorageSync("head_img",t.rs.head_img),e.setStorageSync("level_name",t.rs.level_name),e.setStorageSync("level",t.rs.level),e.setStorageSync("balance",t.rs.balance),e.setStorageSync("zj_balance",t.rs.zj_balance),e.setStorageSync("phone",t.rs.phone),null==t.rs.discount_name||""==t.rs.discount_name||e.setStorageSync("discount_name",t.rs.discount_name),n.receive){e.hideLoading();var a=n;e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(n){setTimeout((function(n){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+a.cardbag_number})}),1500)}})}else e.hideLoading(),e.showToast({title:"登录成功",icon:"success",mask:"true",success:function(n){setTimeout((function(n){e.reLaunch({url:"../personal/personal"})}),1500)}})}))}else e.showModal({title:"注册失败",content:"可能由于微信昵称包含特殊符号原因导致注册失败，建议修改昵称后重试",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})})),a.default.track("register_wxapp",{}),a.default.track("login_wxapp",{}),a.default.startReport(),a.default.setContext({wx_user:{open_id:r}})},openid:function(){var n=this,t=e.getStorageSync("openid");t||e.login({success:function(t){var a='{"wx_code":"'+t.code+'"}',r="get_openid";n.$utils.post(r,a).then((function(n){e.setStorageSync("openid",n.openid)}))}})}}};n.default=s}).call(this,t("543d")["default"])},"3c7c":function(e,n,t){"use strict";var a;t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return a}));var r=function(){var e=this,n=e.$createElement;e._self._c},s=[]},4666:function(e,n,t){},"7b10":function(e,n,t){"use strict";t.r(n);var a=t("0b2a"),r=t.n(a);for(var s in a)"default"!==s&&function(e){t.d(n,e,(function(){return a[e]}))}(s);n["default"]=r.a},a162:function(e,n,t){"use strict";var a=t("4666"),r=t.n(a);r.a},c1cd:function(e,n,t){"use strict";t.r(n);var a=t("3c7c"),r=t("7b10");for(var s in r)"default"!==s&&function(e){t.d(n,e,(function(){return r[e]}))}(s);t("a162");var c,o=t("f0c5"),i=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=i.exports},c704:function(e,n,t){"use strict";(function(e){t("334b");a(t("66fd"));var n=a(t("c1cd"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])}},[["c704","common/runtime","common/vendor"]]]);