(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/packages"],{1597:function(e,n,t){},"1de0":function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return o}));var o={uniPopup:function(){return t.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(t.bind(null,"f3d2"))}},r=function(){var e=this,n=e.$createElement,t=(e._self._c,e.__map(e.list,(function(n,t){var o=e.__get_orig(n),r=e.$utils.imageUrl(n.head_img),a=e.$utils.cut_str(n.goodsname,15);return{$orig:o,g0:r,g1:a}})));e.$mp.data=Object.assign({},{$root:{l0:t}})},a=[]},"3b3a":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t("1ae9")),r=(a(t("1c5d")),a(t("e2fe")),a(t("e56b")));function a(e){return e&&e.__esModule?e:{default:e}}function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i={data:function(){var e;return e={sum:0,count:0,money:0,money1:0,com:"",coupon_id:"",coupon_number:"",coupon_name:"",coupon_money:"",showa:"",use_balance:1,balance:""},s(e,"showa",1),s(e,"openid",""),s(e,"sta",1),s(e,"delivery_mode","快递"),s(e,"delivery_mode_arr",["快递","同城","自提"]),s(e,"coupon_numbers",0),s(e,"coupon_number1",0),s(e,"fenshu",1),s(e,"wanfa",""),s(e,"price_zhe",""),s(e,"list",[]),s(e,"gou",!0),s(e,"couponList",[]),s(e,"cartPriceData",""),s(e,"cartCouponList",[]),s(e,"new_price_yuanshi",""),s(e,"new_price_zhe",""),s(e,"new_price_coupon",""),s(e,"new_coupon_number",""),s(e,"new_balance","0.00"),s(e,"new_balance_price",""),s(e,"new_freight",""),s(e,"remark",""),s(e,"price_zhe_money","0.00"),e},onLoad:function(n){var t=this;this.fenshu=n.fenshu,this.wanfa=n.wanfa,this.remark=n.remark,this.use_balance=1,this.use_zj_balance=1,this.openid=e.getStorageSync("openid"),this.id=e.getStorageSync("id");for(var o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],r="",a=0;a<32;a++){var s=parseInt(61*Math.random());r+=o[s]}this.nums=r;var i=n.type;this.type=i;var u=e.getStorageSync("id");this.memberid=u;var c='{"memberid":"'+u+'","buy_type":"'+i+'"}',_="get_buy_shopping_cart";this.$utils.post(_,c).then((function(n){console.log("商品信息",n);var o="success";if(1!=n.sta)return o="none",void e.showToast({icon:o,title:n.msg,duration:2e3});t.list=n.rs.goodslist,t.sum=n.rs.price_zhe,e.setStorageSync("price_zhe",n.rs.price_zhe),e.setStorageSync("type",i)})),n.coupon_number&&(this.coupon_number=n.coupon_number,this.coupon_name="-¥"+n.coupon_name)},onShow:function(n){this.coupon_id=e.getStorageSync("coupon_id"),this.coupon_keynum=e.getStorageSync("coupon_keynum"),this.coupon_money=e.getStorageSync("coupon_money"),this.coupon_number=e.getStorageSync("coupon_number"),this.caltotalmoney(1)},methods:{open:function(){this.$refs.popup.open()},switch2Change:function(){console.log("余额选中"),this.use_balance=!this.use_balance,console.log("余额",this.use_balance),this.caltotalmoney(1)},coupon1:function(e){this.money1=this.money,this.coupon_number1=this.coupon_number,this.$refs.popup.close(),this.caltotalmoney()},caltotalmoney:function(n){var t=this,o=this.fenshu,r=e.getStorageSync("id"),a=this.type;1!=this.show&&0!=this.show||(o=1),"1"!=this.wanfa&&(o=1);var s="get_shopping_cart_price",i=JSON.stringify({memberid:r,fenshu:o,buy_type:a,coupon_number:this.new_coupon_number,is_balance:0!=this.use_balance}),u="coupon";this.$utils.postNew(s,i,u).then((function(e){if(1==e.sta){if(t.cartPriceData=e.rs,1==n){t.cartCouponList=e.rs.coupon_list,t.cartCouponList.forEach((function(e){t.$set(e,"gou","0")}));for(var o=0;o<t.cartCouponList.length;o++)e.rs.coupon_number==t.cartCouponList[o].coupon_number?(t.cartCouponList[o].gou=1,t.money=t.cartCouponList[o].money,t.coupon_number=t.cartCouponList[o].coupon_number,t.new_coupon_number=t.cartCouponList[o].coupon_number):t.cartCouponList[o].gou=0}t.new_price_yuanshi=e.rs.price_yuanshi,t.new_price_zhe=e.rs.show_price,t.new_price_coupon=e.rs.price_coupon,t.new_coupon_number=e.rs.coupon_number,t.new_balance=e.rs.balance,t.new_balance_price=e.rs.balance,t.new_freight=e.rs.freight,t.price_zhe_money=e.rs.price_zhe,parseInt(e.rs.balance)>0||(t.new_balance_price="")}}))},forsubmit:function(n){var t=this,a=this;console.log("立即付款");var s=e.getStorageSync("type");this.type=s;var i=this;0==this.sta&&e.showToast({title:"请先登录",icon:"none"});this.coupon_number1;var u=JSON.stringify({memberid:this.memberid,wanfa:this.wanfa,coupon_number:this.new_coupon_number,use_balance:this.use_balance,use_zj_balance:this.use_zj_balance,fenshu:this.fenshu,buy_type:s,zhufu_msg:this.remark});console.log(u);var c="create_cardbag";this.$utils.post(c,u).then((function(n){if(console.log("付款"),console.log(n),1==n.pay_status){t.cardbag_number=n.cardbag_number;n.cardbag_number;var s=(new Date).getTime();r.default.track("custom_order",{order:{order_id:t.cardbag_number,order_time:s,order_status:"pay"},sub_orders:[{sub_order_id:t.cardbag_number,order_amt:parseFloat(i.new_price_yuanshi),pay_amt:parseFloat(i.new_price_yuanshi)}]}),e.showToast({title:"支付成功"}),e.setStorageSync("coupon",""),e.setStorageSync("coupon_keynum",""),e.setStorageSync("coupon_number",""),e.setStorageSync("coupon_money",""),e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"],success:function(n){var t="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),s=JSON.stringify({memberid:r,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"});a.$utils.postNew(t,s,o).then((function(e){e.sta}))},fail:function(e){},complete:function(n){setTimeout((function(){e.redirectTo({url:"../shopping/succes?cardbag_number="+a.cardbag_number})}),200)}})}else if(0==n.pay_status){var u="get_cardbag_pay_info",c=JSON.stringify({cardbag_number:n.cardbag_number}),_=n.cardbag_number;e.setStorageSync("cardbag_number",n.cardbag_number),t.$utils.post(u,c).then((function(n){console.log("获取流水号",n);var s=n.rs.serial_number;e.request({url:"https://zhijianlw.com/api.php/index/getip",success:function(n){console.log(n.data);var u="add_paylog_to_wx",c=JSON.stringify({serial_number:s,ip:n.data.ip,openid:t.openid,type:"cardbag"});t.$utils.post(u,c).then((function(n){console.log("获取参数",n);var s=[],u={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+t.timeStamp,nonceStr:"nonceStr="+t.nums,package:"package=prepay_id="+n.rs.prepay_id,signType:"signType=MD5"};for(var c in console.log("拼接前",u),u)s.push(u[c]);s.sort();var p="";for(var l in s)l==s.length-1?p+=s[l]:p+=s[l]+"&";var m=p+"&key=45579fcdb646746f02d9e041d50975b4";console.log("拼接后",m);var d=o.default.hexMD5(m);console.log(d),e.hideLoading(),e.requestPayment({timeStamp:String(t.timeStamp),nonceStr:t.nums,package:"prepay_id="+n.rs.prepay_id,signType:"MD5",paySign:d.toUpperCase(),success:function(n){var t=(new Date).getTime();r.default.track("custom_order",{order:{order_id:_,order_time:t,order_status:"cancel_pay"},sub_orders:[{sub_order_id:_,order_amt:parseFloat(i.new_price_yuanshi),pay_amt:parseFloat(i.new_price_yuanshi)}]}),e.showToast({title:"支付成功",icon:"none"}),e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"],success:function(n){var t="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),s=JSON.stringify({memberid:r,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"});a.$utils.postNew(t,s,o).then((function(e){e.sta}))},fail:function(e){},complete:function(n){setTimeout((function(){e.redirectTo({url:"../shopping/succes?cardbag_number="+_})}),200)}})},fail:function(n){var o=e.getStorageSync("cardbag_number");t.cardbag_number=o;var s=(new Date).getTime();r.default.track("custom_order",{order:{order_id:o,order_time:s,order_status:"cancel_pay"},sub_orders:[{sub_order_id:o,order_amt:parseFloat(i.new_price_yuanshi),pay_amt:parseFloat(i.new_price_yuanshi)}]}),e.hideLoading(),console.log(n),e.showToast({title:"支付失败",icon:"none"}),i.commodity="",e.requestSubscribeMessage({tmplIds:["hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"],success:function(n){var t="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),s=JSON.stringify({memberid:r,template_id:"hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"});a.$utils.postNew(t,s,o).then((function(e){e.sta}))},fail:function(e){},complete:function(n){setTimeout((function(){e.navigateTo({url:"../orderList/orderList?nav=1"})}),200)}})}})}))}})}))}else{var p=n.cardbag_number,l=(new Date).getTime();r.default.track("custom_order",{order:{order_id:p,order_time:l,order_status:"cancel_pay"},sub_orders:[{sub_order_id:p,order_amt:parseFloat(i.new_price_yuanshi),pay_amt:parseFloat(i.new_price_yuanshi)}]}),e.requestSubscribeMessage({tmplIds:["hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"],success:function(n){var t="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),s=JSON.stringify({memberid:r,template_id:"hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"});a.$utils.postNew(t,s,o).then((function(e){e.sta}))},fail:function(e){}}),e.showToast({icon:"none",title:n.msg?n.msg:"支付错误"})}}))},check:function(e){var n=e.currentTarget.dataset.index,t=e.currentTarget.dataset.couponnumber;if(t==this.new_coupon_number)1==this.cartCouponList[n].gou?(this.cartCouponList[n].gou=0,this.money="",this.coupon_number="-1",this.new_coupon_number="-1"):0==this.cartCouponList[n].gou&&(this.cartCouponList[n].gou=1,this.money=this.cartCouponList[n].money,this.coupon_number=this.cartCouponList[n].coupon_number,this.new_coupon_number=this.cartCouponList[n].coupon_number);else for(var o=0;o<this.cartCouponList.length;o++)this.cartCouponList[o].gou=0,t==this.cartCouponList[o].coupon_number&&(this.cartCouponList[n].gou=1,this.money=this.cartCouponList[n].money,this.coupon_number=this.cartCouponList[n].coupon_number,this.new_coupon_number=this.cartCouponList[n].coupon_number);console.log(this.cartCouponList)}}};n.default=i}).call(this,t("543d")["default"])},"6df6":function(e,n,t){"use strict";var o=t("1597"),r=t.n(o);r.a},a55e:function(e,n,t){"use strict";t.r(n);var o=t("3b3a"),r=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a},c048:function(e,n,t){"use strict";(function(e){t("334b");o(t("66fd"));var n=o(t("f714"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},f714:function(e,n,t){"use strict";t.r(n);var o=t("1de0"),r=t("a55e");for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);t("6df6");var s,i=t("f0c5"),u=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=u.exports}},[["c048","common/runtime","common/vendor"]]]);