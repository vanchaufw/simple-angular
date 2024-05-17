angular
  .module("ContactApp", [])
  .controller(
    "contactController",
    function ($scope, ContactService, PaginationService) {
      $scope.adding = false;
      $scope.searchContacts = "";
      $scope.contacts = [];
      $scope.newContact = {
        user_id: "",
        contact_id: "",
        username: "",
        fullname: "",
        phone: "",
        email: "",
      };

      $scope.displayValue = 5;
      $scope.startValue = 0;

      $scope.getIndex = function (contact_id) {
        return $scope.contacts.findIndex(
          (contact) => contact.contact_id == contact_id
        );
      };

      $scope.$watch('newContact.username', function(newUsername, oldUsername) {
        if (newUsername != oldUsername) {
          var existingContact = $scope.contacts.find(function(contact) {
            return contact.username == $scope.newContact.username;
          });
          if (existingContact) {
            $scope.newContact.fullname = existingContact.fullname;
          }
          console.log('watching')
        }
      })

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
            console.log($scope.contacts);
          })
          .catch(function (error) {
            console.error("Error fetching contacts:", error);
          });
      };

      $scope.editContact = function (contact_id) {
        const index = $scope.getIndex(contact_id);
        if (index == undefined) {
          return;
        }

        if (
          !$scope.contacts[index].isNoEditing &&
          Object.values($scope.newContact).includes("")
        ) {
          return;
        }

        if (!$scope.contacts[index].isNoEditing) {
          ContactService.editContact(
            contact_id,
            $scope.contacts[index].username,
            $scope.contacts[index].fullname,
            $scope.contacts[index].phone,
            $scope.contacts[index].email
          ).then(function (response) {
            alert(response.data.message);
          });
          console.log(response);
        }
        $scope.contacts[index].isNoEditing =
          !$scope.contacts[index].isNoEditing;
      };

      $scope.deleteContact = function (contact_id) {
        const index = $scope.getIndex(contact_id);
        ContactService.deleteContact(contact_id).then(function (response) {
          if (response.data.status == "deleted") {
            $scope.contacts.splice(index, 1);
            alert(response.data.status);
          } else {
            alert(response.data.message);
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
        ContactService.addContact($scope.newContact).then(function (response) {
          if (response.data.status == "created") {
            $scope.contacts.push({ ...$scope.newContact });
            $scope.newContact = {
              user_id: "",
              contact_id: "",
              username: "",
              fullname: "",
              phone: "",
              email: "",
            };
            alert(response.data.status);
          } else {
            alert(response.data.message);
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
