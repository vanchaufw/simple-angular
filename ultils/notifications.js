angular.module("ContactApp").factory('NotificationService', function(ngToast) {
    var service = {};
    service.showToast = function(message, type) {
        ngToast.create({
            content: message,
            className: type,
            timeout: 3000
        });
    };

    return service;
});