/**
 * Created by Victor on 09.07.2016.
 */
var API_ENDPOINT = "http://10.0.1.249/api/";
var API_GET_WORKERS = API_ENDPOINT + "workers";
var API_GET_TAGS = API_ENDPOINT + "tags";

var finderModel = function MyViewModel() {
    var self = this;

    self.filterWorkers = ko.observableArray([]);
    self.filterTags = ko.observableArray([]);
    self.allTags = ko.observableArray([]);
    self.allWorkers = ko.observableArray([]);

    self.init = function(){
        $.get(API_GET_TAGS,function(data){
            self.allWorkers(data.workers);
        });
        $.get(API_GET_WORKERS,function(data){
            self.allTags(data.tags);
        });
    };

    self.init();
};

$(function(){
    ko.applyBindings(finderModel);
});