(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{1450:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(o("2e30")),n=r(o("92fd"));r(o("b525"));function r(e){return e&&e.__esModule?e:{default:e}}function s(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var i={data:function(){var e;return e={ip:"",nav:"0",order:[],purchase:[],appid:"",key:"",merchantCode:"",openid:"",outTradeNo:"",totalAmount:"",nums:"",memberid:"",notifyUrl:"",display:!1,cardbag_number:"",index:"",showa:"",sta:"",i:"",onpull:0,scrolltop:"0",triggered:!1,timeStamp:""},s(e,"nums",""),s(e,"pageSize",10),s(e,"pageIndex",1),e},onShow:function(){var t=this;console.log("重新载入页面"),e.startPullDownRefresh({fail:function(e){console.log(e)}});if(1==this.showa){var o=this.memberid,a=JSON.stringify({memberid:this.memberid,pageSize:this.pageSize,pageIndex:this.pageIndex}),n="get_cardbag_list";this.memberid=o,this.$utils.post(n,a).then((function(e){for(var o in console.log("订单列表",e),e.rs)0==e.rs[o].pay_type&&t.purchase.push(e.rs[o]),1==e.rs[o].pay_type&&e.rs[o].goodsinfo_all.length>0&&t.order.push(e.rs[o])}))}},onLoad:function(t){var o=this;t.nav&&(this.nav=t.nav);var a=[],n=[],r=this,s=e.getStorageSync("sign");if(s){var i=setTimeout((function(e){r.showa=1,clearTimeout(i)}),100);this.sta="200",this.memberid=e.getStorageSync("id");var c=JSON.stringify({memberid:this.memberid,pageSize:this.pageSize,pageIndex:this.pageIndex}),l="get_cardbag_list";this.$utils.post(l,c).then((function(e){for(var t in console.log("订单列表",e),o.pageIndex++,e.rs)0==e.rs[t].pay_type&&a.push(e.rs[t]),1==e.rs[t].pay_type&&e.rs[t].goodsinfo_all.length>0&&n.push(e.rs[t]);console.log("我购买的",o.purchase),console.log("我收到的",o.order),o.purchase=a,o.order=n}))}else this.sta="0",this.level=1,this.level_name="普通会员",this.discount_name="无折扣",e.setStorageSync("level",1),e.setStorageSync("level_name","普通会员"),e.setStorageSync("discount_name","无折扣");c="{}",l="get_payconfig";this.$utils.post(l,c).then((function(t){console.log("第三方参数",t),o.appid=t.rs.appid,o.key=t.rs.key,o.merchantCode=t.rs.merchantCode,o.openid=e.getStorageSync("openid")}));for(var u=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],d="",g=0;g<32;g++){var h=parseInt(61*Math.random());d+=u[h]}this.nums=d,this.timeStamp=(new Date).getTime()},onPullDownRefresh:function(t){var o=this,a=[],n=[];if(1==this.showa){var r=this.memberid;this.pageIndex=1;var s=JSON.stringify({memberid:this.memberid,pageSize:this.pageSize,pageIndex:this.pageIndex}),i="get_cardbag_list";this.memberid=r,this.$utils.post(i,s).then((function(e){for(var t in console.log("订单列表",e),o.pageIndex++,e.rs)0==e.rs[t].pay_type&&a.push(e.rs[t]),1==e.rs[t].pay_type&&e.rs[t].goodsinfo_all.length>0&&n.push(e.rs[t]);o.purchase=a,o.order=n}))}setTimeout((function(){e.stopPullDownRefresh()}),1e3)},onReachBottom:function(e){var t=this,o=JSON.stringify({memberid:this.memberid,pageSize:this.pageSize,pageIndex:this.pageIndex}),a="get_cardbag_list";this.$utils.post(a,o).then((function(e){for(var o in console.log("订单列表",e),t.pageIndex++,e.rs)0==e.rs[o].pay_type&&t.purchase.push(e.rs[o]),1==e.rs[o].pay_type&&e.rs[o].goodsinfo_all.length>0&&t.order.push(e.rs[o])}))},methods:{give:function(t){var o=this,a=t.currentTarget.dataset.cardbag_number,n=t.currentTarget.dataset.price,r=(t.currentTarget.dataset.status,t.currentTarget.dataset.index);console.log(this.purchase[r].status);var s='{"cardbag_number":"'+a+'"}',i="share_cardbag";console.log(s),this.$utils.post(i,s).then((function(t){console.log("赠送好友",t),1==t.sta&&(o.purchase[r].status="2",e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+a+"&price="+n})}),1500)}}))}))},zengsong:function(t){var o=this,a=o.cardbag_number,n=o.totalAmount,r='{"cardbag_number":"'+a+'"}',s="share_cardbag";o.$utils.post(s,r).then((function(t){console.log("赠送好友",t),1==t.sta&&e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+a+"&price="+n})}),1500)}})}))},cancel:function(t){var o=this,a=t.currentTarget.dataset.cardbag_number,n=t.currentTarget.dataset.index,r='{"memberid":"'+this.memberid+'","cardbag_number":"'+a+'"}',s="cancel_cardbag";this.$utils.post(s,r).then((function(t){console.log("取消订单",t),1==t.sta&&(o.purchase[n].status="5",e.showToast({title:t.msg,icon:"success"}))}))},refund:function(t){var o=this,a=t.currentTarget.dataset.cardbag_number,n=t.currentTarget.dataset.index;e.showModal({title:"",content:"是否退款",cancelText:"取消",confirmText:"确认",success:function(t){if(t.confirm){console.log("用户点击确定");var r='{"memberid":"'+o.memberid+'","cardbag_number":"'+a+'"}',s="refund_cardbag";console.log(r),o.$utils.post(s,r).then((function(t){console.log("申请退款",t),1==t.sta?(o.purchase[n].status="4",e.showToast({title:t.msg,icon:"success"})):0==t.sta&&e.showToast({title:t.msg,icon:"none"})}))}}})},withdraw:function(t){var o=this,a=t.currentTarget.dataset.cardbag_number,n=t.currentTarget.dataset.index;console.log(this.purchase[n].status);var r='{"memberid":"'+this.memberid+'","cardbag_number":"'+a+'"}',s="recall_cardbag";this.$utils.post(s,r).then((function(t){console.log("撤回赠送",t),1==t.sta&&(o.purchase[n].status="1",e.showToast({title:t.msg,icon:"success"}))}))},withdraww:function(t){var o=this,a=t.currentTarget.dataset.cardbag_number,n=t.currentTarget.dataset.index;console.log(this.purchase[n].status);var r='{"memberid":"'+this.memberid+'","cardbag_number":"'+a+'"}',s="recall_cardbag";this.$utils.post(s,r).then((function(t){console.log("撤回赠送",t),1==t.sta&&(o.order[n].status="1",e.showToast({title:t.msg,icon:"success"}))}))},dele:function(t){var o=this,a=this,n=t.currentTarget.dataset.cardbag_number,r=t.currentTarget.dataset.index;console.log(this.purchase[r].status);var s='{"memberid":"'+this.memberid+'","cardbag_number":"'+n+'"}',i="del_cardbag";console.log(s),e.showModal({title:"",content:"是否删除",cancelText:"取消",confirmText:"删除",success:function(t){t.confirm&&(console.log("用户点击确定"),a.$utils.post(i,s).then((function(t){console.log("删除记录",t),1==t.sta&&(o.purchase.splice(r,1),e.showToast({title:t.msg,icon:"success"}))})))}})},shop:function(e){var t=e.currentTarget.dataset.index,o=[],a=0,n=(this.order[t],order.type),r=order.all_details_num,s=order.goodsinfo_all;if(1==n||2==n)for(var i=0;i<s.length/r;i++)o.push(s[i]);else if(3==n)for(var c in s)o.push(s[c]);else if(4==n){for(var l in s)o.push(s[l]);r=r/s.length-1}for(var u in o)a++,this.sleep(100,+o[u].id,o[u].goodsnum,r,n,a,o.length)},again:function(e){var t=e.currentTarget.dataset.index,o=[],a=0,n=this.purchase[t],r=n.type,s=n.all_details_num,i=n.goodsinfo_all;if(1==r||2==r)for(var c=0;c<i.length/s;c++)o.push(i[c]);else if(3==r)for(var l in i)o.push(i[l]);else if(4==r){for(var u in i)o.push(i[u]);s=s/i.length-1}for(var d in o)a++,this.sleep(100,o[d].id,o[d].goodsnum,s,r,a,o.length)},sleep:function(t,o,a,n,r,s,i){var c=new Date,l=c.getTime()+t;while(1)if(c=new Date,c.getTime()>l){var u='{"memberid":"'+this.memberid+'","goodsid":"'+o+'","goodsnum":"'+a+'"}',d="add_goods_to_giftbag";return void this.$utils.post(d,u).then((function(t){console.log("添加购物车",t),1==t.sta?s==i&&e.navigateTo({url:"../shopping/shop?fenshu="+n+"&type="+r}):e.showToast({title:t.msg,icon:"none"})}))}},address:function(t){var o=t.currentTarget.dataset.cardbag_number;e.redirectTo({url:"../ordeDetails/ordeDetails?cardbag_number="+o})},logistics:function(t){var o=t.currentTarget.dataset.cardbag_number;e.navigateTo({url:"../logistics/logistics?cardbag_number="+o})},submit:function(t){var o=this;this.cardbag_number=t.detail.target.dataset.cardbag_number;var a='{"cardbag_number":"'+t.detail.target.dataset.cardbag_number+'","memberid":"'+this.memberid+'"}',n="get_cardbag_pay_info";this.index=t.detail.target.dataset.index,this.$utils.post(n,a).then((function(t){console.log("获取支付金额",t),1==t.sta?(e.showLoading({title:"加载中",mask:!0}),o.outTradeNo=t.rs.serial_number,o.notifyUrl="https://zhijianlw.com/api.php/index/set_agent_cardbag?serial_number="+t.rs.serial_number,o.totalAmount=t.rs.paymoney,o.ipp()):e.showToast({title:t.msg,icon:none})}))},wx:function(t){var o=this,a=this,r=this.ip,s=this.openid,i='{"serial_number":"'+a.outTradeNo+'","ip":"'+r+'","openid":"'+s+'","type":"cardbag"}',c="add_paylog_to_wx";console.log(i),this.$utils.post(c,i).then((function(t){console.log("获取参数",t);t.rs.serial_number;var r=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+o.timeStamp,nonceStr:"nonceStr="+o.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var i in console.log("拼接前",s),s)r.push(s[i]);r.sort();var c="";for(var l in r)l==r.length-1?c+=r[l]:c+=r[l]+"&";var u=c+"&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv";console.log("拼接后",u);var d=n.default.hexMD5(u);console.log(d),e.requestPayment({timeStamp:String(o.timeStamp),nonceStr:o.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:d.toUpperCase(),success:function(t){e.hideLoading(),e.request({url:"http://zhijianlw.com/api.php/index/set_agent_cardbag",data:{serial_number:a.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(e){console.log("微信成功回调",e)}}),e.showModal({title:"微信支付",content:"支付成功",cancelText:"查看订单",confirmText:"立即赠送",success:function(t){if(t.confirm)console.log("点击立即赠送"),a.zengsong();else if(t.cancel){console.log("点击查看详情");a.cardbag_number;e.switchTab({url:"../order/order"})}}})},fail:function(t){e.hideLoading(),console.log(t),e.showToast({title:"支付失败",icon:"none"}),a.commodity=""}})}))},ipp:function(t){var o=this;e.request({url:"https://pv.sohu.com/cityjson?ie=utf-8",success:function(e){console.log(e);var t=e.data.split(" "),a=t[4],n=a.replace('"',""),r=n.replace('"',""),s=r.replace(",","");o.ip=s,o.wx()}})},forsubmit:function(t){var o=[],a={appId:"appId=EW_N3213842400",random:"random="+this.nums,merchantCode:"merchantCode=EW_N5247492162",outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5"};for(var r in console.log(a),a)o.push(a[r]);o.sort();var s="";for(var i in o)i==o.length-1?s+=o[i]:s+=o[i]+"&";var c=s+"&key=730ed24645b1a54e82a3d2bcff63db37";console.log(c);var l=n.default.hexMD5(c);console.log(l);var u={appId:"appId=EW_N3213842400",sign:"sign="+l,random:"random="+this.nums,merchantCode:"merchantCode=EW_N5247492162",outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5"};console.log(u);var d=[];for(var g in u)d.push(u[g]);d.sort();var h="";for(var p in d)p==d.length-1?h+=d[p]:h+=d[p]+"&";console.log("字符串",h),e.request({url:"https://api.liantuofu.com/open/precreate",data:h,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e.data)}})},xiaochengxu:function(t){this.index;var o=this,a=[],r={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var s in console.log(r),r)a.push(r[s]);a.sort();var i="";for(var c in a)c==a.length-1?i+=a[c]:i+=a[c]+"&";var l=i+"&key="+this.key;console.log(l);var u=n.default.hexMD5(l);console.log(u);var d={appId:"appId="+this.appid,sign:"sign="+u,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(d);var g=[];for(var h in d)g.push(d[h]);g.sort();var p="";for(var m in g)m==g.length-1?p+=g[m]:p+=g[m]+"&";console.log("字符串",p),e.request({url:"https://api.liantuofu.com/open/precreate",data:p,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),o.purchase[o.index].status="1",wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){wx.showModal({title:"微信支付",content:"支付成功",cancelText:"查看详情",confirmText:"立即赠送",success:function(t){t.confirm?(console.log("点击立即赠送"),o.zengsong()):t.cancel&&(console.log(o.cardbag_number),console.log("点击查看详情"),e.navigateTo({url:"../orderDetails/orderDetails?cardbag_number="+o.cardbag_number}))}})},fail:function(e){console.log(e)}})}})},top:function(e){var t=e.currentTarget.dataset.index;this.nav;this.nav=t},purchasedetails:function(t){var o=t.currentTarget.dataset.cardbag_number;a.default.buttonClick((function(t){e.navigateTo({url:"../orderDetails/orderDetails?cardbag_number="+o})}))},orderdetails:function(t){var o=t.currentTarget.dataset.cardbag_number,n=t.currentTarget.dataset.index,r={memberid_headimg:null!=this.order[n].present_member?this.order[n].present_member.head_img:"",memberid_name:null!=this.order[n].present_member?this.order[n].present_member.name:""};e.setStorageSync("member",r),a.default.buttonClick((function(t){e.navigateTo({url:"../ordeeDetails/ordeeDetails?cardbag_number="+o})}))},chaxun:function(t){var o=this,a=[],r={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};for(var s in console.log(r),r)a.push(r[s]);a.sort();var i="";for(var c in a)c==a.length-1?i+=a[c]:i+=a[c]+"&";var l=i+"&key="+this.key;console.log(l);var u=n.default.hexMD5(l);console.log(u);var d={appId:"appId="+this.appid,sign:"sign="+u,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};console.log(d);var g=[];for(var h in d)g.push(d[h]);g.sort();var p="";for(var m in g)m==g.length-1?p+=g[m]:p+=g[m]+"&";console.log("字符串",p),e.request({url:"https://api.liantuofu.com/open/pay/query",data:p,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log("订单状态",t.data),"订单已支付"==t.data.msg&&e.reLaunch({url:"../success/success?cardbag_number="+o.cardbag_number})}})},onPageScroll:function(e){e.scrollTop>3?this.fixed=1:e.scrollTop<3&&(this.fixed=0),0!=this.indexx&&1!=this.indexx||(this.showleft=!1,this.showright=!1),e.scrollTop>100||(this.scrolltop=e.scrollTop)},start:function(e){var t=e.touches[0].clientY;this.sy=t,console.log("开始触摸 sy : "+t+" scrolltop : "+this.scrolltop)},end:function(e){var t=this;this.removal>=50?setTimeout((function(){t.triggered=!1}),3e3):(this.removal=0,this.triggered=!1)},move:function(e){if(this.scrolltop<=0){var t=e.touches[0].clientY-this.sy;t>20&&(1==this.triggered||(this.onpull=40,this.removal=50,this.triggered=!0))}},onRefresh:function(){var t=this,o=[],a=[];if(1==this.showa){var n=this.memberid;this.pageIndex=1;var r=JSON.stringify({memberid:this.memberid,pageSize:this.pageSize,pageIndex:this.pageIndex}),s="get_cardbag_list";this.memberid=n,this.$utils.post(s,r).then((function(e){for(var n in console.log("订单列表",e),e.rs)0==e.rs[n].pay_type&&o.push(e.rs[n]),1==e.rs[n].pay_type&&e.rs[n].goodsinfo_all.length>0&&a.push(e.rs[n]);t.purchase=o,t.order=a}))}setTimeout((function(){e.stopPullDownRefresh()}),1e3)},onPulling:function(e){console.log("onpulling",e)},onRestore:function(){this.onpull=0,console.log("onRestore")},code:function(e){this.display=!1},subscribe:function(t){200==this.sta?e.requestSubscribeMessage({tmplIds:["wMP3q9gTNfqVg2QEshGiNyQXZcZFam2SjmlDpcartBc"],success:function(e){var t='{"memberid":"'+this.memberid+'"}',o="cancel_cardbag";this.$utils.post(o,t).then((function(e){console.log(e)}))}}):0==this.sta&&wx.showToast({title:"请先登录",icon:"none"})}}};t.default=i}).call(this,o("543d")["default"])},"410e":function(e,t,o){"use strict";var a=o("9f53"),n=o.n(a);n.a},4812:function(e,t,o){"use strict";var a;o.d(t,"b",(function(){return n})),o.d(t,"c",(function(){return r})),o.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,o=(e._self._c,e.__map(e.purchase,(function(t,o){var a=e.__get_orig(t),n=t.goodsinfo_all[0].head_img?e.$utils.imageUrl(t.goodsinfo_all[0].head_img):null,r=e.__map(t.goodsinfo_all,(function(t,o){var a=e.__get_orig(t),n=e.$utils.imageUrl(t.head_img);return{$orig:a,g1:n}}));return{$orig:a,g0:n,l0:r}}))),a=e.__map(e.order,(function(t,o){var a=e.__get_orig(t),n=t.goodsinfo_all[0].head_img?e.$utils.imageUrl(t.goodsinfo_all[0].head_img):null,r=e.__map(t.goodsinfo_all,(function(t,o){var a=e.__get_orig(t),n=e.$utils.imageUrl(t.head_img);return{$orig:a,g3:n}})),s=t.present_member.head_img&&t.present_member.name?e.$utils.imageUrl(t.present_member.head_img):null;return{$orig:a,g2:n,l2:r,g4:s}}));e.$mp.data=Object.assign({},{$root:{l1:o,l3:a}})},r=[]},"9dc4":function(e,t,o){"use strict";o.r(t);var a=o("4812"),n=o("b3e3");for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);o("410e");var s,i=o("f0c5"),c=Object(i["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=c.exports},"9f53":function(e,t,o){},b3e3:function(e,t,o){"use strict";o.r(t);var a=o("1450"),n=o.n(a);for(var r in a)"default"!==r&&function(e){o.d(t,e,(function(){return a[e]}))}(r);t["default"]=n.a},c366:function(e,t,o){"use strict";(function(e){o("aa93");a(o("66fd"));var t=a(o("9dc4"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])}},[["c366","common/runtime","common/vendor"]]]);