(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaSeatSelect"],{"2b98":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var i=function(){var e=this,t=e.$createElement;e._self._c},r=[]},3365:function(e,t,n){"use strict";var o=n("c015"),i=n.n(o);i.a},bc28:function(e,t,n){"use strict";(function(e){function n(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=c(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){s=!0,r=e},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw r}}}}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){return h(e)||l(e)||c(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,t){if(e){if("string"===typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}function l(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function h(e){if(Array.isArray(e))return u(e)}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var f={data:function(){return{seatList:[],selectedSeat:[],hallName:void 0,scaleValue:1,hidden:"hidden",maxSelect:6,totalPrice:0,loadComplete:!1,timer:null,seatArea:"",seatScaleHeight:"",maxX:"",maxY:"",seatTypeList:[{icon:"https://zhijianlw.com/static/web/img/icon_film_2021_10_28_03.png",name:"可选"},{icon:"https://zhijianlw.com/static/web/img/icon_film_2021_10_28_01.png",name:"已选"},{icon:"https://zhijianlw.com/static/web/img/icon_film_2021_10_28_02.png",name:"已售"}],showId:"",cinemaName:"",showSeatsList:[],price:"0",showInfo:"",movieInfo:"",isShow:"",show_list:[],areaLift:[],scaleNumber:1,seatAreaWidth:750,throttle:null}},onLoad:function(t){var n=this;n.showId=t.showId,n.cinemaName=t.cinemaName,e.setNavigationBarTitle({title:n.cinemaName}),e.getSystemInfo({success:function(e){n.seatArea=e.screenHeight-500*e.screenWidth/750,n.rpxToPx=e.screenWidth/750}})},onShow:function(){this.getFilmShowSeats()},methods:{getFilmShowSeats:function(){e.showLoading({title:"加载中"});var t=this,n="get_film_show_seats",o="films",i=JSON.stringify({showId:t.showId});this.$utils.postNew(n,i,o).then((function(n){if(wx.hideLoading(),1==n.sta){if(n.rs&&n.rs.showInfo&&(t.price=n.rs.showInfo.salePrice,t.showInfo=n.rs.showInfo,t.hallName=n.rs.showInfo.hallName),n.rs&&n.rs.movieInfo&&(t.movieInfo=n.rs.movieInfo),n.rs&&n.rs.seatsInfo){var o=t.prosessSeatList(n.rs.seatsInfo.seats);t.seatList=o;var i=[];n.rs.seatsInfo&&n.rs.seatsInfo.seats.length>0&&n.rs.seatsInfo.seats.forEach((function(e){i.push(e.seatNo.split("排")[0])})),t.areaLift=a(new Set(i)),t.selectedSeat=[],t.totalPrice=0,t.hidden="hidden",t.seatArea=t.seatArea,setTimeout((function(){e.hideLoading()}),1e3),t.prosessMaxSeat(o),t.creatSeatMap(),t.creatBestSeat()}n.rs&&n.rs.show_list&&(t.show_list=n.rs.show_list)}else e.hideLoading(),e.showToast({title:"获取座位图失败",icon:"none",duration:2e3}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)}))},scaleEventHandle:function(e){var t=this;if(!this.throttle){this.throttle=setTimeout((function(){clearTimeout(t.throttle),t.throttle=null}),100);var n=e.detail.scale;parseFloat(n)<=1?this.seatAreaWidth=750:parseFloat(n)>1.5?this.seatAreaWidth=1200:this.seatAreaWidth=1e3}},handleScale:function(e){var t=this;this.timer&&clearTimeout(this.timer);setTimeout((function(){t.seatArea=t.seatArea}),200)},prosessSeatList:function(e){var t=this,n=e;return n.forEach((function(e){var o=e.loverSeat;if(e.otherLoveSeatIndex=null,e.otherLoveSeatId=null,"1"===o||"2"===o)for(var i in n)n[i].rowNo===e.rowNo&&n[i].columnNo===e.columnNo+1&&(e.otherLoveSeatIndex=i,e.otherLoveSeatId=n[i].seatId);if("0"===o)for(var r in n)n[r].rowNo===e.rowNo&&n[r].columnNo===e.columnNo-1&&(e.otherLoveSeatIndex=r,e.otherLoveSeatId=n[r].seatId);e.nowIcon="https://zhijianlw.com/static/web/img/icon_film_2021_10_28_03.png",e.defautIcon="https://zhijianlw.com/static/web/img/icon_film_2021_10_28_03.png",e.selectedIcon="https://zhijianlw.com/static/web/img/icon_film_2021_10_28_01.png",e.soldedIcon="https://zhijianlw.com/static/web/img/icon_film_2021_10_28_02.png","LK"==e.status&&(e.nowIcon="https://zhijianlw.com/static/web/img/icon_film_2021_10_28_02.png",e.defautIcon="https://zhijianlw.com/static/web/img/icon_film_2021_10_28_02.png"),e.price=t.price,"LK"==e.status?e.canClick=!1:e.canClick=!0})),n},prosessMaxSeat:function(e){for(var t=e,n=0,o=0;o<t.length;o++){var i=t[o].rowNo;parseInt(i)>parseInt(n)&&(n=i)}for(var r=0,a=0;a<t.length;a++){var s=t[a].columnNo;parseInt(s)>parseInt(r)&&(r=s)}var c=30*parseInt(r)*this.rpxToPx,l=30*parseInt(n)*this.rpxToPx,h=1,u=1,f=1,d=750*this.rpxToPx,v=this.seatArea-200*this.rpxToPx;c>d&&(u=d/c),l>v&&(f=v/l),(u<1||f<1)&&(h=u<f?u:f),this.maxY=parseInt(n),this.maxX=parseInt(r),this.seatScale=h,this.seatScaleHeight=30*h*this.rpxToPx},seatToolArr:function(){for(var e=[],t=this.maxY,n=this.seatList,o=1;o<=t;o++){for(var i="",r=0;r<n.length;r++)parseInt(n[r].rowNo)===o&&(i=n[r].row);e.push(i)}this.seatToolArr=e},back:function(){wx.navigateBack({delta:1})},clickSeat:function(e){var t=e.currentTarget.dataset.index;this.seatList[t].canClick&&(this.seatList[t].nowIcon===this.seatList[t].selectedIcon?this.processSelected(t):this.processUnSelected(t)),0==this.selectedSeat.length&&(this.hidden="hidden");var n=this.selectedSeat,o=0;for(var i in n){var r=parseFloat(n[i].price);o+=r}this.totalPrice=o},processSelected:function(e){var t=this.selectedSeat,n=this.seatList,o=n[e].otherLoveSeatIndex;if(null!==o){for(var i in n[e].nowIcon=n[e].defautIcon,n[o].nowIcon=n[o].defautIcon,t)t[i].seatId===n[e].seatId&&t.splice(i,1);for(var r in t)t[r].seatId===n[o].seatId&&t.splice(r,1)}else for(var a in n[e].nowIcon=n[e].defautIcon,t)t[a].seatId===n[e].seatId&&t.splice(a,1);this.selectedSeat=t,this.seatList=n},processUnSelected:function(t){var n=this.selectedSeat,o=this.seatList,r=o[t].otherLoveSeatIndex;if(null!==r){if(n.length>=this.maxSelect-1)return void e.showToast({title:"最多只能选择"+this.maxSelect+"个座位哦~",icon:"none",duration:2e3});o[t].nowIcon=o[t].selectedIcon,o[r].nowIcon=o[r].selectedIcon,o[t].orgIndex=t,o[r].orgIndex=r;var a=i({},o[t]),s=i({},o[r]);n.push(a),n.push(s)}else{if(n.length>=this.maxSelect)return void e.showToast({title:"最多只能选择"+this.maxSelect+"个座位哦~",icon:"none",duration:2e3});o[t].nowIcon=o[t].selectedIcon,o[t].orgIndex=t;var c=i({},o[t]);n.push(c)}this.selectedSeat=n,this.seatList=o,this.hidden=""},confirmHandle:function(){var t=this;if(0!==t.selectedSeat.length){var n=t.selectedSeat.every((function(e,n,o){return t.checkSeat(e,t.selectedSeat)}));if(n){if(0===t.totalPrice)return void e.showToast({title:"座位锁定失败~,金额为0",icon:"none",duration:2e3});e.showLoading({title:"加载中"}),t.createOrder()}else e.showToast({title:"请不要留下空位~",icon:"none",duration:2e3})}else e.showToast({title:"请至少选择一个座位~",icon:"none",duration:2e3})},checkSeat:function(e,t){var n=2+t.length-1,o=e.rowNo,i=e.columnNo,r=e.otherLoveSeatIndex;if(null!=r)return!0;var a=this.checkSeatDirection(o,i,n,"-",t);if("special"===a)return!0;var s=this.checkSeatDirection(o,i,n,"+",t);return"special"===s||("normal"===s&&"normal"===a||"fail"!==s&&"fail"!==a)},checkSeatDirection:function(e,t,n,o,i){for(var r=this,a=0,s=1,c=function(n){var c=void 0;if("-"===o?c=r.seatList.find((function(o){return o.rowNo===e&&o.columnNo===t-n})):"+"===o&&(c=r.seatList.find((function(o){return o.rowNo===e&&o.columnNo===t+n}))),s===n){if(void 0===c)return{v:"special"};if(c.nowIcon===c.soldedIcon||c.nowIcon===c.fixIcon)return{v:"special"};var l=!1;for(var h in i)if(i[h].seatId===c.seatId){s++,l=!0;break}if(l)return"continue"}else{if(void 0===c)return{v:"fail"};if(c.nowIcon===c.soldedIcon||c.nowIcon===c.fixIcon)return{v:"fail"};for(var u in i)if(i[u].seatId===c.seatId)return{v:"fail"}}if(a++,a>=2)return{v:"normal"}},l=1;l<=n;l++){var h=c(l);switch(h){case"continue":continue;default:if("object"===typeof h)return h.v}}},createOrder:function(){var t=this,n=[],o=t.selectedSeat;if(o)for(var i=0;i<o.length;i++)n.push(o[i].seatId);var r=n.join(","),a=JSON.stringify({showId:t.showId,seatIds:r}),s="get_film_movie_order_check",c="films";this.$utils.postNew(s,a,c).then((function(n){1==n.sta?0==n.rs.errCode?e.navigateTo({url:"/pagesub/CinemaTicket/CinemaTicketHomeOrder?showId=".concat(t.showId,"&seatIds=").concat(r)}):e.showToast({title:n.rs.errMessage,icon:"none",duration:2e3}):e.showToast({title:n.msg,icon:"none",duration:2e3})}))},creatBestSeat:function(){var e=parseInt(this.maxX/2)+1,t=Math.round(.618*this.maxY);this.bestX=e,this.bestY=t,this.loadComplete=!0},creatSeatMap:function(){var e=this.seatList,t={};for(var n in e){var o=e[n].rowNo;if(o in t)e[n].orgIndex=n,t[o].push(e[n]);else{var i=[];e[n].orgIndex=n,i.push(e[n]),t[o]=i}}this.seatMap=t},quickSeat:function(t){for(var o,i=parseInt(t.currentTarget.dataset.num),r=this,a=this,s=[],c=r.maxY;c>0;c--)if(o=r.seatMap[c],void 0!==o){var l=a.seachBestSeatByRow(o,i);null!=l&&s.push(l)}if(s.length<=0)e.showToast({title:"没有合适的座位~",icon:"none",duration:2e3});else{var h=0;s.reduce((function(e,t,n,o){if(Array.isArray(e)){var a=Math.abs((e[0].columnNo+e[i-1].columnNo)/2-r.bestX),s=Math.abs(e[0].rowNo-r.bestY);e=Math.sqrt(Math.pow(a,2)+Math.pow(s,2))}var c=Math.abs((t[0].columnNo+t[i-1].columnNo)/2-r.bestX),l=Math.abs(t[0].rowNo-r.bestY),u=Math.sqrt(Math.pow(c,2)+Math.pow(l,2));return u>=e?e:(h=n,u)}));var u,f=[],d=n(s[h]);try{for(d.s();!(u=d.n()).done;){var v=u.value;if(null!==v.otherLoveSeatId){var m,p=!1,w=n(f);try{for(w.s();!(m=w.n()).done;){var I=m.value;if(v.seatId===I){p=!0;break}}}catch(_){w.e(_)}finally{w.f()}if(p)continue;f.push(v.otherLoveSeatId)}a.processUnSelected(v.orgIndex)}}catch(_){d.e(_)}finally{d.f()}var S=r.selectedSeat,b=0;for(var g in S){var y=parseFloat(S[g].price);b+=y}this.totalPrice=b}},seachBestSeatByRow:function(e,t){var n=[],o=[],i=[];return i=this.checkSeatMiddle(e,t),n=this.checkSeatWithDirection(e,t,"-"),o=this.checkSeatWithDirection(e,t,"+"),i.length===t?i:n.length===t&&o.length===t?Math.abs(n[0].columnNo-this.bestX)>Math.abs(o[0].columnNo-this.bestX)?o:n:n.length===t?n:o.length===t?o:null},checkSeatMiddle:function(e,t){var n=this,o=[],i=!1,r=t>2?t-2:t-1;if(t===this.maxX)r-=1;else if(t>this.maxX)return o;var a=function(t){var r=e.find((function(e){return parseInt(e.columnNo)===n.bestX+t}));return void 0===r?"break":r.nowIcon===r.soldedIcon||r.nowIcon===r.fixIcon?(o=[],i=!1,"continue"):(null!==r.otherLoveSeatId&&(i=!0),void o.push(r))};e:for(var s=-r;s<=r;s++){var c=a(s);switch(c){case"break":break e;case"continue":continue}}if(o.length>t){for(var l=0;l<r;l++){if(o.pop(),o.length===t)break;if(o.shift(),o.length===t)break}if(this.preCheckSeatMakeEmpty(o))return[]}else{if(o.length<t)return[];if(this.preCheckSeatMakeEmpty(o))return[]}return i&&!this.checkLoveSeatIsDouble(o)?[]:o},checkSeatWithDirection:function(e,t,n){var o=this,i=t,r=3,a=[],s=!1,c=function(c){var l=void 0;return"-"===n?l=e.find((function(e){return parseInt(e.columnNo)===o.bestX-c})):"+"===n&&(l=e.find((function(e){return parseInt(e.columnNo)===o.bestX+c}))),void 0===l?(i++,r--,r<=0?"break":"continue"):l.nowIcon===l.soldedIcon||l.nowIcon===l.fixIcon?(i++,a=[],s=!1,"continue"):(null!==l.otherLoveSeatId&&(s=!0),a.push(l),a.length===t&&o.preCheckSeatMakeEmpty(a)?(i++,a.shift(),"continue"):void 0)};e:for(var l=0;l<i;l++){var h=c(l);switch(h){case"break":break e;case"continue":continue}}return s&&!this.checkLoveSeatIsDouble(a)?[]:a},checkLoveSeatIsDouble:function(e){var t,o=new Set,i=new Set,r=n(e);try{for(r.s();!(t=r.n()).done;){var s=t.value;o.add(s.seatId)}}catch(d){r.e(d)}finally{r.f()}var c,l=n(e);try{for(l.s();!(c=l.n()).done;){var h=c.value;null!==h.otherLoveSeatId&&i.add(h.otherLoveSeatId)}}catch(d){l.e(d)}finally{l.f()}var u=o.size,f=new Set([].concat(a(o),a(i))).size;return u===f},preCheckSeatMakeEmpty:function(e){var t=this,n=e.every((function(n,o,i){return t.checkSeat(n,e)}));return!n},clickShow:function(){this.isShow=!this.isShow},clickTimes:function(e){var t=e.currentTarget.dataset.showid;this.showId=t,this.isShow=!1,this.getFilmShowSeats()}}};t.default=f}).call(this,n("543d")["default"])},c015:function(e,t,n){},c549:function(e,t,n){"use strict";n.r(t);var o=n("bc28"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},ce15:function(e,t,n){"use strict";n.r(t);var o=n("2b98"),i=n("c549");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("3365");var a,s=n("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=c.exports},dce6:function(e,t,n){"use strict";(function(e){n("334b");o(n("66fd"));var t=o(n("ce15"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["dce6","common/runtime","common/vendor"]]]);