(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/shopping"],{"08d2":function(t,e,s){},3650:function(t,e,s){"use strict";s.r(e);var o=s("57ee"),i=s.n(o);for(var n in o)"default"!==n&&function(t){s.d(e,t,(function(){return o[t]}))}(n);e["default"]=i.a},"57ee":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{price_zhe:0,goodsinfo:[],goodsid:"",flag:!0,type:"",show:"2",gift:!0,chooses:1,numberss:0,com:"",fenshu:1,zhufu_type:0,id:"",setgiftssuccess:"2",setwishessuccess:"2",remark:"大吉大利，恭喜发财！",remarkNumber:0}},onShow:function(e){var s=this,o=getCurrentPages(),i=o[o.length-1].route;console.log("当前页面的路由",i);var n=o[o.length-1].options;console.log("当前页面的参数",n);var u=n.type;"undefined"==typeof u&&(u=0),this.type=u;var r=t.getStorageSync("id");this.memberid=r;var c='{"memberid":"'+r+'","buy_type":"'+u+'"}',a="get_giftbag_list";this.$utils.post(a,c).then((function(e){if(console.log("商品",e),e.rs.giftbag.length>=1){s.goodsinfo=e.rs.giftbag,s.price_zhe=e.rs.price_zhe;var o=0;for(var i in e.rs.giftbag)o+=Number(e.rs.giftbag[i].goodsnum);s.numberss=o,t.setStorageSync("type",u),s.com=!0}else s.com=!1})),this.setgiftssuccess=t.getStorageSync("setgiftssuccess"),this.setwishessuccess=t.getStorageSync("setwishessuccess");var g=t.getStorageSync("zhufu_type");this.zhufu_type=g,console.log("this.zhufu_type11"),console.log(this.zhufu_type),0==this.zhufu_type?this.zhufu_type="福语":1==this.zhufu_type?this.zhufu_type="语音":2==this.zhufu_type&&(this.zhufu_type="视频"),this.caltotalmoney()},onLoad:function(t){this.caltotalmoney()},methods:{inputRemark:function(t){this.remark=t.detail.value,this.remarkNumber=t.detail.value.length},box_gift:function(){t.navigateTo({url:"./shoppingList"})},goToDetails:function(e){t.navigateTo({url:"../details/details?keynum="+e})},increase:function(t){console.log(t);var e=t.goodsid;this.goodsid=e,this.goodsnum=1,this.numberss+=1;var s=t.goodsnum+1;this.give(t,s)},reduce:function(t){var e=t.goodsid;this.goodsnum=-1,this.numberss-=1;var s=t.goodsnum-1;this.goodsid=e,this.give(t,s)},give:function(e,s){var o=this,i=t.getStorageSync("id");this.memberid=i;var n=t.getStorageSync("type");this.type=n;var u='{"memberid":"'+this.memberid+'","goodsid":"'+this.goodsid+'","num":"'+this.goodsnum+'","buy_type":"'+n+'","goods_model":"'+e.goods_model+'","goods_spec":"'+e.goods_spec+'","goods_item":"'+e.goods_spec_item+'"}',r="op_buy_shopping_cart";console.log(u),this.$utils.post(r,u).then((function(t){console.log("添加购物车",t);var e='{"memberid":"'+o.memberid+'","buy_type":"'+n+'"}',s="get_giftbag_list";o.$utils.post(s,e).then((function(t){console.log("更改价格",t),t.rs.giftbag.length>=1?(o.goodsinfo=t.rs.giftbag,o.com=!0):o.com=!1,o.caltotalmoney()}))}))},changefenshu:function(t){console.log("获取价格接口"),this.caltotalmoney()},caltotalmoney:function(e){var s=this,o=this.fenshu,i=t.getStorageSync("id");1!=this.show&&0!=this.show||(o=1);var n="get_fenshu_price",u=JSON.stringify({memberid:i,fenshu:o,buy_type:0});this.$utils.post(n,u).then((function(e){console.log(e);var o="success";if(1!=e.sta)return o="none",void t.showToast({icon:o,title:e.msg,duration:2e3});s.price_zhe=e.rs.price_zhe}))},add:function(e){t.navigateTo({url:"./shoppingList"})},open:function(){this.$refs.popup.open("")},toggle:function(t){this.$refs.popup.open("")},close:function(t){this.$refs.popup.close()},chooseGift:function(e){t.navigateTo({url:"../shopping/CBlessingCard"})},wishes:function(e){var s=t.getStorageSync("zhufu_type");this.zhufu_type=s;var o=t.getStorageSync("id");if(this.memberid=o,this.zhufu_type==this.zhufu_type){var i="get_giftbag_list",n=JSON.stringify({memberid:this.memberid,buy_type:0});this.$utils.post(i,n).then((function(e){console.log("直接赠送"),console.log(e);var s="success";1!=e.sta&&(s="none",t.showToast({icon:s,title:e.msg,duration:2e3})),t.navigateTo({url:"../shopping/wishes?type=0"})}))}},box1:function(){this.show="2",this.$refs.popup.close(),this.caltotalmoney()},box2:function(){this.show="1",this.$refs.popup.close(),this.caltotalmoney()},box3:function(){this.show="0",this.$refs.popup.close(),this.caltotalmoney()},packages:function(e){var s=this;if("2"===this.show){if(this.setgiftssuccess=t.getStorageSync("setgiftssuccess")||2,2==this.setgiftssuccess)return void t.showToast({icon:"none",title:"请先定制祝福卡！"});var o=t.getStorageSync("type");this.type=o;var i=t.getStorageSync("id");this.memberid=i;var n='{"memberid":"'+i+'","buy_type":"'+o+'"}',u="get_buy_shopping_cart";this.$utils.post(u,n).then((function(e){console.log(e),0==e.rs.goodslist.length&&t.showToast({icon:"none",title:"当前礼袋无商品"}),null!=s.zhufu_type&&null!=s.chooses&&0!=e.rs.goodslist.length&&t.navigateTo({url:"../shopping/packages?type=0&fenshu="+s.fenshu+"&wanfa=1"})}))}else if("1"===this.show){var r=t.getStorageSync("type");this.type=r;var c=t.getStorageSync("id");this.memberid=c;n='{"memberid":"'+c+'","buy_type":"'+r+'"}',u="get_buy_shopping_cart";this.$utils.post(u,n).then((function(e){console.log("商品信息11",e),0==e.rs.goodslist.length&&t.showToast({icon:"success",title:"当前礼袋无商品"}),null!=s.zhufu_type&&null!=s.chooses&&0!=e.rs.goodslist.length&&(s.$forceUpdate(),t.navigateTo({url:"../shopping/packages?type=0&fenshu=1&wanfa=4&remark="+s.remark}))}))}else{var a=t.getStorageSync("type");this.type=a;var g=t.getStorageSync("id");this.memberid=g;n='{"memberid":"'+g+'","buy_type":"'+a+'"}',u="get_buy_shopping_cart";this.$utils.post(u,n).then((function(e){console.log(e),0==e.rs.goodslist.length&&t.showToast({icon:"success",title:"当前礼袋无商品"}),null!=s.zhufu_type&&null!=s.chooses&&0!=e.rs.goodslist.length&&t.navigateTo({url:"../shopping/must?type=0"})}))}}}};e.default=s}).call(this,s("543d")["default"])},"8d3c":function(t,e,s){"use strict";s.d(e,"b",(function(){return i})),s.d(e,"c",(function(){return n})),s.d(e,"a",(function(){return o}));var o={uniPopup:function(){return s.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(s.bind(null,"f3d2"))}},i=function(){var t=this,e=t.$createElement,s=(t._self._c,0==t.com?t.$utils.osspath_url("/xcx-static/xiong.png"):null),o=0!=t.com?t.__map(t.goodsinfo,(function(e,s){var o=t.__get_orig(e),i=t.$utils.imageUrl(e.goodsinfo.head_img),n=t.$utils.cut_str(e.goodsinfo.goodsname,16);return{$orig:o,g1:i,g2:n}})):null;t.$mp.data=Object.assign({},{$root:{g0:s,l0:o}})},n=[]},a5f9:function(t,e,s){"use strict";(function(t){s("334b");o(s("66fd"));var e=o(s("c394"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},b057:function(t,e,s){"use strict";var o=s("08d2"),i=s.n(o);i.a},c394:function(t,e,s){"use strict";s.r(e);var o=s("8d3c"),i=s("3650");for(var n in i)"default"!==n&&function(t){s.d(e,t,(function(){return i[t]}))}(n);s("b057");var u,r=s("f0c5"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=c.exports}},[["a5f9","common/runtime","common/vendor"]]]);