(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaTicketHomeOrder"],{1575:function(e,t,o){"use strict";o.r(t);var r=o("cd22"),i=o.n(r);for(var n in r)"default"!==n&&function(e){o.d(t,e,(function(){return r[e]}))}(n);t["default"]=i.a},"29b2":function(e,t,o){},"7f91":function(e,t,o){"use strict";o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return n})),o.d(t,"a",(function(){return r}));var r={evanSwitch:function(){return o.e("components/evan-switch/evan-switch").then(o.bind(null,"159d"))},uniPopup:function(){return o.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(o.bind(null,"f3d2"))}},i=function(){var e=this,t=e.$createElement;e._self._c},n=[]},"8d01":function(e,t,o){"use strict";var r=o("29b2"),i=o.n(r);i.a},b07b:function(e,t,o){"use strict";(function(e){o("334b");r(o("66fd"));var t=r(o("daa9"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},cd22:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(o("1ae9")),i=n(o("e56b"));function n(e){return e&&e.__esModule?e:{default:e}}var a={data:function(){return{checked:!1,showId:"",seatIds:"",quantity:"",originPrice:"",salePrice:"",coupon_number:"",FilmPrice:"",film_order_info:"",cartCouponList:[],phone:"",is_balance:!0}},onLoad:function(t){for(var o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],r="",i=0;i<32;i++){var n=parseInt(61*Math.random());r+=o[n]}this.nums=r;var a=this;this.showId=t.showId,this.seatIds=t.seatIds;var s=JSON.stringify({showId:a.showId,seatIds:a.seatIds}),c="get_film_movie_order_check",u="films";this.$utils.postNew(c,s,u).then((function(t){1==t.sta?0==t.rs.errCode?(a.quantity=t.rs.data.quantity,a.originPrice=t.rs.data.originPrice,a.salePrice=t.rs.data.salePrice,a.getFilmPrice(1)):e.showToast({title:t.rs.errMessage,icon:"none",duration:2e3}):e.showToast({title:t.msg,icon:"none",duration:2e3})}))},methods:{getFilmPrice:function(t){var o=e.getStorageSync("id"),r=this,i=JSON.stringify({memberid:o,quantity:r.quantity,originPrice:r.originPrice,salePrice:r.salePrice,coupon_number:r.coupon_number,showId:r.showId,seatIds:r.seatIds,is_balance:r.is_balance?"1":"0"}),n="get_film_price",a="coupon";this.$utils.postNew(n,i,a).then((function(e){if(r.FilmPrice=e.rs,r.phone=e.rs.phone||"",r.is_balance="1"==e.rs.is_balance,r.film_order_info=e.rs.film_order_info,1==t){r.cartCouponList=e.rs.coupon_list,r.cartCouponList.forEach((function(e){r.$set(e,"gou","0")}));for(var o=0;o<r.cartCouponList.length;o++)e.rs.coupon_number==r.cartCouponList[o].coupon_number?(r.cartCouponList[o].gou=1,r.coupon_number=r.cartCouponList[o].coupon_number):r.cartCouponList[o].gou=0}}))},switch2Change:function(){this.is_balance=!this.is_balance,this.getFilmPrice(1)},coupon:function(e){this.coupon_number=this.coupon_number,this.$refs.popup.close(),this.getFilmPrice()},check:function(e){var t=e.currentTarget.dataset.index,o=e.currentTarget.dataset.couponnumber;if(o==this.coupon_number)1==this.cartCouponList[t].gou?(this.cartCouponList[t].gou=0,this.coupon_number="-1"):0==this.cartCouponList[t].gou&&(this.cartCouponList[t].gou=1,this.coupon_number=this.cartCouponList[t].coupon_number);else for(var r=0;r<this.cartCouponList.length;r++)this.cartCouponList[r].gou=0,o==this.cartCouponList[r].coupon_number&&(this.cartCouponList[t].gou=1,this.coupon_number=this.cartCouponList[t].coupon_number)},bindPhoneNumber:function(t){var o=this,r="getPhoneNumber:ok";if(t.detail.errMsg==r){var i=e.getStorageSync("openid");if(i){var n=JSON.stringify({encrypted_data:t.detail.encryptedData,wx_openid:i,iv:t.detail.iv}),a="get_member_phone_number",s="member";this.$utils.postNew(a,n,s).then((function(e){o.phone=e.rs.phoneNumber}))}}},open:function(){this.$refs.popup.open("bottom")},clickPay:function(){var t=this,o=e.getStorageSync("id"),n=this,a=JSON.stringify({memberid:o,cinemaId:n.film_order_info.cinemaId,movieId:n.film_order_info.movieId,showId:n.showId,seatIds:n.seatIds,coupon_number:n.coupon_number,use_balance:n.is_balance?"1":"0",allowChanged:n.checked?"1":"0"}),s="set_movie_order_submit",c="films";this.$utils.postNew(s,a,c).then((function(o){if(console.log("----\x3e:",o.rs),1==o.sta){var a=o.rs.channelOrderNo;if(1==o.rs.pay_status){var s=(new Date).getTime();i.default.track("custom_order",{order:{order_id:a,order_time:s,order_status:"pay"},sub_orders:[{sub_order_id:a,order_amt:parseFloat(n.FilmPrice.price_zhe),pay_amt:parseFloat(n.FilmPrice.price_zhe)}]}),e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(n.quantity,"&movieName=").concat(n.film_order_info.movieName,"&channelOrderNo=").concat(a,"&isnumber=2")})}else if(0==o.rs.pay_status){var c="get_film_order_pay_info",u=JSON.stringify({ordernumber:o.rs.channelOrderNo});t.$utils.post(c,u).then((function(o){console.log("获取流水号",o);var s=o.rs.serial_number,c=e.getStorageSync("openid");e.request({url:"https://zhijianlw.com/api.php/index/getip",success:function(o){console.log(o.data);var u="add_paylog_to_wx",d=JSON.stringify({serial_number:s,ip:o.data.ip,openid:c,type:"film"});t.$utils.post(u,d).then((function(t){console.log("获取参数",t);var o=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+n.timeStamp,nonceStr:"nonceStr="+n.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var c in console.log("拼接前",s),s)o.push(s[c]);o.sort();var u="";for(var d in o)d==o.length-1?u+=o[d]:u+=o[d]+"&";var p=u+"&key=45579fcdb646746f02d9e041d50975b4";console.log("拼接后",p);var m=r.default.hexMD5(p);console.log(m),e.hideLoading(),e.requestPayment({timeStamp:String(n.timeStamp),nonceStr:n.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:m.toUpperCase(),success:function(t){e.hideLoading();var o=(new Date).getTime();i.default.track("custom_order",{order:{order_id:a,order_time:o,order_status:"pay"},sub_orders:[{sub_order_id:a,order_amt:parseFloat(n.FilmPrice.price_zhe),pay_amt:parseFloat(n.FilmPrice.price_zhe)}]}),e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(n.quantity,"&movieName=").concat(n.film_order_info.movieName,"&channelOrderNo=").concat(a,"&isnumber=2")})},fail:function(t){var o=(new Date).getTime();i.default.track("custom_order",{order:{order_id:a,order_time:o,order_status:"cancel_pay"},sub_orders:[{sub_order_id:a,order_amt:parseFloat(n.FilmPrice.price_zhe),pay_amt:parseFloat(n.FilmPrice.price_zhe)}]}),e.hideLoading(),e.showToast({title:"支付失败",icon:"none"}),n.commodity="",e.redirectTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeSuccess?quantity=".concat(n.quantity,"&movieName=").concat(n.film_order_info.movieName,"&channelOrderNo=").concat(a,"&isnumber=1")})}})}))}})}))}else{var d=(new Date).getTime();i.default.track("custom_order",{order:{order_id:a,order_time:d,order_status:"cancel_pay"},sub_orders:[{sub_order_id:a,order_amt:parseFloat(n.FilmPrice.price_zhe),pay_amt:parseFloat(n.FilmPrice.price_zhe)}]}),e.showToast({icon:"none",title:o.msg?o.msg:"支付错误"})}}else e.showToast({title:o.msg,icon:"none",duration:2e3})}))}}};t.default=a}).call(this,o("543d")["default"])},daa9:function(e,t,o){"use strict";o.r(t);var r=o("7f91"),i=o("1575");for(var n in i)"default"!==n&&function(e){o.d(t,e,(function(){return i[e]}))}(n);o("8d01");var a,s=o("f0c5"),c=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=c.exports}},[["b07b","common/runtime","common/vendor"]]]);