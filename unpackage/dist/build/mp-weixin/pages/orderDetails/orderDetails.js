(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderDetails/orderDetails"],{"0489":function(e,t,o){"use strict";o.r(t);var a=o("5f5e"),r=o("2fac");for(var n in r)"default"!==n&&function(e){o.d(t,e,(function(){return r[e]}))}(n);o("c820");var i,s=o("f0c5"),c=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=c.exports},"2c25":function(e,t,o){"use strict";(function(e){o("334b");a(o("66fd"));var t=a(o("0489"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},"2fac":function(e,t,o){"use strict";o.r(t);var a=o("c4c4"),r=o.n(a);for(var n in a)"default"!==n&&function(e){o.d(t,e,(function(){return a[e]}))}(n);t["default"]=r.a},"5f5e":function(e,t,o){"use strict";var a;o.d(t,"b",(function(){return r})),o.d(t,"c",(function(){return n})),o.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement,o=(e._self._c,e.title_length>1?e.__map(e.title,(function(t,o){var a=e.__get_orig(t),r=t.goodsinfo[0].head_img?e.$utils.imageUrl(t.goodsinfo[0].head_img):null;return{$orig:a,g0:r}})):null),a=1==e.orderinfo.show?e.$utils.imageUrl(e.cardbag.present_memberid_headimg):null,r=1==e.orderinfo.show?e.__map(e.listt,(function(t,o){var a=e.__get_orig(t),r=t.head_img?e.$utils.imageUrl(t.head_img):null;return{$orig:a,g2:r}})):null,n=1!=e.orderinfo.show?e.__map(e.listt,(function(t,o){var a=e.__get_orig(t),r=e.title_length>1&&t.head_img?e.$utils.imageUrl(t.head_img):null;return{$orig:a,g3:r}})):null,i=1!=e.orderinfo.show?e.__map(e.list,(function(t,o){var a=e.__get_orig(t),r=e.title_length<=1&&t.head_img?e.$utils.imageUrl(t.head_img):null;return{$orig:a,g4:r}})):null,s=1!=e.orderinfo.show&&e.status>1?e.__map(e.partake,(function(t,o){var a=e.__get_orig(t),r=e.$utils.imageUrl(t.head_img);return{$orig:a,g5:r}})):null,c=1==e.orderinfo.show||0!=e.status&&1!=e.status&&3!=e.status||0==e.cardbag_theme.zhufu_type||1==e.cardbag_theme.zhufu_type||2!=e.cardbag_theme.zhufu_type?null:e.$utils.imageUrl(e.cardbag_theme.zhufu_mp4);e.$mp.data=Object.assign({},{$root:{l0:o,g1:a,l1:r,l2:n,l3:i,l4:s,g6:c}})},n=[]},7812:function(e,t,o){},c4c4:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(o("e10e"));var a=r(o("1ae9"));r(o("1c5d"));function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}e.getRecorderManager();var i=e.createInnerAudioContext(),s=(e.createAudioContext(""),{data:function(){var e;return e={partake:[],list:[]},n(e,"partake",[]),n(e,"right",0),n(e,"cardbag",""),n(e,"cardbag_in_people",""),n(e,"level_name",""),n(e,"price_discount",""),n(e,"status",""),n(e,"type",""),n(e,"pay_type",""),n(e,"piece",""),n(e,"alt",""),n(e,"cardbag_theme",""),n(e,"cardbag_number",""),n(e,"schedule","0"),n(e,"movable_x","0"),n(e,"distance","0"),n(e,"duration",""),n(e,"stop","1"),n(e,"width",""),n(e,"click",0),n(e,"w",""),n(e,"orderinfo",""),n(e,"listt",[]),n(e,"timese","无法更改"),n(e,"choose",!0),n(e,"ordernumber",""),n(e,"Interval",""),n(e,"showa",""),n(e,"add_time",""),n(e,"title_length","0"),n(e,"title",""),n(e,"navv","0"),n(e,"paylog",{paycoupon:""}),n(e,"memberid",""),e},onHide:function(e){clearInterval(this.Interval)},onLoad:function(t){var o=this,a=this;setTimeout((function(e){a.showa=1}),200),clearInterval(this.Interval),console.log(t);var r=e.getStorageSync("id");this.memberid=r,e.getSystemInfo({success:function(e){o.width=e.screenWidth,o.w=.57*e.screenWidth}});var n=[],i=[];this.level_name=e.getStorageSync("level_name");t.cardbag_number;this.cardbag_number=t.cardbag_number;var s='{"cardbag_number":"'+this.cardbag_number+'","cardbag_detail_id":"0"}';console.log(s);var c="get_cardbag_detail";this.$utils.post(c,s).then((function(e){console.log("订单详情",e),o.paylog=e.paylog;var a=new Date(1e3*parseInt(e.cardbag.create_time)),s=a.getFullYear(),c=a.getMonth()+1,d=a.getDate(),l=a.getHours(),u=a.getMinutes(),g=a.getSeconds(),h=new Date;Date.parse(h.toDateString());e.cardbag.create_time=s+"-"+c+"-"+d+" "+l+":"+u+":"+g;a=new Date(1e3*parseInt(e.cardbag.exchange_time)),s=a.getFullYear(),c=a.getMonth()+1,d=a.getDate(),l=a.getHours(),u=a.getMinutes(),g=a.getSeconds(),h=new Date,Date.parse(h.toDateString());e.cardbag.exchange_time=s+"-"+c+"-"+d+" "+l+":"+u+":"+g;var m=e.cardbag.all_details_num,_=e.goods_list.length;if(1==e.cardbag.type||2==e.cardbag.type){for(var b=0;b<_/m;b++)n.push(e.goods_list[b]);e.goods_list=n,o.piece=n.length}var f='{"cardbag_number":"'+t.cardbag_number+'"}';console.log("份数",f);var p="get_cardbag_fenshu";o.$utils.post(p,f).then((function(t){if(console.log("礼包子份数",t.rs),t.rs&&t.rs.length>0){for(var a in t.rs)t.rs[a].index=Number(a)+1;for(var n in o.title_length=t.rs.length,t.rs)t.rs[n].goodsid&&i.push(t.rs[n]);o.title=i;var s='{"cardbag_number":"'+o.cardbag_number+'","cardbag_detail_id":"'+t.rs[0].id+'"}';console.log(s);var c="get_cardbag_detail";o.$utils.post(c,s).then((function(t){console.log("子礼包详情",t),e.goods_list[0].cardbag_number=o.cardbag_number,o.listt=t.goods_list,t.orderinfo&&(o.ordernumber=t.orderinfo.ordernumber,t.orderinfo.cardbag_number=o.cardbag_number,t.orderinfo.memberid!=r&&t.orderinfo.memberid,t.orderinfo.memberid==t.cardbag.pay_memberid?t.orderinfo.show=1:t.orderinfo.show=0,o.orderinfo=t.orderinfo,console.log(t.orderinfo.status),e.goods_list[0].status=t.orderinfo.status,o.add_time=t.orderinfo.add_time,o.down())}))}})),o.list=e.goods_list,o.status=e.cardbag.status,o.type=e.cardbag.type,o.cardbag=e.cardbag;var v=e.cardbag.all_details_num-e.cardbag.receive_details_num;o.alt=e.cardbag.all_details_num+"份礼物/已被领取"+e.cardbag.receive_details_num+"份/还有"+v+"份待领取",o.partake=e.cardbag_in_people,o.cardbag_theme=e.cardbag_theme,o.pay_type=e.cardbag.pay_type}));var d="",l="get_payconfig";this.$utils.post(l,d).then((function(t){console.log("第三方参数",t),o.appid=t.rs.appid,o.key=t.rs.key,o.merchantCode=t.rs.merchantCode,o.openid=e.getStorageSync("openid")}))},onShow:function(){var e=this;if(1==this.showa){console.log("????????????????/");var t=[],o=this.cardbag_number;console.log("刷新");var a='{"cardbag_number":"'+o+'","cardbag_detail_id":"0"}',r="get_cardbag_detail";this.$utils.post(r,a).then((function(o){console.log("订单详情",o);var a=new Date(1e3*parseInt(o.cardbag.create_time)),r=a.getFullYear(),n=a.getMonth()+1,i=a.getDate(),s=a.getHours(),c=a.getMinutes(),d=a.getSeconds(),l=new Date;Date.parse(l.toDateString());o.cardbag.create_time=r+"-"+n+"-"+i+" "+s+":"+c+":"+d;a=new Date(1e3*parseInt(o.cardbag.exchange_time)),r=a.getFullYear(),n=a.getMonth()+1,i=a.getDate(),s=a.getHours(),c=a.getMinutes(),d=a.getSeconds(),l=new Date,Date.parse(l.toDateString());o.cardbag.exchange_time=r+"-"+n+"-"+i+" "+s+":"+c+":"+d;var u=o.cardbag.all_details_num,g=o.goods_list.length;if(1==o.cardbag.type||2==o.cardbag.type){for(var h=0;h<g/u;h++)t.push(o.goods_list[h]);o.goods_list=t,e.piece=t.length}var m='{"cardbag_number":"'+e.cardbag_number+'"}',_="get_cardbag_fenshu";e.$utils.post(_,m).then((function(t){if(console.log("礼包子份数",t.rs),t.rs.length>0){var a='{"cardbag_number":"'+e.cardbag_number+'","cardbag_detail_id":"'+t.rs[e.navv].id+'"}';console.log(a);var r="get_cardbag_detail";e.$utils.post(r,a).then((function(t){console.log("子礼包详情",t),o.goods_list[0].cardbag_number=e.cardbag_number,e.listt=t.goods_list,t.orderinfo&&(e.ordernumber=t.orderinfo.ordernumber,t.orderinfo.cardbag_number=e.cardbag_number,t.orderinfo.memberid!=e.memberid&&t.orderinfo.memberid,t.orderinfo.memberid==t.cardbag.pay_memberid?t.orderinfo.show=1:t.orderinfo.show=0,e.orderinfo=t.orderinfo,console.log(t.orderinfo.status),o.goods_list[0].status=t.orderinfo.status,e.add_time=t.orderinfo.add_time,e.down())}))}})),e.list=o.goods_list,e.status=o.cardbag.status,e.type=o.cardbag.type,e.cardbag=o.cardbag;var b=o.cardbag.all_details_num-o.cardbag.receive_details_num;e.alt=o.cardbag.all_details_num+"份礼物/已被领取"+o.cardbag.receive_details_num+"份/还有"+b+"份待领取",e.partake=o.cardbag_in_people,e.cardbag_theme=o.cardbag_theme,e.pay_type=o.cardbag.pay_type}))}},methods:{choo:function(e){var t=this;this.navv=e.currentTarget.dataset.index,this.cardbag_detail_id=e.currentTarget.dataset.id,this.clear();var o='{"cardbag_number":"'+this.cardbag_number+'","cardbag_detail_id":"'+e.currentTarget.dataset.id+'"}';console.log(o);var a="get_cardbag_detail";this.$utils.post(a,o).then((function(e){console.log("子礼包详情",e),t.list[0].cardbag_number=t.cardbag_number,t.listt=e.goods_list,e.orderinfo.memberid==e.cardbag.pay_memberid?e.orderinfo.show=1:e.orderinfo.show=0,t.orderinfo=e.orderinfo,e.orderinfo&&(t.ordernumber=e.orderinfo.ordernumber,e.orderinfo.cardbag_number=t.cardbag_number,e.orderinfo.memberid!=t.memberid&&e.orderinfo.memberid,e.orderinfo.memberid==e.cardbag.pay_memberid?e.orderinfo.show=1:e.orderinfo.show=0,t.orderinfo=e.orderinfo,console.log(e.orderinfo.status),t.list[0].status=e.orderinfo.status,t.add_time=e.orderinfo.add_time,t.down())}))},details:function(t){var o=t.currentTarget.dataset.index;e.navigateTo({url:"/pages/details/details?keynum="+o})},ctrlc:function(t){var o=t.currentTarget.dataset.index;e.setClipboardData({data:o,success:function(){e.showToast({title:"复制成功"})}})},logistics:function(t){var o=t.currentTarget.dataset.cardbag_number;e.navigateTo({url:"../logistics/logistics?cardbag_number="+o})},again:function(t){e.setStorageSync("cardbag_theme",this.cardbag_theme),e.navigateTo({url:"../template/template?edit=on"})},give:function(t){var o=t.currentTarget.dataset.cardbag_number,a=t.currentTarget.dataset.price,r=(this.status,'{"cardbag_number":"'+o+'"}'),n="share_cardbag";console.log(r),this.$utils.post(n,r).then((function(t){console.log("赠送好友",t),1==t.sta&&e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+o+"&price="+a})}),1500)}})}))},givee:function(t){var o=this,a='{"cardbag_number":"'+this.cardbag_number+'","zhufu_theme_id":"'+this.cardbag_theme.id+'","memberid":"'+this.cardbag_theme.memberid+'"}';console.log(a);var r="save_shoudao_zhufu_theme";this.$utils.post(r,a).then((function(a){if(console.log(a),1==a.sta){var r=t.currentTarget.dataset.cardbag_number,n=t.currentTarget.dataset.price,i=(o.status,'{"cardbag_number":"'+r+'"}'),s="share_cardbag";console.log(i),o.$utils.post(s,i).then((function(t){console.log("赠送好友",t),1==t.sta&&e.showToast({title:t.msg,icon:"success",mask:!0,success:function(t){setTimeout((function(t){e.navigateTo({url:"../success/success?cardbag_number="+r+"&price="+n})}),1500)}})}))}}))},address:function(t){var o=t.currentTarget.dataset.cardbag_number;e.navigateTo({url:"../ordeDetails/ordeDetails?cardbag_number="+o})},copy:function(e){var t=0,o=this.cardbag,a=this.list,r=o.type,n=o.all_details_num;for(var i in 4==r&&(n=n/a.length-1),a)t++,this.sleep(100,a[i].id,a[i].goodsnum,n,r,t,a.length)},sleep:function(t,o,a,r,n,i,s){var c=e.getStorageSync("id"),d=new Date,l=d.getTime()+t;while(1)if(d=new Date,d.getTime()>l){var u='{"memberid":"'+c+'","goodsid":"'+o+'","goodsnum":"'+a+'"}',g="add_goods_to_giftbag";return void this.$utils.post(g,u).then((function(t){console.log("添加购物车",t),i==s&&e.navigateTo({url:"../shopping/shop?fenshu="+r+"&type="+n})}))}},num:function(e){var t=this,o=this.countdown.split(":");this.Interval=setInterval((function(e){o[1]--,-1==o[1]&&(0!=o[0]?(o[1]=59,o[0]--):(o[1]=0,o[0]=0,t.choose=!1,t.clear()));var a=o[0],r=o[1];o[0]<10&&(a="0"+o[0]),o[1]<10&&(r="0"+o[1]),t.timese=a+":"+r}),1e3)},clear:function(e){clearInterval(this.Interval)},down:function(e){var t=new Date,o=t.getFullYear(),a=t.getMonth()+1,r=t.getDate(),n=t.getHours(),i=t.getMinutes(),s=t.getSeconds(),c=new Date(1e3*parseInt(this.add_time)),d=c.getFullYear(),l=c.getMonth()+1,u=c.getDate(),g=c.getHours(),h=c.getMinutes(),m=c.getSeconds();if(console.log(o+"-"+a+"-"+r+" "+n+":"+i+":"+s),console.log(d+"-"+l+"-"+u+" "+g+":"+h+":"+m),o-d>=0)if(a-l>=0)if(r-u==0)if(n-g==0)if(console.log("同日,同时",i-h),i-h<30)if(this.choose=!0,s>m){var _=i-h+":"+(s-m);console.log("已过时间秒数大",_);var b=60-(s-m);0==b?(this.countdown=30-(i-h)+":"+b,console.log(30-(i-h)+":"+b),this.num()):(this.countdown=29-(i-h)+":"+b,console.log(29-(i-h)+":"+b),this.num())}else if(s<m){var f=i-h+":"+(60-m+s);console.log("已过时间秒数小",f);var p=s+(60-m);60==p?(this.countdown=30-(i-h)+":0",console.log(30-(i-h)+":0"),this.num()):(this.countdown=29-(i-h)+":"+(60-p),console.log(29-(i-h)+":"+(60-p)),this.num())}else this.choose=!1,this.timese="无法更改";else this.choose=!1,this.timese="无法更改";else if(n-g==1)if(console.log("同日,隔一时",60-h+i),60-h+i<30)if(this.choose=!0,s>m){var v=60-h+i+":"+(s-m);console.log("已过时间秒数大",v);var w=60-(s-m);0==w?(this.countdown=30-(60-h+nowminut)+":"+w,console.log(30-(60-h+i)+":"+w),this.num()):(this.countdown=29-(60-h+nowminut)+":"+w,console.log(29-(60-h+i)+":"+w),this.num())}else if(s<m){var y=60-h+i+":"+(60-m+s);console.log("已过时间秒数小",y);var T=s+(60-m);60==T?(this.countdown=30-(60-h+i)+":0",console.log(30-(60-h+i)+":0"),this.num()):(this.countdown=29-(60-h+i)+":"+(60-T),console.log(29-(60-h+i)+":"+(60-T)),this.num())}else this.choose=!1,this.timese="无法更改";else this.choose=!1,this.timese="无法更改";else this.choose=!1,this.timese="无法更改";else if(r-u==1)if(console.log("同日,隔一时",60-h+i),60-h+i<30)if(this.choose=!0,s>m){var I=60-h+i+":"+(s-m);console.log("已过时间秒数大",I);var D=60-(s-m);0==D?(this.countdown=30-(60-h+nowminut)+":"+D,console.log(30-(60-h+i)+":"+D),this.num()):(this.countdown=29-(60-h+nowminut)+":"+D,console.log(29-(60-h+i)+":"+D),this.num())}else if(s<m){var S=60-h+i+":"+(60-m+s);console.log("已过时间秒数小",S);var x=s+(60-m);60==x?(this.countdown=30-(60-h+i)+":0",console.log(30-(60-h+i)+":0"),this.num()):(this.countdown=29-(60-h+i)+":"+(60-x),console.log(29-(60-h+i)+":"+(60-x)),this.num())}else this.choose=!1,this.timese="无法更改";else this.choose=!1,this.timese="无法更改";else this.choose=!1,this.timese="无法更改";else this.choose=!1,this.timese="无法更改";else console.log("无法更改"),this.choose=!1,this.timese="无法更改"},add:function(t){clearInterval(this.Interval),console.log(this.choose),1==this.choose?e.navigateTo({url:"../Add/Add?ordernumber="+this.ordernumber}):e.showToast({title:"超时,无法更改",icon:"none"})},submit:function(t){var o=this,a=t.currentTarget.dataset.cardbag_number;console.log("cardbag_number",t.currentTarget.dataset.cardbag_number);var r="get_cardbag_pay_info",n=JSON.stringify({cardbag_number:a,memberid:e.getStorageSync("id")});console.log(n),this.$utils.post(r,n).then((function(e){o.$utils.wxPay(e.rs.serial_number,"cardbag")}))},xiaochengxu:function(t){this.index;var o=this,r=[],n={appId:"appId="+this.appid,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};for(var i in console.log(n),n)r.push(n[i]);r.sort();var s="";for(var c in r)c==r.length-1?s+=r[c]:s+=r[c]+"&";var d=s+"&key="+this.key;console.log(d);var l=a.default.hexMD5(d);console.log(l);var u={appId:"appId="+this.appid,sign:"sign="+l,random:"random="+this.nums,merchantCode:"merchantCode="+this.merchantCode,outTradeNo:"outTradeNo="+this.outTradeNo,totalAmount:"totalAmount="+this.totalAmount,channel:"channel=WXPAY",tradeType:"tradeType=MINIAPP",openId:"openId="+this.openid,subAppId:"subAppId=wx9c53a99b078435f5",notifyUrl:"notifyUrl="+this.notifyUrl};console.log(u);var g=[];for(var h in u)g.push(u[h]);g.sort();var m="";for(var _ in g)_==g.length-1?m+=g[_]:m+=g[_]+"&";console.log("字符串",m),e.request({url:"https://api.liantuofu.com/open/precreate",data:m,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t.data),e.hideLoading(),wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.payPackage,signType:t.data.signType,paySign:t.data.paySign,success:function(t){wx.showModal({title:"微信支付",content:"支付成功",cancelText:"查看详情",confirmText:"立即赠送",success:function(t){t.confirm?(console.log("点击立即赠送"),o.zengsong()):t.cancel&&(console.log(o.cardbag_number),console.log("点击查看详情"),e.navigateTo({url:"../orderDetails/orderDetails?cardbag_number="+o.cardbag_number}))}})},fail:function(e){console.log(e)}})}})},audioPlay:function(){var e=this;this.stop=1,this.click=1;var t=this;console.log("播放"),i.src=this.cardbag_theme.zhufu_mp3,i.play(),setTimeout((function(){i.currentTime,i.onTimeUpdate((function(o){console.log("总时长",i.duration),console.log("当前播放进度",i.currentTime);var a=i.currentTime/i.duration*100,r=(.57*t.width-.57*t.width*.07)*a/100;0==e.stop||(e.movable_x=r,e.schedule=a,e.duration=i.duration),i.onEnded((function(o){console.log("结束",o),t.click=0,e.movable_x=.57*t.width,e.schedule=100}))}))}))},audioPause:function(e){this.stop=0,this.click=0,console.log("暂停"),i.pause(),i.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},scroll:function(e){console.log(e),this.distance=e.detail.x},star:function(e){this.stop=0,this.click=0,console.log("暂停"),i.pause(),i.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},to:function(e){var t=this,o=this.distance,a=o/(.57*t.width-.57*t.width*.07)*100;console.log("跳转位置",this.duration*a/100),i.seek(this.duration*a/100),this.schedule=a,this.movable_x=o},index:function(t){clearInterval(this.Interval),e.reLaunch({url:"../index/index"})},immediately:function(e){}}});t.default=s}).call(this,o("543d")["default"])},c820:function(e,t,o){"use strict";var a=o("7812"),r=o.n(a);r.a}},[["2c25","common/runtime","common/vendor"]]]);