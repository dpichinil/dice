
const idTxtCodeGame = "txtCodeGame";
const idTxtNamePlayer = "txtNamePlayer";
const idBtnCreateGame = "btnCreateGame";
const idBtnJoinGame = "btnJoinGame";
const idBtnExitGame = "btnExitGame";

const idSpanMessage = "spanMessage";

const idBtnLessOne = "btnLessOne";
const idBtnLessFive = "btnLessFive";
const idBtnMoreOne = "btnMoreOne";
const idBtnMoreFive = "btnMoreFive";
const idTxtNumberDice = "txtNumberDice";
const idTxtDifficult = "txtDifficult";

const idBtnRoll = "btnRoll";
const idBtnUnlockRoll = "btnUnlockRoll";
const idBtnViewRoll = "btnViewRoll";
const idBtnResetNumberDice = "btnResetNumberDice";
const idDiceContainer = "diceContainer";

const idLblResultValue = "lblResultValue";
const idLblResultText = "lblResultText";
const idLblNumberDice = "lblNumberDice";
const idLblDifficult = "lblDifficult";
const idLblPlayer = "lblPlayer";

$(document).ready(function(){
    showMessage(idSpanMessage,"",typeOther);
    controlEvent();
    loadDataPlayerLogin();
});
function loadDataPlayerLogin(){
    $('#'+idTxtCodeGame).html(getCodeGame());
    $('#'+idTxtNamePlayer).html(getNamePlayer());
}
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

    $('#'+idBtnExitGame).click(function(){
        showMessage(idSpanMessage,"Haz salido del juego",typeOther);
        redirectWhitMessage(delayRedirect, contextRoot);
    });

    $('#'+idBtnRoll).click(function(){
        rollDice();
    });

    $('#'+idBtnUnlockRoll).click(function(){
        unlockRollDice();
    });

    $('#'+idBtnViewRoll).click(function(){
        viewRollDice();
    });

}

function viewRollDice(){
    let keyGame = $('#'+idTxtCodeGame).html();
    let token = obtainToken();
    $.ajax({
        type:'GET',
        url: contextRoot+"api/dice/get/"+keyGame+"/"+token,
        contentType: 'application/json',
        success: function(result,status,xhr){
            if(result.code == 0){
                loadDice(result.data);
                showMessage(idSpanMessage, result.message, typeSuccess);
            }else{
                showMessage(idSpanMessage, result.message, typeError);
            }
        },
        error: function(xhr,status,error){
            showMessage(idSpanMessage, status, typeError);
        },
        complete: function(xhr,status){
            console.log(status);
        }
    });
}

function unlockRollDice(){
    let token = obtainToken();
    let codeGame = $('#'+idTxtCodeGame).html();
    $.ajax({
        type:'GET',
        url: contextRoot+"api/dice/modify/"+codeGame+"/"+token,
        contentType: 'application/json',
        success: function(result,status,xhr){
            if(result.code == 0){
                showMessage(idSpanMessage, result.message, typeSuccess);
            }else{
                showMessage(idSpanMessage, result.message, typeError);
            }
        },
        error: function(xhr,status,error){
            showMessage(idSpanMessage, status, typeError);
        },
        complete: function(xhr,status){
            console.log(status);
        }
    });
}

function loadDataRoll(){
    let numberDice = $('#'+idTxtNumberDice).val();
    let codeGame = $('#'+idTxtCodeGame).html();
    let difficult = $('#'+idTxtDifficult).val();
    numberDice = parseInt(numberDice);
    difficult = parseInt(difficult);
    let jsonData = {
        "diceCount": numberDice,
        "key": codeGame,
        "difficult": difficult,
        "resultCount": 0,
        "resultText": 0,
        "listDice": null
    };
    return jsonData;
}

function rollDice(){
    let token = obtainToken();
    let jsonData = loadDataRoll();
    $.ajax({
        type:'POST',
        url: contextRoot+"api/dice/roll/"+token,
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function(result,status,xhr){
            if(result.code == 0){
                loadDice(result.data);
                showMessage(idSpanMessage, result.message, typeSuccess);
            }else{
                showMessage(idSpanMessage, result.message, typeError);
            }
        },
        error: function(xhr,status,error){
            showMessage(idSpanMessage, status, typeError);
        },
        complete: function(xhr,status){
            console.log(status);
        }
    });
}

function difficult(difficult){
    $('#'+idTxtDifficult).val(difficult);
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

function loadDice(dataDice){
    let container = $('#'+idDiceContainer);
    let difficult = parseInt(dataDice.difficult);
    $('#'+idLblResultValue).html(dataDice.resultCount);
    $('#'+idLblResultText).html(dataDice.resultText);
    $('#'+idLblNumberDice).html(dataDice.diceCount);
    $('#'+idLblPlayer).html(dataDice.player);
    $('#'+idLblDifficult).html(difficult);
    container.html('');
    let num = dataDice.listDice;
    let urlImgDice=contextRoot+'static/img';
    let result = '';
    let row = createRow();
    for (let load = 0, eval = 1 ; load < num.length; load++, eval++) {

        result = evaluateSuccess(num[load], difficult);
        let divDice = createDivDice(num[load], result, urlImgDice);
        row.append(divDice);

        if(eval % 5 == 0){
            container.append(row);
            row = createRow();
        }
        if(eval == num.length){
            container.append(row);
        }
    }
}