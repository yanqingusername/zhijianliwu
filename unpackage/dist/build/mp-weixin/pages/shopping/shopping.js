(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/shopping"],{"08d2":function(t,e,s){},3650:function(t,e,s){"use strict";s.r(e);var o=s("57ee"),i=s.n(o);for(var n in o)"default"!==n&&function(t){s.d(e,t,(function(){return o[t]}))}(n);e["default"]=i.a},"57ee":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(s("e56b")),i=n(s("da8a"));function n(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{price_zhe:0,goodsinfo:[],undercarriage_list:[],goodsid:"",flag:!0,type:"",show:"2",gift:!0,chooses:1,numberss:0,com:"",fenshu:1,zhufu_type:0,id:"",setgiftssuccess:"2",setwishessuccess:"2",remark:"大吉大利，恭喜发财！",remarkNumber:0,isShowPop:!1,unShopList:[],cart_goods_id:"",shareInfo:""}},onShow:function(e){var s=this,o=getCurrentPages(),i=o[o.length-1].route;console.log("当前页面的路由",i);var n=o[o.length-1].options;console.log("当前页面的参数",n);var a=n.type;"undefined"==typeof a&&(a=0),this.type=a;var r=t.getStorageSync("id");this.memberid=r;var u='{"memberid":"'+r+'","buy_type":"'+a+'"}',g="get_giftbag_list";this.$utils.post(g,u).then((function(e){if(console.log("商品",e),e.rs.giftbag.length>=1||e.rs.undercarriage_list>=1){s.goodsinfo=e.rs.giftbag,s.undercarriage_list=e.rs.undercarriage_list,s.price_zhe=e.rs.price_zhe,s.cart_goods_id=e.rs.cart_goods_id;var o=0;for(var i in e.rs.giftbag)o+=Number(e.rs.giftbag[i].goodsnum);s.numberss=o,t.setStorageSync("type",a),s.com=!0}else s.com=!1})),this.setgiftssuccess=t.getStorageSync("setgiftssuccess"),this.setwishessuccess=t.getStorageSync("setwishessuccess");var c=t.getStorageSync("zhufu_type");this.zhufu_type=c,console.log("this.zhufu_type11"),console.log(this.zhufu_type),0==this.zhufu_type?this.zhufu_type="福语":1==this.zhufu_type?this.zhufu_type="语音":2==this.zhufu_type&&(this.zhufu_type="视频"),this.caltotalmoney()},onLoad:function(t){var e=this,s=JSON.stringify({type:"2"}),o="get_share_img";this.$utils.post(o,s).then((function(t){e.shareInfo=t.rs})),this.caltotalmoney()},onShareAppMessage:function(t){return o.default.track("page_share_app_message",{from_type:"menu",share_title:"指间礼物",share_path:"/pages/shopping/shopping",share_image_url:"",share_to:"friends"}),{title:this.shareInfo.title||"我发现了一个不错的送礼平台～",imageUrl:this.shareInfo.share_img||"https://zhijianlw.com/static/web/img/share_img.png",path:this.shareInfo.url||"/pages/index/index"}},methods:{goDel:function(e){var s=this,o=t.getStorageSync("id"),i=this,n="del_shopping_cart",a="goods",r=JSON.stringify({goodsid:e,memberid:o,buy_type:this.type});this.$utils.postNew(n,r,a).then((function(e){if(1==e.sta){s.isShowPop=!1;var o=t.getStorageSync("id"),n='{"memberid":"'+o+'","buy_type":"'+s.type+'"}',a="get_giftbag_list";s.$utils.post(a,n).then((function(t){if(console.log("商品",t),t.rs.giftbag.length>=1||t.rs.undercarriage_list>=1){i.goodsinfo=t.rs.giftbag,i.undercarriage_list=t.rs.undercarriage_list,i.price_zhe=t.rs.price_zhe,i.cart_goods_id=t.rs.cart_goods_id;var e=0;for(var s in t.rs.giftbag)e+=Number(t.rs.giftbag[s].goodsnum);i.numberss=e,i.com=!0}else i.com=!1})),s.caltotalmoney()}}))},inputRemark:function(t){this.remark=t.detail.value,this.remarkNumber=t.detail.value.length},box_gift:function(){t.navigateTo({url:"./shoppingList"})},goToDetails:function(e,s){i.default.trackEvent("Um_Event_ShoppingDetail",{Um_Key_ItemName:s.goodsinfo.goodsname,Um_Key_ItemID:s.goodsinfo.sku}),t.navigateTo({url:"../details/details?keynum="+e})},increase:function(t){console.log(t);var e=t.goodsid;this.goodsid=e,this.goodsnum=1,this.numberss+=1;var s=t.goodsnum+1;this.give(t,s),o.default.track("add_to_cart",{action_type:"append_to_cart",sku:{sku_id:t.goodsinfo.sku+"",sku_name:t.goodsinfo.goodsname+t.goods_spec_item},spu:{spu_id:t.goodsinfo.sku+"",spu_name:t.goodsinfo.goodsname},sku_num:parseInt(this.goodsnum),primary_image_url:t.goodsinfo.head_img})},reduce:function(t){var e=t.goodsid;this.goodsnum=-1,this.numberss-=1;var s=t.goodsnum-1;this.goodsid=e,this.give(t,s),o.default.track("add_to_cart",{action_type:"remove_from_cart",sku:{sku_id:t.goodsinfo.sku+"",sku_name:t.goodsinfo.goodsname+t.goods_spec_item},spu:{spu_id:t.goodsinfo.sku+"",spu_name:t.goodsinfo.goodsname},sku_num:1,primary_image_url:t.goodsinfo.head_img})},give:function(e,s){var o=this,i=t.getStorageSync("id");this.memberid=i;var n=t.getStorageSync("type");this.type=n;var a='{"memberid":"'+this.memberid+'","goodsid":"'+this.goodsid+'","num":"'+this.goodsnum+'","buy_type":"'+n+'","goods_model":"'+e.goods_model+'","goods_spec":"'+e.goods_spec+'","goods_item":"'+e.goods_spec_item+'"}',r="op_buy_shopping_cart";console.log(a),this.$utils.post(r,a).then((function(t){console.log("添加购物车",t);var e='{"memberid":"'+o.memberid+'","buy_type":"'+n+'"}',s="get_giftbag_list";o.$utils.post(s,e).then((function(t){if(console.log("更改价格",t),t.rs.giftbag.length>=1||o.undercarriage_list>=1){o.goodsinfo=t.rs.giftbag,o.undercarriage_list=t.rs.undercarriage_list,o.price_zhe=t.rs.price_zhe,o.cart_goods_id=t.rs.cart_goods_id;var e=0;for(var s in t.rs.giftbag)e+=Number(t.rs.giftbag[s].goodsnum);o.numberss=e,o.com=!0}else o.com=!1;o.caltotalmoney()}))}))},changefenshu:function(t){console.log("获取价格接口"),this.caltotalmoney()},caltotalmoney:function(e){var s=this,o=this.fenshu,i=t.getStorageSync("id");1!=this.show&&0!=this.show||(o=1);var n="get_fenshu_price",a=JSON.stringify({memberid:i,fenshu:o,buy_type:0});this.$utils.post(n,a).then((function(e){console.log(e);var o="success";if(1!=e.sta)return o="none",void t.showToast({icon:o,title:e.msg,duration:2e3});s.price_zhe=e.rs.price_zhe}))},add:function(e){i.default.trackEvent("Um_Event_addlilan",{Um_Key_ItemName:"继续加入礼篮"}),t.navigateTo({url:"./shoppingList"})},open:function(){this.$refs.popup.open()},toggle:function(t){i.default.trackEvent("Um_Event_SongLiDialog",{Um_Key_ItemName:"送礼方式弹框"}),this.$refs.popup.open()},close:function(t){this.$refs.popup.close()},chooseGift:function(e){i.default.trackEvent("Um_Event_CBlessingCard",{Um_Key_ItemName:"定制祝福卡"}),t.navigateTo({url:"../shopping/CBlessingCard"})},wishes:function(e){var s=t.getStorageSync("zhufu_type");this.zhufu_type=s;var o=t.getStorageSync("id");if(this.memberid=o,this.zhufu_type==this.zhufu_type){var i="get_giftbag_list",n=JSON.stringify({memberid:this.memberid,buy_type:0});this.$utils.post(i,n).then((function(e){console.log("直接赠送"),console.log(e);var s="success";1!=e.sta&&(s="none",t.showToast({icon:s,title:e.msg,duration:2e3})),t.navigateTo({url:"../shopping/wishes?type=0"})}))}},box1:function(){this.show="2",this.$refs.popup.close(),this.caltotalmoney()},box2:function(){this.show="1",this.$refs.popup.close(),this.caltotalmoney()},box3:function(){this.show="0",this.$refs.popup.close(),this.caltotalmoney()},packages:function(e){var s=this;if("2"===this.show){if(this.setgiftssuccess=t.getStorageSync("setgiftssuccess")||2,2==this.setgiftssuccess)return void t.showToast({icon:"none",title:"请先定制祝福卡！"});i.default.trackEvent("Um_Event_ShopZengSong",{Um_Key_ItemName:"直接赠送"}),i.default.trackEvent("Um_Event_ShopZengSongSub",{Um_Key_ItemName:"直接赠送确认订单"});var o=t.getStorageSync("type");this.type=o;var n=t.getStorageSync("id");this.memberid=n;var a='{"memberid":"'+n+'","buy_type":"'+o+'","cart_goods_id":"'+this.cart_goods_id+'"}',r="get_buy_shopping_cart";this.$utils.post(r,a).then((function(e){console.log(e),1==e.sta?(0==e.rs.goodslist.length&&t.showToast({icon:"none",title:"当前礼袋无商品"}),null!=s.zhufu_type&&null!=s.chooses&&0!=e.rs.goodslist.length&&(t.navigateTo({url:"../shopping/packages?type=0&fenshu="+s.fenshu+"&wanfa=1"}),s.fenshu=1)):2==e.sta&&(s.isShowPop=!0,s.unShopList=e.rs.undercarriage_list)}))}else if("1"===this.show){i.default.trackEvent("Um_Event_ShopPingShouQi",{Um_Key_ItemName:"拼手气礼包"}),i.default.trackEvent("Um_Event_ShopPingShouQiSub",{Um_Key_ItemName:"拼手气确认订单"});var u=t.getStorageSync("type");this.type=u;var g=t.getStorageSync("id");this.memberid=g;a='{"memberid":"'+g+'","buy_type":"'+u+'","cart_goods_id":"'+this.cart_goods_id+'"}',r="get_buy_shopping_cart";this.$utils.post(r,a).then((function(e){console.log("商品信息11",e),1==e.sta?(0==e.rs.goodslist.length&&t.showToast({icon:"success",title:"当前礼袋无商品"}),null!=s.zhufu_type&&null!=s.chooses&&0!=e.rs.goodslist.length&&(s.$forceUpdate(),t.navigateTo({url:"../shopping/packages?type=0&fenshu=1&wanfa=4&remark="+s.remark}))):2==e.sta&&(s.isShowPop=!0,s.unShopList=e.rs.undercarriage_list)}))}else{i.default.trackEvent("Um_Event_ShopBuy",{Um_Key_ItemName:"直接购买"}),i.default.trackEvent("Um_Event_ShopBuySub",{Um_Key_ItemName:"直接购买确认订单"});var c=t.getStorageSync("type");this.type=c;var h=t.getStorageSync("id");this.memberid=h;a='{"memberid":"'+h+'","buy_type":"'+c+'","cart_goods_id":"'+this.cart_goods_id+'"}',r="get_buy_shopping_cart";this.$utils.post(r,a).then((function(e){console.log(e),1==e.sta?(0==e.rs.goodslist.length&&t.showToast({icon:"success",title:"当前礼袋无商品"}),null!=s.zhufu_type&&null!=s.chooses&&0!=e.rs.goodslist.length&&t.navigateTo({url:"../shopping/must?type=0"})):2==e.sta&&(s.isShowPop=!0,s.unShopList=e.rs.undercarriage_list)}))}}}};e.default=a}).call(this,s("543d")["default"])},"606c":function(t,e,s){"use strict";s.d(e,"b",(function(){return i})),s.d(e,"c",(function(){return n})),s.d(e,"a",(function(){return o}));var o={uniPopup:function(){return s.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(s.bind(null,"f3d2"))}},i=function(){var t=this,e=t.$createElement,s=(t._self._c,0==t.com?t.$utils.osspath_url("/xcx-static/xiong.png"):null),o=0!=t.com?t.__map(t.goodsinfo,(function(e,s){var o=t.__get_orig(e),i=t.$utils.imageUrl(e.goodsinfo.head_img),n=t.$utils.cut_str(e.goodsinfo.goodsname,16);return{$orig:o,g1:i,g2:n}})):null,i=0!=t.com?t.__map(t.undercarriage_list,(function(e,s){var o=t.__get_orig(e),i=t.$utils.imageUrl(e.goodsinfo.head_img),n=t.$utils.cut_str(e.goodsinfo.goodsname,16);return{$orig:o,g3:i,g4:n}})):null,n=t.isShowPop&&t.unShopList.length>0&&1==t.unShopList.length?t.__map(t.unShopList,(function(e,s){var o=t.__get_orig(e),i=t.$utils.cut_str(e.goodsname,16);return{$orig:o,g5:i}})):null;t._isMounted||(t.e0=function(e,s){var o=arguments[arguments.length-1].currentTarget.dataset,i=o.eventParams||o["event-params"];s=i.item;return t.goDel.stop(s.goodsinfo.id)}),t.$mp.data=Object.assign({},{$root:{g0:s,l0:o,l1:i,l2:n}})},n=[]},a5f9:function(t,e,s){"use strict";(function(t){s("334b");o(s("66fd"));var e=o(s("c394"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},b057:function(t,e,s){"use strict";var o=s("08d2"),i=s.n(o);i.a},c394:function(t,e,s){"use strict";s.r(e);var o=s("606c"),i=s("3650");for(var n in i)"default"!==n&&function(t){s.d(e,t,(function(){return i[t]}))}(n);s("b057");var a,r=s("f0c5"),u=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=u.exports}},[["a5f9","common/runtime","common/vendor"]]]);