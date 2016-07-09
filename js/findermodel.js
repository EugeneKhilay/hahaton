/**
 * Created by Victor on 09.07.2016.
 */
var API_ENDPOINT = "http://10.0.1.249/api/";
var API_GET_WORKERS = API_ENDPOINT + "workers";
var API_GET_TAGS = API_ENDPOINT + "tags";

var finderModel = function MyViewModel() {
    var self = this;

    var TagType = {
        TECHNOLOGY: "technology",
        LANGUAGE:"language",
        CASTE:"caste"
    };
    var Tag = function(data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.description = ko.observable(data.name);
        this.type = ko.observable(data.tagType);
        this.image = ko.observable(null);
        if(data.image) {
            this.image = ko.observable(data.image.src);
        }
    };

    var Worker = function(data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.technology = ko.observableArray([]);
        this.caste = ko.observableArray([]);
        this.language = ko.observableArray([]);
        if(data.technology) {
            this.technology($.map(data.technology, function(tag) {return new Tag(tag);}))
        }
        if(data.language) {
            this.language($.map(data.language, function(tag) {return new Tag(tag);}))
        }
        if(data.caste){
            this.caste($.map(data.caste, function(tag) {return new Tag(tag);}))
        }
    };

    self.filterWorkers = ko.observableArray([]);
    self.filterTags = ko.observableArray([]);
    self.allTags = ko.observableArray([]);
    self.allWorkers = ko.observableArray([]);

    self.init = function(){
        $.get(API_GET_TAGS,function(data){
            console.log(data.tags)
            self.allTags($.map(data.tags, function(tag) {return new Tag(tag);}));
        });
        $.get(API_GET_WORKERS,function(data){
            console.log(data.workers)
            self.allWorkers($.map(data.workers, function(worker) {return new Worker(worker);}));
        });
    };

    self.init();
};

$(function(){
    ko.applyBindings(finderModel);
});