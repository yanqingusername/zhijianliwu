(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/balance/Recharge"],{"165d":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"244c":function(e,t,n){"use strict";var a=n("82ea"),o=n.n(a);o.a},3661:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("1ae9")),o=(r(n("1c5d")),r(n("e2fe"))),i=r(n("da8a"));function r(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{ip:"",balance:[{price:"100",give:"5元"},{price:"200",give:"15元"},{price:"300",give:"20元"},{price:"500",give:"50元"},{price:"1000",give:"120元"},{price:"2000",give:"300元"}],number:0,appid:"",key:"",merchantCode:"",totalAmount:"",outTradeNo:"",notifyUrl:"",money:"0",balanc:"",id:"",timeStamp:"",nums:"",value:"",checknum:0,payMoney:"",inputmoney:"",inputprice:""}},onLoad:function(t){var n=this;this.content();for(var a=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],o="",i=0;i<32;i++){var r=parseInt(61*Math.random());o+=a[r]}this.nums=o,this.timeStamp=(new Date).getTime();var s="{}",c="get_payconfig";this.$utils.post(c,s).then((function(t){console.log("第三方参数",t),n.appid=t.rs.appid,n.key=t.rs.key,n.merchantCode=t.rs.merchantCode,n.openid=e.getStorageSync("openid")})),this.login()},onShow:function(){},methods:{content:function(e){var t=this,n="{}",a="get_recharge_give";this.$utils.post(a,n).then((function(e){console.log(e.rs),t.balance=e.rs,t.id=e.rs[0].id,e.rs.length>0?t.payMoney=e.rs[0].give_money:t.payMoney=0}))},button:function(t){var n=this;i.default.trackEvent("Um_Event_Recharge",{Um_Key_ItemName:"余额充值"});var a=e.getStorageSync("id"),r="微信支付";if(0==this.money)var s='{"memberid":"'+a+'","recharge_give_id":"'+this.id+'","recharge_way":"'+r+'"}';else s='{"memberid":"'+a+'","money":"'+this.money+'","recharge_way":"'+r+'"}';var c="create_member_recharge";this.$utils.post(c,s).then((function(t){console.log("在线充值",t),1==t.sta?(e.showLoading({title:"加载中",mask:!0}),n.totalAmount=t.money,n.outTradeNo=t.serial_number,n.notifyUrl=o.default.URL+"api.php/index/set_agent_recharge?serial_number="+t.serial_number,n.ipp()):e.showToast({title:t.msg,icon:"none"})}))},wx:function(t){var n=this,i=this,r=this.ip,s=this.openid,c='{"serial_number":"'+i.outTradeNo+'","ip":"'+r+'","openid":"'+s+'","type":"recharge"}',u="add_paylog_to_wx";console.log(c),this.$utils.post(u,c).then((function(t){console.log("获取参数",t);var r=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+n.timeStamp,nonceStr:"nonceStr="+n.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var c in console.log("拼接前",s),s)r.push(s[c]);r.sort();var u="";for(var l in r)l==r.length-1?u+=r[l]:u+=r[l]+"&";var d=u+"&key=45579fcdb646746f02d9e041d50975b4";console.log("拼接后",d);var p=a.default.hexMD5(d);console.log(p),e.hideLoading(),e.requestPayment({timeStamp:String(n.timeStamp),nonceStr:n.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:p.toUpperCase(),success:function(t){e.hideLoading(),e.request({url:o.default.URL+"api.php/index/set_agent_recharge",data:{serial_number:i.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(t){console.log("微信成功回调",t),i.inputmoney="",setTimeout((function(){e.navigateTo({url:"./RechargeStatus?istype=2&ordernumber="+i.outTradeNo})}),500)}})},fail:function(t){e.hideLoading(),console.log(t),i.commodity="",i.inputmoney="",setTimeout((function(){e.navigateTo({url:"./RechargeStatus?istype=2&ordernumber="+i.outTradeNo})}),500)}})}))},ipp:function(t){var n=this;e.request({url:"https://pv.sohu.com/cityjson?ie=utf-8",success:function(e){console.log(e);var t=e.data.split(" "),a=t[4],o=a.replace('"',""),i=o.replace('"',""),r=i.replace(",","");n.ip=r,n.wx()}})},bala:function(e){var t=e.currentTarget.dataset.index-1;this.id=e.currentTarget.dataset.id,this.reMoney=e.currentTarget.dataset.remoney,this.gvMoney=e.currentTarget.dataset.gvmoney,this.payMoney=e.currentTarget.dataset.gvmoney,this.number=t,this.money=0,this.inputmoney=""},price:function(e){this.number="1000",this.money=e.detail.value,this.inputmoney=e.detail.value,this.payMoney=e.detail.value},left:function(t){e.navigateTo({url:"./Query"})},right:function(t){e.navigateTo({url:"./Recharge"})},code:function(e){this.display=!1},xiaochengxu:function(t){var n=this,o=[],i={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var r in console.log(i),i)o.push(i[r]);o.sort();var s="";for(var c in o)c==o.length-1?s+=o[c]:s+=o[c]+"&";var u=s+"&key="+this.key;console.log(u);var l=a.default.hexMD5(u);console.log(l);var d={appId:"appId="+this.appid,sign:"sign="+l,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(d);var p=[];for(var h in d)p.push(d[h]);p.sort();var m="";for(var g in p)g==p.length-1?m+=p[g]:m+=p[g]+"&";console.log("字符串",m),e.request({url:"https://api.liantuofu.com/open/precreate",data:m,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){n.login(),wx.showModal({title:"微信支付",content:"支付成功",cancelText:"个人中心",confirmText:"再次充值",success:function(t){t.confirm?console.log("再次充值"):t.cancel&&(console.log("个人中心"),e.switchTab({url:"../personal/personal"}))}})},fail:function(e){console.log(e)}})}})},login:function(){var t=this,n=(this.Data,e.getStorageSync("openid")),a='{"wx_openid":"'+n+'"}',o="member_login";this.$utils.post(o,a).then((function(e){console.log("基本信息",e.rs),null==e.rs.balance||""==e.rs.balance||(t.balanc=e.rs.balance)}))},input:function(e){this.value=e.detail.value,this.inputprice=e.detail.value},rechargebutton:function(t){var n=this,a=e.getStorageSync("id");if(""==a)return e.showToast({title:"请先登录！",icon:"none"}),!1;var o=this.value;if(""==o)return e.showToast({title:"请输入礼品卡背面的兑换码！",icon:"none"}),!1;i.default.trackEvent("Um_Event_ExchangeRecharge",{Um_Key_ItemName:"兑换充值"});var r="order",s="bind_client_card",c=JSON.stringify({memberid:a,cardpwd:o});this.$utils.postNew(s,c,r).then((function(t){if(console.log(t),1==t.sta){n.inputprice="",n.value="";var a=t.rs;setTimeout((function(){e.navigateTo({url:"./RechargeStatus?istype=1&ordernumber="+a})}),500)}else n.inputprice="",n.value="",e.showToast({title:t.msg,icon:"none",mask:"true"})}))},nav:function(e){var t=e.currentTarget.dataset.index;this.checknum=t}}};t.default=s}).call(this,n("543d")["default"])},"7eec":function(e,t,n){"use strict";n.r(t);var a=n("165d"),o=n("b71a");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("244c");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=c.exports},"82ea":function(e,t,n){},b71a:function(e,t,n){"use strict";n.r(t);var a=n("3661"),o=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},f951:function(e,t,n){"use strict";(function(e){n("334b");a(n("66fd"));var t=a(n("7eec"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["f951","common/runtime","common/vendor"]]]);