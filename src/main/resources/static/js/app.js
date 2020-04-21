const idBtnLessOne = "btnLessOne";
const idBtnLessFive = "btnLessFive";
const idBtnMoreOne = "btnMoreOne";
const idBtnMoreFive = "btnMoreFive";
const idTxtNumberDice = "txtNumberDice";
const idBtnResetNumberDice = "btnResetNumberDice";
const idTxtDificult = "txtDificult";

$(document).ready(function(){
    controlEvent();
});
function controlEvent(){
    eventClick();
}

function eventClick(){
    $('#'+idBtnMoreFive).click(function(){
        numberDice(+5);
    });
    $('#'+idBtnMoreOne).click(function(){
        numberDice(+1);
    });
    $('#'+idBtnLessFive).click(function(){
        numberDice(-5);
    });
    $('#'+idBtnLessOne).click(function(){
        numberDice(-1);
    });

    $('#'+idBtnResetNumberDice).click(function(){
        $('#'+idTxtNumberDice).val(0);
    });

}
function difficult(difficult){
    $('#'+idTxtDificult).val(difficult);
}

function numberDice(number){
    let numberDice = parseInt( $('#'+idTxtNumberDice).val() );
    if(numberDice >= 0){
        numberDice = numberDice  + number;
    }
    if(numberDice < 0){
        numberDice = 0;
    }
    $('#'+idTxtNumberDice).val(numberDice);
}