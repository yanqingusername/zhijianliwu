(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index-coupon/index-address"],{"1eea":function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;n(t("e2fe"));function n(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{goodsinfo:[],address:{},good_keynum:"",remark:"",showInput:!0,showPop:!1}},onLoad:function(o){var t=this;console.log(o),e.showToast({icon:"loading",title:"加载中"});var n=o.good_keynum,s=e.getStorageSync("id");this.memberid=s,this.good_keynum=n;var i="get_goods_detail",d=JSON.stringify({keynum:n,memberid:s});this.$utils.post(i,d).then((function(e){console.log("获取商品详细信息",e),t.goodsinfo=e.rs.goodsinfo}))},onShow:function(o){this.$set(this.address,"id",e.getStorageSync("member_area_id")),this.$set(this.address,"name",e.getStorageSync("member_area_linkman")),this.$set(this.address,"phone",e.getStorageSync("member_area_linktel")),this.$set(this.address,"address",e.getStorageSync("member_area_address"))},methods:{close:function(){this.showInput=!0,this.showPop=!1},clickHandler:function(){this.showPop=!1,this.showInput=!0,e.redirectTo({url:"./ExchangeOrder"})},sub:function(o){var t=this,n=JSON.stringify({memberid:this.memberid,member_area_id:this.address.id,cardid:e.getStorageSync("dh_cardid"),goodsid:this.goodsinfo.id,goods_model:this.goodsinfo.goods_model,goods_spec:this.goodsinfo["goods_spec"][0]["id"],goods_item:this.goodsinfo["goods_spec"][0]["goods_spec_item"][0]["item"],delivery_type:"快递",remark:this.remark});console.log(n);var s="exchange_giftcard";this.$utils.post(s,n).then((function(o){console.log(o),1==o.sta?(t.showInput=!1,t.showPop=!0):e.showToast({title:o.msg,icon:"none"})}))},choiceAddress:function(){e.navigateTo({url:"../Add/Add?cardbag_number=5"})}}};o.default=s}).call(this,t("543d")["default"])},"4e54":function(e,o,t){"use strict";var n;t.d(o,"b",(function(){return s})),t.d(o,"c",(function(){return i})),t.d(o,"a",(function(){return n}));var s=function(){var e=this,o=e.$createElement,t=(e._self._c,e.$utils.imageUrl(e.goodsinfo.head_img));e.$mp.data=Object.assign({},{$root:{g0:t}})},i=[]},"58c4":function(e,o,t){"use strict";var n=t("c95b"),s=t.n(n);s.a},"820f":function(e,o,t){"use strict";t.r(o);var n=t("1eea"),s=t.n(n);for(var i in n)"default"!==i&&function(e){t.d(o,e,(function(){return n[e]}))}(i);o["default"]=s.a},"8ba9":function(e,o,t){"use strict";(function(e){t("334b");n(t("66fd"));var o=n(t("ebeb"));function n(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("543d")["createPage"])},c95b:function(e,o,t){},ebeb:function(e,o,t){"use strict";t.r(o);var n=t("4e54"),s=t("820f");for(var i in s)"default"!==i&&function(e){t.d(o,e,(function(){return s[e]}))}(i);t("58c4");var d,r=t("f0c5"),a=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],d);o["default"]=a.exports}},[["8ba9","common/runtime","common/vendor"]]]);