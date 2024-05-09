angular.module('ContactApp', []).controller('contactController', function($scope) {
    $scope.adding = false;
    $scope.search_contacts = "";
    $scope.new_contact = {
        id: 0,
        name: "",
        phoneNumber: "",

    }
    $scope.contacts = [
        {
            id: '1',
            name: 'Ha Van Chau',
            phoneNumber: '0123456789',
            isNotEditing: true,
        },
        {
            id: '2',
            name: 'Nguyen Van A',
            phoneNumber: '0987654321',
            isNotEditing: true,
        },
        {
            id: '3',
            name: 'Tran Thi B',
            phoneNumber: '0194973895',
            isNotEditing: true,
        },
        {
            id: '4',
            name: 'Doan Van C',
            phoneNumber: '1029499595',
            isNotEditing: true,
        },
        {
            id: '5',
            name: 'Huynh Van DC',
            phoneNumber: '1020948685',
            isNotEditing: true,
        },
        {
            id: '6',
            name: 'Nguyen Thuy DFS',
            phoneNumber: '8424056205',
            isNotEditing: true,
        },
    ]

    $scope.getContacts = function() {

    }

    $scope.editContact = function(index) {
        if (index == undefined || index < 0 && index >= $scope.contacts.length) {
            return;
        }
        $scope.contacts[index].isNotEditing = !$scope.contacts[index].isNotEditing;
    };

    $scope.deleteContact = function(index) {
        if (index == undefined || index < 0 && index >= $scope.contacts.length) {
            return;
        }
        $scope.contacts.splice(index, 1);
    }

    $scope.setAdding = function(value) {
        $scope.adding = value;
    }

    $scope.addContact = function() {

        if($scope.new_contact.name == "" || $scope.new_contact.phoneNumber == "") {
            $scope.adding = false;
            return;
        }

        $scope.new_contact.id = $scope.contacts.length
        console.log($scope.new_contact);
        $scope.contacts.push($scope.new_contact);
        $scope.adding = false;

    }
});