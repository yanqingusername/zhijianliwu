(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ordeDetails/ordeDetails"],{"024c":function(e,o,s){"use strict";var t=s("f84b"),i=s.n(t);i.a},"076b":function(e,o,s){"use strict";s.r(o);var t=s("6ad1"),i=s("e8c7");for(var n in i)"default"!==n&&function(e){s.d(o,e,(function(){return i[e]}))}(n);s("024c");var r,a=s("f0c5"),d=Object(a["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],r);o["default"]=d.exports},"2de1":function(e,o,s){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;t(s("2e30")),t(s("92fd"));function t(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{nav:"0",order:[],purchase:[],appid:"",key:"",merchantCode:"",openid:"",outTradeNo:"",totalAmount:"",nums:"",memberid:"",id:"",cardbag_number:"",fixed:!1,display:!1,choose:[],member_area_id:"",cardbag_detail_id:"",length:"",status:"",goods_spec:"",arr:"",goodsid:"",model:"",spe:"",item:"",specc_choose:"",indexx:"",provinceName:"",cityName:"",countyName:"",userName:"",linktel:"",telNumber:"",detailInfo:"",head_img:"",list:[],title:"",navv:"0",addresss:"",addli:{linkman:"",linktel:"",province_name:"",city_name:"",county_name:"",toast:""},addsign:"",delivery_type:"快递",showa:"",title_length:"",scope:""}},onShow:function(o){var s=this;if(1==this.showa){var t=e.getStorageSync("member_area_id");this.index=t,this.addlist()}1==this.scope&&(s.scope=!1,s.chooseadd())},onLoad:function(o){var s=this;this.id=e.getStorageSync("id"),this.level_name=e.getStorageSync("level_name"),this.cardbag_number=o.cardbag_number,this.addlist(),this.orderlist(),e.setStorageSync("member_area_id","");var t=setTimeout((function(e){s.showa=1,clearTimeout(t)}),200)},methods:{addlist:function(o){var s=this,t=this,i='{"memberid":"'+this.id+'"}',n="get_member_area";this.$utils.post(n,i).then((function(o){console.log("地址列表",o),o.rs.length>0?s.index?(console.log("选择的地址"),s.addli=o.rs[s.index],s.member_area_id=o.rs[s.index].id,s.addsign=2):o.rs.length>0&&(console.log("默认第一个地址"),s.addli=o.rs[0],s.member_area_id=o.rs[0].id,s.addsign=2):(s.addli={linkman:"",linktel:"",province_name:"",city_name:"",county_name:"",address:"",toast:"请填写收货地址"},console.log("没地址"),s.addsign=0,e.getSetting({success:function(e){console.log("授权",e.authSetting["scope.address"]),1==e.authSetting["scope.address"]||t.chooseadd()}}))}))},address:function(o){var s=this;if(0==this.addsign){console.log("直接添加来着");e.setStorageSync("add","");e.navigateTo({url:"../Address/Address"})}else this.addsign>0&&(console.log("选择地址"),e.navigateTo({url:"../Add/Add?cardbag_number="+s.cardbag_number}))},choo:function(e){this.navv=e.currentTarget.dataset.index,this.cardbag_detail_id=e.currentTarget.dataset.id},spec:function(e){var o=this;this.display=!this.display,this.fixed=!this.display;var s=e.currentTarget.dataset.index;this.indexx=e.currentTarget.dataset.index,console.log(e.currentTarget.dataset.index);var t=e.currentTarget.dataset.keynum,i=this.id,n='{"keynum":"'+t+'","memberid":"'+i+'"}',r="get_goods_detail";this.$utils.post(r,n).then((function(e){console.log("详情",e.rs),o.list=e.rs.goodsinfo.goods_spec_list,o.head_img=e.rs.goodsinfo.head_img;var t=[];for(var i in o.item[s]&&(t=o.item[s].split(","),console.log(t)),e.rs.goodsinfo.goods_spec)for(var n in e.rs.goodsinfo.goods_spec[i].index=i,e.rs.goodsinfo.goods_spec[i].goods_spec_item)t[i]==e.rs.goodsinfo.goods_spec[i].goods_spec_item[n].item?e.rs.goodsinfo.goods_spec[i].goods_spec_item[n].click=1:e.rs.goodsinfo.goods_spec[i].goods_spec_item[n].click=0;o.choose=e.rs.goodsinfo.goods_spec;var r=new Array(o.length),a=new Array(o.length),d=new Array(o.length),c="";for(var l in e.rs.goodsinfo.goods_spec)l==e.rs.goodsinfo.goods_spec.length-1?c+=e.rs.goodsinfo.goods_spec[l].id:c+=e.rs.goodsinfo.goods_spec[l].id+",";r[s]=e.rs.goodsinfo.id,a[s]=e.rs.goodsinfo.goods_model,d[s]=c,o.goodsid=r,o.model=a,o.spe=d,o.specc_choose=new Array(e.rs.goodsinfo.goods_spec.length),console.log("商品",r),console.log("规格的model",a),console.log("规格id",d)}))},specc:function(e){var o=e.currentTarget.dataset.id,s=e.currentTarget.dataset.index,t=(this.choose.length,this.indexx),i=this.choose;for(var n in this.choose[o].goods_spec_item)i[o].goods_spec_item[n].click=0;for(var r in i[o].goods_spec_item[s].click=1,this.choose=i,i)for(var a in i[r].goods_spec_item)console.log(i[r].goods_spec_item[a].click),1==i[r].goods_spec_item[a].click&&(this.specc_choose[r]=i[r].goods_spec_item[a].item);console.log(this.specc_choose);var d="";for(var c in this.specc_choose)c==this.specc_choose.length-1?d+=this.specc_choose[c]:d+=this.specc_choose[c]+",";this.item[t]=d,this.goods_spec[t]='"'+this.goodsid[t]+'":{"model":"'+this.model[t]+'","spec":"'+this.spe[t]+'","item":"'+this.item[t]+'"}',console.log(this.goods_spec)},close:function(e){this.display=!1},determine:function(e){var o=this.indexx;this.purchase[o].guige=this.item[o],this.display=!1;var s=this.choose;for(var t in s)for(var i in s[t].goods_spec_item)s[t].goods_spec_item[i].click=0;this.choose=""},generate:function(o){var s=this,t=this.item;if(1==t.length)if(null==t[0]||void 0===t[0]){console.log("无");var i=1}else console.log("有");else{console.log("这边??"),console.log(t.length);for(var n=0;n<t.length;n++)if(console.log(n),console.log(t[n]),void 0==t[n]||null==t[n]){console.log("无");i=1}else console.log("有")}if(1==i)console.log("存在未选择规格"),e.showToast({title:"请选择规格",icon:"none"});else{console.log("nice.没问题");var r="",a=this.goods_spec;if(1==this.length)r="{"+this.goods_spec[0]+"}";else for(var d in a)0==d?r+="{"+a[d]+",":d==this.length-1?r+=a[d]+"}":r+=a[d]+",";var c=s.navv,l='{"memberid":"'+this.id+'","member_area_id":"'+this.member_area_id+'","cardbag_number":"'+this.cardbag_number+'","cardbag_detail_id":"'+this.cardbag_detail_id+'","delivery_type":"'+this.delivery_type+'","goods_spec":'+r.replace("#","替换u35")+"}",g="create_order";console.log(l),this.$utils.post(g,l).then((function(o){console.log("生成订单",o),1==o.sta?(e.navigateBack({}),e.setStorageSync("member_area_id",""),e.showToast({title:"已生成订单",icon:"success",success:function(o){1==s.title_length||0==s.title.length?(console.log("最后一个礼包"),setTimeout((function(o){e.redirectTo({url:"../order/order?nav=1"})}),0)):s.title_length>1&&(s.title.splice(s.navv,1),console.log(c),console.log(s.title),console.log(s.title[c]),null==s.title[c]||void 0==s.title[c]?(console.log("无了"),setTimeout((function(o){e.redirectTo({url:"../order/order?nav=1"})}),0)):s.cardbag_detail_id=s.title[c].id)}})):wx.showToast({title:o.msg})}))}},chooseadd:function(o){var s=this;e.chooseAddress({success:function(e){console.log("获取地址",e),s.provinceName=e.provinceName,s.cityName=e.cityName,s.countyName=e.countyName,s.userName=e.userName,s.linktel=e.linktel,s.detailInfo=e.detailInfo,s.telNumber=e.telNumber,s.add()},fail:function(o){console.log("失败"),e.openSetting({success:function(e){console.log(e.authSetting),s.scope=!0},fail:function(e){console.log(e),console.log(e.authSetting)}})}})},add:function(o){var s=this,t=this,i=this.provinceName,n=this.cityName,r=this.countyName,a='{"level":"1"}',d="get_area";this.$utils.post(d,a).then((function(o){for(var a in 0==o.rs.length&&(t.addresss=!0),o.rs)if(i==o.rs[a].name){s.provinceName=o.rs[a].id,console.log(o.rs[a].name);var d='{"level":"2","parentid":"'+o.rs[a].id+'"}',c="get_area";s.$utils.post(c,d).then((function(e){for(var o in 0==e.rs.length&&(t.addresss=!0),e.rs)if(n==e.rs[o].name){s.cityName=e.rs[o].id,console.log(e.rs[o].name);var i='{"level":"3","parentid":"'+e.rs[o].id+'"}',a="get_area";s.$utils.post(a,i).then((function(e){for(var o in console.log("县",e),0==e.rs.length&&(t.addresss=!0),e.rs)r==e.rs[o].name?(s.countyName=e.rs[o].id,console.log(e.rs[o].name),s.adds()):t.addresss=!0}))}else t.addresss=!0}))}else t.addresss=!0;1==t.addresss&&e.showToast({title:"匹配失败",icon:"none"})}))},adds:function(o){var s=this,t=this,i='{"memberid":"'+t.id+'","linkman":"'+t.userName+'","linktel":"'+t.telNumber+'","province":"'+t.provinceName+'","city":"'+t.cityName+'","county":"'+t.countyName+'","address":"'+t.detailInfo+'"}';console.log(i);var n="add_member_area";t.$utils.post(n,i).then((function(o){if(console.log(o),1==o.sta){var t='{"memberid":"'+s.id+'"}',i="get_member_area";s.$utils.post(i,t).then((function(e){console.log("地址列表",e),console.log("默认第一个地址"),s.addli=e.rs[0],s.member_area_id=e.rs[0].id,s.addsign=2}))}else e.showToast({title:"匹配失败,请手动填写地址",icon:"none",success:function(){var o=setTimeout((function(s){e.setStorageSync("add","");e.navigateTo({url:"../Address/Address"}),clearTimeout(o)}),1e3)}})}))},orderlist:function(e){var o=this,s=[],t='{"cardbag_number":"'+this.cardbag_number+'"}',i="get_cardbag_fenshu";this.$utils.post(i,t).then((function(e){for(var t in console.log("子订单列表",e.rs),e.rs[0].goodsinfo)e.rs[0].goodsinfo[t].guige="";for(var i in e.rs)0==e.rs[i].status&&(e.rs[i].index=Number(i)+1,s.push(e.rs[i]));o.title_length=s.length,o.title=s,o.purchase=e.rs[0].goodsinfo,o.cardbag_detail_id=s[0].id,o.length=e.rs[0].goodsinfo.length,o.status=e.rs.status,o.goods_spec=new Array(e.rs[0].goodsinfo.length),o.item=new Array(e.rs[0].goodsinfo.length)}))}}};o.default=i}).call(this,s("543d")["default"])},"568f":function(e,o,s){"use strict";(function(e){s("aa93");t(s("66fd"));var o=t(s("076b"));function t(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,s("543d")["createPage"])},"6ad1":function(e,o,s){"use strict";var t;s.d(o,"b",(function(){return i})),s.d(o,"c",(function(){return n})),s.d(o,"a",(function(){return t}));var i=function(){var e=this,o=e.$createElement,s=(e._self._c,e.title_length>1?e.__map(e.title,(function(o,s){var t=e.__get_orig(o),i=e.$utils.imageUrl(o.goodsinfo[0].head_img);return{$orig:t,g0:i}})):null),t=e.__map(e.purchase,(function(o,s){var t=e.__get_orig(o),i=e.$utils.imageUrl(o.head_img);return{$orig:t,g1:i}})),i=e.__map(e.list,(function(o,s){var t=e.__get_orig(o),i=e.$utils.imageUrl(o.head_img);return{$orig:t,g2:i}})),n=e.$utils.imageUrl(e.head_img);e.$mp.data=Object.assign({},{$root:{l0:s,l1:t,l2:i,g3:n}})},n=[]},e8c7:function(e,o,s){"use strict";s.r(o);var t=s("2de1"),i=s.n(t);for(var n in t)"default"!==n&&function(e){s.d(o,e,(function(){return t[e]}))}(n);o["default"]=i.a},f84b:function(e,o,s){}},[["568f","common/runtime","common/vendor"]]]);