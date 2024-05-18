
//<!-- progress bar -->
function progressBar(revCard, newCard, lrnCard) {
    var newCards = (newCard * 2) + lrnCard;
    var totalNewCard = 1;
    var totalRevCard = 1;
    if (Persistence.isAvailable()) {
        totalNewCard = Persistence.getItem("totalNew");
        if (totalNewCard == null) {
            totalNewCard = newCards;
            Persistence.setItem("totalNew", newCards);
        }

        totalRevCard = Persistence.getItem("totalRev");
        if (totalRevCard == null) {
            totalRevCard = revCard;
            Persistence.setItem("totalRev", revCard);
        }
    }

    var per = 0;
    if (revCard > 0)
        per = Math.trunc(100 - revCard * 100 / totalRevCard);
    else
        per = Math.trunc(100 - newCards * 100 / totalNewCard);

    document.getElementById("bar").style.width = per + "%";
}

async function progressBarAndroid() {
    var newCard = 0;
    var revCard = 0;
    var lrnCard = 0;
    switch (version) {
        case 3:
        case 2:
            try {
                var cards = await api.ankiGetRevCardCount();
                revCard = parseInt(cards.value);

                cards = await api.ankiGetNewCardCount();
                newCard = parseInt(cards.value);

                var cards = await api.ankiGetLrnCardCount();
                lrnCard = parseInt(cards.value);
            } catch(e){
            }
            break;
        case 1:
            revCard = parseInt(AnkiDroidJS.ankiGetRevCardCount());
            newCard = parseInt(AnkiDroidJS.ankiGetNewCardCount());
            lrnCard = parseInt(AnkiDroidJS.ankiGetLrnCardCount());
            break;
    }

    progressBar(revCard, newCard, lrnCard);
}

function progressBarDesktop() {
    // Desktop - Addon 1490471827
    pycmd("AnkiJS.ankiGetNewCardCount()", (newCard) => { 
        pycmd("AnkiJS.ankiGetLrnCardCount()", (lrnCard) => { 
        pycmd("AnkiJS.ankiGetRevCardCount()", (revCard) => progressBar(revCard, newCard, lrnCard));
        });
    });
}


if (isMobile)
    progressBarAndroid();
else
    progressBarDesktop();
