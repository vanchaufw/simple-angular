angular
  .module("ContactApp", [])
  .controller(
    "contactController",
    function ($scope, ContactService, GenerateIdService, PaginationService) {
      $scope.adding = false;
      $scope.searchContacts = "";
      $scope.contacts = [];
      $scope.newContact = {
        id: 0,
        fullname: "",
        phone: "",
        email: "",
      };

      $scope.displayValue = 5;
      $scope.startValue = 0;

      $scope.getContacts = function () {
        ContactService.getContacts()
          .then(function (response) {
            if (Array.isArray(response)) {
              $scope.contacts = response.map((obj) => ({
                ...obj,
                isNoEditing: true,
              }));
            } else {
              console.error(response);
            }
          })
          .catch(function (error) {
            console.error("Error fetching contacts:", error);
          });
      };

      $scope.editContact = function (id, index) {
        if (
          index == undefined ||
          (index < 0 && index >= $scope.contacts.length)
        ) {
          console.log(index);
          return;
        }

        if (!$scope.contacts[index].isNoEditing) {
          const response = ContactService.editContact(
            id,
            $scope.contacts[index].fullname,
            $scope.contacts[index].phone,
            $scope.contacts[index].email
          );
          console.log(response);
        }
        $scope.contacts[index].isNoEditing =
          !$scope.contacts[index].isNoEditing;
      };

      $scope.deleteContact = function (id, index) {
        ContactService.deleteContact(id).then(function (response) {
          if (response.msg == "Deleted") {
            $scope.contacts.splice(index, 1);
          }
          console.log(response);
        });
      };

      $scope.setAdding = function () {
        $scope.adding = true;
      };

      $scope.addContact = function () {
        if ($scope.newContact.fullname == "" || $scope.newContact.phone == "") {
          $scope.adding = false;
          return;
        }

        $scope.newContact.id = GenerateIdService.generate(30);
        ContactService.addContact($scope.newContact).then(function (response) {
          if (response.msg == "Created") {
            $scope.contacts.push({ ...$scope.newContact });
            $scope.newContact = {
              id: 0,
              fullname: "",
              phone: "",
              email: "",
            };
          }
          console.log(response);
        });
        $scope.adding = false;
      };

      $scope.pagingnation = function (isIncrease) {
        $scope.startValue = PaginationService.paginate(
          isIncrease,
          $scope.startValue,
          $scope.displayValue,
          $scope.contacts.length
        );

        console.log($scope.startValue, "paging");
      };

      $scope.getContacts();
    }
  );
