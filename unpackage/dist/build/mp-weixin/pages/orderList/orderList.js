(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/orderList"],{2978:function(e,t,r){"use strict";r.r(t);var n=r("593c"),a=r("cc9a");for(var o in a)"default"!==o&&function(e){r.d(t,e,(function(){return a[e]}))}(o);r("6889");var s,i=r("f0c5"),c=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=c.exports},"593c":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,r=(e._self._c,e.__map(e.screenPurchase,(function(t,r){var n=e.__get_orig(t),a=e.screenPurchase.length>0&&t.goods_info_list.length>1?e.__map(t.goods_info_list,(function(t,r){var n=e.__get_orig(t),a=e.$utils.imageUrl(t.head_img);return{$orig:n,g0:a}})):null;return{$orig:n,l0:a}})));e.$mp.data=Object.assign({},{$root:{l1:r}})},o=[]},6889:function(e,t,r){"use strict";var n=r("936b"),a=r.n(n);a.a},"936b":function(e,t,r){},b2df:function(e,t,r){"use strict";(function(e){r("334b");n(r("66fd"));var t=n(r("2978"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])},b896:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(r("e10e")),a=o(r("1ae9"));o(r("1c5d"));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var i={data:function(){var e;return e={ip:"",nav:1,order:[],purchase:[],appid:"",key:"",merchantCode:"",openid:"",outTradeNo:"",totalAmount:"",nums:"",memberid:"",notifyUrl:"",display:!1,cardbag_number:"",index:"",showa:"",sta:"",i:"",onpull:0,scrolltop:"0",triggered:!1,timeStamp:""},s(e,"nums",""),s(e,"pageSize",10),s(e,"pageIndex",1),s(e,"status",null),s(e,"screenPurchase",[]),s(e,"goodsList",[{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"}]),e},onShow:function(){this.getOrderList(1)},onLoad:function(t){this.openid=e.getStorageSync("openid"),t.nav&&(this.nav=t.nav)},onPullDownRefresh:function(){this.getOrderList(1),setTimeout((function(){e.stopPullDownRefresh()}),500)},onReachBottom:function(){this.getOrderList(2)},computed:{},methods:{getOrderList:function(t){1==t&&(this.pageIndex=1);var r=this,n="get_my_order_list",a="order",o=e.getStorageSync("id"),s=JSON.stringify({pageSize:this.pageSize,pageIndex:this.pageIndex,memberid:o,type:this.nav});this.$utils.postNew(n,s,a).then((function(e){1==t?(r.pageIndex++,r.screenPurchase=e.rs,r.isAll=!1):e.rs.length>0?(r.screenPurchase=r.screenPurchase.concat(e.rs),r.pageIndex++):r.isAll=!0}))},give:function(t){var r=this,n=t.currentTarget.dataset.cardbag_number,a=t.currentTarget.dataset.price,o=(t.currentTarget.dataset.status,t.currentTarget.dataset.index);console.log(this.purchase[o].status);var s='{"cardbag_number":"'+n+'"}',i="share_cardbag";console.log(s),this.$utils.post(i,s).then((function(t){console.log("赠送好友",t),1==t.sta&&(r.purchase[o].status="2",e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+n+"&price="+a})}),1500)}}))}))},zengsong:function(t){var r=this,n=r.cardbag_number,a=r.totalAmount,o='{"cardbag_number":"'+n+'"}',s="share_cardbag";r.$utils.post(s,o).then((function(t){console.log("赠送好友",t),1==t.sta&&e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+n+"&price="+a})}),1500)}})}))},cancel:function(t){var r=e.getStorageSync("id"),n=t.currentTarget.dataset.ordernumber,a=JSON.stringify({memberid:r,ordernumber:n}),o="cancel_buy_order";this.$utils.post(o,a).then((function(t){console.log("取消订单",t),1==t.sta?(e.showToast({title:"取消成功"}),e.startPullDownRefresh()):e.showToast({title:"操作失败",icon:"none"})}))},refund:function(t){var r=this,n=t.currentTarget.dataset.cardbag_number,a=t.currentTarget.dataset.index;e.showModal({title:"",content:"是否退款",cancelText:"取消",confirmText:"确认",success:function(t){if(t.confirm){console.log("用户点击确定");var o='{"memberid":"'+r.memberid+'","cardbag_number":"'+n+'"}',s="refund_cardbag";console.log(o),r.$utils.post(s,o).then((function(t){console.log("申请退款",t),1==t.sta?(r.purchase[a].status="4",e.showToast({title:t.msg,icon:"success"})):0==t.sta&&e.showToast({title:t.msg,icon:"none"})}))}}})},withdraw:function(t){var r=this,n=t.currentTarget.dataset.cardbag_number,a=t.currentTarget.dataset.index;console.log(this.purchase[a].status);var o='{"memberid":"'+this.memberid+'","cardbag_number":"'+n+'"}',s="recall_cardbag";this.$utils.post(s,o).then((function(t){console.log("撤回赠送",t),1==t.sta&&(r.purchase[a].status="1",e.showToast({title:t.msg,icon:"success"}))}))},withdraww:function(t){var r=this,n=t.currentTarget.dataset.cardbag_number,a=t.currentTarget.dataset.index;console.log(this.purchase[a].status);var o='{"memberid":"'+this.memberid+'","cardbag_number":"'+n+'"}',s="recall_cardbag";this.$utils.post(s,o).then((function(t){console.log("撤回赠送",t),1==t.sta&&(r.order[a].status="1",e.showToast({title:t.msg,icon:"success"}))}))},dele:function(t){var r=this,n=this,a=t.currentTarget.dataset.cardbag_number,o=t.currentTarget.dataset.index;console.log(this.purchase[o].status);var s='{"memberid":"'+this.memberid+'","cardbag_number":"'+a+'"}',i="del_cardbag";console.log(s),e.showModal({title:"",content:"是否删除",cancelText:"取消",confirmText:"删除",success:function(t){t.confirm&&(console.log("用户点击确定"),n.$utils.post(i,s).then((function(t){console.log("删除记录",t),1==t.sta&&(r.purchase.splice(o,1),e.showToast({title:t.msg,icon:"success"}))})))}})},shop:function(e){var t=e.currentTarget.dataset.index,r=[],n=0,a=(this.order[t],order.type),o=order.all_details_num,s=order.goodsinfo_all;if(1==a||2==a)for(var i=0;i<s.length/o;i++)r.push(s[i]);else if(3==a)for(var c in s)r.push(s[c]);else if(4==a){for(var u in s)r.push(s[u]);o=o/s.length-1}for(var d in r)n++,this.sleep(100,+r[d].id,r[d].goodsnum,o,a,n,r.length)},again:function(e){var t=e.currentTarget.dataset.index,r=[],n=0,a=this.purchase[t],o=a.type,s=a.all_details_num,i=a.goodsinfo_all;if(1==o||2==o)for(var c=0;c<i.length/s;c++)r.push(i[c]);else if(3==o)for(var u in i)r.push(i[u]);else if(4==o){for(var d in i)r.push(i[d]);s=s/i.length-1}for(var l in r)n++,this.sleep(100,r[l].id,r[l].goodsnum,s,o,n,r.length)},sleep:function(t,r,n,a,o,s,i){var c=new Date,u=c.getTime()+t;while(1)if(c=new Date,c.getTime()>u){var d='{"memberid":"'+this.memberid+'","goodsid":"'+r+'","goodsnum":"'+n+'"}',l="add_goods_to_giftbag";return void this.$utils.post(l,d).then((function(t){console.log("添加购物车",t),1==t.sta?s==i&&e.navigateTo({url:"../shopping/shop?fenshu="+a+"&type="+o}):e.showToast({title:t.msg,icon:"none"})}))}},logistics:function(t){var r=t.currentTarget.dataset.cardbag_number;e.navigateTo({url:"../logistics/logistics?cardbag_number="+r})},submit:function(t){var r=this;e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"],success:function(t){var r="add_wx_subscribe_log",n="subscribe",a=e.getStorageSync("id"),o=JSON.stringify({memberid:a,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"});this.$utils.postNew(r,o,n).then((function(e){e.sta}))},fail:function(e){}});var n=t.currentTarget.dataset.ordernumber,a="get_buy_order_pay_info",o=JSON.stringify({ordernumber:n});console.log(o),this.$utils.post(a,o).then((function(e){r.$utils.wxPay(e.rs.serial_number,"buy_order")}))},wx:function(t){var r=this,n=this,o=this.ip,s=this.openid,i='{"serial_number":"'+n.outTradeNo+'","ip":"'+o+'","openid":"'+s+'","type":"cardbag"}',c="add_paylog_to_wx";console.log(i),this.$utils.post(c,i).then((function(t){console.log("获取参数",t);var o=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+r.timeStamp,nonceStr:"nonceStr="+r.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var i in console.log("拼接前",s),s)o.push(s[i]);o.sort();var c="";for(var u in o)u==o.length-1?c+=o[u]:c+=o[u]+"&";var d=c+"&key=45579fcdb646746f02d9e041d50975b4";console.log("拼接后",d);var l=a.default.hexMD5(d);console.log(l),e.requestPayment({timeStamp:String(r.timeStamp),nonceStr:r.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:l.toUpperCase(),success:function(t){e.hideLoading(),e.request({url:"http://zhijianlw.com/api.php/index/set_agent_cardbag",data:{serial_number:n.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(e){console.log("微信成功回调",e)}}),e.showModal({title:"微信支付",content:"支付成功",cancelText:"查看订单",confirmText:"立即赠送",success:function(t){if(t.confirm)console.log("点击立即赠送"),n.zengsong();else if(t.cancel){console.log("点击查看详情");n.cardbag_number;e.switchTab({url:"../order/order"})}}})},fail:function(t){e.hideLoading(),console.log(t),e.showToast({title:"支付失败",icon:"none"}),n.commodity=""}})}))},ipp:function(t){var r=this;e.request({url:"https://pv.sohu.com/cityjson?ie=utf-8",success:function(e){console.log(e);var t=e.data.split(" "),n=t[4],a=n.replace('"',""),o=a.replace('"',""),s=o.replace(",","");r.ip=s,r.wx()}})},forsubmit:function(t){var r=[],n={appId:"appId=EW_N3213842400",random:"random="+this.nums,merchantCode:"merchantCode=EW_N5247492162",outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5"};for(var o in console.log(n),n)r.push(n[o]);r.sort();var s="";for(var i in r)i==r.length-1?s+=r[i]:s+=r[i]+"&";var c=s+"&key=730ed24645b1a54e82a3d2bcff63db37";console.log(c);var u=a.default.hexMD5(c);console.log(u);var d={appId:"appId=EW_N3213842400",sign:"sign="+u,random:"random="+this.nums,merchantCode:"merchantCode=EW_N5247492162",outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5"};console.log(d);var l=[];for(var g in d)l.push(d[g]);l.sort();var p="";for(var h in l)h==l.length-1?p+=l[h]:p+=l[h]+"&";console.log("字符串",p),e.request({url:"https://api.liantuofu.com/open/precreate",data:p,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e.data)}})},xiaochengxu:function(t){this.index;var r=this,n=[],o={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var s in console.log(o),o)n.push(o[s]);n.sort();var i="";for(var c in n)c==n.length-1?i+=n[c]:i+=n[c]+"&";var u=i+"&key="+this.key;console.log(u);var d=a.default.hexMD5(u);console.log(d);var l={appId:"appId="+this.appid,sign:"sign="+d,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(l);var g=[];for(var p in l)g.push(l[p]);g.sort();var h="";for(var m in g)m==g.length-1?h+=g[m]:h+=g[m]+"&";console.log("字符串",h),e.request({url:"https://api.liantuofu.com/open/precreate",data:h,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),r.purchase[r.index].status="1",wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){wx.showModal({title:"微信支付",content:"支付成功",cancelText:"查看详情",confirmText:"立即赠送",success:function(t){t.confirm?(console.log("点击立即赠送"),r.zengsong()):t.cancel&&(console.log(r.cardbag_number),console.log("点击查看详情"),e.navigateTo({url:"../orderDetails/orderDetails?cardbag_number="+r.cardbag_number}))}})},fail:function(e){console.log(e)}})}})},top:function(e){var t=e.currentTarget.dataset.index;this.nav=t,this.getOrderList(1)},purchasedetails:function(t){var r=t.currentTarget.dataset.ordernumber;n.default.buttonClick((function(t){e.navigateTo({url:"./orderDetails?ordernumber="+r})}))},orderdetails:function(t){var r=t.currentTarget.dataset.cardbag_number,a=t.currentTarget.dataset.index,o={memberid_headimg:this.order[a].present_member.head_img,memberid_name:this.order[a].present_member.name};e.setStorageSync("member",o),n.default.buttonClick((function(t){e.navigateTo({url:"../ordeeDetails/ordeeDetails?cardbag_number="+r})}))},chaxun:function(t){var r=this,n=[],o={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};for(var s in console.log(o),o)n.push(o[s]);n.sort();var i="";for(var c in n)c==n.length-1?i+=n[c]:i+=n[c]+"&";var u=i+"&key="+this.key;console.log(u);var d=a.default.hexMD5(u);console.log(d);var l={appId:"appId="+this.appid,sign:"sign="+d,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};console.log(l);var g=[];for(var p in l)g.push(l[p]);g.sort();var h="";for(var m in g)m==g.length-1?h+=g[m]:h+=g[m]+"&";console.log("字符串",h),e.request({url:"https://api.liantuofu.com/open/pay/query",data:h,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log("订单状态",t.data),"订单已支付"==t.data.msg&&e.reLaunch({url:"../success/success?cardbag_number="+r.cardbag_number})}})},onPageScroll:function(e){e.scrollTop>3?this.fixed=1:e.scrollTop<3&&(this.fixed=0),0!=this.indexx&&1!=this.indexx||(this.showleft=!1,this.showright=!1),e.scrollTop>100||(this.scrolltop=e.scrollTop)},start:function(e){var t=e.touches[0].clientY;this.sy=t,console.log("开始触摸 sy : "+t+" scrolltop : "+this.scrolltop)},end:function(e){var t=this;this.removal>=50?setTimeout((function(){t.triggered=!1}),3e3):(this.removal=0,this.triggered=!1)},move:function(e){if(this.scrolltop<=0){var t=e.touches[0].clientY-this.sy;t>20&&(1==this.triggered||(this.onpull=40,this.removal=50,this.triggered=!0))}},onRefresh:function(){var t=this,r=[],n=[];this.memberid;this.pageIndex=1;var a=JSON.stringify({memberid:this.memberid,pageSize:this.pageSize,pageIndex:this.pageIndex,status:this.status}),o="get_order_list";this.$utils.post(o,a).then((function(a){console.log("订单列表",a),t.purchase=a.rs,t.purchase=r,t.order=n,e.stopPullDownRefresh(),t.pageIndex++}))},onPulling:function(e){console.log("onpulling",e)},onRestore:function(){this.onpull=0,console.log("onRestore")},code:function(e){this.display=!1},subscribe:function(t){200==this.sta?e.requestSubscribeMessage({tmplIds:["wMP3q9gTNfqVg2QEshGiNyQXZcZFam2SjmlDpcartBc"],success:function(e){var t='{"memberid":"'+this.memberid+'"}',r="cancel_cardbag";this.$utils.post(r,t).then((function(e){console.log(e)}))}}):0==this.sta&&wx.showToast({title:"请先登录",icon:"none"})},goToLoistics:function(t){console.log(t),e.navigateTo({url:"./logistics/logistics?ordernumber="+t.target.dataset.ordernumber})},selectliwu:function(t){e.reLaunch({url:"../index/index"})},ApplyRefund:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.typerefund,a=t.currentTarget.dataset.goodslength,o=t.currentTarget.dataset.detailid,s=t.currentTarget.dataset.nav;if(2==s){var i=t.currentTarget.dataset.goodsinfolist,c=t.currentTarget.dataset.isrefundprice,u=[];for(var d in i)u.push(i[d].id);var l=u.join(",");0==c?e.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(l)}):e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(l)})}else a>1?e.navigateTo({url:"../../pagesub/Refund/ExchangeGoods?ordernumber=".concat(r,"&typerefund=").concat(n)}):e.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(o)})},ApplyInvoice:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplyInvoice?ordernumber="+r})},ApplyInfo:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplySuccess?ordernumber=".concat(r,"&types=1")})},RefundAfterSale:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.isreception,a=t.currentTarget.dataset.isexchangegoods||0,o=t.currentTarget.dataset.detailid;1==n?0==a?e.navigateTo({url:"../../pagesub/Refund/RefundAfterSale?ordernumber=".concat(r,"&isreception=").concat(n)}):e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(r,"&typerefund=2&detailid=").concat(o)}):e.navigateTo({url:"../../pagesub/Refund/RefundAfterSale?ordernumber=".concat(r,"&isreception=").concat(n)})},againProduct:function(t){var r=t.currentTarget.dataset.ordernumber,n="order_add_shopping_cart",a=e.getStorageSync("id"),o="order",s=JSON.stringify({ordernumber:r,memberid:a});this.$utils.postNew(n,s,o).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))},PresentNow:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../shopping/succes?cardbag_number="+r})},GiveitAgain:function(t){var r=t.currentTarget.dataset.ordernumber,n="order_add_shopping_cart",a=e.getStorageSync("id"),o="order",s=JSON.stringify({ordernumber:r,memberid:a});this.$utils.postNew(n,s,o).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))},go_exchange:function(t){var r=t.currentTarget.dataset.cardid,n=t.currentTarget.dataset.isnianka,a=t.currentTarget.dataset.ordernumber;1==n?e.navigateTo({url:"/pagesub/YearCard/YearCardShopList?cardid="+r+"&isOrder=1&ordernumber="+a}):e.navigateTo({url:"../index-coupon/redemption_center?cardid="+r+"&isOrder=1&ordernumber="+a})},goRecharge:function(t){var r=t.currentTarget.dataset.ordernumber,n=e.getStorageSync("id"),a="order",o="recharge_giftcard",s=JSON.stringify({memberid:n,ordernumber:r});this.$utils.postNew(o,s,a).then((function(t){1==t.sta?setTimeout((function(){e.navigateTo({url:"../balance/RechargeStatus?istype=1&ordernumber="+r})}),500):e.showToast({title:t.msg,icon:"none",mask:"true"})}))},goTransfer:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.isexchangetype;if(0==n){var a=t.currentTarget.dataset.ordernumber,o="order_add_shopping_cart",s=e.getStorageSync("id"),i="order",c=JSON.stringify({ordernumber:a,memberid:s,buy_type:1});this.$utils.postNew(o,c,i).then((function(t){1==t.sta&&e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber=".concat(a,"&is_exchange_type=").concat(n)})}))}else e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber=".concat(r,"&is_exchange_type=").concat(n)})},ReceptionAddress:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"./ReceptionAddress?ordernumber="+r})},receptiondetails:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.status,a=t.currentTarget.dataset.cardtype,o=t.currentTarget.dataset.isnianka;r&&(1==this.nav?e.navigateTo({url:"./MyBuyOrderInfo?ordernumber="+r}):2==this.nav?e.navigateTo({url:"./MySendOrderInfo?ordernumber="+r}):1==o?e.navigateTo({url:"/pagesub/YearCard/YearCardDetail?ordernumber="+r}):0!=n&&1!=n||2!=a?e.navigateTo({url:"./ReceptionOrderInfo?ordernumber="+r}):e.navigateTo({url:"./ReceptionDetails?ordernumber="+r}))},receptionOrderInfo:function(t){e.navigateTo({url:"./MySendOrderInfo"})}}};t.default=i}).call(this,r("543d")["default"])},cc9a:function(e,t,r){"use strict";r.r(t);var n=r("b896"),a=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a}},[["b2df","common/runtime","common/vendor"]]]);