(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaTicketHomeOrder"],{1575:function(e,t,i){"use strict";i.r(t);var n=i("cd22"),o=i.n(n);for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=o.a},"29b2":function(e,t,i){},"8d01":function(e,t,i){"use strict";var n=i("29b2"),o=i.n(n);o.a},a322:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return n}));var n={evanSwitch:function(){return i.e("components/evan-switch/evan-switch").then(i.bind(null,"159d"))},uniPopup:function(){return i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(i.bind(null,"f3d2"))}},o=function(){var e=this,t=e.$createElement;e._self._c},r=[]},b07b:function(e,t,i){"use strict";(function(e){i("334b");n(i("66fd"));var t=n(i("daa9"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])},cd22:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(i("1ae9")),o=r(i("e56b"));function r(e){return e&&e.__esModule?e:{default:e}}var a={data:function(){return{checked:!1,showId:"",seatIds:"",quantity:"",originPrice:"",salePrice:"",coupon_number:"",FilmPrice:"",film_order_info:"",cartCouponList:[],phone:"",is_balance:!0}},onLoad:function(t){for(var i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],n="",o=0;o<32;o++){var r=parseInt(61*Math.random());n+=i[r]}this.nums=n;var a=this;this.showId=t.showId,this.seatIds=t.seatIds;var s=JSON.stringify({showId:a.showId,seatIds:a.seatIds}),c="get_film_movie_order_check",u="films";this.$utils.postNew(c,s,u).then((function(t){1==t.sta?0==t.rs.errCode?(a.quantity=t.rs.data.quantity,a.originPrice=t.rs.data.originPrice,a.salePrice=t.rs.data.salePrice,a.getFilmPrice(1)):e.showToast({title:t.rs.errMessage,icon:"none",duration:2e3}):e.showToast({title:t.msg,icon:"none",duration:2e3})}))},methods:{getFilmPrice:function(t){var i=e.getStorageSync("id"),n=this,o=JSON.stringify({memberid:i,quantity:n.quantity,originPrice:n.originPrice,salePrice:n.salePrice,coupon_number:n.coupon_number,showId:n.showId,seatIds:n.seatIds,is_balance:n.is_balance?"1":"0"}),r="get_film_price",a="coupon";this.$utils.postNew(r,o,a).then((function(e){if(n.FilmPrice=e.rs,n.phone=e.rs.phone||"",n.is_balance="1"==e.rs.is_balance,n.film_order_info=e.rs.film_order_info,1==t){n.cartCouponList=e.rs.coupon_list,n.cartCouponList.forEach((function(e){n.$set(e,"gou","0")}));for(var i=0;i<n.cartCouponList.length;i++)e.rs.coupon_number==n.cartCouponList[i].coupon_number?(n.cartCouponList[i].gou=1,n.coupon_number=n.cartCouponList[i].coupon_number):n.cartCouponList[i].gou=0}}))},switch2Change:function(){this.is_balance=!this.is_balance,this.getFilmPrice(1)},coupon:function(e){this.coupon_number=this.coupon_number,this.$refs.popup.close(),this.getFilmPrice()},check:function(e){var t=e.currentTarget.dataset.index,i=e.currentTarget.dataset.couponnumber;if(i==this.coupon_number)1==this.cartCouponList[t].gou?(this.cartCouponList[t].gou=0,this.coupon_number="-1"):0==this.cartCouponList[t].gou&&(this.cartCouponList[t].gou=1,this.coupon_number=this.cartCouponList[t].coupon_number);else for(var n=0;n<this.cartCouponList.length;n++)this.cartCouponList[n].gou=0,i==this.cartCouponList[n].coupon_number&&(this.cartCouponList[t].gou=1,this.coupon_number=this.cartCouponList[t].coupon_number)},bindPhoneNumber:function(t){var i=this,n="getPhoneNumber:ok";if(t.detail.errMsg==n){var o=e.getStorageSync("openid");if(o){var r=JSON.stringify({encrypted_data:t.detail.encryptedData,wx_openid:o,iv:t.detail.iv}),a="get_member_phone_number",s="member";this.$utils.postNew(a,r,s).then((function(e){i.phone=e.rs.phoneNumber}))}}},open:function(){this.$refs.popup.open()},clickPay:function(){var t=this,i=this,r=e.getStorageSync("id"),a=this,s=JSON.stringify({memberid:r,cinemaId:a.film_order_info.cinemaId,movieId:a.film_order_info.movieId,showId:a.showId,seatIds:a.seatIds,coupon_number:a.coupon_number,use_balance:a.is_balance?"1":"0",allowChanged:a.checked?"1":"0"}),c="set_movie_order_submit",u="films";this.$utils.postNew(c,s,u).then((function(r){if(console.log("----\x3e:",r.rs),1==r.sta){var s=r.rs.channelOrderNo;if(1==r.rs.pay_status){var c=(new Date).getTime();o.default.track("custom_order",{order:{order_id:s,order_time:c,order_status:"pay"},sub_orders:[{sub_order_id:s,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"],success:function(t){if("accept"==t["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo"]&&"accept"==t["KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"]){var n="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),a=JSON.stringify({memberid:r,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"});i.$utils.postNew(n,a,o).then((function(e){e.sta}))}},fail:function(e){},complete:function(t){setTimeout((function(){e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(a.quantity,"&movieName=").concat(a.film_order_info.movieName,"&channelOrderNo=").concat(s,"&isnumber=2")})}),200)}})}else if(0==r.rs.pay_status){var u="get_film_order_pay_info",d=JSON.stringify({ordernumber:r.rs.channelOrderNo});t.$utils.post(u,d).then((function(r){console.log("获取流水号",r);var c=r.rs.serial_number,u=e.getStorageSync("openid");e.request({url:"https://zhijianlw.com/api.php/index/getip",success:function(r){console.log(r.data);var d="add_paylog_to_wx",l=JSON.stringify({serial_number:c,ip:r.data.ip,openid:u,type:"film"});t.$utils.post(d,l).then((function(t){console.log("获取参数",t);var r=[],c={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+a.timeStamp,nonceStr:"nonceStr="+a.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var u in console.log("拼接前",c),c)r.push(c[u]);r.sort();var d="";for(var l in r)l==r.length-1?d+=r[l]:d+=r[l]+"&";var m=d+"&key=45579fcdb646746f02d9e041d50975b4";console.log("拼接后",m);var p=n.default.hexMD5(m);console.log(p),e.hideLoading(),e.requestPayment({timeStamp:String(a.timeStamp),nonceStr:a.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:p.toUpperCase(),success:function(t){e.hideLoading();var n=(new Date).getTime();o.default.track("custom_order",{order:{order_id:s,order_time:n,order_status:"pay"},sub_orders:[{sub_order_id:s,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"],success:function(t){if("accept"==t["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo"]&&"accept"==t["KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"]){var n="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),a=JSON.stringify({memberid:r,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"});i.$utils.postNew(n,a,o).then((function(e){e.sta}))}},fail:function(e){},complete:function(t){setTimeout((function(){e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(a.quantity,"&movieName=").concat(a.film_order_info.movieName,"&channelOrderNo=").concat(s,"&isnumber=2")})}),200)}})},fail:function(t){var n=(new Date).getTime();o.default.track("custom_order",{order:{order_id:s,order_time:n,order_status:"cancel_pay"},sub_orders:[{sub_order_id:s,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.hideLoading(),e.showToast({title:"支付失败",icon:"none"}),a.commodity="",e.requestSubscribeMessage({tmplIds:["hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"],success:function(t){if("accept"==t["hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"]){var n="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),a=JSON.stringify({memberid:r,template_id:"hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"});i.$utils.postNew(n,a,o).then((function(e){e.sta}))}},fail:function(e){},complete:function(t){setTimeout((function(){e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(a.quantity,"&movieName=").concat(a.film_order_info.movieName,"&channelOrderNo=").concat(s,"&isnumber=1")})}),200)}})}})}))}})}))}else{var l=(new Date).getTime();o.default.track("custom_order",{order:{order_id:s,order_time:l,order_status:"cancel_pay"},sub_orders:[{sub_order_id:s,order_amt:parseFloat(a.FilmPrice.price_zhe),pay_amt:parseFloat(a.FilmPrice.price_zhe)}]}),e.requestSubscribeMessage({tmplIds:["hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"],success:function(t){if("accept"==t["hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"]){var n="add_wx_subscribe_log",o="subscribe",r=e.getStorageSync("id"),a=JSON.stringify({memberid:r,template_id:"hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"});i.$utils.postNew(n,a,o).then((function(e){e.sta}))}},fail:function(e){}}),e.showToast({icon:"none",title:r.msg?r.msg:"支付错误"})}}else e.showToast({title:r.msg,icon:"none",duration:2e3})}))}}};t.default=a}).call(this,i("543d")["default"])},daa9:function(e,t,i){"use strict";i.r(t);var n=i("a322"),o=i("1575");for(var r in o)"default"!==r&&function(e){i.d(t,e,(function(){return o[e]}))}(r);i("8d01");var a,s=i("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);t["default"]=c.exports}},[["b07b","common/runtime","common/vendor"]]]);