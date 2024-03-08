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


    $window.on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            $(".scroll-to-top").fadeIn(400);
        } else {
            $(".scroll-to-top").fadeOut(400);
        }
    });
    $(".scroll-to-top").on('click', function(event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });
    var pageSection = $(".parallax,.bg-img");
    pageSection.each(function(indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    $(document).ready(function() {

        $('#services-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            dots: true,
            nav: false,
            smartSpeed: 500,
            autoplay: true,
            autoplayTimeout: 300,
            autoplayHoverPause: false,
            stagePadding: 0,
            slideTransition: 'linear',
            autoplayTimeout: 5000,
            autoplaySpeed: 5000,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 2.7,
                    margin: 10
                },
                768: {
                    items: 3,
                    margin: 30
                },
                992: {
                    items: 4,
                    margin: 30
                },
                1200: {
                    items: 7,
                    margin: 20
                }
            }
        });

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

}
)(jQuery);

$(document).ready(function() {
    "use strict";
    $('#example').dataTable();    
});



! function(g) {
    "use strict";
    var c = g(window);
    c.on("load", function() {
        g(".portfolio-gallery,.portfolio-gallery-isotope").lightGallery(), g(".portfolio-link").on("click", e => {
            e.stopPropagation()
        })
    })
}(jQuery);
