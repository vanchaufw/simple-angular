angular.module('ContactApp', []).controller('contactController', function($scope, $http) {
    $scope.contacts = [
        {
            id: '1',
            name: 'Ha Van Chau',
            phoneNumber: '0123456789',
        },
        {
            id: '2',
            name: 'Nguyen Van A',
            phoneNumber: '0987654321',
        },
        {
            id: '3',
            name: 'Tran Thi B',
            phoneNumber: '0194973895',
        },
        {
            id: '4',
            name: 'Doan Van C',
            phoneNumber: '1029499595',
        },
        {
            id: '5',
            name: 'Huynh Van DC',
            phoneNumber: '1020948685',
        },
        {
            id: '6',
            name: 'Nguyen Thuy DFS',
            phoneNumber: '8424056205',
        },
    ]
});