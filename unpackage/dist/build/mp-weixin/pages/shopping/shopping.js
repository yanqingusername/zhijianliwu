(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/shopping"],{"08d2":function(t,s,e){},3650:function(t,s,e){"use strict";e.r(s);var o=e("57ee"),i=e.n(o);for(var n in o)"default"!==n&&function(t){e.d(s,t,(function(){return o[t]}))}(n);s["default"]=i.a},"57ee":function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e={data:function(){return{price_zhe:0,goodsinfo:[],undercarriage_list:[],goodsid:"",flag:!0,type:"",show:"2",gift:!0,chooses:1,numberss:0,com:"",fenshu:1,zhufu_type:0,id:"",setgiftssuccess:"2",setwishessuccess:"2",remark:"大吉大利，恭喜发财！",remarkNumber:0,isShowPop:!1,unShopList:[],cart_goods_id:""}},onShow:function(s){var e=this,o=getCurrentPages(),i=o[o.length-1].route;console.log("当前页面的路由",i);var n=o[o.length-1].options;console.log("当前页面的参数",n);var r=n.type;"undefined"==typeof r&&(r=0),this.type=r;var u=t.getStorageSync("id");this.memberid=u;var a='{"memberid":"'+u+'","buy_type":"'+r+'"}',g="get_giftbag_list";this.$utils.post(g,a).then((function(s){if(console.log("商品",s),s.rs.giftbag.length>=1||s.rs.undercarriage_list>=1){e.goodsinfo=s.rs.giftbag,e.undercarriage_list=s.rs.undercarriage_list,e.price_zhe=s.rs.price_zhe,e.cart_goods_id=s.rs.cart_goods_id;var o=0;for(var i in s.rs.giftbag)o+=Number(s.rs.giftbag[i].goodsnum);e.numberss=o,t.setStorageSync("type",r),e.com=!0}else e.com=!1})),this.setgiftssuccess=t.getStorageSync("setgiftssuccess"),this.setwishessuccess=t.getStorageSync("setwishessuccess");var c=t.getStorageSync("zhufu_type");this.zhufu_type=c,console.log("this.zhufu_type11"),console.log(this.zhufu_type),0==this.zhufu_type?this.zhufu_type="福语":1==this.zhufu_type?this.zhufu_type="语音":2==this.zhufu_type&&(this.zhufu_type="视频"),this.caltotalmoney()},onLoad:function(t){this.caltotalmoney()},methods:{goDel:function(s){var e=this,o=t.getStorageSync("id"),i=this,n="del_shopping_cart",r="goods",u=JSON.stringify({goodsid:s,memberid:o,buy_type:this.type});this.$utils.postNew(n,u,r).then((function(s){if(1==s.sta){e.isShowPop=!1;var o=t.getStorageSync("id"),n='{"memberid":"'+o+'","buy_type":"'+e.type+'"}',r="get_giftbag_list";e.$utils.post(r,n).then((function(t){if(console.log("商品",t),t.rs.giftbag.length>=1||t.rs.undercarriage_list>=1){i.goodsinfo=t.rs.giftbag,i.undercarriage_list=t.rs.undercarriage_list,i.price_zhe=t.rs.price_zhe,i.cart_goods_id=t.rs.cart_goods_id;var s=0;for(var e in t.rs.giftbag)s+=Number(t.rs.giftbag[e].goodsnum);i.numberss=s,i.com=!0}else i.com=!1})),e.caltotalmoney()}}))},inputRemark:function(t){this.remark=t.detail.value,this.remarkNumber=t.detail.value.length},box_gift:function(){t.navigateTo({url:"./shoppingList"})},goToDetails:function(s){t.navigateTo({url:"../details/details?keynum="+s})},increase:function(t){console.log(t);var s=t.goodsid;this.goodsid=s,this.goodsnum=1,this.numberss+=1;var e=t.goodsnum+1;this.give(t,e)},reduce:function(t){var s=t.goodsid;this.goodsnum=-1,this.numberss-=1;var e=t.goodsnum-1;this.goodsid=s,this.give(t,e)},give:function(s,e){var o=this,i=t.getStorageSync("id");this.memberid=i;var n=t.getStorageSync("type");this.type=n;var r='{"memberid":"'+this.memberid+'","goodsid":"'+this.goodsid+'","num":"'+this.goodsnum+'","buy_type":"'+n+'","goods_model":"'+s.goods_model+'","goods_spec":"'+s.goods_spec+'","goods_item":"'+s.goods_spec_item+'"}',u="op_buy_shopping_cart";console.log(r),this.$utils.post(u,r).then((function(t){console.log("添加购物车",t);var s='{"memberid":"'+o.memberid+'","buy_type":"'+n+'"}',e="get_giftbag_list";o.$utils.post(e,s).then((function(t){if(console.log("更改价格",t),t.rs.giftbag.length>=1||o.undercarriage_list>=1){o.goodsinfo=t.rs.giftbag,o.undercarriage_list=t.rs.undercarriage_list,o.price_zhe=t.rs.price_zhe,o.cart_goods_id=t.rs.cart_goods_id;var s=0;for(var e in t.rs.giftbag)s+=Number(t.rs.giftbag[e].goodsnum);o.numberss=s,o.com=!0}else o.com=!1;o.caltotalmoney()}))}))},changefenshu:function(t){console.log("获取价格接口"),this.caltotalmoney()},caltotalmoney:function(s){var e=this,o=this.fenshu,i=t.getStorageSync("id");1!=this.show&&0!=this.show||(o=1);var n="get_fenshu_price",r=JSON.stringify({memberid:i,fenshu:o,buy_type:0});this.$utils.post(n,r).then((function(s){console.log(s);var o="success";if(1!=s.sta)return o="none",void t.showToast({icon:o,title:s.msg,duration:2e3});e.price_zhe=s.rs.price_zhe}))},add:function(s){t.navigateTo({url:"./shoppingList"})},open:function(){this.$refs.popup.open()},toggle:function(t){this.$refs.popup.open()},close:function(t){this.$refs.popup.close()},chooseGift:function(s){t.navigateTo({url:"../shopping/CBlessingCard"})},wishes:function(s){var e=t.getStorageSync("zhufu_type");this.zhufu_type=e;var o=t.getStorageSync("id");if(this.memberid=o,this.zhufu_type==this.zhufu_type){var i="get_giftbag_list",n=JSON.stringify({memberid:this.memberid,buy_type:0});this.$utils.post(i,n).then((function(s){console.log("直接赠送"),console.log(s);var e="success";1!=s.sta&&(e="none",t.showToast({icon:e,title:s.msg,duration:2e3})),t.navigateTo({url:"../shopping/wishes?type=0"})}))}},box1:function(){this.show="2",this.$refs.popup.close(),this.caltotalmoney()},box2:function(){this.show="1",this.$refs.popup.close(),this.caltotalmoney()},box3:function(){this.show="0",this.$refs.popup.close(),this.caltotalmoney()},packages:function(s){var e=this;if("2"===this.show){if(this.setgiftssuccess=t.getStorageSync("setgiftssuccess")||2,2==this.setgiftssuccess)return void t.showToast({icon:"none",title:"请先定制祝福卡！"});var o=t.getStorageSync("type");this.type=o;var i=t.getStorageSync("id");this.memberid=i;var n='{"memberid":"'+i+'","buy_type":"'+o+'","cart_goods_id":"'+this.cart_goods_id+'"}',r="get_buy_shopping_cart";this.$utils.post(r,n).then((function(s){console.log(s),1==s.sta?(0==s.rs.goodslist.length&&t.showToast({icon:"none",title:"当前礼袋无商品"}),null!=e.zhufu_type&&null!=e.chooses&&0!=s.rs.goodslist.length&&t.navigateTo({url:"../shopping/packages?type=0&fenshu="+e.fenshu+"&wanfa=1"})):2==s.sta&&(e.isShowPop=!0,e.unShopList=s.rs.undercarriage_list)}))}else if("1"===this.show){var u=t.getStorageSync("type");this.type=u;var a=t.getStorageSync("id");this.memberid=a;n='{"memberid":"'+a+'","buy_type":"'+u+'","cart_goods_id":"'+this.cart_goods_id+'"}',r="get_buy_shopping_cart";this.$utils.post(r,n).then((function(s){console.log("商品信息11",s),1==s.sta?(0==s.rs.goodslist.length&&t.showToast({icon:"success",title:"当前礼袋无商品"}),null!=e.zhufu_type&&null!=e.chooses&&0!=s.rs.goodslist.length&&(e.$forceUpdate(),t.navigateTo({url:"../shopping/packages?type=0&fenshu=1&wanfa=4&remark="+e.remark}))):2==s.sta&&(e.isShowPop=!0,e.unShopList=s.rs.undercarriage_list)}))}else{var g=t.getStorageSync("type");this.type=g;var c=t.getStorageSync("id");this.memberid=c;n='{"memberid":"'+c+'","buy_type":"'+g+'","cart_goods_id":"'+this.cart_goods_id+'"}',r="get_buy_shopping_cart";this.$utils.post(r,n).then((function(s){console.log(s),1==s.sta?(0==s.rs.goodslist.length&&t.showToast({icon:"success",title:"当前礼袋无商品"}),null!=e.zhufu_type&&null!=e.chooses&&0!=s.rs.goodslist.length&&t.navigateTo({url:"../shopping/must?type=0"})):2==s.sta&&(e.isShowPop=!0,e.unShopList=s.rs.undercarriage_list)}))}}}};s.default=e}).call(this,e("543d")["default"])},a5f9:function(t,s,e){"use strict";(function(t){e("334b");o(e("66fd"));var s=o(e("c394"));function o(t){return t&&t.__esModule?t:{default:t}}t(s.default)}).call(this,e("543d")["createPage"])},b057:function(t,s,e){"use strict";var o=e("08d2"),i=e.n(o);i.a},c394:function(t,s,e){"use strict";e.r(s);var o=e("fae5"),i=e("3650");for(var n in i)"default"!==n&&function(t){e.d(s,t,(function(){return i[t]}))}(n);e("b057");var r,u=e("f0c5"),a=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);s["default"]=a.exports},fae5:function(t,s,e){"use strict";e.d(s,"b",(function(){return i})),e.d(s,"c",(function(){return n})),e.d(s,"a",(function(){return o}));var o={uniPopup:function(){return e.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(e.bind(null,"f3d2"))}},i=function(){var t=this,s=t.$createElement,e=(t._self._c,0==t.com?t.$utils.osspath_url("/xcx-static/xiong.png"):null),o=0!=t.com?t.__map(t.goodsinfo,(function(s,e){var o=t.__get_orig(s),i=t.$utils.imageUrl(s.goodsinfo.head_img),n=t.$utils.cut_str(s.goodsinfo.goodsname,16);return{$orig:o,g1:i,g2:n}})):null,i=0!=t.com?t.__map(t.undercarriage_list,(function(s,e){var o=t.__get_orig(s),i=t.$utils.imageUrl(s.goodsinfo.head_img),n=t.$utils.cut_str(s.goodsinfo.goodsname,16);return{$orig:o,g3:i,g4:n}})):null,n=t.isShowPop&&t.unShopList.length>0&&1==t.unShopList.length?t.__map(t.unShopList,(function(s,e){var o=t.__get_orig(s),i=t.$utils.cut_str(s.goodsname,16);return{$orig:o,g5:i}})):null;t._isMounted||(t.e0=function(s,e){var o=arguments[arguments.length-1].currentTarget.dataset,i=o.eventParams||o["event-params"];e=i.item;return t.goDel.stop(e.goodsinfo.id)}),t.$mp.data=Object.assign({},{$root:{g0:e,l0:o,l1:i,l2:n}})},n=[]}},[["a5f9","common/runtime","common/vendor"]]]);