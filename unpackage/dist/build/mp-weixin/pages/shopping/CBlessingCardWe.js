(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/CBlessingCardWe"],{"3f13":function(e,a,t){"use strict";(function(e){t("334b");n(t("66fd"));var a=n(t("9fba"));function n(e){return e&&e.__esModule?e:{default:e}}e(a.default)}).call(this,t("543d")["createPage"])},"49d6":function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t("e2fe"));function r(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{IMG_DATA:"https://zhijianlw.com/static/web/img/icon-card-morenlogo-09-27-01.png",text:"",content:"",title:"",background:"",isShowCheck:0,gift:"0",zhufu_msg:"",name:"",w:"",schedule:0,movable_x:"0",distance:"0",duration:"",stop:"0",width:"",zhufu_mp4:"",zhufu_mp3:"",radio:!0,present_memberid_headimg:"",present_memberid_name:"",timecount:"00:00:00",hour:0,minute:0,second:0,timer:"",totalDuration:"00:00:00",numberNew:""}},computed:{},onShow:function(){},onLoad:function(a){var t=this;this.url=n.default.URL;var r=this,i=e.getStorageSync("id");this.sign=e.getStorageSync("sign"),a.cardbag_number?this.cardbag_number=a.cardbag_number:this.cardbag_number=a.scene;var d=JSON.stringify({cardbag_number:this.cardbag_number,cardbag_detail_id:"0",merberid:i}),c="get_cardbag_detail";this.$utils.post(c,d).then((function(a){if(t.background=a.cardbag_theme.theme_background,t.IMG_DATA=a.cardbag_theme.customized_head_img,t.text=a.cardbag_theme.customized_call,t.content=a.cardbag_theme.zhufu_msg,t.title=a.cardbag_theme.customized_company,console.log("礼包详情",a),t.zhufu_msg=a.cardbag_theme.zhufu_msg,t.zhufu_mp3=a.cardbag_theme.zhufu_mp3,t.zhufu_mp4=a.cardbag_theme.zhufu_mp4,t.present_memberid_headimg=a.cardbag.present_memberid_headimg,t.present_memberid_name=a.cardbag.present_memberid_name,3==a.cardbag.type)var n=Date.parse(new Date)/1e3,d=a.cardbag.fixed_time;"1"==a.cardbag_theme.zhufu_type?t.gift="1":"0"==a.cardbag_theme.zhufu_type?t.gift="0":t.gift="2";var c='{"cardbag_number":"'+t.cardbag_number+'","memberid":"'+i+'"}',u="check_receive_cardbag";t.$utils.post(u,c).then((function(a){console.log("判断礼包是否领取",a),1==a.sta?n>d?(t.display="0",e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag="+r.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+r.cardbag_number})):t.display="1":0==a.sta?(t.display="1",a.cardbag_number?(t.isShowCheck=3,t.number=a.cardbag_number,t.cardbag_detail_id=a.cardbag_detail_id,t.display="0",t.numberNew=a.cardbag_number):n<d||(t.isShowCheck=1,t.zhufu_msg=a.msg)):101==a.sta?t.isShowCheck=2:t.display="1"})),t.template=a.cardbag_theme,t.type=a.cardbag.type,t.cardbag=a.cardbag,t.head_img=a.cardbag.present_memberid_headimg,t.name=a.cardbag.present_memberid_name,t.all_details_num=a.cardbag.all_details_num,t.id=a.cardbag.present_memberid}));var u=e.getStorageSync("id");u?(this.idd=u,this.sign="200"):this.sign="0"},methods:{getShowcustomized:function(){var a=this,t="get_theme_type_by_customized",n="zhufu",r=e.getStorageSync("id"),i=JSON.stringify({memberid:r});this.$utils.postNew(t,i,n).then((function(e){1==e.sta&&(a.customizData=e.rs,a.IMG_DATA=e.rs.customized_head_img,a.text=e.rs.customized_call,a.content=e.rs.customized_zhufu,a.title=e.rs.customized_company,a.background=e.rs.default_theme_background,a.id=e.rs.default_theme_id)}))},toConversionDetails:function(){e.reLaunch({url:"../index-coupon/ConversionDetails?cardbag="+this.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+this.cardbag_number})},toConversionDetailsOther:function(){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+this.numberNew})},getgift:function(a){var t=this;"200"==this.sign?e.requestSubscribeMessage({tmplIds:["t8n_2-QRJn5md7MI7eauHnj_hMvGRc3mC7lDy3ccQJ8","MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk"],success:function(a){if("accept"==a["t8n_2-QRJn5md7MI7eauHnj_hMvGRc3mC7lDy3ccQJ8"]&&"accept"==a["MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk"]){var n="add_wx_subscribe_log",r="subscribe",i=e.getStorageSync("id"),d=JSON.stringify({memberid:i,template_id:"t8n_2-QRJn5md7MI7eauHnj_hMvGRc3mC7lDy3ccQJ8,MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk"});t.$utils.postNew(n,d,r).then((function(e){e.sta}))}},fail:function(e){},complete:function(a){var n='{"cardbag_number":"'+t.cardbag_number+'","memberid":"'+t.idd+'"}',r="receive_cardbag";t.$utils.post(r,n).then((function(a){console.log("领取卡包",a),1==a.sta?(e.setStorageSync("new_cardbag_number",a),3==t.type?(e.hideLoading(),e.showToast({title:"成功参与",icon:"none",mask:!0})):4==t.type?setTimeout((function(n){e.navigateTo({url:"../redEnvelopes/redEnvelopes?cardbag_number="+a.cardbag_number+"&cardbag_detail_id="+a.cardbag_detail_id+"&head_img="+t.head_img+"&all_details_num="+t.all_details_num+"&present_memberid_name="+t.name+"&old_cardbag_number="+t.cardbag_number}),e.hideLoading()}),500):setTimeout((function(n){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+a.cardbag_number+"&cardbag_detail_id="+a.cardbag_detail_id+"&head_img="+t.head_img+"&all_details_num="+t.all_details_num+"&present_memberid_name="+t.name+"&old_cardbag_number="+t.cardbag_number}),e.hideLoading()}),500)):e.hideLoading()}))}}):e.showToast({title:"请先登录",icon:"none",mask:"true",success:function(a){setTimeout((function(a){e.reLaunch({url:"../signin/signin?receive=onone&cardbag_number="+t.cardbag_number})}),1500)}})}}};a.default=i}).call(this,t("543d")["default"])},"85e2":function(e,a,t){"use strict";t.r(a);var n=t("49d6"),r=t.n(n);for(var i in n)"default"!==i&&function(e){t.d(a,e,(function(){return n[e]}))}(i);a["default"]=r.a},"8a33":function(e,a,t){},"9fba":function(e,a,t){"use strict";t.r(a);var n=t("ab60"),r=t("85e2");for(var i in r)"default"!==i&&function(e){t.d(a,e,(function(){return r[e]}))}(i);t("fe11");var d,c=t("f0c5"),u=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],d);a["default"]=u.exports},ab60:function(e,a,t){"use strict";var n;t.d(a,"b",(function(){return r})),t.d(a,"c",(function(){return i})),t.d(a,"a",(function(){return n}));var r=function(){var e=this,a=e.$createElement;e._self._c},i=[]},fe11:function(e,a,t){"use strict";var n=t("8a33"),r=t.n(n);r.a}},[["3f13","common/runtime","common/vendor"]]]);