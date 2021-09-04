const batu = document.getElementById("batu");
const kertas = document.getElementById("kertas");
const gunting = document.getElementById("gunting");
const pWin = document.getElementById("win");
const cWin = document.getElementById("com-win");
const draw = document.getElementById("draw");
const vstxt = document.getElementById("vstxt");

class Result{
    constructor(win, draw, lose){
        this.win = win;
        this.draw = draw;
        this.lose = lose;
    }

    whowin(res){
        vstxt.style.display = "none";
        pWin.style.display = "none";
        cWin.style.display = "none";
        draw.style.display = "none";

        if(res === this.win){
            console.log("You Win!");
            pWin.style.display = "block";
        } else if (res === this.lose){
            console.log("You Lose!");
            cWin.style.display = "block";
        } else {
            console.log("It's Draw!");
            draw.style.display = "block";
        }   
    }
}

const res = new Result("win", "draw", "lose");


function getInputCumputer(){
    const rand = Math.floor(Math.random() * 3);
    const compInput = ['batu', 'kertas', 'gunting'];
    return compInput[rand];
}

function changebg(el) {
    const bg = document.getElementById(el);
    bg.style.backgroundColor = 'rgb(218, 213, 213)';
    bg.style.opacity = 1;
}
function juge(pInput){
    const cInput = getInputCumputer();
    changebg("bgcom-"+cInput);
    console.log("Comp > " + cInput);
    console.log("Player > " + pInput);

    if (cInput == pInput){
        res.whowin("draw");
    } else if (
        (pInput == "batu" && cInput =="kertas") || (pInput == "kertas" && cInput =="gunting") || (pInput == "gunting" && cInput =="batu")) {
        res.whowin("lose");
    } else{
        res.whowin("win");
    }
}
function main(){
    batu.addEventListener('click', function() {
        juge("batu");
    });
    
    kertas.addEventListener('click', function() {
        juge("kertas");
    });
    
    gunting.addEventListener('click', function() {
        juge("gunting");
    });
}

main();








