(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/succes"],{"22f3":function(e,a,t){"use strict";var r;t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return g})),t.d(a,"a",(function(){return r}));var n=function(){var e=this,a=e.$createElement,t=(e._self._c,1==e.com?e.__map(e.gift,(function(a,t){var r=e.__get_orig(a),n=1==e.com?e.$utils.imageUrl(a.head_img):null;return{$orig:r,g0:n}})):null),r=2==e.com&&e.isShowAll?e.__map(e.gift,(function(a,t){var r=e.__get_orig(a),n=e.$utils.imageUrl(a.head_img);return{$orig:r,g1:n}})):null,n=2!=e.com||e.isShowAll?null:e.__map(e.gift,(function(a,t){var r=e.__get_orig(a),n=t<2?e.$utils.imageUrl(a.head_img):null;return{$orig:r,g2:n}}));e.$mp.data=Object.assign({},{$root:{l0:t,l1:r,l2:n}})},g=[]},"30ea":function(e,a,t){},5638:function(e,a,t){"use strict";t.r(a);var r=t("efb4"),n=t.n(r);for(var g in r)"default"!==g&&function(e){t.d(a,e,(function(){return r[e]}))}(g);a["default"]=n.a},"5da7":function(e,a,t){},"892b":function(e,a,t){"use strict";var r=t("5da7"),n=t.n(r);n.a},"8fee":function(e,a,t){"use strict";var r=t("30ea"),n=t.n(r);n.a},e7db:function(e,a,t){"use strict";t.r(a);var r=t("22f3"),n=t("5638");for(var g in n)"default"!==g&&function(e){t.d(a,e,(function(){return n[e]}))}(g);t("8fee"),t("892b");var s,i=t("f0c5"),c=Object(i["a"])(n["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],s);a["default"]=c.exports},efb4:function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t("e56b"));function n(e){return e&&e.__esModule?e:{default:e}}var g={data:function(){return{com:1,gift:[],length:0,index:0,current:0,dataList:[],cardbag_theme:{},cardbag:{},isShowAll:!1,typestring:1}},onLoad:function(a){var t=this;e.setStorageSync("all_cover_bg",""),e.setStorageSync("all_cover_id",""),e.setStorageSync("setgiftssuccess","2"),e.setStorageSync("setwishessuccess","2");var r=a.cardbag_number,n=e.getStorageSync("id"),g=JSON.stringify({cardbag_number:r,cardbag_detail_id:"0",merberid:n}),s="get_cardbag_detail";this.$utils.post(s,g).then((function(a){t.cardbag_theme=a.cardbag_theme,t.cardbag=a.cardbag,1==a.cardbag.type_number?t.com=1:t.com=2,t.typestring=a.cardbag.type,1==a.goods_list.length?(t.gift=a.goods_list,t.cardbag_number=a.cardbag.cardbag_number,e.setStorageSync("cardbag_number",a.cardbag.cardbag_number)):1==a.cardbag.type?(a.type1_goodslist&&a.type1_goodslist[0].length,t.gift=a.type1_goodslist[0],t.length=a.type1_goodslist.length):(t.gift=a.goods_list,t.length=a.goods_list.length)})),e.showShareMenu({withShareTicket:!0,isPrivateMessage:!0}),e.updateShareMenu({withShareTicket:!0,isPrivateMessage:!0})},methods:{shouye:function(){e.reLaunch({url:"../index/index"})},test_tz:function(){e.navigateTo({url:"../shopping/receive?cardbag_number="+this.cardbag.cardbag_number})},hidden:function(a){var t=this,r=e.getStorageSync("id"),n="get_cardbag_detail",g=JSON.stringify({cardbag_number:this.cardbag.cardbag_number,cardbag_detail_id:0,merberid:r});this.$utils.post(n,g).then((function(e){console.log("商品信息",e),1==t.typestring?(t.gift=e.type1_goodslist[0],t.length=e.type1_goodslist.length):(t.gift=e.goods_list,t.length=e.goods_list.length),t.isShowAll=!t.isShowAll}))},firendCard:function(a){var t=this,r=e.getStorageSync("cardbag_number");this.cardbag_number=r;var n="get_cardbag_detail",g=e.getStorageSync("id"),s=JSON.stringify({cardbag_number:this.cardbag.cardbag_number,cardbag_detail_id:0,merberid:g});this.$utils.post(n,s).then((function(a){console.log("商品信息",a),t.background=a.cardbag_theme.background,t.send_talk_msg=a.cardbag_theme.send_talk_msg,e.setStorageSync("background",a.cardbag_theme.background),e.setStorageSync("send_talk_msg",a.cardbag_theme.send_talk_msg),e.navigateTo({url:"../shopping/CBlessingCardShare?cardbag_number="+t.cardbag.cardbag_number})}))},firend:function(a){var t=this,r=e.getStorageSync("cardbag_number");this.cardbag_number=r;var n="get_cardbag_detail",g=e.getStorageSync("id"),s=JSON.stringify({cardbag_number:this.cardbag.cardbag_number,cardbag_detail_id:0,merberid:g});this.$utils.post(n,s).then((function(a){console.log("商品信息",a),t.background=a.cardbag_theme.background,t.send_talk_msg=a.cardbag_theme.send_talk_msg,e.setStorageSync("background",a.cardbag_theme.background),e.setStorageSync("send_talk_msg",a.cardbag_theme.send_talk_msg),e.navigateTo({url:"../shopping/share?cardbag_number="+t.cardbag.cardbag_number})}))},resend:function(){var a="order_add_shopping_cart",t=e.getStorageSync("id"),r="order",n=JSON.stringify({ordernumber:this.cardbag.cardbag_number,memberid:t});this.$utils.postNew(a,n,r).then((function(a){1==a.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))},shou:function(a){var t=this,r=e.getStorageSync("cardbag_number");this.cardbag_number=r,console.log("cardbag_number"),console.log(this.cardbag_number);var n="get_cardbag_detail",g=e.getStorageSync("id"),s=JSON.stringify({cardbag_number:this.cardbag_number,cardbag_detail_id:0,merberid:g});this.$utils.post(n,s).then((function(a){console.log("商品信息",a),t.background=a.cardbag_theme.background,t.send_talk_msg=a.cardbag_theme.send_talk_msg,e.setStorageSync("background",a.cardbag_theme.background),e.setStorageSync("send_talk_msg",a.cardbag_theme.send_talk_msg),e.navigateTo({url:"../shopping/receive?cardbag_number="+t.cardbag_number})}))},shareType:function(){var a=this;e.requestSubscribeMessage({tmplIds:["MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk","UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"],success:function(t){if("accept"==t["MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk"]&&"accept"==t["UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"]){var r="add_wx_subscribe_log",n="subscribe",g=e.getStorageSync("id"),s=JSON.stringify({memberid:g,template_id:"MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk,UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"});a.$utils.postNew(r,s,n).then((function(e){e.sta}))}},fail:function(e){}})}},onShareAppMessage:function(a){var t=this.cardbag.cardbag_number;this.cardbag_number=t,console.log(t);var n="share_cardbag",g=JSON.stringify({cardbag_number:t});this.$utils.post(n,g).then((function(e){console.log("结果",e)}));var s="pages/shopping/receive?cardbag_number="+this.cardbag.cardbag_number;return 1==this.typestring&&(s="pages/shopping/CBlessingCardWe?cardbag_number="+this.cardbag.cardbag_number),r.default.track("page_share_app_message",{from_type:"menu",share_title:this.cardbag_theme.send_talk_msg,share_path:s,share_image_url:this.cardbag_theme.share_background,share_to:"friends"}),{title:this.cardbag_theme.send_talk_msg,provider:"weixin",scene:"WXSceneSession",path:s,type:0,imageUrl:this.cardbag_theme.share_background,success:function(a){console.log(456),e.showToast({title:"分享成功"})},fail:function(a){e.showToast({title:"分享失败",icon:"none"})},complete:function(e){console.log(289)}}}};a.default=g}).call(this,t("543d")["default"])},fa6d:function(e,a,t){"use strict";(function(e){t("334b");r(t("66fd"));var a=r(t("e7db"));function r(e){return e&&e.__esModule?e:{default:e}}e(a.default)}).call(this,t("543d")["createPage"])}},[["fa6d","common/runtime","common/vendor"]]]);