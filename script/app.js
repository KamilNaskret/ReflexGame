import {BoardGame} from "./board.mjs";

class ReflexGame{
    constructor(){
        this.board=null;
        this.randomSquare=null;
        this.squares=null;
        this.lives=3;
        this.points=0;
        this.time=60;
        this.interval=0;
        this.UIResults={
            life:null,
            punkts:null,
            timeleft:null
        };
        this.btns={
            start:null,
            restart:null
        };
        this.initialize();
        this.addEventListeners();
    }
    initialize(){
        this.resetValues();
        this.board = new BoardGame();
        this.UIResults.life=document.querySelector('[data-life]');
        this.UIResults.punkts=document.querySelector('[data-points]');
        this.UIResults.timeleft=document.querySelector('[data-timeleft]');
        this.btns.start=document.querySelector('[data-start]');
        this.btns.restart=document.querySelector('[data-make]');
        this.squares=[...document.querySelectorAll('[data-item]')];
        this.setValue();
    }
    resetValues(){
        this.lives=3;
        this.points=0;
        this.time=60;
        this.interval=0;
    }
    addEventListeners(){
        this.btns.start.addEventListener('click',this.startGame.bind(this));
        this.squares.forEach((square) => {
            square.addEventListener('click',(e) => {
                this.clearSquare(e);
            });
        })
    }
    startGame(){
        this.btns.start.setAttribute('disabled',true);
        this.btns.restart.setAttribute('disabled',true);
        this.interval=setInterval(() => {
            if(this.time%3===0){
                this.randomSquaresOnBoard();
                setTimeout(this.removeSquare.bind(this),2000);
            }
            this.time--;
            this.changeTime();
            if(this.time<=0){
                clearInterval(this.interval);
            }
        },1000);
    }
    removeSquare(){
        this.squares[this.randomSquare].classList.remove('active');
        this.setValue();
    }
    clearSquare(e){
        if(e.target.classList.contains('active')){
            this.points++;
        }else{
            this.lives--;
        }
        this.setValue();
    }
    setValue(){
        if(this.lives<=0){
            clearInterval(this.interval);
            alert("Koniec gry");
            this.board.board.innerHTML='';
            window.location=window.location;
        }
        const {punkts,life,timeleft}=this.UIResults;
        punkts.innerHTML=this.points;
        life.innerHTML=this.lives;
        timeleft.innerHTML=this.time;
    }
    randomSquaresOnBoard(){
        this.randomSquare=Math.floor(Math.random()*this.squares.length);
        this.squares[this.randomSquare].classList.add('active');
    }
    changeTime(){
        this.UIResults.timeleft.innerHTML=this.time;
    }
}


document.querySelector('[data-make]').addEventListener('click',() => {
    const reflexGame = new ReflexGame();
})
