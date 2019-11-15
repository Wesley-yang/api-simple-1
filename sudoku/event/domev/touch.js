;(function(factory){
    'use strict';
     window.TapMode = factory(document);
	 window.TapMode.attach = function() {
		return new window.TapMode(document.body);
	};
}(function(el){
	'use strict';
	function TapMode(el){
		this.last = 0;
		this.globalEle = null;//响应onclick事件的元素全局缓存
		this.tapcls = null;
		this.canceled = false;
		this.max_rec = 10;//手指头移动超过该距离则复位
		el = el ? el : document.body;
		el.addEventListener('touchstart', this, false);
		el.addEventListener('touchmove', this, false);
		el.addEventListener('touchend', this, false);
		el.addEventListener('touchcancel', this, false);
	}

	TapMode.prototype.handleEvent = function(e) {
		switch (e.type) {
			case 'touchstart': this.start(e); break;
			case 'touchmove': this.move(e); break;
			case 'touchend': this.end(e); break;
			case 'touchcancel': this.end(e); break;
		}
	};

	TapMode.prototype.start = function(e){
		console.log('touch start>>>>');
		this.canceled = false;
		this.last = e.timeStamp;
		this.globalEle = e.target;
		this.globalEle.X = e.touches[0].clientX;
		this.globalEle.Y = e.touches[0].clientY;
		this.tapcls = this.globalEle.getAttribute('tapmode');
		if(this.tapcls){
			addclzz(this.globalEle, this.tapcls);
		}
	}

	TapMode.prototype.move = function (e){
		console.log('touch move---- ' + e.touches[0].pageX + ',' + e.touches[0].pageY);
		var el = e.target;
		if(el === this.globalEle){
			var x = e.touches[0].clientX;
			var y = e.touches[0].clientY;
			console.log('x = ' + x + ", y = " + y);
			if (Math.abs(x - el.X) > this.max_rec || Math.abs(y - el.Y) > this.max_rec) {
				this.retsetEle(this.globalEle);
			}
		}
	}

	TapMode.prototype.end = function(e){
		console.log('touch end<<<<');
		if(this.canceled){
			return;
		}
		this.retsetEle(this.globalEle);
		var el = e.target;
		if(el === this.globalEle){
			var s = e.timeStamp - this.last;
			if(s < 150){
				perclick(el, e);
			}else if(s >= 400){
				perlclick(el, e);
			}
		}
		this.globalEle = null;
	}

	TapMode.prototype.retsetEle = function(el) {
		if (el && this.tapcls) {
			rmvclzz(el, this.tapcls);
		}
		this.canceled = true;
		this.tapcls = null;
	}
	
	//执行click事件
	function perclick(el, e){
		console.log('perclick ....');
		var fn = el.onclick;
		if(fn){
			stopEvent(e);
			//fn.call();
			el.dispatchEvent(make());
			console.log('click event called, event over!');
		}
	}

	//执行长按事件
	function perlclick(el, e){
		console.log('perlongclick ....');
		var fn = el.getAttribute('longclick');
		if(fn){
			stopEvent(e);
			//eval(fn);
			el.dispatchEvent(make('longclick'));
			console.log('longclick event....called()');
		}
	}

	//追加class
	function addclzz(el, clz) {
		if(!el) return;
		if (!hasclzz(el, clz)) {
			if(el.classList){
				el.classList.add(clz);
			}else{
				el.className = el.className ? el.className + ' ' + clz : clz;
			}
		}
	}

	//是否有class
	function hasclzz(el, clz) {
		if(el.classList){
			return el.classList.contains(clz);
		}else{
			return new RegExp('(^|\\s)' + clz + '(\\s|$)').test(el.className);
		}
	}
	
	//移除class
	function rmvclzz(el, clz) {
		if(el.classList){
			el.classList.remove(clz);
		}else{
			if(!el.className) return;
			el.className = el.className.replace(clz, '').trim();
		}
	}

	//终止事件冒泡
	function stopEvent(e){
		console.log("stopEvent: " + (event === e));
		event.stopPropagation();
		event.preventDefault();
	}
	
	//创建一个自定义事件
	function make(name){
		var evt;
		name = name || 'click';
		if(window.CustomEvent){
			evt = new window.CustomEvent(name, {
				bubbles: true,
				cancelable: true
			});
		}else{
			evt = document.createEvent('Event');
			evt.initEvent(name, true, true);
		}
		/**
		try {
			evt = new window.CustomEvent(name, {
				bubbles: true,
				cancelable: true
			});
		}catch(e) {
			evt = document.createEvent('Event');
			evt.initEvent(name, true, true);
		}
		**/
		return evt;
	}

	return TapMode;
}));