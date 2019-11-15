function loading(msg){
	msg = !msg ? msg : '';
	api.showProgress({text:msg});
}

function finishing(){
	api.hideProgress();
}

function toast(m){
	m = !m ? m : '提示';
	api.toast({
		msg:m
	});
}

function doBefore(){
	if(window.checkClass){
		checkClass();
	}
	loading();
}

function doComplete(ret, err){
	finishing();
	if(ret){
		alert('请求结果：\n' + JSON.stringify(ret));
	}else{
		alert('请求失败：\n' + JSON.stringify(err));
	}
}