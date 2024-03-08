(function($) {
    "use strict";
    var $window = $(window);
    $('#preloader').fadeOut('normall', function() {
        $(this).remove();
    });
    $window.on('scroll', function() {
        var scroll = $window.scrollTop();
        if (scroll <= 50) {
            $("header").removeClass("scrollHeader").addClass("fixedHeader");
        } else {
            $("header").removeClass("fixedHeader").addClass("scrollHeader");

        }
    });

    var pageSection = $(".parallax,.bg-img");
    pageSection.each(function(indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    $(document).ready(function() {

        $('#clients').owlCarousel({
			loop: true,
			nav: false,
			dots: false,
            smartSpeed: 500,
			autoplay: true,
			autoplayTimeout: 3000,
			responsiveClass: true,
			autoplayHoverPause: false,
            stagePadding: 0,
            slideTransition: 'linear',
            autoplayTimeout: 1300,
            autoplaySpeed: 1300,
			responsive: {
                0: {items: 6, margin: 15}, 
                768: {items: 10, margin: 15}, 
                992: {items: 12, margin: 20}, 
                1200: {items: 17, margin: 20},
			}
		});

    });

    var theC = document.getElementById('colors');
    var theLog = document.getElementById('cart-logo');


    var cxC = document.getElementById('check-now');
    var cxE = document.getElementById('code-email');

    var csImg = document.getElementsByClassName('logo-img')[0];

    if (window.innerWidth > 768) {
        theC.setAttribute('href', 'css/styles-8.css');
        theLog.setAttribute('src', 'img/logos/logo8.png');


        document.getElementById('nav1').setAttribute('href', 'img/logos/logo8.png');
        document.getElementById('nav2').setAttribute('href', 'img/logos/logo8.png');
        document.getElementById('nav3').setAttribute('href', 'img/logos/logo8.png');
        document.getElementById('nav4').setAttribute('href', 'img/logos/logo8.png');

        cxE.classList.remove('ver-btn');
        cxE.classList.add('phone-btn');

        cxC.classList.remove('ver-btn');
        cxC.classList.add('phone-btn');

        csImg.setAttribute('src', 'img/logos/logo8.png');

    } 

}
)(jQuery);

