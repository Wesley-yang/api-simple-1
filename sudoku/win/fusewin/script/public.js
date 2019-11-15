'use strict';
var isAndroid = (/android/gi).test(navigator.appVersion);

var statusBarHeight = 0;
window.onload = function(){
	if(!isAndroid){//ios沉浸式
		statusBarHeight = 20;
		var el = $('header');
		if(el){
			el.style.paddingTop = '20px';
		}
	}else{
		var u = navigator.userAgent;
		var ver = parseFloat(u.substr(u.indexOf('Android') + 8, 3));
		if(ver >= 4.4){//android沉浸式
			statusBarHeight = 25;
		    var el = $('header');
			if(el){
				el.style.paddingTop = '25px';
			}
		}
	}
    if(window.domReady){
		domReady();
	}
}

function $(id){
	return document.getElementById(id);
}
/**打开window
	url：打开window将加载的url
	name：window的名称
	ott：api.openWin中支持的其他参数
**/
function openWin(_url, _name, ott){
	if(!_url){
		return;
	}
	var wn = _name ? _name : _url;
	var args = {
		name: wn, 
		url: _url
	}
	if(ott){
		for(var i in ott){
			args[i] = ott[i];
		}
	}
	api.openWin(args);
}
/** window + frame窗口结构中，打开content区域所在的frame
  @_url：打开frame将加载的url
  @_name：frame的名称
  @_rect：frame的rect
  @ott：api.openFrame中支持的其他参数
**/
function openContent(_url, _name, _rect, ott){
	if(!_url){
		return;
	}
	var fn = _name ? _name : _url;
	var fr = {};//frame所在的rect区域
	if(_rect){
		fr = _rect;
	}else{
		var headerH = 44;//header高度为api.css样式中声明的44px
		var footerH = 30;//footer高度为api.css样式中声明的30px
		fr.marginTop = headerH + statusBarHeight
		fr.marginBottom = footerH;
	}
	var args = {
		name: fn, 
		url: _url,
		bounces: true,
        rect: fr,
        overScrollMode:'scrolls'
	}
	if(ott){
		for(var i in ott){
			args[i] = ott[i];
		}
	}
    api.openFrame(args);
}
//当前系统时间戳，毫秒
function curtime(){
	return new Date().getTime();
}

function apialert(_msg, callback){
	if(!window.api){
		alert(_msg);
		return;
	}
	api.alert({
	    title: '提示',
	    msg: _msg,
	}, function(ret, err) {
		if(callback){
			callback();
		}
	});
}

function toast(_msg){
	api.toast({
	    msg: _msg,
	    global: true
	});
}

function radioValue(ename){
	var radios = document.getElementsByName(ename);
	if(radios){
		for(var r in radios){
			if(radios[r].checked){
				return radios[r].value;
			}
		}
	}
}

function selectValue(eid){
	return $(eid).value;
}
