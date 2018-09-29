(function () {
	var clientWidth = document.documentElement.clientWidth;
	if(clientWidth >= 414){
		clientWidth = 414;
	}
	console.log(clientWidth);
	document.documentElement.style.fontSize = clientWidth / (750) * 100 + 'px';
	window.onresize = function(){
		var clientWidth = document.documentElement.clientWidth;
		if(clientWidth >= 414){
			clientWidth = 414;
		}else{
			clientWidth = document.documentElement.clientWidth;
		}
		
		document.documentElement.style.fontSize = clientWidth / (750) * 100 + 'px';
      }
  })();