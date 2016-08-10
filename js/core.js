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
    TECH:   "technology",
    LANG:   "language",
    CASTE:  "caste",
    ACHIV:    "achievement"
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
    var that = this;
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
        this.images($.map(data.images, function(image) {
            var anImage = new Image(image);
            (anImage.name() == 'ava') && that.ava(anImage.src());
            return anImage;
        }));
        this.images(ko.utils.arrayFilter(this.images(),function(image){
            return image.name() != 'ava';
        }));
    }

    this.caste = ko.observable("");
    this.languages = ko.observableArray([]);
    this.achievements = ko.observableArray([]);

    this.tags = ko.observableArray($.map(data.tags, function(tag) {
        var aTag = new Tag(tag);
        switch(aTag.type()){
            case TagType.ACHIV : that.achievements().push(aTag); break;
            case TagType.CASTE : that.caste(aTag.name()); break;
            case TagType.LANG : that.languages().push(aTag); break;
        }

        return aTag;
    }));
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

function getSecureRequest(url,callback){
    var apiKey = getApiKey();
    if(!apiKey) {
        openPage(PAGE.LOGIN);
        return;
    }
    $.ajax({
        url:url,
        headers:{'X-API-Key':apiKey},
        type: "GET",
        cache: false,
        success: function(data, textStatus, xhr) {
            console.log(xhr.status);
            callback(data);
        },
        complete: function(xhr, textStatus) {
            switch(xhr.status){
                case 403:
                    setApiKey(null);
                    openPage(PAGE.LOGIN);
                    break;
            }
        }
    });
}