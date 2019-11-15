var headerHeight = 45;//定义标题栏默认高度
var footerHeight = 50;//定义底部导航栏默认高度

//根据id获取元素
function $(id){
	if(!id){
		return null;
	}
	return document.getElementById(id);
}

//将当前focus元素通知给引擎
function setTvFocus(eleId){
	var ele = $(eleId);
	if(!ele){
		return;
	}
	var l = getLeft(ele);
	var t = getTop(ele);
	var r = ele.clientWidth;
	var b = ele.clientHeight;
	api.setTvFocusElement({
		id:eleId,
		x:l,
		y:t,
		w:r,
		h:b
	});
}

function getTop(e)   { 
      var offset = e.offsetTop;
       if (e.offsetParent != null) 
          offset += getTop(e.offsetParent);
       return offset;   
} 

function getLeft(e)   { 
      var offset = e.offsetLeft;
       if (e.offsetParent != null) 
          offset += getLeft(e.offsetParent);
      return offset;
}