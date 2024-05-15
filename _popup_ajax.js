PopupAjaxTemplate = "<div class= \"popup-card\"> \n  <div id= \"popup-card-title\" class= \"popup-card-title\"><div class=\"text\">{{title}}</div></div> \n  <div id= \"popup-card-content\" class= \"popup-card-content\"> \n    <div id= \"popup-card-list\" style='display: {{listvisible}};'>{{list}}</div>{{content}} \n  </div> \n  <div class= \"popup-card-base\"></div> \n</div>";
PopupAjaxCss = ".popup-card {\n    width: 300px;\n    border-radius: 18px;\n    background: white;\n    text-align: center;\n    border-width: 0;\n    margin:30px;\n  }\n\n  .night_mode .popup-card {\n    background: #1a1a1a !important;\n  }\n\n  .popup-card-title {\n    border-top-right-radius: 10px;\n    border-top-left-radius: 10px;\n    padding: 5px;\n    color: white;\n    min-height: 50px;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    background: #333333;\n    background: -webkit-linear-gradient(to top, #1a1a1a, #333333);\n    background: linear-gradient(to top, #1a1a1a, #333333);\n  }\n\n  .popup-card-title .text{\n    text-align: center;\n    font-size: 18px;\n  font-weight: bold;\n  }\n\n  .night_mode .popup-card-title {\n    background: #D7DDE8;\n    background: -webkit-linear-gradient(to top, #D7DDE8, #b6bbc9);\n    background: linear-gradient(to top, #D7DDE8, #b6bbc9);\n    color: #000000;\n  }\n\n  .popup-card-content {\n    margin: 5px;\n    margin-top: 10px;\n    margin-bottom: 10px;\n    color: grey;\n    font-size: 14px;\n    min-height: 100px;\n  }\n\n  .night_mode .popup-card-content {\n    color: #cccccc !important;\n  }\n\n  .list-item {\n    color: grey;\n    font-size:15px;\n    padding: 4px 29px 5px 29px; \n  }\n  .list-item:hover {\n    color: #333333;\n    background-color: #dcdcdc;\n  }\n\n  .night_mode .list-item {\n    color: #cccccc !important;\n  }\n\n  .night_mode .list-item:hover {\n    color: #333333 !important;\n  }\n\n  .popup-card-base {\n    height: 10px;\n    background: #1a1a1a;\n    border-bottom-right-radius: 10px;\n    border-bottom-left-radius: 10px;\n  }\n\n  .night_mode .popup-card-base {\n    background: #D7DDE8 !important;\n  }";

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

var PopupAjax = {
    basePath: "popupajax/",

    closePopupOnClick: false,

    //---------- end of settins --------------

    fatalError: false,
    
    AjaxPopupTemplate: "Couldn't load popup template.",

    AjaxPopupCache: {
    },
    
    preventClickEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.removeEventListener("click", PopupAjax.preventClickEvent);
        return false;
    },

    // inserts into the DOM what is necessary to show the default popup.
    setupPopup: function() {
        var div, style, url;

        if(PopupAjax.fatalError) {
            console.log('setupPopup: quitting because of fatal errors');
            return;
        }

        PopupAjax.AjaxPopupTemplate = PopupAjaxTemplate;
        
        // load the css
        if(!document.getElementById('PopupAjax_popup_style')) {
            style = document.createElement("style");
            style.innerText = PopupAjax.expandStyleTemplates(PopupAjaxCss);
            style.id = "PopupAjax_popup_style";
            document.head.appendChild(style);
        }

        // load the popup
        if(!document.getElementById('PopupAjax_popup')) {
            div = document.createElement("div");
            div.id = "PopupAjax_popup";
            div.className = 'PopupAjax_forbidden';
            div.style.display = 'none';
            document.body.appendChild(div);
        }
    },

    // cleans all the default popup stuff inserted in the DOM.
    cleanupPopup: function() {
        var el;
        if(el = document.getElementById('PopupAjax_popup'))
            PopupAjax.remove(el);
        if(el = document.getElementById('PopupAjax_popup_style'))
            PopupAjax.remove(el);
    },

    makePopupVisible: function(div) {
        console.log(div, $(div).find('img'))
        $(div).find('img').load(function() {
            var x,y;
            y = document.body.scrollTop + (window.innerHeight - $(div).outerHeight()) / 2;
            x = document.body.scrollLeft + (window.innerWidth - $(div).outerWidth()) / 2;
            $(div).css({left: x, top: y});
        });
        $(div).css({
            position: "absolute", display: 'block', visibility: 'hidden',
            marginLeft: 0, marginTop: 0, top: 0, left: 0
        });
        setTimeout(function() {
            var x, y;
            y = (window.innerHeight - $(div).outerHeight()) / 2;
            x = (window.innerWidth - $(div).outerWidth()) / 2;
            $(div).css({ display: 'none', visibility: 'visible' });
            if(PopupAjax.bPopup) {
            	PopupAjax.bPopup.close();
            	delete PopupAjax.bPopup;
            }
            PopupAjax.bPopup = $(div).bPopup({ 
            	speed: 120, 
            	transition: 'slideDown', 
            	transitionClose: 'slideDown', 
            	position: [x, y],
            	onClose: function() {if(PopupAjax.bPopup) {
                        PopupAjax.bPopup.close();
                        delete PopupAjax.bPopup;
                    }}
                });
            if(PopupAjax.closePopupOnClick) {
                div.onclick = function() {
                    if(PopupAjax.bPopup) {
                        PopupAjax.bPopup.close();
                        delete PopupAjax.bPopup;
                    }
                }
            }
        }, 10);        
    },
    
    resetIframeRequest: function() {
        if(PopupAjax.showErrorTimeout) { //async mess??
            clearTimeout(PopupAjax.showErrorTimeout);
            delete PopupAjax.showErrorTimeout;
        }
        if(PopupAjax.cleanupMessageListener)
            PopupAjax.cleanupMessageListener();
    },

    iframeRequest: function(url, success) {
        var messageHandler;
        PopupAjax.resetIframeRequest();

        // set handler for inter-frame messages
        messageHandler = function(event) {
            //event.target.removeEventListener(event.type, arguments.callee);
            PopupAjax.resetIframeRequest();
            success(event.data);
        }
        PopupAjax.cleanupMessageListener = (function(messageHandler){
            return function() {
                window.removeEventListener("message", messageHandler);
                delete PopupAjax.cleanupMessageListener;
            }
        })(messageHandler);
        window.addEventListener("message", messageHandler, false);

        // create hidden iframe, that will later communicate and auto-remove
        i = document.createElement('iframe');
        i.style.display = 'none';

        i.onload = (function(messageHandler, url) {
            return function(e) {
                i.parentNode.removeChild(i);
                if(PopupAjax.showErrorTimeout) { //async mess??
                    clearTimeout(PopupAjax.showErrorTimeout);
                    delete PopupAjax.showErrorTimeout;
                }
                PopupAjax.showErrorTimeout = setTimeout(function(){
                    if(PopupAjax.cleanupMessageListener) {
                        PopupAjax.cleanupMessageListener();
                        delete PopupAjax.showErrorTimeout;
                    }
                }, 1000);
            };
        })(messageHandler, url);
        i.src = url;
        document.body.appendChild(i);
    },
    
    // Utility for inserting node after a given one
    insertAfter: function(n, s) {
        n.parentNode.insertBefore(s, n.nextSibling);
    },

    remove: function(n) {
        if(n.remove)
            n.remove();
        else
            n.parentNode.removeChild(n);
    },
    
    expandStyleTemplates: function(template) {
        var h = document.documentElement.clientHeight;
        var w = document.documentElement.clientWidth;
        var whmin = Math.min(w,h);
        var content = template.replace(
            /\{\{([^{}]+)\}\}/g,
            function(match, expr) {
                expr = expr.replace(/\bWIDTH\b/g, w);
                expr = expr.replace(/\bHEIGHT\b/g, h);
                expr = expr.replace(/\bWHMIN\b/g, whmin);
                //console.log(expr);
                return eval(expr);
            });
        return content;
    },

    //PopupAjax.expandTemplate('{{%foo}} {{bar}} {{/foo}}',
    //    {'foo':[{'bar':'a'},{'bar':'b'}]})
    expandTemplate: function(template, obj) {
        var content = template.replace(
            /\{\{%(\w+)\}\}([\s\S]*)\{\{\/\1\}\}/g,
            function(match, key, inner) {
                var array, i, retv, item;
                if(!key in obj)
                    return "{unknown field "+key+"}";
                array = obj[key];
        
                if(!array)
                    return '';
                if(array.constructor != Array)
                    return "{field "+key+" is not an array!}";
                retv = '';
                for(i = 0; i < array.length; i++) {
                    item = array[i];
                    if(typeof(item)!='object')
                        item = {'THIS': item};
                    if(i!=0)
                        item.NOT_FIRST = true;
                    else
                        item.FIRST = true;
                    if(i!=array.length-1)
                        item.NOT_LAST = true;
                    else
                        item.LAST = true;
                    retv += PopupAjax.expandTemplate(inner, item);
                }
                return retv;
            });
        content = content.replace(
            /\{\{#(\w+)\}\}([\s\S]*)\{\{\/\1\}\}/g,
            function(match, key, inner) {
                return (key in obj) ? inner : '';
            });
        return content.replace(
            /\{\{(\w+)(?:\:(\w+))?\}\}/g,
            function(match, key, flags) {
                var val;
                if(key == 'POPUPAJAX_BASEPATH')
                    return PopupAjax.basePath;
                else if(!(key in obj))
                    return "{unknown field "+key+"}";
                else
                    return obj[key];
            });
    },

    showPopup: function(type, title, content) {
        var div, exp;

        var data = {
            'type': type, 
            'title': title, 
            'content': "", 
            'list': "",
            'listvisible': "gone"
        }
        switch (type.trim().toUpperCase()) {
            case "LIST":
                data['list'] = content
                data['listvisible'] = "block"
            break;
            default:
                data['content'] = content
        }
        
        //console.log(data)
        div = document.getElementById("PopupAjax_popup");
        exp = PopupAjax.expandTemplate(PopupAjax.AjaxPopupTemplate, data);
        //console.log(exp);
        div.innerHTML = exp;
        div.className = 'ajax_popup';
        PopupAjax.makePopupVisible(div);
    },
    
    display: function(el) {
        return el.currentStyle ? el.currentStyle.display : getComputedStyle(el, null).display;
    },
    
    cleanupTarget: function(el) {
        var doc, css;
        doc = el ? el.ownerDocument : document;
        if(css = doc.getElementById('PopupAjax_style'))
            css.remove();
    },

    setupTarget: function(el) {
        var style, doc;
        
        if(PopupAjax.fatalError) {
            console.log('setupTarget: quitting because of fatal errors');
            return;
        }

        doc = el ? el.ownerDocument : document;
        if(!doc.getElementById("PopupAjax_style")) {
            style = document.createElement("style");
            style.innerText = PopupAjaxCss;
            style.id = "PopupAjax_style";
            doc.head.appendChild(style);
        }
    },

    basicInstall: function(el, settings) {
        if(PopupAjax.fatalError) {
            console.log('basicInstall: quitting because of fatal errors');
            return;
        }

        PopupAjax.setupPopup();

        el = el || document.body;
        PopupAjax.setupTarget(el);
    },

    fullUninstall: function() {
        PopupAjax.cleanupPopup();
        el = el || document.body;
        PopupAjax.cleanupTarget(el);
    }
};
$(function(){
    PopupAjax.closePopupOnClick = true;
    PopupAjax.forcePopupPosition = 20;
    PopupAjax.basicInstall();
});
