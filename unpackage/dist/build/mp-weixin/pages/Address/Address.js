(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Address/Address"],{"0ab7":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={evanSwitch:function(){return n.e("components/evan-switch/evan-switch").then(n.bind(null,"159d"))},simpleAddress:function(){return Promise.all([n.e("common/vendor"),n.e("components/simple-address/simple-address")]).then(n.bind(null,"d3a6"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},"1b65":function(e,t,n){},"242e":function(e,t,n){"use strict";n.r(t);var i=n("c5ed"),o=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},"2e22":function(e,t,n){"use strict";var i=n("1b65"),o=n.n(i);o.a},"71aa":function(e,t,n){"use strict";(function(e){n("334b");i(n("66fd"));var t=i(n("ed1c"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c5ed:function(e,t,n){"use strict";(function(e){function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){Promise.all([n.e("common/vendor"),n.e("components/simple-address/simple-address")]).then(function(){return resolve(n("d3a6"))}.bind(null,n)).catch(n.oe)},a={data:function(){var e;return e={id:"",add:"",cityPickerValueDefault:[0,0,1],pickerText:"",addr:{linkman:"",linktel:"",province:"",address:""}},i(e,"add",{linkman:"",linktel:"",province:"",address:""}),i(e,"province",""),i(e,"city",""),i(e,"county",""),i(e,"index",""),i(e,"addto",""),i(e,"ordernumber",""),i(e,"checked",!1),i(e,"latitude",""),i(e,"longitude",""),e},components:{simpleAddress:o},onLoad:function(t){this.id=e.getStorageSync("id");var n=e.getStorageSync("add");e.setNavigationBarTitle({title:1==t.modify?"编辑收货地址":"新增地址"}),1==t.modify?(this.index=t.index,n.prov=n.province_name+"-"+n.city_name+"-"+n.county_name,this.add=n,this.province=n.province,this.city=n.city,this.county=n.county):1==t.addto&&(this.addto=t.addto),t.ordernumber&&(this.ordernumber=t.ordernumber);var i=this;e.getLocation({type:"gcj02",altitude:!0,success:function(e){i.latitude=e.latitude,i.longitude=e.longitude}})},computed:{isDisabled:function(){var e=!0;return this.add.linkman&&this.add.linktel&&this.province&&this.city&&this.county&&this.add.address&&(e=!1),e}},onUnload:function(){1==this.addto&&(e.setStorageSync("member_area_id",index),e.setStorageSync("member_area_linkman",name),e.setStorageSync("member_area_linktel",phone),e.setStorageSync("member_area_address",add+" "+address)),console.log("页面卸载")},methods:{onNameInput:function(e){this.add.linkman=e.detail.value},onPhoneInput:function(e){this.add.linktel=e.detail.value},onAddressInput:function(e){this.add.address=e.detail.value},bindPickerChange:function(e){},submit:function(t){var n=this,i=t.detail.value.name,o=t.detail.value.phone,a=t.detail.value.add,s=t.detail.value.address;if(""==i||void 0==i)e.showToast({title:"姓名不能为空",mask:!0,icon:"none"});else if(""==o||void 0==o)e.showToast({title:"手机号不能为空",mask:!0,icon:"none"});else if(""==o||void 0==o)e.showToast({title:"手机号不能为空",mask:!0,icon:"none"});else if(o.lenght<11)e.showToast({title:"手机号有误",mask:!0,icon:"none"});else if(/^1[0-9]{10}$/.test(o))if(""==s||void 0==s)e.showToast({title:"详细地址不能为空",mask:!0,icon:"none"});else{var d=this.province,r=this.city,c=this.county,l=this.checked?1:0;if(this.add.id)var u='{"memberid":"'+this.id+'","member_area_id":"'+this.add.id+'","linkman":"'+i+'","linktel":"'+o+'","province":"'+d+'","city":"'+r+'","county":"'+c+'","address":"'+s+'","is_default":"'+l+'"}';else u='{"memberid":"'+this.id+'","linkman":"'+i+'","linktel":"'+o+'","province":"'+d+'","city":"'+r+'","county":"'+c+'","address":"'+s+'","is_default":"'+l+'"}';var m="add_member_area";this.$utils.post(m,u).then((function(t){if(1==t.sta){var d='{"memberid":"'+n.id+'"}',r="get_member_area";n.$utils.post(r,d).then((function(t){if(1==t.sta)if(n.add.id)e.setStorageSync("member_area_id",n.index),e.navigateBack({delta:1});else if(n.addto)if(n.ordernumber){var d='{"memberid":"'+n.id+'","member_area_id":"'+t.rs[0].id+'","ordernumber":"'+n.ordernumber+'"}',r="save_order_address";n.$utils.post(r,d).then((function(t){console.log("地址修改成功",t),1==t.sta?e.navigateBack({delta:1}):e.showToast({title:t.msg,icon:"none"})}))}else e.setStorageSync("member_area_id",n.index),e.setStorageSync("member_area_linkman",i),e.setStorageSync("member_area_linktel",o),e.setStorageSync("member_area_address",a+" "+s),e.navigateBack({delta:1});else e.setStorageSync("member_area_id","0"),e.navigateBack({delta:1})}))}else e.showToast({title:t.msg,icon:"none"})}))}else e.showToast({title:"手机号有误",mask:!0,icon:"none"})},openAddres2:function(){var e=this.$refs.simpleAddress.queryIndex(["北京市","市辖区","东城区"],"label");console.log(e),this.cityPickerValueDefault=e.index,this.$refs.simpleAddress.open()},onConfirm:function(e){console.log(e),this.add.prov=e.name,this.province=e.provinceCode,this.city=e.cityCode,this.county=e.areaCode},onChangeLocation:function(t){var n=this;e.chooseLocation({latitude:n.latitude,longitude:n.longitude,success:function(e){if("chooseLocation:ok"==e.errMsg){var t=e.latitude,i=e.longitude,o=e.address;n.getCityAddress(t,i,o)}},fail:function(e){"chooseLocation:fail cancel"==e.errMsg&&n.getSettingLocation()}})},getSettingLocation:function(){var t=this;e.getSetting({success:function(n){n.authSetting["scope.userLocation"]||e.authorize({scope:"scope.userLocation",success:function(){e.getLocation({type:"gcj02",altitude:!0,success:function(e){t.latitude=e.latitude,t.longitude=e.longitude,t.onChangeLocation()}})},fail:function(n){e.showModal({title:"提示",content:"此功能需要您的位置授权",success:function(n){n.confirm&&e.openSetting({success:function(n){n.authSetting["scope.userLocation"]?e.getLocation({type:"gcj02",altitude:!0,success:function(e){t.latitude=e.latitude,t.longitude=e.longitude,t.onChangeLocation()}}):e.showToast({title:"授权失败",icon:"none"})}})}})}})}})},getCityAddress:function(e,t,n){var i=this,o="get_city_info",a="filmset",s=JSON.stringify({latitude:e,longitude:t});this.$utils.postNew(o,s,a).then((function(e){if(1==e.sta){i.add.prov=e.rs.address_component.province+"-"+e.rs.address_component.city+"-"+e.rs.address_component.district,i.province=e.rs.provinceId,i.city=e.rs.cityId,i.county=e.rs.areaId;var t=e.rs.formatted_addresses.recommend,n=e.rs.address_component.district;if(n){var o=t.lastIndexOf(n),a=t.substring(o+n.length,t.length);i.add.address=a}}}))}}};t.default=a}).call(this,n("543d")["default"])},ed1c:function(e,t,n){"use strict";n.r(t);var i=n("0ab7"),o=n("242e");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("2e22");var s,d=n("f0c5"),r=Object(d["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=r.exports}},[["71aa","common/runtime","common/vendor"]]]);