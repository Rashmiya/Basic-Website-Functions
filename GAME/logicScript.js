/*var boy = document.getElementsByClassName("character");*/

var boy = document.getElementById("boy");
idleImageNumber=1;
idleAnimationNumber=0;
runImageNumber=1;
runAnimationNumber = 0;
moveBackgroundAnimationId =0;

/*bacis level of character*/
function idleAnimation(){
    idleImageNumber = idleImageNumber+1;
    if(idleImageNumber==11){
        idleImageNumber=1;
    }
    boy.src = "png/idle (" + idleImageNumber + ").png";
}
function idleAnimationStart(){
    idleAnimationNumber = setInterval(idleAnimation,200);
}

/*============Run animation of character===============*/

function runAnimation(){
    runImageNumber = runImageNumber+1;
    if(runImageNumber == 11){
        runImageNumber=1;
    }
    boy.src = "png/run (" + runImageNumber+ ").png";
}
function runAnimationStart(){
    runAnimationNumber = setInterval(runAnimation,90);
    clearInterval(idleAnimationNumber);

}

function keyCheck(event){
   /* alert(event.which);
    enter=13
    space=32*/
    var keyCode = event.which;
    /*for run*/
    if(keyCode == 13){
        if(runAnimationNumber==0){
            runAnimationStart();
        }
      if(moveBackgroundAnimationId == 0){
        moveBackgroundAnimationId = setInterval(moveBackgroundImage,90);
      }
        if(boxAnimationID == 0){
            boxAnimationID = setInterval(boxAnimation,100);
        }
    }
    /*for jump*/
    if(keyCode==32){
        if (jumpAnimationNumber==0){
            jumpAnimationStart();
        }
        if(moveBackgroundAnimationId == 0){
            moveBackgroundAnimationId = setInterval(moveBackgroundImage,90);
        }
        if(boxAnimationID == 0){
            boxAnimationID = setInterval(boxAnimation,100);
        }
    }

}

/*===============move the background image==================*/

var backgroundImagePositionX = 0;

function moveBackgroundImage(){
    backgroundImagePositionX = backgroundImagePositionX-20;
    document.getElementById("backgroundImage").style.backgroundPositionX = backgroundImagePositionX+"px";
    scoreBoard();
}

/*================ jump Animation================*/

jumpAnimationNumber=0;
jumpImageNumber=1;
boyMarginTop=339;
function jumpAnimation(){
    jumpImageNumber = jumpImageNumber+1;
    if(jumpImageNumber<=6){
        boyMarginTop = boyMarginTop-50;   /*methna me height eka adu wedi krla jump level change krnna pluwn...*/
        boy.style.marginTop = boyMarginTop+"px";
    }
    if(jumpImageNumber>=7){
        boyMarginTop = boyMarginTop+50;
        boy.style.marginTop = boyMarginTop+"px";
    }

    if(jumpImageNumber==11){
        jumpImageNumber=1;
        clearInterval(jumpAnimationNumber);  /*clear jump Animation*/
        jumpAnimationNumber=0;
        runImageNumber=0;
        runAnimationStart();
    }
    boy.src="png/jump ("+jumpImageNumber+").png";
}

function jumpAnimationStart(){
    clearInterval(idleAnimationNumber);  /*clear the idle animation number*/
    runImageNumber=0;
    clearInterval(runAnimationNumber);  /*clear the run animation*/
    jumpAnimationNumber = setInterval(jumpAnimation,100);
}

/*create challenge boxes*/

boxMarginLeft=1410;

createBoxes();
function createBoxes(){
    /*create more challenge boxes*/
    for(var i=0; i<=10; i++){
        var box = document.createElement("div");  /*aluthin div ekak create kragnnwa*/
        box.className = 'box';   /*create krgththu new div ekata class name ekak denwa*/
        document.getElementById("backgroundImage").appendChild(box);  /* e div eka background ekata append krgnnwa*/
        box.style.marginLeft = boxMarginLeft+"px";
        box.id="box"+i;
        /*boxMarginLeft = boxMarginLeft+1200; */  /*boxes wala equal distance thiyagenimata*/

        // boxes 5kata withra passe, thiyena boxes wala distance adu karagenimata one unahama
        if(i<5){
            boxMarginLeft=boxMarginLeft+1000;
        }
        if(i>=5){
            boxMarginLeft=boxMarginLeft+600;
        }
    }
}

var boxAnimationID = 0;
function boxAnimation(){
    for (let i = 0; i < 10; i++) {
        var box = document.getElementById("box"+i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-25;
        box.style.marginLeft = newMarginLeft+"px";

        if(newMarginLeft>=-110 & newMarginLeft <= 110){
          /*  if(boyMarginTop > 300){*/
                clearInterval(boxAnimationID);

                clearInterval(runAnimationNumber);
                runAnimationNumber=0;

                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber=0;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId=-1;

                deadAnimationNumber = setInterval(boyDeadAnimation,100);
            }
        }
    /*}*/
}

deadImageNumber = 1;
deadAnimationNumber=0;

function boyDeadAnimation(){
    deadImageNumber = deadImageNumber+1;

    if(deadImageNumber==11){
        deadImageNumber = 10;
    }
    boy.src = "png/Dead ("+deadImageNumber+").png";
}

/*========score board================*/
var score = 0;
function scoreBoard(){
    score=score+1;
    document.getElementById("score").innerHTML = score;
}
