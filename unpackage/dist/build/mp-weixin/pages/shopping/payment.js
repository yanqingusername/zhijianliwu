(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/payment"],{"01d6":function(t,e,n){"use strict";var r=n("5421"),i=n.n(r);i.a},"0f69":function(t,e,n){"use strict";n.r(e);var r=n("b762"),i=n("2feb");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("01d6");var u,a=n("f0c5"),c=Object(a["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);e["default"]=c.exports},"2feb":function(t,e,n){"use strict";n.r(e);var r=n("6b28"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},5421:function(t,e,n){},"6b28":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{price_zhe:0,list1:[],payinfo:{},orderinfo:{}}},onLoad:function(e){var n=this,r=e.type,i=t.getStorageSync("price_zhe");this.price_zhe=i;var o=t.getStorageSync("memberid");this.memberid=o;var u='{"memberid":"'+o+'","buy_type":"'+r+'"}',a="get_buy_shopping_cart";this.$utils.post(a,u).then((function(t){console.log("商品信息",t)}));u=JSON.stringify({a:0,member_level:t.getStorageSync("level")}),a="get_tuijian_goods";this.$utils.post(a,u).then((function(t){console.log("推荐商品：",t),n.list1=t.rs}));var c=e.ordernumber,f=t.getStorageSync("id"),s='{"ordernumber":"'+c+'","memberid":"'+f+'"}';a="get_order_info";this.$utils.post(a,s).then((function(t){console.log(t),n.payinfo=t.payinfo,n.orderinfo=t.orderinfo}))},methods:{buy:function(e){t.reLaunch({url:"../index/index"})},dingdan:function(e){t.navigateTo({url:"../orderList/orderList"})}}};e.default=n}).call(this,n("543d")["default"])},a4e2:function(t,e,n){"use strict";(function(t){n("334b");r(n("66fd"));var e=r(n("0f69"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b762:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.list1,(function(e,n){var r=t.__get_orig(e),i=t.$utils.imageUrl(e.head_img);return{$orig:r,g0:i}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]}},[["a4e2","common/runtime","common/vendor"]]]);