/**
 * Created by Victor on 10.07.2016.
 */

var loginPageModel = function MyViewModel() {
    var self = this;

    self.message = ko.observable("");
    self.username = ko.observable("victor.k");
    self.password = ko.observable("551234a");
    self.doLogin = function(){
        self.message("");
        if(self.username().trim().length == 0){
            self.message("Email is empty");
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
            })
            .done(function(data){
                console.log(data);
                setApiKey(data.user.apiKey);
            }).fail(function(data){
                self.message("Wrong credentials");
            });
    };

};

$(function(){
    ko.applyBindings(loginPageModel);
});
