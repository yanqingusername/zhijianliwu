(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/payment"],{"01d6":function(t,n,e){"use strict";var r=e("5421"),i=e.n(r);i.a},"0f69":function(t,n,e){"use strict";e.r(n);var r=e("620f"),i=e("2feb");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("01d6");var u,a=e("f0c5"),c=Object(a["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);n["default"]=c.exports},"2feb":function(t,n,e){"use strict";e.r(n);var r=e("6b28"),i=e.n(r);for(var o in r)"default"!==o&&function(t){e.d(n,t,(function(){return r[t]}))}(o);n["default"]=i.a},5421:function(t,n,e){},"620f":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return r}));var i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.$utils.osspath_url("/xcx-static/payment/success.png")),r=t.__map(t.list1,(function(n,e){var r=t.__get_orig(n),i=t.$utils.imageUrl(n.head_img);return{$orig:r,g1:i}}));t.$mp.data=Object.assign({},{$root:{g0:e,l0:r}})},o=[]},"6b28":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{price_zhe:0,list1:[],payinfo:{},orderinfo:{}}},onLoad:function(n){var e=this,r=n.type,i=t.getStorageSync("price_zhe");this.price_zhe=i;var o=t.getStorageSync("memberid");this.memberid=o;var u='{"memberid":"'+o+'","buy_type":"'+r+'"}',a="get_buy_shopping_cart";this.$utils.post(a,u).then((function(t){console.log("商品信息",t)}));u=JSON.stringify({a:0}),a="get_tuijian_goods";this.$utils.post(a,u).then((function(t){console.log("推荐商品：",t),e.list1=t.rs}));var c=n.ordernumber,s=t.getStorageSync("id"),f='{"ordernumber":"'+c+'","memberid":"'+s+'"}';a="get_order_info";this.$utils.post(a,f).then((function(t){console.log(t),e.payinfo=t.payinfo,e.orderinfo=t.orderinfo}))},methods:{buy:function(n){t.reLaunch({url:"../index/index"})},dingdan:function(n){t.navigateTo({url:"../orderList/orderList"})}}};n.default=e}).call(this,e("543d")["default"])},a4e2:function(t,n,e){"use strict";(function(t){e("334b");r(e("66fd"));var n=r(e("0f69"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["a4e2","common/runtime","common/vendor"]]]);