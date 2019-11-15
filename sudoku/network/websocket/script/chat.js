
var wsSocket = null;
var socket_flag = false;

function initChat(){
	var sProtocol = 'ws://';
	if(window.location.protocol.indexOf('https') >= 0){
		sProtocol = 'wss://';
	}
	var host = window.location.host;
	host = '120.27.48.51:8282';
	wsSocket = new WebSocket(sProtocol + host);
	wsSocket.onopen = sOpened;
	wsSocket.onmessage = sMessage;
	wsSocket.onclose = sClose;
	wsSocket.onerror = sError;
}

function sOpened(evt){
	socketFlag(true);
	console.log('onopen...');
}

function sMessage(evt){
	if(window.onrecMessage){
		onrecMessage(evt.data);
	}
	console.log('onmessage... ' + evt.data);
}

function sClose(evt){
	socketFlag(false);
	toast('聊天中断..');
	console.log('onclose... ');
}

function sError(evt){
	socketFlag(false);
	console.log('onerror... ', evt);
}

function sendMessage(data){
	if(!socketFlag()){
		toast('正在建立与服务器连接，稍后再试...');
		initChat();
		return false;
	}
	if(!data){
		data = "";
	}
	console.log('sendMessage: ' + data);
	wsSocket.send(data);
	return true;
}

function socketFlag(flag){
	if(flag){
		socket_flag = flag;
	}
	return socket_flag;
}