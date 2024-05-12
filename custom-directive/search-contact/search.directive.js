// service.directive.js
angular.module("ContactApp").directive("search", function () {
  return {
    restrict: "E",
    scope: {
      onSearch: "&",
    },
    templateUrl: "./custom-directive/search-contact/search-template.html",
  };
});
