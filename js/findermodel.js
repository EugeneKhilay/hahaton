/**
 * Created by Victor on 09.07.2016.
 */
var API_ENDPOINT = "http://10.0.1.249/api/";
var API_GET_WORKERS = API_ENDPOINT + "workers";
var API_GET_TAGS = API_ENDPOINT + "tags";
var URL_NO_AVATAR = "no avatar";

var finderModel = function MyViewModel() {
    var self = this;

    var TagType = {
        TECHNOLOGY: {
            text:"Technologies",
            key:"technology"
        },
        LANGUAGE:{
            text:"Languages",
            key:"language"
        },
        CASTE:{
            text:"Castes",
            key:"caste"
        }
    };
    var Tag = function(data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.title = ko.observable(data.title);
        this.description = ko.observable(data.name);
        this.type = ko.observable(data.tagType);
        this.image = ko.observable(null);
        if(data.image) {
            this.image = ko.observable(data.image.src);
        }
    };

    var Image = function(data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.src = ko.observable(data.src);
    };

    var Worker = function(data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.title = ko.observable(data.title);
        this.images = ko.observableArray(null);
        this.ava = ko.observable(null);
        if(data.images && data.images.length > 0){
            this.ava(data.images[0].src);
            this.images($.map(data.images, function(image) {return new Image(image);}));
        }

        for(var type in TagType){
            var key = TagType[type].key;
            if(data[key]) {
                this[key] = ko.observableArray($.map(data[key], function(tag) {return new Tag(tag);}));
            }
        }
    };

    self.filterWorkers = ko.observableArray([]);
    self.filterTags = ko.observableArray([]);
    self.allTags = ko.observableArray([]);
    self.allWorkers = ko.observableArray([]);

    self.init = function(){
        $.get(API_GET_TAGS,function(data){
            console.log(data.tags)

            var groupedTags = {};
            self.allTags($.map(data.tags, function(tag) {
                for(var type in TagType){
                    var key = TagType[type].key;
                    if(tag.tagType != key){
                        continue;
                    }
                    if(groupedTags[key]) {
                        groupedTags[key].push(tag);
                    }else{
                        groupedTags[key] = [tag];
                    }
                }
                return new Tag(tag);
            }));

            var dataForTags = [];
            for(var type in TagType){
                var key = TagType[type].key;
                if(groupedTags[key]) {
                    dataForTags.push({
                        id:key,
                        text:TagType[type].text,
                        children:$.map(groupedTags[key], function(tag){return {id:tag.id,text:tag.name};})
                    });
                }
            }
            $('.tags-select').select2({data: dataForTags});
        });
        $.get(API_GET_WORKERS,function(data){
            console.log(data.workers)
            self.allWorkers($.map(data.workers, function(worker) {return new Worker(worker);}));
            self.runFilter();
        });

        $(".tags-select").select2({tags: true});
        $('.tags-select').on('change', function (evt) {
            self.runFilter();
        });
    };

    self.runFilter = function(){
        var filteredData = $('.tags-select').select2('data');

        var results = ko.utils.arrayFilter(self.allWorkers(), function(worker) {
            for(filterKey in filteredData){
                for(var typeKey in TagType){
                    if(worker[TagType[typeKey].key]){
                        var workerTags = worker[TagType[typeKey].key];
                        for(var tagKey in workerTags()){
                            if(filteredData[filterKey].id == workerTags()[tagKey].id()){
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        });

        self.filterWorkers(results);
    };

    self.init();
};

$(function(){
    ko.applyBindings(finderModel);
});