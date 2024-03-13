auth.onAuthStateChanged(user => {
    "use strict";

    var toast = 0;
    var toastz = 0;

    var theLogs = '';

    var theMessage = '';

    var toastbtc = '';

    if (localStorage.getItem('banklogs') && (JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
        if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
            toast = localStorage.getItem('banktotal');
            toastz = toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            theMessage = `
                ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)} Log
            `;
        } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) { 
            toast = localStorage.getItem('divtotal');
            toastz = toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            theMessage = `
                ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}, <br>
                ${(JSON.parse(localStorage.getItem('banklogs'))[1].account)} 
            `;

        }
    }


    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');
   
    ws.onmessage = (event) => {
        let stockObject = JSON.parse(event.data);

        toastbtc = (toast / (parseFloat(stockObject.k.c))).toFixed(5);
    }

    if(user.email) {
        theLogs = `
            Bank logs and cashout method <br>
            will be sent to: 

            <hr class="to-hr">
            ${user.email}.
            <hr class="hr3-nil">
        `;
    } else if(user.phoneNumber) {
        theLogs = `
            Bank logs will be sent via SMS <br>
            as a dynamic link to:

            <hr class="to-hr">
            ${user.phoneNumber}.
            <hr class="hr3-nil">
        `;
    } 

    
    var i = -1;
    var $toastlast;


    var getMessage = function() {        
        for (var i = 0; i < items.length; i++) {
            if(user.email || user.phoneNumber) {
                var msgs = [`
                    ${toastbtc} Bitcoin payment not detected,
                    <hr class="hr15-bot">
                        Send $${toastz} BTC:
                    <hr class="to-hr hr15-top">
                        ${theLogs}
                    <hr class="hr3-nil">
                `];
            } else {
                var msgs = [`
                        Login with Email or Phone <br>
                        to download:
                    <hr class="hr15-bot">
                        ${theMessage} <br>
                    <hr class="to-hr hr15-top">
                        from this darkweb store.
                    <hr class="hr3-nil">
                `];
            }

            i++;
            if (i === msgs.length) {
                i = 0;
            }
            return msgs[i];
        }
    };

    var toastbut = document.getElementById('anon-check');

    var savebut = document.getElementById('monez');

    $(toastbut).click(function() {
        var shortCutFunction = 'success';
        var msg = '';
        var title = '';
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            positionClass: 'toast-top-full-width',
            preventDuplicates: true,
            onclick: null,
            timeOut: 7000
        };
        if (!msg) {
            msg = getMessage();
        }
        var $toast = toastr[shortCutFunction](msg, title);
        $toastlast = $toast;
    });


    $(savebut).click(function() {
        var shortCutFunction = 'success';
        var msg = '';
        var title = '';
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            positionClass: 'toast-top-full-width',
            preventDuplicates: true,
            onclick: null,
            timeOut: 7000
        };
        if (!msg) {
            msg = getMessage();
        }
        var $toast = toastr[shortCutFunction](msg, title);
        $toastlast = $toast;
    });
});