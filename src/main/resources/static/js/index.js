const idFormCreate = "form-create";
const idFormJoin = "form-join";
const idLinkCreate = "linkCreate";
const idLinkJoin = "linkJoin";

const idBtnCreateGame = "btnCreateGame";
const idBtnJoinGame = "btnJoinGame";

const idTxtNameCreate = "txtName-create";
const idTxtNameJoin = "txtName-join";
const idTxtCodeGameJoin = "txtCodeGame-join";

const idSpanMessage = "spanMessage";


$(document).ready(function(){
    $("#"+idFormJoin).hide();
    controlClick();
    showDiv(idFormJoin, false);
});
function controlClick(){
    $("#"+idLinkCreate).click(function(){
        $("#"+idLinkCreate).addClass("active");
        $("#"+idLinkJoin).removeClass("active");
        showDiv(idFormCreate, true);
        showDiv(idFormJoin, false);

    });
    $("#"+idLinkJoin).click(function(){
        $("#"+idLinkCreate).removeClass("active");
        $("#"+idLinkJoin).addClass("active");
        showDiv(idFormCreate, false);
        showDiv(idFormJoin, true);
    });

    $('#'+idBtnCreateGame).click(function(){
        createGame();
    });
    $('#'+idBtnJoinGame).click(function(){
        joinGame();
    });
}

function showDiv(id, status){
    if(status){
        $('#'+id).css('display','block');
    }else{
        $('#'+id).css('display','none');
    }
}

function createGame(){
    let name = $('#'+idTxtNameCreate).val();
    let token = obtainToken();
    let jsonData = {"player":name};
    $.ajax({
        type:'POST',
        url: contextRoot+"api/dice/create/"+token,
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function(result,status,xhr){
            if(result.code == 0){
                setCodeGame(result.data);
                setNamePlayer($('#'+idTxtNameCreate).val());
                showMessage(idSpanMessage, "Ingresando al juego...", typeSuccess);
                redirectWhitMessage(delayRedirect, contextRoot+"home");
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

function joinGame(){
    let name = $('#'+idTxtNameJoin).val();
    let keyGame = $('#'+idTxtCodeGameJoin).val();
    let token = obtainToken();
    let jsonData = {"player":name, "key":keyGame};
    $.ajax({
        type:'POST',
        url: contextRoot+"api/dice/join/"+token,
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function(result,status,xhr){
            if(result.code == 0){
                setCodeGame($('#'+idTxtCodeGameJoin).val());
                setNamePlayer($('#'+idTxtNameJoin).val());
                showMessage(idSpanMessage, result.message, typeSuccess);
                redirectWhitMessage(delayRedirect, contextRoot+"home");
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
