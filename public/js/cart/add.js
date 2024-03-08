let items = [];
let logz = [];
var table1 = jQuery('#example1').DataTable();

var profileModal = document.getElementById('profileModal');
var modalDialog = profileModal.getElementsByClassName('modal-dialog')[0];

if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){
    items = JSON.parse(localStorage.getItem('banklogs'));
    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

    items.map(data=>{
        var image = `<td><img src=${data.image}></td>`
        var balance = `<td class="btn-balance">${data.balance}</td>`
        var price = `<td class="btn-price">${data.price}</td>`
        var remove = `<td><button class="btn-cloze btn-remove"></button></td>`
        var account = `<td>${data.account}</td>`
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

    var removeFromCartButtons = document.getElementsByClassName('btn-remove');
    for(var i = 0; i <removeFromCartButtons.length; i++){
        var button = removeFromCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    updateCartTotal();
} else {
    document.getElementById('cartlength').style.display = 'none';

    document.getElementById('thetot').setAttribute('data-bs-target', '#vpnModal');

    if (window.innerWidth > 1092) {
        modalDialog.style.top = '7vh';
        modalDialog.style.minWidth = '85vw';
    } 
}


var addToCartButtons = document.getElementsByClassName('money');
for(var i = 0; i <addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    var button = event.target;
    var pri = button.innerText;
    var pric = pri.replace('Buy: ','');
    var price3 = 'Price: '+  pric;
    var price = price3.substring(0, price3.length - 1);
    var balance = button.parentElement.parentElement.parentElement.children[0].children[1].innerText;
    var website = button.parentElement.parentElement.children[0].children[0].innerText;
    var info1 = button.parentElement.parentElement.children[1].children[0].innerText;
    var info2 = button.parentElement.parentElement.children[2].children[0].innerText;
    var info3 = button.parentElement.parentElement.children[3].children[0].innerText;
    var info4 = button.parentElement.parentElement.children[4].children[0].innerText;
    var info5 = button.parentElement.parentElement.children[5].children[0].innerText;
    var info6 = button.parentElement.parentElement.children[6].children[0].innerText;

    var image = button.parentElement.parentElement.parentElement.children[0].children[0].src;
    var accoun = button.parentElement.parentElement.children[7].children[0].innerText;

    if(accoun.includes('ACCOUNT')) {
        var account = accoun.replace(' ACCOUNT]',']');
    } 

    addItemToCart(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);

    updateCartTotal();

    window.location.assign('invoice');
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
    var remove = `<td><button class="btn-cloze btn-remove"></button></td>`

    removeItemFromCart(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);
    buttonClicked.parentElement.parentElement.remove();
    
    updateCartTotal2();

    table1.row(({
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
    })).remove();

    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var singleLog = logsContainer.getElementsByClassName('butn');
    for(var i = 0; i < singleLog.length; i++){
        if((singleLog[i].innerText) == price.replace('Price: ', 'In Cart ') && (singleLog[i].parentElement.children[0].innerHTML) == website){
            singleLog[i].innerHTML = `
                ${price.replace('Price: ', 'Buy: ')}
            `;
            singleLog[i].classList.remove('in-cart');
            var bunist = singleLog[i].parentElement.parentElement;
            bunist.classList.remove('display-nones');
            singleLog[i].disabled = false;
        } 
    }

    window.location.reload();
}

function addItemToCart(price, balance, account,website, image,info1,info2,info3,info4,info5,info6){

    var image1 = `<td><img src=${image}></td>`
    var balance1 = `<td class="btn-balance">${balance}</td>`
    var price1 = `<td class="btn-price">${price}</td>`
    var remove1 = `<td><button class="btn-cloze btn-remove"></button></td>`
    var account1 = `<td>${account}</td>`
    var website1 = `<td>${website}</td>`
    var info11 = `<td>${info1}</td>`
    var info21 = `<td>${info2}</td>`
    var info31 = `<td>${info3}</td>`
    var info41 = `<td>${info4}</td>`
    var info51 = `<td>${info5}</td>`
    var info61 = `<td>${info6}</td>`

    if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){
        var cartItemNames = JSON.parse(localStorage.getItem('banklogs'));
        for(var i = 0; i < cartItemNames.length; i++) {
            if(cartItemNames.length > 1.5) {

                var shortCutFunction = 'success';
                var msg = `
                    Cart is full, checkout the <br>
                    2 bank logs. 
                    <hr class="to-hr hr15-bot">  
                    There's a 10% discount. 
                    <hr class="hr10-nil">
                `;
                toastr.options =  {
                    closeButton: true, debug: false, newestOnTop: true, progressBar: true,
                    positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
                };
                var $toast = toastr[shortCutFunction](msg);
                $toastlast = $toast;

                return
            }
            if(cartItemNames.length > 2.5) {
                document.getElementsByClassName('dataTables_paginate')[0].style.display = 'block';
                document.getElementsByClassName('dataTables_length')[0].style.display = 'block'
            }
        }
    } 

    addToLocalStorage(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);

    table1.row.add([
        image1,
        balance1,      
        account1,   
        remove1,
        price1,
        info11,   
        info21,   
        info31,   
        info41,   
        info51,   
        info61,   
        website1,      
    ]).draw();

    document.getElementById('thetot').setAttribute('data-bs-target', '#profileModal');

    updateCartTotal();

    var removeFromCartButtons = document.getElementsByClassName('btn-remove');
    for(var i = 0; i <removeFromCartButtons.length; i++){
        var button = removeFromCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
}


function addToLocalStorage(price, balance, account,website, image,info1,info2,info3,info4,info5,info6){
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
    items.push(item);
    localStorage.setItem('banklogs', JSON.stringify(items));
    if(localStorage.getItem('banklogs')){
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);
        document.getElementById('cartlength').style.display = 'block';
    }
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
}

function updateCartTotal() {


    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    document.getElementById('theno1').innerHTML = 'Cart: ' + JSON.parse(localStorage.getItem('banklogs')).length + ' , Total: $' + total.toLocaleString();

    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var singleLog = logsContainer.getElementsByClassName('butn');
    for(var i = 0; i < singleLog.length; i++){
        let cart = JSON.parse(localStorage.getItem('banklogs'));
        cart.map(data=>{
            data.price3 = data.price.replace('Price: ','');
            if((singleLog[i].innerText) == data.price.replace('Price: ', 'Buy: ') && (singleLog[i].parentElement.children[0].innerHTML) == data.website){
                singleLog[i].innerHTML = `
                In Cart ${data.price3}
                `;
                singleLog[i].classList.add('in-cart');
                var bunist = singleLog[i].parentElement.parentElement;
                bunist.classList.add('display-nones');
                singleLog[i].disabled = 'disabled';
            } 
        });
    }

    const invoiceType = document.getElementById('invoice-type');
    const theSave1 = document.getElementById('save-1');
    const theSave2 = document.getElementById('save-2');
    var bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);

    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if(bankLog.includes('Huntington') || bankLog.includes('Woodforest')) {
            invoiceType.innerHTML = bankLog.split('Bank')[0];
        } else if(bankLog.includes('America')) {
            invoiceType.innerHTML = 'BankofAmerica';
        } else {
            invoiceType.innerHTML = bankLog.split('[')[0];
        }
        theSave1.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}  <br> 
            <span> ${(JSON.parse(localStorage.getItem('banklogs'))[0].balance)}</span>.
        `;

        theSave2.innerHTML = `
            Bank logs can be sent via <br> 
            <span>Email</span> or <span>SMS</span>.
        `;
    } else {
        invoiceType.innerHTML = 'Bank Logs';

        theSave1.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}  <br> 
            <span> ${(JSON.parse(localStorage.getItem('banklogs'))[0].balance)}</span>.
        `;
        theSave2.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[1].account)}  <br> 
            <span> ${(JSON.parse(localStorage.getItem('banklogs'))[1].balance)}</span>.
        `;
    }

    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '7vh';
            modalDialog.style.minWidth = '85vw';
        } 
    } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '5vh';
            modalDialog.style.minWidth = '92vw';
        } 
    } 
}


function updateCartTotal2() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '7vh';
            modalDialog.style.minWidth = '85vw';
        } 
    } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '5vh';
            modalDialog.style.minWidth = '92vw';
        } 
    } 
    
    document.getElementById('theno1').innerHTML = 'Cart: ' + JSON.parse(localStorage.getItem('banklogs')).length + ' , Total: $' + total.toLocaleString();

}
