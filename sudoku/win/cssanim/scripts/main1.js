/**
 * When the window loads, connect the showNotificationBtn to the Javascript
 * interface "window.NotificationBind"
 */
window.onload = function() {
    console.log('window.onload');
    var btn = document.querySelector('#show-notification-btn0');
    btn.addEventListener('click', function() {
        changeState(1, true);
    });
	btn = document.querySelector('#show-notification-btn1');
    btn.addEventListener('click', function() {
        changeState(2, true);
    });
	btn = document.querySelector('#show-notification-btn2');
    btn.addEventListener('click', function() {
        changeState(3, true);
    });
	btn = document.querySelector('#show-notification-btn3');
    btn.addEventListener('click', function() {
        changeState(4, true);
    });
	btn = document.querySelector('#show-notification-btn4');
    btn.addEventListener('click', function() {
        changeState(5, true);
    });
	btn = document.querySelector('#show-notification-btn5');
    btn.addEventListener('click', function() {
        changeState(6, true);
    });
	btn = document.querySelector('#show-notification-btn6');
    btn.addEventListener('click', function() {
        changeState(7, true);
    });
    updateUI(true);
};

/**
 * From this point onwards, the Javascript is managing UI and
 * application state
 */
var animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
};

// animation end event name
var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

var NOTIFICATION_SHOWN = 0;
var NOTIFICATION_SHOWN1 = 1;
var NOTIFICATION_SHOWN2= 2;
var NOTIFICATION_SHOWN3 = 3;
var NOTIFICATION_SHOWN4 = 4;

var exports = {};

var currentState;
var animating = false;

function changeState(newState, animateForward) {
    console.log('changeState()');
    if(animating || (newState == currentState)) {
        return;
    }
    var currentPage = document.querySelector('.current-page');
    var newUI;
    var animCurrent = animateForward ? 'animate-to-left' : 'animate-to-right';
    var animNew = animateForward ? 'animate-from-right' : 'animate-from-left';
    var hash;
	
	console.log('newState: ' + newState);
	newUI = getNotifcationArrow(newState);
	hash = 'notification-' + newState;
    newUI.classList.add('current-page');
    if(currentPage) {
        // We need to animate
        animating = true;
        currentPage.classList.add(animCurrent);
        newUI.classList.add(animNew);
        currentPage.addEventListener(animEndEventName, pageAnimationEnd(currentPage, newUI, animCurrent, animNew), false);
    }
    currentState = newState;
    pushState({}, "", hash);
}

function pageAnimationEnd(currentPage, newPage, animCurrent, animNew) {
    var animEndFunc = function() {
        currentPage.removeEventListener(animEndEventName, animEndFunc, false);
        currentPage.classList.remove(animCurrent);
        newPage.classList.remove(animNew);
        currentPage.classList.remove('current-page');
        animating = false;
    };
    return animEndFunc;
}

function getNotifcationArrow(index) {
    return document.getElementById('s' + index);
}


function updateUI(animateForward) {
    console.log('updateUI()');
    var identifier = window.location.hash;
    var state;
	if(identifier){
		console.log('identifier: ' + identifier);
		state = parseInt(identifier.replace('#notification-', ''));
	}else{
		state = 0;
	}
    changeState(state, animateForward);
}

function showSecretMessage() {
    var ui = getSecretUI();
    if(ui.classList.contains('current-page')) {
        if(animating) {
            return;
        }
        window.history.back();
    } else {
        changeState(SECRET_SCREEN);

        return 'You Found the Secret';
    }
}

function pushState(state, title, path) {
    if(!path) {
        return;
    }
    window.location.hash = path;
}

window.onpopstate = function(event) {
    console.log('onpopstate()');
    var popped = document.querySelector('.current-page') ? true : false;
    if(popped && currentState == 7) {
        popped = false;
    }
    updateUI(!popped);
};
