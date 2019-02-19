var popup = document.getElementsByClassName("popup")[0];

function showDialog(){
    popup.style.pointerEvents = "auto";
    popup.style.opacity = 0.0;
    popup.style.opacity = 1.0;
}

function hideDialog(){
    popup.style.opacity = 0.0;
    window.setTimeout(function(){
        popup.style.pointerEvents = "none";
    }, 300)
}

// close whet tapped outside
window.onclick = function(event) {
    if (event.target == popup) {
        hideDialog();
    }
}