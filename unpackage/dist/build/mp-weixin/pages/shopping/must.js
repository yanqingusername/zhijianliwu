(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/must"],{3618:function(e,o,t){"use strict";t.r(o);var n=t("7dbc"),r=t.n(n);for(var a in n)"default"!==a&&function(e){t.d(o,e,(function(){return n[e]}))}(a);o["default"]=r.a},"4a17":function(e,o,t){},"7dbc":function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=a(t("1ae9")),r=(a(t("1c5d")),a(t("e2fe")),a(t("e56b")));function a(e){return e&&e.__esModule?e:{default:e}}function i(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}var s={data:function(){var e;return e={status:"",sum:0,money:0,money1:0,address:{},com:"",coupon_id:"",coupon_number:"",coupon_name:"",coupon_money:"",showa:"",use_balance:1,balance:0},i(e,"showa",1),i(e,"openid",""),i(e,"sta",1),i(e,"delivery_mode","快递"),i(e,"delivery_mode_arr",["快递","同城","自提"]),i(e,"coupon_numbers",0),i(e,"coupon_number1",0),i(e,"list",[]),i(e,"gou",!0),i(e,"couponList",[]),i(e,"buy_type",""),i(e,"price_zhe",""),i(e,"cartPriceData",""),i(e,"cartCouponList",[]),i(e,"new_price_yuanshi",""),i(e,"new_price_zhe",""),i(e,"new_price_coupon",""),i(e,"new_coupon_number",""),i(e,"new_balance","0.00"),i(e,"new_balance_price",""),i(e,"new_freight",""),e},onLoad:function(o){var t=this;this.balance=e.getStorageSync("balance"),this.use_balance=1,this.use_zj_balance=1,this.openid=e.getStorageSync("openid"),this.id=e.getStorageSync("id");for(var n=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],r="",a=0;a<32;a++){var i=parseInt(61*Math.random());r+=n[i]}this.nums=r;var s=o.type;this.buy_type=s;var u=e.getStorageSync("id");this.memberid=u;var c='{"memberid":"'+u+'","buy_type":"'+s+'"}',p="get_buy_shopping_cart";this.$utils.post(p,c).then((function(o){console.log("商品信息",o);var n="success";if(1!=o.sta)return n="none",void e.showToast({icon:n,title:o.msg,duration:2e3});t.list=o.rs.goodslist,t.sum=o.rs.price_zhe})),o.coupon_number&&(this.coupon_number=o.coupon_number,this.coupon_name="-¥"+o.coupon_name)},onShow:function(o){this.$set(this.address,"id",e.getStorageSync("member_area_id")),this.$set(this.address,"name",e.getStorageSync("member_area_linkman")),this.$set(this.address,"phone",e.getStorageSync("member_area_linktel")),this.$set(this.address,"address",e.getStorageSync("member_area_address")),this.coupon_id=e.getStorageSync("coupon_id"),this.coupon_keynum=e.getStorageSync("coupon_keynum"),this.coupon_money=e.getStorageSync("coupon_money"),this.coupon_number=e.getStorageSync("coupon_number"),this.caltotalmoney(1)},methods:{choiceAddress:function(){e.navigateTo({url:"../Add/Add?cardbag_number=5"})},switch2Change:function(){this.use_balance=!this.use_balance,this.caltotalmoney(1)},coupon1:function(e){this.money1=this.money,this.coupon_number1=this.coupon_number,this.$refs.popup.close(),this.caltotalmoney()},caltotalmoney:function(o){var t=this,n=this.fenshu,r=e.getStorageSync("id"),a=this.buy_type;1!=this.show&&0!=this.show||(n=1),"1"!=this.wanfa&&(n=1);var i="get_shopping_cart_price",s=JSON.stringify({memberid:r,fenshu:n,buy_type:a,coupon_number:this.new_coupon_number,is_balance:0!=this.use_balance}),u="coupon";this.$utils.postNew(i,s,u).then((function(e){if(1==e.sta){if(t.cartPriceData=e.rs,1==o){t.cartCouponList=e.rs.coupon_list,t.cartCouponList.forEach((function(e){t.$set(e,"gou","0")}));for(var n=0;n<t.cartCouponList.length;n++)e.rs.coupon_number==t.cartCouponList[n].coupon_number?(t.cartCouponList[n].gou=1,t.money=t.cartCouponList[n].money,t.coupon_number=t.cartCouponList[n].coupon_number,t.new_coupon_number=t.cartCouponList[n].coupon_number):t.cartCouponList[n].gou=0}t.new_price_yuanshi=e.rs.price_yuanshi,t.new_price_zhe=e.rs.show_price,t.new_price_coupon=e.rs.price_coupon,t.new_coupon_number=e.rs.coupon_number,t.new_balance=e.rs.balance,t.new_balance_price=e.rs.balance,t.new_freight=e.rs.freight,parseInt(e.rs.balance)>0||(t.new_balance_price="")}}))},forsubmit:function(o){var t=this;console.log("立即付款");var a=this;0==this.sta&&e.showToast({title:"请先登录",icon:"none"}),console.log(this.sta+"1111");this.coupon_number1;var i=JSON.stringify({memberid:this.memberid,member_area_id:this.address.id,delivery_type:this.delivery_mode,coupon_number:this.new_coupon_number,use_balance:this.use_balance,use_zj_balance:this.use_zj_balance,buy_type:this.buy_type});console.log(i);var s="create_buy_order";this.$utils.post(s,i).then((function(o){var i=o.ordernumber;if(console.log("付款"),console.log(o),1==o.pay_status){var s=(new Date).getTime();r.default.track("custom_order",{order:{order_id:i,order_time:s,order_status:"pay"},sub_orders:[{sub_order_id:i,order_amt:parseFloat(a.new_price_zhe),pay_amt:parseFloat(a.new_price_zhe)}]}),e.showToast({title:"支付成功"}),e.redirectTo({url:"../shopping/payment?ordernumber="+i}),e.setStorageSync("coupon",""),e.setStorageSync("coupon_keynum",""),e.setStorageSync("coupon_number",""),e.setStorageSync("coupon_money","")}else if(0==o.pay_status){var u="get_buy_order_pay_info",c=JSON.stringify({ordernumber:o.ordernumber});t.$utils.post(u,c).then((function(o){console.log("获取流水号",o);var s=o.rs.serial_number;e.request({url:"https://zhijianlw.com/api.php/index/getip",success:function(o){console.log(o.data);var u="add_paylog_to_wx",c=JSON.stringify({serial_number:s,ip:o.data.ip,openid:t.openid,type:"buy_order"});t.$utils.post(u,c).then((function(o){console.log("获取参数",o);var s=[],u={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+t.timeStamp,nonceStr:"nonceStr="+t.nums,package:"package=prepay_id="+o.rs.prepay_id,signType:"signType=MD5"};for(var c in console.log("拼接前",u),u)s.push(u[c]);s.sort();var p="";for(var _ in s)_==s.length-1?p+=s[_]:p+=s[_]+"&";var d=p+"&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv";console.log("拼接后",d);var l=n.default.hexMD5(d);console.log(l),e.hideLoading(),e.requestPayment({timeStamp:String(t.timeStamp),nonceStr:t.nums,package:"prepay_id="+o.rs.prepay_id,signType:"MD5",paySign:l.toUpperCase(),success:function(o){e.hideLoading(),e.request({url:"https://zhijianlw.com/api.php/index/set_agent_cardbag",data:{serial_number:a.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(o){var t=(new Date).getTime();r.default.track("custom_order",{order:{order_id:i,order_time:t,order_status:"pay"},sub_orders:[{sub_order_id:i,order_amt:parseFloat(a.new_price_zhe),pay_amt:parseFloat(a.new_price_zhe)}]}),console.log("微信成功回调",o),e.showToast({title:"支付成功",icon:"none"}),e.setStorageSync("coupon",""),e.setStorageSync("coupon_keynum",""),e.setStorageSync("coupon_number",""),e.setStorageSync("coupon_money",""),e.redirectTo({url:"../shopping/payment?ordernumber="+i})}})},fail:function(o){var t=(new Date).getTime();r.default.track("custom_order",{order:{order_id:i,order_time:t,order_status:"cancel_pay"},sub_orders:[{sub_order_id:i,order_amt:parseFloat(a.new_price_zhe),pay_amt:parseFloat(a.new_price_zhe)}]}),e.hideLoading(),console.log(o),e.showToast({title:"支付失败",icon:"none"}),a.commodity="",e.navigateTo({url:"../orderList/orderList?nav=1"})}})}))}})}))}else{var p=(new Date).getTime();r.default.track("custom_order",{order:{order_id:i,order_time:p,order_status:"cancel_pay"},sub_orders:[{sub_order_id:i,order_amt:parseFloat(a.new_price_zhe),pay_amt:parseFloat(a.new_price_zhe)}]}),e.showToast({icon:"none",title:o.msg?o.msg:"支付错误"})}}))},wx:function(o){var t=this,r=this,a=(this.cardbag_number,this.ip),i=this.openid,s='{"serial_number":"'+r.outTradeNo+'","ip":"'+a+'","openid":"'+i+'","type":"cardbag"}',u="add_paylog_to_wx";console.log(s),this.$utils.post(u,s).then((function(o){console.log("获取参数",o);var a=[],i={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+t.timeStamp,nonceStr:"nonceStr="+t.nums,package:"package=prepay_id="+o.rs.prepay_id,signType:"signType=MD5"};for(var s in console.log("拼接前",i),i)a.push(i[s]);a.sort();var u="";for(var c in a)c==a.length-1?u+=a[c]:u+=a[c]+"&";var p=u+"&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv";console.log("拼接后",p);var _=n.default.hexMD5(p);console.log(_),e.hideLoading(),e.requestPayment({timeStamp:String(t.timeStamp),nonceStr:t.nums,package:"prepay_id="+o.rs.prepay_id,signType:"MD5",paySign:_.toUpperCase(),success:function(o){e.hideLoading(),e.request({url:"https://zhijianlw.com/api.php/index/set_agent_cardbag",data:{serial_number:r.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(e){console.log("微信成功回调",e)}}),e.showModal({title:"微信支付",content:"支付成功",cancelText:"查看订单",confirmText:"立即赠送",success:function(o){if(o.confirm)console.log("点击立即赠送"),r.zengsong();else if(o.cancel){console.log("点击查看详情");r.cardbag_number;e.switchTab({url:"../order/order"})}}})},fail:function(o){e.hideLoading(),console.log(o),e.showToast({title:"支付失败",icon:"none"}),r.commodity=""}})}))},deliveryModeChange:function(e){console.log("picker发送选择改变，携带值为",e.target.value),this.delivery_mode_index=e.target.value},open:function(){this.$refs.popup.open("bottom")},pay:function(){e.navigateTo({url:"./payment"})},check:function(e){var o=e.currentTarget.dataset.index,t=e.currentTarget.dataset.couponnumber;if(t==this.new_coupon_number)1==this.cartCouponList[o].gou?(this.cartCouponList[o].gou=0,this.money="",this.coupon_number="-1",this.new_coupon_number="-1"):0==this.cartCouponList[o].gou&&(this.cartCouponList[o].gou=1,this.money=this.cartCouponList[o].money,this.coupon_number=this.cartCouponList[o].coupon_number,this.new_coupon_number=this.cartCouponList[o].coupon_number);else for(var n=0;n<this.cartCouponList.length;n++)this.cartCouponList[n].gou=0,t==this.cartCouponList[n].coupon_number&&(this.cartCouponList[o].gou=1,this.money=this.cartCouponList[o].money,this.coupon_number=this.cartCouponList[o].coupon_number,this.new_coupon_number=this.cartCouponList[o].coupon_number);console.log(this.cartCouponList)}}};o.default=s}).call(this,t("543d")["default"])},"81f8":function(e,o,t){"use strict";t.r(o);var n=t("a256"),r=t("3618");for(var a in r)"default"!==a&&function(e){t.d(o,e,(function(){return r[e]}))}(a);t("8535");var i,s=t("f0c5"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);o["default"]=u.exports},8535:function(e,o,t){"use strict";var n=t("4a17"),r=t.n(n);r.a},a256:function(e,o,t){"use strict";t.d(o,"b",(function(){return r})),t.d(o,"c",(function(){return a})),t.d(o,"a",(function(){return n}));var n={uniPopup:function(){return t.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(t.bind(null,"f3d2"))}},r=function(){var e=this,o=e.$createElement,t=(e._self._c,e.__map(e.list,(function(o,t){var n=e.__get_orig(o),r=e.$utils.imageUrl(o.head_img),a=e.$utils.cut_str(o.goodsname,15);return{$orig:n,g0:r,g1:a}})));e.$mp.data=Object.assign({},{$root:{l0:t}})},a=[]},e42d:function(e,o,t){"use strict";(function(e){t("334b");n(t("66fd"));var o=n(t("81f8"));function n(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("543d")["createPage"])}},[["e42d","common/runtime","common/vendor"]]]);