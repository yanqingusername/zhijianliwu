(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index-coupon/redemption_center"],{"0c88":function(t,n,o){"use strict";var e;o.d(n,"b",(function(){return a})),o.d(n,"c",(function(){return r})),o.d(n,"a",(function(){return e}));var a=function(){var t=this,n=t.$createElement,o=(t._self._c,t.__map(t.goodslist,(function(n,o){var e=t.__get_orig(n),a=t.$utils.imageUrl(n.head_img);return{$orig:e,g0:a}})));t.$mp.data=Object.assign({},{$root:{l0:o}})},r=[]},"3a42":function(t,n,o){"use strict";(function(t){o("334b");e(o("66fd"));var n=e(o("f3b0"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},"486d":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{goodslist:[]}},onLoad:function(n){var o=this;console.log(n),t.showToast({icon:"loading",title:"加载中"});var e=n.cardid;t.setStorageSync("dh_cardid",e);var a=t.getStorageSync("id"),r="get_card_goods",i=JSON.stringify({cardid:e,memberid:a});this.$utils.post(r,i).then((function(t){console.log("获取商品列表",t),o.goodslist=t.rs}))},methods:{goto:function(){t.navigateTo({url:"./index-address"})},goodsItem:function(t,n){console.log(t),console.log(n)},clickLoadMore:function(n){t.showToast({icon:"none",title:"当前状态："+n.detail.status})},confirm_order:function(n){console.log(n);var o=n.currentTarget.dataset.keynum;t.navigateTo({url:"./index-address?good_keynum="+o})}}};n.default=o}).call(this,o("543d")["default"])},"4f9b":function(t,n,o){"use strict";o.r(n);var e=o("486d"),a=o.n(e);for(var r in e)"default"!==r&&function(t){o.d(n,t,(function(){return e[t]}))}(r);n["default"]=a.a},aab6:function(t,n,o){"use strict";var e=o("be40"),a=o.n(e);a.a},be40:function(t,n,o){},f3b0:function(t,n,o){"use strict";o.r(n);var e=o("0c88"),a=o("4f9b");for(var r in a)"default"!==r&&function(t){o.d(n,t,(function(){return a[t]}))}(r);o("aab6");var i,c=o("f0c5"),u=Object(c["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);n["default"]=u.exports}},[["3a42","common/runtime","common/vendor"]]]);