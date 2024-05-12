// contact-table.directive.js
angular.module("ContactApp").directive("tableContacts", function () {
  return {
    restrict: "E",
    templateUrl: "./custom-directive/table-contacts/table-contacts-template.html",
  };
});
