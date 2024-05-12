angular.module("ContactApp").directive("paging", function () {
  return {
    restrict: "E",
    scope: {
      onNext: "&",
      onPrevious: "&",
    },
    templateUrl: "./custom-directive/paging/paging-template.html",
  };
});
