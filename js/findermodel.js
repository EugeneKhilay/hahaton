/**
 * Created by Victor on 09.07.2016.
 */

var finderModel = function MyViewModel() {
    var self = this;

    self.filterWorkers = ko.observableArray([]);
    self.filterTags = ko.observableArray([]);
    self.allTags = ko.observableArray([]);
    self.allWorkers = ko.observableArray([]);

    self.init = function(){

        getSecureRequest(API_GET_TAGS,function(data){

            var groupedTags = {};
            self.allTags($.map(data.tags, function(tag) {
                if(groupedTags[tag.tagType]) {
                    groupedTags[tag.tagType].push(tag);
                }else{
                    groupedTags[tag.tagType] = [tag];
                }
                return new Tag(tag);
            }));

            var dataForTags = [];
            for(var key in groupedTags){
                    dataForTags.push({
                        id:key,
                        text:key,
                        children:$.map(groupedTags[key], function(tag){return {id:tag.id,text:tag.name};})
                    });

            }
            $('.tags-select').select2({data: dataForTags});

            getSecureRequest(API_GET_WORKERS,function(data){
                console.log(data.workers)
                self.allWorkers($.map(data.workers, function(worker) {return new Worker(worker);}));
                self.runFilter();
                $("#loading").fadeOut();
            });
        });


        $(".tags-select").select2({tags: true});
        $('.tags-select').on('change', function (evt) {
            self.runFilter();
        });

        $("#order-select").select2({
            minimumResultsForSearch: Infinity
        });
        $("#order-select").on('change', function (evt) {
            self.order();
        });
    };

    function sortByNameASC(lw, rw) {
        return lw.name().toUpperCase() == rw.name().toUpperCase() ? 0 : (lw.name().toUpperCase() < rw.name().toUpperCase() ? -1 : 1);
    }
    function sortByBirthday(lw, rw) {
        return (lw.birthday() && rw.birthday())
            ? ((lw.birthday().toUpperCase() == rw.birthday().toUpperCase()) ? 0 : (lw.birthday().toUpperCase() < rw.birthday().toUpperCase() ? -1 : 1))
            : 0;
    }

    function sortByCaste(lw, rw) {
        if(lw.caste().length > rw.caste().length){
            return -1
        }
        if(lw.caste().length < rw.caste().length){
            return 1
        }
        if(lw.caste().length == 0){
            return 0;
        }

        return lw.caste()[0].name().toUpperCase() == rw.caste()[0].name().toUpperCase() ? 0 : (lw.caste()[0].name().toUpperCase() < rw.caste()[0].name().toUpperCase() ? -1 : 1);
    }

    self.order = function(){
        var orderData = $('#order-select').select2('data');
        console.log("sort by " + orderData[0].id);
        switch(orderData[0].id){
            case "name":
                self.filterWorkers(self.filterWorkers().sort(sortByNameASC));
                break;
            case "caste":
                self.filterWorkers(self.filterWorkers().sort(sortByCaste));
                break;
            case "birthday":
                self.filterWorkers(self.filterWorkers().sort(sortByBirthday));
                break;
        }
    };

    self.runFilter = function(){
        var filteredData = $('.tags-select').select2('data');

        var results = ko.utils.arrayFilter(self.allWorkers(), function(worker) {
            var foundMatchedSkills = 0;
            for(var filterKey in filteredData){
                for(var tagKey in worker.tags()){
                    if(filteredData[filterKey].id == worker.tags()[tagKey].id()){
                        foundMatchedSkills++;
                    }
                }
            }
            return filteredData.length == foundMatchedSkills;
        });
        self.filterWorkers(results);
        self.order();
    };

    self.init();
};

$(function(){
    ko.applyBindings(finderModel);
});