(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personal/personal"],{"0861":function(n,t,e){},"23d0":function(n,t,e){"use strict";var i=e("0861"),o=e.n(i);o.a},3050:function(n,t,e){"use strict";(function(n){e("334b");i(e("66fd"));var t=i(e("4685"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},4685:function(n,t,e){"use strict";e.r(t);var i=e("e357"),o=e("a9de");for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);e("23d0");var s,r=e("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=c.exports},"4b6c":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;i(e("e10e"));function i(n){return n&&n.__esModule?n:{default:n}}var o=function(){e.e("components/own-components/own-product-list").then(function(){return resolve(e("599e"))}.bind(null,e)).catch(e.oe)},a={components:{"own-product-list":o},data:function(){return{sign:{balance:"0",zj_balance:"0"},sta:"",nav:"20",content:[{src:"../../static/my-chongzhi.png",text:"充值中心"},{src:"../../static/my-qianbao.png",text:"我的钱包"},{src:"../../static/my-kefu.png",text:"在线客服"},{src:"../../static/my-shoucang.png",text:"礼物收藏"}],bottom:[],topp:"0",coll:"0",parent_member:"",dir:"",commody:[],pageIndex:1,pageSize:10}},onShow:function(n){1==this.showa&&(this.basic(),this.login(),this.collection(),this.coupon(),this.haibao())},onLoad:function(t){var e=this,i=this,o=n.getStorageSync("sign");if(o){console.log("登录状态",o);var a=setTimeout((function(n){i.showa=1,clearTimeout(a)}),100);this.basic(),this.login(),this.collection(),this.coupon(),this.haibao(),this.sta="200"}else this.sta="0";n.getSystemInfo({success:function(n){e.nav=n.statusBarHeight}});var s=JSON.stringify({pageIndex:this.pageIndex,pageSize:this.pageSize}),r="get_tuijian_goods";this.$utils.post(r,s).then((function(t){1==t.sta&&(n.stopPullDownRefresh(),console.log("4.推荐商品列表",t.rs),e.commody=t.rs,e.pageIndex++)}))},onReachBottom:function(){var t=this;console.log("下一页");var e=JSON.stringify({pageIndex:this.pageIndex,pageSize:this.pageSize}),i="get_tuijian_goods";this.$utils.post(i,e).then((function(e){1==e.sta&&(n.stopPullDownRefresh(),console.log("4.推荐商品列表",e.rs),t.commody=t.commody.concat(e.rs),t.pageIndex++)}))},methods:{haibao:function(t){var e=this,i=n.getStorageSync("id");this.parent_member=i;var o='{"scene":"'+i+'","page":"pages/signin/signin"}';console.log(o);var a="get_haibao";this.$utils.post(a,o).then((function(n){console.log("生成海报",n),e.dir=n.dir}))},coupon:function(t){var e=this;this.level=n.getStorageSync("level");var i=n.getStorageSync("id"),o='{"memberid":"'+i+'"}',a="get_coupon_number_list",s=[];this.$utils.post(a,o).then((function(n){console.log("我的优惠券",n);var t=(new Date).getTime();for(var i in n.rs)1e3*n.rs[i].coupon_type_info.end_time-t>0&&s.push(n.rs[i]);e.topp=s.length}))},collection:function(t){var e=this,i=n.getStorageSync("id"),o='{"memberid":"'+i+'"}',a="get_goods_collect";this.$utils.post(a,o).then((function(n){console.log("收藏列表",n.rs.length),e.coll=n.rs.length}))},basic:function(n){var t="{}",e="get_webconfig_wode";this.$utils.post(e,t).then((function(n){console.log("基本配置",n)}))},login:function(){var t=this,e=(this.Data,n.getStorageSync("openid")),i='{"wx_openid":"'+e+'"}';console.log(i);var o="member_login";this.$utils.post(o,i).then((function(e){console.log("基本信息",e.rs),t.sign=e.rs,n.setStorageSync("NO",e.rs.NO),n.setStorageSync("sign",e.rs),n.setStorageSync("id",e.rs.id),n.setStorageSync("name",e.rs.name),n.setStorageSync("keynum",e.rs.keynum),n.setStorageSync("sex",e.rs.sex),n.setStorageSync("head_img",e.rs.head_img),n.setStorageSync("level_name",e.rs.level_name),n.setStorageSync("level",e.rs.level),n.setStorageSync("balance",e.rs.balance),n.setStorageSync("zj_balance",e.rs.zj_balance),n.setStorageSync("phone",e.rs.phone),null==e.rs.discount_name||""==e.rs.discount_name||n.setStorageSync("discount_name",e.rs.discount_name),null==e.rs.zj_balance||""==e.rs.zj_balance||n.setStorageSync("zj_balance",e.rs.zj_balance),null==e.rs.balance||""==e.rs.balance||n.setStorageSync("balance",e.rs.balance)}))},signIn:function(t){n.navigateTo({url:"../signin/signin"})},colloection:function(t){n.navigateTo({url:"../Collection/Collection"})},opening:function(t){"200"==this.sta?n.navigateTo({url:"../Member/Member"}):n.navigateTo({url:"../signin/signin"})},balance:function(t){"200"==this.sta?n.navigateTo({url:"../balance/balance"}):n.navigateTo({url:"../signin/signin"})},wallet:function(t){"200"==this.sta?n.navigateTo({url:"../wallet/wallet"}):n.navigateTo({url:"../signin/signin"})},count:function(t){"200"==this.sta?n.navigateTo({url:"../Coupon/Coupon"}):n.navigateTo({url:"../signin/signin"})},exchange:function(t){"200"==this.sta?n.navigateTo({url:"../balance/Recharge"}):n.navigateTo({url:"../signin/signin"})},share:function(t){"200"==this.sta?n.navigateTo({url:"../Poster/Poster2?src="+this.dir+"&parent_member="+this.parent_member}):n.navigateTo({url:"../signin/signin"})},giftList:function(t){"200"==this.sta?n.navigateTo({url:"../order/order"}):n.navigateTo({url:"../signin/signin"})},shopList:function(t){"200"==this.sta?n.navigateTo({url:"../shopList/shopList"}):n.navigateTo({url:"../signin/signin"})},order:function(){"200"==this.sta?n.navigateTo({url:"../orderList/orderList"}):n.navigateTo({url:"../signin/signin"})},card:function(){n.navigateTo({url:"../index-coupon/change"})},friend:function(t){"200"==this.sta?n.navigateTo({url:"../Friends/Friends"}):n.navigateTo({url:"../signin/signin"})},text:function(t){if(200==this.sta){var e=t.currentTarget.dataset.index;0==e?n.navigateTo({url:"./gift"}):1==e?n.navigateTo({url:"./guide"}):2==e?n.navigateTo({url:"./cooperation"}):3==e&&n.navigateTo({url:"./service"})}else 0==this.sta&&wx.showToast({title:"请先登录",icon:"none"})},no:function(t){"200"==this.sta?n.showToast({title:"暂未开通",icon:"none",mask:"true"}):wx.showToast({title:"请先登录",icon:"none"})},details:function(t){var e=t.currentTarget.dataset.index;n.navigateTo({url:"/pages/details/details?keynum="+e})}}};t.default=a}).call(this,e("543d")["default"])},a9de:function(n,t,e){"use strict";e.r(t);var i=e("4b6c"),o=e.n(i);for(var a in i)"default"!==a&&function(n){e.d(t,n,(function(){return i[n]}))}(a);t["default"]=o.a},e357:function(n,t,e){"use strict";var i;e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return i}));var o=function(){var n=this,t=n.$createElement;n._self._c},a=[]}},[["3050","common/runtime","common/vendor"]]]);