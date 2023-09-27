
for(var i=0;i<document.querySelectorAll(".drum").length;i++){
    //click on the screen event
    document.querySelectorAll("button")[i].addEventListener("click", function (){ // querySelectorAll gets the array of items so, we use loop to select each item
        //alert("I got clicked!");
        //console.log(this.style.color = "white");
        var letterSound = this.innerHTML; // it will takethe content from the html and pass to the variable
        makeSound(letterSound);
        buttonAnimation(letterSound);
    });
}

//var audio =new Audio("sounds/tom-1.mp3");
//audio.play();
//key press event
document.addEventListener("keydown", function(event){
    //console.log(event.key);
    var value = makeSound(event.key);
    if(value === 1){
        console.log("Please press the correct keys");
    }else{
        buttonAnimation(event.key);
    }
    
})


//switch function to play the sound

function makeSound(keypress){
    var value = 0;
    switch (keypress) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play()
            break;
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        default:
            value = 1;
            console.log("pressed wrong key")
            break;
    }
    return value;
}

function buttonAnimation(currentKey){
    var activeButton = document.querySelector("."+currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 500)
}