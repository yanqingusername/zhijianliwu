(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/balance/balance"],{"1e5c":function(e,t,n){"use strict";n.r(t);var a=n("4127"),o=n("d39f");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("d226");var i,s=n("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=c.exports},4127:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement;e._self._c},r=[]},8356:function(e,t,n){"use strict";(function(e){n("334b");a(n("66fd"));var t=a(n("1e5c"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},ccbc:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("1ae9")),o=(r(n("1c5d")),r(n("e2fe")));function r(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{ip:"",balance:[],number:0,appid:"",key:"",merchantCode:"",totalAmount:"",outTradeNo:"",notifyUrl:"",money:"0",balanc:"",id:"",timeStamp:"",nums:"",payMoney:"",inputmoney:""}},onLoad:function(t){var n=this;this.content();for(var a=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],o="",r=0;r<32;r++){var i=parseInt(61*Math.random());o+=a[i]}this.nums=o,this.timeStamp=(new Date).getTime();var s="{}",c="get_payconfig";this.$utils.post(c,s).then((function(t){console.log("第三方参数",t),n.appid=t.rs.appid,n.key=t.rs.key,n.merchantCode=t.rs.merchantCode,n.openid=e.getStorageSync("openid")})),this.login()},onShow:function(){},methods:{content:function(e){var t=this,n="{}",a="get_recharge_give";this.$utils.post(a,n).then((function(e){console.log(e.rs),t.balance=e.rs,t.id=e.rs[0].id,e.rs.length>0?t.payMoney=parseFloat(e.rs[0].recharge_money)-parseFloat(e.rs[0].give_money):t.payMoney=0}))},button:function(t){var n=this,a=e.getStorageSync("id"),r="微信支付";if(0==this.money)var i='{"memberid":"'+a+'","recharge_give_id":"'+this.id+'","recharge_way":"'+r+'"}';else i='{"memberid":"'+a+'","money":"'+this.money+'","recharge_way":"'+r+'"}';var s="create_member_recharge";this.$utils.post(s,i).then((function(t){console.log("在线充值",t),1==t.sta?(e.showLoading({title:"加载中",mask:!0}),n.totalAmount=t.money,n.outTradeNo=t.serial_number,n.notifyUrl=o.default.URL+"api.php/index/set_agent_recharge?serial_number="+t.serial_number,n.ipp()):e.showToast({title:t.msg,icon:"none"})}))},wx:function(t){var n=this,r=this,i=this.ip,s=this.openid,c='{"serial_number":"'+r.outTradeNo+'","ip":"'+i+'","openid":"'+s+'","type":"recharge"}',u="add_paylog_to_wx";console.log(c),this.$utils.post(u,c).then((function(t){console.log("获取参数",t);t.rs.serial_number;var i=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+n.timeStamp,nonceStr:"nonceStr="+n.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var c in console.log("拼接前",s),s)i.push(s[c]);i.sort();var u="";for(var l in i)l==i.length-1?u+=i[l]:u+=i[l]+"&";var d=u+"&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv";console.log("拼接后",d);var p=a.default.hexMD5(d);console.log(p),e.hideLoading(),e.requestPayment({timeStamp:String(n.timeStamp),nonceStr:n.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:p.toUpperCase(),success:function(t){e.hideLoading(),e.request({url:o.default.URL+"api.php/index/set_agent_recharge",data:{serial_number:r.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(t){console.log("微信成功回调",t),r.inputmoney="",setTimeout((function(){e.navigateTo({url:"./RechargeStatus?istype=2&ordernumber="+r.outTradeNo})}),500)}})},fail:function(t){e.hideLoading(),console.log(t),r.commodity="",r.inputmoney="",setTimeout((function(){e.navigateTo({url:"./RechargeStatus?istype=2&ordernumber="+r.outTradeNo})}),500)}})}))},ipp:function(t){var n=this;e.request({url:"https://pv.sohu.com/cityjson?ie=utf-8",success:function(e){console.log(e);var t=e.data.split(" "),a=t[4],o=a.replace('"',""),r=o.replace('"',""),i=r.replace(",","");n.ip=i,n.wx()}})},bala:function(e){var t=e.currentTarget.dataset.index-1;this.id=e.currentTarget.dataset.id,this.reMoney=e.currentTarget.dataset.remoney,this.gvMoney=e.currentTarget.dataset.gvmoney,this.payMoney=parseFloat(e.currentTarget.dataset.remoney)-parseFloat(e.currentTarget.dataset.gvmoney),this.number=t,this.money=0},price:function(e){this.number="1000",this.inputmoney=e.detail.value,this.money=e.detail.value,this.payMoney=e.detail.value},left:function(t){e.navigateTo({url:"./Query"})},right:function(t){e.navigateTo({url:"./Recharge"})},code:function(e){this.display=!1},xiaochengxu:function(t){var n=this,o=[],r={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var i in console.log(r),r)o.push(r[i]);o.sort();var s="";for(var c in o)c==o.length-1?s+=o[c]:s+=o[c]+"&";var u=s+"&key="+this.key;console.log(u);var l=a.default.hexMD5(u);console.log(l);var d={appId:"appId="+this.appid,sign:"sign="+l,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(d);var p=[];for(var h in d)p.push(d[h]);p.sort();var m="";for(var f in p)f==p.length-1?m+=p[f]:m+=p[f]+"&";console.log("字符串",m),e.request({url:"https://api.liantuofu.com/open/precreate",data:m,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){n.login(),wx.showModal({title:"微信支付",content:"支付成功",cancelText:"个人中心",confirmText:"再次充值",success:function(t){t.confirm?console.log("再次充值"):t.cancel&&(console.log("个人中心"),e.switchTab({url:"../personal/personal"}))}})},fail:function(e){console.log(e)}})}})},login:function(){var t=this,n=(this.Data,e.getStorageSync("openid")),a='{"wx_openid":"'+n+'"}',o="member_login";this.$utils.post(o,a).then((function(e){console.log("基本信息",e.rs),null==e.rs.balance||""==e.rs.balance||(t.balanc=e.rs.balance)}))}}};t.default=i}).call(this,n("543d")["default"])},d226:function(e,t,n){"use strict";var a=n("d50c"),o=n.n(a);o.a},d39f:function(e,t,n){"use strict";n.r(t);var a=n("ccbc"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=o.a},d50c:function(e,t,n){}},[["8356","common/runtime","common/vendor"]]]);