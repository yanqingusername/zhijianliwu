(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/orderList"],{2978:function(e,t,n){"use strict";n.r(t);var r=n("3f88"),o=n("cc9a");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("6889");var s,i=n("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],s);t["default"]=c.exports},"3f88":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.screenPurchase,(function(t,n){var r=e.__get_orig(t),o=e.screenPurchase.length>0&&t.goods_info_list.length>1?e.__map(t.goods_info_list,(function(t,n){var r=e.__get_orig(t),o=e.$utils.imageUrl(t.head_img);return{$orig:r,g0:o}})):null;return{$orig:r,l0:o}})));e.$mp.data=Object.assign({},{$root:{l1:n}})},a=[]},6889:function(e,t,n){"use strict";var r=n("936b"),o=n.n(r);o.a},"936b":function(e,t,n){},b2df:function(e,t,n){"use strict";(function(e){n("334b");r(n("66fd"));var t=r(n("2978"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b896:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("e10e")),o=a(n("1ae9"));a(n("1c5d"));function a(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i={data:function(){var e;return e={ip:"",nav:1,order:[],purchase:[],appid:"",key:"",merchantCode:"",openid:"",outTradeNo:"",totalAmount:"",nums:"",memberid:"",notifyUrl:"",display:!1,cardbag_number:"",index:"",showa:"",sta:"",i:"",onpull:0,scrolltop:"0",triggered:!1,timeStamp:""},s(e,"nums",""),s(e,"pageSize",10),s(e,"pageIndex",1),s(e,"status",null),s(e,"screenPurchase",[]),s(e,"goodsList",[{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"},{img:"../../static/nono.jpg"}]),e},onShow:function(){e.showToast({icon:"loading",title:"加载中"}),this.getOrderList(1)},onLoad:function(t){this.openid=e.getStorageSync("openid"),t.nav&&(this.nav=t.nav)},onPullDownRefresh:function(){this.getOrderList(1),setTimeout((function(){e.stopPullDownRefresh()}),500)},onReachBottom:function(){this.getOrderList(2)},computed:{},methods:{getOrderList:function(t){1==t&&(this.pageIndex=1);var n=this,r="get_my_order_list",o="order",a=e.getStorageSync("id"),s=JSON.stringify({pageSize:this.pageSize,pageIndex:this.pageIndex,memberid:a,type:this.nav});this.$utils.postNew(r,s,o).then((function(e){1==t?(n.pageIndex++,n.screenPurchase=e.rs,n.isAll=!1):e.rs.length>0?(n.screenPurchase=n.screenPurchase.concat(e.rs),n.pageIndex++):n.isAll=!0}))},give:function(t){var n=this,r=t.currentTarget.dataset.cardbag_number,o=t.currentTarget.dataset.price,a=(t.currentTarget.dataset.status,t.currentTarget.dataset.index);console.log(this.purchase[a].status);var s='{"cardbag_number":"'+r+'"}',i="share_cardbag";console.log(s),this.$utils.post(i,s).then((function(t){console.log("赠送好友",t),1==t.sta&&(n.purchase[a].status="2",e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+r+"&price="+o})}),1500)}}))}))},zengsong:function(t){var n=this,r=n.cardbag_number,o=n.totalAmount,a='{"cardbag_number":"'+r+'"}',s="share_cardbag";n.$utils.post(s,a).then((function(t){console.log("赠送好友",t),1==t.sta&&e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+r+"&price="+o})}),1500)}})}))},cancel:function(t){var n=e.getStorageSync("id"),r=t.currentTarget.dataset.ordernumber,o=JSON.stringify({memberid:n,ordernumber:r}),a="cancel_buy_order";this.$utils.post(a,o).then((function(t){console.log("取消订单",t),1==t.sta?(e.showToast({title:"取消成功"}),e.startPullDownRefresh()):e.showToast({title:"操作失败",icon:"none"})}))},refund:function(t){var n=this,r=t.currentTarget.dataset.cardbag_number,o=t.currentTarget.dataset.index;e.showModal({title:"",content:"是否退款",cancelText:"取消",confirmText:"确认",success:function(t){if(t.confirm){console.log("用户点击确定");var a='{"memberid":"'+n.memberid+'","cardbag_number":"'+r+'"}',s="refund_cardbag";console.log(a),n.$utils.post(s,a).then((function(t){console.log("申请退款",t),1==t.sta?(n.purchase[o].status="4",e.showToast({title:t.msg,icon:"success"})):0==t.sta&&e.showToast({title:t.msg,icon:"none"})}))}}})},withdraw:function(t){var n=this,r=t.currentTarget.dataset.cardbag_number,o=t.currentTarget.dataset.index;console.log(this.purchase[o].status);var a='{"memberid":"'+this.memberid+'","cardbag_number":"'+r+'"}',s="recall_cardbag";this.$utils.post(s,a).then((function(t){console.log("撤回赠送",t),1==t.sta&&(n.purchase[o].status="1",e.showToast({title:t.msg,icon:"success"}))}))},withdraww:function(t){var n=this,r=t.currentTarget.dataset.cardbag_number,o=t.currentTarget.dataset.index;console.log(this.purchase[o].status);var a='{"memberid":"'+this.memberid+'","cardbag_number":"'+r+'"}',s="recall_cardbag";this.$utils.post(s,a).then((function(t){console.log("撤回赠送",t),1==t.sta&&(n.order[o].status="1",e.showToast({title:t.msg,icon:"success"}))}))},dele:function(t){var n=this,r=this,o=t.currentTarget.dataset.cardbag_number,a=t.currentTarget.dataset.index;console.log(this.purchase[a].status);var s='{"memberid":"'+this.memberid+'","cardbag_number":"'+o+'"}',i="del_cardbag";console.log(s),e.showModal({title:"",content:"是否删除",cancelText:"取消",confirmText:"删除",success:function(t){t.confirm&&(console.log("用户点击确定"),r.$utils.post(i,s).then((function(t){console.log("删除记录",t),1==t.sta&&(n.purchase.splice(a,1),e.showToast({title:t.msg,icon:"success"}))})))}})},shop:function(e){var t=e.currentTarget.dataset.index,n=[],r=0,o=(this.order[t],order.type),a=order.all_details_num,s=order.goodsinfo_all;if(1==o||2==o)for(var i=0;i<s.length/a;i++)n.push(s[i]);else if(3==o)for(var c in s)n.push(s[c]);else if(4==o){for(var u in s)n.push(s[u]);a=a/s.length-1}for(var d in n)r++,this.sleep(100,+n[d].id,n[d].goodsnum,a,o,r,n.length)},again:function(e){var t=e.currentTarget.dataset.index,n=[],r=0,o=this.purchase[t],a=o.type,s=o.all_details_num,i=o.goodsinfo_all;if(1==a||2==a)for(var c=0;c<i.length/s;c++)n.push(i[c]);else if(3==a)for(var u in i)n.push(i[u]);else if(4==a){for(var d in i)n.push(i[d]);s=s/i.length-1}for(var l in n)r++,this.sleep(100,n[l].id,n[l].goodsnum,s,a,r,n.length)},sleep:function(t,n,r,o,a,s,i){var c=new Date,u=c.getTime()+t;while(1)if(c=new Date,c.getTime()>u){var d='{"memberid":"'+this.memberid+'","goodsid":"'+n+'","goodsnum":"'+r+'"}',l="add_goods_to_giftbag";return void this.$utils.post(l,d).then((function(t){console.log("添加购物车",t),1==t.sta?s==i&&e.navigateTo({url:"../shopping/shop?fenshu="+o+"&type="+a}):e.showToast({title:t.msg,icon:"none"})}))}},logistics:function(t){var n=t.currentTarget.dataset.cardbag_number;e.navigateTo({url:"../logistics/logistics?cardbag_number="+n})},submit:function(e){var t=this,n=e.currentTarget.dataset.ordernumber,r="get_buy_order_pay_info",o=JSON.stringify({ordernumber:n});console.log(o),this.$utils.post(r,o).then((function(e){t.$utils.wxPay(e.rs.serial_number,"buy_order")}))},wx:function(t){var n=this,r=this,a=this.ip,s=this.openid,i='{"serial_number":"'+r.outTradeNo+'","ip":"'+a+'","openid":"'+s+'","type":"cardbag"}',c="add_paylog_to_wx";console.log(i),this.$utils.post(c,i).then((function(t){console.log("获取参数",t);t.rs.serial_number;var a=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+n.timeStamp,nonceStr:"nonceStr="+n.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var i in console.log("拼接前",s),s)a.push(s[i]);a.sort();var c="";for(var u in a)u==a.length-1?c+=a[u]:c+=a[u]+"&";var d=c+"&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv";console.log("拼接后",d);var l=o.default.hexMD5(d);console.log(l),e.requestPayment({timeStamp:String(n.timeStamp),nonceStr:n.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:l.toUpperCase(),success:function(t){e.hideLoading(),e.request({url:"http://zhijianlw.com/api.php/index/set_agent_cardbag",data:{serial_number:r.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(e){console.log("微信成功回调",e)}}),e.showModal({title:"微信支付",content:"支付成功",cancelText:"查看订单",confirmText:"立即赠送",success:function(t){if(t.confirm)console.log("点击立即赠送"),r.zengsong();else if(t.cancel){console.log("点击查看详情");r.cardbag_number;e.switchTab({url:"../order/order"})}}})},fail:function(t){e.hideLoading(),console.log(t),e.showToast({title:"支付失败",icon:"none"}),r.commodity=""}})}))},ipp:function(t){var n=this;e.request({url:"https://pv.sohu.com/cityjson?ie=utf-8",success:function(e){console.log(e);var t=e.data.split(" "),r=t[4],o=r.replace('"',""),a=o.replace('"',""),s=a.replace(",","");n.ip=s,n.wx()}})},forsubmit:function(t){var n=[],r={appId:"appId=EW_N3213842400",random:"random="+this.nums,merchantCode:"merchantCode=EW_N5247492162",outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5"};for(var a in console.log(r),r)n.push(r[a]);n.sort();var s="";for(var i in n)i==n.length-1?s+=n[i]:s+=n[i]+"&";var c=s+"&key=730ed24645b1a54e82a3d2bcff63db37";console.log(c);var u=o.default.hexMD5(c);console.log(u);var d={appId:"appId=EW_N3213842400",sign:"sign="+u,random:"random="+this.nums,merchantCode:"merchantCode=EW_N5247492162",outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5"};console.log(d);var l=[];for(var g in d)l.push(d[g]);l.sort();var p="";for(var h in l)h==l.length-1?p+=l[h]:p+=l[h]+"&";console.log("字符串",p),e.request({url:"https://api.liantuofu.com/open/precreate",data:p,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e.data)}})},xiaochengxu:function(t){this.index;var n=this,r=[],a={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var s in console.log(a),a)r.push(a[s]);r.sort();var i="";for(var c in r)c==r.length-1?i+=r[c]:i+=r[c]+"&";var u=i+"&key="+this.key;console.log(u);var d=o.default.hexMD5(u);console.log(d);var l={appId:"appId="+this.appid,sign:"sign="+d,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(l);var g=[];for(var p in l)g.push(l[p]);g.sort();var h="";for(var m in g)m==g.length-1?h+=g[m]:h+=g[m]+"&";console.log("字符串",h),e.request({url:"https://api.liantuofu.com/open/precreate",data:h,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),n.purchase[n.index].status="1",wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){wx.showModal({title:"微信支付",content:"支付成功",cancelText:"查看详情",confirmText:"立即赠送",success:function(t){t.confirm?(console.log("点击立即赠送"),n.zengsong()):t.cancel&&(console.log(n.cardbag_number),console.log("点击查看详情"),e.navigateTo({url:"../orderDetails/orderDetails?cardbag_number="+n.cardbag_number}))}})},fail:function(e){console.log(e)}})}})},top:function(t){e.showToast({icon:"loading",title:"加载中"});var n=t.currentTarget.dataset.index;this.nav=n,this.getOrderList(1)},purchasedetails:function(t){var n=t.currentTarget.dataset.ordernumber;r.default.buttonClick((function(t){e.navigateTo({url:"./orderDetails?ordernumber="+n})}))},orderdetails:function(t){var n=t.currentTarget.dataset.cardbag_number,o=t.currentTarget.dataset.index,a={memberid_headimg:this.order[o].present_member.head_img,memberid_name:this.order[o].present_member.name};e.setStorageSync("member",a),r.default.buttonClick((function(t){e.navigateTo({url:"../ordeeDetails/ordeeDetails?cardbag_number="+n})}))},chaxun:function(t){var n=this,r=[],a={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};for(var s in console.log(a),a)r.push(a[s]);r.sort();var i="";for(var c in r)c==r.length-1?i+=r[c]:i+=r[c]+"&";var u=i+"&key="+this.key;console.log(u);var d=o.default.hexMD5(u);console.log(d);var l={appId:"appId="+this.appid,sign:"sign="+d,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};console.log(l);var g=[];for(var p in l)g.push(l[p]);g.sort();var h="";for(var m in g)m==g.length-1?h+=g[m]:h+=g[m]+"&";console.log("字符串",h),e.request({url:"https://api.liantuofu.com/open/pay/query",data:h,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log("订单状态",t.data),"订单已支付"==t.data.msg&&e.reLaunch({url:"../success/success?cardbag_number="+n.cardbag_number})}})},onPageScroll:function(e){e.scrollTop>3?this.fixed=1:e.scrollTop<3&&(this.fixed=0),0!=this.indexx&&1!=this.indexx||(this.showleft=!1,this.showright=!1),e.scrollTop>100||(this.scrolltop=e.scrollTop)},start:function(e){var t=e.touches[0].clientY;this.sy=t,console.log("开始触摸 sy : "+t+" scrolltop : "+this.scrolltop)},end:function(e){var t=this;this.removal>=50?setTimeout((function(){t.triggered=!1}),3e3):(this.removal=0,this.triggered=!1)},move:function(e){if(this.scrolltop<=0){var t=e.touches[0].clientY-this.sy;t>20&&(1==this.triggered||(this.onpull=40,this.removal=50,this.triggered=!0))}},onRefresh:function(){var t=this,n=[],r=[];this.memberid;this.pageIndex=1;var o=JSON.stringify({memberid:this.memberid,pageSize:this.pageSize,pageIndex:this.pageIndex,status:this.status}),a="get_order_list";this.$utils.post(a,o).then((function(o){console.log("订单列表",o),t.purchase=o.rs,t.purchase=n,t.order=r,e.stopPullDownRefresh(),t.pageIndex++}))},onPulling:function(e){console.log("onpulling",e)},onRestore:function(){this.onpull=0,console.log("onRestore")},code:function(e){this.display=!1},subscribe:function(t){200==this.sta?e.requestSubscribeMessage({tmplIds:["wMP3q9gTNfqVg2QEshGiNyQXZcZFam2SjmlDpcartBc"],success:function(e){var t='{"memberid":"'+this.memberid+'"}',n="cancel_cardbag";this.$utils.post(n,t).then((function(e){console.log(e)}))}}):0==this.sta&&wx.showToast({title:"请先登录",icon:"none"})},goToLoistics:function(t){console.log(t),e.navigateTo({url:"./logistics/logistics?ordernumber="+t.target.dataset.ordernumber})},selectliwu:function(t){e.reLaunch({url:"../index/index"})},ApplyRefund:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.typerefund,o=t.currentTarget.dataset.goodslength,a=t.currentTarget.dataset.detailid;o>1?e.navigateTo({url:"../../pagesub/Refund/ExchangeGoods?ordernumber=".concat(n,"&typerefund=").concat(r)}):e.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(a)})},ApplyInvoice:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplyInvoice?ordernumber="+n})},ApplyInfo:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplySuccess?ordernumber=".concat(n,"&types=1")})},RefundAfterSale:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../../pagesub/Refund/RefundAfterSale?ordernumber=".concat(n)})},againProduct:function(t){var n=t.currentTarget.dataset.ordernumber,r="order_add_shopping_cart",o=e.getStorageSync("id"),a="order",s=JSON.stringify({ordernumber:n,memberid:o});this.$utils.postNew(r,s,a).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))},PresentNow:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../shopping/succes?cardbag_number="+n})},GiveitAgain:function(t){var n=t.currentTarget.dataset.ordernumber,r="order_add_shopping_cart",o=e.getStorageSync("id"),a="order",s=JSON.stringify({ordernumber:n,memberid:o});this.$utils.postNew(r,s,a).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))},go_exchange:function(t){console.log(t);var n=t.currentTarget.dataset.cardid;e.navigateTo({url:"../index-coupon/redemption_center?cardid="+n+"&isOrder=1"})},goRecharge:function(t){var n=t.currentTarget.dataset.ordernumber,r=e.getStorageSync("id"),o="order",a="recharge_giftcard",s=JSON.stringify({memberid:r,ordernumber:n});this.$utils.postNew(a,s,o).then((function(t){1==t.sta?setTimeout((function(){e.navigateTo({url:"../balance/RechargeStatus?istype=1&ordernumber="+n})}),500):e.showToast({title:t.msg,icon:"none",mask:"true"})}))},goTransfer:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.isexchangetype;if(0==r){var o=t.currentTarget.dataset.ordernumber,a="order_add_shopping_cart",s=e.getStorageSync("id"),i="order",c=JSON.stringify({ordernumber:o,memberid:s,buy_type:1});this.$utils.postNew(a,c,i).then((function(t){1==t.sta&&e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber=".concat(o,"&is_exchange_type=").concat(r)})}))}else e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber=".concat(n,"&is_exchange_type=").concat(r)})},ReceptionAddress:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"./ReceptionAddress?ordernumber="+n})},receptiondetails:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.status,o=t.currentTarget.dataset.cardtype;n&&(1==this.nav?e.navigateTo({url:"./MyBuyOrderInfo?ordernumber="+n}):2==this.nav?e.navigateTo({url:"./MySendOrderInfo?ordernumber="+n}):0!=r&&1!=r||2!=o?e.navigateTo({url:"./ReceptionOrderInfo?ordernumber="+n}):e.navigateTo({url:"./ReceptionDetails?ordernumber="+n}))},receptionOrderInfo:function(t){e.navigateTo({url:"./MySendOrderInfo"})}}};t.default=i}).call(this,n("543d")["default"])},cc9a:function(e,t,n){"use strict";n.r(t);var r=n("b896"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a}},[["b2df","common/runtime","common/vendor"]]]);