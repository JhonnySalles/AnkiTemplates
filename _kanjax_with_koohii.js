KanjaxBlobFields = ["kanji","palavra","significado","keyword","meaning","koohii1","koohii2","onyomi","kunyomi","onwords","kunwords","jlpt","grade","freq","strokes","variants","radical","parts","utf8","sjis","compos","sing1","sing2"];

KanjaxPopupTemplate = "<div class=\"title title_jlpt_{{jlpt}}\">\n<img id=\"strokes\" src=\"_{{kanji}}.gif\"/>\n<table border=\"0\">\n  <tr>\n    <td rowspan='2' ><span class=\"huge japanese\" id=\"kanji\">{{kanji}}</span></td>\n    <td>\n      <span class=\"medium bold editable\" id=\"keyword\">{{palavra}}</span>\n      <span class=\"medium italic editable\" id=\"meaning\">({{significado}})</span>\n    </td>\n  </tr>\n  <tr>\n    <td> \n      <span class=\"medium bold editable\" id=\"keyword\">{{keyword}}</span> \n      <span class=\"medium italic editable\" id=\"meaning\">({{meaning}})</span>\n    </td>\n  </tr>\n</table>\n</div>\n<br>\n<div class=\"content\">\n<table border=\"0\">\n    <colgroup>\n        <col span=\"1\" style=\"width: 50%\">\n        <col span=\"1\" style=\"width: 50%\">\n    </colgroup>\n    <tbody>\n    <tr>\n        <td><span class=\"jlpt_{{jlpt}}\">jlpt N{{jlpt}}</span></td>\n        <td><span class=\"medium\">grade: {{grade}}</span></td>\n    </tr>\n    </tbody>\n</table>\n<table border=\"0\" style=\"width: 100%\">\n    <colgroup>\n        <col span=\"1\" style=\"width: 30%\">\n        <col span=\"1\" style=\"width: 70%\">\n    </colgroup>\n    <tbody>\n    <tr>\n        <td style=\"vertical-align: top\"><span class=\"small\"><i>traços:</i> {{strokes}}</span></td>\n        <td style=\"vertical-align: top\"><span class=\"small\"><i>frequência:</i> {{freq}}</span></td>\n    </tr>\n    </tbody>\n</table>\n<table border=\"0\" style=\"width: 100%\">\n    <colgroup>\n        <col span=\"1\" style=\"width: 30%\">\n        <col span=\"1\" style=\"width: 70%\">\n    </colgroup>\n    <tr>\n        <td style=\"vertical-align: top\"><span class=\"small\" id=\"variant\"><i>variante:</i> {{variants}}</span></td>\n        <td style=\"vertical-align: top\"><span class=\"small\" id=\"part\"><i>partes:</i> {{parts}}</span></td>\n    </tr>\n</table>\n<table border=\"0\" style=\"width: 100%\">\n    <colgroup>\n        <col span=\"1\" style=\"width: 30%\">\n        <col span=\"1\" style=\"width: 70%\">\n    </colgroup>\n    <tr>\n        <td style=\"vertical-align: top\"><span class=\"small\" ><i>composição:</i></span></td>\n        <td style=\"vertical-align: top\"><span class=\"small\" id=\"radical\"><i>radical:</i> {{radical}}</span></td>\n    </tr>\n</table>\n<span class=\"small\" id=\"compos\">{{compos}}</span>\n<br><br>\n<span class=\"small editable\">意味</span>\n<table class=\"small\" border=\"0\" style=\"width: 100%\">\n    <colgroup>\n        <col span=\"1\" style=\"width: 50%\">\n        <col span=\"1\" style=\"width: 50%\">\n    </colgroup>\n    <tbody>\n    <tr>\n        <td style=\"vertical-align: top\"> {{sing1}}</td>\n        <td style=\"vertical-align: top\"> {{sing2}}</td>\n    </tr>\n    </tbody>\n</table><br><span class=\"small editable\" id=\"desc\">    <i>k1)</i> {{koohii1}}<br>    <i>k2)</i> {{koohii2}}</span>\n<table class=\"small\" border=\"0\" style=\"width: 100%\">\n    <colgroup>\n        <col span=\"1\" style=\"width: 50%\">\n        <col span=\"1\" style=\"width: 50%\">\n    </colgroup>\n    <tbody>\n    <tr>\n        <td style=\"vertical-align: top\">\n            <div style=\"margin-bottom: 0.4em\"><i class=\"small\">On: </i> <span id=\"onyomi\" class=\"medium japanese\">{{onyomi}}</span>\n            </div>\n            {{onwords}}\n        </td>\n        <td style=\"vertical-align: top\">\n            <div style=\"margin-bottom: 0.4em\"><i class=\"small\">Kun: </i> <span id=\"onyomi\" class=\"medium japanese\">{{kunyomi}}</span>\n            </div>\n            {{kunwords}}\n        </td>\n    </tr>\n    </tbody>\n</table>\n<div style=\"text-align: center\">\n  <img id=\"Img1\" width=\"50%\" src=\"_Img1_{{kanji}}.png\"/><img id=\"Img2\" width=\"50%\" src=\"_Img2_{{kanji}}.png\"/>\n</div>\n<div class=\"small\" style=\"text-align: center\">\n  <a id=\"koohii\" href=\"http://jisho.org/search/%23kanji%20{{kanji}}\"\n    href=\"http://kanji.koohii.com/study/kanji/{{kanji}}\">Koohii</a>\n</div>\n<br>\n<div class=\"small\" style=\"color: #000000\">JLPT <span class=\"jlpt_5\">N5</span>, <span class=\"jlpt_4\">N4</span>, <span class=\"jlpt_3\">N3</span>, <span class=\"jlpt_2\">N2</span>, <span class=\"jlpt_1\">N1</span>, <span class=\"jlpt_\">Não classificado</span></div>\n</div>";
KanjaxPopupCss = ".kanji_popup {\n  width:         {{Math.min(WIDTH-18, WIDTH/2+200)}}px;\n  max-height:    {{HEIGHT*5/6}}px;\n  background-color: #f2f2f2;\n  border:        1px solid #bfbfbf;\n  border-radius: 6px;\n  text-align:    left;\n  overflow:      auto;\n}\n.night_mode #kanjax_popup {\n  background-color: #1a1a1a;\n  border: 1px solid #0d0d0d;\n}\n.night_mode #kanjax_popup img {\n  filter: invert(1);\n  -webkit-filter:invert(1);\n}\n.night_mode #kanjax_popup a {\n  color: #ffff00;\n}\n.kanji_popup div, .kanji_popup span, .kanji_popup td {\n  cursor: default;\n}\n/*.kanji_popup .editable:hover {\n  background-color: white;\n}*/\n.kanji_popup input{\n  font-weight: inherit;\n  font-family: inherit;\n  font-style:  inherit;\n  font-size:   80%;\n  word-break:  break-word;\n}\n.kanji_popup #strokes {\n  max-height: {{12+HEIGHT/5}}px;\n  float: left;\n  margin-right: 0.7em;\n  margin-bottom: 0.2em;\n}\n.kanji_popup #onyomi, .kanji_popup #kunyomi {\n  font-style: normal;\n}\n.kanji_popup #kanji {\n  margin-right: 0.6em;\n}\n.kanji_popup #keyword {\n  margin-left: 0.6em;\n}\n.kanji_popup #yomi, .kanji_popup #strokes {\n  margin-top: 0.2em;\n  margin-bottom: 0.2em;\n}\n/*.kanji_popup .japanese { font-family: \"Kochi Mincho\"; }*/\n.kanji_popup .small {font-size: {{Math.round(9+WHMIN/80)}}px;}\n.kanji_popup .medium {font-size: {{Math.round(12+WHMIN/60)}}px;}\n.kanji_popup .large {font-size: {{Math.round(14+WHMIN/43)}}px;}\n.kanji_popup .huge  {font-size: {{Math.round(20+WHMIN/27)}}px;}\n.kanji_popup .bold  {font-weight: bold;}\n .night_mode i {\n color: #b3b3b3 !important; \n} \n .kanji_popup .italic {font-style: italic;}\n\n.dict_popup {\n  max-height:    400px;\n  overflow:      auto;\n  width:         640px;\n  background-color: #ffffff;\n  background-image: linear-gradient(315deg, #ffffff 0%, #f2f2f2 74%);\n  border-radius: 17px;\n  text-align:    left;\n}\n.dict_popup .main {\n  font-size: 160%;\n}\n.dict_popup .othf {\n  color: #555;\n  font-size: 70%;\n}\n.dict_popup .pos {\n  color: #800;\n  font-size: 70%;\n  font-style: italic;\n  margin-top: 0.5em;\n  margin-left: -1.2em;\n}\n.dict_popup .misc {\n  color: #555;\n  font-size: 70%;\n}\n.dict_popup .refs {\n  color: #555;\n  font-size: 70%;\n}\n.dict_popup ol {\n  margin-top: 0.3em;\n  margin-bottom: 0.3em;\n}\n.dict_popup li {\n  color: #345;\n}\n.dict_popup li span {\n  color: black;\n}\n.jlpt_ {\n  color:     #666666 !important;\n  padding:   0px     !important;\n  border:    none    !important;\n  background-image: none !important;\n  display:   inline  !important;\n  cursor:    pointer !important;\n}\n.night_mode .jlpt_ {\n  color: #b3b3b3 !important;\n}\n .jlpt_5 {\n  color:     #8600b3 !important;\n  padding:   0px     !important;\n  border:    none    !important;\n  background-image: none !important;\n  display:   inline  !important;\n  cursor:    pointer !important;\n}\n.night_mode .jlpt_5 {\n  color: #b366ff !important;\n}\n.jlpt_4 {\n  color:     #0059b3 !important;\n  padding:   0px     !important;\n  border:    none    !important;\n  background-image: none !important;\n  display:   inline  !important;\n  cursor:    pointer !important;\n}\n.night_mode .jlpt_4 {\n  color: #668cff !important;\n}\n.jlpt_3 {\n  color:     #00b32d !important;\n  padding:   0px     !important;\n  border:    none    !important;\n  background-image: none !important;\n  display:   inline  !important;\n  cursor:    pointer !important;\n}\n.night_mode .jlpt_3 {\n  color: #66ff66 !important;\n}\n.jlpt_2 {\n  color:     #cc7a00 !important;\n  padding:   0px     !important;\n  border:    none    !important;\n  background-image: none !important;\n  display:   inline  !important;\n  cursor:    pointer !important;\n}\n.night_mode .jlpt_2 {\n  color: #ffc266 !important;\n}\n.jlpt_1 {\n  color:     #b30000 !important;\n  padding:   0px     !important;\n  border:    none    !important;\n  background-image: none !important;\n  display:   inline  !important;\n  cursor:    pointer !important;\n}\n.night_mode .jlpt_1 {\n  color: #ff4d4d !important;\n}\n\n.title {\n  padding: 6px;\n  background: #666666 !important;\n}\n.title span {\n  color: white !important; \n}\n.title img {\n  border-radius: 6px;\n}\n.night_mode .title {\n  background: #b3b3b3 !important;\n}\n.title.title_jlpt_ {\n  background: #666666 !important;\n}\n.night_mode .title.title_jlpt_ {\n  background: #a6a6a6 !important;\n}\n.title.title_jlpt_5 {\n  background: #8600b3 !important;\n}\n.night_mode .title.title_jlpt_5 {\n  background: #b366ff !important;\n}\n.title.title_jlpt_4 {\n  background: #0059b3 !important;\n}\n.night_mode .title.title_jlpt_4 {\n  background: #668cff !important;\n}\n.title.title_jlpt_3 {\n  background: #00b32d !important;\n}\n.night_mode .title.title_jlpt_3 {\n  background: #00e600 !important;\n}\n.title.title_jlpt_2 {\n  background: #cc7a00 !important;\n}\n.night_mode .title.title_jlpt_2 {\n  background: #e6b800 !important;\n}\n.title.title_jlpt_1 {\n  background: #b30000 !important;\n}\n.night_mode .title.title_jlpt_1 {\n  background: #ff4d4d !important;\n}\n\n@media only screen and (max-width: 600px) {\n  .title {\n    padding: 6px;\n    background: #b3b3b3 !important;\n  }\n  .title img {\n    width: 150px;\n  }\n  .title.title_jlpt_ {\n    background: #a6a6a6 !important;\n  }\n  .title.title_jlpt_5 {\n    background: #b366ff !important;\n  }\n  .title.title_jlpt_4 {\n    background: #668cff !important;\n  }\n  .title.title_jlpt_3 {\n    background: #00e600 !important;\n  }\n  .title.title_jlpt_2 {\n    background: #e6b800 !important;\n  }\n  .title.title_jlpt_1 {\n    background: #ff4d4d !important;\n  }\n}\n\n.content {\n  padding-left: 12px;\n  padding-bottom: 12px;\n  padding-right: 12px;\n}\n.content img {\n  width: 50%;\n}\n";
KanjaxCss = ".kanjax {\n    color:     #c00000 !important;\n    padding:   0px     !important;\n    border:    none    !important;\n    background-image: none !important;\n    display:   inline  !important;\n    cursor:    pointer !important;\n}\na .kanjax {\n    color: #a000a0  !important;\n    cursor: pointer !important;\n}\n.night_mode .kanjax {\n    color: #40ffff !important;\n}\n.night_mode a .kanjax {\n    color: #60ff60 !important;\n}\n.kanjax_lemma {\n    cursor:           pointer !important;\n    border-radius:    5px     !important;\n    padding:          1px     !important;\n}\n.kanjax_lemma:hover {\n    background-color: #ffffa0 !important;\n}\n.kanjax_ruby {\n    text-align: center    !important;\n    display: inline-block !important;\n}\n.kanjax_rt {\n    display: block !important;\n    font-size: 65%;\n    text-indent: 0px;\n    line-height: 0.9em;\n}\nrt, rp { font-size: 65%; }\nrt {\n    -moz-user-select: none;\n    -khtml-user-select: none;\n    -ms-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n}\n.kanjax_0 {\n    color:     #666666 !important;\n    padding:   0px     !important;\n    border:    none    !important;\n    background-image: none !important;\n    display:   inline  !important;\n    cursor:    pointer !important;\n}\n.night_mode .kanjax_0 {\n    color: #b3b3b3 !important;\n}\n.kanjax_5 {\n    color:     #8600b3 !important;\n    padding:   0px     !important;\n    border:    none    !important;\n    background-image: none !important;\n    display:   inline  !important;\n    cursor:    pointer !important;\n}\n.night_mode .kanjax_5 {\n    color: #b366ff !important;\n}\n.kanjax_4 {\n    color:     #0059b3 !important;\n    padding:   0px     !important;\n    border:    none    !important;\n    background-image: none !important;\n    display:   inline  !important;\n    cursor:    pointer !important;\n}\n.night_mode .kanjax_4 {\n    color: #668cff !important;\n}\n.kanjax_3 {\n    color:     #00b32d !important;\n    padding:   0px     !important;\n    border:    none    !important;\n    background-image: none !important;\n    display:   inline  !important;\n    cursor:    pointer !important;\n}\n.night_mode .kanjax_3 {\n    color: #66ff66 !important;\n}\n.kanjax_2 {\n    color:     #cc7a00 !important;\n    padding:   0px     !important;\n    border:    none    !important;\n    background-image: none !important;\n    display:   inline  !important;\n    cursor:    pointer !important;\n}\n.night_mode .kanjax_2 {\n    color: #ffc266 !important;\n}\n.kanjax_1 {\n    color:     #b30000 !important;\n    padding:   0px     !important;\n    border:    none    !important;\n    background-image: none !important;\n    display:   inline  !important;\n    cursor:    pointer !important;\n}\n.night_mode .kanjax_1 {\n    color: #ff4d4d !important;\n}\n";
KanjaxRubyCss = ".kanjax_ruby {\n    text-align: center;\n\n    /* fixes webkit flickering */\n    display: inline-block !important;\n}\n.emptied_by_me {\n    display: none !important;\n}\n.kanjax_rt {\n    display: block; /*!important;*/\n    text-indent: 0px;\n    line-height: 0.9em;\n\n    font-size: 65%;\n    -moz-user-select: none;\n    -khtml-user-select: none;\n    -ms-user-select: none;\n    -webkit-user-select: none;\n    -webkit-touch-callout: none;\n    user-select: none;\n    -webkit-text-size-adjust:0;\n}\n/*ruby {\n    display: inline-block;\n}\nrt {\n    display: block;\n\n    font-size: 65%;\n    -moz-user-select: none;\n    -khtml-user-select: none;\n    -ms-user-select: none;\n    -webkit-user-select: none;\n    -webkit-touch-callout: none;\n    user-select: none;\n    -webkit-text-size-adjust:0;\n}*/";

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

var KanJax = {
    basePath: "kanjax/",
    
    styleFile: "kanjax.css",

    loadStaticJSON: false,
    
    staticDataPath: "kanjax/static_data/",
    
    loadJsBlob: false,
    
    closePopupOnClick: false,
    
    hideTitleTooltips: true,

    profile: true,
    
    useRubyElement: false,
    
    rubyElementDisplayInlineBlock: true,

    rubySkipGroupIf: function(node) {
        if(['RB','RUBY'].indexOf(node.tagName) >= 0)
            return true;
        if(node.tagName == 'SPAN' && 
            ['kanjax_lemma', 'kanjax_ruby','kanjax_rt'].indexOf(node.className) >= 0)
            return true;
        return false;
    },
    
    // while increasing this limit, keep in mind that each japanese char
    // is expanded to about 9 ascii chars, so, the POST request must allow
    // a request of size at least postJPCharsSoftLimit * 9.
    postJPCharsSoftLimit: 20000,
    
    //---------- end of settins --------------

    fatalError: false,
    
    kanjiPopupTemplate: "Couldn't load popup template.",

    kanjiPopupCache: {
    },
    
    html: (function(){
        var entityMap = { "&": "&amp;",  "<": "&lt;",  ">": "&gt;",
                '"': '&quot;',  "'": '&#39;',  "/": '&#x2F;'  };
        var replacer = function (s) {
            return entityMap[s];
        };
        return function(string) {
            return String(string).replace(/[&<>"'\/]/g, replacer);
        };
    })(),
    
    errorMessage: function(url, xhr, msg) {
        return 'Loading "'+KanJax.html(url)+'": <br/>'+
            msg + ' - ' + KanJax.html(xhr.status)+
            ' ('+KanJax.html(xhr.statusText)+')';
    },
    
    preventClickEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.removeEventListener("click", KanJax.preventClickEvent);
        return false;
    },

    // inserts into the DOM what is necessary to show the default popup.
    setupPopup: function() {
        var div, style, url;

        // make sure the error popup has a style,
        // even and in particular in case of fatal error
        if(!document.getElementById("kanjax_error_popup_style")) {
            style = document.createElement("style");
            style.id = "kanjax_error_popup_style";
            style.innerText = ".error_popup { "+
                              "  background-color: #f44;"+
                              "}";




