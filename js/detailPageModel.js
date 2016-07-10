/**
 * Created by Victor on 10.07.2016.
 */

var detailPageModel = function MyViewModel() {
    var self = this;

    self.worker = ko.observable(null);

    self.init = function(){
        if(window.location.hash) {
            var id = parseInt(window.location.hash.substring(1));
            $.get(API_GET_WORKER + id,function(data){
                console.log(data.worker)
                self.worker(new Worker(data.worker));

                $('.folio-slider').slick({
                    autoplay: true,
                    autoplaySpeed: 5000
                });
            });
        }
    };
    self.init();
};

$(function(){
    ko.applyBindings(detailPageModel);
});
