/**
 * Created by ekreative on 7/9/16.
 */
$(document).ready(function() {
    $(".tags-select").select2({
        tags: true
    });
    $('.tags-select').on('change', function (evt) {
        console.log($(".js-example-tags").val());
    });
    $(".single-select").select2();

});

