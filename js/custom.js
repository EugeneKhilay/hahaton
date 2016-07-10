/**
 * Created by ekreative on 7/9/16.
 */
$(document).ready(function() {
    
    $('.tabs').tabslet();
    var body = $("body");

    $('footer').find('.scroll-btn').on('click', function() {
        body.animate({scrollTop:0}, '500');
    });
});

