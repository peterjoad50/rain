let items = [];
var table1 = jQuery('#example1').DataTable();

var profileModal = document.getElementById('profileModal');
var modalDialog = profileModal.getElementsByClassName('modal-dialog')[0];


var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var d = new Date();
var n = month[d.getMonth()];
var y = d.getFullYear();
var m = d.getDate();

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


    for(var i = 0; i < items.length; i++) {

        var cartCol = document.createElement('div');
        cartCol.classList.add('alert','alert-warning','alert-dismissible');
        var cartColItems = document.getElementsByClassName('cart-alerts')[0];
        var cartColContents = `
        <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> 
        Pending Sale <strong>${items[i].account}</strong>, ${items[i].balance}
            <button type="button" class="btn-close" data-bs-dismiss="alert">&times;</button>
        `


        var cartRow = document.createElement('tr');
        var cartRow2 = document.createElement('li');
        cartRow.classList.add('table-warning');

        cartRow2.classList.add('total','bg-black');
        var cartItems =  document.getElementsByClassName('champez3')[0];

        var cartRowContents = `
            <td><img src=${items[i].image}></td>       
            <td>
                WAIT
                <i class="fas fa-spin fa-sync-alt spinner-bordez"></i>
                <hr id="hr-pend">
                <span>${(items[i].balance).replace('Balance: ','')}</span> 
            </td>
            <td id=${'name-on-table' + items.indexOf(items[i])} style="filter: blur(0px);"></td>  
            <td>${items[i].account}</td>
            <td>${(items[i].price).replace('Price: ', '')}</td>
            <td>${items[i].info1}</td>
            <td>${items[i].info2}</td>
            <td>${items[i].info3}</td>
            <td>${items[i].info4}</td>
            <td>${items[i].info5}</td>
            <td>${items[i].info6}</td>
            <td>${items[i].website}</td>
        `;
        cartRow.innerHTML = cartRowContents;

        cartCol.innerHTML = cartColContents;
        
        cartColItems.prepend(cartCol);

        cartItems.prepend(cartRow);

    }
} else {
    document.getElementById('cartlength').style.display = 'none';

    document.getElementById('thetot').setAttribute('data-bs-target', '#vpnModal');

    if (window.innerWidth > 1092) {
        modalDialog.style.top = '7vh';
        modalDialog.style.minWidth = '85vw';
    } 
}


document.getElementById('balance1').innerHTML = '$6,425';
document.getElementById('balance2').innerHTML = '$5,384';
document.getElementById('balance3').innerHTML = '$5,290';
document.getElementById('balance4').innerHTML = '$4,261';
document.getElementById('balance5').innerHTML = '$4,402';
document.getElementById('balance6').innerHTML = '$4,940';
document.getElementById('balance7').innerHTML = '$6,087';
document.getElementById('balance8').innerHTML = '$4,259';
document.getElementById('balance9').innerHTML = '$6,820';

document.getElementById('balance10').innerHTML = '$4,705';
document.getElementById('balance11').innerHTML = '$6,214';
document.getElementById('balance12').innerHTML = '$6,390';
document.getElementById('balance13').innerHTML = '$6,832';
document.getElementById('balance14').innerHTML = '$4,439';
document.getElementById('balance15').innerHTML = '$4,228';
document.getElementById('balance16').innerHTML = '$4,910';
document.getElementById('balance17').innerHTML = '$6,104';
document.getElementById('balance18').innerHTML = '$6,724';
document.getElementById('balance19').innerHTML = '$4,825';

document.getElementById('balance20').innerHTML = '$6,270';
document.getElementById('balance21').innerHTML = '$4,309';
document.getElementById('balance22').innerHTML = '$6,183';
document.getElementById('balance23').innerHTML = '$6,704';
document.getElementById('balance24').innerHTML = '$4,860';
document.getElementById('balance25').innerHTML = '$6,904';
document.getElementById('balance26').innerHTML = '$4,329';
document.getElementById('balance27').innerHTML = '$6,608';

var jobs = document.getElementsByClassName('prized');
for(j=0; j< jobs.length; j++) {
    var theJob = jobs[j];
    var thePrize = theJob.parentElement.children[1].children[2].innerText;
    
    var thePr = parseFloat((thePrize.replace("$", "").replace(",", "") / 57).toFixed(0)).toLocaleString();

    theJob.innerHTML = '$'+ thePr;
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
    updateCartTotal()
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

    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    document.getElementById('theno1').innerHTML = 'Cart: ' + JSON.parse(localStorage.getItem('banklogs')).length + ' , Total: $' + total.toLocaleString();

    const invoiceType = document.getElementById('invoice-type');
    const theSave1 = document.getElementById('save-1');
    const theSave2 = document.getElementById('save-2');
    var bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);
    
    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if(bankLog.includes('Huntington')) {
            document.getElementsByClassName('huntington')[0].style.display = 'block';
        } else if(bankLog.includes('America')) {
            document.getElementsByClassName('bankofamerica')[0].style.display = 'block';
        } else if(bankLog.includes('Chime')) {
            document.getElementsByClassName('chime')[0].style.display = 'block';
        } else if(bankLog.includes('Chase') || bankLog.includes('Truist')) {
            document.getElementsByClassName('achtransfer')[0].style.display = 'block';
        } else if(bankLog.includes('Citi')) {
            document.getElementsByClassName('wiretransfer')[0].style.display = 'block';
        } else if(bankLog.includes('Federal')) {
            document.getElementsByClassName('navyfederal')[0].style.display = 'block';
        } else if(bankLog.includes('P.N.C') || bankLog.includes('R.B.C')) {
            document.getElementsByClassName('coinbase')[0].style.display = 'block';
        } else if(bankLog.includes('Fargo')) {
            document.getElementsByClassName('wellsfargo')[0].style.display = 'block';
        } else if(bankLog.includes('Woodforest')) {
            document.getElementsByClassName('woodforest')[0].style.display = 'block';
        }
    } 



    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if(bankLog.includes('Huntington') || bankLog.includes('Woodforest')) {
            invoiceType.innerHTML = bankLog.split('Bank')[0];
        } else if(bankLog.includes('America')) {
            invoiceType.innerHTML = 'Bank America';
        } else {
            invoiceType.innerHTML = bankLog.split('[')[0];
        }
        theSave1.innerHTML = `
            ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}  <br> 
            <span> ${(JSON.parse(localStorage.getItem('banklogs'))[0].balance)}</span>.
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

    if(localStorage.getItem('timez-set')) {
        localStorage.removeItem('timez-set');
    }
}