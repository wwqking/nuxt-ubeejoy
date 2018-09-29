import Vue from 'vue'

var isWap =  ("ontouchstart" in window) ? true : false;

if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    Vue.prototype.isWap = true;
}else{
    Vue.prototype.isWap = false;
}


export default isWap;