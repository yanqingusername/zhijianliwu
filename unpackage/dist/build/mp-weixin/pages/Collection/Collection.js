(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Collection/Collection"],{"0794":function(e,t,n){},"2b69":function(e,t,n){"use strict";n.r(t);var i=n("39a0"),o=n("3ee7");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("defb");var a,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);t["default"]=c.exports},"39a0":function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.commodity,(function(t,n){var i=e.__get_orig(t),o=e.$utils.imageUrl(t.head_img);return{$orig:i,g0:o}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},r=[]},"3ee7":function(e,t,n){"use strict";n.r(t);var i=n("8371"),o=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=o.a},8371:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("e2fe"));function o(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{commodity:[],level:"",level_name:"",discount_name:"",id:"",showa:"",url:""}},onShow:function(){var t=this;if(1==this.showa){this.id=e.getStorageSync("id"),this.level=e.getStorageSync("level"),this.level_name=e.getStorageSync("level_name"),this.discount_name=e.getStorageSync("discount_name");var n=e.getStorageSync("id"),i='{"memberid":"'+n+'"}',o="get_goods_collect";this.$utils.post(o,i).then((function(e){for(var n in console.log("收藏列表",e),e.rs)e.rs[n].discount_name1=(e.rs[n].price_level1/e.rs[n].price*10).toFixed(1)+"折",e.rs[n].discount_name2=(e.rs[n].price_level2/e.rs[n].price*10).toFixed(1)+"折",e.rs[n].discount_name3=(e.rs[n].price_level3/e.rs[n].price*10).toFixed(1)+"折",e.rs[n].discount_name4=(e.rs[n].price_level4/e.rs[n].price*10).toFixed(1)+"折";t.commodity=e.rs}))}},onLoad:function(t){var n=this;this.url=i.default.URL;var o=this,r=setTimeout((function(e){o.showa=1,clearTimeout(r)}),100);this.id=e.getStorageSync("id"),this.level=e.getStorageSync("level"),this.level_name=e.getStorageSync("level_name"),this.discount_name=e.getStorageSync("discount_name");var a=e.getStorageSync("id"),s='{"memberid":"'+a+'"}',c="get_goods_collect";this.$utils.post(c,s).then((function(e){for(var t in console.log("收藏列表",e),e.rs)e.rs[t].discount_name1=(e.rs[t].price_level1/e.rs[t].price*10).toFixed(1)+"折",e.rs[t].discount_name2=(e.rs[t].price_level2/e.rs[t].price*10).toFixed(1)+"折",e.rs[t].discount_name3=(e.rs[t].price_level3/e.rs[t].price*10).toFixed(1)+"折",e.rs[t].discount_name4=(e.rs[t].price_level4/e.rs[t].price*10).toFixed(1)+"折";n.commodity=e.rs}))},methods:{give:function(t){var n=t.currentTarget.dataset.id,i='{"memberid":"'+this.id+'","goodsid":"'+n+'","goodsnum":"1"}',o="add_goods_to_giftbag";this.$utils.post(o,i).then((function(t){console.log("添加购物车",t),e.navigateTo({url:"../shopping/shop"})}))},details:function(t){var n=t.currentTarget.dataset.index;e.navigateTo({url:"/pages/details/details?keynum="+n})}}};t.default=r}).call(this,n("543d")["default"])},a7a1:function(e,t,n){"use strict";(function(e){n("334b");i(n("66fd"));var t=i(n("2b69"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},defb:function(e,t,n){"use strict";var i=n("0794"),o=n.n(i);o.a}},[["a7a1","common/runtime","common/vendor"]]]);