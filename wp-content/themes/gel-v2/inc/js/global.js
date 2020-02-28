var BASE_URL = 'https://www.gelielts.com/';

(function ($) {
    $(document).ready(function () {
        $(".search-block .search-toggle").on('click', function () {
            $(".searchform").toggleClass('active');
        })
        $("#partner-slider").slick({
            slidesToShow: 6,
            slidesToScroll: 6,
            autoplay: true,
            autoplaySpeed: 5000,
            focusOnSelect: true,
            dots: true,
            infinite: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1030,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 810,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $('.product').on('click', '.qty-plus', function (e) {
            $input = $(this).prev('input.qty');
            var val = parseInt($input.val());
            $input.val(val + 1).change();
        });

        $('.product').on('click', '.qty-minus',
                function (e) {
                    $input = $(this).next('input.qty');
                    var val = parseInt($input.val());
                    if (val > 0) {
                        $input.val(val - 1).change();
                    }
                });
        $(".list-switcher .switcher").on("click", function (e) {
            e.preventDefault();

            var theid = $(this).attr("id");
            if ($(this).hasClass("active")) {
                // if currently clicked button has the active class
                // then we do nothing!
                return false;
            } else {
                // otherwise we are clicking on the inactive button
                // and in the process of switching views!

                if (theid == "gridview") {
                    $(this).addClass("active");
                    $("#listview").removeClass("active");
                    // remove the list class and change to grid
                    $("#blog-list-view").removeClass("list");
                    $("#blog-list-view").addClass("grid");
                } else if (theid == "listview") {
                    $(this).addClass("active");
                    $("#gridview").removeClass("active");
                    // remove the grid view and change to list
                    $("#blog-list-view").removeClass("grid")
                    $("#blog-list-view").addClass("list");
                }
            }

        });


    });

    // Navigation menu stuff
    $(function () {
        var toggleNavBtns = $('#fullscreen-nav .close, .navbar-toggle');

        $(toggleNavBtns).click(function () {
            $('body').toggleClass('show-nav');
            $('#fullscreen-nav').collapse('toggle');
            // $(this).toggleClass('clicked'); // Triggers animation
        });
	
        $('#fullscreen-nav').on('click', '.menu-item-has-children', function() {
            $(this).find('.sub-menu').toggle();
        });

        $(document).keyup(function (e) {
            if (e.keyCode === 27) {
                $('#fullscreen-nav.collapse.in').collapse('hide');
            }
        });
    });

    $(function () {
       $(".whats-included a").click(function(e) {
           e.preventDefault();
           if ($(this).attr('href')) {
               $("#whats-included").hide();
               $($(this).attr('href')).collapse('show');
           }
           return false;
       });

       $(".buy-block-desc button").click(function (e) {
          $(this).closest('.buy-block').find('.buy-block-price').show();
           $(this).closest('.buy-block').find('.buy-block-desc').hide();
       });
	$('#garToggle').click(function(e) {
		e.preventDefault();
		$('#gar').toggle('slow');
	});
    });

})(jQuery);
