var j = true;

const closeModal2 = document.getElementsByClassName('btn-see')[0];
const closeInvoice2 = document.getElementById('invoice-logo');

if(localStorage.getItem('banklogs')) {
    if((JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
        var elemj = document.getElementById('pablos');        
        
        var id = setInterval(frame, 1000);

        if(!localStorage.getItem('timez-set')) {
            var jo = new Date();
            var po = jo.getTime();
            var p1ko = po/1000;

            var p1knoDecimalo = Math.trunc(p1ko);

            localStorage.setItem('seconds-left', p1knoDecimalo);
            localStorage.setItem('timez-set', true);
        }
        let width = 600;

        function frame(){

            var j = new Date();
            var p = j.getTime();
            var p1k = p/1000;
            var p1knoDecimal = Math.trunc(p1k);
            var theTime = localStorage.getItem('seconds-left');
            var timeDifference = parseFloat(p1knoDecimal) - parseFloat(theTime);
            width = 600 - timeDifference;


            if(width < 10){
                setTimeout(() => {
                    window.location.assign('banklogs');
                }, 1000);
            } 


            else if(width <= 200) {
                elemj.classList.add("bg-danger");
                var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
            }

            
            else if(width <= 300) {
                var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;

                auth.onAuthStateChanged(user => {
                    if(user.isAnonymous) {
                        localStorage.setItem('anon-ink', true);
                        $('#discountModal').modal('show');
                        
                        closeInvoice2.style.display = 'block';
                        closeModal2.style.display = 'none';
                    }
                })
            }

            else if(width <= 400) {
                elemj.classList.add("bg-warning");
                var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
            }



            else {
                var minutes = Math.floor(width/60);
                var seconds = width - minutes * 60;
                if(seconds < 10){ seconds = '0'+seconds }
                elemj.style.width = (width/6) + "%";
                document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
            }
        }

    } 
} 

