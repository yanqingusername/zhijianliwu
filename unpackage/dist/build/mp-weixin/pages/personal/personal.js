(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personal/personal"],{"0861":function(t,e,n){},"23d0":function(t,e,n){"use strict";var i=n("0861"),s=n.n(i);s.a},3050:function(t,e,n){"use strict";(function(t){n("334b");i(n("66fd"));var e=i(n("4685"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},4685:function(t,e,n){"use strict";n.r(e);var i=n("8fc3"),s=n("a9de");for(var a in s)"default"!==a&&function(t){n.d(e,t,(function(){return s[t]}))}(a);n("23d0");var o,r=n("f0c5"),c=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=c.exports},"4b6c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;s(n("e10e"));var i=s(n("e56b"));function s(t){return t&&t.__esModule?t:{default:t}}var a=function(){n.e("components/own-components/own-product-list").then(function(){return resolve(n("599e"))}.bind(null,n)).catch(n.oe)},o={components:{"own-product-list":a},data:function(){return{sign:{balance:"0",zj_balance:"0"},sta:"",nav:"20",bottom:[],topp:"0",coll:"0",parent_member:"",dir:"",commody:[],pageIndex:1,pageSize:10,fixed:0,numberMemberStatus:0,shareInfo:""}},onShow:function(t){1==this.showa&&(this.basic(),this.login(),this.collection(),this.getMemberStatus(),this.coupon(),this.haibao())},onLoad:function(e){var n=this,i=this,s=t.getStorageSync("sign");if(s){console.log("登录状态",s);var a=setTimeout((function(t){i.showa=1,clearTimeout(a)}),100);this.basic(),this.login(),this.collection(),this.getMemberStatus(),this.coupon(),this.haibao(),this.sta="200"}else this.sta="0";t.getSystemInfo({success:function(t){n.nav=t.statusBarHeight}});var o=JSON.stringify({pageIndex:this.pageIndex,pageSize:this.pageSize,member_level:t.getStorageSync("level")}),r="get_tuijian_goods";this.$utils.post(r,o).then((function(e){1==e.sta&&(t.stopPullDownRefresh(),console.log("4.推荐商品列表",e.rs),n.commody=e.rs,n.pageIndex++)}));var c=JSON.stringify({type:"4"}),u="get_share_img";this.$utils.post(u,c).then((function(t){n.shareInfo=t.rs}))},onReachBottom:function(){var e=this;console.log("下一页");var n=JSON.stringify({pageIndex:this.pageIndex,pageSize:this.pageSize,member_level:t.getStorageSync("level")}),i="get_tuijian_goods";this.$utils.post(i,n).then((function(n){1==n.sta&&(t.stopPullDownRefresh(),console.log("4.推荐商品列表",n.rs),e.commody=e.commody.concat(n.rs),e.pageIndex++)}))},onPageScroll:function(t){t.scrollTop>70?this.fixed=1:t.scrollTop<70&&(this.fixed=0)},onShareAppMessage:function(t){return i.default.track("page_share_app_message",{from_type:"menu",share_title:"指间礼物",share_path:"/pages/personal/personal",share_image_url:"",share_to:"friends"}),{title:this.shareInfo.title||"我发现了一个不错的送礼平台～",imageUrl:this.shareInfo.share_img||"https://zhijianlw.com/static/web/img/share_img.png",path:this.shareInfo.url||"/pages/index/index"}},methods:{trackClick:function(t){i.default.track("start_consult",{action_type:"consult_online"})},haibao:function(e){var n=this,i=t.getStorageSync("id");this.parent_member=i;var s='{"scene":"'+i+'","page":"pages/signin/signin"}';console.log(s);var a="get_haibao";this.$utils.post(a,s).then((function(t){console.log("生成海报",t),n.dir=t.dir}))},coupon:function(e){var n=this,i="get_coupon_number_list",s="coupon",a=t.getStorageSync("id"),o=JSON.stringify({memberid:a,status:1});this.$utils.postNew(i,o,s).then((function(t){1==t.sta&&(n.topp=t.rs.length)}))},getMemberStatus:function(){var e=this,n="get_member_audit_status",i="member",s=t.getStorageSync("id"),a=JSON.stringify({memberid:s});this.$utils.postNew(n,a,i).then((function(t){1==t.sta&&(1==t.rs.status||(2==t.rs.status||3==t.rs.status?e.numberMemberStatus=1:4==t.rs.status||(e.numberMemberStatus=0)))}))},collection:function(e){var n=this,i=t.getStorageSync("id"),s='{"memberid":"'+i+'"}',a="get_goods_collect";this.$utils.post(a,s).then((function(t){console.log("收藏列表",t.rs.length),n.coll=t.rs.length}))},basic:function(t){var e="{}",n="get_webconfig_wode";this.$utils.post(n,e).then((function(t){console.log("基本配置",t)}))},login:function(){var e=this,n=(this.Data,t.getStorageSync("openid")),i='{"wx_openid":"'+n+'"}';console.log(i);var s="member_login";this.$utils.post(s,i).then((function(n){console.log("基本信息",n.rs),e.sign=n.rs,t.setStorageSync("NO",n.rs.NO),t.setStorageSync("sign",n.rs),t.setStorageSync("id",n.rs.id),t.setStorageSync("name",n.rs.name),t.setStorageSync("keynum",n.rs.keynum),t.setStorageSync("sex",n.rs.sex),t.setStorageSync("head_img",n.rs.head_img),t.setStorageSync("level_name",n.rs.level_name),t.setStorageSync("level",n.rs.level),t.setStorageSync("balance",n.rs.balance),t.setStorageSync("zj_balance",n.rs.zj_balance),t.setStorageSync("phone",n.rs.phone),null==n.rs.discount_name||""==n.rs.discount_name||t.setStorageSync("discount_name",n.rs.discount_name),null==n.rs.zj_balance||""==n.rs.zj_balance||t.setStorageSync("zj_balance",n.rs.zj_balance),null==n.rs.balance||""==n.rs.balance||t.setStorageSync("balance",n.rs.balance)}))},signIn:function(e){t.navigateTo({url:"../signin/signin"})},like:function(e){t.navigateTo({url:"../Post/PostLike"})},colloection:function(e){t.navigateTo({url:"../index-coupon/ExchangeOrder"})},opening:function(e){if("200"==this.sta){var n="get_member_audit_status",i="member",s=t.getStorageSync("id"),a=JSON.stringify({memberid:s});this.$utils.postNew(n,a,i).then((function(e){1==e.sta&&(1==e.rs.status||(2==e.rs.status||3==e.rs.status?t.showToast({title:e.rs.msg,icon:"none"}):4==e.rs.status||t.navigateTo({url:"../Member/Member?typestring=1"})))}))}else t.navigateTo({url:"../signin/signin"})},openingMember:function(e){"200"==this.sta?t.navigateTo({url:"../Member/Member?typestring=2"}):t.navigateTo({url:"../signin/signin"})},balance:function(e){"200"==this.sta?t.navigateTo({url:"../balance/balance"}):t.navigateTo({url:"../signin/signin"})},balanceRecharge:function(e){"200"==this.sta?t.navigateTo({url:"../balance/Recharge"}):t.navigateTo({url:"../signin/signin"})},wallet:function(e){"200"==this.sta?t.navigateTo({url:"../wallet/wallet"}):t.navigateTo({url:"../signin/signin"})},count:function(e){"200"==this.sta?t.navigateTo({url:"../Coupon/Coupon"}):t.navigateTo({url:"../signin/signin"})},exchange:function(e){"200"==this.sta?t.navigateTo({url:"../index-coupon/index-coupon"}):t.navigateTo({url:"../signin/signin"})},share:function(e){"200"==this.sta?t.navigateTo({url:"../Poster/Poster2?src="+this.dir+"&parent_member="+this.parent_member}):t.navigateTo({url:"../signin/signin"})},giftList:function(e){"200"==this.sta?t.navigateTo({url:"../order/order"}):t.navigateTo({url:"../signin/signin"})},shopList:function(e){"200"==this.sta?t.navigateTo({url:"../shopList/shopList"}):t.navigateTo({url:"../signin/signin"})},order:function(e){"200"==this.sta?t.navigateTo({url:"../orderList/orderList?nav="+e}):t.navigateTo({url:"../signin/signin"})},card:function(){t.navigateTo({url:"../index-coupon/change"})},friend:function(e){"200"==this.sta?t.navigateTo({url:"../Friends/Friends"}):t.navigateTo({url:"../signin/signin"})},text:function(e){if(200==this.sta){var n=e.currentTarget.dataset.index;0==n?t.navigateTo({url:"./gift"}):1==n?t.navigateTo({url:"./guide"}):2==n?t.navigateTo({url:"./cooperation"}):3==n&&t.navigateTo({url:"./service"})}else 0==this.sta&&wx.showToast({title:"请先登录",icon:"none"})},no:function(e){"200"==this.sta?t.showToast({title:"暂未开通",icon:"none",mask:"true"}):wx.showToast({title:"请先登录",icon:"none"})},details:function(e){var n=e.currentTarget.dataset.index;t.navigateTo({url:"/pages/details/details?keynum="+n})},onPullDownRefresh:function(){var e=this;this.pageIndex=1;var n=this,i=t.getStorageSync("sign");if(i){var s=setTimeout((function(t){n.showa=1,clearTimeout(s)}),100);this.basic(),this.login(),this.collection(),this.getMemberStatus(),this.coupon(),this.haibao(),this.sta="200"}else this.sta="0";var a=JSON.stringify({pageIndex:this.pageIndex,pageSize:this.pageSize,member_level:t.getStorageSync("level")}),o="get_tuijian_goods";this.$utils.post(o,a).then((function(n){1==n.sta&&(setTimeout((function(){t.stopPullDownRefresh()}),500),e.commody=n.rs,e.pageIndex++)}))}}};e.default=o}).call(this,n("543d")["default"])},"8fc3":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var s=function(){var t=this,e=t.$createElement;t._self._c},a=[]},a9de:function(t,e,n){"use strict";n.r(e);var i=n("4b6c"),s=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=s.a}},[["3050","common/runtime","common/vendor"]]]);