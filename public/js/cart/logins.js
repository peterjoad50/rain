let items = [];

var table1 = jQuery('#example1').DataTable();

var theLogo = document.getElementById('logo');
var theLogo2 = document.getElementById('vpn-img');


if(localStorage.getItem('banklogs')){
    if((JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
        items = JSON.parse(localStorage.getItem('banklogs'));
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);
    
    
    
        items.map(data=>{
            var image = `<td><img src=${data.image}></td>`
            var balance =`<td class="btn-balance">${data.balance}</td>`
            var account = `<td>${data.account}</td>`
            var remove = `<td><button class="btn-cloze btn-remove"></button></td>`
            var price = `<td class="btn-price">${data.price}</td>`
            var website = `<td>${data.website}</td>`
            var info1 = `<td>${data.info1}</td>`
            var info2 = `<td>${data.info2}</td>`
            var info3 = `<td>${data.info3}</td>`
            var info4 = `<td>${data.info4}</td>`
            var info5 = `<td>${data.info5}</td>`
            var info6 = `<td>${data.info6}</td>`
            
            table1.row.add([
                image,
                balance,      
                account,   
                remove,
                price,
                info1,   
                info2,   
                info3,   
                info4,   
                info5,   
                info6,   
                website,      
            ]).draw();
        });
    
        for(var i = 0; i < items.length; i++) {
            var cartRow2 = document.createElement('li');
    
            cartRow2.classList.add('total','bg-black');
    
    
    
            if((items[i].account).includes('CHECKING') || (items[i].account).includes('SPENDING')){
                var cartRow3 = document.createElement('div');
                cartRow3.classList.add('col-lg-3', 'col-xl-2', 'col-md-3', 'col-6');
                var balance2 = items[i].balance;
                var price2 = items[i].price;
                var balance3 = balance2.replace('Balance: ', '');
                var price3 = price2.replace('Price: ', 'Save: ');
                var cartItems3 = document.getElementsByClassName('xenon3')[0];
                var cartRowContents3 = `
                    <div class="pricing-list highlight">
                        <div class="pricing-list-price">
                            <h2 class="text-white">${balance3}</h2>
                            <img src=${items[i].image} class="borderp">
                        </div>
                        <ul>
                            <li class="text-white">${items[i].website} </li>
                            <li class="text-white">${items[i].info1} </li>
                            <li class="text-white">${items[i].info2} </li>
                            <li class="text-white">${items[i].info3} </li>
                            <li class="text-white">${items[i].info4} </li>
                            <li class="text-white">${items[i].info5} </li>
                            <li class="text-white">${items[i].info6} </li>
                            <li class="text-white">${(items[i].account).replace('[','<br>[').replace(']',' ACCOUNT]')}</li>
                            <button type="submit" class="butn white" data-bs-toggle="modal" data-bs-target="#saveModal">
                                ${price3}
                            </button>
                        </ul>
                    </div>
                `;
                cartRow3.innerHTML = cartRowContents3;
                cartItems3.prepend(cartRow3);
            } else {
                var cartRow3 = document.createElement('div');
                cartRow3.classList.add('col-lg-3', 'col-xl-2', 'col-md-3', 'col-6');
                var balance2 = items[i].balance;
                var price2 = items[i].price;
                var balance3 = balance2.replace('Balance: ', '');
                var price3 = price2.replace('Price: ', 'Save: ');
                var cartItems3 = document.getElementsByClassName('xenon3')[0];
                var cartRowContents3 = `
                    <div class="pricing-list">
                        <div class="pricing-list-price">
                            <h2>${balance3}</h2>
                            <img src=${items[i].image} class="borderp">
                        </div>
                        <ul>
                            <li>${items[i].website} </li>
                            <li>${items[i].info1} </li>
                            <li>${items[i].info2} </li>
                            <li>${items[i].info3} </li>
                            <li>${items[i].info4} </li>
                            <li>${items[i].info5} </li>
                            <li>${items[i].info6} </li>
                            <li>${(items[i].account).replace('[','<br>[').replace(']',' ACCOUNT]')}</li>
                            <button type="submit" class="butn" data-bs-toggle="modal" data-bs-target="#saveModal">
                                ${price3}
                            </button>
                        </ul>
                    </div>
                `;
                cartRow3.innerHTML = cartRowContents3;
                cartItems3.prepend(cartRow3);
    
              
            }
        
        }
    
        updateCartTotal();
    
        var removeFromCartButtons = document.getElementsByClassName('btn-remove');
        for(var i = 0; i <removeFromCartButtons.length; i++){
            var button = removeFromCartButtons[i];
            button.addEventListener('click', removeCartItem)
        }
    }
} else {
    window.location.assign('banklogs');
}




function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement;
    var price = cartItem.children[4].innerText;
    var balance = cartItem.children[1].innerText;
    var account = cartItem.children[2].innerText;
    var website = cartItem.children[11].innerText;
    var image = cartItem.children[0].children[0].src;
    var info1 = cartItem.children[5].innerText;
    var info2 = cartItem.children[6].innerText;
    var info3 = cartItem.children[7].innerText;
    var info4 = cartItem.children[8].innerText;
    var info5 = cartItem.children[9].innerText;
    var info6 = cartItem.children[10].innerText;

    removeItemFromCart(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);
    buttonClicked.parentElement.parentElement.remove();
}


function removeItemFromCart(price, balance,account,website,image,info1,info2,info3,info4,info5,info6){
    let item = {
        price: price,
        balance: balance,
        account: account,
        website: website,
        image: image,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4,
        info5: info5,
        info6: info6
    }
    function checkAdult(items) {
        return JSON.stringify(items) !== JSON.stringify(item)
    }
    localStorage.setItem('banklogs', JSON.stringify(items.filter(checkAdult)));
    items = items.filter(checkAdult);
    window.location.reload()
}


function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });

    var downFile = document.getElementById('down-file');
    var anonP = document.getElementById('anon-p');
    var anonB = document.getElementById('anon-b');
    var usaP = document.getElementById('usage-p');

    var titleLog2 = document.getElementById('titlelogs2');
    var modalAmount = document.getElementById('modal-amount');
    var jinaHolder2 = document.getElementById('jinaHolder2');

    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    var anonCheks = document.getElementById('anon-check');


    var discountTotal = parseInt((total * 0.9).toFixed(0));
    localStorage.setItem('divtotal', discountTotal);
    var disTot = localStorage.getItem('divtotal');

    const invoiceType = document.getElementById('invoice-type');


    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        const bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);
        const bankBal = (JSON.parse(localStorage.getItem('banklogs'))[0].balance);
        
        const bankImg = (JSON.parse(localStorage.getItem('banklogs'))[0].image);

        const banking1 = (JSON.parse(localStorage.getItem('banklogs'))[0].info1);
        const banking2 = (JSON.parse(localStorage.getItem('banklogs'))[0].info2);
        const banking3 = (JSON.parse(localStorage.getItem('banklogs'))[0].info3);

        const banking4 = (JSON.parse(localStorage.getItem('banklogs'))[0].info4);
        const banking5 = (JSON.parse(localStorage.getItem('banklogs'))[0].info5);
        const banking6 = (JSON.parse(localStorage.getItem('banklogs'))[0].info6);

        
        if(bankLog.includes('America')) {
            downFile.innerHTML = 'Bank of America';
        } else {
            downFile.innerHTML = bankLog.split('[')[0];
        }

        if(bankLog.includes('Huntington') || bankLog.includes('Woodforest')) {
            invoiceType.innerHTML = bankLog.split('Bank')[0];
        } else if(bankLog.includes('America')) {
            invoiceType.innerHTML = 'Bank America';
        } else {
            invoiceType.innerHTML = bankLog.split('[')[0];
        }

        downFile.innerHTML = bankLog.split('[')[0];

        anonP.innerHTML = `
            ${bankLog} <br> <span>${bankBal}</span>.
        `;

        anonB.innerHTML = `
            ${bankLog} <br>
            <span>${bankBal}</span>.
        `;

        theLogo.src = `${bankImg}`;
        theLogo2.src = `${bankImg}`;

        anonCheks.innerHTML = `
            Download <img src=${bankImg}>
        `;

        if(bankLog.includes('Chime') || bankLog.includes('Wells')) {

            theLogo.classList.add('bit-img');
            theLogo2.classList.add('bit-img');

            theLogo.classList.add('logo-50');
            theLogo2.classList.add('logo-50');
        }

        jinaHolder2.innerHTML = bankLog;


        var bankLogz = (JSON.parse(localStorage.getItem('banklogs'))[0].account);

        var n = bankLogz.indexOf('[');
        var bankLogz3 = bankLogz.substring(0, n != -1 ? n : bankLogz.length);

        jinaHolder2.innerHTML = bankLogz3 + ' Log';
        

        usaP.innerHTML = `
            <div class="modal-body no-bord"> ${banking1} </div> 

            <div class="modal-body no-bord"> ${banking2} </div> 

            <div class="modal-body no-bord"> ${banking3} </div> 

            <div class="modal-body no-bord"> ${banking4} </div> 

            <div class="modal-body no-bord"> ${banking5} </div> 

            <div class="modal-body no-bord"> ${banking6} </div> 
        `;

        titleLog2.innerHTML = `
            Cart: ${JSON.parse(localStorage.getItem('banklogs')).length}, 
            Total: $<span class="countup">${parseInt(total).toLocaleString()}</span> 
        `;

        modalAmount.innerHTML = `
            Send $ <span id="omanyala" class="countup">${parseInt(total).toLocaleString()}</span> 
        `;
        
        document.getElementById('disb').style.display = 'none';
    } else if(JSON.parse(localStorage.getItem('banklogs')).length > 1) {
        var Loginz = (JSON.parse(localStorage.getItem('banklogs')));

        for(var i = 0; i < Loginz.length; i++) {
            var logRow = document.createElement('p');
            var logItems = document.getElementById('anon-p');
            logRow.innerHTML = `
                <hr class="thehr thezoo"> 
                ${Loginz[i].account}  <br> <span>${Loginz[i].balance}</span>. 
                <hr style="opacity: 0 !important; margin-bottom: -10px !important; margin-top: -7px !important">
            `;
            logItems.prepend(logRow);
        }

        anonB.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)} , <br>
            ${(JSON.parse(localStorage.getItem('banklogs'))[1].account)}
        `;

        document.getElementsByClassName('thezoo')[0].style.display = 'none';
    
        document.getElementById('usage-p').style.display = 'none';
        document.getElementById('usage-hr').style.display = 'none';

        downFile.innerHTML = `Bank Logins`;

        titleLog2.innerHTML = `
            Cart: ${JSON.parse(localStorage.getItem('banklogs')).length}, 
            Total: $<span class="countup">${parseInt(total).toLocaleString()}</span> 
        `;

        jinaHolder2.innerHTML =  `${JSON.parse(localStorage.getItem('banklogs')).length} Bank Logs`;

        modalAmount.innerHTML = `
            Send  <span id="omanyala3">$</span> 
            <span id="omanyala2" class="countup">${parseInt(total).toLocaleString()}</span> 
            $<span id="omanyala" class="countup">${parseInt(disTot).toLocaleString()}</span>
        `;
        document.getElementById('bitcoin-logo').style.display = 'none';

    } 


    const theSave1 = document.getElementById('save-1');
    const theSave2 = document.getElementById('save-2');
    var bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);

    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        theSave1.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}  <br> 
            <span> ${(JSON.parse(localStorage.getItem('banklogs'))[0].balance)}</span>.
        `;
            
    } else {
        theSave1.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}  <br> 
            <span> ${(JSON.parse(localStorage.getItem('banklogs'))[0].balance)}</span>.
        `;
        theSave2.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[1].account)}  <br> 
            <span> ${(JSON.parse(localStorage.getItem('banklogs'))[1].balance)}</span>.
        `;
    }

    localStorage.setItem('banktotal',total);
}