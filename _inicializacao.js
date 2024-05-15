//<!-- anki inicializacao -->
var isMobile = false;
var version = 0;
var api;

function showMessage(message) {
    if (isMobile) {
    switch (version) {
        case 3:
        case 2:
            api.ankiShowToast(message);
        break;
        case 1:
            ankiShowToast(message);
        break;
        }
    } else
        console.log(message);
}

function instancia(ver) {
    var jsApiContract = {"version" : "0.0.0", "developer" : "jhonnysallesnoschag@hotmail.com"};
    switch (ver) {
    case 3:
        jsApiContract.version = "0.0.3";
        api = new AnkiDroidJS(jsApiContract);
        break;
    case 2:
        jsApiContract.version = "0.0.2";
        api = new AnkiDroidJS(jsApiContract);
        break;
    case 1:
        jsApiContract.version = "0.0.1";
        var apiStatus = AnkiDroidJS.init(JSON.stringify(jsApiContract));
        api = null;
        break;
    }
    version = ver;
}

if (/Android/i.test(navigator.userAgent)) {
    isMobile = true;
    for (let i = 3; i > 0; i--) {
        try {
            instancia(i);
            break;
        } catch(e){
            version = 0;
        }
    }
}