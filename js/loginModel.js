/**
 * Created by Victor on 10.07.2016.
 */

var loginPageModel = function MyViewModel() {
    var self = this;

    self.message = ko.observable("");
    self.username = ko.observable("");
    self.password = ko.observable("");
    self.doLogin = function(){
        self.message("");
        if(self.username().trim().length == 0){
            self.message("Username is empty");
            return;
        };
        if(self.password().trim().length == 0){
            self.message("Password is empty");
            return;
        }

        $.ajax({
            method: "POST",
            dataType:'json',
            url:API_POST_LOGIN,
            data:JSON.stringify({
                login:{
                    password:self.password(),
                    username:self.username()
                }})
            }).done(function(data){
                setApiKey(data.user.apiKey);
                openPage(PAGE.HOME);
            }).fail(function(data){
                self.message("Wrong credentials");
            });
    };

};

$(function(){
    ko.applyBindings(loginPageModel);
});
