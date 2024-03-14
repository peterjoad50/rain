var firebaseConfig = {
    apiKey: "AIzaSyDMyCaKL89Z4Gq8tKOCf0zPikW4dsbNB8c",
	authDomain: "darkweb-ink.firebaseapp.com",
	projectId: "darkweb-ink",
	storageBucket: "darkweb-ink.appspot.com",
	messagingSenderId: "388288804218",
	appId: "1:388288804218:web:b2cc83de3104492f27d2c3",
	measurementId: "G-5XRV3CJBNX"
};
firebase.initializeApp(firebaseConfig);
var theWebsite = 'https://www.darkweb.ink/invoice';



const logoHolder = document.getElementById("logo");
const vpnHolder = document.getElementById("vpn-img");
const jinaHolder = document.getElementById("jinaHolder");

const jinaHolder3 = document.getElementById('jinaHolder3');
const jinaHolder2 = document.getElementById('jinaHolder2');

const theId = document.getElementById('the-id');

const theDate = document.getElementById('the-date');
const labelDate = document.getElementById('label-date');


const mailField = document.getElementById('inputLife');
const signUp = document.getElementById('email-phone');

const theFlag7 = document.getElementById('the-flag7');

const phoneNumberField = document.getElementById('inputLife');
const codeField = document.getElementById('code');
const signInWithPhoneButton = document.getElementById('signInWithPhone');

const showToth = document.getElementById('showtoasts');
const showLink = document.getElementById('showlink');

const madrid = document.getElementById('madrid');

const heySave1 = document.getElementById('save-1');
const heySave2 = document.getElementById('save-2');

const closeModal = document.getElementsByClassName('btn-see')[0];

const verClose = document.getElementById('ver-close');

const wouldPa = document.getElementById('would');
const wildPa = document.getElementById('wild');

const bitcoinCheckz = document.getElementById('btc-check');
const bitcoinImg = document.getElementById('bit-coin');

const verifyH4 = document.getElementById('verify-h4');
const email2 = document.getElementById('email-2');
const verCheck = document.getElementById('ver-check');

const auth = firebase.auth();


auth.onAuthStateChanged(user => {
	if(!user) {
		if(!auth.isSignInWithEmailLink(window.location.href)) {
			window.location.assign('home');
		}
	}

	if(platform.manufacturer !== null) {
		var theDevice = `${platform.manufacturer} ${platform.product}, ${platform.os}`;
	} else {
		var  theDevice = `${platform.os} Device`;
	}

	if(user.email) {
		var themail = user.email;
		var theaddress = themail.substring(0, themail.indexOf('@'));
		if (user.displayName) { theaddress = user.displayName } 
		if (user.phoneNumber) {
			var thePhoneNo = user.phoneNumber;

			wouldPa.innerHTML = `
				Bank logs will be sent to <br>
				<span>${themail}</span>,
			`;
			wildPa.innerHTML = `
				& via SMS to: <span>${thePhoneNo}</span>.
			`;

			showLink.setAttribute('data-bs-target', '#emailModal');
		} else {
			wouldPa.innerHTML = `
				Bank logs will be sent to <br>
				<span>${themail}</span> 
			`;

			phoneShow();
		}

		wildPa.innerHTML = `
			with a cashout guide.
		`;

		verCheck.addEventListener('click', sendEmail);
		email2.innerHTML = ` <span id="mail-span"> ${user.email} </span> `;
		verifyH4.innerHTML = theaddress;
	} else	if (user.phoneNumber) {
		var thePhoneNo = user.phoneNumber;

		showLink.classList.add('green');

		wouldPa.innerHTML = `
			Bank logs will be sent to <br>
			<span id="yourEmail">${thePhoneNo}</span> 
		`;

		wildPa.innerHTML = `
			with a cashout guide.
		`;

		emailShow();
	} else if(user.isAnonymous) {
		wouldPa.innerHTML = `
			Bank log files will be <br>
			<span>downloaded</span> on this: <br>
		`;
		wildPa.innerHTML = `
			<span>${theDevice}</span>
		`;
	}

	showLink.addEventListener('click', () => {
		closeModal.removeAttribute('data-bs-dismiss');
		closeModal.setAttribute('data-bs-toggle', 'modal');
		closeModal.setAttribute('data-bs-target', '#profileModal');

		verClose.removeAttribute('data-bs-dismiss');
		verClose.setAttribute('data-bs-toggle', 'modal');
		verClose.setAttribute('data-bs-target', '#profileModal');
	});

	if(user.uid){
		theId.innerHTML = user.uid;
		let theDatez2 = new Date(user.metadata.b * 1);
		let theDatez = theDatez2.toString();
		let therealDate = theDatez.substring(theDatez.indexOf('(') + 1).replace(' Time)', '');
		theDate.innerHTML = theDatez.replace('2023', '').split('(')[0];
		labelDate.innerHTML = `Time ID: (${therealDate})`;
	}
	
});


function sendEmail() {
	auth.currentUser.sendEmailVerification();
	var shortCutFunction = 'success';
	var msg = `
		A verification link has been sent to:   <hr class="to-hr hr15-bot">
		${auth.currentUser.email} <hr class="hr10-nil">
		Check the spam / junk folder.  <hr class="hr3-nil">
	`;
	toastr.options = {
		closeButton: true, debug: false, newestOnTop: true, progressBar: true, 
		positionClass: 'toast-top-full-width', preventDuplicates: true,
		onclick: null, timeOut: 6000
	};
	var $toast = toastr[shortCutFunction](msg);
	$toastlast = $toast;
}

function phoneShow() {
	heySave1.innerHTML = ` Bank logs can be sent <br> via <span>SMS</span>. `;
	heySave2.innerHTML = ` As a dynamic link that  <br> expires in <span>7 hours</span>. `;

	fetch('https://ipapi.co/json/')
	.then(function(response) {return response.json()})
	.then(function(data) {
		phoneNumberField.value = data.country_calling_code;
		phoneNumberField.setAttribute('type', 'tel');
		phoneNumberField.style.textAlign = 'left';
		theFlag7.style.display = 'flex';
		phoneNumberField.setAttribute('pattern', '[+]{1}[0-9]{11,14}');
	});
}

function emailShow() {
	heySave1.innerHTML = ` Bank logs can be sent <br> via <span id="mail-span">Email</span>. `;
	heySave2.innerHTML = ` To the <span id="mail-span">spam / junk</span> folder <br> of your mailbox. `;

	theFlag7.style.display = 'none';
	mailField.setAttribute('type', 'email');
	mailField.value = '';
	phoneNumberField.style.textAlign = 'center';
	mailField.setAttribute('placeholder', 'Enter your Email...');
}


window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
	'size': 'invisible'
});

recaptchaVerifier.render().then(widgetId => {
  window.recaptchaWidgetId = widgetId;
});


const signUpFunction = () => {
	event.preventDefault();
	const email = mailField.value;
	
	const phoneNumber = phoneNumberField.value;
	const appVerifier = window.recaptchaVerifier;

	const signInWithPhone = sentCodeId => {
		const code = codeField.value;
		const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
		const theUser = auth.currentUser;
	
		theUser.linkWithCredential(credential)
			.then(() => {
				theUser.updateProfile({
					phoneNumber: theUser.providerData[0].phoneNumber
				}).then(() => {
					window.location.reload();
				});
			})
			.catch(error => {
				var shortCutFunction = 'success';
				var msg = `${error.message}`;
				toastr.options =  {
					closeButton: true, debug: false, newestOnTop: true, progressBar: true,
					positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
				};
				var $toast = toastr[shortCutFunction](msg);
				$toastlast = $toast;
			})
	}

	var actionCodeSettings = {
		url: `${theWebsite}#${mailField.value}`,
		handleCodeInApp: true,
	};

	if(email.includes('@')) {
		if(email.includes('@gmail.com') || email.includes('@GMAIL.COM')) {
			const googleProvider = new firebase.auth.GoogleAuthProvider;
			const theUser = auth.currentUser;
			theUser.linkWithPopup(googleProvider).then(() => {
				auth.currentUser.sendEmailVerification();
				theUser.updateProfile({
					displayName: theUser.providerData[0].displayName, 
					photoURL: theUser.providerData[0].photoURL
				}).then(() => {
					window.location.reload();
				});
			})
		} else if(email.includes('@yahoo.com') || email.includes('@YAHOO.COM')) {
			const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
			const theUser = auth.currentUser;
			theUser.linkWithPopup(yahooProvider).then(() => {
				auth.currentUser.sendEmailVerification();
				theUser.updateProfile({
					displayName: theUser.providerData[0].displayName, 
					photoURL: theUser.providerData[0].photoURL
				}).then(() => {
					window.location.reload();
				});
			})
		} else {
			auth.sendSignInLinkToEmail(email, actionCodeSettings)
			.then(() => {
				var shortCutFunction = 'success';
				var msg = `
					A verification link has been sent to:   <hr class="to-hr hr15-bot">
					${email} <hr class="hr10-nil">
					Check the spam / junk folder.  <hr class="hr3-nil">
				`;
				toastr.options =  {
					closeButton: true, debug: false, newestOnTop: true, progressBar: true,
					positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
				};
				var $toast = toastr[shortCutFunction](msg);
				$toastlast = $toast;
			});
		}
	} else if(email.includes('+') && (email.length >= 10)) { 

		auth.signInWithPhoneNumber(phoneNumber, appVerifier)
		.then(confirmationResult => {
			const sentCodeId = confirmationResult.verificationId;
			signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));

			var shortCutFunction = 'success';
			var msg = `
				Verification code sent to your phone:  <hr class="to-hr hr15-bot">
				${phoneNumber}. <hr class="hr10-nil">
			`;

			toastr.options =  {
				closeButton: true, debug: false, newestOnTop: true, progressBar: true,
				positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
			};
			var $toast = toastr[shortCutFunction](msg);
			$toastlast = $toast;

			$('#verifyModal').modal('show');
			$('#discountModal').modal('hide');
		})

	} else {
		var shortCutFunction = 'success';
		if(auth.currentUser.email) {
			var msg = `
				Bank log files can be sent via SMS.  <hr class="to-hr hr15-bot">
				Enter a valid phone number.          <hr class=" hr10-nil">
			`;
		} else if(auth.currentUser.phoneNumber) {
			var msg = `
				Bank logs can be sent via email.     <hr class="to-hr hr15-bot">
				Enter a valid email address.         <hr class=" hr10-nil">
			`;
		} else if(auth.currentUser.isAnonymous) {
			var msg = `
				Enter a valid email / phone number.   <hr class="to-hr hr15-bot">
				Bank logs can be sent via email / SMS      <hr class=" hr10-nil">
			`;
		}

		toastr.options =  {
			closeButton: true, debug: false, newestOnTop: true, progressBar: true,
			positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
		};
		var $toast = toastr[shortCutFunction](msg);
		$toastlast = $toast;
	}
}
signUp.addEventListener('click', signUpFunction);
document.getElementById('the-form').addEventListener('submit', signUpFunction);

mailField.addEventListener('keyup', checkBra);
function checkBra() {
	if(mailField !== null) {
		if(mailField.value.match(/^([0-9])/)) {
			phoneNumberField.setAttribute('type', 'tel');
			phoneNumberField.style.textAlign = 'left';
			theFlag7.style.display = 'flex';
			phoneNumberField.setAttribute('pattern', '[+]{1}[0-9]{11,14}');
			
			fetch('https://ipapi.co/json/')
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				phoneNumberField.value = data.country_calling_code;
			});
		} else if(mailField.value.match(/^([A-Za-z])/)) {
			theFlag7.style.display = 'none';

			mailField.setAttribute('type', 'email');
			mailField.style.textTransform = 'lowercase';
		}
	}
} 

mailField.addEventListener('input', againBro);
function againBro() {
    if (!this.value) {
        mailField.setAttribute('type', 'text');
		theFlag7.style.display = 'flex';
    }
}

document.getElementById('the-life').addEventListener('click', focusOn);
function focusOn() {
	document.getElementById('inputLife').focus();
}

mailField.addEventListener('focus', focusBro);
function focusBro() {
	mailField.style.textAlign = 'left';
	mailField.removeAttribute('placeholder');
}

if (auth.isSignInWithEmailLink(window.location.href)) {
    var email = '';

	var theLink = window.location.href;
	var noTimes = theLink.split('#').length-1;

	if(noTimes == 1) {
		theLink =  theLink.substring(theLink.indexOf("#") + 1);
		email = theLink;
	}
	
	var credential = new firebase.auth.EmailAuthProvider.credentialWithLink(email, window.location.href);

	auth.onAuthStateChanged(user1 => {
		if(!user1) {
			auth.signInWithEmailLink(email, window.location.href)
			.then(() => {
				auth.currentUser.sendEmailVerification();
				var shortCutFunction = 'success';
				var msg = `
					Login Success: <br> <hr class="to-hr hr15-bot">  
					${email}                             <hr class="hr10-nil">
				`;
				toastr.options =  {
					closeButton: true, debug: false, newestOnTop: true, progressBar: true,
					positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null, 
					timeOut: 1500
				};
				var $toast = toastr[shortCutFunction](msg);
				$toastlast = $toast;
			})
			.then(() => {
				setTimeout(() => {
					if(window.location.href.includes('@')) {
						window.location.assign('home');
					}
				}, 1500);
			})
			.catch((error) => {
				var shortCutFunction = 'success';
				var msg = `${error.message}`;
				toastr.options =  {
					closeButton: true, debug: false, newestOnTop: true, progressBar: true,
					positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
				};
				var $toast = toastr[shortCutFunction](msg);
				$toastlast = $toast;
			});
		} else if(user1) {
			auth.currentUser.linkWithCredential(credential)
			.then(() => {
				auth.currentUser.sendEmailVerification();
				var shortCutFunction = 'success';
				var msg = `
					Login Success: <br> <hr class="to-hr hr15-bot">  
					${email}                             <hr class="hr10-nil">
				`;
				toastr.options =  {
					closeButton: true, debug: false, newestOnTop: true, progressBar: true,
					positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null, 
					timeOut: 1500
				};
				var $toast = toastr[shortCutFunction](msg);
				$toastlast = $toast;
			})
			.then(() => {
				setTimeout(() => {
					if(window.location.href.includes('@')) {
						window.location.assign('home');
					}
				}, 1500);
			})
			.catch((error) => {
				var shortCutFunction = 'success';
				var msg = `${error.message}`;
				toastr.options =  {
					closeButton: true, debug: false, newestOnTop: true, progressBar: true,
					positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null
				};
				var $toast = toastr[shortCutFunction](msg);
				$toastlast = $toast;
			});
		} 
	});
}



fetch('https://ipapi.co/json/')
.then(function(response) {
	return response.json();
})
.then(function(data) {

	var countyCode = data.country_code;
	var newCode = countyCode.toLowerCase();

	document.getElementById('the-flag7').src = `https://flagcdn.com/144x108/${newCode}.png`;

	document.getElementById('label-ip').innerHTML = `
		IP Address: (<span>${data.ip}</span>)
	`;
	document.getElementById('the-ip').innerHTML = ` ${data.region},  ${data.org}.`;
});



document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			event.preventDefault();
		}   
	});
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 1
setInterval(drawClock, 1000);

function drawClock() {
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * 2.5);
	grad.addColorStop(0, '#121d33');
	grad.addColorStop(0.5, 'rgba(0,0,0,0)');
	grad.addColorStop(1, '#121d33');
	ctx.strokeStyle = grad;
	ctx.lineWidth = radius * 0;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = '#121d33';
	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;
	var num;
	ctx.font = radius * 0.33 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.87);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * 0.87);
		ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	//hour
	hour = hour % 12;
	hour = (hour * Math.PI / 6) +
		(minute * Math.PI / (6 * 60)) +
		(second * Math.PI / (360 * 60));
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	//minute
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	// second
	second = (second * Math.PI / 30);
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}

if(!window.location.href.includes('5502')) {
	function disableCtrlKeyCombination(e){
		var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'i', 'v', 'j' , 'w', 'i');
		var key;
		var isCtrl;
		if(window.event){
			key = window.event.keyCode;
			if(window.event.ctrlKey) {
				isCtrl = true;
			} else {
				isCtrl = false;
			}
		} else {
			key = e.which; 
			if(e.ctrlKey) {
				isCtrl = true;
			}
			else {
				isCtrl = false;
			}
		}
		//if ctrl is pressed check if other key is in forbidenKeys array
		if(isCtrl) {
			for(i=0; i<forbiddenKeys.length; i++) {
				if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
					alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
					return false;
				}
			}
		}
		return true;
	}
}









var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
var radius2 = canvas2.height / 2;
ctx2.translate(radius2, radius2);
radius2 = radius2 * 1
setInterval(drawClock2, 1000);

function drawClock2() {
	drawFace2(ctx2, radius2);
	drawNumbers2(ctx2, radius2);
	drawTime2(ctx2, radius2);
}

function drawFace2(ctx2, radius2) {
	var grad2;
	ctx2.beginPath();
	ctx2.arc(0, 0, radius2, 0, 2 * Math.PI);
	ctx2.fillStyle = 'white';
	ctx2.fill();
	grad2 = ctx2.createRadialGradient(0, 0, radius2 * 0.05, 0, 0, radius2 * 2.5);
	grad2.addColorStop(0, '#121d33');
	grad2.addColorStop(0.5, 'rgba(0,0,0,0)');
	grad2.addColorStop(1, '#121d33');
	ctx2.strokeStyle = grad2;
	ctx2.lineWidth = radius2 * 0;
	ctx2.stroke();
	ctx2.beginPath();
	ctx2.arc(0, 0, radius2 * 0.1, 0, 2 * Math.PI);
	ctx2.fillStyle = '#121d33';
	ctx2.fill();
}

function drawNumbers2(ctx2, radius2) {
	var ang2;
	var num2;
	ctx2.font = radius2 * 0.33 + "px arial";
	ctx2.textBaseline = "middle";
	ctx2.textAlign = "center";
	for (num2 = 1; num2 < 13; num2++) {
		ang2 = num2 * Math.PI / 6;
		ctx2.rotate(ang2);
		ctx2.translate(0, -radius2 * 0.87);
		ctx2.rotate(-ang2);
		ctx2.fillText(num2.toString(), 0, 0);
		ctx2.rotate(ang2);
		ctx2.translate(0, radius2 * 0.87);
		ctx2.rotate(-ang2);
	}
}

function drawTime2(ctx2, radius2) {
	var now2 = new Date();
	var hour2 = now2.getHours();
	var minute2 = now2.getMinutes();
	var second2 = now2.getSeconds();
	//hour
	hour2 = hour2 % 12;
	hour2 = (hour2 * Math.PI / 6) +
		(minute2 * Math.PI / (6 * 60)) +
		(second2 * Math.PI / (360 * 60));
	drawHand2(ctx2, hour2, radius2 * 0.5, radius2 * 0.07);
	//minute
	minute2 = (minute2 * Math.PI / 30) + (second2 * Math.PI / (30 * 60));
	drawHand2(ctx2, minute2, radius2 * 0.8, radius2 * 0.07);
	// second
	second2 = (second2 * Math.PI / 30);
	drawHand2(ctx2, second2, radius2 * 0.9, radius2 * 0.02);
}

function drawHand2(ctx, pos, length, width) {
	ctx2.beginPath();
	ctx2.lineWidth = width;
	ctx2.lineCap = "round";
	ctx2.moveTo(0, 0);
	ctx2.rotate(pos);
	ctx2.lineTo(0, -length);
	ctx2.stroke();
	ctx2.rotate(-pos);
}