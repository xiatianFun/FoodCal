"use strict";function t(t){n(wx.request,t)}function n(t,n){var e=n.success,i=n.fail,r=!1,o=null;n.success=function(t){if(!r){o&&clearTimeout(o);"function"==typeof e&&e(t)}};n.fail=function(){if(!r){o&&clearTimeout(o);"function"==typeof i&&i()}};t(n);o=setTimeout(()=>{o&&clearTimeout(o);r=!0;"function"==typeof i&&i(r)},n.timeout||Z)}function e(n){try{t(n)}catch(t){H().e("请求失败: "+t)}}function i(t){return ht.encode(t,!1)}function r(t){return ht.decode(t)}function o(t){for(var n="",e=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],i=0;i<Number(t);i++)n+=e[Math.round(Math.random()*(e.length-1))];return n}function u(t){return!Number.isNaN(parseInt(t,10))}function a(t,n){for(var e=String(t).split("."),i=String(n).split("."),r=0;r<Math.max(e.length,i.length);r++){var o=parseInt(e[r]||0,10),u=parseInt(i[r]||0,10);if(o>u)return 1;if(o<u)return-1}return 0}function c(t){return JSON.parse(JSON.stringify(t))}function s(t,n){return!(!t||!n||0===n.length||n.length>t.length)&&t.substr(0,n.length)===n}function f(t,n){return!(!n||0===t.length||n.length>t.length)&&t.substring(t.length-n.length)===n}function p(t){if(void 0===t||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),e=1;e<arguments.length;e++){var i=arguments[e];if(i)for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])}return n}function l(t,n){if(t===n)return!0;if(t&&"object"==typeof t&&n&&"object"==typeof n){if(Object.keys(t).length!==Object.keys(n).length)return!1;for(var e in t){if(Object.prototype.hasOwnProperty.call(n,e))return!1;if(!l(t[e],n[e]))return!1}return!0}return!1}function d(t,n){if(!t)return"";if("string"==typeof n&&n.length){var e=new RegExp("^"+n+"*");t=t.replace(e,"")}else t=t.replace(/^s*/,"");return t}function h(t,n){if(!t)return"";var e,i;if("string"==typeof n&&n.length){e=new RegExp(n);i=t.length;for(;e.test(t.charAt(i));)i-=1;return t.slice(0,i+1)}e=/s/;i=t.length-1;for(;e.test(t.charAt(i));)i-=1;return t.slice(0,i+1)}function g(t){var n=null;switch(t){case Ut.HALF_SESSION:n=v();break;case Ut.CLOSE_SESSION:n=_();break;case Ut.EKV:n=y()}return n}function v(){var t=null,n=Lt().cloneCurrentSession();n&&(t={header:{st:"1"},analytics:{sessions:[n]}});return t}function _(){var t=null,n={},e=Lt().cloneCurrentSession();if(e){var i=B().get(),r=yt().get();Array.isArray(i)&&i.length&&(e.pages=gt.clone(i));Array.isArray(r)&&r.length&&(e.shares=gt.clone(r));B().clear();yt().clear();n.sessions=[e]}var o=St().getEkvs();if(o){n.ekvs=gt.clone(o);St().clear()}(n.sessions||n.ekvs)&&(t={analytics:n});return t}function y(){var t=null,n=St().getEkvs();if(n){t={analytics:{ekvs:gt.clone(n)}};St().clear()}return t}function m(t){return{h:E(t.header,Dt),a:S(t.analytics,Ct)}}function E(t,n){var e=I(t,n);t&&t.id_tracking&&(e[n.id_tracking||"id_tracking"]=I(t.id_tracking,bt));return e}function I(t,n){var e={};for(var i in t)n[i]?e[n[i]]=t[i]:e[i]=t[i];return e}function S(t,n){var e={};if(t)for(var i in t)t[i]&&(e[n[i]]=t[i]);return e}function T(t,n,i,r){kt.instance().setIdType(vt().getIdType());kt.instance().setIdTracking(vt().getIdTracking());var o=vt().getUserId();o&&t.analytics&&(t.analytics.active_user={puid:o,provider:vt().getProvider()});var u=gt.clone(kt.instance().get());t.header=gt.assign(u,t.header,{ts:Date.now(),testToken:Vt().getToken(),traceId:gt.getRandomStr(10)+Date.now()+gt.getRandomStr(9)});var a=m(t),c=q.stringify(a),s={url:W.LOG_URL,method:"POST",data:gt.base64Encode(c),success:function(e){var r=e.code||e.status||e.statusCode;if(200===r||413===r){H().i("数据发送成功: ",t,c);N((e.data||{}).imprint);"function"==typeof n&&n(e)}else{H().w("数据发送失败: ",c);"function"==typeof i&&i()}},fail:function(t){H().w("超时: ",c);"function"==typeof i&&i()},complete:function(){"function"==typeof r&&r()}};e(gt.assign(s,O()))}function N(t){if(t){J().set(W.IMPRINT,t);kt.instance().setItem(W.IMPRINT,t);var n=q.parse(gt.base64Decode(t));H().v("imprint: %o",n);var e=n.report_policy;if(e&&gt.isNumber(e)){J().set(W.REPORT_POLICY,e);if(e===W.REPORT_POLICY_INTERVAL){var i=n.report_interval;if(i&&gt.isNumber(i)){i<=W.EVENT_SEND_MIN_INTERVAL?i=W.EVENT_SEND_MIN_INTERVAL:i>W.EVENT_SEND_MAX_INTERVAL&&(i=W.EVENT_SEND_MAX_INTERVAL);J().set(W.REPORT_INTERVAL_TIME,i)}}}n.ttn_invalid&&Vt().clear()}}function O(){;"wxmp/json";return{header:{"Content-Type":"wxmp/json","Msg-Type":"wxmp/json"}}}function A(t){var n=t,e=[];this.enqueue=function(t){"number"==typeof n&&this.size()>=n&&this.dequeue();e.push(t)};this.dequeue=function(){return e.shift()};this.front=function(){return e[0]};this.isEmpty=function(){return 0===e.length};this.clear=function(){e.length=0};this.size=function(){return e.length};this.items=function(){return e};this.print=function(){console.log(e.toString())}}function R(t,n){this.id=t;this.ts=Date.now();var e=typeof n;if("string"===e&&n)this[t]=n;else if("object"===e)for(var i in n)({}).hasOwnProperty.call(n,i)&&(this[i]=n[i])}function w(){function t(){vt().init(function(){kt.instance().init();H().v("Header初始化成功")})}function n(t,n){return"number"!=typeof o||"number"!=typeof n||(o<=0||t-o>n)}function e(t,n){if(!t||"string"!=typeof t){H().e('please check trackEvent id. id should be "string" and not null');return!1}var e=["id","ts","du"],i={};e.forEach(function(t){i[t]=1});if(i[t]){H().e("eventId不能与以下保留字冲突: "+e.join(","));return!1}if(t.length>W.MAX_EVENTID_LENGTH){H().e("The maximum length of event id shall not exceed "+W.MAX_EVENTID_LENGTH);return!1}if(n&&("object"!=typeof n||Array.isArray(n))&&"string"!=typeof n){H().e("please check trackEvent properties. properties should be string or object(not include Array)");return!1}if("object"==typeof n){var r=0;for(var o in n)if({}.hasOwnProperty.call(n,o)){if(o.length>W.MAX_PROPERTY_KEY_LENGTH){H().e("The maximum length of property key shall not exceed "+W.MAX_PROPERTY_KEY_LENGTH);return!1}if(r>=W.MAX_PROPERTY_KEYS_COUNT){H().e("The maximum count of properties shall not exceed "+W.MAX_PROPERTY_KEYS_COUNT);return!1}if(i[o]){H().e("属性中的key不能与以下保留字冲突: "+e.join(","));return!1}r+=1}}return!0}var i=!1,r=!1,o=0;this.init=function(n){H().v("sdk version: "+W.IMPL_VERSION);i?H().v("Lib重复实例化"):J().load(function(){H().v("cache初始化成功: ",J().getAll());t();i=!0;"function"==typeof n&&n();H().tip("SDK集成成功")})};this.resume=function(t){function n(t,e,i){vt().getId()||t<=0||vt().getOpenIdAsync({success:function(t){H().v("获取openid成功: %s",t);i.setOpenid(t)},fail:function(){H().v("获取openid失败,启动重试,剩余可用次数",t-1);setTimeout(function(){n(t-1,e,i)},e)}})}if(i&&!r){H().v("showOptions: ",t);var e=this;r=!0;var o=Lt().resume(t),u=Lt().getCurrentSessionId();St().setSessionId(u);Vt().init(function(){jt().load();o&&jt().add(Ut.HALF_SESSION,{},function(){X().useOpenid()&&X().autoGetOpenid()&&!vt().getId()?n(10,3e3,e):jt().send()})})}};this.pause=function(){if(i){r=!1;o=0;Lt().pause();X().uploadUserInfo()&&Ft().update();jt().send(Ut.CLOSE_SESSION,{},function(){jt().save();J().save();H().v("cache save success")})}};this.setOpenid=function(t){H().v("setOpenId: %s",t);vt().setOpenid(t);jt().send()};this.setUnionid=function(t){H().v("setUnionid: %s",t);vt().setUnionid(t)};this.setUserid=function(t,n){H().v("setUserid: %s",t,n);vt().setUserid(t,n)};this.trackEvent=function(t,r){if(i){H().v("event: ",t,r);if(e(t,r)){var u=new R(t,r);St().addEvent(u);var a=!!Vt().getToken(),c=a?0:W.EVENT_SEND_DEFAULT_INTERVAL,s=Date.now();if(n(s,c)){o=s;jt().send(Ut.EKV,{noCache:a},function(){})}}}};this.trackShare=function(t){if(i){try{t=yt().add(t);H().v("sharePath: ",t.path)}catch(t){H().v("shareAppMessage: ",t)}return t}};this.trackPageStart=function(t){i&&B().addPageStart(t)};this.trackPageEnd=function(t){i&&B().addPageEnd(t)}}function P(){}function k(t,n){if(t>=Kt.length||n){n&&U();n&&H().v("命中可用服务",Kt[Ht]);!n&&H().tip_w("未命中可用服务");return!1}e({url:Kt[t]+"/uminiprogram_logs/ckdh",success:function(n){if(200===(n.code||n.status||n.statusCode)&&n.data&&200===n.data.code){Ht=t;k(t+1,!0)}else k(t+1,!1)},fail:function(){k(t+1,!1)}})}function U(){var t="https://umini.shujupie.com";W.LOG_URL=W.LOG_URL.replace(t,Kt[Ht]);W.GET_OPENID_URL=W.GET_OPENID_URL.replace(t,Kt[Ht]);W.USERINFO_URL=W.USERINFO_URL.replace(t,Kt[Ht])}function L(t){setTimeout(()=>{k(0,!1)},t)}function C(t,n){if(!t)return"";var e=[];for(var i in n)"_um_ssrc"!==i&&"_um_sts"!==i&&e.push(i+"="+n[i]);var r=e.join("&");return r?t+"?"+r:t}function D(t,n,e){var i=t[n];t[n]=function(t){e.call(this,t);i&&i.call(this,t)}}function b(t){if(t.onShareAppMessage){var n=t.onShareAppMessage;t.onShareAppMessage=function(t){var e=n.call(this,t)||{},i=Xt.getCurrentFullPath();!e.path&&i&&(e.path=i);return Bt.trackShare.call(this,e)}}}function x(t,n){try{Bt.init(t)}catch(t){H().v("onAppLaunch: ",t)}}function M(t){try{Bt.resume(t)}catch(t){H().v("onAppShow: ",t)}}function V(){try{Bt.pause()}catch(t){H().v("onAppHide: ",t)}}function j(t){try{Xt.setCurrentPath(this.route);t&&Xt.setCurrentPageQuery(this.route,t)}catch(t){H().v("onPageLoad: ",t)}}function F(){try{Xt.setCurrentPath(this.route);Bt.trackPageStart(this.route)}catch(t){H().v("onPageShow: ",t)}}function G(){try{Bt.trackPageEnd(this.route)}catch(t){H().v("onPageHide: ",t)}}var K="[UMENG] -- ",H=function(){function t(){this.setDebug=function(t){e=t};this.d=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=K+arguments[0]);console.debug.apply(console,arguments)}catch(t){}};this.i=function(){try{if(e)try{"string"==typeof arguments[0]&&(arguments[0]=K+arguments[0]);console.info.apply(console,arguments)}catch(t){}}catch(t){}};this.e=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=K+arguments[0]);console.error.apply(console,arguments)}catch(t){}};this.w=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=K+arguments[0]);console.warn.apply(console,arguments)}catch(t){}};this.v=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=K+arguments[0]);console.log.apply(console,arguments)}catch(t){}};this.t=function(){if(e)try{console.table.apply(console,arguments)}catch(t){}};this.tip=function(){try{"string"==typeof arguments[0]&&(arguments[0]=K+arguments[0]);console.log.apply(console,arguments)}catch(t){}};this.tip_w=function(t){try{console.log("%c "+K+t,"background:red; padding: 4px; padding-right: 8px; border-radius: 4px; color: #fff;")}catch(t){}};this.err=function(){try{"string"==typeof arguments[0]&&(arguments[0]=K+arguments[0]);console.error.apply(console,arguments)}catch(t){}}}var n=null,e=!1;return function(){null===n&&(n=new t);return n}}(),Y={set:function(t,n,e){var i,r={key:t,success:function(t){"function"==typeof e&&e(t)},fail:function(){"function"==typeof e&&e()}};r.data=n;i=wx.setStorage;try{i&&i(r)}catch(t){H.e("存储错误",t)}},get:function(t,n){var e;e=wx.getStorage;try{e&&e({key:t,success:function(t){"function"==typeof n&&n(t.data)},fail:function(e){H().w(t+": "+e.errMsg);"function"==typeof n&&n()}})}catch(t){H.e("获取storage错误",t)}},remove:function(t,n){var e;e=wx.removeStorage;try{e&&e({key:t,success:function(){"function"==typeof n&&n(!0)},fail:function(){"function"==typeof n&&n(!1)}})}catch(t){H.e("删除storage错误",t)}}},q={stringify:function(t){if(t)try{return JSON.stringify(t)}catch(t){}return""},parse:function(t){if(t)try{return JSON.parse(t)}catch(t){}return null},parseToArray:function(t){if(t)try{return JSON.parse(t)}catch(t){}return[]}},X=function(){function t(){var t={};this.useOpenid=function(){return t.useOpenid};this.autoGetOpenid=function(){return t.autoGetOpenid};this.appKey=function(){return t.appKey};this.uploadUserInfo=function(){return t.uploadUserInfo};this.set=function(n){t=n};this.get=function(){return t};this.setItem=function(n,e){t[n]=e};this.getItem=function(n){return t[n]}}var n=null;return function(){n||(n=new t);return n}}(),J=function(){function t(){this.load=function(t){if(i){Y.remove(e);t()}else{e="um_cache_"+X().appKey();Y.get(e,function(n){i=q.parse(n)||{};r=!0;Y.remove(e);t()})}};this.save=function(){i&&Y.set(e,q.stringify(i))};this.set=function(t,n){i&&(i[t]=n)};this.get=function(t){return(i||{})[t]};this.remove=function(t){i&&i[t]&&delete i[t]};this.getAll=function(){return i};this.clear=function(){i=null};this.has=function(t){return!!this.get(t)};this.isLoaded=function(){return r}}var n=null,e="",i=null,r=!1;return function(){n||(n=new t);return n}}(),Q="",W={SESSION_INTERVAL:3e4,LOG_URL:Q="https://umini.shujupie.com/wxm_logs",GET_OPENID_URL:"https://umini.shujupie.com/uminiprogram_logs/wx/getuut",USERINFO_URL:"https://umini.shujupie.com/uminiprogram_logs/comm/uif",DEVICE_INFO_KEY:"device_info",ADVERTISING_ID:"mobile_ad_id",ANDROID_ID:"android_id",CURRENT_SESSION:"current_session",SESSION_PAUSE_TIME:"session_pause_time",EVENT_SEND_DEFAULT_INTERVAL:15e3,EVENT_LAST_SEND_TIME:"last_send_time",MAX_EVENTID_LENGTH:128,MAX_PROPERTY_KEY_LENGTH:256,MAX_PROPERTY_KEYS_COUNT:100,REPORT_POLICY:"report_policy",REPORT_INTERVAL_TIME:"report_interval_time",REPORT_POLICY_START_SEND:"1",REPORT_POLICY_INTERVAL:"6",IMPRINT:"imprint",SEED_VERSION:"1.0.0",IMPL_VERSION:"2.3.6",ALIPAY_AVAILABLE_VERSION:"10.1.52",SHARE_PATH:"um_share_path",SHARES:"shares",REQUESTS:"requests",UUID:"um_uuid",UUID_SUFFIX:"ud",OPENID:"um_od",UNIONID:"um_unid",ALIPAYID:"um_alipayid",USERID:"um_userid",PROVIDER:"um_provider",LAUNCH_OPTIONS:"LAUNCH_OPTIONS",UM_SSRC:"_um_ssrc",USER_INFO:"user_info",IS_ALIYUN:!1,ALIYUN_URL:"serverless.huoban.youmeng.network.forward"},z={getUserInfo:function(t){wx.getSetting({success(n){n.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(n){t(n&&n.userInfo)},fail:function(){t({})}}):t({})},fail(){t({})}})},getSystemInfo:function(t,n){wx.getSystemInfo({success:function(n){"function"==typeof t&&t(n)},fail:function(){"function"==typeof n&&n()}})},getDeviceInfo:function(t){"function"==typeof t&&t()},checkNetworkAvailable:function(t){var n={success:function(n){var e=!1;e="none"!==n.networkType;"function"==typeof t&&t(e)},fail:function(){"function"==typeof t&&t()}};wx.getNetworkType(n)},getNetworkInfo:function(t,n){var e={success:function(n){"function"==typeof t&&t(n)},fail:function(){"function"==typeof n&&n()}};wx.getNetworkType(e)},getDeviceId:function(t,n){try{"function"==typeof t&&t("")}catch(t){H().e("getDeviceId error",t)}},getAdvertisingId:function(t,n){"function"==typeof t&&t("")},getPageName:function(){},onNetworkStatusChange:function(t){wx.onNetworkStatusChange(function(n){"function"==typeof t&&t(n.isConnected||!0)})}},B=function(){function t(){var t=!1,n=null,e=[];this.addPageStart=function(e){if(e&&!t){n={ts:Date.now(),path:e,page_name:e};t=!0}};this.addPageEnd=function(i){if(t&&i&&n&&i===n.page_name){var r=Date.now()-n.ts;n.duration=Math.abs(r);e.push(n);n=null;t=!1}};this.get=function(){return e};this.getCurrentPage=function(){return n};this.clear=function(){e.length=0}}var n=null;return function(){n||(n=new t);return n}}(),Z=5e3,$="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",tt=function(t){for(var n={},e=0,i=t.length;e<i;e++)n[t.charAt(e)]=e;return n}($),nt=String.fromCharCode,et=function(t){if(t.length<2)return(n=t.charCodeAt(0))<128?t:n<2048?nt(192|n>>>6)+nt(128|63&n):nt(224|n>>>12&15)+nt(128|n>>>6&63)+nt(128|63&n);var n=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return nt(240|n>>>18&7)+nt(128|n>>>12&63)+nt(128|n>>>6&63)+nt(128|63&n)},it=function(t){return t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,et)},rt=function(t){var n=[0,2,1][t.length%3],e=t.charCodeAt(0)<<16|(t.length>1?t.charCodeAt(1):0)<<8|(t.length>2?t.charCodeAt(2):0);return[$.charAt(e>>>18),$.charAt(e>>>12&63),n>=2?"=":$.charAt(e>>>6&63),n>=1?"=":$.charAt(63&e)].join("")},ot=function(t){return t.replace(/[\s\S]{1,3}/g,rt)},ut=function(t){return ot(it(t))},at=function(t,n){return n?ut(String(t)).replace(/[+\/]/g,function(t){return"+"==t?"-":"_"}).replace(/=/g,""):ut(String(t))},ct=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),st=function(t){switch(t.length){case 4:var n=((7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3))-65536;return nt(55296+(n>>>10))+nt(56320+(1023&n));case 3:return nt((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return nt((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},ft=function(t){return t.replace(ct,st)},pt=function(t){var n=t.length,e=n%4,i=(n>0?tt[t.charAt(0)]<<18:0)|(n>1?tt[t.charAt(1)]<<12:0)|(n>2?tt[t.charAt(2)]<<6:0)|(n>3?tt[t.charAt(3)]:0),r=[nt(i>>>16),nt(i>>>8&255),nt(255&i)];r.length-=[0,0,2,1][e];return r.join("")},lt=function(t){return t.replace(/[\s\S]{1,4}/g,pt)},dt=function(t){return ft(lt(t))},ht={encode:at,decode:function(t){return dt(String(t).replace(/[-_]/g,function(t){return"-"==t?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))}},gt={base64Encode:i,base64Decode:r,isNumber:u,compareVersion:a,getRandomStr:o,clone:c,startsWith:s,endsWith:f,assign:p,deepEqual:l,trimStart:d,trimEnd:h},vt=function(){function t(){function t(){return gt.getRandomStr(10)+Date.now()+gt.getRandomStr(7)+W.UUID_SUFFIX}var n="",i="",r="",o="",u="",a="";this.init=function(e){a=X().useOpenid()?"openid":"uuid";Y.get(W.UUID,function(o){if(o)n=o;else{n=t();Y.set(W.UUID,n)}X().useOpenid()?Y.get(W.OPENID,function(t){i=t;e&&e()}):e&&e();Y.get(W.UNIONID,function(t){r=t})})};Y.get(W.USERID,function(t){!o&&t&&(o=t)});Y.get(W.PROVIDER,function(t){!u&&t&&(u=t)});this.getOpenIdAsync=function(t){wx.login({success:function(n){n.code?e({url:W.GET_OPENID_URL,method:"GET",data:{key:X().appKey(),code:n.code},success:function(n){if(n&&200===n.statusCode&&n.data&&n.data.data){var e=n.data.data;return t.success&&t.success(e.oid,e.uid)}t.fail&&t.fail()},fail:function(){t.fail&&t.fail()}}):t.fail&&t.fail()},fail:function(){t.fail&&t.fail()}})};this.getIdType=function(){return a};this.getIdTracking=function(){var t={};n&&(t.uuid=n);i&&(t.openid=i);r&&(t.unionid=r);o&&(t.userid=o);return t};this.setOpenid=function(t){if(t&&t!==i){i=t;Y.set(W.OPENID,t)}};this.setUnionid=function(t){if(!r&&t){r=t;Y.set(W.UNIONID,t)}};this.setUserid=function(t,n){if(t&&t!==o){o=t;Y.set(W.USERID,t);u=n;Y.set(W.PROVIDER,n)}};this.getId=function(){return X().useOpenid()?i:n};this.getUserId=function(){return o};this.getProvider=function(){return u}}var n=null;return function(){n||(n=new t);return n}}(),_t=3,yt=function(){function t(){return{add:function(t){H().v("share origin: %o",t);var n={title:t&&t.title,path:t&&t.path&&t.path.split("?")[0],_um_sts:Date.now()};n.path&&n.path.length>1&&gt.startsWith(n.path,"/")&&(n.path=gt.trimStart(n.path,"/"));var r=t.path||"",o=vt().getId();if(o){var u=i.split(","),a=(u=u.filter(function(t){return t.length>0})).indexOf(o);a>=0&&(u=u.slice(0,a));u.length<_t&&u.push(o);var c=u.join(",");-1!==r.indexOf("?")?r+="&_um_ssrc="+c:r+="?_um_ssrc="+c;var s=Date.now();r+="&_um_sts="+s;t.path&&(t.path=r);n._um_ssrc=c;n._um_sts=s}e.push(n);H().v("share: %o",t);return t},setShareSource:function(t){i=t},clear:function(){e.length=0},get:function(){return e}}}var n=null,e=[],i="";return function(){n||(n=new t);return n}}(),mt="ekvs",Et=1e4,It=1,St=function(){function t(){if(u.length){var t=J().get(mt);if(e(t)+u.length<=Et){t=n(t,u);J().set(mt,t)}}}function n(t,n){var e=(t=t||{})[o];Array.isArray(e)&&e.length?t[o]=e.concat(n):t[o]=[].concat(n);return t}function e(t){var n=0;for(var e in t)Array.isArray(t[e])&&(n+=t[e].length);return n}function i(){return{addEvent:function(n){if(o){u.unshift(n);if(u.length>It){t(o);u.length=0}}else{H().w("session id is null: ",o);a.unshift(n)}},setSessionId:function(t){o=t;H().v("setSessionId: ",o);if(Array.isArray(a)&&a.length&&o){for(var n=0;n<a.length;n++)this.addEvent(a[n]);a.length=0}},getEkvs:function(){var t=J().get(mt);u&&u.length&&(t=n(t,u));return t},clear:function(){J().remove(mt);u.length=0}}}var r,o,u=[],a=[];return function(){r||(r=i());return r}}(),Tt={getClipboard:function(t){var n;n=wx.getClipboardData;try{n&&n({success:function(n){var e=n.data;"function"==typeof t&&t(e)},fail:function(){"function"==typeof t&&t("")}})}catch(t){H.e("读取clipboard发生错误",t)}},showModal:function(t){var n;n=wx.showModal;try{n&&n(t)}catch(t){H.e("展示Modal时发生错误",t)}},showToast:function(t){var n;n=wx.showToast;try{n&&n(t)}catch(t){H.e("showToast error",t)}},getUserInfo:function(t){var n,e={fail:function(){t&&t()}};n=wx.getUserInfo;e.success=function(n){if(n&&n.userInfo){var e=n.userInfo;t&&t({avatar:e.avatarUrl,nickName:e.nickName,gender:e.gender,country:e.country,province:e.province,city:e.city,language:e.language})}};try{wx.getSetting({success:function(t){t.authSetting["scope.userInfo"]&&n&&n(e)},fail:function(){t()}})}catch(t){H.e("showToast error",t)}},getAppInfoSync:function(){var t=wx.getAccountInfoSync(),n=t&&t.miniProgram?t.miniProgram:{};return{appId:n.appId,appEnv:n.envVersion,appVersion:n.version}}},Nt="2g",Ot="3g",At="4g",Rt="none",wt=" ",Pt=["access","access_subtype"],kt=function(){function t(){function t(t){z.getSystemInfo(function(i){z.getNetworkInfo(function(o){var u=(o=o||{}).type||o.networkType;u===Rt&&(u="unknown");var a=J().get(W.IMPRINT);a&&(r.imprint=a);n(i,u);e(i);t&&t()})})}function n(t,n,e){r.userInfo=e;r.device_type="Phone";r.sdk_version=W.IMPL_VERSION;r.appkey=X().appKey();if(t){var i,o,u,a=t.model||"",c=(t.product,t.platform||""),s=t.brand||"",f=s.toLowerCase();r.platform_sdk_version=t.SDKVersion;r.platform_version=t.version;u=(i=Math.round(t.screenWidth*t.pixelRatio))>(o=Math.round(t.screenHeight*t.pixelRatio))?i+"*"+o:o+"*"+i;r.os=c;r.font_size_setting=t.fontSizeSetting;r.device_model=a;r.device_brand=s;r.device_manufacturer=f;r.device_manuid=a.toLowerCase().indexOf(f)>-1?a:f+wt+a;r.device_name=a.toLowerCase().indexOf(f)>-1?a:f+wt+a;r.os_version=t.system;r.resolution=u;r.language=t.language}switch(n=n?n.toLowerCase():""){case At:r.access_subtype="LTE";r.access="4G";break;case Ot:r.access_subtype="CDMA";r.access="3G";break;case Nt:r.access_subtype="GRPS";r.access="2G";break;default:r.access=n;delete r.access_subtype}}function e(t){var n=[];if(t){n.push({name:"系统名",value:t.platform});n.push({name:"支付宝版本号",value:t.version})}n.push({name:"设备型号",value:r.device_model});n.push({name:"设备生产商",value:r.device_brand});n.push({name:"os版本号",value:r.os_version});n.push({name:"网络类型",value:r.access});n.push({name:"运营商",value:r.access_subtype});n.push({name:"分辨率",value:r.resolution});n.push({name:"screenWidth",value:t.screenWidth});n.push({name:"screenHeight",value:t.screenHeight});n.push({name:"pixelRatio",value:t.pixelRatio});for(var e="",i=0;i<n.length;i++){var o=n[i];e+=o.name+": "+o.value+"; "}H().v("调试辅助信息: ",e)}var i=!1,r={};r.sdk_type="wxmp";r.platform="wx";var o=Tt.getAppInfoSync();r.appid=o.appId;r.app_env=o.appEnv;r.app_version=o.appVersion;return{init:function(){t(function(){i=!0})},isLoaded:function(){return i},get:function(){return r},getSDKType:function(){return r.sdk_type},getPlatform:function(){return r.platform},getRealtimeFields:function(){var t={};Pt.forEach(function(n){t[n]=r[n]});return t},setIdTracking:function(t){this.setItem("id_tracking",t)},setIdType:function(t){this.setItem("id_type",t)},setItem:function(t,n){r[t]=n},getItem:function(t){return r[t]},updateExtraInfo:function(){z.getDeviceInfo(function(t){r.device_info=t||""})}}}var n=null;return{instance:function(){n||(n=t());return n}}}(),Ut={HALF_SESSION:"half_session",CLOSE_SESSION:"close_session",EKV:"ekv",ENTER_PAGE:"enter_page",LEAVE_PAGE:"leave_page"},Lt=function(){function t(){return{resume:function(t){var n=!1;u||(u=J().get(W.CURRENT_SESSION));var i=new Date;o=i.getTime();if(!u||!u.end_time||o-u.end_time>W.SESSION_INTERVAL){n=!0;e(t);H().v("开始新的session(%s): ",u.id,u)}else H().v("延续上一次session(%s): %s ",u.id,i.toLocaleTimeString(),u);return n},pause:function(){i()},getCurrentSessionId:function(){return(u||{}).id},getCurrentSession:function(){return u},cloneCurrentSession:function(){return gt.clone(u)}}}function n(t){var n={};for(var e in t)0===e.indexOf("_um_")&&(n[e]=t[e]);return n}function e(t){try{var e=(u||{}).options||{},i=gt.assign({},n(t.query));i.path=t.path||e.path;i.scene=t.scene?kt.instance().getPlatform()+"_"+t.scene:e.scene;var r=t.referrerInfo;r&&(i.referrerAppId=r.appId);H().v("session options: ",i);var o=i[W.UM_SSRC];o&&yt().setShareSource(o);var a=Date.now();u={id:gt.getRandomStr(10)+a,start_time:a,options:i}}catch(t){H().e("生成新session失败: ",t)}}function i(){if(u){var t=new Date;u.end_time=t.getTime();"number"!=typeof u.duration&&(u.duration=0);u.duration=u.end_time-o;J().set(W.CURRENT_SESSION,u);H().v("退出会话(%s): %s ",u.id,t.toLocaleTimeString(),u)}}var r=null,o=null,u=null;return function(){r||(r=t());return r}}(),Ct={sessions:"sn",ekvs:"e",active_user:"active_user"},Dt={sdk_type:"sdt",access:"ac",access_subtype:"acs",device_model:"dm",language:"lang",device_type:"dt",device_manufacturer:"dmf",device_name:"dn",platform_version:"pv",id_type:"it",font_size_setting:"fss",os_version:"ov",device_manuid:"did",platform_sdk_version:"psv",device_brand:"db",appkey:"ak",_id:"id",id_tracking:"itr",imprint:"imp",sdk_version:"sv",resolution:"rl",testToken:"ttn"},bt={uuid:"ud",unionid:"und",openid:"od",alipay_id:"ad",device_id:"dd",userid:"puid"},xt="_UMTEST_",Mt="TEST_TOKEN",Vt=function(){function t(){this.init=function(t){Tt.getClipboard(function(n){e=J().get(Mt);try{if(n&&gt.startsWith(n,xt)&&n.split(xt)[1]){var i=n.split(xt)[1],r=JSON.parse(i).token;if(r){e=r;J().set(Mt,r)}}}catch(t){H().v(t)}t(!!e)})};this.getToken=function(){return e};this.clear=function(){e="";J().remove(Mt)}}var n=null,e="";return function(){n||(n=new t);return n}}(),jt=function(){function t(n,e,i){if(kt.instance().isLoaded()){e=e||{};var r=g(n);if(r){var o=kt.instance().getRealtimeFields();r.header=gt.assign({},r.header,o);r.noCache=e.noCache;c.enqueue(r)}"function"==typeof i&&i()}else setTimeout(function(){t(n,e,i)},100)}function n(t){var i=c.front(),r=function(){c.dequeue();n(t)},o=function(){var e=c.dequeue();e&&!e.noCache&&a.push(e);n(t)};if(i)T(i,r,o);else{e();t()}}function e(){a.forEach(function(t){c.enqueue(t)});a.length=0}function i(t){if(vt().getId())if(u)H().i("队列正在发送中");else{u=!0;n(function(){u=!1;"function"==typeof t&&t()})}else{H().i("获取id标识失败，暂缓发送");"function"==typeof t&&t()}}function r(){this.send=function(t,n,e){t?this.add(t,n,function(){i(e)}):i(e)};this.add=function(n,e,i){t(n,e,i)};this.load=function(){var t=J().get(W.REQUESTS);t&&t.length&&t.forEach(function(t){c.enqueue(t)});J().remove(W.REQUESTS)};this.save=function(){J().set(W.REQUESTS,gt.clone(c.items()));c.clear()}}var o=null,u=!1,a=[],c=new A(50);return function(){o||(o=new r);return o}}(),Ft=function(){function t(){function t(t,n){var i=X().appKey(),r=kt.instance().getSDKType(),o=vt().getId(),u=vt().getIdType();if(i&&r&&o&&u){var a={ak:X().appKey(),sdt:kt.instance().getSDKType(),uin:t.nickName,uia:t.avatar,uig:t.gender,uit:t.country,uip:t.province,uic:t.city,uil:t.language,id:vt().getId(),it:vt().getIdType()},c=JSON.stringify(a);c=gt.base64Encode(c);e({url:W.USERINFO_URL,method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:"ui="+c,success:function(e){H().v("用户信息上传成功: ",t);n&&n(e&&e.data&&200===e.data.code)},fail:function(){H().e("用户信息上传失败: ",t);n&&n(!1)}})}}this.update=function(){Tt.getUserInfo(function(n){if(n){var e=J().get(W.USER_INFO);e&&gt.deepEqual(n,e)||t(n,function(t){t&&J().set(W.USER_INFO,n)})}})}}var n=null;return function(){n||(n=new t);return n}}(),Gt=[];P.prototype={createMethod:function(t,n,e){try{t[n]=e?function(){return e[n].apply(e,arguments)}:function(){Gt.push([n,[].slice.call(arguments)])}}catch(t){H().v("create method errror: ",t)}},installApi:function(t,n){try{var e,i,r=["resume","pause","trackEvent","trackPageStart","trackPageEnd","trackShare","setOpenid","setUnionid","setUserid"];for(e=0,i=r.length;e<i;e++)this.createMethod(t,r[e],n);if(n)for(e=0,i=Gt.length;e<i;e++){var o=Gt[e];try{n[o[0]].apply(n,o[1])}catch(t){H().v("impl[v[0]].apply error: ",o[0],t)}}}catch(t){H().v("install api errror: ",t)}}};var Kt=["https://umini.shujupie.com","https://ulogs.umeng.com"],Ht=0,Yt="",qt={},Xt={getCurrentFullPath:function(){return C(Yt,qt[Yt])},getCurrentPath:function(){return Yt},setCurrentPath:function(t){Yt=t},setCurrentPageQuery:function(t,n){qt[t]=n},getCurrentPageQuery:function(t){return qt[t]}};({init:L}).init(3e3);try{var Jt=App;App=function(t){D(t,"onLaunch",function(n){x(t.umengConfig,n)});D(t,"onShow",M);D(t,"onHide",V);Jt(t)}}catch(t){H().w("App重写异常")}try{var Qt=Page;Page=function(t){D(t,"onShow",F);D(t,"onHide",G);D(t,"onUnload",G);D(t,"onLoad",j);b(t);Qt(t)}}catch(t){H().w("Page重写异常")}try{var Wt=Component;Component=function(t){try{t.methods=t.methods||{};var n=t.methods;D(n,"onShow",F);D(n,"onHide",G);D(n,"onUnload",G);D(n,"onLoad",j);b(n);Wt(t)}catch(n){Wt(t)}}}catch(t){H().w("Component重写异常")}var zt=new P,Bt={_inited:!1,init:function(t){H().tip_w("2.3.2及之后版本需在微信后台更换域名白名单为: umini.shujupie.com");if(this._inited)H().v("已经实例过，请避免重复初始化");else if(t)if(t.appKey){"boolean"!=typeof t.useOpenid&&(t.useOpenid=!0);X().set(t);H().setDebug(t.debug);this._inited=!0;var n=this;if(X().useOpenid()){H().tip_w("您选择了使用openid进行统计，请确保使用setOpenid回传openid或通过设置autoGetOpenid为true，并在友盟后台设置secret由友盟帮您获取")}!function(t){try{var n=new w;H().v("成功创建Lib对象");n.init(function(){H().v("Lib对象初始化成功");zt.installApi(t,n);H().v("安装Lib接口成功")})}catch(t){H().w("创建Lib对象异常: "+t)}}(n)}else H().err("请确保传入正确的appkey");else H().err("请通过在App内添加umengConfig设置相关信息！")}};try{zt.installApi(Bt,null);H().v("安装临时接口成功");wx.uma=Bt}catch(t){H().w("uma赋值异常: ",t)}module.exports=Bt;
