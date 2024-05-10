angular
  .module("ContactApp", [])
  .controller("contactController", function ($scope, $http) {
    $scope.adding = false;
    $scope.search_contacts = "";
    $scope.contacts = [];
    $scope.new_contact = {
      id: 0,
      fullname: "",
      phone: "",
    };

    $scope.displayValue = 5;
    $scope.startValue = 0;

    $scope.getContacts = function () {
      $http
        .get(`http://localhost:3000/api/contacts`)
        .then(function (response) {
          $scope.contacts = response.data.map((obj) => ({
            ...obj,
            isNoEditing: true,
          }));
        })
        .catch(function (error) {
          console.log(error);
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
        const new_name = $scope.contacts[index].fullname;
        const new_phone = $scope.contacts[index].phone;

        $http
          .put(`http://localhost:3000/api/contacts`, {
            id: id,
            fullname: new_name,
            phone: new_phone,
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      $scope.contacts[index].isNoEditing = !$scope.contacts[index].isNoEditing;
    };

    $scope.deleteContact = function (id, index) {
      $http
        .delete(`http://localhost:3000/api/contacts/${id}`)
        .then(function (response) {
          if (response.data.msg === "Deleted") {
            $scope.contacts.splice(index, 1);
          }
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.setAdding = function (value) {
      $scope.adding = value;
    };

    $scope.addContact = function () {
      if ($scope.new_contact.fullname == "" || $scope.new_contact.phone == "") {
        $scope.adding = false;
        return;
      }

      $scope.new_contact.id = $scope.contacts.length;
      $http
        .post(`http://localhost:3000/api/contacts`, {
          id: $scope.new_contact.id,
          fullname: $scope.new_contact.fullname,
          phone: $scope.new_contact.phone,
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.msg == "Created") {
            $scope.contacts.push($scope.new_contact);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      $scope.new_contact = {
        id: 0,
        fullname: "",
        phone: "",
      };
      $scope.adding = false;
    };

    $scope.pagingnation = function (isIncrease) {
        if (isIncrease) {
            if ($scope.startValue + $scope.displayValue >= $scope.contacts.length) {
                return;
            }
            $scope.startValue = $scope.startValue + $scope.displayValue;
        }
        else {
            if ($scope.startValue - $scope.displayValue < 0) {
                return;
            }
            $scope.startValue = $scope.startValue - $scope.displayValue;
        }
    }


    $scope.getContacts();

  });
