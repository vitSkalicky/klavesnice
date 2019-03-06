let popup = document.getElementsByClassName("popup")[0];
let langInfoCs = document.getElementById("lang-info-cs");
let langInfoEn = document.getElementById("lang-info-en");
let langX = document.getElementById("lang-x");

function showDialog() {
  popup.style.pointerEvents = "auto";
  popup.style.opacity = 0.0;
  popup.style.opacity = 1.0;
}

function hideDialog() {
  popup.style.opacity = 0.0;
  window.setTimeout(function() {
    popup.style.pointerEvents = "none";
  }, 300);
}

// close whet tapped outside
window.onclick = function(event) {
  if (event.target == popup) {
    hideDialog();
  }
};

langX.onclick = function(){
    if (langInfoCs != null){
        langInfoCs.style.opacity = 0;
        window.setTimeout(function(){
            langInfoCs.style.display = "none";
        }, 500);
    }else{
        langInfoEn.style.opacity = 0;
        window.setTimeout(function(){
            langInfoEn.style.display = "none";
        }, 500);
    }
    
    let d = new Date();
    d.setTime(d.getTime() + (30 *24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "langClosed=true;"+expires; //sets cookie that means that the user closed language dialog and does not want to see it again
}

let language = window.navigator.userLanguage || window.navigator.language;

window.onload = function() {
  let decodedCookie = decodeURIComponent(document.cookie);
  if (decodedCookie.indexOf("langClosed=true") == -1)
  if (language == "cs" || language == "cs-CZ") {
    if(langInfoEn != null){
        langInfoEn.style.display = "block";
        window.setTimeout(function(){
            langInfoEn.style.opacity = 1
        },1);
    }
  } else {
      if(langInfoCs != null){
        langInfoCs.style.display = "block";
        window.setTimeout(function(){
            langInfoCs.style.opacity = 1
        },1);      }
  }
}