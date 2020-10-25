
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keydown(function(){
  if(!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});

$(".btn").click(function(){
  var userChosenColour =  $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function(){
        nextSequence();
      },1000);

    }

    }
    else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);


    $("#level-title").text("Game Over, Press any key to Restart");
    startOver();

  }

}

//starting over again after game over
function startOver(){
  level = 0;
  gamePattern =[];
  started = false;
}

function nextSequence() {

  userClickedPattern = [];

  //increment after each level
  level++;
  $("#level-title").text("Level " + level);

  //generates a random number
  var randomNumber = Math.floor(Math.random()*4);
  var randomColourChosen = buttonColours[randomNumber];
  gamePattern.push(randomColourChosen);

  $("#" + randomColourChosen).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColourChosen);
}


function playSound(name){

  var audio = new Audio ("sounds\\" + name + ".mp3");
  audio.play();

}

//flash effect when selecting a button
function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}