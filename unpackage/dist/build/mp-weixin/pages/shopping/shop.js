(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/shop"],{"1b60":function(t,e,s){"use strict";s.d(e,"b",(function(){return i})),s.d(e,"c",(function(){return n})),s.d(e,"a",(function(){return o}));var o={uniPopup:function(){return s.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(s.bind(null,"f3d2"))}},i=function(){var t=this,e=t.$createElement,s=(t._self._c,"exchange"==t.statutype&&1==t.is_exchange_type?t.$utils.cut_str(t.orderInfo.card_name,16):null),o=("exchange"!=t.statutype||1!=t.is_exchange_type)&&t.goodsinfo.length>0?t.__map(t.goodsinfo,(function(e,s){var o=t.__get_orig(e),i=t.$utils.imageUrl(e.goodsinfo.head_img),n=t.$utils.imageUrl(e.goodsinfo.head_img),u=t.$utils.cut_str(e.goodsinfo.goodsname,16);return{$orig:o,g1:i,g2:n,g3:u}})):null,i="exchange"==t.statutype&&1==t.is_exchange_type||t.goodsinfo.length>0?null:t.$utils.osspath_url("/xcx-static/xiong.png");t.$mp.data=Object.assign({},{$root:{g0:s,l0:o,g4:i}})},n=[]},"2f53":function(t,e,s){"use strict";(function(t){s("334b");o(s("66fd"));var e=o(s("6890"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},6890:function(t,e,s){"use strict";s.r(e);var o=s("1b60"),i=s("9538");for(var n in i)"default"!==n&&function(t){s.d(e,t,(function(){return i[t]}))}(n);s("fdae");var u,r=s("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=a.exports},"81f7":function(t,e,s){},9538:function(t,e,s){"use strict";s.r(e);var o=s("ea69"),i=s.n(o);for(var n in o)"default"!==n&&function(t){s.d(e,t,(function(){return o[t]}))}(n);e["default"]=i.a},ea69:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{price_zhe:"0.00",goodsinfo:[],goodsid:"",checknum:"1",flag:!0,type:"",show:"2",gift:!0,zhufu_type:0,chooses:1,length:0,fenshu:1,setgiftssuccess:"2",setwishessuccess:"2",statutype:"",ordernumber:"",orderInfo:"",is_exchange_type:0,numberss:0}},onLoad:function(t){var e=t.type;this.type=e,t&&t.statutype&&t.ordernumber&&(this.statutype=t.statutype,this.ordernumber=t.ordernumber,this.is_exchange_type=t.is_exchange_type)},onShow:function(){var e=this;if(this.setgiftssuccess=t.getStorageSync("setgiftssuccess"),this.setwishessuccess=t.getStorageSync("setwishessuccess"),"exchange"==this.statutype&&1==this.is_exchange_type){var s=this,o="get_exchange_order_info",i="order",n=t.getStorageSync("id"),u=JSON.stringify({ordernumber:this.ordernumber,memberid:n});this.$utils.postNew(o,u,i).then((function(t){1==t.sta&&(s.orderInfo=t.rs)}))}else{var r=this.type,a=t.getStorageSync("id");this.memberid=a;var c='{"memberid":"'+a+'","buy_type":"'+r+'"}',h="get_giftbag_list";this.$utils.post(h,c).then((function(s){console.log("商品信息",s),1===s.sta&&t.showToast({icon:"success",title:s.msg,duration:1e3}),e.goodsinfo=s.rs.giftbag,e.price_zhe=s.rs.price_zhe;var o=0;for(var i in s.rs.giftbag)o+=Number(s.rs.giftbag[i].goodsnum);e.numberss=o})),this.caltotalmoney()}var g=t.getStorageSync("zhufu_type");this.zhufu_type=g,console.log("this.zhufu_type11"),console.log(this.zhufu_type),0==this.zhufu_type?this.zhufu_type="福语":1==this.zhufu_type?this.zhufu_type="语音":2==this.zhufu_type&&(this.zhufu_type="视频")},methods:{goToDetails:function(e){t.navigateTo({url:"../details/details?keynum="+e})},backbutton:function(e){t.navigateBack({delta:1})},caltotalmoney:function(e){var s=this,o=this.fenshu;console.log("show"),console.log(this.show);var i=t.getStorageSync("id");1!=this.show&&0!=this.show||(o=1);var n="get_fenshu_price",u=JSON.stringify({memberid:i,fenshu:o,buy_type:1});this.$utils.post(n,u).then((function(e){console.log(e);var o="success";if(1!=e.sta)return o="none",void t.showToast({icon:o,title:e.msg,duration:2e3});s.price_zhe=e.rs.price_zhe}))},changefenshu:function(t){console.log("获取价格接口"),this.caltotalmoney()},add:function(e){t.redirectTo({url:"./shoppingList"})},box_gift:function(){t.redirectTo({url:"./shoppingList"})},increase:function(t){console.log(t);var e=t.goodsid;this.goodsid=e;var s=t.goodsnum+1;this.numberss+=1,this.give(t,s)},reduce:function(t){var e=t.goodsid,s=t.goodsnum-1;this.goodsid=e,this.numberss-=1,this.give(t,s)},give:function(e,s){var o=this,i=t.getStorageSync("id");this.memberid=i;var n=this.type,u='{"memberid":"'+this.memberid+'","goodsid":"'+this.goodsid+'","num":"'+s+'","buy_type":"'+n+'","goods_model":"'+e.goods_model+'","goods_spec":"'+e.goods_spec+'","goods_item":"'+e.goods_spec_item+'"}',r="op_buy_shopping_cart";console.log(u),this.$utils.post(r,u).then((function(t){console.log("添加购物车",t);var e='{"memberid":"'+o.memberid+'","buy_type":"'+n+'"}',s="get_giftbag_list";o.$utils.post(s,e).then((function(t){console.log("更改价格",t),o.goodsinfo=t.rs.giftbag,o.caltotalmoney()}))}))},open:function(){this.$refs.popup.open("")},toggle:function(t){"exchange"==this.statutype||this.$refs.popup.open("")},close:function(t){this.$refs.popup.close()},chooseGift:function(e){t.navigateTo({url:"../shopping/CBlessingCard"})},wishes:function(e){var s=t.getStorageSync("zhufu_type");this.zhufu_type=s;var o=t.getStorageSync("id");if(this.memberid=o,this.zhufu_type==this.zhufu_type){var i="get_giftbag_list",n=JSON.stringify({memberid:this.memberid,buy_type:1});this.$utils.post(i,n).then((function(e){console.log("直接赠送"),console.log(e);var s="success";1!=e.sta&&(s="none",t.showToast({icon:s,title:e.msg,duration:2e3})),t.navigateTo({url:"../shopping/wishes?type=1"})}))}},box1:function(){this.show="2",this.$refs.popup.close(),this.caltotalmoney()},box2:function(){this.show="1",this.$refs.popup.close(),this.caltotalmoney()},packages:function(e){var s=this;if("exchange"==this.statutype&&1==this.is_exchange_type)t.navigateTo({url:"../index-coupon/ExchangePackages?ordernumber="+this.ordernumber});else if("2"===this.show){if(this.setgiftssuccess=t.getStorageSync("setgiftssuccess")||2,2==this.setgiftssuccess)return void t.showToast({icon:"none",title:"请先定制祝福卡！"});var o=e.type,i=t.getStorageSync("id");this.memberid=i;var n='{"memberid":"'+i+'","buy_type":"'+o+'"}',u="get_buy_shopping_cart";this.$utils.post(u,n).then((function(e){console.log(e),null!=s.zhufu_type&&null!=s.chooses&&t.navigateTo({url:"../shopping/packages?type=1&fenshu="+s.fenshu+"&wanfa=1"})}))}else if("1"===this.show){var r=e.type,a=t.getStorageSync("id");this.memberid=a;n='{"memberid":"'+a+'","buy_type":"'+r+'"}',u="get_buy_shopping_cart";this.$utils.post(u,n).then((function(e){console.log(e),null!=s.zhufu_type&&null!=s.chooses&&t.navigateTo({url:"../shopping/packages?type=1&fenshu=1&wanfa=4"})}))}}}};e.default=s}).call(this,s("543d")["default"])},fdae:function(t,e,s){"use strict";var o=s("81f7"),i=s.n(o);i.a}},[["2f53","common/runtime","common/vendor"]]]);