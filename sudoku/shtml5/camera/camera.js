function init(t) {
    accessLocalWebCam("navy_video");
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

function successsCallback(stream) {
    $('camera_errbox').style.display = 'none';
    var video = $("navy_video");
    video.srcObject = stream;
    var canvas = $("canvas");
    var context = canvas.getContext("2d");
    $("snap").addEventListener("click", function() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    });
}

function errorCallback(err) {
	console.log('加载相机失败..');
}

function accessLocalWebCam(id) {
    try {
        navigator.getUserMedia({
            video: true
        }, successsCallback, errorCallback);
    } catch (err) {
        navigator.getUserMedia('video', successsCallback, errorCallback);
    }
}

function convertCanvasToImage() {
    var pic = document.getElementById("canvas").toDataURL("image/png");
    pic = pic.replace(/^data:image\/(png|jpg);base64,/, "")
	/**
    $.post('uploadPics', {
        imageData: pic
    }, function(data) {
        data = parseInt($.trim(data));
        if (data == 0) {
            alert("图片上传失败...");
        } else {
            alert("图片上传成功...");
        }
    });
    **/
}