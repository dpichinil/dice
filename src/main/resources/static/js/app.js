
const urlPage = "/dice";

const typeSuccess = 1;
const typeWarning = 2;
const typeError = 3;
const typeOther = 4;

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

const idDivDifficult = "divDifficult";
const idDivDice = "divDice";
const idDivRollButtons = "divRollButtons";
const idDivInfoRoll = "divInfoRoll";

$(document).ready(function(){
    controlEvent();
    showControlsGame(true);
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

    $('#'+idBtnCreateGame).click(function(){
        createGame();
    });
    $('#'+idBtnJoinGame).click(function(){
        joinGame();
    });
    $('#'+idBtnExitGame).click(function(){
        showControlsGame(true);
        showMessage("Haz salido del juego",typeOther);
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
    let keyGame = $('#'+idTxtCodeGame).val();
    let token = obtainToken();
    $.ajax({
        type:'GET',
        url: urlPage+"/api/dice/get/"+keyGame+"/"+token,
        contentType: 'application/json',
        success: function(result,status,xhr){
            if(result.code == 0){
                loadDice(result.data);
                showMessage(result.message, typeSuccess);
                showControlsGame(false);
            }else{
                showMessage(result.message, typeError);
            }
        },
        error: function(xhr,status,error){
            showMessage(status, typeError);
        },
        complete: function(xhr,status){
            console.log(status);
        }
    });
}

function unlockRollDice(){
    let token = obtainToken();
    let codeGame = $('#'+idTxtCodeGame).val();
    $.ajax({
        type:'GET',
        url: urlPage+"/api/dice/modify/"+codeGame+"/"+token,
        contentType: 'application/json',
        success: function(result,status,xhr){
            if(result.code == 0){
                showMessage(result.message, typeSuccess);
            }else{
                showMessage(result.message, typeError);
            }
        },
        error: function(xhr,status,error){
            showMessage(status, typeError);
        },
        complete: function(xhr,status){
            console.log(status);
        }
    });
}



function rollDice(){
    let token = obtainToken();
    let jsonData = loadDataRoll();
    if(validateDataRoll(jsonData)){
        $.ajax({
            type:'POST',
            url: urlPage+"/api/dice/throw/"+token,
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            success: function(result,status,xhr){
                if(result.code == 0){
                    loadDice(result.data);
                    showMessage(result.message, typeSuccess);
                }else{
                    showMessage(result.message, typeError);
                }
            },
            error: function(xhr,status,error){
                showMessage(status, typeError);
            },
            complete: function(xhr,status){
                console.log(status);
            }
        });
    }
}

function loadDataRoll(){
    let numberDice = $('#'+idTxtNumberDice).val();
    let codeGame = $('#'+idTxtCodeGame).val();
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

function validateDataRoll(jsonData){
    if(jsonData.diceCount > 0){
        if(jsonData.key.trim().length > 0){
            if(jsonData.difficult != null && jsonData.difficult > 0){
                return true;
            }else{
                showMessage("La dificultad debe ser mayor que 1", typeError);
            }
        }else{
            showMessage("No ha Ingresado un codigo de juego", typeError);
        }
    }else{
        showMessage("El número de dados debe ser mayor a 0", typeError);
    }
    return false;
}

function joinGame(){
    let name = $('#'+idTxtNamePlayer).val();
    let keyGame = $('#'+idTxtCodeGame).val();
    let token = obtainToken();
    let jsonData = {"player":name, "key":keyGame};
    if(validateDataJoin(jsonData)){
        $.ajax({
            type:'POST',
            url: urlPage+"/api/dice/join/"+token,
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            success: function(result,status,xhr){
                if(result.code == 0){
                    showMessage(result.message, typeSuccess);
                    showControlsGame(false);
                }else{
                    showMessage(result.message, typeError);
                }
            },
            error: function(xhr,status,error){
                showMessage(status, typeError);
            },
            complete: function(xhr,status){
                console.log(status);
            }
        });
    }
}

function validateDataJoin(jsonData){
    if(jsonData.key != null && jsonData.key.trim().length > 0){
        if(jsonData.player != null && jsonData.player.trim().length > 0){
            return true;
        }else{
            showMessage("Nombre de jugador no ingresado", typeError);
        }
    }else{
        showMessage("Clave de juego No Ingresado", typeError);
    }
    return false;
}

function obtainToken(){
    let token = sessionStorage.getItem("token");
    if(token==null || token==''){
        token = new Date().getTime();
        sessionStorage.setItem("token", ''+token);
    }
    return token;
}

function createGame(){
    let name = $('#'+idTxtNamePlayer).val();
    let token = obtainToken();
    let jsonData = {"player":name};
    if(validateDataCreate(jsonData)){
        $.ajax({
            type:'POST',
            url: urlPage+"/api/dice/create/"+token,
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            success: function(result,status,xhr){
                if(result.code == 0){
                    $('#'+idTxtCodeGame).val(result.data);
                    showMessage(result.message, typeSuccess);
                    showControlsGame(false);

                }else{
                    showMessage(result.message, typeError);
                }
            },
            error: function(xhr,status,error){
                showMessage(status, typeError);
            },
            complete: function(xhr,status){
                console.log(status);
            }
        });
    }
}

function validateDataCreate(jsonData){
    if(jsonData.player.length > 0){
        return true;
    }else{
        showMessage("Nombre de Jugador No ingresado", typeError);
    }
    return false;
}

function showControlsGame(showButton){
    if(showButton){
        $('#'+idBtnJoinGame).show();
        $('#'+idBtnCreateGame).show();
        $('#'+idBtnExitGame).hide();
        $('#'+idTxtCodeGame).prop('disabled',false);

        $('#'+idDivDifficult).hide();
        $('#'+idDivDice).hide();
        $('#'+idDivRollButtons).hide();
        $('#'+idDivInfoRoll).hide();
        $('#'+idDiceContainer).hide();

        $('#'+idLblResultValue).html('');
        $('#'+idLblResultText).html('--');
        $('#'+idLblPlayer).html('--');
        $('#'+idLblDifficult).html('--');
        $('#'+idLblNumberDice).html('--');
        $('#'+idTxtDifficult).val(6);
    }else{
        $('#'+idBtnJoinGame).hide();
        $('#'+idBtnCreateGame).hide();
        $('#'+idBtnExitGame).show();
        $('#'+idTxtCodeGame).prop('disabled',true);

        $('#'+idDivDifficult).show();
        $('#'+idDivDice).show();
        $('#'+idDivRollButtons).show();
        $('#'+idDivInfoRoll).show();
        $('#'+idDiceContainer).show();
    }
}

function difficult(difficult){
    $('#'+idTxtDifficult).val(difficult);
}

function showMessage(message, type){
    let span = $('#'+idSpanMessage);
    span.removeClass();
    switch (type) {
        case typeSuccess:
            span.addClass('text-success');
            break;
        case typeWarning:
            span.addClass('text-warning');
            break;
        case typeError:
            span.addClass('text-danger');
            break;
        default:
            span.addClass('text-light');
            break;
    }
    span.html(message);
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
    let urlImgDice=urlPage+'/static/img';
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

function createRow(){
    let row = $('<div/>');
    row.addClass('row');
    return row;
}

function createDivDice(num, result, url){
    let divDice = $('<div/>');
    divDice.addClass('col-sm-2');
    divDice.addClass('text-center');

    let img = $('<img/>');
    img.addClass('img-dice');

    let nameDice = 'dice_'+result+'_'+num+'.png';
    img.attr('src', url+'/'+nameDice);

    divDice.append(img);
    return divDice;
}

function evaluateSuccess(num,difficult){
    let result='';
    if(num >= difficult){
        if(num == 10 && difficult != 10){
            result = 'ss';
        }else{
            result = 's';
        }
    }else{
        result = 'm';
    }
    return result;
}