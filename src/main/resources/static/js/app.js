// const urlPage = "http://localhost:8080/dados";
const typeSuccess = 1;
const typeWarning = 2;
const typeError = 3;
const typeOther = 4;
const delayRedirect = 1000;

function obtainToken(){
    let token = sessionStorage.getItem("token");
    if(token==null || token==''){
        token = new Date().getTime();
        sessionStorage.setItem("token", ''+token);
    }
    return token;
}
function getCodeGame(){
    let code = sessionStorage.getItem("code");
    return code;
}
function setCodeGame(code){
    sessionStorage.setItem("code", code);
}
function getNamePlayer(){
    let name = sessionStorage.getItem("name");
    return name;
}
function setNamePlayer(name){
    sessionStorage.setItem("name", name);
}

function showMessage(id, message, type){
    let span = $('#'+id);
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

function createRow(){
    let row = $('<div/>');
    row.addClass('row');
    row.addClass('mb-2');
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

function redirectWhitMessage(delay, url){
    setTimeout(function(){ window.location.href = url;},delay);
}