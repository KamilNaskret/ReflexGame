class BoardGame{
    constructor(){
        this.rows=5;
        this.columns=5;
        this.board=null;
        this.makeBoard();
    }
    makeBoard(){
        this.board=document.querySelector('.game__board');
        this.board.innerHTML='';
        for(let i=0;i<this.columns;i++){
            for(let j=0;j<this.rows;j++){
                const div = document.createElement('div');
                div.classList.add('game__board-item');
                div.dataset.item="1";
                this.board.appendChild(div);
            }
        }
    }
}
export{BoardGame};