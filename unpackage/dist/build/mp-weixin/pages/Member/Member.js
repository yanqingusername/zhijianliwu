(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Member/Member"],{"3fac":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("1ae9"));a(n("1c5d"));function a(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{ip:"",level:"",head_img:"",name:"",ordinary:[],finger:[],plus:[],enterprise:[],content:"",display:!1,current:"",list:[],no:"",timeStamp:"",nums:"",outTradeNo:"",typestring:"1"}},onLoad:function(t){var n=this;this.typestring=t.typestring,1==this.typestring?e.setNavigationBarTitle({title:"会员详情"}):e.setNavigationBarTitle({title:"企业会员"}),this.no=e.getStorageSync("NO"),this.level=e.getStorageSync("level"),this.head_img=e.getStorageSync("head_img"),this.name=e.getStorageSync("name"),e.getStorageSync("level")>3?this.current=2:(console.log("小于3"),this.current=e.getStorageSync("level")-1),console.log(this.current);var o=this;this.level=e.getStorageSync("level"),this.head_img=e.getStorageSync("head_img"),this.name=e.getStorageSync("name");var a="{}",r="get_level_card";this.$utils.post(r,a).then((function(e){for(var t in console.log(e),e.rs){var a=e.rs[t].money.toString().replace(/\d+\.(\d*)/,"$1");"00"==a&&(e.rs[t].money=parseInt(e.rs[t].money)),1==e.rs[t].level?e.rs[t].level_name="普通会员":2==e.rs[t].level?e.rs[t].level_name="指间会员":3==e.rs[t].level?e.rs[t].level_name="plus会员":4==e.rs[t].level?e.rs[t].level_name="企业会员":5==e.rs[t].level&&(e.rs[t].level_name="合作伙伴")}n.list=e.rs,n.ordinary=e.rs[0],o.finger=e.rs[0],o.plus=e.rs[1],o.enterprise=e.rs[2]}));for(var i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],s="",l=0;l<32;l++){var c=parseInt(61*Math.random());s+=i[c]}this.nums=s,this.timeStamp=(new Date).getTime();a="{}",r="get_payconfig";this.$utils.post(r,a).then((function(t){console.log("第三方参数",t),n.appid=t.rs.appid,n.key=t.rs.key,n.merchantCode=t.rs.merchantCode,n.openid=e.getStorageSync("openid")}))},onShow:function(){this.outTradeNo},methods:{code:function(e){this.display=!1},button:function(t){var n=this,o=t.currentTarget.dataset.level_card_id,a=e.getStorageSync("id"),r="微信",i='{"memberid":"'+a+'","level_card_id":"'+o+'","recharge_way":"'+r+'"}';console.log(i);var s="buy_level_card";this.$utils.post(s,i).then((function(t){console.log("会员充值",t),1==t.sta?(e.showLoading({title:"加载中",mask:!0}),n.totalAmount=t.money,n.outTradeNo=t.serial_number,n.notifyUrl="http://zhijianlw.com/api.php/index/set_agent_level_up?serial_number="+t.serial_number,n.ipp()):e.showToast({title:t.msg,icon:"none"})}))},wx:function(t){var n=this,a=this,r=this.ip,i=this.openid,s='{"serial_number":"'+a.outTradeNo+'","ip":"'+r+'","openid":"'+i+'","type":"member"}',l="add_paylog_to_wx";console.log(s),this.$utils.post(l,s).then((function(t){console.log("获取参数",t);t.rs.serial_number;var r=[],i={appId:"appId=wx9c53a99b078435f5",timeStamp:"timeStamp="+n.timeStamp,nonceStr:"nonceStr="+n.nums,package:"package=prepay_id="+t.rs.prepay_id,signType:"signType=MD5"};for(var s in console.log("拼接前",i),i)r.push(i[s]);r.sort();var l="";for(var c in r)c==r.length-1?l+=r[c]:l+=r[c]+"&";var u=l+"&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv";console.log("拼接后",u);var d=o.default.hexMD5(u);console.log(d),e.hideLoading(),e.requestPayment({timeStamp:String(n.timeStamp),nonceStr:n.nums,package:"prepay_id="+t.rs.prepay_id,signType:"MD5",paySign:d.toUpperCase(),success:function(t){e.hideLoading(),console.log(t),e.request({url:"https://zhijianlw.com/api.php/index/set_agent_level_up",data:{serial_number:a.outTradeNo},header:{"content-type":"application/x-www-form-urlencoded"},method:"GET",success:function(e){console.log("微信成功回调",e)}}),e.showModal({title:"微信支付",content:"支付成功",cancelText:"首页",confirmText:"个人中心",success:function(t){t.confirm?(console.log("个人中心"),e.switchTab({url:"../personal/personal"})):t.cancel&&(console.log("首页"),e.switchTab({url:"../index/index"}))}})},fail:function(t){e.hideLoading(),console.log(t),e.showToast({title:"支付失败",icon:"none"}),a.commodity=""}})}))},ipp:function(t){var n=this;e.request({url:"https://pv.sohu.com/cityjson?ie=utf-8",success:function(e){console.log(e);var t=e.data.split(" "),o=t[4],a=o.replace('"',""),r=a.replace('"',""),i=r.replace(",","");n.ip=i,n.wx()}})},xiaochengxu:function(t){var n=[],a={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var r in console.log(a),a)n.push(a[r]);n.sort();var i="";for(var s in n)s==n.length-1?i+=n[s]:i+=n[s]+"&";var l=i+"&key="+this.key;console.log(l);var c=o.default.hexMD5(l);console.log(c);var u={appId:"appId="+this.appid,sign:"sign="+c,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(u);var d=[];for(var p in u)d.push(u[p]);d.sort();var h="";for(var g in d)g==d.length-1?h+=d[g]:h+=d[g]+"&";console.log("字符串",h),e.request({url:"https://api.liantuofu.com/open/precreate",data:h,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){e.switchTab({url:"../personal/personal"})},fail:function(e){console.log(e)}})}})},chaxun:function(t){var n=[],a={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};for(var r in console.log(a),a)n.push(a[r]);n.sort();var i="";for(var s in n)s==n.length-1?i+=n[s]:i+=n[s]+"&";var l=i+"&key="+this.key;console.log(l);var c=o.default.hexMD5(l);console.log(c);var u={appId:"appId="+this.appid,sign:"sign="+c,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo};console.log(u);var d=[];for(var p in u)d.push(u[p]);d.sort();var h="";for(var g in d)g==d.length-1?h+=d[g]:h+=d[g]+"&";console.log("字符串",h),e.request({url:"https://api.liantuofu.com/open/pay/query",data:h,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log("订单状态",t.data),"订单已支付"==t.data.msg&&wx.showToast({title:"开通成功",icon:"success",success:function(t){e.setTimeout((function(t){e.reLaunch({url:"../personal/personal"})}),1500)}})}})},deta:function(t){e.navigateBack({delta:1})},apply:function(t){e.navigateTo({url:"../Apply/Apply"})}}};t.default=r}).call(this,n("543d")["default"])},"76a2":function(e,t,n){},"7ff8":function(e,t,n){"use strict";var o=n("76a2"),a=n.n(o);a.a},9850:function(e,t,n){"use strict";n.r(t);var o=n("bc1d"),a=n("9a19");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("7ff8");var i,s=n("f0c5"),l=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=l.exports},"9a19":function(e,t,n){"use strict";n.r(t);var o=n("3fac"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},b628:function(e,t,n){"use strict";(function(e){n("334b");o(n("66fd"));var t=o(n("9850"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},bc1d:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,n=(e._self._c,1==e.typestring?e.$utils.imageUrl(e.head_img):null),o=2==e.typestring?e.$utils.imageUrl(e.head_img):null;e.$mp.data=Object.assign({},{$root:{g0:n,g1:o}})},r=[]}},[["b628","common/runtime","common/vendor"]]]);