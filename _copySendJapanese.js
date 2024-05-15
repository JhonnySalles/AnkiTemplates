//<!-- copy / send -->
var vocabulario = "";

async function copyText(text) {
    try {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        let successful = document.execCommand('copy');
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
        fetch(firebase + "/anki/japones.json", {
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
    let envio = {};
    envio[text] = text
    try {
    fetch(firebase + "/anki/excluir/japones.json", {
        method: "PATCH",
        body: JSON.stringify(envio),
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
            pattern = /([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+)\s-\s(((?! - ).)*¹)/g;
            break;
        case "exclusao":
            pattern = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+/g;
            break;
    }
    return vocabulario.matchAll(pattern);
}

function copiaCorrecaoJapones() {
    let correcoes = "";
    for (const match of getText())
        correcoes += match[0] + "\n";
    copyText(correcoes);
}

function enviaCorrecaoJapones() {
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
        let html = "<div class='list-item' onclick='sendExclude(\"" + match + "\")'>"+match+"</div>";
        lista.push(html);
    }

    PopupAjax.showPopup('list', 'Envio de exclusão', lista.join(''))
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