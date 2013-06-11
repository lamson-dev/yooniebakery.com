/* javascript for yoonie bakery site */

$(document).ready(function() {

    // set up lightboxes
//    $('a.lbox, a.cbox').lightBox();
    $('#home_slider').bxCarousel({
        display_num: 4,
        move: 1,
        margin: 20
    });
    $('input, textarea').bind('focus', function(){
        $(this).addClass('focused');
    });
    $('input, textarea').bind('blur', function(){
        $(this).removeClass('focused');
    });


});

