let h2=document.querySelector('h2');

let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let highScore=0;


document.addEventListener('keypress',function(){
    if(started==false){  
        console.log('game started');
        started=true;
        setTimeout(levelUp,1000);
    }
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}


function levelUp(){
    userSeq=[];
    level++;
    h2.innerText =`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);
    let randBtn=document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
}

function checkAns(idx){
   // console.log(level);
   if(userSeq[idx]==gameSeq[idx]){
    if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000);
    }
   }else{
    let body=document.querySelector('body');
    body.classList.add('GameOver');
    setTimeout(function (){
        body.classList.remove('GameOver');
    },200);
    h2.innerHTML=`Game Over! Your score was <b>${level}</b>. <br> Press any key to start.`;
    if(highScore<level){
        highScore=level;
    }
    reset();
   }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
    started=false;
    level=0;
    userSeq=[];
    gameSeq=[];
}

let score=document.querySelector('.high-score');
score.addEventListener('click',function(){
    score.innerHTML=`High Score = ${highScore}`;
    setTimeout(()=>{score.innerHTML='Show High Score'},1000);
});

