(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index-coupon/ConversionDetails"],{4151:function(e,t,n){"use strict";var r=n("5093"),a=n.n(r);a.a},"4b72":function(e,t,n){"use strict";n.r(t);var r=n("59b3"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},5093:function(e,t,n){},"59b3":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(n("e2fe"));function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o={data:function(){var e;return e={liwu:[],zhufu_msg:"",send_talk_msg:"",cardbag_number:"",cardbag:"",level_name:"",sign:"",type:"",goodslist:[],com:1,cardbag_in_people:[]},a(e,"cardbag",[]),a(e,"cardbag_theme",[]),a(e,"gift","0"),a(e,"w",""),a(e,"schedule","0"),a(e,"movable_x","0"),a(e,"distance","0"),a(e,"duration",""),a(e,"stop","0"),a(e,"width",""),a(e,"zhufu_mp4",""),a(e,"zhufu_mp3",""),a(e,"radio",!0),a(e,"receive_info",""),a(e,"typestring",1),e},onLoad:function(t){var n=this,r=t.cardbag_number;this.cardbag_number=r;var a=e.getStorageSync("id");this.memberid=a;var o='{"memberid":"'+a+'","cardbag_number":"'+r+'"}',i="get_cardbag_fenshu";this.$utils.post(i,o).then((function(e){1==e.rs[0].goodsinfo.length?(n.goodslist=e.rs[0].goodsinfo,n.com=1):(n.goodslist=e.rs[0].goodsinfo,n.com=2),console.log(e.rs[0])}));var c=JSON.stringify({cardbag_number:r,cardbag_detail_id:"0",merberid:a}),s="get_cardbag_detail";this.$utils.post(s,c).then((function(e){n.typestring=e.cardbag.type,console.log("礼包信息"),console.log(e),n.cardbag_in_people=e.cardbag_in_people,n.cardbag=e.cardbag,n.cardbag_theme=e.cardbag_theme,n.zhufu_mp3=e.cardbag_theme.zhufu_mp3,n.price=e.cardbag.price,n.receive_info=e.receive_info,"1"==e.cardbag_theme.zhufu_type?n.gift="1":"0"==e.cardbag_theme.zhufu_type?n.gift="0":n.gift="2"}))},methods:{scroll:function(e){console.log(e),this.distance=e.detail.x},resend:function(){var t="order_add_shopping_cart",n=e.getStorageSync("id"),r="order",a=JSON.stringify({ordernumber:this.cardbag.cardbag_number,memberid:n});this.$utils.postNew(t,a,r).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))}},onShareAppMessage:function(t){var n=this.cardbag.cardbag_number;console.log(n);var r="share_cardbag",a=JSON.stringify({cardbag_number:n});this.$utils.post(r,a).then((function(e){console.log("结果",e)}));var o="pages/shopping/receive?cardbag_number="+this.cardbag.cardbag_number;return 1==this.typestring&&(o="pages/shopping/CBlessingCardWe?cardbag_number="+this.cardbag.cardbag_number),{title:this.cardbag_theme.send_talk_msg,provider:"weixin",scene:"WXSceneSession",path:o,type:0,imageUrl:this.cardbag_theme.background,success:function(t){console.log(456),e.showToast({title:"分享成功"})},fail:function(t){e.showToast({title:"分享失败",icon:"none"})},complete:function(e){console.log(289)}}}};t.default=o}).call(this,n("543d")["default"])},"76d6":function(e,t,n){"use strict";n.r(t);var r=n("9ffb"),a=n("4b72");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("4151");var i,c=n("f0c5"),s=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=s.exports},8838:function(e,t,n){"use strict";(function(e){n("334b");r(n("66fd"));var t=r(n("76d6"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"9ffb":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement,n=(e._self._c,1==e.com?e.__map(e.goodslist,(function(t,n){var r=e.__get_orig(t),a=e.$utils.imageUrl(t.head_img),o=e.$utils.cut_str(t.goodsname,6);return{$orig:r,g0:a,g1:o}})):null),r=2==e.com?e.__map(e.goodslist,(function(t,n){var r=e.__get_orig(t),a=e.$utils.imageUrl(t.head_img),o=e.$utils.cut_str(t.goodsname,9);return{$orig:r,g2:a,g3:o}})):null,a=e.__map(e.cardbag_in_people,(function(t,n){var r=e.__get_orig(t),a=1!=e.cardbag.type?e.$utils.cut_str(t.goods_name,11):null;return{$orig:r,g4:a}}));e.$mp.data=Object.assign({},{$root:{l0:n,l1:r,l2:a}})},o=[]}},[["8838","common/runtime","common/vendor"]]]);