(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaTicketHomeOrder"],{1575:function(e,t,o){"use strict";o.r(t);var i=o("cd22"),r=o.n(i);for(var n in i)"default"!==n&&function(e){o.d(t,e,(function(){return i[e]}))}(n);t["default"]=r.a},"29b2":function(e,t,o){},5469:function(e,t,o){"use strict";o.d(t,"b",(function(){return r})),o.d(t,"c",(function(){return n})),o.d(t,"a",(function(){return i}));var i={evanSwitch:function(){return o.e("components/evan-switch/evan-switch").then(o.bind(null,"159d"))},uniPopup:function(){return o.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(o.bind(null,"f3d2"))}},r=function(){var e=this,t=e.$createElement;e._self._c},n=[]},"8d01":function(e,t,o){"use strict";var i=o("29b2"),r=o.n(i);r.a},b07b:function(e,t,o){"use strict";(function(e){o("334b");i(o("66fd"));var t=i(o("daa9"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},cd22:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(o("1ae9")),r=n(o("e56b"));function n(e){return e&&e.__esModule?e:{default:e}}var a={data:function(){return{checked:!1,showId:"",seatIds:"",quantity:"",originPrice:"",salePrice:"",coupon_number:"",FilmPrice:"",film_order_info:"",cartCouponList:[],phone:"",is_balance:!0}},onLoad:function(t){for(var o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],i="",r=0;r<32;r++){var n=parseInt(61*Math.random());i+=o[n]}this.nums=i;var a=this;this.showId=t.showId,this.seatIds=t.seatIds;var s=JSON.stringify({showId:a.showId,seatIds:a.seatIds}),c="get_film_movie_order_check",u="films";this.$utils.postNew(c,s,u).then((function(t){1==t.sta?0==t.rs.errCode?(a.quantity=t.rs.data.quantity,a.originPrice=t.rs.data.originPrice,a.salePrice=t.rs.data.salePrice,a.getFilmPrice(1)):e.showToast({title:t.rs.errMessage,icon:"none",duration:2e3}):e.showToast({title:t.msg,icon:"none",duration:2e3})}))},methods:{getFilmPrice:function(t){var o=e.getStorageSync("id"),i=this,r=JSON.stringify({memberid:o,quantity:i.quantity,originPrice:i.originPrice,salePrice:i.salePrice,coupon_number:i.coupon_number,showId:i.showId,seatIds:i.seatIds,is_balance:i.is_balance?"1":"0"}),n="get_film_price",a="coupon";this.$utils.postNew(n,r,a).then((function(e){if(i.FilmPrice=e.rs,i.phone=e.rs.phone||"",i.is_balance="1"==e.rs.is_balance,i.film_order_info=e.rs.film_order_info,1==t){i.cartCouponList=e.rs.coupon_list,i.cartCouponList.forEach((function(e){i.$set(e,"gou","0")}));for(var o=0;o<i.cartCouponList.length;o++)e.rs.coupon_number==i.cartCouponList[o].coupon_number?(i.cartCouponList[o].gou=1,i.coupon_number=i.cartCouponList[o].coupon_number):i.cartCouponList[o].gou=0}}))},switch2Change:function(){this.is_balance=!this.is_balance,this.getFilmPrice(1)},coupon:function(e){this.coupon_number=this.coupon_number,this.$refs.popup.close(),this.getFilmPrice()},check:function(e){var t=e.currentTarget.dataset.index,o=e.currentTarget.dataset.couponnumber;if(o==this.coupon_number)1==this.cartCouponList[t].gou?(this.cartCouponList[t].gou=0,this.coupon_number="-1"):0==this.cartCouponList[t].gou&&(this.cartCouponList[t].gou=1,this.coupon_number=this.cartCouponList[t].coupon_number);else for(var i=0;i<this.cartCouponList.length;i++)this.cartCouponList[i].gou=0,o==this.cartCouponList[i].coupon_number&&(this.cartCouponList[t].gou=1,this.coupon_number=this.cartCouponList[t].coupon_number)},bindPhoneNumber:function(t){var o=this,i="getPhoneNumber:ok";if(t.detail.errMsg==i){var r=e.getStorageSync("openid");if(r){var n=JSON.stringify({encrypted_data:t.detail.encryptedData,wx_openid:r,iv:t.detail.iv}),a="get_member_phone_number",s="member";this.$utils.postNew(a,n,s).then((function(e){o.phone=e.rs.phoneNumber}))}}},open:function(){this.$refs.popup.open("bottom")},clickPay:function(){var t=this,o=this;e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"],success:function(t){var i="add_wx_subscribe_log",r="subscribe",n=e.getStorageSync("id"),a=JSON.stringify({memberid:n,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"});o.$utils.postNew(i,a,r).then((function(e){e.sta}))},fail:function(e){}});var n=e.getStorageSync("id"),a=this,s=JSON.stringify({memberid:n,cinemaId:a.film_order_info.cinemaId,movieId:a.film_order_info.movieId,showId:a.showId,seatIds:a.seatIds,coupon_number:a.coupon_number,use_balance:a.is_balance?"1":"0",allowChanged:a.checked?"1":"0"}),c="set_movie_order_submit",u="films";this.$utils.postNew(c,s,u).then((function(o){if(console.log("----\x3e:",o.rs),1==o.sta){var n=o.rs.channelOrderNo;if(1==o.rs.pay_status){var s=(new Date).getTime();r.default.track("custom_order",{order:{order_id:n,order_time:s,order_status:"pay"},sub_orders:[{sub_order_id:n,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(a.quantity,"&movieName=").concat(a.film_order_info.movieName,"&channelOrderNo=").concat(n,"&isnumber=2")})}else if(0==o.rs.pay_status){var c="get_film_order_pay_info",u=JSON.stringify({ordernumber:o.rs.channelOrderNo});t.$utils.post(c,u).then((function(o){console.log("获取流水号",o);var s=o.rs.serial_number,c=e.getStorageSync("openid");e.request({url:"https://zhijianlw.com/api.php/index/getip",success:function(o){console.log(o.data);var u="add_paylog_to_wx",d=JSON.stringify({serial_number:s,ip:o.data.ip,openid:c,type:"film"});t.$utils.post(u,d).then((function(t){console.log("获取参数",t);var o=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+a.timeStamp,nonceStr:"nonceStr="+a.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var c in console.log("拼接前",s),s)o.push(s[c]);o.sort();var u="";for(var d in o)d==o.length-1?u+=o[d]:u+=o[d]+"&";var l=u+"&key=45579fcdb646746f02d9e041d50975b4";console.log("拼接后",l);var p=i.default.hexMD5(l);console.log(p),e.hideLoading(),e.requestPayment({timeStamp:String(a.timeStamp),nonceStr:a.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:p.toUpperCase(),success:function(t){e.hideLoading();var o=(new Date).getTime();r.default.track("custom_order",{order:{order_id:n,order_time:o,order_status:"pay"},sub_orders:[{sub_order_id:n,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(a.quantity,"&movieName=").concat(a.film_order_info.movieName,"&channelOrderNo=").concat(n,"&isnumber=2")})},fail:function(t){var o=(new Date).getTime();r.default.track("custom_order",{order:{order_id:n,order_time:o,order_status:"cancel_pay"},sub_orders:[{sub_order_id:n,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.hideLoading(),e.showToast({title:"支付失败",icon:"none"}),a.commodity="",e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(a.quantity,"&movieName=").concat(a.film_order_info.movieName,"&channelOrderNo=").concat(n,"&isnumber=1")})}})}))}})}))}else{var d=(new Date).getTime();r.default.track("custom_order",{order:{order_id:n,order_time:d,order_status:"cancel_pay"},sub_orders:[{sub_order_id:n,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.showToast({icon:"none",title:o.msg?o.msg:"支付错误"})}}else e.showToast({title:o.msg,icon:"none",duration:2e3})}))}}};t.default=a}).call(this,o("543d")["default"])},daa9:function(e,t,o){"use strict";o.r(t);var i=o("5469"),r=o("1575");for(var n in r)"default"!==n&&function(e){o.d(t,e,(function(){return r[e]}))}(n);o("8d01");var a,s=o("f0c5"),c=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);t["default"]=c.exports}},[["b07b","common/runtime","common/vendor"]]]);