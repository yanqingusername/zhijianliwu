(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/balance/balance"],{"1e5c":function(e,t,n){"use strict";n.r(t);var o=n("802b"),a=n("d39f");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("d226");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=c.exports},"802b":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]},8356:function(e,t,n){"use strict";(function(e){n("334b");o(n("66fd"));var t=o(n("1e5c"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},ccbc:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("1ae9")),a=(i(n("1c5d")),i(n("e2fe")));function i(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{ip:"",balance:[],number:0,appid:"",key:"",merchantCode:"",totalAmount:"",outTradeNo:"",notifyUrl:"",money:"0",balanc:"",id:"",timeStamp:"",nums:"",payMoney:"",inputmoney:""}},onLoad:function(t){var n=this;this.content();for(var o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],a="",i=0;i<32;i++){var r=parseInt(61*Math.random());a+=o[r]}this.nums=a,this.timeStamp=(new Date).getTime();var s="{}",c="get_payconfig";this.$utils.post(c,s).then((function(t){console.log("第三方参数",t),n.appid=t.rs.appid,n.key=t.rs.key,n.merchantCode=t.rs.merchantCode,n.openid=e.getStorageSync("openid")})),this.login()},onShow:function(){},methods:{content:function(e){var t=this,n="{}",o="get_recharge_give";this.$utils.post(o,n).then((function(e){console.log(e.rs),t.balance=e.rs,t.id=e.rs[0].id,e.rs.length>0?t.payMoney=e.rs[0].give_money:t.payMoney=0}))},button:function(t){var n=this,o=e.getStorageSync("id"),i="微信支付";if(0==this.money)var r='{"memberid":"'+o+'","recharge_give_id":"'+this.id+'","recharge_way":"'+i+'"}';else r='{"memberid":"'+o+'","money":"'+this.money+'","recharge_way":"'+i+'"}';var s="create_member_recharge";this.$utils.post(s,r).then((function(t){console.log("在线充值",t),1==t.sta?(e.showLoading({title:"加载中",mask:!0}),n.totalAmount=t.money,n.outTradeNo=t.serial_number,n.notifyUrl=a.default.URL+"api.php/index/set_agent_recharge?serial_number="+t.serial_number,n.ipp()):e.showToast({title:t.msg,icon:"none"})}))},wx:function(t){var n=this,i=this,r=this.ip,s=this.openid,c='{"serial_number":"'+i.outTradeNo+'","ip":"'+r+'","openid":"'+s+'","type":"recharge"}',u="add_paylog_to_wx";console.log(c),this.$utils.post(u,c).then((function(t){console.log("获取参数",t);var r=[],s={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+n.timeStamp,nonceStr:"nonceStr="+n.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var c in console.log("拼接前",s),s)r.push(s[c]);r.sort();var u="";for(var l in r)l==r.length-1?u+=r[l]:u+=r[l]+"&";var d=u+"&key=45579fcdb646746f02d9e041d50975b4";console.log("拼接后",d);var p=o.default.hexMD5(d);console.log(p),e.hideLoading(),e.requestPayment({timeStamp:String(n.timeStamp),nonceStr:n.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:p.toUpperCase(),success:function(t){e.hideLoading(),e.request({url:a.default.URL+"api.php/index/set_agent_recharge",data:{serial_number:i.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(t){console.log("微信成功回调",t),i.inputmoney="",setTimeout((function(){e.redirectTo({url:"./RechargeStatus?istype=2&ordernumber="+i.outTradeNo})}),500)}})},fail:function(t){e.hideLoading(),console.log(t),i.commodity="",i.inputmoney="",setTimeout((function(){e.redirectTo({url:"./RechargeStatus?istype=2&ordernumber="+i.outTradeNo})}),500)}})}))},ipp:function(t){var n=this;e.request({url:"https://pv.sohu.com/cityjson?ie=utf-8",success:function(e){console.log(e);var t=e.data.split(" "),o=t[4],a=o.replace('"',""),i=a.replace('"',""),r=i.replace(",","");n.ip=r,n.wx()}})},bala:function(e){var t=e.currentTarget.dataset.index-1;this.id=e.currentTarget.dataset.id,this.reMoney=e.currentTarget.dataset.remoney,this.gvMoney=e.currentTarget.dataset.gvmoney,this.payMoney=e.currentTarget.dataset.gvmoney,this.number=t,this.money=0,this.inputmoney=""},price:function(e){this.number="1000",this.inputmoney=e.detail.value,this.money=e.detail.value,this.payMoney=e.detail.value},left:function(t){e.navigateTo({url:"./Query"})},right:function(t){e.redirectTo({url:"./Recharge"})},code:function(e){this.display=!1},xiaochengxu:function(t){var n=this,a=[],i={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var r in console.log(i),i)a.push(i[r]);a.sort();var s="";for(var c in a)c==a.length-1?s+=a[c]:s+=a[c]+"&";var u=s+"&key="+this.key;console.log(u);var l=o.default.hexMD5(u);console.log(l);var d={appId:"appId="+this.appid,sign:"sign="+l,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(d);var p=[];for(var h in d)p.push(d[h]);p.sort();var m="";for(var f in p)f==p.length-1?m+=p[f]:m+=p[f]+"&";console.log("字符串",m),e.request({url:"https://api.liantuofu.com/open/precreate",data:m,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){n.login(),wx.showModal({title:"微信支付",content:"支付成功",cancelText:"个人中心",confirmText:"再次充值",success:function(t){t.confirm?console.log("再次充值"):t.cancel&&(console.log("个人中心"),e.switchTab({url:"../personal/personal"}))}})},fail:function(e){console.log(e)}})}})},login:function(){var t=this,n=(this.Data,e.getStorageSync("openid")),o='{"wx_openid":"'+n+'"}',a="member_login";this.$utils.post(a,o).then((function(e){console.log("基本信息",e.rs),null==e.rs.balance||""==e.rs.balance||(t.balanc=e.rs.balance)}))}}};t.default=r}).call(this,n("543d")["default"])},d226:function(e,t,n){"use strict";var o=n("d50c"),a=n.n(o);a.a},d39f:function(e,t,n){"use strict";n.r(t);var o=n("ccbc"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},d50c:function(e,t,n){}},[["8356","common/runtime","common/vendor"]]]);