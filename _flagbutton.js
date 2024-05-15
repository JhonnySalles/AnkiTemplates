//<!-- buttons -->
var flag = 'none';

function changeColor(color) {
    const button = document.getElementById("flag-card"); 
    const baseStyle = "material-icons"
    switch (color) {
    case 'red':
        button.className = baseStyle + " FlagRed";
        break;
    case 'orange':
        button.className = baseStyle + " FlagOrange";
        break;
    case 'green':
        button.className = baseStyle + " FlagGreen";
        break;
    case 'blue':
        button.className = baseStyle + " FlagBlue";
        break;
    default:
        button.className = baseStyle;
    }
}

function getAnkiColor(color) {
    switch (version) {
    case 3:
    case 2:
        return color;
    case 1:
        switch (color) {
        case 'red':
            return 1;
        case 'orange':
            return 2;
        case 'green':
            return 3;
        case 'blue':
            return 4;
        default:
            return 0;
        }
    }
}

function markFlag(color) {  
    if (flag != color)
        flag = color;
    else
        flag = 'none';

    changeColor(flag);

    switch (version) {
        case 3:
        case 2:
            api.ankiToggleFlag(getAnkiColor(color));
            break;
        case 1:
            ankiToggleFlag(getAnkiColor(color));
            break;
    }
}

async function init() {
    switch (version) {
    case 3:
    case 2:
        var cardFlag = await api.ankiGetCardFlag();
        switch (parseInt(cardFlag.value)) {
        case 1:
            flag = 'red';
            break;
        case 2:
            flag = 'orange';
            break;
        case 3:
            flag = 'green';
            break;
        case 4:
            flag = 'blue';
            break;
        default:
            flag = 'none';
        }
        break;
    case 1:
        flag = AnkiDroidJS.ankiGetCardFlag();
        break;
    }
    changeColor(flag);
}

if (/Android/i.test(navigator.userAgent)) {
    if (version > 0) {
    flag = 'none';
    document.getElementById("button-flag").style.display = "block";
    init();		
    }  
};