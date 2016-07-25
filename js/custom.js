/**
 * Created by ekreative on 7/9/16.
 */
$(document).ready(function() {

    $('.tabs').length > 0 && $('.tabs').tabslet();

    var body = $("body");

    $('footer').length > 0 && $('footer').find('.scroll-btn').on('click', function() {
        body.animate({scrollTop:0}, '500');
    });

});

