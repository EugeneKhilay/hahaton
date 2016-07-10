/**
 * Created by Victor on 10.07.2016.
 */

var detailPageModel = function MyViewModel() {
    var self = this;

    self.worker = ko.observable(null);

    self.init = function(){

        $.get(API_GET_WORKERS,function(data){
            console.log(data.workers)

        });

    };

    self.init();
};

$(function(){
    ko.applyBindings(detailPageModel);
});
