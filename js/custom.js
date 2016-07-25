/**
 * Created by ekreative on 7/9/16.
 */
$(document).ready(function() {
    
    $('.tabs').tabslet();
    var body = $("body");

    $('footer').find('.scroll-btn').on('click', function() {
        body.animate({scrollTop:0}, '500');
    });

    /**
     *  here is how to log in
     * $.post("http://eworkers.paul.ekreative.com/api/login",{login:{password:"",username:""}},function(data){
        console.log(data);
    });
     */
});

