//<!-- copy / send -->
var vocab = "";

async function copyText(text) {
    try {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful)
            showMessage("Copiado texto: " + text);
        else
            showMessage("Texto não compiado.");
    } catch (err) {
        showMessage(err);
    }
}

var firebase = "https://bilingual-reader-272ac-default-rtdb.firebaseio.com";
function sendText(envio, obj) {
    try {
        fetch(firebase + "/anki/ingles.json", {
            method: "PATCH",
            body: JSON.stringify(obj),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            if (response.ok)
            showMessage("Enviado: " + envio);
            else
            showMessage("Erro ao enviar o texto.");
        });
    } catch (err) {
        showMessage(err);
    }
}

function sendExclude(text) {
    let obj = {}
    obj[text] = text 
    try {
        fetch(firebase + "/anki/excluir/ingles.json", {
            method: "PATCH",
            body: JSON.stringify(obj),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            if (response.ok)
            showMessage("Enviado exclusão: " + text);
            else
            showMessage("Erro ao enviar a exclusão.");
        });
    } catch (err) {
        showMessage(err);
    }
}

function getText(type = "correcao") {
    let pattern = "";
    switch (type) {
        case "correcao":
        pattern = /([A-Za-z0-9']+)\s-\s(((?! - ).)*¹)/g;
        break;
        case "exclusao":
        pattern = /• ([A-Za-z0-9']+)\s-\s/g;
        break;
    }
    return vocabulario.matchAll(pattern);
}

function copiaCorrecaoIngles() {
    let correcoes = "";
    for (const match of getText())
        correcoes += match[0] + "\n";
    copyText(correcoes);
}

function enviaCorrecaoIngles() {
    let cardId = document.getElementById("card-id").innerHTML;
    let obj = {};
    let envio = [];

    const matches = getText();
        
    for (const match of matches) {
        obj[match[1]] = { vocabulario: match[1], portugues: match[2], cartao: cardId };
        envio.push(match[1]);
    }

    sendText(envio.join(' - '), obj);
}

function abrePopupExclusao() {
    let lista = [];

    const matches = getText("exclusao");
    for (const match of matches) {
        let html = "<div class='list-item' onclick=\"sendExclude('" + match[1].trim() + "')\">"+match[1]+"</div>";
        lista.push(html);
    }

    PopupAjax.showPopup('list', 'Envio de exclusão', lista.join(''));
    return false;
}

vocabulario = document.getElementById("vocabulario").innerHTML;
if (vocabulario) {
    document.getElementById("button-base").style.display = "block";
    if (vocabulario.includes("¹"))
        document.getElementById("button-copy").style.display = "inline";

    document.getElementById("button-send").style.display = document.getElementById("button-copy").style.display;
}

if (!isMobile && vocabulario && vocabulario.includes(">"))
    vocabulario  = vocabulario.replaceAll(/<[^>]+>/g, "");