import Cookies from 'js-cookie'
export default function ({route,store,redirect}) {
  // If the user is not authenticated
  if(process.client){
  	let lang = Cookies.get('lang') || 'zh';
  	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (route.fullPath.indexOf('/wap')<0)) {
			let url;
			if(route.fullPath.indexOf('kr')>-1 || route.fullPath.indexOf('zh')>-1 || route.fullPath.indexOf('en')>-1){
				url = '/'+lang +'/wap' + route.fullPath.substr(3);
			}else{
				url = '/'+lang +'/wap' + route.fullPath;
			}
  		return redirect(url);
  	}else if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (route.fullPath.indexOf('/wap') > -1)){
  		let url = '/'+lang +'/' + route.fullPath;
  		if(url.indexOf('www.ubeejoy.com') < 0){
  			 url += 'www.ubeejoy.com' + url;
  		}
  		return redirect(url);
  	}
  }
}