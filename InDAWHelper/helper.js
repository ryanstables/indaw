// target div...
var target = document.getElementById("helper_target");
var toggle_button = document.getElementById("helper_button");
var defaultString = "Do you need help?"
target.innerHTML = defaultString
var offset =0

// toggle help box...
var helpButton = document.getElementById("helper_button");
helpButton.addEventListener("click", function() { 
    var targetStyle = window.getComputedStyle(target, null)
    var buttonStyle = window.getComputedStyle(toggle_button, null)
    var boxWidth = parseInt(targetStyle.width)
    var indent = parseInt(targetStyle.right)
    var border = parseInt(targetStyle.borderWidth)
    var padding = parseInt(targetStyle.padding)
    var margin = parseInt(targetStyle.margin)
    var buttonWidth = parseInt(buttonStyle.width)    
    offset = boxWidth + indent + border*2 + padding*2 + margin*2 + buttonWidth
        
    if(offset < 0) {
        target.style.right = offset+"px"
    }
    else {
        target.style.right = "-"+offset+"px"
    }    
})

// 
x= new Array
for (var i=0; i<helperTags.length; i++) {    
    x.push(document.getElementById(helperTags[i].tag))
    x[i].addEventListener("mouseover", mouseOverHelp(i));  
    x[i].addEventListener("mouseout", mouseOutHelp());  
}

// these functions need closures, but I'm still not 100% why!?!?!
 function mouseOverHelp(i) {
    return function() {
        target.innerHTML = helperTags[i].tooltip
           };
 }

function mouseOutHelp() {
    return function() {
        target.innerHTML = defaultString
           };    
}