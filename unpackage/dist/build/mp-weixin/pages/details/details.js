(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/details/details"],{"072c":function(o,s,e){},"0b9a":function(o,s,e){"use strict";(function(o){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0,e("6de0");var i=t(e("d54e"));function t(o){return o&&o.__esModule?o:{default:o}}function n(o,s,e){return s in o?Object.defineProperty(o,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):o[s]=e,o}var l=function(){e.e("components/own-components/own-coupon-list/own-coupon-list").then(function(){return resolve(e("d763"))}.bind(null,e)).catch(e.oe)},c=function(){Promise.all([e.e("common/vendor"),e.e("components/feng-parse/parse")]).then(function(){return resolve(e("312c"))}.bind(null,e)).catch(e.oe)},r={components:{uParse:c,"own-coupon-list":l},data:function(){var o;return o={num_all:0,btns:0,fixed:!1,list:[],display:!1,commom:"details-choose-left details-choose-active",commom1:"details-choose-left",img:!0,details:[],indexNav:[{name:"热门",style:"color:#FF0022;border-bottom:4.16rpx solid #FF0022;"},{name:"情人节"},{name:"夏日防暑"},{name:"9.9包邮"},{name:"美物"},{name:"热门"},{name:"情人节"}],alt:"",text:"",text1:"",choose:[{src:"../../static/details-small.jpg"},{src:"../../static/details-small.jpg"},{src:"../../static/details-small.jpg"},{src:"../../static/details-small.jpg"},{src:"../../static/details-small.jpg"},{src:"../../static/details-small1.jpg"},{src:"../../static/details-small1.jpg"},{src:"../../static/details-small1.jpg"},{src:"../../static/details-small1.jpg"},{src:"../../static/details-small1.jpg"}],id:"",goods_model:"",goods_spec:[0],goods_item:["默认"],discount_name:"",level_name:"",level:"",images:"",head_img:"",arr:[],first:[],btmdetails:"",btmnotice:"",btm:!0,listdisplay:!1,scrollTop:"",tt:[],top:"",keynum:"",sta:"",openid:"",Data:"",specArr:{},url:"",couponList:[],goodsinfo:{}},n(o,"goods_item",""),n(o,"guige",[]),n(o,"checknum","1"),o},onLoad:function(s){var e=this;this.url=i.default.URL,console.log(s),console.log("我执行了");var t=decodeURIComponent(s.scene);s.keynum?this.keynum=s.keynum:this.keynum=t,this.level_name=o.getStorageSync("level_name"),console.log(this.level_name),this.level=o.getStorageSync("level"),this.discount_name=o.getStorageSync("discount_name"),this.id=o.getStorageSync("id");var n=o.getStorageSync("id"),l='{"keynum":"'+this.keynum+'","memberid":"'+n+'"}';console.log(l);var c="get_goods_detail";this.$utils.post(c,l).then((function(o){console.log("res： ",o),console.log("详情",o.rs.goodsinfo),e.goodsinfo=o.rs.goodsinfo;var s=JSON.stringify({memberid:e.id,goodsid:e.goodsinfo.id}),i="get_coupon_list";if(e.$utils.post(i,s).then((function(o){console.log(),e.couponList=o.rs})),e.head_img=o.rs.goodsinfo.head_img,o.rs.goodsinfo.images){var t=o.rs.goodsinfo.images.split("|");t.unshift(o.rs.goodsinfo.head_img),e.details=t}for(var n in e.text=o.rs.goodsinfo.goods_spec.length,e.text1=o.rs.goodsinfo.goods_spec_list.length,console.log("规格",o.rs.goodsinfo.goods_spec),o.rs.goodsinfo.discount_name1=(o.rs.goodsinfo.price_level1/o.rs.goodsinfo.price*10).toFixed(1)+"折",o.rs.goodsinfo.discount_name2=(o.rs.goodsinfo.price_level2/o.rs.goodsinfo.price*10).toFixed(1)+"折",o.rs.goodsinfo.discount_name3=(o.rs.goodsinfo.price_level3/o.rs.goodsinfo.price*10).toFixed(1)+"折",o.rs.goodsinfo.discount_name4=(o.rs.goodsinfo.price_level4/o.rs.goodsinfo.price*10).toFixed(1)+"折",e.alt=o.rs.goodsinfo,e.specifications=o.rs.goodsinfo.goods_spec_list,e.goods_model=o.rs.goodsinfo.goods_model,e.list=o.rs.goodsinfo.goods_spec_list,o.rs.goodsinfo.goods_spec)o.rs.goodsinfo.goods_spec[n].one=n;e.btmdetails=o.rs.goodsinfo.details.replace(/<img /g,'<img class="rich_img" '),e.choose=o.rs.goodsinfo.goods_spec,e.goodsid=o.rs.goodsinfo.id,console.log("礼篮"),console.log("是否只有一个选项：",o.rs.goodsinfo.goods_spec.length,o.rs.goodsinfo.goods_spec.goods_spec_item.length),1==o.rs.goodsinfo.goods_spec.length&&1==o.rs.goodsinfo.goods_spec.goods_spec_item&&(e.goods_spec=[0],e.goods_item=[o.rs.goodsinfo.goods_spec.goods_spec_item])}));l="{}",c="get_webconfig_tiaoli";this.$utils.post(c,l).then((function(o){console.log("赠礼须知"),o.rs.zenglixuzhi,e.btmnotice=o.rs.zenglixuzhi.replace(/<img /g,'<img class="rich_img" ')}));var r=o.getStorageSync("sign");r?this.sta="200":(this.open(),this.sta="0")},onShareAppMessage:function(o){return{title:"我好喜欢这个礼物，可以送给我吗？",path:"/pages/details/details?keynum="+this.keynum,desc:"指间送礼"}},computed:{selectOption:function(){return this.goods_item}},methods:{reduce:function(o,s,e){this.checknum=parseInt(o)+parseInt(s)},handleSelect:function(o){this.goods_item=o},join:function(o){var s=o.currentTarget.dataset.index;0==s?(this.commom="details-choose-left details-choose-active",this.commom1="details-choose-left",this.img=!0,this.btm=!0):(this.commom1="details-choose-left details-choose-active",this.commom="details-choose-left",this.img=!1,this.btm=!1)},goshop:function(o){this.btns=2;var s=0;this.display=!this.display,this.fixed=!0,console.log("打开商品规格"),0==s&&(console.log(this.scrollTop),s++)},lilan:function(o){this.btns=3;var s=0;this.display=!this.display,this.fixed=!0,console.log("打开商品规格"),0==s&&(console.log(this.scrollTop),s++)},meshop:function(){},list_speci:function(o){this.btns=1,console.log(this.text);var s=0;this.display=!this.display,this.fixed=!0,console.log("打开商品规格"),0==s&&(console.log(this.scrollTop),s++);var e="get_goods_detail",i=JSON.stringify({memberid:this.id,goodsid:this.goodsinfo.id,goods_model:this.goodsinfo.goods_model,spec_name:this.goodsinfo["goods_spec"][0]["spec_name"],goods_spec:this.goodsinfo["goods_spec"][0]["id"],goods_item:this.goodsinfo["goods_spec"][0]["goods_spec_item"][0]["item"]});this.$utils.post(e,i).then((function(o){console.log(o)}))},close:function(o){console.log("关闭规格"),this.display=!1,this.fixed=!1,this.scrolle()},determine1:function(s){console.log("确定规格"),this.display=!1,this.fixed=!1;var e="op_buy_shopping_cart",i=this.id,t=this.goodsid,n=this.goods_model,l=String(Object.keys(this.specArr)),c=String(Object.values(this.specArr)).replace("#","替换u35");console.log(c);var r=JSON.stringify({memberid:i,goodsid:t,goods_model:n,goods_spec:l,goods_item:c,num:this.checknum,buy_type:1});console.log(r),this.$utils.post(e,r).then((function(s){console.log(s+"直接购买");var e="success";if(1!=s.sta)return e="none",void o.showToast({icon:e,title:s.msg,duration:2e3});""!=c&&o.navigateTo({url:"../shopping/must?type=1"})})),this.scrolle()},determine2:function(s){console.log("确定规格"),this.display=!1,this.fixed=!1;var e="op_buy_shopping_cart",i=this.id,t=this.goodsid,n=this.goods_model,l=String(Object.keys(this.specArr)),c=String(Object.values(this.specArr)).replace("#","替换u35");console.log(c);var r=JSON.stringify({memberid:i,goodsid:t,goods_model:n,goods_spec:l,goods_item:c,num:this.checknum,buy_type:1});this.$utils.post(e,r).then((function(s){console.log("直接赠送"),console.log(s);var e="success";if(1!=s.sta)return e="none",void o.showToast({icon:e,title:s.msg,duration:2e3});""!=c&&o.navigateTo({url:"../shopping/shop?type=1"})})),this.scrolle()},determine3:function(s){var e=this;this.display=!1,this.fixed=!1;var i="op_buy_shopping_cart",t=this.id,n=this.goodsid,l=this.goods_model,c=String(Object.keys(this.specArr)),r=String(Object.values(this.specArr)).replace("#","替换u35"),d=JSON.stringify({memberid:t,goodsid:n,goods_model:l,goods_spec:c,goods_item:r,num:this.checknum,buy_type:0});console.log(JSON.parse(d)),this.$utils.post(i,d).then((function(s){console.log("res"),console.log(s),1===s.sta&&o.showToast({icon:"success",title:s.msg,duration:1e3});var i=0,t=o.getStorageSync("id");e.memberid=t;var n='{"memberid":"'+t+'","buy_type":"'+i+'"}',l="get_buy_shopping_cart";e.$utils.post(l,n).then((function(o){console.log("商品信息",o),e.num_all=o.rs.num_all}))}))},bottom_btn:function(s){o.reLaunch({url:"../shopping/shopping?type=0"})},onPageScroll:function(o){this.tt;this.scrollTop=o.scrollTop},scrolle:function(s){var e=this;if(console.log(this.fixed),0==this.fixed)var i=setTimeout((function(){console.log("执行??"),o.pageScrollTo({scrollTop:e.top}),clearTimeout(i)}),100)},spec:function(o){console.log(o);var s=o.currentTarget.dataset.one,e=o.currentTarget.dataset.index,i=o.currentTarget.dataset.text;o.currentTarget.dataset.da;console.log("点击规格",o);var t=this.goods_spec,n=this.goods_item,l=this.first,c=this.arr,r=this.specArr;this.choose.length;console.log(t),console.log(n),t.push(s),l.splice(0,1),c.splice(0,1),-1==l.indexOf(s)&&l.push(s),-1==c.indexOf(e)&&c.push(r),console.log(r[s]==i),r[s]==i?r[s]=null:r[s]=i,t=Object.keys(r),n=Object.values(r),console.log(r),console.log(t),console.log(n),this["guige"]=n,console.log(this.guige.join(","))},open:function(){var s=this,e=o.getStorageSync("openid");e?(this.openid=e,console.log("已获取openid")):o.login({success:function(e){var i='{"wx_code":"'+e.code+'"}',t="get_openid";s.$utils.post(t,i).then((function(e){console.log("openid",e),o.setStorageSync("openid",e.openid),s.openid=e.openid}))}})},bindGetUserInfo:function(s){s.detail.rawData&&(this.Data=JSON.parse(s.detail.rawData),o.showLoading({title:"登录中",mask:"true"}),this.zhu())},zhu:function(){var s=this,e=this.Data,i=this.openid;o.setStorageSync("rawdata",e);var t='{"wx_openid":"'+i+'","name":"'+e.nickName+'","sex":"'+e.gender+'","head_img":"'+e.avatarUrl+'"}';console.log(t);var n="member_register";this.$utils.post(n,t).then((function(e){if(console.log("注册",e),"操作成功！"===e.msg||"该用户已经注册,请勿重复注册！"===e.msg){var t='{"wx_openid":"'+i+'"}',n="member_login";s.$utils.post(n,t).then((function(e){o.hideLoading(),console.log("基本信息",e.rs),o.setStorageSync("sign",e.rs),o.setStorageSync("id",e.rs.id),o.setStorageSync("name",e.rs.name),o.setStorageSync("keynum",e.rs.keynum),o.setStorageSync("sex",e.rs.sex),o.setStorageSync("head_img",e.rs.head_img),o.setStorageSync("level_name",e.rs.level_name),o.setStorageSync("level",e.rs.lmevemml),o.setStorageSync("balance",e.rs.balance),o.setStorageSync("zj_balance",e.rs.zj_balance),o.setStorageSync("phone",e.rs.phone),null==e.rs.discount_name||""==e.rs.discount_name||o.setStorageSync("discount_name",e.rs.discount_name),s.showa=1,s.sta=200;var i='{"keynum":"'+s.keynum+'","memberid":"'+e.rs.id+'"}';console.log(i);var t="get_goods_detail";s.$utils.post(t,i).then((function(o){if(console.log("详情",o.rs.goodsinfo),s.head_img=o.rs.goodsinfo.head_img,o.rs.goodsinfo.images){var e=o.rs.goodsinfo.images.split("|");e.unshift(o.rs.goodsinfo.head_img),s.details=e}for(var i in s.text=o.rs.goodsinfo.goods_spec.length,s.text1=o.rs.goodsinfo.goods_spec_list.length,o.rs.goodsinfo.discount_name1=(o.rs.goodsinfo.price_level1/o.rs.goodsinfo.price*10).toFixed(1)+"折",o.rs.goodsinfo.discount_name2=(o.rs.goodsinfo.price_level2/o.rs.goodsinfo.price*10).toFixed(1)+"折",o.rs.goodsinfo.discount_name3=(o.rs.goodsinfo.price_level3/o.rs.goodsinfo.price*10).toFixed(1)+"折",o.rs.goodsinfo.discount_name4=(o.rs.goodsinfo.price_level4/o.rs.goodsinfo.price*10).toFixed(1)+"折",s.alt=o.rs.goodsinfo,s.specifications=o.rs.goodsinfo.goods_spec_list,s.list=o.rs.goodsinfo.goods_spec_list,o.rs.goodsinfo.goods_spec)o.rs.goodsinfo.goods_spec[i].one=i;s.btmdetails=o.rs.goodsinfo.details.replace(/<img /g,'<img class="rich_img" '),s.choose=o.rs.goodsinfo.goods_spec,s.goodsid=o.rs.goodsinfo.id,1==o.rs.goodsinfo.is_collect&&(s.icon[1].src="../../static/shoucang-on.png")}));i="{}",t="get_webconfig_tiaoli";s.$utils.post(t,i).then((function(o){console.log("赠礼须知"),o.rs.zenglixuzhi,s.btmnotice=o.rs.zenglixuzhi.replace(/<img /g,'<img class="rich_img" ')}))}))}}))},gotoShare:function(){this.$refs.popup.open()},close1:function(){this.$refs.popup.close()}}};s.default=r}).call(this,e("543d")["default"])},"0f79":function(o,s,e){"use strict";e.r(s);var i=e("b21e"),t=e("c803");for(var n in t)"default"!==n&&function(o){e.d(s,o,(function(){return t[o]}))}(n);e("852e");var l,c=e("f0c5"),r=Object(c["a"])(t["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],l);s["default"]=r.exports},"852e":function(o,s,e){"use strict";var i=e("072c"),t=e.n(i);t.a},b21e:function(o,s,e){"use strict";e.d(s,"b",(function(){return t})),e.d(s,"c",(function(){return n})),e.d(s,"a",(function(){return i}));var i={uniPopup:function(){return e.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(e.bind(null,"3d61"))}},t=function(){var o=this,s=o.$createElement,e=(o._self._c,o.$utils.imageUrl(o.head_img)),i=o.alt.goodsname.substr(0,10),t=o.details.length>0?o.__map(o.details,(function(s,e){var i=o.__get_orig(s),t=o.$utils.imageUrl(s);return{$orig:i,g2:t}})):null,n=o.details.length>0?null:o.$utils.imageUrl(o.head_img);o.$mp.data=Object.assign({},{$root:{g0:e,g1:i,l0:t,g3:n}})},n=[]},bb31:function(o,s,e){"use strict";(function(o){e("aa93");i(e("66fd"));var s=i(e("0f79"));function i(o){return o&&o.__esModule?o:{default:o}}o(s.default)}).call(this,e("543d")["createPage"])},c803:function(o,s,e){"use strict";e.r(s);var i=e("0b9a"),t=e.n(i);for(var n in i)"default"!==n&&function(o){e.d(s,o,(function(){return i[o]}))}(n);s["default"]=t.a}},[["bb31","common/runtime","common/vendor"]]]);