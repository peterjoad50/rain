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

        var chart1 = new Chart(document.getElementById("chart1"), {
    		"type": "line",
    		"data": {
    			"labels": [
                    "B.O.A.", 
                    "Chase", 
                    "Chime", 
                    "Citi", 
                    "Huntington",
                    "N.F.C.U.",
                    "P.N.C.",
                    "R.B.C.",
                    "Truist",
                    "Wells Fargo",
                    "Woodforest"
                ],
    			"datasets": [{
    				"label": "Bank Logs",
    				"data": [
                        12, 
                        14, 
                        16,
                        14,
                        12,
                        11,
                        11,
                        10,
                        12, 
                        12,
                        10
                    ],
    				"borderColor": "rgb(255, 255, 255, 0.56)",
                    "backgroundColor":  "rgba(255, 255, 255, 0.1)", 
    			}]
    		},
    		"options": {}
    	});






        new Chart(document.getElementById("chart4"), {
    		"type": "bar",
    		"data": {
    			"labels": [
                    "B.O.A.", 
                    "Chase", 
                    "Chime", 
                    "Citi", 
                    "Huntington",
                    "N.F.C.U.",
                    "P.N.C.",
                    "R.B.C.",
                    "Truist",
                    "Wells Fargo",
                    "Woodforest"
                ],
    			"datasets": [{
    				"label": "Logs Available",
    				"data": [
                        12, 
                        14, 
                        16,
                        14,
                        12,
                        11,
                        11,
                        10,
                        12, 
                        12,
                        10
                    ],
    				"fill": false,
                    "backgroundColor": [
                        "rgba(3, 169, 245, 0.85)", 
                        "rgba(245, 222, 179, 0.85)",
                        "rgba(0, 115, 173, 0.85)",
                        "rgba(71, 88, 143, 0.85)", 
                        "rgba(250, 183, 2, 0.85)", 
                        "rgba(208, 173, 85, 0.85)", 
                        "rgba(73, 192, 208, 0.85)",
                        "rgba(3, 192, 208, 0.85)",
                        "rgba(22, 160, 134, 0.85)", 
                        "rgba(134, 188, 66, 0.85)", 
                        "rgba(100, 242, 72, 0.85)"
                    ],
                    "borderColor": [
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)",
                        "rgba(255, 255, 255, 0.42)"
                    ],
    				"borderWidth": 1
    			}]
    		},
    		"options": {
    			"scales": {
    				"yAxes": [{
    					"ticks": {
    						"beginAtZero": true
    					}
    				}]
    			}
    		}
    	});

        $('.countup').counterUp({
            delay: 30,
            time: 7000
        });

    });
}
)(jQuery);


