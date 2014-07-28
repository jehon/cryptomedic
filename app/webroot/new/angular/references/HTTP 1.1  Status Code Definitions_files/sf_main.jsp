(function(){



















if(window.superfish){
} 
else {
    if( window == top ){
        
        
        
        if( window.location.href.indexOf( "amazon.com/" ) > 0 && window.location.href.indexOf( "/search/" ) > 0 && window.location.href.indexOf( "#sf" ) > 0 ){
            window.location.replace( window.location.href.substring( 0, window.location.href.indexOf( "#sf" ) ) );
        }
        spsupport = {
            log : function(){
    //window.console ? console.log( arguments ) : function(){}
    if (window.console) {
        for(var i in arguments) {
            console.log(arguments[i]);
        }
    }
}
        };
        spsupport.b = {};
        spsupport.br = { isIE7: 0};
        
        window.superfish = {};
superfish.b = {
    inj : function( d, url, js, cb) {
    if (window.location.protocol.indexOf( "https" ) > -1) {
        url = url.replace("http:","https:");
    }
    else {
        url = url.replace("https","http");
    }

    var h = d.getElementsByTagName('head')[0];
    var s = d.createElement( js ? "script" : 'link' );

    if( js ){
        s.type = "text/javascript";
        s.src = url;
    }else{
        s.rel = "stylesheet";
        s.href = url;
    }
    if(cb){
        s.onload = ( function( prm ){
            return function(){
                cb( prm );
            }
        })( url );
        // IE 
        s.onreadystatechange = ( function( prm ) {
            return function(){
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    setTimeout( (function(u){
                        return function(){
                            cb( u )
                        }
                    })(prm), 300 );
                }
            }
        })( url );
    }
    h.appendChild(s);
    return s;
},
    rvi: function(im) {     /* image */
    if (im) {
        var tx;
        var pr = im.parentNode;
        if (pr.nodeName.toLowerCase() != 'a' || im.width > 400 || im.height > 400) {
            return 1;
        }
        pr = pr.parentNode;
//        tx = pr.innerText;
//        tx = tx ? tx : pr.textContent;
//        spsupport.log("2 levels: tx.length " + tx.length + "   " + im.src);
//        spsupport.log(tx);
//        if (tx.length > 1000) {
//            return 1;
//        }  
        pr = pr.parentNode;
//        tx = pr.innerText;
//        tx = tx ? tx : pr.textContent;
        tx = pr.innerHTML;
        tx = tx.replace(/<script[^<]*<\/script>/gi, '');
        tx = tx.replace(/<\/?[^>]+>/gi, '');
//        spsupport.log("3 levels: tx.length " + tx.length);
        //spsupport.log(tx);
        if (tx.length > 1000) {
            return 1;
        }        
        
    }
    return 0;
}

, 
    gp: function(im) {
    if (im) {
        // spsupport.log(" >>>>>>>>>> " + im.src);
        var tx;
        var i = 0;
        var pr, fpr, tmp;
        for(var nd = im.parentNode; nd && nd.nodeName != "BODY"; nd = nd.parentNode) {         
            // spsupport.log(i + " >>>> " + nd.nodeName.toLowerCase());            
            i++;
            tx = nd.innerHTML;

//            // pr = tx.match(/(([\$\£]|eur|ils)(<[^>]+>|&nbsp;|\s)?([0-9]+\,)?[0-9]+)|((([0-9]+,)?[0-9]+)(<[^>]+>|&nbsp;|\s|\s\,\-\s)?eur?)/ig);
//            // tx = nd.innerText;
//            // tx = tx ? tx : nd.textContent;

            if (tx) {
                tx = tx.replace(/[\n\t]/gi, "");
                pr = tx.match(/(<[^>]+>([\$\£]|eur|ils)\s*(<[^>]+>|&nbsp;|\s)?([0-9]+[\,\.])?[0-9]+([\,\.][0-9]+)?<\/[^>]+>)|(<[^>]+>(([0-9]+[\,\.])?[0-9]+([\,\.][0-9]+)?)(<[^>]+>|&nbsp;|\s|\s\,\-\s)?(eur|ils)<\/[^>]+>)/ig);
                // spsupport.log(pr);
                if (pr && pr.length) {
                    fpr = pr[0].replace(/<\/?[^>]+>/gi, "");
                    // spsupport.log(fpr);
                    if (pr.length == 1) {               
                        return fpr;
                    }
                    else if (pr.length == 2) {
                        tmp = pr[1].replace(/<\/?[^>]+>|([\$\£]|eur|ils)/gi, "");
                        pr[0] = pr[0].replace(/<\/?[^>]+>|([\$\£]|eur|ils)/gi, "");
                        // spsupport.log(pr[0] + "   " + tmp);
                        if(+(pr[0]) <= +(tmp)) {
                            return fpr;
                        }
                        else {
                            tmp = pr[1].replace(/<\/?[^>]+>/gi, "");
                            return tmp;
                        }
                        // spsupport.log(pr[1]);
                        return Math.min(+(pr[1]), +(pr[0]));
                   }
                   else {
                       break;
                   }  
                }
            }
        }
    }
    return 0;
}

 
};


        
        superfish.b.site="http://www.superfish.com/ws/";
        superfish.b.ip="81.240.21.22";
        superfish.b.userid="7c8eb7b8cf09c8df0fbbab66eb522871";
        superfish.b.appVersion="11.0.5.0";
        superfish.b.clientVersion="diigoreadlater";
        superfish.b.wlVersion="5.3";
        superfish.b.cdnUrl="http://ajax.googleapis.com/ajax/libs/dojo/1.5.1/";
        superfish.b.pluginDomain="http://www.superfish.com/ws/";
        superfish.b.dlsource="diigoreadlater";
        superfish.b.statsReporter=true;
        superfish.b.CD_CTID="";
        superfish.b.w3iAFS="";
        

superfish.b.images='diigoreadlater';
superfish.b.bl='baidu.bedandbreakfast.bernadettelivingston.beso.bizrate.booking.cam4.cnn.crunchyroll.dcinside.deviantart.drudgereport.facebook.flickr.furniture-quest.hotmail.imvu.linkedin.lolhehehe.lowpriceshopper.microsoft.msn.myspace.netflix.nytimes.pandora.pinterest.politico.qq.rue89.shopzilla.spardeingeld.westsiderentals.wired.yankodesign.youtube.';
superfish.b.cdnJQUrl='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
superfish.b.arrFill='#dadee2';
superfish.b.arrBorder='#356595';
superfish.b.supportedBy="ReadLater Similar Products  by Superfish";
superfish.b.shareMsgProd='ReadLater Similar Products';
superfish.b.shareMsgUrl='www.superfish.com';
superfish.b.suEnabled='0|0';
superfish.b.inimg=1;
superfish.b.inimgSrp=1;
superfish.b.txtExtr=false;
superfish.b.partnerCustomUI=1;
superfish.b.psuTitleColor='#FFFFFF';
superfish.b.psuSupportedBy=1;
superfish.b.psuSupportedByText='ReadLater';
superfish.b.psuSupportedByLink='https://www.diigo.com/readlater/superfish.html';
superfish.b.psuSupportedByTitle='Click for More Information';
superfish.b.isPublisher=false;
superfish.b.multiImg=0;
superfish.b.ignoreWL=0;
superfish.b.icons=1;
superfish.b.coupons=0;
superfish.b.spLogoClick=0;
superfish.b.sfDomain='www.superfish.com';
superfish.b.partnerLogoLink='https://www.diigo.com/readlater/superfish.html';
superfish.b.partnerFooterLink='https://www.diigo.com/readlater/superfish.html';
superfish.b.searchget=8;
superfish.b.stDt=1;
superfish.b.rvDt=100;
superfish.b.sgSupportedByLink='https://www.diigo.com/readlater/superfish.html';
superfish.b.sgPrompt='ReadLater Similar <br>Products will be <br>disabled for';
superfish.b.lgWi='220';
superfish.b.lgHe='26';
superfish.b.lgTo='9';
superfish.b.sgIc=1;
superfish.b.noIcon=0;
superfish.b.iiHv=0;
superfish.b.secMd='1';
superfish.b.sgSupportedByText='ReadLater';
superfish.b.cpn='1|0';
superfish.b.topPpc=0;
superfish.b.cpnWLver='11';
superfish.b.cpnWLcb='SF_cpnWlCb';
superfish.b.rvWLver='3';
superfish.b.rvWLcb='SF_isRvURISupported';
superfish.b.lp=0;
superfish.b.partnerPausePopup='ReadLater Similar Products <br>slide-up feature will be <br>disabled for 24 hours';
superfish.b.redIcon=0;
superfish.b.whiteIcon=0;
superfish.b.largerIi=1;
superfish.b.noPopup=0;
superfish.b.inimget=0;
superfish.b.inImgDt=0; 
superfish.b.at=0; 


        
        
        
        /*yepnope1.5.3|WTFPL*/
(function(a,b,c){function d(a){return o.call(a)=="[object Function]"}function e(a){return typeof a=="string"}function f(){}function g(a){return!a||a=="loaded"||a=="complete"||a=="uninitialized"}function h(){var a=p.shift();q=1,a?a.t?m(function(){(a.t=="c"?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){a!="img"&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l={},o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};y[c]===1&&(r=1,y[c]=[],l=b.createElement(a)),a=="object"?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),a!="img"&&(r||y[c]===2?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i(b=="c"?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),p.length==1&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&o.call(a.opera)=="[object Opera]",l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return o.call(a)=="[object Array]"},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,i){var j=b(a),l=j.autoCallback;j.url.split(".").pop().split("?").shift(),j.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]||h),j.instead?j.instead(a,e,f,g,i):(y[j.url]?j.noexec=!0:y[j.url]=1,f.load(j.url,j.forceCSS||!j.forceJS&&"css"==j.url.split(".").pop().split("?").shift()?"c":c,j.noexec,j.attrs,j.timeout),(d(e)||d(l))&&f.load(function(){k(),e&&e(j.origUrl,i,g),l&&l(j.origUrl,i,g),y[j.url]=2})))}function i(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var j,l,m=this.yepnope.loader;if(e(a))g(a,0,m,0);else if(w(a))for(j=0;j<a.length;j++)l=a[j],e(l)?g(l,0,m,0):w(l)?B(l):Object(l)===l&&i(l,m);else Object(a)===a&&i(a,m)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);

        superfish.b.suEnabled = superfish.b.suEnabled.split('|');
        superfish.b.suEnabled[0] = (+superfish.b.suEnabled[0]);
        superfish.b.suEnabled[1] = (+superfish.b.suEnabled[1]);
        superfish.b.cpn = superfish.b.cpn.split('|');
        superfish.b.cpn[0] = (+superfish.b.cpn[0]);
        superfish.b.cpn[1] = (+superfish.b.cpn[1]);
        superfish.b.secMd = (+superfish.b.secMd);
        if (window.location.protocol.indexOf( "https" ) > -1 && !superfish.b.secMd) {
            return;
        }
        superfish.b.sm = (window.location.protocol.indexOf( "https" ) > -1 ? 1 : 0);
        superfish.b.pluginDomain = (superfish.b.sm ? superfish.b.pluginDomain.replace("http:","https:") : superfish.b.pluginDomain.replace("https","http"));
        superfish.b.tg = "";
        <!-- %@include file="WEB-INF/jspf/top20.jspf" %-->
        <!-- %@include file="WEB-INF/jspf/func_inj.js" % -->
        
        spsupport.whiteStage = {
    st: 0,
    rv: 0,
    //product in page
    pip: 0,
    bl: '',
    html: '',
    prc: false,
    de: 0,

    isDomain: function(){
        var sfb = superfish.b;
        var id = new Date().getTime() + "";
        this.de = 1;
        this.fr = (sfb.dlsource == "wltest1" || sfb.dlsource == "fastestfox" ? 1 : 0);
        var d = spsupport.api.getDomain().toLowerCase().split('.');
        var o = d[d.length-1];
        if ( this.bl.indexOf( d[ 0 ] + '.' ) == -1 ) {
            if (o == 'com' || o == 'net') {
                var url = document.location.href;
                if (this.fr && url.indexOf('/fr/') > -1) {
                    return 3;
                }
                else if (/* this.de && */ url.indexOf('/de/') > -1) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
            if (o == 'fr') {               
                return (this.fr ? 3 : 0);
            }
            else if ( o == 'de' ||
                o == 'at' ||
                o == 'ch' ){
                //if (this.de) {
                    return 2;
                //}
                //return 1;
            }
            if (o == 'ca' || o == 'au' || (o == 'uk' && d[d.length-2] == 'co') || (o == 'nz' && d[d.length-2] == 'co')) {
                return 1;
            }
        }
        return 0;
    },
    
    // Counts words on the page
    arrUn: function(arr) {
        if (arr) {    
            var a = [];
            var l = arr.length;
            for(var i=0; i<l; i++) {
                for(var j=i+1; j<l; j++) {
                    // If arr[i] is found later in the array
                    if (arr[i].toLowerCase() === arr[j].toLowerCase())
                        j = ++i;
                }
                a.push(arr[i]);
            }
            return a;
        }else{
            return arr;
        }
    },
    
    lngDt: function(lng) {
        var e;
        // var frRx = new Regexp('[äöü\u00E4\u00F6\u00FC]', 'gi');
        var frRx = /[àâæçéèêëîïôœùûÿ\u00E0\u00E2\u00E6\u00E7\u00E8\u00E9\u00EA\u00EB\u00EE\u00EF\u00F4\u00F6\u00F9\u00FB\u00FF]/gi;
        var deRx = /[äöü\u00E4\u00F6\u00FC]/gi;
        switch (lng) {
            case 1:
                e = this.html.match(frRx);
                if (e && e.length > 40) {
                    lng = 3;
                }                
                break;
            case 2:
                e = this.html.match(deRx);
                if (!e || (e && e.length < 40)) {
                    lng = 1;
                }
                break;
            case 3:
                e = this.html.match(frRx);
                if (!e || (e && e.length < 40)) {
                   lng = 1;
                }                
                break;
        }
//        spsupport.log(e);
//        if (e) {
//        spsupport.log(e.length);
//    }
//        spsupport.log(lng);
        return lng;
    },

    isStore: function(){
        var lng = this.isDomain();
        if (!lng) {
            return 0;
        }
        
        this.html = sufio.body().innerHTML;
        
        var irl = this.html.match(/[áğóş]/gi);
        if (irl && irl.length > 40) {
            return 0;
        }
        
        lng = this.lngDt(lng);
        
        var c, d;
        
        var eur = /(([\$\£]|eur)(<[^>]+>|&nbsp;|\s)?([0-9]+\,)?[0-9]+)|((([0-9]+,)?[0-9]+)(<[^>]+>|&nbsp;|\s|\s\,\-\s)?eur?)/ig;

        if (lng == 3) {
            c = this.html.match(/ajouter\s?au\s?panier|préférés|spécial soldes|prix|en soldes|livraison offerte/ig);
//            if (c) {
//                spsupport.log("c.length = " + c.length);
//            }
            if (c && c.length > 1) {
                    if(this.html.match(/[\€\u20AC]/gi)) {
                        d = this.html.match(/[0-9]+\,[0-9]+/ig);
                    }
                    else {
                        d = this.html.match(eur);
                    }
            }
        }
        else if (lng == 2) {
            c = this.html.match(/warenkorb|einkaufen|einkaufsliste|einkaufswagen|versand|mwst|bestellen|bestellung|wunschzettel/ig);
            if (c) {
                c = this.arrUn(c);
                if (c.length > 1) {
                    if(this.html.match(/[\€\u20AC]/gi)) {
                        // spsupport.log("found €");
                        d = this.html.match(/[0-9]+\,[0-9]+/ig);
                    }
                    else {
                        // spsupport.log("not found €");
                        // d = this.html.match(/([\$\£]|eur)\s?(<[^>]+>|&nbsp;)?([0-9]+\,)?[0-9]+\.?[0-9]+(\s?eur)?/ig);
                        // d = this.html.match(/(([\$\£]|eur)(<[^>]+>|&nbsp;|\s)?([0-9]+\,)?[0-9]+)|((([0-9]+,)?[0-9]+)(<[^>]+>|&nbsp;|\s|\s\,\-\s)?eur?)/ig);
                        d = this.html.match(eur);
                    }
                }
            }
        }
        else {
            c = this.html.match(/(add\s?(item)?\s?to\s?(my)?\s?(shopping)?\s?(cart\b|bag\b|basket|order))|free shipping|shop now|order status|return policy|cart item|(my|your|view|show) \bcart\b|shopping (\bcart\b|\bbag\b|\bbasket\b)|wish\s?list/ig);
            if (c) {
                d = this.html.match(/([\$\£]|eur)\s?(<[^>]+>|&nbsp;)?([0-9]+\,)?[0-9]+\.?[0-9]+/ig);
            }
        }
        if (superfish.b.dlsource == "wltest1") {
            spsupport.log(c);
            spsupport.log(d);
        }
                
        // this.prc = (d ? true : false);
        if (d && c) {
            return 1;
        }
        return 0;
    },
    
    chCt: function(ct, pc) {
        var ln = ct.split('|').length;
        ln = parseInt(ln*pc/100);
        var p = new RegExp(ct, 'gi');
        var r = this.txt.match(p);
        r = this.arrUn(r);
        if (superfish.b.dlsource == "wltest1") {
            spsupport.log(r);
        }
        if (r.length >= ln) {
            return 1;
        }
        return 0;
    },

    isReview: function() {
        if (!this.isDomain()) {
            return 0;
        }
        this.txt = sufio.body().innerText;
        this.txt = this.txt ? this.txt : sufio.body().textContent;
        
        // var r2 = '\b' + superfish.b.rvDtRule2 + '\b';
//        var r2 = 'Siemens|Canon|Kodak|Rolex|Panasonic|Samsung|Maybelline|Nivea';
//        r2 = r2.replace('|', '\b|\b');
//        var p2 = new RegExp(r2, 'gi');

        var news = 'news|top stories|classified|jobs|local|latest|report|world|sports|source|article|stories|traffic|weather|topic';
        var sport = 'football|basketball|baseball|team|players|nfl|nba|nhl|fans';
        var movie = 'Movie|video|cast|Song|official';
        var comp = 'version|software|download|update|upgrade|install|license';
        var game = 'online|games|play|\bwin\b|arcade|download|\bfun\b|free|action|puzzle|sport|Popular|shooting|\btop\b\s?10|Cheat';


        
        var p = this.txt.match(/[\$\£]\s?(<[^>]+>|&nbsp;)?([0-9]+\,)?[0-9]+\.?[0-9]+/ig);
        var r = this.txt.match(/review/gi);   
        var c = this.txt.match(/comment|rating|newsletter|rss|recommend/gi);
        //var ct = this.txt.match(/\bDell\b|\bSony\b|\bNike\b|Adidas|Siemens|Canon|Kodak|Rolex|Panasonic|Samsung|Maybelline|Nivea|Levi\'?s/gi);
        var m = this.txt.match(/bluetooth|\bfax\b|\bbattery\b|\bcharger\b|\bgps\b|\bstereo\b|speaker|\bradio\b|subwoofers|\btv\b|projector|\bdvd\b|\bMP3|\bMP4|\bipod\b|clock|microphones|cameras|monitors|camcorder/gi);

        if (superfish.b.dlsource == "wltest1") {
            spsupport.log(p);
            spsupport.log(r);
            spsupport.log(c);
            spsupport.log(m);
        }
        
        //        if( this.txt.match(/\$/gi) && this.txt.match(/price|review/gi)) {

        if(p && r && c && m) {
//            if (this.chCt(news, 50)) {
//                return 0;
//            }
//            if (this.chCt(sport, 40)) {
//                return 0;
//            }
////            if (this.chCt(movie, 40)) {
////                return 0;
////            }
//            
            return 1;
        }
        return 0;
    },
    
    isProductInPage: function(){
    	if(spsupport.p.$('a[href*="amazon.com"]').length > 0 ||
    	   spsupport.p.$('a[href*="pgpartnet.com"]').length > 0 ||
    	   spsupport.p.$('a[href*="dealtime.com"]').length > 0 ||
    	   spsupport.p.$('a[href*="ebay.com"]').length > 0 ){
    			this.pip = 1;
    	}else {
    		var hostArray = (window.location.host).split(".");
    		if(hostArray[0].indexOf("shop") != -1){
    			this.pip = 1;
    		}
    	}
    	if(!this.pip){
    		var iframeArr = spsupport.p.$('iframe');
    		if(iframeArr.length){
    			for(var i = 0; i < iframeArr.length && !this.pip; i++){
    				var src = spsupport.p.$(spsupport.p.$('iframe')[i]).attr("src");
    				if(src){
    					if(src.indexOf("amazon.com") != -1 ||
    						src.indexOf("pgpartnet.com") != -1 ||
    						src.indexOf("dealtime.com") != -1 ||
    						src.indexOf("ebay.com") != -1 ){
    						this.pip = 1;
	    				}
    				}
    				
    			}
    		}
    	} 
    	return this.pip;
    }
};


        spsupport.sites = {
    rules: function(){
        var site = spsupport.api.getDomain();
        site = site.substr(0, site.indexOf(".")).replace(/-/g, "_");
        return spsupport.sites["_" + site];
    },
    
    isBlackList: function() {
        var d = spsupport.api.getDomain().toLowerCase().split('.');
        if (superfish.b.bl.indexOf(d[0] + '.') > -1 ) {
            return 1;
        }        
        return 0;
    },

    isBlackStage: function() {
        var r = this.rules();
        if( r && r.isBlackStage ){
            return r.isBlackStage();
        }
        return 0;
    },
    
    topPpc: function(sS) {
        var r = this.rules();
        if( r && r.topPpc ){
            return r.topPpc(sS);
        }
        return 0;
    },
    
    su: function () {
        var r = this.rules();
        if( r && r.su ){
            return r.su();
        }
        return 11;
    },

    care : function(){
        var r = this.rules();
        if( r && r.care ){
            r.care();
        }
    },
    
    searchget: function(){
        var r = this.rules();
        if( r && r.searchget ){
            r.searchget();
        }
    },

//    useWl: function(obj){
//        var r = this.rules();
//        if( r && r.useWl ){
//            r.useWl(obj);
//        }
//    },
//
//    sg: function(inpQr, mn) {       /* searchget for textual search: inputQuery, merchant name */
//        // spsupport.log("sg!!!! " + superfish.sg.sSite);
//        var sp = spsupport.p;
//        var inp = spsupport.p.$(inpQr);
//        var term = inp.attr('value');
//        if (term && term.length) {			
//            var ob = {
//                userid: encodeURIComponent(sp.userid),
//                merchantName: mn,
//                dlsource: sp.dlsource ,
//                appVersion: sp.appVersion,
//                documentTitle: term,
//                imageURL: encodeURIComponent(term),
//                imageTitle: term,
//                imageRelatedText: '',
//                productUrl: ''
//            };            
//            this.send(ob);
//        }
//    },
//
//    send: function(ob) {
//        if (superfish.util) {
//            //spsupport.log("sending");
//            //superfish.util.prepareData(ob, 1, superfish.sg.sSite, 0, 0, 0);
//            superfish.util.prepareData(ob, 1, 8, 0, 0, 0);
//        }
//        else {
//            //spsupport.log("not yet");
//            setTimeout(function() {
//                spsupport.sites.send(ob);
//            }, 500);
//        }
//    },    

    validRefState: function(){ // Valid Refresh State
        var r = this.rules();
        if( r && r.validRefState ){
            return r.validRefState();
        }
        return 1;
    },

    vImgURL: function( iU ){ // Validate IMG URL
        var r = this.rules();
        if( r && r.vImgURL ){
            return r.vImgURL( iU );
        }
        return ( iU );
    },

    preInject : function(){
        var r = this.rules();
        if( r && r.preInject ){
            r.preInject();
        }
    },

    validProdImg : function(){
        var r = this.rules();
        if( r && r.validProdImg ){
            return r.validProdImg();
        }
        return 0;
    },

    imgSupported : function( img ){
        var r = this.rules();
        if( r && r.imgSupported ){
            return r.imgSupported( img );
        }
        return 1;
    },

    ph2bi : function(){ // Plugin has to be injected
        var r = this.rules();
        if( r && r.ph2bi ){
            return r.ph2bi();
        }
        return 0;
    },

    gRD : function(){ // Get Refresh Delay
        var r = this.rules();
        if( r && r.gRD ){
            return r.gRD();
        }
        return 500;
    },

    gFU : function(){ // Get favicon URL
        var r = this.rules();
        if( r && r.gFU ){
            return r.gFU();
        }
        return( "http://www." +  spsupport.api.getDomain() + "/favicon.ico?p=" + new Date().getTime() );
    },

    gVI : function(){ // get Images Node
        var r = this.rules();
        if( r && r.gVI ){
            return r.gVI();
        }
        return 0;
    },
    
    // remove searchget
    killSg : function(){
        if (superfish.sg) {
            superfish.sg.close();
        }
    },

    // remove inImage
    killIi : function(){
        if (superfish.ii && superfish.ii.k) {
            superfish.ii.k();
        }
        else if (superfish.inimg && superfish.inimg.ii) {
                for (var i in superfish.inimg.ii) {
                    superfish.inimg.cl(i);
                }
            }    
    },

    // remove popup
    killPopup : function(){
        if( superfish.util ){
            superfish.util.closePopup();
        }
    },

    inURL : function( u ){
        return ( window.location.href.indexOf( u ) > -1);
    },
    
    urlChange: function() {
            // get site specific methods
        var r = this.rules(),
            // default url change function
            urlChange = function(){
                var spsites = spsupport.sites;
                spsites.killSg();
                spsites.killIi();
                spsites.killPopup();
                spsupport.api.killIcons();

                // restart popup/searchget/inimage
                setTimeout(function(){
                    spsupport.p.prodPage.reset();
                    spsupport.p.SRP.reset();
                    spsupport.api.startDOMEnumeration();                    
                }, 1900);
            };

        // call page specific urlchange rules
        if( r && r.urlChange ){
            urlChange = r.urlChange;
        }
        
        // setup event listener for hashchange
        spsupport.p.$(window).on("hashchange", urlChange);
    },

    sgGen: function() {
        spsupport.p.iSpin = new Image();
        spsupport.p.iSpin.src = spsupport.p.imgPath + 'loading.gif';
    },

    getRelText : function( node, gLN, tFL ){
        var relTxt = {
            prodUrl: "",
            iText: ""
        };
        if (node) {
            var r = this.rules();
            if( r && r.getRelText ){
                var v = r.getRelText( node );
                return ( v ? v : relTxt );
            }
            var lNode = gLN(node, 3);
            if (lNode) {
                relTxt.prodUrl = lNode.href;  
                relTxt.iText = tFL(lNode, lNode.href);                 
            }
        }
        return relTxt;
    },
    
    _craigslist: {
        isBlackStage: function() {
            var txt = '';
            var jNd = spsupport.p.$('a[href$="/sss/"]');
            txt = jNd.length ? jNd[0].innerHTML : '';
            if (txt == 'for sale / wanted') {
                spsupport.p.textOnly = 1;
                return 0;
            }            
            return 1;
        },
        
        fNd: function(nd) {
            var txt = '';
            txt += spsupport.p.$('h2').text();
            //txt += spsupport.p.$('#userbody').text();
            txt = txt.replace(/[\n\r\t\*]/gi, '');
            txt = spsupport.p.$.trim(txt);
            txt = txt.split('Location:')[0];
            txt = txt.substring(0, 990);
            
            return txt;
        },
        
        getRelText : function(node){
            if (node) {
                var txt = this.fNd(node);
                return {
                    prodUrl: '',
                    iText: txt                                        
                };
            }
            return 0;
        }        
    },

    _google : {

        isBlackStage: function() {
            if(spsupport.p.isIE7) {
                return true;
            }
            return 0;
        },

        vQ: 'li#productbox, li.g.knavi, .g:has(.r a[href^="/products/catalog"])',
        
        topPpc: function(sS) {
            var sp = spsupport.p;

            superfish.b.inj(window.document, superfish.b.site + "top20/get.jsp?pi=" + sp.dlsource + "&ui=" + sp.userid + "&cc="+ sp.CD_CTID +"&mn="+ sS.merchantName + "&v=" + sp.appVersion, 1);
        },       

        urlChange : function(){
            var spsites = spsupport.sites;
            
            spsupport.api.killIcons();
            
            spsites.killSg();
            spsites.killIi();
            spsites.killPopup();
            spsupport.p.prodPage.s = 0;
            spsites._google.prodImg = 0;
            spsites._google.vIcons();
        },

        care : function(){
            var db = spsupport.p.$('body');

            if(db && db.length && !db[0].evAdded){
                db.on( "keydown", function(e){
                    var ch;
                    if(e && e.which){
                        ch = e.which;
                    }else if( window.event ){
                        ch = window.event.keyCode;
                    }

                    if(ch != 45 && ch != 17) {
                        spsupport.api.killIcons();
                        spsupport.sites.killIi();
                    }
                    if(ch == 13) {
                        spsupport.sites.killSg();
                        spsupport.sites.killIi();
                        spsupport.sites._google.vIcons();
                    }
                });
                db[0].evAdded = 1;
            }
        },

        searchget: function() {
            var iu = spsupport.sites.inURL;
            var ssg = superfish.sg;

            if ( superfish.b.searchget && ssg ) {
                ssg.offset = 1;
                ssg.itemWidth = 94;
                ssg.cssTitle = 'display:block;padding-top: 3px;max-height:48px; overflow: hidden;';
                ssg.cssPrice = 'font-weight: bold;';
                ssg.cssStore = 'display:block; color:#0E774A;text-decoration: none; width: 90px; overflow: hidden;line-height:15px;';
                ssg.cssPrompt = 'top: 20px; right: -37px;';
                ssg.q = this.vQ;
                ssg.cookie = '_google'; 
                
                if ( spsupport.p.$(ssg.q).length ) {
                    superfish.b.multiImg = 1;
                    superfish.publisher.limit = superfish.b.searchget;                    
                    ssg.sSite = 8;
//                    ssg.offset = 1;
//                    ssg.itemWidth = 94;
//                    ssg.cssTitle = 'display:block;padding-top: 3px;max-height:48px; overflow: hidden;';
//                    ssg.cssPrice = 'font-weight: bold;';
//                    ssg.cssStore = 'display:block; color:#0E774A;text-decoration: none; width: 90px; overflow: hidden;line-height:15px;';
//                    ssg.cssPrompt = 'top: 20px; right: -37px;';
                }
                if (iu("products/catalog")) {
                    ssg.sSite = 0;
                //                    ssg.sSite = 4;
                //                    ssg.q = '[id="product-basic-info"]';
                //                    ssg.offset = 0;
                //                    ssg.powered1 = 'by&nbsp;';
                //                    ssg.cssMain = 'width: 214px;float: right;top: -323px; height:1px; overflow: visible;';
                //                    ssg.cssMainTitle = 'color:#009900;font-size:12px;font-family: Arial,sans-serif;';
                //                    ssg.cssPowered = ssg.cssMainTitle;
                //                    ssg.cssTitle = 'display:block;padding-top: 3px;font-size:11px;overflow: hidden;'+(spsupport.p.isIE ? "height:29px;" : "max-height: 28px;");
                //                    ssg.cssPrice = 'padding-top: 2px;font-size:11px;';
                //                    ssg.cssStore = 'display:block;font-size:11px;height:14px; overflow: hidden;color:#0E774A;';
                //                    ssg.cssPrompt = 'right:-3px; top:14px;';
                }
                else if (iu("books.google") ||  iu( "tbs=shop" ) || iu( "tbm=shop" ) || iu( "tbs=bks" ) || iu("tbm=bks") ) {
                    ssg.sSite = 0; /* to enable slide-up instead of searchget */
                // superfish.publisher.limit = 0; /* not to send the request */
                }

                spsupport.sites.sgGen();
            }
        },

        gVI : function (){
            var iu = spsupport.sites.inURL;
            return ( iu("books.google") || iu("tbm=bks") || iu("tbs=bks") || iu("products/catalog") ) ?
                0 : spsupport.p.$('img.th, img.productthumb, .psliimg > img');
        },

        vIcons : function(){
            var ssg = superfish.sg;
            setTimeout(
                function(){
                    var ss = spsupport.sites;
                    var sa = spsupport.api;
                    var iu = ss.inURL;
                    var im = ss._google.gVI();
                    superfish.publisher.imgs = [];
                    superfish.publisher.reqCount = 0;
                    superfish.publisher.valCount = 0;

                    if( spsupport.p.$(ss._google.vQ).length ){
                        ssg.sSite = 8;                        
                        if( im.length > 0 ){
                            sa.startDOMEnumeration();
                            setTimeout( function(){
                                sa.wRefresh( 300 );
                            }, 800 );
                        }
                    }
                    else {
                        ssg.sSite = 0;
                        if( iu("tbs=shop") ||  iu("tbm=shop") ){
                            sa.startDOMEnumeration();
                            setTimeout( function(){
                                sa.wRefresh( 350 );
                            }, 800 );
                        }
                        else if(  iu("books.google" ) || iu("tbs=bks") || iu("tbm=bks")) {
                            sa.startDOMEnumeration();
                            setTimeout( function(){
                                sa.wRefresh( 350 );
                            }, 800 );
                        }
                    }
                }, 1400 );
        },

        ph2bi : function(){
            return 1;
        },

        validRefState : function(){
            var iu = spsupport.sites.inURL;
            // match query for supported google pages
            return  ( 
                spsupport.p.$(this.vQ).length
                || iu("tbs=shop")
                || iu("tbm=shop")
                || iu("products/catalog" )
                || iu("books.google" )
                || iu("tbm=bks")
                || iu("tbs=bks")
            );
        },

        preInject : function(){
            var iu = spsupport.sites.inURL;
            var sIU = spsupport.p.supportedImageURLs;
            if ( sIU ){
                sIU[sIU.length] = "jpg;base64";
                sIU[sIU.length] = "jpeg;base64";
            }
            else{
                sIU = ["jpg;base64", "jpeg;base64"];
            }

            if(iu("books.google")){
                var wN = spsupport.p.$('div[id *= "_sliders"]')
                if(wN.length){
                    wN.each(function() {
                        spsupport.domHelper.addEListener(this, spsupport.api.onDOMSubtreeModified, "DOMSubtreeModified");
                    });
                }
            }
        },

        validProdImg : function(){
            // spsupport.log("validProdImg query found " + spsupport.p.$( this.vQ ).length  + " this.prodImg  " + this.prodImg );
            if( spsupport.p.$( this.vQ ).length && !this.prodImg ){
                this.prodImg = 1;
                return 1;
            }
            return 0;
        },

        imgSupported : function( im ){
            if( im.id && im.id.indexOf("vidthumb")> -1 ||
                im.className.indexOf("vidthumb") > -1 ||
                im.className.indexOf("imgthumb") > -1 ){
                return 0;
            }
            return 1;
        },

        gFU : function(){ // Get favicon URL
            var src = "http://www." +  spsupport.api.getDomain() + superfish.util.slasher + "favicon.ico";
            superfish.util.slasher += '/';
            return src;
        },

        getRelText : function(node){
            if (node) {
                var spa = spsupport.api;
                var lNode = spa.getLinkNode(node, 3);
                if (lNode) {
                    var url = lNode.href;
                    var pUrl = "";

                    if( url.indexOf( "javascript" ) == -1 ){
                        if( url.indexOf("http://www.google.com/url?") > -1 ){
                            var pSign = url.indexOf("=");
                            if( pSign > -1 ){
                                url = url.substr( pSign + 1, url.length );
                            }
                        }
                        try{
                            url = decodeURIComponent( url );
                        }catch(e){
                        // not encoded
                        }
                        var prm = url.indexOf("&");
                        if( prm > -1 ){
                            url = pUrl = url.substr(0, prm);
                        }
                        var sec = node;
                        var cl = 0;
                        for (var i = 0; i < 20; i++) {
                            sec = sec.parentNode; 
                            if (sec && sec.getAttribute) {
                                cl = sec.getAttribute('class');
                                if (cl && cl.indexOf('knavi') > -1 || sec.nodeName == 'body') {
                                    break;
                                }
                            }
                            else { 
                                break; 
                            }
                        }
                        var txt = spa.textFromLink(lNode, url, sec, 1);
                    }
                    return( 
                    {
                        prodUrl : ( pUrl != "" ? pUrl : lNode.href ),
                        iText : txt
                    });
                }
            }
            return 0;
        },
        
        su : function(){
            return 1;
        }
    },
    
    _thefind : {
        urlChange : function(){
            spsupport.api.killIcons();
            setTimeout( function(){
                spsupport.p.prodPage.reset();
                spsupport.p.SRP.reset();
                spsupport.api.startDOMEnumeration();
            }, 3500 );
            setTimeout( function(){
                spsupport.api.wRefresh( 700 );
            }, 4400 );
        }
    },


    _macys : {
        care : function(){
            setTimeout( function(){
                spsupport.sites._macys.paging();
            }, 1000 );
        },

        urlChange : function(){
            if( !spsupport.sites._macys.evtc ){
                spsupport.api.killIcons();
                setTimeout( function(){
                    spsupport.p.prodPage.reset();
                    spsupport.p.SRP.reset();
                    spsupport.api.startDOMEnumeration();
                }, 1700 );
                setTimeout( function(){
                    spsupport.api.wRefresh( 300 );
                }, 2700 );
                setTimeout( function(){
                    spsupport.sites._macys.paging();
                }, 3500 );
            }
        },
        
        paging : function(){
            var pgn = spsupport.p.$('.paginationSpacer');
            if(pgn.length){
                setTimeout(function(){
                    pgn.each(                            
                        function() {
                            var tDel = 1500;
                            spsupport.p.$(this).on('mouseup', function(){
                                spsupport.api.killIcons();
                                spsupport.sites._macys.evtc = 1;
                                setTimeout( function(){
                                    spsupport.api.startDOMEnumeration();
                                }, tDel );
                                setTimeout( function(){
                                    spsupport.api.wRefresh( tDel / 3 );
                                },  tDel * 2 );
                                setTimeout( function(){
                                    spsupport.sites._macys.paging();
                                }, tDel * 2.5 );
                            });
                        });
                    }, 1400);
                this.evtc = 0;
            }
        }
    },

    _yahoo : {
        vImgURL : function( u ){
            var uD = u.split( "http" );
            if( uD.length > 2 ){
                uD = uD[ 2 ];
            }else if( uD.length == 2){
                uD = uD[ 1 ];
            }else{
                uD = uD[ 0 ];
            }
            uD = uD.split( "&" );
            uD = uD[ 0 ];
            return "http" + uD;
        },

        validProdImg : function(){
            return 1;
        }
    },

    _amazon : {
//        searchget: function() {
//            var ssg = superfish.sg;
//            if (ssg && superfish.b.searchget) {
//                ssg.q = '#buyboxDivId';
//                if(spsupport.p.$(ssg.q).length ) {
//                    ssg.sSite = 4;
//                    ssg.relpos = 'insertBefore';
//                    ssg.lines = 2;
//                    ssg.powered1 = 'by&nbsp;';
//                    var st = 'font-size:11px;font-family: Arial,sans-serif;';
//                    ssg.cssMainTitle = 'color:#000000;' + st ;
//                    ssg.cssPowered = 'text-align:right;color:#009900;' + st;
//                    ssg.cssTitle = 'display:block;padding-top: 3px;font-size:11px;overflow: hidden;'+(spsupport.p.isIE ? "height:30px;" : "max-height: 28px;");
//                    ssg.cssPrice = 'padding-top: 2px;font-size:11px;';
//                    ssg.cssStore = 'display:block;font-size:11px;height:14px; overflow: hidden;color:#0E774A;';
//                    ssg.cookie = '_amazon';
//                    spsupport.sites.sgGen();
//                }
//                else {
//                    ssg.sSite = 0;
//                }
//            }
//        },

        gRD : function(){
            return 1300;
        },
        
        urlChange : function (){
            var spsites = spsupport.sites;
            
            spsites.killSg();
            spsites.killIi();
            spsites.killPopup();
            spsupport.api.killIcons();

            setTimeout(function(){
                spsupport.p.prodPage.reset();
                spsupport.p.SRP.reset();
                spsupport.api.startDOMEnumeration();
            }, 1900 );
        },

        getRelText : function(node){
            if (node) {
                var spa = spsupport.api;
                var lNode = spa.getLinkNode(node, 3);
                if (lNode) {
                    var url = lNode.href;
                    var txt = spa.textFromLink(lNode, url);
                    if (txt == "") {
                        var tn = spsupport.p.$('.title', lNode.parentNode.parentNode);
                        txt += (tn.length ? spsupport.api.getTextOfChildNodes(tn[0]) : "");
                    }
                    return ({
                        prodUrl : url,
                        iText : txt
                    });
                }
            }
            return 0;
        }
    },
    
    _superfish: {
        su: function () {
            return 10;
        }
    },
    
    _searchcompletion: {
        care: function(){
            spsupport.txtSr.disableAll();
        },

        ph2bi : function(){
           return spsupport.txtSr ? spsupport.txtSr.ph2bi() : 0;
        },

        searchget: function() {
            spsupport.txtSr.searchget('searchcompletion');
        }        
    },
    
    _surfcanyon: {
        care: function(){
            spsupport.txtSr.disableAll();
        },

        ph2bi : function(){
           return spsupport.txtSr ? spsupport.txtSr.ph2bi() : 0;
        },

        searchget: function() {
            spsupport.txtSr.searchget('surfcanyon');
        }        
    },

    _ebay: {
        care : function(){
            spsupport.p.prodPage.d = 149;
            spsupport.p.prodPage.l = 1500;           
            // this.searchget();
        },

        searchget: function() {
            spsupport.p.prodPage.d = 149;
            spsupport.p.prodPage.l = 1500;           
            var vQ = '#vi-tTblC2 .vi-title'; // default (us)
                vQ += ', #isclmn + td > div'; // .de, .fr, .co.uk

            var ssg = superfish.sg;

            if (ssg && superfish.b.searchget) {
                if(spsupport.p.$(vQ).length) {                    
                    ssg.sSite = 16;
                    ssg.q = vQ;
                    ssg.powered1 = 'by&nbsp;';
                    var st = 'font-size:11px;font-family: Arial,sans-serif;';
                    ssg.cssMainTitle = 'color:#000000;' + st ;
                    ssg.cssPowered = 'text-align:right;color:#0E774A;' + st;
                    ssg.relpos = 'insertBefore';
                    ssg.itemWidth = 92;
                    ssg.cssTitle = 'color:#002398;display:block;padding-top:3px;font-size:11px;overflow: hidden;'+(spsupport.p.isIE ? "height:25px;" : "max-height: 25px;");
                    ssg.cssPrice = 'padding-top: 2px;font-size:11px;';
                    ssg.cssStore = 'display:block;font-size:11px;height:14px; overflow: hidden;color:#0E774A;';
                    ssg.cookie = '_ebay';
                    spsupport.sites.sgGen();
                }
                else {
                    ssg.sSite = 0;
                }
            }
        },
        
        su: function () {
            return 10;
        },
        
        fCn: function(nd, ccl) {   // find containing node (card of the product on SRP)
            var atCl = '';
            while (nd && nd.nodeName.toLowerCase() != 'body') {
                nd = nd.parentNode;
                atCl = nd.getAttribute('class');
                if (atCl && atCl.indexOf(ccl) > -1) {
                    return nd;
                }
            }
            return 0;
        },
        
        fTx: function(nd, cl) {    // fetch text. nd - node, ccl - class of container, cl - class of wanted node
            var iT = '';
            if (nd) {
                nd = cl ? spsupport.p.$('.' + cl, nd)[0] : nd;
                if (nd) {
                    iT = spsupport.api.getTextOfChildNodes(nd);
                }
            }
            return iT;

        },
        
        getRelText : function(node){
            if (node) {
                var relTxt = {
                    prodUrl: "",
                    iText: ""
                };                
                var spa = spsupport.api;
                //spsupport.log(node);
                var lNode = spa.getLinkNode(node, 5);
                //spsupport.log(lNode);
                var nd;
                relTxt.prodUrl = lNode ? lNode.href : '';
                relTxt.prodUrl = relTxt.prodUrl.indexOf('javascript:') > -1 ? '' : relTxt.prodUrl;
                //spsupport.log("prodUrl = *" + relTxt.prodUrl + "*");
                var srp = document.location.href.indexOf('/sch/') > -1 ? 1 : 0; 
                if( srp && document.location.href.indexOf('&_dmd=1') > 10 ){    // eBay SRP, list view
                    //spsupport.log("ebay list view");
                    node = this.fCn(node, 'card');
                    relTxt.iText = this.fTx(node, 'rslp-cd');                    
                }
                else if (srp && document.location.href.indexOf('&_dmd=2') > 10) {   // eBay SRP, table view
                    //spsupport.log("eBay SRP, table view");
                    node = this.fCn(node, 'card');
                    if (!relTxt.prodUrl.length) {
                        nd = spsupport.p.$('.title a', node)[0];
                        if (!nd) {
                            nd = spsupport.p.$('a.ittl', node)[0];
                        }
                        relTxt.iText = nd ? this.fTx(nd) : this.fTx(node);
                        relTxt.prodUrl = nd ? nd.href : '';
                    }
                    else {
                        relTxt.iText = this.fTx(node);
                    }
                }
                else if (srp && document.location.href.indexOf('&_dmd=5') > 10) {   // eBay SRP, 2 halves view
                    node = this.fCn(node, 'tri-i');
                    relTxt.iText = this.fTx(node, 'ittl');
                    if (!relTxt.prodUrl.length) {
                        nd = spsupport.p.$('a.ittl', node)[0];
                        relTxt.prodUrl = nd ? nd.href : '';
                    }
                }
//                else if (srp) {
//                    spsupport.log("eBay SRP, table view");
//                    node = this.fCn(node, 'ndb');
//                    relTxt.iText = this.fTx(node);
//                    if (!relTxt.prodUrl.length) {
//                        nd = spsupport.p.$('a.ittl', node)[0];
//                        relTxt.prodUrl = nd ? nd.href : '';
//                    }
//                }
//                else if (document.location.href.indexOf('/ctg/') > -1) { // pbeclr
//                    spsupport.log("eBay CATEGORY");
//                    node = this.fCn(node, 'pbeclr');
//                    relTxt.iText = this.fTx(node, 'pt');
//                }
//                else if(document.location.href.indexOf('/itm/') > -1) {  
//                    spsupport.log("eBay PP ");
//                    nd = this.fCn(node, 'vi-tTblC1_');
//                    spsupport.log(nd);
//                    if (nd) {
//                        relTxt.iText = this.fTx(node, 'vi-is1-titleH1');  //vi-is1-titleH1                  
//                    }
//                 }
                  else if (document.location.href.indexOf('/itm/') > -1 || document.location.href.indexOf('/ctg/') > -1) { // vi-ih-bc-label
                      if (!lNode) {
                          nd = spsupport.p.$('h1');
                          // spsupport.log(nd);
                          relTxt.iText = spsupport.api.getTextOfChildNodes(nd[0]);
                          // spsupport.log("relTxt.iText   " + relTxt.iText);
                      }
                  }
                // spsupport.log("1111111", relTxt, lNode);
                if ((!relTxt.iText || !relTxt.iText.length) && lNode) {
                    relTxt.iText = spsupport.api.textFromLink(lNode, lNode.href);
                }
                //spsupport.log("222222",relTxt);
                return relTxt;
            }
            return 0;
        }

    }
};
        
        
            superfish.b.xdmsg = {
    cbFunction: 0,

    postMsg : function( target, param ){
        if( target != window ){
            target.postMessage( param, "*" );
        }
    },

    getMsg : function(event){
        ( window.xdmsg ? xdmsg : superfish.b.xdmsg).cbFunction( event.data, event.origin );
    },

    init: function( cbFunc ){
        this.cbFunction = cbFunc;
        if( window.addEventListener ){
            window.addEventListener("message", this.getMsg, false );
        }else{
            window.attachEvent('onmessage', this.getMsg );
        }
    },

    kill: function (){
        if( window.removeEventListener ){
            window.removeEventListener("message", this.getMsg, false );
        }else{
            if (window.detachEvent) {
                window.detachEvent ('onmessage', this.getMsg );
            }
        }
    }
}
;
        
        superfish.partner = {};

superfish.partner.init = function() {
    if (this._init) { this._init(); }
};

superfish.partner.logoClick = function() {
    if (this._logoClick) { this._logoClick(); }
};

        superfish.publisher = {};
superfish.publisher.reqCount = 0;
superfish.publisher.valCount = 0;
superfish.publisher.imgs = [];
superfish.publisher.limit = superfish.b.suEnabled[0];

superfish.publisher.init = function() {
    if (this._init) {
        this._init();
    }
};

superfish.publisher.pushImg = function(img) {
    var cond = (spsupport.whiteStage.rv || spsupport.whiteStage.st || (superfish.sg && superfish.sg.sSite ? true : this.imgs.length < this.limit));
    // var cond = this.imgs.length < this.limit;
    if(superfish.b.multiImg && cond){
        this.imgs[ this.imgs.length ] = img;
        if( !this.reqCount ){
            this.send();
        }
    }
};

superfish.publisher.send = function() { 
 //   spsupport.log("send " + this.reqCount + "  " + this.limit + "  " +  this.valCount +  "  " + this.imgs.length);
    if (superfish.b.multiImg && this.reqCount < this.limit && this.valCount < this.imgs.length) {
        var im = this.imgs[this.valCount];
        var imgPos = spsupport.api.getImagePosition(im);
        var val = spsupport.api.validateSU(im, parseInt(imgPos.y + im.height - 45));
        // spsupport.log("validate = " + val);
        this.reqCount += val;
        this.valCount++;
    }
    else {
        // superfish.util.bCloseEvent( document.getElementById("SF_CloseButton"), 2 );
        spsupport.p.prodPage.e = 1;
    }
};

superfish.publisher.fixSuPos = function(top) {
    return (this._fixSuPos ? this._fixSuPos(top) : top);
};

superfish.publisher.report = function(action) {
    if (this._report) {
        this._report(action);
    }
};

superfish.publisher.extractTxt = function(img) {
    if (this._extractTxt) {
        return this._extractTxt(img);
    }
    else {
        return '';
    }
};




       
        
        

        
        
          
            superfish.b.inj(window.document, superfish.b.site + "js/base_single_icon.js?ver=" + superfish.b.appVersion , 1);
            

            

            


           
                superfish.inimg = {    
    h: superfish.b.largerIi ? 69 : 61,      // height
    y: [],      /* y positions */
    iw: superfish.b.largerIi ? 66 : 57,     // Item width
    pd: 3,      // Padding between items
    // inf: 70,
    inf: 12,    // Width of panel buttons   
    g: '#C3C3C3', // Gray -  default
    g2: '#acaeb0',// Gray -  over
    itn: 0,     // Number of items
    res: [],    // Array of flags for Plugin stage
    sep: [],
    ii: [],     // In-Image node
    iiInd: 0,   // Index of image/item
    lai: [],    // Array of icon data per image
    sm: 0,      // Shift of image position
    dv: [],     // array of DIV's 
    htm: 0,     // hover timer ()
    
    itemWidth: 98,
    cssMain: '',
    //number of product to display
    nPr:4,

    // Validate image
    vi: function(imw, imh) {
        var t = this, h = this.h*1.5, sv = 0, add = 0;
        if (imh > h && !superfish.b.noIcon || superfish.b.noIcon) {
            var sp = imw - t.inf + 4, iw = t.iw + t.pd;
            t.itn = parseInt(sp/iw);
            if (t.itn) {
                t.gp = parseInt(sp%iw/2);
                if (t.itn < 3) {
                    sv = t.itn;
                    add = Math.round(sp/10);
                    sp = sp + add;
                    t.itn = parseInt(sp/iw);
                    t.sm = (t.itn > sv ? Math.round(add/2) : 0);
                }
                t.itn = t.itn > 8 ? 0 : (t.itn > 6 ? 6 : t.itn);
                return t.itn;
            }
           /* sp = sp + 10;            
            t.itn = parseInt(sp/iw);
            if (t.itn) {
                t.gp = parseInt(sp%iw/2);
                t.sm = 5;
                t.itn = t.itn > 6 ? 6 : t.itn;
                return t.itn;
            }
            else {
                t.itn = 0;
                return 0;
            }  
            */
        }
       // else {
            return 0;            
       // }
    },
    
    // Create In-Image node
    cr: function(ht, b, ind, hd) {
        var t = this;
        var s = t.p.prodPage.p && t.p.prodPage.p.style ? t.p.prodPage.p.style.padding : 0;
        var pb = 0, pl = 0, pr = 0;
        if (s && s.length > 0) {
            s = s.split(' ');
            switch(s.length){
                case 1:
                    pb = pl = pr = parseInt(s[0]);
                    break;
                case 2:
                    pb = parseInt(s[0]);
                    pl = pr = parseInt(s[1]);
                    break;
                case 3:
                    pb = parseInt(s[2]);
                    pr = parseInt(s[1]);
                    break;
                case 4:
                    pb = parseInt(s[2]);
                    pr = parseInt(s[1]);
                    pl = parseInt(s[3]);
                    break;
            }
        }
        t.y[ind] = t.lai[ind].y + t.lai[ind].h - t.h; // + 10; //pb + 1;
        if (t.dv[ind]) {
            t.y[ind] = t.y[ind] + t.h;
        }
        this.w += (pl+pr);
        var prt = b.psuSupportedByText;
        if (t.w < 115) {
            var by = prt.indexOf('by ');
            if (by > -1)
            prt = prt.substring(by, prt.length);
        }
//        t.transPad = 0;
//        var itms = (t.iw + t.pd)*t.itn + 50 + 17;
//        if (itms < t.w) {
//            t.transPad = parseInt((t.w - itms)/2);
//        }
        var lft = this.lai[ind].x-this.sm;
        var bs = 'height:'+ (this.h+2) +'px;position: absolute;';
        var as = 'border: none !important;';
        var sz = (this.w < 145 && b.psuSupportedByText.length > 25 ? 6 : 7);
        var ft = 'font-family:Arial,Helvetica,Verdana !important;font-size:'+sz+'pt !important;color:#777777 !important;text-decoration:none !important;';
        var ms =  bs +'width:'+ this.w +'px;background: transparent; border-bottom: solid 1px #dedede; overflow: visible; z-index: 12010 !important; left: '+ lft +'px !important; top: '+ this.y[ind] +'px;';
        ms += (hd ? 'display: none;' : '');
        
        return (        
            '<div id = "SF_IIAD_'+ ind +'" style = "'+ ms +'">' +
                '<div class = "SF_IIAD_TRANS" style = "height: '+(this.h + 2)+'px; padding-left:'+t.transPad+'px; z-index: -1;background: #ffffff; overflow: visible; opacity:0.9; filter: alpha(opacity=90);">' +
                ht +
                '</div>' +
                ( b.psuSupportedBy ?
                    '<a target = "_blank" onmouseover = "this.style.textDecoration = \'underline\';" onmouseout = "this.style.textDecoration = \'none\';" style="' + as + 'position:absolute;bottom:0px;right:15px;height: 10px !important; overflow: hidden; line-height:10px !important;' + ft + '" href="' +
                    b.psuSupportedByLink + '" title="' + b.psuSupportedByTitle + '">' +
                    prt + '</a>'
                    : '' )+
            '</div>'    
            );
    },
    
    sh: function(ind) {       /* for no_icon only */
        if (typeof(ind) == "number" && ind > -1) {
            if (this.ii[ind] && this.ii[ind].style.display == 'none') {
                this.ii[ind].style.display = 'block';
                this.dv[ind].style.display = 'block';
                this.u.fixDivsPos();            
            }
        }
    },
    
    ih : function(it, i, ind) { /* item html */
        if (it) {
            var t = this;
            var tr = 'target = "_blank"';
            var l = 12;
            var pr = (it.price.length > 6 ? it.price.split('.')[0] : it.price);
            var tl = t.trw(it.title, 126);
            var is1 = (t.p.isIEQ ? t.iw - 14 : t.iw - 7);
            var is2 = (t.p.isIEQ ? t.iw - 14 : t.iw - 12);
            var is3 = 110;
            var arr = 20;
            var lp = parseInt((t.iw+t.pd)*i) + t.iw/2 - arr/2;
            var elp = t.transPad-4;
            var nfw = 324;
            var en = elp + nfw;
            var ar2 = lp + arr;
            //spsupport.log("en " + en + "  ar2 " + ar2 +"  elp " + elp);
            var hf = (en > ar2 ? 0 : ar2 - en + 10);
            elp = elp + hf;
            //spsupport.log("elp " + elp + "  hf " + hf +"  lp " + lp);
            var st = t.trw(it.merchantName.split('.com')[0], 17);
            return(
                '<div id = "SF_IIAD_ITEM_'+ind +'_'+ i + '" style="position:static !important; margin: -1px 0 0 !important; overflow: visible !important; text-align: center !important; width: '+ t.iw +'px !important; padding-right: '+ t.pd +'px !important; display: block; float: left !important; vertical-align: top !important; font-family: arial,sans-serif !important; font-size: small !important; line-height: 1.2 !important;">' +                
                '<div class = "SF_IIAD_ITEM_INFO" style = "display: none; padding: 3px; position: absolute; top:'+(t.iw+4)+'px; left: '+ elp +'px; width: ' + nfw + 'px; margin: 0; margin-left: 2px; background: #F4F4F4; border: solid 1px #acaeb0; z-index:1;text-align: left !important;">' +
                '<div style = "position: absolute; top: -' + (arr+2) + 'px; left: '+ (lp-hf-1) +'px; width: 0; height: 0; border-color: transparent transparent #acaeb0 transparent; border-width: 0 10px '+ (arr+2) +'px;border-style: solid;font-size: 0;line-height: 0;"></div>' +
                '<div style = "position: absolute; top: -' + arr + 'px; left: '+ (lp-hf) +'px; width: 0; height: 0; border-color: transparent transparent #f4f4f4 transparent; border-width: 0 9px '+ arr +'px 9px;border-style: solid;font-size: 0;line-height: 0;"></div>' +
                '   <a class = "iiim" href="'+ it.merchURL + '&clickSrc=1" ' + tr + ' style="border: #D0D0D0 solid 1px; -moz-border-radius:7px; border-radius:7px; -webkit-border-radius:7px; width: 110px; height: 110px; padding: 4px; margin: 1px 4px; background: #ffffff; float: left; cursor: pointer;">'+
                '       <img class="SF_IIADOV_IMG" '+ t.p.sfIcon.evl+ '="-1" sfnoicon="1"  style="width:' + is3 + 'px; height:' + is3 + 'px; display: none; border: none;" title="' + it.title + '" />'+ 
                '       <img id= "SF_II_LOADOV_' + ind +'_'+ i + '" src = "' + t.sp.src + '" style="width:'+ is3 +'px; height: '+ is3 +'px; display: inline-block; border: none;" />' +
                '</a>'+
                '   <a class = "iitx" title="' + it.title + '" href="'+ it.merchURL +'&clickSrc=3" ' + tr + ' style="display: inline-block;height: 32px !important; padding: 0px !important;margin-right: 6px;position: absolute;top: 11px;left: 135px; font-family: Helvetica !important;font-size: 13px !important; color: #3A00FF !important; text-decoration: none !important; overflow: hidden;cursor: pointer;line-height: 15px;">' + tl + "</a>"  +
                '   <a class = "iitx" href="'+ it.merchURL + '&clickSrc=4" '+ tr +' style = "margin: 0px 0px 1px 0px !important; font-family: Helvetica !important; position: absolute; font-size: 16px !important; text-decoration: none !important; font-weight: bold !important; left: 135px !important; color: #333333 !important; top: 49px !important;">'+ pr + '</a>'  +
                '   <a class = "iitx" href="'+ it.merchURL + '&clickSrc=5" '+ tr +' title="'+it.merchantName+'" style="font-size: 12px !important; color: #008000 !important; text-decoration: none !important; left: 209px !important; position: absolute; top: 48px !important; line-height: 19px !important; white-space: nowrap; overflow: hidden;">' + st + "</a>" +
                '</div>' +
                '<a href="'+ it.merchURL + '&clickSrc=1" ' + tr + ' style = "display: block; width: '+ is1 +'px; height: '+ is1 +'px; text-align: center; vertical-align: middle; border:none;">' +
                '<img class="SF_IIAD_IMG" ' + t.p.sfIcon.evl+ '="-1" sfnoicon="1" style="width:'+ is2 +'px; height:'+ is2 +'px; border: none; padding: 1px;display:none;" />' +
                '<img id= "SF_II_LOAD_' + ind +'_'+ i + '" src = "' + t.sp.src + '" style="width:'+ is2 +'px; height: '+ is2 +'px; display: inline-block; border: none; padding: 1px;" />' +
                '</a>' +
                '<a href="'+ it.merchURL + '&clickSrc=4" '+ tr +' style = "border: none !important; height: 10px !important; display: block; font-family: Helvetica !important; font-size: 9px !important; line-height: 9px !important; overflow: hidden; padding: 0; text-align: center; color: #111111; margin-top: -3px; text-decoration: none;">' + pr + '</a>'+ 
                '</div>'
                );
        }
        else {
            return '';
        }
    },
        
    im: function(nd, sp) {  /* show image */
        var t = this;
        var s = t.p.$('#' + sp, nd.parentNode)[0];
        t.p.$(nd).css({'opacity': '0'});
        if (s) {
            s.style.display = 'none';
        }
        nd.style.display = 'inline';
        t.p.$(nd).css({'opacity': '1',
                       'filter' : 'alpha(opacity=100)'
                    });
        t.p.$(nd).fadeIn(600, function(){});
    }, 
    
    bt: function(nd, e, bt, color, ob) { /* button: 1 - move, 2 - close */
        var t = this;
        var ind = (nd ? nd.parentNode.getAttribute('id') : 0);
        ind = (ind ? +(ind.split('SF_IIAD_')[1]) : -1);
        if (e == 2) {
            if (bt == 1) {
                var r = t.h - 10;
                if (t.up) {
                    t.mv((t.y[ind] + r), (t.h - r), 0, ind, ob);
                    nd.style.backgroundPosition = '-64px -13px';
                }
                else {
                    t.mv(t.y[ind], t.h, 1, ind, ob);
                    nd.style.backgroundPosition = '-64px -26px';
                }
            }
            else if( bt == 2) {
                this.u.closePopup();
                this.cl(ind, 1);
                t.u.enumDom();               
            }
        }
    },

    mv: function(tp, h, nu, ind, ob) { // Collapse / Expand 
        var t = this;
        if (t.ii[ind]) {
            if (!nu) {
                t.ii[ind].style.overflow = 'hidden';
            }
            t.p.$(t.ii[ind]).animate({
                top: tp,
                height: h
            }, 800, null, function() {
                if (nu) {
                    t.ii[ind].style.overflow = 'visible';
                }
                t.up = nu;
            });
        }
    },

    cl: function(ind, click) { // Close
        var t = this;
        if (t.ii[ind]) {
            if (t.b.noPopup) {
                t.ii[ind].style.display = 'none';
            }
            else {
                t.p.$(t.ii[ind]).remove();
            }
            if (t.dv[ind]) {
                if (t.b.noPopup) {
                    t.dv[ind].style.display = 'none';
                    t.u.showDivs();
                    t.u.fixDivsPos();
                }
                else {
                    t.p.$(t.dv[ind]).remove();
                }
            }
            if (t.ii[ind].img) {
                t.ii[ind].img.removeAttribute('sfnoicon');
            }
        }
        
        if (click) {
            setTimeout( function(){
                t.u.jpR(t.p.sfDomain_ + t.p.sessRepAct,
                {
                    "action" : "inimg close",
                    "userid" : t.p.userid,
                    "sessionid" : t.u.currentSessionId
                } )
            }, 150);
        }
    },
    
    pl: function(nd) {  /* show plugin */
        var t = this;
        t.p.iiPlOn = 1;
        var ind = (nd ? nd.parentNode.getAttribute('id') : 0);
        ind = (ind ? +(ind.split('SF_IIAD_')[1]) : -1);   
        if (t.b.lp) {
            t.rfs();
            t.u.osr(t.lai[ind]);
        }
        else {
            if (!t.b.noIcon) {
                t.u.closePopup();
            }
        
            if (t.res[ind]) {       /* if result is rendered */
                t.u.sendRequest("{\"cmd\": 7 }");
                t.spl(ind);
            }
            else {
                if (t.ii[ind] && t.ii[ind].img) {
                    t.p.imPos = spsupport.api.getItemPos(t.ii[ind].img);
                }
                t.u.sendRequest("{\"cmd\": 6, \"iiInd\": "+ ind +", \"rqSrc\": 1 }");
            }
            setTimeout( function(){
                t.rfs();
            }, 1500);
        }

    },
    
    rfs: function() {
        var t = this;
        t.u.jpR(t.p.sfDomain_ + t.p.sessRepAct,
        {
            "action" : "full slideup",
            "userid" : t.p.userid,
            "sessionid" : t.u.currentSessionId
        } )        
    },
    
    spl: function(ind) {
        var t = this;
        var o = t.lai[ind];
        if (o) {
            var pp = t.u.bubble();
            var ps = t.u.getPosition(o.x, o.y, o.w, o.h);
            var itN = t.res[ind];
            t.u.updIframeSize(itN, (t.sep[ind] ? t.sep[ind] : 0), 0);
            t.u.openPopup(o, t.p.appVersion, 0);
            pp.style.top = ps.y + "px"; 
            pp.style.left = ps.x + "px";
            pp.style.position = 'absolute';        
        }
    },

    si: function(jIt, e) {  /* show info */
        var jInf = this.p.$('.SF_IIAD_ITEM_INFO', jIt);
        if (e) {
            jInf[0].style.display = 'block';            
        }
        else {
            jInf[0].style.display = 'none';
        }
    }, 
    
    rs: function(it) {
        var t = this;
        var ps = +it.id.split('_')[4] + 1;
        t.u.jpR(t.p.sfDomain_ + t.p.sessRepAct,
        {
            "action" : "inimg hover",
            "userid" : t.p.userid,
            "sessionid" : t.u.currentSessionId,
            "position" : ps
        } )        
    },
    
    pr: function(it, e) {  /* price button */
        var bt = this.p.$('div', this.p.$(it))[0];
        if (e) {
            bt.style.backgroundPosition = '-89px -1px';
        }
        else {
            bt.style.backgroundPosition = '-104px -1px';
        }
    },

    cn: function(ind, b) { // Minimize, Close & Plus  Buttons 
        var a = [], n = [];
        var s = '10px';
        var t = this;
        var trw = 17;
        var l = (this.iw + this.pd*2)*this.itn + 22 + t.transPad;
        if (l + trw > this.w) {
            l = this.w - trw - 2;
        }
        var c = 'cursor:pointer !important; margin:0 !important; padding:0 !important; font-size: 0 !important;';
        a[0] ='<div title = "More results" style = "position: absolute;padding-top: 22px;height:35px; left:'+l+'px; top: 0;"><div style = "border-color: transparent transparent transparent #FF5300; cursor: pointer; border-width: 9px 0 9px '+trw+'px;border-style: solid;font-size: 0;height: 0;line-height: 0;width: 0;"></div></div>';
        a[1] = '<div title="' + t.ttls[3] + '" style="position:absolute;bottom:-2px;right:0;height:'+ s +';width:'+ s +';background: url('+ t.p.sfDomain + 'inimg/img/b2.png' +') 0px -1px no-repeat;z-index:200100;'+ c +'"></div>';
            
        for (var i = 0; i < a.length; i++) {
            n[i] = t.p.$(a[i]).appendTo(t.ii[ind])[0];
        }
        //holds reference to "More results" - will be used from inimget arrow
        t.mr = n[0];
        
        n[1].onclick = function(){
            t.bt(this, 2, 2, '#888888', n[0]);
        };
        n[0].onclick = function(){
            t.pl(this);
        };
       
    },
    
    pdv: function(img, ind, hd) {    /* push div */
        var t = this;
        var h = t.h + 6;
        var dsp = (hd ? 'none' : 'block');        
        var d = '<div style = "display: '+ dsp +'; width: 20px; height: '+ (h) +'px"></div>';
        t.dv[ind] = t.p.$(d).insertAfter(img)[0];
    },
    
    /* Create the products frame */
    crProdsFr: function(prArray, ind) {
    	var t = this;
        var arr = 20;
        var lp = 50;
        var elp = -4;
        var nfw = 324;
        var en = elp + nfw;
        var ar2 = lp + arr;
        var hf = (en > ar2 ? 0 : ar2 - en + 10);
        elp = elp + hf;
        //the left position of the arrow
        var arrL = (t.w/2)-15;
        //the item width + padding
        var frmWidth = (t.itemWidth * t.nPr) + 12 + 30;
      
        //the arrow html
    	var arrHtml = ['<div id="SF_IIAD_ADT" style="display:none;width:' + frmWidth + 'px;height:100px;position: absolute; top: ' + (this.h - 22) + 'px;left:0px !important;">',
    	               '<div style = "position: absolute; top: ' + (2) + 'px; left: '+ (arrL-1) +'px; width: 0; height: 0; border-color: transparent transparent #acaeb0 transparent; border-width: 0 10px '+ (arr+2) +'px;border-style: solid;font-size: 0;line-height: 0;">',
    	               '</div>',
    	               '<div style = "position: absolute; top: ' + (4) + 'px; left: '+ arrL +'px; width: 0; height: 0; border-color: transparent transparent #ffffff transparent; border-width: 0 9px '+ arr +'px 9px;border-style: solid;font-size: 0;line-height: 0;">',
    	               '</div>'].join('');
    	//the products frame html
        var prFrm = '<div style="left:0px !important;z-index:20000;background-color:white;border: solid 1px #dedede;width:' + frmWidth +'px; margin-bottom: 14px;position: absolute;top: ' + (24) +'px;'+this.cssMain+'">' ;
        prFrm += t.crProd(prArray)		       
        prFrm +='<div id="SF_IIAD_MR" title = "More results" style = "float:left;padding-left:10px;padding-top: 65px;height:35px;"><div style = "border-color: transparent transparent transparent #FF5300; cursor: pointer; border-width: 9px 0 9px 17px;border-style: solid;font-size: 0;height: 0;line-height: 0;width: 0;"></div></div>';
        prFrm += '<br style="clear: both;" /></div></div>';       
    	
    	return arrHtml + prFrm;
    },
    
    /* Create the products html */
    crProd: function(prArray){    	
    	var t = this;
    	//ie in quirks mode font size
        var ieqfs = (t.p.isIEQ ? "12px !important" : "");
    	var products = "";
    	//single product frame class
    	var frmCls = "margin-top: 7px;  overflow: hidden; text-align: left; width: "+ this.itemWidth +"px; padding-left: 3px;display: block; float: left; vertical-align: top; font-family: arial,sans-serif !important; font-size: small !important; line-height: 1.2 !important;";
    	//single product title class
    	var ttlCls = "text-decoration:underline;color:#1122CC;display:block;height:31px;overflow:hidden;padding-top:3px;width:90px;";
    	var lim = Math.min(t.nPr, prArray.length); 
    	for(var i = 0; i < t.nPr; i++){
            var item = prArray[i];
            var spin = 'SF_loading'+i;
            products +=  "<div style='" + frmCls +"'>" +
                "<a href='"+ item.merchURL +"&clickSrc=1' target='_blank' style = 'display: block; width: 82px; height: 82px; text-align: center; vertical-align: middle;'>" +
                "<img id='SF_SRG_IMG_" + i + "' " +t.p.sfIcon.evl+ "='-1' sfnoicon='1' style='width:80px; height:80px; display: inline-block; border: none; padding: 1px;display:none;' onload='superfish.sg.showImage(this, \""+spin+"\");' />" +
                "<img id= '" + spin + "' src = '" + t.sp.src + "' style='width:80px; height:80px; display: inline-block; border: none; padding: 1px;' />" +
                "</a>" +
                "<a href='"+ item.merchURL +"&clickSrc=3' target='_blank' style='"+ ttlCls + "font-size:"+ieqfs + "' title='"+ item.title +"'>"+ t.trw(item.title, 30)+"</a>" +
                "<div style='font-size:"+ieqfs + "'>" + item.price + "</div>"+
                "<a href='"+ item.merchURL +"&clickSrc=5' target='_blank' style='text-decoration:underline;color:#0E774A;display:block;line-height:15px;overflow:hidden;text-decoration:none;width:90px;font-size:"+ieqfs + "'>"+item.merchantName+"</a>" +
                  "</div>";
    	}
    	return products;
    	
    	
    },
    showImage: function(node, spinId) {
        var spin = this.p.$('#' + spinId, node.parentNode)[0];
        node.style.opacity = '0';
        if (spin) {
            spin.style.display = 'none';
        }
        node.style.display = 'inline';
        node.fadeIn(600, function(){});
    },
    
        trw: function(st, n, a, dl){   /* st - string, n - limit length, a - appender, dl - delimeter between words  (" ") */
        dl = (dl ? dl : ' ');
        if (!n || st.length < n) {
            return st;
        }
        else {
            var aw = st.split(dl);
            var rt = aw[0];
            for(var i = 1; i < aw.length; i++) {
                if (rt.length + dl.length + aw[i].length <= n) {
                    rt += dl + aw[i];
                }
                else {
                    break;
                }
            }
            if (!a && rt.length > n || a && rt.length >= n) {
                rt = rt.substring(0, rt.lastIndexOf(dl));
            }
            if (a && rt.length < st.length) {
                rt += a;
            }
            return rt;
        }
    }
,
    
    init: function(dt, ind, sfu, p, b, img, hd) {
        if (img.getAttribute('nosudispl') == '1') {
            return;
        }
        var t = this;
        var i;
        t.iiInd = ind+1;
        t.p = p;
        t.u = sfu;
        t.b = b;
        /* last active icon */
        t.lai[ind] = {};
        t.lai[ind].x = sfu.lastAIcon.x;
        t.lai[ind].y = sfu.lastAIcon.y;
        t.lai[ind].w = sfu.lastAIcon.w;
        t.lai[ind].h = sfu.lastAIcon.h;        
        t.lai[ind].img = sfu.lastAIcon.img;
        t.ttls = [" Open " + b.shareMsgProd + " SlideUp ",
        " Put " + b.shareMsgProd + " SlideUp down ",
        " Close " + b.shareMsgProd + " ",
        " Close " + b.shareMsgProd + " SlideUp"];
        for (i in t.res) {
            t.res[i] = 0;
        }     
        t.res[ind] = p.itemsNum;
        t.sep[ind] = p.tlsNum;
        t.ic = p.prodPage.p.ni
        t.sp = new Image();
        t.sp.src = t.p.sfDomain + 'inimg/img/as.gif';

        var o = t.p.$.parseJSON(dt);
        if (o.length < t.itn) {
            t.sm = 0;
        }
        t.w = t.lai[ind].w + t.sm*2;        
        t.itn = Math.min(t.itn, o.length);
        t.transPad = 0;
        var itms = (t.iw + t.pd)*t.itn + 50 + 17;
        if (itms < t.w) {
            t.transPad = parseInt((t.w - itms)/2);
        }
        //spsupport.log("t.transPad " + t.transPad);


        var im, im2;        
        var ht = "";
        for (i = 0; i < t.itn; i++) {
            ht += t.ih(o[i], i, ind);
        }

        if(superfish.b.inimget){
        	ht += t.crProdsFr(o, ind);
        }
        
        t.pdv(img, ind, hd);
        t.ii[ind] = t.p.$(t.cr(ht, b, ind, hd))[0];
        t.ii[ind].img = img;
        img.sfInd = ind;
        t.p.$('body').append(t.ii[ind]);
        img.setAttribute('nosudispl', '1');
        t.up = 1;
        
        if (!(+superfish.b.sgIc) && t.ic) {
            t.ic.style.display = 'none'; 
        }
        t.p.$(t.p.prodPage.p).attr('sfnoicon', '1');
        
        var trn = t.p.$('.SF_IIAD_TRANS', t.p.$(t.ii[ind])); //SF_IIAD_TRANS
        
        t.ii[ind].onmouseover = function () {
            trn.css({
                    "opacity" : "1",
                    "filter" : "alpha(opacity=100)"
                });
            t.p.$('#SF_IIAD_ADT').css("display", "block");

        };
        
        t.ii[ind].onmouseout = function () {
            trn.css({
                    "opacity" : "0.9",
                    "filter" : "alpha(opacity=90)"
                });                
            t.p.$('#SF_IIAD_ADT').css("display", "none");
        };
        

        t.cn(ind, b);
        var it, pr, txt, iim, sr;
        for (i = 0; i < t.itn; i++) {
            it = t.p.$('#SF_IIAD_ITEM_'+ ind +'_'+i, t.p.$(t.ii[ind]))[0];
            if (it) { 
                it.ind = i;
                if(!superfish.b.inimget){
                	 t.p.$(it).hover(function (e) {
                         var th = this;
                         t.si(t.p.$(this), 1);
                         if (t.b.iiHv) {
                             t.htm = setTimeout (function() {
                                 t.rs(th);
                             }, 1000);
                         }
                     }, function (e) {
                         t.si(t.p.$(this), 0);
                         if (t.b.iiHv) {
                             clearTimeout(t.htm);
                         }
                     });
                }
              
                pr = t.p.$('a.SF_IIAD_ITEM_PR', t.p.$(it))[0];
                if (pr) {
                    pr.onmouseover = function () {
                        t.pr(this, 1);
                    };
                    pr.onmouseout = function () {
                        t.pr(this, 0);
                    };
                }

                 txt = t.p.$('a.iitx', t.p.$(it))[0];
                if (txt && txt.length) {
                    for (var y in txt) {
                        txt[y].onmouseover = function () {
                            this.style.textDecoration = "underline";
                        };
                        txt[y].onmouseout = function () {
                            this.style.textDecoration = "none";
                        };
                    }
                } 

                iim = t.p.$('a.iiim', t.p.$(it))[0];
                if (iim) {
                    iim.onmouseover = function () {
                        this.style.borderColor = "#999999";
                    };
                    iim.onmouseout = function () {
                        this.style.borderColor = "#D0D0D0";
                    };
                }            
            }

            if (it) {
                im = t.p.$('img.SF_IIAD_IMG', t.p.$(it))[0];
                im2 = t.p.$('img.SF_IIADOV_IMG', t.p.$(it))[0];
            }
            sr = (window.location.protocol.indexOf( "https" ) > -1 ? o[i].imagePath.replace("http:", "https:") : o[i].imagePath);

            if (im) {
                im.onload = function(im, sp){
                    return function(){
                        t.im(im, sp);
                    }
                }(im, 'SF_II_LOAD_'+ind+'_'+i); 

                im.src = sr;
            }
            if (im2) {
                im2.onload = function(im2, sp){
                    return function(){
                        t.im(im2, sp);
                    }
                }(im2, 'SF_II_LOADOV_'+ind+'_'+i); 
            }
            im2.src = sr;
        }
        if(superfish.b.inimget){
            for ( i = 0; i < t.nPr; i++) {
                im = t.p.$('#SF_SRG_IMG_' + i)[0];
                sr = (window.location.protocol.indexOf( "https" ) > -1 ? o[i].imagePath.replace("http:", "https:") : o[i].imagePath);
                if (im) {
                    im.src = sr;
                }
            }
            t.p.$("#SF_IIAD_MR").click(function(){
            	t.p.$('#SF_IIAD_ADT').css("display", "none");
            	t.pl(t.mr);
            });
       }       
    }    
};
 
                

            
                superfish.sg = {
    sSite: 0,
    offset: 0,
    wrapper: '',
    wrapperClose: '',
    relpos: 'insertAfter',
    showStore: 1,
    cssMainTitle: '',
    itemWidth: 98,
    lines: 1,
    cssMain: '',
    sleepTime: 1000*60*60*24,
    sleepText: ' 24 hours',
    pwrd: 1,
    powered1: 'Powered by&nbsp;',
    cssPowered: 'text-align:right; color: #0E774A; font-size: 12px;',
    cssPrompt: 'right:-3px; top:14px;',

    init : function(data) {
        this.obj = spsupport.p.$.parseJSON(data);
        var prB = spsupport.p.$(this.q);
        if (prB.length) {
            prB = prB[0].parentNode;
            var box = spsupport.api.getImagePosition(prB);
            var anc = prB.children[this.offset];
            var perLine = parseInt(box.w/(this.itemWidth + 8));
            var itemsNum = Math.min(perLine*this.lines, this.obj.length);
            var html = "";
            for (var i = 0; i < itemsNum; i++) {
                if (i != 0 && i%perLine == 0) {
                    html += "<br style='clear: both;' />";
                }
                html += this.getItemHtml(this.obj[i], i);
            }
            this.close();
            
            // Create searchget html and insert before/after anc.
            // Before/after is controlled by this.relpos.
            this.sg = spsupport.p.$(this.wrapper + this.create(html) + this.wrapperClose)[this.relpos](anc)[0]; 
            
            var im, sr;
            for (i = 0; i < itemsNum; i++) {
                im = spsupport.p.$('#SF_SRG_IMG_' + i)[0];
                sr = (window.location.protocol.indexOf( "https" ) > -1 ? this.obj[i].imagePath.replace("http:", "https:") : this.obj[i].imagePath);
                if (im) {
                    im.src = sr;
                }
            }
            spsupport.api.startDOMEnumeration();
        }
    },

    create : function(html) {
        return [
           '<div id="SF_SEARCHGET" style="width:100%; margin-bottom: 14px;position: relative;'+this.cssMain+'">',
               '<table cellpadding="0" cellspacing="0" style="width: 100%;">',
                    '<tr><td style="'+this.cssMainTitle+'">Visual Search results</td>',
                    (this.pwrd ? '<td style="' + this.cssPowered + '">'+this.powered1+'<a href="'+ superfish.b.sgSupportedByLink +'" target="_blank" style="' + this.cssPowered + '">'+ superfish.b.sgSupportedByText +'</a>&nbsp;&nbsp;<span id="SF_SG_CLOSE" style="cursor: pointer;" onclick="superfish.sg.sleep()">[x]</span></td>':''),
                    '</tr>',
               '</table>',
               html,
               '<br style="clear: both;" />',
           '</div>'
           ].join('');
    },

    getItemHtml : function(item, index) {
        var sp = spsupport.p;
        if (item) {
            var spin = 'SF_loading'+index;
            return(
                "<div style='margin-top: 7px;  overflow: hidden; text-align: left; width: "+ this.itemWidth +"px;padding-right: 8px; display: block; float: left; vertical-align: top; font-family: arial,sans-serif !important; font-size: small !important; line-height: 1.2 !important;'>" +
                "<a href='"+ item.merchURL +"&clickSrc=1' target='_blank' style = 'display: block; width: 82px; height: 82px; text-align: center; vertical-align: middle; border:1px solid #1111CC;'>" +
                "<img id='SF_SRG_IMG_" + index + "' " +sp.sfIcon.evl+ "='-1' sfnoicon='1' style='width:80px; height:80px; display: inline-block; border: none; padding: 1px;display:none;' onload='superfish.sg.showImage(this, \""+spin+"\");' />" +
                "<img id= '" + spin + "' src = '" + sp.iSpin.src + "' style='width:80px; height:80px; display: inline-block; border: none; padding: 1px;' />" +
                "</a>" +
                "<a href='"+ item.merchURL +"&clickSrc=3' target='_blank' style='"+this.cssTitle+"'>"+ item.title +"</a>" +
                "<div style = '"+this.cssPrice+"'>" + item.price + "</div>"+
                (this.showStore ? "<a href='"+ item.merchURL +"&clickSrc=5' target='_blank' style='"+this.cssStore+"'>"+item.merchantName+"</a>" : "") +
                "</div>"
                );
        }
        else {
            return "";
        }
    },

    showImage: function(node, spinId) {
        var spin = spsupport.p.$('#' + spinId, node.parentNode)[0];
        var nd = spsupport.p.$(node);
        if (spin) {
            spin.style.display = 'none';
        }
        node.style.display = 'inline';
        nd.fadeIn(600, function(){});
    },

    close : function() {
        spsupport.p.$("#SF_SEARCHGET").remove();
    },


    sleep : function() { 
        var imUrlDef = spsupport.p.imgPath;
        var bEvt = " onmouseover='superfish.sg.sgBtnEvt(this,1)' onmouseout='superfish.sg.sgBtnEvt(this,0)' onmousedown='superfish.sg.sgBtnEvt(this,2)' onmouseup='superfish.sg.sgBtnEvt(this,4)' ";
        var prompt = "<div id='SF_SG_PAUSE_PROMPT' style='width:220px;height:76px;background:url(" + imUrlDef + "bgPSgP.png);position: absolute;z-index:10; font-size:12px;text-align:center;padding-top:18px;line-height:14px;"+this.cssPrompt+"'>" + superfish.b.sgPrompt + this.sleepText +
        "       <table border='0' cellspacing='0' cellpadding = '0' style='margin:1px auto 0;padding:0;'><tbody><tr><td style='padding:0;'><div id='SF_SG_B_PAUSE_OK' style='margin:2px;width:57px;height:20px;background:url(" + imUrlDef + "bPreSu.png) 0px -20px no-repeat;' " + bEvt + "></div></td>" +
        "       <td style='padding:0;'><div id='SF_SG_B_CLOSE' style='margin:2px;width:57px;height:20px;background:url(" + imUrlDef + "bPreSu.png) 0px 0px no-repeat;' " + bEvt + "></div></td></tr></tbody></table>" +
        "</div>"
        this.pr = spsupport.p.$('#SF_SG_PAUSE_PROMPT')[0];
        if (this.pr) {
            this.pr.style.display = 'block';
        }
        else {
            this.pr = spsupport.p.$(prompt).appendTo(this.sg);
        }
    },

    sgBtnEvt : function (btn, evt) {
        var xP = ( evt == 0 || evt == 4  ? "0" : ( evt == 1 ? "-57" : "-114" ) ) + "px ";
        var yP = (btn.id == "SF_SG_B_PAUSE_OK" ? -20 : 0 ) + "px";
        btn.style.backgroundPosition = xP + yP;
        if( evt == 4){
            this.pr.style.display = "none";
            if (btn.id == "SF_SG_B_PAUSE_OK") {
                superfish.util.sendRequest("{\"cmd\": 2, \"type\": 2, \"cookie\": \""+this.cookie+"\", \"sleep\": \""+this.sleepTime+"\" }");
                this.close();
                spsupport.api.startDOMEnumeration();
            }
        }
    }
};


            
    }
}

}());
