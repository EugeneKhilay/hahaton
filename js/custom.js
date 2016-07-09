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

    function MyViewModel() {
        this.people = [
            { name: 'Franklin', technology: 'html', caste: 'developer' },
            { name: 'Mario', technology: 'css', caste: 'developer' },
            { name: 'Eugene', technology: 'jquery', caste: 'developer' },
            { name: 'Sasha', technology: 'PS', caste: 'designer' },
            { name: 'Alina', technology: 'PS', caste: 'designer' },
            { name: 'Pasha', technology: 'PS', caste: 'designer' },
            { name: 'Larisa', technology: '?', caste: 'manager' },
            { name: 'Ianna', technology: '?', caste: 'manager' }
        ]
    }
    ko.applyBindings(new MyViewModel());
});

