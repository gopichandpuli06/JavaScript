//alert("Hello! Welcome to the simon game")
var gamePattern = []
var userClickedPattern = []
var level = 0;
var started = false;
$(".btn").click(function(){
    if(!started){
        alert("Please press any key from your key board to start the game!");
    }else{
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
})

function playSound(name){
    //$("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(name);
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
    
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100); // Adjust the delay (in milliseconds) as needed
}

//keyboard key press and call the nextSequece function
$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
    
})

//user clicked key strokes to check the sequence with the game generated secquence
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }else{
        console.log("wrong");
        
        wrongAnswer();
    }
}

function wrongAnswer(){
    var WrongAudio = new Audio("sounds/wrong.mp3");
    WrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
    $("h1").text(`Game Over, Your highest level was Level ${level-1}, Press Any Key to Restart`);
    startOver();
}
//to start the game again
function startOver(){
    level=0;
    randomNumber = [];
}

var buttonColours = ["red", "blue", "green", "yellow"]
var randomNumber;
function nextSequence(){
    userClickedPattern=[]
    randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio(`sounds/${randomChosenColour}.mp3`)
    audio.play();
    level = level + 1;
    $("h1").html(`Level ${level}`);
}
