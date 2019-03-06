// var images = [<?php echo imgList($imgs) ?>];
// var img = "<?php echo $img?>";
if (img == undefined || img == null) img = images[0];

var leftArrow = document.getElementById("left-arrow-box");
var rightArrow = document.getElementById("right-arrow-box");
var mainImg = document.getElementById("main-img");
var imgBox = document.getElementsByClassName("img-box")[0];
var nextImg = document.getElementById("next");
var prevImg = document.getElementById("prev");
var closeA = document.getElementById("close-a");
var index = 0; //index of image being displayes
var timeoutId = 0; //id of timeout used for controls hiding
var DNtimeout; //id of timeout used for disabling controls after they fade
var controlsHidden = false; //if the controls are hidden

function enableClicks(){ 
    leftArrow.onclick = function() {
        changeImg(index - 1);
    }
    rightArrow.onclick = function() {
        changeImg(index + 1);
    }
    closeA.onclick = function(){window.history.back();};

    if (index == 0){
        leftArrow.style.display = "none";
    }else{
        leftArrow.style.display = "block";
    }

    if (index == images.length - 1){
        rightArrow.style.display = "none";
    }else{
        rightArrow.style.display = "block";
    }
    closeA.style.display = "block";
}

function disableClicks(){
    leftArrow.onclick = null;
    rightArrow.onclick = null;
    closeA.onclick = null;

    //display is set to none, so that the is no :active animation played when they reappear
    leftArrow.style.display = "none";
    rightArrow.style.display = "none";
    closeA.style.display = "none";
}

function hideControls() {
    DNtimeout = window.setTimeout(function(){ //schedudles disabling controls, so that they are disabled after they fade
        disableClicks();
    }, 2000);

    //sets the animation lenght
    leftArrow.style.transition = "opacity 1.5s";
    rightArrow.style.transition = "opacity 1.5s";
    closeA.style.transition = "opacity 1.5s";
    
    controlsHidden = true;
    
    //starts fading
    leftArrow.style.opacity = 0;
    rightArrow.style.opacity = 0;
    closeA.style.opacity = 0;

    
}

function showControls(){
    window.clearTimeout(DNtimeout); //cancels schedudled control disbling

    enableClicks();

    //sets animation times
    leftArrow.style.transition = "opacity 0.3s";
    rightArrow.style.transition = "opacity 0.3s";
    closeA.style.transition = "opacity 0.3s";
    
    controlsHidden = false;
    
    leftArrow.style.opacity = 1;
    rightArrow.style.opacity = 1;
    closeA.style.opacity = 1;

    
}

//shedudles timer for hiding controls and cancels previous ones
function timer() {
    if(hasTouch()){
        if (controlsHidden){
            showControls();
        }
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(hideControls, 2000);
    }
}

//restarts time when tapped anywhere
document.onclick = timer;

// sets values to preload images
function setPreload(index){
    if(index < images.length - 1){
        nextImg.setAttribute("src","img/gallery/" + (images[index + 1]));
    }
    if(index > 0){
        prevImg.setAttribute("src","img/gallery/" + (images[index - 1]));
    }
}

// call when main image had problems with loading and has just loaded
function mainImgLoaded(index){
    mainImg.style.opacity = 1;
    imgBox.classList.remove("spinner");
    mainImg.removeEventListener("load", mainImgLoaded);
    setPreload(index);
}

//changes image
function changeImg(index){
    img = images[index];
    history.replaceState( {} , "", "./gallery?img=" + img);
    
    init();
}

//calculates image index, etc.
function init(){
    mainImg.setAttribute("src", "./img/gallery/" + img);
    mainImg.setAttribute("alt", img);
    enableClicks();
    index = 0;
    for (; index < images.length; index++){
        if (images[index] == img){
            break;
        }
    }

    if (index == 0){
        leftArrow.style.display = "none";
    }else{
        leftArrow.style.display = "block";
    }

    if (index == images.length - 1){
        rightArrow.style.display = "none";
    }else{
        rightArrow.style.display = "block";
    }
    
    if(!mainImg.complete){
        //if connection is slow and the image is not loaded yet
        mainImg.style.opacity = 0;
        imgBox.classList.add("spinner");
        mainImg.onload = function(){
            mainImgLoaded(index);
        };
    }else{
        setPreload(index);
    }
}

init();

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

//is called after all is loaded
function postInit(){
    if (hasTouch()) { // remove all :hover stylesheets
        try { // prevent exception on browsers not supporting DOM styleSheets properly
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                try{
                    if (!styleSheet.rules) continue;

                    for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                        if (!styleSheet.rules[ri].selectorText) continue;

                        if (styleSheet.rules[ri].selectorText.match(':hover img')) {
                            styleSheet.deleteRule(ri);
                        }
                    }
                } catch (ex1) {continue;}
            }
        } catch (ex) {alert("ex")}
    }

    timer();
}

window.onload = postInit();