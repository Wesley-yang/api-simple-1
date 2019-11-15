function timerTest(msg, callback){
	setInterval(function(){
		console.log(msg);
		if(callback){
			callback();
		}
	}, 5000);
}