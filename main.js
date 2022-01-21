import Vue from 'vue'
import App from './App'
import Navgation from './wxcomponents/navgation/navgation.vue'
import Address from './components/simple-address/simple-address.vue'
import { buttonClick } from './common/btn'
import utils from './common/utils' 
import sr from 'sr-sdk-wxapp'
import umtrack from 'umtrack-wx';

Vue.prototype.$buttonClick = buttonClick;
Vue.prototype.$utils = utils;
Vue.config.productionTip = false

Vue.component('Navgation',Navgation);
Vue.component('Address',Address);

App.mpType = 'app'

umtrack.init({
	      appKey: '61e8f376e014255fcbf95a31', //由友盟分配的APP_KEY
	      // 使用Openid进行统计，此项为false时将使用友盟+uuid进行用户统计。
	      // 使用Openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用Openid。
	      useOpenid: true,
	      // 使用openid进行统计时，是否授权友盟自动获取Openid，
	      // 如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
	      autoGetOpenid: true,
	      debug: true, //是否打开调试模式
	      uploadUserInfo: true // 自动上传用户信息，设为false取消上传，默认为false
})

sr.init({
    /**
     * 有数 - ka‘接入测试用’ 分配的 app_id，对应的业务接口人负责
     */
    token: 'bie68b7781dc3f49f4',
  
    /**
     * 微信小程序appID，以wx开头
     */
    appid: 'wx9c53a99b078435f5',
  
    /**
     * 如果使用了小程序插件，需要设置为 true
     */
    usePlugin: false,
  
    /**
     * 开启打印调试信息， 默认 false
     */
    debug: true,
  
    /**
     * 建议开启-开启自动代理 Page， 默认 false
     * sdk 负责上报页面的 browse 、leave、share 等事件
     * 可以使用 sr.page 代替 Page(sr.page(options))
     * 元素事件跟踪，需要配合 autoTrack: true
     */
    proxyPage: true,
    /**
     * 建议开启-开启组件自动代理， 默认 false
     * sdk 负责上报页面的 browse 、leave、share 等事件
     */
    proxyComponent: true,
    // 建议开启-是否开启页面分享链路自动跟踪
    openSdkShareDepth: true,
    // 建议开启-元素事件跟踪，自动上报元素事件，入tap、change、longpress、confirm
    autoTrack: true,
    //建议开启-自动化获取openId，授权过的小程序可自动化获取openId
    openAutoTrackOpenId: true,
  })
  
const app = new Vue({
   ...App,
  sr,
  umtrack
})
app.$mount()
