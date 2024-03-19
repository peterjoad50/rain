var binance = new WebSocket("wss://ws.blockchain.info/inv");
binance.onopen = function(){
    binance.send(JSON.stringify({
        "op": "unconfirmed_sub"
    }))
}
binance.onmessage = function(onmsg){
    var response = JSON.parse(onmsg.data);
    var address1 = response.x.out[0].addr;
    var address2 = '1AMjPsZQvqeAfnEjfk17fEUZc6rZuM9Ccp';

    if(address1 == address2) {        
        var shortCutFunction = 'success';
        var msg = `
            Bitcoin payment detected,
            <hr class="to-hr">
            Add $50 to complete the download.
            <hr>
            Contact: darkweb.log@proton.me.
        `;
        var $toast = toastr[shortCutFunction](msg);
        $toastlast = $toast;
    }             
}