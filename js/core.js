/**
 * Created by Victor on 10.07.2016.
 */

var API_ENDPOINT = location.host == 'www.eworkers.space'
    ? "http://www.eworkers.space:8080/api/"
    : "http://localhost/eworkers/web/app_dev.php/api/";

var API_POST_LOGIN = API_ENDPOINT + "login";
var API_GET_WORKERS = API_ENDPOINT + "workers";
var API_GET_WORKER = API_ENDPOINT + "worker/";
var API_GET_TAGS = API_ENDPOINT + "tags";

var PAGE = {
    HOME:"index.html",
    LOGIN:"login.html",
    DETAIL_PAGE:"/"
};

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

    this.achievement = ko.observableArray(($.map(data.achievement, function(tag) {return new Tag(tag);})));

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

function setApiKey(apiKey){
    console.log("save " + apiKey);
    localStorage.setItem("X-API-Key",apiKey);
}
function getApiKey(){
    var apiKey = localStorage.getItem("X-API-Key");
    console.log("read " + apiKey);
    return apiKey;
}

function openPage(page){
    if(window.location.pathname.indexOf(page) < 0) {
        window.location.href = page;
        return true;
    }
    return false;
}

$(document).ready(function() {
    $.ajaxSetup({
        beforeSend: function(xhr) {
            var apiKey = getApiKey();
            if(apiKey) {
                xhr.setRequestHeader('X-API-Key',apiKey);
            }else{
                if(openPage(PAGE.LOGIN)) { // ok we are not on login page, let's go there
                    return false;// stop current request
                }
            }
        },
        statusCode: {
            403: function(error, callback){
                setApiKey(null);
                openPage(PAGE.LOGIN);
            }
        }
    });
});