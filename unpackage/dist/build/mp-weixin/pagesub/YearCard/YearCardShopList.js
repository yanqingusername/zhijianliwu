(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/YearCard/YearCardShopList"],{1495:function(t,e,r){"use strict";r.r(e);var n=r("9592"),a=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"15a1":function(t,e,r){"use strict";(function(t){r("334b");n(r("66fd"));var e=n(r("f541"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,r("543d")["createPage"])},"4e34":function(t,e,r){"use strict";var n=r("f0d9"),a=r.n(n);a.a},"8bb3":function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},9592:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={components:{},data:function(){return{screenPurchase:[],cardid:"",ordernumber:"",isOrder:0}},onLoad:function(e){this.cardid=e.cardid,this.ordernumber=e.ordernumber,t.setStorageSync("dh_cardid",this.cardid)},onShow:function(){t.showToast({icon:"loading",title:"加载中"}),this.getProductList()},methods:{getProductList:function(){var t=this,e="get_cardbag_goods_list",r="goods",n=JSON.stringify({cardid:this.cardid,ordernumber:this.ordernumber});this.$utils.postNew(e,n,r).then((function(e){t.screenPurchase=e.rs.goods_list}))},handlerOrderInfo:function(e){var r=e.currentTarget.dataset.keynum;t.navigateTo({url:"/pages/details/details?keynum="+r})},go_exchange:function(e){var r=e.currentTarget.dataset.keynum;t.navigateTo({url:"/pages/index-coupon/index-address?good_keynum="+r+"&isOrder="+this.isOrder+"&isYear=1&ordernumber="+this.ordernumber})}}};e.default=r}).call(this,r("543d")["default"])},f0d9:function(t,e,r){},f541:function(t,e,r){"use strict";r.r(e);var n=r("8bb3"),a=r("1495");for(var o in a)"default"!==o&&function(t){r.d(e,t,(function(){return a[t]}))}(o);r("4e34");var u,i=r("f0c5"),d=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=d.exports}},[["15a1","common/runtime","common/vendor"]]]);