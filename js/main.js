(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        // toggle dropdown menu
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
        
        // get quote
        $(document).on("click" , '#btn_get_quote' , function(event) 
        {
            event.preventDefault();
           
            console.log('submitting quote...');
            
            disableGetQuote();
            
            $.ajax({
                data: $('#frm_get_quote').serialize(),
                url: '../api/emailGetQuote.php',
                type: 'post',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    enableGetQuote();
                    
                    if (data.status == 'success') {
                        alert('Message sent! \r\n\r\nThank you for your message. We will respond to your message as soon as possible.');
                        
                        $('#name').val('');
                        $('#mobile').val('');
                        $('#service_type').val('');
                        $('#comment').val('');
                    } else {
                        var errors = 'Errors with sending message: \r\n\r\n';
                        
                        data.errors.forEach(function (value, i) {
                            errors += value + '\r\n';
                        });
                        
                        alert(errors);
                    }
                },
                error: function (request, status, error) {
                    enableGetQuote();
                    
                    alert('Error sending message! ' + request.responseText + ' ' + error);
                }
            });
        });
        
        function disableGetQuote() {
            $('#btn_get_quote').prop('disabled', true);
            $("#div_get_quote").css("visibility", "hidden");
            $("#div_get_quote").css("display", "none");
            $("#div_submitting_quote").css("visibility", "visible");
            $("#div_submitting_quote").css("display", "block");
        }
        
        function enableGetQuote() {
            $('#btn_get_quote').prop('disabled', false);
            $("#div_get_quote").css("visibility", "visible");
            $("#div_get_quote").css("display", "block");
            $("#div_submitting_quote").css("visibility", "hidden");
            $("#div_submitting_quote").css("display", "none");
        }
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

