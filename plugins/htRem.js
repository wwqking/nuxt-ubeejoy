
export default ({ app, store }) =>{
	if(app.context.isClient){
		// alert(2);
		document.documentElement.style.fontSize = document.documentElement.clientWidth / (1080) * 100 + 'px';
		if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
			document.documentElement.style.fontSize = document.documentElement.clientWidth / (1080) * 100 + 'px';
		}
	}
}

//function htRem(){
//  if(isWap){
//      
//  }
//}
//htRem();
//window.onresize = function() {
//  htRem();
//};