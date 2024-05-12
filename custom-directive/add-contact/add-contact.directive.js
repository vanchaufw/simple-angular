angular.module("ContactApp").directive("addContact", function () {
  return {
    restrict: "E",
    scope: {
      setAdding: "&",
      addContact: "&",
      show: "=",
    },
    templateUrl: "./custom-directive/add-contact/add-contact-template.html",
  };
});
