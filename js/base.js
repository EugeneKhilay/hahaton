/**
 * Created by Victor on 10.07.2016.
 */

var API_ENDPOINT = "http://10.0.1.249/api/";
var API_GET_WORKERS = API_ENDPOINT + "workers";
var API_GET_WORKER = API_ENDPOINT + "worker/";
var API_GET_TAGS = API_ENDPOINT + "tags";

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
    this.birthday = ko.observable(data.birthday);
    this.phoneNumber = ko.observable(data.phoneNumber);
    this.closePersonPhoneNumber = ko.observable(data.closePersonPhoneNumber);
    this.startWorking = ko.observable(data.startWorking);
    this.homeEmail = ko.observable(data.homeEmail);
    this.skype = ko.observable(data.skype);

    this.address = ko.observable(data.address);
    this.hobby = ko.observable(data.hobby);
    this.loginToComputer = ko.observable(data.loginToComputer);
    this.whereIsSitting = ko.observable(data.whereIsSitting);
    this.workingEmail = ko.observable(data.workingEmail);


    if(data.images && data.images.length > 0){
        var avatar = data.images.find(function(image){return image.name == 'ava';});
        if(avatar) {
            this.ava(avatar.src);
        }
        this.images($.map(data.images, function(image) {return new Image(image);}));
        this.images(ko.utils.arrayFilter(this.images(),function(image){
            return image.name() != 'ava';
        }));
    }

    for(var type in TagType){
        var key = TagType[type].key;
        if(data[key]) {
            this[key] = ko.observableArray($.map(data[key], function(tag) {return new Tag(tag);}));
        }
    }
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
