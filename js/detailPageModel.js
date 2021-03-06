/**
 * Created by Victor on 10.07.2016.
 */

var detailPageModel = function MyViewModel() {
    var self = this;

    self.worker = ko.observable(null);
    self.formattedFields = ko.observableArray([]);

    self.init = function(){

        var id = getParameterByName('id');
        getSecureRequest(API_GET_WORKER + id,function(data){
            console.log(data.worker)
            self.worker(new Worker(data.worker));



            $('.folio-slider').slick({
                autoplay: true,
                autoplaySpeed: 5000
            });
            $("#loading").fadeOut();
        });

    };
    self.init();
};

$(function(){
    ko.applyBindings(detailPageModel);
});
